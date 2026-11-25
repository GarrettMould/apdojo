/**
 * A tutoring student's progress, per course and lesson, from the questions they answer on the site and the
 * tutor's skill ratings in lesson notes. Shared by the server (which builds it) and the progress pages.
 */
import type { LessonCourse, SkillLevel } from '@/lib/tutoringLessons';

/** How many of a lesson's most recent answers decide its mastery, so old mistakes stop counting. */
export const RECENT_ANSWERS_PER_LESSON = 10;

/** Below this many answers, a lesson's accuracy is too thin to call. */
export const MIN_ANSWERS_FOR_MASTERY = 3;

export type Mastery = 'not-started' | 'too-few' | 'struggling' | 'developing' | 'strong';

export function masteryFor(recentAnswers: number, recentCorrect: number): Mastery {
  if (recentAnswers === 0) return 'not-started';
  if (recentAnswers < MIN_ANSWERS_FOR_MASTERY) return 'too-few';
  const accuracy = recentCorrect / recentAnswers;
  if (accuracy >= 0.8) return 'strong';
  if (accuracy >= 0.6) return 'developing';
  return 'struggling';
}

export const MASTERY_LABELS: Record<Mastery, string> = {
  'not-started': 'Not started',
  'too-few': 'Just started',
  struggling: 'Needs practice',
  developing: 'Getting there',
  strong: 'Strong',
};

export interface LessonProgress {
  lesson: string;
  name: string;
  /** All answers on this lesson, ever. */
  answers: number;
  correct: number;
  /** The most recent answers (up to RECENT_ANSWERS_PER_LESSON), which decide mastery. */
  recentAnswers: number;
  recentCorrect: number;
  mastery: Mastery;
  lastAnsweredAt: string | null;
  /** The tutor's latest rating of this lesson in lesson notes. */
  tutorLevel: SkillLevel | null;
  tutorRatedAt: string | null;
}

export interface UnitProgress {
  unit: number;
  name: string;
  answers: number;
  correct: number;
  lessons: LessonProgress[];
}

export interface CourseProgress {
  course: LessonCourse;
  answers: number;
  correct: number;
  answersLast7Days: number;
  answersLast30Days: number;
  units: UnitProgress[];
  /** Lessons to work on next: practiced and struggling or developing, or rated weak by the tutor. */
  focus: LessonProgress[];
}

export interface ProgressActivity {
  kind: 'test' | 'quiz' | 'practice' | 'lesson';
  title: string;
  course: LessonCourse | null;
  at: string;
  /** "8/10"-style score, when the activity has one. */
  correct: number | null;
  total: number | null;
}

export interface StudentProgress {
  uid: string;
  name: string | null;
  email: string | null;
  courses: CourseProgress[];
  recent: ProgressActivity[];
  /** Answers that couldn't be placed in a course or lesson (old question tags, removed questions). */
  unplacedAnswers: number;
  generatedAt: string;
}

/** A tutoring student, for the tutor's student list. */
export interface AdminStudentListItem {
  /** The student's site account, or null when no account matches the booking email. */
  uid: string | null;
  name: string | null;
  email: string | null;
  lessons: number;
  lastLessonAt: string | null;
  nextLessonAt: string | null;
  answersLast7Days: number;
  answersLast30Days: number;
}
