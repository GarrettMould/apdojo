import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { GEMINI_REASONING_MODEL } from '@/lib/geminiModels';
import {
  extractJsonObject,
  parseMathSolverResponse,
  solutionToHistoryText,
  type MathSolverResponse,
} from '@/lib/mathSolver/types';

const MAX_MESSAGES = 24;
const MAX_MESSAGE_CHARS = 8_000;
const MAX_BASE64_CHARS = 5_600_000;

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

const SYSTEM_PROMPT = `You are an expert AP-level math and statistics tutor on AP Dojo.

You ALWAYS respond with JSON matching the schema.

When the student sends a NEW problem (typed, photo, or PDF):
- Return kind: "solution"
- Structure adapts to the problem — do NOT invent fake multi-part structure:
  • Simple typed equation / single ask → ONE problem with ONE part. Put the question in restatement (or part.prompt). Label the part "1".
  • True multi-part FRQ (a/b/c or Part A/B) → ONE problem with multiple parts labeled a, b, c (not "Part a").
  • Multiple distinct problems in a PDF/image → multiple entries in problems[].
- Each part needs 2–6 clear steps. Steps should teach — not just jump to the answer.
- Put the final boxed result in answer.
- Math formatting (critical — broken math looks terrible in the UI):
  • ALWAYS wrap math in $...$ (inline) or $$...$$ (display). Example: "Solve for $x$" and $$\\frac{6}{x}=\\frac{2}{3}$$.
  • Use LaTeX commands inside those delimiters: \\frac, \\sqrt, \\implies, etc.
  • NEVER write stacked plaintext fractions (do not put numerator and denominator on separate lines).
  • NEVER use Unicode fake-math / special fraction characters.
  • NEVER leave bare \\frac{...}{...} outside of $ delimiters.
  • Prefer $$...$$ for multi-step equations / proportions.
- title / step titles: short; include math with $...$ when needed (e.g. "Solve for $x$").
- Avoid generic titles like "Problem 1" when you can be specific.
- topic: optional unit/topic tag when relevant (e.g. "AP Stats Unit 6").
- If the upload is unreadable: return kind "chat" and ask them to re-upload or type the problem.

When the student asks to GENERATE PRACTICE (intent practice, or they ask for similar practice problems):
- Return kind: "practice"
- Create 4 NEW practice problems that train the SAME skills / topics as the uploaded file(s) and prior solution context.
- Change numbers, contexts, and wording — do NOT copy the original problems.
- Match difficulty to the source material (AP-level when appropriate).
- Prefer single-part problems unless the source was clearly multi-part FRQ style.
- Include full worked steps + answers for each practice problem (students reveal them later).
- Use the same math formatting rules as solutions.
- Optional short note explaining what skill set these target.

When the student asks a FOLLOW-UP about a prior solution (clarify a step, check their work, ask "why"):
- Return kind: "chat" with a short helpful message.
- Do NOT re-dump the entire solution unless they ask for a full re-solve.

Tone: encouraging, concise, high-school friendly. Never give only the answer — always show work in steps when solving.`;

const PRACTICE_USER_PROMPT = `Generate 4 additional practice problems based on the uploaded file(s) and our conversation so far.

Requirements:
- Same skills/topics as the upload, but NEW numbers and contexts (not copies).
- Return kind: "practice" with 4 problems, each with clear steps and a final answer.
- Keep difficulty AP-appropriate and similar to the source.`;

const stepSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    explanation: { type: SchemaType.STRING },
  },
  required: ['title', 'explanation'],
};

const partSchema = {
  type: SchemaType.OBJECT,
  properties: {
    label: { type: SchemaType.STRING },
    prompt: { type: SchemaType.STRING },
    steps: { type: SchemaType.ARRAY, items: stepSchema },
    answer: { type: SchemaType.STRING },
  },
  required: ['label', 'prompt', 'steps', 'answer'],
};

const problemSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    restatement: { type: SchemaType.STRING },
    topic: { type: SchemaType.STRING },
    parts: { type: SchemaType.ARRAY, items: partSchema },
  },
  required: ['title', 'restatement', 'parts'],
};

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    kind: { type: SchemaType.STRING, format: 'enum', enum: ['solution', 'chat', 'practice'] },
    note: { type: SchemaType.STRING },
    message: { type: SchemaType.STRING },
    problems: { type: SchemaType.ARRAY, items: problemSchema },
  },
  required: ['kind'],
};

type ClientTurn = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const messages: ClientTurn[] = Array.isArray(body.messages) ? body.messages : [];
    const clamped = messages
      .slice(-MAX_MESSAGES)
      .map((m: ClientTurn) => ({
        role: m.role,
        content: String(m.content ?? '').slice(0, MAX_MESSAGE_CHARS),
      }));

    const lastMsg = clamped[clamped.length - 1];
    if (!lastMsg || lastMsg.role !== 'user') {
      return NextResponse.json({ error: 'INVALID_TURNS' }, { status: 400 });
    }

    const intent = body.intent === 'practice' ? 'practice' : 'solve';

    let attachment: { mimeType: string; data: string } | null = null;
    if (body.attachment && typeof body.attachment === 'object') {
      const mime = String(body.attachment.mimeType ?? '');
      const data = String(body.attachment.data ?? '');
      if (ALLOWED_MIME.has(mime) && data.length > 0 && data.length <= MAX_BASE64_CHARS) {
        attachment = { mimeType: mime, data };
      }
    }

    if (intent === 'practice' && !attachment) {
      return NextResponse.json(
        { error: 'PRACTICE_REQUIRES_UPLOAD', message: 'Upload a photo or PDF first to generate practice.' },
        { status: 400 },
      );
    }

    const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
    const prev = clamped.slice(0, -1);
    for (let i = 0; i < prev.length - 1; i += 2) {
      const u = prev[i];
      const a = prev[i + 1];
      if (u?.role === 'user' && a?.role === 'assistant') {
        history.push({ role: 'user', parts: [{ text: u.content }] });
        history.push({ role: 'model', parts: [{ text: a.content }] });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_REASONING_MODEL,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        responseSchema: responseSchema as any,
      },
    });

    const chat = model.startChat({ history });

    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
    if (attachment) {
      parts.push({ inlineData: { mimeType: attachment.mimeType, data: attachment.data } });
    }
    parts.push({
      text: intent === 'practice' ? PRACTICE_USER_PROMPT : lastMsg.content,
    });

    const result = await chat.sendMessage(parts);
    const text = result.response.text();

    let parsed: MathSolverResponse | null = null;
    try {
      parsed = parseMathSolverResponse(extractJsonObject(text));
    } catch {
      parsed = null;
    }

    if (!parsed) {
      // Fallback: treat raw text as a chat reply so the UI never goes blank
      return NextResponse.json({
        reply: {
          kind: 'chat',
          message: text || 'Sorry — I could not parse that solution. Please try again.',
        },
        historyText: text,
      });
    }

    // If they asked for practice but model returned solution, coerce when problems exist
    if (intent === 'practice' && parsed.kind === 'solution') {
      parsed = { kind: 'practice', note: parsed.note, problems: parsed.problems };
    }

    const historyText =
      parsed.kind === 'solution' || parsed.kind === 'practice'
        ? solutionToHistoryText(parsed)
        : parsed.message;

    return NextResponse.json({ reply: parsed, historyText });
  } catch (err) {
    console.error('[math-solver]', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
