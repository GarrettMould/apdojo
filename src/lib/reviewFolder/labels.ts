import {
  COURSE_CURRICULUM_OUTLINES,
  type CourseOutlineId,
} from '@/data/courseCurriculumOutline';

const SUBJECT_TO_OUTLINE: Record<string, CourseOutlineId> = {
  gov: 'gov',
  stats: 'stats',
  macro: 'macro',
  micro: 'micro',
};

/** Resolve a CED lesson id (e.g. "1.7") to its curriculum display name. */
export function getLessonLabel(subject: string, lessonId: string): string {
  const outlineId = SUBJECT_TO_OUTLINE[subject];
  if (!outlineId) return `Lesson ${lessonId}`;
  const outline = COURSE_CURRICULUM_OUTLINES[outlineId];
  for (const unit of outline.units) {
    const lesson = unit.lessons.find((l) => l.lessonNumber === lessonId);
    if (lesson) return lesson.name;
  }
  return `Lesson ${lessonId}`;
}

export function formatLessonHeading(
  subject: string,
  lessonId: string
): string {
  return `${lessonId} · ${getLessonLabel(subject, lessonId)}`;
}
