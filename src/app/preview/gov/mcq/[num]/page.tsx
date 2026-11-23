'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { FullExam } from '@/components/FullExam';
import type { QuestionBank } from '@/data/questionBanks/types';
import { govFullMcqExamQuestions } from '@/data/gov/govFullMcqExam';
import { FEATURES } from '@/lib/featureFlags';

const govSetOne: QuestionBank = { name: 'AP Gov Full MCQ Exam 1', questions: govFullMcqExamQuestions };

export default function GovMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);

  // Only exam 1 exists, and only once launched
  if (num !== '1' || !FEATURES.govFullMcqExam) {
    notFound();
  }

  // Everyone sees the free questions; the season pass check happens in FullExam
  return (
    <div className="min-h-screen">
      <FullExam
        questionBank={govSetOne}
        examType="gov"
        questionType="mcq"
        examNumber={`full-gov-mcq-${num}`}
        isUnitTest={true}
      />
    </div>
  );
}
