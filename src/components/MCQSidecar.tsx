'use client';

import { useState } from 'react';
import { Question } from '@/data/questionBanks/types';
import { ChevronRight, ChevronLeft, X, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface MCQSidecarProps {
  questions: Question[];
  // Support both data structures: unit test format and FullExam format
  answeredQuestions?: Record<string, { selectedAnswer: number; isCorrect: boolean }>;
  answers?: Record<number, string>; // FullExam format: questionId -> answer letter
  bookmarkedQuestions: number[] | Set<number>;
  onQuestionClick: (questionId: number) => void;
  onClose?: () => void; // Optional callback to close the sidecar from parent
}

export function MCQSidecar({
  questions,
  answeredQuestions,
  answers,
  bookmarkedQuestions,
  onQuestionClick,
  onClose
}: MCQSidecarProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  const questionsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  
  // Get the questions for the current page
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentPageQuestions = questions.slice(startIndex, endIndex);

  // Helper to check if a question is answered
  const isAnswered = (questionId: number) => {
    if (answers !== undefined) {
      return answers[questionId] !== undefined;
    }
    if (answeredQuestions !== undefined) {
      return answeredQuestions[questionId] !== undefined;
    }
    return false;
  };

  // Helper to check if a question is bookmarked
  const isBookmarked = (questionId: number) => {
    if (bookmarkedQuestions instanceof Set) {
      return bookmarkedQuestions.has(questionId);
    }
    return bookmarkedQuestions.includes(questionId);
  };

  // Don't show collapsed state when used as popup (onClose prop indicates popup mode)
  if (!isVisible && !onClose) {
    return (
      <div 
        className="hidden lg:block fixed right-8 z-10"
        style={{ top: '6rem' }}
      >
        <button
          onClick={() => setIsVisible(true)}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          aria-label="Show navigation"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-xl p-4"
      style={{
        width: '320px',
        maxHeight: 'calc(100vh - 12rem)',
        overflowY: 'auto'
      }}
    >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900">Question Navigation</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className={`p-1 rounded transition-colors ${
                currentPage === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Previous 20 questions"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage >= totalPages - 1}
              className={`p-1 rounded transition-colors ${
                currentPage >= totalPages - 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Next 20 questions"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Hide navigation"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {currentPageQuestions.map((q, relativeIndex) => {
            const globalIndex = startIndex + relativeIndex;
            const answered = isAnswered(q.id);
            const bookmarked = isBookmarked(q.id);
            let buttonClasses = 'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors';
            let textClasses = '';
            
            if (bookmarked) {
              buttonClasses += ' bg-yellow-200';
              textClasses += ' text-yellow-800';
            } else if (answered) {
              buttonClasses += ' bg-blue-300';
              textClasses += ' text-blue-800';
            } else {
              buttonClasses += ' bg-gray-200';
              textClasses += ' text-gray-600';
            }
            
            return (
              <button
                key={q.id}
                onClick={() => onQuestionClick(q.id)}
                className={buttonClasses}
                title={`Question ${globalIndex + 1}`}
              >
                <span className={textClasses}>{globalIndex + 1}</span>
              </button>
            );
          })}
        </div>
    </div>
  );
}









