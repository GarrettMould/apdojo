'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, X, Clock, Maximize2, Minimize2, Calculator, Pen, Eraser, Expand, Trash2, Circle, CircleDot, Check, Lock } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from './AuthModals';

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

export function FullExam({ questionBank, examType, questionType, examNumber }: FullExamProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState<{[key: number]: boolean}>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  
  // Remove the shuffling logic and just use the pre-shuffled questions
  const questions = questionBank.questions;

  // Add timer state (in seconds)
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  // Add timer visibility state
  const [showTimer, setShowTimer] = useState(false);
  const [isLargeTimer, setIsLargeTimer] = useState(false);

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

  // Add helper function to format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const { user } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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

  // Add calculator functions
  const handleNumber = (num: string) => {
    if (newNumber) {
      setCalculatorDisplay(num);
      setNewNumber(false);
    } else {
      setCalculatorDisplay(calculatorDisplay === '0' ? num : calculatorDisplay + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(calculatorDisplay);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setCalculatorDisplay(String(result));
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || !operation) return;
    
    const current = parseFloat(calculatorDisplay);
    const result = calculate(previousValue, current, operation);
    
    setCalculatorDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setCalculatorDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  // Add decimal point handler
  const handleDecimal = () => {
    if (newNumber) {
      setCalculatorDisplay('0.');
      setNewNumber(false);
    } else if (!calculatorDisplay.includes('.')) {
      setCalculatorDisplay(calculatorDisplay + '.');
    }
  };

  // Modify the calculator display to show operation
  const getDisplayText = () => {
    const formatNumber = (num: string) => {
      const number = parseFloat(num);
      const roundedNumber = Math.round(number * 10) / 10; // Round to 1 decimal place
      const [integerPart, decimalPart] = roundedNumber.toString().split('.');
      const formattedInteger = Number(integerPart).toLocaleString();
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    if (previousValue !== null && operation) {
      return `${formatNumber(previousValue.toString())} ${operation} ${newNumber ? '' : formatNumber(calculatorDisplay)}`;
    }
    return formatNumber(calculatorDisplay);
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
    setCurrentTrackPage(Math.floor(index / 20));
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

  // Modified helper function to render question indicators
  const renderQuestionIndicators = () => {
    const startIndex = currentTrackPage * 20;
    const endIndex = startIndex + 20;

    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="flex gap-2.5 p-4 bg-white rounded-xl shadow-sm border border-gray-100 justify-between">
          {Array.from({ length: 20 }, (_, i) => {
            const questionIndex = startIndex + i;
            const question = questions[questionIndex];
            const isBookmarked = question && bookmarkedQuestions.has(question.id);
            
            return (
              <div
                key={questionIndex}
                className={`
                  w-[32px] h-[32px] flex items-center justify-center rounded-lg 
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
      </div>
    );
  };

  // Add effect to reset tools state when component unmounts/remounts
  useEffect(() => {
    setShowTimer(false);
    setShowCalculator(false);
    setShowDrawingPad(false);
    
    // Cleanup function will run when component unmounts
    return () => {
      setShowTimer(false);
      setShowCalculator(false);
      setShowDrawingPad(false);
    };
  }, []); // Empty dependency array means this only runs on mount/unmount

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

  // Add timer effect to start countdown when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setShowResults(true); // Automatically show results when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Show timer by default
    setShowTimer(true);

    // Cleanup function
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs once on mount

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

      {/* Question track outside main container */}
      {!showResults && renderQuestionIndicators()}
      
      {/* Main exam container */}
      <div className="w-full max-w-4xl mx-auto p-6 border rounded-lg shadow-sm relative">
        {showTimer && (
          <div className={`fixed right-8 ${
            showDrawingPad ? 'top-8' : 'top-1/2 -translate-y-1/2'
          } transform ${
            isLargeTimer ? '-translate-x-1/2' : ''
          } bg-white rounded-lg shadow-md border ${
            isLargeTimer ? 'scale-[2]' : ''
          } ${timeLeft < 540 ? 'bg-red-100' : ''} transition-all duration-300`}>
            <div className="absolute top-2 right-2 left-2 flex justify-between items-center">
              <button 
                onClick={() => setIsLargeTimer(!isLargeTimer)}
                className="text-gray-400 hover:text-gray-600 flex items-center"
              >
                {isLargeTimer ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button 
                onClick={() => {
                  setShowTimer(false);
                  setIsLargeTimer(false);
                }}
                className="text-gray-400 hover:text-gray-600 flex items-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 pt-8">
              <div className="text-xl font-bold text-gray-700 text-center">Time Left</div>
              <div className="text-2xl font-mono text-center">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        )}

        {!showTimer && (
          <button
            onClick={() => setShowTimer(true)}
            className={`fixed right-8 ${
              showDrawingPad ? 'top-8' : 'top-1/2 -translate-y-1/2'
            } transform bg-white p-3 rounded-lg shadow-md border hover:bg-gray-50 transition-all duration-300`}
          >
            <Clock className="w-6 h-6" />
          </button>
        )}

        {showCalculator && (
          <div className="fixed left-8 top-1/2 transform -translate-y-1/2 scale-125 bg-white rounded-lg shadow-md border w-56">
            <div className="absolute top-2 right-2 left-2 flex justify-end items-center">
              <button 
                onClick={() => setShowCalculator(false)}
                className="text-gray-400 hover:text-gray-600 flex items-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 pt-8">
              <div className="bg-gray-100 p-3 rounded mb-3 text-right font-mono text-2xl">
                {getDisplayText()}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[['C', '', '', ''],
                  ['7', '8', '9', '÷'],
                  ['4', '5', '6', '×'],
                  ['1', '2', '3', '-'],
                  ['0', '.', '=', '+']].map((row, i) => (
                  row.map((btn, j) => (
                    <button
                      key={`${i}-${j}`}
                      onClick={() => {
                        if (btn === 'C') handleClear();
                        else if (btn === '=') handleEquals();
                        else if (btn === '.') handleDecimal();
                        else if ('0123456789'.includes(btn)) handleNumber(btn);
                        else if (btn !== '') handleOperation(btn);
                      }}
                      className={`p-2 text-center rounded ${
                        btn === ''
                          ? 'invisible'
                          : btn === 'C'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : '0123456789.'.includes(btn)
                          ? 'bg-white hover:bg-gray-100'
                          : btn === '='
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {btn}
                    </button>
                  ))
                ))}
              </div>
            </div>
          </div>
        )}

        {!showCalculator && (
          <button
            onClick={() => setShowCalculator(true)}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-lg shadow-md border hover:bg-gray-50"
          >
            <Calculator className="w-6 h-6" />
          </button>
        )}

        {showDrawingPad && (
          <div className={`fixed ${
            isLargeDrawingPad ? 'right-8' : 'right-8'
          } bottom-8 bg-white rounded-lg shadow-md border ${
            isLargeDrawingPad ? 'w-[600px] h-[400px]' : 'w-[300px] h-[200px]'
          } z-50`}>
            <div className="absolute top-2 right-2 left-2 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="relative group">
                  <button
                    onClick={() => setIsEraser(false)}
                    className={`p-1 rounded ${!isEraser ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  >
                    <Pen className="w-4 h-4 fill-current" style={{ color: penColor }} />
                  </button>
                  <div className="absolute left-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100">
                    <div className="pt-2">
                      <div className="bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-2">
                        {['#000000', '#FF0000', '#0000FF', '#008000'].map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setPenColor(color);
                              setIsEraser(false);
                            }}
                            className={`w-6 h-6 rounded-full border-2 border-gray-900 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 ${
                              penColor === color && !isEraser ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => setIsEraser(true)}
                    className={`p-1 rounded ${isEraser ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                  {isEraser && (
                    <div className="absolute left-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100">
                      <div className="pt-2">
                        <div className="bg-white rounded-lg shadow-lg border p-2">
                          <input
                            type="range"
                            min="10"
                            max="50"
                            value={eraserSize}
                            onChange={(e) => setEraserSize(Number(e.target.value))}
                            className="w-32"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={clearCanvas}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLargeDrawingPad(!isLargeDrawingPad)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  {isLargeDrawingPad ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Expand className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => toggleDrawingPad(false)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              width={isLargeDrawingPad ? 600 : 300}
              height={isLargeDrawingPad ? 400 : 200}
              className="bg-white mt-10"
              style={{ cursor: isEraser ? getEraserCursor() : getPenCursor(penColor) }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        )}

        {!showDrawingPad && (
          <button
            onClick={() => toggleDrawingPad(true)}
            className="fixed right-8 bottom-8 bg-white p-3 rounded-lg shadow-md border hover:bg-gray-50"
          >
            <Pen className="w-6 h-6" />
          </button>
        )}

        {!showResults ? (
          <>
            <div className="mb-8 border rounded-lg shadow-sm relative bg-white">
              {/* Question header with unit and bookmark - fixed at top */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">
                      Question {currentQuestionIndex + 1} of 60
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      Unit {questions[currentQuestionIndex].unit}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(questions[currentQuestionIndex].id)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {bookmarkedQuestions.has(questions[currentQuestionIndex].id) ? (
                      <BookmarkX className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Question content with adjusted height and scrolling */}
              <div className="h-[425px] overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  <p className="text-lg font-medium">{questions[currentQuestionIndex].question}</p>
                  
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
                  
                  <div className="space-y-3 pb-2">
                    {questions[currentQuestionIndex].options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        onClick={() => handleAnswer(questions[currentQuestionIndex].id, optIndex)}
                        className={`
                          p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors
                          ${answers[questions[currentQuestionIndex].id] === String.fromCharCode(65 + optIndex) 
                            ? 'border-blue-500 bg-blue-50 hover:bg-blue-50' 
                            : 'border-gray-200'}
                        `}
                      >
                        <span className="mr-2">{String.fromCharCode(97 + optIndex)})</span>
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation buttons - fixed at bottom */}
              <div className="p-6 border-t bg-white">
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
                    disabled={currentQuestionIndex === questions.length - 1}
                    variant="outline"
                    className="w-28"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Results</h2>
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-semibold text-lg">
                  Score: {Math.round(calculateScore())}%
                </div>
                <div className="text-gray-500">
                  {questions.filter((q) => answers[q.id] === q.correctAnswer).length} correct out of {questions.length}
                </div>
              </div>
            </div>
            
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
                    <p className="text-lg font-medium text-gray-900">{question.question}</p>
                    
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