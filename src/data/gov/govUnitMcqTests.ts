import type { Question } from '@/data/questionBanks/types';
import { govUnit1McqQuestions } from '@/data/gov/govUnit1McqExam';

/** Gov unit MCQ banks (only populated units return questions). */
export function getGovUnitMcqTestQuestions(unitNumber: number): Question[] {
  if (unitNumber === 1) return govUnit1McqQuestions;
  return [];
}
