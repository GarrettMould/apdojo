'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { UnitMCQs } from '@/components/unitMCQS';
import { macroUnits, microUnits } from '@/data/cheatSheets';

export default function UserHomePage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [loading, setLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    async function fetchQuestionOfTheDay() {
      if (user) {
        try {
          const dailyQuestionsDoc = await getDoc(doc(db, 'dailyQuestions', 'current'));
          const userDoc = await getDoc(doc(db, 'users', user.uid));

          if (dailyQuestionsDoc.exists() && userDoc.exists()) {
            const dailyData = dailyQuestionsDoc.data();
            const userData = userDoc.data();
            const userSubjects = userData.selectedSubjects || [];

            let questionToDisplay = null;
            if (userSubjects.length === 2) {
              questionToDisplay = Math.random() < 0.5 ? dailyData.macro : dailyData.micro;
            } else if (userSubjects.includes('macro')) {
              questionToDisplay = dailyData.macro;
            } else if (userSubjects.includes('micro')) {
              questionToDisplay = dailyData.micro;
            }
            
            setQuestion(questionToDisplay);
          }
        } catch (error) {
          console.error("Error fetching question of the day:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    if (!authLoading && user) {
        fetchQuestionOfTheDay();
    }
  }, [user, authLoading, router]);
  
  const handleAnswer = (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
      setAnsweredQuestions(prev => ({ ...prev, [questionId]: { selectedLetter: answerLetter, isCorrect } }));
  };

  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Question of the Day</h1>
          {question ? (
            <UnitMCQs
              currentUnit={question.unit}
              currentQuestionIndex={0}
              isLoggedIn={true}
              onAnswer={handleAnswer}
              onNextQuestion={() => {}}
              onPreviousQuestion={() => {}}
              onQuestionSelect={() => {}}
              onUnitChange={() => {}}
              answeredQuestions={answeredQuestions}
              units={question.subject === 'ap_macroeconomics' ? macroUnits : microUnits}
              dojoProgress={0}
              correctStreak={0}
              isWeakestUnitsMode={false}
              totalQuestions={1}
              unitName={question.subject === 'ap_macroeconomics' ? `Macro Unit ${question.unit}` : `Micro Unit ${question.unit}`}
              questions={[question]}
              subject={question.subject === 'ap_macroeconomics' ? 'macro' : 'micro'}
              practiceUnitIds={[question.unit]}
              isParentModalOpen={false}
            />
          ) : (
            <p>No question of the day available. Please check back later.</p>
          )}
        </div>
      </div>
    </div>
  );
}