import type { Unit } from '@/data/cheatSheets';
import { govUnits, macroUnits, microUnits, statsUnits } from '@/data/cheatSheets';
import { getGovUnitStimulusFrqs } from '@/data/gov/govUnitStimulusFrqs';
import { getStatsUnitStimulusFrqs } from '@/data/stats/statsUnitStimulusFrqs';
import type { Question } from '@/data/questionBanks/types';

/** Canonical in-app course (Firestore `selectedSubject`, URL slugs, XP keys, etc.). */
export type CourseSubject = 'macro' | 'micro' | 'gov' | 'stats';

export const COURSE_SUBJECTS = ['macro', 'micro', 'gov', 'stats'] as const satisfies readonly CourseSubject[];

export function isCourseSubject(value: string | null | undefined): value is CourseSubject {
  return value === 'macro' || value === 'micro' || value === 'gov' || value === 'stats';
}

/** Macro/Micro only — used where question banks, Graph Gym, or Stripe are still econ-only. */
export function econCourseFromSubject(subject: CourseSubject): 'macro' | 'micro' | null {
  if (subject === 'macro' || subject === 'micro') return subject;
  return null;
}

/** AP question-bank tags used in quiz history / MCQ metadata (econ only for now). */
export function apEconomicsTagFromCourse(subject: CourseSubject): 'ap_macroeconomics' | 'ap_microeconomics' | null {
  if (subject === 'macro') return 'ap_macroeconomics';
  if (subject === 'micro') return 'ap_microeconomics';
  return null;
}

/** Question bank / MCQ UI subject tag — all four courses. */
export function apQuestionSubjectTag(
  subject: CourseSubject
): 'ap_macroeconomics' | 'ap_microeconomics' | 'ap_us_government' | 'ap_statistics' {
  if (subject === 'macro') return 'ap_macroeconomics';
  if (subject === 'micro') return 'ap_microeconomics';
  if (subject === 'stats') return 'ap_statistics';
  return 'ap_us_government';
}

/** Map a question’s bank `subject` tag to the in-app course (persona + UI theme). */
export function courseSubjectFromQuestionSubject(tag: Question['subject']): CourseSubject {
  const t = Array.isArray(tag) ? tag[0] : tag;
  if (t === 'ap_us_government') return 'gov';
  if (t === 'ap_statistics') return 'stats';
  if (t === 'ap_microeconomics') return 'micro';
  return 'macro';
}

/** Safe parse for localStorage / legacy docs. */
export function normalizeCourseSubject(value: string | null | undefined): CourseSubject {
  if (value && isCourseSubject(value)) return value;
  return 'macro';
}

/** Cycle used by header / guest subject toggle (all three courses). */
export function nextCourseSubject(current: CourseSubject): CourseSubject {
  const i = COURSE_SUBJECTS.indexOf(current);
  const idx = i === -1 ? 0 : i;
  return COURSE_SUBJECTS[(idx + 1) % COURSE_SUBJECTS.length];
}

export function displayCourseLabel(subject: CourseSubject): string {
  switch (subject) {
    case 'macro':
      return 'Macro';
    case 'micro':
      return 'Micro';
    case 'gov':
      return 'Gov';
    case 'stats':
      return 'Stats';
  }
}

/** Footer label on unit MCQ test bottom bar, e.g. "AP Gov Unit 4 MCQ Test - 19 Questions". */
export function formatUnitMcqTestFooterLabel(
  subject: CourseSubject,
  unitNumber: number,
  questionCount: number
): string {
  return `AP ${displayCourseLabel(subject)} Unit ${unitNumber} MCQ Test - ${questionCount} Questions`;
}

/** Longer label for onboarding / wizard copy. */
export function subjectOnboardingTitle(subject: CourseSubject): string {
  switch (subject) {
    case 'macro':
      return 'AP Macroeconomics';
    case 'micro':
      return 'AP Microeconomics';
    case 'gov':
      return 'AP United States Government and Politics';
    case 'stats':
      return 'AP Statistics';
  }
}

/** First segment of pretty URLs, e.g. `ap-macro-unit-1-cheat-sheet`. */
export function courseUrlSlugPrefix(subject: CourseSubject): string {
  switch (subject) {
    case 'macro':
      return 'ap-macro';
    case 'micro':
      return 'ap-micro';
    case 'gov':
      return 'ap-gov';
    case 'stats':
      return 'ap-stats';
  }
}

/** Firestore `unitXP` document id, e.g. `macro_3`. */
export function unitXpDocumentId(subject: CourseSubject, unitNumber: number): string {
  return `${subject}_${unitNumber}`;
}

export function unitsForCourseSubject(subject: CourseSubject): Unit[] {
  switch (subject) {
    case 'macro':
      return macroUnits;
    case 'micro':
      return microUnits;
    case 'gov':
      return govUnits;
    case 'stats':
      return statsUnits;
  }
}

/** Macro or Micro — Graph Gym and other econ-only surfaces. */
export function isEconCourse(subject: CourseSubject): boolean {
  return subject === 'macro' || subject === 'micro';
}

/** First unit cheat sheet URL for the course (pretty route). */
export function defaultCheatSheetUrl(subject: CourseSubject): string {
  return cheatSheetUrlForUnit(subject, 1);
}

/** Pretty cheat sheet path for a subject + unit (unit clamped to that course's catalog). */
export function cheatSheetUrlForUnit(subject: CourseSubject, unitNumber: number): string {
  const units = unitsForCourseSubject(subject);
  const maxUnit = units.reduce((max, u) => Math.max(max, u.number), 1);
  const unit = Math.min(Math.max(1, unitNumber), maxUnit);
  return `/${courseUrlSlugPrefix(subject)}-unit-${unit}-cheat-sheet`;
}

const PRETTY_CHEAT_SHEET_PATH =
  /^\/ap-(macro|micro|gov|stats)-unit-(\d+)-cheat-sheet\/?$/;
const LEGACY_CHEAT_SHEET_PATH = /^\/unit\/(\d+)\/?$/;

/** Unit number from a cheat sheet URL (`/ap-macro-unit-3-cheat-sheet` or legacy `/unit/3`). */
export function parseCheatSheetUnitFromPath(pathname: string): number | null {
  const path = pathname.split('?')[0].replace(/\/$/, '') || '/';
  const pretty = path.match(PRETTY_CHEAT_SHEET_PATH);
  if (pretty) return parseInt(pretty[2], 10);
  const legacy = path.match(LEGACY_CHEAT_SHEET_PATH);
  if (legacy) return parseInt(legacy[1], 10);
  return null;
}

export function isCheatSheetPath(pathname: string): boolean {
  return parseCheatSheetUnitFromPath(pathname) !== null;
}

/**
 * When switching subjects on a cheat sheet, keep the same unit when possible
 * (clamped to the target course's unit list).
 */
export function getCheatSheetUrlForSubjectSwitch(
  pathname: string,
  newSubject: CourseSubject
): string | null {
  const unitNumber = parseCheatSheetUnitFromPath(pathname);
  if (unitNumber === null) return null;
  return cheatSheetUrlForUnit(newSubject, unitNumber);
}

/** Header subject picker — all four AP courses. */
export const ADMIN_SUBJECT_SELECT_OPTIONS = [
  { value: 'macro' as const, label: 'AP Macro' },
  { value: 'micro' as const, label: 'AP Micro' },
  { value: 'stats' as const, label: 'AP Stats' },
  { value: 'gov' as const, label: 'AP Gov' },
] as const;

export function adminSubjectSelectLabel(subject: CourseSubject): string {
  const match = ADMIN_SUBJECT_SELECT_OPTIONS.find((o) => o.value === subject);
  return match?.label ?? displayCourseLabel(subject);
}

/** Parse Firestore `selectedSubjects` into validated course keys. */
export function parseSelectedSubjects(raw: unknown): CourseSubject[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((s): s is CourseSubject => typeof s === 'string' && isCourseSubject(s));
}

/**
 * Enrolled courses for a logged-in user. Returns `null` for guests or legacy accounts
 * without `selectedSubjects` — caller should show all courses in those cases.
 */
export function getUserEnrolledSubjects(
  isLoggedIn: boolean,
  userData: { selectedSubjects?: unknown } | null | undefined,
): CourseSubject[] | null {
  if (!isLoggedIn) return null;
  const parsed = parseSelectedSubjects(userData?.selectedSubjects);
  return parsed.length > 0 ? parsed : null;
}

/** Gov units with MCQ practice banks in `src/data/gov/govUnit*McqPractice.ts`. */
export const GOV_MCQ_PRACTICE_UNIT_NUMBERS = [1, 2, 3, 5] as const;

export function isGovMcqPracticeUnitAvailable(unitNumber: number): boolean {
  return (GOV_MCQ_PRACTICE_UNIT_NUMBERS as readonly number[]).includes(unitNumber);
}

/** Gov units with formal MCQ unit tests in `src/data/gov/govUnit*McqExam.ts`. */
export const GOV_MCQ_TEST_UNIT_NUMBERS = [1, 2, 3, 4, 5] as const;

export function isGovMcqTestUnitAvailable(unitNumber: number): boolean {
  return (GOV_MCQ_TEST_UNIT_NUMBERS as readonly number[]).includes(unitNumber);
}

/** Stats units with formal MCQ unit tests in `src/data/apstats/statsUnit*McqExam.ts`. */
export const STATS_MCQ_TEST_UNIT_NUMBERS = [1, 2, 3, 4, 5] as const;

export function isStatsMcqTestUnitAvailable(unitNumber: number): boolean {
  return (STATS_MCQ_TEST_UNIT_NUMBERS as readonly number[]).includes(unitNumber);
}

/** Stats units with formal FRQ packs in `src/data/apstats/statsUnitStimulusFrqs.ts`. */
export const STATS_FRQ_TEST_UNIT_NUMBERS = [1, 2, 3, 4, 5] as const;

export function isStatsFrqTestUnitAvailable(unitNumber: number): boolean {
  return (STATS_FRQ_TEST_UNIT_NUMBERS as readonly number[]).includes(unitNumber);
}

export function isUnitMcqTestAvailable(subject: CourseSubject, unitNumber: number): boolean {
  if (subject === 'stats') return isStatsMcqTestUnitAvailable(unitNumber);
  if (subject === 'gov') return isGovMcqTestUnitAvailable(unitNumber);
  return unitNumber >= 1 && unitNumber <= 6;
}

export function isUnitFrqPackAvailable(subject: CourseSubject, unitNumber: number): boolean {
  if (subject === 'stats') {
    return isStatsFrqTestUnitAvailable(unitNumber) && getStatsUnitStimulusFrqs(unitNumber).length > 0;
  }
  if (subject === 'gov') {
    return getGovUnitStimulusFrqs(unitNumber).length > 0;
  }
  return false;
}
