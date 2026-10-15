import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { apQuestionSubjectTag } from '@/lib/courseSubject';
import type { Question } from '@/data/questionBanks/types';

/** Non-test questions for one practice subject. Rematch can span units, so the slice is the subject, not one unit. */
export function questionsForPracticeSubject(subject: string): Question[] {
  const subjectFilter = apQuestionSubjectTag(subject);
  return allQuestions.filter((q) => q.subject === subjectFilter && !q.isTest);
}
