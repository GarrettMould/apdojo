'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExam } from '@/components/FullExam';
import { hasValidSeasonPass } from '@/lib/utils';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';
import { Clock } from 'lucide-react';

export default function MacroMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData, user, userData } = useAuthContext();
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, 'macro');
  }, [user, userData]);

  // Redirect free users to purchase page
  useEffect(() => {
    if (!loadingUserData && !isProCustomer) {
      router.push('/purchase/season-pass?courseType=macro');
    }
  }, [loadingUserData, isProCustomer, router]);

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

  const totalQuestions = macroSetOneQuestions.questions.length;

  // Show loading state while checking auth or redirecting
  if (loadingUserData || !isProCustomer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - only accessible to pro customers
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Exam Content */}
              <div className="p-6">
                <FullExam 
                  questionBank={macroSetOneQuestions}
                  examType="macro"
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
