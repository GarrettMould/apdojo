'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Question } from '@/data/questionBanks/types';

let cached: Question[] | null = null;
let pending: Promise<Question[]> | null = null;

export function loadQuestionBank(): Promise<Question[]> {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = import('@/data/unitPracticeProblems/unitPracticeProblems').then((mod) => {
      cached = mod.allQuestions;
      return mod.allQuestions;
    });
  }
  return pending;
}

/** Loads the MCQ bank after first paint so pages can render without it. */
export function useQuestionBank(): Question[] | null {
  const [bank, setBank] = useState<Question[] | null>(cached);

  useEffect(() => {
    let cancelled = false;
    loadQuestionBank().then((questions) => {
      if (!cancelled) setBank(questions);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return bank;
}

export type LessonMcqPreview = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | string;
  explanation: string;
  image?: Question['image'];
  tableData?: Question['tableData'];
};

export function useLessonMcqPreview(args: {
  unit: number;
  subject: string;
  lessonId: string;
  limit?: number;
  answerAsIndex?: boolean;
}): LessonMcqPreview[] | null {
  const { unit, subject, lessonId, limit = 3, answerAsIndex = true } = args;
  const bank = useQuestionBank();

  return useMemo(() => {
    if (!bank) return null;

    return bank
      .filter(
        (q) =>
          q.unit === unit &&
          q.subject === subject &&
          q.lessonIDS?.includes(lessonId)
      )
      .slice(0, limit)
      .map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer:
          answerAsIndex && typeof q.correctAnswer === 'string'
            ? q.correctAnswer.charCodeAt(0) - 65
            : q.correctAnswer,
        explanation: q.explanation ?? '',
        image: q.image ?? null,
        tableData: q.tableData,
      }));
  }, [bank, unit, subject, lessonId, limit, answerAsIndex]);
}
