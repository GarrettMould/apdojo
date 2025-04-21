'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import dojoIcon from "../../../public/images/dojoIcon.png"
import { Button } from "@/components/ui/button";
import { videos as allVideos, Video } from '@/data/videos';
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';

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

function UnitMCQPracticeContent() {
  const searchParams = useSearchParams();
  const { 
    user, 
    mcqAnswersData, 
    loadingMcqData, 
    unitXPData, 
    correctStreak,
    setCorrectStreak,
    isNextQuestionDoubleXp,
    setIsNextQuestionDoubleXp
  } = useAuthContext();
  
  // Determine Subject from params or default
  const subjectParam = searchParams.get('subject');
  const subject = (subjectParam === 'micro' || subjectParam === 'macro') ? subjectParam : 'macro';
  const unitsData = subject === 'micro' ? microUnitsData : macroUnitsData;
  const initialUnit = unitsData[0]?.number ?? (subject === 'micro' ? 2 : 1);

  // Determine Mode and specific unit IDs if custom/initial
  const modeParam = searchParams.get('mode');
  const unitsParam = searchParams.get('units'); // Get units for custom/initial mode
  const initialCustomUnitIds = unitsParam 
      ? unitsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
      : [];

  // Set practice mode based on params
  type PracticeMode = 'singleUnit' | 'weakest' | 'custom'; // Added 'custom' mode
  const initialPracticeMode: PracticeMode = 
      modeParam === 'weakest' ? 'weakest' :
      modeParam === 'custom' && initialCustomUnitIds.length > 0 ? 'custom' :
      'singleUnit'; // Default to single unit

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

  // --- Effect to Prepare Question Set based on Mode (Refactored) --- 
  useEffect(() => {
    console.log(`[Practice Page Effect] Preparing question set. Mode: ${practiceMode}, Subject: ${subject}`);
    setIsLoadingQuestionSet(true);
    setCorrectStreak(0); // <-- Reset streak when mode/units change
    let filteredQuestions: QuestionType[] = [];
    let relevantUnitIds: number[] = [];

    if (practiceMode === 'weakest') {
        if (weakestUnitIds.length > 0) {
            relevantUnitIds = weakestUnitIds;
            console.log("[Practice Page Effect] Determined relevant units (weakest):", relevantUnitIds);
        } else {
             console.log("[Practice Page Effect] Weakest mode selected, but no weakest IDs determined yet.");
             // Keep relevantUnitIds empty, will result in empty question set until IDs are calculated
        }
    } else if (practiceMode === 'custom') {
        if (customUnitIds.length > 0) {
            relevantUnitIds = customUnitIds;
            console.log("[Practice Page Effect] Determined relevant units (custom):", relevantUnitIds);
        } else {
             console.log("[Practice Page Effect] Custom mode selected, but no unit IDs provided.");
             // Keep relevantUnitIds empty
        }
    } else { // singleUnit mode
        relevantUnitIds = [currentUnit];
        console.log("[Practice Page Effect] Determined relevant units (singleUnit):", relevantUnitIds);
    }

    // Filter the single allQuestions array based on subject and relevant units
    if (relevantUnitIds.length > 0) {
        const subjectInDataFormat = subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
        filteredQuestions = allQuestions.filter(q =>
            q.subject === subjectInDataFormat && // Compare with correct format
            relevantUnitIds.includes(q.unit) // Match one of the relevant units
        );
        console.log(`[Practice Page Effect] Filtered ${filteredQuestions.length} questions for subject ${subject} and units [${relevantUnitIds.join(',')}]`);

        // Shuffle if needed for specific modes
        if (practiceMode === 'weakest' || practiceMode === 'custom') {
            filteredQuestions = shuffleArray(filteredQuestions);
            console.log(`[Practice Page Effect] Shuffled questions for mode: ${practiceMode}`);
        }
    } else {
        console.log(`[Practice Page Effect] No relevant units determined for mode: ${practiceMode}. Setting empty question set.`);
        // Keep filteredQuestions as empty array
    }

    setQuestionsForPractice(filteredQuestions);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions({}); // Reset answers when question set changes
    setIsLoadingQuestionSet(false);
    console.log("[Practice Page Effect] Question set preparation complete.");

  }, [practiceMode, subject, weakestUnitIds.join(','), customUnitIds.join(','), currentUnit]); // Refined dependencies

  // --- Effect to Reset Streak on Unmount --- 
  useEffect(() => {
    // This function runs when the component unmounts
    return () => {
      console.log("[Practice Page Effect] Unmounting, resetting streak.");
      setCorrectStreak(0);
    };
  }, [setCorrectStreak]); // Dependency ensures correct setter is used

  // Determine Current Unit Name for Display (Using unitsData from metadata)
  const currentUnitName = 
      practiceMode === 'weakest' ? `Weakest Units (${weakestUnitIds.join(', ') || 'Finding...'})` :
      practiceMode === 'custom' ? `Custom Practice (${customUnitIds.join(', ') || 'None'})` :
      unitsData.find(unit => unit.number === currentUnit)?.title || `Unit ${currentUnit}`; // Use .number instead of .id

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

      // 5. Update Firestore XP (with floor logic)
      const questionData = questionsForPractice.find(q => q.id === questionId);
      const actualUnitId = questionData?.unit; // Get unit directly from the question object

      if (user && actualUnitId !== undefined) { 
        let adjustedPointsChange = finalPointsChange; // Start with calculated change

        // Find current XP from context data
        const currentUnitXP = unitXPData?.find(xp => xp.unitId === actualUnitId);
        const currentXPValue = currentUnitXP?.totalXP ?? 0; // Default to 0 if not found

        // Calculate potential new XP
        const potentialNewXP = currentXPValue + finalPointsChange;

        // Apply floor logic: if potential is negative, adjust change to hit 0
        if (potentialNewXP < 0) {
            adjustedPointsChange = 0 - currentXPValue; // Change needed to reach exactly 0
            console.log(`XP floor applied. Original change: ${finalPointsChange}, Adjusted change: ${adjustedPointsChange}`);
        }

        // Only update Firestore if there's actually a change to make
        if (adjustedPointsChange !== 0) {
            try {
                const unitXPRef = doc(db, 'users', user.uid, 'unitXP', actualUnitId.toString());
                await updateDoc(unitXPRef, {
                    totalXP: increment(adjustedPointsChange),
                    lastUpdated: serverTimestamp()
                });
                console.log(`Firestore XP updated for Unit ${actualUnitId} by ${adjustedPointsChange}`);

                // Save answer log (consider moving this outside the conditional update if needed)
                const answerData = {
                    userId: user.uid,
                    questionId: questionId,
                    unitId: actualUnitId,
                    subject: subject,
                    selectedAnswer: answerLetter,
                    isCorrect: isCorrect,
                    lessonIDS: lessonIDS || [], 
                    timestamp: serverTimestamp(),
                    xpChange: adjustedPointsChange // Log adjusted change
                };
                const userAnswersColRef = collection(db, 'users', user.uid, 'mcqAnswers');
                await addDoc(userAnswersColRef, answerData);
                // console.log(`Answer log saved for Q:${questionId}, Unit:${actualUnitId}`);

            } catch (error) {
                // Check if error is because the unitXP doc doesn't exist yet (shouldn't happen after select-subject)
                if (error instanceof Error && error.message.includes("No document to update")) {
                    console.warn(`UnitXP document for Unit ${actualUnitId} not found. Might need initialization.`);
                    // Optionally, attempt to create it here? Or rely on initialization step.
                } else {
                   console.error("Error updating XP or saving answer log:", error);
                }
            }
        } else {
             console.log(`No XP change needed for Unit ${actualUnitId} (already at floor or no change).`);
        }
      } else {
          if (!user) console.warn("User not logged in, XP not updated, answer log not saved.");
          if (actualUnitId === undefined) console.warn(`Could not determine unit ID for Q:${questionId} in current practice set, XP not updated, answer log not saved.`);
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

  return (
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
            // Pass 0 or a specific ID depending on mode if needed by component?
            // For sidebar link, UnitMCQs now determines unit from current question
            currentUnit={practiceMode === 'singleUnit' ? currentUnit : 0} 
            currentQuestionIndex={currentQuestionIndex}
            isLoggedIn={!!user}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
            questions={questionsForPractice}
            onPreviousQuestion={handlePreviousQuestion}
            onQuestionSelect={handleQuestionSelect}
            onUnitChange={handleUnitChange} // Still needed for dropdown in single unit mode?
            answeredQuestions={answeredQuestions}
            units={unitsData}
            dojoProgress={dojoProgress}
            correctStreak={correctStreak}
            // Indicate mode if needed (e.g., to hide unit dropdown)
            isWeakestUnitsMode={practiceMode === 'weakest' || practiceMode === 'custom'} 
            totalQuestions={totalQuestionsInSet}
            unitName={currentUnitName}
            subject={subject} 
            practiceUnitIds={relevantUnitIdsForDisplay}
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
