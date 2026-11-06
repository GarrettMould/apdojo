/**
 * Guided lesson progress lives on the user doc (`users/{uid}.guidedLessonProgress`),
 * written only by `/api/guided-lesson-grade`, so it arrives in `userData` via the
 * existing user snapshot.
 */

export type GuidedLessonStatus = 'passed' | 'reviewed';

export interface GuidedLessonProgressEntry {
  /** Absent while in progress. "reviewed" = saw the model answer after running out of tries. */
  status?: GuidedLessonStatus;
  passedVia?: 'first' | 'final';
  finalAttempts?: number;
  updatedAt: string;
}

export const GUIDED_FINAL_MAX_ATTEMPTS = 3;

/** Firestore map key, e.g. "macro-3-1" (no dots, so it is safe as a field path). */
export function guidedLessonProgressKey(course: 'macro', lessonId: string): string {
  return `${course}-${lessonId.replace(/\./g, '-')}`;
}

export function getGuidedLessonProgress(
  userData: unknown,
  lessonId: string,
): GuidedLessonProgressEntry | null {
  const all = (userData as { guidedLessonProgress?: Record<string, GuidedLessonProgressEntry> } | null)
    ?.guidedLessonProgress;
  return all?.[guidedLessonProgressKey('macro', lessonId)] ?? null;
}

export interface GuidedGradePoint {
  id: string;
  criterion: string;
  earned: boolean;
  feedback: string;
}

export interface GuidedGradeResult {
  round: 'first' | 'final';
  points: GuidedGradePoint[];
  summary: string;
  /** First round: every rubric point earned. Final round: met the lesson's pass mark. */
  passed: boolean;
  /** Final round only. */
  attemptsLeft?: number;
  /** Final round, once passed or out of attempts. */
  modelAnswer?: string;
  status?: GuidedLessonStatus;
}
