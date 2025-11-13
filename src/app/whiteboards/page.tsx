'use client'; // If client-side interactions are needed later, otherwise remove

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Using next/image for optimization
import { whiteboardImages, WhiteboardImage, keyTerms, KeyTerm } from "@/data/allContent";
import { allQuestions } from "@/data/unitPracticeProblems/unitPracticeProblems"; // Re-import allQuestions
import { Question as QuestionType } from '@/data/questionBanks/types'; // Re-import QuestionType
import { X, Check, ChevronLeft, ChevronRight, ChevronDown, BookOpen } from 'lucide-react'; // Add BookOpen icon
import { useInView } from 'react-intersection-observer'; // Keep if needed for LessonSection (not currently used)
import { microLessons, macroLessons } from '@/data/lessons'; // Import both micro and macro lessons
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';
import { PageHeader } from '@/components/ui/PageHeader';

// Helper function to sort lesson IDs like "1.1", "1.10", "2.1"
const sortLessonIDs = (a: string, b: string): number => {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  if (partsA[0] !== partsB[0]) {
    return partsA[0] - partsB[0]; // Sort by unit first
  }
  return (partsA[1] || 0) - (partsB[1] || 0); // Then sort by lesson number
};

// --- Define structure for aggregated content --- 
interface LessonContent {
  lessonId: string;
  lessonName: string;
  terms: KeyTerm[];
  whiteboards: WhiteboardImage[];
}

interface UnitData {
  unit: number;
  lessons: LessonContent[];
}

// --- NEW ImageGallery Component ---
interface ImageGalleryProps {
  images: WhiteboardImage[];
  setExpandedImage: (image: WhiteboardImage | null) => void;
  lessonId: string; // For alt text and keys
}

function ImageGallery({ images, setExpandedImage, lessonId }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center flex items-center justify-center gap-4"> {/* Added flex for arrows */}
      {/* Previous Button - Outside image */}
      {images.length > 1 && (
        <button 
          onClick={goToPrevious} 
          className="p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      <div 
        className="relative group shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200 cursor-pointer" 
        onClick={() => setExpandedImage(currentImage)}
      >
        <Image
          src={currentImage.imageUrl}
          alt={currentImage.title || `Whiteboard ${currentIndex + 1} for Lesson ${lessonId}`}
          width={1024} 
          height={576} 
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px" 
          className="w-full h-auto block bg-gray-100" 
        />
      </div>
      {/* Next Button - Outside image */}
      {images.length > 1 && (
        <button 
          onClick={goToNext} 
          className="p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
// --- END ImageGallery Component ---

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
// --- END Flashcard Component ---

// --- TermCard Component ---
interface TermCardProps {
  term: KeyTerm;
}

function TermCard({ term }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasAdditionalContent = term.subNotes || term.image;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:border-blue-300 hover:shadow-blue-100/50 group">
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
          <div className="flex items-center gap-2">
            {hasAdditionalContent && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>
            )}
          </div>
        </div>

        {/* Expandable Content */}
        {hasAdditionalContent && (
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
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

              {/* Generate Review Questions Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    // TODO: Implement review questions generation functionality
                    console.log('Generate review questions for:', term.term);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Generate Review Questions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// --- END TermCard Component ---

// --- Updated Lesson Section Component --- 
interface LessonSectionProps {
  lesson: LessonContent;
  setExpandedImage: (image: WhiteboardImage | null) => void;
  questions: QuestionType[];
}

function LessonSection({ lesson, setExpandedImage, questions }: LessonSectionProps) {
  console.log('Rendering LessonSection for:', lesson.lessonId, lesson.lessonName);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quickCheckAnswers, setQuickCheckAnswers] = useState<Record<string | number, QuickCheckAnswerState>>({});
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);

  const handleQuickCheckAnswer = (questionId: string | number, answerLetter: string, isCorrect: boolean) => {
    setQuickCheckAnswers(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section aria-labelledby={`lesson-heading-${lesson.lessonId}`} className="mb-10"> 
      <h3 
        id={`lesson-heading-${lesson.lessonId}`} 
        className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2" 
      >
        {lesson.lessonId} - {lesson.lessonName}
      </h3>
      {lesson.terms.length > 0 && (
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Key Terms & Definitions
            </h4>
            <button
              onClick={() => setIsFlashcardMode(!isFlashcardMode)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title={isFlashcardMode ? "Switch to list view" : "Switch to flashcard view"}
            >
              <BookOpen className="w-4 h-4" />
              {isFlashcardMode ? "List View" : "Flashcards"}
            </button>
          </div>
          
          {isFlashcardMode ? (
            <Flashcard terms={lesson.terms} />
          ) : (
            <div className="grid gap-4">
              {lesson.terms.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {lesson.whiteboards.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">
            Lesson Whiteboards
          </h4>
          {lesson.whiteboards.length === 1 ? (
            // Render single image directly
            <div 
              key={lesson.whiteboards[0].id} 
              className="relative cursor-pointer w-full max-w-3xl mx-auto group shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200"
              onClick={() => setExpandedImage(lesson.whiteboards[0])}
            >
              <Image
                src={lesson.whiteboards[0].imageUrl}
                alt={lesson.whiteboards[0].title || `Whiteboard for Lesson ${lesson.whiteboards[0].lessonIDs.join(', ')}`}
                width={1024} 
                height={576} 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px" 
                className="w-full h-auto block bg-gray-100" 
              />
            </div>
          ) : (
            // Render ImageGallery for multiple images
            <ImageGallery 
              images={lesson.whiteboards} 
              setExpandedImage={setExpandedImage} 
              lessonId={lesson.lessonId} 
            />
          )}
        </div>
      )}

      {/* Questions Section */}
      {questions.length > 0 && (
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
              <a
                onClick={handlePreviousQuestion}
                className={`text-sm font-medium cursor-pointer ${
                  currentQuestionIndex === 0
                    ? 'text-gray-400 pointer-events-none'
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                ← Previous Question
              </a>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <a
                onClick={handleNextQuestion}
                className={`text-sm font-medium cursor-pointer ${
                  currentQuestionIndex === questions.length - 1
                    ? 'text-gray-400 pointer-events-none'
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Next Question →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- Re-add Simple MCQ Display Component --- 
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

// --- Chat Sidebar Component ---
// function ChatSidebar() {
//   return (
//     <aside className="h-[calc(100vh-4rem)] w-80 bg-white border-l border-gray-200 flex flex-col pt-6">
//       {/* Chat Header */}
//       <div className="p-4 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
//         <p className="text-sm text-gray-500">Coming soon: Get help with your AP Microeconomics questions</p>
//       </div>

//       {/* Chat Messages Area */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="space-y-4">
//           {/* Placeholder Messages */}
//           <div className="flex items-start gap-3">
//             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//               <span className="text-blue-600 text-sm font-medium">AI</span>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-3 max-w-[80%]">
//               <p className="text-sm text-gray-700">Hi! I'm your AI study assistant. I'll be here soon to help you with AP Microeconomics concepts and practice questions.</p>
//             </div>
//           </div>
//           <div className="flex items-start gap-3">
//             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
//               <span className="text-blue-600 text-sm font-medium">AI</span>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-3 max-w-[80%]">
//               <p className="text-sm text-gray-700">You'll be able to ask me questions about any topic, and I'll help explain concepts, provide examples, and guide you through practice problems.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chat Input Area */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Ask a question..."
//             disabled
//             className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
//           />
//           <button
//             disabled
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//         <p className="text-xs text-gray-500 mt-2 text-center">AI chat feature coming soon!</p>
//       </div>
//     </aside>
//   );
// }

// --- Main Page Component ---
export default function WhiteboardsPage() {
  const [expandedImage, setExpandedImage] = useState<WhiteboardImage | null>(null);
  const [structuredData, setStructuredData] = useState<UnitData[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<number>(2); // Default to Unit 2
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [pendingUnit, setPendingUnit] = useState<number | null>(null);
  const [guestSubject, setGuestSubject] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);

  const { user, userData, loadingUserData } = useAuthContext();

  // Initialize client-side state and guest subject
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setGuestSubject(localStorage.getItem('guestAPSubject'));
    }
  }, []);

  // Map user's selected subject to the data format (for both logged-in users and guests)
  const getSelectedSubject = (): 'ap_microeconomics' | 'ap_macroeconomics' | null => {
    if (user && userData?.selectedSubject) {
      return userData.selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    }
    // Check for guest subject
    if (!user && guestSubject) {
      return guestSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    }
    return null;
  };

  const selectedSubject = getSelectedSubject();

  const handleUnitSelect = (unit: number) => {
    if (unit === 2 || unit === 3) {
      setSelectedUnit(unit);
      setCurrentLessonIndex(0); // Reset lesson index when unit changes
      setPendingUnit(null);
    } else {
      if (!user) {
        setPendingUnit(unit);
        setShowSelectPlanModal(true);
      } else {
        setSelectedUnit(unit);
        setCurrentLessonIndex(0); // Reset lesson index
        setPendingUnit(null);
      }
    }
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
    if (pendingUnit !== null) {
      setSelectedUnit(pendingUnit);
      setCurrentLessonIndex(0); // Reset lesson index
      setPendingUnit(null);
    }
  };

  useEffect(() => {
    const unitMap = new Map<number, UnitData>();

    const structuredUnitData = (): UnitData[] => {
      // Check if subject is selected (for both logged-in users and guests)
      if (!selectedSubject) return [];
      
      // Select the appropriate lessons based on subject
      const lessons = selectedSubject === 'ap_microeconomics' ? microLessons : macroLessons;
      
      // Create a new unit entry
      const unitData: UnitData = {
        unit: selectedUnit,
        lessons: lessons
          .filter(lesson => lesson.unit === selectedUnit)
          .map(lesson => ({
            lessonId: lesson.lessonNumber,
            lessonName: lesson.lessonName,
            terms: [],
            whiteboards: []
          }))
      };

      console.log('Created unit data:', unitData);

      // Add whiteboard images to lessons (filter by subject)
      whiteboardImages
        .filter(image => image.subject === selectedSubject)
        .forEach(image => {
          image.lessonIDs.forEach(lessonId => {
            const lessonIndex = unitData.lessons.findIndex(l => l.lessonId === lessonId);
            if (lessonIndex !== -1) {
              unitData.lessons[lessonIndex].whiteboards.push(image);
            }
          });
        });

      // Add key terms to lessons (filter by subject)
      keyTerms
        .filter(term => term.subject === selectedSubject)
        .forEach(term => {
          term.lessonIDs.forEach(lessonId => {
            const lessonIndex = unitData.lessons.findIndex(l => l.lessonId === lessonId);
            if (lessonIndex !== -1) {
              unitData.lessons[lessonIndex].terms.push(term);
            }
          });
        });

      // Sort lessons
      unitData.lessons.sort((a, b) => sortLessonIDs(a.lessonId, b.lessonId));
      
      return [unitData];
    };

    setStructuredData(structuredUnitData());
  }, [selectedUnit, selectedSubject, isClient]);

  // Show loading state while user data is loading (only for logged-in users)
  if (user && loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study guide...</p>
        </div>
      </div>
    );
  }

  // Show subject selection prompt if no subject is selected (for logged-in users only)
  if (user && !selectedSubject) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Select Your Subject</h2>
          <p className="text-gray-600 mb-6">
            Please select your primary subject on the homepage to view your personalized study guide.
          </p>
          <a href="/userHomePage" className="text-blue-600 hover:underline">
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  // Show loading state while client-side state is initializing (for guests)
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getCurrentLesson = () => {
    if (!structuredData.length || !structuredData[0].lessons.length) return null;
    return structuredData[0].lessons[currentLessonIndex];
  };

  const handlePreviousLesson = () => {
    setCurrentLessonIndex(prev => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    if (!structuredData.length) return;
    setCurrentLessonIndex(prev => Math.min(structuredData[0].lessons.length - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLesson = getCurrentLesson();

  // Get questions for each lesson
  const getQuestionsForLesson = (lessonId: string): QuestionType[] => {
    return allQuestions.filter(q => 
      q.lessonIDS.includes(lessonId) && 
      q.subject === selectedSubject &&
      q.unit === selectedUnit
    );
  };

  // Get subject display name
  const getSubjectDisplayName = () => {
    return selectedSubject === 'ap_microeconomics' ? 'AP Microeconomics' : 'AP Macroeconomics';
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
          setShowSelectPlanModal(false); // Close plan modal if open
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
          setShowSelectPlanModal(false); // Close plan modal if open
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
      <div className="min-h-screen bg-white flex">
        {/* Left Sidebar - REMOVED */}
        {/* <div className="w-64 flex-shrink-0 fixed top-16 left-0 h-[calc(100vh-4rem)]">
          <UnitNavigationSidebar />
        </div> */}

        {/* Main Content */}
        <main className="flex-1 py-12 md:py-24 w-screen bg-gray-50" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
          <div className="container mx-auto px-4 md:px-0">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-8">
              <PageHeader 
                title="AP {subject} Unit Study Guides"
                subject={selectedSubject === 'ap_microeconomics' ? 'micro' : 'macro'}
                subtitle="Every key concept, explained clearly — one lesson at a time"
              />
              
              {/* Navigation */}
              <div className="mb-8">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="font-medium text-gray-700">{getSubjectDisplayName()}</span>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <select
                    value={selectedUnit}
                    onChange={(e) => handleUnitSelect(Number(e.target.value))}
                    className="font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((unitNum) => (
                      <option key={unitNum} value={unitNum} disabled={unitNum !== 2 && unitNum !== 3 && !user}>
                        Unit {unitNum} {unitNum !== 2 && unitNum !== 3 && !user ? '(🔒)' : ''}
                      </option>
                    ))}
                  </select>
                  {currentLesson && (
                    <>
                      <ChevronRight className="w-4 h-4 mx-2" />
                      <span className="font-medium text-blue-600">{currentLesson.lessonId} - {currentLesson.lessonName}</span>
                    </>
                  )}
                </div>
              </div>
              
              {currentLesson && (
                <LessonSection
                  key={currentLesson.lessonId}
                  lesson={currentLesson}
                  setExpandedImage={setExpandedImage}
                  questions={getQuestionsForLesson(currentLesson.lessonId)}
                />
              )}
            </div>
          </div>
        </main>

        {/* Chat Sidebar */}
        {/* <div className="w-80 flex-shrink-0 fixed top-16 right-0 h-[calc(100vh-4rem)]">
          <ChatSidebar />
        </div> */}

        {/* Modal for expanded image */}
        {expandedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setExpandedImage(null)}>
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <Image
                src={expandedImage.imageUrl}
                alt={expandedImage.title || 'Expanded whiteboard view'}
                width={1024}
                height={576}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
