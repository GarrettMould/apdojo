'use client';

import React, { useState, useEffect } from 'react';
import { macroUnits, microUnits } from '@/data/cheatSheets';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import { keyTerms as allContentKeyTerms, whiteboardImages as allContentWhiteboards, KeyTerm, WhiteboardImage } from '@/data/allContent';
import { macroUnits as allMacroUnits, microUnits as allMicroUnits } from '@/data/cheatSheets';
import { useAuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as apMicroTerms } from '@/data/apMicroTerms';
import { unit1Whiteboards, apMacroUnit2Whiteboards, apMacroUnit3Whiteboards, apMacroUnit4Whiteboards, apMacroUnit5Whiteboards, Whiteboard } from '@/data/whiteboards';
import { getCheckpointForLesson } from '@/data/checkpoints';
import { microLessons, macroLessons } from '@/data/lessons';
import { X, ArrowRight, Lock, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

// Helper to combine and structure whiteboard data
const getUnitWhiteboards = (unitNumber: number): WhiteboardImage[] => {
  let rawWhiteboards: Whiteboard[] = [];
  
  switch (unitNumber) {
    case 1:
      rawWhiteboards = unit1Whiteboards;
      break;
    case 2:
      rawWhiteboards = apMacroUnit2Whiteboards;
      break;
    case 3:
      rawWhiteboards = apMacroUnit3Whiteboards;
      break;
    case 4:
      rawWhiteboards = apMacroUnit4Whiteboards;
      break;
    case 5:
      rawWhiteboards = apMacroUnit5Whiteboards;
      break;
    default:
      return allContentWhiteboards.filter(wb => wb.subject === 'ap_macroeconomics' && wb.unit === unitNumber);
  }
  
  return rawWhiteboards.map((wb, index) => ({
    id: `wb-unit${unitNumber}-${index}`,
    subject: 'ap_macroeconomics',
    unit: unitNumber,
    lessonIDs: [wb.lessonID], // Ensure lessonIDs is an array
    imageUrl: wb.url,
    title: wb.topic
  }));
};

interface LessonContent {
  lessonId: string;
  whiteboards: WhiteboardImage[];
  keyTerms: KeyTerm[];
}

// Checkpoint component for section quizzes
interface CheckpointProps {
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  subject: 'macro' | 'micro';
}

function Checkpoint({ lessonId, question, options, correctAnswer, explanation, subject }: CheckpointProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    if (showResult) return; // Prevent changing answer after submission
    setSelectedAnswer(option);
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;
  const practiceUrl = `/unitMCQPracticePage?subject=${subject}&mode=topic&lessonId=${lessonId}`;

  return (
    <div className="mt-12 mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-lg relative">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">Checkpoint</h3>
            <p className="text-xs text-gray-500">Test your understanding of {lessonId}</p>
          </div>
          {showResult && (
            <Link 
              href={practiceUrl}
              className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors whitespace-nowrap inline-block"
            >
              Want to practice AP MCQs on this topic?
            </Link>
          )}
        </div>
      </div>
      
      <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">
        {question}
      </p>

      <div className="space-y-3">
        {options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionLetter;
          const isCorrectOption = optionLetter === correctAnswer;
          const showCorrect = showResult && isCorrectOption;
          const showIncorrect = showResult && isSelected && !isCorrectOption;

          let buttonClass = "w-full text-left p-5 text-lg font-semibold rounded-lg transition-all duration-200 border-2 ";
          
          if (showResult) {
            if (showCorrect) {
              buttonClass += "bg-green-100 border-green-400 text-green-800 shadow-md";
            } else if (showIncorrect) {
              buttonClass += "bg-red-100 border-red-400 text-red-800 shadow-md";
            } else {
              buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
            }
          } else {
            buttonClass += "bg-blue-100 border-blue-300 text-gray-900 hover:bg-blue-200 hover:border-blue-400 hover:shadow-lg cursor-pointer active:scale-95";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(optionLetter)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold min-w-[1.5rem]">{optionLetter}.</span>
                <span className="flex-1">{option}</span>
                {showResult && showCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
                {showResult && showIncorrect && (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && explanation && (
        <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-sm font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className={`mt-1 text-xs ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to format subnotes with bold text before colons
function formatSubNote(note: string): React.ReactNode {
  // Find the first colon in the note
  const colonIndex = note.indexOf(':');
  
  // If there's a colon, bold everything from the start up to and including the colon
  if (colonIndex !== -1) {
    const beforeColon = note.substring(0, colonIndex + 1);
    const afterColon = note.substring(colonIndex + 1);
    
    return (
      <>
        <strong>{beforeColon}</strong>
        <span>{afterColon}</span>
      </>
    );
  }
  
  // If no colon, return the note as-is
  return <span>{note}</span>;
}

export default function UnitPage() {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const { user, userData, selectedSubject } = useAuthContext(); // Correctly destructure userData and selectedSubject
  
  const [activeUnit, setActiveUnit] = useState((params.unitId as string) || '1');
  const [selectedWhiteboard, setSelectedWhiteboard] = useState<WhiteboardImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeUnitNum = parseInt(activeUnit as string);
  const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';

  // --- Modal Logic ---
  const openModal = (whiteboard: WhiteboardImage) => {
    setSelectedWhiteboard(whiteboard);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWhiteboard(null);
  };
  

  const handleUnitChange = (unitNumber: string) => {
    setActiveUnit(unitNumber);
    router.push(`/unit/${unitNumber}`, { scroll: false });
  };

  const unitsToDisplay = selectedSubject === 'macro' ? allMacroUnits : allMicroUnits;
  const pageTitleSubject = selectedSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';
  const themeColor = selectedSubject === 'macro' ? 'blue' : 'green';
  
  // Get lesson names
  const lessons = selectedSubject === 'macro' ? macroLessons : microLessons;
  const getLessonName = (lessonId: string): string => {
    const lesson = lessons.find(l => l.lessonNumber === lessonId);
    return lesson ? lesson.lessonName : '';
  };

  // Determine if the unit is locked
  const unitNumber = parseInt(params.unitId as string, 10);
  const isLocked = false;

  // This page will now render the content for all units, assuming it exists.
  // The lock will be handled visually on the component that links here.

  // --- Data Grouping Logic ---
  let unitKeyTerms: KeyTerm[] = selectedSubject === 'macro' 
    ? apMacroTerms.filter(term => term.unit === activeUnitNum)
    : apMicroTerms.filter(term => term.unit === activeUnitNum);
  
  let unitWhiteboards: WhiteboardImage[] = selectedSubject === 'macro'
    ? getUnitWhiteboards(activeUnitNum)
    : allContentWhiteboards.filter(img => img.subject === subjectFilter && img.unit === activeUnitNum);

  const lessonGroups = new Map<string, { whiteboards: WhiteboardImage[], keyTerms: KeyTerm[] }>();
  unitWhiteboards.forEach(wb => {
    wb.lessonIDs.forEach(lessonId => {
      if (!lessonGroups.has(lessonId)) lessonGroups.set(lessonId, { whiteboards: [], keyTerms: [] });
      lessonGroups.get(lessonId)!.whiteboards.push(wb);
    });
  });
  unitKeyTerms.forEach(term => {
    term.lessonIDs.forEach(lessonId => {
      if (!lessonGroups.has(lessonId)) lessonGroups.set(lessonId, { whiteboards: [], keyTerms: [] });
      lessonGroups.get(lessonId)!.keyTerms.push(term);
    });
  });
                
  const sortedLessons: LessonContent[] = Array.from(lessonGroups.entries())
    .map(([lessonId, content]) => ({ lessonId, ...content }))
    .sort((a, b) => {
        const [aMain, aSub] = a.lessonId.split('.').map(Number);
        const [bMain, bSub] = b.lessonId.split('.').map(Number);
        if (aMain !== bMain) return aMain - bMain;
        return (aSub || 0) - (bSub || 0);
    });

  // Add structured data for SEO
  useEffect(() => {
    const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
    if (!currentUnit) return;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `AP ${pageTitleSubject} Unit ${activeUnitNum}: ${currentUnit.title}`,
      description: `Free AP ${pageTitleSubject} Unit ${activeUnitNum} cheat sheet covering ${currentUnit.description}. Review key terms, definitions, formulas, graphs, and whiteboards with practice questions.`,
      educationalLevel: 'High School',
      courseCode: `AP ${pageTitleSubject.substring(0, 4)} Unit ${activeUnitNum}`,
      about: {
        '@type': 'Thing',
        name: `AP ${pageTitleSubject}`,
      },
      teaches: currentUnit.title,
      url: typeof window !== 'undefined' ? window.location.href : '',
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [activeUnitNum, pageTitleSubject, unitsToDisplay]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className={themeColor === 'blue' ? 'text-blue-500' : 'text-green-500'}>AP {selectedSubject === 'macro' ? 'Macro' : 'Micro'}</span> Unit Cheat Sheets
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">Key terms, formulas, and graphs for every unit.</p>
        </div>

        {/* Unit Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {unitsToDisplay.map((unit) => {
              return (
                <button
                  key={unit.number}
                  onClick={() => handleUnitChange(String(unit.number))}
                  className={`${
                    activeUnit === String(unit.number)
                      ? `border-${themeColor}-500 text-${themeColor}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
                >
                  <span>Unit {unit.number}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Unit Practice Test Banner */}
        {(() => {
          const currentUnit = unitsToDisplay.find(u => u.number === activeUnitNum);
          const unitPrice = currentUnit?.price || 4.99;
          const isMicro = selectedSubject === 'micro';
          
          return (
            <div className={`mb-8 rounded-xl p-6 shadow-md border ${
              themeColor === 'blue' 
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' 
                : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900">
                    Strengthen your mastery of Unit {activeUnitNum}!
                  </p>
                  <p className="text-gray-600 mt-1">
                    Test your knowledge with a full-length practice test.
                  </p>
                </div>
                {isMicro ? (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link 
                    href={`/purchase/mcq-practice?units=${activeUnitNum}&total=${unitPrice.toFixed(2)}&bundle=false`}
                    className={`inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg ${
                      themeColor === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Take the Unit {activeUnitNum} Practice Test now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        {/* Main Content Layout */}
        <div className="space-y-12">
          {sortedLessons.map(({ lessonId, whiteboards, keyTerms }) => {
            const lessonName = getLessonName(lessonId);
            return (
            <div key={lessonId} className="space-y-8">
              {/* Lesson Header */}
              <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b border-gray-200">
                {lessonId}{lessonName ? ` - ${lessonName}` : ''}
              </h2>
              
              {/* Key Terms Section */}
              {keyTerms.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Terms & Definitions</h3>
                  <div className="space-y-4">
                    {keyTerms.map(term => (
                      <div key={term.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h3 className="font-bold text-gray-800">{term.term}</h3>
                        <p className="mt-1 text-gray-600">{term.definition}</p>
                        {term.subNotes && term.subNotes.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <ul className="space-y-1.5 pl-0 list-none">
                              {term.subNotes.map((note, index) => (
                                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                                  <span className="leading-relaxed flex-1">{formatSubNote(note)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Whiteboards Section */}
              {whiteboards.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Whiteboards</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {whiteboards.map((image, index) => (
                      <div 
                        key={`${image.id}-${index}`} 
                        className="border rounded-lg shadow-sm overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 bg-white"
                        onClick={() => openModal(image)}
                      >
                        <div className="relative aspect-video">
                          <Image 
                            src={image.imageUrl} 
                            alt={image.title || `Whiteboard for Lesson ${lessonId}`} 
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Checkpoint for this section */}
              {(() => {
                const checkpoint = getCheckpointForLesson(
                  lessonId,
                  subjectFilter,
                  activeUnitNum
                );
                return checkpoint ? (
                  <Checkpoint
                    lessonId={checkpoint.lessonId}
                    question={checkpoint.question}
                    options={checkpoint.options}
                    correctAnswer={checkpoint.correctAnswer}
                    explanation={checkpoint.explanation}
                    subject={selectedSubject}
                  />
                ) : null;
              })()}
            </div>
          );
          })}
        </div>
      </div>
      
      {/* Whiteboard Modal */}
      {isModalOpen && selectedWhiteboard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
            <button onClick={closeModal} className="absolute top-2 right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10" aria-label="Close whiteboard view">
              <X className="w-5 h-5"/>
            </button>
            <div className="p-6">
              <Image src={selectedWhiteboard.imageUrl} alt={selectedWhiteboard.title || 'Enlarged whiteboard image'} width={1200} height={800} className="w-full h-auto rounded" />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 