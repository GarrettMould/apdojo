import type { Question } from '@/data/questionBanks/types';
import { govUnit1McqTestQuestions } from '@/data/gov/govUnit1McqExam';
import { govUnit2McqTestQuestions } from '@/data/gov/govUnit2McqExam';
import { govUnit3McqTestQuestions } from '@/data/gov/govUnit3McqExam';
import { govUnit4McqTestQuestions } from '@/data/gov/govUnit4McqExam';
import { govUnit5McqTestQuestions } from '@/data/gov/govUnit5McqExam';

/** Gov unit MCQ **test** banks (formal unit test route only; practice pool is in `govUnit*McqPractice.ts` + `allQuestions`). */
export function getGovUnitMcqTestQuestions(unitNumber: number): Question[] {
  if (unitNumber === 1) return govUnit1McqTestQuestions;
  if (unitNumber === 2) return govUnit2McqTestQuestions;
  if (unitNumber === 3) return govUnit3McqTestQuestions;
  if (unitNumber === 4) return govUnit4McqTestQuestions;
  if (unitNumber === 5) return govUnit5McqTestQuestions;
  return [];
}
