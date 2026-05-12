import type { Question } from '@/data/questionBanks/types';
import { govUnit1McqTestQuestions } from '@/data/gov/govUnit1McqExam';

/** Gov unit MCQ **test** banks (formal unit test route only; practice pool is in `govUnit1McqPractice.ts` + `allQuestions`). */
export function getGovUnitMcqTestQuestions(unitNumber: number): Question[] {
  if (unitNumber === 1) return govUnit1McqTestQuestions;
  return [];
}
