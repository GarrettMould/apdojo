'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, X, Clock, Maximize2, Minimize2, Calculator, Pen, Eraser, Expand, Trash2, Circle, CircleDot, Check, Lock, Brain, FileText, ChevronLeft, ChevronRight, Triangle } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from './AuthModals';
import { MCQFeedbackModal } from './MCQFeedbackModal';
import { AssessmentResultsPanel } from './AssessmentResultsPanel';
import { videos } from '@/data/videos';

interface FullExamProps {
  questionBank: QuestionBank;
  examType: 'macro' | 'micro';
  questionType: 'mcq' | 'frq';
  examNumber: string;
}

interface Answers {
  [key: number]: string;
}

// Add type for stored bookmarks
interface StoredBookmarks {
  [questionBankName: string]: {
    questionIds: number[];
    timestamp: number;
  };
}

// Add this type definition
type Operator = '×' | '÷' | '+' | '-';

// Update the precedence object with type
const precedence: Record<Operator, number> = {
  '×': 2,
  '÷': 2,
  '+': 1,
  '-': 1,
};

// Update the isOperator function to be a type guard
const isOperator = (char: string): char is Operator => {
  return ['+', '-', '×', '÷'].includes(char);
};

const FeedbackProgressBar = ({ status }: { status: 'incorrect' | 'partial' | 'correct' }) => {
  const bars = [
    { filled: status === 'incorrect' || status === 'partial' || status === 'correct' },
    { filled: status === 'partial' || status === 'correct' },
    { filled: status === 'correct' }
  ];

  const getColor = (status: 'incorrect' | 'partial' | 'correct') => {
    switch (status) {
      case 'incorrect': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500';
      case 'correct': return 'bg-green-500';
    }
  };

  return (
    <div className="flex gap-1.5">
      {bars.map((bar, index) => (
        <div 
          key={index}
          className={`h-2 w-12 rounded-full transition-all duration-300 ${
            bar.filled 
              ? getColor(status) 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export function FullExam({ questionBank, examType, questionType, examNumber }: FullExamProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState<{[key: number]: boolean}>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  
  // Remove the shuffling logic and just use the pre-shuffled questions
  const questions = questionBank.questions;

  // Add calculator states
  const [showCalculator, setShowCalculator] = useState(false);
  const [isLargeCalculator, setIsLargeCalculator] = useState(false);
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  // Add drawing pad states
  const [showDrawingPad, setShowDrawingPad] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [isLargeDrawingPad, setIsLargeDrawingPad] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Add to state variables
  const [penColor, setPenColor] = useState('#000000');

  // Add current question index state (for pagination)
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  // Add completed questions tracking
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  // Add state for tracking which set of 10 questions to show
  const [currentTrackPage, setCurrentTrackPage] = useState(0);

  // Add eraser size state
  const [eraserSize, setEraserSize] = useState(20);

  // Add state for image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  const { user } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Update the track size constant to be responsive
  const getQuestionsPerTrack = () => {
    if (typeof window === 'undefined') return 20; // Default for SSR
    
    const width = window.innerWidth;
    if (width < 768) return 8;    // Mobile
    if (width < 1024) return 12;  // Tablet
    return 20;                    // Desktop
  };

  const [questionsPerTrack, setQuestionsPerTrack] = useState(getQuestionsPerTrack());

  // Add effect to update questions per track on resize
  useEffect(() => {
    const handleResize = () => {
      setQuestionsPerTrack(getQuestionsPerTrack());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add these new states
  const [expression, setExpression] = useState<string[]>([]);
  const [openParenCount, setOpenParenCount] = useState(0);

  // Add this state to store the canvas image data
  const [canvasHistory, setCanvasHistory] = useState<ImageData | null>(null);

  // Add these new state variables inside the FullExam component
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    status: 'incorrect' | 'partial' | 'correct';
    message: string;
  } | null>(null);

  // Add this state for the tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  // First, add a new state for loading
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add state for video modal
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Add state for video loading
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Add state for video loading
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Add effect to control body scrolling when the video modal is open
  useEffect(() => {
    if (showVideoModal) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = '';
    }

    // Cleanup function to reset the overflow style when the component unmounts or the modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [showVideoModal]);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: String.fromCharCode(65 + answerIndex)
    });
    setCompletedQuestions(prev => new Set([...prev, questionId]));
  };

  const calculateScore = () => {
    const totalQuestions = questionBank.questions.length;
    const correctAnswers = questionBank.questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    return (correctAnswers / totalQuestions) * 100;
  };

  const toggleExplanation = (questionId: number) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarkedQuestions(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(questionId)) {
        newBookmarks.delete(questionId);
      } else {
        newBookmarks.add(questionId);
      }
      return newBookmarks;
    });
  };

  // Update the calculator display function
  const getDisplayText = () => {
    return expression.join(' ');
  };

  // Update calculator functions
  const handleNumber = (num: string) => {
    if (num === '(') {
      setExpression(prev => [...prev, '(']);
      setOpenParenCount(prev => prev + 1);
      return;
    }

    if (num === ')' && openParenCount > 0) {
      setExpression(prev => [...prev, ')']);
      setOpenParenCount(prev => prev - 1);
      return;
    }

    if (num === '(' || num === ')') return;

    setExpression(prev => {
      const last = prev[prev.length - 1];
      if (!last || last === '(' || isOperator(last)) {
        return [...prev, num];
      }
      return [...prev.slice(0, -1), last + num];
    });
  };

  const handleOperation = (op: string) => {
    setExpression(prev => {
      const last = prev[prev.length - 1];
      if (!last || last === '(' || isOperator(last)) return prev;
      return [...prev, op];
    });
  };

  const handleClear = () => {
    setExpression([]);
    setOpenParenCount(0);
  };

  const handleDecimal = () => {
    setExpression(prev => {
      const last = prev[prev.length - 1];
      if (!last || last === '(' || isOperator(last)) {
        return [...prev, '0.'];
      }
      if (!last.includes('.')) {
        return [...prev.slice(0, -1), last + '.'];
      }
      return prev;
    });
  };

  const evaluateExpression = (exp: string[]): number => {
    const precedence = {
      '×': 2,
      '÷': 2,
      '+': 1,
      '-': 1,
    };

    const applyOp = (a: number, b: number, op: string): number => {
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': return b === 0 ? NaN : a / b;
        default: return NaN;
      }
    };

    const evaluate = (tokens: string[]): number => {
      const values: number[] = [];
      const ops: (Operator | '(')[] = [];

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === '(') {
          ops.push(token);
        }
        else if (token === ')') {
          while (ops.length && ops[ops.length - 1] !== '(') {
            const b = values.pop() ?? 0;
            const a = values.pop() ?? 0;
            const op = ops.pop() as Operator;
            values.push(applyOp(a, b, op));
          }
          ops.pop(); // Remove '('
        }
        else if (isOperator(token)) {
          while (ops.length && ops[ops.length - 1] !== '(' && 
                 precedence[ops[ops.length - 1] as Operator] >= precedence[token as Operator]) {
            const b = values.pop() ?? 0;
            const a = values.pop() ?? 0;
            const op = ops.pop() as Operator;
            values.push(applyOp(a, b, op));
          }
          ops.push(token as Operator);
        }
        else {
          values.push(parseFloat(token));
        }
      }

      while (ops.length) {
        const b = values.pop() ?? 0;
        const a = values.pop() ?? 0;
        const op = ops.pop() as Operator;
        values.push(applyOp(a, b, op));
      }

      return values[0] || 0;
    };

    return evaluate(exp);
  };

  const handleEquals = () => {
    if (expression.length === 0) return;
    
    try {
      const result = evaluateExpression(expression);
      if (isNaN(result)) {
        setExpression(['Error']);
      } else {
        setExpression([result.toString()]);
      }
    } catch (error) {
      setExpression(['Error']);
    }
    setOpenParenCount(0);
  };

  // Add drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    lastPosRef.current = { x, y };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing || !lastPosRef.current) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : penColor;
    ctx.lineWidth = isEraser ? eraserSize : 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    lastPosRef.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Add this CSS style to create custom cursors
  const getPenCursor = (color: string) => {
    const size = 10;
    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(size, size, size/2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
    return `url(${canvas.toDataURL()}) ${size} ${size}, crosshair`;
  };

  const getEraserCursor = () => {
    const size = eraserSize;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, size, size);
    }
    return `url(${canvas.toDataURL()}) ${size/2} ${size/2}, crosshair`;
  };

  // Update currentQuestionIndex to also handle track pagination
  const setCurrentQuestionIndexWithTrack = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentTrackPage(Math.floor(index / questionsPerTrack));
  };

  // Modify navigation functions to update track
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndexWithTrack(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndexWithTrack(currentQuestionIndex - 1);
    }
  };

  // Modify the question track rendering for mobile
  const renderQuestionIndicators = () => {
    const startIndex = currentTrackPage * questionsPerTrack;
    const endIndex = Math.min(startIndex + questionsPerTrack, questions.length);
    const totalPages = Math.ceil(questions.length / questionsPerTrack);

    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        {/* Single container for all elements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          {/* Mobile Question Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {completedQuestions.size} Answered
              </span>
            </div>
            <div className="relative">
              <select
                value={currentQuestionIndex}
                onChange={(e) => setCurrentQuestionIndexWithTrack(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {questions.map((_, idx) => {
                  const isCompleted = completedQuestions.has(questions[idx].id);
                  const isBookmarked = bookmarkedQuestions.has(questions[idx].id);
                  return (
                    <option key={idx} value={idx}>
                      Question {idx + 1}
                      {isCompleted ? ' ✓' : ''}
                      {isBookmarked ? ' ★' : ''}
                    </option>
                  );
                })}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop Question Indicators - Keep existing desktop version */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <div
                onClick={() => {
                  if (currentTrackPage > 0) {
                    setCurrentTrackPage(currentTrackPage - 1);
                  }
                }}
                className={`
                  flex min-w-[32px] h-[32px] items-center justify-center rounded-lg
                  transition-all duration-200 ease-in-out text-sm font-medium mr-2
                  ${currentTrackPage === 0
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105'
                  }
                `}
              >
                <Triangle className="w-4 h-4 text-blue-600 -rotate-90" />
              </div>

              <div className="flex-1 flex flex-wrap justify-center gap-1.5">
                {Array.from({ length: questionsPerTrack }, (_, i) => {
                  const questionIndex = startIndex + i;
                  if (questionIndex >= questions.length) return null;
                  const question = questions[questionIndex];
                  const isBookmarked = question && bookmarkedQuestions.has(question.id);
                  
                  return (
                    <div
                      key={questionIndex}
                      className={`
                        min-w-[28px] h-[28px] flex items-center justify-center rounded-lg 
                        transition-all duration-200 ease-in-out text-sm font-medium
                        ${questionIndex === currentQuestionIndex 
                          ? 'border-2 border-blue-500 bg-blue-50 text-blue-900 shadow-sm scale-105' 
                          : completedQuestions.has(questions[questionIndex]?.id)
                            ? 'border-2 border-blue-400 text-blue-900'
                            : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'}
                        ${isBookmarked ? 'border-2 border-yellow-300/70' : ''}
                        hover:scale-105 cursor-pointer
                      `}
                      onClick={() => setCurrentQuestionIndexWithTrack(questionIndex)}
                    >
                      {questionIndex + 1}
                    </div>
                  );
                })}
              </div>

              <div
                onClick={() => {
                  if (currentTrackPage < totalPages - 1) {
                    setCurrentTrackPage(currentTrackPage + 1);
                  }
                }}
                className={`
                  flex min-w-[32px] h-[32px] items-center justify-center rounded-lg
                  transition-all duration-200 ease-in-out text-sm font-medium ml-2
                  ${currentTrackPage >= totalPages - 1
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105'
                  }
                `}
              >
                <Triangle className="w-4 h-4 text-blue-600 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add effect to reset tools state when component unmounts/remounts
  useEffect(() => {
    setShowCalculator(false);
    setShowDrawingPad(false);
    
    return () => {
      setShowCalculator(false);
      setShowDrawingPad(false);
    };
  }, []);

  // Add reset function for drawing tools
  const resetDrawingTools = () => {
    setIsEraser(false);
    setPenColor('#000000');
    setEraserSize(20);
  };

  // Modify showDrawingPad state setter to include reset
  const toggleDrawingPad = (show: boolean) => {
    setShowDrawingPad(show);
    if (!show) {
      resetDrawingTools();
    }
  };

  const handlePurchase = async () => {
    console.log('Current user state:', user); // Add debugging
    
    if (!user) {
      console.log('No user found, showing login modal');
      setShowLoginModal(true);
      return;
    }

    console.log('User is logged in, proceeding to checkout');
    try {
      await redirectToCheckout(examType, questionType, examNumber, user.uid);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  // AI Tutor function removed - can be re-added per-question if needed
  const handleAITutorClick = async (questionId: number) => {
    // TODO: Implement per-question AI tutor if needed
  };

  const getRelatedVideos = (lessonIds: string[], examType: 'macro' | 'micro') => {
    const subjectName = examType === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
    return videos.filter(video => 
      video.lessonIDS.some(id => lessonIds.includes(id)) && video.subjects.includes(subjectName)
    );
  };

  // Removed currentQuestionIndex references since we show all questions at once

  return (
    <>
      {/* Add the modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={selectedImage.src} 
              alt="Question" 
              className="max-w-full max-h-[90vh] object-contain scale-150 transform"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
              className="absolute top-0 right-0 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 z-10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white p-4 rounded-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowVideoModal(false);
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
              style={{ margin: '8px' }}
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              controls 
              className="w-full"
              onLoadedData={() => {
                setIsVideoLoaded(true);
                setIsVideoLoading(false); // Stop loading spinner
              }}
              onError={() => {
                console.error('Error loading video');
                setIsVideoLoading(false); // Stop loading spinner
              }}
            >
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Feedback modal removed - can be re-added per-question if needed */}

      <div className="w-full">
        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="border-b border-gray-200 mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="font-bold">Progress Bar</span>
                  <span>{completedQuestions.size} of {questions.length} answered</span>
                </div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(20, minmax(0, 1fr))' }}>
                  {questions.map((q, index) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isBookmarked = bookmarkedQuestions.has(q.id);
                    const questionPage = Math.floor(index / questionsPerPage);
                    let buttonClasses = 'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors';
                    let textClasses = '';
                    if (isBookmarked) {
                      buttonClasses += ' bg-yellow-200';
                      textClasses += ' text-yellow-800';
                    } else if (isAnswered) {
                      buttonClasses += ' bg-blue-300';
                      textClasses += ' text-blue-800';
                    } else {
                      buttonClasses += ' bg-gray-200';
                      textClasses += ' text-gray-600';
                    }
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentPage(questionPage);
                          // Small delay to ensure page change happens first
                          setTimeout(() => {
                            const element = document.getElementById(`question-${q.id}`);
                            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 100);
                        }}
                        className={buttonClasses}
                        title={`Question ${index + 1}`}
                      >
                        <span className={textClasses}>{index + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Paginated Questions */}
            <div className="space-y-8">
              {(() => {
                const startIndex = currentPage * questionsPerPage;
                const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
                const currentPageQuestions = questions.slice(startIndex, endIndex);
                const totalPages = Math.ceil(questions.length / questionsPerPage);
                
                return (
                  <>
                    {/* Page Info at Top */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                      <span className="text-sm text-gray-600">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <div className="text-sm text-gray-600">
                        Questions {startIndex + 1}-{endIndex} of {questions.length}
                      </div>
                    </div>

                    {/* Current Page Questions */}
                    {currentPageQuestions.map((question, relativeIndex) => {
                      const questionIndex = startIndex + relativeIndex;
                const selectedAnswer = answers[question.id];
                const selectedIndex = selectedAnswer ? selectedAnswer.charCodeAt(0) - 65 : null;
                
                return (
                  <div key={question.id} id={`question-${question.id}`} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    {/* Question Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg">
                        <span className="text-lg font-bold text-slate-700">{questionIndex + 1}</span>
                      </div>
                      <div className="h-px flex-1 bg-slate-200"></div>
                      <button
                        onClick={() => {
                          const newBookmarks = new Set(bookmarkedQuestions);
                          if (newBookmarks.has(question.id)) {
                            newBookmarks.delete(question.id);
                          } else {
                            newBookmarks.add(question.id);
                          }
                          setBookmarkedQuestions(newBookmarks);
                        }}
                        className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                          bookmarkedQuestions.has(question.id)
                            ? 'bg-yellow-100 text-yellow-500'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                        }`}
                        aria-label={bookmarkedQuestions.has(question.id) ? "Remove bookmark" : "Bookmark question"}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Question Text */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-slate-900 leading-relaxed">{question.question}</h3>
                    </div>

                    {/* Question Image */}
                    {question.image && (
                      <div className="mb-8 flex justify-center">
                        <img
                          src={question.image.src}
                          alt={'alt' in question.image && question.image.alt ? question.image.alt : "Question diagram"}
                          className="max-w-xl w-full h-auto rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setSelectedImage(question.image);
                            setShowImageModal(true);
                          }}
                        />
                      </div>
                    )}

                    {/* Answer Options */}
                    <div className="space-y-4">
                      {question.options.map((option, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                          <div
                            key={index}
                            onClick={() => handleAnswer(question.id, index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                              isSelected 
                                ? 'bg-slate-50 text-slate-900 shadow-md border-slate-300 ring-2 ring-slate-100' 
                                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md'
                            }`}
                          >
                            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                              isSelected ? 'bg-slate-700 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-600'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <div className="flex-1">
                              <span className={`text-sm ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                                {option}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
                    })}

                    {/* Page Navigation at Bottom */}
                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                        className={`px-8 py-4 text-lg rounded-lg font-semibold transition-colors ${
                          currentPage === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={currentPage >= totalPages - 1}
                        className={`px-8 py-4 text-lg rounded-lg font-semibold transition-colors ${
                          currentPage >= totalPages - 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Next
                      </button>
                    </div>

                    {/* Submit Button - Only show on last page */}
                    {currentPage === Math.ceil(questions.length / questionsPerPage) - 1 && (
                      <div className="pt-8 mt-4">
                        <button
                          onClick={() => setShowResults(true)}
                          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          Submit Exam
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <AssessmentResultsPanel 
              totalQuestions={questions.length}
              correctAnswers={questions.filter((q) => answers[q.id] === q.correctAnswer).length}
              questions={questions}
              answers={answers}
              examType={examType}
            />
            
            {/* Questions Review */}
            {questions.map((question) => {
              const isCorrect = answers[question.id] === question.correctAnswer;
              const selectedAnswer = answers[question.id];
              
              return (
                <div 
                  key={question.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Question Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-500">Question {questions.indexOf(question) + 1}</span>
                      <span className={`px-3 py-1 rounded-sm text-sm font-medium ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                      <p className="text-lg font-medium font-serif leading-relaxed text-gray-900">{question.question}</p>
                    
                    {/* Add image display */}
                    {question.image && (
                      <div className="my-4">
                        <img 
                          src={question.image.src}
                          alt="Question"
                          className="max-h-[300px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                          onClick={() => {
                            setSelectedImage(question.image);
                            setShowImageModal(true);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Answer Options */}
                  <div className="p-4 space-y-2">
                    {question.options.map((option, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = selectedAnswer === letter;
                      const isCorrectAnswer = question.correctAnswer === letter;
                      
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            isCorrectAnswer ? 'bg-green-50 border-green-300' :
                            (isSelected && !isCorrectAnswer) ? 'bg-red-50 border-red-300' :
                            'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-start gap-2 w-[85%]">
                              <span className="text-gray-700 mt-0.5">
                                {letter.toLowerCase()})
                              </span>
                              <span className={isCorrectAnswer ? 'font-medium' : ''}>
                                {option}
                              </span>
                            </div>
                            {(isCorrectAnswer || (isSelected && !isCorrectAnswer)) && (
                              <div className="flex-shrink-0">
                                {isCorrectAnswer ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <X className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-4 border-t border-gray-100">
                    <Button
                      onClick={() => toggleExplanation(question.id)}
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {showExplanations[question.id] ? 'Hide' : 'Show'} Explanation
                      <span className="text-gray-400">
                        {showExplanations[question.id] ? '−' : '+'}
                      </span>
                    </Button>
                    
                    {showExplanations[question.id] && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800">
                        {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
} 