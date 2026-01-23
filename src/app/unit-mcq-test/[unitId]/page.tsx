'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock, FileText } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { hasValidSeasonPass } from '@/lib/utils';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { QuestionBank } from '@/data/questionBanks/types';
import { FullExam } from '@/components/FullExam';
import { Button } from '@/components/ui/button';

function AccessDenied({ unitId }: { unitId: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 pb-12">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
        <Lock className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Purchase Required</h2>
        <p className="text-gray-600 mb-6">
          You need to purchase this test to access the full set of practice questions.
        </p>
        <Link 
          href={`/purchase/mcq-practice?units=${unitId}&total=4.99&subject=macro`}
          className="inline-block"
        >
          <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
            Purchase Unit {unitId} Test
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function UnitMCQTestPage() {
  const { unitId } = useParams();
  const searchParams = useSearchParams();
  const { selectedSubject, user, userData } = useAuthContext();
  
  // Get subject from query param (from rewrite) or fall back to context
  const subjectParam = searchParams.get('subject');
  const effectiveSubject = (subjectParam === 'macro' || subjectParam === 'micro') 
    ? subjectParam 
    : selectedSubject;
  
  const unitNumber = parseInt(unitId as string);
  // Filter questions by subject to ensure macro and micro don't mix
  const subjectFilter = effectiveSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
  const questions = getUnitMCQTest(unitNumber, subjectFilter);
  const unitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.split(':')[0].split(' ')[1] === (unitId as string)
  );

  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for current subject
    const subjectKey = effectiveSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, effectiveSubject]);

  // Convert questions to QuestionBank format for FullExam component
  const questionBank: QuestionBank = useMemo(() => {
    return {
      name: `Unit ${unitNumber} MCQ Test`,
      questions: questions
    };
  }, [unitNumber, questions]);

  // Determine exam type from effectiveSubject
  const examType = effectiveSubject === 'macro' ? 'macro' : 'micro';

  // MVP: Removed user-dependent progress loading for MVP
  // useEffect(() => {
  //   const loadProgress = async () => {
  //     if (user && unitId) {
  //       try {
  //       const savedProgress = await loadTestProgress(user.uid, `unit_${unitId}`);
  //       if (savedProgress && !savedProgress.isSubmitted) {
  //         setAnsweredQuestions(savedProgress.answeredQuestions);
  //         setIsSubmitted(savedProgress.isSubmitted);
  //         setHasSavedProgress(true);
  //       }
  //     } catch (error) {
  //       console.error('Error loading progress:', error);
  //     } finally {
  //       setIsLoadingProgress(false);
  //     }
  //   } else {
  //     setIsLoadingProgress(false);
  //   }
  //   };

  //   loadProgress();
  // }, [user, unitId]);

  // MVP: Removed user-dependent progress saving for MVP
  // useEffect(() => {
  //   const saveProgress = async () => {
  //     if (user && unitId && !isLoadingProgress) {
  //       try {
  //       await saveTestProgress({
  //         userId: user.uid,
  //         testType: 'unit_mcq',
  //         testId: `unit_${unitId}`,
  //         progress: {
  //         answeredQuestions,
  //         currentQuestionIndex: 0, // Not using this for unit tests
  //         isSubmitted,
  //         totalQuestions,
  //         startedAt: new Date(),
  //         lastUpdated: new Date()
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error saving progress:', error);
  //     }
  //     }
  //   };

  //   // Debounce the save to avoid too many Firebase calls
  //   const timeoutId = setTimeout(saveProgress, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [answeredQuestions, isSubmitted, user, unitId, totalQuestions, isLoadingProgress]);
  
  // If unit not found, show error
  if (!unitInfo || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unit Test Not Found</h1>
          <p className="text-gray-600 mb-6">The unit test you're looking for doesn't exist.</p>
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

  // For micro, only units 2 and 3 are available
  const availableMicroUnits = [2, 3];
  const isMicroUnitAvailable = effectiveSubject !== 'micro' || availableMicroUnits.includes(unitNumber);
  
  // Check if user is free and unit is locked (Unit 1 is free, others require season pass)
  const isUnitLockedForFreeUser = !isProCustomer && unitNumber !== 1;
  
  // Check if micro unit is not available (even for premium users)
  const isMicroUnitNotAvailable = effectiveSubject === 'micro' && !isMicroUnitAvailable;

  // Redirect free users to season pass purchase instead of showing lock screen
  useEffect(() => {
    if (isUnitLockedForFreeUser) {
      window.location.href = `/purchase/season-pass?courseType=${examType}`;
    }
  }, [isUnitLockedForFreeUser, examType]);

  // Show "Coming Soon" for unavailable micro units
  if (isMicroUnitNotAvailable) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h1>
          <p className="text-gray-600 mb-6">This unit test is not yet available. Check back soon!</p>
          <Link 
            href={`/ap-${effectiveSubject}-practice-tests`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Practice Tests
          </Link>
        </div>
      </div>
    );
  }

  if (isUnitLockedForFreeUser) {
    return null; // Will redirect, so return nothing
  }

  return (
    <div className="min-h-screen">
      <FullExam
        questionBank={questionBank}
        examType={examType}
        questionType="mcq"
        examNumber={unitId as string}
        isFreeUser={false} // Only show if user has access
        isUnitTest={true} // Enable test-like layout with always-visible tools
      />
    </div>
  );
}