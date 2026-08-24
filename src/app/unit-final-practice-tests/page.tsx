'use client';

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import {
  macroUnits as allMacroUnitsData,
  microUnits as allMicroUnitsData,
  govUnits as allGovUnitsData,
  statsUnits as allStatsUnitsData,
} from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePathname, useSearchParams } from 'next/navigation';
import type { CourseSubject } from '@/lib/courseSubject';
import { getUnitMCQTestUrl, getFullFRQTestUrl, getUnitTestPreviewUrl } from '@/lib/utils';
import { loadTestProgress } from '@/lib/testProgress';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { getGovUnitStimulusFrqs, getGovUnitFrqFormatLabels } from '@/data/gov/govUnitStimulusFrqs';
import { getStatsUnitStimulusFrqs, getStatsUnitFrqFormatLabels } from '@/data/stats/statsUnitStimulusFrqs';
import { isStatsFrqTestUnitAvailable } from '@/lib/courseSubject';
import { isGovMcqTestUnitAvailable, isStatsMcqTestUnitAvailable } from '@/lib/courseSubject';

/** In-progress unit MCQ saved in Firestore (same testId as FullExam). */
type UnitMcqResumeInfo = {
  answered: number;
  total: number;
  percentFinished: number;
};

const availableMicroUnits = [1, 2, 3, 4, 5, 6];

/** Pretty URLs rewrite internally without putting ?subject= in the address bar — use pathname as fallback. */
function subjectFromPracticeTestsPathname(pathname: string): CourseSubject | null {
  if (pathname === '/ap-gov-practice-tests') return 'gov';
  if (pathname === '/ap-stats-practice-tests') return 'stats';
  if (pathname === '/ap-micro-practice-tests') return 'micro';
  if (pathname === '/ap-macro-practice-tests') return 'macro';
  return null;
}

function UnitFinalPracticeTestsContent() {
  const { selectedSubject, user, userData, loadingUserData } = useAuthContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const subjectParam = searchParams.get('subject');
  const subjectFromPath = subjectFromPracticeTestsPathname(pathname);
  const effectiveSubject: CourseSubject =
    subjectParam === 'macro' ||
    subjectParam === 'micro' ||
    subjectParam === 'gov' ||
    subjectParam === 'stats'
      ? subjectParam
      : subjectFromPath ?? selectedSubject;

  const units =
    effectiveSubject === 'gov'
      ? allGovUnitsData
      : effectiveSubject === 'stats'
        ? allStatsUnitsData
        : effectiveSubject === 'micro'
          ? allMicroUnitsData
          : allMacroUnitsData;
  const isGov = effectiveSubject === 'gov';
  const isStats = effectiveSubject === 'stats';
  const isMicro = effectiveSubject === 'micro';
  const subjectName = isGov
    ? 'U.S. Government'
    : isStats
      ? 'Statistics'
      : effectiveSubject === 'macro'
        ? 'Macroeconomics'
        : 'Microeconomics';

  const isUnitAvailable = (unitNumber: number) => {
    if (isStats) {
      return isStatsMcqTestUnitAvailable(unitNumber);
    }
    if (isGov) {
      return isGovMcqTestUnitAvailable(unitNumber);
    }
    if (effectiveSubject === 'micro') {
      return availableMicroUnits.includes(unitNumber);
    }
    return true;
  };

  const apSubjectFilter = useMemo(() => {
    if (effectiveSubject === 'gov') return 'ap_us_government' as const;
    if (effectiveSubject === 'stats') return 'ap_statistics' as const;
    if (effectiveSubject === 'micro') return 'ap_microeconomics' as const;
    return 'ap_macroeconomics' as const;
  }, [effectiveSubject]);

  const [unitResumeByUnit, setUnitResumeByUnit] = useState<Record<number, UnitMcqResumeInfo | null>>({});
  const [unitProgressLoading, setUnitProgressLoading] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setUnitResumeByUnit({});
      setUnitProgressLoading(false);
      return;
    }

    let cancelled = false;
    setUnitProgressLoading(true);

    void (async () => {
      const next: Record<number, UnitMcqResumeInfo | null> = {};

      await Promise.all(
        units.map(async (unit) => {
          if (!isUnitAvailable(unit.number)) {
            next[unit.number] = null;
            return;
          }
          const testId = `unit_${unit.number}_${effectiveSubject}`;
          const totalFromBank = getUnitMCQTest(unit.number, apSubjectFilter).length;
          try {
            const p = await loadTestProgress(user.uid, testId);
            if (!p || p.isSubmitted) {
              next[unit.number] = null;
              return;
            }
            const answered = p.answeredQuestions ? Object.keys(p.answeredQuestions).length : 0;
            const idx = typeof p.currentQuestionIndex === 'number' ? p.currentQuestionIndex : 0;
            const hasProgress = answered > 0 || idx > 0;
            if (!hasProgress) {
              next[unit.number] = null;
              return;
            }
            const total =
              typeof p.totalQuestions === 'number' && p.totalQuestions > 0 ? p.totalQuestions : totalFromBank;
            const safeTotal = total > 0 ? total : totalFromBank;
            const percentFinished =
              safeTotal > 0 ? Math.min(100, Math.round((answered / safeTotal) * 100)) : 0;
            next[unit.number] = { answered, total: safeTotal, percentFinished };
          } catch {
            next[unit.number] = null;
          }
        })
      );

      if (!cancelled) {
        setUnitResumeByUnit(next);
        setUnitProgressLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.uid, effectiveSubject, units, apSubjectFilter]);

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `AP ${subjectName} Unit Practice Tests`,
      description: `Full-length practice tests for each unit of AP ${subjectName}`,
      itemListElement: units.map((unit: (typeof units)[number], index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Test',
          name: `AP ${subjectName} Unit ${unit.number} Practice Test: ${unit.title}`,
          description: unit.description,
          educationalLevel: 'High School',
          about: {
            '@type': 'Thing',
            name: `AP ${subjectName}`,
          },
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [units, subjectName]);

  const accentText = isGov
    ? 'text-violet-700'
    : isStats
      ? 'text-orange-700'
      : isMicro
        ? 'text-green-700'
        : 'text-blue-700';

  const accentLink = isGov
    ? 'text-violet-700 hover:text-violet-900'
    : isStats
      ? 'text-orange-700 hover:text-orange-900'
      : isMicro
        ? 'text-green-700 hover:text-green-900'
        : 'text-blue-700 hover:text-blue-900';

  const accentSoft = isGov
    ? 'bg-violet-50 text-violet-800'
    : isStats
      ? 'bg-orange-50 text-orange-800'
      : isMicro
        ? 'bg-green-50 text-green-800'
        : 'bg-blue-50 text-blue-800';

  const accentRing = isGov
    ? 'hover:bg-violet-50/40'
    : isStats
      ? 'hover:bg-orange-50/40'
      : isMicro
        ? 'hover:bg-green-50/40'
        : 'hover:bg-blue-50/40';

  const fullExamsComingSoon = isGov || isStats;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <header className="mb-14 sm:mb-16">
          <p
            className={`inline-flex rounded-md px-3.5 py-1.5 text-sm font-semibold sm:text-base ${
              isGov
                ? 'bg-violet-100 text-violet-800'
                : isStats
                  ? 'bg-orange-100 text-orange-800'
                  : isMicro
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
            }`}
          >
            AP {subjectName}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Practice Tests
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Full-length exams and unit assessments for AP {subjectName}. Timed sections, scored like the real thing.
          </p>
        </header>

        {/* Full exams */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
            Full practice exams
          </h2>
          <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
            <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Section I</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-950 sm:text-2xl">
                  Full MCQ Exam 1
                </h3>
                <p className="mt-1.5 text-base text-gray-600">
                  Comprehensive multiple-choice exam across all units.
                </p>
              </div>
              <div className="shrink-0">
                {fullExamsComingSoon ? (
                  <span className="inline-flex items-center gap-1.5 text-base font-medium text-gray-400">
                    <Clock className="h-4 w-4" />
                    Coming soon
                  </span>
                ) : (
                  <Link
                    href={`/full-mcq-exam-preview?subject=${effectiveSubject}&num=1`}
                    className={`inline-flex items-center gap-1.5 text-base font-semibold underline underline-offset-4 ${accentLink}`}
                  >
                    View exam
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Section II</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-950 sm:text-2xl">
                  Full FRQ Exam 1
                </h3>
                <p className="mt-1.5 text-base text-gray-600">
                  Free-response exam covering key course topics.
                </p>
              </div>
              <div className="shrink-0">
                {fullExamsComingSoon ? (
                  <span className="inline-flex items-center gap-1.5 text-base font-medium text-gray-400">
                    <Clock className="h-4 w-4" />
                    Coming soon
                  </span>
                ) : (
                  <Link
                    href={getFullFRQTestUrl(effectiveSubject)}
                    className={`inline-flex items-center gap-1.5 text-base font-semibold underline underline-offset-4 ${accentLink}`}
                  >
                    Start exam
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Unit tests */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
            Unit practice tests
          </h2>
          <p className="mt-2 max-w-2xl text-base text-gray-600">
            One assessment per unit. Start a timed MCQ test
            {(isGov || isStats) ? ', or open the unit FRQ pack where available' : ''}.
          </p>

          <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
            {units.map((unit) => {
              const isAvailable = isUnitAvailable(unit.number);
              const resume = isAvailable ? unitResumeByUnit[unit.number] : null;
              const showResume = Boolean(user?.uid && resume && !unitProgressLoading);
              const testHref = getUnitMCQTestUrl(unit.number, effectiveSubject);
              const previewHref = `/unit-test-preview?subject=${effectiveSubject}&unit=${unit.number}`;
              const unitStimulusFrqs = isGov
                ? getGovUnitStimulusFrqs(unit.number)
                : isStats
                  ? getStatsUnitStimulusFrqs(unit.number)
                  : [];
              const frqFormatLabels = isGov
                ? getGovUnitFrqFormatLabels(unit.number)
                : isStats
                  ? getStatsUnitFrqFormatLabels(unit.number)
                  : [];
              const showFrqPackCard = (isGov && unitStimulusFrqs.length > 0) || isStats;
              const showEconFrqPracticeCard = !isGov && !isStats;
              const frqPackAvailable =
                (isGov && unitStimulusFrqs.length > 0) ||
                (isStats && unitStimulusFrqs.length > 0 && isStatsFrqTestUnitAvailable(unit.number));
              const econFrqPracticeHref = `/unitFRQpracticePage?subject=${effectiveSubject}&frqId=${effectiveSubject === 'macro' ? 1 : 2}`;
              const frqLabels =
                frqFormatLabels.length > 0
                  ? frqFormatLabels
                  : isStats && frqPackAvailable
                    ? ['Investigative Task', 'Free Response']
                    : [];

              return (
                <article
                  key={unit.number}
                  className={`group relative grid gap-5 py-8 transition-colors sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8 sm:py-9 ${
                    isAvailable ? accentRing : 'opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:block">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums sm:h-12 sm:w-12 sm:text-base ${accentSoft}`}
                    >
                      {String(unit.number).padStart(2, '0')}
                    </span>
                    <p className="pt-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:mt-2 sm:pt-0">
                      Unit
                    </p>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold tracking-tight text-gray-950 sm:text-[1.35rem] sm:leading-snug">
                          {unit.title}
                        </h3>
                        <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-gray-500">
                          {unit.description}
                        </p>

                        {showResume && resume ? (
                          <div className="mt-4 max-w-md">
                            <div className="flex items-center justify-between gap-3 text-xs font-medium text-emerald-800">
                              <span>In progress</span>
                              <span className="tabular-nums">
                                {resume.answered}/{resume.total} · {resume.percentFinished}%
                              </span>
                            </div>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-[width]"
                                style={{ width: `${resume.percentFinished}%` }}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex w-full shrink-0 flex-col gap-2.5 sm:max-w-xs lg:w-56 lg:items-stretch">
                        {!isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-gray-400">
                            <Clock className="h-3.5 w-3.5" />
                            Coming soon
                          </span>
                        ) : (
                          <>
                            <Link
                              href={showResume ? testHref : previewHref}
                              className={`group/link inline-flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition ${
                                showResume
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:border-emerald-300 hover:bg-emerald-100'
                                  : `border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50 ${
                                      unitProgressLoading && user?.uid ? 'opacity-70' : ''
                                    }`
                              }`}
                            >
                              <span>{showResume ? 'Resume MCQ test' : 'Start MCQ test'}</span>
                              <ArrowRight
                                className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 ${
                                  showResume ? 'text-emerald-700' : accentText
                                }`}
                              />
                            </Link>

                            {showFrqPackCard ? (
                              frqPackAvailable ? (
                                <div>
                                  <Link
                                    href={getUnitTestPreviewUrl(unit.number, effectiveSubject, 'frq')}
                                    className={`group/link inline-flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50`}
                                  >
                                    <span>Start FRQ pack</span>
                                    <ArrowRight
                                      className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 ${accentText}`}
                                    />
                                  </Link>
                                  {frqLabels.length > 0 ? (
                                    <p className="mt-1.5 px-0.5 text-[11px] leading-snug text-gray-400">
                                      {frqLabels.join(' · ')}
                                    </p>
                                  ) : null}
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 self-start px-0.5 text-sm font-medium text-gray-400">
                                  <Clock className="h-3.5 w-3.5" />
                                  FRQ pack soon
                                </span>
                              )
                            ) : showEconFrqPracticeCard ? (
                              <Link
                                href={econFrqPracticeHref}
                                className={`group/link inline-flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50`}
                              >
                                <span>FRQ practice</span>
                                <ArrowRight
                                  className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 ${accentText}`}
                                />
                              </Link>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function UnitFinalPracticeTestsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
            <p className="font-medium text-gray-600">Loading…</p>
          </div>
        </div>
      }
    >
      <UnitFinalPracticeTestsContent />
    </Suspense>
  );
}
