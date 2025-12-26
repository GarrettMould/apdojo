'use client';

import { use } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/macro/frqs/setOne';

export default function MacroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData } = useAuthContext();

  // Only show exam 1 for now
  if (num !== '1') {
    return null;
  }

  // Show loading state while checking auth
  if (loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - accessible to everyone
  return (
    <div className="py-8">
      <FullExamFRQ questions={frqSetOneQuestions} />
    </div>
  );
}
