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
}

/**
 * Official time limits and question counts for each unit test.
 * AP Macro unit tests follow the standard ~17m30s (1050s) for most units.
 * AP Micro unit tests follow the standard ~22m30s (1350s) for most units.
 * Adjust per unit as needed.
 */
export const UNIT_TEST_META: SubjectTestMeta = {
  macro: [
    { unit: 1, questionCount: 13, timeLimitSeconds: 900  }, // 15 min
    { unit: 2, questionCount: 15, timeLimitSeconds: 1050 }, // 17m30s
    { unit: 3, questionCount: 15, timeLimitSeconds: 1050 }, // 17m30s
    { unit: 4, questionCount: 17, timeLimitSeconds: 1190 }, // 19m50s
    { unit: 5, questionCount: 14, timeLimitSeconds: 980  }, // 16m20s
    { unit: 6, questionCount: 12, timeLimitSeconds: 840  }, // 14 min
  ],
  micro: [
    { unit: 1, questionCount: 16, timeLimitSeconds: 1120 }, // 18m40s
    { unit: 2, questionCount: 15, timeLimitSeconds: 1050 }, // 17m30s
    { unit: 3, questionCount: 15, timeLimitSeconds: 1050 }, // 17m30s
    { unit: 4, questionCount: 15, timeLimitSeconds: 1050 }, // 17m30s
    { unit: 5, questionCount: 14, timeLimitSeconds: 980  }, // 16m20s
    { unit: 6, questionCount: 15, timeLimitSeconds: 1050 }, // 17m30s
  ],
  gov: [
    { unit: 1, questionCount: 30, timeLimitSeconds: 2400 }, // 40 min — Unit 1 practice exam
    { unit: 2, questionCount: 0, timeLimitSeconds: 0 }, // locked / coming soon
    { unit: 3, questionCount: 0, timeLimitSeconds: 0 },
    { unit: 4, questionCount: 0, timeLimitSeconds: 0 },
    { unit: 5, questionCount: 0, timeLimitSeconds: 0 },
  ],
};

export function getUnitTestMeta(
  subject: 'macro' | 'micro' | 'gov',
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
