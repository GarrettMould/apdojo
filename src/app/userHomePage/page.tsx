'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI
import { Loader2, Target, Film, Library, FileText, Lock, ClipboardList, Check, TrendingDown, BookOpen } from 'lucide-react'; // Icons
import { videos as allVideos, Video as VideoType } from '@/data/videos'; // <-- Import real videos and type
import { macroUnits as allMacroCheatSheets, microUnits as allMicroCheatSheets, Unit as CheatSheetUnitType } from '@/data/cheatSheets';
import type { UnitXPData } from '@/hooks/useAuth'; // Import UnitXPData if needed for typing state, otherwise context provides it
import { useSearchParams } from 'next/navigation';

// --- Types (copied from unitMCQPracticePage) ---
interface McqAnswer {
  id?: string;
  questionId: string | number;
  isCorrect: boolean;
  unitId: number;
  lessonIDS: string[];
  timestamp?: any;
}

// --- Helper Components for Animation ---

// Helper component replicating the Dojo progress bar style
const DojoStyleProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-3 relative w-full mb-4" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}> {/* Container for the bar */}
    {/* Progress bar track */}
    <div className="absolute inset-0 h-full bg-gray-200 rounded-full overflow-hidden">
      {/* Progress bar fill with gradient */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
     <span className="sr-only">{progress}% Complete</span>
  </div>
);

// --- ADD Sample Subject-Specific Questions ---
const sampleMacroQuestion = {
  id: 'sample-macro-1',
  question: 'If the government increases spending without raising taxes, what is the likely short-run effect on Aggregate Demand and the price level?',
  options: {
     a: 'Decrease, Decrease',
     b: 'Increase, Increase', // Correct answer
     c: 'Decrease, Increase',
     d: 'Increase, Decrease',
  },
  correctAnswer: 'b',
};

const sampleMicroQuestion = {
  id: 'sample-micro-1',
  question: 'A perfectly competitive firm maximizes profit or minimizes loss in the short run where:',
  options: {
     a: 'MC > MR',
     b: 'Price = ATC',
     c: 'Price = MC', // Correct answer
     d: 'TR = TC',
  },
  correctAnswer: 'c',
};
// --- END Sample Questions ---

// Simple component to mimic QuestionCard visuals for animation with stacked effect
const AnimatedQuestionPreview = ({ question, animationState, currentProgress }: { question: any, animationState: 'initial' | 'answered' | 'progressed', currentProgress: number }) => {
  const correctAnswerLetter = question.correctAnswer;
  const options = Object.entries(question.options).map(([letter, text]) => ({ letter, text }));

  return (
    <div className="relative pb-3 pr-3"> {/* Adjusted padding for new offset */}
      {/* Background Card 1 (Bottom) - Reduced offset */}
      <div className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-200 transform translate-x-3 translate-y-3 z-[-2]"></div> {/* x-3 y-3, z-[-2] */}
      {/* Background Card 2 (Middle) - Reduced offset */}
      <div className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-200 transform translate-x-2 translate-y-2 z-[-1]"></div> {/* x-2 y-2, z-[-1] */}
      {/* Background Card 3 (Top Background) - New Card */}
      <div className="absolute inset-0 bg-white rounded-lg shadow-md border border-gray-200 transform translate-x-1 translate-y-1 z-0"></div>    {/* x-1 y-1, z-0 */}

      {/* Main Card Content (Top) */}
      <div className="relative z-10 bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
        {/* Add Dojo Style Progress Bar at the top */}
        <DojoStyleProgressBar progress={currentProgress} />

        <p className="text-md font-medium font-serif text-gray-800 pt-2">
          {question.question}
        </p>
        <div className="space-y-3">
          {options.map(({ letter, text }) => {
            const isCorrect = letter === correctAnswerLetter;
            const showAsSelected = (animationState === 'answered' || animationState === 'progressed') && isCorrect;

            return (
              <div
                key={letter}
                className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all duration-300 border flex items-center gap-3 cursor-default
                  ${showAsSelected ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-transparent border-gray-200'}
                `}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full border font-medium flex-shrink-0
                    ${showAsSelected ? 'bg-green-100 border-green-300 text-green-700' : 'bg-white border-gray-300 text-gray-600'}
                  `}
                >
                  {letter.toUpperCase()}
                </span>
                <span className={`flex-1 ${showAsSelected ? 'text-gray-800' : 'text-gray-900'}`}>{text as string}</span>
                {showAsSelected && <Check className="w-5 h-5 text-green-500 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Renamed Component --- 
function UserHomePageContent() {
  const { user, mcqAnswersData, loadingMcqData, userData, loadingUserData, unitXPData, loadingUnitXPData } = useAuthContext();
  const router = useRouter();
  
  const [focusUnitIds, setFocusUnitIds] = useState<number[]>([]);
  const [recommendationSourceIds, setRecommendationSourceIds] = useState<number[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState<VideoType[]>([]);
  const [recommendedCheatSheets, setRecommendedCheatSheets] = useState<CheatSheetUnitType[]>([]);
  const [animationState, setAnimationState] = useState<'initial' | 'answered' | 'progressed'>('initial');
  const [currentProgress, setCurrentProgress] = useState(30);

  const searchParams = useSearchParams();

  // --- Modified useEffect for Redirection & Data Loading --- 
  useEffect(() => {
    // Initial loading state covers auth and user data
    if (loadingUserData || loadingMcqData) { 
      console.log('[Home Page Effect] Waiting for user data and MCQ data...');
      setIsProcessing(true); // Show loading state
      return; 
    }

    // Handle unauthenticated user
    if (!user) {
      console.log('[Home Page Effect] No user found, redirecting to login.');
      router.push('/login');
      return; 
    }
    
    // Handle authenticated user, check setup steps
    if (userData) {
        console.log('[Home Page Effect] User data loaded, checking setup steps...');
        if (!userData.selectedSubject) {
            console.log('[Home Page Effect] No selected subject, redirecting to /select-subject');
            router.push('/select-subject');
            return; // Stop further processing in this effect run
        }
        if (!userData.hasCompletedInitialUnitSelection) {
            console.log('[Home Page Effect] Initial units not selected, redirecting to /initial-unit-selection');
            router.push('/initial-unit-selection'); 
            return; // Stop further processing
        }
        // --- If setup is complete, proceed with existing logic --- 
        console.log('[Home Page Effect] User setup complete. Determining focus/recommendation units...');
        const currentSubject = userData?.selectedSubject || 'macro'; 
        const relevantUnitsData = currentSubject === 'micro' ? allMicroCheatSheets : allMacroCheatSheets;
    
        // Timer logic remains, but ensure setIsProcessing(false) is inside or after it
        const timer = setTimeout(() => {
            let finalFocusIds: number[] = [];
            let finalRecommendationIds: number[] = [];
    
            if (userData.hasCompletedInitialUnitSelection && userData.initialPracticeUnitIds && userData.initialPracticeUnitIds.length > 0) {
                finalFocusIds = userData.initialPracticeUnitIds;
                finalRecommendationIds = userData.initialPracticeUnitIds;
            } 
            else {
                 const defaultIds = relevantUnitsData.slice(0, 4).map(u => u.number);
                 finalFocusIds = defaultIds;
                 finalRecommendationIds = defaultIds;
            }
            
            setFocusUnitIds(finalFocusIds);
            setRecommendationSourceIds(finalRecommendationIds);
    
            if (finalRecommendationIds.length > 0) {
                 const filteredVideos = allVideos.filter(video => {
                    const videoSubjectMatch = video.subjects.includes(currentSubject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics');
                    const videoUnitId = Number(video.unit);
                    const unitIdMatch = !isNaN(videoUnitId) && finalRecommendationIds.includes(videoUnitId);
                    return videoSubjectMatch && unitIdMatch;
                }).slice(0, 4);
                setRecommendedVideos(filteredVideos);
    
                const filteredCheatSheets = relevantUnitsData.filter(sheet =>
                    finalRecommendationIds.includes(sheet.number)
                ).slice(0, 4);
                setRecommendedCheatSheets(filteredCheatSheets);
            } else {
                setRecommendedVideos([]);
                setRecommendedCheatSheets([]);
            }
    
            setIsProcessing(false); // Ensure processing is set to false here
            console.log('[Home Page Effect] Processing finished.');
        }, 50); 
        return () => clearTimeout(timer);
    } else {
      // Should theoretically be covered by loadingUserData check, but as a fallback:
      console.log('[Home Page Effect] User exists but userData is null/undefined after loading. Redirecting to login as failsafe.');
      router.push('/login');
      setIsProcessing(false); // Ensure loading stops
    }

  // Update dependencies
  }, [user, loadingUserData, userData, loadingMcqData, router]); 

  // --- Animation effect depends on focusUnitIds ---
  useEffect(() => {
    let timer1: NodeJS.Timeout, timer2: NodeJS.Timeout;
    // Animate if we have units to focus on (initial or default)
    if (focusUnitIds.length > 0) { 
      setAnimationState('initial');
      setCurrentProgress(30);
      timer1 = setTimeout(() => setAnimationState('answered'), 1500);
      timer2 = setTimeout(() => { setAnimationState('progressed'); setCurrentProgress(75); }, 2500);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      setAnimationState('initial');
      setCurrentProgress(30);
    }
  }, [focusUnitIds]); // Depend only on focusUnitIds

  // --- Determine Subject and Units Data --- 
  const subject = userData?.selectedSubject || 'macro';
  // const displayUnitsData: UnitDetailsType[] = subject === 'micro' ? allMicroCheatSheets : allMacroCheatSheets;
  // displayUnitsData might not be needed anymore if UnitPerformanceDisplay is removed

  // --- NEW Function to render Weakest XP Units Section ---
  const renderWeakestXPUnitsSection = () => {
    if (loadingUnitXPData) {
      return (
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 h-24">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Loading performance data...</span>
        </div>
      );
    }

    // Condition: Only show if we have XP data for at least 3 units
    if (!unitXPData || unitXPData.length < 3) {
      return null; // Render nothing if condition not met
    }

    // Calculate weakest 3 units based on XP
    const weakestUnits = [...unitXPData]
      .sort((a, b) => a.totalXP - b.totalXP) // Sort ascending by XP
      .slice(0, 3); // Take the first 3

    return (
      // Main container
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 relative">
        {/* Title */} 
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
           <TrendingDown className="w-5 h-5 text-red-500" />
           Areas to Focus On (Lowest XP)
        </h2>

        {/* "See full stats" link - Commented Out */}
        {/* 
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()} 
          className="absolute top-4 right-4 text-xs font-medium text-blue-600 hover:underline"
        >
           See full stats
        </a> 
        */}

        {/* Grid for the 3 cards */} 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weakestUnits.map((unit) => (
            <div key={unit.unitId} className="bg-gray-50 rounded-md border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Unit {unit.unitId}</h3>
              <p className="text-xl font-semibold text-gray-800">{unit.totalXP} <span className="text-xs font-normal text-gray-500">XP</span></p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // RENAMED: Function to render the initial/selected units focus section
  const renderFocusPracticeSection = () => {
    // --- Select question based on subject ---
    const questionToShow = subject === 'macro' ? sampleMacroQuestion : sampleMicroQuestion;
    // --- End question selection ---

    if (isProcessing || loadingUserData) {
      return (
        <div className="flex items-center justify-center p-6 h-48 text-gray-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Determining focus areas...</span>
        </div>
      );
    }

    if (focusUnitIds.length > 0) {
      const buttonText = "Start Now"; 
      const linkHref = `/unitMCQPracticePage?subject=${subject}&mode=custom&units=${focusUnitIds.join(',')}`;

      return (
        <div> 
          <div className="flex flex-col sm:flex-row items-center gap-8"> 
             {/* Animated Preview */}
             <div className="w-full sm:w-3/5 lg:w-2/3 flex-shrink-0 order-2 sm:order-1">
               <div className="max-w-md mx-auto sm:mx-0">
                  <AnimatedQuestionPreview
                      question={questionToShow}
                      animationState={animationState}
                      currentProgress={currentProgress}
                  />
               </div>
             </div>
             {/* Text and Button */}
             <div className="w-full sm:w-2/5 lg:w-1/3 flex-shrink-0 flex flex-col justify-center items-center sm:items-start text-center sm:text-left order-1 sm:order-2 mb-6 sm:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5">
                   Targeted Practice.
                   <br/>
                   <span className="text-blue-500">Faster Results.</span>
                </h2>
                <Link href={linkHref}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      {buttonText}
                    </Button>
                </Link>
                {/* ADDED BACK: Link to choose specific unit */}
                <p className="text-base mt-4">
                  <Link 
                    href={`/select-practice-units?subject=${subject}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Or Choose Unit to Practice
                  </Link>
                </p>
             </div>
           </div>
        </div>
      );
    }

    // Fallback message
    return (
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to Practice?</h2>
          <p className="text-gray-600 mb-4">
              Go to the practice section to start working on specific units!
          </p>
          <Link href={`/unitMCQPracticePage?subject=${subject}`}>
              <Button variant="outline">
                Go to Practice
              </Button>
          </Link>
        </div>
    );
  };

  // --- Updated Combined Content Area Section --- 
  const renderContentAreaSection = () => {
    
    // --- Define Exam Data ---
    const allMacroExams = [
      { type: 'MCQ', number: 1, href: '/preview/macro/mcq/1', details: '60 questions • 70 min' },
      { type: 'FRQ', number: 1, href: '/preview/macro/frq/1', details: '3 questions • 60 min' }
    ];

    const allMicroExams = [
      { type: 'FRQ', number: 1, href: '/preview/micro/frq/1', details: '3 questions • 60 min' },
      { type: 'MCQ', number: 1, href: '/preview/micro/mcq/1', details: '60 questions • 70 min' },
      // Add more micro exams as available
    ];

    // --- Determine which exams to show based on user data ---
    const userSubject = userData?.selectedSubject; // 'macro', 'micro', or undefined
    const examsToShow = userSubject === 'macro' ? allMacroExams : userSubject === 'micro' ? allMicroExams : []; // Default to empty if no subject
    // const examSubjectPath = userSubject === 'macro' ? 'macroeconomics' : 'microeconomics'; // For links - keep if used elsewhere

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */} 
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                 <Library className="w-5 h-5 text-blue-600" /> 
                 Your Study Resources
             </h2>
        </div>

        {/* Content Area */} 
        <div className="p-6 space-y-8"> 

            {/* --- Subsection 1: Cheat Sheets --- */}
            <div className="relative"> 
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                   Cheat Sheets for You
                </h3>
                <Link 
                   href="/cheat-sheets"
                   className="absolute top-0 right-0 text-xs font-medium text-blue-600 hover:underline"
                >
                   View All
                </Link>
                {isProcessing ? (
                   <div className="text-center text-gray-500 py-4">
                       <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" /> Loading cheat sheet recommendations...
                   </div>
                ) : recommendedCheatSheets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {recommendedCheatSheets.map(sheet => (
                            <a key={sheet.number} href={sheet.pdfUrl} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-3 group rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow hover:border-green-300 bg-gray-50 hover:bg-white h-full">
                                <FileText className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors truncate">{sheet.title}</h4>
                                    <p className="text-xs text-gray-500">Unit {sheet.number}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                     <p className="text-gray-500 text-sm text-center py-4">
                        No specific cheat sheets found for your focus units. <Link href="/cheat-sheets" className="text-blue-600 hover:underline">View all.</Link>
                     </p>
                )}
            </div>

            {/* --- Subsection 2: Video Lessons --- */}
            <div className="relative border-t border-gray-200 pt-8"> 
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                    Video Lessons for You
                </h3>
                 <Link 
                   href={`/videos/${subject}`} 
                   className="absolute top-8 right-0 text-xs font-medium text-blue-600 hover:underline" // Adjusted top positioning due to pt-8
                 >
                   View All
                 </Link>
                 {isProcessing ? (
                     <div className="text-center text-gray-500 py-4">
                         <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" /> Loading video recommendations...
                     </div>
                ) : recommendedVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {recommendedVideos.map(video => (
                            // Video Card Style (Matching Cheat Sheet Style)
                            <Link 
                                key={video.id} 
                                href={`/videos/${subject}`} 
                                className="flex items-center gap-3 group rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow hover:border-purple-300 bg-gray-50 hover:bg-white h-full">
                                <Film className="w-6 h-6 text-purple-600 flex-shrink-0" />
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-purple-700 transition-colors truncate">{video.title}</h4>
                                    <p className="text-xs text-gray-500">Unit {video.unit}</p>
                                 </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                     <p className="text-gray-500 text-sm text-center py-4">
                         No specific videos found for your focus units. <Link href={`/videos/${subject}`} className="text-blue-600 hover:underline">View library.</Link>
                     </p>
                )}
            </div>

            {/* --- Subsection 3: Full Practice Exams --- */} 
            <div className="relative border-t border-gray-200 pt-8"> 
                 <h3 className="text-base font-semibold text-gray-700 mb-4">
                     Full {userSubject === 'macro' ? 'Macroeconomics' : userSubject === 'micro' ? 'Microeconomics' : ''} Practice Exams
                 </h3>
                 <Link 
                   href="/purchase/exams"
                   className="absolute top-8 right-0 text-xs font-medium text-blue-600 hover:underline" // Adjusted top positioning
                 >
                    View All
                 </Link>
                 {loadingMcqData ? (
                    <div className="text-center text-gray-500 py-4">
                         <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" /> Loading exam status...
                     </div>
                 ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {examsToShow.map((exam) => {
                          const isDisabled = userSubject === 'micro' && exam.type === 'MCQ';
                          
                          return (
                            <Link 
                                 key={`${userSubject}-${exam.type}-${exam.number}`} 
                                 href={isDisabled ? "#" : exam.href}
                                 onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                                 className={`flex items-center gap-3 group rounded-lg p-4 border border-gray-200 bg-gray-50 h-full transition-shadow ${ 
                                     isDisabled 
                                         ? 'opacity-70 cursor-not-allowed' 
                                         : 'hover:shadow-md hover:border-orange-300 hover:bg-white'
                                 }`}>
                                <ClipboardList className={`w-6 h-6 flex-shrink-0 ${isDisabled ? 'text-gray-400' : 'text-orange-600'}`} />
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center">
                                       <h4 className={`text-sm font-medium text-gray-800 truncate ${!isDisabled ? 'group-hover:text-orange-700 transition-colors' : ''}`}>{exam.type} Exam {exam.number}</h4>
                                       {isDisabled && <Lock className="w-4 h-4 text-gray-400 ml-1 flex-shrink-0" />} 
                                    </div>
                                </div>
                             </Link>
                          );
                        })}
                        {/* Message if no subject selected or no exams for subject */} 
                        {examsToShow.length === 0 && (
                            <p className="text-gray-500 text-sm text-center py-4 col-span-full">
                                {userSubject ? `Practice exams for ${userSubject} coming soon!` : 'Select a subject to see practice exams.'}
                            </p>
                        )}
                     </div>
                 )}
            </div>

            {/* --- Subsection 4: Other Resources (Renamed & Added FRQ Helper) --- */}
            <div className="relative border-t border-gray-200 pt-8">
                 <h3 className="text-base font-semibold text-gray-700 mb-4">
                     Other Resources
                 </h3>
                 {/* No specific recommendations yet, just link to main page */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                     {/* Card linking to Flashcards page */}
                     <Link href="/interactive-tools/flashcards"
                           className="flex items-center gap-3 group rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow hover:border-indigo-300 bg-gray-50 hover:bg-white h-full">
                         <BookOpen className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                         <div className="flex-grow min-w-0">
                             <h4 className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 transition-colors truncate">Study Flashcards</h4>
                             <p className="text-xs text-gray-500">Review key terms</p> 
                         </div>
                     </Link>
                     {/* --- ADDED: AI FRQ Helper Card --- */}
                     <Link href="/aiFRQHelper"
                           className="flex items-center gap-3 group rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow hover:border-cyan-300 bg-gray-50 hover:bg-white h-full">
                         <ClipboardList className="w-6 h-6 text-cyan-600 flex-shrink-0" /> {/* Using ClipboardList for now */}
                         <div className="flex-grow min-w-0">
                             <h4 className="text-sm font-medium text-gray-800 group-hover:text-cyan-700 transition-colors truncate">AI FRQ Helper</h4>
                             <p className="text-xs text-gray-500">Instant FRQ Feedback</p> 
                         </div>
                     </Link>
                     {/* --- End AI FRQ Helper Card --- */}
                     {/* Adjusted placeholders */} 
                     <div className="hidden md:block"></div> 
                     <div className="hidden md:block"></div> 
                 </div>
            </div>

        </div>
      </div>
    );
  };

  // --- Conditional Rendering based on Loading/Processing State --- 
  if (isProcessing) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // --- Main component return (only renders if not loading/redirecting) --- 
  return (
    <div className="min-h-screen pt-20 pb-16">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome back!
          </h1>

          {/* Weakest XP Section */}
          {renderWeakestXPUnitsSection()} 

          {/* Focus Section */}
          <section aria-labelledby="focus-units-heading">
               <h2 id="focus-units-heading" className="sr-only">Focus Units Practice Section</h2>
               {renderFocusPracticeSection()} 
          </section>

          {/* Study Resources Section */}
          <section aria-labelledby="content-area-heading">
              <h2 id="content-area-heading" className="sr-only">Content Area</h2>
              {renderContentAreaSection()}
          </section>

          {/* Placeholder for Future Sections */}
          <section aria-labelledby="more-features-heading">
              {/* ... */} 
          </section>

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

// --- NEW Default Export with Suspense --- 
export default function UserHomePage() {
  return (
    <Suspense fallback={<HomePageLoadingFallback />}>
      <UserHomePageContent />
    </Suspense>
  );
}