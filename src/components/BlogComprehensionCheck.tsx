'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Question } from '@/data/questionBanks/types';

interface BlogComprehensionCheckProps {
  question: Question;
}

export function BlogComprehensionCheck({ question }: BlogComprehensionCheckProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (optionLetter: string) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(optionLetter);
      setShowExplanation(true);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Comprehension Check</h3>
      <p className="text-lg font-medium text-gray-800 mb-6 leading-relaxed">
        {question.question}
      </p>
      
      {question.image && (
        <div className="my-6 flex justify-center">
          <Image
            src={typeof question.image === 'string' ? question.image : (question.image as any).src}
            alt="Question diagram"
            width={500}
            height={350}
            className="rounded-lg border bg-white max-w-full"
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === optionLetter;
          const isCorrect = optionLetter === question.correctAnswer;
          const showResult = selectedAnswer !== null;
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(optionLetter)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                !showResult
                  ? 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                  : isSelected && isCorrect
                  ? 'bg-green-50 border-green-400 text-green-900'
                  : isSelected && !isCorrect
                  ? 'bg-red-50 border-red-400 text-red-900'
                  : isCorrect && showResult
                  ? 'bg-green-50 border-green-400 text-green-900'
                  : 'bg-gray-50 border-gray-300 text-gray-800'
              } ${selectedAnswer !== null ? 'cursor-default' : ''}`}
            >
              <span className="font-semibold">{optionLetter}.</span> {option}
            </button>
          );
        })}
      </div>
      
      {showExplanation && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-gray-800 leading-relaxed">
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}




