'use client';

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Clock } from 'lucide-react';
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
import { hasAdminRole } from '@/lib/adminAccess';
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
  const canAccessGov = Boolean(user && hasAdminRole(userData));
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

  const primaryCta = isGov
    ? 'border-2 border-violet-800 bg-violet-600 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-violet-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]'
    : isStats
      ? 'border-2 border-orange-700 bg-orange-600 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-orange-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]'
      : isMicro
      ? 'border-2 border-green-700 bg-green-500 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-green-600 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]'
      : 'border-2 border-blue-700 bg-blue-500 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-blue-600 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]';

  const secondaryCtaOutline =
    'border-2 border-black bg-white shadow-[0_3px_0_0_rgba(0,0,0,1)] hover:border-black active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(0,0,0,1)]';

  const secondaryCta = isGov
    ? `${secondaryCtaOutline} text-violet-700 hover:bg-violet-50`
    : isStats
      ? `${secondaryCtaOutline} text-orange-600 hover:bg-orange-50`
      : isMicro
        ? `${secondaryCtaOutline} text-green-600 hover:bg-green-50`
        : `${secondaryCtaOutline} text-blue-600 hover:bg-blue-50`;

  const titleAccent = isGov
    ? 'text-violet-600'
    : isStats
      ? 'text-orange-600'
      : isMicro
        ? 'text-green-600'
        : 'text-blue-600';
  const titleShadow = isGov
    ? '2px 2px 0 rgba(124,58,237,0.2)'
    : isStats
      ? '2px 2px 0 rgba(234,88,12,0.2)'
      : isMicro
      ? '2px 2px 0 rgba(22,163,74,0.2)'
      : '2px 2px 0 rgba(59,130,246,0.2)';

  const badgeCourse = isGov
    ? 'bg-violet-600 text-white'
    : isStats
      ? 'bg-orange-600 text-white'
      : isMicro
      ? 'bg-green-500 text-white'
      : 'bg-blue-500 text-white';

  const cardShell =
    'rounded-xl border-2 border-gray-900 bg-white shadow-[5px_5px_0px_0px_rgba(17,24,39,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(17,24,39,0.85)]';

  const badgeBase =
    'inline-flex w-fit items-center border border-gray-900 px-3 py-1.5 text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(17,24,39,0.75)]';

  const resumeCta =
    'border-2 border-emerald-900 bg-emerald-600 text-white shadow-[0_3px_0_0_rgba(6,78,59,0.95)] hover:bg-emerald-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(6,78,59,0.85)]';

  const comingSoonCta =
    'inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border-2 border-gray-700 bg-gray-200 py-3.5 px-6 text-center text-base font-black uppercase tracking-wide text-gray-600 shadow-[0_3px_0_0_rgba(55,65,81,0.85)]';

  const fullExamsComingSoon = isGov || isStats;

  if (isGov && loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">Checking access…</p>
        </div>
      </div>
    );
  }

  if (isGov && !canAccessGov) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-900">AP Gov is in admin preview</h1>
          <p className="mt-3 text-gray-600">
            This content is currently restricted to admin accounts.
          </p>
          <Link
            href="/ap-macro-practice-tests"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Go to AP Macro practice tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h1
            className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl sm:leading-tight"
            style={{ textShadow: titleShadow }}
          >
            Full AP {subjectName}{' '}
            <span className={titleAccent}>Practice Tests</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-gray-600 sm:text-xl">
            Test your knowledge with full-length practice exams and unit tests.
          </p>
        </div>

        {/* Full exams — live for Macro/Micro; coming soon for Gov and Stats */}
        <section className="mb-14 sm:mb-20">
          <h2 className="mb-8 border-b-2 border-gray-800 pb-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Full Practice <span className={titleAccent}>Exams</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className={`flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardShell} ${fullExamsComingSoon ? 'opacity-90' : ''}`}>
              <div className="min-w-0 flex-1">
                <span className={`${badgeBase} ${badgeCourse}`}>
                  MCQ Exam
                </span>
                <h3 className="mt-4 text-xl font-black text-gray-900 sm:text-2xl">
                  AP {subjectName} Full MCQ Exam 1
                </h3>
                <p className="mt-2 font-medium leading-relaxed text-gray-600">
                  Comprehensive practice exam covering all units of AP {subjectName} with detailed explanations and progress
                  tracking.
                </p>
              </div>
              <div className="flex shrink-0 flex-col sm:items-end">
                {fullExamsComingSoon ? (
                  <span className={`${comingSoonCta} sm:min-w-[200px]`} aria-disabled>
                    <Clock className="h-5 w-5 shrink-0" />
                    Coming soon
                  </span>
                ) : (
                  <Link
                    href={`/full-mcq-exam-preview?subject=${effectiveSubject}&num=1`}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-base font-black uppercase tracking-wide transition-all sm:w-auto sm:min-w-[200px] ${primaryCta}`}
                  >
                    View test
                    <PlayCircle className="h-5 w-5 shrink-0" />
                  </Link>
                )}
              </div>
            </div>

            <div className={`flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardShell} ${fullExamsComingSoon ? 'opacity-90' : ''}`}>
              <div className="min-w-0 flex-1">
                <span className={`${badgeBase} ${badgeCourse}`}>
                  FRQ Exam
                </span>
                <h3 className="mt-4 text-xl font-black text-gray-900 sm:text-2xl">
                  AP {subjectName} Full FRQ Exam 1
                </h3>
                <p className="mt-2 font-medium leading-relaxed text-gray-600">
                  Full-length free response exam covering key units of AP {subjectName} with detailed explanations.
                </p>
              </div>
              <div className="flex shrink-0 flex-col sm:items-end">
                {fullExamsComingSoon ? (
                  <span className={`${comingSoonCta} sm:min-w-[200px]`} aria-disabled>
                    <Clock className="h-5 w-5 shrink-0" />
                    Coming soon
                  </span>
                ) : (
                  <Link
                    href={getFullFRQTestUrl(effectiveSubject)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-base font-black uppercase tracking-wide transition-all sm:w-auto sm:min-w-[200px] ${secondaryCta}`}
                  >
                    Start test
                    <ArrowRight className="h-5 w-5 shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Unit tests */}
        <section>
          <h2 className="mb-8 border-b-2 border-gray-800 pb-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Unit Practice <span className={titleAccent}>Tests</span>
          </h2>
          <div className="space-y-4 sm:space-y-5">
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
              const frqCta = isStats
                ? 'border-2 border-orange-800 bg-orange-600 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-orange-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]'
                : 'border-2 border-violet-800 bg-violet-600 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-violet-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]';
              const showFrqPackCard = (isGov && unitStimulusFrqs.length > 0) || isStats;
              const showEconFrqPracticeCard = !isGov && !isStats;
              const frqPackAvailable =
                (isGov && unitStimulusFrqs.length > 0) ||
                (isStats && unitStimulusFrqs.length > 0 && isStatsFrqTestUnitAvailable(unit.number));
              const econFrqPracticeHref = `/unitFRQpracticePage?subject=${effectiveSubject}&frqId=${effectiveSubject === 'macro' ? 1 : 2}`;

              return (
                <div key={unit.number} className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
                  <div
                    className={`flex rounded-xl border-2 border-gray-900 bg-white p-4 shadow-[5px_5px_0px_0px_rgba(17,24,39,0.85)] lg:col-span-2 ${!isAvailable ? 'opacity-80' : ''}`}
                  >
                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-h-0 sm:pr-3">
                        <div className="flex flex-wrap items-center gap-4">
                          <span className={`${badgeBase} ${badgeCourse}`}>
                            Unit {unit.number} MCQ
                          </span>
                          {showResume && resume ? (
                            <p className="text-sm font-bold text-emerald-800">
                              {resume.answered}/{resume.total} questions ({resume.percentFinished}% finished)
                            </p>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-lg font-black leading-snug text-gray-900 sm:text-xl">{unit.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-gray-600">
                          {unit.description}
                        </p>
                      </div>
                      <div className="sm:min-w-[180px] sm:max-w-[200px] sm:self-center">
                      {!isAvailable ? (
                        <span
                          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border-2 border-gray-700 bg-gray-200 py-2.5 px-4 text-center text-sm font-black uppercase tracking-wide text-gray-600 shadow-[0_3px_0_0_rgba(55,65,81,0.85)]"
                          aria-disabled
                        >
                          <Clock className="h-4 w-4 shrink-0" />
                          Coming soon
                        </span>
                      ) : showResume ? (
                        <Link
                          href={testHref}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-sm font-black uppercase tracking-wide transition-all ${resumeCta}`}
                        >
                          Resume test
                          <PlayCircle className="h-4 w-4 shrink-0" />
                        </Link>
                      ) : (
                        <Link
                          href={previewHref}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-sm font-black uppercase tracking-wide transition-all ${primaryCta} ${unitProgressLoading && user?.uid ? 'opacity-70' : ''}`}
                        >
                          Start test
                          <PlayCircle className="h-4 w-4 shrink-0" />
                        </Link>
                      )}
                      </div>
                    </div>
                  </div>

                  {showFrqPackCard ? (
                    <div className="flex rounded-xl border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(17,24,39,0.8)] lg:col-span-1">
                      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_170px] sm:items-center">
                        <div>
                          <h4 className="text-base font-black leading-tight tracking-tight text-gray-900">
                            Unit {unit.number} FRQ Pack
                          </h4>
                          {frqFormatLabels.length > 0 ? (
                            <p
                              className={`mt-2 text-xs font-semibold leading-snug ${isStats ? 'text-orange-900' : 'text-violet-900'}`}
                            >
                              {frqFormatLabels.join(' · ')}
                            </p>
                          ) : isStats ? (
                            <p className="mt-2 text-xs font-semibold leading-snug text-orange-900">
                              Investigative Task · Free Response
                            </p>
                          ) : null}
                        </div>
                        <div>
                          {frqPackAvailable ? (
                            <Link
                              href={getUnitTestPreviewUrl(unit.number, effectiveSubject, 'frq')}
                              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black uppercase tracking-wide transition-all active:translate-y-0.5 ${frqCta}`}
                            >
                              Start FRQ Pack
                              <PlayCircle className="h-4 w-4 shrink-0" />
                            </Link>
                          ) : (
                            <span className={`${comingSoonCta} py-2.5 px-3 text-xs`} aria-disabled>
                              <Clock className="h-4 w-4 shrink-0" />
                              Coming soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : showEconFrqPracticeCard ? (
                    <div className="flex rounded-xl border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(17,24,39,0.8)] lg:col-span-1">
                      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_170px] sm:items-center">
                        <div>
                          <h4 className="text-base font-black leading-tight tracking-tight text-gray-900">
                            Unit {unit.number} FRQ Practice
                          </h4>
                          <p className="mt-2 text-xs font-semibold leading-snug text-gray-700">
                            Unit FRQ tests are not available yet for AP {subjectName}. Use FRQ Practice to keep training.
                          </p>
                        </div>
                        <div>
                          <Link
                            href={econFrqPracticeHref}
                            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black uppercase tracking-wide transition-all active:translate-y-0.5 ${secondaryCta}`}
                          >
                            Start FRQ Practice
                            <PlayCircle className="h-4 w-4 shrink-0" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden lg:block" />
                  )}
                </div>
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
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-gray-800 border-t-transparent" />
            <p className="font-bold text-gray-700">Loading…</p>
          </div>
        </div>
      }
    >
      <UnitFinalPracticeTestsContent />
    </Suspense>
  );
}
