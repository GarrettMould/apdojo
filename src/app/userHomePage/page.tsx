'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// MVP: Removed authentication import
// import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Play, FileText, Target, ArrowRight, Brain, TrendingUp, ArrowDown, X, ArrowUp } from 'lucide-react';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';

// Simplified MCQ Practice Component for Homepage
function HomepageMCQPreview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  const [dojoProgress, setDojoProgress] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [sampleQuestions, setSampleQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    // Create a bank of ~20 questions from different units
    const questionBank = [
      ...allQuestions.filter(q => q.subject === 'ap_macroeconomics' && q.unit === 1).slice(0, 4),
      ...allQuestions.filter(q => q.subject === 'ap_macroeconomics' && q.unit === 2).slice(0, 4),
      ...allQuestions.filter(q => q.subject === 'ap_macroeconomics' && q.unit === 3).slice(0, 4),
      ...allQuestions.filter(q => q.subject === 'ap_macroeconomics' && q.unit === 4).slice(0, 4),
      ...allQuestions.filter(q => q.subject === 'ap_macroeconomics' && q.unit === 5).slice(0, 4),
    ];

    // Shuffle the bank of questions
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());

    // Take the first 3 to display
    setSampleQuestions(shuffled.slice(0, 3));
  }, []);
  
  const handleAnswer = (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));
    
    if (isCorrect) {
      setDojoProgress(prev => prev + 10);
      setCorrectStreak(prev => prev + 1);
    } else {
      setCorrectStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const unitsData = allMacroUnitsData;
  // Dynamically determine the unit name and number based on the current question
  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const currentUnitNumber = currentQuestion?.unit || 1;
  const unitName = unitsData.find(u => u.number === (sampleQuestions[0]?.unit || 1))?.title || "AP Macroeconomics";

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg flex">
      {/* UnitMCQs Component */}
      <div className="flex-1 p-6">
        <UnitMCQs
          currentUnit={currentUnitNumber}
          currentQuestionIndex={currentQuestionIndex}
          isLoggedIn={false}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          onQuestionSelect={handleQuestionSelect}
          onUnitChange={() => {}}
          answeredQuestions={answeredQuestions}
          units={unitsData}
          dojoProgress={dojoProgress}
          correctStreak={correctStreak}
          isWeakestUnitsMode={true}
          totalQuestions={sampleQuestions.length}
          unitName={unitName}
          questions={sampleQuestions}
          subject={'macro'}
          practiceUnitIds={currentQuestion ? [currentQuestion.unit] : []}
          isParentModalOpen={false}
        />
      </div>
    </div>
  );
}

// Unit Study Guides Component for Homepage
function HomepageStudyGuidesPreview() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Import the real data
  const { keyTerms } = require('@/data/apMacroTerms');
  const { 
    unit1Whiteboards, 
    apMacroUnit2Whiteboards, 
    apMacroUnit3Whiteboards, 
    apMacroUnit4Whiteboards, 
    apMacroUnit5Whiteboards, 
    apMacroUnit6Whiteboards 
  } = require('@/data/whiteboards');

  // State for current course and unit
  const [currentCourse, setCurrentCourse] = useState<'macro' | 'micro'>('macro');
  const [currentUnit, setCurrentUnit] = useState(1);

  // Get all whiteboard arrays for macro
  const allMacroWhiteboardArrays = {
    1: unit1Whiteboards,
    2: apMacroUnit2Whiteboards,
    3: apMacroUnit3Whiteboards,
    4: apMacroUnit4Whiteboards,
    5: apMacroUnit5Whiteboards,
    6: apMacroUnit6Whiteboards
  };

  // Filter terms for current unit (currently only macro terms available)
  const currentUnitTerms = keyTerms.filter((term: any) => term.unit === currentUnit);

  // Get whiteboards for current unit and randomize order
  const currentUnitWhiteboards = allMacroWhiteboardArrays[currentUnit as keyof typeof allMacroWhiteboardArrays] || [];
  const shuffledWhiteboards = [...currentUnitWhiteboards].sort(() => Math.random() - 0.5);

  // Modal state
  const [selectedWhiteboard, setSelectedWhiteboard] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (whiteboard: any) => {
    setSelectedWhiteboard(whiteboard);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWhiteboard(null);
  };

  const handleNextUnit = () => {
    setCurrentUnit(prevUnit => (prevUnit % 6) + 1); // Cycles from 1 to 6
  };

  const handlePreviousUnit = () => {
    setCurrentUnit(prevUnit => (prevUnit === 1 ? 6 : prevUnit - 1)); // Cycles from 6 down to 1
  };

  if (!isClient) {
    return (
      <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg flex min-h-[40rem] p-6">
        <div className="animate-pulse w-full flex gap-4">
          <div className="flex flex-col items-center justify-between border-r-2 border-gray-200 p-4">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-24 w-12 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg flex min-h-[40rem]">
        {/* Unit Selection Spine (Middle Left) */}
        <div className="flex flex-col items-center justify-between border-r-2 border-gray-200 p-4">
          <button 
            onClick={handlePreviousUnit} 
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${currentUnit > 1 ? 'visible' : 'invisible'}`}
            aria-label="Previous Unit"
          >
            <ArrowUp className="w-8 h-8 text-gray-600" />
          </button>
          <div className="flex-grow flex items-center justify-center">
            <span className="text-8xl font-bold text-gray-800">{currentUnit}</span>
          </div>
          <button onClick={handleNextUnit} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Next Unit">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </button>
        </div>

        {/* Main Content Area (Terms and Whiteboards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 flex-1">
          {/* Left Column: Terms and Definitions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-gray-800">TERMS</h3>
            <div className="h-[34rem] overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {currentUnitTerms.map((term: any) => (
                <div key={term.id} className="bg-white rounded-lg border border-gray-200 p-3">
                  <h4 className="font-bold text-gray-900">{term.term}</h4>
                  <p className="text-sm text-gray-600 mt-1">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Whiteboards */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-gray-800">WHITEBOARDS</h3>
            <div className="h-[34rem] overflow-y-auto pr-2 space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {shuffledWhiteboards.map((whiteboard: any, index: number) => (
                <div key={index} className="w-full cursor-pointer" onClick={() => openModal(whiteboard)}>
                  <Image
                    src={whiteboard.url} 
                    alt={`${whiteboard.topic} - Lesson ${whiteboard.lessonID}`}
                    width={500}
                    height={300}
                    className="w-full h-auto rounded border border-gray-200 hover:border-blue-300 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Whiteboard Modal */}
      {isModalOpen && selectedWhiteboard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
            >
              <X className="w-5 h-5"/>
            </button>
            <div className="p-6">
              <Image 
                src={selectedWhiteboard.url} 
                alt={`${selectedWhiteboard.topic} - Lesson ${selectedWhiteboard.lessonID}`}
                width={1200}
                height={800}
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UserHomePageContent() {
  const router = useRouter();
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation shortly after the component mounts
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 100); // 100ms delay to ensure the initial state is rendered

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  // --- Modified useEffect for MVP - No Authentication Required --- 
  useEffect(() => {
    // MVP: Skip authentication checks for now
    // Users can access the homepage without logging in
    console.log('[Home Page Effect] MVP mode - no authentication required');
    // console.log('[Home Page Effect] Current auth state:', { user: !!user, authLoading, loadingUserData });
    
    // TODO: Re-enable authentication checks when implementing paid features
    // if (authLoading || loadingUserData) { 
    //   console.log('[Home Page Effect] Waiting for auth/user data...');
    //   return; 
    // }
    
    // if (!user) {
    //     console.log('[Home Page Effect] No user found after loading, redirecting to login.');
    //     router.push('/login');
    //     return;
    // }

    // if (userData) {
    //     console.log('[Home Page Effect] User data loaded, checking setup steps...');
    //     if (!userData.selectedSubject) {
    //         console.log('[Home Page Effect] No selected subject, redirecting to /select-subject');
    //         router.push('/select-subject');
    //         return;
    //     }
    //     if (!userData.hasCompletedInitialUnitSelection) {
    //         console.log('[Home Page Effect] Initial units not selected, redirecting to /initial-unit-selection');
    //         router.push('/initial-unit-selection'); 
    //         return;
    //     }
    // }
  }, [router]);



  // --- Conditional Rendering based on Loading/Error State --- 
  // MVP: Skip loading check entirely to ensure content is always shown
  // TODO: Re-enable loading check when implementing paid features
  // if (authLoading) { 
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  //     </div>
  //   );
  // }
  
  // --- Main component return --- 
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Promotional Banner */}
      {/*
      <div 
        className={`relative bg-yellow-300 border-b-2 border-black transition-transform duration-500 ease-out ${isBannerVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center">
          <div className="flex items-center gap-6">
            <h2 className="text-md font-semibold text-gray-900">
              Boost your AP score with realistic practice + step-by-step video explanations
            </h2>
            <Link href="/unit-final-practice-tests">
              <Button variant="outline" size="sm" className="border-2 border-black text-black hover:bg-yellow-200 hover:text-black">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <button 
          onClick={handleCloseBanner} 
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Dismiss promotional banner"
        >
          <X className="w-5 h-5 text-gray-900"/>
        </button>
      </div>
      */}

       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="max-w-4xl mx-auto">




                    {/* Main MCQ Component - Front and Center */}
                    <div className="space-y-6">
                      {/* Header Section */}
                      <div className="text-center mb-8 pt-12">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                          <span className="text-blue-500 font-bold">Pick a question.</span> Any question.
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                          Test your knowledge with our interactive MCQ practice questions
                        </p>
                      </div>

                      {/* MCQ Component */}
                      <div className="max-w-4xl mx-auto">
                        <HomepageMCQPreview />
                      </div>

                      {/* Practice More Button */}
                      <div className="mt-8">
                        <Link href="/select-practice-units?subject=macro" className="block w-full">
                          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 sm:py-8 px-8 sm:px-16 text-lg sm:text-xl lg:text-2xl rounded-lg transition-colors duration-200 font-semibold">
                            Practice More Questions
                          </Button>
                        </Link>
                      </div>
                    </div>
        </div>
      </div>
      


      {/* Study Guides - Full Viewport Width */}
      <div className="mt-12 sm:mt-16 w-full">
        {/* Section Headline */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
            <span className="text-blue-500">AP Dojo</span> Cheat Sheets
          </h2>
        </div>
        
        {/* Functional Study Guides Component */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomepageStudyGuidesPreview />
        </div>
        
        {/* Study Guides Button - Full Width */}
        <div className="text-center mt-12 sm:mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Link href="/unit-study-guides">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-6 sm:py-8 px-8 sm:px-16 text-lg sm:text-xl lg:text-2xl rounded-lg transition-colors duration-200 w-full font-semibold">
              View Cheat Sheets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Loading Fallback Component --- 
function HomePageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}

// --- Default Export with Suspense --- 
export default function UserHomePage() {
  return (
    <Suspense fallback={<HomePageLoadingFallback />}>
      <UserHomePageContent />
    </Suspense>
  );
}