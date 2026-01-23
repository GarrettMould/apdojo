'use client';

import { use, useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { hasValidSeasonPass } from '@/lib/utils';
import { frqSetOneQuestions } from '@/data/questionBanks/micro/frqs/setOne';

export default function MicroFRQPreview({ params }: { params: Promise<{ num: string }> }) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the exam - only accessible to pro customers
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
