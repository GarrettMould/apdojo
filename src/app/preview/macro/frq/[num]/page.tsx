'use client';

import { use, useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { hasValidSeasonPass } from '@/lib/utils';
import { frqSetOneQuestions } from '@/data/questionBanks/macro/frqs/setOne';

export default function MacroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData, user, userData } = useAuthContext();
  const router = useRouter();

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

  // Only show exam 1 for now
  if (num !== '1') {
    notFound();
  }

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
    <FullExamFRQ
      questions={frqSetOneQuestions}
      examType="macro"
      backUrl="/unit-final-practice-tests?subject=ap_macroeconomics"
    />
  );
}
