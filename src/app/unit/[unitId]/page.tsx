"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, ChevronLeft, BookOpen, Download, X, Home, ChevronRight as ChevronRightIcon, FileText } from "lucide-react";

import { keyTerms, KeyTerm, whiteboardImages, WhiteboardImage } from '@/data/allContent';
import { unit1Whiteboards, apMacroUnit2Whiteboards, apMacroUnit3Whiteboards, apMacroUnit4Whiteboards } from '@/data/whiteboards';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
// MVP: Removed authentication imports
// import { useAuthContext } from '@/contexts/AuthContext';
// import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';


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
  const [expandedImage, setExpandedImage] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Get whiteboards for this unit and subject
  let unitWhiteboards: any[] = [];
  
  if (unitId === 2 && subject === 'ap_macroeconomics') {
    // Use the existing apMacroUnit2Whiteboards data for Unit 2 macro
    unitWhiteboards = apMacroUnit2Whiteboards.map(wb => ({
      id: wb.lessonID + '_' + wb.topic.replace(/\s+/g, '_'),
      imageUrl: wb.url,
      title: wb.topic,
      unit: wb.unit,
      subject: 'ap_macroeconomics',
      lessonIDs: [wb.lessonID]
    }));
  } else if (unitId === 3 && subject === 'ap_macroeconomics') {
    // Use the existing apMacroUnit3Whiteboards data for Unit 3 macro
    unitWhiteboards = apMacroUnit3Whiteboards.map(wb => ({
      id: wb.lessonID + '_' + wb.topic.replace(/\s+/g, '_'),
      imageUrl: wb.url,
      title: wb.topic,
      unit: wb.unit,
      subject: 'ap_macroeconomics',
      lessonIDs: [wb.lessonID]
    }));
  } else {
    // Fall back to the original whiteboardImages for other units
    unitWhiteboards = whiteboardImages.filter(wb => 
    wb.unit === unitId && wb.subject === subject
  );
  }

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
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }, (_, index) => (
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
                  if (isDownloading) return; // Prevent multiple clicks
                  
                  setIsDownloading(true);
                  
                  // Generate a meaningful filename based on unit and lesson
                  const unitNum = expandedImage.unit || unitId; // Use the unitId from component props
                  const lessonId = expandedImage.lessonIDs?.[0] || 'unknown';
                  const filename = `AP_Macro_Unit${unitNum}_Lesson${lessonId}_Whiteboard.jpg`;
                  
                  // Use our API endpoint to download the image
                  const downloadUrl = `/api/download-whiteboard?url=${encodeURIComponent(expandedImage.imageUrl)}&filename=${encodeURIComponent(filename)}`;
                  
                  // Create a temporary link element
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.download = filename;
                  
                  // Trigger download
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  // Reset loading state after a short delay
                  setTimeout(() => setIsDownloading(false), 2000);
                }}
                disabled={isDownloading}
                className={`flex items-center gap-2 transition-opacity ${
                  isDownloading 
                    ? 'text-slate-400 cursor-not-allowed opacity-50' 
                    : 'text-white hover:text-slate-300'
                }`}
                aria-label={isDownloading ? 'Downloading...' : 'Download'}
              >
                {isDownloading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Downloading...</span>
                  </>
                ) : (
                  <>
                <Download className="w-6 h-6" />
                <span className="text-sm">Download</span>
                  </>
                )}
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

          </div>
        </div>
      )}
    </div>
  );
}

interface UnitPageProps {
  params: Promise<{ unitId: string }>;
}

export default function UnitLandingPage({ params }: UnitPageProps) {
  const resolvedParams = React.use(params);
  const unitId = resolvedParams.unitId;
  const unitIdNum = parseInt(unitId, 10);
  const subject = 'ap_macroeconomics' as const;
  
  // Lock Units 5 and 6
  if (unitIdNum === 5 || unitIdNum === 6) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 border border-gray-200 rounded-xl mb-6">
              <BookOpen className="w-8 h-8 text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Unit {unitIdNum} Study Guide
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              This unit is coming soon. Check back later for comprehensive study materials.
            </p>
            <Link
              href="/unit-study-guides"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Study Guides
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  // MVP: Removed authentication state variables
  // const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showSignupModal, setShowSignupModal] = useState(false);
  // const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);
  // const [pendingUnit, setPendingUnit] = useState<number | null>(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState<any>(null);

  // MVP: Removed authentication requirement - allow all users to access unit study guides
  // const { user } = useAuthContext();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUnitDropdownOpen) {
        setIsUnitDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUnitDropdownOpen]);

  // Get terms for current unit - use apMacroTerms for Units 1, 3 & 4, allContent for others
  const unitTerms = (() => {
    if ((unitIdNum === 1 || unitIdNum === 3 || unitIdNum === 4) && subject === 'ap_macroeconomics') {
      // Use the new apMacroTerms for Units 1, 3 & 4
      return apMacroTerms.filter(term => term.unit === unitIdNum).sort((a, b) => {
        const aLesson = a.lessonIDs[0] ? parseFloat(a.lessonIDs[0]) : 0;
        const bLesson = b.lessonIDs[0] ? parseFloat(b.lessonIDs[0]) : 0;
        return aLesson - bLesson;
      });
    } else {
      // Use allContent for other units
      return keyTerms.filter(term => 
    term.unit === unitIdNum && term.subject === 'ap_macroeconomics'
  ).sort((a, b) => {
    const aLesson = a.lessonIDs[0] ? parseFloat(a.lessonIDs[0]) : 0;
    const bLesson = b.lessonIDs[0] ? parseFloat(b.lessonIDs[0]) : 0;
        return aLesson - bLesson;
      });
    }
  })();

  // MVP: Removed authentication logic
  // const handleAuthSuccess = () => {
  //   setShowLoginModal(false);
  //   setShowSignupModal(false);
  //   setShowSelectPlanModal(false);
  //   if (pendingUnit !== null) {
  //     window.location.href = `/unit/${pendingUnit}`;
  //     setPendingUnit(null);
  //   }
  // };

  return (
    <>
      {/* MVP: Removed authentication modals */}
      {/* <LoginModal
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
      {/* <SignupModal
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
      /> */}
      
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
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUnitDropdownOpen(!isUnitDropdownOpen);
                  }}
                  className="flex items-center gap-1 text-slate-900 font-medium hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Unit {unitId}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUnitDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Unit Dropdown */}
                {isUnitDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-32"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[1, 2, 3, 4, 5, 6].map((unitNum) => {
                      const isUnlocked = true; // All units are accessible for study guides
                      const isCurrentUnit = unitNum === unitIdNum;
                      
                      return (
                        <Link
                          key={unitNum}
                          href={isUnlocked ? `/unit/${unitNum}` : '#'}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isCurrentUnit 
                              ? 'bg-blue-50 text-blue-600 font-medium' 
                              : isUnlocked
                              ? 'text-slate-700 hover:bg-slate-50'
                              : 'text-slate-400 cursor-not-allowed'
                          }`}
                          onClick={(e) => {
                            if (!isUnlocked) {
                              e.preventDefault();
                              // MVP: Removed authentication logic
                              // setShowSelectPlanModal(true);
                              // setPendingUnit(unitNum);
                            }
                            setIsUnitDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>Unit {unitNum}</span>
                            {!isUnlocked && <span className="text-xs">🔒</span>}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">
                {unitIdNum === 1 && 'Basic Economic Concepts'}
                {unitIdNum === 2 && 'Economic Indicators and the Business Cycle'}
                {unitIdNum === 3 && 'National Income and Price Determination'}
                {unitIdNum === 4 && 'Financial Sector'}
                {unitIdNum === 5 && 'Stabilization Policies'}
                {unitIdNum === 6 && 'Open Economy—International Trade and Finance'}
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {unitIdNum === 1 && 'Master the fundamental principles and key terminology essential for understanding macroeconomics'}
                {unitIdNum === 2 && 'Explore economic indicators, GDP, unemployment, inflation, and business cycles'}
                {unitIdNum === 3 && 'Learn about aggregate demand, aggregate supply, equilibrium, and fiscal policy'}
                {unitIdNum === 4 && 'Understand money, banking, and monetary policy'}
                {unitIdNum === 5 && 'Study fiscal and monetary policy tools and their effects'}
                {unitIdNum === 6 && 'Explore international trade, exchange rates, and balance of payments'}
              </p>
            </div>
          </div>

          {/* Lesson-by-Lesson Content */}
          <div className="mt-8 space-y-8">
            {(() => {
              if ((unitIdNum === 1 || unitIdNum === 2 || unitIdNum === 3 || unitIdNum === 4) && subject === 'ap_macroeconomics') {
                // For Units 1, 2, 3 & 4, group by lesson and show terms + whiteboards together
                const lessonGroups = new Map<string, { terms: KeyTerm[], whiteboards: any[] }>();
                
                // Group terms by lesson - only for the current unit
                let unitTerms: KeyTerm[];
                if (unitIdNum === 1 || unitIdNum === 2 || unitIdNum === 3 || unitIdNum === 4) {
                  // Use apMacroTerms for Units 1, 2, 3 & 4, but filter by unit
                  unitTerms = apMacroTerms.filter(term => term.unit === unitIdNum);
                } else {
                  unitTerms = [];
                }
                
                unitTerms.forEach(term => {
                  term.lessonIDs.forEach(lessonId => {
                    // Only add terms for lessons in the current unit
                    if (lessonId.startsWith(unitIdNum.toString() + '.')) {
                      if (!lessonGroups.has(lessonId)) {
                        lessonGroups.set(lessonId, { terms: [], whiteboards: [] });
                      }
                      lessonGroups.get(lessonId)!.terms.push(term);
                    }
                  });
                });
                
                // Group whiteboards by lesson - only for the current unit
                let unitWhiteboards: any[];
                if (unitIdNum === 1) {
                  unitWhiteboards = unit1Whiteboards;
                } else if (unitIdNum === 2) {
                  unitWhiteboards = apMacroUnit2Whiteboards;
                } else if (unitIdNum === 3) {
                  unitWhiteboards = apMacroUnit3Whiteboards;
                } else if (unitIdNum === 4) {
                  unitWhiteboards = apMacroUnit4Whiteboards;
                } else {
                  unitWhiteboards = [];
                }
                
                unitWhiteboards.forEach(wb => {
                  // Only add whiteboards for lessons in the current unit
                  if (wb.lessonID.startsWith(unitIdNum.toString() + '.')) {
                    if (!lessonGroups.has(wb.lessonID)) {
                      lessonGroups.set(wb.lessonID, { terms: [], whiteboards: [] });
                    }
                    lessonGroups.get(wb.lessonID)!.whiteboards.push(wb);
                  }
                });
                
                // Convert to array and sort by lesson number
                const sortedLessons = Array.from(lessonGroups.entries())
                  .sort(([a], [b]) => parseFloat(a) - parseFloat(b));
                
                return sortedLessons.map(([lessonId, { terms, whiteboards }]) => (
                  <div key={lessonId} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Lesson Header */}
                    <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
                      <h3 className="text-xl font-bold text-slate-900">
                        {lessonId}: {
                          lessonId === '1.1' ? 'Basic Economic Concepts' :
                          lessonId === '1.2' ? 'Production Possibilities Curve' :
                          lessonId === '1.3' ? 'Comparative Advantage and Trade' :
                          lessonId === '1.4' ? 'Demand' :
                          lessonId === '1.5' ? 'Supply' :
                          lessonId === '1.6' ? 'Market Equilibrium' :
                          lessonId === '2.1' ? 'Circular Flow Model' :
                          lessonId === '2.2' ? 'GDP and Economic Indicators' :
                          lessonId === '2.3' ? 'Unemployment' :
                          lessonId === '2.4' ? 'Price Indices and Inflation' :
                          lessonId === '2.5' ? 'Costs of Inflation' :
                          lessonId === '2.6' ? 'GDP Deflator and Real vs Nominal' :
                          lessonId === '2.7' ? 'Business Cycles' :
                          lessonId === '3.1' ? 'Aggregate Demand' :
                          lessonId === '3.2' ? 'Multipliers' :
                          lessonId === '3.3' ? 'Short-Run Aggregate Supply' :
                          lessonId === '3.4' ? 'Long-Run Aggregate Supply' :
                          lessonId === '3.5' ? 'Equilibrium in the AD-AS Model' :
                          lessonId === '3.6' ? 'Changes in the AD-AS Model' :
                          lessonId === '3.7' ? 'Long-Run Self-Adjustment' :
                          lessonId === '3.8' ? 'Fiscal Policy' :
                          lessonId === '3.9' ? 'Automatic Stabilizers' :
                          lessonId === '4.1' ? 'Financial Assets' :
                          lessonId === '4.2' ? 'Interest Rates' :
                          lessonId === '4.3' ? 'Functions of Money' :
                          lessonId === '4.4' ? 'Banking System' :
                          lessonId === '4.5' ? 'Money Market' :
                          lessonId === '4.6' ? 'Monetary Policy' :
                          lessonId === '4.7' ? 'Loanable Funds Market' : ''
                        }
                      </h3>
                    </div>
                    
                    <div className="p-8">
                      {/* Terms for this lesson */}
                      {terms.length > 0 && (
                        <div className="mb-8">
                          <div className="space-y-6">
                            {terms.map((term, index) => (
                              <div key={term.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:border-slate-300 hover:shadow-slate-100/50 group">
                                <div className="relative">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="text-xl font-bold text-slate-900 mb-3">
                                        {term.term}
                                      </h5>
                                      <p className="text-slate-700 leading-relaxed text-base">
                                        {term.definition}
                                      </p>
                                    </div>
                                  </div>

                                  {/* SubNotes - Only show divider if there are subpoints */}
                                  {term.subNotes && term.subNotes.length > 0 && (
                                    <div className="mt-6">
                                      <div className="border-t border-slate-100 pt-6 space-y-5">
                                        <div>
                                          <h6 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Key Points</h6>
                                          <ul className="space-y-2">
                                            {term.subNotes.map((note, noteIndex) => (
                                              <li key={noteIndex} className="flex items-start gap-3 text-sm text-slate-600">
                                                <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span className="leading-relaxed">{note}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Whiteboards for this lesson */}
                      {whiteboards.length > 0 && (
                        <div className="mt-8">
                          <div className="border-t border-slate-100 pt-6 mb-6">
                            <h6 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">Whiteboards</h6>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whiteboards.map((whiteboard) => (
                              <div
                                key={whiteboard.lessonID + '_' + whiteboard.topic.replace(/\s+/g, '_')}
                                className="relative cursor-pointer group shadow-sm hover:shadow-md rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-200"
                                onClick={() => setExpandedImage({
                                  id: whiteboard.lessonID + '_' + whiteboard.topic.replace(/\s+/g, '_'),
                                  imageUrl: whiteboard.url,
                                  title: whiteboard.topic,
                                  unit: whiteboard.unit,
                                  subject: 'ap_macroeconomics',
                                  lessonIDs: [whiteboard.lessonID]
                                })}
                              >
                                <div className="aspect-video bg-slate-100 relative">
                                  <img
                                    src={whiteboard.url}
                                    alt={whiteboard.topic || `Whiteboard ${whiteboard.lessonID}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                      <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 0 001-1v-6zM14 9a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ));
              } else {
                // For other units, use the original layout
                return (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Terms Section */}
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
                  <div key={term.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:border-slate-300 hover:shadow-slate-100/50 group">
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="text-xl font-bold text-slate-900 mb-3">
                            {term.term}
                          </h5>
                          <p className="text-slate-700 leading-relaxed text-base">
                            {term.definition}
                          </p>
                        </div>
                      </div>

                      {/* SubNotes - Only show divider if there are subpoints */}
                      {term.subNotes && term.subNotes.length > 0 && (
                        <div className="mt-6">
                          <div className="border-t border-slate-100 pt-6 space-y-5">
                            <div>
                              <h6 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Key Points</h6>
                              <ul className="space-y-2">
                                {term.subNotes.map((note, noteIndex) => (
                                  <li key={noteIndex} className="flex items-start gap-3 text-sm text-slate-600">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="leading-relaxed">{note}</span>
                                  </li>
                                ))}
                              </ul>
              </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
                    </div>
                  </div>
                );
              }
            })()}
              
              {/* Enhanced Comprehension Check Section */}
              <ComprehensionCheck 
                unitId={unitIdNum} 
                subject="ap_macroeconomics" 
              />
              
              {/* Unit MCQ Test Section */}
              {unitIdNum === 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                  <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">Unit MCQ Test</h3>
                      <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                        14 questions
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">
                          Test Your Knowledge
                        </h4>
                        <p className="text-slate-600 text-sm">
                          Take the Unit 1 MCQ test to assess your understanding of Basic Economic Concepts.
                        </p>
                      </div>
                      <Link
                        href={`/unit-mcq-test/${unitIdNum}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Start Test
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Spacing before footer */}
              <div className="h-16"></div>
            </div>
          </div>
        </div>

      {/* Image Modal */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <img
              src={expandedImage.imageUrl}
              alt={expandedImage.title || 'Whiteboard'}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

        </div>
      </div>
      )}
    </>
  );
} 