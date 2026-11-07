/**
 * Guided lesson content: the authored layer on top of existing lesson material
 * (videos, whiteboards, key terms, MCQ bank). Everything is referenced by its
 * existing identifier so the source data stays the single copy.
 */

/** One screen of the "Walk through it" step. */
export interface GuidedWalkthroughStep {
  /** Small label above the title, e.g. "Why it slopes down · reason 1". */
  kicker: string;
  title: string;
  /** Whiteboard `topic` values from `src/data/whiteboards.ts` (0–2). None = concept card. */
  boards: string[];
  /** Key term names exactly as in the course terms file, shown beside the boards. */
  terms: string[];
  /** One- or two-sentence takeaway in our own words. Required when there are no boards. */
  note?: string;
}

export interface GuidedRubricPoint {
  id: string;
  /** What the answer must show to earn this point. Sent to the grader. */
  criterion: string;
}

export interface GuidedLessonContent {
  /** Lesson number, e.g. "3.1". */
  lessonId: string;
  unit: number;
  /** URL slug under `/ap-macro/unit-N/` (the old explainer URL, kept for SEO). */
  slug: string;
  /** Video `id` from `src/data/videos.ts` when a lesson has more than one. */
  videoId?: string;
  /** Short written lesson (150–250 words). Shown on step 1 with or without a video. */
  brief: string;
  /** The question asked before the walkthrough (skippable) and again at the end (graded). */
  coreQuestion: string;
  rubric: GuidedRubricPoint[];
  /** Rubric points needed to pass the final round. */
  passMark: number;
  /** Shown after the third failed attempt, and to graders as a reference. */
  modelAnswer: string;
  walkthrough: GuidedWalkthroughStep[];
  /** Question ids from the MCQ bank (`allQuestions`), 3 per lesson. */
  checkQuestionIds: number[];
}
