'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { FullExam } from '@/components/FullExam';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';

export default function MacroMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  // No redirect - allow everyone to see first 5 questions, access check happens in FullExam
  return (
    <div className="min-h-screen">
      <FullExam 
        questionBank={macroSetOneQuestions}
        examType="macro"
        questionType="mcq"
        examNumber={`full-macro-mcq-${num}`}
        isUnitTest={true}
      />
    </div>
  );
}
