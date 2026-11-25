'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, Loader2, Plus, X } from 'lucide-react';
import { courseUnits, type LessonCourse } from '@/lib/tutoringLessons';
import type { BankQuestionView } from '@/lib/practiceEngine';
import { dojoButtonPrimary, dojoInput } from '../dojoStyles';

const LETTERS = 'ABCDEFGH';

/**
 * Browse the course's question bank by unit and lesson, and add questions to the practice set by hand.
 * Questions already in the set show as added.
 */
export default function QuestionPicker({
  bookingId,
  course,
  initialLesson,
  inSet,
  getToken,
  onAdd,
  onClose,
}: {
  bookingId: string;
  course: LessonCourse;
  /** Where to start browsing, e.g. the lesson's weakest skill. */
  initialLesson: string | null;
  inSet: Set<number>;
  getToken: () => Promise<string>;
  /** Adds the question; resolves with an error message, or null if it worked. */
  onAdd: (questionId: number) => Promise<string | null>;
  onClose: () => void;
}) {
  const units = useMemo(() => courseUnits(course), [course]);
  const startUnit = initialLesson ? Number.parseInt(initialLesson, 10) : (units[0]?.unitNumber ?? 1);
  const [unit, setUnit] = useState<number>(units.some((u) => u.unitNumber === startUnit) ? startUnit : (units[0]?.unitNumber ?? 1));
  const [lesson, setLesson] = useState<string>(initialLesson ?? '');
  const [questions, setQuestions] = useState<BankQuestionView[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [adding, setAdding] = useState<number | null>(null);
  const [addError, setAddError] = useState<{ id: number; message: string } | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const lessons = units.find((u) => u.unitNumber === unit)?.lessons ?? [];

  useEffect(() => {
    let cancelled = false;
    setQuestions(null);
    setLoadError('');
    void (async () => {
      try {
        const query = lesson ? `lesson=${encodeURIComponent(lesson)}` : `unit=${unit}`;
        const res = await fetch(`/api/admin/lessons/practice/questions?bookingId=${encodeURIComponent(bookingId)}&${query}`, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        const data = (await res.json().catch(() => ({}))) as { questions?: BankQuestionView[]; error?: string };
        if (!res.ok || !data.questions) throw new Error(data.error ?? 'Could not load questions');
        if (!cancelled) setQuestions(data.questions);
      } catch (err) {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : 'Could not load questions');
      }
    })();
    return () => {
      cancelled = true;
    };
    // getToken is a fresh function each render; reloading on it would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, unit, lesson]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const add = async (id: number) => {
    setAdding(id);
    setAddError(null);
    const error = await onAdd(id);
    if (error) setAddError({ id, message: error });
    setAdding(null);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-slate-900/30 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="picker-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-3xl bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.35)] sm:rounded-3xl"
      >
        <div className="flex flex-col gap-4 border-b border-slate-100 px-6 pb-5 pt-6 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">{course}</p>
              <h3 id="picker-title" className="mt-1 text-xl font-black tracking-tight text-slate-900">
                Add questions
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-600">Unit</span>
              <select
                value={unit}
                onChange={(e) => {
                  setUnit(Number(e.target.value));
                  setLesson('');
                }}
                className={dojoInput}
              >
                {units.map((u) => (
                  <option key={u.unitNumber} value={u.unitNumber}>
                    Unit {u.unitNumber} · {u.unitName}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-600">Lesson</span>
              <select value={lesson} onChange={(e) => setLesson(e.target.value)} className={dojoInput}>
                <option value="">All lessons in Unit {unit}</option>
                {lessons.map((l) => (
                  <option key={l.lessonNumber} value={l.lessonNumber}>
                    {l.lessonNumber} · {l.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="min-h-[240px] overflow-y-auto px-6 py-4 sm:px-7">
          {loadError ? (
            <p className="py-10 text-center text-sm font-semibold text-red-600">{loadError}</p>
          ) : questions === null ? (
            <p className="flex items-center justify-center gap-2 py-10 text-sm font-semibold text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading questions…
            </p>
          ) : questions.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              No practice questions for {lesson ? `lesson ${lesson}` : `Unit ${unit}`} in the bank yet.
            </p>
          ) : (
            <>
              <p className="mb-2 text-xs font-semibold text-slate-500">
                {questions.length} question{questions.length === 1 ? '' : 's'}
              </p>
              <ul className="flex flex-col gap-2">
                {questions.map((q) => {
                  const added = inSet.has(q.id);
                  const expanded = open === q.id;
                  return (
                    <li key={q.id} className={`rounded-2xl border px-4 py-3 ${added ? 'border-blue-200 bg-blue-50/40' : 'border-slate-200'}`}>
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold tabular-nums text-slate-500">{q.lessons.join(', ') || `Unit ${unit}`}</p>
                          <p className={`mt-0.5 text-sm text-slate-800 ${expanded ? '' : 'line-clamp-3'}`}>{q.text}</p>
                          {expanded ? (
                            <ol className="mt-2 flex flex-col gap-1">
                              {q.options.map((o, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-600">
                                  <span className="w-4 shrink-0 font-bold text-slate-400">{LETTERS[i]}</span>
                                  <span>{o}</span>
                                </li>
                              ))}
                            </ol>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => setOpen(expanded ? null : q.id)}
                            className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                          >
                            {expanded ? 'Hide choices' : 'Show choices'}
                            <ChevronDown className={`h-3.5 w-3.5 transition ${expanded ? 'rotate-180' : ''}`} aria-hidden />
                          </button>
                          {addError?.id === q.id ? <p className="mt-1 text-xs font-semibold text-red-600">{addError.message}</p> : null}
                        </div>
                        {added ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-blue-700">
                            <Check className="h-4 w-4" aria-hidden /> Added
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void add(q.id)}
                            disabled={adding !== null}
                            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                          >
                            {adding === q.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
                            Add
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 sm:px-7">
          <span className="text-sm text-slate-500">{inSet.size} in the set</span>
          <button type="button" onClick={onClose} className={dojoButtonPrimary}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
