/** Soft-check Desmos task — graded by student (“Got it”), not by reading the calc. */
export type DesmosDrill = {
  id: string;
  skillLabel: string;
  /** AP Stats–style stem */
  prompt: string;
  /** What to do in Desmos UI */
  goalText: string;
  /** Optional numeric target cue */
  successCue?: string;
  hints: string[];
  /** High-level Desmos UI path after hints */
  showPath: string;
};

export type DesmosDrillDeck = {
  id: string;
  title: string;
  description: string;
  /** Skill family badge */
  family: 'DISTRIBUTIONS' | 'INFERENCE' | 'DATA';
  drills: DesmosDrill[];
};
