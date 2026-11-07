import { macroCurriculumOutline } from '@/data/courseCurriculumOutline';
import { macroUnit1GuidedLessons } from './macroUnit1';
import { macroUnit2GuidedLessons } from './macroUnit2';
import { macroUnit3GuidedLessons } from './macroUnit3';
import { macroUnit4GuidedLessons } from './macroUnit4';
import { macroUnit5GuidedLessons } from './macroUnit5';
import type { GuidedLessonContent } from './types';

/**
 * Lesson content and links only — no whiteboards, terms or videos — so the exam screens can
 * link to explainers without pulling the walkthrough data into their bundle.
 */
export const MACRO_GUIDED_LESSONS: GuidedLessonContent[] = [
  ...macroUnit1GuidedLessons,
  ...macroUnit2GuidedLessons,
  ...macroUnit3GuidedLessons,
  ...macroUnit4GuidedLessons,
  ...macroUnit5GuidedLessons,
];

export function guidedLessonHref(content: GuidedLessonContent): string {
  return `/ap-macro/unit-${content.unit}/${content.slug}`;
}

export function guidedUnitWrapUpHref(unit: number): string {
  return `/ap-macro/explainers/unit-${unit}`;
}

/** Units that have at least one guided lesson (and so a wrap-up page). */
export function hasGuidedUnit(unit: number): boolean {
  return MACRO_GUIDED_LESSONS.some((l) => l.unit === unit);
}

export function macroLessonName(lessonId: string): string {
  for (const unit of macroCurriculumOutline.units) {
    const lesson = unit.lessons.find((l) => l.lessonNumber === lessonId);
    if (lesson) return lesson.name;
  }
  return lessonId;
}

export interface MissedGuidedLesson {
  lessonId: string;
  name: string;
  href: string;
  /** 1-based question numbers in the test that were missed for this lesson. */
  questionNumbers: number[];
}

/**
 * Groups missed test questions by the guided lessons they are tagged with, in course order.
 * A question tagged with several lessons counts toward each; lessons without an explainer are skipped.
 */
export function getMissedGuidedLessons(
  missed: { questionNumber: number; lessonIds: string[] }[],
): MissedGuidedLesson[] {
  const byLesson = new Map<string, number[]>();
  for (const { questionNumber, lessonIds } of missed) {
    for (const id of new Set(lessonIds)) {
      byLesson.set(id, [...(byLesson.get(id) ?? []), questionNumber]);
    }
  }
  return macroCurriculumOutline.units.flatMap((u) =>
    u.lessons.flatMap((lesson) => {
      const questionNumbers = byLesson.get(lesson.lessonNumber);
      const content = MACRO_GUIDED_LESSONS.find((l) => l.lessonId === lesson.lessonNumber);
      if (!questionNumbers || !content) return [];
      return [{
        lessonId: lesson.lessonNumber,
        name: lesson.name,
        href: guidedLessonHref(content),
        questionNumbers: [...questionNumbers].sort((a, b) => a - b),
      }];
    }),
  );
}
