import type { Question } from '@/data/questionBanks/types';
import { getStatsMcqQuestionsByUnit } from '@/data/stats/statsAllMcqQuestions';

/** Stats unit MCQ **test** banks (formal unit test route only). */
export function getStatsUnitMcqTestQuestions(unitNumber: number): Question[] {
  return getStatsMcqQuestionsByUnit(unitNumber);
}

export {
  ALL_STATS_MCQ_QUESTIONS,
  STATS_MCQ_QUESTIONS_BY_UNIT,
  getAllStatsMcqQuestions,
  getStatsMcqQuestionsByUnit,
} from '@/data/stats/statsAllMcqQuestions';
