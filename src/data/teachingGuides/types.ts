/**
 * "Explained by Garrett" lesson guides: one AP lesson explained the way it's taught in real tutoring
 * sessions. Each guide is data in this shape, rendered by one template, so new guides (drafted from
 * lesson transcripts and approved by the tutor) slot in without new page code.
 *
 * Inline text supports **bold**, *italic* and `formula` marks.
 */

export type GuideCourse = 'ap-microeconomics' | 'ap-macroeconomics';

export type GuideBlock =
  | { type: 'p'; text: string }
  /** The tutor's own explanation from a lesson, shown as a pull quote. */
  | { type: 'quote'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  /** A row of small figures, e.g. a worked number example. */
  | { type: 'figures'; items: { value: string; label: string; tone?: 'down' | 'up' }[]; label?: string }
  /** A named diagram drawn by the template (see GuideDiagram). */
  | { type: 'diagram'; id: 'short-run-cost-curves' }
  /** A highlighted tip, e.g. how the AP exam asks it. */
  | { type: 'callout'; title: string; text: string }
  /**
   * A two-player payoff matrix. `payoffs[row][col]` is [row player's payoff, column player's payoff].
   * `highlight` marks a cell, e.g. the Nash equilibrium.
   */
  | {
      type: 'matrix';
      rowPlayer: string;
      colPlayer: string;
      rowStrategies: string[];
      colStrategies: string[];
      payoffs: [number, number][][];
      unit?: string;
      highlight?: [number, number];
      caption?: string;
    };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
}

export interface GuideQuestion {
  /** A figure shown with the question, as on the AP exam (a payoff matrix or a named diagram). */
  figure?: Extract<GuideBlock, { type: 'matrix' } | { type: 'diagram' }>;
  stem: string;
  options: string[];
  /** Index into options. */
  correct: number;
  explanation: string;
}

export interface TeachingGuide {
  course: GuideCourse;
  /** URL slug, e.g. "3-2-short-run-production-costs". */
  slug: string;
  unit: number;
  /** Lesson number in the course framework, e.g. "3.2". */
  lesson: string;
  lessonName: string;
  title: string;
  /** One or two sentences under the title; also the page description. */
  intro: string;
  /** Shorter line for search results and link previews. */
  metaDescription: string;
  sections: GuideSection[];
  mistakes: { said: string; fix: string }[];
  questions: GuideQuestion[];
  /** ISO date the guide was last reviewed by the tutor. */
  updated: string;
}
