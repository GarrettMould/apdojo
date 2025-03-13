'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface SubPart {
  label: string;
  text: string;
}

interface Part {
  label: string;
  text: string;
  subparts?: SubPart[];
}

interface Question {
  questionNumber: number;
  prompt: string;
  parts: Part[];
}

interface FullExamFRQProps {
  questions: {
    questions: Question[];
  };
}

export function FullExamFRQ({ questions }: FullExamFRQProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions.questions[currentQuestionIndex];

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Question Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">
              Question {currentQuestionIndex + 1} of {questions.questions.length}
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          {/* Main Prompt */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900">{currentQuestion.prompt}</p>
          </div>

          {/* Parts and Subparts */}
          <div className="space-y-6">
            {currentQuestion.parts.map((part, partIndex) => (
              <div key={partIndex} className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-medium text-gray-700">{part.label})</span>
                  <p className="text-gray-900">{part.text}</p>
                </div>

                {/* Subparts if they exist */}
                {part.subparts && (
                  <div className="ml-8 space-y-3">
                    {part.subparts.map((subpart, subpartIndex) => (
                      <div key={subpartIndex} className="flex gap-3">
                        <span className="font-medium text-gray-700">{subpart.label}.</span>
                        <p className="text-gray-900">{subpart.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="p-6 border-t bg-white">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="w-28"
              >
                Previous
              </Button>
              <Button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.questions.length - 1}
                variant="outline"
                className="w-28"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 