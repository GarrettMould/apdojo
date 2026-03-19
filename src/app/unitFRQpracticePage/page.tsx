'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronDown, ChevronUp, Sparkles, Loader2, PlayCircle, Upload, X, Pencil, Image as ImageIcon, Lock, Share2, Check, Lightbulb, ChevronsRight, ChevronsLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import { DrawingPad } from '@/components/DrawingPad';
import { useAuthContext } from '@/contexts/AuthContext';
import { VideoModal } from '@/components/VideoModal';
import { frqExams, FRQPart, FRQSubPart } from '@/data/frqQuestions';
import { FeedbackBlock } from '@/components/FeedbackBlock';
import { DrawingInput } from '@/components/DrawingInput';
import { ShareFRQButton } from '@/components/ShareFRQButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import FRQLibrarySidebar, { FRQItem } from '@/components/FRQLibrarySidebar';
import { hasValidSeasonPass } from '@/lib/utils';
import { FRQCompletionModal } from '@/components/FRQCompletionModal';

// Self-Review Component for Drawings
const DrawingSelfReview = ({ 
  referenceImageUrl, 
  studentDrawing,
  onChecklistChange
}: { 
  referenceImageUrl?: string;
  studentDrawing?: string;
  onChecklistChange?: (checkedCount: number, totalCount: number) => void;
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  
  // Debug: Log referenceImageUrl (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
    console.log('DrawingSelfReview - referenceImageUrl:', referenceImageUrl);
    console.log('DrawingSelfReview - will encode to:', referenceImageUrl ? referenceImageUrl.replace(/ /g, '%20') : 'undefined');
    }
  }, [referenceImageUrl]);

  const checklistItems = [
    'All curves are correctly labeled',
    'Axes are properly labeled',
    'Curves are drawn in the correct positions',
    'Equilibrium point is clearly marked'
  ];

  // Calculate points and notify parent when checklist changes
  useEffect(() => {
    if (onChecklistChange) {
      const checkedCount = Object.values(checkedItems).filter(Boolean).length;
      onChecklistChange(checkedCount, checklistItems.length);
    }
  }, [checkedItems, onChecklistChange, checklistItems.length]);

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
                  if (process.env.NODE_ENV === 'development') {
                  console.log('Successfully loaded reference image:', encodedReferenceUrl);
                  }
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
              className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedItems[index] || false}
                onChange={() => toggleCheck(index)}
                className="mt-0.5 w-5 h-5 cursor-pointer"
              />
              <label 
                onClick={() => toggleCheck(index)}
                className={`text-base text-gray-800 flex-1 cursor-pointer ${checkedItems[index] ? 'line-through text-gray-500' : ''}`}
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function UnitFRQPracticePageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedSubject, awardXp, user, userData } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);

  // Check if user is a pro customer (has season pass)
  const isProCustomer = React.useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for current subject
    const subjectKey = selectedSubject === 'macro' ? 'macro' : 'micro';
    return hasValidSeasonPass(userData, subjectKey);
  }, [user, userData, selectedSubject]);

  // Memoize the filtering of relevant exams
  const relevantExams = React.useMemo(() => frqExams.filter(exam =>
    exam.questions.some(q =>
      Array.isArray(q.subject)
        ? q.subject.includes(selectedSubject)
        : q.subject === selectedSubject
    )
  ), [selectedSubject]);

  // Memoize the flattening, subject-filtering, and sorting of all questions
  const allQuestions = React.useMemo(
    () =>
      relevantExams
        .flatMap(exam =>
          exam.questions
            // Ensure questions match the currently selected subject
            .filter(q =>
              Array.isArray(q.subject)
                ? q.subject.includes(selectedSubject)
                : q.subject === selectedSubject
            )
            .map(q => ({ ...q, unit: exam.unit, examTitle: exam.examTitle }))
        )
        .sort(
          (a, b) =>
            (a.unit || 99) - (b.unit || 99) ||
            a.title.localeCompare(b.title)
        ),
    [relevantExams, selectedSubject]
  );

  // Helper function to check if a question is locked
  const isQuestionLocked = React.useCallback((questionId: number | undefined, questionUnit?: number): boolean => {
    if (!questionId) return true;
    
    // Pro customers: All FRQs unlocked
    if (isProCustomer) {
      return false;
    }
    
    // Free customers: All Unit 1 FRQs are unlocked, plus GDP FRQ from Unit 2 (question ID 5) for macro
    if (selectedSubject === 'macro') {
      // Unit 1 FRQs are unlocked (questionUnit === 1)
      // Also unlock question ID 5 (GDP & Inflation Data from Unit 2)
      if (questionUnit === 1) {
        return false; // Unit 1 FRQs are unlocked
      }
      return questionId !== 5; // Only question ID 5 from Unit 2 is unlocked
    }
    
    // For micro: All Unit 1 FRQs are unlocked, plus Game Theory FRQ from Unit 4 (question ID 3)
    if (selectedSubject === 'micro') {
      // Unit 1 FRQs are unlocked (questionUnit === 1)
      if (questionUnit === 1) {
        return false; // Unit 1 FRQs are unlocked
      }
      // Also unlock question ID 3 (Game Theory from Unit 4)
      return questionId !== 3; // Only question ID 3 from Unit 4 is unlocked
    }
    
    // Default: locked
    return true;
  }, [isProCustomer, selectedSubject]);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Check for frqId query parameter to auto-select a specific question
  useEffect(() => {
    const frqIdParam = searchParams.get('frqId');
    if (frqIdParam) {
      const frqId = parseInt(frqIdParam, 10);
      if (!isNaN(frqId)) {
        // Find the question with matching ID
        const questionIndex = allQuestions.findIndex(q => q.id === frqId);
        const question = allQuestions[questionIndex];
        if (questionIndex !== -1 && !isQuestionLocked(frqId, question?.unit)) {
          // Only auto-select if the question is unlocked
          setSelectedQuestionIndex(questionIndex);
        }
      }
    }
  }, [searchParams, allQuestions]);

  // Set initial question to first unlocked one if current is locked
  useEffect(() => {
    if (allQuestions.length > 0) {
      const currentQuestion = allQuestions[selectedQuestionIndex];
      if (!currentQuestion || isQuestionLocked(currentQuestion.id, currentQuestion.unit)) {
        // Find first unlocked question
        const firstUnlockedIndex = allQuestions.findIndex(q => !isQuestionLocked(q.id, q.unit));
        if (firstUnlockedIndex !== -1) {
          setSelectedQuestionIndex(firstUnlockedIndex);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions, isProCustomer, selectedSubject]);

  // Use only real questions from frqQuestions.ts
  const allDisplayQuestions = allQuestions;

  // Convert questions to FRQItem format for the sidebar
  const frqItems: FRQItem[] = React.useMemo(() => {
    return allDisplayQuestions.map((question) => {
      // Calculate total points from all parts and subparts
      const totalPoints = question.parts.reduce((sum, part) => {
        const partPoints = part.answerType ? (part.pointValue || 0) : 0;
        const subpartPoints = part.subparts?.reduce((subSum, subpart) => {
          return subSum + (subpart.answerType ? (subpart.pointValue || 0) : 0);
        }, 0) || 0;
        return sum + partPoints + subpartPoints;
      }, 0);

      // Determine status
      const isLocked = isQuestionLocked(question.id, question.unit);
      // TODO: Add logic to check if question is completed (from user progress)
      const status: 'locked' | 'completed' | 'available' = isLocked 
        ? 'locked' 
        : 'available'; // For now, all unlocked questions are 'available'

      return {
        id: question.id.toString(),
        title: question.title,
        unit: question.unit || 0,
        totalPoints: totalPoints || 0,
        status,
      };
    });
  }, [allDisplayQuestions]);

  // Get the selected question, or fallback to first question if index is invalid
  const selectedQuestion = allDisplayQuestions[selectedQuestionIndex] || allDisplayQuestions[0];
  const isCurrentQuestionLocked = isQuestionLocked(selectedQuestion?.id, selectedQuestion?.unit);
  
  // If the selected question is locked, we'll show a locked message
  // Otherwise, use the selected question
  const frqQuestion = selectedQuestion;

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
  const [checklistPoints, setChecklistPoints] = useState<Record<string, number>>({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

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

  // Calculate points from grading feedback and checklist
  const currentPoints = React.useMemo(() => {
    const feedbackPoints = Object.values(gradingFeedback).reduce((acc, feedback) => {
    return acc + (feedback.score || 0);
  }, 0);
    const checklistPointsTotal = Object.values(checklistPoints).reduce((acc, points) => acc + points, 0);
    return feedbackPoints + checklistPointsTotal;
  }, [gradingFeedback, checklistPoints]);

  // Calculate total XP earned (sum of all feedback scores * 100)
  const calculatedTotalXp = React.useMemo(() => {
    const feedbackXp = Object.values(gradingFeedback).reduce((acc, feedback) => {
      return acc + ((feedback.score || 0) * 100);
    }, 0);
    // Checklist points also contribute to XP (same multiplier)
    const checklistXp = Object.values(checklistPoints).reduce((acc, points) => acc + (points * 100), 0);
    return feedbackXp + checklistXp;
  }, [gradingFeedback, checklistPoints]);

  // Check if all answerable parts/subparts are completed
  const isAllQuestionsCompleted = React.useMemo(() => {
    if (!frqQuestion || !frqQuestion.parts) return false;

    // Check all answerable parts and subparts
    return frqQuestion.parts.every((part) => {
      // Check if part itself is answerable
      if (part.answerType) {
        const partKey = `part-${part.label}`;
        if (part.answerType === 'draw') {
          // For drawing answers: must have submitted drawing
          if (!submittedDrawings[partKey]) {
            return false;
          }
        } else {
          // For text answers: must have grading feedback
          if (!gradingFeedback[partKey]) {
            return false;
          }
        }
      }
      
      // Check subparts
      if (part.subparts) {
        const allSubpartsCompleted = part.subparts
          .filter(subpart => subpart.answerType) // Only check answerable subparts
          .every((subpart) => {
            const subpartKey = `subpart-${part.label}-${subpart.label}`;
            if (subpart.answerType === 'draw') {
              // For drawing answers: must have submitted drawing
              return !!submittedDrawings[subpartKey];
            } else {
              // For text answers: must have grading feedback
              return !!gradingFeedback[subpartKey];
            }
          });
        
        if (!allSubpartsCompleted) {
          return false;
        }
      }
      
      return true;
    });
  }, [frqQuestion, gradingFeedback, submittedDrawings]);

  // Completion modal disabled - no longer showing on completion
  // useEffect(() => {
  //   if (isAllQuestionsCompleted && !showCompletionModal) {
  //     setTotalXpEarned(calculatedTotalXp);
  //     setShowCompletionModal(true);
  //   }
  // }, [isAllQuestionsCompleted, showCompletionModal, calculatedTotalXp]);

  // Generate completion message based on score
  const getCompletionMessage = (score: number, total: number): string => {
    const percentage = total > 0 ? (score / total) * 100 : 0;
    
    if (percentage >= 90) {
      return "Outstanding work! You've mastered this FRQ! 🎉";
    } else if (percentage >= 75) {
      return "Great job! You're well on your way to a 5! 💪";
    } else if (percentage >= 60) {
      return "Good effort! Keep practicing to improve your score! 📚";
    } else {
      return "Nice try! Review the feedback and try again! 🔄";
    }
  };

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
    const question = allDisplayQuestions[index];
    // Prevent selecting locked questions
    if (question && isQuestionLocked(question.id, question.unit)) {
      return;
    }
    setSelectedQuestionIndex(index);
    // Reset all answer and feedback states
    setExpandedParts({});
    setExpandedSubparts({});
    setShowAnswers({});
    setTextAnswers({});
    setDrawingAnswers({});
    setGradingFeedback({});
    setIsGrading({});
    setChecklistPoints({});
    setIsExpertTipVisible(false);
    setShowCompletionModal(false);
    setTotalXpEarned(0);
  };

  const handleGradeTextAnswer = async (answerKey: string, partText: string, gradingCriteria: string, pointValue?: number) => {
    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }

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

    const requestBody = {
      textAnswer,
      partLabel: partLabelForApi,
      questionPrompt: frqQuestion?.prompt || 'No prompt provided',
      partText,
      gradingCriteria: gradingCriteria || '',
      pointValue: pointValue || 2,
    };

    if (process.env.NODE_ENV === 'development') {
    console.log("Sending to API:", requestBody);
    }

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
        body: JSON.stringify(requestBody),
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
    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }

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
      {showSeasonPassModal && (
        <SeasonPassModal
          subject={selectedSubject === 'macro' ? 'macro' : 'micro'}
          onClose={() => setShowSeasonPassModal(false)}
        />
      )}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={() => {
          setShowLoginModal(false);
        }}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={() => {
          setShowSignupModal(false);
        }}
      />
      <VideoModal
        isOpen={!!videoModalState}
        onClose={() => setVideoModalState(null)}
        videoUrl={videoModalState?.url || ''}
        aspectRatio={videoModalState?.aspectRatio}
      />
      {/* Completion modal disabled - no longer showing */}
      {/* <FRQCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        xpEarned={totalXpEarned}
        score={currentPoints}
        totalPoints={totalPoints}
        message={getCompletionMessage(currentPoints, totalPoints)}
      /> */}

      {/* Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 left-0 z-40 print:hidden cursor-pointer bg-white border-r-2 border-t-2 border-b-2 border-gray-300 rounded-r-lg shadow-md hover:bg-gray-50 transition-colors px-3 py-8 flex items-center justify-center group"
          aria-label="Open FRQ Library"
        >
          <ChevronsRight className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
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
        className={`fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white lg:w-1/4 w-4/5 z-40 shadow-xl transition-transform duration-300 ease-in-out print:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b-2 border-black bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">FRQ Library</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-gray-200"
            >
              <ChevronsLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <FRQLibrarySidebar
              items={frqItems}
              selectedId={selectedQuestion?.id?.toString() || ''}
              onSelect={(id) => {
                const questionIndex = allDisplayQuestions.findIndex(q => q.id.toString() === id);
                const question = allDisplayQuestions[questionIndex];
                if (questionIndex !== -1 && question) {
                  // If question is locked, open the season pass modal
                  if (isQuestionLocked(parseInt(id, 10), question.unit)) {
                    setShowSeasonPassModal(true);
                    return;
                  }
                  handleSelectQuestion(questionIndex);
                  setIsSidebarOpen(false); // Close sidebar on selection
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-8 print:px-0 print:py-0">
        {/* Main Content Area - Side by Side Layout for Desktop */}
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-6 lg:items-start print:block lg:h-screen">
          {/* Left Column: Sticky Question and Graph */}
          <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto print:static print:h-auto lg:max-w-full">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 print:shadow-none print:border-none">
              {/* Header */}
              <div className="mb-6 pb-4 border-b print:border-b-2 print:border-black">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {'title' in frqQuestion ? frqQuestion.title : `Question ${frqQuestion.questionNumber}`}
                </h1>
                <p className="text-md text-gray-600">
                  From: {frqQuestion.examTitle}
                </p>
                  </div>
                  {/* Points Display */}
                  <div className="print:hidden flex-shrink-0">
                    <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4 text-center min-w-[100px]">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Points</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {currentPoints}/{totalPoints}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locked Question Message */}
              {isCurrentQuestionLocked && (
                <div className="text-center py-16 mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    This FRQ is Locked
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    This FRQ is currently locked. Only the featured FRQs are available at this time.
                  </p>
                  <div className="flex gap-4 justify-center">
                    {allDisplayQuestions.find(q => q.id === 1) && (
                      <button
                        onClick={() => {
                          const macroIndex = allDisplayQuestions.findIndex(q => q.id === 1);
                          if (macroIndex !== -1) {
                            handleSelectQuestion(macroIndex);
                          }
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Try Ample Reserves FRQ
                      </button>
                    )}
                    {allDisplayQuestions.find(q => q.id === 2) && (
                      <button
                        onClick={() => {
                          const microIndex = allDisplayQuestions.findIndex(q => q.id === 2);
                          if (microIndex !== -1) {
                            handleSelectQuestion(microIndex);
                          }
                        }}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Try Factor Markets FRQ
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Question Content */}
              {!isCurrentQuestionLocked && (
                <div>
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
                      <div />
                    )}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print FRQ
                      </Button>
                      <ShareFRQButton questionId={frqQuestion.id} />
                    </div>
                  </div>
                  
                  {/* Expert Tip */}
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

                  {/* Question Prompt */}
                  <p className="text-lg text-gray-800 leading-relaxed mb-6">
                    {frqQuestion.prompt}
                  </p>

                  {/* Question Image */}
                  {frqQuestion.image && typeof frqQuestion.image === 'string' && (
                    <div className="my-6 flex justify-center">
                      <Image
                        src={frqQuestion.image}
                        alt="FRQ Question Diagram"
                        width={500}
                        height={350}
                        className="rounded-lg border bg-white max-w-full"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}

                  {/* Table Data */}
                  {frqQuestion.tableData && (
                    <div className="my-8 flex justify-center">
                      <div className="flex items-center gap-4">
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
              )}
            </div>
          </div>

          {/* Right Column: Scrollable Parts and Answers */}
          <div className="lg:overflow-y-auto lg:overflow-x-hidden lg:h-screen print:static print:h-auto lg:max-w-full lg:min-w-0">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 print:shadow-none print:border-none lg:max-w-full lg:overflow-x-hidden">
              {/* Parts */}
              {!isCurrentQuestionLocked && (
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

                {/* Print-only: Show Instructional Subparts */}
                {part.subparts && part.subparts.some(sp => !sp.answerType) && (
                  <div className="hidden print:block p-4 bg-white">
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

                {/* Print-only: Show Answerable Subparts */}
                {part.subparts && part.subparts.some(sp => sp.answerType) && (
                  <div className="hidden print:block p-4 bg-white space-y-4">
                    {part.subparts.filter(sp => sp.answerType).map((subpart) => (
                      <div key={`print-subpart-${part.label}-${subpart.label}`} className="pl-4 border-l-2 border-gray-300">
                        <p className="text-gray-800 mb-2">
                          <span className="font-bold text-lg text-gray-900">{part.label}{subpart.label}.</span> {subpart.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

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
                            templateImageUrl={part.templateImageUrl}
                          />
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <Button
                                  onClick={() => handleSubmitDrawing(`part-${part.label}`)}
                                  disabled={!drawingAnswers[`part-${part.label}`]}
                            className="w-full sm:w-auto inline-flex items-center justify-center font-black py-3.5 px-6 rounded-xl border-2 border-green-700 bg-green-500 hover:bg-green-600 text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                                referenceImageUrl={(part as FRQPart).referenceImageUrl}
                                studentDrawing={drawingAnswers[`part-${part.label}`]}
                                onChecklistChange={(checkedCount, totalCount) => {
                                  const partKey = `part-${part.label}`;
                                  let points = 0;
                                  if (checkedCount === totalCount && checkedCount > 0) {
                                    points = 2; // All checked
                                  } else if (checkedCount > 0 && checkedCount < totalCount) {
                                    points = 1; // Some checked
                                  } else {
                                    points = 0; // None checked
                                  }
                                  
                                  // Update checklist points
                                  setChecklistPoints(prev => {
                                    const oldPoints = prev[partKey] || 0;
                                    // Only update if points changed
                                    if (oldPoints !== points) {
                                      return { ...prev, [partKey]: points };
                                    }
                                    return prev;
                                  });
                                }}
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
                                        templateImageUrl={(subpart as any).templateImageUrl}
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
                                            onChecklistChange={(checkedCount, totalCount) => {
                                              let points = 0;
                                              if (checkedCount === totalCount && checkedCount > 0) {
                                                points = 2; // All checked
                                              } else if (checkedCount > 0 && checkedCount < totalCount) {
                                                points = 1; // Some checked
                                              } else {
                                                points = 0; // None checked
                                              }
                                              
                                              // Update checklist points
                                              setChecklistPoints(prev => {
                                                const oldPoints = prev[subpartKey] || 0;
                                                // Only update if points changed
                                                if (oldPoints !== points) {
                                                  return { ...prev, [subpartKey]: points };
                                                }
                                                return prev;
                                              });
                                            }}
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
            )}

            {/* Call to Action Section */}
            {!isCurrentQuestionLocked && (
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
            )}
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

