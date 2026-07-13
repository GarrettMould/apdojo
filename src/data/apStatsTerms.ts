import type { KeyTerm } from './allContent';
import { apStatsUnit1KeyTerms } from './stats/apStatsUnit1KeyTerms';
import { apStatsUnit2KeyTerms, apStatsUnit2StudyTips } from './stats/apStatsUnit2KeyTerms';
import { apStatsUnit3KeyTerms } from './stats/apStatsUnit3KeyTerms';
import { apStatsUnit4KeyTerms } from './stats/apStatsUnit4KeyTerms';
import { apStatsUnit5KeyTerms } from './stats/apStatsUnit5KeyTerms';

export const keyTerms: KeyTerm[] = [
  ...apStatsUnit1KeyTerms,
  ...apStatsUnit2KeyTerms,
  ...apStatsUnit3KeyTerms,
  ...apStatsUnit4KeyTerms,
  ...apStatsUnit5KeyTerms,
];

const STATS_LESSON_STUDY_TIPS: Record<number, Record<string, string[]>> = {
  2: apStatsUnit2StudyTips,
};

export function getStatsLessonStudyTips(unitNumber: number, lessonId: string): string[] {
  return STATS_LESSON_STUDY_TIPS[unitNumber]?.[lessonId] ?? [];
}
