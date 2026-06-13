'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ClipboardCheck,
  Sparkles,
  MessageSquareQuote,
  PanelRightClose,
  PanelRightOpen,
  BookOpenText,
  Scale,
  GitCompareArrows,
  Loader2,
} from 'lucide-react';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import { getScotusGradingKey } from '@/data/gov/scotusGradingKeys';
import { auth as firebaseAuth } from '@/lib/firebase';
import { tutorAvatarUrl } from '@/lib/tutorAvatar';
import { personaForSubject } from '@/lib/chatPersonas';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasAdminRole } from '@/lib/adminAccess';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { TutorTypingPlaceholder } from '@/components/TutorTypingPlaceholder';

type ScotusEssayPracticeClientProps = {
  caseName: string;
};

type SenseiMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  /** If set, this text is sent to the API instead of `content` (for a simpler chat bubble). */
  apiContent?: string;
};

const GRADING_REQUEST_DISPLAY =
  'Please grade my FRQ and provide constructive feedback.';

function toApiTurns(messages: SenseiMessage[]): { role: 'user' | 'assistant'; content: string }[] {
  const filtered = messages
    .map((m) => ({ role: m.role, content: (m.apiContent ?? m.content).trim() }))
    .filter((m) => m.content.length > 0);

  const firstUserIndex = filtered.findIndex((m) => m.role === 'user');
  if (firstUserIndex === -1) return [];

  const trimmed = filtered.slice(firstUserIndex);
  const collapsed: { role: 'user' | 'assistant'; content: string }[] = [];

  for (const turn of trimmed) {
    const last = collapsed[collapsed.length - 1];
    if (last && last.role === turn.role) {
      last.content = `${last.content}\n\n${turn.content}`;
    } else {
      collapsed.push({ ...turn });
    }
  }

  if (collapsed.length % 2 === 0 && collapsed[collapsed.length - 1]?.role === 'assistant') {
    collapsed.pop();
  }

  return collapsed;
}

function buildFullFrqSubmissionForApi(prompt: {
  tasks: [string, string, string];
  partTexts: string[];
}): string {
  const lines: string[] = [
    '[FULL FRQ SUBMISSION — GRADE THIS]',
    '',
    'Grade my complete SCOTUS comparison FRQ using the scoring rules and grounding key for this prompt.',
    '',
  ];
  (['A', 'B', 'C'] as const).forEach((label, idx) => {
    const task = prompt.tasks[idx];
    const answer = prompt.partTexts[idx] ? prompt.partTexts[idx] : '(no response submitted)';
    lines.push(`Part ${label}`, '', `Prompt:`, task, '', `Answer:`, answer, '');
    if (idx < 2) lines.push('---', '');
  });
  return lines.join('\n');
}

function buildPartCheckPayload(args: {
  partLabel: 'A' | 'B' | 'C';
  requiredCase: string;
  comparisonCase: string;
  topic: string;
  task: string;
  answer: string;
}): string {
  return [
    `[CHECK PART ${args.partLabel} — TARGETED FEEDBACK]`,
    '',
    'Review only this part and provide targeted feedback before final submission.',
    '',
    `Part: ${args.partLabel}`,
    `Topic: ${args.topic}`,
    `Required case: ${args.requiredCase}`,
    `Comparison case: ${args.comparisonCase}`,
    '',
    'Prompt:',
    args.task,
    '',
    'Current student draft:',
    args.answer.trim() ? args.answer : '(no response submitted)',
    '',
    'Instructions:',
    '- Score only what is present for this part.',
    '- Be strict but constructive.',
    '- Point out exactly what legal/historical detail is missing.',
    '- Give a concise rewrite move the student can apply immediately.',
  ].join('\n');
}

/** Map unicode asterisk lookalikes → ASCII so `**`/`*` match CommonMark emphasis rules (cheat sheet parity). */
function sanitizeTutorMarkdownAsteriskLookalikes(raw: string): string {
  return raw.replace(/[\uFF0A\u2217\u204E\uFE61\u2731]/g, '*');
}

function SenseiAssistantMarkdown({ text }: { text: string }) {
  return (
    <div className="tutor-markdown text-slate-700 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_b]:font-semibold [&_b]:text-slate-900 [&_em]:italic [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 whitespace-pre-wrap last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
          b: ({ children }) => <b className="font-semibold text-slate-900">{children}</b>,
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-0.5 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-0.5 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-snug">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-800"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[13px] text-slate-800">{children}</code>
          ),
        }}
      >
        {sanitizeTutorMarkdownAsteriskLookalikes(text)}
      </ReactMarkdown>
    </div>
  );
}

export default function ScotusEssayPracticeClient({ caseName }: ScotusEssayPracticeClientProps) {
  const { user, userData, loadingUserData } = useAuthContext();
  const canAccessGov = Boolean(user && hasAdminRole(userData));
  const caseSlug = decodeURIComponent(caseName).toLowerCase();
  const prompt = useMemo(
    () => scotusEssayPrompts.find((item) => item.id === caseSlug) ?? scotusEssayPrompts[0],
    [caseSlug]
  );
  const gradingKey = useMemo(() => getScotusGradingKey(prompt.id), [prompt.id]);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAiOpen, setIsAiOpen] = useState(true);
  const [senseiInput, setSenseiInput] = useState('');
  const [senseiSending, setSenseiSending] = useState(false);
  const [senseiMessages, setSenseiMessages] = useState<SenseiMessage[]>([]);
  /** After the user sends from the composer, hide quick starts to free vertical space. */
  const [senseiQuickStartsHidden, setSenseiQuickStartsHidden] = useState(false);
  const senseiScrollRef = useRef<HTMLDivElement | null>(null);

  const readableCaseName = prompt.requiredCase;
  const senseiAvatar = tutorAvatarUrl('gov');
  const senseiName = personaForSubject('gov').name;

  useEffect(() => {
    if (!senseiScrollRef.current) return;
    senseiScrollRef.current.scrollTop = senseiScrollRef.current.scrollHeight;
  }, [senseiMessages, senseiSending]);

  if (loadingUserData) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">Checking access...</p>
        </div>
      </main>
    );
  }

  if (!canAccessGov) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-900">AP Gov is in admin preview</h1>
          <p className="mt-3 text-gray-600">This content is currently restricted to admin accounts.</p>
          <Link
            href="/ap-macro-practice-tests"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Go to AP Macro practice tests
          </Link>
        </div>
      </main>
    );
  }

  const hasAnyDraftAnswer = [0, 1, 2].some((i) => Boolean(answers[i]?.trim()));

  const appendSenseiExchange = async (
    userContent: string,
    intent: 'coach' | 'part_check' | 'full_grade' = 'coach',
    apiUserPayload?: string
  ) => {
    const userMessage: SenseiMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: userContent,
      ...(apiUserPayload != null && apiUserPayload.length > 0
        ? { apiContent: apiUserPayload }
        : {}),
    };
    const nextMessages = [...senseiMessages, userMessage];
    setSenseiMessages(nextMessages);
    setSenseiQuickStartsHidden(true);
    if (intent === 'coach') {
      setSenseiInput('');
    }
    setSenseiSending(true);

    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      const res = await fetch('/api/cheat-sheet-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          subject: 'gov',
          unitNumber: 1,
          unitTitle: prompt.topic,
          mode: 'scotus_essay',
          ...(intent === 'full_grade'
            ? { scotusEssayIntent: 'full_grade' }
            : intent === 'part_check'
              ? { scotusEssayIntent: 'part_check' }
              : {}),
          scotusPrompt: {
            requiredCase: prompt.requiredCase,
            nonRequiredCase: prompt.nonRequiredCase,
            topic: prompt.topic,
            scenario: prompt.scenario,
            tasks: prompt.tasks,
            caseFacts: prompt.caseFacts,
            constitutionalClause: prompt.constitutionalClause,
            comparisonPoints: prompt.comparisonPoints,
            rubricChecklist: prompt.rubricChecklist,
            gradingKey,
          },
          messages: toApiTurns(nextMessages),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        res.ok && data.reply?.trim()
          ? data.reply.trim()
          : `Sensei could not respond: ${data.error || res.statusText || 'try again.'}`;
      setSenseiMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: reply,
        },
      ]);
    } catch {
      setSenseiMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: 'Sensei connection failed. Check your network and try again.',
        },
      ]);
    } finally {
      setSenseiSending(false);
    }
  };

  const sendSenseiMessage = async () => {
    const text = senseiInput.trim();
    if (!text || senseiSending) return;
    await appendSenseiExchange(text, 'coach');
  };

  const sendQuickStartPrompt = async (kind: 'case' | 'clause' | 'bridge' | 'rubric') => {
    if (senseiSending) return;
    const promptsByKind: Record<typeof kind, string> = {
      case: `Tell me more about the required case facts in ${prompt.requiredCase} and what I should include for full credit.`,
      clause: `Help me identify the exact constitutional clause/liberty for this prompt and what wording will earn the point.`,
      bridge: `Show me how to build a strong bridge sentence that links ${prompt.requiredCase} to ${prompt.nonRequiredCase}.`,
      rubric: 'Give me a quick 4-point checklist before I draft my final FRQ response.',
    };
    await appendSenseiExchange(promptsByKind[kind], 'coach');
  };

  const submitFullResponseForGrading = async () => {
    if (senseiSending || !hasAnyDraftAnswer) return;
    const partTexts = [0, 1, 2].map((i) => (answers[i] ?? '').trim());
    const gradingPayload = buildFullFrqSubmissionForApi({
      tasks: prompt.tasks,
      partTexts,
    });
    setIsAiOpen(true);
    await appendSenseiExchange(GRADING_REQUEST_DISPLAY, 'full_grade', gradingPayload);
  };

  const submitPartForFeedback = async (idx: 0 | 1 | 2) => {
    if (senseiSending || !(answers[idx] ?? '').trim()) return;
    const partLabel = (String.fromCharCode(65 + idx) as 'A' | 'B' | 'C');
    const task = prompt.tasks[idx];
    const answer = (answers[idx] ?? '').trim();
    const userFacing = `Please check my work for Part ${partLabel}.`;
    const payload = buildPartCheckPayload({
      partLabel,
      requiredCase: prompt.requiredCase,
      comparisonCase: prompt.nonRequiredCase,
      topic: prompt.topic,
      task,
      answer,
    });
    setIsAiOpen(true);
    await appendSenseiExchange(userFacing, 'part_check', payload);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto w-full max-w-[1700px] px-4 pb-10 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <header className="mb-6">
          <p className="inline-flex w-fit rounded-md border-2 border-indigo-700 bg-indigo-500 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            SCOTUS Comparison Practice
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            {readableCaseName}
          </h1>
        </header>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
          <section
            className={`${isAiOpen ? 'xl:col-span-9' : 'xl:col-span-12'} transition-all duration-300`}
          >
            <div className="rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:p-5">
              {!isAiOpen && (
                <div className="mb-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAiOpen(true)}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:border-gray-700"
                  >
                    <PanelRightOpen className="h-3.5 w-3.5" />
                    Show AI Sensei
                  </button>
                </div>
              )}
              <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">FRQ Prompt</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-800">{prompt.scenario}</p>
              </div>

              <div className="mt-5 rounded-xl border-2 border-gray-200 bg-white">
                {prompt.tasks.map((task, idx) => {
                  const label = String.fromCharCode(65 + idx);
                  const isActive = idx === activeTaskIndex;
                  return (
                    <div key={`task-${label}`} className="border-b border-gray-200 last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setActiveTaskIndex(idx)}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                          isActive
                            ? 'translate-y-[2px] border-b-2 border-indigo-900 bg-indigo-600 text-white shadow-[0_3px_0_rgba(49,46,129,0.9)]'
                            : 'bg-white text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-black">Part {label}</span>
                        {!isActive && (
                          <span className="text-xs font-black uppercase tracking-wide text-gray-500">
                            Open part
                          </span>
                        )}
                      </button>
                      {isActive && (
                        <div className="space-y-3 border-t-2 border-indigo-800 bg-white p-4">
                          <p className="text-sm font-semibold leading-relaxed text-gray-800">{task}</p>
                          <div className="flex flex-col overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow-[0_2px_0_rgba(17,24,39,0.1)] transition focus-within:border-gray-500 focus-within:shadow-[0_4px_0_rgba(17,24,39,0.18)]">
                            <textarea
                              value={answers[idx] ?? ''}
                              onChange={(e) =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [idx]: e.target.value,
                                }))
                              }
                              placeholder="Write your AP Gov FRQ response here..."
                              className="min-h-[min(44vh,360px)] w-full resize-none border-0 bg-transparent px-4 py-3 text-base leading-relaxed text-gray-900 outline-none ring-0 focus:ring-0"
                            />
                            <div className="flex shrink-0 justify-end border-t border-gray-200 bg-gray-50/90 px-3 py-2.5">
                              <button
                                type="button"
                                onClick={() => void submitPartForFeedback(idx as 0 | 1 | 2)}
                                disabled={senseiSending || !(answers[idx] ?? '').trim()}
                                className="rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-[11px] font-black uppercase tracking-wide text-violet-800 shadow-sm hover:bg-violet-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
                              >
                                Check My Work
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border-2 border-dashed border-indigo-700 bg-indigo-50 p-4 sm:p-5">
                <h3 className="text-sm font-black uppercase tracking-wider text-indigo-800">Final Assembly</h3>
                <p className="mt-2 w-full max-w-none text-sm leading-relaxed text-gray-700">
                  When Parts A–C are drafted, submit your full attempt for AI grading. Sensei scores 4 points (A, B-facts,
                  B-bridge, C) and replies in AI Sensei on the right—open that panel first if your layout hides it.
                </p>
                <button
                  type="button"
                  onClick={() => void submitFullResponseForGrading()}
                  disabled={senseiSending || !hasAnyDraftAnswer}
                  className="mt-4 flex w-full min-h-[3.5rem] items-center justify-center gap-2 rounded-xl border-2 border-indigo-900 bg-indigo-600 px-4 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_4px_0_rgba(49,46,129,1)] transition hover:bg-indigo-700 disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none"
                >
                  {senseiSending ? (
                    <>
                      <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                      Grading…
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="h-5 w-5 shrink-0" aria-hidden />
                      Submit full response and grade
                    </>
                  )}
                </button>
                {!hasAnyDraftAnswer && (
                  <p className="mt-2 text-xs font-semibold text-indigo-900/80">Write something in at least one part to enable submit.</p>
                )}
              </div>
            </div>
          </section>

          {isAiOpen && (
            <aside className="flex min-h-[min(380px,70svh)] w-full flex-col xl:col-span-3 xl:h-full xl:min-h-0 transition-all duration-300">
              <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/[0.04]">
                <div className="relative flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
                  <span aria-hidden className="absolute left-0 top-0 h-0.5 w-full bg-violet-500 opacity-90" />
                  <h2 className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    AI Sensei
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsAiOpen(false)}
                    className="relative inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900"
                  >
                    <PanelRightClose className="h-3.5 w-3.5" />
                    Hide
                  </button>
                </div>

                <div
                  className={`shrink-0 bg-white px-4 ${senseiQuickStartsHidden ? 'pb-3 pt-3' : 'pb-3.5 pt-3'}`}
                >
                  <div className="mt-1 flex gap-3">
                    {senseiAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element -- tutor avatar URLs; matches CheatSheetChatBox
                      <img
                        src={senseiAvatar}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                    ) : (
                      <Sparkles className="h-8 w-8 shrink-0 text-violet-600" aria-hidden />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
                        {senseiName} · Socratic Coach
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {senseiQuickStartsHidden
                          ? 'Sensei coaches one rubric point at a time.'
                          : 'Sensei coaches one rubric point at a time. Use a quick start below or just begin writing.'}
                      </p>
                    </div>
                  </div>
                  {!senseiQuickStartsHidden ? (
                    <div className="relative mt-3 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => void sendQuickStartPrompt('case')}
                        disabled={senseiSending}
                        className="rounded-xl border border-slate-200/95 bg-white px-3.5 py-2.5 text-left text-[13px] font-medium text-slate-800 shadow-sm outline-none ring-offset-white transition hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpenText className="h-3.5 w-3.5 shrink-0 text-violet-700" />
                          Tell me more about the required case
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => void sendQuickStartPrompt('clause')}
                        disabled={senseiSending}
                        className="rounded-xl border border-slate-200/95 bg-white px-3.5 py-2.5 text-left text-[13px] font-medium text-slate-800 shadow-sm outline-none ring-offset-white transition hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <span className="flex items-center gap-2">
                          <Scale className="h-3.5 w-3.5 shrink-0 text-violet-700" />
                          Help me identify the right clause/liberty
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => void sendQuickStartPrompt('bridge')}
                        disabled={senseiSending}
                        className="rounded-xl border border-slate-200/95 bg-white px-3.5 py-2.5 text-left text-[13px] font-medium text-slate-800 shadow-sm outline-none ring-offset-white transition hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <span className="flex items-center gap-2">
                          <GitCompareArrows className="h-3.5 w-3.5 shrink-0 text-violet-700" />
                          Help me build the bridge sentence
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>

                <div
                  ref={senseiScrollRef}
                  className="min-h-0 flex-1 basis-0 overflow-y-auto overscroll-contain bg-white px-3 pb-8 pt-4"
                >
                  <div className="space-y-4">
                    {senseiMessages.map((m) =>
                      m.role === 'user' ? (
                        <div key={m.id} className="flex w-full flex-col items-end">
                          <div className="max-w-[min(100%,21rem)] rounded-2xl rounded-br-md bg-violet-600 px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm">
                            <p className="whitespace-pre-wrap text-white/95">{m.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div key={m.id} className="flex w-full flex-col items-start">
                          <div className="flex w-full max-w-[min(100%,23rem)] flex-row items-start gap-2 sm:max-w-[min(100%,24rem)]">
                            {senseiAvatar ? (
                              // eslint-disable-next-line @next/next/no-img-element -- match CheatSheetChatBox avatar markup
                              <img
                                src={senseiAvatar}
                                alt=""
                                width={36}
                                height={36}
                                className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                              />
                            ) : null}
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="max-w-none rounded-2xl rounded-bl-md border border-slate-100/90 bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-slate-800 shadow-sm">
                                <SenseiAssistantMarkdown text={m.content} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    {senseiSending ? (
                      <TutorTypingPlaceholder avatarUrl={senseiAvatar} label="Sensei is writing a reply…" />
                    ) : null}
                  </div>
                </div>

                <div className="flex-shrink-0 border-t border-slate-100 bg-white px-3 pb-3 pt-2">
                  <div className="mb-2 flex items-start gap-2">
                    <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    <p className="text-xs font-medium text-slate-600">
                      {senseiQuickStartsHidden
                        ? 'Ask a follow-up below.'
                        : 'Choose an option above or type out your own question to get started.'}
                    </p>
                  </div>
                  <div className="mb-2 flex gap-2">
                    <textarea
                      value={senseiInput}
                      onChange={(e) => setSenseiInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          void sendSenseiMessage();
                        }
                      }}
                      rows={3}
                      placeholder="Type your next FRQ sentence…"
                      disabled={senseiSending}
                      className="min-h-0 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => void sendSenseiMessage()}
                    disabled={senseiSending || !senseiInput.trim()}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-md shadow-violet-900/15 transition-colors hover:bg-violet-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45"
                  >
                    {senseiSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin opacity-95" aria-hidden />
                        Thinking…
                      </>
                    ) : (
                      <>Send</>
                    )}
                  </button>
                </div>
              </div>
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}

