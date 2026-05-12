import type { Question } from '@/data/questionBanks/types';

function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle practice questions while keeping each `questionGroup` block consecutive
 * (same order within the group as in the source data). Ungrouped items are individual chunks.
 */
export function shufflePracticeQuestions(questions: Question[]): Question[] {
  const itemsWithIndex = questions.map((item, index) => ({ item, originalIndex: index }));

  const groups = new Map<string | number, Array<{ item: Question; originalIndex: number }>>();
  const ungrouped: Array<{ item: Question; originalIndex: number }> = [];

  itemsWithIndex.forEach(({ item, originalIndex }) => {
    // Match setOne: only `undefined` means ungrouped (numeric 0 is a valid group id)
    if (item.questionGroup !== undefined) {
      const groupKey = item.questionGroup;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push({ item, originalIndex });
    } else {
      ungrouped.push({ item, originalIndex });
    }
  });

  const sortedGroups: Question[][] = [];
  groups.forEach((group) => {
    const sorted = [...group].sort((a, b) => a.originalIndex - b.originalIndex);
    sortedGroups.push(sorted.map((g) => g.item));
  });

  const chunks: Question[][] = [];
  sortedGroups.forEach((g) => chunks.push(g));
  ungrouped.sort((a, b) => a.originalIndex - b.originalIndex);
  ungrouped.forEach(({ item }) => chunks.push([item]));

  return fisherYatesShuffle(chunks).flat();
}
