'use client';

import { use, useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExam } from '@/components/FullExam';
import { hasValidSeasonPass } from '@/lib/utils';
import { microSetOneQuestions } from '@/data/questionBanks/micro/mcqs/setOne';

export default function MicroMCQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData, user, userData } = useAuthContext();
  const router = useRouter();

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, 'micro');
  }, [user, userData]);

  // Redirect free users to purchase page
  useEffect(() => {
    if (!loadingUserData && !isProCustomer) {
      router.push('/purchase/season-pass?courseType=micro');
    }
  }, [loadingUserData, isProCustomer, router]);

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

  // Show loading state while checking auth or redirecting
  if (loadingUserData || !isProCustomer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - only accessible to pro customers
  return (
    <div className="min-h-screen">
      <FullExam 
        questionBank={microSetOneQuestions}
        examType="micro"
        questionType="mcq"
        examNumber={`preview/micro/mcq/${num}`}
        isFreeUser={false}
        isUnitTest={true}
      />
    </div>
  );
} 