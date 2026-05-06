'use client';

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle, Clock } from 'lucide-react';
import {
  macroUnits as allMacroUnitsData,
  microUnits as allMicroUnitsData,
  govUnits as allGovUnitsData,
} from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePathname, useSearchParams } from 'next/navigation';
import type { CourseSubject } from '@/lib/courseSubject';
import { getUnitMCQTestUrl, getFullFRQTestUrl } from '@/lib/utils';
import { loadTestProgress } from '@/lib/testProgress';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { getGovUnitStimulusFrqs } from '@/data/gov/govUnitStimulusFrqs';

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
  if (pathname === '/ap-micro-practice-tests') return 'micro';
  if (pathname === '/ap-macro-practice-tests') return 'macro';
  return null;
}

function UnitFinalPracticeTestsContent() {
  const { selectedSubject, user } = useAuthContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const subjectParam = searchParams.get('subject');
  const subjectFromPath = subjectFromPracticeTestsPathname(pathname);
  const effectiveSubject: CourseSubject =
    subjectParam === 'macro' || subjectParam === 'micro' || subjectParam === 'gov'
      ? subjectParam
      : subjectFromPath ?? selectedSubject;

  const units =
    effectiveSubject === 'gov'
      ? allGovUnitsData
      : effectiveSubject === 'micro'
        ? allMicroUnitsData
        : allMacroUnitsData;
  const isGov = effectiveSubject === 'gov';
  const isMicro = effectiveSubject === 'micro';
  const subjectName = isGov
    ? 'U.S. Government and Politics'
    : effectiveSubject === 'macro'
      ? 'Macroeconomics'
      : 'Microeconomics';

  const isUnitAvailable = (unitNumber: number) => {
    if (isGov) {
      return unitNumber === 1;
    }
    if (effectiveSubject === 'micro') {
      return availableMicroUnits.includes(unitNumber);
    }
    return true;
  };

  const apSubjectFilter = useMemo(() => {
    if (effectiveSubject === 'gov') return 'ap_us_government' as const;
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

  const primaryCta = isGov
    ? 'border-2 border-violet-800 bg-violet-600 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-violet-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]'
    : isMicro
      ? 'border-2 border-green-700 bg-green-500 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-green-600 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]'
      : 'border-2 border-blue-700 bg-blue-500 text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] hover:bg-blue-600 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]';

  const secondaryCta = isGov
    ? 'border-2 border-gray-300 bg-white text-violet-700 shadow-[0_2px_0_0_rgba(156,163,175,0.9)] hover:border-gray-800 hover:bg-gray-50 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(156,163,175,0.9)]'
    : isMicro
      ? 'border-2 border-gray-300 bg-white text-green-600 shadow-[0_2px_0_0_rgba(156,163,175,0.9)] hover:border-gray-800 hover:bg-gray-50 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(156,163,175,0.9)]'
      : 'border-2 border-gray-300 bg-white text-blue-600 shadow-[0_2px_0_0_rgba(156,163,175,0.9)] hover:border-gray-800 hover:bg-gray-50 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(156,163,175,0.9)]';

  const titleAccent = isGov ? 'text-violet-600' : isMicro ? 'text-green-600' : 'text-blue-600';
  const titleShadow = isGov
    ? '2px 2px 0 rgba(124,58,237,0.2)'
    : isMicro
      ? '2px 2px 0 rgba(22,163,74,0.2)'
      : '2px 2px 0 rgba(59,130,246,0.2)';

  const badgeCourse = isGov
    ? 'bg-violet-600 text-white'
    : isMicro
      ? 'bg-green-500 text-white'
      : 'bg-blue-500 text-white';

  const cardShell =
    'rounded-xl border-2 border-gray-900 bg-white shadow-[5px_5px_0px_0px_rgba(17,24,39,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(17,24,39,0.85)]';

  const badgeBase =
    'inline-flex w-fit items-center border border-gray-900 px-3 py-1.5 text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(17,24,39,0.75)]';

  const resumeCta =
    'border-2 border-emerald-900 bg-emerald-600 text-white shadow-[0_3px_0_0_rgba(6,78,59,0.95)] hover:bg-emerald-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(6,78,59,0.85)]';

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

        {/* Full exams (econ only — Gov full exams not shipped yet) */}
        {!isGov && (
        <section className="mb-14 sm:mb-20">
          <h2 className="mb-8 border-b-2 border-gray-800 pb-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Full Practice <span className={titleAccent}>Exams</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className={`flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardShell}`}>
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
                <Link
                  href={`/full-mcq-exam-preview?subject=${effectiveSubject}&num=1`}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-base font-black uppercase tracking-wide transition-all sm:w-auto sm:min-w-[200px] ${primaryCta}`}
                >
                  View test
                  <PlayCircle className="h-5 w-5 shrink-0" />
                </Link>
              </div>
            </div>

            <div className={`flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${cardShell}`}>
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
                <Link
                  href={getFullFRQTestUrl(effectiveSubject)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-base font-black uppercase tracking-wide transition-all sm:w-auto sm:min-w-[200px] ${secondaryCta}`}
                >
                  Start test
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Unit tests */}
        <section>
          <h2 className="mb-8 border-b-2 border-gray-800 pb-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Unit Practice <span className={titleAccent}>Tests</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {units.map((unit) => {
              const isAvailable = isUnitAvailable(unit.number);
              const resume = isAvailable ? unitResumeByUnit[unit.number] : null;
              const showResume = Boolean(user?.uid && resume && !unitProgressLoading);
              const testHref = getUnitMCQTestUrl(unit.number, effectiveSubject);
              const previewHref = `/unit-test-preview?subject=${effectiveSubject}&unit=${unit.number}`;
              const unitStimulusFrqs = isGov ? getGovUnitStimulusFrqs(unit.number) : [];

              return (
                <div key={unit.number} className="flex h-full flex-col gap-3">
                  <div
                    className={`flex h-full flex-col p-6 sm:p-8 ${cardShell} ${!isAvailable ? 'opacity-80' : ''}`}
                  >
                    <div className="min-h-0 flex-1">
                      <span className={`${badgeBase} ${badgeCourse}`}>
                        Unit {unit.number}
                      </span>
                      <h3 className="mt-4 text-xl font-black leading-snug text-gray-900 sm:text-2xl">{unit.title}</h3>
                      {showResume && resume ? (
                        <p className="mt-2 text-sm font-bold text-emerald-800 sm:text-base">
                          {resume.answered}/{resume.total} questions ({resume.percentFinished}% finished)
                        </p>
                      ) : null}
                      <p className="mt-3 min-h-[4.5rem] font-medium leading-relaxed text-gray-600 sm:min-h-[5.5rem]">
                        {unit.description}
                      </p>
                    </div>
                    <div className="mt-8">
                      {!isAvailable ? (
                        <span
                          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border-2 border-gray-700 bg-gray-200 py-3.5 px-6 text-center text-base font-black uppercase tracking-wide text-gray-600 shadow-[0_3px_0_0_rgba(55,65,81,0.85)]"
                          aria-disabled
                        >
                          <Clock className="h-5 w-5 shrink-0" />
                          Coming soon
                        </span>
                      ) : showResume ? (
                        <Link
                          href={testHref}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-base font-black uppercase tracking-wide transition-all ${resumeCta}`}
                        >
                          Resume test
                          <PlayCircle className="h-5 w-5 shrink-0" />
                        </Link>
                      ) : (
                        <Link
                          href={previewHref}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-base font-black uppercase tracking-wide transition-all ${primaryCta} ${unitProgressLoading && user?.uid ? 'opacity-70' : ''}`}
                        >
                          View test
                          <PlayCircle className="h-5 w-5 shrink-0" />
                        </Link>
                      )}
                    </div>
                  </div>
                  {unitStimulusFrqs.length > 0 ? (
                    <div className="rounded-xl border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(17,24,39,0.8)]">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-black uppercase tracking-wide text-violet-800">
                          FRQ Pack 3 Questions
                        </p>
                        <span className="rounded-md border border-violet-800 bg-violet-100 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-violet-800">
                          Beta
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {unitStimulusFrqs.map((frq) => (
                          <li
                            key={frq.id}
                            className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-900"
                          >
                            {frq.title}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/ap-gov-frq-practice-packs"
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-violet-800 bg-violet-600 px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[0_3px_0_0_rgba(17,24,39,0.9)] transition-all hover:bg-violet-700 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(17,24,39,0.85)]"
                      >
                        Start FRQ Pack
                        <PlayCircle className="h-4 w-4 shrink-0" />
                      </Link>
                    </div>
                  ) : null}
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
