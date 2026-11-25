'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Check, CheckCircle2, CircleDashed, ClipboardList, Copy, ExternalLink, Loader2, Mail, MessageSquareText, PencilLine, Send, X } from 'lucide-react';
import LessonNotesView from '@/components/tutoring/LessonNotesView';
import type { LessonPracticeView, SharedLessonNotes } from '@/lib/tutoringLessons';
import { dojoButtonPrimary, dojoButtonSecondary, dojoCard, dojoSectionTitle } from '../dojoStyles';

function formatSharedAt(iso: string) {
  return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/** The no-login link to a lesson's sent notes. */
export function shareUrl(token: string): string {
  const origin = typeof window === 'undefined' ? 'https://apdojo.com' : window.location.origin;
  return `${origin}/n/${token}`;
}

/** The message to paste into the family's text thread. */
export function textMessage({
  token,
  studentName,
  lessonStart,
  practiceCount,
}: {
  token: string;
  studentName: string | null;
  lessonStart: string | null;
  practiceCount: number | null;
}): string {
  const first = studentName?.trim().split(/\s+/)[0] || null;
  let when = 'the lesson';
  if (lessonStart) {
    const start = new Date(lessonStart);
    const days = Math.floor((new Date().setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)) / 86_400_000);
    if (days === 0) when = "today's lesson";
    else if (days === 1) when = "yesterday's lesson";
    else if (days > 1 && days < 7) when = `${start.toLocaleDateString('en-US', { weekday: 'long' })}'s lesson`;
    else when = `our ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} lesson`;
  }
  const lines = [`Notes from ${when}${first ? ` with ${first}` : ''} 👇`, shareUrl(token)];
  if (practiceCount) lines.push('', `There's a ${practiceCount}-question practice set in there too.`);
  return lines.join('\n');
}

/** Copies the text message, with a moment of "Copied" feedback. */
export function CopyForTextButton({ message, className }: { message: string; className: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Older browsers: a hidden textarea and execCommand.
      const ta = document.createElement('textarea');
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={() => void copy()} className={className}>
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      {copied ? 'Copied' : 'Copy for text'}
    </button>
  );
}

export type ShareStatus =
  | { kind: 'empty' }
  | { kind: 'draft' }
  | { kind: 'shared'; sharedAt: string; sharedTo: string | null }
  | { kind: 'changed'; sharedAt: string; sharedTo: string | null };

/** Where the lesson stands: not written, draft, sent, or sent with changes the family hasn't seen. */
export function ShareStatusBanner({ status, action }: { status: ShareStatus; action?: ReactNode }) {
  const styles = {
    empty: 'border-slate-200 bg-white text-slate-600',
    draft: 'border-[#eadbb8] bg-[#f7f2e8] text-stone-800',
    shared: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    changed: 'border-[#eadbb8] bg-[#f7f2e8] text-stone-800',
  }[status.kind];

  let icon = <CircleDashed className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />;
  let title = 'No notes yet';
  let detail = 'Paste the transcript and draft the notes below.';
  if (status.kind === 'draft') {
    icon = <PencilLine className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />;
    title = 'Draft · not sent yet';
    detail = 'Only you can see these notes. Preview and send them when they’re ready.';
  } else if (status.kind === 'shared') {
    icon = <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />;
    title = `Sent · ${formatSharedAt(status.sharedAt)}`;
    detail = status.sharedTo ? `To ${status.sharedTo} and their My Bookings page.` : 'On their My Bookings page.';
  } else if (status.kind === 'changed') {
    icon = <PencilLine className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />;
    title = 'Edited since sending';
    detail = `The family still sees the version from ${formatSharedAt(status.sharedAt)}. Send the update to replace it.`;
  }

  return (
    <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${styles}`} role="status">
      {icon}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-sm opacity-80">{detail}</p>
      </div>
      {action ? <div className="shrink-0 self-center">{action}</div> : null}
    </div>
  );
}

/** The exact notes the family will get, with the send button. */
export function ShareModal({
  preview,
  to,
  isUpdate,
  sending,
  error,
  onSend,
  onClose,
}: {
  preview: Pick<SharedLessonNotes, 'notes' | 'skills' | 'boards' | 'practice'>;
  to: string | null;
  isUpdate: boolean;
  sending: boolean;
  error: string;
  onSend: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !sending && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, sending]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-slate-900/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (!sending && ref.current && !ref.current.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-3xl bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.35)] sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 pb-4 pt-6 sm:px-7">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">Preview</p>
            <h3 id="share-title" className="mt-1 text-xl font-black tracking-tight text-slate-900">
              {isUpdate ? 'Send the updated notes' : 'Send to the family'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">This is exactly what they’ll see. The transcript is never shared.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-7">
          <LessonNotesView shared={preview} />
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 px-6 pb-5 pt-4 sm:px-7">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200">
              <Mail className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 text-sm leading-snug">
              <p className="truncate font-semibold text-slate-900">{to ?? 'No email on file'}</p>
              <p className="text-slate-500">Emailed, and added to their My Bookings page</p>
            </div>
          </div>
          {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Keep editing
            </button>
            <button type="button" onClick={onSend} disabled={sending || !to} className={dojoButtonPrimary}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
              {isUpdate ? 'Send update' : 'Send to family'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Confirmation after the notes are sent, centred on the next step: texting the family. */
export function SentModal({
  to,
  studentName,
  isUpdate,
  emailSent,
  message,
  onClose,
}: {
  to: string | null;
  studentName: string | null;
  isUpdate: boolean;
  emailSent: boolean;
  /** The text-message version, if the no-login link exists. */
  message: string | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const first = studentName?.replace(/\s*\(.*\)\s*$/, '').trim().split(/\s+/)[0] || null;
  const [messageText, link] = message ? [message.split('\n')[0], message.match(/https?:\/\/\S+/)?.[0] ?? null] : [null, null];
  const extra = message ? message.split('\n').slice(2).join(' ').trim() : '';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (ref.current && !ref.current.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sent-title"
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.35)]"
      >
        <div className="flex items-start gap-4 px-6 pb-5 pt-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50">
            <Check className="h-6 w-6 text-emerald-600" strokeWidth={3} aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 id="sent-title" className="text-xl font-black tracking-tight text-slate-900">
              {isUpdate ? 'Update sent' : 'Notes sent'}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">
              {emailSent && to ? (
                <>
                  Emailed to <span className="font-semibold text-slate-700">{to}</span> and on their My Bookings.
                </>
              ) : (
                `${first ? `${first}'s notes are` : 'The notes are'} on their My Bookings page.`
              )}
            </p>
            {!emailSent ? (
              <p className="mt-2 text-xs text-stone-500">No email on this local server; the live site sends it.</p>
            ) : null}
          </div>
        </div>

        {message ? (
          <div className="mx-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Text it to the family</p>
            <div className="mt-3 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
              <p>{messageText}</p>
              {link ? <p className="truncate text-blue-600">{link.replace(/^https?:\/\//, '')}</p> : null}
              {extra ? <p className="mt-2 text-slate-600">{extra}</p> : null}
            </div>
            <CopyForTextButton message={message} className={`${dojoButtonPrimary} mt-3 w-full`} />
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
          <Link href="/admin/lessons" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            All lessons
          </Link>
          <button type="button" onClick={onClose} className={`${dojoButtonSecondary} px-5`}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function PracticeCard({ practice }: { practice: LessonPracticeView | null }) {
  const sent = practice?.path && practice.include;
  const result = practice?.result ?? null;
  return (
    <section className={`${dojoCard} flex flex-col gap-4 p-5 sm:p-7`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={dojoSectionTitle}>Assigned practice</h2>
          <p className="text-sm font-medium text-slate-500">Whether the work has been done, and how it went.</p>
        </div>
        {sent ? (
          <a
            href={practice.path as string}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            View set <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        ) : null}
      </div>
      {!sent ? (
        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-slate-200 px-4 py-5">
          <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" aria-hidden />
          <p className="text-sm text-slate-500">No practice set went out with these notes. Edit the notes to build one and send an update.</p>
        </div>
      ) : !result ? (
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
          <CircleDashed className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">Not done yet.</span> {practice.questions.length} questions sent. The
            score shows here once they submit.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-4xl font-black tabular-nums tracking-tight text-slate-900">
              {result.correct}
              <span className="text-2xl text-slate-400">/{result.total}</span>
            </p>
            <p className="text-sm text-slate-500">
              Done {formatSharedAt(result.submittedAt)}
              {result.studentName ? ` by ${result.studentName}` : ''}
            </p>
          </div>
          {result.byLesson.length > 0 ? (
            <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
              {result.byLesson.map((l) => {
                const pct = l.total ? l.correct / l.total : 0;
                return (
                  <li key={l.lesson} className="flex items-center justify-between gap-4 px-4 py-2.5">
                    <span className="min-w-0 truncate text-sm text-slate-800">
                      <span className="tabular-nums text-slate-400">{l.lesson}</span> {l.lessonName ?? ''}
                    </span>
                    <span
                      className={`shrink-0 text-sm font-bold tabular-nums ${
                        pct >= 0.8 ? 'text-emerald-700' : pct >= 0.5 ? 'text-amber-700' : 'text-red-700'
                      }`}
                    >
                      {l.correct}/{l.total}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      )}
    </section>
  );
}

/** The texting card: copy the message, see the link, turn it off. */
function TextLinkCard({
  message,
  url,
  enabled,
  toggling,
  onToggle,
}: {
  message: string;
  url: string;
  enabled: boolean;
  toggling: boolean;
  onToggle: () => void;
}) {
  return (
    <section className={`${dojoCard} flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}>
      <div className="flex min-w-0 items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <MessageSquareText className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-bold text-slate-900">Text it to the family</p>
          <p className="truncate text-sm text-slate-500">
            {enabled ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 hover:underline">
                {url.replace(/^https?:\/\//, '')}
              </a>
            ) : (
              'Link turned off. Anyone with it sees “This link isn’t active.”'
            )}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          disabled={toggling}
          className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          {toggling ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : enabled ? 'Turn off link' : 'Turn link on'}
        </button>
        {enabled ? <CopyForTextButton message={message} className={dojoButtonPrimary} /> : null}
      </div>
    </section>
  );
}

/**
 * A sent lesson: the texting link, the notes exactly as the student and family see them, and the practice
 * set with how it went.
 */
export function SentLessonView({
  shared,
  studentName,
  practice,
  textLink,
}: {
  shared: SharedLessonNotes;
  studentName: string | null;
  practice: LessonPracticeView | null;
  textLink: { message: string; url: string; enabled: boolean; toggling: boolean; onToggle: () => void } | null;
}) {
  return (
    <>
      {textLink ? <TextLinkCard {...textLink} /> : null}

      <section className={`${dojoCard} flex flex-col gap-5 p-5 sm:p-7`}>
        <div>
          <h2 className={dojoSectionTitle}>Lesson notes</h2>
          <p className="text-sm font-medium text-slate-500">
            Exactly what {studentName ?? 'the student'} and their family see.
          </p>
        </div>
        <LessonNotesView shared={shared} />
      </section>

      <PracticeCard practice={practice} />
    </>
  );
}
