'use client';

import { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Check, X, CheckCircle, Lock, Strikethrough, Bookmark, Expand, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
// MVP: Removed authentication imports
// import { useAuthContext } from '@/contexts/AuthContext';
// import { AuthGate } from '@/components/AuthGate';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { videos as allVideos } from '@/data/videos';
import { saveTestProgress, loadTestProgress, saveTestResult } from '@/lib/testProgress';
import { Question as QuestionType } from '@/data/questionBanks/types';

interface UnitMCQTestPageProps {
  params: Promise<{
    unitId: string;
  }>;
}

// Helper function to convert letter answer to index
const getCorrectAnswerIndex = (correctAnswer: string): number => {
  return correctAnswer.charCodeAt(0) - 65; // Convert A=0, B=1, C=2, etc.
};

export default function UnitMCQTestPage({ params }: UnitMCQTestPageProps) {
  const { unitId } = use(params);
  const unitNumber = parseInt(unitId);
  const questions = getUnitMCQTest(unitNumber);
  const totalQuestions = questions.length;
  const unitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.split(':')[0].split(' ')[1] === unitId.toString()
  );

  // MVP: Removed authentication context
  // const { user } = useAuthContext();
  
  // Get the unit test questions first
  
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [strikethroughState, setStrikethroughState] = useState<Record<number, number[]>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [isScoreBreakdownOpen, setIsScoreBreakdownOpen] = useState(false);
  const [selectedVideoQuestion, setSelectedVideoQuestion] = useState<QuestionType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(questions.length > 0 ? questions[0].id : null);

  // Get unit info
  
  // MVP: Only allow access to Units 1, 2 and 3
  const isUnitLocked = false;

  useEffect(() => {
    if (!isSubmitted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const questionId = parseInt(entry.target.id.split('-')[1]);
            setActiveQuestion(questionId);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when the question is in the middle of the viewport
        threshold: 0,
      }
    );

    const questionElements = questions.map(q => document.getElementById(`question-${q.id}`)).filter(el => el);
    questionElements.forEach(el => el && observer.observe(el));

    return () => {
      questionElements.forEach(el => el && observer.unobserve(el));
    };
  }, [isSubmitted, questions]);

  // MVP: Removed user-dependent progress loading for MVP
  // useEffect(() => {
  //   const loadProgress = async () => {
  //     if (user && unitId) {
  //       try {
  //       const savedProgress = await loadTestProgress(user.uid, `unit_${unitId}`);
  //       if (savedProgress && !savedProgress.isSubmitted) {
  //         setAnsweredQuestions(savedProgress.answeredQuestions);
  //         setIsSubmitted(savedProgress.isSubmitted);
  //         setHasSavedProgress(true);
  //       }
  //     } catch (error) {
  //       console.error('Error loading progress:', error);
  //     } finally {
  //       setIsLoadingProgress(false);
  //     }
  //   } else {
  //     setIsLoadingProgress(false);
  //   }
  //   };

  //   loadProgress();
  // }, [user, unitId]);

  // MVP: Set loading to false immediately since we're not loading user progress
  useEffect(() => {
    setIsLoadingProgress(false);
  }, [unitId]);

  // MVP: Removed user-dependent progress saving for MVP
  // useEffect(() => {
  //   const saveProgress = async () => {
  //     if (user && unitId && !isLoadingProgress) {
  //       try {
  //       await saveTestProgress({
  //         userId: user.uid,
  //         testType: 'unit_mcq',
  //         testId: `unit_${unitId}`,
  //         progress: {
  //         answeredQuestions,
  //         currentQuestionIndex: 0, // Not using this for unit tests
  //         isSubmitted,
  //         totalQuestions,
  //         startedAt: new Date(),
  //         lastUpdated: new Date()
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error saving progress:', error);
  //     }
  //     }
  //   };

  //   // Debounce the save to avoid too many Firebase calls
  //   const timeoutId = setTimeout(saveProgress, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [answeredQuestions, isSubmitted, user, unitId, totalQuestions, isLoadingProgress]);
  
  // If unit not found, show error
  if (!unitInfo || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unit Test Not Found</h1>
          <p className="text-gray-600 mb-6">The unit test you're looking for doesn't exist.</p>
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

  // MVP: Check if unit is locked (only Unit 1 is accessible)
  if (isUnitLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Premium Content Locked</h1>
          <p className="text-gray-600 mb-6">
            Unit {unitId} requires a subscription. Complete Unit 1 to unlock access to all units.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What's included:</strong> {totalQuestions} comprehensive questions 
              covering all topics in this unit.
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

  // MVP: Removed authentication requirement - allow all users to access unit MCQ tests
  // if (!user) {
  //   return <AuthGate />;
  // }

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
    
    setAnsweredQuestions(prev => {
      const currentSelection = prev[questionId];

      // If the clicked answer is already selected, unselect it
      if (currentSelection && currentSelection.selectedAnswer === answerIndex) {
        const newState = { ...prev };
        delete newState[questionId];
        return newState;
      }

      // Otherwise, select the new answer
    const question = questions.find(q => q.id === questionId);
      if (!question) return prev;
    
    const isCorrect = String.fromCharCode(65 + answerIndex) === question.correctAnswer;
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

    setStrikethroughState(prev => {
      const currentStrikes = prev[questionId] || [];
      const newStrikes = currentStrikes.includes(optionIndex)
        ? currentStrikes.filter(i => i !== optionIndex)
        : [...currentStrikes, optionIndex];
      
      return { ...prev, [questionId]: newStrikes };
    });
  };

  const handleBookmarkToggle = (questionId: number) => {
    setBookmarkedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const scrollToQuestion = (questionId: number) => {
    const element = document.getElementById(`question-${questionId}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // MVP: Removed user-dependent result saving for MVP
    // Save final test result
    // if (user && unitId) {
    //   try {
    //     await saveTestResult({
    //       userId: user.uid,
    //       testType: 'unit_mcq',
    //       testId: `unit_${unitId}`,
    //       score: correctAnswers,
    //       totalQuestions,
    //       completedAt: new Date()
    //     });
    //   } catch (error) {
    //     console.error('Error saving test result:', error);
    //   }
    //   }
  };

  const progress = Object.keys(answeredQuestions).length;
  const progressPercentage = (progress / totalQuestions) * 100;
  const correctAnswers = Object.values(answeredQuestions).filter(answer => answer.isCorrect).length;

    return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className={`flex-1 mb-16`}>
        {/* Unified Container */}
        <div className={`mt-16 ${isSubmitted ? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8' : 'flex justify-center'}`}>
          {isSubmitted ? (
            <div>
              {/* Results Header Container */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
                {/* Header */}
                <div className="border-b border-gray-200">
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">Unit {unitId} MCQ Test Results</h1>
                        <p className="text-sm text-gray-600">{unitInfo.unit.split(':')[1]?.trim()}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>{totalQuestions} questions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Grid */}
                <div className="border-b border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>Review your answers. Click a square to jump to a question.</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {questions.map((q, index) => {
                        const isCorrect = answeredQuestions[q.id]?.isCorrect;
                        const buttonClasses = `w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${isCorrect ? 'bg-green-300' : 'bg-red-300'}`;
                        const textClasses = isCorrect ? 'text-green-800' : 'text-red-800';
                        return (
                          <button
                            key={q.id}
                            onClick={() => scrollToQuestion(q.id)}
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
                
                {/* Score Summary */}
                <div className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h2>
                    <p className="text-lg text-gray-600">
                      You got {correctAnswers} out of {totalQuestions} questions correct.
                    </p>
                  </div>
                </div>

                {/* Score Breakdown by Lesson */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Score Breakdown by Lesson</h3>
                    <button 
                      onClick={() => setIsScoreBreakdownOpen(!isScoreBreakdownOpen)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 text-sm rounded-lg transition-colors duration-200"
                    >
                      <span>{isScoreBreakdownOpen ? 'Collapse' : 'Expand'}</span>
                    </button>
                  </div>
                  {isScoreBreakdownOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(() => {
                        // Calculate score by lesson
                        const lessonScores: Record<string, { correct: number; total: number; percentage: number }> = {};
                        questions.forEach(question => {
                          const lessonId = question.lessonIDS[0];
                          if (!lessonScores[lessonId]) {
                            lessonScores[lessonId] = { correct: 0, total: 0, percentage: 0 };
                          }
                          lessonScores[lessonId].total++;
                          if (answeredQuestions[question.id]?.isCorrect) {
                            lessonScores[lessonId].correct++;
                          }
                        });
                        Object.keys(lessonScores).forEach(lessonId => {
                          lessonScores[lessonId].percentage = Math.round((lessonScores[lessonId].correct / lessonScores[lessonId].total) * 100);
                        });
                        return Object.entries(lessonScores).map(([lessonId, score]) => (
                          <div key={lessonId} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">Lesson {lessonId}</span>
                              <span className="text-sm font-semibold text-gray-700">{score.percentage}%</span>
                            </div>
                            <div className="text-sm text-gray-600">{score.correct} of {score.total} correct</div>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Questions and Explanations Section */}
              {questions.map((question, questionIndex) => {
                const currentAnswer = answeredQuestions[question.id];
                const isCorrect = currentAnswer?.isCorrect;
                return (
                  <div key={question.id} id={`question-${question.id}`} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8">
                    {/* Question Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg">
                        <span className="text-lg font-bold text-slate-700">{questionIndex + 1}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                          Lesson {question.lessonIDS[0]}
                        </span>
                        {currentAnswer && (
                          isCorrect ? (
                            <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
                              <span className="text-sm font-semibold text-emerald-700">Correct</span>
                            </div>
                          ) : (
                            <div className="px-3 py-1 bg-red-50 border border-red-200 rounded-lg">
                              <span className="text-sm font-semibold text-red-700">Incorrect</span>
                            </div>
                          )
                        )}
                      </div>
                      <div className="h-px flex-1 bg-slate-200"></div>
                      {question.explanationVideo && (
                        <button
                          onClick={() => {
                            setSelectedVideoQuestion(question);
                            setIsModalOpen(true);
                          }}
                          className="flex-shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                          aria-label="Watch video explanation"
                        >
                          <Play className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Question Text & Image */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-slate-900 leading-relaxed">{question.question}</h3>
                    </div>
                    {question.image && (
                      <div className="mb-8 flex justify-center">
                        <Image
                          src={question.image.src}
                          alt={'alt' in question.image && question.image.alt ? question.image.alt : "Question diagram"}
                          width={400} height={300}
                          className="max-w-xl w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                        />
                      </div>
                    )}

                    {/* Answer Options with Feedback */}
                    <div className="space-y-3 mb-6">
                      {question.options.map((option, index) => {
                        const isSelected = currentAnswer?.selectedAnswer === index;
                        const isCorrectAnswer = String.fromCharCode(65 + index) === question.correctAnswer;
                        return (
                          <div key={index} className={`w-full text-left p-3 rounded-lg border flex items-center gap-3 ${
                            isCorrectAnswer ? 'bg-green-50 border-green-200' : isSelected ? 'bg-red-50 border-red-200' : 'bg-transparent border-gray-200'
                          }`}>
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${
                              isCorrectAnswer ? 'bg-green-100 border-green-300 text-green-700' : isSelected ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 text-sm">{option}</span>
                            <div className="flex-shrink-0">
                              {isCorrectAnswer ? <Check className="w-5 h-5 text-green-500" /> : isSelected ? <X className="w-5 h-5 text-red-500" /> : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {/*
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-3 text-lg">Explanation</h4>
                      <p className="text-slate-700 leading-relaxed">{question.explanation}</p>
                    </div>
                    */}
                  </div>
                );
              })}
            </div>
          ) : (
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Unit {unitId} MCQ Test</h1>
                    <p className="text-sm text-gray-600">{unitInfo.unit.split(':')[1]?.trim()}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>{totalQuestions} questions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Answer every question before submitting the practice test.</li>
                <li>Use the strikethrough tool to eliminate answer choices you don’t want.</li>
                <li>Use the bookmark tool to mark questions you’d like to review before submitting.</li>
                <li>After submitting, click the video button to watch explanations for each question.</li>
              </ul>
            </div>

                {/* Resume Test Banner */}
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
                          onClick={() => { setAnsweredQuestions({}); setHasSavedProgress(false); }}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="border-b border-gray-200">
              <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="font-bold">Progress Bar</span>
                  </div>
                <div className="flex flex-wrap justify-start gap-2">
                  {questions.map((q, index) => {
                    const isAnswered = answeredQuestions[q.id] !== undefined;
                    const isBookmarked = bookmarkedQuestions.includes(q.id);
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
                        onClick={() => scrollToQuestion(q.id)}
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

            {/* Content Area */}
            <div className="p-6">
                  {/* Test Mode */}
                <div className="space-y-8">
                  {questions.map((question, questionIndex) => {
                    const currentAnswer = answeredQuestions[question.id];
                    return (
                      <div key={question.id} id={`question-${question.id}`} className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8 last:mb-0">
                        {/* Question Header */}
                        <div className="flex items-center gap-4 mb-6">
                           <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg">
                            <span className="text-lg font-bold text-slate-700">{questionIndex + 1}</span>
                          </div>
                          <div className="h-px flex-1 bg-slate-200"></div>
                             <button
                                onClick={() => handleBookmarkToggle(question.id)}
                                className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                                  bookmarkedQuestions.includes(question.id)
                                    ? 'bg-yellow-100 text-yellow-500'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                                }`}
                                aria-label={bookmarkedQuestions.includes(question.id) ? "Remove bookmark" : "Bookmark question"}
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
                            <Image
                              src={question.image.src}
                              alt={'alt' in question.image && question.image.alt ? question.image.alt : "Question diagram"}
                                width={400} height={300}
                              className="max-w-xl w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                            />
                          </div>
                        )}
                        

                        {/* Answer Options */}
                        <div className="space-y-4">
                          {question.options.map((option, index) => {
                            const isSelected = currentAnswer?.selectedAnswer === index;
                            const isStruckThrough = strikethroughState[question.id]?.includes(index);
                            return (
                                <div
                                  key={index}
                                    onClick={() => handleAnswerSelect(question.id, index)}
                                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                                    isSelected 
                                      ? 'bg-slate-50 text-slate-900 shadow-md border-slate-300 ring-2 ring-slate-100' 
                                      : isStruckThrough
                                        ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-default'
                                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer'
                                  }`}
                                >
                                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                                      isSelected ? 'bg-slate-700 border-slate-700 text-white' : isStruckThrough ? 'bg-gray-200 border-gray-300 text-gray-400' : 'bg-white border-slate-300 text-slate-600 group-hover:border-slate-400'
                                  }`}>
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <div className="flex-1">
                                      <span className={`text-sm ${isSelected ? 'text-slate-900' : 'text-slate-700'} ${isStruckThrough ? 'line-through' : ''}`}>
                                      {option}
                                    </span>
                                  </div>
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
                  <div className="pt-8">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
                    </div>
                                </div>
                              )}
                            </div>

        {isModalOpen && selectedVideoQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
              >
                <X className="w-5 h-5"/>
              </button>
              <div className="p-6">
                {/* Placeholder for video content */}
                <div className="aspect-video bg-black rounded-lg">
                  {selectedVideoQuestion.explanationVideo ? (
                    <video key={selectedVideoQuestion.explanationVideo} controls autoPlay className="w-full h-full rounded-lg">
                      <source src={selectedVideoQuestion.explanationVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white">No video available for this question.</p>
                </div>
              )}
            </div>
          </div>
        </div>
          </div>
        )}

        {/* Navigation Buttons REMOVED */}
      </div>
    </div>
  );
} 