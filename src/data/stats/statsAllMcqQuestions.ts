import type { Question } from '@/data/questionBanks/types';
import { statsUnit1McqTestQuestions } from '@/data/stats/statsUnit1McqExam';
import { statsUnit2McqTestQuestions } from '@/data/stats/statsUnit2McqExam';
import { statsUnit3McqTestQuestions } from '@/data/stats/statsUnit3McqExam';
import { statsUnit4McqTestQuestions } from '@/data/stats/statsUnit4McqExam';
import { statsUnit5McqTestQuestions } from '@/data/stats/statsUnit5McqExam';

/** Per-unit formal Stats MCQ banks (source of truth remains the unit exam files). */
export const STATS_MCQ_QUESTIONS_BY_UNIT: Record<number, Question[]> = {
  1: statsUnit1McqTestQuestions,
  2: statsUnit2McqTestQuestions,
  3: statsUnit3McqTestQuestions,
  4: statsUnit4McqTestQuestions,
  5: statsUnit5McqTestQuestions,
};

/**
 * All AP Stats MCQ questions across Units 1–5, in unit order.
 * Prefer this when you need the full shared pool (practice, full exams, tooling).
 */
export const ALL_STATS_MCQ_QUESTIONS: Question[] = [
  ...statsUnit1McqTestQuestions,
  ...statsUnit2McqTestQuestions,
  ...statsUnit3McqTestQuestions,
  ...statsUnit4McqTestQuestions,
  ...statsUnit5McqTestQuestions,
];

export function getStatsMcqQuestionsByUnit(unitNumber: number): Question[] {
  return STATS_MCQ_QUESTIONS_BY_UNIT[unitNumber] ?? [];
}

export function getAllStatsMcqQuestions(): Question[] {
  return ALL_STATS_MCQ_QUESTIONS;
}
