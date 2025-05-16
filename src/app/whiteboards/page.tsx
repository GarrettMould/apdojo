'use client'; // If client-side interactions are needed later, otherwise remove

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Using next/image for optimization
import { whiteboardImages, WhiteboardImage, keyTerms, KeyTerm } from "@/data/allContent";
import { allQuestions } from "@/data/unitPracticeProblems/unitPracticeProblems"; // Re-import allQuestions
import { Question as QuestionType } from '@/data/questionBanks/types'; // Re-import QuestionType
import { X, Check, ChevronLeft, ChevronRight, ChevronDown, Brain } from 'lucide-react'; // Re-add Check, Add Chevrons, Add ChevronDown, Added Brain
import { useInView } from 'react-intersection-observer'; // Keep if needed for LessonSection (not currently used)

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
    e.stopPropagation(); // Prevent modal from opening when clicking arrow
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening when clicking arrow
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleBrainClick = (e: React.MouseEvent, image: WhiteboardImage) => {
    e.stopPropagation(); // Prevent modal from opening
    console.log('Brain icon clicked for image:', image.title || image.id);
    // TODO: Implement API call to Llama for MCQ generation
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center"> {/* Added text-center for counter */}
      <div 
        className="relative group shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200 cursor-pointer" 
        onClick={() => setExpandedImage(currentImage)} // Click on image area still opens modal
      >
        <Image
          src={currentImage.imageUrl}
          alt={currentImage.title || `Whiteboard ${currentIndex + 1} for Lesson ${lessonId}`}
          width={1024} 
          height={576} 
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px" 
          className="w-full h-auto block bg-gray-100" 
          key={currentImage.id}
        />
        
        {/* Previous Button - Positioned on the left side */}
        {images.length > 1 && (
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" /> {/* Larger icon */}
          </button>
        )}

        {/* Next Button - Positioned on the right side */}
        {images.length > 1 && (
          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-3 bg-gray-200/60 hover:bg-gray-300/80 text-gray-800 rounded-full transition-colors duration-200 focus:outline-none shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" /> {/* Larger icon */}
          </button>
        )}

        {/* Brain Icon Button for MCQ Generation */}
        <button
          onClick={(e) => handleBrainClick(e, currentImage)}
          className="absolute top-3 right-3 z-20 p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition-colors"
          title="Generate MCQ for this image"
        >
          <Brain className="w-5 h-5" /> {/* Icon color is inherited from text-white */}
        </button>

      </div>

      {/* Image Counter - Centered below */}
      {images.length > 1 && (
        <div className="mt-3 text-sm font-medium text-gray-700">
          Image {currentIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
}
// --- END ImageGallery Component ---

// --- Updated Lesson Section Component --- 
interface LessonSectionProps {
  lesson: LessonContent;
  setExpandedImage: (image: WhiteboardImage | null) => void;
}

function LessonSection({ lesson, setExpandedImage }: LessonSectionProps) {
  // Handler for Brain Icon click on single image
  const handleSingleImageBrainClick = (e: React.MouseEvent, image: WhiteboardImage) => {
    e.stopPropagation();
    console.log('Brain icon clicked for single image:', image.title || image.id);
    // TODO: Implement API call to Llama for MCQ generation
  };

  return (
    <section aria-labelledby={`lesson-heading-${lesson.lessonId}`} className="mb-10"> 
      <h3 
        id={`lesson-heading-${lesson.lessonId}`} 
        className="text-xl font-semibold mb-4 border-b pb-1 text-gray-700" 
      >
        Lesson {lesson.lessonId}
      </h3>
      {lesson.terms.length > 0 && (
        <div className="mb-6 pl-4">
          <h4 className="text-md font-semibold mb-2 text-gray-600">Key Terms</h4>
          <div className="space-y-3 text-md">
            {lesson.terms.map(term => (
              <div key={term.id}>
                <strong className="text-gray-900 underline decoration-blue-500 underline-offset-2">{term.term}:</strong>
                <span className="text-gray-700 ml-1">{term.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {lesson.whiteboards.length > 0 && (
        <div className="mt-4 pl-4">
          <h4 className="text-md font-semibold mb-3 text-gray-600">Whiteboards</h4>
          {lesson.whiteboards.length === 1 ? (
            // Render single image directly
            <div 
              key={lesson.whiteboards[0].id} 
              className="relative cursor-pointer w-full max-w-3xl mx-auto group shadow-md hover:shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200"
              // onClick for modal is now on this div, but Brain button needs to stop propagation
            >
              <div onClick={() => setExpandedImage(lesson.whiteboards[0])}> {/* Wrap image in a div for modal click, so button is separate */}
                <Image
                  src={lesson.whiteboards[0].imageUrl}
                  alt={lesson.whiteboards[0].title || `Whiteboard for Lesson ${lesson.whiteboards[0].lessonIDs.join(', ')}`}
                  width={1024} 
                  height={576} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px" 
                  className="w-full h-auto block bg-gray-100" 
                />
              </div>
              {/* Brain Icon Button for Single Image */}
              <button
                onClick={(e) => handleSingleImageBrainClick(e, lesson.whiteboards[0])}
                className="absolute top-3 right-3 z-20 p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition-colors"
                title="Generate MCQ for this image"
              >
                <Brain className="w-5 h-5" /> {/* Icon color is inherited from text-white */}
              </button>
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
    </section>
  );
}
// --- End LessonSection Component ---

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

  // Return a React Fragment to avoid adding an unnecessary DOM element
  return (
    <> 
      {/* Question Text - Smaller text */}
      <p className="text-sm font-medium font-serif leading-relaxed text-gray-800 mb-4">
        {question.question}
      </p>
      
      {/* Answer Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((option, optIndex) => {
          const letter = String.fromCharCode(65 + optIndex);
          const isCorrectOption = optIndex === correctAnswerIndex;
          const isSelectedOption = optIndex === selectedAnswerIndex;
          
          return (
            <button
              key={optIndex}
              onClick={() => handleSelect(optIndex)}
              disabled={isSubmitted} 
              className={`w-full text-left p-2.5 rounded-lg text-sm font-medium border flex items-center gap-3 transition-all duration-150 
                          ${isSubmitted ? 
                            (isCorrectOption ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' : 
                            isSelectedOption ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' : 
                            'bg-white text-gray-900 border-gray-200 cursor-default') 
                          : 
                            'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm' 
                          }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${isSubmitted ? (isCorrectOption ? 'bg-green-100 border-green-300 text-green-700' : isSelectedOption ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : 'bg-white border-gray-300 text-gray-600'}`}>
                {letter}
              </span>
              <span className={`flex-1 text-xs ${isSubmitted ? 'text-gray-800' : 'text-gray-900'}`}>{option}</span>
              {isSubmitted && (
                <div className="flex-shrink-0">
                  {isCorrectOption ? <Check className="w-4 h-4 text-green-500" /> : isSelectedOption ? <X className="w-4 h-4 text-red-500" /> : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation - Smaller text */}
      {question.explanation && isSubmitted && (
          <details open className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
            <summary className="cursor-pointer hover:underline font-medium text-gray-700 text-sm">Explanation</summary>
            <p className="pt-2 text-gray-800">{question.explanation}</p>
          </details>
      )}
    </>
  );
}
// --- End SimpleMcqDisplay Component ---

// --- Sidebar Component --- 
interface SidebarProps {
  selectedLessonId: string | null;
  onLessonSelect: (lessonId: string) => void;
  availableLessonIds: string[];
  questions: QuestionType[];
  quickCheckAnswers: Record<string | number, QuickCheckAnswerState>;
  handleQuickCheckAnswer: (questionId: string | number, answerLetter: string, isCorrect: boolean) => void;
}

function Sidebar(props: SidebarProps) {
  const { 
    selectedLessonId, 
    onLessonSelect, 
    availableLessonIds, 
    questions, 
    quickCheckAnswers, 
    handleQuickCheckAnswer
  } = props;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Filter questions AND apply the cap of 4
  const lessonQuestions = questions
    .filter(q => selectedLessonId && q.lessonIDS.includes(selectedLessonId))
    .slice(0, 4); // Limit to the first 4 questions
    
  const questionToShow = lessonQuestions[currentQuestionIndex];

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [selectedLessonId]);

  const handleNext = () => {
    if (currentQuestionIndex < lessonQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLessonSelect(event.target.value);
  };

  return (
    <aside 
      className={`fixed top-16 left-0 h-screen w-80 flex-shrink-0 bg-slate-50 shadow-lg z-40 p-6 overflow-y-auto`}
    >
      <div className="mb-6 relative">
        <select 
          id="lesson-select"
          value={selectedLessonId || ''}
          onChange={handleDropdownChange}
          className="appearance-none bg-transparent border-none font-bold text-lg text-gray-800 pl-0 pr-6 py-2 focus:outline-none focus:ring-0 w-full cursor-pointer"
        >
          {availableLessonIds.sort(sortLessonIDs).map(id => (
            <option key={id} value={id} className="font-normal text-base">Lesson {id}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-gray-700">
           <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      {!selectedLessonId ? (
        <p className="text-gray-600 italic mt-4">Please select a lesson above.</p> 
      ) : lessonQuestions.length > 0 ? (
         <>
           {lessonQuestions.length > 1 && ( 
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-gray-900"
                  aria-label="Previous question"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {lessonQuestions.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === lessonQuestions.length - 1}
                  className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-gray-900"
                  aria-label="Next question"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
           )}

           {questionToShow && ( 
             <SimpleMcqDisplay
               key={`${selectedLessonId}-${questionToShow.id}`}
               question={questionToShow}
               onAnswerSelect={handleQuickCheckAnswer}
               currentAnswer={quickCheckAnswers[questionToShow.id]}
             />
           )}
         </>
      ) : (
        <p className="text-gray-600 italic mt-4">No quick check questions available for Lesson {selectedLessonId} yet.</p>
      )}
    </aside>
  );
}
// --- End Sidebar Component ---

export default function WhiteboardsPage() {
  const [expandedImage, setExpandedImage] = useState<WhiteboardImage | null>(null);
  const [quickCheckAnswers, setQuickCheckAnswers] = useState<Record<string | number, QuickCheckAnswerState>>({});
  
  // Add useEffect for scroll locking
  useEffect(() => {
    if (expandedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedImage]);

  // --- Filter Content for Unit 2 --- 
  const targetUnit = 2;
  const unit2Questions = allQuestions.filter(q => q.subject === 'ap_microeconomics' && q.unit === targetUnit);
  const unit2Terms = keyTerms.filter(term => term.subject === 'ap_microeconomics' && term.unit === targetUnit);
  const unit2Whiteboards = whiteboardImages.filter(img => img.subject === 'ap_microeconomics' && img.unit === targetUnit);

  const availableQuizLessonIds = Array.from(new Set(unit2Questions.flatMap(q => q.lessonIDS)));

  const [selectedQuizLessonId, setSelectedQuizLessonId] = useState<string | null>(() => {
      const sortedIds = availableQuizLessonIds.sort(sortLessonIDs);
      return sortedIds.length > 0 ? sortedIds[0] : null;
  });

  const structuredUnitData: UnitData[] = (() => { 
    const contentByUnitLesson = new Map<number, Map<string, { terms: KeyTerm[], whiteboards: WhiteboardImage[] }>>();
    const ensureEntry = (unit: number, lessonId: string) => {
      if (unit !== targetUnit) return null; 
      if (!contentByUnitLesson.has(unit)) contentByUnitLesson.set(unit, new Map());
      if (!contentByUnitLesson.get(unit)!.has(lessonId)) contentByUnitLesson.get(unit)!.set(lessonId, { terms: [], whiteboards: [] });
      return contentByUnitLesson.get(unit)!.get(lessonId)!;
    };
    unit2Terms.forEach(term => { term.lessonIDs.forEach(lessonId => ensureEntry(term.unit, lessonId)?.terms.push(term)); });
    unit2Whiteboards.forEach(img => { img.lessonIDs.forEach(lessonId => ensureEntry(img.unit, lessonId)?.whiteboards.push(img)); });
    const result: UnitData[] = [];
    if (contentByUnitLesson.has(targetUnit)) {
        const lessonsMap = contentByUnitLesson.get(targetUnit)!;
        const sortedLessonIds = Array.from(lessonsMap.keys()).sort(sortLessonIDs);
        const lessons: LessonContent[] = sortedLessonIds.map(lessonId => ({
          lessonId: lessonId,
          terms: lessonsMap.get(lessonId)!.terms,
          whiteboards: lessonsMap.get(lessonId)!.whiteboards
        }));
        if (lessons.length > 0) result.push({ unit: targetUnit, lessons }); 
    }
    return result;
  })();

  const handleQuizLessonSelect = (lessonId: string) => {
    setSelectedQuizLessonId(lessonId);
  };

  const handleQuickCheckAnswer = (questionId: string | number, answerLetter: string, isCorrect: boolean) => {
    setQuickCheckAnswers(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect: isCorrect }
    }));
  };

  return (
    <div className="relative min-h-screen"> 
      
      {/* Sidebar component no longer receives sidebarStyle prop */}
      <Sidebar 
        selectedLessonId={selectedQuizLessonId}
        onLessonSelect={handleQuizLessonSelect}
        availableLessonIds={availableQuizLessonIds} 
        questions={unit2Questions} 
        quickCheckAnswers={quickCheckAnswers} 
        handleQuickCheckAnswer={handleQuickCheckAnswer} 
      />

      {/* Main content with margin matching sidebar width and reduced padding */}
      <main className="ml-80 px-2 py-8"> {/* Back to ml-80, changed px-4 to px-2 */}
        <h1 className="text-3xl font-extrabold tracking-tight mb-12 text-center text-gray-900">
          AP <span className="text-blue-500">Dojo</span> Whiteboards - Unit {targetUnit}
        </h1>
        {structuredUnitData.length === 0 ? (
          <p className="text-center text-gray-500">No content available for Unit {targetUnit} yet.</p>
        ) : (
          <div className="max-w-5xl">
            {structuredUnitData.map(unitData => (
              <section key={`unit-${unitData.unit}`} className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b-2 border-gray-300 pb-3 text-gray-800">
                  Unit {unitData.unit}
                </h2>
                {unitData.lessons.map(lesson => (
                  <LessonSection
                    key={lesson.lessonId} 
                    lesson={lesson}
                    setExpandedImage={setExpandedImage} 
                  />
                ))}
              </section>
            ))}
          </div>
        )}
      </main>

      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setExpandedImage(null)} 
        >
          <button
            onClick={(e) => { e.stopPropagation(); setExpandedImage(null); }} 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 z-[101]"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="relative max-w-[95vw] max-h-[90vh] z-[101]"
            onClick={e => e.stopPropagation()} 
          >
            <Image
              src={expandedImage.imageUrl}
              alt={`Expanded view: ${expandedImage.title || `Whiteboard for Lesson ${expandedImage.lessonIDs.join(', ')}`}`}
              width={1920} 
              height={1080} 
              sizes="95vw" 
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg block" 
              priority 
            />
          </div>
        </div>
      )}
    </div>
  );
}
