'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, ClipboardCheck, RotateCcw } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasAdminRole } from '@/lib/adminAccess';
import { getGuidedCourseUnits } from '@/data/guidedLessons';
import { getGuidedLessonProgress, type GuidedLessonProgressEntry } from '@/lib/guidedLessonProgress';
import { getLatestTestResult, getUnitMcqTestId, type TestResult } from '@/lib/testProgress';
import { getUnitTestPreviewUrl } from '@/lib/utils';
import { primaryButton, secondaryButton } from './styles';
import type { WrapUpPreview } from './wrapUpPreview';

type LessonState = 'first' | 'passed' | 'reviewed' | 'todo';

function lessonState(entry: GuidedLessonProgressEntry | null): LessonState {
  if (entry?.status === 'reviewed') return 'reviewed';
  if (entry?.status === 'passed') return entry.passedVia === 'first' ? 'first' : 'passed';
  return 'todo';
}

const STATE_STYLE: Record<LessonState, { label: string; dot: string; text: string }> = {
  first: { label: 'First try', dot: 'bg-green-600 text-white', text: 'text-green-700' },
  passed: { label: 'Passed', dot: 'bg-green-600 text-white', text: 'text-green-700' },
  reviewed: { label: 'Try again', dot: 'bg-amber-500 text-white', text: 'text-amber-700' },
  todo: { label: 'Not started', dot: 'bg-white ring-[1.5px] ring-inset ring-slate-300', text: 'text-slate-400' },
};

function previewLessonState(preview: WrapUpPreview, index: number): LessonState {
  if (preview === 'revisit' && (index === 3 || index === 6)) return 'reviewed';
  return index % 3 === 1 ? 'passed' : 'first';
}

function previewTestResult(preview: WrapUpPreview, lessonIds: string[]): TestResult {
  const missedLessonIds = preview === 'complete' ? [lessonIds[6]] : [lessonIds[3], lessonIds[6]];
  return {
    userId: 'preview',
    testType: 'unit_mcq',
    testId: 'preview',
    score: preview === 'complete' ? 87 : 60,
    totalQuestions: 15,
    completedAt: null,
    missedLessonIds: missedLessonIds.filter(Boolean),
  };
}

export function MacroUnitWrapUp({ unit, preview: requestedPreview }: { unit: number; preview?: WrapUpPreview }) {
  const { user, userData } = useAuthContext();
  const unitInfo = getGuidedCourseUnits().find((u) => u.unit === unit);
  const [savedTestResult, setTestResult] = useState<TestResult | null>(null);
  const preview =
    requestedPreview && (process.env.NODE_ENV === 'development' || hasAdminRole(userData)) ? requestedPreview : null;

  useEffect(() => {
    if (!user?.uid) return;
    let cancelled = false;
    getLatestTestResult(user.uid, getUnitMcqTestId(unit, 'macro')).then((result) => {
      if (!cancelled) setTestResult(result);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.uid, unit]);

  if (!unitInfo) return null;

  const lessons = unitInfo.lessons
    .filter((l) => l.href)
    .map((l, i) => ({
      ...l,
      href: l.href as string,
      state: preview ? previewLessonState(preview, i) : lessonState(getGuidedLessonProgress(userData, l.lessonId)),
    }));
  const testResult = preview ? previewTestResult(preview, lessons.map((l) => l.lessonId)) : savedTestResult;
  const count = (state: LessonState) => lessons.filter((l) => l.state === state).length;
  const todo = lessons.filter((l) => l.state === 'todo');
  const reviewed = lessons.filter((l) => l.state === 'reviewed');
  const doneCount = lessons.length - todo.length;
  const testHref = getUnitTestPreviewUrl(unit, 'macro', 'mcq');

  const headline =
    todo.length > 0
      ? `${todo.length} ${todo.length === 1 ? 'lesson' : 'lessons'} to go`
      : reviewed.length > 0
        ? `Unit ${unit} done, with ${reviewed.length} to revisit`
        : `Unit ${unit} complete`;
  const subline =
    todo.length > 0
      ? 'Finish the lessons first, then take the unit test to see what stuck.'
      : reviewed.length > 0
        ? 'Have another go at the big questions you reviewed, then take the unit test.'
        : 'You explained every big question. Now test yourself on AP-style questions.';
  const nextStep =
    todo.length > 0
      ? { href: todo[0].href, label: `Continue: ${todo[0].lessonId} ${todo[0].name}` }
      : reviewed.length > 0
        ? { href: reviewed[0].href, label: `Redo ${reviewed[0].lessonId}: ${reviewed[0].name}` }
        : { href: testHref, label: `Take the Unit ${unit} MCQ test` };

  const missedLessons = (testResult?.missedLessonIds ?? []).flatMap((id) => {
    const lesson = lessons.find((l) => l.lessonId === id);
    return lesson ? [lesson] : [];
  });
  const testCorrect = testResult ? Math.round((testResult.score / 100) * testResult.totalQuestions) : 0;

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#dbe3ee_1px,transparent_1px)] px-4 pb-20 pt-10 text-slate-900 [background-size:22px_22px]">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {preview ? (
          <p className="rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900">
            Preview: showing sample progress ({preview}). Nothing here is saved.
          </p>
        ) : null}
        <Link
          href="/ap-macro/explainers"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          All explainers
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.05)]">
          <header className="flex flex-col gap-5 px-5 pb-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex flex-col gap-1.5">
              <p className="text-[13px] font-bold tracking-wide text-blue-600">
                AP Macro · Unit {unit} · {unitInfo.name}
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Unit {unit} wrap-up</h1>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xl font-bold tracking-tight">{headline}</h2>
              <p className="text-[15px] leading-relaxed text-slate-600">{subline}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div aria-hidden className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${lessons.length ? (doneCount / lessons.length) * 100 : 0}%` }}
                />
              </div>
              <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                <Stat label="lessons done" value={`${doneCount} of ${lessons.length}`} />
                <Stat label="first try" value={count('first')} />
                <Stat label="passed" value={count('passed')} />
                <Stat label="to revisit" value={count('reviewed')} />
              </dl>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={nextStep.href} className={primaryButton}>
                {nextStep.label}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
              {nextStep.href !== testHref ? (
                <Link href={testHref} className={secondaryButton}>
                  Take the unit test anyway
                </Link>
              ) : null}
            </div>
          </header>

          <section aria-labelledby="unit-test-heading" className="flex flex-col gap-4 border-t border-slate-200 px-5 py-6 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden />
                <div className="flex min-w-0 flex-col gap-1">
                  <h2 id="unit-test-heading" className="text-base font-bold tracking-tight">
                    Unit {unit} MCQ test
                  </h2>
                  <p className="text-[15px] text-slate-600">
                    {testResult
                      ? `Last attempt: ${testResult.score}% (${testCorrect} of ${testResult.totalQuestions} correct)`
                      : 'AP-style multiple choice, timed. Missed questions link back to the lesson that covers them.'}
                  </p>
                </div>
              </div>
              {testResult ? (
                <Link
                  href={testHref}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  Retake
                </Link>
              ) : null}
            </div>
            {missedLessons.length > 0 ? (
              <div className="flex flex-col gap-1 pl-8">
                <p className="text-sm font-semibold text-slate-500">Your last test pointed to</p>
                <ul className="flex flex-col">
                  {missedLessons.map((lesson) => (
                    <li key={lesson.lessonId}>
                      <Link
                        href={lesson.href}
                        className="inline-block py-1 text-[15px] font-medium text-slate-900 hover:text-blue-700 hover:underline"
                      >
                        {lesson.lessonId} {lesson.name}
                        <ChevronRight className="ml-1 inline h-4 w-4 align-[-3px] text-slate-400" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section aria-labelledby="lessons-heading" className="border-t border-slate-200 px-3 py-4 sm:px-5">
            <h2 id="lessons-heading" className="px-2.5 pb-2 pt-2 text-base font-bold tracking-tight sm:px-3">
              Lessons
            </h2>
            <ol className="flex flex-col">
              {lessons.map((lesson) => {
                const style = STATE_STYLE[lesson.state];
                return (
                  <li key={lesson.lessonId}>
                    <Link
                      href={lesson.href}
                      className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition hover:bg-slate-50 sm:px-3"
                    >
                      <span
                        aria-hidden
                        className={`inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${style.dot}`}
                      >
                        {lesson.state === 'todo' ? null : lesson.state === 'reviewed' ? (
                          <RotateCcw className="h-3 w-3" strokeWidth={3} />
                        ) : (
                          <Check className="h-3 w-3" strokeWidth={3.5} />
                        )}
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug">
                        {lesson.lessonId} {lesson.name}
                      </span>
                      <span className={`hidden shrink-0 text-sm font-medium sm:inline ${style.text}`}>{style.label}</span>
                      <span className="sr-only sm:hidden">({style.label})</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        </article>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="sr-only">{label}</dt>
      <dd className="font-bold tabular-nums text-slate-900">{value}</dd>
      <span aria-hidden>{label}</span>
    </div>
  );
}
