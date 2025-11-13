'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Brain } from 'lucide-react';
import Link from 'next/link';
import { Video as VideoType } from '@/data/videos';

interface VideoWithComprehensionCheckProps {
  video: VideoType;
  previous?: { type: 'video' | 'comp-check'; title: string; href: string } | null;
  next?: { type: 'video' | 'comp-check'; title: string; href: string } | null;
}

export default function VideoWithComprehensionCheck({ video, previous, next }: VideoWithComprehensionCheckProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleAnswerSelect = (questionId: string, selectedAnswer: number) => {
    const question = video.questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedAnswer, isCorrect }
    }));
  };

  const currentQuestion = video.questions[currentQuestionIndex];
  const isQuestionAnswered = answeredQuestions[currentQuestion?.id || ''];

  const goToNextQuestion = () => {
    if (currentQuestionIndex < video.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const progress = (Object.keys(answeredQuestions).length / video.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Video and Information */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Video Section */}
          <div className="mb-6">
            <video 
              ref={videoRef}
              controls 
              autoPlay 
              className="w-full max-w-3xl aspect-video rounded-lg shadow-lg"
              playsInline
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Video Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{video.title}</h1>
            <p className="text-gray-600 mb-3 text-base">Unit {video.unit} - {video.subjects.join(', ')}</p>
            {video.description && (
              <p className="text-gray-700 leading-relaxed text-base">{video.description}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8">
            <div className="flex gap-3">
              {/* Previous Button */}
              <div className="flex-1">
                {previous ? (
                  <Link
                    href={previous.href}
                    className="block w-full h-16 p-3 rounded-lg border border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2 text-base font-semibold text-blue-700 group-hover:text-blue-800 transition-colors mb-1">
                      <ArrowLeft className="w-5 h-5" />
                      Previous
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {previous.title}
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-16 p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2 text-base font-semibold text-gray-400 mb-1">
                      <ArrowLeft className="w-5 h-5" />
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
                    className="block w-full h-16 p-3 rounded-lg border border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2 text-base font-semibold text-blue-700 group-hover:text-blue-800 transition-colors mb-1">
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-16 p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2 text-base font-semibold text-gray-400 mb-1">
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-gray-400">No next resource</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Comprehension Check */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Comprehension Check</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {video.questions.length}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          {currentQuestion && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.text}
              </h3>
              
              {/* Question Image */}
              {currentQuestion.image && (
                <div className="mb-4">
                  <img 
                    src={currentQuestion.image} 
                    alt="Question illustration"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = isQuestionAnswered?.selectedAnswer === index;
                  const isCorrect = isQuestionAnswered && index === currentQuestion.correctAnswer;
                  const hasAnswered = !!isQuestionAnswered;
                  
                  let optionClasses = "w-full p-3 text-left rounded-lg border transition-all duration-200 cursor-pointer";
                  
                  if (hasAnswered) {
                    if (isCorrect) {
                      optionClasses += " bg-green-50 border-green-300 text-green-800";
                    } else if (isSelected) {
                      optionClasses += " bg-red-50 border-red-300 text-red-800";
                    } else {
                      optionClasses += " bg-gray-50 border-gray-200 text-gray-600";
                    }
                  } else {
                    optionClasses += " bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => !hasAnswered && handleAnswerSelect(currentQuestion.id, index)}
                      className={optionClasses}
                      disabled={hasAnswered}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          hasAnswered
                            ? isCorrect
                              ? 'border-green-500 bg-green-500 text-white'
                              : isSelected
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300 bg-gray-300 text-gray-600'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {hasAnswered && (
                            isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isQuestionAnswered && currentQuestion.explanation && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                  <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === video.questions.length - 1}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
            <div className="text-sm text-gray-600">
              {Object.keys(answeredQuestions).length} of {video.questions.length} questions answered
            </div>
            <div className="mt-2 flex gap-1">
              {video.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    answeredQuestions[video.questions[index]?.id || '']
                      ? answeredQuestions[video.questions[index]?.id || ''].isCorrect
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
