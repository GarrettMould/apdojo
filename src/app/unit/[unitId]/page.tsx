"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, ChevronLeft, BookOpen, Download, X } from "lucide-react";
import { videos as allVideos } from '@/data/videos';
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
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:border-blue-300 hover:shadow-blue-100/50 group"
    >
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h5 
              className="text-lg font-bold text-gray-900 mb-2"
            >
              {term.term}
            </h5>
            <p className="text-gray-700 leading-relaxed text-sm">
              {term.definition}
            </p>
          </div>
        </div>

        {/* Additional Content - Always Visible */}
        {hasAdditionalContent && (
          <div className="mt-4">
            <div className="border-t border-gray-100 pt-4 space-y-4">
              
              {/* SubNotes */}
              {term.subNotes && term.subNotes.length > 0 && (
                <div>
                  <h6 className="text-sm font-semibold text-gray-800 mb-2">Key Points:</h6>
                  <ul className="space-y-1">
                    {term.subNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Image */}
              {term.image && (
                <div>
                  <h6 className="text-sm font-semibold text-gray-800 mb-2">Visual Aid:</h6>
                  <div className="relative group">
                    <img
                      src={term.image.url}
                      alt={term.image.alt}
                      className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 object-contain"
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
  const isSubmitted = !!currentAnswer; 
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
      <div className="font-semibold text-base mb-4 text-gray-900">{question.question}</div>
      <div className="space-y-2">
        {question.options.map((option, optIndex) => {
          const letter = String.fromCharCode(65 + optIndex);
          const isCorrectOption = optIndex === correctAnswerIndex;
          const isSelectedOption = optIndex === selectedAnswerIndex;
          
          return (
            <button
              key={letter}
              onClick={() => handleSelect(optIndex)}
              className={`block w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 text-base font-medium
                ${isSubmitted ? (
                  isCorrectOption ? 'bg-green-100 border-green-400 text-green-900' :
                  isSelectedOption ? 'bg-red-100 border-red-400 text-red-900' :
                  'bg-white border-gray-200'
                ) : isSelectedOption ? (
                  isCorrectOption ? 'bg-green-100 border-green-400 text-green-900' :
                  'bg-red-100 border-red-400 text-red-900'
                ) : 'bg-white border-gray-200 hover:bg-blue-50'}
                focus:outline-none`}
              disabled={isSubmitted}
            >
              <span className="mr-3 font-bold">{letter}.</span>{option}
            </button>
          );
        })}
      </div>
      {currentAnswer && (
        <div className="mt-4 p-4 rounded-lg text-base bg-white border border-gray-200">
          <div className="font-bold mb-2">
            {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          {question.explanation && (
            <div className="text-base">{question.explanation}</div>
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

  const handleQuickCheckAnswer = (questionId: string | number, answerLetter: string, isCorrect: boolean) => {
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

  if (unitQuestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">
        Comprehension Check
      </h4>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <SimpleMcqDisplay
          question={currentQuestion}
          onAnswerSelect={handleQuickCheckAnswer}
          currentAnswer={quickCheckAnswers[currentQuestion.id]}
        />
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePreviousQuestion}
            className={`text-sm font-medium cursor-pointer ${
              currentQuestionIndex === 0
                ? 'text-gray-400 pointer-events-none'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            ← Previous Question
          </button>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {unitQuestions.length}
          </span>
          <button
            onClick={handleNextQuestion}
            className={`text-sm font-medium cursor-pointer ${
              currentQuestionIndex === unitQuestions.length - 1
                ? 'text-gray-400 pointer-events-none'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Next Question →
          </button>
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
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h4 className="text-xl font-bold mb-4 text-gray-800">
        Visual Aids & Whiteboards
      </h4>
      
      {hasWhiteboards ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {unitWhiteboards.map((whiteboard) => (
            <div
              key={whiteboard.id}
              className="relative cursor-pointer group shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200"
              onClick={() => setExpandedImage(whiteboard)}
            >
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={whiteboard.imageUrl}
                  alt={whiteboard.title || `Whiteboard ${whiteboard.id}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              {whiteboard.title && (
                <div className="p-3 bg-white">
                  <p className="text-sm font-bold text-gray-900 truncate">{whiteboard.title}</p>
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
              className="relative cursor-pointer group shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200 bg-gray-50"
              onClick={() => setExpandedImage({
                id: `placeholder-${index}`,
                imageUrl: '/images/placeholder-whiteboard.jpg',
                title: `Visual Aid ${index + 1} - Coming Soon`,
                unit: unitId,
                subject: subject,
                lessonIDs: [] // Add dummy lessonIDs property to satisfy type
              })}
            >
              <div className="aspect-video bg-gray-100 relative flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-500">Coming Soon</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-400">Visual Aid {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}

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
                className="text-white hover:text-gray-300 flex items-center gap-2"
                aria-label="Download"
              >
                <Download className="w-6 h-6" />
                <span className="text-sm">Download</span>
              </button>
              <button
                onClick={() => setExpandedImage(null)}
                className="text-white hover:text-gray-300"
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
  const router = useRouter();
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);
  const [pendingUnit, setPendingUnit] = useState<number | null>(null);

  const { user } = useAuthContext();

  // Filter and sort AP Macro videos for current unit
  const macroUnitVideos = allVideos
    .filter(v => v.unit === unitId && v.subjects.includes('AP Macroeconomics'))
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });

  // Filter and sort AP Micro videos for current unit (for future use)
  const microUnitVideos = allVideos
    .filter(v => v.unit === unitId && v.subjects.includes('AP Microeconomics'))
    .sort((a, b) => {
      const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
      const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
      return aLesson - bLesson;
    });

  // Get terms for current unit from allContent.ts
  const unitTerms = keyTerms.filter(term => 
    term.unit === unitIdNum && term.subject === 'ap_macroeconomics'
  ).sort((a, b) => {
    // Sort by first lessonID
    const aLesson = a.lessonIDs[0] ? parseFloat(a.lessonIDs[0]) : 0;
    const bLesson = b.lessonIDs[0] ? parseFloat(b.lessonIDs[0]) : 0;
    return aLesson - bLesson;
  }); // Show all terms for the unit

  const handlePrev = () => {
    if (unitIdNum > 1) {
      if (unitIdNum === 2 || unitIdNum === 3 || user) {
        router.push(`/unit/${unitIdNum - 1}`);
      } else {
        setPendingUnit(unitIdNum - 1);
        setShowSelectPlanModal(true);
      }
    }
  };

  const handleNext = () => {
    if (unitIdNum === 2 || unitIdNum === 3 || user) {
      router.push(`/unit/${unitIdNum + 1}`);
    } else {
      setPendingUnit(unitIdNum + 1);
      setShowSelectPlanModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
    if (pendingUnit !== null) {
      router.push(`/unit/${pendingUnit}`);
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
      
      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <div className="flex items-center justify-center py-8 px-4 border-b border-gray-200">
          {/* Always show Prev Unit button, but disable for Unit 1 */}
          <button
            onClick={unitIdNum === 1 ? undefined : handlePrev}
            className={`px-4 py-2 rounded-lg shadow font-bold border border-gray-200 transition mr-4 ${
              unitIdNum === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-blue-50 text-black'
            }`}
            disabled={unitIdNum === 1}
          >
            &larr; Prev Unit
          </button>
          <div className="flex flex-col items-center px-8 py-4 bg-transparent">
            <div className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-800">UNIT {unitId}</div>
            <div className="text-3xl font-bold text-black mt-6">Basic Economic Concepts</div>
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg shadow font-bold bg-white border border-gray-200 hover:bg-blue-50 transition ml-4"
          >
            Next Unit &rarr;
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 h-fit">
          {/* Left: Videos Column (1/4) */}
          <div className="md:col-span-1 border-r border-gray-200 bg-white flex flex-col">
            <div className="py-5 px-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between h-full">
                <h3 className="text-xl font-bold text-gray-800">Videos</h3>
              </div>
            </div>
            <div className="pt-6 pb-6 px-6 overflow-y-auto">
              <div className="w-full flex flex-col items-center">
                {macroUnitVideos.map((video, idx) => (
                  <Link key={video.id} href={`/videos/macro/${video.videoSlug}`} className="w-full group mb-8 last:mb-0">
                    <div className="flex flex-col items-center p-4 cursor-pointer transition-all duration-300 rounded-lg hover:bg-gray-50">
                      <img
                        src={video.thumbnail || '/images/placeholder-thumb.png'}
                        alt={video.title}
                        className={`w-40 h-24 object-cover rounded-lg shadow mb-3 ${
                          idx === 0 ? 'border-4 border-black' : 'border border-gray-200'
                        }`}
                      />
                      <div className="text-base font-semibold text-gray-800 text-center">{video.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Terms Section (3/4) */}
          <div className="md:col-span-3 flex flex-col">
            <div className="py-5 px-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between h-full">
                <h3 className="text-xl font-bold text-gray-800">Key Terms & Definitions</h3>
              </div>
            </div>
            <div className="pt-6 pb-6 px-6 overflow-y-auto">
              <div className="grid gap-4">
                {unitTerms.map((term, index) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    isFirst={index === 0}
                  />
                ))}
              </div>
              
              {/* Comprehension Check Section */}
              <ComprehensionCheck 
                unitId={unitIdNum} 
                subject="ap_macroeconomics" 
              />
              
              {/* Whiteboards Gallery Section */}
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