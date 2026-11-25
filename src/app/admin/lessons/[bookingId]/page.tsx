'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, BarChart3, Check, Eye, Loader2, PencilLine, Sparkles } from 'lucide-react';
import SkillsEditor from './SkillsEditor';
import BoardsEditor from './BoardsEditor';
import ConfirmDialog from './ConfirmDialog';
import { SentLessonView, SentModal, ShareModal, ShareStatusBanner, shareUrl, textMessage, type ShareStatus } from './ShareParts';
import PracticeEditor from './PracticeEditor';
import {
  dojoButtonAccent,
  dojoButtonPrimary,
  dojoButtonSecondary,
  dojoCard,
  dojoInput,
  dojoLabel,
  dojoSectionTitle,
  dojoTitle,
} from '../dojoStyles';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  EMPTY_LESSON_NOTES,
  LESSON_NOTE_FIELDS,
  MAX_NOTE_CHARS,
  MAX_TRANSCRIPT_CHARS,
  buildSharedNotes,
  type AdminLessonDetail,
  type LessonCourse,
  type LessonBoardView,
  type LessonNotes,
  type LessonSkill,
} from '@/lib/tutoringLessons';


type SaveState = 'idle' | 'saving' | 'saved' | 'error';

function formatWhen(lesson: AdminLessonDetail) {
  if (!lesson.startTime) return 'Time to be confirmed';
  const start = new Date(lesson.startTime);
  const day = start.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const time = start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  return `${day}, ${time}`;
}

export default function AdminLessonEditorPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuthContext();
  const [lesson, setLesson] = useState<AdminLessonDetail | null>(null);
  const [loadError, setLoadError] = useState<'not-found' | 'failed' | null>(null);
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState<LessonNotes>(EMPTY_LESSON_NOTES);
  const [skills, setSkills] = useState<LessonSkill[]>([]);
  const [course, setCourse] = useState<LessonCourse | null>(null);
  const [boards, setBoards] = useState<LessonBoardView[]>([]);
  const [togglingLink, setTogglingLink] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [confirmDraft, setConfirmDraft] = useState(false);
  const [draftError, setDraftError] = useState('');
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [saveError, setSaveError] = useState('');
  const [sharing, setSharing] = useState<'closed' | 'open' | 'sending'>('closed');
  const [shareError, setShareError] = useState('');
  /** Set after a send, to show the confirmation. */
  const [sent, setSent] = useState<{ emailSent: boolean; isUpdate: boolean } | null>(null);
  /** A sent lesson opens on the family's view; the editor shows after "Edit notes". */
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    if (!user || !bookingId) return;
    setLoadError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/admin/lessons?bookingId=${encodeURIComponent(bookingId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) {
        setLoadError('not-found');
        return;
      }
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = ((await res.json()) as { lesson: AdminLessonDetail }).lesson;
      setLesson(data);
      setTranscript(data.transcript);
      setNotes(data.notes);
      setSkills(data.skills);
      setCourse(data.course);
      setBoards(data.boards);
      setDirty(false);
    } catch (err) {
      console.error('Failed to load lesson:', err);
      setLoadError('failed');
    }
  }, [user, bookingId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  /** Saves the draft; returns whether it worked. */
  const save = async (): Promise<boolean> => {
    if (!user || !bookingId) return false;
    setSaveState('saving');
    setSaveError('');
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/lessons', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          transcript,
          notes,
          skills,
          course,
          boards: boards.map(({ id, caption }) => ({ id, caption })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; editedSinceShare?: boolean };
      if (!res.ok) throw new Error(data.error ?? `Request failed: ${res.status}`);
      setLesson((prev) =>
        prev
          ? {
              ...prev,
              notesState: prev.notesState === 'shared' ? 'shared' : 'draft',
              editedSinceShare: data.editedSinceShare === true,
            }
          : prev,
      );
      setDirty(false);
      setSaveState('saved');
      return true;
    } catch (err) {
      console.error('Failed to save lesson:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to save');
      setSaveState('error');
      return false;
    }
  };

  /** Saves any changes, then opens the preview of what the family will see. */
  const openShare = async () => {
    if (dirty && !(await save())) return;
    setShareError('');
    setSharing('open');
  };

  const sendShare = async () => {
    if (!user || !bookingId) return;
    setSharing('sending');
    setShareError('');
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/lessons/share', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        shared?: AdminLessonDetail['shared'];
        emailSent?: boolean;
        shareLink?: AdminLessonDetail['shareLink'];
      };
      if (!res.ok || !data.shared) throw new Error(data.error ?? `Request failed: ${res.status}`);
      const isUpdate = Boolean(lesson?.shared);
      setLesson((prev) =>
        prev
          ? { ...prev, notesState: 'shared', editedSinceShare: false, shared: data.shared ?? null, shareLink: data.shareLink ?? prev.shareLink }
          : prev,
      );
      // The practice link was created on send; reload so the practice step shows it.
      void load();
      setSharing('closed');
      setSaveState('idle');
      setSent({ emailSent: data.emailSent === true, isUpdate });
      setEditing(false);
    } catch (err) {
      console.error('Failed to share lesson:', err);
      setShareError(err instanceof Error ? err.message : 'Could not share');
      setSharing('open');
    }
  };

  const toggleLink = async () => {
    if (!user || !lesson?.shareLink) return;
    setTogglingLink(true);
    try {
      const res = await fetch('/api/admin/lessons/share-link', {
        method: 'POST',
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, enabled: !lesson.shareLink.enabled }),
      });
      const data = (await res.json().catch(() => ({}))) as { shareLink?: AdminLessonDetail['shareLink'] };
      if (res.ok && data.shareLink) setLesson((prev) => (prev ? { ...prev, shareLink: data.shareLink ?? null } : prev));
    } finally {
      setTogglingLink(false);
    }
  };

  const markChanged = () => {
    setDirty(true);
    setSaveState('idle');
  };

  const draftWithAi = async (confirmed = false) => {
    if (!user) return;
    const hasNotes = Object.values(notes).some((v) => v.trim()) || skills.length > 0;
    if (hasNotes && !confirmed) {
      setConfirmDraft(true);
      return;
    }
    setConfirmDraft(false);
    setDrafting(true);
    setDraftError('');
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/lessons/draft', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          studentName: lesson?.studentName ?? null,
          // A course named by the booking is fixed; otherwise the AI works it out again.
          course: lesson?.courseSource === 'booking' ? lesson.course : null,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        notes?: LessonNotes;
        skills?: LessonSkill[];
        course?: LessonCourse | null;
        error?: string;
      };
      if (!res.ok || !data.notes) throw new Error(data.error ?? `Request failed: ${res.status}`);
      setNotes(data.notes);
      setSkills(data.skills ?? []);
      if (lesson?.courseSource !== 'booking') setCourse(data.course ?? null);
      markChanged();
    } catch (err) {
      console.error('Failed to draft notes:', err);
      setDraftError(err instanceof Error ? err.message : 'Could not draft notes');
    } finally {
      setDrafting(false);
    }
  };

  const backLink = (
    <Link href="/admin/lessons" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900">
      <ArrowLeft className="h-4 w-4" aria-hidden /> All lessons
    </Link>
  );

  if (loadError) {
    return (
      <>
        {backLink}
        <p className={`${dojoCard} p-6 font-medium text-slate-700`}>
          {loadError === 'not-found' ? 'This session was not found.' : "We couldn't load this lesson. Refresh to try again."}
        </p>
      </>
    );
  }
  if (!lesson) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 font-semibold text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading lesson…
      </div>
    );
  }

  const hasChanges = dirty || lesson.editedSinceShare;
  const shareStatus: ShareStatus = lesson.shared
    ? hasChanges
      ? { kind: 'changed', sharedAt: lesson.shared.sharedAt, sharedTo: lesson.shared.sharedTo }
      : { kind: 'shared', sharedAt: lesson.shared.sharedAt, sharedTo: lesson.shared.sharedTo }
    : lesson.notesState === 'none' && !dirty
      ? { kind: 'empty' }
      : { kind: 'draft' };
  const canShare = notes.summary.trim().length > 0 && Boolean(lesson.studentEmail);
  const upToDate = Boolean(lesson.shared) && !hasChanges;
  const showSentView = upToDate && !editing && lesson.shared !== null;
  let bannerAction: ReactNode = null;
  if (showSentView) {
    bannerAction = (
      <button type="button" onClick={() => setEditing(true)} className={`${dojoButtonSecondary} px-3.5 py-2`}>
        <PencilLine className="h-4 w-4" aria-hidden /> Edit notes
      </button>
    );
  } else if (upToDate && editing) {
    bannerAction = (
      <button type="button" onClick={() => setEditing(false)} className={`${dojoButtonSecondary} px-3.5 py-2`}>
        Done editing
      </button>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {backLink}
        <p className={`${dojoLabel} mt-2`}>
          {course ? <span className="text-blue-600">{course}</span> : null}
          {course ? ' · ' : ''}
          {lesson.title}
        </p>
        <h1 className={`${dojoTitle} -mt-2`}>{lesson.studentName ?? lesson.studentEmail ?? 'Unknown student'}</h1>
        <p className="font-medium text-slate-600">
          {formatWhen(lesson)}
          {lesson.studentEmail && lesson.studentName ? ` · ${lesson.studentEmail}` : ''}
        </p>
        {lesson.studentUserId ? (
          <Link
            href={`/admin/students/${encodeURIComponent(lesson.studentUserId)}`}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <BarChart3 className="h-4 w-4" aria-hidden /> Progress report
          </Link>
        ) : null}
      </div>

      <ShareStatusBanner status={shareStatus} action={bannerAction} />

      {showSentView && lesson.shared ? (
        <SentLessonView
          shared={lesson.shared}
          studentName={lesson.studentName}
          practice={lesson.practice}
          textLink={
            lesson.shareLink
              ? {
                  message: textMessage({
                    token: lesson.shareLink.token,
                    studentName: lesson.studentName,
                    lessonStart: lesson.startTime,
                    practiceCount: lesson.shared.practice?.count ?? null,
                  }),
                  url: shareUrl(lesson.shareLink.token),
                  enabled: lesson.shareLink.enabled,
                  toggling: togglingLink,
                  onToggle: () => void toggleLink(),
                }
              : null
          }
        />
      ) : (
        <>

      <section className={`${dojoCard} flex flex-col gap-4 p-5 sm:p-7`}>
        <StepHeading
          step={1}
          title="Transcript & whiteboards"
          hint="Paste the transcript from Granola. Only tutors see the transcript; whiteboards go to the family with the notes."
        />
        <textarea
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            markChanged();
          }}
          maxLength={MAX_TRANSCRIPT_CHARS}
          rows={12}
          placeholder="Paste the transcript here…"
          className={`${dojoInput} font-mono text-xs leading-relaxed`}
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-slate-900">
            Whiteboards <span className="font-normal text-slate-500">· Miro or Excalidraw from this lesson</span>
          </p>
          <BoardsEditor
            bookingId={bookingId}
            boards={boards}
            getToken={() => (user ? user.getIdToken() : Promise.reject(new Error('Signed out')))}
            onAdded={(board) => {
              setBoards((prev) => [...prev, board]);
              setLesson((prev) =>
                prev
                  ? {
                      ...prev,
                      notesState: prev.notesState === 'none' ? 'draft' : prev.notesState,
                      editedSinceShare: prev.notesState === 'shared' ? true : prev.editedSinceShare,
                    }
                  : prev,
              );
            }}
            onRemoved={(id) => {
              setBoards((prev) => prev.filter((b) => b.id !== id));
              setLesson((prev) =>
                prev ? { ...prev, editedSinceShare: prev.notesState === 'shared' ? true : prev.editedSinceShare } : prev,
              );
            }}
            onChange={(next) => {
              setBoards(next);
              markChanged();
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => void draftWithAi()}
            disabled={drafting || transcript.trim().length < 200}
            className={dojoButtonAccent}
          >
            {drafting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
            {drafting ? 'Drafting…' : 'Draft notes with AI'}
          </button>
          {draftError ? (
            <span className="text-sm font-bold text-red-600">{draftError}</span>
          ) : (
            <span className="text-xs font-medium text-slate-500">Fills in steps 2 and 3 from the transcript for you to review.</span>
          )}
        </div>
      </section>

      <section className={`${dojoCard} flex flex-col gap-5 p-5 sm:p-7`}>
        <StepHeading
          step={2}
          title="Lesson notes"
          hint="Written for the student and family. Nothing is shared until you send it."
        />
        {LESSON_NOTE_FIELDS.map(({ key, label, hint }) => (
          <label key={key} className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-slate-900">
              {label} <span className="font-normal text-slate-500">· {hint}</span>
            </span>
            <textarea
              value={notes[key]}
              onChange={(e) => {
                setNotes((prev) => ({ ...prev, [key]: e.target.value }));
                markChanged();
              }}
              maxLength={MAX_NOTE_CHARS}
              rows={key === 'summary' ? 4 : 3}
              className={dojoInput}
            />
          </label>
        ))}
      </section>

      <section className={`${dojoCard} flex flex-col gap-4 p-5 sm:p-7`}>
        <StepHeading
          step={3}
          title="Skills practiced"
          hint="Click a skill to rate it. Follow-up practice will focus on the red and yellow ones."
        />
        <SkillsEditor
          skills={skills}
          course={course}
          onChange={(next) => {
            setSkills(next);
            markChanged();
          }}
        />
      </section>

      <section className={`${dojoCard} flex flex-col gap-4 p-5 sm:p-7`}>
        <StepHeading
          step={4}
          title="Practice set"
          hint="Questions from the site's bank for the skills above. Goes out with the notes; no account needed to do it."
        />
        <PracticeEditor
          bookingId={bookingId}
          practice={lesson.practice}
          hasSkills={skills.length > 0}
          course={course}
          initialLesson={[...skills].sort((a, b) => a.level - b.level).find((s) => s.lesson)?.lesson ?? null}
          getToken={() => (user ? user.getIdToken() : Promise.reject(new Error('Signed out')))}
          beforeBuild={async () => (dirty ? save() : true)}
          onChange={(practice) =>
            setLesson((prev) =>
              prev
                ? { ...prev, practice, editedSinceShare: prev.notesState === 'shared' ? true : prev.editedSinceShare }
                : prev,
            )
          }
        />
      </section>

      {/* Hidden once the family has the latest version; it comes back as soon as anything is edited. */}
      {!upToDate ? (
      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.2)] backdrop-blur">
        <span className="mr-auto pl-1 text-sm">
          {saveState === 'saving' ? (
            <span className="font-semibold text-slate-500">Saving…</span>
          ) : saveState === 'error' ? (
            <span className="font-semibold text-red-600">{saveError}</span>
          ) : dirty ? (
            <span className="font-semibold text-slate-500">Unsaved changes</span>
          ) : saveState === 'saved' ? (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
              <Check className="h-4 w-4" aria-hidden strokeWidth={2.5} /> Saved
            </span>
          ) : !canShare && lesson.notesState !== 'none' ? (
            <span className="text-slate-500">
              {lesson.studentEmail ? 'Write a summary to share.' : 'This booking has no email to share to.'}
            </span>
          ) : null}
        </span>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saveState === 'saving' || !dirty}
          className={dojoButtonSecondary}
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={() => void openShare()}
          disabled={!canShare || saveState === 'saving'}
          className={dojoButtonPrimary}
        >
          <Eye className="h-4 w-4" aria-hidden />
          {lesson.shared ? 'Preview & send update' : 'Preview & send'}
        </button>
      </div>
      ) : null}

        </>
      )}

      {confirmDraft ? (
        <ConfirmDialog
          title="Replace with a new AI draft?"
          tone="notice"
          confirmLabel="Replace notes"
          onConfirm={() => void draftWithAi(true)}
          onClose={() => setConfirmDraft(false)}
        >
          Your current notes and skills will be replaced. Whiteboards and the transcript stay as they are.
        </ConfirmDialog>
      ) : null}

      {sent ? (
        <SentModal
          to={lesson.shared?.sharedTo ?? lesson.studentEmail}
          studentName={lesson.studentName}
          isUpdate={sent.isUpdate}
          emailSent={sent.emailSent}
          message={
            lesson.shareLink?.enabled
              ? textMessage({
                  token: lesson.shareLink.token,
                  studentName: lesson.studentName,
                  lessonStart: lesson.startTime,
                  practiceCount: lesson.shared?.practice?.count ?? null,
                })
              : null
          }
          onClose={() => setSent(null)}
        />
      ) : null}

      {sharing !== 'closed' ? (
        <ShareModal
          preview={{
            ...buildSharedNotes(notes, skills, course, '', boards),
            boards,
            practice:
              lesson.practice?.include && lesson.practice.questions.length > 0
                ? { path: lesson.practice.path ?? '#', count: lesson.practice.questions.length }
                : null,
          }}
          to={lesson.studentEmail}
          isUpdate={Boolean(lesson.shared)}
          sending={sharing === 'sending'}
          error={shareError}
          onSend={() => void sendShare()}
          onClose={() => setSharing('closed')}
        />
      ) : null}
    </>
  );
}

function StepHeading({ step, title, hint }: { step: number; title: string; hint: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700 ring-1 ring-inset ring-blue-200">
        {step}
      </span>
      <div>
        <h2 className={dojoSectionTitle}>{title}</h2>
        <p className="text-sm font-medium text-slate-500">{hint}</p>
      </div>
    </div>
  );
}
