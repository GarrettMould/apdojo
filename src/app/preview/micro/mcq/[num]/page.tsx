'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExam } from '@/components/FullExam';
import { microSetOneQuestions } from '@/data/questionBanks/micro/mcqs/setOne';
import { Clock } from 'lucide-react';

export default function MicroMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData } = useAuthContext();
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  const totalQuestions = microSetOneQuestions.questions.length;

  // Show loading state while checking auth
  if (loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - accessible to everyone
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Exam Content */}
              <div className="p-6">
                <FullExam 
                  questionBank={microSetOneQuestions}
                  examType="micro"
                  questionType="mcq"
                  examNumber={num}
                  onTimeUpdate={setTimeRemaining}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 