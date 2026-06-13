export interface UnitTestMeta {
  unit: number;
  questionCount: number;
  /** Allowed time in seconds */
  timeLimitSeconds: number;
}

export interface SubjectTestMeta {
  macro: UnitTestMeta[];
  micro: UnitTestMeta[];
  gov: UnitTestMeta[];
  stats: UnitTestMeta[];
}

/** AP Macro/Micro MCQ section pacing: 60 Q in 70 min → 70s per question. */
export const ECON_UNIT_MCQ_SECONDS_PER_QUESTION = 70;

/** ceil(5400s ÷ 42 Q) — AP Stats unit MCQ pacing. */
export const STATS_UNIT_MCQ_SECONDS_PER_QUESTION = 129;

/** ceil(87.27s) — AP Gov unit MCQ pacing. */
export const GOV_UNIT_MCQ_SECONDS_PER_QUESTION = 88;

/** Total seconds for a unit MCQ test: (Q × sec/Q), rounded up to the nearest whole minute. */
export function unitMcqTimeLimitSeconds(questionCount: number, secondsPerQuestion: number): number {
  const rawSeconds = questionCount * secondsPerQuestion;
  return Math.ceil(rawSeconds / 60) * 60;
}

function econUnitMeta(unit: number, questionCount: number): UnitTestMeta {
  return {
    unit,
    questionCount,
    timeLimitSeconds: unitMcqTimeLimitSeconds(questionCount, ECON_UNIT_MCQ_SECONDS_PER_QUESTION),
  };
}

function govUnitMeta(unit: number, questionCount: number): UnitTestMeta {
  return {
    unit,
    questionCount,
    timeLimitSeconds: unitMcqTimeLimitSeconds(questionCount, GOV_UNIT_MCQ_SECONDS_PER_QUESTION),
  };
}

function statsUnitMeta(unit: number, questionCount: number): UnitTestMeta {
  return {
    unit,
    questionCount,
    timeLimitSeconds: unitMcqTimeLimitSeconds(questionCount, STATS_UNIT_MCQ_SECONDS_PER_QUESTION),
  };
}

/**
 * Official time limits and question counts for each unit test.
 * Econ (Macro/Micro): 70s/Q (60 Q in 70 min), total rounded up to whole minutes.
 * Gov/Stats: fixed sec/Q rates, total rounded up to whole minutes.
 */
export const UNIT_TEST_META: SubjectTestMeta = {
  macro: [
    econUnitMeta(1, 13), // 16 min
    econUnitMeta(2, 15), // 18 min
    econUnitMeta(3, 15), // 18 min
    econUnitMeta(4, 17), // 20 min
    econUnitMeta(5, 14), // 17 min
    econUnitMeta(6, 12), // 14 min
  ],
  micro: [
    econUnitMeta(1, 16), // 19 min
    econUnitMeta(2, 15), // 18 min
    econUnitMeta(3, 15), // 18 min
    econUnitMeta(4, 15), // 18 min
    econUnitMeta(5, 14), // 17 min
    econUnitMeta(6, 15), // 18 min
  ],
  gov: [
    govUnitMeta(1, 18), // 27 min
    govUnitMeta(2, 18), // 27 min
    govUnitMeta(3, 18), // 27 min
    govUnitMeta(4, 22), // 33 min
    govUnitMeta(5, 18), // 27 min
  ],
  stats: [
    statsUnitMeta(1, 20), // 43 min
  ],
};

export function getUnitTestMeta(
  subject: 'macro' | 'micro' | 'gov' | 'stats',
  unit: number
): UnitTestMeta | undefined {
  return UNIT_TEST_META[subject].find((m) => m.unit === unit);
}

/** Format seconds as "X min" or "Xm Ys" */
export function formatTestTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (s === 0) return `${m} min`;
  return `${m}m ${s}s`;
}
