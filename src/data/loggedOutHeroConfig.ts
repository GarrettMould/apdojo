import type { CourseSubject } from '@/lib/courseSubject';

export type LoggedOutHeroVariant = 'econ' | 'stats' | 'gov';

export const LOGGED_OUT_HERO_VARIANTS: LoggedOutHeroVariant[] = ['econ', 'stats', 'gov'];

/** @deprecated Subject cycling removed from the logged-out homepage. */
export const LOGGED_OUT_HERO_CYCLE_MS = 5000;

/** @deprecated Prefer the static multi-course homepage. */
export function pickLoggedOutHeroVariant(): LoggedOutHeroVariant {
  return LOGGED_OUT_HERO_VARIANTS[Math.floor(Math.random() * LOGGED_OUT_HERO_VARIANTS.length)];
}

/** @deprecated Prefer the static multi-course homepage. */
export function buildHeroVariantCycle(): LoggedOutHeroVariant[] {
  const startIdx = Math.floor(Math.random() * LOGGED_OUT_HERO_VARIANTS.length);
  return LOGGED_OUT_HERO_VARIANTS.map(
    (_, i) => LOGGED_OUT_HERO_VARIANTS[(startIdx + i) % LOGGED_OUT_HERO_VARIANTS.length],
  );
}

export type LoggedOutCourseOffering = {
  id: CourseSubject;
  shortLabel: string;
  title: string;
  blurb: string;
  badgeClass: string;
  accentText: string;
  tileHover: string;
  purchaseHref: string;
};

/** Four courses shown on the logged-out homepage. */
export const LOGGED_OUT_COURSE_OFFERINGS: LoggedOutCourseOffering[] = [
  {
    id: 'macro',
    shortLabel: 'Macro',
    title: 'AP Macroeconomics',
    blurb: 'National income, policy graphs, and FRQ drills rebuilt for the 2027 exam.',
    badgeClass: 'bg-blue-600',
    accentText: 'text-blue-600',
    tileHover: 'hover:bg-blue-50/40',
    purchaseHref: '/purchase/season-pass?courseType=macro',
  },
  {
    id: 'micro',
    shortLabel: 'Micro',
    title: 'AP Microeconomics',
    blurb: 'Markets, costs, and firm behavior with interactive practice for 2027.',
    badgeClass: 'bg-emerald-600',
    accentText: 'text-emerald-600',
    tileHover: 'hover:bg-emerald-50/40',
    purchaseHref: '/purchase/season-pass?courseType=micro',
  },
  {
    id: 'gov',
    shortLabel: 'Gov',
    title: 'AP U.S. Government',
    blurb: 'Constitution, institutions, and SCOTUS comparison practice for 2027.',
    badgeClass: 'bg-violet-600',
    accentText: 'text-violet-600',
    tileHover: 'hover:bg-violet-50/40',
    purchaseHref: '/purchase/season-pass?courseType=gov',
  },
  {
    id: 'stats',
    shortLabel: 'Stats',
    title: 'AP Statistics',
    blurb: 'Inference, FRQ packs, and TI-84 drills updated for the 2027 CED.',
    badgeClass: 'bg-orange-600',
    accentText: 'text-orange-600',
    tileHover: 'hover:bg-orange-50/40',
    purchaseHref: '/purchase/season-pass?courseType=stats',
  },
];

export type HeroTheme = {
  accentClass: string;
  btnClass: string;
  mcqCorrectClass: string;
  mcqCorrectBadgeClass: string;
};

export type LoggedOutHeroConfig = {
  variant: LoggedOutHeroVariant;
  headline: string;
  countdownLabel: string;
  examDate: Date;
  theme: HeroTheme;
  ctaHref: string;
  ctaLabel: string;
  subheadline: string;
  /** Static raster of the cheat-sheet PDF (same crop as the old iframe preview). */
  cheatSheetPreviewSrc: string | null;
  cheatSheetPreviewAlt: string;
  cheatSheetHref: string;
  mcqPreview: {
    question: string;
    options: Array<{ letter: string; text: string; correct: boolean }>;
  };
  frqPreview: {
    label: string;
    score: string;
    feedback: string;
  };
};

const ECON_THEMES = {
  macro: {
    accentClass: 'text-blue-500',
    btnClass: 'bg-blue-600 hover:bg-blue-700',
    mcqCorrectClass: 'bg-green-50 border-green-400 text-green-800',
    mcqCorrectBadgeClass: 'bg-green-500 border-green-500 text-white',
  },
  micro: {
    accentClass: 'text-green-500',
    btnClass: 'bg-green-600 hover:bg-green-700',
    mcqCorrectClass: 'bg-green-50 border-green-400 text-green-800',
    mcqCorrectBadgeClass: 'bg-green-500 border-green-500 text-white',
  },
} as const;

const HERO_PREVIEWS = {
  macro: '/cheat-sheet-previews/macro/unit-1.webp',
  micro: '/cheat-sheet-previews/micro/unit-1.webp',
  stats: '/cheat-sheet-previews/stats/unit-2.webp',
  gov: '/cheat-sheet-previews/gov/unit-2.webp',
} as const;

/** Kept for feature-preview components that still key off a single subject. */
export function getLoggedOutHeroConfig(
  variant: LoggedOutHeroVariant,
  econSubject: 'macro' | 'micro' = 'macro',
): LoggedOutHeroConfig {
  if (variant === 'stats') {
    return {
      variant,
      headline: 'Score a 5 on\nAP Stats.',
      countdownLabel: 'Stats',
      examDate: new Date('2027-05-14T12:00:00'),
      theme: {
        accentClass: 'text-orange-500',
        btnClass: 'bg-orange-600 hover:bg-orange-700',
        mcqCorrectClass: 'bg-green-50 border-green-400 text-green-800',
        mcqCorrectBadgeClass: 'bg-green-500 border-green-500 text-white',
      },
      ctaHref: '/purchase/season-pass?courseType=stats',
      ctaLabel: 'Get the Season Pass — $29',
      subheadline:
        'Unit MCQ practice, FRQ packs, printable cheat sheets, and more — built for the 2027 AP Statistics CED.',
      cheatSheetPreviewSrc: HERO_PREVIEWS.stats,
      cheatSheetPreviewAlt: 'AP Stats Unit 2 cheat sheet preview',
      cheatSheetHref: '/ap-stats-unit-2-cheat-sheet',
      mcqPreview: {
        question: 'Which of the following best describes a simple random sample (SRS)?',
        options: [
          { letter: 'A', text: 'Every individual has an equal chance of selection', correct: true },
          { letter: 'B', text: 'The sample matches population demographics', correct: false },
          { letter: 'C', text: 'Observations are collected without replacement only', correct: false },
        ],
      },
      frqPreview: {
        label: 'AI FRQ Feedback',
        score: '3 / 4 pts',
        feedback:
          '✓ Strong work. You correctly identified the parameter and checked the Large Counts condition, but your interval interpretation should reference the population proportion in context.',
      },
    };
  }

  if (variant === 'gov') {
    return {
      variant,
      headline: 'Score a 5 on\nAP Gov.',
      countdownLabel: 'Gov',
      examDate: new Date('2027-05-11T12:00:00'),
      theme: {
        accentClass: 'text-violet-500',
        btnClass: 'bg-violet-600 hover:bg-violet-700',
        mcqCorrectClass: 'bg-green-50 border-green-400 text-green-800',
        mcqCorrectBadgeClass: 'bg-green-500 border-green-500 text-white',
      },
      ctaHref: '/purchase/season-pass?courseType=gov',
      ctaLabel: 'Get the Season Pass — $29',
      subheadline:
        'Full unit MCQ practice, SCOTUS comparison drills, Gov FRQ packs, printable cheat sheets, and more — all for $29.',
      cheatSheetPreviewSrc: HERO_PREVIEWS.gov,
      cheatSheetPreviewAlt: 'AP Gov Unit 2 cheat sheet preview',
      cheatSheetHref: '/ap-gov-unit-2-cheat-sheet',
      mcqPreview: {
        question: 'Which principle best explains why the Bill of Rights limits national government power?',
        options: [
          { letter: 'A', text: 'Federalism', correct: false },
          { letter: 'B', text: 'Limited government', correct: true },
          { letter: 'C', text: 'Pluralism', correct: false },
        ],
      },
      frqPreview: {
        label: 'SCOTUS Comparison',
        score: '2 / 2 pts',
        feedback:
          '✓ Correct. You identified a shared constitutional principle and explained how each case applied it to a different constitutional clause.',
      },
    };
  }

  const theme = ECON_THEMES[econSubject];
  const isMicro = econSubject === 'micro';

  return {
    variant: 'econ',
    headline: 'Score a 5 on\nAP Econ.',
    countdownLabel: isMicro ? 'Micro' : 'Macro',
    examDate: new Date(isMicro ? '2027-05-04T12:00:00' : '2027-05-08T12:00:00'),
    theme,
    ctaHref: `/purchase/season-pass?courseType=${econSubject}`,
    ctaLabel: 'Get the Season Pass — $29',
    subheadline:
      'Full practice exams, unlimited MCQ practice, AI-graded FRQs, printable cheat sheets, and more — all for $29.',
    cheatSheetPreviewSrc: isMicro ? HERO_PREVIEWS.micro : HERO_PREVIEWS.macro,
    cheatSheetPreviewAlt: isMicro
      ? 'AP Micro Unit 1 cheat sheet preview'
      : 'AP Macro Unit 1 cheat sheet preview',
    cheatSheetHref: '/unit/1',
    mcqPreview: {
      question: '"In a competitive market, equilibrium is achieved when..."',
      options: [
        { letter: 'A', text: 'There is a surplus of the good', correct: false },
        { letter: 'B', text: 'Qty supplied = qty demanded', correct: true },
        { letter: 'C', text: 'Price is set by the government', correct: false },
      ],
    },
    frqPreview: {
      label: 'AI FRQ Feedback',
      score: '1 / 1 pts',
      feedback:
        '✓ Correct. You identified that decreasing the IOR rate increases the money supply and lowers interest rates — consistent with expansionary monetary policy.',
    },
  };
}
