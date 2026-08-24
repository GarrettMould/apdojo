'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import type { CourseSubject } from '@/lib/courseSubject';
import { displayCourseLabel } from '@/lib/courseSubject';
import { personaForSubject } from '@/lib/chatPersonas';
import { tutorAvatarInitials, tutorAvatarUrl } from '@/lib/tutorAvatar';
import { getTutorWelcomeStarterChoices } from '@/lib/tutorStarterChoices';
import { TutorAvatar } from '@/components/TutorAvatar';
import { TutorTypingPlaceholder } from '@/components/TutorTypingPlaceholder';
import { TutorAssistantMarkdown } from '@/components/TutorAssistantMarkdown';
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
      accentRing: 'ring-sky-500/25',
      userBubble: 'bg-sky-600 text-white',
      sendBtn:
        'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-900/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-900/25 ring-1 ring-white/25',
      inputFocus: 'focus-within:border-sky-400 focus-within:ring-sky-500/20',
      attachBtn:
        'text-slate-500 hover:bg-sky-50 hover:text-sky-700 focus-visible:ring-sky-500',
      quickChoice:
        'border-sky-200/80 bg-sky-50/70 text-sky-950 hover:border-sky-300 hover:bg-sky-50',
      quickChoiceFocus: 'focus-visible:ring-sky-500',
      headerWash: 'from-sky-50/90 via-white to-white',
      onlineDot: 'bg-sky-500',
    };
  }
  if (subject === 'stats') {
    return {
      accent: 'text-orange-700',
      accentSoft: 'bg-orange-500',
      accentMuted: 'bg-orange-50 text-orange-950',
      accentRing: 'ring-orange-500/25',
      userBubble: 'bg-orange-600 text-white',
      sendBtn:
        'bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-900/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-900/25 ring-1 ring-white/25',
      inputFocus: 'focus-within:border-orange-400 focus-within:ring-orange-500/20',
      attachBtn:
        'text-slate-500 hover:bg-orange-50 hover:text-orange-700 focus-visible:ring-orange-500',
      quickChoice:
        'border-orange-200/80 bg-orange-50/70 text-orange-950 hover:border-orange-300 hover:bg-orange-50',
      quickChoiceFocus: 'focus-visible:ring-orange-500',
      headerWash: 'from-orange-50/90 via-white to-white',
      onlineDot: 'bg-orange-500',
    };
  }
  if (subject === 'micro') {
    return {
      accent: 'text-emerald-700',
      accentSoft: 'bg-emerald-500',
      accentMuted: 'bg-emerald-50 text-emerald-950',
      accentRing: 'ring-emerald-500/25',
      userBubble: 'bg-emerald-600 text-white',
      sendBtn:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
      fab: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/25 ring-1 ring-white/25',
      inputFocus: 'focus-within:border-emerald-400 focus-within:ring-emerald-500/20',
      attachBtn:
        'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-emerald-500',
      quickChoice:
        'border-emerald-200/80 bg-emerald-50/70 text-emerald-950 hover:border-emerald-300 hover:bg-emerald-50',
      quickChoiceFocus: 'focus-visible:ring-emerald-500',
      headerWash: 'from-emerald-50/90 via-white to-white',
      onlineDot: 'bg-emerald-500',
    };
  }
  return {
    accent: 'text-violet-700',
    accentSoft: 'bg-violet-500',
    accentMuted: 'bg-violet-50 text-violet-950',
    accentRing: 'ring-violet-500/25',
    userBubble: 'bg-violet-600 text-white',
    sendBtn:
      'bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-900/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
    fab: 'bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/25 ring-1 ring-white/25',
    inputFocus: 'focus-within:border-violet-400 focus-within:ring-violet-500/20',
    attachBtn:
      'text-slate-500 hover:bg-violet-50 hover:text-violet-700 focus-visible:ring-violet-500',
    quickChoice:
      'border-violet-200/80 bg-violet-50/70 text-violet-950 hover:border-violet-300 hover:bg-violet-50',
    quickChoiceFocus: 'focus-visible:ring-violet-500',
    headerWash: 'from-violet-50/90 via-white to-white',
    onlineDot: 'bg-violet-500',
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
  /** Increment from the parent to force-close the panel (e.g. another overlay opened). */
  externalCloseRequest?: number;
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

  const rest = raw.slice(start + CHOICES_START.length);
  const end = rest.indexOf(CHOICES_END);
  if (end === -1) {
    // Incomplete machine block — show prose only; don't hide mid-response text.
    return { display: raw.slice(0, start).trimEnd(), choices: [] };
  }

  const display = raw.slice(0, start).trimEnd();
  const block = rest.slice(0, end).trim();

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
    <div className="mt-2.5 w-full max-w-[min(100%,22rem)]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
        Continue with
      </p>
      <div className="flex flex-col gap-1.5">
        {choices.map((c, i) => (
          <button
            key={`${c.label}-${i}`}
            type="button"
            disabled={sending}
            onClick={() => onPick(c.prompt, c.label)}
            className={`rounded-xl border px-3.5 py-2.5 text-left text-[13px] font-semibold leading-snug shadow-sm outline-none ring-offset-white transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.99] ${theme.quickChoice} ${theme.quickChoiceFocus}`}
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
  externalCloseRequest = 0,
}: CheatSheetChatBoxProps) {
  const { user, userData } = useAuthContext();
  const canUseAdminChat = Boolean(user && hasAdminRole(userData));
  const chatEnabled = subject === 'stats' || canUseAdminChat;
  const [open, setOpen] = useState(false);
  const lastExternalCloseRef = useRef(externalCloseRequest);
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

  const handleLauncherSubmit = () => {
    const question = input.trim();
    setOpen(true);
    if (question) {
      void executeSend(question, null);
    }
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
  const hasUserMessage = useMemo(() => messages.some((m) => m.role === 'user'), [messages]);

  const canSend = (input.trim() || pending) && !sending;

  useEffect(() => {
    if (!externalPromptNonce || !externalPromptText?.trim()) return;
    if (lastExternalPromptNonceRef.current === externalPromptNonce) return;
    lastExternalPromptNonceRef.current = externalPromptNonce;
    if (!open) setOpen(true);
    const displayText = externalPromptDisplayText?.trim() || externalPromptText.trim();
    void executeSend(displayText, null, externalPromptText.trim());
  }, [externalPromptNonce, externalPromptText, externalPromptDisplayText, executeSend, open]);

  if (!chatEnabled) return null;

  return (
    <div
      className="fixed z-[110] flex flex-col items-end gap-3 print:hidden"
      style={
        open && splitScreenOnDesktop
          ? {
              right: 'max(1rem, env(safe-area-inset-right))',
              bottom: 'max(1rem, env(safe-area-inset-bottom))',
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
          className={`pointer-events-auto relative flex h-[min(820px,92vh)] max-h-[92vh] w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.28)] ring-1 ring-slate-900/[0.03] ${
            splitScreenOnDesktop
              ? 'lg:h-full lg:max-h-none lg:w-[min(26vw,380px)] lg:min-w-[300px] lg:rounded-xl'
              : ''
          }`}
        >
          {/* Header */}
          <div
            className={`relative flex-shrink-0 border-b border-slate-100/90 bg-gradient-to-b ${theme.headerWash} px-4 pb-3.5 pt-3.5`}
          >
            <div className={`absolute inset-x-0 top-0 h-1 ${theme.accentSoft}`} aria-hidden />
            <div className="flex items-start gap-3">
              {(tutorAvatarUrl(subject) || tutorAvatarInitials(subject)) && (
                <div className="relative flex-shrink-0">
                  <TutorAvatar
                    subject={subject}
                    alt={persona.name}
                    className={`h-11 w-11 rounded-full ring-2 ring-white shadow-md ${theme.accentRing}`}
                  />
                  <span
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.35)]"
                    aria-hidden
                  />
                </div>
              )}
              <div className="min-w-0 flex-1 pr-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Dojo tutor
                </p>
                <p className="mt-0.5 truncate text-base font-bold tracking-tight text-slate-900">
                  {persona.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  Unit {unitNumber}
                  {unitTitle ? ` · ${unitTitle}` : ''} · {subjectLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close tutor chat"
                title="Close chat"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-3.5 py-4">
            <div className="space-y-5">
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
                const showTutorAvatar =
                  tutorAvatarUrl(subject) != null || tutorAvatarInitials(subject) != null;

                if (m.role === 'user') {
                  return (
                    <div key={m.id} className="flex w-full flex-col items-end">
                      <div
                        className={`max-w-[min(100%,22rem)] px-3.5 py-2.5 text-[14px] leading-relaxed shadow-sm ${theme.userBubble} rounded-2xl rounded-br-md`}
                      >
                        <p className="whitespace-pre-wrap text-white/95">{m.content}</p>
                      </div>
                      {m.attachmentHint ? (
                        <p className="mt-1.5 max-w-[min(100%,22rem)] truncate text-[11px] font-medium text-slate-500">
                          Attached · {m.attachmentHint}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <div key={m.id} className="flex w-full flex-col items-start">
                    <div className="flex w-full max-w-[min(100%,24rem)] flex-row items-start gap-2.5">
                      {showTutorAvatar ? (
                        <TutorAvatar subject={subject} alt="Unit tutor" />
                      ) : null}
                      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
                        <p className={`mb-1 text-[11px] font-semibold ${theme.accent}`}>
                          {persona.name}
                        </p>
                        <div className="max-w-none rounded-2xl rounded-tl-md border border-white/80 bg-white px-3.5 py-2.5 text-[14px] leading-relaxed text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                          {parsedAssistant ? (
                            assistantLead ? (
                              <TutorAssistantMarkdown text={assistantLead} />
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
              {sending ? (
                <TutorTypingPlaceholder subject={subject} avatarUrl={tutorAvatarUrl(subject)} />
              ) : null}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="flex-shrink-0 border-t border-slate-100 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              accept={ACCEPT_ATTR}
              onChange={onPickFile}
            />
            {fileError ? (
              <p className="mb-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                {fileError}
              </p>
            ) : null}
            {pending ? (
              <div className="mb-2 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                <span className="flex min-w-0 items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
                  <span className="truncate font-semibold">{pending.fileName}</span>
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
                  className="flex-shrink-0 rounded-lg p-1 text-slate-500 transition hover:bg-slate-200/80 hover:text-slate-800"
                  aria-label="Remove attachment"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}
            <div
              className={`flex items-end gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-1.5 shadow-inner transition focus-within:bg-white focus-within:ring-4 ${theme.inputFocus}`}
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
                className={`mb-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 ${theme.attachBtn}`}
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
                rows={2}
                autoFocus
                placeholder={`Message ${persona.name}…`}
                className="min-h-[2.75rem] max-h-32 flex-1 resize-none bg-transparent px-1.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className={`mb-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition disabled:pointer-events-none disabled:opacity-40 ${theme.sendBtn}`}
                aria-label={sending ? 'Thinking' : 'Send message'}
              >
                <Send className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] font-medium tracking-wide text-slate-400">
              Enter to send · Shift+Enter for a new line
            </p>
          </div>
        </div>
      )}

      {!open ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLauncherSubmit();
            }}
            className="pointer-events-auto flex h-14 w-[calc(100vw-2rem)] items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 px-2.5 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.04] backdrop-blur-md lg:hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              aria-label="Open tutor chat"
            >
              {tutorAvatarUrl(subject) || tutorAvatarInitials(subject) ? (
                <TutorAvatar
                  subject={subject}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              ) : null}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLauncherSubmit();
                }
              }}
              placeholder={`Ask ${persona.name}…`}
              aria-label={`Ask ${persona.name} a question`}
              className="min-w-0 flex-1 border-0 bg-transparent px-1 text-sm font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition disabled:opacity-35 ${theme.sendBtn}`}
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </form>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`pointer-events-auto relative hidden h-14 w-14 items-center justify-center rounded-full text-white transition hover:brightness-105 hover:scale-[1.03] active:scale-[0.97] lg:flex ${theme.fab}`}
            aria-expanded={false}
            aria-label="Open tutor chat"
          >
            <span
              aria-hidden
              className="absolute inset-[3px] rounded-full bg-white/15 ring-1 ring-white/30"
            />
            {tutorAvatarUrl(subject) || tutorAvatarInitials(subject) ? (
              <TutorAvatar
                subject={subject}
                alt="Open tutor chat"
                className="relative h-[82%] w-[82%] rounded-full"
              />
            ) : null}
          </button>
        </>
      ) : null}
    </div>
  );
}
