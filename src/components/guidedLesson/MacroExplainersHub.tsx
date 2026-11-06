'use client';

import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { getGuidedCourseUnits, guidedUnitWrapUpHref } from '@/data/guidedLessons';
import { getGuidedLessonProgress } from '@/lib/guidedLessonProgress';

export function MacroExplainersHub() {
  const { userData } = useAuthContext();
  const units = getGuidedCourseUnits();
  const statusOf = (lessonId: string) => getGuidedLessonProgress(userData, lessonId)?.status;

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#dbe3ee_1px,transparent_1px)] px-4 pb-20 pt-10 text-slate-900 [background-size:22px_22px]">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-lg text-blue-600" style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}>
            AP Macro
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="bg-[linear-gradient(transparent_58%,#fde68a_58%,#fde68a_92%,transparent_92%)] px-0.5">
              Explainers
            </span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Guided lessons for every topic: try the big question, learn it, walk through it, check yourself,
            then explain it in your own words.
          </p>
        </div>

        {units.map((unit) => {
          const available = unit.lessons.filter((l) => l.href).length;
          const done = unit.lessons.filter((l) => statusOf(l.lessonId)).length;
          return (
            <section
              key={unit.unit}
              aria-labelledby={`unit-${unit.unit}-heading`}
              className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
            >
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 id={`unit-${unit.unit}-heading`} className="text-lg font-bold tracking-tight">
                  Unit {unit.unit}: {unit.name}
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  {available === 0 ? 'Coming soon' : `${done} of ${unit.lessons.length} done`}
                </p>
              </div>
              <ol className="flex flex-col gap-0.5">
                {unit.lessons.map((lesson) => {
                  const status = statusOf(lesson.lessonId);
                  const label = (
                    <>
                      <span
                        className={`inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
                          status === 'passed'
                            ? 'bg-green-600 text-white'
                            : status === 'reviewed'
                              ? 'bg-amber-500 text-white'
                              : 'bg-white ring-[1.5px] ring-inset ring-slate-300'
                        }`}
                      >
                        {status ? <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden /> : null}
                      </span>
                      <span className="min-w-0 flex-1 text-[15px] leading-snug">
                        {lesson.lessonId} {lesson.name}
                        {status ? <span className="sr-only"> ({status === 'passed' ? 'complete' : 'reviewed'})</span> : null}
                      </span>
                    </>
                  );
                  return (
                    <li key={lesson.lessonId}>
                      {lesson.href ? (
                        <Link
                          href={lesson.href}
                          className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 font-medium text-slate-900 transition hover:bg-slate-50"
                        >
                          {label}
                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 font-medium text-slate-400">
                          {label}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
              {available > 0 ? (
                <Link
                  href={guidedUnitWrapUpHref(unit.unit)}
                  className="mt-3 inline-flex items-center gap-1 px-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {done === available ? 'Unit complete: see your wrap-up' : 'Unit wrap-up and test'}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
