'use client';

import { useState } from 'react';
import { ExternalLink, Loader2, Plus, RefreshCw, Shuffle, Sparkles, X } from 'lucide-react';
import type { LessonCourse, LessonPracticeView, SkillLevel } from '@/lib/tutoringLessons';
import { dojoButtonAccent, dojoButtonSecondary } from '../dojoStyles';
import QuestionPicker from './QuestionPicker';

const DOT: Record<SkillLevel, string> = { 1: 'bg-red-500', 2: 'bg-amber-400', 3: 'bg-emerald-500' };

type Action =
  | { action: 'build' }
  | { action: 'swap'; questionId: number }
  | { action: 'remove'; questionId: number }
  | { action: 'add'; questionId: number }
  | { action: 'include'; include: boolean };

/**
 * Step 4: the follow-up practice set, picked from the MCQ bank for the lesson's skills (more questions on
 * red, fewer on yellow, one on green). The tutor reviews it, swaps or removes questions, and it goes out
 * with the notes.
 */
export default function PracticeEditor({
  bookingId,
  practice,
  hasSkills,
  course,
  initialLesson,
  getToken,
  beforeBuild,
  onChange,
}: {
  bookingId: string;
  practice: LessonPracticeView | null;
  hasSkills: boolean;
  course: LessonCourse | null;
  /** Where the question picker starts: the lesson's weakest skill. */
  initialLesson: string | null;
  getToken: () => Promise<string>;
  /** Saves unsaved skill edits first, since the set is built from the saved skills. */
  beforeBuild: () => Promise<boolean>;
  onChange: (practice: LessonPracticeView) => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [picking, setPicking] = useState(false);

  /** Runs an action; returns the error message, or null if it worked. */
  const run = async (action: Action, key: string): Promise<string | null> => {
    setBusy(key);
    setError('');
    try {
      if (action.action === 'build' && !(await beforeBuild())) throw new Error('Save failed');
      const res = await fetch('/api/admin/lessons/practice', {
        method: 'POST',
        headers: { Authorization: `Bearer ${await getToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, ...action }),
      });
      const data = (await res.json().catch(() => ({}))) as { practice?: LessonPracticeView; error?: string };
      if (!res.ok || !data.practice) throw new Error(data.error ?? 'Something went wrong');
      onChange(data.practice);
      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      if (action.action !== 'add') setError(message);
      return message;
    } finally {
      setBusy(null);
    }
  };

  const picker =
    picking && course ? (
      <QuestionPicker
        bookingId={bookingId}
        course={course}
        initialLesson={initialLesson}
        inSet={new Set(practice?.questions.map((q) => q.id) ?? [])}
        getToken={getToken}
        onAdd={(questionId) => run({ action: 'add', questionId }, `add-${questionId}`)}
        onClose={() => setPicking(false)}
      />
    ) : null;

  if (!practice || practice.questions.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-slate-200 p-5">
        <p className="text-sm text-slate-600">
          {hasSkills
            ? 'Build a short set from the skills above: about 4 questions per red skill, 2 per yellow, 1 per green.'
            : 'Add skills in step 3 first. The practice set is built from them.'}
        </p>
        <button
          type="button"
          onClick={() => void run({ action: 'build' }, 'build')}
          disabled={!hasSkills || busy !== null}
          className={dojoButtonAccent}
        >
          {busy === 'build' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
          Build practice set
        </button>
        {course ? (
          <button
            type="button"
            onClick={() => setPicking(true)}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            or pick questions yourself
          </button>
        ) : null}
        {error ? <p className="text-sm font-bold text-red-600">{error}</p> : null}
        {picker}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={practice.include}
            onClick={() => void run({ action: 'include', include: !practice.include }, 'include')}
            disabled={busy !== null}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${practice.include ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${practice.include ? 'left-[22px]' : 'left-0.5'}`}
            />
          </button>
          <span className="text-sm font-bold text-slate-900">
            {practice.include ? `Send ${practice.questions.length} questions with the notes` : 'Not sending a practice set'}
          </span>
        </label>
        <div className="flex items-center gap-2">
          {practice.path ? (
            <a href={practice.path} target="_blank" rel="noopener noreferrer" className={`${dojoButtonSecondary} px-3 py-2`}>
              <ExternalLink className="h-4 w-4" aria-hidden /> Open
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => void run({ action: 'build' }, 'build')}
            disabled={busy !== null}
            className={`${dojoButtonSecondary} px-3 py-2`}
          >
            {busy === 'build' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <RefreshCw className="h-4 w-4" aria-hidden />}
            Rebuild
          </button>
        </div>
      </div>

      <ol className={`divide-y divide-slate-100 rounded-2xl border border-slate-200 transition ${practice.include ? '' : 'opacity-50'}`}>
        {practice.questions.map((q, i) => (
          <li key={q.id} className="group flex items-start gap-3 px-4 py-3">
            <span className="mt-0.5 w-5 shrink-0 text-right text-xs font-bold tabular-nums text-slate-400">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                {q.level ? <span className={`h-2 w-2 rounded-full ${DOT[q.level]}`} aria-hidden /> : null}
                {q.lesson ? (
                  <span>
                    <span className="tabular-nums">{q.lesson}</span>
                    {q.lessonName ? ` · ${q.lessonName}` : ''}
                  </span>
                ) : (
                  'Unit question'
                )}
              </p>
              <p className="mt-0.5 line-clamp-2 text-sm text-slate-800">{q.preview}</p>
            </div>
            <div className="flex shrink-0 gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
              <button
                type="button"
                onClick={() => void run({ action: 'swap', questionId: q.id }, `swap-${q.id}`)}
                disabled={busy !== null}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Swap for another question"
                title="Swap for another question on this skill"
              >
                {busy === `swap-${q.id}` ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Shuffle className="h-4 w-4" aria-hidden />}
              </button>
              <button
                type="button"
                onClick={() => void run({ action: 'remove', questionId: q.id }, `remove-${q.id}`)}
                disabled={busy !== null || practice.questions.length <= 1}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                aria-label="Remove question"
                title="Remove"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ol>

      {course ? (
        <button
          type="button"
          onClick={() => setPicking(true)}
          disabled={busy !== null}
          className="flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-2.5 text-sm font-bold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50/40 hover:text-blue-700"
        >
          <Plus className="h-4 w-4" aria-hidden /> Add question
        </button>
      ) : null}

      {practice.gaps.length > 0 ? (
        <p className="rounded-xl bg-[#f7f2e8] px-4 py-3 text-sm text-stone-700">
          <span className="font-bold">Short on questions:</span>{' '}
          {practice.gaps
            .map((g) => `${g.lesson}${g.lessonName ? ` ${g.lessonName}` : ''} (${g.found} of ${g.wanted})`)
            .join(', ')}
          . The bank doesn&apos;t have more for {practice.gaps.length === 1 ? 'that lesson' : 'those lessons'} yet.
        </p>
      ) : null}
      {error ? <p className="text-sm font-bold text-red-600">{error}</p> : null}
      {picker}
    </div>
  );
}
