'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/micro/frqs/setOne';

export default function MicroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData } = useAuthContext();

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  // Show loading state while checking auth
  if (loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - accessible to everyone
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div>
          <div className="space-y-4 mt-8">
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-green-500">AP Microeconomics</span>{" "}
              FRQ {num}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Complete all questions to submit and view your score. Explanations are available after you submit.
            </p>
          </div>
        </div>
        <FullExamFRQ questions={frqSetOneQuestions} />
      </div>
    </div>
  );
}
