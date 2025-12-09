'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { frqSetOneQuestions } from '@/data/questionBanks/macro/frqs/setOne';
import { FileText } from 'lucide-react';

export default function MacroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData } = useAuthContext();

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  const totalQuestions = frqSetOneQuestions.questions.length;

  // Show loading state while checking auth
  if (loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - accessible to everyone
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center pt-16">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AP Macroeconomics Full FRQ Exam {num}</h1>
                  <p className="text-sm text-gray-600">Comprehensive free response question exam covering all units</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{totalQuestions} questions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Answer every question before submitting the practice test.</li>
              <li>Use the drawing pad to create graphs and diagrams when needed.</li>
              <li>Use the bookmark tool to mark questions you'd like to review before submitting.</li>
              <li>After submitting, review the explanations for each question.</li>
            </ul>
          </div>

          {/* Exam Content */}
          <div className="p-6 pb-24">
            <FullExamFRQ questions={frqSetOneQuestions} />
          </div>
        </div>
      </div>
      <div className="pb-16"></div>
    </div>
  );
}
