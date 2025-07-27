'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, FileText, Check, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { CourseSidebar } from '@/components/CourseSidebar';
import { getUnitMCQTest } from '@/data/unitMCQTests';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { videos as allVideos } from '@/data/videos';
import { use } from 'react';

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
  const { user } = useAuthContext();
  
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, { selectedAnswer: number; isCorrect: boolean }>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get the unit test questions
  const unitNumber = parseInt(unitId);
  const questions = getUnitMCQTest(unitNumber);
  
  // Get unit info
  const unitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.split(':')[0].split(' ')[1] === unitId.toString()
  );
  
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
        selectedUnit={unitId}
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
                              className="w-full rounded-lg border border-gray-200"
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
                              className="w-full rounded-lg border border-gray-200"
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
                  // Find the first video of the next unit
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
                  
                  return firstVideo ? (
                    <Link
                      href={`/videos/macro/${firstVideo.videoSlug}`}
                      className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group text-right"
                    >
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        Next
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {firstVideo.lessonIDS[0]}: Video
                      </div>
                    </Link>
                  ) : (
                    <div className="w-full h-24 p-4 rounded-lg border border-gray-200 bg-gray-50 text-right">
                      <div className="text-lg font-semibold text-gray-400 mb-2">Next</div>
                      <div className="text-sm font-medium text-gray-400">No next video</div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 