'use client';

import { use, useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { hasValidSeasonPass } from '@/lib/utils';
import { FEATURES } from '@/lib/featureFlags';
import { statsFullFrqExam1 } from '@/data/stats/statsFullFrqExam1';

/** 4 questions × 22.5 minutes, matching the 2027 exam's 90-minute free-response section. */
const STATS_FULL_FRQ_SECONDS = 90 * 60;

export default function StatsFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData, user, userData } = useAuthContext();
  const router = useRouter();
  const enabled = num === '1' && FEATURES.statsFullFrqExam;

  const hasPass = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, 'stats');
  }, [user, userData]);

  // Same rule as the Macro/Micro FRQ exams: season pass holders only.
  useEffect(() => {
    if (enabled && !loadingUserData && !hasPass) {
      router.push('/purchase/season-pass?courseType=stats');
    }
  }, [enabled, loadingUserData, hasPass, router]);

  if (!enabled) {
    notFound();
  }

  if (loadingUserData || !hasPass) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <FullExamFRQ
      questions={statsFullFrqExam1}
      examType="stats"
      timeLimitSeconds={STATS_FULL_FRQ_SECONDS}
      backUrl="/unit-final-practice-tests?subject=ap_statistics"
    />
  );
}
