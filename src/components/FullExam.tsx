'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, X, Clock, Maximize2, Minimize2, Calculator, Pen, Eraser, Expand, Trash2, Circle, CircleDot, Check, Lock, Brain, FileText, ChevronLeft, ChevronRight, ChevronsRight, Triangle, Strikethrough, Eye, Play } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from './AuthModals';
import { MCQFeedbackModal } from './MCQFeedbackModal';
import { AssessmentResultsPanel } from './AssessmentResultsPanel';
import { videos } from '@/data/videos';
import { createPortal } from 'react-dom';
import { HighlightableText } from './HighlightableText';
import { MCQSidecar } from './MCQSidecar';
import { DojoReadinessBand } from './DojoReadinessBand';
import { Scroll } from 'lucide-react';
import { QuestionWithKeyTerms } from './QuestionWithKeyTerms';
import { ExamCalculator } from './ExamCalculator';
import { ExamWhiteboard } from './ExamWhiteboard';
import { ExamTutorialModal } from './ExamTutorialModal';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

interface FullExamProps {
  questionBank: QuestionBank;
  examType: 'macro' | 'micro';
  questionType: 'mcq' | 'frq';
  examNumber: string;
  onTimeUpdate?: (timeRemaining: number) => void;
  isCustomAssignment?: boolean;
  assignmentLinkId?: string; // Encoded parameter for custom assignments
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

export function FullExam({ questionBank, examType, questionType, examNumber, onTimeUpdate, isCustomAssignment = false, assignmentLinkId }: FullExamProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [showFullResults, setShowFullResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState<{[key: number]: boolean}>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  const [strikethroughState, setStrikethroughState] = useState<Record<number, number[]>>({});
  const [showBookmarkConfirmModal, setShowBookmarkConfirmModal] = useState(false);
  
  // Timer state (60 minutes = 3600 seconds)
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  
  // Remove the shuffling logic and just use the pre-shuffled questions
  const questions = questionBank.questions;

  // Generate Dojo name for custom assignments only
  const customTitle = useMemo(() => {
    if (!isCustomAssignment) return null;
    return 'Dojo Challenge';
  }, [isCustomAssignment]);

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

  // Add current question index state (for single question view)
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 1;

  // Add completed questions tracking
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  // Add eraser size state
  const [eraserSize, setEraserSize] = useState(20);

  // Add state for image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  const { user } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Scroll to top when page changes
  // Check if user has seen tutorial on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeenTutorial = localStorage.getItem('hasSeenExamTutorial');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Timer countdown effect
  useEffect(() => {
    if (showResults || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showResults, timeRemaining]);

  // Notify parent of time updates
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(timeRemaining);
    }
  }, [timeRemaining, onTimeUpdate]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // State for feedback panel container (outside exam container)
  const [feedbackContainer, setFeedbackContainer] = useState<HTMLElement | null>(null);
  // State for sidecar visibility and position
  const [showSidecar, setShowSidecar] = useState(false);
  const sidecarButtonRef = useRef<HTMLButtonElement | null>(null);

  // Effect to find or create feedback container
  useEffect(() => {
    let container = document.getElementById('exam-feedback-container');
    if (!container) {
      // Create container if it doesn't exist
      container = document.createElement('div');
      container.id = 'exam-feedback-container';
      document.body.appendChild(container);
    }
    setFeedbackContainer(container);
    
    // Cleanup: remove container when component unmounts
    return () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  // Effect to close sidecar when clicking outside
  useEffect(() => {
    if (!showSidecar) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking inside the sidecar or the button that opened it
      if (
        sidecarButtonRef.current?.contains(target) ||
        target.closest('.mcq-sidecar-popup')
      ) {
        return;
      }
      setShowSidecar(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidecar]);

  // State for text highlights
  const [textHighlights, setTextHighlights] = useState<Record<number, Array<{ start: number; end: number; id: string }>>>({});

  const handleHighlight = (questionId: number, highlights: Array<{ start: number; end: number; id: string }>) => {
    setTextHighlights(prev => ({
      ...prev,
      [questionId]: highlights
    }));
  };

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
  const [videoUrl, setVideoUrl] = useState<string>('');

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
    // If option is struck through, just remove strikethrough and don't select
    // This matches the exact logic from unitMCQS.tsx
    if (strikethroughState[questionId]?.includes(answerIndex)) {
      setStrikethroughState(prev => {
        const currentStrikes = prev[questionId] || [];
        const newStrikes = currentStrikes.filter(i => i !== answerIndex);
        if (newStrikes.length === 0) {
          const { [questionId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [questionId]: newStrikes };
      });
      return; // Exit early - do NOT select
    }
    
    setAnswers({
      ...answers,
      [questionId]: String.fromCharCode(65 + answerIndex)
    });
    setCompletedQuestions(prev => new Set([...prev, questionId]));
  };

  const handleStrikethroughToggle = (questionId: number, optionIndex: number) => {
    if (showResults) return;

    // If the option being struck through is the currently selected answer, deselect it.
    const currentAnswer = answers[questionId];
    if (currentAnswer && String.fromCharCode(65 + optionIndex) === currentAnswer) {
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      });
      setCompletedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }

    setStrikethroughState(prev => {
      const currentStrikes = prev[questionId] || [];
      const newStrikes = currentStrikes.includes(optionIndex)
        ? currentStrikes.filter(i => i !== optionIndex)
        : [...currentStrikes, optionIndex];
      
      return { ...prev, [questionId]: newStrikes };
    });
  };

  const handleSubmitClick = async () => {
    if (bookmarkedQuestions.size > 0) {
      setShowBookmarkConfirmModal(true);
    } else {
      setShowResults(true);
      // Save results to Firebase if this is a custom assignment
      if (isCustomAssignment) {
        await saveAssignmentResults();
      }
    }
  };

  const handleConfirmSubmit = async () => {
    setShowBookmarkConfirmModal(false);
    setShowResults(true);
    setShowFullResults(false); // Show feedback first, not full results
    
    // Save results to Firebase if this is a custom assignment
    if (isCustomAssignment) {
      await saveAssignmentResults();
    }
  };

  const saveAssignmentResults = async () => {
    if (!isCustomAssignment || !assignmentLinkId) return;
    
    try {

      // Get assignment link document
      const assignmentLinkDoc = await getDocs(query(collection(db, 'assignmentLinks'), where('encodedParam', '==', assignmentLinkId)));
      
      if (assignmentLinkDoc.empty) {
        console.warn('Assignment link not found in Firebase');
        return;
      }

      const linkDoc = assignmentLinkDoc.docs[0];
      const linkDocId = linkDoc.id;

      // Calculate results
      const questionResults = questions.map(q => ({
        questionId: q.id,
        studentAnswer: answers[q.id] || null,
        correctAnswer: q.correctAnswer,
        isCorrect: answers[q.id] === q.correctAnswer,
        unit: q.unit,
        unitName: q.unitName
      }));

      const totalQuestions = questions.length;
      const correctCount = questionResults.filter(r => r.isCorrect).length;
      const score = Math.round((correctCount / totalQuestions) * 100);

      // Save results
      await addDoc(collection(db, 'assignmentResults'), {
        assignmentLinkId: linkDocId,
        tutorId: linkDoc.data().tutorId,
        studentId: user?.uid || null,
        studentEmail: user?.email || null,
        questionResults: questionResults,
        totalQuestions: totalQuestions,
        correctCount: correctCount,
        incorrectCount: totalQuestions - correctCount,
        score: score,
        answers: answers,
        submittedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving assignment results to Firebase:', error);
    }
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

  // Function to scroll to a question (used by sidecar)
  const scrollToQuestion = (questionId: number) => {
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) return;
    
    setCurrentPage(questionIndex);
    setShowSidecar(false); // Close sidecar after navigating
    
    // Small delay to ensure page change happens first
    setTimeout(() => {
      const element = document.getElementById(`question-${questionId}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
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


  // Add effect to reset tools state when component unmounts/remounts
  useEffect(() => {
    // Don't reset calculator/drawing pad on mount - let user control it
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
      {/* Assessment Results Panel - Rendered outside exam container via portal */}
      {typeof window !== 'undefined' && showResults && !showFullResults && feedbackContainer && createPortal(
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto" style={{ top: '64px' }}>
          <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-4xl">
              {isCustomAssignment && !user ? (
                // Guest Result Card for Custom Assignments
                <div className="bg-white rounded-lg shadow-xl p-8">
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">
                      {customTitle ? customTitle : 'Your Results'}
                    </h1>
                    <div className="text-6xl font-black text-blue-600 mb-4">
                      {Math.round((questions.filter((q) => answers[q.id] === q.correctAnswer).length / questions.length) * 100)}%
                    </div>
                    <p className="text-gray-600 font-semibold">
                      {questions.filter((q) => answers[q.id] === q.correctAnswer).length} correct out of {questions.length}
                    </p>
                  </div>
                  
                  {/* Dojo Readiness Band */}
                  <div className="mb-8">
                    <DojoReadinessBand 
                      score={Math.round((questions.filter((q) => answers[q.id] === q.correctAnswer).length / questions.length) * 100)} 
                    />
                  </div>
                  
                  {/* Call to Action Button */}
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-xl transition-colors duration-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Claim Your Dojo Belt & Save Progress
                  </button>
                </div>
              ) : (
                <AssessmentResultsPanel 
                  totalQuestions={questions.length}
                  correctAnswers={questions.filter((q) => answers[q.id] === q.correctAnswer).length}
                  questions={questions}
                  answers={answers}
                  examType={examType}
                  onSeeFullResults={() => setShowFullResults(true)}
                  customTitle={customTitle}
                />
              )}
            </div>
          </div>
        </div>,
        feedbackContainer
      )}

      {/* Add the modals */}
      {showTutorial && (
        <ExamTutorialModal
          onClose={() => {
            setShowTutorial(false);
            if (typeof window !== 'undefined') {
              localStorage.setItem('hasSeenExamTutorial', 'true');
            }
          }}
        />
      )}

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
        onAuthSuccess={() => {
          setShowSignupModal(false);
          // After signup, the user object will be available and results can be saved
          // The results are already displayed, so the user can see them
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

      {/* Video Slide-Out Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-[45%] bg-white shadow-2xl z-40 border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
          showVideoModal && videoUrl ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {showVideoModal && videoUrl && (
          <div className="h-full flex flex-col p-6 relative">
            <div className="flex-1 overflow-hidden">
              <video 
                key={videoUrl}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full rounded-lg object-contain"
                src={videoUrl}
                preload="auto"
                onLoadedData={() => {
                  setIsVideoLoaded(true);
                  setIsVideoLoading(false);
                }}
                onError={(e) => {
                  console.error('Error loading video:', e);
                  console.error('Video URL:', videoUrl);
                  setIsVideoLoading(false);
                }}
                onLoadStart={() => {
                  console.log('Video loading started:', videoUrl);
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={() => {
                setShowVideoModal(false);
                setVideoUrl('');
              }}
              className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white p-3 rounded-l-xl border border-r-0 border-gray-200 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
              aria-label="Close video"
            >
              <ChevronsRight size={24} className="text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Feedback modal removed - can be re-added per-question if needed */}


      {/* Only show exam content if not showing results, or if showing full results */}
      {(!showResults || showFullResults) && (
        <div className={`flex w-full ${isCustomAssignment ? 'min-h-screen justify-center' : ''}`}>
          {/* Question Container (Left Side) */}
          <div 
            className={`transition-all duration-300 ease-in-out ${
              isCustomAssignment 
                ? 'p-8 max-w-4xl w-full' 
                : showVideoModal && videoUrl 
                  ? 'fixed left-0 top-20 w-[55%] h-[calc(100vh-5rem)] overflow-y-auto p-8' 
                  : 'fixed left-[50%] top-20 -translate-x-1/2 w-[1200px] h-[calc(100vh-5rem)] overflow-y-auto p-8'
            }`}
          >
            {!showResults ? (
              <>
              {/* Progress Bar - Mobile Only */}
              {!(showVideoModal && videoUrl) && (
              <div className="border-b border-gray-200 mb-6 lg:hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="font-bold">Progress Bar</span>
                  </div>
                  <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(20, minmax(0, 1fr))' }}>
                    {questions.map((q, index) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isBookmarked = bookmarkedQuestions.has(q.id);
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
                            setCurrentPage(index);
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
              )}

              {/* Single Question View with Split-Screen Layout */}
              {(() => {
                const question = questions[currentPage];
                if (!question) return null;
                
                const selectedAnswer = answers[question.id];
                const selectedIndex = selectedAnswer ? selectedAnswer.charCodeAt(0) - 65 : null;
                const hasVisualContent = question.image || question.tableData;
                
                return (
                  <div className="w-full">
                    {/* Question Info Header */}
                    {!(showVideoModal && videoUrl) && (
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg">
                          <span className="text-lg font-bold text-slate-700">{currentPage + 1}</span>
                        </div>
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
                        <div className="relative">
                          <button
                            ref={sidecarButtonRef}
                            onClick={() => setShowSidecar(!showSidecar)}
                            className="text-sm text-gray-600 hover:text-gray-900 hover:underline cursor-pointer transition-colors"
                          >
                            Question {currentPage + 1} of {questions.length}
                          </button>
                          {showSidecar && !(showVideoModal && videoUrl) && (
                            <div className="absolute left-0 top-full mt-2 z-50 mcq-sidecar-popup" style={{ width: '320px' }}>
                              <MCQSidecar
                                questions={questions}
                                answers={answers}
                                bookmarkedQuestions={bookmarkedQuestions}
                                onQuestionClick={scrollToQuestion}
                                onClose={() => setShowSidecar(false)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Slider Explainer Video Icon */}
                        {question.sliderExplainer && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Eye icon clicked, sliderExplainer:', question.sliderExplainer);
                              setVideoUrl(question.sliderExplainer!);
                              setShowVideoModal(true);
                            }}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            aria-label="View video explanation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {/* Timer temporarily hidden */}
                        {/* <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(timeRemaining)}</span>
                        </div> */}
                      </div>
                    </div>
                    )}

                    {/* Split-Screen Grid Container */}
                    <div className={`grid grid-cols-1 ${hasVisualContent && !isCustomAssignment && !(showVideoModal && videoUrl) ? 'lg:grid-cols-5' : 'lg:grid-cols-1'} gap-8`}>
                      {/* Left Column: Question Text & Options */}
                      <div className={`${hasVisualContent && !isCustomAssignment && !(showVideoModal && videoUrl) ? 'lg:col-span-4' : 'lg:col-span-1'}`}>
                        <div id={`question-${question.id}`} className={`bg-white p-6 md:p-8 ${
                          isCustomAssignment 
                            ? 'border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                            : 'rounded-lg shadow-md border border-gray-200'
                        }`}>
                          {/* Main Question Content */}
                          <div className="space-y-6">
                            {/* Question Text */}
                            <div className="flex items-start gap-3">
                              <p className="flex-1 text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800 max-h-48 overflow-y-auto pr-2">
                                {isCustomAssignment ? (
                                  <QuestionWithKeyTerms 
                                    questionText={question.question} 
                                    unit={question.unit} 
                                    subject={examType === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics'}
                                  />
                                ) : (
                                  question.question
                                )}
                              </p>
                              {/* Video Explanation Icon */}
                              {question.videoExplanation && typeof question.videoExplanation === 'string' && question.videoExplanation.trim() !== '' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setVideoUrl(question.videoExplanation!);
                                    setShowVideoModal(true);
                                  }}
                                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-colors"
                                  aria-label="View video explanation"
                                  title="Watch video explanation"
                                >
                                  <Play className="w-4 h-4 ml-0.5" />
                                </button>
                              )}
                            </div>

                            {/* Visual Content - Show below question text when video modal is open */}
                            {showVideoModal && videoUrl && hasVisualContent && !isCustomAssignment && (
                              <div className="space-y-4">
                                {question.image && (
                                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-center">
                                    <img 
                                      src={question.image.src}
                                      alt="Question diagram"
                                      className="w-full max-w-2xl h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                                      onClick={() => {
                                        setSelectedImage(question.image as StaticImageData);
                                        setShowImageModal(true);
                                      }}
                                    />
                                  </div>
                                )}
                                {question.tableData && (
                                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <div className="flex items-center gap-4">
                                      {question.tableData.playerNames && (
                                        <div className="flex items-center justify-center h-full w-16">
                                          <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                            {question.tableData.playerNames.row.split(' ')[0]}
                                            <br />
                                            {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                          </p>
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        {question.tableData.playerNames && (
                                          <p className="text-center font-bold text-lg text-gray-900 mb-2">
                                            {question.tableData.playerNames.column}
                                          </p>
                                        )}
                                        <table className="min-w-full border-collapse border border-black">
                                          <thead className="bg-white">
                                            <tr>
                                              {question.tableData.headers.map(header => (
                                                <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                                  {header}
                                                </th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            {question.tableData.rows.map((row, rowIndex) => (
                                              <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => {
                                                  const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
                                                  return (
                                                    <td 
                                                      key={cellIndex} 
                                                      className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold' : ''}`}
                                                    >
                                                      {cell}
                                                    </td>
                                                  );
                                                })}
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Visual Content - Show below question text for custom assignments */}
                            {isCustomAssignment && question.image && (
                              <div className="bg-white border-2 border-gray-300 rounded-xl shadow-sm p-4 flex justify-center">
                                <img
                                  src={question.image.src}
                                  alt={'alt' in question.image && question.image.alt ? question.image.alt : "Question diagram"}
                                  className="w-full max-w-3xl h-auto object-contain transition-all rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:opacity-90"
                                  onClick={() => {
                                    if (question.image) {
                                      setSelectedImage(question.image as StaticImageData);
                                      setShowImageModal(true);
                                    }
                                  }}
                                />
                              </div>
                            )}

                            {isCustomAssignment && question.tableData && (
                              <div className="bg-white border-2 border-gray-300 rounded-xl shadow-sm p-4">
                                <div className="flex items-center gap-4">
                                  {question.tableData.playerNames && (
                                    <div className="flex items-center justify-center h-full w-16">
                                      <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                        {question.tableData.playerNames.row.split(' ')[0]}
                                        <br />
                                        {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    {question.tableData.playerNames && (
                                      <p className="text-center font-bold text-lg text-gray-900 mb-2">
                                        {question.tableData.playerNames.column}
                                      </p>
                                    )}
                                    <table className="min-w-full border-collapse border border-black">
                                      <thead className="bg-white">
                                        <tr>
                                          {question.tableData.headers.map(header => (
                                            <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {question.tableData.rows.map((row, rowIndex) => (
                                          <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => {
                                              const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
                                              return (
                                                <td 
                                                  key={cellIndex} 
                                                  className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold' : ''}`}
                                                >
                                                  {cell}
                                                </td>
                                              );
                                            })}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Answer Options */}
                            {question.optionTableHeaders ? (
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="w-12 p-2"></th>
                                      {question.optionTableHeaders.map((header, idx) => (
                                        <th key={idx} className="px-3 py-2 text-center font-semibold text-sm text-gray-700 border-b-2 border-gray-300">
                                          {header}
                                        </th>
                                      ))}
                                      {!showResults && <th className="w-12 p-2"></th>}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {question.options.map((option, index) => {
                                      const isStruckThrough = strikethroughState[question.id]?.includes(index);
                                      // Only show as selected if NOT struck through (strikethrough takes priority)
                                      const isSelected = !isStruckThrough && selectedIndex === index;
                                      const optionValues = option.split(' | ');
                                      return (
                                        <tr
                                          key={index}
                                          onClick={() => handleAnswer(question.id, index)}
                                          className={`transition-all duration-200 group ${
                                            isStruckThrough
                                              ? 'bg-gray-100 cursor-default'
                                              : isSelected 
                                                ? 'bg-blue-100 hover:bg-blue-100 cursor-pointer border-l-4 border-blue-500' 
                                                : 'bg-white hover:bg-slate-50 cursor-pointer'
                                          }`}
                                        >
                                          <td className="p-2">
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                                              isStruckThrough ? 'bg-gray-200 border-gray-300 text-gray-400' : isSelected ? 'bg-blue-600 border-blue-700 text-white shadow-md' : 'bg-white border-slate-300 text-slate-600'
                                            }`}>
                                              {String.fromCharCode(65 + index)}
                                            </div>
                                          </td>
                                          {optionValues.map((value, valIdx) => (
                                            <td key={valIdx} className={`px-3 py-2 text-center text-sm border-b border-gray-200 ${isStruckThrough ? 'text-gray-500 line-through' : isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                                              {value.trim()}
                                            </td>
                                          ))}
                                          {!showResults && (
                                            <td className="p-2">
                                              <div
                                                role="button"
                                                onClick={(e) => { e.stopPropagation(); handleStrikethroughToggle(question.id, index); }}
                                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                                  isStruckThrough ? 'bg-slate-200 text-slate-600' : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                                }`}
                                                aria-label={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                                              >
                                                <Strikethrough className="w-5 h-5" />
                                              </div>
                                            </td>
                                          )}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {question.options.map((option, index) => {
                                  const isStruckThrough = strikethroughState[question.id]?.includes(index);
                                  // Only show as selected if NOT struck through (strikethrough takes priority)
                                  const isSelected = !isStruckThrough && selectedIndex !== null && selectedIndex === index;
                                  const correctAnswerIndex = question.correctAnswer ? question.correctAnswer.charCodeAt(0) - 65 : -1;
                                  const isCorrect = index === correctAnswerIndex;
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => handleAnswer(question.id, index)}
                                      disabled={showResults}
                                      className={`w-full text-left p-3 text-sm font-medium transition-all duration-150 flex items-center gap-3 ${
                                        isCustomAssignment 
                                          ? 'border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' 
                                          : 'rounded-lg border'
                                      } ${
                                        showResults ? 
                                          (isCorrect ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' : 
                                          isSelected ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' : 
                                          'bg-transparent text-gray-900 border-gray-200 cursor-default') 
                                        : isStruckThrough ?
                                          isCustomAssignment 
                                            ? 'bg-gray-100 border-black opacity-60 cursor-pointer' 
                                            : 'bg-gray-100 border-gray-300 opacity-60 cursor-pointer'
                                        : isSelected ? 
                                          isCustomAssignment
                                            ? 'bg-blue-100 border-2 border-blue-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                            : 'bg-blue-100 border-2 border-blue-500 shadow-md'
                                        : 
                                          isCustomAssignment
                                            ? 'bg-white hover:bg-gray-50 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                            : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                      }`}
                                    >
                                      {/* Letter bubble */}
                                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium flex-shrink-0 ${
                                        isCustomAssignment ? 'border-2 border-black' : 'border'
                                      } ${
                                        showResults ? (isCorrect ? 'bg-green-100 border-green-300 text-green-700' : isSelected ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : isStruckThrough ? 'bg-gray-200 border-gray-300 text-gray-400' : isSelected ? 'bg-blue-500 border-blue-600 text-white font-semibold' : 'bg-white border-gray-300 text-gray-600'
                                      }`}> 
                                        {String.fromCharCode(65 + index)}
                                      </span>
                                      {/* Option Text */}
                                      <span className={`flex-1 text-sm ${isStruckThrough ? 'line-through text-gray-400' : ''} ${showResults ? 'text-gray-800' : isSelected ? 'text-gray-900' : 'text-gray-900'}`}>{option}</span>
                                      {/* Strikethrough Button - Only show when not submitted */}
                                      {!showResults && (
                                        <div
                                          role="button"
                                          onClick={(e) => { e.stopPropagation(); handleStrikethroughToggle(question.id, index); }}
                                          className={`flex-shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${
                                            isStruckThrough ? 'bg-slate-200 text-slate-600' : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                          }`}
                                          aria-label={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                                        >
                                          <Strikethrough className="w-5 h-5" />
                                        </div>
                                      )}
                                      {/* Feedback Icon */}
                                      {showResults && (
                                        <div className="flex-shrink-0">
                                          {isCorrect
                                            ? <Check className="w-5 h-5 text-green-500" />
                                            : isSelected
                                              ? <X className="w-5 h-5 text-red-500" />
                                              : null
                                          }
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Navigation Controls */}
                        {!(showVideoModal && videoUrl) && (
                        <div className="pt-4 mt-4 border-t border-gray-200">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                              disabled={currentPage === 0}
                              className={`flex-1 px-6 py-3 text-base rounded-lg font-semibold transition-colors ${
                                currentPage === 0
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                            >
                              Previous
                            </button>
                            
                            <button
                              onClick={() => setCurrentPage(prev => Math.min(questions.length - 1, prev + 1))}
                              disabled={currentPage >= questions.length - 1}
                              className={`flex-1 px-6 py-3 text-base rounded-lg font-semibold transition-colors ${
                                currentPage >= questions.length - 1
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                            >
                              Next
                            </button>
                          </div>
                          
                          {currentPage === questions.length - 1 && (
                            <div className="mt-4">
                              <button
                                onClick={handleSubmitClick}
                                className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-lg transition-colors duration-200"
                              >
                                Submit Exam
                              </button>
                            </div>
                          )}
                        </div>
                        )}
                      </div>

                      {/* Right Column: Visual Content (Image/Table) - Only show when video modal is NOT open */}
                      {hasVisualContent && !isCustomAssignment && !(showVideoModal && videoUrl) && (
                        <div className="lg:col-span-1">
                          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sticky top-4">
                            {question.image && (
                              <div className="flex justify-center">
                                <img 
                                  src={question.image.src}
                                  alt="Question diagram"
                                  className="w-full h-auto max-h-[500px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                                  onClick={() => {
                                    setSelectedImage(question.image as StaticImageData);
                                    setShowImageModal(true);
                                  }}
                                />
                              </div>
                            )}
                            {question.tableData && (
                              <div className="flex justify-center">
                                <div className="flex items-center gap-4">
                                  {question.tableData.playerNames && (
                                    <div className="flex items-center justify-center h-full w-16">
                                      <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                        {question.tableData.playerNames.row.split(' ')[0]}
                                        <br />
                                        {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    {question.tableData.playerNames && (
                                      <p className="text-center font-bold text-lg text-gray-900 mb-2">
                                        {question.tableData.playerNames.column}
                                      </p>
                                    )}
                                    <table className="min-w-full border-collapse border border-black">
                                      <thead className="bg-white">
                                        <tr>
                                          {question.tableData.headers.map(header => (
                                            <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white">
                                        {question.tableData.rows.map((row, rowIndex) => (
                                          <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => {
                                              const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
                                              return (
                                                <td 
                                                  key={cellIndex} 
                                                  className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold' : ''}`}
                                                >
                                                  {cell}
                                                </td>
                                              );
                                            })}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              </>
            ) : (
              <div className="space-y-8">
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
                      <div className="flex items-start gap-3">
                        <p className="flex-1 text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800">
                          {isCustomAssignment ? (
                            <QuestionWithKeyTerms 
                              questionText={question.question} 
                              unit={question.unit} 
                              subject={examType === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics'}
                            />
                          ) : (
                            question.question
                          )}
                        </p>
                        {/* Video Explanation Icon */}
                        {question.videoExplanation && typeof question.videoExplanation === 'string' && question.videoExplanation.trim() !== '' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoUrl(question.videoExplanation!);
                              setShowVideoModal(true);
                            }}
                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-colors"
                            aria-label="View video explanation"
                            title="Watch video explanation"
                          >
                            <Play className="w-4 h-4 ml-0.5" />
                          </button>
                        )}
                      </div>
                    
                      {/* Table Data */}
                      {question.tableData && (
                        <div className="my-8 flex justify-center">
                        <div className="flex items-center gap-4">
                          {question.tableData.playerNames && (
                            <div className="flex items-center justify-center h-full w-16">
                              <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                                {question.tableData.playerNames.row.split(' ')[0]}
                                <br />
                                {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                              </p>
                            </div>
                          )}
                          <div className="flex-1">
                            {question.tableData.playerNames && (
                              <p className="text-center font-bold text-lg text-gray-900 mb-2">
                                {question.tableData.playerNames.column}
                              </p>
                            )}
                            <table className="min-w-full border-collapse border border-black">
                              <thead className="bg-white">
                                <tr>
                                  {question.tableData.headers.map(header => (
                                    <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {question.tableData.rows.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => {
                                      const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
                                      return (
                                        <td 
                                          key={cellIndex} 
                                          className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold' : ''}`}
                                        >
                                          {cell}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Add image display */}
                      {question.image && !isCustomAssignment && (
                        <div className="my-4">
                          <img 
                            src={question.image.src}
                            alt="Question"
                            className="max-h-[300px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                            onClick={() => {
                              setSelectedImage(question.image as StaticImageData);
                              setShowImageModal(true);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Answer Options */}
                    <div className="p-4 space-y-3">
                    {question.optionTableHeaders ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="w-12 p-2"></th>
                              {question.optionTableHeaders.map((header, idx) => (
                                <th key={idx} className="px-4 py-3 text-center font-semibold text-sm text-gray-700 border-b-2 border-gray-300">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {question.options.map((option, idx) => {
                              const letter = String.fromCharCode(65 + idx);
                              const isSelected = selectedAnswer === letter;
                              const isCorrectAnswer = question.correctAnswer === letter;
                              const optionValues = option.split(' | ');
                              
                              return (
                                <tr
                                  key={idx}
                                  className={`cursor-default transition-all duration-200 ${
                                    isCorrectAnswer ? 'bg-green-50' :
                                    (isSelected && !isCorrectAnswer) ? 'bg-red-50' :
                                    'bg-white'
                                  }`}
                                >
                                  <td className="p-3">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm ${
                                      isCorrectAnswer ? 'bg-green-600 border-green-600 text-white' :
                                      (isSelected && !isCorrectAnswer) ? 'bg-red-600 border-red-600 text-white' :
                                      'bg-white border-gray-300 text-gray-600'
                                    }`}>
                                      {letter}
                                    </div>
                                  </td>
                                  {optionValues.map((value, valIdx) => (
                                    <td key={valIdx} className={`px-4 py-3 text-center text-sm border-b border-gray-200 ${
                                      isCorrectAnswer ? 'text-green-900' :
                                      (isSelected && !isCorrectAnswer) ? 'text-red-900' :
                                      'text-gray-700'
                                    }`}>
                                      {value.trim()}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      question.options.map((option, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isSelected = selectedAnswer === letter;
                        const isCorrectAnswer = question.correctAnswer === letter;
                        
                        return (
                          <div
                            key={idx}
                            className={`w-full text-left p-3 rounded-lg text-sm font-medium border flex items-center gap-3 cursor-default ${
                              isCorrectAnswer ? 'bg-green-50 text-gray-900 shadow-sm border-green-200' :
                              (isSelected && !isCorrectAnswer) ? 'bg-red-50 text-gray-900 shadow-sm border-red-200' :
                              'bg-transparent text-gray-900 border-gray-200'
                            }`}
                          >
                            {/* Letter bubble */}
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${
                              isCorrectAnswer ? 'bg-green-100 border-green-300 text-green-700' :
                              (isSelected && !isCorrectAnswer) ? 'bg-red-100 border-red-300 text-red-700' :
                              'bg-white border-gray-300 text-gray-500'
                            }`}>
                              {letter}
                            </span>
                            {/* Option Text */}
                            <span className="flex-1 text-sm text-gray-800">{option}</span>
                            {/* Feedback Icon */}
                            {(isCorrectAnswer || (isSelected && !isCorrectAnswer)) && (
                              <div className="flex-shrink-0">
                                {isCorrectAnswer ? (
                                  <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                  <X className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                    </div>

                    {/* Explanation - Comp Check Style */}
                    {question.explanation && selectedAnswer && (
                      <div className="p-4 border-t border-gray-100">
                        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-sm text-gray-800 leading-relaxed">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tool Buttons */}
      {!showResults && (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
          {/* Calculator Toggle Button */}
          {!showCalculator && (
            <button
              onClick={() => setShowCalculator(true)}
              className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
              aria-label="Open calculator"
            >
              <Calculator className="w-6 h-6 text-black" />
            </button>
          )}

          {/* Whiteboard Toggle Button */}
          {!showDrawingPad && (
            <button
              onClick={() => setShowDrawingPad(true)}
              className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
              aria-label="Open whiteboard"
            >
              <Pen className="w-6 h-6 text-black" />
            </button>
          )}
        </div>
      )}

      {/* Exam Calculator */}
      {showCalculator && !showResults && (
        <ExamCalculator onClose={() => setShowCalculator(false)} />
      )}

      {/* Exam Whiteboard */}
      {showDrawingPad && !showResults && (
        <ExamWhiteboard onClose={() => setShowDrawingPad(false)} />
      )}

      {/* Bookmark Confirmation Modal */}
      {showBookmarkConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Bookmark className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Bookmarked Questions
              </h3>
            </div>
            <p className="text-gray-700 mb-6">
              You have <span className="font-semibold text-gray-900">{bookmarkedQuestions.size}</span> question{bookmarkedQuestions.size !== 1 ? 's' : ''} bookmarked for review.
            </p>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit the exam anyway?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBookmarkConfirmModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal for Custom Assignments */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border-4 border-black">
            <div className="flex items-center gap-3 mb-4">
              <X className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-black text-gray-900">
                Exit assignment?
              </h3>
            </div>
            <p className="text-gray-700 mb-6 font-semibold">
              Progress will not be saved.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  window.location.href = '/';
                }}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 