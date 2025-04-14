'use client';

import { useState } from 'react';
import { UnitMCQs } from '@/components/unitMCQS';
import { unit1Questions, unit2Questions, unit3Questions, unit4Questions, unit5Questions, unit6Questions } from '@/data/unitPracticeProblems/unitPracticeProblems';

const units = [
  { id: 1, name: 'Unit 1', questions: unit1Questions },
  { id: 2, name: 'Unit 2', questions: unit2Questions },
  { id: 3, name: 'Unit 3', questions: unit3Questions },
  { id: 4, name: 'Unit 4', questions: unit4Questions },
  { id: 5, name: 'Unit 5', questions: unit5Questions },
  { id: 6, name: 'Unit 6', questions: unit6Questions },
];

export default function UnitMCQPracticePage() {
  const [currentUnit, setCurrentUnit] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, 'correct' | 'incorrect'>>({});

  const currentQuestions = units.find(unit => unit.id === currentUnit)?.questions || [];

  const handleAnswer = (questionId: number, isCorrect: boolean) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: isCorrect ? 'correct' : 'incorrect'
    }));
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

  return (
    <div className="max-w-7xl mx-auto px-0 py-16">
      <div className="px-4">
        <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="text-blue-500">AP Macroeconomics</span>{' '}
          <span className="text-gray-900">MCQ Practice Questions</span>
        </h1>

        <UnitMCQs 
          currentUnit={currentUnit} 
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onQuestionSelect={handleQuestionSelect}
          onUnitChange={setCurrentUnit}
          answeredQuestions={answeredQuestions}
        />
      </div>
    </div>
  );
}
