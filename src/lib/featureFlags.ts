/**
 * Site features that are built but not public yet. When a flag is false, its links are hidden and
 * its pages return 404. Flip to true to launch.
 */
export const FEATURES = {
  /** AP Stats Full MCQ Exam 1 (/ap-stats-mcq-practice-test-1). */
  statsFullMcqExam: true,
  /** AP Stats Full FRQ Exam 1 (/ap-stats-frq-practice-test-1). */
  statsFullFrqExam: true,
  /** 1-on-1 tutoring page (/tutoring) and its nav, footer and purchase-page links. */
  tutoring: false,
  /**
   * Guided AP Macro explainers: the /ap-macro/explainers hub, unit wrap-ups and the explainer links on
   * unit test results. The lesson URLs themselves show the earlier deep-dive pages while this is off.
   */
  guidedExplainers: false,
} as const;
