'use client';

import { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Check, X, Brain, Lock } from 'lucide-react';
import Link from 'next/link';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
// MVP: Removed authentication imports
// import { useAuthContext } from '@/contexts/AuthContext';
// import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';

interface VideoComprehensionChecksPageProps {
  params: Promise<{
    videoSlug: string;
  }>;
}

export default function VideoComprehensionChecksPage({ params }: VideoComprehensionChecksPageProps) {
  const { videoSlug } = use(params);
  // MVP: Removed authentication context
  // const { user } = useAuthContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);

  // Find the video by slug
  const video = allVideos.find(v => v.videoSlug === videoSlug);
  
  // MVP: Check if video is from a locked unit (only Unit 1 is accessible)
  const isVideoLocked = video && parseInt(video.unit) > 2;
  
  // Get navigation items (videos and comprehension checks)
  const getNavigationItems = () => {
    if (!video) return { previous: null, next: null };
    
    // Create a sequence of all videos and their comprehension checks for the current unit
    const unitVideos = allVideos
      .filter(v => 
        v.subjects.includes('AP Macroeconomics') && 
        v.unit === video.unit
      )
      .sort((a, b) => {
        const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
        const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
        return aLesson - bLesson;
      });
    
    // Create the sequence: video -> comp check -> video -> comp check
    const sequence: Array<{ type: 'video' | 'comp-check'; video: any; index: number }> = [];
    unitVideos.forEach((v, index) => {
      sequence.push({ type: 'video', video: v, index });
      sequence.push({ type: 'comp-check', video: v, index });
    });
    
    // Find current position in sequence
    const currentSequenceIndex = sequence.findIndex(item => 
      item.type === 'comp-check' && item.video.videoSlug === videoSlug
    );
    
    let previous = null;
    let next = null;
    
    // Find previous item
    if (currentSequenceIndex > 0) {
      const prevItem = sequence[currentSequenceIndex - 1];
      if (prevItem.type === 'video') {
        previous = {
          type: 'video',
          title: `${prevItem.video.lessonIDS[0]}: Video`,
          href: `/videos/macro/${prevItem.video.videoSlug}`
        };
      } else {
        previous = {
          type: 'comp-check',
          title: `${prevItem.video.lessonIDS[0]}: Comprehension Check`,
          href: `/video-comprehension-checks/${prevItem.video.videoSlug}`
        };
      }
    } else if (currentSequenceIndex === 0) {
      // If this is the first item, check if there's a previous unit
      const prevUnitVideos = allVideos
        .filter(v => 
          v.subjects.includes('AP Macroeconomics') && 
          v.unit === String(parseInt(video.unit) - 1)
        )
        .sort((a, b) => {
          const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
          const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
          return aLesson - bLesson;
        });
      
      if (prevUnitVideos.length > 0) {
        const lastVideo = prevUnitVideos[prevUnitVideos.length - 1];
        previous = {
          type: 'comp-check',
          title: `${lastVideo.lessonIDS[0]}: Comprehension Check`,
          href: `/video-comprehension-checks/${lastVideo.videoSlug}`
        };
      }
    }
    
    // Find next item - should be the next video in the current unit
    if (currentSequenceIndex < sequence.length - 1) {
      const nextItem = sequence[currentSequenceIndex + 1];
      if (nextItem.type === 'video') {
        next = {
          type: 'video',
          title: `${nextItem.video.lessonIDS[0]}: Video`,
          href: `/videos/macro/${nextItem.video.videoSlug}`
        };
      } else {
        next = {
          type: 'comp-check',
          title: `${nextItem.video.lessonIDS[0]}: Comprehension Check`,
          href: `/video-comprehension-checks/${nextItem.video.videoSlug}`
        };
      }
    } else {
      // If this is the last item, check if there's a next unit
      const nextUnitVideos = allVideos
        .filter(v => 
          v.subjects.includes('AP Macroeconomics') && 
          v.unit === String(parseInt(video.unit) + 1)
        )
        .sort((a, b) => {
          const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
          const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
          return aLesson - bLesson;
        });
      
      if (nextUnitVideos.length > 0) {
        const firstVideo = nextUnitVideos[0];
        // MVP: Check if next unit is locked (only Unit 1 is accessible)
        const isNextUnitLocked = parseInt(firstVideo.unit) > 2;
        if (!isNextUnitLocked) {
          next = {
            type: 'video',
            title: `${firstVideo.lessonIDS[0]}: Video`,
            href: `/videos/macro/${firstVideo.videoSlug}`
          };
        }
      }
    }
    
    return { previous, next };
  };
  
  const { previous, next } = getNavigationItems();

  // Reset state when video changes
  useEffect(() => {
    console.log('VideoComprehensionChecks: Resetting state for video:', videoSlug);
    setAnsweredQuestions({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setExplanationError(null);
  }, [videoSlug]);

  // Debug logging for state changes
  useEffect(() => {
    if (video) {
      const totalQuestions = video.questions.length;
      const currentQuestion = video.questions[currentQuestionIndex];
      const currentAnswer = answeredQuestions[currentQuestion?.id];
      
      console.log('VideoComprehensionChecks: Current question index:', currentQuestionIndex);
      console.log('VideoComprehensionChecks: Current question:', currentQuestion);
      console.log('VideoComprehensionChecks: Answered questions:', answeredQuestions);
      console.log('VideoComprehensionChecks: Current answer for question:', currentAnswer);
    }
  }, [video, currentQuestionIndex, answeredQuestions]);
  
  // If video not found, show error
  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Video Not Found</h1>
          <p className="text-gray-600 mb-6">The video you're looking for doesn't exist.</p>
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

  // MVP: Check if video is from a locked unit (only Unit 1 is accessible)
  if (isVideoLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Premium Content Locked</h1>
          <p className="text-gray-600 mb-6">
            This comprehension check is part of Unit {video.unit}, which requires a subscription. 
            Complete Unit 1 to unlock access to all units.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What's included:</strong> {video.questions.length} practice questions 
              with detailed explanations.
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

  // MVP: Removed authentication requirement - allow all users to access comprehension checks
  // if (!user) {
  //   return <AuthGate />;
  // }

  const totalQuestions = video.questions.length;
  const currentQuestion = video.questions[currentQuestionIndex];
  const currentAnswer = answeredQuestions[currentQuestion.id];

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('VideoComprehensionChecks: Answering question', currentQuestion.id, 'with answer index', answerIndex, 'isCorrect:', answerIndex === currentQuestion.correctAnswer);
    
    if (currentAnswer) {
      console.log('VideoComprehensionChecks: Question already answered, returning early');
      return; // Already answered
    }
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: { selectedAnswer: answerIndex, isCorrect }
    }));
    // Reset explanation when answering
    setShowExplanation(false);
    setExplanationError(null);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
      setExplanationError(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
      setExplanationError(null);
    }
  };

  const handleShowExplanation = () => {
    if (!currentAnswer) return;
    
    try {
      const explanation = currentQuestion.explanation;
      if (explanation) {
        setShowExplanation(true);
        setExplanationError(null);
      } else {
        throw new Error("Explanation is not available for this question.");
      }
    } catch (error) {
      console.error('Error showing explanation:', error);
      setExplanationError(error instanceof Error ? error.message : 'Failed to get explanation');
    }
  };

  const progress = Object.keys(answeredQuestions).length;
  const progressPercentage = (progress / totalQuestions) * 100;
  const isCompleted = progress === totalQuestions;
  const correctAnswers = Object.values(answeredQuestions).filter(answer => answer.isCorrect).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Course Sidebar */}
      <CourseSidebar 
        selectedUnit={video?.unit || '1'} 
        currentLessonId={video?.lessonIDS[0]}
        isFixed={true}
      />
      
      {/* Main Content */}
      <div className="flex-1 ml-80">
        <div className="max-w-6xl mx-auto">
          {/* Unified Container */}
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Comprehension Check</h1>
                      <p className="text-sm text-gray-600">{video.title}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>{totalQuestions} questions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
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

              {/* Content Area */}
              <div className="flex">
                {/* Question Card */}
                <div className="flex-1 border-r border-gray-200">
                  <div className="p-6">
                    {/* Question Text */}
                    <p className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                      {currentQuestion.text}
                    </p>

                    {/* Question Image */}
                    {currentQuestion.image && (
                      <div className="mb-6">
                        <img
                          src={currentQuestion.image}
                          alt="Question diagram"
                          className="w-full rounded-lg border border-gray-200"
                        />
                      </div>
                    )}

                    {currentAnswer && showExplanation && currentQuestion.explanation ? (
                      // --- Display Explanation Mode ---
                      <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                        {/* Correct Answer Summary */}
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Correct Answer</h4>
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-green-200 text-green-600 font-medium">
                              {String.fromCharCode(65 + currentQuestion.correctAnswer)}
                            </span>
                            <span className="font-medium text-gray-900">
                              {currentQuestion.options[currentQuestion.correctAnswer]}
                            </span>
                          </div>
                        </div>
                        {/* Explanation Box */}
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                          <p className="text-gray-900">{currentQuestion.explanation}</p>
                        </div>
                      </div>
                    ) : (
                      // --- Display Answer Options Mode ---
                      <>
                        {/* Answer Options */}
                        <div className="space-y-3 mb-6">
                          {currentQuestion.options.map((option, index) => {
                            const isSelected = currentAnswer?.selectedAnswer === index;
                            const isCorrect = index === currentQuestion.correctAnswer;
                            const showFeedback = currentAnswer !== undefined;

                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={currentAnswer !== undefined}
                                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                                  showFeedback
                                    ? (isCorrect 
                                        ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' 
                                        : isSelected 
                                          ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' 
                                          : 'bg-transparent text-gray-900 border-gray-200 cursor-default')
                                    : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                }`}
                              >
                                {/* Letter bubble */}
                                <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${
                                  showFeedback 
                                    ? (isCorrect 
                                        ? 'bg-green-100 border-green-300 text-green-700' 
                                        : isSelected 
                                          ? 'bg-red-100 border-red-300 text-red-700' 
                                          : 'bg-white border-gray-300 text-gray-500')
                                    : 'bg-white border-gray-300 text-gray-600'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </span>
                                
                                {/* Option Text */}
                                <span className="flex-1 text-sm">{option}</span>
                                
                                {/* Feedback Icon */}
                                {showFeedback && (
                                  <div className="flex-shrink-0">
                                    {isCorrect ? (
                                      <Check className="w-5 h-5 text-green-500" />
                                    ) : isSelected && !isCorrect ? (
                                      <X className="w-5 h-5 text-red-500" />
                                    ) : null}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Error Message for Missing Explanation */}
                        {explanationError && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{explanationError}</p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Question Navigation */}
                    {totalQuestions > 1 && (
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <button
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous Question
                        </button>
                        
                        <span className="text-sm text-gray-600">
                          {currentQuestionIndex + 1} of {totalQuestions}
                        </span>
                        
                        <button
                          onClick={handleNextQuestion}
                          disabled={currentQuestionIndex === totalQuestions - 1}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          Next Question
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-80">
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Study Resources</h3>
                    
                    {/* Show Explanation Button */}
                    <button
                      onClick={handleShowExplanation}
                      disabled={!currentAnswer || showExplanation}
                      className={`w-full p-3 rounded-lg border transition-all duration-200 mb-3 ${
                        explanationError 
                          ? 'border-red-200 hover:border-red-300 bg-white hover:bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                      } disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg transition-colors ${
                          explanationError 
                            ? 'bg-red-500 text-white' 
                            : 'bg-blue-500 text-white'
                        } disabled:bg-gray-400`}>
                          <Brain className="w-5 h-5" />
                        </div>
                        <span className={`font-semibold text-sm ${
                          explanationError ? 'text-red-600' : 'text-gray-900'
                        } disabled:text-gray-500`}>
                          {showExplanation ? 'Explanation Shown' : 'Show Explanation'}
                        </span>
                      </div>
                    </button>
                    
                    {/* Error Message for Missing Explanation */}
                    {explanationError && (
                      <div className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-md mb-3">
                        <p className="text-xs text-red-600">{explanationError}</p>
                      </div>
                    )}
                    
                    {/* Study Guide Link */}
                    <Link
                      href={`/unit/${video.unit}`}
                      className="block w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-gray-100 text-gray-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-sm text-gray-900">
                          Unit {video.unit} Study Guide
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-12 mb-8">
            <div className="w-full max-w-5xl">
              <div className="flex gap-4">
                {/* Previous Button */}
                <div className="flex-1">
                  {previous ? (
                    <Link
                      href={previous.href}
                      className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        <ArrowLeft className="w-6 h-6" />
                        Previous
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {previous.title}
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-400 mb-2">
                        <ArrowLeft className="w-6 h-6" />
                        Previous
                      </div>
                      <div className="text-sm font-medium text-gray-400">No previous resource</div>
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <div className="flex-1">
                  {next ? (
                    <Link
                      href={next.href}
                      className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        Next
                        <ArrowRight className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {next.title}
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50 text-right">
                      <div className="flex items-center justify-end gap-2 text-lg font-semibold text-gray-400 mb-2">
                        Next
                        <ArrowRight className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {parseInt(video.unit) === 1 ? "No next resource" : "🔒 Premium Content"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 