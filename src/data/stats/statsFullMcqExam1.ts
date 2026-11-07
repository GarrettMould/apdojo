import type { Question } from '@/data/questionBanks/types';
import { checkExamStimulusPolicy } from '@/lib/examStimulusPolicy';
import { statsFinalStimulusQuestions } from './statsFinalStimulusMcq';
import { statsFullMcqExamTextQuestions } from './statsFullMcqExamText';
import { statsStimulusMcqPracticeQuestions } from './statsStimulusMcqPractice';
import { STATS_FULL_MCQ_EXAM_1_IDS } from './statsFullMcqExam1Ids';

const allQuestions = [
  ...statsFinalStimulusQuestions,
  ...statsFullMcqExamTextQuestions,
  ...statsStimulusMcqPracticeQuestions,
];

export const statsFullMcqExam1Questions: Question[] = STATS_FULL_MCQ_EXAM_1_IDS.map((id) => {
  const question = allQuestions.find((q) => q.id === id);
  if (!question) throw new Error(`AP Stats Full MCQ Exam 1: question ${id} not found`);
  return question;
});

const examStimulusGroups = new Set(statsFullMcqExam1Questions.map((q) => q.questionGroup).filter(Boolean));

/**
 * Single-stimulus questions left out of the exam, for the practice bank. Questions on a graph or table that
 * the exam also uses are held back: their stems and explanations can give away exam answers.
 */
export const statsFinalStimulusPracticeQuestions: Question[] = statsFinalStimulusQuestions.filter(
  (q) => !STATS_FULL_MCQ_EXAM_1_IDS.includes(q.id) && !examStimulusGroups.has(q.questionGroup),
);

if (process.env.NODE_ENV === 'development') {
  for (const v of checkExamStimulusPolicy(statsFullMcqExam1Questions)) {
    console.warn(
      `[AP Stats Full MCQ Exam 1] ${v.questionIds.length} questions share ${v.kind} "${v.group}" (limit ${v.limit}): ${v.questionIds.join(', ')}`,
    );
  }
}
