'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paperclip, BrainCircuit, Send, X } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import { displayCourseLabel } from '@/lib/courseSubject';
import { personaForSubject } from '@/lib/chatPersonas';
import { econTutorAvatarUrl } from '@/lib/tutorAvatar';
import { getTutorWelcomeStarterChoices } from '@/lib/tutorStarterChoices';
import { useAuthContext } from '@/contexts/AuthContext';
import { auth as firebaseAuth } from '@/lib/firebase';
import { hasAdminRole } from '@/lib/adminAccess';

type Role = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: Role;
  /** Text shown in the bubble */
  content: string;
  /** Full user text sent to the model (when different from `content`, e.g. pasted file body) */
  outboundContent?: string;
  /** Subtitle under user bubble when a file was included */
  attachmentHint?: string;
}

type PendingAttachment =
  | {
      kind: 'binary';
      fileName: string;
      mimeType: string;
      base64: string;
    }
  | {
      kind: 'text';
      fileName: string;
      text: string;
    };

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const MAX_TEXT_FROM_FILE = 24_000;

const ACCEPT_ATTR =
  'image/jpeg,image/png,image/webp,image/gif,application/pdf,.pdf,.txt,.md,text/plain,text/markdown';

function guessMime(file: File): string {
  if (file.type && file.type !== '') return file.type;
  const lower = file.name.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.txt')) return 'text/plain';
  if (lower.endsWith('.md')) return 'text/markdown';
  return 'image/jpeg';
}

function readAttachment(file: File): Promise<PendingAttachment | { error: string }> {
  return new Promise((resolve) => {
    if (file.size > MAX_UPLOAD_BYTES) {
      resolve({ error: `File is too large (max ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB).` });
      return;
    }

    const mime = guessMime(file);

    if (
      mime === 'text/plain' ||
      mime === 'text/markdown' ||
      mime.endsWith('markdown') ||
      file.name.toLowerCase().endsWith('.txt') ||
      file.name.toLowerCase().endsWith('.md')
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const text =
          typeof reader.result === 'string'
            ? reader.result.slice(0, MAX_TEXT_FROM_FILE)
            : '';
        if (!text.trim()) {
          resolve({ error: 'That file appears empty.' });
          return;
        }
        resolve({
          kind: 'text',
          fileName: file.name,
          text,
        });
      };
      reader.onerror = () => resolve({ error: 'Could not read file.' });
      reader.readAsText(file);
      return;
    }

    const allowedBinary = new Set([
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf',
    ]);
    if (!allowedBinary.has(mime)) {
      resolve({
        error:
          'Unsupported format. Use an image (JPEG, PNG, WebP, GIF), PDF, or a plain text (.txt / .md) file.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result;
      if (typeof raw !== 'string') {
        resolve({ error: 'Could not read file.' });
        return;
      }
      const comma = raw.indexOf(',');
      const base64 = comma >= 0 ? raw.slice(comma + 1) : raw;
      if (!base64) {
        resolve({ error: 'Could not read file.' });
        return;
      }
      resolve({
        kind: 'binary',
        fileName: file.name,
        mimeType: mime,
        base64,
      });
    };
    reader.onerror = () => resolve({ error: 'Could not read file.' });
    reader.readAsDataURL(file);
  });
}

/** Per-course palette: calm surfaces + one clear accent (no harsh black outlines). */
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
      attachBtn:
        'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-sky-500',
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
      attachBtn:
        'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-emerald-500',
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
    attachBtn:
      'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-violet-500',
    quickChoiceFocus: 'focus-visible:ring-violet-500',
  };
}

export interface CheatSheetChatBoxProps {
  subject: CourseSubject;
  unitNumber: number;
  unitTitle?: string;
  splitScreenOnDesktop?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Fire-and-forget prompt pushed from parent UI actions. */
  externalPromptText?: string;
  /** Optional user-facing bubble text when externalPromptText contains backend-only instructions. */
  externalPromptDisplayText?: string;
  externalPromptNonce?: number;
}

const DEFAULT_ATTACH_PROMPT =
  "I've attached a file. Please relate it to this unit and tell me what stands out for the AP exam.";

/** Model echoes this block; UI strips it and renders buttons instead. */
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

function displayTextForChoiceLabel(label: string): string {
  const t = label.trim();
  if (!t) return 'Please explain this concept.';
  return `Please explain ${t}.`;
}

type ChatThemeReturn = ReturnType<typeof chatTheme>;

function QuickChoiceList({
  choices,
  sending,
  onPick,
  theme,
}: {
  choices: { label: string; prompt: string }[];
  sending: boolean;
  onPick: (prompt: string, label: string) => void;
  theme: ChatThemeReturn;
}) {
  return (
    <div className="mt-3 w-full max-w-[min(100%,21rem)]">
      <p className="mb-2 text-xs font-medium tracking-tight text-slate-500">
        What would you like to do now?
      </p>
      <div className="flex flex-col gap-2">
        {choices.map((c, i) => (
          <button
            key={`${c.label}-${i}`}
            type="button"
            disabled={sending}
            onClick={() => onPick(c.prompt, c.label)}
            className={`rounded-xl border px-3.5 py-2.5 text-left text-[13px] font-medium shadow-sm outline-none ring-offset-white transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 border-slate-200/95 bg-white text-slate-800 hover:bg-slate-50 active:scale-[0.99] ${theme.quickChoiceFocus}`}
          >
            <span className="block">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Floating launcher: refined chat card (soft surfaces, no brutalist frame).
 */
function buildWelcomeThread(
  persona: ReturnType<typeof personaForSubject>,
  subject: CourseSubject,
  unitNumber: number,
  unitTitle: string | undefined,
  subjectLabel: string
): ChatMessage[] {
  const unitLine = `You’re on **Unit ${unitNumber}${unitTitle ? `: ${unitTitle}` : ''}** (${subjectLabel}).`;
  const welcomeBody =
    `**${persona.name}** — Welcome to the Dojo.\n\n` +
    `${unitLine}\n\n` +
    `Tap a topic below to start, or ask your own question. You can also share **photos, PDFs, or text notes**—I’ll tie them to this unit.`;
  const starters = getTutorWelcomeStarterChoices(subject, unitNumber, unitTitle);
  return [
    {
      id: 'welcome',
      role: 'assistant',
      content: welcomeBody + buildChoicesBlock(starters),
    },
  ];
}

export function CheatSheetChatBox({
  subject,
  unitNumber,
  unitTitle,
  splitScreenOnDesktop = false,
  onOpenChange,
  externalPromptText,
  externalPromptDisplayText,
  externalPromptNonce,
}: CheatSheetChatBoxProps) {
  const { user, userData } = useAuthContext();
  const canUseAdminChat = Boolean(user && hasAdminRole(userData));
  const [open, setOpen] = useState(false);
  const subjectLabel = displayCourseLabel(subject);
  const persona = personaForSubject(subject);
  const theme = chatTheme(subject);

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    buildWelcomeThread(persona, subject, unitNumber, unitTitle, subjectLabel)
  );

  useEffect(() => {
    setMessages(
      buildWelcomeThread(
        personaForSubject(subject),
        subject,
        unitNumber,
        unitTitle,
        displayCourseLabel(subject)
      )
    );
  }, [subject, unitNumber, unitTitle]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [pending, setPending] = useState<PendingAttachment | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastExternalPromptNonceRef = useRef<number | null>(null);

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

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setFileError(null);
    const result = await readAttachment(file);
    if ('error' in result) {
      setFileError(result.error);
      return;
    }
    setPending(result);
  };

  const executeSend = useCallback(
    async (
      trimmedInput: string,
      pendingSnap: PendingAttachment | null,
      outboundOverride?: string
    ) => {
      const trimmed = trimmedInput.trim();
      const outboundTrimmed = outboundOverride?.trim() ?? '';
      if ((!trimmed && !pendingSnap && !outboundTrimmed) || sending) return;

      const userId = `u-${Date.now()}`;
    const attachLabel = pendingSnap?.fileName;

    let lastMessageText = outboundTrimmed || trimmed;
    if (pendingSnap?.kind === 'text') {
      lastMessageText = trimmed
        ? `${trimmed}\n\n---\n**Attached:** ${pendingSnap.fileName}\n${pendingSnap.text}`
        : `${DEFAULT_ATTACH_PROMPT}\n\n---\n**Attached:** ${pendingSnap.fileName}\n${pendingSnap.text}`;
    } else if (!trimmed && pendingSnap?.kind === 'binary') {
      lastMessageText = DEFAULT_ATTACH_PROMPT;
    }

    const bubbleText =
      trimmed ||
      (pendingSnap?.kind === 'binary'
        ? DEFAULT_ATTACH_PROMPT
        : pendingSnap?.kind === 'text'
          ? `Attached notes · ${pendingSnap.fileName}`
          : outboundTrimmed);

    const priorTurns = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
        role: m.role,
        content: m.role === 'user' ? (m.outboundContent ?? m.content) : m.content,
      }));
    const apiMessages = [...priorTurns, { role: 'user' as const, content: lastMessageText }];

    const body: Record<string, unknown> = {
      subject,
      unitNumber,
      unitTitle: unitTitle ?? undefined,
      messages: apiMessages,
    };

    if (pendingSnap?.kind === 'binary') {
      body.attachment = {
        mimeType: pendingSnap.mimeType,
        data: pendingSnap.base64,
        fileName: pendingSnap.fileName,
      };
    }

    const needsOutbound =
      pendingSnap != null ||
      bubbleText !== lastMessageText;

    setInput('');
    setPending(null);
    setFileError(null);

    const attachmentHint =
      attachLabel && pendingSnap?.kind === 'binary' ? attachLabel : undefined;

    setMessages((prev) => [
      ...prev,
      {
        id: userId,
        role: 'user',
        content: bubbleText,
        ...(needsOutbound ? { outboundContent: lastMessageText } : {}),
        ...(attachmentHint ? { attachmentHint } : {}),
      },
    ]);

    setSending(true);

    try {
      const token = await firebaseAuth.currentUser?.getIdToken();
      const res = await fetch('/api/cheat-sheet-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        res.ok && data.reply?.trim()
          ? data.reply.trim()
          : `Something went wrong: ${data.error || res.statusText || 'try again shortly.'}`;
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: reply,
        },
      ]);
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
    [messages, sending, subject, unitNumber, unitTitle]
  );

  const handleSend = () => {
    void executeSend(input.trim(), pending);
  };

  const sendChoicePrompt = useCallback(
    (prompt: string, label: string) => {
      void executeSend(displayTextForChoiceLabel(label), null, prompt);
    },
    [executeSend]
  );

  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') return messages[i].id;
    }
    return null;
  }, [messages]);

  const canSend = (input.trim() || pending) && !sending;

  useEffect(() => {
    if (!externalPromptNonce || !externalPromptText?.trim()) return;
    if (lastExternalPromptNonceRef.current === externalPromptNonce) return;
    lastExternalPromptNonceRef.current = externalPromptNonce;
    if (!open) setOpen(true);
    const displayText = externalPromptDisplayText?.trim() || externalPromptText.trim();
    void executeSend(displayText, null, externalPromptText.trim());
  }, [externalPromptNonce, externalPromptText, externalPromptDisplayText, executeSend, open]);

  if (!canUseAdminChat) return null;

  return (
    <div
      className="fixed z-[110] flex flex-col items-end gap-3 print:hidden"
      style={
        open && splitScreenOnDesktop
          ? {
              right: 'max(0.75rem, env(safe-area-inset-right))',
              bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
              top: 'calc(80px + max(0.5rem, env(safe-area-inset-top)))',
            }
          : {
              right: 'max(1rem, env(safe-area-inset-right))',
              bottom: 'max(1rem, env(safe-area-inset-bottom))',
            }
      }
    >
      {open && (
        <div
          role="dialog"
          aria-label="Unit tutor chat"
          className={`pointer-events-auto relative flex h-[min(820px,92vh)] max-h-[92vh] w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/90 bg-white/95 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/[0.04] backdrop-blur-md ${
            splitScreenOnDesktop ? 'lg:h-full lg:max-h-none lg:w-[25vw] lg:min-w-[300px] lg:rounded-xl' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close tutor chat"
            title="Close chat"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          {/* Header */}
          <div className="relative flex-shrink-0 border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white px-4 py-3.5">
            <div className={`absolute left-0 top-0 h-0.5 w-full ${theme.accentSoft} opacity-90`} aria-hidden />
            <div className="min-w-0 pt-0.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Unit tutor
              </p>
              <p className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
                {persona.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                Unit {unitNumber}
                {unitTitle ? ` · ${unitTitle}` : ''} · {subjectLabel}
              </p>
            </div>
          </div>

          {/* Messages */}
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
                const avatarUrl = econTutorAvatarUrl(subject);

                if (m.role === 'user') {
                  return (
                    <div key={m.id} className="flex w-full flex-col items-end">
                      <div
                        className={`max-w-[min(100%,21rem)] px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm ${theme.userBubble} rounded-2xl rounded-br-md`}
                      >
                        <p className="whitespace-pre-wrap text-white/95">{m.content}</p>
                      </div>
                      {m.attachmentHint ? (
                        <p className="mt-1 max-w-[min(100%,21rem)] truncate text-[11px] font-medium text-slate-500">
                          File · {m.attachmentHint}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="flex w-full flex-col items-start">
                    <div className="flex w-full max-w-[min(100%,23rem)] flex-row items-start gap-2 sm:max-w-[min(100%,24rem)]">
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
                              <p className="text-sm text-slate-500">
                                Continue with one of these next steps—
                              </p>
                            ) : (
                              <p className="text-sm text-slate-500">
                                Ask me anything about this unit.
                              </p>
                            )
                          ) : null}
                        </div>
                        {showChoices ? (
                          <QuickChoiceList
                            choices={parsedAssistant!.choices}
                            sending={sending}
                            onPick={sendChoicePrompt}
                            theme={theme}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="flex-shrink-0 border-t border-slate-100 bg-white px-3 pb-3 pt-2">
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              accept={ACCEPT_ATTR}
              onChange={onPickFile}
            />
            {fileError ? (
              <p className="mb-2 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-900">
                {fileError}
              </p>
            ) : null}
            {pending ? (
              <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs text-slate-700">
                <span className="flex min-w-0 items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
                  <span className="truncate font-medium">{pending.fileName}</span>
                  <span className="flex-shrink-0 text-slate-400">
                    {pending.kind === 'text' ? 'Text' : pending.mimeType === 'application/pdf' ? 'PDF' : 'Image'}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPending(null);
                    setFileError(null);
                  }}
                  className="flex-shrink-0 rounded-lg p-1 text-slate-500 hover:bg-slate-200/80 hover:text-slate-800"
                  aria-label="Remove attachment"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}
            <div className="mb-2 flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
                className={`flex h-[5.25rem] w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 text-slate-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 ${theme.attachBtn}`}
                aria-label="Attach file"
                title="Attach image, PDF, or text notes"
              >
                <Paperclip className="h-5 w-5" strokeWidth={2} />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={sending}
                rows={3}
                placeholder="Ask anything, or attach a file first…"
                className={`min-h-0 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 disabled:opacity-60 ${theme.inputFocus}`}
              />
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-45 ${theme.sendBtn}`}
            >
              <Send className="h-4 w-4 opacity-95" strokeWidth={2} />
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
          aria-label="Open tutor chat"
        >
          <span
            aria-hidden
            className="absolute inset-[4px] rounded-full bg-white/15 ring-1 ring-white/30"
          />
          <span className="relative flex items-center justify-center">
            <BrainCircuit className="h-[1.35rem] w-[1.35rem] sm:h-6 sm:w-6" strokeWidth={2.2} />
          </span>
        </button>
      ) : null}
    </div>
  );
}

/**
 * Renders model markdown (`**bold**`, `*italic*`, `__bold__`, lists) with safe defaults (no raw HTML).
 */
function AssistantMarkdown({ text }: { text: string }) {
  return (
    <div className="tutor-markdown text-slate-700 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_b]:font-semibold [&_b]:text-slate-900 [&_em]:italic [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 whitespace-pre-wrap last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
          b: ({ children }) => (
            <b className="font-semibold text-slate-900">{children}</b>
          ),
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
              className="font-medium text-sky-700 underline underline-offset-2 hover:text-sky-800"
            >
              {children}
            </a>
          ),
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

/** Map unicode asterisk lookalikes → ASCII so `**`/`*` match CommonMark emphasis rules. */
function sanitizeTutorMarkdownAsteriskLookalikes(raw: string): string {
  return raw.replace(/[\uFF0A\u2217\u204E\uFE61\u2731]/g, '*');
}