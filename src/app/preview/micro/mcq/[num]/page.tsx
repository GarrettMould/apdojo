'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { FullExam } from '@/components/FullExam';
import { microSetOneQuestions } from '@/data/questionBanks/micro/mcqs/setOne';

export default function MicroMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  // No redirect - allow everyone to see first 5 questions, access check happens in FullExam
  return (
    <div className="min-h-screen">
      <FullExam 
        questionBank={microSetOneQuestions}
        examType="micro"
        questionType="mcq"
        examNumber={`full-micro-mcq-${num}`}
        isUnitTest={true}
      />
    </div>
  );
} 