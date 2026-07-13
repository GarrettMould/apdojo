import type { Question } from '@/data/questionBanks/types';
import { statsUnit1McqTestQuestions } from '@/data/stats/statsUnit1McqExam';
import { statsUnit2McqTestQuestions } from '@/data/stats/statsUnit2McqExam';
import { statsUnit3McqTestQuestions } from '@/data/stats/statsUnit3McqExam';
import { statsUnit4McqTestQuestions } from '@/data/stats/statsUnit4McqExam';
import { statsUnit5McqTestQuestions } from '@/data/stats/statsUnit5McqExam';

/** Stats unit MCQ **test** banks (formal unit test route only). */
export function getStatsUnitMcqTestQuestions(unitNumber: number): Question[] {
  if (unitNumber === 1) return statsUnit1McqTestQuestions;
  if (unitNumber === 2) return statsUnit2McqTestQuestions;
  if (unitNumber === 3) return statsUnit3McqTestQuestions;
  if (unitNumber === 4) return statsUnit4McqTestQuestions;
  if (unitNumber === 5) return statsUnit5McqTestQuestions;
  return [];
}
