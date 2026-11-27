/**
 * A course's econ FRQs in the order the practice page shows them (by unit, then title), shared by the FRQ
 * practice overview and the printable FRQ packet so they always list the same questions.
 */
import { frqExams, type FRQQuestion } from '@/data/frqQuestions';

export type FrqCourse = 'macro' | 'micro';

export type CourseFrq = FRQQuestion & { unit: number; examTitle: string };

export function courseFrqs(course: FrqCourse): CourseFrq[] {
  return frqExams
    .flatMap((exam) =>
      exam.questions
        .filter((q) => (Array.isArray(q.subject) ? q.subject.includes(course) : q.subject === course))
        .map((q) => ({ ...q, unit: exam.unit, examTitle: exam.examTitle })),
    )
    .sort((a, b) => (a.unit || 99) - (b.unit || 99) || a.title.localeCompare(b.title));
}

/** Total points across parts and subparts, the way the practice page counts them. */
export function frqTotalPoints(q: FRQQuestion): number {
  // Only answerable parts (those with an answer type) carry points.
  return q.parts.reduce(
    (sum, part) =>
      sum +
      (part.answerType ? (part.pointValue ?? 0) : 0) +
      (part.subparts ?? []).reduce((s, sp) => s + (sp.answerType ? (sp.pointValue ?? 0) : 0), 0),
    0,
  );
}

/** The title without its "Unit 3 FRQ - " or "FRQ 2 - " prefix, for places that already show the unit. */
export function frqShortTitle(title: string): string {
  return title.replace(/^(Unit \d+\s+)?FRQ(\s+\d+)?\s*[-–:]\s*/i, '').trim() || title;
}

/** Whether any part asks the student to draw a graph. */
export function frqHasGraph(q: FRQQuestion): boolean {
  return q.parts.some((p) => p.answerType === 'draw' || (p.subparts ?? []).some((sp) => sp.answerType === 'draw'));
}

/** The image source of an FRQ's figure (static imports are objects with `src`). */
export function frqImageSrc(image: unknown): string | null {
  if (!image) return null;
  if (typeof image === 'string') return image;
  const src = (image as { src?: unknown }).src;
  return typeof src === 'string' ? src : null;
}
