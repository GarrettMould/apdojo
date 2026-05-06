'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import { displayCourseLabel } from '@/lib/courseSubject';
import { personaForSubject } from '@/lib/chatPersonas';
import type { Question } from '@/data/questionBanks/types';

type Role = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  outboundContent?: string;
}

const CHOICES_START = '[[CHOICES]]';
const CHOICES_END = '[[/CHOICES]]';

function buildChoicesBlock(choices: readonly { label: string; prompt: string }[]): string {
  const lines = choices.map((c) => `${c.label}|${c.prompt}`).join('\n');
  return `\n\n${CHOICES_START}\n${lines}\n${CHOICES_END}`;
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
  return (
    `[Guided MCQ tutor]\n` +
    `The learner tapped **choice ${letter}** as something that doesn't fully make sense.\n\n` +
    `Full text of ${letter}: ${optionText}\n\n` +
    `${spoilerGuardNote(answered, selectedLetter)}\n\n` +
    `Lead them: restate what ${letter} is claiming in plain language, then ONE concrete step toward resolving it. ` +
    `Stay on this item only. End with [[CHOICES]] per system rules.`
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

export function buildMcqTutorWelcome(
  persona: ReturnType<typeof personaForSubject>,
  q: Question,
  ctx: { answered: boolean; selectedLetter?: string }
): ChatMessage[] {
  const chips: { label: string; prompt: string }[] = [];
  for (let i = 0; i < q.options.length; i++) {
    const L = String.fromCharCode(65 + i);
    chips.push({
      label: L,
      prompt: buildLetterOutbound(L, q.options[i], ctx.answered, ctx.selectedLetter),
    });
  }

  const intro =
    `**Adam Smith, here to guide you.**\n\n` +
    `**Can you identify any answer options that we can eliminate?** Tap **A–${String.fromCharCode(64 + q.options.length)}**. ` +
    `Just tap the option letter you want to examine first.`;

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
}

export function McqQuestionTutorFab({
  subject,
  unitTitle,
  question,
  selectedLetter,
  answered,
  splitScreenOnDesktop = false,
  onOpenChange,
}: McqQuestionTutorFabProps) {
  const persona = personaForSubject(subject);
  const subjectLabel = displayCourseLabel(subject);
  const theme = chatTheme(subject);
  const unitNumber = question.unit;

  const [open, setOpen] = useState(false);
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
  }, [messages, open]);

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

  const sendTurn = useCallback(
    async (displayText: string, outboundText?: string) => {
      const outbound = (outboundText ?? displayText).trim();
      const display = displayText.trim();
      if (!outbound || sending) return;

      const prior = messagesRef.current
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.role === 'user' ? (m.outboundContent ?? m.content) : m.content,
        }));

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
        const res = await fetch('/api/cheat-sheet-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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

  const onPickChoice = useCallback(
    (prompt: string, displayLabel: string) => {
      void sendTurn(displayLabel, prompt);
    },
    [sendTurn]
  );

  const canSendOptional = input.trim().length > 0 && !sending;

  return (
    <div
      className="fixed z-[105] flex flex-col items-start gap-3 print:hidden"
      style={
        open && splitScreenOnDesktop
          ? {
              left: 'max(0.75rem, env(safe-area-inset-left))',
              bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
              top: 'max(0.75rem, env(safe-area-inset-top))',
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
          className={`pointer-events-auto flex h-[min(720px,88vh)] max-h-[88vh] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/[0.04] backdrop-blur-md ${
            splitScreenOnDesktop
              ? 'lg:h-full lg:max-h-none lg:w-[25vw] lg:min-w-[320px] lg:rounded-xl'
              : ''
          }`}
        >
          <div className="relative flex-shrink-0 border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white px-4 py-3.5">
            <div className={`absolute left-0 top-0 h-0.5 w-full ${theme.accentSoft} opacity-90`} aria-hidden />
            <div className="flex items-start gap-3 pt-0.5">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl ${theme.accentMuted} shadow-sm`}
              >
                <Sparkles className={`h-5 w-5 ${theme.accent}`} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
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
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/70 px-3 py-4">
            <div className="space-y-4">
              {messages.map((m) => {
                const parsedAssistant =
                  m.role === 'assistant' ? parseAssistantReply(m.content) : null;
                const showChoices =
                  m.role === 'assistant' &&
                  parsedAssistant &&
                  parsedAssistant.choices.length > 0 &&
                  m.id === lastAssistantId;
                const assistantLead = parsedAssistant?.display.trim() ?? '';

                return (
                  <div
                    key={m.id}
                    className={`flex w-full flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[min(100%,20rem)] px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                        m.role === 'user'
                          ? 'rounded-2xl rounded-br-md bg-slate-700 text-white'
                          : 'rounded-2xl rounded-bl-md border border-slate-100/90 bg-white text-slate-800'
                      }`}
                    >
                      {m.role === 'assistant' && parsedAssistant ? (
                        assistantLead ? (
                          <AssistantMarkdown text={assistantLead} />
                        ) : parsedAssistant.choices.length > 0 ? (
                          <p className="text-sm text-slate-500">Choose a step —</p>
                        ) : (
                          <p className="text-sm text-slate-500">—</p>
                        )
                      ) : m.role === 'user' ? (
                        <p className="whitespace-pre-wrap text-white/95 font-semibold">{m.content}</p>
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
                );
              })}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-slate-100 bg-white px-3 pb-3 pt-2">
            <p className="mb-1.5 text-[11px] font-black text-slate-500">
              Optional note <span className="font-normal text-slate-400">(only if you need one short aside)</span>
            </p>
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
              placeholder="Mostly tap the tutor’s buttons above…"
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

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:brightness-105 active:scale-[0.97] sm:h-[3.25rem] sm:w-[3.25rem] ${theme.fab}`}
        aria-expanded={open}
        aria-label={open ? 'Close question tutor' : 'Open question tutor'}
        title="Guided help for this question"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
