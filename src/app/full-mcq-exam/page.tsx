'use client';

import { useState } from 'react';
import { ArrowLeft, FileText, Check, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';
import { macroSetOneQuestions } from '@/data/questionBanks/macro/mcqs/macroSetOne';
import { use } from 'react';

// Helper function to convert letter answer to index
const getCorrectAnswerIndex = (correctAnswer: string): number => {
  return correctAnswer.charCodeAt(0) - 65; // Convert A=0, B=1, C=2, etc.
};

export default function FullMCQExamPage() {
  const { user } = useAuthContext();
  
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Get the full exam questions
  const questions = macroSetOneQuestions.questions;
  
  // Check if user is authenticated
  if (!user) {
    return <AuthGate />;
  }

  const totalQuestions = questions.length;

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

  const handleSubmit = () => {
    setIsSubmitted(true);
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
          <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
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
                      <div key={question.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                        {/* Question Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Question {questionIndex + 1}
                          </span>
                        </div>

                        {/* Question Text */}
                        <p className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                          {question.question}
                        </p>

                        {/* Question Image */}
                        {question.image && (
                          <div className="mb-6">
                            <img
                              src={question.image.src}
                              alt="Question diagram"
                              className="max-w-md rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => question.image && setExpandedImage(question.image.src)}
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
                                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                                  isSelected 
                                    ? 'bg-blue-50 text-gray-900 shadow-sm border-blue-200' 
                                    : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                }`}
                              >
                                {/* Letter bubble */}
                                <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${
                                  isSelected 
                                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                                    : 'bg-white border-gray-300 text-gray-600'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </span>
                                
                                {/* Option Text */}
                                <span className="flex-1 text-sm">{option}</span>
                              </button>
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
                      <div key={question.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                        {/* Question Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Question {questionIndex + 1}
                          </span>
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
                        <p className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                          {question.question}
                        </p>

                        {/* Question Image */}
                        {question.image && (
                          <div className="mb-6">
                            <img
                              src={question.image.src}
                              alt="Question diagram"
                              className="max-w-md rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => question.image && setExpandedImage(question.image.src)}
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
                                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
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
                                <span className="flex-1 text-sm">{option}</span>
                                
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
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Explanation</h4>
                          <p className="text-gray-700">
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
          <div className="w-full max-w-6xl">
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