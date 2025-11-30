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

// Import images from public folder
const OUTPUTLOW = '/images/OUTPUTLOW.svg';
const PRDOWN = '/images/PRDOWN.svg';

interface FRQSubPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: string | any; // StaticImageData or string
  gradingCriteria?: string; // Explicit criteria for AP grading (0-1-2 scale)
}

interface FRQPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: string | any;
  subparts?: FRQSubPart[];
  gradingCriteria?: string; // Explicit criteria for AP grading (0-1-2 scale)
  videoUrl?: string;
}

const frqQuestion = {
  questionNumber: 4,
  prompt: "Assume the economy of Northland is currently operating below full employment and the banking system has ample reserves.",
  image: null,
  parts: [
    {
      label: "A",
      text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves, and show each of the following.",
      answerType: "draw",
      answer: OUTPUTLOW,
      gradingCriteria: "2 points: Graph correctly shows LRAS (vertical), SRAS (upward sloping), and AD (downward sloping) curves with properly labeled axes (Real GDP/Output on X-axis, Price Level on Y-axis). Current equilibrium (Y1, PL1) is shown at the intersection of AD and SRAS, positioned to the left of LRAS. Full-employment output (Yf) is labeled on the LRAS curve. 1 point: Graph shows most elements correctly but is missing one key component (e.g., missing axis labels, incorrect curve slopes, or missing equilibrium labels). 0 points: Graph does not meet the criteria or is completely incorrect.",
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V1.mp4",
      subparts: [
        {
          label: "i",
          text: "Current equilibrium real output and price level, labeled Y1 and PL1, respectively.",
          answerType: "text",
          answer: "The graph should show the intersection of AD and SRAS (Y1 and PL1) to the left of the LRAS curve.",
          gradingCriteria: "2 points: Correctly identifies and labels the current equilibrium point (Y1, PL1) at the intersection of AD and SRAS, positioned to the left of LRAS. 1 point: Identifies the equilibrium but labels are missing or incorrectly positioned. 0 points: Does not correctly identify or label the equilibrium.",
        },
        {
          label: "ii",
          text: "Full-employment output, labeled Yf.",
          answerType: "text",
          answer: "Yf should be labeled at the vertical LRAS curve, to the right of Y1.",
          gradingCriteria: "2 points: Correctly labels Yf at the vertical LRAS curve, positioned to the right of Y1. 1 point: Labels Yf but position is incorrect relative to Y1 or LRAS. 0 points: Does not correctly label Yf.",
        }
      ]
    },
    {
      label: "B",
      text: "Identify one specific monetary policy action the central bank would take to restore full employment.",
      answerType: "text",
      answer: "Decrease the interest on reserves (IOR) rate.",
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V2.mp4",
    },
    {
      label: "C",
      text: "Draw a correctly labeled graph of the reserve market and show the effect of the monetary policy action identified in part (B) on the policy rate.",
      answerType: "draw",
      answer: PRDOWN,
      gradingCriteria: "2 points: Graph correctly shows the reserve market with properly labeled axes (Reserves/Quantity of Reserves on X-axis, Interest Rate/Policy Rate on Y-axis). Demand for reserves curve and supply of reserves curve are shown. The effect of decreasing IOR is correctly illustrated (supply curve shifts down or demand shifts appropriately), resulting in a decrease in the policy rate. 1 point: Graph shows most elements correctly but is missing one key component (e.g., missing axis labels, incorrect curve representation, or missing policy effect). 0 points: Graph does not meet the criteria or is completely incorrect.",
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V3.mp4",
    },
    {
      label: "D",
      text: "Based on the change in the policy rate shown in part (C), will the quantity of investment demanded increase, decrease, or stay the same?",
      answerType: "text",
      answer: "Increase. Explanation: The decrease in the policy rate reduces the cost of borrowing, which incentivizes businesses to increase investment spending.",
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V4.mp4",
    },
    {
      label: "E",
      text: "Assume the Northlandian government decides to implement a fiscal policy to restore full employment instead of monetary policy. If the government increases spending, how will this affect the national debt? Explain.",
      answerType: "text",
      answer: "The national debt will increase. Explanation: Increased government spending, assuming tax revenue remains constant or does not increase proportionately, will lead to a budget deficit, which is financed by borrowing, thereby adding to the national debt.",
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V5.mp4",
    }
  ]
};

export default function UnitFRQPracticePage() {
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});
  const [expandedSubparts, setExpandedSubparts] = useState<Record<string, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, any>>({});
  const [isGrading, setIsGrading] = useState<Record<string, boolean>>({});
  const { awardXp } = useAuthContext();
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

  const handleGradeTextAnswer = async (partLabel: string, partText: string, gradingCriteria: string) => {
    const answerKey = `part-${partLabel}`;
    const textAnswer = textAnswers[answerKey];

    if (!textAnswer || textAnswer.trim() === '') {
      alert('Please enter an answer before submitting!');
      return;
    }

    setIsGrading(prev => ({ ...prev, [answerKey]: true }));

    try {
      const response = await fetch('/api/grade-frq-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textAnswer,
          partLabel,
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

  const handleGradeDrawing = async (partLabel: string, partText: string) => {
    // Handle both main parts (e.g., "A") and subparts (e.g., "Ai")
    const isSubpart = partLabel.length > 1;
    const drawingKey = isSubpart ? `subpart-${partLabel}` : `part-${partLabel}`;
    const drawingData = drawingAnswers[drawingKey];

    if (!drawingData) {
      alert('Please draw something first before grading!');
      return;
    }

    setIsGrading(prev => ({ ...prev, [drawingKey]: true }));

    try {
      // Extract the main part label (e.g., "A" from "Ai")
      const mainPartLabel = isSubpart ? partLabel[0] : partLabel;
      
      // Find the part or subpart to get its grading criteria
      const part = frqQuestion.parts.find(p => p.label === mainPartLabel);
      let gradingCriteria = part?.gradingCriteria || '';
      
      if (isSubpart && part) {
        const subpartLabel = partLabel.slice(1); // Get "i" from "Ai"
        const subpart = part.subparts?.find(sp => sp.label === subpartLabel);
        gradingCriteria = subpart?.gradingCriteria || gradingCriteria;
      }
      
      const response = await fetch('/api/grade-frq-drawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: drawingData,
          partLabel: mainPartLabel,
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
                    {/* Show Subpart Instructions (if they exist) - These are just instructions, not separate questions */}
                    {part.subparts && part.subparts.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                          Include the Following in Your Drawing:
                        </p>
                        <ul className="space-y-2">
                          {part.subparts.map((subpart) => (
                            <li key={subpart.label} className="text-sm text-gray-800">
                              <span className="font-semibold">{part.label}{subpart.label}.</span> {subpart.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Student Input Section */}
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
                            <div className="mt-3 space-y-4">
                              {/* AP-Style Score Selector */}
                              <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
                                <div className="mb-4">
                                  <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    AP Exam Score
                                  </p>
                                  <div className="flex gap-2">
                                    {[0, 1, 2].map((score) => {
                                      const currentScore = gradingFeedback[`part-${part.label}`]?.score ?? 0;
                                      const isSelected = currentScore === score;
                                      return (
                                        <button
                                          key={score}
                                          className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all ${
                                            isSelected
                                              ? score === 0
                                                ? 'bg-red-100 border-red-500 text-red-700'
                                                : score === 1
                                                ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                                                : 'bg-green-100 border-green-500 text-green-700'
                                              : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
                                          }`}
                                        >
                                          {score}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-2 text-center">
                                    {gradingFeedback[`part-${part.label}`].score === 0 && 'No credit - Does not meet criteria'}
                                    {gradingFeedback[`part-${part.label}`].score === 1 && 'Partial credit - Some understanding shown'}
                                    {gradingFeedback[`part-${part.label}`].score === 2 && 'Full credit - Meets all criteria'}
                                  </p>
                                </div>

                                {/* Feedback Section */}
                                {gradingFeedback[`part-${part.label}`].feedback && (
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-800 leading-relaxed">
                                      {gradingFeedback[`part-${part.label}`].feedback}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Answer Display - Shown automatically after grading */}
                              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <p className="text-xs font-semibold text-green-800 mb-2 uppercase tracking-wide">Correct Answer:</p>
                                {part.answer ? (
                                  <div className="flex justify-center">
                                    <img
                                      src={part.answer}
                                      alt={`Answer for part ${part.label}`}
                                      className="max-w-2xl w-full h-auto rounded-lg border border-green-200"
                                    />
                                  </div>
                                ) : (
                                  <div className="bg-white border-2 border-dashed border-green-300 rounded-lg p-8 text-center text-gray-500">
                                    <p className="text-sm">Answer image will be displayed here</p>
                                  </div>
                                )}
                              </div>

                              {/* Grading Criteria (Expandable) */}
                              {part.gradingCriteria && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => toggleAnswer(`criteria-${part.label}`)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                  >
                                    <span className="text-sm font-medium text-gray-700">
                                      View Grading Criteria
                                    </span>
                                    {showAnswers[`criteria-${part.label}`] ? (
                                      <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                    )}
                                  </button>
                                  {showAnswers[`criteria-${part.label}`] && (
                                    <div className="p-4 bg-white border-t border-gray-200">
                                      <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                        Grading Criteria
                                      </p>
                                      <div className="text-sm text-gray-800 leading-relaxed space-y-3">
                                        {part.gradingCriteria.split(/(?=\d+ points?:)/).map((section, idx) => {
                                          if (!section.trim()) return null;
                                          const match = section.match(/^(\d+ points?:)\s*(.+)$/);
                                          if (match) {
                                            const [, scoreLabel, description] = match;
                                            return (
                                              <div key={idx} className={idx > 0 ? 'pt-3 border-t border-gray-200' : ''}>
                                                <p className="text-gray-800">
                                                  <span className="font-bold text-gray-900">{scoreLabel}</span> {description.trim()}
                                                </p>
                                              </div>
                                            );
                                          }
                                          return <p key={idx}>{section.trim()}</p>;
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
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
                            <div className="mt-3 space-y-4">
                              {/* AP-Style Score Selector */}
                              <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
                                <div className="mb-4">
                                  <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                    AP Exam Score
                                  </p>
                                  <div className="flex gap-2">
                                    {[0, 1, 2].map((score) => {
                                      const currentScore = gradingFeedback[`part-${part.label}`]?.score ?? 0;
                                      const isSelected = currentScore === score;
                                      return (
                                        <button
                                          key={score}
                                          className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all ${
                                            isSelected
                                              ? score === 0
                                                ? 'bg-red-100 border-red-500 text-red-700'
                                                : score === 1
                                                ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                                                : 'bg-green-100 border-green-500 text-green-700'
                                              : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
                                          }`}
                                        >
                                          {score}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-2 text-center">
                                    {gradingFeedback[`part-${part.label}`].score === 0 && 'No credit - Does not meet criteria'}
                                    {gradingFeedback[`part-${part.label}`].score === 1 && 'Partial credit - Some understanding shown'}
                                    {gradingFeedback[`part-${part.label}`].score === 2 && 'Full credit - Meets all criteria'}
                                  </p>
                                </div>

                                {/* Feedback Section */}
                                {gradingFeedback[`part-${part.label}`].feedback && (
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-800 leading-relaxed">
                                      {gradingFeedback[`part-${part.label}`].feedback}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Answer Display - Shown automatically after grading */}
                              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <p className="text-xs font-semibold text-green-800 mb-2 uppercase tracking-wide">Correct Answer:</p>
                                <p className="text-gray-800 whitespace-pre-wrap">{formatAnswerText(part.answer)}</p>
                              </div>

                              {/* Grading Criteria (Expandable) */}
                              {part.gradingCriteria && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => toggleAnswer(`criteria-${part.label}`)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                  >
                                    <span className="text-sm font-medium text-gray-700">
                                      View Grading Criteria
                                    </span>
                                    {showAnswers[`criteria-${part.label}`] ? (
                                      <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                    )}
                                  </button>
                                  {showAnswers[`criteria-${part.label}`] && (
                                    <div className="p-4 bg-white border-t border-gray-200">
                                      <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                        Grading Criteria
                                      </p>
                                      <div className="text-sm text-gray-800 leading-relaxed space-y-3">
                                        {part.gradingCriteria.split(/(?=\d+ points?:)/).map((section, idx) => {
                                          if (!section.trim()) return null;
                                          const match = section.match(/^(\d+ points?:)\s*(.+)$/);
                                          if (match) {
                                            const [, scoreLabel, description] = match;
                                            return (
                                              <div key={idx} className={idx > 0 ? 'pt-3 border-t border-gray-200' : ''}>
                                                <p className="text-gray-800">
                                                  <span className="font-bold text-gray-900">{scoreLabel}</span> {description.trim()}
                                                </p>
                                              </div>
                                            );
                                          }
                                          return <p key={idx}>{section.trim()}</p>;
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

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

