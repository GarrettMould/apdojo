"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, ChevronLeft, BookOpen, Download, X, Home, ChevronRight as ChevronRightIcon } from "lucide-react";

import { keyTerms, KeyTerm, whiteboardImages, WhiteboardImage } from '@/data/allContent';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';

// Helper function to sort lesson IDs like "1.1", "1.10", "2.1"
const sortLessonIDs = (a: string, b: string): number => {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  if (partsA[0] !== partsB[0]) {
    return partsA[0] - partsB[0]; // Sort by unit first
  }
  return (partsA[1] || 0) - (partsB[1] || 0); // Then sort by lesson number
};

// --- Flashcard Component ---
interface FlashcardProps {
  terms: KeyTerm[];
}

function Flashcard({ terms }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);

  const currentTerm = terms[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev === terms.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentIndex(prev => (prev === 0 ? terms.length - 1 : prev - 1));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!hasFlippedOnce) {
      setHasFlippedOnce(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center flex items-center justify-center gap-4">
      {/* Previous Button - Outside card */}
      {terms.length > 1 && (
        <button 
          onClick={handlePrevious} 
          className="p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md flex-shrink-0"
          aria-label="Previous term"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      
      <div className="relative flex-1 min-w-0">
        <div 
          className="relative w-full h-80 cursor-pointer shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200"
          onClick={handleFlip}
        >
          {!isFlipped ? (
            // Front of card
            <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentTerm.term}
                </h3>
                {!hasFlippedOnce && (
                  <p className="text-gray-500 text-sm">Click to reveal definition</p>
                )}
              </div>
            </div>
          ) : (
            // Back of card
            <div className="absolute inset-0 w-full h-full bg-blue-50 flex items-center justify-center p-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 leading-relaxed">{currentTerm.definition}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Counter at bottom */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} of {terms.length}
          </span>
        </div>
      </div>
      
      {/* Next Button - Outside card */}
      {terms.length > 1 && (
        <button 
          onClick={handleNext} 
          className="p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md flex-shrink-0"
          aria-label="Next term"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

// --- TermCard Component ---
interface TermCardProps {
  term: KeyTerm;
  isFirst?: boolean;
}

function TermCard({ term, isFirst = false }: TermCardProps) {
  const hasAdditionalContent = term.subNotes || term.image;

  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:border-slate-300 hover:shadow-slate-100/50 group"
    >
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h5 
              className="text-xl font-bold text-slate-900 mb-3"
            >
              {term.term}
            </h5>
            <p className="text-slate-700 leading-relaxed text-base">
              {term.definition}
            </p>
          </div>
        </div>

        {/* Additional Content - Always Visible */}
        {hasAdditionalContent && (
          <div className="mt-6">
            <div className="border-t border-slate-100 pt-6 space-y-5">
              
              {/* SubNotes */}
              {term.subNotes && term.subNotes.length > 0 && (
                <div>
                  <h6 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Key Points</h6>
                  <ul className="space-y-2">
                    {term.subNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="leading-relaxed">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Image */}
              {term.image && (
                <div>
                  <h6 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Visual Aid</h6>
                  <div className="relative group">
                    <img
                      src={term.image.url}
                      alt={term.image.alt}
                      className="w-full max-w-md rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Comprehension Check Components ---
interface QuickCheckAnswerState {
  selectedLetter: string;
  isCorrect: boolean;
}

interface SimpleMcqDisplayProps {
  question: QuestionType;
  onAnswerSelect: (questionId: string | number, answerLetter: string, isCorrect: boolean) => void; 
  currentAnswer?: QuickCheckAnswerState; 
}

function SimpleMcqDisplay({ question, onAnswerSelect, currentAnswer }: SimpleMcqDisplayProps) {
  // Only consider submitted if there's an answer for THIS specific question
  const isSubmitted = !!currentAnswer; 
  
  // Debug logging
  console.log('SimpleMcqDisplay: Question ID:', question.id);
  console.log('SimpleMcqDisplay: Current answer:', currentAnswer);
  console.log('SimpleMcqDisplay: Is submitted:', isSubmitted);
  
  const letterToIndex = (letter?: string): number | null => {
    if (!letter || typeof letter !== 'string' || letter.length !== 1) return null;
    const index = letter.toUpperCase().charCodeAt(0) - 65;
    return index >= 0 && index < question.options.length ? index : null;
  };
  const textToIndex = (text?: string): number | null => {
      if (!text || typeof text !== 'string') return null;
      const index = question.options.findIndex(opt => opt === text);
      return index !== -1 ? index : null;
  }
  const correctAnswerIndex = letterToIndex(question.correctAnswer) ?? textToIndex(question.correctAnswer);
  const selectedAnswerIndex = isSubmitted ? letterToIndex(currentAnswer.selectedLetter) : null;

  const handleSelect = (optIndex: number) => {
    if (isSubmitted) return; 
    const selectedLetter = String.fromCharCode(65 + optIndex);
    const isCorrect = optIndex === correctAnswerIndex;
    onAnswerSelect(question.id, selectedLetter, isCorrect);
  };

  return (
    <div className="mb-6">
      <div className="font-semibold text-lg mb-6 text-slate-900 leading-relaxed">{question.question}</div>
      <div className="space-y-3">
        {question.options.map((option, optIndex) => {
          const letter = String.fromCharCode(65 + optIndex);
          const isCorrectOption = optIndex === correctAnswerIndex;
          const isSelectedOption = optIndex === selectedAnswerIndex;
          
          return (
            <button
              key={letter}
              onClick={() => handleSelect(optIndex)}
              className={`block w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 text-base font-medium
                ${isSubmitted ? (
                  isCorrectOption ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm' :
                  isSelectedOption ? 'bg-red-50 border-red-300 text-red-900 shadow-sm' :
                  'bg-white border-slate-200 text-slate-700'
                ) : isSelectedOption ? (
                  isCorrectOption ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm' :
                  'bg-red-50 border-red-300 text-red-900 shadow-sm'
                ) : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm'}
                focus:outline-none focus:ring-2 focus:ring-slate-200`}
              disabled={isSubmitted}
            >
              <span className="mr-4 font-bold text-slate-600">{letter}.</span>{option}
            </button>
          );
        })}
      </div>
      {currentAnswer && (
        <div className="mt-6 p-5 rounded-xl text-base bg-slate-50 border border-slate-200">
          <div className="font-bold mb-3 text-slate-900">
            {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          {question.explanation && (
            <div className="text-slate-700 leading-relaxed">{question.explanation}</div>
          )}
        </div>
      )}
    </div>
  );
}

interface ComprehensionCheckProps {
  unitId: number;
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
}

function ComprehensionCheck({ unitId, subject }: ComprehensionCheckProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quickCheckAnswers, setQuickCheckAnswers] = useState<Record<string | number, QuickCheckAnswerState>>({});

  // Get questions for this unit and subject
  const unitQuestions = allQuestions.filter(q => 
    q.subject === subject && q.unit === unitId
  ).slice(0, 5); // Limit to 5 questions like in whiteboards

  // Reset answers when unit changes or component mounts
  useEffect(() => {
    console.log('ComprehensionCheck: Resetting answers for unit', unitId, 'subject', subject);
    setQuickCheckAnswers({});
    setCurrentQuestionIndex(0);
  }, [unitId, subject]);

  const handleQuickCheckAnswer = (questionId: string | number, answerLetter: string, isCorrect: boolean) => {
    console.log('ComprehensionCheck: Answering question', questionId, 'with letter', answerLetter, 'isCorrect:', isCorrect);
    setQuickCheckAnswers(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < unitQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = unitQuestions[currentQuestionIndex];

  // Debug logging
  useEffect(() => {
    console.log('ComprehensionCheck: Current question index:', currentQuestionIndex);
    console.log('ComprehensionCheck: Current question:', currentQuestion);
    console.log('ComprehensionCheck: Quick check answers:', quickCheckAnswers);
    console.log('ComprehensionCheck: Current answer for question:', quickCheckAnswers[currentQuestion?.id]);
  }, [currentQuestionIndex, currentQuestion, quickCheckAnswers]);

  if (unitQuestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-slate-200 pt-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h4 className="text-xl font-bold text-slate-900">
            Comprehension Check
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Test your understanding with practice questions
          </p>
        </div>
        <div className="p-6">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Progress</span>
              <span>{Object.keys(quickCheckAnswers).length} of {unitQuestions.length} questions answered</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(quickCheckAnswers).length / unitQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <SimpleMcqDisplay
            question={currentQuestion}
            onAnswerSelect={handleQuickCheckAnswer}
            currentAnswer={quickCheckAnswers[currentQuestion.id]}
          />
          
          {/* Completion Message */}
          {Object.keys(quickCheckAnswers).length === unitQuestions.length && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <div className="text-emerald-800 font-semibold mb-1">🎉 Great job!</div>
              <div className="text-emerald-700 text-sm">
                You've completed all the comprehension check questions for this unit.
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={handlePreviousQuestion}
              className={`text-sm font-medium cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                currentQuestionIndex === 0
                  ? 'text-slate-400 bg-slate-50 cursor-not-allowed'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              ← Previous Question
            </button>
            <span className="text-sm text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
              Question {currentQuestionIndex + 1} of {unitQuestions.length}
            </span>
            <button
              onClick={handleNextQuestion}
              className={`text-sm font-medium cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                currentQuestionIndex === unitQuestions.length - 1
                  ? 'text-slate-400 bg-slate-50 cursor-not-allowed'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Next Question →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WhiteboardsGalleryProps {
  unitId: number;
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
}

function WhiteboardsGallery({ unitId, subject }: WhiteboardsGalleryProps) {
  const [expandedImage, setExpandedImage] = useState<WhiteboardImage | null>(null);

  // Get whiteboards for this unit and subject
  const unitWhiteboards = whiteboardImages.filter(wb => 
    wb.unit === unitId && wb.subject === subject
  );

  // Since there are no Unit 1 AP macro whiteboards yet, create placeholder containers
  const placeholderCount = 6; // Show 6 placeholder containers
  const hasWhiteboards = unitWhiteboards.length > 0;

  return (
    <div className="mt-12 border-t border-slate-200 pt-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h4 className="text-xl font-bold text-slate-900">
            Visual Aids & Whiteboards
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Interactive diagrams and visual explanations
          </p>
        </div>
        <div className="p-6">
          {hasWhiteboards ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {unitWhiteboards.map((whiteboard) => (
                <div
                  key={whiteboard.id}
                  className="relative cursor-pointer group shadow-sm hover:shadow-md rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-200"
                  onClick={() => setExpandedImage(whiteboard)}
                >
                  <div className="aspect-video bg-slate-100 relative">
                    <img
                      src={whiteboard.imageUrl}
                      alt={whiteboard.title || `Whiteboard ${whiteboard.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {whiteboard.title && (
                    <div className="p-3 bg-white">
                      <p className="text-sm font-semibold text-slate-900 truncate">{whiteboard.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: placeholderCount }, (_, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group shadow-sm hover:shadow-md rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-200 bg-slate-50"
                  onClick={() => setExpandedImage({
                    id: `placeholder-${index}`,
                    imageUrl: '/images/placeholder-whiteboard.jpg',
                    title: `Visual Aid ${index + 1} - Coming Soon`,
                    unit: unitId,
                    subject: subject,
                    lessonIDs: [] // Add dummy lessonIDs property to satisfy type
                  })}
                >
                  <div className="aspect-video bg-slate-100 relative flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-slate-500">Coming Soon</p>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm font-medium text-slate-400">Visual Aid {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for expanded image */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" 
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="absolute -top-12 right-0 flex items-center gap-4">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = expandedImage.imageUrl;
                  link.download = expandedImage.title || 'whiteboard-image';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="text-white hover:text-slate-300 flex items-center gap-2"
                aria-label="Download"
              >
                <Download className="w-6 h-6" />
                <span className="text-sm">Download</span>
              </button>
              <button
                onClick={() => setExpandedImage(null)}
                className="text-white hover:text-slate-300"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <img
              src={expandedImage.imageUrl}
              alt={expandedImage.title || 'Expanded whiteboard view'}
              className="w-full h-auto rounded-lg"
            />
            {expandedImage.title && (
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white">{expandedImage.title}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface UnitPageProps {
  params: { unitId: string };
}

export default function UnitLandingPage({ params }: UnitPageProps) {
  const unitId = params.unitId;
  const unitIdNum = parseInt(unitId, 10);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);
  const [pendingUnit, setPendingUnit] = useState<number | null>(null);

  const { user } = useAuthContext();

  // Get terms for current unit from allContent.ts
  const unitTerms = keyTerms.filter(term => 
    term.unit === unitIdNum && term.subject === 'ap_macroeconomics'
  ).sort((a, b) => {
    // Sort by first lessonID
    const aLesson = a.lessonIDs[0] ? parseFloat(a.lessonIDs[0]) : 0;
    const bLesson = b.lessonIDs[0] ? parseFloat(b.lessonIDs[0]) : 0;
    return aLesson - bLesson;
  }); // Show all terms for the unit

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
    if (pendingUnit !== null) {
      window.location.href = `/unit/${pendingUnit}`;
      setPendingUnit(null);
    }
  };

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingUnit(null);
        }}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSelectPlanModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => {
          setShowSignupModal(false);
          setPendingUnit(null);
        }}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowSelectPlanModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SelectPlanModal
        isOpen={showSelectPlanModal}
        onClose={() => {
          setShowSelectPlanModal(false);
          setPendingUnit(null);
        }}
        switchToLogin={() => {
          setShowSelectPlanModal(false);
          setShowLoginModal(true);
        }}
        switchToSignup={() => {
          setShowSelectPlanModal(false);
          setShowSignupModal(true);
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link 
                href="/" 
                className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRightIcon className="w-4 h-4 text-slate-400" />
              <Link 
                href="/unit-study-guides" 
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                AP Macroeconomics
              </Link>
              <ChevronRightIcon className="w-4 h-4 text-slate-400" />
              <span className="text-slate-900 font-medium">Unit {unitId}</span>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Professional Header */}
          <div className="bg-white border-b border-slate-200 shadow-sm mt-8">
            <div className="px-8 py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 border border-slate-200 rounded-xl mb-6">
                <BookOpen className="w-8 h-8 text-slate-700" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Unit {unitId}</h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">Basic Economic Concepts</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Master the fundamental principles and key terminology essential for understanding macroeconomics
              </p>
            </div>
          </div>

          {/* Terms Section - Enhanced Design */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mt-8 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Key Terms & Definitions</h3>
                <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                  {unitTerms.length} terms
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {unitTerms.map((term, index) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    isFirst={index === 0}
                  />
                ))}
              </div>
              
              {/* Enhanced Comprehension Check Section */}
              <ComprehensionCheck 
                unitId={unitIdNum} 
                subject="ap_macroeconomics" 
              />
              
              {/* Enhanced Whiteboards Gallery Section */}
              <WhiteboardsGallery 
                unitId={unitIdNum} 
                subject="ap_macroeconomics" 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 