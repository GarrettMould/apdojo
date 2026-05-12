'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, X } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import { displayCourseLabel } from '@/lib/courseSubject';
import { personaForSubject } from '@/lib/chatPersonas';
import { tutorAvatarUrl } from '@/lib/tutorAvatar';
import type { Question } from '@/data/questionBanks/types';
import { TutorTypingPlaceholder } from '@/components/TutorTypingPlaceholder';
import { useAuthContext } from '@/contexts/AuthContext';
import { auth as firebaseAuth } from '@/lib/firebase';
import { hasAdminRole } from '@/lib/adminAccess';

type Role = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  outboundContent?: string;
}

function toApiTurns(messages: ChatMessage[]): Array<{ role: Role; content: string }> {
  const raw = messages
    .filter((m) => m.id !== 'welcome')
    .map((m) => ({
      role: m.role,
      content: m.role === 'user' ? (m.outboundContent ?? m.content) : m.content,
    }));

  // Ensure the sequence starts with user turns for the backend validator.
  while (raw.length > 0 && raw[0].role !== 'user') raw.shift();

  // Enforce strict alternation by keeping only the latest message
  // when multiple consecutive messages have the same role.
  const normalized: Array<{ role: Role; content: string }> = [];
  for (const turn of raw) {
    const prev = normalized[normalized.length - 1];
    if (prev && prev.role === turn.role) {
      normalized[normalized.length - 1] = turn;
    } else {
      normalized.push(turn);
    }
  }

  return normalized;
}

const CHOICES_START = '[[CHOICES]]';
const CHOICES_END = '[[/CHOICES]]';
const PROMPT_PICK_OPTION = '__PICK_OPTION__';
const PROMPT_PICK_KEY_TERM = '__PICK_KEY_TERM__';

function buildChoicesBlock(choices: readonly { label: string; prompt: string }[]): string {
  const lines = choices.map((c) => `${c.label}|${c.prompt}`).join('\n');
  return `\n\n${CHOICES_START}\n${lines}\n${CHOICES_END}`;
}

/** 0 = welcome, 1 = second assistant (e.g. option/term picker or first API reply) — only those may show [[CHOICES]] UI. */
function assistantMessageIndex(messages: ChatMessage[], messageId: string): number {
  let idx = -1;
  for (const m of messages) {
    if (m.role !== 'assistant') continue;
    idx += 1;
    if (m.id === messageId) return idx;
  }
  return -1;
}

function parseAssistantReply(raw: string): {
  display: string;
  choices: { label: string; prompt: string }[];
} {
  const start = raw.indexOf(CHOICES_START);
  if (start === -1) {
    return { display: raw.trimEnd(), choices: [] };
  }

  const display = raw.slice(0, start).trimEnd();
  const rest = raw.slice(start + CHOICES_START.length);
  const end = rest.indexOf(CHOICES_END);
  const block = (end === -1 ? rest : rest.slice(0, end)).trim();

  const choices: { label: string; prompt: string }[] = [];
  for (const line of block.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    const pipe = t.indexOf('|');
    if (pipe <= 0) continue;
    const label = t.slice(0, pipe).trim();
    const prompt = t.slice(pipe + 1).trim();
    if (label && prompt) choices.push({ label, prompt });
  }

  return { display, choices };
}

type ChatTheme = ReturnType<typeof chatTheme>;

function chatTheme(subject: CourseSubject) {
  if (subject === 'macro') {
    return {
      accent: 'text-sky-700',
      accentSoft: 'bg-sky-500',
      accentMuted: 'bg-sky-50 text-sky-950',
      userBubble: 'bg-sky-600 text-white',
      sendBtn:
        'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-900/15 focus-visible:outline focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-900/25 ring-1 ring-white/25',
      inputFocus: 'focus:border-sky-400 focus:ring-sky-500/20',
      quickChoiceFocus: 'focus-visible:ring-sky-500',
    };
  }
  if (subject === 'micro') {
    return {
      accent: 'text-emerald-700',
      accentSoft: 'bg-emerald-500',
      accentMuted: 'bg-emerald-50 text-emerald-950',
      userBubble: 'bg-emerald-600 text-white',
      sendBtn:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/15 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/25 ring-1 ring-white/25',
      inputFocus: 'focus:border-emerald-400 focus:ring-emerald-500/20',
      quickChoiceFocus: 'focus-visible:ring-emerald-500',
    };
  }
  return {
    accent: 'text-violet-700',
    accentSoft: 'bg-violet-500',
    accentMuted: 'bg-violet-50 text-violet-950',
    userBubble: 'bg-violet-600 text-white',
    sendBtn:
      'bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-900/15 focus-visible:outline focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
    fab: 'bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/25 ring-1 ring-white/25',
    inputFocus: 'focus:border-violet-400 focus:ring-violet-500/20',
    quickChoiceFocus: 'focus-visible:ring-violet-500',
  };
}

function QuickChoiceGrid({
  choices,
  sending,
  onPick,
  theme,
}: {
  choices: { label: string; prompt: string }[];
  sending: boolean;
  onPick: (prompt: string, displayLabel: string) => void;
  theme: ChatTheme;
}) {
  return (
    <div className="mt-3 w-full max-w-[min(100%,22rem)]">
      <p className="mb-2 text-xs font-black tracking-tight text-slate-500">
        Tap a next step
      </p>
      <div className="flex flex-wrap gap-2">
        {choices.map((c, i) => (
          <button
            key={`${c.label}-${i}`}
            type="button"
            disabled={sending}
            onClick={() => onPick(c.prompt, c.label)}
            className={`min-h-[2.5rem] rounded-xl border border-slate-200/95 bg-white px-3 py-2 text-center text-[13px] font-black text-slate-800 shadow-sm outline-none ring-offset-white transition hover:bg-slate-50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.99] ${theme.quickChoiceFocus}`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function sanitizeTutorMarkdownAsteriskLookalikes(raw: string): string {
  return raw.replace(/[\uFF0A\u2217\u204E\uFE61\u2731]/g, '*');
}

function AssistantMarkdown({ text }: { text: string }) {
  return (
    <div className="tutor-markdown text-slate-700 font-semibold [&_strong]:font-black [&_strong]:text-slate-900 [&_b]:font-black [&_b]:text-slate-900 [&_em]:italic [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 whitespace-pre-wrap last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-0.5 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-0.5 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-snug">{children}</li>,
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[13px] text-slate-800">
              {children}
            </code>
          ),
        }}
      >
        {sanitizeTutorMarkdownAsteriskLookalikes(text)}
      </ReactMarkdown>
    </div>
  );
}

function spoilerGuardNote(answered: boolean, selectedLetter: string | undefined): string {
  return answered
    ? `They have already submitted an answer for this screen${
        selectedLetter ? ` (${selectedLetter})` : ''
      }. You may confirm correctness when it helps learning and explain why.`
    : `They have NOT submitted their final answer on the practice screen yet. Do not reveal or strongly imply which option is keyed correct; focus on concepts and unpacking distractors.`;
}

function buildLetterOutbound(
  letter: string,
  optionText: string,
  answered: boolean,
  selectedLetter: string | undefined
): string {
  const trimmed = optionText.trim();
  return (
    `[Guided MCQ tutor]\n` +
    `The learner tapped **choice ${letter}** to break it down.\n\n` +
    `**Verbatim text of (${letter})** (this is what you must analyze first—do not skip it or replace it with a generic stem recap):\n` +
    `"""${trimmed}"""\n\n` +
    `${spoilerGuardNote(answered, selectedLetter)}\n\n` +
    `**Required opening move:** In your first substantive paragraph, name **(${letter})** and explain what **this option's wording** is asserting (you may quote a short clause from the text above). Only after that, tie it to the stem or relevant doctrine.\n` +
    `Stay on (${letter}) until the student changes topic. End with [[CHOICES]] per system rules.`
  );
}

function buildStemOutbound(answered: boolean, selectedLetter: string | undefined): string {
  return (
    `[Guided MCQ tutor]\n` +
    `The learner is confused about the **stem / question wording**, not a single letter yet.\n\n` +
    `${spoilerGuardNote(answered, selectedLetter)}\n\n` +
    `Walk them through what the prompt is really asking (keywords, task verb, what evidence matters). ` +
    `Do not spoil the keyed answer if they have not submitted. End with [[CHOICES]].`
  );
}

function buildAllOutbound(answered: boolean, selectedLetter: string | undefined): string {
  return (
    `[Guided MCQ tutor]\n` +
    `Every option still sounds plausible—they need a **narrowing strategy** for this stem.\n\n` +
    `${spoilerGuardNote(answered, selectedLetter)}\n\n` +
    `Lead with one organizing frame (e.g. rule → apply, graph read, time order, definition gate). ` +
    `End with [[CHOICES]].`
  );
}

function buildKeyTermOutbound(
  term: string,
  answered: boolean,
  selectedLetter: string | undefined
): string {
  return (
    `[Guided MCQ tutor]\n` +
    `The learner wants to unpack this key term from the current question: **${term}**.\n\n` +
    `${spoilerGuardNote(answered, selectedLetter)}\n\n` +
    `Define the term in plain AP-level language, then connect it directly to this exact item and how it helps eliminate or support options. ` +
    `Stay on this item only. End with [[CHOICES]] per system rules.`
  );
}

function extractKeyTermsFromStem(stem: string, maxTerms = 6): string[] {
  const stop = new Set([
    'which', 'what', 'when', 'where', 'why', 'how', 'that', 'this', 'these', 'those', 'with', 'from',
    'into', 'about', 'after', 'before', 'under', 'over', 'between', 'among', 'through', 'during',
    'because', 'while', 'would', 'could', 'should', 'their', 'there', 'they', 'them', 'than', 'then',
    'have', 'has', 'had', 'were', 'was', 'been', 'being', 'your', 'you', 'students', 'student', 'most',
    'least', 'best', 'except', 'following', 'according', 'each', 'many', 'some', 'more', 'less', 'only',
    'also', 'into', 'onto', 'upon', 'such', 'used', 'using', 'use', 'show', 'shows', 'shown', 'likely',
    'main', 'primarily', 'generally', 'policy', 'policies', 'government', 'economy', 'economic', 'market',
    'markets', 'answer', 'option', 'question', 'correct', 'incorrect', 'unit', 'course', 'ap'
  ]);
  const tokens = stem
    .replace(/[^A-Za-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => ({ raw, key: raw.toLowerCase() }));

  const out: string[] = [];
  const seen = new Set<string>();
  const push = (t: string) => {
    const key = t.toLowerCase().trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(t.trim());
  };

  for (let i = 0; i < tokens.length - 1 && out.length < maxTerms; i++) {
    const a = tokens[i];
    const b = tokens[i + 1];
    if (a.key.length < 4 || b.key.length < 4) continue;
    if (stop.has(a.key) || stop.has(b.key)) continue;
    push(`${a.raw} ${b.raw}`);
  }

  for (const t of tokens) {
    if (out.length >= maxTerms) break;
    if (t.key.length < 4 || stop.has(t.key) || /^\d+$/.test(t.key)) continue;
    push(t.raw);
  }

  return out;
}

export function buildMcqTutorWelcome(
  persona: ReturnType<typeof personaForSubject>,
  q: Question,
  ctx: { answered: boolean; selectedLetter?: string }
): ChatMessage[] {
  const firstLetter = 'A';
  const firstOption = q.options[0] ?? '(no option text available)';
  const personaOpening =
    persona.name === 'Adam Smith'
      ? 'Adam Smith here, brought to you by the invisible hand.'
      : `${persona.name} here, ready to reason this out with you.`;
  const chips: { label: string; prompt: string }[] = [
    {
      label: 'Explain one of the answer options',
      prompt: PROMPT_PICK_OPTION,
    },
    {
      label: 'Explain one of the key terms',
      prompt: PROMPT_PICK_KEY_TERM,
    },
  ];

  const intro =
    `**${personaOpening}**\n\n` +
    `How can I help you think through this question?`;

  return [
    {
      id: 'welcome',
      role: 'assistant',
      content: intro + buildChoicesBlock(chips),
    },
  ];
}

export interface McqQuestionTutorFabProps {
  /** Persona + palette: derived from the question when possible (`courseSubjectFromQuestionSubject`). */
  subject: CourseSubject;
  unitTitle: string;
  question: Question;
  selectedLetter?: string;
  answered: boolean;
  splitScreenOnDesktop?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Increment whenever another surface (e.g. scratch pad) opens — forces this panel closed. */
  externalCloseRequest?: number;
}

export function McqQuestionTutorFab({
  subject,
  unitTitle,
  question,
  selectedLetter,
  answered,
  splitScreenOnDesktop = false,
  onOpenChange,
  externalCloseRequest = 0,
}: McqQuestionTutorFabProps) {
  const { user, userData } = useAuthContext();
  const canUseAdminChat = Boolean(user && hasAdminRole(userData));
  const persona = personaForSubject(subject);
  const subjectLabel = displayCourseLabel(subject);
  const theme = chatTheme(subject);
  const unitNumber = question.unit;

  const [open, setOpen] = useState(false);
  const lastExternalCloseRef = useRef(externalCloseRequest);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    buildMcqTutorWelcome(persona, question, { answered, selectedLetter })
  );
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    setMessages(buildMcqTutorWelcome(personaForSubject(subject), question, { answered, selectedLetter }));
    setInput('');
  }, [question.id, subject, answered, selectedLetter]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, sending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (externalCloseRequest === lastExternalCloseRef.current) return;
    lastExternalCloseRef.current = externalCloseRequest;
    setOpen(false);
  }, [externalCloseRequest]);

  const mcqContext = useMemo(
    () => ({
      questionId: question.id,
      stem: question.question,
      options: question.options.map((text, i) => ({
        letter: String.fromCharCode(65 + i),
        text,
      })),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation ?? '',
      unitNameFromQuestion: question.unitName,
      selectedLetter: selectedLetter ?? null,
      hasSubmittedAnswer: answered,
    }),
    [question, selectedLetter, answered]
  );
  const optionPickerChoices = useMemo(
    () =>
      question.options.map((text, i) => {
        const letter = String.fromCharCode(65 + i);
        return {
          label: `${letter}`,
          prompt: buildLetterOutbound(letter, text, answered, selectedLetter),
        };
      }),
    [question.options, answered, selectedLetter]
  );
  const keyTermPickerChoices = useMemo(() => {
    const terms = extractKeyTermsFromStem(question.question, 6);
    if (terms.length === 0) {
      return [
        {
          label: 'Question wording',
          prompt: buildStemOutbound(answered, selectedLetter),
        },
      ];
    }
    return terms.map((term) => ({
      label: term,
      prompt: buildKeyTermOutbound(term, answered, selectedLetter),
    }));
  }, [question.question, answered, selectedLetter]);

  const sendTurn = useCallback(
    async (displayText: string, outboundText?: string) => {
      const outbound = (outboundText ?? displayText).trim();
      const display = displayText.trim();
      if (!outbound || sending) return;

      const prior = toApiTurns(messagesRef.current);

      const userId = `u-${Date.now()}`;
      const needsOutbound = outbound !== display;
      setMessages((prev) => [
        ...prev,
        {
          id: userId,
          role: 'user',
          content: display,
          ...(needsOutbound ? { outboundContent: outbound } : {}),
        },
      ]);
      setInput('');
      setSending(true);

      try {
        const token = await firebaseAuth.currentUser?.getIdToken();
        const res = await fetch('/api/cheat-sheet-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            subject,
            unitNumber,
            unitTitle: unitTitle || question.unitName,
            messages: [...prior, { role: 'user', content: outbound }],
            mcqContext,
          }),
        });
        const data = (await res.json()) as { reply?: string; error?: string };
        const reply =
          res.ok && data.reply?.trim()
            ? data.reply.trim()
            : `Something went wrong: ${data.error || res.statusText || 'try again shortly.'}`;
        setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: 'Could not reach the tutor. Check your connection and try again.',
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [mcqContext, sending, subject, unitNumber, unitTitle, question.unitName]
  );

  const sendOptionalNote = useCallback(() => {
    const t = input.trim();
    if (!t || sending) return;
    void sendTurn(t);
  }, [input, sendTurn, sending]);

  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return messages[i].id;
    }
    return null;
  }, [messages]);
  const hasUserMessage = useMemo(() => messages.some((m) => m.role === 'user'), [messages]);

  const onPickChoice = useCallback(
    (prompt: string, displayLabel: string) => {
      if (prompt === PROMPT_PICK_OPTION) {
        const assistantText =
          `Great — let’s zoom in on one answer option first.\n\n` +
          `Which option do you want to break down?` +
          buildChoicesBlock(optionPickerChoices);
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', content: assistantText },
        ]);
        return;
      }
      if (prompt === PROMPT_PICK_KEY_TERM) {
        const assistantText =
          `Nice move — focusing on a key term usually clears up the whole item.\n\n` +
          `Which term should we unpack?` +
          buildChoicesBlock(keyTermPickerChoices);
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', content: assistantText },
        ]);
        return;
      }
      void sendTurn(displayLabel, prompt);
    },
    [sendTurn, optionPickerChoices, keyTermPickerChoices]
  );

  const canSendOptional = input.trim().length > 0 && !sending;

  if (!canUseAdminChat) return null;

  return (
    <div
      className="fixed z-[105] flex flex-col items-start gap-3 print:hidden"
      style={
        open && splitScreenOnDesktop
          ? {
              left: 'max(0.75rem, env(safe-area-inset-left))',
              bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
              // Keep tutor panel below the fixed site header stack.
              top: 'calc(80px + max(0.5rem, env(safe-area-inset-top)))',
            }
          : {
              left: 'max(1rem, env(safe-area-inset-left))',
              bottom: 'max(1rem, env(safe-area-inset-bottom))',
            }
      }
    >
      {open && (
        <div
          role="dialog"
          aria-label="Question tutor"
          className={`pointer-events-auto relative flex h-[min(720px,88vh)] max-h-[88vh] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/[0.04] backdrop-blur-md ${
            splitScreenOnDesktop
              ? 'lg:h-full lg:max-h-none lg:w-[25vw] lg:min-w-[300px] lg:rounded-xl'
              : ''
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close question tutor"
            title="Close chat"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <div className="relative flex-shrink-0 border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white px-4 py-3.5">
            <div className={`absolute left-0 top-0 h-0.5 w-full ${theme.accentSoft} opacity-90`} aria-hidden />
            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Guided — this question
              </p>
              <p className="truncate text-[15px] font-black tracking-tight text-slate-900">
                {persona.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                Unit {unitNumber}
                {unitTitle ? ` · ${unitTitle}` : ''} · {subjectLabel}
              </p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/70 px-3 py-4">
            <div className="space-y-4">
              {messages.map((m) => {
                const parsedAssistant =
                  m.role === 'assistant' ? parseAssistantReply(m.content) : null;
                const assistantIdx =
                  m.role === 'assistant' ? assistantMessageIndex(messages, m.id) : -1;
                /** Only the first two assistant surfaces (welcome + one follow-up) may show tap suggestions. */
                const showChoices =
                  m.role === 'assistant' &&
                  parsedAssistant &&
                  parsedAssistant.choices.length > 0 &&
                  m.id === lastAssistantId &&
                  !(m.id === 'welcome' && hasUserMessage) &&
                  assistantIdx >= 0 &&
                  assistantIdx < 2;
                const assistantLead = parsedAssistant?.display.trim() ?? '';
                const avatarUrl = tutorAvatarUrl(subject);

                if (m.role === 'user') {
                  return (
                    <div key={m.id} className="flex w-full flex-col items-end">
                      <div className="max-w-[min(100%,20rem)] px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm rounded-2xl rounded-br-md bg-slate-700 text-white">
                        <p className="whitespace-pre-wrap text-white/95 font-semibold">{m.content}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="flex w-full flex-col items-start">
                    <div className="flex w-full max-w-[min(100%,22rem)] flex-row items-start gap-2 sm:max-w-[min(100%,23rem)]">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Economics tutor"
                          width={36}
                          height={36}
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                      ) : null}
                      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
                        <div className="max-w-none px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm rounded-2xl rounded-bl-md border border-slate-100/90 bg-white text-slate-800">
                          {parsedAssistant ? (
                            assistantLead ? (
                              <AssistantMarkdown text={assistantLead} />
                            ) : parsedAssistant.choices.length > 0 ? (
                              <p className="text-sm text-slate-500">Choose a step —</p>
                            ) : (
                              <p className="text-sm text-slate-500">—</p>
                            )
                          ) : null}
                        </div>
                        {showChoices ? (
                          <QuickChoiceGrid
                            choices={parsedAssistant!.choices}
                            sending={sending}
                            onPick={onPickChoice}
                            theme={theme}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
              {sending ? (
                <TutorTypingPlaceholder avatarUrl={tutorAvatarUrl(subject)} />
              ) : null}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-slate-100 bg-white px-3 pb-3 pt-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendOptionalNote();
                }
              }}
              disabled={sending}
              rows={2}
              placeholder="Type your message..."
              className={`mb-2 min-h-0 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 disabled:opacity-60 ${theme.inputFocus}`}
            />
            <button
              type="button"
              onClick={sendOptionalNote}
              disabled={!canSendOptional}
              className={`flex h-9 w-full items-center justify-center gap-2 rounded-xl text-sm font-black transition-colors disabled:pointer-events-none disabled:opacity-45 ${theme.sendBtn}`}
            >
              <Send className="h-3.5 w-3.5 opacity-95" strokeWidth={2} />
              {sending ? 'Thinking…' : 'Send note'}
            </button>
          </div>
        </div>
      )}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:brightness-105 active:scale-[0.97] sm:h-[3.25rem] sm:w-[3.25rem] ${theme.fab}`}
          aria-expanded={false}
          aria-label="Open question tutor"
          title="Guided help for this question"
        >
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-full bg-white/15 ring-1 ring-white/30"
          />
          {tutorAvatarUrl(subject) ? (
            <img
              src={tutorAvatarUrl(subject)!}
              alt="Open question tutor"
              className="relative h-[84%] w-[84%] rounded-full object-cover ring-2 ring-white/80 shadow-sm"
            />
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
