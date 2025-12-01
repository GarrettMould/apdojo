'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronDown, ChevronUp, Sparkles, Loader2, PlayCircle, Upload, X, Pencil, Image as ImageIcon, Lock } from 'lucide-react';
import Link from 'next/link';
import { DrawingPad } from '@/components/DrawingPad';
import { ProgressBars } from '@/components/ProgressBars';
import { useAuthContext } from '@/contexts/AuthContext';
import { VideoModal } from '@/components/VideoModal';
import { frqExams, FRQPart, FRQSubPart } from '@/data/frqQuestions';
import { FeedbackBlock } from '@/components/FeedbackBlock';
import { DrawingInput } from '@/components/DrawingInput';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock data for locked questions
const mockTopics = [
  'Production Possibilities Curve',
  'Fiscal Policy',
  'Monetary Policy',
  'Perfect Competition',
  'Monopoly',
  'Externalities',
  'Cost of Production',
  'International Trade & Tariffs',
  'GDP and CPI',
  'The Phillips Curve',
  'Economic Growth',
  'Bank Balance Sheets',
  'Interest Rates & Investment Demand',
  'Market Failure',
  'Consumer Choice Theory'
];

const lockedQuestions = mockTopics.map((topic, i) => ({
  id: `locked-${i}`,
  title: `Unit ${Math.floor(Math.random() * 6) + 1} FRQ - ${topic}`,
  isLocked: true,
}));


function UnitFRQPracticePageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedSubject, awardXp } = useAuthContext();

  const relevantExams = frqExams.filter(exam => 
    (selectedSubject === 'macro' && exam.examTitle.includes('Macroeconomics')) ||
    (selectedSubject === 'micro' && exam.examTitle.includes('Microeconomics'))
  );

  const allQuestions = relevantExams.flatMap(exam => {
    const unitMatch = exam.examTitle.match(/Unit (\d+)/);
    const unit = unitMatch ? parseInt(unitMatch[1]) : null;
    return exam.questions.map(q => ({ ...q, unit, examTitle: exam.examTitle }));
  });

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Combine real questions with mock locked questions for display
  const allDisplayQuestions = [...allQuestions, ...lockedQuestions];

  // Fallback to the first question if no match is found
  const frqQuestion = allDisplayQuestions[selectedQuestionIndex] || allDisplayQuestions[0];

  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});
  const [expandedSubparts, setExpandedSubparts] = useState<Record<string, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, any>>({});
  const [isGrading, setIsGrading] = useState<Record<string, boolean>>({});
  const [videoModalState, setVideoModalState] = useState<{ url: string; aspectRatio?: 'vertical' | 'horizontal' } | null>(null);

  // Calculate total points and current points from feedback
  const totalPoints = frqQuestion.parts.reduce((acc, part) => {
    // Each part is worth 2 points, assuming a 0-2 scale
    return acc + 2;
  }, 0);

  const currentPoints = Object.values(gradingFeedback).reduce((acc, feedback) => {
    return acc + (feedback.score || 0);
  }, 0);

  const togglePart = (partLabel: string) => {
    setExpandedParts(prev => ({
      ...prev,
      [partLabel]: !prev[partLabel]
    }));
  };

  const toggleSubpart = (key: string) => {
    setExpandedSubparts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAnswer = (key: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTextAnswer = (key: string, value: string) => {
    setTextAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDrawingAnswer = (key: string, data: string) => {
    setDrawingAnswers(prev => ({
      ...prev,
      [key]: data
    }));
  };

  const isImage = (answer: any): boolean => {
    return answer && typeof answer === 'object' && 'src' in answer;
  };

  const formatAnswerText = (text: string) => {
    const parts = text.split(/Explanation: ?/i);
    if (parts.length === 2) {
      return (
        <>
          <span className="font-bold">{parts[0].trim()}</span>
          <br />
          <span className="font-bold">Explanation:</span> {parts[1].trim()}
        </>
      );
    }
    return text;
  };

  const handleSelectQuestion = (index: number) => {
    setSelectedQuestionIndex(index);
    // Reset all answer and feedback states
    setExpandedParts({});
    setExpandedSubparts({});
    setShowAnswers({});
    setTextAnswers({});
    setDrawingAnswers({});
    setGradingFeedback({});
    setIsGrading({});
  };

  const handleGradeTextAnswer = async (answerKey: string, partText: string, gradingCriteria: string) => {
    const textAnswer = textAnswers[answerKey];

    if (!textAnswer || textAnswer.trim() === '') {
      alert('Please enter an answer before submitting!');
      return;
    }

    setIsGrading(prev => ({ ...prev, [answerKey]: true }));

    // Determine the part label for the API call (e.g., "A" or "Eii")
    const partLabelForApi = answerKey.startsWith('subpart-')
      ? answerKey.split('-').slice(1).join('') // "E-i" -> "Ei"
      : answerKey.split('-')[1]; // "part-A" -> "A"

    try {
      const response = await fetch('/api/grade-frq-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textAnswer,
          partLabel: partLabelForApi,
          questionPrompt: frqQuestion.prompt,
          partText,
          gradingCriteria,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const feedback = await response.json();
      setGradingFeedback(prev => ({ ...prev, [answerKey]: feedback }));
      if (feedback.score && feedback.score > 0) {
        const xpGained = feedback.score * 100;
        awardXp(xpGained);
      }
    } catch (error: any) {
      console.error('Error grading text answer:', error);
      const errorMessage = error.message || 'Failed to grade answer. Please try again.';
      setGradingFeedback(prev => ({
        ...prev,
        [answerKey]: {
          score: 0,
          feedback: errorMessage || 'There was an error processing your answer. Please check the server console for details.',
        },
      }));
    } finally {
      setIsGrading(prev => ({ ...prev, [answerKey]: false }));
    }
  };

  const handleGradeDrawing = async (drawingKey: string, partText: string) => {
    const drawingData = drawingAnswers[drawingKey];

    if (!drawingData) {
      alert('Please draw something first before grading!');
      return;
    }

    setIsGrading(prev => ({ ...prev, [drawingKey]: true }));

    // Determine the part label for the API call (e.g., "A" or "Ei")
    const partLabelForApi = drawingKey.startsWith('subpart-')
      ? drawingKey.split('-').slice(1).join('') // "E-i" -> "Ei"
      : drawingKey.split('-')[1]; // "part-A" -> "A"
    
    // Find the original part/subpart to get the grading criteria
    let criteria = '';
    let foundPart: FRQPart | FRQSubPart | undefined;
    if (drawingKey.startsWith('subpart-')) {
      const [, mainLabel, subLabel] = drawingKey.split('-');
      const mainPart = frqQuestion.parts.find(p => p.label === mainLabel);
      foundPart = mainPart?.subparts?.find(sp => sp.label === subLabel);
    } else {
      const [, mainLabel] = drawingKey.split('-');
      foundPart = frqQuestion.parts.find(p => p.label === mainLabel);
    }
    criteria = foundPart?.gradingCriteria || '';


    try {
      const response = await fetch('/api/grade-frq-drawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: drawingData,
          partLabel: partLabelForApi,
          questionPrompt: frqQuestion.prompt,
          partText,
          gradingCriteria: criteria,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const feedback = await response.json();
      setGradingFeedback(prev => ({ ...prev, [drawingKey]: feedback }));
      if (feedback.score && feedback.score > 0) {
        const xpGained = feedback.score * 100;
        awardXp(xpGained);
      }
    } catch (error: any) {
      console.error('Error grading drawing:', error);
      const errorMessage = error.message || 'Failed to grade drawing. Please try again.';
      setGradingFeedback(prev => ({
        ...prev,
        [drawingKey]: {
          score: 0,
          feedback: errorMessage || 'There was an error processing your drawing. Please check the server console for details.',
        },
      }));
    } finally {
      setIsGrading(prev => ({ ...prev, [drawingKey]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VideoModal
        isOpen={!!videoModalState}
        onClose={() => setVideoModalState(null)}
        videoUrl={videoModalState?.url || ''}
        aspectRatio={videoModalState?.aspectRatio}
      />
      <div className="flex flex-col lg:flex-row gap-8 max-w-screen-2xl mx-auto px-4 py-8">
        {/* Left Sidebar: FRQ Library */}
        <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-md border border-gray-200 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">FRQ Library</h2>
          <div className="space-y-2">
            {allDisplayQuestions.map((question, index) => {
              const isSelected = 'id' in question && question.id === frqQuestion.id;
              const isLocked = 'isLocked' in question && question.isLocked;

              return (
                <button
                  key={question.id}
                  onClick={() => !isLocked && handleSelectQuestion(index)}
                  disabled={isLocked}
                  className={`w-full text-left p-2.5 rounded-md transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } ${
                    isLocked ? 'cursor-not-allowed bg-gray-50 text-gray-400' : ''
                  }`}
                >
                  <span className="font-medium text-sm">{question.title}</span>
                  {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {/* Header with points and timer */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Unit FRQ Practice</h1>
                <p className="text-lg text-gray-700">
                  Question {frqQuestion.questionNumber}
                </p>
              </div>
              <ProgressBars
                currentXp={currentPoints * 100} // Example: 100 XP per point
                xpForNextLevel={totalPoints * 100}
                currentPoints={currentPoints}
                totalPoints={totalPoints}
              />
            </div>

            {/* Question Card */}
            <div className="mb-6">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  Question {frqQuestion.questionNumber}
                </span>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {frqQuestion.prompt}
                </p>
                {frqQuestion.tableData && (
                  <div className="my-8 flex justify-center">
                    <div className="flex items-center gap-4">
                      {/* Rotated Row Player Name */}
                      {frqQuestion.tableData.playerNames && (
                        <div className="flex items-center justify-center h-full w-16">
                          <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                            {frqQuestion.tableData.playerNames.row.split(' ')[0]}
                            <br />
                            {frqQuestion.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                          </p>
                        </div>
                      )}
                      <div className="flex-1">
                        {/* Column Player Name */}
                        {frqQuestion.tableData.playerNames && (
                          <p className="text-center font-bold text-lg text-gray-900 mb-2">
                            {frqQuestion.tableData.playerNames.column}
                          </p>
                        )}
                        <table className="min-w-full border-collapse border border-black">
                          <thead className="bg-white">
                            <tr>
                              {frqQuestion.tableData.headers.map(header => (
                                <th key={header} className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {frqQuestion.tableData.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                  const isRowHeader = frqQuestion.tableData?.rowHeaders && cellIndex === 0;
                                  return (
                                    <td 
                                      key={cellIndex} 
                                      className={`border border-black px-4 py-3 text-center text-base ${isRowHeader ? 'font-bold' : ''}`}
                                    >
                                      {cell}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Parts */}
              <div className="space-y-4">
                {frqQuestion.parts.map((part) => (
                  <div key={part.label} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Part Header */}
                    <button
                      onClick={() => togglePart(part.label)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg text-gray-900">{part.label}.</span>
                        <span className="text-gray-800">{part.text}</span>
                      </div>
                      {expandedParts[part.label] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>

                    {/* Part Answer */}
                    {expandedParts[part.label] && (
                      <div className="p-4 bg-white border-t border-gray-200 space-y-4">

                        {/* Show Instructional Subparts (if they exist) */}
                        {part.subparts && part.subparts.some(sp => !sp.answerType) && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                              Include the Following in Your Answer:
                            </p>
                            <ul className="space-y-2">
                              {part.subparts.filter(sp => !sp.answerType).map((subpart) => (
                                <li key={subpart.label} className="text-sm text-gray-800">
                                  <span className="font-semibold">{part.label}{subpart.label}.</span> {subpart.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* RENDER SIMPLE ANSWER (if part has its own answerType) */}
                        {part.answerType && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Answer:
                          </label>
                          {part.answerType === 'draw' ? (
                            <div className="space-y-3">
                              <DrawingInput
                                drawingKey={`part-${part.label}`}
                                drawingData={drawingAnswers[`part-${part.label}`]}
                                onSave={handleDrawingAnswer}
                                isGraded={!!gradingFeedback[`part-${part.label}`]}
                              />
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              <Button
                                  onClick={() => handleGradeDrawing(`part-${part.label}`, part.text)}
                                disabled={isGrading[`part-${part.label}`] || !drawingAnswers[`part-${part.label}`] || !!gradingFeedback[`part-${part.label}`]}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isGrading[`part-${part.label}`] ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Grading...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                      Grade My Answer
                                  </>
                                )}
                              </Button>
                                {gradingFeedback[`part-${part.label}`] && part.videoUrl && (
                                  <Button
                                    variant="outline"
                                    onClick={() => setVideoModalState({ url: part.videoUrl!, aspectRatio: part.videoAspectRatio })}
                                    className="w-full sm:w-auto bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 hover:text-sky-900"
                                  >
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Video Walkthrough
                                  </Button>
                                )}
                              </div>
                              {gradingFeedback[`part-${part.label}`] && (
                                <FeedbackBlock
                                  feedback={gradingFeedback[`part-${part.label}`]}
                                  part={part}
                                  answerKey={`part-${part.label}`}
                                  showAnswers={showAnswers}
                                  toggleAnswer={toggleAnswer}
                                />
                              )}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <Input
                                value={textAnswers[`part-${part.label}`] || ''}
                                onChange={(e) => handleTextAnswer(`part-${part.label}`, e.target.value)}
                                placeholder="Type your answer here..."
                                className="w-full"
                                disabled={!!gradingFeedback[`part-${part.label}`]}
                                readOnly={!!gradingFeedback[`part-${part.label}`]}
                              />
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              <Button
                                onClick={() => handleGradeTextAnswer(`part-${part.label}`, part.text, part.gradingCriteria || '')}
                                disabled={isGrading[`part-${part.label}`] || !textAnswers[`part-${part.label}`] || !!gradingFeedback[`part-${part.label}`]}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isGrading[`part-${part.label}`] ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Grading...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Submit Answer
                                  </>
                                )}
                              </Button>
                                  {gradingFeedback[`part-${part.label}`] && part.videoUrl && (
                                    <Button
                                      variant="outline"
                                      onClick={() => setVideoModalState({ url: part.videoUrl!, aspectRatio: part.videoAspectRatio })}
                                      className="w-full sm:w-auto bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 hover:text-sky-900"
                                    >
                                      <PlayCircle className="w-4 h-4 mr-2" />
                                      Video Walkthrough
                                    </Button>
                                  )}
                                </div>
                              {gradingFeedback[`part-${part.label}`] && (
                                <FeedbackBlock
                                  feedback={gradingFeedback[`part-${part.label}`]}
                                  part={part}
                                  answerKey={`part-${part.label}`}
                                  showAnswers={showAnswers}
                                  toggleAnswer={toggleAnswer}
                                />
                              )}
                            </div>
                          )}
                        </div>
                        )}

                        {/* RENDER ANSWERABLE SUBPARTS (if they exist) */}
                        {part.subparts && part.subparts.some(sp => sp.answerType) && (
                          <div className="space-y-6">
                            {part.subparts.filter(sp => sp.answerType).map((subpart) => {
                              const subpartKey = `subpart-${part.label}-${subpart.label}`;
                              // If subpart is answerable, render the full input component
                              return (
                                <div key={subpartKey} className="pl-4 border-l-2 border-gray-200">
                                  <p className="text-gray-800 mb-3">
                                    <span className="font-bold text-lg text-gray-900">{part.label}{subpart.label}.</span> {subpart.text}
                                  </p>
                                    <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Answer:
                                      </label>
                                      {subpart.answerType === 'draw' ? (
                                        <div className="space-y-3">
                                          <DrawingInput
                                            drawingKey={subpartKey}
                                            drawingData={drawingAnswers[subpartKey]}
                                            onSave={handleDrawingAnswer}
                                            isGraded={!!gradingFeedback[subpartKey]}
                                          />
                                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <Button
                                              onClick={() => handleGradeDrawing(subpartKey, subpart.text)}
                                              disabled={isGrading[subpartKey] || !drawingAnswers[subpartKey] || !!gradingFeedback[subpartKey]}
                                              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                              {isGrading[subpartKey] ? (
                                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Grading...</>
                                              ) : (
                                                <><Sparkles className="w-4 h-4 mr-2" />Grade My Answer</>
                                              )}
                                            </Button>
                                            {gradingFeedback[subpartKey] && subpart.videoUrl && (
                                              <Button
                                                variant="outline"
                                                onClick={() => setVideoModalState({ url: subpart.videoUrl!, aspectRatio: subpart.videoAspectRatio })}
                                                className="w-full sm:w-auto bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 hover:text-sky-900"
                                              >
                                                <PlayCircle className="w-4 h-4 mr-2" />
                                                Video Walkthrough
                                              </Button>
                                            )}
                                      </div>
                                          {gradingFeedback[subpartKey] && (
                                            <FeedbackBlock
                                              feedback={gradingFeedback[subpartKey]}
                                              part={subpart}
                                              answerKey={subpartKey}
                                              showAnswers={showAnswers}
                                              toggleAnswer={toggleAnswer}
                                            />
                                    )}
                                  </div>
                                      ) : (
                                        <div className="space-y-3">
                                          <Input
                                            value={textAnswers[subpartKey] || ''}
                                            onChange={(e) => handleTextAnswer(subpartKey, e.target.value)}
                                            placeholder="Type your answer here..."
                                            className="w-full"
                                            disabled={!!gradingFeedback[subpartKey]}
                                            readOnly={!!gradingFeedback[subpartKey]}
                                          />
                                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            <Button
                                              onClick={() => handleGradeTextAnswer(subpartKey, subpart.text, subpart.gradingCriteria || '')}
                                              disabled={isGrading[subpartKey] || !textAnswers[subpartKey] || !!gradingFeedback[subpartKey]}
                                              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                              {isGrading[subpartKey] ? (
                                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Grading...</>
                                              ) : (
                                                <><Sparkles className="w-4 h-4 mr-2" />Submit Answer</>
                                              )}
                                            </Button>
                                            {gradingFeedback[subpartKey] && subpart.videoUrl && (
                                              <Button
                                                variant="outline"
                                                onClick={() => setVideoModalState({ url: subpart.videoUrl!, aspectRatio: subpart.videoAspectRatio })}
                                                className="w-full sm:w-auto bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 hover:text-sky-900"
                                              >
                                                <PlayCircle className="w-4 h-4 mr-2" />
                                                Video Walkthrough
                                              </Button>
                                            )}
                                          </div>
                                          {gradingFeedback[subpartKey] && (
                                            <FeedbackBlock
                                              feedback={gradingFeedback[subpartKey]}
                                              part={subpart}
                                              answerKey={subpartKey}
                                              showAnswers={showAnswers}
                                              toggleAnswer={toggleAnswer}
                                            />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                </div>
                              );
                            })}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-12 text-center bg-white rounded-lg shadow-md border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 Ready to Master the MCQs?</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                FRQs are only half the battle. Test your knowledge with AP-style multiple-choice questions to make sure you're ready for everything the exam can throw at you.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 text-lg rounded-md">
                <Link href={`/unitMCQPracticePage?subject=${selectedSubject}&mode=custom&units=${frqQuestion.unit || 1}`}>
                  Practice Unit {frqQuestion.unit || 1} MCQs
                </Link>
              </Button>
              <p className="text-xs text-gray-500 mt-4">The best way to prepare for your next test.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnitFRQPracticePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnitFRQPracticePageComponent />
    </Suspense>
  );
}

