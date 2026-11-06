import type { Question } from '@/data/questionBanks/types';

/**
 * Exam assembly rules for shared stimuli (practice banks are exempt):
 * - At most 2 questions on one graph, table or output. Neither may depend on or give away the
 *   other's answer; that part needs a human read, so this only counts.
 * - At most 1 question from a set that shares the same picture options ("which plot shows X?"),
 *   because answering one rules options out for the rest.
 */
export const MAX_PER_SHARED_STIMULUS = 2;
export const MAX_PER_SHARED_OPTION_SET = 1;

export interface StimulusPolicyViolation {
  group: string;
  kind: 'stimulus' | 'option-set';
  questionIds: number[];
  limit: number;
}

function groupKey(q: Question): string | null {
  if (q.questionGroup !== undefined) return String(q.questionGroup);
  if (q.optionImages?.length) return q.optionImages.map((img) => img.src).sort().join('|');
  if (q.image && 'src' in q.image && typeof q.image.src === 'string') return q.image.src;
  return null;
}

export function checkExamStimulusPolicy(questions: Question[]): StimulusPolicyViolation[] {
  const groups = new Map<string, { kind: StimulusPolicyViolation['kind']; ids: number[] }>();
  for (const q of questions) {
    const key = groupKey(q);
    if (!key) continue;
    const kind = q.optionImages?.length ? 'option-set' : 'stimulus';
    const group = groups.get(key) ?? { kind, ids: [] };
    group.ids.push(q.id);
    groups.set(key, group);
  }
  return [...groups].flatMap(([group, { kind, ids }]) => {
    const limit = kind === 'option-set' ? MAX_PER_SHARED_OPTION_SET : MAX_PER_SHARED_STIMULUS;
    return ids.length > limit ? [{ group, kind, questionIds: ids, limit }] : [];
  });
}
