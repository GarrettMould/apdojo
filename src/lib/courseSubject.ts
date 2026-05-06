import type { Unit } from '@/data/cheatSheets';
import { govUnits, macroUnits, microUnits } from '@/data/cheatSheets';
import type { Question } from '@/data/questionBanks/types';

/** Canonical in-app course (Firestore `selectedSubject`, URL slugs, XP keys, etc.). */
export type CourseSubject = 'macro' | 'micro' | 'gov';

export const COURSE_SUBJECTS = ['macro', 'micro', 'gov'] as const satisfies readonly CourseSubject[];

export function isCourseSubject(value: string | null | undefined): value is CourseSubject {
  return value === 'macro' || value === 'micro' || value === 'gov';
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

/** Question bank / MCQ UI subject tag — includes Gov. */
export function apQuestionSubjectTag(
  subject: CourseSubject
): 'ap_macroeconomics' | 'ap_microeconomics' | 'ap_us_government' {
  if (subject === 'macro') return 'ap_macroeconomics';
  if (subject === 'micro') return 'ap_microeconomics';
  return 'ap_us_government';
}

/** Map a question’s bank `subject` tag to the in-app course (persona + UI theme). */
export function courseSubjectFromQuestionSubject(tag: Question['subject']): CourseSubject {
  const t = Array.isArray(tag) ? tag[0] : tag;
  if (t === 'ap_us_government') return 'gov';
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
      return 'AP Gov';
  }
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
  }
}
