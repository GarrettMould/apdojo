/**
 * Questions whose answer options were reordered after launch (to balance answer letters).
 *
 * Saved MCQ progress used to store only the chosen option's position (0 = A). Progress saved before a
 * reorder has no `selectedText`, so on restore we swap the saved position back with this map. Progress
 * saved since then stores the option text and is restored by matching text instead.
 *
 * Keyed by exam type, then question id (ids repeat across Macro and Micro): [old position, new position]
 * of the two options that traded places.
 */
export const ANSWER_ORDER_SWAPS: Partial<Record<string, Record<number, [number, number]>>> = {
  macro: {
    1043: [1, 2], 1044: [3, 2], 1051: [2, 0], 1054: [2, 0], 1067: [1, 4], 1071: [1, 0], 1074: [1, 2],
  },
  micro: {
    2009: [1, 4], 2013: [1, 4], 2014: [2, 0], 3009: [0, 2], 3007: [0, 3], 4005: [0, 3], 4014: [1, 3],
    4012: [2, 3], 5007: [1, 4], 5012: [0, 3], 6012: [2, 0], 6008: [2, 4],
  },
  gov: {
    6338: [0, 2],
  },
};

/** The option index a legacy (position-only) saved answer refers to after any reorder. */
export function migrateLegacyAnswerIndex(examType: string, questionId: number, savedIndex: number): number {
  const swap = ANSWER_ORDER_SWAPS[examType]?.[questionId];
  if (!swap) return savedIndex;
  const [a, b] = swap;
  if (savedIndex === a) return b;
  if (savedIndex === b) return a;
  return savedIndex;
}
