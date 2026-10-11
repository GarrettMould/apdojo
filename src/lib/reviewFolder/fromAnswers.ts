import type { Question } from '@/data/questionBanks/types';
import { apQuestionSubjectTag, type CourseSubject } from '@/lib/courseSubject';
import {
  previewFromQuestion,
  recordCorrect,
  recordMiss,
} from '@/lib/reviewFolder/store';
import type { ReviewFolderState } from '@/lib/reviewFolder/types';

export type AnswerLike = {
  questionId: string | number;
  isCorrect: boolean;
  unitId: number;
  lessonIDS?: string[];
  selectedLetter?: string;
  subject?: string;
  timestamp?: { toMillis?: () => number; seconds?: number } | number | null;
};

function answerTime(a: AnswerLike): number {
  const t = a.timestamp;
  if (typeof t === 'number' && Number.isFinite(t)) return t;
  if (t && typeof t === 'object') {
    if (typeof t.toMillis === 'function') return t.toMillis();
    if (typeof t.seconds === 'number') return t.seconds * 1000;
  }
  return 0;
}

function toQuestionId(raw: string | number): number | null {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : raw;
  return typeof n === 'number' && Number.isFinite(n) ? n : null;
}

function questionSubjectTags(q: Question | undefined): string[] {
  if (!q?.subject) return [];
  return Array.isArray(q.subject) ? q.subject : [q.subject];
}

/** True if this answer belongs to the in-app course subject (gov/stats/macro/micro). */
export function answerBelongsToSubject(
  answer: AnswerLike,
  subject: string,
  question: Question | undefined
): boolean {
  const course = subject as CourseSubject;
  const tag = apQuestionSubjectTag(course);
  const aliases = new Set<string>([subject, tag, course]);

  if (answer.subject) {
    const s = String(answer.subject);
    if (aliases.has(s)) return true;
    // Explicit other course → reject
    if (
      s === 'gov' ||
      s === 'stats' ||
      s === 'macro' ||
      s === 'micro' ||
      s.startsWith('ap_')
    ) {
      return false;
    }
  }

  const qTags = questionSubjectTags(question);
  if (qTags.length > 0) {
    return qTags.some((t) => t === tag);
  }

  // No subject on answer and question not in bank → do not seed across courses
  return false;
}

/**
 * Seed / refresh active misses from durable mcqAnswers history for one unit + subject.
 * Uses the latest answer per question: incorrect → miss, correct → graduate.
 */
export function applyAnswerHistoryToReviewFolder(
  state: ReviewFolderState,
  answers: AnswerLike[],
  opts: {
    subject: string;
    unitNumber: number;
    bankQuestions: Question[];
  }
): ReviewFolderState {
  const { subject, unitNumber, bankQuestions } = opts;
  const subjectTag = apQuestionSubjectTag(subject as CourseSubject);
  const byId = new Map(
    bankQuestions
      .filter((q) => {
        const tags = questionSubjectTags(q);
        return tags.includes(subjectTag);
      })
      .map((q) => [q.id, q])
  );

  const relevant = answers.filter((a) => {
    if (a.unitId !== unitNumber) return false;
    const qid = toQuestionId(a.questionId);
    const question = qid != null ? byId.get(qid) : undefined;
    // Also allow lookup in full bank for subject check when filtered map misses
    const fullQ =
      question ??
      (qid != null ? bankQuestions.find((q) => q.id === qid) : undefined);
    return answerBelongsToSubject(a, subject, fullQ);
  });

  const latestByQuestion = new Map<number, AnswerLike>();
  const sorted = [...relevant].sort((a, b) => answerTime(a) - answerTime(b));
  for (const answer of sorted) {
    const qid = toQuestionId(answer.questionId);
    if (qid == null) continue;
    latestByQuestion.set(qid, answer);
  }

  let next = state;
  for (const [questionId, answer] of latestByQuestion) {
    const question = byId.get(questionId) ?? bankQuestions.find((q) => q.id === questionId);
    const lessons =
      (answer.lessonIDS?.length ? answer.lessonIDS : question?.lessonIDS) || [];

    if (answer.isCorrect) {
      next = recordCorrect(next, questionId, lessons);
    } else {
      next = recordMiss(next, {
        questionId,
        subject,
        unitNumber,
        lessonIDS: lessons,
        selectedLetter: answer.selectedLetter,
        questionPreview: previewFromQuestion(
          question?.question || `Question ${questionId}`
        ),
        missedAt: answerTime(answer) || Date.now(),
      });
    }
  }

  // Drop any stray misses from another course that leaked into this folder
  next = {
    ...next,
    misses: next.misses.filter(
      (m) =>
        m.unitNumber === unitNumber &&
        (m.subject === subject ||
          m.subject === subjectTag ||
          !m.subject)
    ),
  };

  // If miss has no subject but question is wrong course, drop it
  next = {
    ...next,
    misses: next.misses.filter((m) => {
      if (m.subject && m.subject !== subject && m.subject !== subjectTag) {
        return false;
      }
      const q = byId.get(m.questionId);
      if (!q) {
        // Keep only if we can't verify — but prefer drop when bank has the id under another subject
        const other = bankQuestions.find((bq) => bq.id === m.questionId);
        if (!other) return true;
        return questionSubjectTags(other).includes(subjectTag);
      }
      return true;
    }),
  };

  return next;
}
