import type { Question } from '@/data/questionBanks/types';
import { statsUnit1McqPracticeQuestions } from '@/data/stats/statsUnit1McqPractice';
import { statsUnit2McqPracticeQuestions } from '@/data/stats/statsUnit2McqPractice';
import { statsUnit3McqPracticeQuestions } from '@/data/stats/statsUnit3McqPractice';
import { statsUnit4McqPracticeQuestions } from '@/data/stats/statsUnit4McqPractice';
import { statsUnit5McqPracticeQuestions } from '@/data/stats/statsUnit5McqPractice';

/**
 * All AP Statistics MCQ practice questions (non-test bank).
 * Formal unit tests live in `statsUnit*McqExam.ts` / `statsUnit*McqTest.ts` and must never be merged here.
 */
export const statsMcqPracticeQuestions: Question[] = [
  ...statsUnit1McqPracticeQuestions,
  ...statsUnit2McqPracticeQuestions,
  ...statsUnit3McqPracticeQuestions,
  ...statsUnit4McqPracticeQuestions,
  ...statsUnit5McqPracticeQuestions,
];
