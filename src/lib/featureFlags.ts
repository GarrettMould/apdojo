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
  tutoring: true,
  /**
   * Guided AP Macro explainers: the /ap-macro/explainers hub, unit wrap-ups and the explainer links on
   * unit test results. The lesson URLs themselves show the earlier deep-dive pages while this is off.
   */
  guidedExplainers: true,
  /** Golden questions (free users), redemption rounds and the out-of-questions panel in MCQ practice. */
  practiceGoldLoop: true,
  /**
   * Show tutoring on the homepage (section + FAQ answer), in the header and in the footer.
   * Off hides only those links; /tutoring and the other tutoring links work as before.
   */
  showTutoringInNav: false,
  /**
   * Show the guided explainers in the header ("Explainers" link) and on the homepage Season Pass card.
   * Off hides only those mentions; the explainer lessons, hub and links elsewhere work as before.
   */
  showExplainersInNav: false,
} as const;
