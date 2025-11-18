'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/micro/frqs/setOne';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function MicroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { user, userData, loadingUserData } = useAuthContext();

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  // Check if user has purchased this exam
  const examId = `micro-frq-${num}`;
  const hasPurchase = userData?.purchases?.includes(examId) || false;

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
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
