'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { UnitMCQs } from '@/components/unitMCQS';
import { unit1Questions, unit2Questions, unit3Questions, unit4Questions, unit5Questions, unit6Questions, microUnit2Questions, microUnit3Questions, microUnit4Questions, microUnit5Questions, microUnit6Questions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const macroUnitsData = [
  { id: 1, name: 'Unit 1', questions: unit1Questions },
  { id: 2, name: 'Unit 2', questions: unit2Questions },
  { id: 3, name: 'Unit 3', questions: unit3Questions },
  { id: 4, name: 'Unit 4', questions: unit4Questions },
  { id: 5, name: 'Unit 5', questions: unit5Questions },
  { id: 6, name: 'Unit 6', questions: unit6Questions },
];

const microUnitsData = [
  { id: 2, name: 'Unit 2', questions: microUnit2Questions },
  { id: 3, name: 'Unit 3', questions: microUnit3Questions },
  { id: 4, name: 'Unit 4', questions: microUnit4Questions },
  { id: 5, name: 'Unit 5', questions: microUnit5Questions },
  { id: 6, name: 'Unit 6', questions: microUnit6Questions },
];

interface UnitData {
  id: number;
  name: string;
  questions: QuestionType[];
}

interface AnsweredQuestionState {
  selectedLetter: string;
  isCorrect: boolean;
}

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Access All Questions</h2>
        <p className="text-gray-600 mb-6 text-center">
          You've answered the free sample questions. Please log in or sign up to continue practicing!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login" className="flex-1">
            <button 
              onClick={onClose}
              className="w-full px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Login
            </button>
          </Link>
          <Link href="/signup" className="flex-1">
            <button 
              onClick={onClose}
              className="w-full px-6 py-3 text-sm font-bold text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function UnitMCQPracticeContent() {
  const searchParams = useSearchParams();
  const { user } = useAuthContext();
  const subjectParam = searchParams.get('subject');
  const subject = (subjectParam === 'micro' || subjectParam === 'macro') ? subjectParam : 'macro';

  const units = subject === 'micro' ? microUnitsData : macroUnitsData;
  const initialUnit = units[0]?.id ?? (subject === 'micro' ? 2 : 1);

  const [currentUnit, setCurrentUnit] = useState<number>(initialUnit);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, AnsweredQuestionState>>({});

  useEffect(() => {
    console.log(`Subject changed to: ${subject}`);
    const newUnits = subject === 'micro' ? microUnitsData : macroUnitsData;
    const newInitialUnit = newUnits[0]?.id ?? (subject === 'micro' ? 2 : 1);
    console.log(`Setting initial unit to: ${newInitialUnit}`);
    setCurrentUnit(newInitialUnit);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions({});
  }, [subject]);

  const currentQuestions = units.find(unit => unit.id === currentUnit)?.questions || [];

  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));

    if (user) {
      try {
        const answerData = {
          userId: user.uid,
          questionId: questionId,
          unitId: currentUnit,
          subject: subject,
          selectedAnswer: answerLetter,
          isCorrect: isCorrect,
          timestamp: serverTimestamp()
        };

        const userAnswersColRef = collection(db, 'users', user.uid, 'mcqAnswers');

        await addDoc(userAnswersColRef, answerData);
        console.log('MCQ answer saved to Firestore for user:', user.uid);

      } catch (error) {
        console.error("Error saving MCQ answer to Firestore:", error);
      }
    } else {
      console.log("User not logged in, answer not saved to Firestore.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleUnitChange = (unitId: number) => {
    if (unitId !== currentUnit) {
      console.log(`Unit changed to: ${unitId}`);
      setCurrentUnit(unitId);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions({});
    }
  };

  const pageTitle = subject === 'micro' ? 'AP Microeconomics' : 'AP Macroeconomics';
  const titleColor = subject === 'micro' ? 'text-green-500' : 'text-blue-500';

  return (
    <div className="bg-transparent min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-center">
          <span className={titleColor}>{pageTitle}</span>
          <div className="text-gray-900 text-4xl md:text-5xl mt-1">MCQ Practice Questions</div>
        </h1>

        <UnitMCQs
          currentUnit={currentUnit}
          currentQuestionIndex={currentQuestionIndex}
          isLoggedIn={!!user}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onQuestionSelect={handleQuestionSelect}
          onUnitChange={handleUnitChange}
          answeredQuestions={answeredQuestions}
          units={units}
        />
      </div>
    </div>
  );
}

function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-xl font-medium text-gray-600">
          Loading Practice Questions...
        </p>
      </div>
    </div>
  );
}

export default function UnitMCQPracticePage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <UnitMCQPracticeContent />
    </Suspense>
  );
}
