/* ── TI-84 Plus Simulator — shared types ─────────────────────── */

/** A single line shown on the calculator screen. */
export type ScreenLine = {
  text: string;
  /** Right-aligned result line */
  align?: 'left' | 'right';
  /** Highlighted / selected menu row */
  selected?: boolean;
};

/** Top-level modes the calculator can be in. */
export type CalcMode =
  | 'home' // free arithmetic entry
  | 'stat-tests-menu' // STAT → TESTS menu list
  | 'stat-calc-menu' // STAT → CALC menu list
  | 'distr-menu' // DISTR menu list
  | 'input' // stepping through input prompts for a chosen test/function
  | 'result'; // showing computed output

/** Identifies which statistical routine is active. */
export type StatRoutine =
  // STAT > TESTS
  | '2-SampTTest'
  | '1-PropZTest'
  | '2-PropZTest'
  | 'TInterval'
  | 'chi2-GOF'
  // DISTR
  | 'normalcdf'
  | 'invNorm'
  | 'tcdf'
  | 'invT'
  // STAT > CALC
  | '1-VarStats'
  | 'LinReg';

/** One input field for a statistical routine. */
export type InputField = {
  label: string;
  key: string;
  /** Default value shown in the field */
  defaultValue?: string;
};

/** Full state of the calculator at any moment. */
export type CalcState = {
  mode: CalcMode;
  /** Which stat routine is selected (only set when mode is input/result). */
  routine: StatRoutine | null;
  /** Screen content — up to 8 visible lines (TI-84 has ~8 rows). */
  screenLines: ScreenLine[];
  /** Current text being typed on the home screen or in an input field. */
  inputBuffer: string;
  /** History of home-screen expressions + results. */
  history: ScreenLine[];
  /** For multi-field input: which field index we're on. */
  inputFieldIndex: number;
  /** Collected field values so far (key → value string). */
  inputValues: Record<string, string>;
  /** Menu cursor position (0-based). */
  menuCursor: number;
  /** For input mode: the field definitions for the current routine. */
  inputFields: InputField[];
  /** Error message, if any. */
  error: string | null;
};

export const INITIAL_STATE: CalcState = {
  mode: 'home',
  routine: null,
  screenLines: [],
  inputBuffer: '',
  history: [],
  inputFieldIndex: 0,
  inputValues: {},
  menuCursor: 0,
  inputFields: [],
  error: null,
};

/** Actions the user can take. */
export type CalcAction =
  | { type: 'key'; key: string } // digit, operator, decimal, negative, etc.
  | { type: 'enter' }
  | { type: 'clear' }
  | { type: 'reset' } // hard wipe to blank home (drill reset)
  | { type: 'del' }
  | { type: 'stat' } // open STAT menu → TESTS
  | { type: 'stat-calc' } // STAT → CALC
  | { type: 'distr' } // open DISTR menu
  | { type: 'arrow'; dir: 'up' | 'down' }
  | { type: 'second' } // 2nd key (for future use)
  | { type: 'quit' }; // 2nd + QUIT → home
