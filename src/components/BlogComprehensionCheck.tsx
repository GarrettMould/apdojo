'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Question } from '@/data/questionBanks/types';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface BlogComprehensionCheckProps {
  question: Question;
  footer?: React.ReactNode;
}

export function BlogComprehensionCheck({ question, footer }: BlogComprehensionCheckProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (optionLetter: string) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(optionLetter);
      setShowExplanation(true);
    }
  };

  const showResult = selectedAnswer !== null;

  return (
    <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-3">Comprehension Check</h3>
      <p className="text-slate-700 mb-6 leading-relaxed">
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
          const isCorrectAnswer = optionLetter === question.correctAnswer;
          const isSelected = selectedAnswer === optionLetter;
          
          // Determine styling based on state (matching Quiz Me)
          let optionStyle = 'bg-white border-slate-200';
          if (showResult) {
            if (isCorrectAnswer) {
              optionStyle = 'bg-green-50 border-green-200';
            } else if (isSelected && !isCorrectAnswer) {
              optionStyle = 'bg-red-50 border-red-200';
            }
          } else if (isSelected) {
            optionStyle = 'bg-blue-50 border-blue-200';
          }
          
          return (
            <motion.div
              key={index}
              initial={false}
              animate={showResult && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg border shadow-sm transition-colors ${optionStyle} ${
                !showResult ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
              }`}
              onClick={!showResult ? () => handleAnswerSelect(optionLetter) : undefined}
            >
              <div className="flex items-center gap-3">
                {!showResult ? (
                  <>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={optionLetter}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(optionLetter)}
                      className="w-5 h-5 text-blue-600 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="flex-1 text-slate-900">{option}</span>
                  </>
                ) : (
                  <>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                        isCorrectAnswer
                          ? 'bg-green-500 text-white'
                          : isSelected && !isCorrectAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {optionLetter}
                    </span>
                    <span className="flex-1 text-slate-900">{option}</span>
                    {isCorrectAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                    {isSelected && !isCorrectAnswer && (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {showExplanation && question.explanation && (
        <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-slate-800 leading-relaxed">
            <strong>Explanation:</strong> {question.explanation}
          </p>
        </div>
      )}

      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          {footer}
        </div>
      )}
    </div>
  );
}









