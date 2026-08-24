'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DrawingPad } from '@/components/DrawingPad';
import { Input } from "@/components/ui/input";
import { X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { frqSetOneQuestions } from '@/data/questionBanks/macro/frqs/setOne';
import { useAuthContext } from '@/contexts/AuthContext';
import { saveTestProgress, loadTestProgress, saveTestResult } from '@/lib/testProgress';
import { getFullMCQExamPreviewUrl } from '@/lib/utils';

interface SubPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: StaticImageData | string;
}

interface Part {
  label: string;
  text: string;
  answerType: 'draw' | 'text' | null;
  answer?: StaticImageData | string;
  subparts?: SubPart[];
}

interface Question {
  questionNumber: number;
  prompt: string;
  image?: StaticImageData;
  parts: Part[];
}

interface ResultsViewProps {
  questions: {
    examTitle: string;
    questions: Question[];
  };
  textAnswers: Record<string, string>;
  drawingAnswers: Record<string, string>;
  onReturn: () => void;
}

const isStaticImageData = (value: any): value is StaticImageData => {
  return value && typeof value === 'object' && 'src' in value;
};

export default function FullFRQExamPage() {
  const { user, selectedSubject } = useAuthContext();
  const mcqPreviewHref = getFullMCQExamPreviewUrl(selectedSubject === 'micro' ? 'micro' : 'macro', 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  const questions = frqSetOneQuestions;
  const currentQuestion = questions.questions[currentQuestionIndex];
  const totalQuestions = questions.questions.length;

  // Load saved progress on component mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setIsLoadingProgress(false);
        return;
      }

      try {
        const savedProgress = await loadTestProgress(user.uid, 'full_frq_exam');
        if (savedProgress && !savedProgress.isSubmitted) {
          setTextAnswers(savedProgress.textAnswers || {});
          setDrawingAnswers(savedProgress.drawingAnswers || {});
          setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
          setHasSavedProgress(true);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setIsLoadingProgress(false);
      }
    };

    loadProgress();
  }, [user]);

  // Save progress whenever answers change
  useEffect(() => {
    const saveProgress = async () => {
      if (!user || isLoadingProgress) return;

      try {
        await saveTestProgress({
          userId: user.uid,
          testType: 'full_frq',
          testId: 'full_frq_exam',
          progress: {
            textAnswers,
            drawingAnswers,
            currentQuestionIndex,
            isSubmitted: showResults,
            totalQuestions,
            startedAt: new Date(),
            lastUpdated: new Date()
          }
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    // Debounce save calls
    const timeoutId = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [textAnswers, drawingAnswers, currentQuestionIndex, showResults, user, isLoadingProgress, totalQuestions]);

  const handleTextAnswer = (questionId: string, value: string) => {
    setTextAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleDrawingAnswer = (questionId: string, drawingData: string) => {
    setDrawingAnswers(prev => ({
      ...prev,
      [questionId]: drawingData
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setShowResults(true);
    
    if (user) {
      try {
        await saveTestResult({
          userId: user.uid,
          testType: 'full_frq',
          testId: 'full_frq_exam',
          score: 0, // FRQ exams don't have numerical scores
          totalQuestions
        });
      } catch (error) {
        console.error('Error saving test result:', error);
      }
    }
  };

  const handleStartOver = () => {
    setTextAnswers({});
    setDrawingAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setHasSavedProgress(false);
  };

  const ResultsView = ({ questions, textAnswers, drawingAnswers, onReturn }: ResultsViewProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions.questions[currentQuestionIndex];

    return (
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-8 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Question {currentQuestionIndex + 1} of {questions.questions.length}
            </h2>
            <Button onClick={onReturn} variant="outline">
              Return to Exam
            </Button>
          </div>
        </div>

        <div className="p-8">
          {/* Question Prompt */}
          <div className="mb-8">
            <p className="text-lg font-medium text-slate-900 leading-relaxed">{currentQuestion.prompt}</p>
            {currentQuestion.image && (
              <div className="mt-6">
                <img 
                  src={currentQuestion.image.src}
                  alt="Question"
                  className="max-h-[300px] object-contain rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Parts and Answers */}
          <div className="space-y-8">
            {currentQuestion.parts.map((part, partIndex) => (
              <div key={partIndex} className="space-y-4">
                <div className="flex gap-3">
                  <span className="font-medium text-slate-700">{part.label})</span>
                  <p className="text-slate-900">{part.text}</p>
                </div>

                {/* User's Response */}
                {part.answerType === 'text' ? (
                  <div className="ml-8">
                    <div className="mb-2 font-medium text-slate-600">Your Response:</div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      {textAnswers[`${currentQuestionIndex}-${part.label}`] || 'No response provided'}
                    </div>
                  </div>
                ) : part.answerType === 'draw' ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                      <div className="mb-2 font-medium text-slate-600">Your Response:</div>
                      <div className="h-[400px] bg-white rounded-lg border border-slate-200">
                        {drawingAnswers[`${currentQuestionIndex}-${part.label}`] ? (
                          <img 
                            src={drawingAnswers[`${currentQuestionIndex}-${part.label}`]}
                            alt="Your drawing"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            No drawing provided
                          </div>
                        )}
                      </div>
                    </div>
                    {part.answer && (
                      <div className="w-full sm:w-1/2">
                        <div className="mb-2 font-medium text-green-600">Correct Response:</div>
                        <div className="h-[400px] bg-white rounded-lg border border-slate-200">
                          {typeof part.answer === 'object' ? (
                            <img 
                              src={part.answer.src}
                              alt="Correct drawing"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="p-4">{part.answer}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Correct Answer for text questions */}
                {part.answerType === 'text' && part.answer && (
                  <div className="ml-8">
                    <div className="mb-2 font-medium text-green-600">Correct Answer:</div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      {typeof part.answer === 'string' ? part.answer : 'No response provided'}
                    </div>
                  </div>
                )}

                {/* Subparts */}
                {part.subparts && (
                  <div className="ml-8 space-y-6">
                    {part.subparts.map((subpart, subpartIndex) => (
                      <div key={subpartIndex} className="space-y-4">
                        <div className="flex gap-3">
                          <span className="font-medium text-slate-700">{subpart.label}.</span>
                          <p className="text-slate-900">{subpart.text}</p>
                        </div>

                        {subpart.answerType && (
                          <div className="ml-8">
                            {subpart.answerType === 'text' ? (
                              <>
                                <div className="mb-2 font-medium text-slate-600">Your Response:</div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                  {textAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] || 'No response provided'}
                                </div>
                              </>
                            ) : subpart.answerType === 'draw' ? (
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-1/2">
                                  <div className="mb-2 font-medium text-slate-600">Your Response:</div>
                                  <div className="h-[400px] bg-white rounded-lg border border-slate-200">
                                    {drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] ? (
                                      <img 
                                        src={drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`]}
                                        alt="Your drawing"
                                        className="w-full h-full object-contain"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                                        No drawing provided
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {subpart.answer && (
                                  <div className="w-full sm:w-1/2">
                                    <div className="mb-2 font-medium text-green-600">Correct Response:</div>
                                    <div className="h-[400px] bg-white rounded-lg border border-slate-200">
                                      {typeof subpart.answer === 'object' ? (
                                        <img 
                                          src={subpart.answer.src}
                                          alt="Correct drawing"
                                          className="w-full h-full object-contain"
                                        />
                                      ) : (
                                        <div className="p-4">{subpart.answer}</div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="p-8 border-t border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="w-28"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.questions.length - 1}
              variant="outline"
              className="w-28"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            AP Macroeconomics Full FRQ Exam
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Complete all questions to submit and view your score. Explanations are available after you submit.
          </p>
        </div>

        {/* Resume Test Banner */}
        {hasSavedProgress && !showResults && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-blue-800 font-medium">
                  You have saved progress. You can continue where you left off or start over.
                </span>
              </div>
              <Button onClick={handleStartOver} variant="outline" size="sm">
                Start Over
              </Button>
            </div>
          </div>
        )}

        {showResults ? (
          <ResultsView
            questions={questions}
            textAnswers={textAnswers}
            drawingAnswers={drawingAnswers}
            onReturn={() => {
              setShowResults(false);
              setCurrentQuestionIndex(0);
            }}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Question Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-slate-700">
                      {currentQuestionIndex + 1}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-8">
              {/* Main Prompt */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-slate-900 leading-relaxed mb-4">
                  {currentQuestion.prompt}
                </h3>
                {currentQuestion.image && (
                  <div className="mt-6">
                    <img 
                      src={currentQuestion.image.src}
                      alt="Question"
                      className="max-h-[300px] object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        if (currentQuestion.image) {
                          setSelectedImage(currentQuestion.image);
                          setShowImageModal(true);
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Parts and Subparts */}
              <div className="space-y-6">
                {currentQuestion.parts.map((part, partIndex) => (
                  <div key={partIndex} className="space-y-4">
                    <div className="flex gap-3">
                      <span className="font-medium text-slate-700">{part.label})</span>
                      <p className="text-slate-900">{part.text}</p>
                    </div>

                    {/* Answer Section */}
                    <div className="ml-8">
                      {part.answerType === 'text' ? (
                        <Input
                          placeholder="Enter your answer here..."
                          value={textAnswers[`${currentQuestionIndex}-${part.label}`] || ''}
                          onChange={(e) => handleTextAnswer(`${currentQuestionIndex}-${part.label}`, e.target.value)}
                          className="w-full"
                        />
                      ) : part.answerType === 'draw' ? (
                        <div className="h-[400px] relative border-2 border-slate-300 rounded-lg overflow-hidden">
                          <DrawingPad
                            isLarge={true}
                            className="w-full relative"
                            hideDoneButton
                            initialData={drawingAnswers[`${currentQuestionIndex}-${part.label}`]}
                            onSave={(data) => handleDrawingAnswer(`${currentQuestionIndex}-${part.label}`, data)}
                          />
                        </div>
                      ) : null}
                    </div>

                    {/* Subparts */}
                    {part.subparts && (
                      <div className="ml-8 space-y-4">
                        {part.subparts.map((subpart, subpartIndex) => (
                          <div key={subpartIndex} className="space-y-3">
                            <div className="flex gap-3">
                              <span className="font-medium text-slate-700">{subpart.label}.</span>
                              <p className="text-slate-900">{subpart.text}</p>
                            </div>
                            
                            <div className="ml-8">
                              {subpart.answerType === 'text' ? (
                                <Input
                                  placeholder="Enter your answer here..."
                                  value={textAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] || ''}
                                  onChange={(e) => handleTextAnswer(`${currentQuestionIndex}-${part.label}-${subpart.label}`, e.target.value)}
                                  className="w-full"
                                />
                              ) : subpart.answerType === 'draw' ? (
                                <div className="h-[400px] relative border-2 border-slate-300 rounded-lg overflow-hidden">
                                  <DrawingPad
                                    isLarge={true}
                                    className="w-full relative"
                                    hideDoneButton
                                    onSave={(data) => handleDrawingAnswer(`${currentQuestionIndex}-${part.label}-${subpart.label}`, data)}
                                    initialData={drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`]}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="p-8 border-t border-gray-200 bg-white">
              <div className="flex justify-between items-center">
                <Button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="w-28"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <div className="flex gap-4">
                  <Button
                    onClick={goToNextQuestion}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    variant="outline"
                    className="w-28"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {currentQuestionIndex === totalQuestions - 1 && (
                    <Button
                      onClick={handleSubmit}
                      className="w-28 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-12 mb-8">
          <div className="w-full max-w-5xl">
            <div className="flex gap-4">
              {/* Previous Button */}
              <div className="flex-1">
                <Link
                  href={mcqPreviewHref}
                  className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    Previous
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Full MCQ Exam
                  </div>
                </Link>
              </div>

              {/* Next Button */}
              <div className="flex-1">
                <Link
                  href="/ap-macro-course"
                  className="block w-full h-24 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group text-right"
                >
                  <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    Next
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    AP Macro Course
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={selectedImage.src} 
              alt="Question" 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 