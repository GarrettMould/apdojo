'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { UnitMCQs } from '@/components/unitMCQS';
import { unit1Questions, unit2Questions, unit3Questions, unit4Questions, unit5Questions, unit6Questions, microUnit2Questions, microUnit3Questions, microUnit4Questions, microUnit5Questions, microUnit6Questions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';

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

export default function UnitMCQPracticePage() {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get('subject') || 'macro';

  const [subject, setSubject] = useState<'macro' | 'micro'>(initialSubject as 'macro' | 'micro');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [guestAnswerCount, setGuestAnswerCount] = useState(0);

  const [currentMacroUnit, setCurrentMacroUnit] = useState(1);
  const [currentMacroQuestionIndex, setCurrentMacroQuestionIndex] = useState(0);
  const [answeredMacroQuestions, setAnsweredMacroQuestions] = useState<Record<number, AnsweredQuestionState>>({});

  const [currentMicroUnit, setCurrentMicroUnit] = useState(2);
  const [currentMicroQuestionIndex, setCurrentMicroQuestionIndex] = useState(0);
  const [answeredMicroQuestions, setAnsweredMicroQuestions] = useState<Record<number, AnsweredQuestionState>>({});

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam === 'micro' || subjectParam === 'macro') {
      setSubject(subjectParam);
      setGuestAnswerCount(0);
    }
  }, [searchParams]);

  const isMicro = subject === 'micro';
  const currentUnit = isMicro ? currentMicroUnit : currentMacroUnit;
  const setCurrentUnit = isMicro ? setCurrentMicroUnit : setCurrentMacroUnit;
  const currentQuestionIndex = isMicro ? currentMicroQuestionIndex : currentMacroQuestionIndex;
  const setCurrentQuestionIndex = isMicro ? setCurrentMicroQuestionIndex : setCurrentMacroQuestionIndex;
  const answeredQuestions = isMicro ? answeredMicroQuestions : answeredMacroQuestions;
  const setAnsweredQuestions = isMicro ? setAnsweredMicroQuestions : setAnsweredMacroQuestions;
  const units = isMicro ? microUnitsData : macroUnitsData;
  const currentQuestions = units.find(unit => unit.id === currentUnit)?.questions || [];

  const handleAnswer = (questionId: number, answerLetter: string, isCorrect: boolean) => {
    if (!user) {
      const alreadyAnswered = answeredQuestions.hasOwnProperty(questionId);
      
      if (!alreadyAnswered && guestAnswerCount >= 2) {
        setShowLoginPrompt(true);
        return;
      }

      if (!alreadyAnswered) {
        setGuestAnswerCount(prev => prev + 1);
      }
    }
    
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect: isCorrect }
    }));
  };

  const handleUnitChange = (unitId: number) => {
    setCurrentUnit(unitId);
    setGuestAnswerCount(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const pageTitle = isMicro ? 'AP Microeconomics' : 'AP Macroeconomics';
  const titleColor = isMicro ? 'text-green-500' : 'text-blue-500';

  return (
    <div className="max-w-7xl mx-auto px-0 py-16">
      <div className="px-4">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight mb-8 text-center">
          <span className={titleColor}>{pageTitle}</span>{' '}
          <div className="text-gray-900">MCQ Practice Questions</div>
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

      <LoginPromptModal 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </div>
  );
}
