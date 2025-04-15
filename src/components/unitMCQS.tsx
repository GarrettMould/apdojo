'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { Check, X, Brain, FileText, ChevronDown, Triangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';

// Type definition consistent with the parent page
interface AnsweredQuestionState {
  selectedLetter: string;
  isCorrect: boolean;
}

interface UnitMCQsProps {
  currentUnit: number;
  currentQuestionIndex: number;
  isLoggedIn: boolean;
  onAnswer: (questionId: number, answerLetter: string, isCorrect: boolean) => void; 
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onQuestionSelect: (index: number) => void;
  onUnitChange: (unitId: number) => void;
  answeredQuestions: Record<number, AnsweredQuestionState>; 
  units: Array<{ id: number; name: string; questions: QuestionType[] }>;
}

interface QuestionCardProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSelect: (questionId: number, answerLetter: string, answerText: string) => void;
  initialSelectedLetter?: string; 
  isAnswered: boolean; 
  aiExplanation?: string;
  isLoadingAI: boolean;
  isLoggedIn: boolean;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
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
  login
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
      question.options[index]
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 relative">
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
                    <input 
                      type="email"
                      placeholder="Email Address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    />
                    <input 
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    />
                    {loginError && <p className="text-red-500 text-sm text-left">{loginError}</p>}
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

      <div className={`space-y-8 ${shouldBlur ? 'blur-sm' : ''}`}>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-xs sm:text-sm font-medium">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs sm:text-sm font-medium">
            Unit {question.unit}
          </span>
        </div>
        <p className="text-lg font-medium font-serif leading-relaxed text-gray-800">
          {question.question}
        </p>
        {question.image && (
          <div className="my-6">
            <img 
              src={question.image.src}
              alt="Question"
              className="max-h-[225px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
            />
          </div>
        )}

        {/* --- Conditional Display: Explanation OR Answer Options --- */}
        {isSubmitted && aiExplanation ? (
          // --- Display Explanation Mode --- 
          // (Check simplified to just isSubmitted && aiExplanation) 
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
           // (No loading indicator needed here anymore) 
          <>
            {/* Answer Options */}
            <div className="space-y-4">
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(optIndex)}
                  disabled={isSubmitted || shouldBlur} 
                  className={`w-full text-left p-4 rounded-lg text-sm font-medium transition-all duration-200 border ${isSubmitted ? 
                    optIndex === correctAnswerIndex
                      ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' 
                      : optIndex === selectedAnswerIndex
                        ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' 
                        : 'bg-transparent text-gray-900 border-gray-200 cursor-default' 
                    : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm' 
                    } ${shouldBlur ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full border font-medium ${isSubmitted ? (optIndex === correctAnswerIndex ? 'bg-green-100 border-green-300 text-green-700' : optIndex === selectedAnswerIndex ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : 'bg-white border-gray-300 text-gray-600'}`}>
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span className={`flex-1 ${isSubmitted ? 'text-gray-800' : 'text-gray-900'}`}>{option}</span>
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
                  </div>
                </button>
              ))}
            </div>
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
  units
}: UnitMCQsProps) {
  const { login, signup } = useAuthContext();
  const [aiExplanations, setAiExplanations] = useState<Record<number, string>>({});
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const currentQuestions = units.find(unit => unit.id === currentUnit)?.questions || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const currentAnswerState = currentQuestion ? answeredQuestions[currentQuestion.id] : undefined;

  const handleUnitChange = (unitId: number) => {
    setAiExplanations({});
    setExplanationError(null);
    setIsLoadingExplanation(false);
    onUnitChange(unitId);
    setIsUnitDropdownOpen(false);
  };

  const handleAnswerSelection = (questionId: number, answerLetter: string, answerText: string) => {
    const isCorrect = answerLetter === currentQuestion?.correctAnswer;
    if (currentQuestion) {
         onAnswer(questionId, answerLetter, isCorrect); 
    }
  };

  const handleNextQuestion = () => {
    setExplanationError(null); 
    onNextQuestion();
  };

  const handlePreviousQuestion = () => {
    setExplanationError(null); 
    onPreviousQuestion();
  };

  const handleQuestionSelect = (index: number) => {
    setExplanationError(null); 
    onQuestionSelect(index);
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4">
          {currentQuestion && (
            <QuestionCard 
              key={`${currentUnit}-${currentQuestion.id}`} 
              question={currentQuestion} 
              currentIndex={currentQuestionIndex}
              totalQuestions={currentQuestions.length}
              onAnswerSelect={handleAnswerSelection}
              initialSelectedLetter={currentAnswerState?.selectedLetter}
              isAnswered={!!currentAnswerState} 
              aiExplanation={aiExplanations[currentQuestion.id]}
              isLoadingAI={isLoadingExplanation} 
              isLoggedIn={isLoggedIn}
              signup={signup}
              login={login}
            />
          )}
        </div>

        <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md border border-gray-200 p-4 lg:p-6 h-fit">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold tracking-tight text-gray-900">Unit {currentUnit} MCQs</h3>
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
                        key={unit.id}
                        onClick={() => handleUnitChange(unit.id)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          currentUnit === unit.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {unit.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQuestions.map((question, index) => {
                  const answerState = answeredQuestions[question.id];
                  const isCurrent = currentQuestionIndex === index;
                  let bgColor = 'bg-white';
                  let borderColor = 'border-gray-300'; // Default border

                  if (answerState) { // If the question has been answered
                      borderColor = answerState.isCorrect ? 'border-green-500' : 'border-red-500'; 
                      bgColor = answerState.isCorrect ? 'bg-green-50' : 'bg-red-50';
                  } else {
                    // Keep default border and bg for unanswered
                  }
                  
                  if (isCurrent) { // Apply blue border if it's the current question
                      borderColor = 'border-blue-500';
                      // If current and answered, keep the green/red bg, else use blue-50 for current+unanswered
                      bgColor = answerState ? bgColor : 'bg-blue-50'; 
                  }
                  
                  return (
                      <button
                        key={question.id}
                        onClick={() => handleQuestionSelect(index)}
                        className={`w-8 h-8 rounded border-2 ${borderColor} ${bgColor} transition-colors`}
                        aria-label={`Question ${index + 1}`}
                      />
                  );
              })}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 p-2 rounded-md font-medium text-sm transition-colors ${currentQuestionIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === currentQuestions.length - 1}
                className={`flex-1 p-2 rounded-md font-medium text-sm transition-colors ${currentQuestionIndex === currentQuestions.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Next
              </button>
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-extrabold tracking-tight text-gray-900">Study Resources</h3>
            <a
              href={`/study-guides/AP-macroeconomics-unit-${currentUnit}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-gray-50 group block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">
                  Unit {currentUnit} Study Guide
                </span>
              </div>
            </a>
            <button
              onClick={handleAIExplanation}
              disabled={isLoadingExplanation || !currentAnswerState} 
              className={`w-full p-4 rounded-lg border transition-all duration-200 bg-white group relative
                ${explanationError 
                  ? 'border-red-200 hover:border-red-300' 
                  : currentAnswerState 
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-gray-200 opacity-50 cursor-not-allowed'} 
                hover:bg-gray-50`}
            >
              <div className="flex items-center gap-3 justify-start">
                <div className={`p-2 rounded-lg text-white transition-colors
                  ${explanationError 
                    ? 'bg-red-500 group-hover:bg-red-600' 
                    : currentAnswerState 
                      ? 'bg-blue-500 group-hover:bg-blue-600'
                      : 'bg-blue-300'}`}
                >
                  {isLoadingExplanation ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Brain className="w-5 h-5" />
                  )}
                </div>
                <span className={`font-medium text-left ${explanationError ? 'text-red-600' : currentAnswerState ? 'text-gray-900' : 'text-gray-500'}`}>
                  {isLoadingExplanation 
                    ? 'Getting Explanation...' 
                    : explanationError 
                      ? 'Try Again' 
                      : 'Explain with AI Dojo'}
                </span>
              </div>
              {!currentAnswerState && (
                <div className="absolute bottom-full left-0 mb-2 w-full px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Please answer the question first to get an explanation
                </div>
              )}
            </button>
            {explanationError && (
              <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {explanationError}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
