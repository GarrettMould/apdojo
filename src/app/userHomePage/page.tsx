'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// MVP: Removed authentication import
// import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, Play, FileText, Target, ArrowRight, Brain } from 'lucide-react';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { macroUnits as allMacroUnitsData } from '@/data/cheatSheets';

// Simplified MCQ Practice Component for Homepage
function HomepageMCQPreview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  const [dojoProgress, setDojoProgress] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);

  // Get a sample of questions from Unit 1 for preview
  const sampleQuestions = allQuestions.filter(q => q.unit === 1).slice(0, 3);
  
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

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg p-6">
      <UnitMCQs
        currentUnit={1}
        currentQuestionIndex={currentQuestionIndex}
        isLoggedIn={false}
        onAnswer={handleAnswer}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onQuestionSelect={handleQuestionSelect}
        onUnitChange={() => {}} // Empty function to satisfy interface
        answeredQuestions={answeredQuestions}
        units={allMacroUnitsData}
        dojoProgress={dojoProgress}
        correctStreak={correctStreak}
        isWeakestUnitsMode={true}
        totalQuestions={sampleQuestions.length}
        unitName="Basic Economic Concepts"
        questions={sampleQuestions}
        subject="macro"
        practiceUnitIds={[1]}
        isParentModalOpen={false}
      />
    </div>
  );
}

// Unit Study Guides Component for Homepage
function HomepageStudyGuidesPreview() {
  // Import the real data
  const { keyTerms } = require('@/data/apMacroTerms');
  const { apMacroUnit3Whiteboards } = require('@/data/whiteboards');

  // Filter Unit 3 terms from apMacroTerms.ts
  const unit3Terms = keyTerms.filter((term: any) => term.unit === 3);

  // Randomize the order of whiteboards
  const shuffledWhiteboards = [...apMacroUnit3Whiteboards].sort(() => Math.random() - 0.5);

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

  return (
    <>
      <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg p-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Terms and Definitions */}
          <div className="space-y-4">
            {/* Scrollable Terms Container */}
            <div className="max-h-[28rem] overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 [&::-webkit-scrollbar]:mr-2">
              {unit3Terms.map((term: any) => (
                <div key={term.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{term.term}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{term.definition}</p>
                  
                  {/* Sub Notes */}
                  {term.subNotes && term.subNotes.length > 0 && (
                    <>
                      <div className="border-t border-gray-200 pt-3 mb-2"></div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">KEY POINTS</h4>
                      <div className="space-y-1">
                        {term.subNotes.map((note: string, index: number) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600">{note}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Whiteboards */}
          <div className="space-y-4">
            {/* Scrollable Whiteboards Container */}
            <div className="max-h-[28rem] overflow-y-auto pr-2 space-y-3 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 [&::-webkit-scrollbar]:mr-2">
              {shuffledWhiteboards.map((whiteboard: any, index: number) => (
                <div key={index} className="w-full cursor-pointer" onClick={() => openModal(whiteboard)}>
                  <img 
                    src={whiteboard.url} 
                    alt={`${whiteboard.topic} - Lesson ${whiteboard.lessonID}`}
                    className="w-full h-auto rounded border border-gray-200 hover:border-blue-300 transition-colors"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Whiteboard Modal */}
      {isModalOpen && selectedWhiteboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
            >
              ×
            </button>
            
            {/* Whiteboard Content */}
            <div className="p-6">
              <img 
                src={selectedWhiteboard.url} 
                alt={`${selectedWhiteboard.topic} - Lesson ${selectedWhiteboard.lessonID}`}
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
  // MVP: Removed authentication context usage
  // const { user, loading: authLoading, userData, loadingUserData } = useAuthContext();
  const router = useRouter();
  


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
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">


                    {/* Container with Shadow Effect */}
          <div className="relative">
            {/* Shadow Card - Behind Main Container */}
            <div className="bg-gray-200 rounded-lg border-4 border-dashed border-gray-300 absolute inset-0 transform translate-x-4 translate-y-4 -z-10" style={{ borderStyle: 'dashed', borderWidth: '4px', borderColor: '#d1d5db', borderDasharray: '40 15' } as React.CSSProperties}></div>
            
            {/* Main Container - AP Macro Course */}
            <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-2xl border border-gray-200/50 shadow-2xl overflow-hidden relative backdrop-blur-sm">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl"></div>
              
              <div className="relative p-6 sm:p-8 lg:p-12">
                {/* Header Section with Badge */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-3 sm:px-4 py-2 mb-3 sm:mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold text-blue-700">Featured Course</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3 sm:mb-4">
                    <span className="block sm:hidden">AP</span>
                    <span className="block sm:hidden">Macro</span>
                    <span className="hidden sm:block">AP Macroeconomics</span>
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                    Master the fundamentals of economic theory with our comprehensive curriculum, interactive tools, and expert-led instruction.
                  </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-1 gap-6 sm:gap-8 items-center">
                  {/* Full Width CTA Button */}
                  <div className="w-full">
                    <Link href="/ap-macro-course" className="block w-full">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 sm:py-8 px-8 sm:px-16 text-lg sm:text-xl lg:text-2xl rounded-lg transition-colors duration-200 font-semibold">
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4" />
                        <span className="hidden sm:inline">Start Learning</span>
                        <span className="sm:hidden">Start</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/50">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 text-center">
                    <div className="lg:flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">50+ Videos</p>
                      <p className="text-xs sm:text-sm text-gray-500">Teacher Explanations</p>
                    </div>
                    <div className="lg:flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">Full Practice Tests</p>
                      <p className="text-xs sm:text-sm text-gray-500">MCQ and FRQ</p>
                    </div>
                    <div className="lg:flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">Question Walkthroughs</p>
                      <p className="text-xs sm:text-sm text-gray-500">Teacher Led</p>
                    </div>
                    <div className="lg:flex-1">
                      <p className="text-base sm:text-lg font-bold text-gray-800">150+ MCQ</p>
                      <p className="text-xs sm:text-sm text-gray-500">practice questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* MCQ Practice Preview - Full Viewport Width */}
      <div className="mt-16 sm:mt-32 w-full">
        {/* Section Headline */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
            <span className="text-blue-500">AP Dojo</span> MCQ Practice
          </h2>
        </div>
        
        {/* Functional MCQ Practice Component */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomepageMCQPreview />
        </div>
        
        {/* MCQ Practice Button - Full Width */}
        <div className="text-center mt-12 sm:mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/select-practice-units?subject=macro">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-6 sm:py-8 px-8 sm:px-16 text-lg sm:text-xl lg:text-2xl rounded-lg transition-colors duration-200 w-full font-semibold">
              Start MCQ Practice
            </Button>
          </Link>
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
        <div className="text-center mt-12 sm:mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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