'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { TutorAssistantMarkdown } from '@/components/TutorAssistantMarkdown';
import type { CourseSubject } from '@/lib/courseSubject';
import { displayCourseLabel } from '@/lib/courseSubject';
import { personaForSubject, tutorWelcomeOpening } from '@/lib/chatPersonas';
import { tutorAvatarUrl } from '@/lib/tutorAvatar';
import { TutorTypingPlaceholder } from '@/components/TutorTypingPlaceholder';
import { useAuthContext } from '@/contexts/AuthContext';
import { auth as firebaseAuth } from '@/lib/firebase';
import { hasAdminRole } from '@/lib/adminAccess';
import {
  buildFrqTutorContextPayload,
  type DisplayFrqForTutor,
} from '@/lib/frqTutorContext';

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

  while (raw.length > 0 && raw[0].role !== 'user') raw.shift();

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
      accentSoft: 'bg-sky-500',
      sendBtn:
        'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-900/15 focus-visible:outline focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-900/25 ring-1 ring-white/25',
      inputFocus: 'focus:border-sky-400 focus:ring-sky-500/20',
      quickChoiceFocus: 'focus-visible:ring-sky-500',
    };
  }
  if (subject === 'micro') {
    return {
      accentSoft: 'bg-emerald-500',
      sendBtn:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/15 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/25 ring-1 ring-white/25',
      inputFocus: 'focus:border-emerald-400 focus:ring-emerald-500/20',
      quickChoiceFocus: 'focus-visible:ring-emerald-500',
    };
  }
  return {
    accentSoft: 'bg-violet-500',
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
      <p className="mb-2 text-xs font-black tracking-tight text-slate-500">Tap a next step</p>
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

function buildFrqTutorWelcome(
  persona: ReturnType<typeof personaForSubject>,
  frqTitle: string
): ChatMessage[] {
  const opening = tutorWelcomeOpening(persona, 'frq');
  const chips: { label: string; prompt: string }[] = [
    {
      label: 'What is this asking?',
      prompt: `[FRQ tutor]\nWalk me through the **prompt and each part**: task verbs, what graders look for, and how the rubric is written in the bank context.`,
    },
    {
      label: 'Graph / drawing help',
      prompt: `[FRQ tutor]\nGive me a **checklist** for the drawing parts here (axes, curves, labels, equilibrium) using the rubric and any reference image paths in context.`,
    },
    {
      label: 'Improve my answer',
      prompt: `[FRQ tutor]\nI'll describe or paste what I wrote. **Stress-test it** against the rubric—what should I add or fix first?`,
    },
  ];
  return [
    {
      id: 'welcome',
      role: 'assistant',
      content:
        `**${opening}**\n\nYou're on **${frqTitle}**. Where should we start?` + buildChoicesBlock(chips),
    },
  ];
}

export interface FrqPracticeChatFabProps {
  subject: Extract<CourseSubject, 'macro' | 'micro'>;
  unitTitle: string;
  frqQuestion: DisplayFrqForTutor;
  onOpenChange?: (open: boolean) => void;
}

export function FrqPracticeChatFab({
  subject,
  unitTitle,
  frqQuestion,
  onOpenChange,
}: FrqPracticeChatFabProps) {
  const { user, userData } = useAuthContext();
  const canUseAdminChat = Boolean(user && hasAdminRole(userData));
  const persona = personaForSubject(subject);
  const subjectLabel = displayCourseLabel(subject);
  const theme = chatTheme(subject);
  const unitNumber = frqQuestion.unit;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    buildFrqTutorWelcome(persona, frqQuestion.title)
  );
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    setMessages(buildFrqTutorWelcome(personaForSubject(subject), frqQuestion.title));
    setInput('');
  }, [frqQuestion.id, subject]);

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

  const frqContextPayload = useMemo(
    () => buildFrqTutorContextPayload(frqQuestion),
    [frqQuestion]
  );

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
            unitTitle: unitTitle || undefined,
            messages: [...prior, { role: 'user', content: outbound }],
            frqContext: frqContextPayload,
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
    [frqContextPayload, sending, subject, unitNumber, unitTitle]
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
      void sendTurn(displayLabel, prompt);
    },
    [sendTurn]
  );

  const canSendOptional = input.trim().length > 0 && !sending;

  if (!canUseAdminChat) return null;

  return (
    <div
      className="fixed z-[105] flex flex-col items-end gap-3 print:hidden"
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      {open && (
        <div
          role="dialog"
          aria-label="FRQ tutor"
          className="pointer-events-auto relative flex h-[min(720px,88vh)] max-h-[88vh] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/[0.04] backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close FRQ tutor"
            title="Close chat"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <div className="relative flex-shrink-0 border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white px-4 py-3.5">
            <div className={`absolute left-0 top-0 h-0.5 w-full ${theme.accentSoft} opacity-90`} aria-hidden />
            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                FRQ practice tutor (full rubric context)
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
                const showChoices =
                  m.role === 'assistant' &&
                  parsedAssistant &&
                  parsedAssistant.choices.length > 0 &&
                  m.id === lastAssistantId &&
                  !(m.id === 'welcome' && hasUserMessage);
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
                          alt=""
                          width={36}
                          height={36}
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                      ) : null}
                      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
                        <div className="max-w-none px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm rounded-2xl rounded-bl-md border border-slate-100/90 bg-white text-slate-800">
                          {parsedAssistant ? (
                            assistantLead ? (
                              <TutorAssistantMarkdown
                                text={assistantLead}
                                className="tutor-markdown text-slate-700 font-semibold [&_strong]:font-black [&_strong]:text-slate-900 [&_b]:font-black [&_b]:text-slate-900 [&_em]:italic [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_.katex]:text-inherit"
                              />
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
              placeholder="Ask about this FRQ…"
              className={`mb-2 min-h-0 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 disabled:opacity-60 ${theme.inputFocus}`}
            />
            <button
              type="button"
              onClick={sendOptionalNote}
              disabled={!canSendOptional}
              className={`flex h-9 w-full items-center justify-center gap-2 rounded-xl text-sm font-black transition-colors disabled:pointer-events-none disabled:opacity-45 ${theme.sendBtn}`}
            >
              <Send className="h-3.5 w-3.5 opacity-95" strokeWidth={2} />
              {sending ? 'Thinking…' : 'Send'}
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
          aria-label="Open FRQ tutor"
          title="FRQ tutor (full rubric context)"
        >
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-full bg-white/15 ring-1 ring-white/30"
          />
          {tutorAvatarUrl(subject) ? (
            <img
              src={tutorAvatarUrl(subject)!}
              alt=""
              className="relative h-[84%] w-[84%] rounded-full object-cover ring-2 ring-white/80 shadow-sm"
            />
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
