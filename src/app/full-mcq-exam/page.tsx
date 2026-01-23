'use client';

import { useMemo } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import { FullExam } from '@/components/FullExam';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';
import { QuestionBank } from '@/data/questionBanks/types';

export default function FullMCQExamPage() {
  const { user, userData, selectedSubject } = useAuthContext();
  
  // No redirect - allow everyone to see question 1, access check happens in FullExam

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
      />
    </div>
  );
} 
