import type { StatRoutine } from '@/lib/ti84-simulator';

/** What the student must accomplish on the calculator. */
export type DrillGoal =
  /** Reach the input screen for the target routine (menu navigation). */
  | 'locate'
  /** Complete the routine and land on a matching numeric result. */
  | 'produce';

/** Which number on the result screen to grade. */
export type ResultKey =
  | 'value' // bare numeric line (DISTR outputs)
  | 'p'
  | 'z'
  | 't'
  | 'df'
  | 'p̂'
  | 'x̄'
  | 'Sx'
  | 'n'
  | 'a'
  | 'b'
  | 'r'
  | 'r²';

export type CalculatorDrill = {
  id: string;
  family: 'DISTR' | 'STAT TESTS' | 'STAT CALC' | 'HOME';
  goal: DrillGoal;
  /** Short family label shown above the stem */
  skillLabel: string;
  /** AP Stats–style stem */
  prompt: string;
  /** Explicit calculator goal shown under the stem */
  goalText: string;
  /** Optional “you should see ≈ …” success cue */
  successCue?: string;
  targetRoutine: StatRoutine;
  /** Graded only when goal === 'produce' */
  resultKey?: ResultKey;
  expected?: number;
  /** Absolute tolerance; default 1e-3 */
  tolerance?: number;
  /** Used for soft feedback when the result is wrong */
  expectedInputs?: Record<string, string>;
  hints: string[];
  /** Shown after 2 failed checks — high-level path, not a full keystroke dump */
  showPath: string;
};

/** A short skill-focused deck of 3–4 calculator drills. */
export type CalculatorDrillDeck = {
  id: string;
  title: string;
  description: string;
  /** Menu family badge */
  family: CalculatorDrill['family'];
  drills: CalculatorDrill[];
};

export type DrillCheckStatus = 'idle' | 'correct' | 'incorrect';

export type DrillCheckResult = {
  status: DrillCheckStatus;
  message: string;
};
