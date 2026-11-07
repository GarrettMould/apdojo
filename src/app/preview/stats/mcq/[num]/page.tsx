'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { FullExam } from '@/components/FullExam';
import type { QuestionBank } from '@/data/questionBanks/types';
import { statsFullMcqExam1Questions } from '@/data/stats/statsFullMcqExam1';
import { FEATURES } from '@/lib/featureFlags';

const statsSetOne: QuestionBank = { name: 'AP Stats Full MCQ Exam 1', questions: statsFullMcqExam1Questions };

export default function StatsMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);

  // Only exam 1 exists, and only once launched
  if (num !== '1' || !FEATURES.statsFullMcqExam) {
    notFound();
  }

  // Everyone sees the free questions; the season pass check happens in FullExam
  return (
    <div className="min-h-screen">
      <FullExam
        questionBank={statsSetOne}
        examType="stats"
        questionType="mcq"
        examNumber={`full-stats-mcq-${num}`}
        isUnitTest={true}
      />
    </div>
  );
}
