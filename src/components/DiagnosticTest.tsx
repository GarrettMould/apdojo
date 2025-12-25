'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DiagnosticResults } from './DiagnosticResults';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  unit: string; // e.g., 'Unit 1', 'Unit 2'
}

type TestResults = {
  score: number;       // e.g., 15
  total: number;       // e.g., 20
  percent: number;     // e.g., 75
  belt: string;        // 'White', 'Yellow', etc.
  weakestUnit: string; // The unit with the most wrong answers
};

interface DiagnosticTestProps {
  questions: Question[];
  onComplete?: (answers: Record<string, number>) => void;
}

export function DiagnosticTest({ questions, onComplete }: DiagnosticTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const totalQuestions = questions.length;
  const isComplete = testResults !== null;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
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
    const percent = Math.round((score / total) * 100);

    // Calculate weakness detection - track missed questions per unit
    const unitErrors: Record<string, number> = {};
    
    questions.forEach((question) => {
      const userAnswer = finalAnswers[question.id];
      if (userAnswer !== question.correctAnswer) {
        // Wrong answer - increment error count for this unit
        if (!unitErrors[question.unit]) {
          unitErrors[question.unit] = 0;
        }
        unitErrors[question.unit]++;
      }
    });

    // Identify the unit with the highest error count
    let weakestUnit = 'Unit 1: Basic Economic Concepts'; // Default fallback
    let maxErrors = 0;
    
    Object.entries(unitErrors).forEach(([unit, errorCount]) => {
      if (errorCount > maxErrors) {
        maxErrors = errorCount;
        weakestUnit = unit;
      }
    });

    // If no errors, find the unit with the most questions (as a fallback)
    if (maxErrors === 0 && Object.keys(unitErrors).length === 0) {
      const unitCounts: Record<string, number> = {};
      questions.forEach((question) => {
        unitCounts[question.unit] = (unitCounts[question.unit] || 0) + 1;
      });
      
      let maxCount = 0;
      Object.entries(unitCounts).forEach(([unit, count]) => {
        if (count > maxCount) {
          maxCount = count;
          weakestUnit = unit;
        }
      });
    }

    // Belt assignment
    let belt = 'White Belt';
    if (percent > 80) {
      belt = 'Yellow Belt';
    }

    const results: TestResults = {
      score,
      total,
      percent,
      belt,
      weakestUnit,
    };

    // Log results to console
    console.log('Diagnostic Test Results:', results);
    console.log('Unit Error Breakdown:', unitErrors);

    setTestResults(results);
    onComplete?.(finalAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    // Save answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    };
    
    // Update answers state
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Complete the test - calculate and show results
      handleFinish(newAnswers);
    } else {
      // Move to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleClaimRank = () => {
    // Redirect to dashboard or home
    window.location.href = '/';
  };

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
      className="h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-12"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="max-w-5xl mx-auto relative h-full flex flex-col">
        {/* Progress Bar - Hide when showing results */}
        {!isComplete && (
          <div className="mb-6 flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-4 border border-gray-300">
              <motion.div
                className="bg-blue-600 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        )}

        {/* Results or Question Card */}
        <AnimatePresence mode="wait">
          {isComplete && testResults ? (
            <DiagnosticResults
              key="results"
              results={testResults}
              onClaimRank={handleClaimRank}
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
                className="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex-1 p-8 sm:p-12 flex flex-col"
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
                const keyLabel = String.fromCharCode(65 + index); // A, B, C, D

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      isSelected
                        ? 'bg-gray-100 text-gray-900 border-gray-400'
                        : 'bg-white border-gray-200 hover:border-black hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Keycap Hint */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 ${
                        isSelected
                          ? 'bg-gray-200 text-gray-800 border-gray-400'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {keyLabel}
                    </div>

                    {/* Option Text */}
                    <span className="text-lg font-medium flex-1">{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation Button - Inside Card at Bottom */}
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
                    <span>{isLastQuestion ? 'Finish Diagnostic' : 'Next'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

