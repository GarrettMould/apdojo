'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlacementResults } from './PlacementResults';
import { useAuthContext } from '@/contexts/AuthContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  unit: string; // e.g., 'Unit 1', 'Unit 2'
}

type PlacementTestResults = {
  score: number;       // 0-5
  total: number;       // 5
  belt: string;        // 'White Belt', 'Yellow Belt', 'Green Belt'
  beltTitle: string;   // 'The Rookie', 'The Apprentice', 'The Scholar'
  message: string;
};

interface DiagnosticTestProps {
  questions: Question[];
  onComplete?: (answers: Record<string, number>) => void;
  initialAnswers?: Record<string, number>;
  user?: any; // User from auth context
  onSubjectToggle?: () => void;
  currentSubject?: 'macro' | 'micro';
}

export function DiagnosticTest({ questions, onComplete, initialAnswers = {}, user: userProp, onSubjectToggle, currentSubject = 'macro' }: DiagnosticTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [testResults, setTestResults] = useState<PlacementTestResults | null>(null);

  // Reset test state when questions change (subject switch)
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setTestResults(null);
  }, [questions]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const totalQuestions = questions.length;
  const isComplete = testResults !== null;
  const currentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  // If question is already answered, set it as selected and show submitted state
  useEffect(() => {
    if (currentQuestionAnswered && answers[currentQuestion.id] !== undefined) {
      setSelectedAnswer(answers[currentQuestion.id]);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentIndex, currentQuestionAnswered, answers, currentQuestion.id]);

  const handleOptionSelect = (optionIndex: number) => {
    // Don't allow selection if question is already answered
    if (currentQuestionAnswered) return;
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    // Save answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Complete the test
      handleFinish(newAnswers);
    } else {
      // Move to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };


  const handleFinish = (finalAnswers: Record<string, number>) => {
    // Calculate score
    let score = 0;
    questions.forEach((question) => {
      const userAnswer = finalAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        score++;
      }
    });

    const total = questions.length;

    // Belt assignment based on score (0-2, 3-4, 5)
    let belt = 'White Belt';
    let beltTitle = 'The Rookie';
    let message = 'Great start. We have a lot of foundational work to do.';

    if (score === 5) {
      belt = 'Green Belt';
      beltTitle = 'The Expert';
      message = 'Impressive. You are ready for advanced drills.';
    } else if (score >= 3) {
      belt = 'Yellow Belt';
      beltTitle = 'The Apprentice';
      message = 'You have strong instincts! Let\'s refine your graphs.';
    }

    const results: PlacementTestResults = {
      score,
      total,
      belt,
      beltTitle,
      message,
    };

    setTestResults(results);
    onComplete?.(finalAnswers);
  };

  // Removed handleNext - auto-advance is handled in handleOptionSelect


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key >= '1' && e.key <= '4') {
      const optionIndex = parseInt(e.key) - 1;
      if (optionIndex < currentQuestion.options.length) {
        handleOptionSelect(optionIndex);
      }
    } else if (e.key === 'Enter' && selectedAnswer !== null) {
      handleNext();
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = isComplete ? 100 : (answeredCount / totalQuestions) * 100;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-12"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="max-w-5xl mx-auto relative min-h-full flex flex-col">
        {/* Progress Bar - Prominent for placement test */}
        {!isComplete && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-black text-gray-900 uppercase tracking-wide">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-lg font-bold text-gray-700">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 border-4 border-black">
              <motion.div
                className="bg-blue-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Results or Question Card */}
        <AnimatePresence mode="wait">
          {isComplete && testResults ? (
            <PlacementResults
              key="results"
              results={testResults}
            />
          ) : (
            <>
              {/* Stacked Paper Effect - Background layers */}
              <div className="absolute inset-0 -z-10 top-16">
                {/* First layer */}
                <div className="absolute top-2 left-2 right-2 bottom-2 bg-white border-4 border-black rounded-3xl opacity-20 transform rotate-1" />
                {/* Second layer */}
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-white border-4 border-black rounded-3xl opacity-10 transform -rotate-1" />
              </div>

              {/* Main Card */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 flex flex-col overflow-y-auto"
              >
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-wide text-gray-600 font-semibold">
                Question {currentIndex + 1} of {totalQuestions}
              </p>
            </div>

            {/* Question Text */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 leading-relaxed text-center sm:text-left">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options Grid */}
            <div className="space-y-4 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isSubmitted = currentQuestionAnswered && answers[currentQuestion.id] === index;
                const keyLabel = String.fromCharCode(65 + index); // A, B, C, D

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={currentQuestionAnswered}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      isSubmitted
                        ? 'bg-gray-200 text-gray-900 border-gray-500 cursor-default'
                        : isSelected
                        ? 'bg-gray-100 text-gray-900 border-gray-400'
                        : 'bg-white border-gray-200 hover:border-black hover:bg-gray-50'
                    } ${currentQuestionAnswered ? 'opacity-75' : ''}`}
                    whileHover={currentQuestionAnswered ? {} : { scale: 1.01 }}
                    whileTap={currentQuestionAnswered ? {} : { scale: 0.99 }}
                  >
                    {/* Keycap Hint */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 ${
                        isSubmitted
                          ? 'bg-gray-300 text-gray-900 border-gray-500'
                          : isSelected
                          ? 'bg-gray-200 text-gray-800 border-gray-400'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {keyLabel}
                    </div>

                    {/* Option Text */}
                    <span className="text-lg font-medium flex-1">{option}</span>
                    {isSubmitted && (
                      <span className="text-sm font-semibold text-gray-600">Submitted</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Next Button */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-auto"
                >
                  <motion.button
                    onClick={handleNext}
                    className="w-full bg-black text-white px-12 py-4 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Subject Toggle Link */}
        {!isComplete && onSubjectToggle && (
          <div className="mt-8 text-center">
            <button
              onClick={onSubjectToggle}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              style={{ fontFamily: 'Permanent Marker, cursive' }}
            >
              Switch to {currentSubject === 'macro' ? 'Micro' : 'Macro'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

