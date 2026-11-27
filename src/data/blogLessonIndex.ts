/**
 * Which course lessons each blog post explains, kept apart from `blogPosts.tsx` (which pulls in the question
 * bank and graph components) so any page can look up a lesson's article cheaply. Keys are blog post slugs.
 */
export interface BlogLessonEntry {
  slug: string;
  subject: 'Macro' | 'Micro';
  unit: number;
  /** Short title for links; the post's own title lives in blogPosts.tsx. */
  title: string;
  /** Lesson numbers in the course framework, main one first. */
  lessonIds: string[];
}

export const BLOG_LESSON_INDEX: BlogLessonEntry[] = [
  { slug: 'ppc-and-opportunity-cost', subject: 'Macro', unit: 1, title: 'The Production Possibilities Curve (PPC)', lessonIds: ['1.2'] },
  { slug: 'nominal-vs-real-gdp-explained', subject: 'Macro', unit: 2, title: 'Nominal vs Real GDP Explained', lessonIds: ['2.6'] },
  { slug: 'sticky-wages-sras', subject: 'Macro', unit: 3, title: 'Sticky Wages: Why the Economy Is “Stuck” in the Short Run', lessonIds: ['3.3'] },
  { slug: 'short-run-and-long-run-equilibrium', subject: 'Macro', unit: 3, title: 'Short Run and Long Run Equilibrium', lessonIds: ['3.5', '3.7'] },
  { slug: 'the-economy-fixes-itself-long-run-self-adjustment', subject: 'Macro', unit: 3, title: 'The Economy Fixes Itself: Long-Run Self-Adjustment', lessonIds: ['3.7'] },
  { slug: 'fractional-reserve-banking', subject: 'Macro', unit: 4, title: 'How Banks Create Money', lessonIds: ['4.4'] },
  { slug: 'monetary-policy-and-aggregate-demand', subject: 'Macro', unit: 4, title: 'Monetary Policy: Connecting the Money Market to AD-AS', lessonIds: ['4.6'] },
  { slug: 'ample-reserves-market', subject: 'Macro', unit: 4, title: 'The Ample Reserves System', lessonIds: ['4.6', '4.5'] },
  { slug: 'crowding-out-fiscal-policy', subject: 'Macro', unit: 5, title: 'Crowding Out', lessonIds: ['5.5'] },
  { slug: 'foreign-exchange-cookies', subject: 'Macro', unit: 6, title: 'The Foreign Exchange Market', lessonIds: ['6.3'] },
  { slug: 'monopoly-marginal-revenue', subject: 'Micro', unit: 4, title: 'Why Marginal Revenue Falls Faster Than Demand', lessonIds: ['4.2'] },
  { slug: 'understanding-externalities', subject: 'Micro', unit: 6, title: 'Understanding Externalities', lessonIds: ['6.2'] },
];
