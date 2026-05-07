'use client';

import { useMemo } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { QuestionBank } from '@/data/questionBanks/types';
import { FullExam } from '@/components/FullExam';
import { Button } from '@/components/ui/button';
import type { CourseSubject } from '@/lib/courseSubject';
import { hasAdminRole } from '@/lib/adminAccess';

/**
 * Pretty URLs are rewritten to /unit-mcq-test/:unit?subject=… but the browser bar has no query —
 * useSearchParams() is empty; infer course from the visible path.
 */
function subjectFromUnitMcqPathname(pathname: string): CourseSubject | null {
  const p = pathname.replace(/\/$/, '') || '/';
  if (/^\/ap-gov-unit-\d+-mcq-test$/.test(p)) return 'gov';
  if (/^\/ap-macro-unit-\d+-mcq-test$/.test(p)) return 'macro';
  if (/^\/ap-micro-unit-\d+-mcq-test$/.test(p)) return 'micro';
  return null;
}

export default function UnitMCQTestPage() {
  const { unitId } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname() ?? '';
  const { selectedSubject, user, userData, loadingUserData } = useAuthContext();

  const subjectParam = searchParams.get('subject');
  const subjectFromPath = subjectFromUnitMcqPathname(pathname);
  const effectiveSubject: CourseSubject =
    subjectParam === 'macro' || subjectParam === 'micro' || subjectParam === 'gov'
      ? subjectParam
      : subjectFromPath ?? selectedSubject;

  const unitNumber = parseInt(unitId as string, 10);

  const isGovLockedUnit = effectiveSubject === 'gov' && unitNumber !== 1;
  const canAccessGov = Boolean(user && hasAdminRole(userData));

  const subjectFilter =
    effectiveSubject === 'macro'
      ? 'ap_macroeconomics'
      : effectiveSubject === 'gov'
        ? 'ap_us_government'
        : 'ap_microeconomics';

  const questions = useMemo(
    () => (isGovLockedUnit ? [] : getUnitMCQTest(unitNumber, subjectFilter)),
    [unitNumber, subjectFilter, isGovLockedUnit]
  );

  const unitInfo = apMacroCourseInfo.units.find(
    (unit) => unit.unit.split(':')[0].split(' ')[1] === (unitId as string)
  );

  const examType =
    effectiveSubject === 'gov' ? 'gov' : effectiveSubject === 'macro' ? 'macro' : 'micro';

  const questionBank: QuestionBank = useMemo(
    () => ({
      name: `Unit ${unitNumber} MCQ Test`,
      questions,
    }),
    [unitNumber, questions]
  );

  const practiceTestsHref =
    effectiveSubject === 'gov'
      ? '/unit-final-practice-tests?subject=gov'
      : `/ap-${effectiveSubject}-practice-tests`;

  if (effectiveSubject === 'gov' && loadingUserData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Checking access…</p>
      </div>
    );
  }

  if (effectiveSubject === 'gov' && !canAccessGov) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
          <Lock className="w-12 h-12 mx-auto text-gray-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AP Gov is in admin preview</h2>
          <p className="text-gray-600 mb-6">
            This content is currently restricted to admin accounts.
          </p>
          <Link href="/ap-macro-practice-tests" className="inline-flex w-full">
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
              Back to practice tests
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isGovLockedUnit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
          <Lock className="w-12 h-12 mx-auto text-violet-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming soon</h2>
          <p className="text-gray-600 mb-6">
            AP Gov Unit {unitNumber} practice exam is not available yet. Unit 1 is free to try today.
          </p>
          <Link href={practiceTestsHref} className="inline-flex w-full">
            <Button size="lg" className="w-full bg-violet-600 hover:bg-violet-700">
              Back to practice tests
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (effectiveSubject === 'macro' && !unitInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unit Test Not Found</h1>
          <p className="text-gray-600 mb-6">The unit test you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/ap-macro-course"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AP Macro Course
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unit Test Not Found</h1>
          <p className="text-gray-600 mb-6">No questions available for this unit test.</p>
          <Link
            href={practiceTestsHref}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Practice Tests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FullExam
        questionBank={questionBank}
        examType={examType}
        questionType="mcq"
        examNumber={unitId as string}
        isUnitTest={true}
      />
    </div>
  );
}
