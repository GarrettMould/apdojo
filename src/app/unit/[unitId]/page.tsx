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
import { X, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';

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

export default function UnitPage() {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const { user, userData, selectedSubject } = useAuthContext(); // Correctly destructure userData and selectedSubject
  
  const [activeUnit, setActiveUnit] = useState((params.unitId as string) || '1');
  const [selectedWhiteboard, setSelectedWhiteboard] = useState<WhiteboardImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- State for Sidebar MCQs ---
  const [sidebarQuestions, setSidebarQuestions] = useState<QuestionType[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  
  const activeUnitNum = parseInt(activeUnit as string);
  const subjectFilter = selectedSubject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';

  useEffect(() => {
    // This is now the SINGLE source of truth for sidebar questions.
    // It runs whenever the active unit or subject changes.
    const unitQuestions = allQuestions.filter(q => q.subject === subjectFilter && q.unit === activeUnitNum);
    const shuffled = [...unitQuestions].sort(() => 0.5 - Math.random());
    setSidebarQuestions(shuffled.slice(0, 5));
    setAnsweredQuestions({}); // Reset answers when questions change
  }, [activeUnitNum, subjectFilter]);

  // --- Modal Logic ---
  const openModal = (whiteboard: WhiteboardImage) => {
    setSelectedWhiteboard(whiteboard);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWhiteboard(null);
  };
  
  // --- Handle MCQ Answer ---
  const handleAnswer = (questionId: number, answerLetter: string, isCorrect: boolean) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));
  };

  const handleUnitChange = (unitNumber: string) => {
    setActiveUnit(unitNumber);
    router.push(`/unit/${unitNumber}`, { scroll: false });
  };

  const unitsToDisplay = selectedSubject === 'macro' ? allMacroUnits : allMicroUnits;
  const pageTitleSubject = selectedSubject === 'macro' ? 'Macroeconomics' : 'Microeconomics';
  const themeColor = selectedSubject === 'macro' ? 'blue' : 'green';

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Terms and Whiteboards */}
          <div className="lg:col-span-2 space-y-12">
            {sortedLessons.map(({ lessonId, whiteboards, keyTerms }) => (
              <div key={lessonId}>
                {keyTerms.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">{lessonId} - Key Terms & Definitions</h2>
                    <div className="space-y-4 pt-4">
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
                                    <span className="leading-relaxed flex-1">{note}</span>
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
                {whiteboards.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">{lessonId} - Whiteboards</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                      {whiteboards.map((image, index) => (
                        <div key={`${image.id}-${index}`} className="border rounded-lg shadow-sm overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200" onClick={() => openModal(image)}>
                          <Image src={image.imageUrl} alt={image.title || `Whiteboard for Lesson ${lessonId}`} width={400} height={300} className="w-full h-auto object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: MCQ Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col h-[calc(100vh-7rem)] bg-gray-50/50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className={`text-2xl font-bold text-gray-900 pb-4 border-b border-gray-200 shrink-0`}>Practice Questions</h2>
              
              <div className="flex-grow overflow-y-auto my-4 pr-2 -mr-2">
                {sidebarQuestions.length > 0 ? (
                  <UnitMCQs
                    currentUnit={activeUnitNum}
                    currentQuestionIndex={0} // Simplified for sidebar
                    isLoggedIn={!!user}
                    onAnswer={handleAnswer}
                    onNextQuestion={() => {}} // Not needed for sidebar
                    onPreviousQuestion={() => {}} // Not needed
                    onQuestionSelect={() => {}} // Not needed
                    onUnitChange={() => {}} // Not needed
                    answeredQuestions={answeredQuestions}
                    units={unitsToDisplay}
                    dojoProgress={0}
                    correctStreak={0}
                    isWeakestUnitsMode={false}
                    totalQuestions={sidebarQuestions.length}
                    unitName={`Unit ${activeUnitNum} Practice`}
                    questions={sidebarQuestions}
                    subject={selectedSubject}
                    practiceUnitIds={[activeUnitNum]}
                    isParentModalOpen={false}
                    isSidebar={true} 
                  />
                ) : (
                  <p className="text-gray-600">No practice questions available for this unit yet.</p>
                )}
              </div>

              <div className="shrink-0 pt-4 border-t border-gray-200">
                <Link href={`/select-practice-units?subject=${selectedSubject}`} passHref>
                  <button className={`w-full flex items-center justify-center gap-2 bg-${themeColor}-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-${themeColor}-700 transition-colors shadow-md`}>
                    More MCQ Practice
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </aside>
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