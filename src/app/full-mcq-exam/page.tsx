'use client';

import { useMemo } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import { FullExam } from '@/components/FullExam';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';
import { QuestionBank } from '@/data/questionBanks/types';

export default function FullMCQExamPage() {
  const { user, userData, selectedSubject } = useAuthContext();
  
  // Check if user is a pro customer (has season pass)
  const isProCustomer = useMemo(() => {
    if (!user || !userData) return false;
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, selectedSubject]);

  // Redirect free users to season pass purchase instead of showing lock screen
  if (!isProCustomer && typeof window !== 'undefined') {
    window.location.href = `/purchase/season-pass?courseType=${selectedSubject || 'macro'}`;
    return null;
  }

  // Convert questions to QuestionBank format for FullExam component
  const questionBank: QuestionBank = useMemo(() => {
      return {
      name: 'AP Macroeconomics Full MCQ Exam',
      questions: macroSetOneQuestions.questions
    };
  }, []);

  // Determine exam type from selectedSubject
  const examType = selectedSubject === 'macro' ? 'macro' : 'micro';

  return (
    <div className="min-h-screen">
      <FullExam
        questionBank={questionBank}
        examType={examType}
        questionType="mcq"
        examNumber="full"
        isFreeUser={false} // Only show if user has access
      />
    </div>
  );
} 
