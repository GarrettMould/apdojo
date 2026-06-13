import type { Question } from '@/data/questionBanks/types';
import { statsUnit1McqTestQuestions } from '@/data/stats/statsUnit1McqExam';

/** Stats unit MCQ **test** banks (formal unit test route only). */
export function getStatsUnitMcqTestQuestions(unitNumber: number): Question[] {
  if (unitNumber === 1) return statsUnit1McqTestQuestions;
  return [];
}
