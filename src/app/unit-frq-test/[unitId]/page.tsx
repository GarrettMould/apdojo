'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, FileText, Check, X, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { CourseSidebar } from '@/components/CourseSidebar';
import { getUnitFRQTest } from '@/data/unitFRQTests';
import { apMacroCourseInfo } from '@/data/courseInfo';
import { videos as allVideos } from '@/data/videos';
import { use } from 'react';
import { DrawingPad } from '@/components/DrawingPad';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UnitFRQTestPageProps {
  params: Promise<{
    unitId: string;
  }>;
}

export default function UnitFRQTestPage({ params }: UnitFRQTestPageProps) {
  const { unitId } = use(params);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Get the unit FRQ test questions
  const unitNumber = parseInt(unitId);
  const frqTest = getUnitFRQTest(unitNumber);
  const questions = frqTest?.questions || [];
  const totalQuestions = questions.length;
  
  // MVP: Only allow access to Units 1 and 2
  const isUnitLocked = unitNumber > 2;
  
  // Get unit info
  const unitInfo = apMacroCourseInfo.units.find(unit => 
    unit.unit.split(':')[0].split(' ')[1] === unitId.toString()
  );

  // MVP: Set loading to false immediately since we're not loading user progress
  useEffect(() => {
    setIsLoadingProgress(false);
  }, [unitId]);

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
    if (currentQuestionIndex < questions.length - 1) {
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

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setTextAnswers({});
    setDrawingAnswers({});
    setShowResults(false);
  };

  if (isLoadingProgress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  if (isUnitLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <CourseSidebar 
          selectedUnit={unitId}
          onUnitChange={() => {}}
          isFixed={true}
        />
        <div className="flex-1 p-8 ml-80">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Unit {unitId} FRQ Test is Locked
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                This unit FRQ test is locked. Complete Unit 1 to unlock access to all units.
              </p>
              <Link href="/ap-macro-course">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Return to Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!frqTest || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <CourseSidebar 
          selectedUnit={unitId}
          onUnitChange={() => {}}
          isFixed={true}
        />
        <div className="flex-1 p-8 ml-80">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No FRQ Test Available
              </h3>
              <p className="text-gray-600 mb-6">
                No FRQ test is available for this unit yet.
              </p>
              <Link href="/ap-macro-course">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Return to Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <CourseSidebar 
          selectedUnit={unitId}
          onUnitChange={() => {}}
          isFixed={true}
        />
        <div className="flex-1 p-8 ml-80">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Test Completed!
                </h2>
                <p className="text-gray-600">
                  You've completed the Unit {unitId} FRQ Test
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Answers</h3>
                  {questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Question {question.questionNumber}: {question.prompt}
                      </h4>
                      {question.parts.map((part, pIndex) => {
                        const answerId = `${question.questionNumber}-${part.label}`;
                        const textAnswer = textAnswers[answerId];
                        const drawingAnswer = drawingAnswers[answerId];
                        
                        return (
                          <div key={pIndex} className="ml-4 mb-3">
                            <p className="font-medium text-gray-700 mb-2">
                              Part {part.label}: {part.text}
                            </p>
                            {textAnswer && (
                              <div className="ml-4 p-2 bg-gray-50 rounded">
                                <p className="text-sm text-gray-600">
                                  <strong>Your answer:</strong> {textAnswer}
                                </p>
                              </div>
                            )}
                            {drawingAnswer && (
                              <div className="ml-4 p-2 bg-gray-50 rounded">
                                <p className="text-sm text-gray-600">
                                  <strong>Your drawing:</strong> [Drawing submitted]
                                </p>
                              </div>
                            )}
                            {part.answer && (
                              <div className="ml-4 mt-4">
                                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                  <h5 className="text-lg font-bold text-gray-900 mb-3">Explanation</h5>
                                  <p className="text-gray-700 leading-relaxed">
                                    {typeof part.answer === 'string' ? part.answer : '[Image answer]'}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-8">
                <Button onClick={resetTest} variant="outline">
                  Retake Test
                </Button>
                <Link href="/ap-macro-course">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Return to Course
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CourseSidebar 
        selectedUnit={unitId}
        onUnitChange={() => {}}
        isFixed={true}
      />
      
      <div className="flex-1 p-8 ml-80">
        <div className="max-w-4xl mx-auto">
                    {/* Question with Integrated Header and Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header Section */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Unit {unitId} FRQ Test
                  </h1>
                  <p className="text-gray-600">
                    {unitInfo?.unit.split(':')[1]?.trim()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {totalQuestions} questions
                  </span>
                </div>
              </div>
            </div>
            
            {/* Question Content */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Question {currentQuestion.questionNumber}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentQuestion.prompt}
                </p>
                {currentQuestion.image && (
                  <div className="mt-4">
                    <img
                      src={typeof currentQuestion.image === 'string' ? currentQuestion.image : currentQuestion.image.src}
                      alt="Question diagram"
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Parts */}
              <div className="space-y-8">
                {currentQuestion.parts.map((part, partIndex) => {
                  const answerId = `${currentQuestion.questionNumber}-${part.label}`;
                  const textAnswer = textAnswers[answerId];
                  const drawingAnswer = drawingAnswers[answerId];

                  return (
                    <div key={partIndex} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Part {part.label}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {part.text}
                      </p>

                      {/* Answer Input */}
                      {part.answerType === 'text' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Answer:
                          </label>
                          <Input
                            value={textAnswer || ''}
                            onChange={(e) => handleTextAnswer(answerId, e.target.value)}
                            placeholder="Type your answer here..."
                            className="w-full"
                          />
                        </div>
                      )}

                      {part.answerType === 'draw' && (
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Your Drawing:
                          </label>
                          <div className="border border-gray-200 rounded-lg p-4 bg-white">
                            <DrawingPad
                              isLarge={true}
                              onSave={(data) => handleDrawingAnswer(answerId, data)}
                              initialData={drawingAnswer}
                            />
                          </div>
                        </div>
                      )}

                      {/* Subparts */}
                      {part.subparts && (
                        <div className="ml-4 space-y-6 mt-6">
                          {part.subparts.map((subpart, subIndex) => {
                            const subAnswerId = `${answerId}-${subpart.label}`;
                            const subTextAnswer = textAnswers[subAnswerId];
                            const subDrawingAnswer = drawingAnswers[subAnswerId];

                            return (
                              <div key={subIndex} className="border-l-2 border-gray-200 pl-4">
                                <h4 className="text-md font-medium text-gray-800 mb-2">
                                  {subpart.label}) {subpart.text}
                                </h4>

                                {subpart.answerType === 'text' && (
                                  <div className="mb-3">
                                    <Input
                                      value={subTextAnswer || ''}
                                      onChange={(e) => handleTextAnswer(subAnswerId, e.target.value)}
                                      placeholder="Type your answer here..."
                                      className="w-full"
                                    />
                                  </div>
                                )}

                                {subpart.answerType === 'draw' && (
                                  <div className="mb-4">
                                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                                      <DrawingPad
                                        isLarge={true}
                                        onSave={(data) => handleDrawingAnswer(subAnswerId, data)}
                                        initialData={subDrawingAnswer}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

                        {/* Navigation Section */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentQuestionIndex === totalQuestions - 1 ? (
                    <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                      Submit Test
                    </Button>
                  ) : (
                    <Button onClick={goToNextQuestion} className="bg-blue-600 hover:bg-blue-700">
                      Next
                    </Button>
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
