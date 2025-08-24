'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Check, X, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
// MVP: Removed authentication imports
// import { useAuthContext } from '@/contexts/AuthContext';
// import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { videos as allVideos } from '@/data/videos';
import { use } from 'react';
import { saveTestProgress, loadTestProgress, saveTestResult } from '@/lib/testProgress';

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
  // MVP: Removed authentication context
  // const { user } = useAuthContext();
  
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // Get the unit test questions
  const unitNumber = parseInt(unitId);
  const questions = getUnitMCQTest(unitNumber);
  const totalQuestions = questions.length;
  
  // MVP: Only allow access to Unit 1
  const isUnitLocked = unitNumber > 1;
  
  // Get unit info
  const unitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.split(':')[0].split(' ')[1] === unitId.toString()
  );

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
    
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const isCorrect = String.fromCharCode(65 + answerIndex) === question.correctAnswer;
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedAnswer: answerIndex, isCorrect }
    }));
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Course Sidebar */}
      <CourseSidebar 
        selectedUnit={unitId}
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
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                              Lesson {question.lessonIDS[0]}
                            </span>
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
                          <div className="mb-8 flex justify-center">
                            <img
                              src={question.image.src}
                              alt="Question diagram"
                              className="max-w-2xl w-full rounded-lg border border-slate-200 shadow-sm"
                            />
                          </div>
                        )}

                        {/* Answer Options */}
                        <div className="space-y-3">
                          {question.options.map((option, index) => {
                            const isSelected = currentAnswer?.selectedAnswer === index;
                            
                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(question.id, index)}
                                disabled={isSubmitted}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group ${
                                  isSelected 
                                    ? 'bg-slate-50 text-slate-900 shadow-md border-slate-300 ring-2 ring-slate-100' 
                                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md'
                                }`}
                              >
                                {/* Letter indicator */}
                                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all duration-200 ${
                                  isSelected 
                                    ? 'bg-slate-700 border-slate-700 text-white' 
                                    : 'bg-white border-slate-300 text-slate-600 group-hover:border-slate-400'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                
                                {/* Option Text */}
                                <div className="flex-1 pt-1">
                                  <span className={`text-base ${
                                    isSelected ? 'text-slate-900' : 'text-slate-700'
                                  }`}>
                                    {option}
                                  </span>
                                </div>
                              </button>
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
                      disabled={progress < totalQuestions}
                      className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
                    >
                      Submit Test
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h2>
                    <p className="text-lg text-gray-600">
                      You got {correctAnswers} out of {totalQuestions} questions correct.
                    </p>
                  </div>

                  {/* Score Breakdown by Lesson */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Score Breakdown by Lesson</h3>
                      <Link 
                        href="/unitMCQPracticePage?mode=custom&units=1&subject=macro"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 text-sm rounded-lg transition-colors duration-200"
                      >
                        <span>Practice More</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
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
                          
                          const answer = answeredQuestions[question.id];
                          if (answer?.isCorrect) {
                            lessonScores[lessonId].correct++;
                          }
                        });
                        
                        // Calculate percentages
                        Object.keys(lessonScores).forEach(lessonId => {
                          lessonScores[lessonId].percentage = Math.round((lessonScores[lessonId].correct / lessonScores[lessonId].total) * 100);
                        });
                        
                        return Object.entries(lessonScores).map(([lessonId, score]) => (
                          <div key={lessonId} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">Lesson {lessonId}</span>
                              <span className="text-sm font-semibold text-gray-700">
                                {score.percentage}%
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {score.correct} of {score.total} correct
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
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
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                              Lesson {question.lessonIDS[0]}
                            </span>
                            {isCorrect ? (
                              <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
                                <span className="text-sm font-semibold text-emerald-700">Correct</span>
                              </div>
                            ) : (
                              <div className="px-3 py-1 bg-red-50 border border-red-200 rounded-lg">
                                <span className="text-sm font-semibold text-red-700">Incorrect</span>
                              </div>
                            )}
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
                          <div className="mb-8 flex justify-center">
                            <img
                              src={question.image.src}
                              alt="Question diagram"
                              className="max-w-2xl w-full rounded-lg border border-slate-200 shadow-sm"
                            />
                          </div>
                        )}

                        {/* Answer Options with Feedback */}
                        <div className="space-y-3 mb-6">
                          {question.options.map((option, index) => {
                            const isSelected = currentAnswer?.selectedAnswer === index;
                            const isCorrectAnswer = String.fromCharCode(65 + index) === question.correctAnswer;
                            
                            return (
                              <div
                                key={index}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                                  isCorrectAnswer 
                                    ? 'bg-green-50 text-gray-900 shadow-sm border-green-200' 
                                    : isSelected && !isCorrectAnswer
                                      ? 'bg-red-50 text-gray-900 shadow-sm border-red-200' 
                                      : 'bg-transparent text-gray-900 border-gray-200'
                                }`}
                              >
                                {/* Letter bubble */}
                                <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${
                                  isCorrectAnswer 
                                    ? 'bg-green-100 border-green-300 text-green-700' 
                                    : isSelected && !isCorrectAnswer
                                      ? 'bg-red-100 border-red-300 text-red-700' 
                                      : 'bg-white border-gray-300 text-gray-500'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </span>
                                
                                {/* Option Text */}
                                <span className="flex-1 text-base">{option}</span>
                                
                                {/* Feedback Icon */}
                                <div className="flex-shrink-0">
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
                {(() => {
                  // Find the last video of the current unit
                  const unitVideos = allVideos
                    .filter(v => 
                      v.subjects.includes('AP Macroeconomics') && 
                      v.unit === unitId
                    )
                    .sort((a, b) => {
                      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
                      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
                      return aLesson - bLesson;
                    });
                  
                  const lastVideo = unitVideos[unitVideos.length - 1];
                  
                  return lastVideo ? (
                    <Link
                      href={`/videos/macro/${lastVideo.videoSlug}`}
                      className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        Previous
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {lastVideo.lessonIDS[0]}: Video
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="text-lg font-semibold text-gray-400 mb-2">Previous</div>
                      <div className="text-sm font-medium text-gray-400">No previous video</div>
                    </div>
                  );
                })()}
              </div>

              {/* Next Button */}
              <div className="flex-1">
                {(() => {
                  // For Unit 1, navigate to MCQ Explanations video
                  if (unitId === '1') {
                    return (
                      <Link
                        href="/videos/macro/mcq-explanations"
                        className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group text-right"
                      >
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          Next
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          MCQ Explanations
                        </div>
                      </Link>
                    );
                  }
                  
                  // For other units, find the first video of the next unit
                  const nextUnitVideos = allVideos
                    .filter(v => 
                      v.subjects.includes('AP Macroeconomics') && 
                      v.unit === String(parseInt(unitId) + 1)
                    )
                    .sort((a, b) => {
                      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
                      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
                      return aLesson - bLesson;
                    });
                  
                  const firstVideo = nextUnitVideos[0];
                  
                  // MVP: Check if next unit is locked (only Unit 1 is accessible)
                  const isNextUnitLocked = parseInt(unitId) === 1 && firstVideo && parseInt(firstVideo.unit) > 1;
                  
                  if (firstVideo && !isNextUnitLocked) {
                    return (
                      <Link
                        href={`/videos/macro/${firstVideo.videoSlug}`}
                        className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-300 transition-all duration-200 group text-right"
                      >
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          Next
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          {firstVideo.lessonIDS[0]}: Video
                        </div>
                      </Link>
                    );
                  } else if (isNextUnitLocked) {
                    // Show locked state for Unit 2+ content
                    return (
                      <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50 text-right cursor-not-allowed">
                        <div className="text-lg font-semibold text-gray-400 mb-2">Next</div>
                        <div className="text-sm font-medium text-gray-400 flex items-center justify-end gap-2">
                          <Lock className="w-4 h-4 text-gray-400" />
                          {firstVideo.lessonIDS[0]}: Video
                        </div>
                      </div>
                    );
                  } else {
                    // No next video available
                    return (
                      <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50 text-right">
                        <div className="text-lg font-semibold text-gray-400 mb-2">Next</div>
                        <div className="text-sm font-medium text-gray-400">No next video</div>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 