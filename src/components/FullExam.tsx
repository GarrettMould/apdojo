'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, X, Clock, Maximize2, Minimize2, Calculator, Pen, Eraser, Expand, Trash2, Circle, CircleDot, Check, Lock, Brain } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from './AuthModals';
import { MCQFeedbackModal } from './MCQFeedbackModal';
import { AssessmentResultsPanel } from './AssessmentResultsPanel';

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

  // Add current question index state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  // Update the track size constant
  const QUESTIONS_PER_TRACK = 15;  // This divides evenly into 60

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
    setCurrentTrackPage(Math.floor(index / QUESTIONS_PER_TRACK));
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
    const startIndex = currentTrackPage * QUESTIONS_PER_TRACK;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_TRACK, questions.length);
    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_TRACK);

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
                  transition-all duration-200 ease-in-out text-sm font-medium mr-4
                  ${currentTrackPage === 0
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105'
                  }
                `}
              >
                ←
              </div>

              <div className="flex-1 flex justify-between">
                {Array.from({ length: QUESTIONS_PER_TRACK }, (_, i) => {
                  const questionIndex = startIndex + i;
                  if (questionIndex >= questions.length) return null;
                  const question = questions[questionIndex];
                  const isBookmarked = question && bookmarkedQuestions.has(question.id);
                  
                  return (
                    <div
                      key={questionIndex}
                      className={`
                        min-w-[32px] h-[32px] flex items-center justify-center rounded-lg 
                        transition-all duration-200 ease-in-out text-sm font-medium
                        ${questionIndex === currentQuestionIndex 
                          ? 'bg-blue-500 text-white shadow-sm scale-105' 
                          : completedQuestions.has(questions[questionIndex]?.id)
                          ? 'bg-blue-200 text-blue-900 border border-blue-300'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}
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
                  transition-all duration-200 ease-in-out text-sm font-medium ml-4
                  ${currentTrackPage >= totalPages - 1
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer hover:scale-105'
                  }
                `}
              >
                →
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
      await redirectToCheckout(examType, questionType, examNumber);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleAITutorClick = async () => {
    try {
      setIsAILoading(true); // Set loading state when starting
      const currentQuestion = questions[currentQuestionIndex];
      
      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'ai_tutor',
          questionType: questionType,
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctAnswer: currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation,
          unit: currentQuestion.unit,
          unitName: currentQuestion.unitName,
          userAnswer: answers[currentQuestion.id] || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      let status: 'incorrect' | 'partial' | 'correct';
      const feedbackLower = data.feedback.toLowerCase();

      if (feedbackLower.includes('incorrect') || feedbackLower.includes('error')) {
        status = 'incorrect';
      } else if (feedbackLower.includes('partially correct') || 
                 feedbackLower.includes('could be improved') || 
                 (feedbackLower.includes('correct') && feedbackLower.includes('but'))) {
        status = 'partial';
      } else {
        status = 'correct';
      }

      setFeedbackData({
        status,
        message: data.feedback
      });
      setShowFeedbackModal(true);
    } catch (error) {
      console.error('Error connecting to AI:', error);
      setFeedbackData({
        status: 'incorrect',
        message: 'Sorry, there was an error getting feedback. Please try again.'
      });
      setShowFeedbackModal(true);
    } finally {
      setIsAILoading(false); // Reset loading state when done
    }
  };

  // Sample study resources (you can modify these based on your needs)
  const studyResources = [
    {
      title: 'Video: Understanding Aggregate Demand',
      type: 'video' as const,
      link: '#'
    },
    {
      title: 'Note Sheet: Government Spending Effects',
      type: 'notes' as const,
      link: '#'
    },
    {
      title: 'Practice Problems: Fiscal Policy',
      type: 'practice' as const,
      link: '#'
    }
  ];

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

      {/* Replace the existing feedback modal with the new component */}
              <MCQFeedbackModal 
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          question={questions[currentQuestionIndex]?.question}
          selectedAnswer={answers[questions[currentQuestionIndex]?.id] ? 
            `${answers[questions[currentQuestionIndex].id]}) ${
              questions[currentQuestionIndex].options[
                answers[questions[currentQuestionIndex].id].charCodeAt(0) - 65
              ]
            }` : undefined
          }
          correctAnswer={questions[currentQuestionIndex]?.correctAnswer ? 
            `${questions[currentQuestionIndex].correctAnswer}) ${
              questions[currentQuestionIndex].options[
                questions[currentQuestionIndex].correctAnswer.charCodeAt(0) - 65
              ]
            }` : undefined
          }
          feedback={feedbackData || { status: 'incorrect', message: '' }}
          studyResources={studyResources}
          subject={examType}
          unitNumber={questions[currentQuestionIndex]?.unit || 1}
        />

      <div className="container mx-auto px-4 py-12">
      {/* Question track outside main container */}
      {!showResults && renderQuestionIndicators()}
      
      {/* Main exam container */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {!showResults ? (
          <>
              <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
                {/* Question header with unit and bookmark */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
                  {/* Left side with question number and unit */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs sm:text-sm font-medium">
                      Question {currentQuestionIndex + 1} of 60
                    </span>
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs sm:text-sm font-medium">
                      Unit {questions[currentQuestionIndex].unit}
                    </span>
                  </div>

                  {/* Right side with brain and bookmark icons */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <button
                        className={`p-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600 ${
                          !answers[questions[currentQuestionIndex].id] ? 'cursor-not-allowed opacity-80' : ''
                        }`}
                        onClick={(e) => {
                          if (!answers[questions[currentQuestionIndex].id]) {
                            e.preventDefault();
                            setShowTooltip(true);
                            setTimeout(() => setShowTooltip(false), 3000);
                            return;
                          }
                          handleAITutorClick();
                        }}
                        onMouseEnter={() => {
                          if (!answers[questions[currentQuestionIndex].id]) {
                            setShowTooltip(true);
                          }
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                        disabled={isAILoading}
                      >
                        {isAILoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Brain className="w-5 h-5" />
                        )}
                      </button>
                      
                      {/* Tooltip */}
                      {showTooltip && !answers[questions[currentQuestionIndex].id] && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-white text-gray-700 text-sm rounded-lg shadow-lg border border-gray-200">
                          <div className="relative">
                            Select an answer to use AI Dojo Feedback
                            {/* Arrow */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45" />
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => toggleBookmark(questions[currentQuestionIndex].id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        bookmarkedQuestions.has(questions[currentQuestionIndex].id)
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 shadow-sm'
                          : 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100'
                      }`}
                    >
                      {bookmarkedQuestions.has(questions[currentQuestionIndex].id) ? (
                        <Bookmark className="w-5 h-5 fill-current" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                  
                {/* Question content */}
                <div className="space-y-6">
                  <p className="text-lg font-medium font-serif leading-relaxed text-gray-800">
                    {questions[currentQuestionIndex].question}
                  </p>
                    
                    {questions[currentQuestionIndex].image && (
                      <div className="my-4">
                        <img 
                          src={questions[currentQuestionIndex].image.src}
                          alt="Question"
                        className="max-h-[225px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                          onClick={() => {
                            setSelectedImage(questions[currentQuestionIndex].image);
                            setShowImageModal(true);
                          }}
                        />
                      </div>
                    )}
                    
                  <div className="space-y-3">
                    {questions[currentQuestionIndex].options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswer(questions[currentQuestionIndex].id, optIndex)}
                        className={`w-full text-left p-4 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          answers[questions[currentQuestionIndex].id] === String.fromCharCode(65 + optIndex)
                            ? 'bg-blue-50 text-gray-900 border-blue-200 shadow-sm hover:bg-blue-100'
                            : 'bg-gray-50/50 hover:bg-gray-100 border-transparent hover:border-gray-200 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
                            {String.fromCharCode(97 + optIndex)}
                          </span>
                          <span className="flex-1">{option}</span>
                        </div>
                      </button>
                    ))}
                    </div>
                  </div>

                {/* Navigation buttons */}
                <div className="mt-8 flex md:flex-row flex-col gap-3 md:justify-between md:items-center">
                  <div className="flex md:flex-row flex-col gap-2">
                    <Button
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                      className="w-full md:w-32 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={goToNextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      variant="outline"
                      className="w-full md:w-32 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Next
                    </Button>
                  </div>
                  {currentQuestionIndex === questions.length - 1 && (
                    <Button
                      onClick={() => setShowResults(true)}
                      className="w-full md:w-28 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      Submit
                    </Button>
                  )}
              </div>
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
      </div>
    </>
  );
} 