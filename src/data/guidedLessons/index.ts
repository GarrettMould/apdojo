import {
  apMacroUnit2Whiteboards,
  apMacroUnit3Whiteboards,
  apMacroUnit4Whiteboards,
  apMacroUnit5Whiteboards,
  apMacroUnit6Whiteboards,
  unit1Whiteboards,
} from '@/data/whiteboards';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { videos } from '@/data/videos';
import { macroCurriculumOutline } from '@/data/courseCurriculumOutline';
import { MACRO_GUIDED_LESSONS, guidedLessonHref, macroLessonName } from './lessonLinks';
import type { GuidedLessonContent } from './types';

export type { GuidedLessonContent } from './types';
export {
  guidedLessonHref,
  guidedUnitWrapUpHref,
  hasGuidedUnit,
  getMissedGuidedLessons,
  type MissedGuidedLesson,
} from './lessonLinks';

/** Topics are unique across the Macro whiteboard sets (checked when content is added). */
const macroBoardUrlByTopic = new Map(
  [
    ...unit1Whiteboards,
    ...apMacroUnit2Whiteboards,
    ...apMacroUnit3Whiteboards,
    ...apMacroUnit4Whiteboards,
    ...apMacroUnit5Whiteboards,
    ...apMacroUnit6Whiteboards,
  ].map((w) => [w.topic, w.url]),
);

export interface ResolvedWalkthroughStep {
  kicker: string;
  title: string;
  boards: { url: string; alt: string }[];
  terms: { term: string; definition: string }[];
  note?: string;
}

export interface ResolvedGuidedLesson {
  content: GuidedLessonContent;
  lessonName: string;
  video: { url: string; title: string } | null;
  walkthrough: ResolvedWalkthroughStep[];
  /** Every key term tagged with this lesson, for the server-rendered lesson notes. */
  keyTerms: { term: string; definition: string }[];
}

export interface GuidedUnitPathItem {
  lessonId: string;
  name: string;
  href: string | null;
}

/** Authored content only (rubric, model answer). Used by the grading route. */
export function getGuidedLessonContent(lessonId: string): GuidedLessonContent | null {
  return MACRO_GUIDED_LESSONS.find((l) => l.lessonId === lessonId) ?? null;
}

export function getGuidedLesson(lessonId: string): ResolvedGuidedLesson | null {
  const content = MACRO_GUIDED_LESSONS.find((l) => l.lessonId === lessonId);
  if (!content) return null;

  const lessonVideos = videos.filter(
    (v) => v.subjects.includes('AP Macroeconomics') && v.lessonIDS.includes(lessonId),
  );
  const video = content.videoId
    ? lessonVideos.find((v) => v.id === content.videoId)
    : lessonVideos[0];

  const termsForLesson = apMacroTerms.filter(
    (t) => t.unit === content.unit && t.lessonIDs?.includes(lessonId),
  );

  const walkthrough = content.walkthrough.map((step) => ({
    kicker: step.kicker,
    title: step.title,
    note: step.note,
    boards: step.boards.flatMap((topic) => {
      const url = macroBoardUrlByTopic.get(topic);
      return url ? [{ url, alt: `Whiteboard: ${step.title}` }] : [];
    }),
    terms: step.terms.flatMap((name) => {
      const term = termsForLesson.find((t) => t.term === name);
      return term ? [{ term: term.term, definition: term.definition }] : [];
    }),
  }));

  return {
    content,
    lessonName: macroLessonName(lessonId),
    video: video ? { url: video.videoUrl, title: video.title } : null,
    walkthrough,
    keyTerms: termsForLesson.map((t) => ({ term: t.term, definition: t.definition })),
  };
}

/** Every Macro unit with its lessons, for the Explainers hub. */
export function getGuidedCourseUnits(): { unit: number; name: string; lessons: GuidedUnitPathItem[] }[] {
  return macroCurriculumOutline.units.map((u) => ({
    unit: u.unitNumber,
    name: u.unitName,
    lessons: getGuidedUnitPath(u.unitNumber),
  }));
}

/** Every lesson in the unit, linked when it has a guided lesson. */
export function getGuidedUnitPath(unit: number): GuidedUnitPathItem[] {
  const outline = macroCurriculumOutline.units.find((u) => u.unitNumber === unit);
  if (!outline) return [];
  return outline.lessons.map((lesson) => {
    const content = MACRO_GUIDED_LESSONS.find((l) => l.lessonId === lesson.lessonNumber);
    return {
      lessonId: lesson.lessonNumber,
      name: lesson.name,
      href: content ? guidedLessonHref(content) : null,
    };
  });
}
