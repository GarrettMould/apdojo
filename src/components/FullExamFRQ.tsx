'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DrawingPad } from '@/components/DrawingPad';
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';
import { StaticImageData } from 'next/image';

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

interface FullExamFRQProps {
  questions: {
    examTitle: string;
    questions: Question[];
  };
}

interface ResultsViewProps {
  questions: FullExamFRQProps['questions'];
  textAnswers: Record<string, string>;
  drawingAnswers: Record<string, string>;
  onReturn: () => void;
}

const isStaticImageData = (value: any): value is StaticImageData => {
  return value && typeof value === 'object' && 'src' in value;
};

export function FullExamFRQ({ questions }: FullExamFRQProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<'study' | 'strict'>('study');
  const currentQuestion = questions.questions[currentQuestionIndex];
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);
  const [showResults, setShowResults] = useState(false);

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
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const ResultsView = ({ questions, textAnswers, drawingAnswers, onReturn }: ResultsViewProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions.questions[currentQuestionIndex];

    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Question {currentQuestionIndex + 1} of {questions.questions.length}
            </h2>
            <Button onClick={onReturn} variant="outline">
              Return to Exam
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Question Prompt */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900">{currentQuestion.prompt}</p>
            {currentQuestion.image && (
              <div className="mt-4">
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
                  <span className="font-medium text-gray-700">{part.label})</span>
                  <p className="text-gray-900">{part.text}</p>
                </div>

                {/* User's Response */}
                {part.answerType === 'text' ? (
                  <div className="ml-8">
                    <div className="mb-2 font-medium text-gray-600">Your Response:</div>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      {textAnswers[`${currentQuestionIndex}-${part.label}`] || 'No response provided'}
                    </div>
                  </div>
                ) : part.answerType === 'draw' ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/2">
                      <div className="mb-2 font-medium text-gray-600">Your Response:</div>
                      <div className="h-[400px] bg-white rounded-md border border-gray-200">
                        {drawingAnswers[`${currentQuestionIndex}-${part.label}`] ? (
                          <img 
                            src={drawingAnswers[`${currentQuestionIndex}-${part.label}`]}
                            alt="Your drawing"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No drawing provided
                          </div>
                        )}
                      </div>
                    </div>
                    {part.answer && (
                      <div className="w-full sm:w-1/2">
                        <div className="mb-2 font-medium text-green-600">Correct Response:</div>
                        <div className="h-[400px] bg-white rounded-md border border-gray-200">
                          {typeof part.answer === 'object' ? (
                            <img 
                              src={part.answer.src}
                              alt="Correct drawing"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="p-3">{part.answer}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Remove the old Correct Answer section for drawing questions */}
                {part.answerType === 'text' && part.answer && (
                  <div className="ml-8">
                    <div className="mb-2 font-medium text-green-600">Correct Answer:</div>
                    <div className="p-3 bg-green-50 rounded-md border border-green-200">
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
                          <span className="font-medium text-gray-700">{subpart.label}.</span>
                          <p className="text-gray-900">{subpart.text}</p>
                        </div>

                        {/* Only render response if there's an answerType */}
                        {subpart.answerType && (
                          <div className="ml-8">
                            {subpart.answerType === 'text' ? (
                              <>
                                <div className="mb-2 font-medium text-gray-600">Your Response:</div>
                                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                                  {textAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] || 'No response provided'}
                                </div>
                              </>
                            ) : subpart.answerType === 'draw' ? (
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className={`w-full ${showResults ? 'sm:w-1/2' : ''}`}>
                                  {showResults ? (
                                    <>
                                      <div className="mb-2 font-medium text-gray-600">Your Response:</div>
                                      <div className="h-[400px] bg-white rounded-md border border-gray-200">
                                        {drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] ? (
                                          <img 
                                            src={drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`]}
                                            alt="Your drawing"
                                            className="w-full h-full object-contain"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No drawing provided
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="h-[400px] relative border-2 border-black rounded-md overflow-hidden">
                                      <DrawingPad
                                        isLarge={true}
                                        className="w-full relative"
                                        onSave={(data) => handleDrawingAnswer(`${currentQuestionIndex}-${part.label}-${subpart.label}`, data)}
                                        initialData={drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`]}
                                      />
                                    </div>
                                  )}
                                </div>
                                {showResults && subpart.answer && (
                                  <div className="w-full sm:w-1/2">
                                    <div className="mb-2 font-medium text-green-600">Correct Response:</div>
                                    <div className="h-[400px] bg-white rounded-md border border-gray-200">
                                      {typeof subpart.answer === 'object' ? (
                                        <img 
                                          src={subpart.answer.src}
                                          alt="Correct drawing"
                                          className="w-full h-full object-contain"
                                        />
                                      ) : (
                                        <div className="p-3">{subpart.answer}</div>
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
        <div className="p-6 border-t bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="w-full sm:w-28"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.questions.length - 1, prev + 1))}
                disabled={currentQuestionIndex === questions.questions.length - 1}
                variant="outline"
                className="w-full sm:w-28"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <a 
          href={`/purchase/macro-exams`} 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Exams Page
        </a>
        <h1 className="text-4xl font-bold mt-4">
          {questions.examTitle}
        </h1>
      </div>

      {showResults ? (
        <ResultsView
          questions={questions}
          textAnswers={textAnswers}
          drawingAnswers={drawingAnswers}
          onReturn={() => {
            setShowResults(false);
            setCurrentQuestionIndex(0);
            setDrawingAnswers({});
          }}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Question Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">
                Question {currentQuestionIndex + 1} of {questions.questions.length}
              </span>
              {/*<div className="flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setMode('study')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    mode === 'study' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Study Mode
                </button>
                <button
                  onClick={() => setMode('strict')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    mode === 'strict' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Strict Mode
                </button>
              </div>*/}
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            {/* Main Prompt */}
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-900">{currentQuestion.prompt}</p>
              {currentQuestion.image && (
                <div className="mt-4">
                  <img 
                    src={currentQuestion.image.src}
                    alt="Question"
                    className="max-h-[300px] object-contain rounded-lg"
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
                    <span className="font-medium text-gray-700">{part.label})</span>
                    <p className="text-gray-900">{part.text}</p>
                  </div>

                  {/* Answer Section */}
                  <div className="ml-8">
                    {part.answerType === 'text' ? (
                      <Input
                        placeholder="Enter your answer here..."
                        value={textAnswers[`${currentQuestionIndex}-${part.label}`] || ''}
                        onChange={(e) => handleTextAnswer(`${currentQuestionIndex}-${part.label}`, e.target.value)}
                        className="w-full align-top"
                        style={{ verticalAlign: 'top' }}
                      />
                    ) : part.answerType === 'draw' ? (
                      <div className="h-[400px] relative border-2 border-black rounded-md overflow-hidden">
                        <DrawingPad
                          isLarge={true}
                          className="w-full relative"
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
                            <span className="font-medium text-gray-700">{subpart.label}.</span>
                            <p className="text-gray-900">{subpart.text}</p>
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
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className={`w-full ${showResults ? 'sm:w-1/2' : ''}`}>
                                  {showResults ? (
                                    <>
                                      <div className="mb-2 font-medium text-gray-600">Your Response:</div>
                                      <div className="h-[400px] bg-white rounded-md border border-gray-200">
                                        {drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`] ? (
                                          <img 
                                            src={drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`]}
                                            alt="Your drawing"
                                            className="w-full h-full object-contain"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No drawing provided
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="h-[400px] relative border-2 border-black rounded-md overflow-hidden">
                                      <DrawingPad
                                        isLarge={true}
                                        className="w-full relative"
                                        onSave={(data) => handleDrawingAnswer(`${currentQuestionIndex}-${part.label}-${subpart.label}`, data)}
                                        initialData={drawingAnswers[`${currentQuestionIndex}-${part.label}-${subpart.label}`]}
                                      />
                                    </div>
                                  )}
                                </div>
                                {showResults && subpart.answer && (
                                  <div className="w-full sm:w-1/2">
                                    <div className="mb-2 font-medium text-green-600">Correct Response:</div>
                                    <div className="h-[400px] bg-white rounded-md border border-gray-200">
                                      {typeof subpart.answer === 'object' ? (
                                        <img 
                                          src={subpart.answer.src}
                                          alt="Correct drawing"
                                          className="w-full h-full object-contain"
                                        />
                                      ) : (
                                        <div className="p-3">{subpart.answer}</div>
                                      )}
                                    </div>
                                  </div>
                                )}
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
          <div className="p-6 border-t bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full sm:w-auto">
                <Button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="w-full sm:w-28"
                >
                  Previous
                </Button>
                <Button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === questions.questions.length - 1}
                  variant="outline"
                  className="w-full sm:w-28"
                >
                  Next
                </Button>
              </div>
              {currentQuestionIndex === questions.questions.length - 1 && (
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:w-28 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
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