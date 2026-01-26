'use client';

import { useMemo } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import { FullExam } from '@/components/FullExam';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';
import { microSetOneQuestions } from '@/data/questionBanks/micro/mcqs/setOne';
import { QuestionBank } from '@/data/questionBanks/types';

export default function FullMCQExamPage() {
  const { user, userData, selectedSubject } = useAuthContext();
  
  // No redirect - allow everyone to see question 1, access check happens in FullExam

  // Determine exam type from selectedSubject
  const examType = selectedSubject === 'macro' ? 'macro' : 'micro';

  // Convert questions to QuestionBank format for FullExam component
  // Load the appropriate question set based on selectedSubject
  const questionBank: QuestionBank = useMemo(() => {
    if (selectedSubject === 'macro') {
      return {
        name: 'AP Macroeconomics Full MCQ Exam',
        questions: macroSetOneQuestions.questions
      };
    } else {
      return {
        name: 'AP Microeconomics Full MCQ Exam',
        questions: microSetOneQuestions.questions
      };
    }
  }, [selectedSubject]);

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
