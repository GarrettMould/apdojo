'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI
import { Loader2, Target, Film, Library, FileText, Lock, ClipboardList, Check, TrendingDown, BookOpen, Users, Copy, Send, CheckCircle2 } from 'lucide-react'; // Icons
import { videos as allVideos, Video as VideoType } from '@/data/videos'; // <-- Import real videos and type
import { macroUnits as allMacroCheatSheets, microUnits as allMicroCheatSheets, Unit as CheatSheetUnitType } from '@/data/cheatSheets';
import type { UnitXPData } from '@/hooks/useAuth'; // Import UnitXPData if needed for typing state, otherwise context provides it
import { useSearchParams } from 'next/navigation';
import quizPreview from "../../../public/images/quizPreview.png"
import { Input } from "@/components/ui/input"; // Assuming Input is used
import { useInView } from 'react-intersection-observer';
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"; // Needed for RadioGroup
import BoardDisplay from '@/components/board/BoardDisplay'; // <-- Import BoardDisplay

// Firestore imports needed for fetching challenges AND UPDATING
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, QuerySnapshot, DocumentData, doc, runTransaction, increment } from 'firebase/firestore';

// --- Types (copied from unitMCQPracticePage) ---
interface McqAnswer {
  id?: string;
  questionId: string | number;
  isCorrect: boolean;
  unitId: number;
  lessonIDS: string[];
  timestamp?: any;
}

// --- ADD Quiz Challenge Interface (essential for state typing) ---
interface QuizQuestion { // Basic structure needed if not imported
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number;
  unit: number;
  lessonIDS: string[];
  image?: string;
}

interface QuizChallenge { // Defined here, ensure fields match Firestore
  id: string; // Add id field to store document ID
  generatedByUserId: string;
  createdAt: any; // Firestore Timestamp
  subject: 'macro' | 'micro';
  status: string;
  numQuestions: number;
  quizQuestions: QuizQuestion[];
  originatorScore: number | null;
  originatorTime: number | null;
  opponentUserId: string | null;
  opponentScore: number | null;
  opponentTime: number | null;
  winnerUserId: string | null;
  xpAwarded: boolean;
  mode: 'challenge' | 'cooperate';
}
// --- END Quiz Challenge Interface ---

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
  const { user, loading: authLoading, mcqAnswersData, loadingMcqData, userData, loadingUserData } = useAuthContext();
  const router = useRouter();
  
  const [focusUnitIds, setFocusUnitIds] = useState<number[]>([]);
  const [recommendationSourceIds, setRecommendationSourceIds] = useState<number[]>([]);

  const [isProcessing, setIsProcessing] = useState(true);
  const [recommendedVideos, setRecommendedVideos] = useState<VideoType[]>([]);
  const [recommendedCheatSheets, setRecommendedCheatSheets] = useState<CheatSheetUnitType[]>([]);
  const [animationState, setAnimationState] = useState<'initial' | 'answered' | 'progressed'>('initial');
  const [currentProgress, setCurrentProgress] = useState(30);
  const [error, setError] = useState('');

  // --- State for Challenge Feature ---
  const [isGeneratingChallenge, setIsGeneratingChallenge] = useState(false);
  const [challengeLink, setChallengeLink] = useState<string | null>(null);
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [challengeUnitSelection, setChallengeUnitSelection] = useState<number[]>([]);
  // --- NEW State for Modal ---
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // --- NEW State for Challenge Results --- 
  const [completedChallenges, setCompletedChallenges] = useState<QuizChallenge[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true); // Start true
  // State for Claim XP button - stores loading status per challenge ID
  const [claimXpLoading, setClaimXpLoading] = useState<Record<string, boolean>>({});
  const [claimXpError, setClaimXpError] = useState<string | null>(null);
  // --- END State for Challenge Results ---

  // --- NEW State for Dismissed Messages ---
  // Initial state setup - reading from localStorage
  const [dismissedMessageIds, setDismissedMessageIds] = useState<string[]>(() => {
      // Check if window is defined (runs only on client-side)
      if (typeof window !== 'undefined') {
          const savedDismissed = localStorage.getItem('dismissedChallengeMessages');
          try {
              return savedDismissed ? JSON.parse(savedDismissed) : [];
          } catch (e) {
              console.error("Error parsing dismissed messages from localStorage", e);
              return []; // Fallback to empty array on error
          }
      }
      return []; // Default empty array if not on client
  });
  // --- END State for Dismissed Messages ---

  // --- NEW State for Typing Animation ---
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const placeholderTarget = 'getauniquequizlink';

  // --- Intersection Observer Setup ---
  const {
     ref: placeholderRef, // Ref to attach to the placeholder element
     inView: isPlaceholderVisible // Boolean indicating if the element is in view
  } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });
  // --- End Intersection Observer Setup ---

  const searchParams = useSearchParams();

  // --- State for Modal Stages & Quiz Length ---
  const [modalStage, setModalStage] = useState<1 | 2>(1);
  const [selectedLength, setSelectedLength] = useState<5 | 10>(5); // Default to 5

  // --- Modified useEffect for Redirection & Data Loading --- 
  useEffect(() => {
    // Wait for all relevant loading states to be false
    if (authLoading || loadingUserData || loadingMcqData) { 
      console.log('[Home Page Effect] Waiting for auth/user/mcq data...');
      // Keep isProcessing true while loading
      setIsProcessing(true);
      return; 
    }
    
    // --- User Check (Failsafe) ---
    // At this point, all loading is false. Check user existence.
    if (!user) {
        // This case should ideally be handled by the root page component,
        // but as a failsafe, redirect if somehow reached here without a user.
        console.log('[Home Page Effect] No user found after loading, redirecting to login.');
        router.push('/login');
        return; // Prevent further execution
    }

    // --- UserData Check ---
    // Now we know user exists and loading is done. Check userData.
    if (userData) {
        setError(''); // Clear any previous error
        console.log('[Home Page Effect] User data loaded, checking setup steps...');
        // --- Setup Checks ---
        if (!userData.selectedSubject) {
            console.log('[Home Page Effect] No selected subject, redirecting to /select-subject');
            router.push('/select-subject');
            return; // Stop further processing
        }
        if (!userData.hasCompletedInitialUnitSelection) {
            console.log('[Home Page Effect] Initial units not selected, redirecting to /initial-unit-selection');
            router.push('/initial-unit-selection'); 
            return; // Stop further processing
        }
        
        // --- Setup Complete: Run Main Logic ---
        console.log('[Home Page Effect] User setup complete. Running main logic...');
        const currentSubject = userData?.selectedSubject || 'macro'; 
        const relevantUnitsData = currentSubject === 'micro' ? allMicroCheatSheets : allMacroCheatSheets;
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
            setIsProcessing(false); // Ensure processing is set to false HERE
            console.log('[Home Page Effect] Processing finished.');
        }, 50); 
        // Cleanup timer on effect re-run or unmount
        return () => clearTimeout(timer); 
        // --- End Main Logic ---

    } else {
        // --- Handle Missing UserData After Load --- 
        // User exists, loading is done, but userData is still null/undefined.
        // This indicates a problem like a missing Firestore document.
        // Display error instead of redirecting to prevent loop.
        console.error('[Home Page Effect] Error: User exists but Firestore userData is missing after loading.');
        setError('Could not load your profile data. Please check your connection or contact support if the issue persists.'); 
        setIsProcessing(false); // Stop the main loading spinner
    }

  // Update dependencies
  }, [user, authLoading, loadingUserData, userData, loadingMcqData, router]); 

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

  // --- Updated useEffect for Typing Animation ---
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let currentIndex = 0;

    // Start animation only if placeholder is visible, no link, not generating
    if (isPlaceholderVisible && !challengeLink && !isGeneratingChallenge) {
      // Reset only if starting animation
      if (animatedPlaceholder !== placeholderTarget) {
         setAnimatedPlaceholder('');
         intervalId = setInterval(() => {
           setAnimatedPlaceholder(prev => placeholderTarget.substring(0, prev.length + 1));
           currentIndex++;
           if (currentIndex >= placeholderTarget.length && intervalId) {
             clearInterval(intervalId);
           }
         }, 180); // Slower typing speed (180ms)
      }
    } else if (challengeLink || isGeneratingChallenge) {
       // If link exists or generating, clear placeholder animation
       setAnimatedPlaceholder('');
    }

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // Depend on visibility trigger, link status, and generation status
  }, [isPlaceholderVisible, challengeLink, isGeneratingChallenge]);
  // --- End Updated useEffect ---

  // --- NEW useEffect for Fetching Completed Challenges --- 
  useEffect(() => {
    if (!user || !userData) {
      // Don't fetch if user or essential data isn't loaded
      // Set loading to false if we know we can't fetch
      if (!authLoading && !loadingUserData) {
          setLoadingChallenges(false);
      }
      return;
    }

    const fetchCompletedChallenges = async () => {
      setLoadingChallenges(true);
      setCompletedChallenges([]); // Clear previous results
      console.log('[Challenge Fetch] Fetching completed challenges for user:', user.uid);

      const challengesRef = collection(db, 'quizChallenges');
      // Query 1: User is the originator
      const q1 = query(challengesRef,
                       where('generatedByUserId', '==', user.uid),
                       where('status', '==', 'completed')
                      );
      // Query 2: User is the opponent
      const q2 = query(challengesRef,
                       where('opponentUserId', '==', user.uid),
                       where('status', '==', 'completed')
                      );

      try {
        const [originatorSnap, opponentSnap] = await Promise.all([
          getDocs(q1),
          getDocs(q2)
        ]);

        const challengesMap = new Map<string, QuizChallenge>();

        const processSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
          snapshot.forEach((doc) => {
            if (!challengesMap.has(doc.id)) { // Avoid duplicates if user played themself
                 challengesMap.set(doc.id, { id: doc.id, ...doc.data() } as QuizChallenge);
            }
          });
        };

        processSnapshot(originatorSnap);
        processSnapshot(opponentSnap);

        const allCompleted = Array.from(challengesMap.values());
        console.log('[Challenge Fetch] Found completed challenges:', allCompleted);
        setCompletedChallenges(allCompleted);

      } catch (error) {
        console.error("[Challenge Fetch] Error fetching completed challenges:", error);
        // Optionally set an error state here
      } finally {
        setLoadingChallenges(false);
      }
    };

    fetchCompletedChallenges();

    // Dependency array: run when user or their main data changes
  }, [user, userData, authLoading, loadingUserData]);
  // --- END NEW useEffect --- 

  // --- Determine Subject and Units Data --- 
  const subject = userData?.selectedSubject || 'macro';
  // const displayUnitsData: UnitDetailsType[] = subject === 'micro' ? allMicroCheatSheets : allMacroCheatSheets;
  // displayUnitsData might not be needed anymore if UnitPerformanceDisplay is removed

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

  // --- NEW Function to get subject units ---
  const getSubjectUnits = () => {
       const currentSubject = userData?.selectedSubject || 'macro';
       return currentSubject === 'micro' ? allMicroCheatSheets : allMacroCheatSheets;
   };

  // Handler for checkbox changes within the modal - accept boolean | 'indeterminate'
  const handleUnitCheckboxChange = (unitId: number, checked: boolean | 'indeterminate') => {
       // Only process boolean values
       if (typeof checked === 'boolean') {
           if (checked === true) {
                // Clear error when user interacts after an error occurred
                if (challengeError) setChallengeError(null);
                setChallengeUnitSelection(prev => [...prev, unitId].sort((a, b) => a - b));
           } else {
                setChallengeUnitSelection(prev => prev.filter(id => id !== unitId));
           }
       }
       // Ignore 'indeterminate' state for selection logic
   };

  // --- Helper Function: Number Icon ---
  const StageNumberIcon = ({ number }: { number: number }) => (
    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-sm">{number}</span>
    </div>
  );

  // --- Handler Function for Challenge Generation (updated) ---
  const handleGenerateChallenge = async () => { // No longer takes length directly, reads from state
    console.log('[handleGenerateChallenge] Starting...');
    if (!user || !userData?.selectedSubject) {
      console.log('[handleGenerateChallenge] Missing user or subject.');
      setChallengeError('Please ensure you are logged in and have selected a subject.');
      return; // Return early, don't proceed
    }
    if (!selectedLength) { // Added check for selected length
        setChallengeError('Please select a quiz length.');
        return; // Return early
    }

    setIsGeneratingChallenge(true);
    setChallengeError(null);
    setLinkCopied(false); // Reset copy state
    let generatedLinkId: string | null = null; // Temp variable

    try {
      const requestBody: { userId: string; subject: string; numQuestions: number; unitIds?: number[] } = {
        userId: user.uid,
        subject: userData.selectedSubject,
        numQuestions: selectedLength, // Use state value
      };
      if (challengeUnitSelection.length > 0) {
        requestBody.unitIds = challengeUnitSelection;
      }
      console.log('[handleGenerateChallenge] Generating challenge with body:', requestBody);

      const response = await fetch('/api/generate-challenge-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      console.log('[handleGenerateChallenge] Challenge API response status:', response.status);

       if (!response.ok) {
          let errorText = 'API request failed';
          try { errorText = await response.text(); } catch (e) {}
          console.error('[handleGenerateChallenge] API Error Response Text:', errorText);
          throw new Error(`Failed to generate challenge. Status: ${response.status}`);
       }

       const data = await response.json();
       console.log('[handleGenerateChallenge] Challenge API response data:', data);

       if (!data.success) {
         console.error('[handleGenerateChallenge] Challenge generation failed (data.success false):', data.error);
         throw new Error(data.error || 'Failed to generate challenge.');
       }

       if (data.challengeId) {
         const link = `${window.location.origin}/quiz-challenge/${data.challengeId}`;
         console.log('[handleGenerateChallenge] Challenge link generated:', link);
         generatedLinkId = link; // Store link temporarily
         setChallengeLink(link); // Keep setting state for potential future use
         // DO NOT reset unit selection here, happens on modal close
       } else {
          console.error('[handleGenerateChallenge] Challenge ID missing despite success response');
          throw new Error('Challenge ID not received from server.');
       }
     } catch (err: any) {
       console.error("[handleGenerateChallenge] Challenge generation error caught:", err);
       setChallengeError(err.message || 'An unexpected error occurred.');
       // Reset generating state ONLY on error, success moves to next stage
       setIsGeneratingChallenge(false);
       return; // Stop execution on error
     } 
     // Don't set generating false here on success, it resets after stage change
     // If successful, move to stage 2
     console.log('[handleGenerateChallenge] Success, moving to stage 2.');
     setModalStage(2); 
     setIsGeneratingChallenge(false); // Set loading OFF *after* stage change confirmed
  };

  // --- Handler for the primary footer button --- 
  const handleFooterButtonClick = () => {
      if (modalStage === 1) {
          // Trigger generation, which will change stage on success
          handleGenerateChallenge(); 
      } else if (modalStage === 2 && challengeLink) {
          // Navigate to the quiz
          router.push(challengeLink);
      }
  };

  // --- Copy Link Handler (remains the same, triggered on main page) ---
  const handleCopyLink = () => {
    if (challengeLink) {
      navigator.clipboard.writeText(challengeLink).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000); // Reset after 2s
      }, (err) => {
        console.error('Failed to copy link: ', err);
        setChallengeError('Failed to copy link automatically. Please copy it manually.');
      });
    }
  };
  // --- End Copy Link Handler ---

  // --- Function to handle XP claim (Implementation) --- 
  const handleClaimXp = async (challengeId: string, isTie: boolean) => {
    if (!user || !userData) { // Ensure user and userData are loaded
        console.error("[handleClaimXp] User or userData not available.");
        setClaimXpError("Cannot claim XP. User data not loaded.");
        return;
    }

    console.log(`[handleClaimXp] Attempting to claim XP for challenge ${challengeId}, isTie: ${isTie}`);
    setClaimXpLoading(prev => ({ ...prev, [challengeId]: true }));
    setClaimXpError(null); // Clear previous errors

    const xpAmount = isTie ? 50 : 100;
    const challengeRef = doc(db, "quizChallenges", challengeId);
    const userRef = doc(db, "users", user.uid);

    try {
        await runTransaction(db, async (transaction) => {
            console.log(`[handleClaimXp] Running transaction for ${challengeId}`);
            const challengeDoc = await transaction.get(challengeRef);
            const userDoc = await transaction.get(userRef); // Read user doc within transaction

            if (!challengeDoc.exists()) {
                throw new Error("Challenge document not found!");
            }
            if (!userDoc.exists()) {
                // This shouldn't happen if userData is loaded, but safety check
                throw new Error("User document not found!");
            }

            const challengeData = challengeDoc.data() as QuizChallenge;
            // const currentTotalXP = userDoc.data()?.totalXP ?? 0; // No longer needed directly

            // --- Double-check eligibility within transaction --- 
            const isWinner = challengeData.winnerUserId === user.uid;
            const canClaimTie = isTie && challengeData.winnerUserId === null;

            if ((!isWinner && !canClaimTie) || challengeData.xpAwarded) {
                 console.warn(`[handleClaimXp] Claim condition not met inside transaction for ${challengeId}. Winner: ${isWinner}, Tie: ${canClaimTie}, Awarded: ${challengeData.xpAwarded}`);
                 throw new Error("XP already awarded or conditions not met.");
            }
            // --- End eligibility check ---

            console.log(`[handleClaimXp] Conditions met. Updating challenge ${challengeId} (xpAwarded: true) and user ${user.uid} totalXP by ${xpAmount}.`);
            // Update challenge document
            transaction.update(challengeRef, { xpAwarded: true });

            // --- START CHANGE: Update totalXP on main user doc --- 
            // Update user document using increment for atomicity
            transaction.update(userRef, { totalXP: increment(xpAmount) });
            // --- END CHANGE ---
        });

        console.log(`[handleClaimXp] Transaction successful for ${challengeId}`);

        // --- Optimistic UI Update --- 
        // Update local state to immediately hide the button
        setCompletedChallenges(prevChallenges =>
            prevChallenges.map(c =>
                c.id === challengeId ? { ...c, xpAwarded: true } : c
            )
        );
        // --- setUserData update REMOVED --- 
        // if (setUserData && userData) {
        //      setUserData({ ...userData, totalXP: (userData.totalXP || 0) + xpAmount });
        // }

    } catch (error: any) {
        console.error("[handleClaimXp] Transaction failed:", error);
        setClaimXpError(error.message || "Failed to claim XP. Please try again.");
    } finally {
        console.log(`[handleClaimXp] Resetting loading state for ${challengeId}`);
        setClaimXpLoading(prev => ({ ...prev, [challengeId]: false }));
    }
  };
  // --- END Function to handle XP claim --- 

  // --- NEW Function to handle Message Dashboard Actions ---
  const handleMessageAction = async (challengeId: string, canClaim: boolean, isTie: boolean) => {
    if (canClaim) {
        await handleClaimXp(challengeId, isTie); // Attempt to claim XP first
        // We'll dismiss regardless of claim success/failure, as user acknowledged it
    }
    // Add to dismissed list to remove from dashboard
    setDismissedMessageIds(prev => [...prev, challengeId]);
    console.log(`[handleMessageAction] Dismissed message for challenge: ${challengeId}`);
  };
  // --- END Function for Message Dashboard Actions ---

  // Add useEffect to update localStorage when state changes
  useEffect(() => {
      // Check if window is defined
      if (typeof window !== 'undefined') {
          localStorage.setItem('dismissedChallengeMessages', JSON.stringify(dismissedMessageIds));
      }
  }, [dismissedMessageIds]); // Run this effect whenever dismissedMessageIds changes

  // --- START RE-INSERTION: Render Messages Dashboard Function ---
  const renderMessagesDashboard = () => {
    // --- REMOVE Temporary Code Block --- 
    /*
    // Sample data for a won challenge where XP is claimable
    const sampleWonChallenge: QuizChallenge = { ... }; // Contents omitted for brevity
    ...
    return (
        <div className="p-4 bg-gray-50 ...">
            ...
        </div>
    );
    */
    // --- END OF TEMPORARY CODE ---

    // --- UNCOMMENT Original Code --- 
    if (loadingChallenges) {
      return (
        // Keep outer container styling consistent
        <div className="p-4 text-center text-gray-500 text-sm italic bg-gray-50 rounded-lg border border-gray-200 min-h-[80px] flex items-center justify-center"> 
          <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
          Loading messages...
        </div>
      );
    }

    const activeMessages = completedChallenges.filter(c => !dismissedMessageIds.includes(c.id));

    // Sort active messages by date (most recent first) and limit to 4
    const sortedAndLimitedMessages = activeMessages
        .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
        .slice(0, 4); // Display only the first 4

    // Outer container is now ALWAYS rendered
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[80px]">
        {sortedAndLimitedMessages.length === 0 ? (
          // Condition 1: No messages
          <div className="h-full flex items-center justify-center">
            <p className="text-center text-gray-500 text-sm italic">
              No new messages or alerts.
            </p>
          </div>
        ) : (
          // Condition 2: Show messages
          <div className="flex flex-wrap gap-4 pb-1">
            {sortedAndLimitedMessages.map((challenge) => {
              const isOriginator = user?.uid === challenge.generatedByUserId;
              const yourScore = isOriginator ? challenge.originatorScore : challenge.opponentScore;
              const numQuestions = challenge.numQuestions ?? 5;
              const didWin = challenge.winnerUserId === user?.uid;
              const didLose = challenge.winnerUserId !== null && challenge.winnerUserId !== user?.uid;
              const isTie = challenge.winnerUserId === null;

              let title = "Challenge Result";
              let titleColor = "text-gray-600";
              if (didWin) { title = "Winner!"; titleColor = "text-green-600"; }
              else if (isTie) { title = "It's a Tie!"; titleColor = "text-blue-600"; }
              else if (didLose) { title = "Better Luck Next Time!"; titleColor = "text-gray-600"; }

              const canClaim = (didWin || isTie) && !challenge.xpAwarded;
              const xpAmount = isTie ? 50 : 100;
              const buttonText = canClaim ? `Claim XP (+${xpAmount})` : "Remove Alert";
              const buttonVariant : "default" | "secondary" = canClaim ? "default" : "secondary"; // Explicit type for variant
              const buttonClasses = canClaim ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"; // Added secondary style

              return (
                <div key={challenge.id} className="border rounded-lg p-3 bg-white shadow-md w-48 flex-shrink-0 flex flex-col justify-between space-y-2">
                  <h3 className={`text-base font-bold text-center text-black`}>{title}</h3>
                  <div className="text-center text-xs text-gray-700">
                      Your Score: <strong className="text-sm text-black">{yourScore ?? '-'} / {numQuestions}</strong>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => handleMessageAction(challenge.id, canClaim, isTie)}
                      disabled={claimXpLoading[challenge.id]}
                      size="sm"
                      variant={buttonVariant}
                      className={buttonClasses}
                    >
                      {claimXpLoading[challenge.id] && canClaim ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {buttonText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
    // --- End of Original Code Re-activation ---
  };
  // --- END RE-INSERTION --- 

  // --- Helper Function for Ordinal Date Suffix ---
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  // --- END Helper Function ---

  // --- START REPLACEMENT: Function to Render Challenge Results Section (Table Format) --- 
  const renderChallengeResultsSection = () => {
    if (loadingChallenges) {
      return (
        <div className="p-4 text-center text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
          Loading challenge history...
        </div>
      );
    }

    if (completedChallenges.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500 text-sm italic bg-gray-50 rounded-lg border border-gray-200">
          No completed challenges found in your history.
        </div>
      );
    }

    const sortedChallenges = [...completedChallenges].sort((a, b) => {
        const timeA = a.createdAt?.seconds ?? 0;
        const timeB = b.createdAt?.seconds ?? 0;
        return timeB - timeA; // Sort descending
    });

    return (
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                Units
              </th>
              <th scope="col" className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
              <th scope="col" className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
                XP Earned
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedChallenges.map((challenge) => {
              const isOriginator = user?.uid === challenge.generatedByUserId;
              const yourScore = isOriginator ? challenge.originatorScore : challenge.opponentScore;
              const numQuestions = challenge.numQuestions ?? 5;
              const didWin = challenge.winnerUserId === user?.uid;
              const didLose = challenge.winnerUserId !== null && challenge.winnerUserId !== user?.uid;
              const isTie = challenge.winnerUserId === null;

              let resultText = "Completed";
              let resultColor = "text-gray-600";
              if (didWin) { resultText = "Win"; resultColor = "text-green-600 font-semibold"; }
              else if (isTie) { resultText = "Tie"; resultColor = "text-blue-600 font-semibold"; }
              else if (didLose) { resultText = "Loss"; resultColor = "text-red-600 font-semibold"; }

              // Extract units covered and format text
              const unitsCovered = Array.from(new Set(challenge.quizQuestions?.map(q => q.unit) ?? [])).sort((a,b) => a-b).join(', ');
              const unitsText = unitsCovered || 'N/A'; // Remove "Unit(s) " prefix

              // Format date using helper (Remove year)
              const date = challenge.createdAt?.toDate();
              let dateCompleted = 'N/A';
              if (date) {
                  const day = date.getDate();
                  const month = date.toLocaleDateString(undefined, { month: 'long' });
                  const suffix = getOrdinalSuffix(day);
                  dateCompleted = `${month} ${day}${suffix}`; // REMOVE year from output
              }

              // Determine XP Won (logic remains same, text format changed)
              let xpWon = 0;
              if (challenge.xpAwarded) {
                 if (didWin) xpWon = 100;
                 else if (isTie) xpWon = 50;
              }
              const xpText = `${xpWon} XP`; // Show 0 XP if not awarded or lost

              return (
                <tr key={challenge.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-800">{dateCompleted}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-500">{unitsText}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-gray-800"><strong className="text-black">{yourScore ?? '-'} / {numQuestions}</strong></td>
                  <td className={`px-4 py-2 whitespace-nowrap text-center ${resultColor}`}>{resultText}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center font-medium text-yellow-600">{xpText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  // --- END REPLACEMENT: Function to Render Challenge Results Section --- 

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

  // --- Conditional Rendering based on Loading/Error State --- 
  if (isProcessing) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (error) { // <-- Display error if present
    return (
        <div className="min-h-screen flex items-center justify-center p-4 text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
        </div>
    );
  }

  // --- Main component return (structure updated) --- 
  return (
    <div className="min-h-screen pt-20 pb-16">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome back!
          </h1>

          {/* REMOVE First Call to renderContentAreaSection */}
          {/* {renderContentAreaSection()} */}

          {/* <<< BoardDisplay Component Temporarily Commented Out >>> */}
          {/* 
          <div className="mt-8">
             <h2 className="text-2xl font-semibold mb-4">My Blocks Board</h2>
             <BoardDisplay />
          </div>
          */}

          {/* Messages Dashboard Section */}
          <section aria-labelledby="messages-dashboard-heading" className="space-y-3">
              <h2 id="messages-dashboard-heading" className="text-lg font-semibold text-gray-800">
                  Messages & Alerts
              </h2>
              {renderMessagesDashboard()}
          </section>

          {/* Focus Section */}
          <section aria-labelledby="focus-units-heading">
               <h2 id="focus-units-heading" className="sr-only">Focus Units Practice Section</h2>
               {renderFocusPracticeSection()} 
          </section>

          {/* --- NEW Unified Challenge Zone Section --- */}
          <section aria-labelledby="unified-challenge-zone-heading">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Shared Header */}
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 id="unified-challenge-zone-heading" className="text-lg font-semibold text-gray-800">
                  Challenge Zone
                </h2>
              </div>
              {/* Content Area */}
              
              <div className="p-6 pt-6 space-y-6">  {/* REVERTED top padding */}
                  {/* --- Create Challenge Subsection --- */}
                  <div className="space-y-5">
                      {/* MODIFIED Heading Styling */}
                      <h3 className="text-base font-semibold text-gray-700">
                          Create a Challenge - 
                          <span className="font-medium"> Generate a quiz link, send it to a friend, and </span> {/* Normal weight, inherits color */} 
                          <span className="text-purple-500 font-bold">battle for XP</span> {/* Bold and purple */} 
                          <span className="font-medium"> — may the smartest win!</span> {/* Normal weight, inherits color */} 
                      </h3>
                      {/* Button Group with Dialog Trigger */}
                      <div className="flex rounded-md shadow-sm">
                          {/* Update onOpenChange to reset stage */}
                          <Dialog open={isChallengeModalOpen} onOpenChange={(open) => {
                              setIsChallengeModalOpen(open);
                              if (!open) { // Reset stage and other states
                                  setModalStage(1);
                                  setChallengeLink(null);
                                  setChallengeError(null);
                                  setChallengeUnitSelection([]);
                                  setSelectedLength(5); // Reset length
                                  setLinkCopied(false);
                                  setIsGeneratingChallenge(false);
                              }
                          }}>
                              <DialogTrigger asChild>
                                  <Button
                                      className="flex-1 relative inline-flex items-center justify-center px-4 py-2 rounded-l-md rounded-r-none border border-gray-300 bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                                      size="lg"
                                  >
                                      Challenge
                                  </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[480px]">
                                  <DialogHeader>
                                      {/* Title remains the same */}
                                      <DialogTitle className="text-2xl font-extrabold tracking-tight text-gray-800">Create <span className="text-blue-500">Challenge Quiz</span></DialogTitle>
                                      {/* Description removed or adjusted based on stage? Let's keep it simple for now */}
                                  </DialogHeader>

                                  {/* --- Stage 1 Content --- */}
                                  {modalStage === 1 && (
                                      <div className="py-4 space-y-6"> {/* Increased spacing */}
                                          {/* Instruction 1 */}
                                          <div className="flex items-center gap-3">
                                              <StageNumberIcon number={1} />
                                              <p className="text-sm text-gray-700 font-medium">Choose quiz length and units.</p>
                                          </div>
                                          {/* Length Selection */}
                                          <div>
                                              <Label className="text-sm font-medium text-gray-700 pb-2 block">Quiz Length</Label>
                                              <RadioGroup defaultValue="5" value={selectedLength.toString()} onValueChange={(value) => setSelectedLength(parseInt(value) as 5 | 10)} className="flex gap-4">
                                                  <div className="flex items-center space-x-2">
                                                      <RadioGroupItem value="5" id="len-5" />
                                                      <Label htmlFor="len-5">5 Questions</Label>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                      <RadioGroupItem value="10" id="len-10" />
                                                      <Label htmlFor="len-10">10 Questions</Label>
                                                  </div>
                                              </RadioGroup>
                                          </div>
                                          {/* Unit Selection */}
                                          <ScrollArea className="max-h-[30vh] border rounded-md p-4 bg-gray-50"> {/* Adjusted max-h */}
                                              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                                  {/* START INSERTION */}
                                                  {getSubjectUnits().map((unit) => (
                                                      <div key={unit.number} className="flex items-center space-x-2">
                                                          <Checkbox
                                                              id={`unit-${unit.number}`}
                                                              checked={challengeUnitSelection.includes(unit.number)}
                                                              onCheckedChange={(checked) => handleUnitCheckboxChange(unit.number, checked)}
                                                          />
                                                          <Label
                                                              htmlFor={`unit-${unit.number}`}
                                                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                          >
                                                              Unit {unit.number}
                                                          </Label>
                                                      </div>
                                                  ))}
                                                  {/* END INSERTION */}
                                              </div>
                                          </ScrollArea>
                                           {/* Display Generation Error */}
                                          {challengeError && (
                                               <p className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 text-center">Error: {challengeError}</p>
                                          )}
                                      </div>
                                  )}

                                  {/* --- Stage 2 Content --- */}
                                  {modalStage === 2 && (
                                      <div className="py-4 space-y-6"> {/* Increased spacing */}
                                          {/* Instruction 2 */}
                                          <div className="flex items-center gap-3">
                                              <StageNumberIcon number={2} />
                                              <p className="text-sm text-gray-700 font-medium">Copy the quiz link and then begin.<br/>(You can share with a friend now or later)</p>
                                          </div>
                                          {/* Link Display & Copy Button */}
                                          {challengeLink && (
                                              <div className="flex items-center gap-2 border border-gray-300 bg-gray-100 rounded-md overflow-hidden"> 
                                                  <p className="text-base text-gray-800 font-semibold flex-grow min-w-0 pl-3 py-3 break-words"> 
                                                      {challengeLink}
                                                  </p>
                                                  <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={handleCopyLink}
                                                      className="flex-shrink-0 px-2 py-1 h-auto text-gray-600 hover:text-gray-900 mr-1" /* ADDED mr-1 */
                                                      aria-label={linkCopied ? 'Link Copied' : 'Copy Link'}
                                                  >
                                                      {linkCopied ? (
                                                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                      ) : (
                                                          <Copy className="w-4 h-4" />
                                                      )}
                                                  </Button>
                                              </div>
                                          )}
                                          {/* Error display if generation failed but somehow reached stage 2? Unlikely */}
                                          {challengeError && (
                                               <p className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 text-center">Error: {challengeError}</p>
                                          )}
                                      </div>
                                  )}

                                  {/* --- Footer Button (Unified) --- */}
                                  <DialogFooter className="pt-4 flex w-full">
                                      <Button
                                          type="button"
                                          onClick={handleFooterButtonClick} // Use unified handler
                                          disabled={isGeneratingChallenge || (modalStage === 2 && !challengeLink)} // Disable while generating or if link missing in stage 2
                                          className={`w-full bg-blue-500 hover:bg-blue-600 text-white`} // Always blue now
                                          size="lg"
                                      >
                                          {isGeneratingChallenge 
                                              ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> 
                                              : modalStage === 1 
                                                  ? 'Next' 
                                                  : 'Start Quiz'}
                                      </Button>
                                  </DialogFooter>
                              </DialogContent>
                          </Dialog>
                          {/* ... Cooperate Button ... */}
                      </div>
                  </div>
                  {/* --- Completed Challenges Subsection --- */}
                  <div className="space-y-3 border-t border-gray-200 pt-6"> {/* Added border-t and pt-6 for separation */}
                      <h3 className="text-base font-semibold text-gray-700">Completed Challenges</h3>
                      {renderChallengeResultsSection()} {/* Added the call here */}
                  </div>
              </div>
            </div>
          </section>
          {/* --- END Unified Challenge Zone Section --- */}

          {/* Study Resources Section */}
          <section aria-labelledby="content-area-heading">
              <h2 id="content-area-heading" className="sr-only">Content Area</h2>
              {renderContentAreaSection()} {/* Keep this second call */} 
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