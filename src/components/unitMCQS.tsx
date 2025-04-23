'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { Unit } from '@/data/cheatSheets';
import { Check, X, Brain, FileText, ChevronDown, Triangle, Loader2, Play, RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import dojoIcon from "../../public/images/dojoIcon.png";

// Type definition consistent with the parent page
interface AnsweredQuestionState {
  selectedLetter: string;
  isCorrect: boolean;
}

interface UnitMCQsProps {
  currentUnit: number;
  currentQuestionIndex: number;
  isLoggedIn: boolean;
  onAnswer: (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => void; 
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onQuestionSelect: (index: number) => void;
  onUnitChange: (unitId: number) => void;
  answeredQuestions: Record<number, AnsweredQuestionState>; 
  units: Unit[];
  dojoProgress: number;
  correctStreak: number;
  isWeakestUnitsMode: boolean;
  totalQuestions: number;
  unitName: string;
  questions: QuestionType[];
  subject: 'macro' | 'micro';
  practiceUnitIds: number[];
}

interface QuestionCardProps {
  question: QuestionType;
  currentIndex: number;

  onAnswerSelect: (questionId: number, answerLetter: string, answerText: string, lessonIDS: string[]) => void;
  initialSelectedLetter?: string; 
  isAnswered: boolean;
  aiExplanation?: string;
  isLoadingAI: boolean;
  isLoggedIn: boolean;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  dojoProgress: number;
  correctStreak: number;
  totalQuestions: number;
  highlightedIndex: number | null;
}

const QuestionCard = ({ 
  question, 
  currentIndex,
  totalQuestions,
  onAnswerSelect,
  initialSelectedLetter, 
  isAnswered,
  aiExplanation,
  isLoadingAI,
  isLoggedIn,
  signup,
  login,
  dojoProgress,
  correctStreak,
  totalQuestions: cardTotalQuestions,
  highlightedIndex
}: QuestionCardProps) => {
  const letterToIndex = (letter?: string): number | null => {
    if (!letter) return null;
    const index = letter.charCodeAt(0) - 65;
    return index >= 0 && index < question.options.length ? index : null;
  };

  const initialSelectedIndex = letterToIndex(initialSelectedLetter);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(initialSelectedIndex);
  const [isSubmitted, setIsSubmitted] = useState(isAnswered);

  // --- State for Overlay --- 
  const [overlayMode, setOverlayMode] = useState<'signup' | 'login'>('signup');
  
  // Signup Form State
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Password validation states (used by signup form)
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Add state for password requirement visibility
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);

  // Effect to sync internal state and reset forms/validation/mode
  useEffect(() => {
    const currentSelectedIndex = letterToIndex(initialSelectedLetter);
    setSelectedAnswerIndex(currentSelectedIndex);
    setIsSubmitted(isAnswered);
    
    // Reset common overlay state
    setOverlayMode('signup'); // Default to signup when question changes

    // Reset signup form
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword(''); 
    setSignupError(null);
    setSignupLoading(false);
    setHasMinLength(false);
    setHasUpperCase(false);
    setHasLowerCase(false);
    setHasNumber(false);
    setPasswordsMatch(false);

    // Reset login form
    setLoginEmail('');
    setLoginPassword('');
    setLoginError(null);
    setLoginLoading(false);

    setShowPasswordReqs(false);
  }, [question.id, initialSelectedLetter, isAnswered]);

  // Effect for password validation (signup only)
  useEffect(() => {
    if (overlayMode === 'signup') {
      setHasMinLength(signupPassword.length >= 8);
      setHasUpperCase(/[A-Z]/.test(signupPassword));
      setHasLowerCase(/[a-z]/.test(signupPassword));
      setHasNumber(/[0-9]/.test(signupPassword));
      setPasswordsMatch(signupPassword === signupConfirmPassword && signupPassword !== '');
    }
  }, [signupPassword, signupConfirmPassword, overlayMode]);

  const isValidSignupPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && passwordsMatch;

  const correctAnswerIndex = letterToIndex(question.correctAnswer);

  const handleAnswerSelect = (index: number) => {
    if (!isLoggedIn && currentIndex >= 2) return;
    if (isSubmitted) return;
    setSelectedAnswerIndex(index);
    setIsSubmitted(true);
    onAnswerSelect(
      question.id,
      String.fromCharCode(65 + index),
      question.options[index],
      question.lessonIDS
    );
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    if (!isValidSignupPassword) {
      setSignupError('Please ensure all password requirements are met.');
      return;
    }
    setSignupLoading(true);
    try {
      await signup(signupEmail, signupPassword);
      // Success will trigger auth context update and re-render
    } catch (err: any) {
      console.error("Signup failed:", err);
      // Map Firebase errors to user-friendly messages
      switch (err.code) {
        case 'auth/invalid-email':
          setSignupError('Please enter a valid email address');
          break;
        case 'auth/email-already-in-use':
          setSignupError('An account already exists with this email');
          break;
        case 'auth/weak-password':
          setSignupError('Password is too weak. Please choose a stronger one.');
          break;
        default:
          setSignupError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
      // Success will trigger auth context update and re-render
    } catch (err: any) {
      console.error("Login failed:", err);
      // Map Firebase errors to user-friendly messages
      switch (err.code) {
        case 'auth/invalid-email':
          setLoginError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
        case 'auth/invalid-credential': // Catch newer Firebase error code
          setLoginError('No account found with this email or password.');
          break;
        case 'auth/wrong-password':
          setLoginError('Incorrect password. Please try again.');
          break;
        default:
          setLoginError(err.message || "Failed to log in. Please try again.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const shouldBlur = !isLoggedIn && currentIndex >= 2;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 relative">
      {/* Overlay: Renders Signup or Login Form */}
      {shouldBlur && (
        <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-10 flex items-center justify-center p-4 rounded-lg">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 max-w-md w-full">
            
            {overlayMode === 'signup' ? (
              // --- Signup Form --- 
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-800 mb-5">
                  Unlock <span className="text-blue-600">AP Dojo</span> MCQs & Other Free Study Resources
                </h3>
                <form onSubmit={handleSignupSubmit} className="space-y-3">
                  <div className="rounded-md shadow-sm -space-y-px">
                    <input 
                      type="email"
                      placeholder="Email Address"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                    <input 
                      type="password"
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      onFocus={() => setShowPasswordReqs(true)}
                      required
                      className="appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                    <input 
                      type="password"
                      placeholder="Confirm Password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      onFocus={() => setShowPasswordReqs(true)} 
                      required
                      className="appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  {showPasswordReqs && (
                    <div className="text-xs text-left space-y-1 pt-1">
                      <p className={`transition-colors ${hasMinLength ? "text-green-600" : "text-gray-500"}`}>{hasMinLength ? '✓' : '•'} At least 8 characters</p>
                      <p className={`transition-colors ${hasUpperCase ? "text-green-600" : "text-gray-500"}`}>{hasUpperCase ? '✓' : '•'} At least one uppercase letter</p>
                      <p className={`transition-colors ${hasLowerCase ? "text-green-600" : "text-gray-500"}`}>{hasLowerCase ? '✓' : '•'} At least one lowercase letter</p>
                      <p className={`transition-colors ${hasNumber ? "text-green-600" : "text-gray-500"}`}>{hasNumber ? '✓' : '•'} At least one number</p>
                      <p className={`transition-colors ${passwordsMatch ? "text-green-600" : "text-gray-500"}`}>{passwordsMatch ? '✓' : '•'} Passwords match</p>
                    </div>
                  )}
                  {signupError && <p className="text-red-500 text-sm text-left pt-1">{signupError}</p>}
                  <button type="submit" disabled={signupLoading || !isValidSignupPassword} className="w-full px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                    {signupLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign up
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <button onClick={() => setOverlayMode('login')} className="text-sm text-blue-600 hover:underline focus:outline-none">
                    Already have an account? Login
                  </button>
                </div>
              </div>
            ) : (
              // --- Login Form ---
              <div className="text-center">
                 <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-800 mb-5">
                   Login to <span className="text-blue-600">Unlock Resources</span>
                 </h3>
                 <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Input Group Wrapper for Login */}
                    <div className="rounded-md shadow-sm -space-y-px">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        // Grouped input styles for login email
                        className="appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        // Grouped input styles for login password
                        className="appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                    {loginError && <p className="text-red-500 text-sm text-left pt-1">{loginError}</p>} {/* Adjusted error spacing */}
                    <button type="submit" disabled={loginLoading} className="w-full px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                      {loginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Login
                    </button>
                 </form>
                 <div className="mt-4 text-center">
                   <button onClick={() => setOverlayMode('signup')} className="text-sm text-blue-600 hover:underline focus:outline-none">
                     Don't have an account? Sign Up Free
                   </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Question Content */}
      <div className={`space-y-6 ${shouldBlur ? 'blur-sm' : ''}`}>
        {shouldBlur ? (
          // --- Placeholder for Blurred Content ---
          <div className="min-h-[500px]"></div>
        ) : (
          // --- Actual Question Content ---
          <>
            {/* Question Text */}
            <p className="text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800">
              {question.question}
            </p>

            {/* --- ADDED: Question Image Display --- */}
            {question.image && (
              <div className="my-4 rounded-lg overflow-hidden border border-gray-200"> { /* Added margin, rounded corners, border */ }
                {/* Using standard img tag assuming image prop holds a URL string for now */}
                {/* If image is StaticImageData, might need Next <Image> component */}
                <img
                  src={typeof question.image === 'string' ? question.image : (question.image as any).src} // Attempt to handle both string and object cases
                  alt={question.unitName || 'Question related image'} // Added fallback alt text
                  className="max-h-60 w-auto mx-auto object-contain" // Limit height, center, maintain aspect ratio
                />
              </div>
            )}
            {/* --- End Image Display --- */}

            {/* Conditional Display: Explanation OR Answer Options */}
            {isSubmitted && aiExplanation ? (
              // --- Display Explanation Mode ---
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                {/* Correct Answer Summary */}
                 <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Correct Answer</h4>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-green-200 text-green-600 font-medium">
                      {question.correctAnswer}
                    </span>
                    <span className="font-medium text-gray-900">
                      {question.options[correctAnswerIndex ?? 0]}
                    </span>
                  </div>
                </div>
                {/* Explanation Box */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                  <p className="text-gray-900">{aiExplanation}</p>
                </div>
              </div>
            ) : (
              // --- Display Answer Options Mode ---
              <>
                {/* Answer Options */}
                <div className="space-y-3">
                  {question.options.map((option, optIndex) => {
                     const isHighlighted = !isSubmitted && highlightedIndex === optIndex;
                     return (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerSelect(optIndex)}
                          disabled={isSubmitted || shouldBlur}
                          className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all duration-150 border flex items-center gap-3
                            ${isSubmitted ? 
                              (optIndex === correctAnswerIndex ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' : 
                              optIndex === selectedAnswerIndex ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' : 
                              'bg-transparent text-gray-900 border-gray-200 cursor-default') 
                            : isHighlighted ? 
                              'bg-gray-100 border-gray-400 shadow-sm' // Highlight style
                            : 
                              'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm' // Default non-submitted style
                            }
                            ${shouldBlur ? 'cursor-not-allowed' : ''}`}
                        >
                           {/* Letter bubble */}
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${isSubmitted ? (optIndex === correctAnswerIndex ? 'bg-green-100 border-green-300 text-green-700' : optIndex === selectedAnswerIndex ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : isHighlighted ? 'bg-white border-gray-400 text-gray-700' : 'bg-white border-gray-300 text-gray-600'}`}> 
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                           {/* Option Text - Reduced Size */}
                          <span className={`flex-1 text-sm ${isSubmitted ? 'text-gray-800' : isHighlighted ? 'text-gray-900' : 'text-gray-900'}`}>{option}</span>
                          {/* Feedback Icon */}
                          {isSubmitted && (
                            <div className="flex-shrink-0">
                              {optIndex === correctAnswerIndex
                                ? <Check className="w-5 h-5 text-green-500" />
                                : optIndex === selectedAnswerIndex
                                  ? <X className="w-5 h-5 text-red-500" />
                                  : null
                              }
                            </div>
                          )}
                        </button>
                     );
                    })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export function UnitMCQs({ 
  currentUnit, 
  currentQuestionIndex, 
  isLoggedIn,
  onAnswer, 
  onNextQuestion,
  onPreviousQuestion,
  onQuestionSelect,
  onUnitChange,
  answeredQuestions,
  units,
  dojoProgress,
  correctStreak,
  isWeakestUnitsMode,
  totalQuestions,
  unitName,
  questions,
  subject,
  practiceUnitIds,
}: UnitMCQsProps) {
  const { login, signup, userData, loadingUserData } = useAuthContext();
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const DOUBLE_XP_CHANCE = 0.15;
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showAiTooltip, setShowAiTooltip] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUnitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswerState = currentQuestion ? answeredQuestions[currentQuestion.id] : undefined;
  const displayUnitId = currentQuestion?.unit ?? currentUnit;

  const handleUnitChange = (unitId: number) => {
    setAiExplanations({});
    setExplanationError(null);
    setIsLoadingExplanation(false);
    onUnitChange(unitId);
    setIsUnitDropdownOpen(false);
    setHighlightedIndex(null);
  };

  const handleAnswerSelection = (questionId: number, answerLetter: string, answerText: string, lessonIDS: string[]) => {
    const isCorrect = answerLetter === currentQuestion?.correctAnswer;
    if (currentQuestion) {
         onAnswer(questionId, answerLetter, isCorrect, lessonIDS); 
         setHighlightedIndex(null);
    }
  };

  const handleQuestionSelect = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
        onQuestionSelect(index);
        setHighlightedIndex(null);
    } else {
        console.warn("Attempted to select invalid question index:", index);
    }
  };

  const handleAIExplanation = () => {
    if (!currentQuestion || !currentAnswerState) return; 
    
    setIsLoadingExplanation(true);
    setExplanationError(null);
    
    setTimeout(() => {
      try {
        const explanation = currentQuestion.explanation;
        if (explanation) {
           setAiExplanations(prev => ({
                ...prev,
                [currentQuestion.id]: explanation
           }));
        } else {
            throw new Error("Explanation is not available for this question."); 
        }
      } catch (error) {
        console.error('Error setting explanation:', error);
        setExplanationError(error instanceof Error ? error.message : 'Failed to get explanation');
      } finally {
        setIsLoadingExplanation(false);
      }
    }, 1500); 
  };

  const proceedToActualNextQuestion = () => {
     if (totalQuestions === 0) return;
     const nextIndex = currentQuestionIndex + 1;
     if (nextIndex >= totalQuestions) {
       handleQuestionSelect(0); // Wrap to start
     } else {
       handleQuestionSelect(nextIndex);
     }
  };

  const handlePreviousQuestion = () => {
    console.log("Handling Previous Question Request");
    onPreviousQuestion();
  };

  const handleNextQuestion = () => {
    console.log("Handling Next Question Request");
    proceedToActualNextQuestion(); 
  };

  // --- Updated useEffect for Keyboard Navigation --- 
  useEffect(() => {
    /* // --- START COMMENT OUT - Keyboard Navigation --- 
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if focused on input/button or if an overlay/offer is active
      const target = event.target as HTMLElement;
      if (displayDoubleXpOffer || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') {
        return;
      }

      const numOptions = currentQuestion?.options?.length ?? 0;
      if (numOptions === 0) return; // No options to navigate

      if (event.key === 'ArrowLeft') {
        handlePreviousQuestion();
      } else if (event.key === 'ArrowRight') {
        handleNextQuestion();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return numOptions - 1; // Highlight D first
          if (prevIndex === 0) return numOptions - 1;    // Wrap from A to D
          return prevIndex - 1;                   // Go up
        });
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return 0; // Highlight A first
          if (prevIndex === numOptions - 1) return 0; // Wrap from D to A
          return prevIndex + 1;                   // Go down
        });
      } else if (event.key === 'Enter') {
        if (highlightedIndex !== null && !currentAnswerState) { // Only submit if highlighted and not already answered
           event.preventDefault();
           console.log("Enter pressed, submitting option:", highlightedIndex); // Debug
           // Find the actual answer details for the highlighted index
           const letter = String.fromCharCode(65 + highlightedIndex);
           const text = currentQuestion.options[highlightedIndex];
           const lessonIds = currentQuestion.lessonIDS;
           handleAnswerSelection(currentQuestion.id, letter, text, lessonIds);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // --- END COMMENT OUT - Keyboard Navigation --- */ 
  }, [handlePreviousQuestion, handleNextQuestion, currentQuestion, highlightedIndex, currentAnswerState, handleAnswerSelection]); // Added dependencies

  // --- NEW useEffect to Disable Body Scroll --- 
  useEffect(() => {
    /* // --- START COMMENT OUT - Scroll Lock --- 
    // Store original overflow style
    const originalOverflow = document.body.style.overflow;
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    console.log("Body scroll disabled"); // Debug

    // Cleanup function to restore scroll
    return () => {
      document.body.style.overflow = originalOverflow;
      console.log("Body scroll enabled"); // Debug
    };
    // --- END COMMENT OUT - Scroll Lock --- */
  }, []); // Empty dependency array runs only on mount and unmount

  return (
    <div className="container mx-auto px-4 pt-4 pb-12 relative">
      {/* Use Flexbox for columns */}
      {/* Adjusted column widths lg:w-3/5 and lg:w-2/5 */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
        
        {/* Left Column: Question Card */}
        <div className="w-full lg:w-3/5">
          {currentQuestion && (
            <QuestionCard 
              key={`${currentUnit}-${currentQuestion.id}`} 
              question={currentQuestion} 
              currentIndex={currentQuestionIndex}
              onAnswerSelect={handleAnswerSelection}
              initialSelectedLetter={currentAnswerState?.selectedLetter}
              isAnswered={!!currentAnswerState} 
              aiExplanation={aiExplanations[currentQuestion.id]}
              isLoadingAI={isLoadingExplanation} 
              isLoggedIn={isLoggedIn}
              signup={signup}
              login={login}
              dojoProgress={dojoProgress}
              correctStreak={correctStreak}
              totalQuestions={totalQuestions}
              highlightedIndex={highlightedIndex}
            />
          )}
        </div>

        {/* Right Column: Controls and Resources */}
        {/* Adjusted column width lg:w-2/5 */}
        <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-md border border-gray-200 p-4 lg:p-6 flex flex-col h-full">
          {/* Top Section: Headline, Tags, Navigation */}
          <div className="mb-6"> {/* Reduced bottom margin */} 
            <div className="flex items-center gap-4 mb-3"> {/* Added bottom margin */}
              <h3 className="font-extrabold tracking-tight text-gray-900 text-2xl">
                  <span className="text-blue-600">Focused</span> Practice
              </h3>
              {/* Keep dropdown for now, might remove later if tags are sufficient */}
              {!isWeakestUnitsMode && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                    className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <Triangle className="w-2 h-2 rotate-180 fill-current" />
                  </button>
                  {isUnitDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      {units.map(unit => (
                        <button
                          key={unit.number}
                          onClick={() => handleUnitChange(unit.number)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            currentUnit === unit.number
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {unit.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* --- Unit Tags --- */}
            {practiceUnitIds && practiceUnitIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4"> {/* Container for tags */} 
                    {practiceUnitIds.map(unitId => (
                        <span key={unitId} className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                            Unit {unitId}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePreviousQuestion}
                className={`flex-1 p-2 rounded-md font-semibold text-sm transition-colors bg-blue-500 text-white hover:bg-blue-600`}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className={`flex-1 p-2 rounded-md font-semibold text-sm transition-colors bg-blue-500 text-white hover:bg-blue-600`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Middle Section: Study Resources (Takes remaining space) */}
          <div className="space-y-3 flex-grow"> {/* Added flex-grow */}
             {/* Reduced heading size */}
             <h3 className="font-extrabold tracking-tight text-gray-900 text-lg mb-3">Study Resources</h3>
            
            {/* Study Guide Link - Reduced padding */} 
            <a
              href={`/study-guides/AP-macroeconomics-unit-${displayUnitId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-gray-50 group block"
            >
               <div className="flex items-center gap-3 justify-start">
                 <div className="p-1.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors"> {/* Reduced icon padding */} 
                   <FileText className="w-5 h-5" />
                 </div>
                 <span className="font-semibold text-sm text-gray-900"> {/* Reduced text size */} 
                   Unit {displayUnitId} Study Guide
                 </span>
               </div>
            </a>

            {/* AI Explanation Button - Reduced padding */}
            <div 
               className="relative" 
               onMouseEnter={() => { if (!currentAnswerState) setShowAiTooltip(true); }}
               onMouseLeave={() => setShowAiTooltip(false)}
            >
              <button
                onClick={handleAIExplanation}
                disabled={!currentAnswerState}
                className={`w-full p-3 rounded-lg border transition-all duration-200 bg-white group relative
                  ${explanationError ? 'border-red-200 hover:border-red-300' : 'border-gray-200 hover:border-gray-300'} 
                  hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white`}
              >
                <div className="flex items-center gap-3 justify-start">
                  <div className={`p-1.5 rounded-lg text-white transition-colors ${explanationError ? 'bg-red-500 group-hover:bg-red-600' : 'bg-blue-500 group-hover:bg-blue-600'} group-disabled:bg-gray-400`}>
                    {isLoadingExplanation ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Brain className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`font-semibold text-sm text-left ${explanationError ? 'text-red-600' : 'text-gray-900'} group-disabled:text-gray-500`}>
                    Explain with AI Dojo
                  </span>
                </div>
              </button>

              {/* Tooltip */}
              {showAiTooltip && (
                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                   Choose an answer before using AI Dojo
                   <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                 </div>
              )}
            </div>
            
             {/* Conditional Error Message */} 
             {explanationError && (
               <div className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-md"> {/* Reduced padding */} 
                 <p className="text-xs text-red-600"> {/* Reduced text size */} 
                   {explanationError}
                 </p>
               </div>
             )}

          </div>

          {/* Footer Section: Change Units Link */}
          <div className="mt-auto pt-6"> {/* Increased top padding */} 
             {/* Change Units Link - Adjusted size/styling */}
             <Link 
                 href={`/select-practice-units?subject=${subject}`}
                 className="inline-flex items-center justify-center w-full text-base text-gray-900 hover:underline" /* Increased size */ 
             >
                 <RefreshCw className="w-5 h-5 mr-2 text-blue-600" /> {/* Kept icon blue, increased size */} 
                 Change Units
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Corrected styles string literal
const styles = ` 
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }

  @keyframes pulse-intense {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  .animate-pulse-intense {
    animation: pulse-intense 1s ease-in-out infinite;
  }

  @keyframes pulse-normal {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }

  .animate-pulse-normal {
    animation: pulse-normal 1.5s ease-in-out infinite;
  }

  @keyframes progress-pulse {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.1); }
    100% { transform: scaleX(1); }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'progress-pulse-styles';
  if (!document.getElementById(styleSheet.id)) {
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}
