'use client'

import { conceptChecks } from '@/data/conceptChecks'
import { ArrowRight, X, ChevronRight, ClipboardCheck } from 'lucide-react'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { useAuthContext } from '@/contexts/AuthContext'
import { FeedbackModal } from './FeedbackModal'
import { LoginModal, SignupModal } from '@/components/AuthModals'
// import { db } from '@/lib/firebase'
// import { doc, setDoc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { testPerformanceService, TestPerformance } from '@/services/testPerformance'
import React from 'react'
import type { CourseSubject } from '@/lib/courseSubject'
import { normalizeCourseSubject, econCourseFromSubject, displayCourseLabel } from '@/lib/courseSubject'

// Add these types at the top of the file
type Unit = {
  id: number;
  name: string;
};

// Update the type to include unit
type Question = {
  text: string;
  tags: string[];
  lessonIDS: string[];
  unit: number;
};

// Add this new component at the top of the file
const FeedbackProgressBar = ({ status }: { status: 'incorrect' | 'partial' | 'correct' }) => {
  const bars = [
    { filled: status === 'incorrect' || status === 'partial' || status === 'correct' },
    { filled: status === 'partial' || status === 'correct' },
    { filled: status === 'correct' }
  ];

  const getColor = (status: 'incorrect' | 'partial' | 'correct') => {
    switch (status) {
      case 'incorrect': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500';
      case 'correct': return 'bg-green-500';
    }
  };

  return (
    <div className="flex gap-1.5">
      {bars.map((bar, index) => (
        <div 
          key={index}
          className={`h-2 w-12 rounded-full transition-all duration-300 ${
            bar.filled 
              ? getColor(status) 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

// Move QuestionCard outside of QuestionsGrid
const QuestionCard = React.memo(({ 
  question, 
  tags, 
  lessonIDs,
  unit,
  onSubmit,
  onGuestActionAttempt
}: { 
  question: string; 
  tags: string[];
  lessonIDs: string[];
  unit: number;
  onSubmit: (question: string, answer: string, tags: string[], relevantLessons: string[], unit: number) => void;
  onGuestActionAttempt: () => void;
}) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    if (!user) {
      onGuestActionAttempt();
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          userAnswer: answer,
          tags,
          type: 'ai_tutor',
          options: [],
          selectedAnswer: answer,
          correctAnswer: ''
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      await onSubmit(question, answer, tags, lessonIDs, unit);
      
      setAnswer('');
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col space-y-4">
        {/* Update tags container */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tag, index) => (
          <span 
            key={index}
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                tag.startsWith('Unit ')
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-blue-50 text-blue-600'
              }`}
          >
            {tag}
          </span>
        ))}
      </div>

        {/* Update question text container */}
        <div className="w-full md:max-w-[calc(100%-100px)]">
          <p className="text-base md:text-lg font-semibold text-gray-900">
          {question}
        </p>
        </div>

        {/* Update input section */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isLoading}
          />
          <button 
            onClick={handleSubmit}
            className={`sm:w-auto w-full relative group px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ClipboardCheck className="w-6 h-6 stroke-[2]" />
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Get feedback & see sample answer
                  {/* Triangle pointer */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

// Add this new component
const UnitFilter = ({ 
  units, 
  selectedUnits, 
  onUnitToggle,
  userSubject,
  onClearFilters,
}: { 
  units: Unit[];
  selectedUnits: number[];
  onUnitToggle: (unitId: number) => void;
  userSubject: CourseSubject;
  onClearFilters: () => void;
}) => {
  const titleColor =
    userSubject === 'macro'
      ? 'text-blue-500'
      : userSubject === 'micro'
        ? 'text-green-500'
        : 'text-violet-600';
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-4xl text-center font-extrabold tracking-wide mb-6 md:mb-10">
        <span className={`text-4xl md:text-6xl block mb-2 ${titleColor}`}>
          AP {displayCourseLabel(userSubject)}
        </span>
        <span className="block">
          Comprehension Checks
        </span>
      </h2>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-4">
        <h3 className="text-md font-semibold text-gray-900">Filter by Unit</h3>
        {selectedUnits.length > 0 && (
          <button
            onClick={onClearFilters}
            className="sm:ml-3 px-3 py-1 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {units.map((unit) => (
          <button
            key={unit.id}
            onClick={() => onUnitToggle(unit.id)}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-all flex-grow sm:flex-grow-0
              ${selectedUnits.includes(unit.id)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {unit.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Replace the hardcoded microUnits and macroUnits arrays with this function
const getUnits = (subject: 'macro' | 'micro'): Unit[] => {
  const subjectData = subject === 'macro' 
    ? conceptChecks.macroeconomics 
    : conceptChecks.microeconomics;
  
  return Object.entries(subjectData).map(([unitNumber, unitData]) => ({
    id: parseInt(unitNumber),
    name: unitData.title
  }));
};

export function QuestionsGrid({ onGuestActionAttempt }: { onGuestActionAttempt?: () => void }) {
  const { user, userData } = useAuthContext();
  
  const subject = useMemo(
    () => normalizeCourseSubject(userData?.selectedSubject as string | undefined),
    [userData],
  );
  const econOnly = econCourseFromSubject(subject);

  const getAllQuestions = useCallback(() => {
    const allQuestions: Question[] = [];
    if (!econOnly) return allQuestions;

    const subjectData = econOnly === 'macro'
      ? conceptChecks.macroeconomics
      : conceptChecks.microeconomics;
    
    Object.entries(subjectData).forEach(([unitNumber, unitData]) => {
      const unitTag = `Unit ${unitNumber} - ${unitData.title}`;
      unitData.questions.forEach(question => {
        allQuestions.push({
          ...question,
          unit: parseInt(unitNumber),
          tags: [unitTag, ...question.tags]
        });
      });
    });
    
    return allQuestions;
  }, [econOnly]);

  const getRandomQuestions = useCallback((count: number) => {
    const allQuestions = getAllQuestions();
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [getAllQuestions]);

  const units = useMemo(() => (econOnly ? getUnits(econOnly) : []), [econOnly]);

  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);

  const handleUnitToggle = (unitId: number) => {
    setSelectedUnits(prev => {
      const newSelectedUnits = prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId];
      return newSelectedUnits;
    });
  };

  const getFilteredQuestions = useCallback(() => {
    const allQuestions = getAllQuestions();
    if (selectedUnits.length === 0) return allQuestions;
    
    return allQuestions.filter(question => 
      selectedUnits.includes(question.unit)
    );
  }, [selectedUnits, getAllQuestions]);

  const [visibleCount, setVisibleCount] = useState(3);
  
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setQuestions(getFilteredQuestions());
    setVisibleCount(3);
  }, [selectedUnits, subject, getFilteredQuestions]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + questions.length, questions.length));
  };

  const [activeQuestion, setActiveQuestion] = useState<{ 
    question: string; 
    answer: string;
    tags: string[];
    relevantLessons: string[];
    unit: number;
  } | null>(null);
  const [feedback, setFeedback] = useState<{
    status: 'incorrect' | 'partial' | 'correct';
    message: string;
  } | null>(null);

  const handleSubmitAnswer = useCallback(async (question: string, answer: string, tags: string[], relevantLessons: string[], unit: number) => {
    setActiveQuestion({ 
      question, 
      answer, 
      tags, 
      relevantLessons,
      unit
    });
    setFeedback(null);

    try {
      const startTime = Date.now();
      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          userAnswer: answer,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const timeSpent = Date.now() - startTime;
      
      let status: 'incorrect' | 'partial' | 'correct';
      const feedbackLower = data.feedback.toLowerCase();

      if (feedbackLower.includes('incorrect') || feedbackLower.includes('error')) {
        status = 'incorrect';
      } else if (feedbackLower.includes('partially correct') || 
                 feedbackLower.includes('could be improved') || 
                 (feedbackLower.includes('correct') && feedbackLower.includes('but'))) {
        status = 'partial';
      } else if (feedbackLower.includes('correct')) {
        status = 'correct';
      } else {
        status = 'incorrect';
      }

      setFeedback({
        status,
        message: data.feedback
      });

      // --- *** NEW: Calculate and Update XP *** ---
      if (user) { // Only proceed if user is logged in
        let xpChange = 0;
        switch (status) {
          case 'correct':
            xpChange = 20;
            break;
          case 'partial':
            xpChange = 10;
            break;
          case 'incorrect':
            xpChange = -2; // Or 0 if you don't want negative XP
            break;
        }

        if (xpChange !== 0) {
          /* // Commented out API call to update unit XP
          try {
            const xpUpdateResponse = await fetch('/api/update-unit-xp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user.uid,
                unitId: unit,
                xpAmount: xpChange,
              }),
            });

            if (!xpUpdateResponse.ok) {
              const errorData = await xpUpdateResponse.json();
              console.error(`Failed to update Unit ${unit} XP: ${xpUpdateResponse.status}`, errorData.error || 'Unknown error');
            } else {
              console.log(`Unit ${unit} XP update request sent for user ${user.uid} with amount ${xpChange}`);
              // UI should update via listener detecting change in unit XP data
            }
          } catch (xpError) {
            console.error(`Error calling /api/update-unit-xp for unit ${unit}:`, xpError);
          }
          */
        }
      }
      // --- *** End XP Update *** ---

      // Save performance data if user is logged in
      if (user) {
        const isCorrect = status === 'correct';
        const performanceData: TestPerformance = {
          userId: user.uid,
          examType: subject,
          examNumber: '1', // You might want to make this dynamic
          timestamp: Date.now(),
          totalQuestions: 1,
          correctAnswers: isCorrect ? 1 : 0,
          timeSpent,
          unitPerformance: {
            [unit.toString()]: {
              total: 1,
              correct: isCorrect ? 1 : 0,
              percentage: isCorrect ? 100 : 0
            }
          },
          questionDetails: {
            [question]: {
              userAnswer: answer,
              isCorrect,
              timeSpent,
              unitNumber: unit
            }
          }
        };

        // await testPerformanceService.saveTestPerformance(performanceData);
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback({
        status: 'incorrect',
        message: 'Sorry, there was an error checking your answer. Please try again.'
      });
    }
  }, [user, subject]);

  useEffect(() => {
    if (activeQuestion && feedback) {
      // Prevent scrolling on the background
      document.body.style.overflow = 'hidden';
      // Add padding to prevent layout shift when scrollbar disappears
      document.body.style.paddingRight = '15px'; // Approximate scrollbar width
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [activeQuestion, feedback]);

  const getStudyResources = (relevantLessons: string[]) => {
    return relevantLessons.map(lesson => ({
      title: lesson,
      type: 'notes' as const,
      link: '#'
    }));
  };

  const handleClearFilters = () => {
    setSelectedUnits([]);
  };

  const filteredQuestions = useMemo(() => getFilteredQuestions(), [selectedUnits, subject, getFilteredQuestions]);

  console.log('QuestionsGrid re-rendered, subject:', subject);

  return (
    <div className="py-12 md:py-24 w-screen bg-gray-50" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-8">
          <UnitFilter 
            units={units}
            selectedUnits={selectedUnits}
            onUnitToggle={handleUnitToggle}
            userSubject={subject}
            onClearFilters={handleClearFilters}
          />
          
          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
                <>
                  {filteredQuestions.slice(0, visibleCount).map((question, index) => (
                    <QuestionCard 
                      key={`${subject}-${index}`}
                      question={question.text}
                      tags={question.tags}
                      lessonIDs={question.lessonIDS}
                      unit={question.unit}
                      onSubmit={handleSubmitAnswer}
                      onGuestActionAttempt={() => {
                        if (onGuestActionAttempt) {
                          onGuestActionAttempt();
                        }
                      }}
                    />
                  ))}
                  
                  {visibleCount < filteredQuestions.length && (
                    <div className="flex justify-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        className="mt-6 px-6 py-3 bg-white text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                      >
                        Load More Questions
                      </button>
                    </div>
                  )}
                </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No questions found for the selected filters.
                </p>
                <button
                  onClick={() => setSelectedUnits([])}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        <FeedbackModal 
          isOpen={!!activeQuestion && !!feedback}
          onClose={() => {
            setActiveQuestion(null);
            setFeedback(null);
          }}
          question={activeQuestion?.question || ''}
          selectedAnswer={activeQuestion?.answer}
          feedback={feedback || { status: 'incorrect', message: '' }}
          unit={activeQuestion?.unit || 1}
        />
      </div>
    </div>
  );
}
