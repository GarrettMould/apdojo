'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Check, X, CheckCircle, Lock, Strikethrough } from 'lucide-react';
import Link from 'next/link';
// MVP: Removed authentication imports
// import { useAuthContext } from '@/contexts/AuthContext';
// import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';
import { use } from 'react';
import { saveTestProgress, loadTestProgress, saveTestResult } from '@/lib/testProgress';

// Helper function to convert letter answer to index
const getCorrectAnswerIndex = (correctAnswer: string): number => {
  return correctAnswer.charCodeAt(0) - 65; // Convert A=0, B=1, C=2, etc.
};

export default function FullMCQExamPage() {
  // MVP: Removed authentication context
  // const { user } = useAuthContext();
  
  // Exam is now unlocked - purchase verification happens in preview pages
  const isExamLocked = false;
  
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [strikethroughState, setStrikethroughState] = useState<Record<number, Set<number>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // Get the full exam questions
  const questions = macroSetOneQuestions.questions;
  const totalQuestions = questions.length;

  // MVP: Removed user-dependent progress loading for MVP
  // useEffect(() => {
  //   const loadProgress = async () => {
  //     if (user) {
  //       try {
  //         console.log('Loading progress for user:', user.uid);
  //         const savedProgress = await loadTestProgress(user.uid, 'full_mcq_exam');
  //         console.log('Loaded progress:', savedProgress);
  //         if (savedProgress && !savedProgress.isSubmitted) {
  //           setAnsweredQuestions(savedProgress.answeredQuestions);
  //           setIsSubmitted(savedProgress.isSubmitted);
  //           setHasSavedProgress(true);
  //           console.log('Restored progress:', savedProgress.answeredQuestions);
  //         }
  //       } catch (error) {
  //         console.error('Error loading progress:', error);
  //         setIsLoadingProgress(false);
  //       }
  //     } else {
  //       setIsLoadingProgress(false);
  //     }
  //   };

  //   loadProgress();
  // }, [user]);

  // MVP: Set loading to false immediately since we're not loading user progress
  useEffect(() => {
    setIsLoadingProgress(false);
  }, []);

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Test',
      name: 'AP Macroeconomics Full MCQ Practice Exam',
      description: 'Full-length AP Macroeconomics multiple-choice practice exam with 60 questions covering all 6 units. Perfect for AP exam preparation.',
      educationalLevel: 'High School',
      numberOfQuestions: totalQuestions,
      about: {
        '@type': 'Thing',
        name: 'AP Macroeconomics',
      },
      url: typeof window !== 'undefined' ? window.location.href : '',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [totalQuestions]);

  // MVP: Removed user-dependent progress saving for MVP
  // useEffect(() => {
  //   const saveProgress = async () => {
  //     if (user && !isLoadingProgress) {
  //       try {
  //         console.log('Saving progress:', {
  //           answeredQuestions,
  //           isSubmitted,
  //           totalQuestions
  //         });
  //         await saveTestProgress({
  //           userId: user.uid,
  //           testType: 'full_exam',
  //           testId: 'full_mcq_exam',
  //           progress: {
  //           answeredQuestions,
  //           currentQuestionIndex: 0, // Not using this for full exam
  //           isSubmitted,
  //           totalQuestions,
  //           startedAt: new Date(),
  //           lastUpdated: new Date()
  //         }
  //       });
  //         console.log('Progress saved successfully');
  //       } catch (error) {
  //         console.error('Error saving progress:', error);
  //       }
  //     }
  //   };

  //   // Debounce the save to avoid too many Firebase calls
  //   const timeoutId = setTimeout(saveProgress, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [answeredQuestions, isSubmitted, user, totalQuestions, isLoadingProgress]);
  
  // MVP: Removed authentication requirement - allow all users to access full MCQ exam
  // if (!user) {
  //   return <AuthGate />;
  // }

  // MVP: Check if exam is locked (only Unit 1 content is accessible for MVP)
  if (isExamLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Premium Content Locked</h1>
          <p className="text-gray-600 mb-6">
            The full MCQ exam covers all units and requires a subscription. 
            Complete Unit 1 to unlock access to comprehensive exams.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What's included:</strong> Comprehensive practice exam covering all AP Macroeconomics units 
              with detailed explanations and progress tracking.
            </p>
          </div>
          <Link 
            href="/ap-macro-course"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AP Macro Course
          </Link>
        </div>
      </div>
    );
  }

  // Show loading state while progress is being loaded
  if (isLoadingProgress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (isSubmitted) return; // Can't change answers after submission
    
    // If option is struck through, just remove strikethrough and don't select
    // This matches the exact logic from unitMCQS.tsx
    if (strikethroughState[questionId]?.has(answerIndex)) {
      setStrikethroughState(prev => {
        const currentStrikes = prev[questionId] || new Set<number>();
        const newSet = new Set(currentStrikes);
        newSet.delete(answerIndex);
        if (newSet.size === 0) {
          const { [questionId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [questionId]: newSet };
      });
      return; // Exit early - do NOT select
    }
    
    // If the clicked answer is already selected, unselect it
    const currentSelection = answeredQuestions[questionId];
    if (currentSelection && currentSelection.selectedAnswer === answerIndex) {
      setAnsweredQuestions(prev => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
      return;
    }
    
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const isCorrect = String.fromCharCode(65 + answerIndex) === question.correctAnswer;
    setAnsweredQuestions(prev => {
      return {
        ...prev,
        [questionId]: { selectedAnswer: answerIndex, isCorrect }
      };
    });
  };

  const handleStrikethroughToggle = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;

    // If the option being struck through is the currently selected answer, deselect it.
    if (answeredQuestions[questionId]?.selectedAnswer === optionIndex) {
      setAnsweredQuestions(prev => {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      });
    }

    // Toggle strikethrough using Set (matches unitMCQS logic)
    setStrikethroughState(prev => {
      const currentStrikes = prev[questionId] || new Set<number>();
      const newSet = new Set(currentStrikes);
      if (newSet.has(optionIndex)) {
        newSet.delete(optionIndex);
      } else {
        newSet.add(optionIndex);
      }
      
      if (newSet.size === 0) {
        const { [questionId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [questionId]: newSet };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    
    // MVP: Removed user-dependent result saving for MVP
    // Save final test result
    // if (user) {
    //   try {
    //     await saveTestResult({
    //       userId: user.uid,
    //       testType: 'full_exam',
    //       testId: 'full_mcq_exam',
    //       score: correctAnswers,
    //       totalQuestions,
    //       completedAt: new Date()
    //     });
    //   } catch (error) {
    //     console.error('Error saving test result:', error);
    //   }
    // }
  };

  const progress = Object.keys(answeredQuestions).length;
  const progressPercentage = (progress / totalQuestions) * 100;
  const correctAnswers = Object.values(answeredQuestions).filter(answer => answer.isCorrect).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Course Sidebar */}
      <CourseSidebar 
        selectedUnit=""
        isFixed={true}
      />
      
      {/* Main Content */}
      <div className="flex-1 ml-80">
        {/* Unified Container */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">AP Macroeconomics Full MCQ Exam</h1>
                    <p className="text-sm text-gray-600">Complete exam covering all units</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{totalQuestions} questions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Test Banner - Show when there's saved progress */}
            {hasSavedProgress && !isSubmitted && progress > 0 && (
              <div className="border-b border-blue-200 bg-blue-50">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-blue-800">
                        You have {progress} answered questions. Your progress is automatically saved.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setAnsweredQuestions({});
                        setHasSavedProgress(false);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Bar - Only show during test */}
            {!isSubmitted && (
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Progress: {progress} of {totalQuestions} completed</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="p-6">
              {!isSubmitted ? (
                /* Test Mode - All Questions Displayed */
                <div className="space-y-8">
                  {questions.map((question, questionIndex) => {
                    const currentAnswer = answeredQuestions[question.id];
                    
                    return (
                      <div key={question.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8 last:mb-0">
                        {/* Question Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg">
                            <span className="text-lg font-bold text-slate-700">{questionIndex + 1}</span>
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                        </div>

                        {/* Question Text */}
                        <div className="mb-8">
                          <h3 className="text-lg font-medium text-slate-900 leading-relaxed mb-4">
                            {question.question}
                          </h3>
                        </div>

                        {/* Question Image */}
                        {question.image && (
                          <div className="mb-8">
                            <img
                              src={question.image.src}
                              alt="Question diagram"
                              className="w-full rounded-lg border border-slate-200 shadow-sm"
                            />
                          </div>
                        )}

                        {/* Answer Options */}
                        <div className="space-y-3">
                          {question.options.map((option, index) => {
                            const isStruckThrough = strikethroughState[question.id]?.has(index) ?? false;
                            // Only show as selected if NOT struck through (strikethrough takes priority)
                            const isSelected = !isStruckThrough && currentAnswer?.selectedAnswer === index;
                            
                            return (
                              <div
                                key={index}
                                onClick={() => handleAnswerSelect(question.id, index)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                                  isStruckThrough
                                    ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-default'
                                    : isSelected 
                                      ? 'bg-slate-50 text-slate-900 shadow-md border-slate-300 ring-2 ring-slate-100 cursor-pointer' 
                                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer'
                                }`}
                              >
                                {/* Letter indicator */}
                                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                                  isStruckThrough
                                    ? 'bg-gray-200 border-gray-300 text-gray-400'
                                    : isSelected 
                                      ? 'bg-slate-700 border-slate-700 text-white' 
                                      : 'bg-white border-slate-300 text-slate-600 group-hover:border-slate-400'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                
                                {/* Option Text */}
                                <div className="flex-1 pt-1">
                                  <span className={`text-base ${
                                    isStruckThrough ? 'text-gray-500 line-through' : isSelected ? 'text-slate-900' : 'text-slate-700'
                                  }`}>
                                    {option}
                                  </span>
                                </div>

                                {/* Strikethrough Button */}
                                <div
                                  role="button"
                                  onClick={(e) => { e.stopPropagation(); handleStrikethroughToggle(question.id, index); }}
                                  className={`ml-auto p-2 rounded-lg transition-opacity cursor-pointer ${
                                    isStruckThrough ? 'opacity-100 bg-slate-200 text-slate-600' : 'opacity-0 group-hover:opacity-100 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                  }`}
                                  aria-label={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                                >
                                  <Strikethrough className="w-5 h-5" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={progress < totalQuestions}
                      className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>
              ) : (
                /* Results Mode - Show Answers and Explanations */
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Complete!</h2>
                    <p className="text-lg text-gray-600">
                      You got {correctAnswers} out of {totalQuestions} questions correct.
                    </p>
                  </div>

                  {questions.map((question, questionIndex) => {
                    const currentAnswer = answeredQuestions[question.id];
                    const isCorrect = currentAnswer?.isCorrect;
                    
                    return (
                      <div key={question.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8 last:mb-0">
                        {/* Question Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg">
                            <span className="text-lg font-bold text-slate-700">{questionIndex + 1}</span>
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
                          {isCorrect ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Correct
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                              Incorrect
                            </span>
                          )}
                        </div>

                        {/* Question Text */}
                        <div className="mb-8">
                          <h3 className="text-lg font-medium text-slate-900 leading-relaxed mb-4">
                            {question.question}
                          </h3>
                        </div>

                        {/* Question Image */}
                        {question.image && (
                          <div className="mb-8">
                            <img
                              src={question.image.src}
                              alt="Question diagram"
                              className="w-full rounded-lg border border-slate-200 shadow-sm"
                            />
                          </div>
                        )}

                        {/* Answer Options with Feedback */}
                        <div className="space-y-3 mb-8">
                          {question.options.map((option, index) => {
                            const isSelected = currentAnswer?.selectedAnswer === index;
                            const isCorrectAnswer = String.fromCharCode(65 + index) === question.correctAnswer;
                            
                            return (
                              <div
                                key={index}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${
                                  isCorrectAnswer 
                                    ? 'bg-green-50 text-slate-900 shadow-md border-green-200' 
                                    : isSelected && !isCorrectAnswer
                                      ? 'bg-red-50 text-slate-900 shadow-md border-red-200' 
                                      : 'bg-white text-slate-900 border-slate-200'
                                }`}
                              >
                                {/* Letter indicator */}
                                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                                  isCorrectAnswer 
                                    ? 'bg-green-600 border-green-600 text-white' 
                                    : isSelected && !isCorrectAnswer
                                      ? 'bg-red-600 border-red-600 text-white' 
                                      : 'bg-white border-slate-300 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                
                                {/* Option Text */}
                                <div className="flex-1 pt-1">
                                  <span className="text-base text-slate-900">
                                    {option}
                                  </span>
                                </div>
                                
                                {/* Feedback Icon */}
                                <div className="flex-shrink-0 pt-1">
                                  {isCorrectAnswer ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                  ) : isSelected && !isCorrectAnswer ? (
                                    <X className="w-5 h-5 text-red-500" />
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                          <h4 className="font-semibold text-slate-900 mb-3 text-lg">Explanation</h4>
                          <p className="text-slate-700 leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-12 mb-8">
          <div className="w-full max-w-5xl">
            <div className="flex gap-4">
              {/* Previous Button */}
              <div className="flex-1">
                <Link
                  href="/ap-macro-course"
                  className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    Previous
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    AP Macro Course
                  </div>
                </Link>
              </div>

              {/* Next Button */}
              <div className="flex-1">
                <Link
                  href="/full-frq-exam"
                  className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group text-right"
                >
                  <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    Next
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Full FRQ Exam
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={expandedImage}
              alt="Enlarged question diagram"
              className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
} 