export type LoggedOutHeroVariant = 'econ' | 'stats' | 'gov';

export const LOGGED_OUT_HERO_VARIANTS: LoggedOutHeroVariant[] = ['econ', 'stats', 'gov'];

/** Time each hero subject is shown during the one-time homepage cycle (~15s total). */
export const LOGGED_OUT_HERO_CYCLE_MS = 5000;

export function pickLoggedOutHeroVariant(): LoggedOutHeroVariant {
  return LOGGED_OUT_HERO_VARIANTS[Math.floor(Math.random() * LOGGED_OUT_HERO_VARIANTS.length)];
}

/** Random start, then the other two — shown once each, no loop. */
export function buildHeroVariantCycle(): LoggedOutHeroVariant[] {
  const startIdx = Math.floor(Math.random() * LOGGED_OUT_HERO_VARIANTS.length);
  return LOGGED_OUT_HERO_VARIANTS.map(
    (_, i) => LOGGED_OUT_HERO_VARIANTS[(startIdx + i) % LOGGED_OUT_HERO_VARIANTS.length],
  );
}

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
  pdfSrc: string | null;
  /** Subject FRQ / stimulus images shown in the Unit 1 cheat sheet preview (stats & gov). */
  cheatSheetPreviewImages: Array<{ src: string; alt: string }>;
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

const PDF_VIEWER_FRAGMENT = '#toolbar=0&navpanes=0&scrollbar=0';

const STATS_UNIT_2_PDF =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/apstats/AP+Stats+-+Unit+2.pdf';
const GOV_UNIT_2_PDF =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/apgov/AP+Gov+-+Unit+2+-+CS.pdf';

export function getLoggedOutHeroConfig(
  variant: LoggedOutHeroVariant,
  econSubject: 'macro' | 'micro' = 'macro',
): LoggedOutHeroConfig {
  if (variant === 'stats') {
    return {
      variant,
      headline: 'Score a 5 on\nAP Stats.',
      countdownLabel: 'Stats',
      examDate: new Date('2026-05-14T12:00:00'),
      theme: {
        accentClass: 'text-orange-500',
        btnClass: 'bg-orange-600 hover:bg-orange-700',
        mcqCorrectClass: 'bg-green-50 border-green-400 text-green-800',
        mcqCorrectBadgeClass: 'bg-green-500 border-green-500 text-white',
      },
      ctaHref: '/purchase/season-pass?courseType=stats',
      ctaLabel: 'Get the Season Pass — $29',
      subheadline:
        'Unit MCQ practice, FRQ packs, printable cheat sheets, and more — built for the 2026 AP Statistics CED.',
      pdfSrc: `${STATS_UNIT_2_PDF}${PDF_VIEWER_FRAGMENT}`,
      cheatSheetPreviewImages: [
        {
          src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1/type_y_boxplot.svg',
          alt: 'Boxplot of Type Y loaf weights',
        },
        {
          src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1/step_count_histogram.svg',
          alt: 'Histogram of daily step counts',
        },
      ],
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
      examDate: new Date('2026-05-11T12:00:00'),
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
      pdfSrc: `${GOV_UNIT_2_PDF}${PDF_VIEWER_FRAGMENT}`,
      cheatSheetPreviewImages: [
        {
          src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/u4-frq2.svg',
          alt: 'AP Gov FRQ quantitative chart',
        },
        {
          src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_1/balanced+budget+requirements+map.svg',
          alt: 'Balanced budget requirements map',
        },
      ],
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
    examDate: new Date(isMicro ? '2026-05-04T12:00:00' : '2026-05-08T12:00:00'),
    theme,
    ctaHref: `/purchase/season-pass?courseType=${econSubject}`,
    ctaLabel: 'Get the Season Pass — $29',
    subheadline:
      'Full practice exams, unlimited MCQ practice, AI-graded FRQs, printable cheat sheets, and more — all for $29.',
    pdfSrc: `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+${isMicro ? 'Micro' : 'Macro'}+-+Unit+1.pdf${PDF_VIEWER_FRAGMENT}`,
    cheatSheetPreviewImages: [],
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
