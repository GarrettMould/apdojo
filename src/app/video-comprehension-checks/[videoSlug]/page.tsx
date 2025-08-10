'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Check, X, Brain } from 'lucide-react';
import Link from 'next/link';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';
import { use } from 'react';

interface VideoComprehensionChecksPageProps {
  params: Promise<{
    videoSlug: string;
  }>;
}

export default function VideoComprehensionChecksPage({ params }: VideoComprehensionChecksPageProps) {
  const { videoSlug } = use(params);
  const { user } = useAuthContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  // Find the video by slug
  const video = allVideos.find(v => v.videoSlug === videoSlug);

  // Reset state when video changes
  useEffect(() => {
    console.log('VideoComprehensionChecks: Resetting state for video:', videoSlug);
    setAnsweredQuestions({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
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

  // Check if user is authenticated
  if (!user) {
    return <AuthGate />;
  }

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
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const progress = Object.keys(answeredQuestions).length;
  const progressPercentage = (progress / totalQuestions) * 100;
  const isCompleted = progress === totalQuestions;
  const correctAnswers = Object.values(answeredQuestions).filter(answer => answer.isCorrect).length;

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
    
    // Find next item
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
        next = {
          type: 'video',
          title: `${firstVideo.lessonIDS[0]}: Video`,
          href: `/videos/macro/${firstVideo.videoSlug}`
        };
      }
    }
    
    return { previous, next };
  };
  
  const { previous, next } = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Course Sidebar */}
      <CourseSidebar 
        selectedUnit={video.unit}
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
                      className="w-full p-3 rounded-lg border border-gray-200 transition-all duration-200 mb-3 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed enabled:bg-blue-600 enabled:text-white enabled:hover:bg-blue-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg enabled:bg-white/20 disabled:bg-gray-100">
                          <Brain className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-sm">
                          Show Explanation
                        </span>
                      </div>
                    </button>
                    
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
                      <div className="text-sm font-medium text-gray-400">No next resource</div>
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