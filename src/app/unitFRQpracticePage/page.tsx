'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronDown, ChevronUp, Eye, EyeOff, Sparkles, Loader2, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { DrawingPad } from '@/components/DrawingPad';
import { ProgressBars } from '@/components/ProgressBars';
import { useAuthContext } from '@/contexts/AuthContext';
import { VideoModal } from '@/components/VideoModal';
import { frqExams, FRQPart, FRQSubPart } from '@/data/frqQuestions';
import { FeedbackBlock } from '@/components/FeedbackBlock';

export default function UnitFRQPracticePage() {
  const { selectedSubject, awardXp } = useAuthContext();

  const frqExam = frqExams.find(exam => 
    (selectedSubject === 'macro' && exam.examTitle.includes('Macroeconomics')) ||
    (selectedSubject === 'micro' && exam.examTitle.includes('Microeconomics'))
  );

  // Fallback to the first exam if no match is found
  const frqQuestion = (frqExam || frqExams[0]).questions[0];

  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});
  const [expandedSubparts, setExpandedSubparts] = useState<Record<string, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, any>>({});
  const [isGrading, setIsGrading] = useState<Record<string, boolean>>({});
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

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
        isOpen={!!videoModalUrl}
        onClose={() => setVideoModalUrl(null)}
        videoUrl={videoModalUrl || ''}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Unit FRQ Practice</h1>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          {/* Progress Bars */}
          <div className="pb-6 mb-6 border-b border-gray-200">
            <ProgressBars
              currentXp={currentPoints * 100} // Example: 100 XP per point
              xpForNextLevel={totalPoints * 100}
              currentPoints={currentPoints}
              totalPoints={totalPoints}
            />
          </div>

          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
              Question {frqQuestion.questionNumber}
            </span>
            <p className="text-lg text-gray-800 leading-relaxed">
              {frqQuestion.prompt}
            </p>
            {frqQuestion.tableData && (
              <div className="my-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="bg-gray-50">
                    <tr>
                      {frqQuestion.tableData.headers.map(header => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {frqQuestion.tableData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    
                    {/* RENDER SIMPLE ANSWER (if part has its own answerType) */}
                    {part.answerType && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Answer:
                      </label>
                      {part.answerType === 'draw' ? (
                        <div className="space-y-3">
                          <div className={`border-2 border-gray-200 rounded-lg p-4 bg-white relative ${gradingFeedback[`part-${part.label}`] ? 'pointer-events-none opacity-75' : ''}`}>
                            {gradingFeedback[`part-${part.label}`] && (
                              <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg z-10 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">Answer submitted</span>
                              </div>
                            )}
                            <DrawingPad
                              isLarge={true}
                              onSave={(data) => handleDrawingAnswer(`part-${part.label}`, data)}
                              initialData={drawingAnswers[`part-${part.label}`]}
                            />
                          </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <Button
                            onClick={() => handleGradeDrawing(part.label, part.text)}
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
                                Grade My Drawing
                              </>
                            )}
                          </Button>
                              {gradingFeedback[`part-${part.label}`] && part.videoUrl && (
                                <Button
                                  variant="outline"
                                  onClick={() => setVideoModalUrl(part.videoUrl!)}
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
                            onClick={() => handleGradeTextAnswer(part.label, part.text, part.gradingCriteria || '')}
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
                                  onClick={() => setVideoModalUrl(part.videoUrl!)}
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

                    {/* RENDER SUBPARTS (if they exist) */}
                    {part.subparts && (
                      <div className="space-y-6">
                        {part.subparts.map((subpart) => {
                          const subpartKey = `subpart-${part.label}-${subpart.label}`;
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
                                    <div className={`border-2 border-gray-200 rounded-lg p-4 bg-white relative ${gradingFeedback[subpartKey] ? 'pointer-events-none opacity-75' : ''}`}>
                                      {gradingFeedback[subpartKey] && (
                                        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg z-10 flex items-center justify-center">
                                          <span className="text-sm font-medium text-gray-600">Answer submitted</span>
                                        </div>
                                      )}
                                      <DrawingPad
                                        isLarge={true}
                                        onSave={(data) => handleDrawingAnswer(subpartKey, data)}
                                        initialData={drawingAnswers[subpartKey]}
                                      />
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                      <Button
                                        onClick={() => handleGradeDrawing(subpartKey, subpart.text)}
                                        disabled={isGrading[subpartKey] || !drawingAnswers[subpartKey] || !!gradingFeedback[subpartKey]}
                                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        {isGrading[subpartKey] ? (
                                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Grading...</>
                                        ) : (
                                          <><Sparkles className="w-4 h-4 mr-2" />Grade My Drawing</>
                                        )}
                                      </Button>
                                      {gradingFeedback[subpartKey] && subpart.videoUrl && (
                                        <Button
                                          variant="outline"
                                          onClick={() => setVideoModalUrl(subpart.videoUrl!)}
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
                                          onClick={() => setVideoModalUrl(subpart.videoUrl!)}
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
      </div>
    </div>
  );
}

