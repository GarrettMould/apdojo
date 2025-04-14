'use client';

import React, { useState, useEffect, useRef } from 'react';
import { unit1Questions, unit2Questions, unit3Questions, unit4Questions, unit5Questions, unit6Questions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { Check, X, Brain, FileText, ChevronDown, ArrowDown, Triangle } from 'lucide-react';
import { MCQFeedbackModal } from './MCQFeedbackModal';

const units = [
  { id: 1, name: 'Unit 1', questions: unit1Questions },
  { id: 2, name: 'Unit 2', questions: unit2Questions },
  { id: 3, name: 'Unit 3', questions: unit3Questions },
  { id: 4, name: 'Unit 4', questions: unit4Questions },
  { id: 5, name: 'Unit 5', questions: unit5Questions },
  { id: 6, name: 'Unit 6', questions: unit6Questions },
];

interface UnitMCQsProps {
  currentUnit: number;
  currentQuestionIndex: number;
  onAnswer: (questionId: number, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onQuestionSelect: (index: number) => void;
  onUnitChange: (unitId: number) => void;
  answeredQuestions: Record<number, 'correct' | 'incorrect'>;
}

const QuestionCard = ({ 
  question, 
  currentIndex,
  totalQuestions,
  onAnswerSelect,
  isAnswered,
  aiExplanation,
  isLoadingAI
}: { 
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSelect: (questionId: number, answerLetter: string, answerText: string) => void;
  isAnswered: boolean;
  aiExplanation?: string;
  isLoadingAI: boolean;
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Convert letter answer (A, B, C) to number (0, 1, 2)
  const correctAnswerIndex = question.correctAnswer.charCodeAt(0) - 65;

  const handleAnswerSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
    setIsSubmitted(true);
    onAnswerSelect(
      question.id, 
      String.fromCharCode(65 + index),
      question.options[index]  // Pass the answer text
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
      <div className="space-y-8">
        {/* Question Counter */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs sm:text-sm font-medium">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs sm:text-sm font-medium">
            Unit {question.unit}
          </span>
        </div>

        <p className="text-lg font-medium font-serif leading-relaxed text-gray-800">
          {question.question}
        </p>
        {question.image && (
          <div className="my-6">
            <img 
              src={question.image.src}
              alt="Question"
              className="max-h-[225px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
            />
          </div>
        )}

        {/* Answer Options - Show if answered but no AI explanation yet, or if loading */}
        {isAnswered && (!aiExplanation || isLoadingAI) && (
          <div className="space-y-4">
            {question.options.map((option, optIndex) => (
              <button
                key={optIndex}
                onClick={() => handleAnswerSelect(optIndex)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  isSubmitted
                    ? optIndex === correctAnswerIndex
                      ? 'bg-green-50 text-gray-900 shadow-sm border-green-200'
                      : optIndex === selectedAnswer
                        ? 'bg-red-50 text-gray-900 shadow-sm border-red-200'
                        : 'bg-transparent text-gray-900 border-gray-200'
                    : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {isSubmitted && (
                    <div className="flex-shrink-0">
                      {optIndex === correctAnswerIndex
                        ? <Check className="w-5 h-5 text-green-500" />
                        : optIndex === selectedAnswer
                          ? <X className="w-5 h-5 text-red-500" />
                          : null
                      }
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Correct Answer and AI Explanation - Show only after AI explanation is fully loaded */}
        {isAnswered && aiExplanation && !isLoadingAI && (
          <div className="space-y-6">
            {/* Correct Answer */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-green-200 text-green-600 font-medium">
                  {question.correctAnswer}
                </span>
                <span className="font-medium text-gray-900">
                  {question.options[question.correctAnswer.charCodeAt(0) - 65]}
                </span>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-2">AI Explanation</h4>
              <p className="text-gray-900">{aiExplanation}</p>
            </div>
          </div>
        )}

        {/* Unanswered Question Options */}
        {!isAnswered && (
          <div className="space-y-4">
            {question.options.map((option, optIndex) => (
              <button
                key={optIndex}
                onClick={() => handleAnswerSelect(optIndex)}
                disabled={isSubmitted}
                className="w-full text-left p-4 rounded-lg text-sm font-medium transition-all duration-200 border bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export function UnitMCQs({ 
  currentUnit, 
  currentQuestionIndex, 
  onAnswer, 
  onNextQuestion,
  onPreviousQuestion,
  onQuestionSelect,
  onUnitChange,
  answeredQuestions 
}: UnitMCQsProps) {
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswerText, setSelectedAnswerText] = useState<string>('');
  const [selectedAnswerLetter, setSelectedAnswerLetter] = useState<string>('');
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUnitDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentQuestions = units.find(unit => unit.id === currentUnit)?.questions || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleUnitChange = (unitId: number) => {
    onUnitChange(unitId);
    setIsUnitDropdownOpen(false);
  };

  const handleAnswer = (questionId: number, answerLetter: string, answerText: string) => {
    setSelectedAnswerText(answerText);
    setSelectedAnswerLetter(answerLetter);
    const isCorrect = answerLetter === currentQuestion.correctAnswer;
    onAnswer(questionId, isCorrect);
  };

  const handleNextQuestion = () => {
    setError(null);
    setSelectedAnswerText('');
    setSelectedAnswerLetter('');
    onNextQuestion();
  };

  const handlePreviousQuestion = () => {
    setError(null);
    setSelectedAnswerText('');
    setSelectedAnswerLetter('');
    onPreviousQuestion();
  };

  const handleQuestionSelect = (index: number) => {
    setError(null);
    setSelectedAnswerText('');
    setSelectedAnswerLetter('');
    onQuestionSelect(index);
  };

  const handleAIExplanation = async () => {
    if (!currentQuestion) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'ai_tutor',
          questionType: 'mcq',
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctAnswer: currentQuestion.correctAnswer,
          unit: currentQuestion.unit,
          unitName: `Unit ${currentQuestion.unit}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setAiExplanations(prev => ({
        ...prev,
        [currentQuestion.id]: data.feedback
      }));
    } catch (error) {
      console.error('Error getting AI explanation:', error);
      setError(error instanceof Error ? error.message : 'Failed to get explanation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Main content area with question and sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Question container (75% width) */}
        <div className="w-full lg:w-3/4">
          {currentQuestion && (
            <QuestionCard 
              key={currentQuestion.id}
              question={currentQuestion} 
              currentIndex={currentQuestionIndex}
              totalQuestions={currentQuestions.length}
              onAnswerSelect={handleAnswer}
              isAnswered={!!answeredQuestions[currentQuestion.id]}
              aiExplanation={aiExplanations[currentQuestion.id]}
              isLoadingAI={isLoading}
            />
          )}
        </div>

        {/* Sidebar (25% width) - Now appears below on mobile */}
        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md border border-gray-200 p-4 lg:p-6 h-fit">
          {/* Unit Progress section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold tracking-tight text-gray-900">Unit {currentUnit} MCQs</h3>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                  className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <Triangle className="w-2 h-2 rotate-180 fill-current" />
                </button>
                {isUnitDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    {units.map(unit => (
                      <button
                        key={unit.id}
                        onClick={() => handleUnitChange(unit.id)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          currentUnit === unit.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {unit.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQuestions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(index)}
                  className={`w-8 h-8 rounded border-2 ${
                    currentQuestionIndex === index
                      ? answeredQuestions[question.id]
                        ? answeredQuestions[question.id] === 'correct'
                          ? 'border-blue-500 bg-green-50'
                          : 'border-blue-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : answeredQuestions[question.id]
                        ? answeredQuestions[question.id] === 'correct'
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 p-2 rounded-md font-medium text-sm transition-colors ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === currentQuestions.length - 1}
                className={`flex-1 p-2 rounded-md font-medium text-sm transition-colors ${
                  currentQuestionIndex === currentQuestions.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Study Resources section */}
          <div className="space-y-4">
            <h3 className="font-extrabold tracking-tight text-gray-900">Study Resources</h3>
            
            {/* Unit Cheat Sheet Button */}
            <a
              href={`/study-guides/AP-macroeconomics-unit-${currentUnit}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-gray-50 group block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">
                  Unit {currentUnit} Study Guide
                </span>
              </div>
            </a>

            {/* AI Dojo Button */}
            <button
              onClick={handleAIExplanation}
              disabled={isLoading || !selectedAnswerText}
              className={`w-full p-4 rounded-lg border transition-all duration-200 bg-white group relative
                ${error 
                  ? 'border-red-200 hover:border-red-300' 
                  : selectedAnswerText
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-gray-200 opacity-70 cursor-not-allowed hover:opacity-100'} 
                hover:bg-gray-50`}
            >
              <div className="flex items-center gap-3 justify-start">
                <div className={`p-2 rounded-lg text-white transition-colors
                  ${error 
                    ? 'bg-red-500 group-hover:bg-red-600' 
                    : selectedAnswerText
                      ? 'bg-blue-500 group-hover:bg-blue-600'
                      : 'bg-blue-500 opacity-70 group-hover:opacity-100'}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Brain className="w-5 h-5" />
                  )}
                </div>
                <span className={`font-medium text-left ${error ? 'text-red-600' : selectedAnswerText ? 'text-gray-900' : 'text-gray-900 opacity-70 group-hover:opacity-100'}`}>
                  {isLoading 
                    ? 'Getting Explanation...' 
                    : error 
                      ? 'Try Again' 
                      : 'Explain with AI Dojo'}
                </span>
              </div>
              {!selectedAnswerText && (
                <div className="absolute bottom-full left-0 mb-2 w-full px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Please answer the question first to use AI Dojo
                </div>
              )}
            </button>
            
            {/* Error message */}
            {error && (
              <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add the animation keyframes to the component
const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
