'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Lock } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems'; // Reverted import
import { Question as QuestionType } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import dojoIcon from "../../../public/images/dojoIcon.png"
import { Button } from "@/components/ui/button";
import { videos as allVideos, Video } from '@/data/videos';
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';
import { macroLessons, microLessons } from '@/data/lessons'; // Import lessons
import { LoginModal, SignupModal } from '@/components/AuthModals';

// Assuming this matches the structure in useAuth.ts and Firestore
interface McqAnswer {
  id?: string;
  questionId: string | number;
  isCorrect: boolean;
  unitId: number;
  lessonIDS: string[];
  timestamp?: any;
}

// Structure for unit results
interface WeakUnitInfo {
  unitId: number;
  percentage: number;
  totalAnswers: number;
  correctAnswers: number;
}

// Structure for intermediate unit calculations
interface UnitStats {
  correct: number;
  total: number;
}

// Function to calculate weakest units (Using correct field 'unitId')
function calculateWeakestUnits(answers: McqAnswer[]): WeakUnitInfo[] {
  console.log("[Calc] Starting calculation with", answers?.length, "answers.");
  if (!answers || answers.length === 0) return [];

  const unitStats: { [key: number]: UnitStats } = {};
  let processedCount = 0;

  // 1. Aggregate stats per unit ID
  answers.forEach((answer, index) => {
    // Debug log uses answer.unitId now
    if (index < 5) {
       console.log(`[Calc] Answer ${index} unitId value:`, answer.unitId, typeof answer.unitId);
    }

    // Check answer.unitId instead of answer.unit
    if (typeof answer.unitId === 'number') {
      const unitId = answer.unitId; // Use the correct field
      if (!unitStats[unitId]) {
        unitStats[unitId] = { correct: 0, total: 0 };
      }
      unitStats[unitId].total++;
      if (answer.isCorrect) {
        unitStats[unitId].correct++;
      }
      processedCount++;
    } else {
        // Debug log uses answer.unitId now
        if (index < 10) {
             console.warn(`[Calc] Answer ${index} has invalid unitId:`, answer.unitId);
        }
    }
  });

  console.log("[Calc] Aggregated unitStats:", unitStats);
  console.log(`[Calc] Processed ${processedCount} answers with valid numeric unit IDs.`);

  // 2. Calculate percentage (no change needed here)
  const unitsWithStats = Object.entries(unitStats)
    .map(([unitIdStr, stats]): WeakUnitInfo => {
      const unitId = parseInt(unitIdStr, 10);
      const percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
      return {
        unitId: unitId,
        percentage: percentage,
        totalAnswers: stats.total,
        correctAnswers: stats.correct,
      };
    });

  // 3. Sort by Unit ID instead of performance
  unitsWithStats.sort((a, b) => a.unitId - b.unitId);

  console.log("[Calc] Final unitsWithStats (sorted by Unit ID):", unitsWithStats);

  // 4. Return
  return unitsWithStats;
}

// ADD BACK: Calculation function specifically to find WEAKEST units
function determineWeakestUnitIdsFunc(answers: McqAnswer[]): number[] {
  console.log("[Practice Page Calc] Determining weakest units from", answers?.length, "answers.");
  if (!answers || answers.length < 1) { // Need at least 1 answer
      console.log("[Practice Page Calc] Not enough answers to determine weakest units.");
      return [];
  }

  const unitStats: { [key: number]: UnitStats } = {};
  answers.forEach(answer => {
    if (typeof answer.unitId === 'number') {
      const unitId = answer.unitId;
      if (!unitStats[unitId]) {
        unitStats[unitId] = { correct: 0, total: 0 };
      }
      unitStats[unitId].total++;
      if (answer.isCorrect) {
        unitStats[unitId].correct++;
      }
    }
  });

  const unitsWithStats = Object.entries(unitStats)
    .map(([unitIdStr, stats]): WeakUnitInfo => {
      const unitId = parseInt(unitIdStr, 10);
      // Consider units with at least, say, 3 answers for weakness determination
      const percentage = stats.total >= 3 ? (stats.correct / stats.total) * 100 : 101; // Put units with < 3 answers last
      return {
        unitId: unitId,
        percentage: percentage,
        totalAnswers: stats.total,
        correctAnswers: stats.correct,
      };
    })
    .filter(unit => unit.percentage <= 100); // Filter out those artificially set to 101

  // Sort by performance (weakest first)
  unitsWithStats.sort((a, b) => a.percentage - b.percentage);

  // Take top 3 weakest unit IDs
  const weakestIds = unitsWithStats.slice(0, 3).map(u => u.unitId);
  console.log("[Practice Page Calc] Determined weakest unit IDs:", weakestIds);
  return weakestIds;
}

// Use the imported metadata arrays directly if they exist
const macroUnitsData = allMacroUnitsData; 
const microUnitsData = allMicroUnitsData;

interface UnitData {
  id: number;
  name: string;
  questions: QuestionType[];
}

interface AnsweredQuestionState {
  selectedLetter: string;
  isCorrect: boolean;
}

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Access All Questions</h2>
        <p className="text-gray-600 mb-6 text-center">
          You've answered the free sample questions. Please log in or sign up to continue practicing!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login" className="flex-1">
            <button 
              onClick={onClose}
              className="w-full px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Login
            </button>
          </Link>
          <Link href="/signup" className="flex-1">
            <button 
              onClick={onClose}
              className="w-full px-6 py-3 text-sm font-bold text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to assign light pastel colors to units
const getUnitColor = (unitId: number): string => {
  const colors = [
    'bg-blue-200',
    'bg-green-200',
    'bg-purple-200',
    'bg-yellow-200',
    'bg-red-200',
    'bg-indigo-200',
    'bg-pink-200',
    'bg-teal-200',
    'bg-lime-200',
    'bg-orange-200',
    'bg-cyan-200',
    'bg-fuchsia-200',
  ];
  return colors[(unitId - 1) % colors.length] || 'bg-gray-200'; // Fallback
};

// --- Define DoubleXpModal Component ---
interface DoubleXpModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

function DoubleXpModal({ isOpen, onAccept, onDecline }: DoubleXpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Feeling Lucky?</h2>
        <p className="text-gray-600 mb-6">
          Double XP for the next question (sight unseen)? Or play it safe?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onAccept}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            Double XP!
          </Button>
          <Button
            onClick={onDecline}
            className="flex-1"
            variant="outline"
            size="lg"
          >
            Keep Normal
          </Button>
        </div>
      </div>
    </div>
  );
}

// ADD: Fisher-Yates Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function AccessDenied({ unitId, subject }: { unitId: string, subject: string }) {
  const unitData = (subject === 'macro' ? allMacroUnitsData : allMicroUnitsData).find(u => u.number === parseInt(unitId));
  const price = unitData?.price || 4.99;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 pb-12">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
        <Lock className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Purchase Required</h2>
        <p className="text-gray-600 mb-6">
          You need to purchase this test to access the full set of practice questions.
        </p>
        <Link 
          href={`/purchase/mcq-practice?units=${unitId}&total=${price}&subject=${subject}`}
          className="inline-block"
        >
          <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
            Purchase Unit {unitId} Test
          </Button>
        </Link>
      </div>
    </div>
  );
}


function UnitMCQPracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    user, 
    userData,
    mcqAnswersData, 
    loadingMcqData, 
    correctStreak,
    setCorrectStreak,
    isNextQuestionDoubleXp,
    setIsNextQuestionDoubleXp,
  } = useAuthContext();
  
  // --- Access Control State ---
  const [hasAccess, setHasAccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  // Determine Subject and Mode from params
  const subjectParam = searchParams.get('subject');
  const subject = (subjectParam === 'macro' || subjectParam === 'micro') ? subjectParam : 'macro';
  const unitsParam = searchParams.get('units');
  const currentUnitForAccessCheck = unitsParam ? unitsParam.split(',')[0] : '1';
  const lessonIdParam = searchParams.get('lessonId');
  const modeParam = searchParams.get('mode');
  const unitsData = subject === 'micro' ? microUnitsData : macroUnitsData;

  const initialCustomUnitIds = unitsParam 
      ? unitsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
      : [];

  // Set practice mode based on params
  type PracticeMode = 'singleUnit' | 'weakest' | 'custom' | 'topic';
  const initialPracticeMode: PracticeMode = 
      modeParam === 'weakest' ? 'weakest' :
      modeParam === 'custom' && initialCustomUnitIds.length > 0 ? 'custom' :
      modeParam === 'topic' && lessonIdParam ? 'topic' :
      'singleUnit';

  const initialUnit = (initialPracticeMode === 'singleUnit' && initialCustomUnitIds.length > 0)
    ? initialCustomUnitIds[0]
    : (unitsData[0]?.number ?? (subject === 'micro' ? 2 : 1));

  // --- Effect to Verify Purchase ---
  useEffect(() => {
    // All practice is free for now, so we can grant access
    setHasAccess(true);
    setIsVerifying(false);
  }, [user, unitsParam, modeParam]);


  // --- State for the practice component ---
  const [currentUnit, setCurrentUnit] = useState<number>(initialUnit);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, AnsweredQuestionState>>({});
  const [dojoProgress, setDojoProgress] = useState<number>(50);
  
  const [practiceMode, setPracticeMode] = useState<PracticeMode>(initialPracticeMode);
  const [weakestUnitIds, setWeakestUnitIds] = useState<number[]>([]); // For weakest mode calculation
  const [customUnitIds, setCustomUnitIds] = useState<number[]>(initialCustomUnitIds); // For custom mode
  
  // Combined questions state based on mode
  const [questionsForPractice, setQuestionsForPractice] = useState<QuestionType[]>([]);
  const [isLoadingQuestionSet, setIsLoadingQuestionSet] = useState(true); // Combined loading state

  const [showDoubleXpModal, setShowDoubleXpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


  const DOUBLE_XP_CHANCE = 0.15; // 15% chance

  // --- Effect to Calculate Weakest Units (Only runs if mode is weakest) ---
  useEffect(() => {
    if (practiceMode === 'weakest' && !loadingMcqData && user && mcqAnswersData) {
        console.log("[Practice Page Effect] Calculating weakest unit IDs...");
        const calculatedWeakestIds = determineWeakestUnitIdsFunc(mcqAnswersData);
        setWeakestUnitIds(calculatedWeakestIds);
    } else {
        setWeakestUnitIds([]); // Clear if not in weakest mode
    }
  }, [practiceMode, mcqAnswersData, user, loadingMcqData]);

  // --- Effect to Prepare Question Set (Reverted) --- 
  useEffect(() => {
    if (!hasAccess) return;

    console.log(`[Practice Page Effect] Preparing question set. Mode: ${practiceMode}, Subject: ${subject}`);
    setIsLoadingQuestionSet(true);
    setCorrectStreak(0);
    
    let baseFilteredQuestions: QuestionType[] = [];
    const subjectInDataFormat = subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    
    if (practiceMode === 'topic' && lessonIdParam) {
        baseFilteredQuestions = allQuestions.filter(q => // Reverted to allQuestions
            q.subject === subjectInDataFormat &&
            q.lessonIDS.includes(lessonIdParam)
        );
        console.log(`[Practice Page Effect] Filtered ${baseFilteredQuestions.length} questions for topic (lessonId: ${lessonIdParam})`);
    } else {
        let relevantUnitIds: number[] = [];
        if (practiceMode === 'weakest') {
            relevantUnitIds = weakestUnitIds.length > 0 ? weakestUnitIds : [];
        } else if (practiceMode === 'custom') {
            relevantUnitIds = customUnitIds.length > 0 ? customUnitIds : [];
        } else { // singleUnit mode
            relevantUnitIds = initialCustomUnitIds.length > 0 ? initialCustomUnitIds : [currentUnit];
        }

        if (relevantUnitIds.length > 0) {
            baseFilteredQuestions = allQuestions.filter(q => // Reverted to allQuestions
                q.subject === subjectInDataFormat && 
                relevantUnitIds.includes(q.unit) 
            );
            console.log(`[Practice Page Effect] Filtered ${baseFilteredQuestions.length} base questions for subject ${subject} and units [${relevantUnitIds.join(',')}]`);
        } else {
            console.log(`[Practice Page Effect] No relevant units determined for mode: ${practiceMode}.`);
        }
    }

    // --- Filter based on mcqAnswerStatus --- 
    const answerStatusMap = userData?.mcqAnswerStatus || {}; // Get status map from context/userData
    console.log(`[Practice Page Effect] User has status entries for ${Object.keys(answerStatusMap).length} MCQs.`);
    
    const unviewedOrIncorrectQuestions = baseFilteredQuestions.filter(q => 
        !answerStatusMap.hasOwnProperty(q.id) || // Question not answered yet
        answerStatusMap[q.id] === false          // Question answered incorrectly
    );
    const correctlyAnsweredQuestions = baseFilteredQuestions.filter(q => 
        answerStatusMap.hasOwnProperty(q.id) && // Question has been answered
        answerStatusMap[q.id] === true           // And was answered correctly
    );
    console.log(`[Practice Page Effect] Split into ${unviewedOrIncorrectQuestions.length} unviewed/incorrect and ${correctlyAnsweredQuestions.length} correct.`);

    // Shuffle both lists
    const shuffledUnviewedOrIncorrect = shuffleArray(unviewedOrIncorrectQuestions);
    const shuffledCorrectlyAnswered = shuffleArray(correctlyAnsweredQuestions);

    // Combine: Prioritize unviewed or incorrectly answered questions
    const finalQuestions = [...shuffledUnviewedOrIncorrect, ...shuffledCorrectlyAnswered];
    // --- End Filtering based on mcqAnswerStatus ---

    setQuestionsForPractice(finalQuestions);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions({}); // Reset answers when question set changes
    setIsLoadingQuestionSet(false);
    console.log("[Practice Page Effect] Question set preparation complete.");

  }, [hasAccess, practiceMode, subject, weakestUnitIds.join(','), customUnitIds.join(','), currentUnit, lessonIdParam]); // Reverted dependencies

  // --- Effect to Reset Streak on Unmount ---
  useEffect(() => {
    // This function runs when the component unmounts
    return () => {
      console.log("[Practice Page Effect] Unmounting, resetting streak.");
      setCorrectStreak(0);
    };
  }, [setCorrectStreak]); // Dependency ensures correct setter is used

  // Determine Current Unit Name for Display (Using unitsData from metadata)
  const currentUnitName = (() => {
    if (practiceMode === 'topic') {
      const lessons = subject === 'macro' ? macroLessons : microLessons;
      const lesson = lessons.find(l => l.lessonNumber === lessonIdParam);
      return lesson ? lesson.lessonName : `Topic ${lessonIdParam}`;
    }
    if (practiceMode === 'weakest') return `Weakest Units (${weakestUnitIds.join(', ') || 'Finding...'})`;
    if (practiceMode === 'custom') return `Custom Practice (${customUnitIds.join(', ') || 'None'})`;
    return unitsData.find(unit => unit.number === currentUnit)?.title || `Unit ${currentUnit}`; // Use .number instead of .id
  })();

  const totalQuestionsInSet = questionsForPractice.length;

  // --- Updated handleAnswer with XP Floor & New Streak/DoubleXP Logic --- 
  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
      // 1. Update local state for immediate feedback
      setAnsweredQuestions(prev => ({
        ...prev,
        [questionId]: { selectedLetter: answerLetter, isCorrect }
      }));

      // 2. Calculate points change including streak and double XP
      let basePoints = 0;
      const currentStreakValue = correctStreak; // Read streak from context BEFORE updating it
      let streakMultiplier = 1;
      let finalPointsChange = 0;

      if (isCorrect) {
        // Determine base points and streak multiplier
        basePoints = 10;
        if (currentStreakValue >= 5) {
          streakMultiplier = 2;
        } else if (currentStreakValue >= 3) {
          streakMultiplier = 1.5;
        }
        // Apply multipliers (streak first, then double XP)
        finalPointsChange = basePoints * streakMultiplier * (isNextQuestionDoubleXp ? 2 : 1);
        // Update streak state in context
        setCorrectStreak(currentStreakValue + 1);
      } else {
        basePoints = -2; // Base points for incorrect
        finalPointsChange = basePoints * (isNextQuestionDoubleXp ? 2 : 1); // Apply double XP if applicable
        // Reset streak state in context
        if (currentStreakValue > 0) setCorrectStreak(0);
      }
      console.log(`Points Calculation: Correct=${isCorrect}, Base=${basePoints}, Streak=${currentStreakValue}(x${streakMultiplier}), DoubleXP=${isNextQuestionDoubleXp}, Final=${finalPointsChange}`);

      // 3. Reset Double XP flag AFTER calculation if it was used
      if (isNextQuestionDoubleXp) {
          setIsNextQuestionDoubleXp(false);
      }

      // 4. Update Dojo Progress Bar state (visual only)
      setDojoProgress(prevProgress => {
          // This is just visual, doesn't need floor logic
          const newProgress = prevProgress + finalPointsChange;
          return Math.max(0, Math.min(100, newProgress));
      });

      // 5. Update Firestore XP (with floor logic based on totalXP)
      if (user) { 
        // --- START CHANGE: Use totalXP for floor logic ---
        const currentTotalXPValue = userData?.totalXP ?? 0; // Get totalXP from context
        let adjustedPointsChange = finalPointsChange;

        // Calculate potential new total XP
        const potentialNewTotalXP = currentTotalXPValue + finalPointsChange;

        // Apply floor logic for totalXP: if potential is negative, adjust change to hit 0
        if (potentialNewTotalXP < 0) {
            adjustedPointsChange = 0 - currentTotalXPValue; // Change needed to reach exactly 0
            console.log(`Total XP floor applied. Original change: ${finalPointsChange}, Adjusted change: ${adjustedPointsChange}`);
        }
        // --- END CHANGE ---

        // --- START CHANGE: API call to update total XP ---
        if (adjustedPointsChange !== 0) {
            try {
                console.log(`Attempting to update totalXP by ${adjustedPointsChange} for user ${user.uid}`); // Add log

                // Call the NEW API endpoint
                fetch('/api/update-total-xp', { // <-- CHANGE Endpoint URL
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.uid,
                        xpAmount: adjustedPointsChange // <-- Send only userId and amount
                    })
                })
                .then(response => {
                    if (!response.ok) {
                         response.json().then(err => console.error(`API Error updating total XP: ${response.status}`, err));
                    } else {
                         console.log(`API request sent to update total XP by ${adjustedPointsChange}`);
                    }
                })
                .catch(apiError => {
                     console.error('Fetch Error calling /api/update-total-xp:', apiError);
                });
                 // --- END CHANGE ---

                // TODO: Consider if the mcqAnswer log still needs unitId or if it should be removed/changed
                // const answerData = { ... };
                // await addDoc(userAnswersColRef, answerData);

            } catch (error) {
                 console.error("Sync Error during XP update/log attempt (before fetch):", error);
            }
        } else {
             console.log(`No total XP change needed (already at floor or no change).`);
        }
      } else {
          console.warn("User not logged in, XP not updated, answer log not saved.");
      }
    };

  // handleUnitChange only relevant for singleUnit mode now?
  const handleUnitChange = (unitId: number) => {
    if (practiceMode === 'singleUnit' && unitId !== currentUnit) {
      setCorrectStreak(0); // <-- Reset streak on unit change
      setCurrentUnit(unitId); 
      // The main useEffect will handle resetting questions/index/answers
    }
  };

  // Updated handleNextQuestion with random check
  const handleNextQuestion = () => {
     // Check only if not already in modal, prevent recursion
     if (!showDoubleXpModal && Math.random() < DOUBLE_XP_CHANCE) {
         setShowDoubleXpModal(true);
         return;
     }
     proceedToActualNextQuestion();
  };

  // Previous question logic remains the same
  const handlePreviousQuestion = () => {
     if (totalQuestionsInSet === 0) return;
     const prevIndex = currentQuestionIndex - 1;
     if (prevIndex < 0) {
       handleQuestionSelect(totalQuestionsInSet - 1); // Wrap to end
     } else {
       setCurrentQuestionIndex(prevIndex);
     }
  };

  const handleQuestionSelect = (index: number) => {
    if (index >= 0 && index < totalQuestionsInSet) {
        setCurrentQuestionIndex(index);
    } else {
        console.warn("Attempted to select invalid question index:", index);
    }
  };

  // Modal Choice Handlers
  const handleAcceptDoubleXp = () => {
    setIsNextQuestionDoubleXp(true);
    setShowDoubleXpModal(false);
    proceedToActualNextQuestion();
  };

  const handleDeclineDoubleXp = () => {
    setIsNextQuestionDoubleXp(false);
    setShowDoubleXpModal(false);
    proceedToActualNextQuestion();
  };

  // Helper function to contain actual navigation logic
  const proceedToActualNextQuestion = () => {
     if (totalQuestionsInSet === 0) return;
     const nextIndex = currentQuestionIndex + 1;
     if (nextIndex >= totalQuestionsInSet) {
       handleQuestionSelect(0); // Wrap to start
     } else {
       // Directly setting state here is fine as it's the core navigation action
       setCurrentQuestionIndex(nextIndex);
     }
  };

  const pageTitle = subject === 'micro' ? 'AP Microeconomics' : 'AP Macroeconomics';
  const titleColor = subject === 'micro' ? 'text-green-500' : 'text-blue-500';

  // Determine relevant unit IDs for display based on practice mode
  const relevantUnitIdsForDisplay = 
      practiceMode === 'weakest' ? weakestUnitIds : 
      practiceMode === 'custom' ? customUnitIds : 
      practiceMode === 'singleUnit' ? [currentUnit] : // Include currentUnit for single mode display
      []; // Default empty



  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    // Potentially refresh user data or trigger other actions as needed
    if (userData) {
      // ... existing code ...
    }
  };

  if (isVerifying) {
    return <PageLoadingFallback />;
  }

  if (!hasAccess) {
    return <AccessDenied unitId={currentUnitForAccessCheck} subject={subject} />;
  }

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => { 
            setShowLoginModal(false); 
            setShowSignupModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => { 
            setShowSignupModal(false); 
            setShowLoginModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />


      <div className="bg-transparent min-h-screen pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Display Loading State */}
          {isLoadingQuestionSet && (
            <div className="text-center text-gray-500 my-4 p-6 bg-white rounded shadow">
              <Loader2 className="h-6 w-6 animate-spin inline-block mr-2" />
              Loading questions for {practiceMode} mode...
            </div>
          )}

          {/* Display Practice Component when ready */}
          {!isLoadingQuestionSet && questionsForPractice.length > 0 && (
            <UnitMCQs
              currentUnit={practiceMode === 'singleUnit' ? currentUnit : 0} 
              currentQuestionIndex={currentQuestionIndex}
              isLoggedIn={!!user}
              onAnswer={handleAnswer}
              onNextQuestion={handleNextQuestion}
              questions={questionsForPractice}
              onPreviousQuestion={handlePreviousQuestion}
              onQuestionSelect={handleQuestionSelect}
              onUnitChange={handleUnitChange}
              answeredQuestions={answeredQuestions}
              units={unitsData}
              dojoProgress={dojoProgress}
              correctStreak={correctStreak}
              isWeakestUnitsMode={practiceMode === 'weakest' || practiceMode === 'custom'} 
              totalQuestions={totalQuestionsInSet}
              unitName={currentUnitName}
              subject={subject} 
              practiceUnitIds={relevantUnitIdsForDisplay}
              isParentModalOpen={showLoginModal || showSignupModal}

            />
          )}

          {/* Display message if no questions could be loaded */}
          {!isLoadingQuestionSet && questionsForPractice.length === 0 && (
            <div className="text-center text-red-500 my-4 p-6 bg-white rounded shadow">
              Could not load questions for the selected mode or units.
              {practiceMode !== 'singleUnit' && <p className="text-sm text-gray-600 mt-2">You may need to answer more questions first to determine weakest units.</p>} 
              {/* Add link back to homepage or unit selection? */} 
            </div>
          )}

        </div>
        {/* Render the Double XP Modal */}
        <DoubleXpModal
            isOpen={showDoubleXpModal}
            onAccept={handleAcceptDoubleXp}
            onDecline={handleDeclineDoubleXp}
        />
      </div>
    </>
  );
}

function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-xl font-medium text-gray-600">
          Loading Practice Questions...
        </p>
      </div>
    </div>
  );
}

export default function UnitMCQPracticePage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <UnitMCQPracticeContent />
    </Suspense>
  );
}
