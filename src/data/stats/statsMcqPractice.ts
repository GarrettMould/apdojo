import type { Question } from '@/data/questionBanks/types';
import { statsUnit1McqPracticeQuestions } from '@/data/stats/statsUnit1McqPractice';
import { statsUnit2McqPracticeQuestions } from '@/data/stats/statsUnit2McqPractice';
import { statsUnit3McqPracticeQuestions } from '@/data/stats/statsUnit3McqPractice';
import { statsUnit4McqPracticeQuestions } from '@/data/stats/statsUnit4McqPractice';
import { statsUnit5McqPracticeQuestions } from '@/data/stats/statsUnit5McqPractice';
import {
  statsV2Unit1Questions,
  statsV2Unit2Questions,
  statsV2Unit3Questions,
  statsV2Unit4Questions,
  statsV2Unit5Questions,
} from '@/data/stats/statsV2McqPreview';
import { statsGapMcqPreviewQuestions } from '@/data/stats/statsGapMcqPreview';
import { statsStimulusByUnit } from '@/data/stats/statsStimulusMcqPractice';
import { statsFinalStimulusPracticeQuestions } from '@/data/stats/statsFullMcqExam1';

const statsGapByUnit = (unit: number) =>
  statsGapMcqPreviewQuestions.filter((q) => q.unit === unit);

/** Graph and table questions written for the full MCQ exam but not used on it. */
const statsFinalLeftoversByUnit = (unit: number) =>
  statsFinalStimulusPracticeQuestions.filter((q) => q.unit === unit);

/**
 * All AP Statistics MCQ practice questions (non-test bank).
 * Formal unit tests live in `statsUnit*McqExam.ts` / `statsUnit*McqTest.ts` and must never be merged here.
 * Table batches (28xxx) live in `statsV2McqPreview.ts` and `statsGapMcqPreview.ts`.
 */
export const statsMcqPracticeQuestions: Question[] = [
  ...statsUnit1McqPracticeQuestions,
  ...statsV2Unit1Questions,
  ...statsGapByUnit(1),
  ...statsStimulusByUnit(1),
  ...statsFinalLeftoversByUnit(1),
  ...statsUnit2McqPracticeQuestions,
  ...statsV2Unit2Questions,
  ...statsGapByUnit(2),
  ...statsStimulusByUnit(2),
  ...statsFinalLeftoversByUnit(2),
  ...statsUnit3McqPracticeQuestions,
  ...statsV2Unit3Questions,
  ...statsGapByUnit(3),
  ...statsFinalLeftoversByUnit(3),
  ...statsUnit4McqPracticeQuestions,
  ...statsV2Unit4Questions,
  ...statsGapByUnit(4),
  ...statsFinalLeftoversByUnit(4),
  ...statsUnit5McqPracticeQuestions,
  ...statsV2Unit5Questions,
  ...statsGapByUnit(5),
  ...statsStimulusByUnit(5),
  ...statsFinalLeftoversByUnit(5),
];