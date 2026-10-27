import type { Question } from '@/data/questionBanks/types';
import { govUnit1McqPracticeQuestions } from '@/data/gov/govUnit1McqPractice';
import { govUnit2McqPracticeQuestions } from '@/data/gov/govUnit2McqPractice';
import { govUnit3McqPracticeQuestions } from '@/data/gov/govUnit3McqPractice';
import { govUnit4McqPracticeQuestions } from '@/data/gov/govUnit4McqPractice';
import { govUnit5McqPracticeQuestions } from '@/data/gov/govUnit5McqPractice';
import { govStimulusByUnit } from '@/data/gov/govStimulusMcqPractice';

/**
 * All AP Gov MCQ practice questions (non-test bank).
 * Formal unit tests live in `govUnit*McqExam.ts` and must never be merged here.
 */
export const govMcqPracticeQuestions: Question[] = [
  ...govUnit1McqPracticeQuestions,
  ...govStimulusByUnit(1),
  ...govUnit2McqPracticeQuestions,
  ...govStimulusByUnit(2),
  ...govUnit3McqPracticeQuestions,
  ...govStimulusByUnit(3),
  ...govUnit4McqPracticeQuestions,
  ...govStimulusByUnit(4),
  ...govUnit5McqPracticeQuestions,
  ...govStimulusByUnit(5),
];
