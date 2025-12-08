'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronDown, ChevronUp, Sparkles, Loader2, PlayCircle, Upload, X, Pencil, Image as ImageIcon, Lock, Share2, Check, Lightbulb, ChevronsRight, ChevronsLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import { DrawingPad } from '@/components/DrawingPad';
import { ProgressBars } from '@/components/ProgressBars';
import { useAuthContext } from '@/contexts/AuthContext';
import { VideoModal } from '@/components/VideoModal';
import { frqExams, FRQPart, FRQSubPart } from '@/data/frqQuestions';
import { FeedbackBlock } from '@/components/FeedbackBlock';
import { DrawingInput } from '@/components/DrawingInput';
import { ShareFRQButton } from '@/components/ShareFRQButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

// Self-Review Component for Drawings
const DrawingSelfReview = ({ 
  referenceImageUrl, 
  studentDrawing 
}: { 
  referenceImageUrl?: string;
  studentDrawing?: string;
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  
  // Debug: Log referenceImageUrl
  useEffect(() => {
    if (referenceImageUrl) {
      console.log('DrawingSelfReview received referenceImageUrl:', referenceImageUrl);
    } else {
      console.log('DrawingSelfReview: No referenceImageUrl provided');
    }
  }, [referenceImageUrl]);

  const checklistItems = [
    'All curves are correctly labeled',
    'Axes are properly labeled',
    'Curves are drawn in the correct positions',
    'Equilibrium point is clearly marked'
  ];

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Extract image from structured data if needed
  let studentImageSrc = studentDrawing;
  try {
    if (studentDrawing) {
      const parsed = JSON.parse(studentDrawing);
      if (parsed.image) {
        studentImageSrc = parsed.image;
      }
    }
  } catch (e) {
    // Not JSON, use as-is
  }

  // Encode spaces in reference image URL
  const encodedReferenceUrl = referenceImageUrl ? referenceImageUrl.replace(/ /g, '%20') : undefined;

  return (
    <div className="mt-4 p-6 bg-blue-50 border-2 border-blue-300 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Self-Review Your Drawing</h3>
      
      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Student's Drawing */}
        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-gray-800 mb-2">Your Drawing:</h4>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center h-[400px]">
            {studentImageSrc ? (
              <img 
                src={studentImageSrc} 
                alt="Your drawing" 
                className="max-w-full max-h-full object-contain rounded shadow-sm"
              />
            ) : (
              <div className="text-gray-400 text-sm text-center">
                <div className="w-32 h-32 bg-gray-200 rounded mx-auto mb-2"></div>
                <p>No drawing submitted</p>
              </div>
            )}
          </div>
        </div>

        {/* Reference Image */}
        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-gray-800 mb-2">Correct Answer:</h4>
          <div className="bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-center h-[400px] overflow-hidden">
            {encodedReferenceUrl ? (
              <img 
                src={encodedReferenceUrl} 
                alt="Correct answer" 
                className="max-w-full max-h-full object-contain rounded shadow-sm"
                style={{ transform: 'scale(1.15)' }}
                onError={(e) => {
                  console.error('Failed to load reference image:', encodedReferenceUrl);
                  console.error('Original referenceImageUrl:', referenceImageUrl);
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.parentElement?.querySelector('.placeholder-fallback');
                  if (placeholder) {
                    (placeholder as HTMLElement).style.display = 'block';
                  }
                }}
                onLoad={() => {
                  console.log('Successfully loaded reference image:', encodedReferenceUrl);
                }}
              />
            ) : null}
            {!encodedReferenceUrl && (
              <div className="text-gray-400 text-sm text-center">
                <div className="w-32 h-32 bg-gray-200 rounded mx-auto mb-2"></div>
                <p>Reference image placeholder</p>
              </div>
            )}
            {encodedReferenceUrl && (
              <div className="placeholder-fallback text-gray-400 text-sm text-center" style={{ display: 'none' }}>
                <div className="w-32 h-32 bg-gray-200 rounded mx-auto mb-2"></div>
                <p>Reference image not found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Checklist */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-5 shadow-sm">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Self-Review Checklist:</h4>
        <ul className="space-y-3">
          {checklistItems.map((item, index) => (
            <li 
              key={index} 
              onClick={() => toggleCheck(index)}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {checkedItems[index] ? (
                  <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-400 rounded hover:border-gray-600 transition-colors"></div>
                )}
              </div>
              <span className={`text-base text-gray-800 flex-1 ${checkedItems[index] ? 'line-through text-gray-500' : ''}`}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Difficulty Rating Component
const DifficultyRating = ({ difficulty }: { difficulty?: 'easy' | 'medium' | 'hard' | 'extreme' }) => {
  if (!difficulty) return null;

  const difficultyConfig = {
    easy: { bars: 1, color: 'bg-green-500' },
    medium: { bars: 2, color: 'bg-yellow-500' },
    hard: { bars: 3, color: 'bg-red-500' },
    extreme: { bars: 3, color: 'bg-purple-700' },
  };

  const level = difficultyConfig[difficulty];

  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-xs text-gray-500 font-normal">Difficulty:</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-3 rounded-sm ${i < level.bars ? level.color : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Mock data for locked questions
const mockMacroTopics = [
  'Fiscal Policy',
  'Monetary Policy',
  'GDP and CPI',
  'The Phillips Curve',
  'Economic Growth',
  'Bank Balance Sheets',
  'International Trade & Tariffs',
  'Money Market',
  'Loanable Funds Market',
  'Aggregate Demand & Supply',
  'Balance of Payments',
  'Foreign Exchange Markets',
  'Cost-Push Inflation',
  'The Multiplier Effect',
  'Real vs. Nominal GDP'
];

const mockMicroTopics = [
  'Production Possibilities Curve',
  'Perfect Competition',
  'Monopoly',
  'Externalities',
  'Cost of Production',
  'Price Ceilings & Floors',
  'Elasticity',
  'Consumer Surplus',
  'Game Theory',
  'Factor Markets',
  'Market Structures',
  'Public Goods',
  'Marginal Analysis',
  'Tariffs and Quotas',
  'Supply and Demand'
];


function UnitFRQPracticePageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedSubject, awardXp } = useAuthContext();

  // Memoize the calculation of locked questions to prevent re-rendering
  const lockedQuestions = React.useMemo(() => {
    const mockTopics = selectedSubject === 'macro' ? mockMacroTopics : mockMicroTopics;
    return mockTopics.map((topic, i) => ({
      id: `locked-${i}`,
      title: `Unit ${Math.floor(Math.random() * 6) + 1} FRQ - ${topic}`,
      isLocked: true,
    }));
  }, [selectedSubject]);

  // Memoize the filtering of relevant exams
  const relevantExams = React.useMemo(() => frqExams.filter(exam =>
    exam.questions.some(q =>
      Array.isArray(q.subject)
        ? q.subject.includes(selectedSubject)
        : q.subject === selectedSubject
    )
  ), [selectedSubject]);

  // Memoize the flattening and sorting of all questions
  const allQuestions = React.useMemo(() => relevantExams.flatMap(exam => 
    exam.questions.map(q => ({ ...q, unit: exam.unit, examTitle: exam.examTitle }))
  ).sort((a, b) => (a.unit || 99) - (b.unit || 99) || a.title.localeCompare(b.title)), [relevantExams]);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Check for frqId query parameter to auto-select a specific question
  useEffect(() => {
    const frqIdParam = searchParams.get('frqId');
    if (frqIdParam) {
      const frqId = parseInt(frqIdParam, 10);
      if (!isNaN(frqId)) {
        // Find the question with matching ID
        const questionIndex = allQuestions.findIndex(q => q.id === frqId);
        if (questionIndex !== -1) {
          setSelectedQuestionIndex(questionIndex);
        }
      }
    }
  }, [searchParams, allQuestions]);

  // Combine real questions with mock locked questions for display
  const allDisplayQuestions = [...allQuestions, ...lockedQuestions];

  // Fallback to the first question if no match is found
  const frqQuestion = allDisplayQuestions[selectedQuestionIndex] || allDisplayQuestions[0];
  const isSelectedQuestionLocked = 'isLocked' in frqQuestion && frqQuestion.isLocked;

  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});
  const [expandedSubparts, setExpandedSubparts] = useState<Record<string, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [drawingAnswers, setDrawingAnswers] = useState<Record<string, string>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, any>>({});
  const [isGrading, setIsGrading] = useState<Record<string, boolean>>({});
  const [submittedDrawings, setSubmittedDrawings] = useState<Record<string, boolean>>({});
  const [videoModalState, setVideoModalState] = useState<{ url: string; aspectRatio?: 'vertical' | 'horizontal' } | null>(null);
  const [isExpertTipVisible, setIsExpertTipVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  // Effect to expand all question parts by default when a new question is loaded
  useEffect(() => {
    if (frqQuestion && frqQuestion.parts) {
      const allPartsExpanded = frqQuestion.parts.reduce((acc, part) => {
        acc[part.label] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setExpandedParts(allPartsExpanded);
    }
  }, [frqQuestion]);

  // Calculate total points and current points from feedback
  const totalPoints = React.useMemo(() => {
    if (!frqQuestion || !frqQuestion.parts) return 0;
    return frqQuestion.parts.reduce((acc, part) => {
      // Add points for the main part if it's answerable
      if (part.answerType) {
        return acc + (part.pointValue || 0);
      }
      // Add points for answerable subparts
      if (part.subparts) {
        const subpartPoints = part.subparts.reduce((subAcc, subpart) => {
          if (subpart.answerType) {
            return subAcc + (subpart.pointValue || 0);
          }
          return subAcc;
        }, 0);
        return acc + subpartPoints;
      }
      return acc;
  }, 0);
  }, [frqQuestion]);

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
    setIsExpertTipVisible(false);
  };

  const handleGradeTextAnswer = async (answerKey: string, partText: string, gradingCriteria: string, pointValue?: number) => {
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
      // Validate that frqQuestion exists and has required properties
      if (!frqQuestion || !frqQuestion.prompt) {
        throw new Error('Question data is missing. Please refresh the page and try again.');
      }

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
          gradingCriteria: gradingCriteria || '',
          pointValue: pointValue || 2,
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `Server error: ${response.status} ${response.statusText}` };
        }
        throw new Error(errorData.message || errorData.error || `Server error: ${response.status}`);
      }

      const feedback = await response.json();
      
      // Validate feedback structure
      if (!feedback || typeof feedback !== 'object') {
        throw new Error('Invalid response from server');
      }
      
      setGradingFeedback(prev => ({ ...prev, [answerKey]: feedback }));
      if (feedback.score && feedback.score > 0) {
        const xpGained = feedback.score * 100;
        awardXp(xpGained);
      }
    } catch (error: any) {
      console.error('Error grading text answer:', error);
      console.error('Error details:', {
        answerKey,
        hasTextAnswer: !!textAnswer,
        hasFrqQuestion: !!frqQuestion,
        hasPrompt: !!frqQuestion?.prompt,
        partLabelForApi,
        partText,
        gradingCriteria,
        pointValue
      });
      
      const errorMessage = error?.message || error?.error || 'Failed to grade answer. Please try again.';
      setGradingFeedback(prev => ({
        ...prev,
        [answerKey]: {
          score: 0,
          feedback: errorMessage,
        },
      }));
    } finally {
      setIsGrading(prev => ({ ...prev, [answerKey]: false }));
    }
  };

  const handleSubmitDrawing = (drawingKey: string) => {
    const drawingData = drawingAnswers[drawingKey];

    if (!drawingData) {
      alert('Please draw something first before submitting!');
      return;
    }

    // Mark drawing as submitted (no grading)
    setSubmittedDrawings(prev => ({ ...prev, [drawingKey]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VideoModal
        isOpen={!!videoModalState}
        onClose={() => setVideoModalState(null)}
        videoUrl={videoModalState?.url || ''}
        aspectRatio={videoModalState?.aspectRatio}
      />

      {/* Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 left-0 z-40 print:hidden cursor-pointer"
        >
          <Image
            src="/images/frqPracticePage/morefrqs.jpg"
            alt="More FRQs"
            width={160}
            height={160}
          />
        </button>
      )}

      {/* Overlay for closing sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 print:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar: FRQ Library (Sliding Panel) */}
      <div 
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white lg:w-1/4 w-4/5 z-40 shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out print:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">FRQ Library</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-gray-200"
            >
              <ChevronsLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1">
            {allDisplayQuestions.map((question, index) => {
              const isSelected = 'id' in question && question.id === frqQuestion.id;
              const isLocked = 'isLocked' in question && question.isLocked;

              return (
                <button
                  key={question.id}
                  onClick={() => {
                    if (!isLocked) {
                      handleSelectQuestion(index);
                      setIsSidebarOpen(false); // Close sidebar on selection
                    }
                  }}
                  disabled={isLocked}
                  className={`w-full text-left p-2.5 rounded-md transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } ${
                    isLocked ? 'cursor-not-allowed bg-gray-50 text-gray-400' : ''
                  }`}
                >
                  <div>
                    <span className="font-medium text-sm">{question.title}</span>
                    <DifficultyRating difficulty={'difficulty' in question ? question.difficulty as any : undefined} />
                  </div>
                  {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                </button>
              );
            })}
          </div>
        </div>
        </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-8 print:px-0 print:py-0">
        {/* Main Content Area */}
        <div className="lg:w-3/4 mx-auto print:w-full print:mx-0">
        {isSelectedQuestionLocked ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full flex flex-col items-center justify-center text-center print:hidden">
            <Lock className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Content Locked</h2>
            <p className="text-gray-600 max-w-sm mt-2">
              This FRQ is part of a premium course. Upgrade your account to unlock this and many other practice questions.
            </p>
            <Button className="mt-6">Upgrade to Unlock</Button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 print:shadow-none print:border-none">
            {/* Header with points and timer */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b print:border-b-2 print:border-black">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {'title' in frqQuestion ? frqQuestion.title : `Question ${frqQuestion.questionNumber}`}
                </h1>
                <p className="text-md text-gray-600">
                  From: {frqQuestion.examTitle}
                </p>
              </div>
              <div className="print:hidden">
            <ProgressBars
              currentXp={currentPoints * 100} // Example: 100 XP per point
              xpForNextLevel={totalPoints * 100}
              currentPoints={currentPoints}
              totalPoints={totalPoints}
            />
              </div>
          </div>

            {/* Question Card */}
            <div className="mb-6">
          <div className="mb-4">
                {/* Tip and Share Section */}
                <div className="flex items-center justify-between mb-4 print:hidden">
                  {frqQuestion.expertTip ? (
                    <button
                      onClick={() => setIsExpertTipVisible(!isExpertTipVisible)}
                      className={`flex items-center gap-2 text-sm font-semibold transition-colors px-3 py-1.5 rounded-md border ${
                        isExpertTipVisible 
                          ? 'bg-blue-100 border-blue-300 text-blue-800' 
                          : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>{isExpertTipVisible ? 'Hide Tip' : 'Expert Tip'}</span>
                    </button>
                  ) : (
                    <div /> // Empty div to maintain space
                  )}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Printer className="w-4 h-4 mr-2" />
                      Print FRQ
                    </Button>
                    <ShareFRQButton questionId={frqQuestion.id} />
                  </div>
                </div>
                
                {/* Revealed Expert Tip */}
                {frqQuestion.expertTip && (
                  <div className={`mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg ${!isExpertTipVisible ? 'hidden' : ''} print:block print:bg-white print:border-gray-300`}>
                    <div className="flex items-start">
                      <Lightbulb className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-blue-500 print:text-black" />
                      <div>
                        <h4 className="font-bold text-blue-900 print:text-black">Expert Tip</h4>
                        <p className="mt-1 text-blue-800 print:text-black">{frqQuestion.expertTip}</p>
                      </div>
                    </div>
                  </div>
                )}

            <p className="text-lg text-gray-800 leading-relaxed">
              {frqQuestion.prompt}
            </p>

                {frqQuestion.image && typeof frqQuestion.image === 'string' && (
                  <div className="my-6 flex justify-center">
                    <Image
                      src={frqQuestion.image}
                      alt="FRQ Question Diagram"
                      width={600}
                      height={400}
                      className="rounded-lg border bg-white"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}

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
              <div key={part.label} className="border border-gray-200 rounded-lg overflow-hidden print:border-none print:break-inside-avoid">
                {/* Part Header */}
                <button
                  onClick={() => togglePart(part.label)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left print:hidden"
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

                {/* Part Header for Print */}
                <div className="hidden print:flex items-start gap-3 p-4 bg-gray-50 border-b">
                   <span className="font-bold text-lg text-gray-900">{part.label}.</span>
                   <span className="text-gray-800">{part.text}</span>
                </div>


                {/* Part Answer */}
                {expandedParts[part.label] && (
                  <div className="p-4 bg-white border-t border-gray-200 space-y-4 print:border-none print:p-0 print:pt-4">

                    {/* Show Instructional Subparts (if they exist) */}
                    {part.subparts && part.subparts.some(sp => !sp.answerType) && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 print:hidden">
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
                    <div className="print:hidden">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Answer:
                      </label>
                      {part.answerType === 'draw' ? (
                        <div className="space-y-3">
                          {!submittedDrawings[`part-${part.label}`] ? (
                            <>
                          <DrawingInput
                            drawingKey={`part-${part.label}`}
                            drawingData={drawingAnswers[`part-${part.label}`]}
                            onSave={handleDrawingAnswer}
                            isGraded={false}
                          />
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <Button
                                  onClick={() => handleSubmitDrawing(`part-${part.label}`)}
                                  disabled={!drawingAnswers[`part-${part.label}`]}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Submit My Drawing
                                </Button>
                              </div>
                              </>
                            ) : (
                              <>
                              {submittedDrawings[`part-${part.label}`] && part.videoUrl && (
                                <div className="mb-4">
                              <Button
                                variant="outline"
                                    onClick={() => setVideoModalState({ url: part.videoUrl!, aspectRatio: part.videoAspectRatio })}
                                className="w-full sm:w-auto bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 hover:text-sky-900"
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Video Walkthrough
                              </Button>
                                </div>
                              )}
                              <DrawingSelfReview 
                                referenceImageUrl={part.referenceImageUrl}
                                studentDrawing={drawingAnswers[`part-${part.label}`]}
                              />
                            </>
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
                            onClick={() => handleGradeTextAnswer(`part-${part.label}`, part.text, part.gradingCriteria || '', part.pointValue)}
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
                            <div key={subpartKey} className="pl-4 border-l-2 border-gray-200 print:hidden">
                              <p className="text-gray-800 mb-3">
                                <span className="font-bold text-lg text-gray-900">{part.label}{subpart.label}.</span> {subpart.text}
                              </p>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Answer:
                                  </label>
                                  {subpart.answerType === 'draw' ? (
                                    <div className="space-y-3">
                                      {!submittedDrawings[subpartKey] ? (
                                        <>
                                      <DrawingInput
                                        drawingKey={subpartKey}
                                        drawingData={drawingAnswers[subpartKey]}
                                        onSave={handleDrawingAnswer}
                                            isGraded={false}
                                      />
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <Button
                                              onClick={() => handleSubmitDrawing(subpartKey)}
                                              disabled={!drawingAnswers[subpartKey]}
                                          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                              <Sparkles className="w-4 h-4 mr-2" />
                                              Submit My Drawing
                                            </Button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          {submittedDrawings[subpartKey] && subpart.videoUrl && (
                                            <div className="mb-4">
                                          <Button
                                            variant="outline"
                                                onClick={() => setVideoModalState({ url: subpart.videoUrl!, aspectRatio: subpart.videoAspectRatio })}
                                            className="w-full sm:w-auto bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200 hover:text-sky-900"
                                          >
                                            <PlayCircle className="w-4 h-4 mr-2" />
                                            Video Walkthrough
                                          </Button>
                                            </div>
                                          )}
                                          <DrawingSelfReview 
                                            referenceImageUrl={(subpart as any).referenceImageUrl}
                                            studentDrawing={drawingAnswers[subpartKey]}
                                          />
                                        </>
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
                                          onClick={() => handleGradeTextAnswer(subpartKey, subpart.text, subpart.gradingCriteria || '', subpart.pointValue)}
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
            <div className="mt-12 text-center bg-blue-50 border-2 border-blue-200 rounded-lg shadow-sm p-8 transition-shadow hover:shadow-md print:hidden">
              <h3 className="text-3xl font-extrabold text-blue-900 mb-2">🚀 Ready to Master the MCQs?</h3>
              <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
                FRQs are only half the battle. Test your knowledge with AP-style multiple-choice questions to make sure you're ready for everything the exam can throw at you.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 text-lg rounded-md shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Link href={`/unitMCQPracticePage?subject=${selectedSubject}&mode=custom&units=${frqQuestion.unit || 1}`}>
                  Practice Unit {frqQuestion.unit || 1} MCQs
                </Link>
              </Button>
              <p className="text-xs text-blue-600 mt-4 font-semibold">The best way to prepare for your next test.</p>
            </div>

          </div>
        )}
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

