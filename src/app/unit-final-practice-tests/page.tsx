'use client';

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
import {
  formatTestTime,
  getUnitTestMeta,
  unitFrqTimeLimitSeconds,
  STATS_FULL_MCQ_SECONDS,
} from '@/data/unitTestMeta';
import { loadTestProgress } from '@/lib/testProgress';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { getGovUnitStimulusFrqs, getGovUnitFrqFormatLabels } from '@/data/gov/govUnitStimulusFrqs';
import { getStatsUnitStimulusFrqs, getStatsUnitFrqFormatLabels } from '@/data/stats/statsUnitStimulusFrqs';
import { isStatsFrqTestUnitAvailable } from '@/lib/courseSubject';
import { STATS_FULL_MCQ_EXAM_1_IDS } from '@/data/stats/statsFullMcqExam1Ids';
import { FEATURES } from '@/lib/featureFlags';
import { isGovMcqTestUnitAvailable, isStatsMcqTestUnitAvailable } from '@/lib/courseSubject';

/** Same as the Stats full exam timer in FullExam. */
const statsFullMcqMinutes = STATS_FULL_MCQ_SECONDS / 60;

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

  const accent = isGov
    ? {
        text: 'text-violet-700',
        eyebrow: 'text-violet-700',
        button: 'bg-violet-700 text-white hover:bg-violet-800',
        tile: 'border-violet-200 bg-violet-50/60 hover:border-violet-300 hover:bg-violet-50',
        tileLabel: 'text-violet-900',
      }
    : isStats
      ? {
          text: 'text-orange-700',
          eyebrow: 'text-orange-700',
          button: 'bg-orange-600 text-white hover:bg-orange-700',
          tile: 'border-orange-200 bg-orange-50/60 hover:border-orange-300 hover:bg-orange-50',
          tileLabel: 'text-orange-900',
        }
      : isMicro
        ? {
            text: 'text-green-700',
            eyebrow: 'text-green-700',
            button: 'bg-green-700 text-white hover:bg-green-800',
            tile: 'border-green-200 bg-green-50/60 hover:border-green-300 hover:bg-green-50',
            tileLabel: 'text-green-900',
          }
        : {
            text: 'text-blue-700',
            eyebrow: 'text-blue-700',
            button: 'bg-blue-700 text-white hover:bg-blue-800',
            tile: 'border-blue-200 bg-blue-50/60 hover:border-blue-300 hover:bg-blue-50',
            tileLabel: 'text-blue-900',
          };

  const fullExam = isStats
    ? { mcqQuestions: STATS_FULL_MCQ_EXAM_1_IDS.length, mcqMinutes: statsFullMcqMinutes, frqQuestions: 4, frqMinutes: 90 }
    : isGov
      ? { mcqQuestions: 55, mcqMinutes: 80, frqQuestions: 4, frqMinutes: 100 }
      : { mcqQuestions: 60, mcqMinutes: 70, frqQuestions: 3, frqMinutes: 60 };

  const fullMcqComingSoon = isGov || (isStats && !FEATURES.statsFullMcqExam);
  const fullFrqComingSoon = isGov || (isStats && !FEATURES.statsFullFrqExam);
  const fullExamsComingSoon = fullMcqComingSoon && fullFrqComingSoon;

  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} min`;
    return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
  };

  const { availableUnits, unavailableUnits } = useMemo(() => {
    const available: (typeof units)[number][] = [];
    const unavailable: (typeof units)[number][] = [];
    for (const unit of units) {
      if (isUnitAvailable(unit.number)) available.push(unit);
      else unavailable.push(unit);
    }
    return { availableUnits: available, unavailableUnits: unavailable };
  }, [units, effectiveSubject, isGov, isStats, isMicro]);

  const tileBase =
    'group/tile flex min-w-0 items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors';

  const renderTile = (opts: {
    href: string;
    label: string;
    meta?: string;
    title?: string;
    variant: 'primary' | 'secondary' | 'resume';
  }) => {
    const variantClass =
      opts.variant === 'resume'
        ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-300 hover:bg-emerald-100/70'
        : opts.variant === 'primary'
          ? accent.tile
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50';
    const labelClass =
      opts.variant === 'resume' ? 'text-emerald-900' : opts.variant === 'primary' ? accent.tileLabel : 'text-gray-900';
    const arrowClass = opts.variant === 'resume' ? 'text-emerald-700' : accent.text;
    return (
      <Link href={opts.href} title={opts.title} className={`${tileBase} ${variantClass}`}>
        <span className="min-w-0">
          <span className={`block text-sm font-semibold ${labelClass}`}>{opts.label}</span>
          {opts.meta ? <span className="mt-0.5 block text-xs tabular-nums text-gray-500">{opts.meta}</span> : null}
        </span>
        <ArrowRight
          className={`h-4 w-4 shrink-0 transition-transform group-hover/tile:translate-x-0.5 ${arrowClass}`}
          aria-hidden
        />
      </Link>
    );
  };

  const renderUnitRow = (unit: (typeof units)[number], isAvailable: boolean) => {
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
    const showEconFrqPractice = !isGov && !isStats;
    const frqPackAvailable =
      (isGov && unitStimulusFrqs.length > 0) ||
      (isStats && unitStimulusFrqs.length > 0 && isStatsFrqTestUnitAvailable(unit.number));
    const econFrqPracticeHref = `/unitFRQpracticePage?subject=${effectiveSubject}&frqId=${effectiveSubject === 'macro' ? 1 : 2}`;
    const mcqMeta = getUnitTestMeta(effectiveSubject, unit.number);
    const frqCount = frqPackAvailable ? unitStimulusFrqs.length : 0;
    const frqSeconds =
      frqCount > 0 && (isGov || isStats) ? unitFrqTimeLimitSeconds(frqCount, isGov ? 'gov' : 'stats') : 0;

    return (
      <li
        key={unit.number}
        className={`grid gap-4 px-5 py-6 sm:px-6 md:grid-cols-[minmax(0,1fr)_22rem] md:items-center md:gap-8 ${
          isAvailable ? '' : 'opacity-60'
        }`}
      >
        <div className="min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-[0.14em] tabular-nums ${accent.eyebrow}`}>
            Unit {unit.number}
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-gray-950">{unit.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-500">{unit.description}</p>
          {showResume && resume ? (
            <div className="mt-3 flex max-w-xs items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-[width]"
                  style={{ width: `${resume.percentFinished}%` }}
                />
              </div>
              <span className="text-xs font-medium tabular-nums text-emerald-800">
                {resume.answered}/{resume.total} answered
              </span>
            </div>
          ) : null}
        </div>

        {isAvailable ? (
          <div className="grid grid-cols-2 gap-2.5">
            {renderTile({
              href: showResume ? testHref : previewHref,
              label: showResume ? 'Resume MCQ test' : 'MCQ test',
              meta: mcqMeta
                ? `${mcqMeta.questionCount} Q · ${formatTestTime(mcqMeta.timeLimitSeconds)}`
                : undefined,
              variant: showResume ? 'resume' : 'primary',
            })}
            {frqPackAvailable
              ? renderTile({
                  href: getUnitTestPreviewUrl(unit.number, effectiveSubject, 'frq'),
                  label: 'FRQ pack',
                  meta: `${frqCount} Q · ${formatTestTime(frqSeconds)}`,
                  title: frqFormatLabels.length > 0 ? frqFormatLabels.join(' · ') : undefined,
                  variant: 'secondary',
                })
              : showEconFrqPractice
                ? renderTile({ href: econFrqPracticeHref, label: 'FRQ practice', variant: 'secondary' })
                : null}
          </div>
        ) : (
          <p className="text-sm font-medium text-gray-400 md:text-right">Coming soon</p>
        )}
      </li>
    );
  };

  const notPosted = (
    <span className="inline-flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-500">
      Not posted yet
    </span>
  );

  const renderSection = (opts: {
    section: string;
    name: string;
    questions: number;
    minutes: number;
    href: string;
    comingSoon: boolean;
  }) => (
    <div className="flex flex-col p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{opts.section}</p>
      <h3 className="mt-1 text-lg font-semibold text-gray-950">{opts.name}</h3>
      <dl className="mt-4 flex gap-8">
        <div>
          <dt className="text-xs text-gray-500">Questions</dt>
          <dd className="text-2xl font-semibold tabular-nums tracking-tight text-gray-950">{opts.questions}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500">Time</dt>
          <dd className="text-2xl font-semibold tabular-nums tracking-tight text-gray-950">
            {formatMinutes(opts.minutes)}
          </dd>
        </div>
      </dl>
      <div className="mt-6 sm:mt-auto sm:pt-6">
        {opts.comingSoon ? (
          notPosted
        ) : (
          <Link
            href={opts.href}
            className={`group/link inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${accent.button}`}
          >
            Start {opts.section}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );

  const fullExamsSection = (
    <section className={fullExamsComingSoon ? 'mt-16' : 'mb-16'}>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-gray-950">Full Practice Exam 1</h2>
            <p className="text-sm tabular-nums text-gray-500">
              {formatMinutes(fullExam.mcqMinutes + fullExam.frqMinutes)} total
            </p>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            {fullExamsComingSoon
              ? 'A full exam in the official format is not posted yet. The unit tests are ready now.'
              : 'The complete AP exam in the official format. Take the sections back to back, or one at a time.'}
          </p>
        </div>
        <div className="grid divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {renderSection({
            section: 'Section I',
            name: 'Multiple choice',
            questions: fullExam.mcqQuestions,
            minutes: fullExam.mcqMinutes,
            href: `/full-mcq-exam-preview?subject=${effectiveSubject}&num=1`,
            comingSoon: fullMcqComingSoon,
          })}
          {renderSection({
            section: 'Section II',
            name: 'Free response',
            questions: fullExam.frqQuestions,
            minutes: fullExam.frqMinutes,
            href: getFullFRQTestUrl(effectiveSubject),
            comingSoon: fullFrqComingSoon,
          })}
        </div>
      </div>
    </section>
  );

  const unitTestsSection = (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-gray-950">Unit tests</h2>
        <p className="text-sm text-gray-500">
          {isGov || isStats ? 'A timed MCQ test and an FRQ pack for each unit' : 'A timed MCQ test and FRQ practice for each unit'}
        </p>
      </div>
      <ul className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {availableUnits.map((unit) => renderUnitRow(unit, true))}
        {unavailableUnits.map((unit) => renderUnitRow(unit, false))}
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-10">
          <p className={`text-sm font-semibold ${accent.eyebrow}`}>AP {subjectName}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Practice tests</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            Full-length exams and unit tests, timed and scored like the real AP exam.
          </p>
        </header>

        {fullExamsComingSoon ? (
          <>
            {unitTestsSection}
            {fullExamsSection}
          </>
        ) : (
          <>
            {fullExamsSection}
            {unitTestsSection}
          </>
        )}
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
