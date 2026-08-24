'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { FullExamFRQ } from '@/components/FullExamFRQ';
import { SeasonPassEntryWideModal } from '@/components/SeasonPassEntryWideModal';
import { buildGovUnitFrqPackForFullExam } from '@/data/gov/govUnitStimulusFrqs';
import { buildStatsUnitFrqPackForFullExam } from '@/data/stats/statsUnitStimulusFrqs';
import { isCourseSubject, isStatsFrqTestUnitAvailable, type CourseSubject } from '@/lib/courseSubject';
import { getUnitFinalPracticeTestsUrl, hasGovPremiumAccess, hasStatsPremiumAccess } from '@/lib/utils';
import { useAuthContext } from '@/contexts/AuthContext';

function UnitFrqPackInner() {
  const router = useRouter();
  const { userData, loadingUserData } = useAuthContext();
  const searchParams = useSearchParams();
  const subjectRaw = searchParams.get('subject');
  const unitRaw = searchParams.get('unit') ?? '1';

  const subject: CourseSubject = isCourseSubject(subjectRaw) ? subjectRaw : 'gov';
  const unitNumber = parseInt(unitRaw, 10) || 1;

  const backToHub = getUnitFinalPracticeTestsUrl(subject);
  const hasPremium =
    subject === 'gov'
      ? hasGovPremiumAccess(userData)
      : subject === 'stats'
        ? hasStatsPremiumAccess(userData)
        : false;

  if (subject !== 'gov' && subject !== 'stats') {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-black text-gray-900">FRQ pack not available</h1>
          <p className="mt-3 text-gray-600">Unit FRQ packs aren&apos;t set up for this course yet.</p>
          <Link
            href={backToHub}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-bold text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </div>
    );
  }

  if (subject === 'stats' && !isStatsFrqTestUnitAvailable(unitNumber)) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-black text-gray-900">FRQ pack coming soon</h1>
          <p className="mt-3 text-gray-600">This unit doesn&apos;t have an FRQ pack yet.</p>
          <Link
            href={backToHub}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to AP Stats practice tests
          </Link>
        </div>
      </div>
    );
  }

  if (loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600 font-semibold">Loading FRQ pack…</p>
        </div>
      </div>
    );
  }

  const pack =
    subject === 'stats'
      ? buildStatsUnitFrqPackForFullExam(unitNumber)
      : buildGovUnitFrqPackForFullExam(unitNumber);

  if (!pack || pack.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-black text-gray-900">FRQ pack coming soon</h1>
          <p className="mt-3 text-gray-600">This unit doesn&apos;t have a stimulus FRQ pack yet.</p>
          <Link
            href={backToHub}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-bold text-white hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={hasPremium ? undefined : 'pointer-events-none select-none blur-[6px] saturate-[0.85]'}
        aria-hidden={!hasPremium ? true : undefined}
      >
        <FullExamFRQ
          questions={pack}
          examType={subject}
          unitNumber={unitNumber}
          backUrl={backToHub}
          hideExpandingQuestionNav
        />
      </div>

      {!hasPremium ? (
        <SeasonPassEntryWideModal
          subject={subject}
          onClose={() => router.push(backToHub)}
        />
      ) : null}
    </>
  );
}

export default function UnitFrqPackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600 font-semibold">Loading FRQ pack…</p>
        </div>
      }
    >
      <UnitFrqPackInner />
    </Suspense>
  );
}
