'use client';

import { use, useEffect, useMemo } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { hasValidSeasonPass } from '@/lib/utils';
import { FEATURES } from '@/lib/featureFlags';
import { govFullFrqExam } from '@/data/gov/govFullFrqExam';
import { buildGovFrqExamDocument } from '@/data/gov/govUnitStimulusFrqs';

const govFullFrqExam1 = buildGovFrqExamDocument('AP Gov Full FRQ Exam 1', govFullFrqExam);

/** 4 questions in 100 minutes, matching the AP Gov free-response section. */
const GOV_FULL_FRQ_SECONDS = 100 * 60;

export default function GovFRQPreview({ params }: { params: Promise<{ num: string }> }) {
  const { num } = use(params);
  const { loadingUserData, user, userData } = useAuthContext();
  const router = useRouter();
  const enabled = num === '1' && FEATURES.govFullFrqExam;

  const hasPass = useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, 'gov');
  }, [user, userData]);

  // Same rule as the Macro/Micro FRQ exams: season pass holders only.
  useEffect(() => {
    if (enabled && !loadingUserData && !hasPass) {
      router.push('/purchase/season-pass?courseType=gov');
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
      questions={govFullFrqExam1}
      examType="gov"
      timeLimitSeconds={GOV_FULL_FRQ_SECONDS}
      backUrl="/unit-final-practice-tests?subject=gov"
    />
  );
}
