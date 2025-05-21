'use client'; // If client-side interactions are needed later, otherwise remove

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Using next/image for optimization
import { whiteboardImages, WhiteboardImage, keyTerms, KeyTerm } from "@/data/allContent";
import { allQuestions } from "@/data/unitPracticeProblems/unitPracticeProblems"; // Re-import allQuestions
import { Question as QuestionType } from '@/data/questionBanks/types'; // Re-import QuestionType
import { X, Check, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'; // Remove Brain from imports
import { useInView } from 'react-intersection-observer'; // Keep if needed for LessonSection (not currently used)
import { microLessons } from '@/data/lessons'; // Import micro lessons

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
        <div className="mb-8 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="grid gap-4">
              {lesson.lessonId.startsWith('2.')
                ? lesson.terms.map((term) => (
                    <div key={term.id} className="">
                      <span className="text-black font-bold border-b-4 border-blue-200 pb-1">{term.term}</span>
                      <p className="text-gray-600 text-sm mt-2">{term.definition}</p>
                    </div>
                  ))
                : lesson.terms.map(term => (
                    <div key={term.id} className="">
                      <h5 className="inline-block bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded mb-1 text-base">
                        {term.term}
                      </h5>
                      <p className="text-gray-600 text-sm leading-relaxed mt-2">{term.definition}</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
      {lesson.whiteboards.length > 0 && (
        <div className="mt-6">
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
        <div className="mt-8 border-t border-gray-200 pt-6 px-2">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Quick Check
            </h4>
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
function ChatSidebar() {
  return (
    <aside className="h-[calc(100vh-4rem)] w-80 bg-white border-l border-gray-200 flex flex-col pt-6">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
        <p className="text-sm text-gray-500">Coming soon: Get help with your AP Microeconomics questions</p>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Placeholder Messages */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-medium">AI</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-700">Hi! I'm your AI study assistant. I'll be here soon to help you with AP Microeconomics concepts and practice questions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-medium">AI</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-700">You'll be able to ask me questions about any topic, and I'll help explain concepts, provide examples, and guide you through practice problems.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask a question..."
            disabled
            className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <button
            disabled
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">AI chat feature coming soon!</p>
      </div>
    </aside>
  );
}

// --- Unit Navigation Sidebar Component ---
function UnitNavigationSidebar() {
  const units = [
    { number: 1, title: "Basic Economic Concepts" },
    { number: 2, title: "Supply and Demand" },
    { number: 3, title: "Production, Cost, and the Perfect Competition Model" },
    { number: 4, title: "Imperfect Competition" },
    { number: 5, title: "Factor Markets" },
    { number: 6, title: "Market Failure and the Role of Government" }
  ];

  return (
    <aside className="h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto pt-6">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AP Micro Units</h2>
        <nav className="space-y-1">
          {units.map(unit => (
            <div
              key={unit.number}
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-not-allowed"
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 group-hover:bg-gray-200">
                {unit.number}
              </span>
              <span className="ml-3 text-gray-600 group-hover:text-gray-900">
                {unit.title}
              </span>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// --- Main Page Component ---
export default function WhiteboardsPage() {
  const [expandedImage, setExpandedImage] = useState<WhiteboardImage | null>(null);
  const [structuredData, setStructuredData] = useState<UnitData[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<number>(2); // Default to Unit 2
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const unitMap = new Map<number, UnitData>();

    const structuredUnitData = (): UnitData[] => {
      // Create a new unit entry
      const unitData: UnitData = {
        unit: selectedUnit,
        lessons: microLessons
          .filter(lesson => lesson.unit === selectedUnit)
          .map(lesson => ({
            lessonId: lesson.lessonNumber,
            lessonName: lesson.lessonName,
            terms: [],
            whiteboards: []
          }))
      };

      console.log('Created unit data:', unitData);

      // Add whiteboard images to lessons
      whiteboardImages.forEach(image => {
        image.lessonIDs.forEach(lessonId => {
          const lessonIndex = unitData.lessons.findIndex(l => l.lessonId === lessonId);
          if (lessonIndex !== -1) {
            unitData.lessons[lessonIndex].whiteboards.push(image);
          }
        });
      });

      // Add key terms to lessons
      keyTerms.forEach(term => {
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
  }, [selectedUnit]);

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
      q.subject === 'ap_microeconomics' &&
      q.unit === selectedUnit
    );
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0 fixed top-16 left-0 h-[calc(100vh-4rem)]">
        <UnitNavigationSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 px-6 ml-64 mr-80">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-6">
              AP Micro → Unit {selectedUnit} → {currentLesson?.lessonId} - {currentLesson?.lessonName}
            </div>
            <h1 className="text-3xl font-extrabold mb-2">
              <span>AP</span> <span className="text-blue-500">Dojo</span> - <span>Unit Study Guides</span>
            </h1>
          </div>
          
          {currentLesson && (
            <LessonSection
              key={currentLesson.lessonId}
              lesson={currentLesson}
              setExpandedImage={setExpandedImage}
              questions={getQuestionsForLesson(currentLesson.lessonId)}
            />
          )}

          {/* Lesson Navigation */}
          {structuredData.length > 0 && structuredData[0].lessons.length > 0 && (
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={handlePreviousLesson}
                disabled={currentLessonIndex === 0}
                className={`px-6 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${
                  currentLessonIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {currentLessonIndex > 0 && (
                  <span>
                    {structuredData[0].lessons[currentLessonIndex - 1].lessonId} - {structuredData[0].lessons[currentLessonIndex - 1].lessonName}
                  </span>
                )}
              </button>

              <button
                onClick={handleNextLesson}
                disabled={currentLessonIndex === structuredData[0].lessons.length - 1}
                className={`px-6 py-3 rounded-lg text-base font-medium flex items-center gap-2 ${
                  currentLessonIndex === structuredData[0].lessons.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                {currentLessonIndex < structuredData[0].lessons.length - 1 && (
                  <span>
                    {structuredData[0].lessons[currentLessonIndex + 1].lessonId} - {structuredData[0].lessons[currentLessonIndex + 1].lessonName}
                  </span>
                )}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Chat Sidebar */}
      <div className="w-80 flex-shrink-0 fixed top-16 right-0 h-[calc(100vh-4rem)]">
        <ChatSidebar />
      </div>

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
  );
}
