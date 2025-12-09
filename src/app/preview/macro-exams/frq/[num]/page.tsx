'use client';

import { use } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/macro/frqs/setOne';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function MacroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { user, userData, loadingUserData } = useAuthContext();

  // Only show exam 1 for now
  if (num !== '1') {
    return null;
  }

  // Check if user has purchased this exam
  const examId = `macro-frq-${num}`;
  const hasPurchase = userData?.purchases?.includes(examId) || false;

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

  // If not logged in or hasn't purchased, show locked message
  if (!user || !hasPurchase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Exam Locked</h1>
          <p className="text-gray-600 mb-6">
            This exam requires a purchase. Please purchase the exam to access it.
          </p>
          <Link 
            href="/purchase/exams"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Purchase Exam
          </Link>
        </div>
      </div>
    );
  }

  // User has access, show the exam
  return (
    <div className="py-8">
      <FullExamFRQ questions={frqSetOneQuestions} />
    </div>
  );
}
