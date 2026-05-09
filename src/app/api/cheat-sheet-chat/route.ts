import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { displayCourseLabel, isCourseSubject, type CourseSubject } from '@/lib/courseSubject';
import {
  buildFrqPracticeTutorSystemInstruction,
  personaForSubject,
  scotusSenseiSystemPrompt,
  type ScotusSenseiIntent,
} from '@/lib/chatPersonas';
import {
  formatFrqTutorContextBlock,
  parseFrqTutorContextPayload,
} from '@/lib/frqTutorContext';
import { auth as adminAuth, db as adminDb } from '@/lib/firebase-admin';

const MODEL_NAME = 'gemini-2.0-flash';

const MAX_MESSAGES = 32;
const MAX_MESSAGE_CHARS = 12_000;

const ALLOWED_ATTACHMENT_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

/** ~4MiB binary before base64 (~5.5M chars base64)—keeps bodies under typical route limits */
const MAX_BASE64_CHARS = 5_600_000;

type ClientTurn = { role: 'user' | 'assistant'; content: string };

type AttachmentBody = { mimeType?: unknown; data?: unknown; fileName?: unknown };

function clampTurns(msgs: ClientTurn[]): ClientTurn[] {
  const clamped = msgs.map((m) => ({
    role: m.role,
    content: String(m.content ?? '').slice(0, MAX_MESSAGE_CHARS),
  }));
  if (clamped.length <= MAX_MESSAGES) return clamped;
  return clamped.slice(-MAX_MESSAGES);
}

/** Expects chronological [user, assistant, user, …, user]. */
function toGeminiChatParams(messages: ClientTurn[]): {
  history: { role: 'user' | 'model'; parts: { text: string }[] }[];
  lastUserText: string;
} {
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user') {
    throw new Error('INVALID_TURNS');
  }
  const prev = messages.slice(0, -1);
  if (prev.length % 2 !== 0) {
    throw new Error('INVALID_TURNS');
  }
  const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
  for (let i = 0; i < prev.length; i += 2) {
    const u = prev[i];
    const a = prev[i + 1];
    if (u.role !== 'user' || a.role !== 'assistant') {
      throw new Error('INVALID_TURNS');
    }
    history.push({ role: 'user', parts: [{ text: u.content }] });
    history.push({ role: 'model', parts: [{ text: a.content }] });
  }
  return { history, lastUserText: last.content };
}

function parseAttachment(body: { attachment?: unknown }): {
  mimeType: string;
  data: string;
  fileName?: string;
} | null {
  const raw = body.attachment;
  if (raw == null) return null;
  if (typeof raw !== 'object') return null;
  const a = raw as AttachmentBody;
  const mimeType = typeof a.mimeType === 'string' ? a.mimeType.toLowerCase().trim() : '';
  const data = typeof a.data === 'string' ? a.data.trim() : '';
  const fileName =
    typeof a.fileName === 'string' ? a.fileName.slice(0, 240) : undefined;

  if (!mimeType || !ALLOWED_ATTACHMENT_MIME.has(mimeType)) {
    return null;
  }
  if (!data || data.length > MAX_BASE64_CHARS) {
    return null;
  }
  if (!/^[A-Za-z0-9+/=\s]+$/.test(data)) {
    return null;
  }
  const compact = data.replace(/\s/g, '');
  return { mimeType, data: compact, fileName };
}

type McqContextForTutor = {
  questionId: number;
  stem: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  unitNameFromQuestion: string;
  selectedLetter: string | null;
  hasSubmittedAnswer: boolean;
};

type ScotusPromptContext = {
  requiredCase: string;
  nonRequiredCase: string;
  topic: string;
  scenario: string;
  tasks: [string, string, string];
  caseFacts?: string;
  constitutionalClause?: string;
  comparisonPoints?: string;
  rubricChecklist?: string[];
  gradingKey?: {
    promptId: string;
    groundTruth: {
      clause: string;
      requiredFacts: string;
      bridgeLogic: string;
      applicationPrinciple: string;
    };
    gradingRules: {
      pointA: string;
      pointBFacts: string;
      pointBBridge: string;
      pointC: string;
    };
  };
};

function parseScotusPromptContext(raw: unknown): ScotusPromptContext | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const requiredCase = typeof o.requiredCase === 'string' ? o.requiredCase.slice(0, 200) : '';
  const nonRequiredCase =
    typeof o.nonRequiredCase === 'string' ? o.nonRequiredCase.slice(0, 200) : '';
  const topic = typeof o.topic === 'string' ? o.topic.slice(0, 200) : '';
  const scenario = typeof o.scenario === 'string' ? o.scenario.slice(0, 6000) : '';
  const tasksRaw = o.tasks;
  if (!requiredCase || !nonRequiredCase || !topic || !scenario || !Array.isArray(tasksRaw)) return null;
  const tasks = tasksRaw
    .slice(0, 3)
    .map((t) => (typeof t === 'string' ? t.slice(0, 1000) : ''))
    .filter(Boolean);
  if (tasks.length !== 3) return null;

  const caseFacts = typeof o.caseFacts === 'string' ? o.caseFacts.slice(0, 4000) : undefined;
  const constitutionalClause =
    typeof o.constitutionalClause === 'string' ? o.constitutionalClause.slice(0, 500) : undefined;
  const comparisonPoints =
    typeof o.comparisonPoints === 'string' ? o.comparisonPoints.slice(0, 4000) : undefined;
  let rubricChecklist: string[] | undefined;
  const rubRaw = o.rubricChecklist;
  if (Array.isArray(rubRaw)) {
    rubricChecklist = rubRaw
      .slice(0, 12)
      .map((r) => (typeof r === 'string' ? r.slice(0, 240) : ''))
      .filter(Boolean);
    if (rubricChecklist.length === 0) rubricChecklist = undefined;
  }

  let gradingKey: ScotusPromptContext['gradingKey'];
  const keyRaw = o.gradingKey;
  if (keyRaw && typeof keyRaw === 'object') {
    const k = keyRaw as Record<string, unknown>;
    const promptId = typeof k.promptId === 'string' ? k.promptId.slice(0, 120) : '';
    const gt = k.groundTruth;
    const rules = k.gradingRules;
    if (gt && typeof gt === 'object' && rules && typeof rules === 'object' && promptId) {
      const gto = gt as Record<string, unknown>;
      const ro = rules as Record<string, unknown>;
      const clause = typeof gto.clause === 'string' ? gto.clause.slice(0, 800) : '';
      const requiredFacts =
        typeof gto.requiredFacts === 'string' ? gto.requiredFacts.slice(0, 2000) : '';
      const bridgeLogic =
        typeof gto.bridgeLogic === 'string' ? gto.bridgeLogic.slice(0, 2000) : '';
      const applicationPrinciple =
        typeof gto.applicationPrinciple === 'string'
          ? gto.applicationPrinciple.slice(0, 2000)
          : '';

      const pointA = typeof ro.pointA === 'string' ? ro.pointA.slice(0, 1500) : '';
      const pointBFacts =
        typeof ro.pointBFacts === 'string' ? ro.pointBFacts.slice(0, 1500) : '';
      const pointBBridge =
        typeof ro.pointBBridge === 'string' ? ro.pointBBridge.slice(0, 1800) : '';
      const pointC = typeof ro.pointC === 'string' ? ro.pointC.slice(0, 1500) : '';
      if (
        clause &&
        requiredFacts &&
        bridgeLogic &&
        applicationPrinciple &&
        pointA &&
        pointBFacts &&
        pointBBridge &&
        pointC
      ) {
        gradingKey = {
          promptId,
          groundTruth: {
            clause,
            requiredFacts,
            bridgeLogic,
            applicationPrinciple,
          },
          gradingRules: {
            pointA,
            pointBFacts,
            pointBBridge,
            pointC,
          },
        };
      }
    }
  }

  return {
    requiredCase,
    nonRequiredCase,
    topic,
    scenario,
    tasks: [tasks[0], tasks[1], tasks[2]],
    ...(caseFacts != null && caseFacts.length > 0 ? { caseFacts } : {}),
    ...(constitutionalClause != null && constitutionalClause.length > 0
      ? { constitutionalClause }
      : {}),
    ...(comparisonPoints != null && comparisonPoints.length > 0 ? { comparisonPoints } : {}),
    ...(rubricChecklist != null ? { rubricChecklist } : {}),
    ...(gradingKey != null ? { gradingKey } : {}),
  };
}

function normalizeKeyedMcqAnswer(raw: unknown): string {
  if (typeof raw === 'string') {
    const t = raw.trim();
    return t ? t.slice(0, 80) : '';
  }
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    const n = Math.floor(raw);
    if (n >= 0 && n < 26) return String.fromCharCode(65 + n);
    return String(raw).slice(0, 80);
  }
  return '';
}

function parseMcqContext(raw: unknown): McqContextForTutor | null {
  if (raw == null || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const questionId = Number(o.questionId);
  if (!Number.isFinite(questionId)) return null;
  const stem = typeof o.stem === 'string' ? o.stem.slice(0, 24_000) : '';
  if (!stem.trim()) return null;

  const optionsRaw = o.options;
  if (!Array.isArray(optionsRaw) || optionsRaw.length === 0) return null;
  const options: { letter: string; text: string }[] = [];
  for (const item of optionsRaw.slice(0, 12)) {
    if (!item || typeof item !== 'object') continue;
    const it = item as Record<string, unknown>;
    const letter = typeof it.letter === 'string' ? it.letter.trim().slice(0, 8) : '';
    const text = typeof it.text === 'string' ? it.text.slice(0, 12_000) : '';
    if (letter && text) options.push({ letter, text });
  }
  if (options.length === 0) return null;

  const correctAnswer = normalizeKeyedMcqAnswer(o.correctAnswer);
  if (!correctAnswer) return null;

  const explanation =
    typeof o.explanation === 'string' ? o.explanation.slice(0, 24_000) : '';
  const unitNameFromQuestion =
    typeof o.unitNameFromQuestion === 'string'
      ? o.unitNameFromQuestion.slice(0, 200)
      : '';

  const selectedLetter =
    o.selectedLetter === null
      ? null
      : typeof o.selectedLetter === 'string'
        ? o.selectedLetter.trim().slice(0, 8).toUpperCase()
        : null;

  const hasSubmittedAnswer = o.hasSubmittedAnswer === true;

  return {
    questionId,
    stem,
    options,
    correctAnswer,
    explanation,
    unitNameFromQuestion,
    selectedLetter,
    hasSubmittedAnswer,
  };
}

function formatMcqBlock(ctx: McqContextForTutor): string {
  const opts = ctx.options.map((x) => `${x.letter}. ${x.text}`).join('\n');
  const sel =
    ctx.selectedLetter != null
      ? `Learner’s selection (if any): ${ctx.selectedLetter}`
      : 'Learner’s selection (if any): (not chosen yet)';
  const submitted = ctx.hasSubmittedAnswer ? 'yes' : 'no';
  const expl = ctx.explanation.trim()
    ? `\nAuthor explanation (from content bank):\n${ctx.explanation.trim()}`
    : '\n(No author explanation text in the bank.)';
  return `[MCQ item id ${ctx.questionId}; unit label from content: ${ctx.unitNameFromQuestion || 'n/a'}]

Stem:
${ctx.stem}

Choices:
${opts}

Keyed correct answer (for your reasoning only; see pedagogy rules below): ${ctx.correctAnswer}
${sel}
Submitted / locked in answer yet: ${submitted}
${expl}`;
}

function buildMcqSystemInstruction(
  subject: CourseSubject,
  unitNumber: number,
  unitTitle: string | undefined,
  ctx: McqContextForTutor
): string {
  const persona = personaForSubject(subject);
  const course = displayCourseLabel(subject);
  return `${persona.voice}

You are **${persona.name}**, the **guided MCQ coach** in AP Dojo (Macro, Micro, or AP Gov—match **${course}** below). The learner is in **unit MCQ practice** on **one** item only. Unit ${unitNumber}${unitTitle ? ` (${unitTitle})` : ''}.

**Your job:** You **lead**. The student mostly taps suggested next steps—**do not** invite open-ended “what do you want to ask?” coaching. Keep them moving with **short**, focused turns (Socratic walkthrough, not a free chat).

**Personality (required—do not sound like a generic bot):** The voice block above is your baseline: **warm, human, lightly ${subject === 'gov' ? 'Franklin-esque' : 'Smith-esque'} tutoring energy** in plain contemporary English—the same temperament as the unit cheat-sheet tutor. **Every** assistant message—including short ones—must include **one** compact persona beat (a short opening aside, transitional clause, or bridge before [[CHOICES]]): ${subject === 'gov' ? 'dry civic wit / practical patience—always nonpartisan, never cute colonial cosplay.' : 'polite curiosity or quiet delight at how the logic fits together—in markets or incentives, whichever fits this item.'} That beat is **tone only**—it must **not** carry unique factual claims; all definitions, steps, and AP content stay rigorous and neutral. Skip the beat **only** if your entire prose is literally one very short sentence (e.g. a single corrective line).

Substance stays **neutral, precise, contemporary AP-first**—no archaic diction, no lesson content as historical reenactment; accuracy beats flourish.

Item data below: stem, choices, keyed answer, optional bank explanation, submission state. Stay on **this** question only; redirect off-topic questions back to it.

**Spoilers**
• If they have **not** submitted a final answer: **never** state or strongly imply the keyed correct option (no “the answer is…”, no “so D is wrong because…”). Teach definitions, logic, and what the **stem** demands—so they reason.
• If they **have** submitted: you may confirm correctness when it helps learning and tie to **why**—still teach reasoning, not only the letter.
• Never invent exam specifics; never contradict the keyed answer without flagging uncertainty.

**[[CHOICES]] (required nearly always)**  
After your prose (2–5 short paragraphs max unless they chose “go deeper”), you **must** append a [[CHOICES]] block so they can tap the next step—**unless** they are clearly done (they say so or you judge understanding is solid); then omit choices and close in one short paragraph.

When you use [[CHOICES]]: use **Path B** style from the cheat-sheet tutor—**do not** end your prose with a question mark. Then append **only**:

[[CHOICES]]
label|full message to send when clicked
...
[[/CHOICES]]

Rules for MCQ mode:
• **3–4 lines** whenever possible (minimum 2). Labels ≤ **40 characters**; prompts are full sentences the app sends as the learner’s next message.
• Prompts must **advance reasoning** on this item (e.g. “Unpack one keyword in the stem…”, “What would have to be true for B to work?”, “Compare your two finalists without naming the keyed answer…”). **No** generic “Anything else?”
• Rotate concrete moves: stem → option → eliminate → definition → assumption check.

Formatting: **bold** key terms sparingly (markdown).

--- BEGIN ITEM CONTEXT ---
${formatMcqBlock(ctx)}
--- END ITEM CONTEXT ---`;
}

function buildSystemInstruction(
  subject: CourseSubject,
  unitNumber: number,
  unitTitle: string | undefined
): string {
  const persona = personaForSubject(subject);
  const course = displayCourseLabel(subject);
  return `${persona.voice}

You are tutoring a student in AP Dojo. They have the Unit ${unitNumber} cheat sheet open${unitTitle ? ` (${unitTitle})` : ''} for ${course}.

Persona vs. substance: Core teaching stays neutral, precise, and contemporary AP—no antiquated diction or period vignettes bearing the explanatory load. Supplementary persona is welcome when substantial: if the reply reaches roughly 120+ words OR three-plus short paragraphs, weave in ONE plain-English temperament beat (economics tutor: calm curiosity about how orderly reasoning fits markets and trade; gov tutor: dry civic wit and pragmatism, always nonpartisan)—one sentence or clause, preferably as opener or transitional closer, not dribbled across every paragraph, and never the only place factual claims appear. Omit extra personality in terse replies.

Help with AP-aligned content for this unit: terms, graphs, misconceptions (econ); institutions, doctrines, and FRQ reasoning (Gov); how ideas show up on the exam; and how to use their cheat sheet. Students may attach an image (e.g. notes or a graph), a PDF slide, or similar—use what you see to answer, tied to AP scope when relevant.

Keep replies concise unless they ask for more depth—short paragraphs, not lectures. Use **bold** sparingly for key terms (markdown-style). Accuracy and exam alignment beat “staying in character”; avoid inventing exam details.

Closing convention (pick exactly ONE path — do not mix both):
• Path A — Question in prose: End your reply with ONE clear follow-up question in normal text inside the bubble. Use **bold** sparingly around key ideas. Do NOT append a [[CHOICES]] block.
• Path B — Clickable routes: Do NOT ask a farewell question at the end of your prose—wrap up neutrally, then append ONLY the [[CHOICES]] machine block so learners pick next steps. Avoid ending prose with a question mark in this mode.

When you use Path B, append this EXACT block at the very end after your prose (nothing after [[/CHOICES]]). Format: label|full message to send when clicked. At least two lines; labels concise (≤40 characters):

[[CHOICES]]
Practice question based on discussion|I'd like a practice AP-style question based on what we just discussed.
Simpler step-by-step breakdown|Please break this down step by step in simpler language—smaller chunks at a time until I can follow.
[[/CHOICES]]

Substitute your own pairs when they fit the turn (e.g. "How is this tested?" or "Contrast with a related term")—but do not offer "another analogy" unless your previous message already used an analogy the student can extend; default to exam prep or step-by-step scaffolding instead. Keep delimiter lines and pipes exact.`;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : '';
  if (!bearerToken || !adminAuth || !adminDb) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let uid = '';
  try {
    const decoded = await adminAuth.verifyIdToken(bearerToken);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const userSnap = await adminDb.collection('users').doc(uid).get();
    const userData = userSnap.data() as
      | { admin?: boolean; role?: string; roles?: string[] }
      | undefined;
    const isAdmin =
      userData?.admin === true ||
      (typeof userData?.role === 'string' && userData.role.toLowerCase() === 'admin') ||
      (Array.isArray(userData?.roles) &&
        userData.roles.some((r) => typeof r === 'string' && r.toLowerCase() === 'admin'));
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Tutor chat is not configured (missing GEMINI_API_KEY).' },
      { status: 503 }
    );
  }

  let body: {
    subject?: unknown;
    unitNumber?: unknown;
    unitTitle?: unknown;
    messages?: unknown;
    attachment?: unknown;
    mcqContext?: unknown;
    frqContext?: unknown;
    mode?: unknown;
    scotusPrompt?: unknown;
    scotusEssayIntent?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const subjectRaw = body.subject;
  if (typeof subjectRaw !== 'string' || !isCourseSubject(subjectRaw)) {
    return NextResponse.json({ error: 'Invalid subject.' }, { status: 400 });
  }
  const subject: CourseSubject = subjectRaw;

  const unitNumber = Number(body.unitNumber);
  if (!Number.isFinite(unitNumber) || unitNumber < 1 || unitNumber > 99) {
    return NextResponse.json({ error: 'Invalid unit.' }, { status: 400 });
  }

  const unitTitle =
    typeof body.unitTitle === 'string' ? body.unitTitle.slice(0, 200) : undefined;

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: 'messages[] is required.' }, { status: 400 });
  }

  const attachment = parseAttachment(body);
  const mcqContext = parseMcqContext(body.mcqContext);
  const frqContextPayload = parseFrqTutorContextPayload(body.frqContext ?? null);
  const mode = body.mode === 'scotus_essay' ? 'scotus_essay' : 'default';
  const scotusPrompt =
    mode === 'scotus_essay' ? parseScotusPromptContext(body.scotusPrompt) : null;

  let scotusEssayIntent: ScotusSenseiIntent = 'coach';
  if (mode === 'scotus_essay') {
    if (body.scotusEssayIntent === 'full_grade') scotusEssayIntent = 'full_grade';
    else if (body.scotusEssayIntent === 'part_check') scotusEssayIntent = 'part_check';
  }

  if (body.mcqContext != null && mcqContext == null) {
    return NextResponse.json({ error: 'Invalid mcqContext payload.' }, { status: 400 });
  }
  if (body.frqContext != null && frqContextPayload == null) {
    return NextResponse.json({ error: 'Invalid frqContext payload.' }, { status: 400 });
  }
  if (mcqContext != null && frqContextPayload != null) {
    return NextResponse.json(
      { error: 'Cannot combine mcqContext and frqContext.' },
      { status: 400 }
    );
  }
  if (mode === 'scotus_essay' && frqContextPayload != null) {
    return NextResponse.json(
      { error: 'Cannot combine scotus_essay mode and frqContext.' },
      { status: 400 }
    );
  }
  if (mode === 'scotus_essay' && scotusPrompt == null) {
    return NextResponse.json({ error: 'Invalid scotusPrompt payload.' }, { status: 400 });
  }

  const normalized: ClientTurn[] = [];
  for (const m of body.messages) {
    if (!m || typeof m !== 'object') continue;
    const role = (m as { role?: string }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== 'user' && role !== 'assistant') continue;
    normalized.push({
      role,
      content: typeof content === 'string' ? content : '',
    });
  }

  let history: ReturnType<typeof toGeminiChatParams>['history'];
  let lastUserText: string;
  try {
    const clamped = clampTurns(normalized);
    ({ history, lastUserText } = toGeminiChatParams(clamped));
  } catch {
    return NextResponse.json(
      {
        error:
          'Invalid conversation shape. Expected alternating user/assistant turns ending with a user message.',
      },
      { status: 400 }
    );
  }

  if (body.attachment != null && attachment == null) {
    return NextResponse.json(
      {
        error:
          'Invalid attachment. Use a JPEG/PNG/WebP/GIF image or PDF under 4MB.',
      },
      { status: 400 }
    );
  }

  if (mcqContext != null && attachment != null) {
    return NextResponse.json(
      { error: 'Attachments are not supported for question tutor mode.' },
      { status: 400 }
    );
  }

  if (frqContextPayload != null && attachment != null) {
    return NextResponse.json(
      { error: 'Attachments are not supported for FRQ tutor mode.' },
      { status: 400 }
    );
  }

  const frqContextBlock =
    frqContextPayload != null ? formatFrqTutorContextBlock(frqContextPayload) : '';

  const systemInstruction =
    mode === 'scotus_essay' && scotusPrompt != null
      ? scotusSenseiSystemPrompt(scotusPrompt, scotusEssayIntent)
      : frqContextPayload != null
        ? buildFrqPracticeTutorSystemInstruction(
            subject,
            unitNumber,
            unitTitle,
            frqContextBlock
          )
        : mcqContext != null
          ? buildMcqSystemInstruction(subject, unitNumber, unitTitle, mcqContext)
          : buildSystemInstruction(subject, unitNumber, unitTitle);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction,
      generationConfig: {
        temperature: scotusEssayIntent === 'full_grade' ? 0.35 : 0.72,
        maxOutputTokens:
          scotusEssayIntent === 'full_grade'
            ? 2048
            : scotusEssayIntent === 'part_check'
              ? 1536
              : frqContextPayload != null
                ? 1536
                : mcqContext != null
                  ? 1280
                  : 1024,
      },
    });

    const chat = model.startChat({ history });

    let result;
    if (attachment) {
      const parts = [
        { inlineData: { mimeType: attachment.mimeType, data: attachment.data } },
        {
          text:
            attachment.fileName
              ? `[Attached file: ${attachment.fileName}]\n\n${lastUserText}`
              : lastUserText,
        },
      ];
      result = await chat.sendMessage(parts);
    } else {
      result = await chat.sendMessage(lastUserText);
    }

    const reply = result.response.text()?.trim();

    if (!reply) {
      return NextResponse.json({ error: 'Empty model response.' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Request failed.';
    console.error('[cheat-sheet-chat]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
