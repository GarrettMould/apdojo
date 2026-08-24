import type { SeasonPassPurchaseType } from '@/data/seasonPassCourseConfig';
import { COURSE_CONFIG } from '@/data/seasonPassCourseConfig';
import type { CourseSubject } from '@/lib/courseSubject';
import { defaultCheatSheetUrl } from '@/lib/courseSubject';
import {
  getPracticeTestsUrl,
  getUnitFinalPracticeTestsUrl,
  getUnitMCQTestUrl,
} from '@/lib/utils';

/** URL slug for `/offer/[course]`. */
export type OfferCourseSlug = 'macro' | 'micro' | 'gov' | 'stats' | 'bundle';

export type OfferResourceId =
  | 'cheat-sheets'
  | 'unit-tests'
  | 'full-exams'
  | 'mcq-bank'
  | 'graphing'
  | 'scotus'
  | 'frq'
  | 'ai-tutor'
  | 'quiz-from-notes';

export interface OfferResource {
  id: OfferResourceId;
  title: string;
  blurb: string;
  /** Optional deep link so students can preview the real product. */
  previewHref?: string;
}

export interface OfferTeacher {
  name: string;
  title: string;
  /** Short bio — placeholder until real copy is ready. */
  blurb: string;
}

export interface OfferPageConfig {
  slug: OfferCourseSlug;
  /** Hero-level course name, e.g. "AP U.S. Government". */
  courseLabel: string;
  badge: string;
  headline: string;
  supporting: string;
  /** Maps to embedded Stripe checkout; null when not sold yet. */
  checkoutType: SeasonPassPurchaseType | null;
  /** Accent classes aligned with existing season-pass styling. */
  accentText: string;
  accentBg: string;
  accentBorder: string;
  /** Four headline features shown as colored squares (red, blue, yellow, orange). */
  featureTiles: [string, string, string, string];
  teacher: OfferTeacher;
  resources: OfferResource[];
  /** Short study path — cheat sheet → practice → test. */
  howItWorks: string[];
}

const OFFER_SLUGS = new Set<OfferCourseSlug>(['macro', 'micro', 'gov', 'stats', 'bundle']);

export function isOfferCourseSlug(value: string | null | undefined): value is OfferCourseSlug {
  return Boolean(value && OFFER_SLUGS.has(value as OfferCourseSlug));
}

export function parseOfferCourseSlug(raw: string | null | undefined): OfferCourseSlug | null {
  const v = (raw ?? '').trim().toLowerCase();
  return isOfferCourseSlug(v) ? v : null;
}

export function offerPagePath(slug: OfferCourseSlug): string {
  return `/offer/${slug}`;
}

export function seasonPassCheckoutPath(checkoutType: SeasonPassPurchaseType): string {
  return `/purchase/season-pass?courseType=${checkoutType}`;
}

function econResources(subject: 'macro' | 'micro'): OfferResource[] {
  return [
    {
      id: 'cheat-sheets',
      title: 'Unit Cheat Sheets',
      blurb: 'Every unit distilled into clear notes, key graphs, and printable PDFs.',
      previewHref: defaultCheatSheetUrl(subject),
    },
    {
      id: 'unit-tests',
      title: 'Formal Unit Tests',
      blurb: 'Timed, AP-style MCQ unit exams with full answer explanations.',
      previewHref: getUnitMCQTestUrl(1, subject),
    },
    {
      id: 'full-exams',
      title: 'Full Practice Exams',
      blurb: 'Full-length practice built to the 2026 CED — MCQ and FRQ.',
      previewHref: getPracticeTestsUrl(subject),
    },
    {
      id: 'mcq-bank',
      title: 'Endless MCQ Practice',
      blurb: 'Drill by unit or topic until the question styles feel automatic.',
      previewHref: `/select-practice-units?subject=${subject}`,
    },
    {
      id: 'graphing',
      title: 'Graphing Practice',
      blurb: 'Interactive Graph Gym sims for the graphs that show up on the exam.',
      previewHref: '/graph-gym-dashboard',
    },
    {
      id: 'frq',
      title: 'AI-Graded FRQs',
      blurb: 'Write FRQs, get feedback, and practice the graphing steps that cost points.',
      previewHref: `/unitFRQpracticePage?subject=${subject}&frqId=${subject === 'macro' ? 1 : 2}`,
    },
    {
      id: 'quiz-from-notes',
      title: 'Quizzes From Your Notes',
      blurb: 'Upload notes and turn them into practice quizzes inside the Dojo.',
      previewHref: '/dojo/infinite',
    },
  ];
}

export const OFFER_PAGES: Record<OfferCourseSlug, OfferPageConfig> = {
  macro: {
    slug: 'macro',
    courseLabel: 'AP Macroeconomics',
    badge: COURSE_CONFIG.macro.badge,
    headline: 'Everything you need to earn a 5 — in one toolkit.',
    supporting: 'Cheat sheets, unit tests, full exams, FRQs, and graphing practice built for the AP Macro exam.',
    checkoutType: 'macro',
    accentText: 'text-blue-700',
    accentBg: 'bg-blue-600',
    accentBorder: 'border-blue-600',
    featureTiles: ['Cheat Sheets', 'Unit Tests', 'Graph Gym', 'AI FRQs'],
    teacher: {
      name: 'Jordan Hale',
      title: 'AP Macro teacher · 12 years',
      blurb:
        'Built this toolkit after watching students lose points on graphs they already understood. Clear notes, timed drills, and FRQ feedback that mirrors the real exam.',
    },
    resources: econResources('macro'),
    howItWorks: [
      'Review the unit cheat sheet',
      'Drill MCQs and Graph Gym',
      'Take the timed unit test',
      'Finish with a full practice exam',
    ],
  },
  micro: {
    slug: 'micro',
    courseLabel: 'AP Microeconomics',
    badge: COURSE_CONFIG.micro.badge,
    headline: 'Everything you need to earn a 5 — in one toolkit.',
    supporting: 'Cheat sheets, unit tests, full exams, FRQs, and graphing practice built for the AP Micro exam.',
    checkoutType: 'micro',
    accentText: 'text-green-700',
    accentBg: 'bg-green-600',
    accentBorder: 'border-green-600',
    featureTiles: ['Cheat Sheets', 'Unit Tests', 'Graph Gym', 'AI FRQs'],
    teacher: {
      name: 'Sam Ortiz',
      title: 'AP Micro teacher · 9 years',
      blurb:
        'Designed for students who get the theory but freeze on market graphs. Step-by-step practice that turns “I know this” into points on exam day.',
    },
    resources: econResources('micro'),
    howItWorks: [
      'Review the unit cheat sheet',
      'Drill MCQs and Graph Gym',
      'Take the timed unit test',
      'Finish with a full practice exam',
    ],
  },
  bundle: {
    slug: 'bundle',
    courseLabel: 'AP Macro + Micro',
    badge: COURSE_CONFIG.bundle.badge,
    headline: 'Both econ exams. One season pass.',
    supporting: 'Full Macro and Micro toolkits — cheat sheets, exams, FRQs, and Graph Gym — at a bundle price.',
    checkoutType: 'bundle',
    accentText: 'text-blue-700',
    accentBg: 'bg-blue-600',
    accentBorder: 'border-blue-600',
    featureTiles: ['Both Courses', 'Unit Tests', 'Graph Gym', 'Full Exams'],
    teacher: {
      name: 'AP Dojo Econ Team',
      title: 'Macro + Micro instructors',
      blurb:
        'Two full toolkits from teachers who teach both exams. Same study loop for Macro and Micro — so switching courses doesn’t mean starting over.',
    },
    resources: [
      {
        id: 'cheat-sheets',
        title: 'Macro + Micro Cheat Sheets',
        blurb: 'Unit notes and printable PDFs for both courses.',
        previewHref: defaultCheatSheetUrl('macro'),
      },
      {
        id: 'unit-tests',
        title: 'Unit Tests for Both Courses',
        blurb: 'Timed AP-style unit exams across Macro and Micro.',
        previewHref: getUnitFinalPracticeTestsUrl('macro'),
      },
      {
        id: 'full-exams',
        title: 'Full Practice Exams',
        blurb: 'Full-length Macro and Micro practice exams.',
        previewHref: getPracticeTestsUrl('macro'),
      },
      {
        id: 'graphing',
        title: 'Graphing Practice',
        blurb: 'Graph Gym coverage for both courses’ required graphs.',
        previewHref: '/graph-gym-dashboard',
      },
      {
        id: 'frq',
        title: 'AI-Graded FRQs',
        blurb: 'FRQ practice with feedback for Macro and Micro.',
        previewHref: '/unitFRQpracticePage?subject=macro&frqId=1',
      },
      {
        id: 'quiz-from-notes',
        title: 'Quizzes From Your Notes',
        blurb: 'Upload notes and generate practice quizzes.',
        previewHref: '/dojo/infinite',
      },
    ],
    howItWorks: [
      'Pick Macro or Micro for today’s unit',
      'Study the cheat sheet, then drill',
      'Lock in with the unit test',
      'Simulate the real exam before May',
    ],
  },
  gov: {
    slug: 'gov',
    courseLabel: 'AP U.S. Government',
    badge: COURSE_CONFIG.gov.badge,
    headline: 'Everything you need to earn a 5 — in one toolkit.',
    supporting:
      'Required SCOTUS cases, unit cheat sheets, formal unit tests, and comparison FRQ practice — built for AP Gov.',
    checkoutType: 'gov',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-600',
    accentBorder: 'border-violet-600',
    featureTiles: ['Cheat Sheets', 'SCOTUS Cases', 'Unit Tests', 'FRQ Practice'],
    teacher: {
      name: 'Alex Rivera',
      title: 'AP Gov teacher · 11 years',
      blurb:
        'Wrote this course so required cases finally stick — short videos, comparison FRQs, and unit tests that feel like the real AP exam, not busywork.',
    },
    resources: [
      {
        id: 'cheat-sheets',
        title: 'Unit Cheat Sheets',
        blurb: 'All five units with key terms, required cases, and printable PDFs.',
        previewHref: defaultCheatSheetUrl('gov'),
      },
      {
        id: 'scotus',
        title: 'Supreme Court Case Videos + Practice',
        blurb: 'Required case walkthroughs and SCOTUS comparison FRQ practice.',
        previewHref: '/scotus-essay-practice',
      },
      {
        id: 'unit-tests',
        title: 'Formal Unit Tests',
        blurb: 'Timed AP-style MCQ unit exams with explanations.',
        previewHref: getUnitFinalPracticeTestsUrl('gov'),
      },
      {
        id: 'mcq-bank',
        title: 'MCQ Practice',
        blurb: 'Practice by unit until the question patterns feel familiar.',
        previewHref: '/select-practice-units?subject=gov',
      },
      {
        id: 'frq',
        title: 'Gov FRQ Packs',
        blurb: 'Stimulus-style FRQ practice tied to each unit.',
        previewHref: getUnitFinalPracticeTestsUrl('gov'),
      },
      {
        id: 'ai-tutor',
        title: 'Dojo AI on Cheat Sheets',
        blurb: 'Ask follow-ups while you study — without leaving the unit page.',
        previewHref: defaultCheatSheetUrl('gov'),
      },
    ],
    howItWorks: [
      'Watch the required case videos on the cheat sheet',
      'Drill unit MCQs',
      'Write a SCOTUS comparison FRQ',
      'Take the timed unit test',
    ],
  },
  stats: {
    slug: 'stats',
    courseLabel: 'AP Statistics',
    badge: 'AP STATISTICS',
    headline: 'A clearer path through AP Stats.',
    supporting: 'Unit cheat sheets, formal unit tests, and FRQ packs — more of the Season Pass toolkit coming soon.',
    checkoutType: 'stats',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-600',
    accentBorder: 'border-orange-600',
    featureTiles: ['Cheat Sheets', 'Unit Tests', 'FRQ Packs', 'Video Lessons'],
    teacher: {
      name: 'Casey Nguyen',
      title: 'AP Stats teacher · 8 years',
      blurb:
        'Focused on the inference units students dread most. Clean formulas, timed unit tests, and FRQ packs that train how to write what readers actually score.',
    },
    resources: [
      {
        id: 'cheat-sheets',
        title: 'Unit Cheat Sheets',
        blurb: 'Unit notes, formulas, and study tips for AP Stats.',
        previewHref: defaultCheatSheetUrl('stats'),
      },
      {
        id: 'unit-tests',
        title: 'Formal Unit Tests',
        blurb: 'Timed AP-style MCQ unit exams with explanations.',
        previewHref: getUnitFinalPracticeTestsUrl('stats'),
      },
      {
        id: 'frq',
        title: 'Unit FRQ Packs',
        blurb: 'Stimulus FRQ practice by unit.',
        previewHref: getUnitFinalPracticeTestsUrl('stats'),
      },
    ],
    howItWorks: [
      'Review the unit cheat sheet',
      'Practice the unit FRQ pack',
      'Take the timed unit MCQ test',
    ],
  },
};

export function getOfferPageConfig(slug: OfferCourseSlug): OfferPageConfig {
  return OFFER_PAGES[slug];
}

/** Subject used for nav/preview when the offer is a single course (not bundle). */
export function offerSubjectForSlug(slug: OfferCourseSlug): CourseSubject | null {
  if (slug === 'bundle') return null;
  return slug;
}

export function offerPriceLabel(config: OfferPageConfig): { price: number; originalPrice: number } | null {
  if (!config.checkoutType) return null;
  const checkout = COURSE_CONFIG[config.checkoutType];
  return { price: checkout.price, originalPrice: checkout.originalPrice };
}
