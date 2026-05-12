'use client';
 
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Lock, ArrowRight, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { loadStripe } from '@stripe/stripe-js';
import { useCreditSystem } from '@/hooks/useCreditSystem';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems'; // Reverted import
import { Question as QuestionType } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import dojoIcon from "../../../public/images/dojoIcon.png"
import { Button } from "@/components/ui/button";
import { videos as allVideos, Video } from '@/data/videos';
import {
  macroUnits as allMacroUnitsData,
  microUnits as allMicroUnitsData,
  govUnits as allGovUnitsData,
} from '@/data/cheatSheets';
import { macroLessons, microLessons } from '@/data/lessons'; // Import lessons
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { logger } from '@/utils/logger';
import { getSubjectSlug, getUnitSlug } from '@/lib/practiceSlugs';
import { hasValidSeasonPass } from '@/lib/utils';
import type { CourseSubject } from '@/lib/courseSubject';
import { apQuestionSubjectTag } from '@/lib/courseSubject';
import { shufflePracticeQuestions } from '@/lib/shufflePracticeQuestions';
import { hasAdminRole } from '@/lib/adminAccess';

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
  logger.debug("[Calc] Starting calculation with", answers?.length, "answers.");
  if (!answers || answers.length === 0) return [];

  const unitStats: { [key: number]: UnitStats } = {};
  let processedCount = 0;

  // 1. Aggregate stats per unit ID
  answers.forEach((answer, index) => {
    // Debug log uses answer.unitId now
    if (index < 5) {
       logger.debug(`[Calc] Answer ${index} unitId value:`, answer.unitId, typeof answer.unitId);
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
             logger.warn(`[Calc] Answer ${index} has invalid unitId:`, answer.unitId);
        }
    }
  });

  logger.debug("[Calc] Aggregated unitStats:", unitStats);
  logger.debug(`[Calc] Processed ${processedCount} answers with valid numeric unit IDs.`);

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

  logger.debug("[Calc] Final unitsWithStats (sorted by Unit ID):", unitsWithStats);

  // 4. Return
  return unitsWithStats;
}

function AccessDenied({
  unitId,
  subject,
  isCreditLimit = false,
}: {
  unitId: string;
  subject: CourseSubject;
  isCreditLimit?: boolean;
}) {
  const unitNum = parseInt(unitId, 10);
  const unitData =
    subject === 'gov'
      ? allGovUnitsData.find((u) => u.number === unitNum)
      : subject === 'micro'
        ? allMicroUnitsData.find((u) => u.number === unitNum)
        : allMacroUnitsData.find((u) => u.number === unitNum);
  const price = unitData?.price || 4.99;
  const btnClass =
    subject === 'gov'
      ? 'bg-violet-600 hover:bg-violet-700'
      : subject === 'micro'
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-blue-500 hover:bg-blue-600';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 pb-12">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
        <Lock className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isCreditLimit ? 'Daily Limit Reached' : 'Purchase Required'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isCreditLimit 
            ? 'You\'ve used all 3 free practice questions for today. Your limit will reset tomorrow, or upgrade to unlimited access!'
            : 'You need to purchase this test to access the full set of practice questions.'}
        </p>
        <div className="space-y-3">
          <Link 
            href={`/purchase/season-pass?courseType=${subject}`}
            className="inline-block w-full"
          >
            <Button size="lg" className={`w-full ${btnClass}`}>
              Get Unlimited Access
            </Button>
          </Link>
          {!isCreditLimit && (
            <Link 
              href={`/purchase/mcq-practice?units=${unitId}&total=${price}&subject=${subject}`}
              className="inline-block w-full"
            >
              <Button size="lg" variant="outline" className="w-full">
                Purchase Unit {unitId} Test
              </Button>
            </Link>
          )}
        </div>
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
    loadingUserData,
    mcqAnswersData, 
    loadingMcqData, 
    correctStreak,
    setCorrectStreak,
    isNextQuestionDoubleXp,
    setIsNextQuestionDoubleXp,
    awardXp,
  } = useAuthContext();
  const { isPremium } = useCreditSystem();
  
  // --- Access Control State ---
  const [hasAccess, setHasAccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const DAILY_FREE_ANSWERS = 3;
  const [dailyQuestionsAnswered, setDailyQuestionsAnswered] = useState(0);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);
  const [hasDismissedSeasonPassModal, setHasDismissedSeasonPassModal] = useState(false);

  const getLocalDateKey = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDailyLimitStorageKey = (uid: string | null | undefined) =>
    `dailyQuestionsAnswered:${uid ?? 'guest'}`;

  const isPremiumEffective = Boolean(user) && isPremium;

  const readDailyCount = () => {
    if (typeof window === 'undefined') return 0;
    const key = getDailyLimitStorageKey(user?.uid);
    const raw = localStorage.getItem(key);
    const today = getLocalDateKey(new Date());
    if (!raw) return 0;
    try {
      const parsed = JSON.parse(raw) as { date?: string; count?: number };
      if (parsed?.date !== today) return 0;
      const count = typeof parsed?.count === 'number' && Number.isFinite(parsed.count) ? parsed.count : 0;
      return Math.max(0, count);
    } catch {
      return 0;
    }
  };

  const writeDailyCount = (count: number) => {
    if (typeof window === 'undefined') return;
    const key = getDailyLimitStorageKey(user?.uid);
    const today = getLocalDateKey(new Date());
    localStorage.setItem(key, JSON.stringify({ date: today, count }));
  };

  // Load daily answered count from localStorage (per-user or guest), reset daily
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const key = getDailyLimitStorageKey(user?.uid);
    const raw = localStorage.getItem(key);
    const today = getLocalDateKey(new Date());

    if (!raw) {
      setDailyQuestionsAnswered(0);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { date?: string; count?: number };
      if (parsed?.date !== today) {
        localStorage.setItem(key, JSON.stringify({ date: today, count: 0 }));
        setDailyQuestionsAnswered(0);
        return;
      }
      const count = typeof parsed?.count === 'number' && Number.isFinite(parsed.count) ? parsed.count : 0;
      const dailyCount = Math.max(0, count);
      setDailyQuestionsAnswered(dailyCount);
      
      // If user has already reached their limit and hasn't dismissed the modal, show it
      if (!isPremiumEffective && dailyCount >= DAILY_FREE_ANSWERS && !hasDismissedSeasonPassModal) {
        // Small delay to ensure component is fully rendered
        const timer = setTimeout(() => {
          setShowSeasonPassModal(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      localStorage.setItem(key, JSON.stringify({ date: today, count: 0 }));
      setDailyQuestionsAnswered(0);
    }
  }, [user, isPremiumEffective, hasDismissedSeasonPassModal]);

  // Determine Subject and Mode from params
  const subjectParam = searchParams.get('subject');
  const subject: CourseSubject =
    subjectParam === 'macro' || subjectParam === 'micro' || subjectParam === 'gov' ? subjectParam : 'macro';
  const unitsParam = searchParams.get('units');
  const currentUnitForAccessCheck = unitsParam ? unitsParam.split(',')[0] : '1';
  const lessonIdParam = searchParams.get('lessonId');
  const modeParam = searchParams.get('mode');
  const testMode = searchParams.get('test') === 'true'; // Enable test questions when ?test=true
  const unitsData =
    subject === 'gov' ? allGovUnitsData : subject === 'micro' ? allMicroUnitsData : allMacroUnitsData;
  const uiSpin =
    subject === 'macro' ? 'text-blue-500' : subject === 'micro' ? 'text-green-500' : 'text-violet-600';
  const uiCircle = subject === 'macro' ? 'bg-blue-100' : subject === 'micro' ? 'bg-green-100' : 'bg-violet-100';
  const uiPrimary =
    subject === 'macro'
      ? 'bg-blue-500 hover:bg-blue-600'
      : subject === 'micro'
        ? 'bg-green-500 hover:bg-green-600'
        : 'bg-violet-600 hover:bg-violet-700';
  const uiOutline =
    subject === 'macro'
      ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
      : subject === 'micro'
        ? 'border-green-500 text-green-600 hover:bg-green-50'
        : 'border-violet-600 text-violet-700 hover:bg-violet-50';

  const initialCustomUnitIds = unitsParam 
      ? unitsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
      : [];

  // Set practice mode based on params
  type PracticeMode = 'singleUnit' | 'weakest' | 'custom' | 'topic';
  const initialPracticeMode: PracticeMode = 
      modeParam === 'weakest' ? 'weakest' :
      modeParam === 'custom' ? 'custom' :
      modeParam === 'topic' ? 'topic' :
      'singleUnit';

  // Redirect single unit mode to new route structure for better SEO
  useEffect(() => {
    // Only redirect if:
    // 1. Single unit (units param contains only one unit number)
    // 2. Not in test mode
    // 3. Not topic mode (lessonIdParam)
    // 4. Not weakest mode (weakest mode needs special handling)
    const firstUnit = initialCustomUnitIds[0];
    const unitOkForRedirect =
      initialCustomUnitIds.length === 1 &&
      firstUnit >= 1 &&
      (subject === 'gov' ? firstUnit === 1 : firstUnit <= 6);
    if (!testMode && !lessonIdParam && initialPracticeMode !== 'weakest' && unitOkForRedirect) {
      const unitNumber = firstUnit;
      const subjectSlug = getSubjectSlug(subject);
      const unitSlug = getUnitSlug(unitNumber, subject);
      const newUrl = `/mcq-practice/${subjectSlug}/${unitSlug}`;
      
      // Only redirect if we're not already on the new URL
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/mcq-practice/')) {
        router.replace(newUrl);
        return; // Exit early to prevent rendering old page
      }
    }
  }, [initialPracticeMode, testMode, lessonIdParam, initialCustomUnitIds, subject, router]);

  const [practiceMode, setPracticeMode] = useState<PracticeMode>(initialPracticeMode);
  const [currentUnit, setCurrentUnit] = useState<number>(initialCustomUnitIds[0] || 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  const [questionsForPractice, setQuestionsForPractice] = useState<QuestionType[]>([]);
  
  // Log currentQuestionIndex changes
  useEffect(() => {
    console.log('[Parent] currentQuestionIndex changed to:', currentQuestionIndex, {
      questionId: questionsForPractice[currentQuestionIndex]?.id,
      totalQuestions: questionsForPractice.length
    });
  }, [currentQuestionIndex, questionsForPractice]);
  const [isLoadingQuestionSet, setIsLoadingQuestionSet] = useState(true);
  const [customUnitIds, setCustomUnitIds] = useState<number[]>(initialCustomUnitIds);
  const [weakestUnitIds, setWeakestUnitIds] = useState<number[]>([]);
  const [dojoProgress, setDojoProgress] = useState(0);
  const [hasConsumedDailyCredit, setHasConsumedDailyCredit] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [totalQuestionsInSet, setTotalQuestionsInSet] = useState(0);
  const [currentUnitName, setCurrentUnitName] = useState('');
  const [showAllQuestions, setShowAllQuestions] = useState(false); // Bypass filter to show all questions
  const purchasedTests = (userData?.purchasedTests || []) as string[];

  // Developer tool: Test specific question by ID
  const [testQuestionId, setTestQuestionId] = useState<string>("");
  const isDeveloper = user?.email === 'garrett@apdojo.com' || user?.email === 'garrettmould@gmail.com' || (typeof window !== 'undefined' && window.location.hostname === 'localhost');
  
  // Track previous filter criteria to prevent unnecessary reloads
  const prevFilterCriteriaRef = useRef<string>('');

  const hasTestModeAccess =
    !!user &&
    practiceMode === 'singleUnit' &&
    currentUnit > 0 &&
    (
      hasValidSeasonPass(userData, subject) ||
      purchasedTests.includes(String(currentUnit))
    );

  // Calculate weakest units from MCQ answers
  useEffect(() => {
    if (practiceMode === 'weakest' && mcqAnswersData && !loadingMcqData) {
      const weakest = calculateWeakestUnits(mcqAnswersData);
      const sortedByWeakest = [...weakest].sort((a, b) => a.percentage - b.percentage);
      const weakestIds = sortedByWeakest.slice(0, 3).map(u => u.unitId);
      setWeakestUnitIds(weakestIds);
      logger.debug('[UnitMCQPractice] Weakest units calculated:', weakestIds);
    }
  }, [mcqAnswersData, loadingMcqData, practiceMode]);

  // Load questions based on practice mode
  useEffect(() => {
    // Create a unique key for the current filter criteria
    const filterKey = JSON.stringify({
      practiceMode,
      currentUnit,
      customUnitIds: customUnitIds.sort().join(','),
      weakestUnitIds: weakestUnitIds.sort().join(','),
      lessonIdParam,
      subject,
      testQuestionId,
      showAllQuestions,
      loadingMcqData: loadingMcqData ? 'loading' : 'loaded'
    });
    
    // Only reload if filter criteria actually changed
    if (filterKey === prevFilterCriteriaRef.current) {
      console.log('[Parent] Filter criteria unchanged, skipping reload', {
        currentIndex: currentQuestionIndex
      });
      return;
    }
    
    console.log('[Parent] useEffect (load questions) triggered', {
      practiceMode,
      currentUnit,
      customUnitIds,
      weakestUnitIds,
      lessonIdParam,
      subject,
      testQuestionId,
      isDeveloper,
      user: !!user,
      loadingMcqData,
      showAllQuestions,
      currentQuestionIndex,
      filterKeyChanged: filterKey !== prevFilterCriteriaRef.current
    });
    
    // Update the ref with the new filter criteria
    prevFilterCriteriaRef.current = filterKey;
    
    // Skip normal loading if we're in test mode (testQuestionId is set)
    if (isDeveloper && testQuestionId) {
      console.log('[Parent] Skipping question load - test mode');
      return;
    }

    // Wait for MCQ data to load if user is logged in (to avoid filtering issues)
    if (user && loadingMcqData) {
      console.log('[Parent] Waiting for MCQ data to load');
      setIsLoadingQuestionSet(true);
      return;
    }

    // Normal question loading
    console.log('[Parent] Starting question loading...');
    setIsLoadingQuestionSet(true);
    let questions: QuestionType[] = [];
    const subjectFilter = apQuestionSubjectTag(subject);

    if (practiceMode === 'topic' && lessonIdParam) {
      // Topic mode: filter by lessonId
      questions = allQuestions.filter(q => 
        q.subject === subjectFilter && 
        q.lessonIDS && 
        q.lessonIDS.includes(lessonIdParam) &&
        (testMode || !q.isTest) // Exclude test questions unless test mode is enabled
      );
    } else if (practiceMode === 'singleUnit') {
      // Single unit mode
      questions = allQuestions.filter(q => 
        q.subject === subjectFilter && 
        q.unit === currentUnit &&
        (testMode || !q.isTest) // Exclude test questions unless test mode is enabled
      );
    } else if (practiceMode === 'custom' && customUnitIds.length > 0) {
      // Custom units mode
      questions = allQuestions.filter(q => 
        q.subject === subjectFilter && 
        customUnitIds.includes(q.unit) &&
        (testMode || !q.isTest) // Exclude test questions unless test mode is enabled
      );
    } else if (practiceMode === 'weakest' && weakestUnitIds.length > 0) {
      // Weakest units mode
      questions = allQuestions.filter(q => 
        q.subject === subjectFilter && 
        weakestUnitIds.includes(q.unit) &&
        (testMode || !q.isTest) // Exclude test questions unless test mode is enabled
      );
    }

    // Filter out correctly answered questions (unless showAllQuestions is true)
    // Only filter if user is logged in and data is loaded (or user is not logged in)
    if (!showAllQuestions && (!user || (user && mcqAnswersData && !loadingMcqData))) {
      if (user && mcqAnswersData) {
        // Create a set of question IDs that have been answered correctly
        // Handle both string and number questionIds (Firestore may store as string)
        const correctlyAnsweredQuestionIds = new Set<number>();
        mcqAnswersData.forEach((answer: McqAnswer) => {
          if (answer.isCorrect) {
            // Convert questionId to number if it's a string, or use it directly if it's already a number
            const questionIdNum = typeof answer.questionId === 'string' 
              ? parseInt(answer.questionId, 10) 
              : answer.questionId;
            
            // Only add if it's a valid number
            if (!isNaN(questionIdNum) && typeof questionIdNum === 'number') {
              correctlyAnsweredQuestionIds.add(questionIdNum);
            }
          }
        });

        // Filter out questions that have been answered correctly
        questions = questions.filter(q => !correctlyAnsweredQuestionIds.has(q.id));
        
        console.log('[Parent] Filtered out correctly answered questions', {
          totalCorrectlyAnswered: correctlyAnsweredQuestionIds.size,
          remainingQuestions: questions.length
        });
      }
    }

    const shuffled = shufflePracticeQuestions(questions);
    console.log('[Parent] Questions loaded and shuffled', {
      questionCount: shuffled.length,
      previousIndex: currentQuestionIndex,
      resettingIndexTo: 0
    });
    setQuestionsForPractice(shuffled);
    setTotalQuestionsInSet(shuffled.length);
    setCurrentQuestionIndex(0); // ⚠️ This resets the index - could cause jumping!
    setAnsweredQuestions({});
    
    // Set unit name for display
    if (practiceMode === 'singleUnit') {
      const unit = unitsData.find(u => u.number === currentUnit);
      setCurrentUnitName(unit ? `Unit ${currentUnit}: ${unit.title}` : `Unit ${currentUnit}`);
    } else if (practiceMode === 'custom' && customUnitIds.length > 0) {
      setCurrentUnitName(`Custom Practice (${customUnitIds.length} units)`);
    } else if (practiceMode === 'weakest' && weakestUnitIds.length > 0) {
      setCurrentUnitName(`Weakest Units Practice`);
    } else if (practiceMode === 'topic' && lessonIdParam) {
      setCurrentUnitName(`Topic Practice`);
    } else {
      setCurrentUnitName('Practice');
    }

    setIsLoadingQuestionSet(false);
  }, [practiceMode, currentUnit, customUnitIds, weakestUnitIds, lessonIdParam, subject, testQuestionId, isDeveloper, showAllQuestions, user, loadingMcqData]);

  // Access control check and credit status
  useEffect(() => {
    setHasAccess(true);
    setIsVerifying(false);
  }, [user, userData, isPremium, currentUnitForAccessCheck, practiceMode]);

  const handleEnterTestMode = () => {
    if (!user) {
      // Show season pass modal for guest users trying to access test mode
      if (!hasDismissedSeasonPassModal) {
        setShowSeasonPassModal(true);
      }
      return;
    }

    const price =
      unitsData.find(u => u.number === currentUnit)?.price || 4.99;

    const hasSeasonPassAccess = hasValidSeasonPass(userData, subject);
    const hasPurchasedUnitTest = purchasedTests.includes(String(currentUnit));

    if (!hasSeasonPassAccess && !hasPurchasedUnitTest) {
      // Redirect to purchase page for this unit test
      router.push(
        `/purchase/mcq-practice?units=${currentUnit}&total=${price}&subject=${subject}`
      );
      return;
    }

    const testHref =
      subject === 'gov'
        ? `/ap-gov-unit-${currentUnit}-mcq-test`
        : `/ap-${subject}-unit-${currentUnit}-mcq-test`;
    router.push(testHref);
  };

  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
    logger.debug('[UnitMCQ] handleAnswer called:', { questionId, answerLetter, isCorrect, hasAwardXp: !!awardXp });
    
    // Check if this is a new question (not already answered)
    const isNewQuestion = !answeredQuestions[questionId];
    
    // Daily free-answer limit for ALL non-premium users (guest or logged-in)
    if (!isPremiumEffective && isNewQuestion) {
      const currentCount = readDailyCount();
      if (currentCount >= DAILY_FREE_ANSWERS) {
        if (!hasDismissedSeasonPassModal) {
          setShowSeasonPassModal(true);
        }
        return; // Don't process the answer
      }
      const nextCount = currentCount + 1;
      writeDailyCount(nextCount);
      setDailyQuestionsAnswered(nextCount);

      // Show Season Pass modal after the 3rd answer (delayed),
      // so the student sees their feedback first.
      if (
        nextCount === DAILY_FREE_ANSWERS &&
        !hasDismissedSeasonPassModal
      ) {
        window.setTimeout(() => {
          // Re-check on timeout in case they upgraded/dismissed
          if (!hasDismissedSeasonPassModal) {
            setShowSeasonPassModal(true);
          }
        }, 500);
      }
    }
    
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));

    // Save to Firestore if logged in
    if (user && isCorrect !== undefined) {
      try {
        const question = allQuestions.find(q => q.id === questionId);
        if (question) {
          const answerData: McqAnswer = {
            questionId: questionId,
            isCorrect: isCorrect,
            unitId: question.unit,
            lessonIDS: lessonIDS || question.lessonIDS || [],
            timestamp: serverTimestamp()
          };

          await addDoc(collection(db, 'users', user.uid, 'mcqAnswers'), answerData);
          
          // Update streak
          if (isCorrect) {
            setCorrectStreak(prev => prev + 1);
          } else {
            setCorrectStreak(0);
          }
        }
      } catch (error) {
        console.error('Error saving answer:', error);
      }
    }

    // Note: XP is awarded in unitMCQS.tsx handleAnswerSelection, not here
    // to avoid double-awarding
  };

  const handleNextQuestion = () => {
    console.log('[Parent] handleNextQuestion called', {
      currentIndex: currentQuestionIndex,
      totalQuestions: questionsForPractice.length,
      canGoNext: currentQuestionIndex < questionsForPractice.length - 1
    });
    if (currentQuestionIndex < questionsForPractice.length - 1) {
      setCurrentQuestionIndex(prev => {
        const nextIndex = prev + 1;
        console.log('[Parent] setCurrentQuestionIndex: prev =', prev, 'next =', nextIndex);
        return nextIndex;
      });
    } else {
      console.log('[Parent] handleNextQuestion: Cannot go next, already at last question');
    }
  };

  const handlePreviousQuestion = () => {
    console.log('[Parent] handlePreviousQuestion called', {
      currentIndex: currentQuestionIndex,
      canGoPrev: currentQuestionIndex > 0
    });
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => {
        const nextIndex = prev - 1;
        console.log('[Parent] setCurrentQuestionIndex (prev): prev =', prev, 'next =', nextIndex);
        return nextIndex;
      });
    }
  };

  const handleQuestionSelect = (index: number) => {
    console.log('[Parent] handleQuestionSelect called', {
      requestedIndex: index,
      currentIndex: currentQuestionIndex,
      totalQuestions: questionsForPractice.length
    });
    setCurrentQuestionIndex(index);
  };

  const handleUnitChange = (unitNumber: number) => {
    setCurrentUnit(unitNumber);
    setCurrentQuestionIndex(0);
  };

  // Keyboard navigation: Left/Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        // Don't handle if a modal is open
        showLoginModal ||
        showSignupModal ||
        showSeasonPassModal ||
        // Don't handle if navigation is disabled
        (!isPremiumEffective && dailyQuestionsAnswered >= DAILY_FREE_ANSWERS)
      ) {
        return;
      }

      // Left arrow key - previous question
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePreviousQuestion();
      }
      // Right arrow key - next question
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextQuestion, handlePreviousQuestion, showLoginModal, showSignupModal, showSeasonPassModal, isPremiumEffective, dailyQuestionsAnswered]);

  const relevantUnitIdsForDisplay = 
      practiceMode === 'weakest' ? weakestUnitIds : 
      practiceMode === 'custom' ? customUnitIds : 
      practiceMode === 'singleUnit' ? [currentUnit] : 
      [];

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const canAccessGov = Boolean(user && hasAdminRole(userData));
  if (subject === 'gov') {
    if (loadingUserData) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className={`h-12 w-12 animate-spin ${uiSpin}`} />
        </div>
      );
    }
    if (!canAccessGov) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 pb-12 px-4">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-md w-full text-center">
            <Lock className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">AP Gov is in admin preview</h2>
            <p className="text-gray-600 mb-6">
              This content is currently restricted to admin accounts.
            </p>
            <Link href="/ap-macro-practice-tests" className="inline-flex w-full">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Back to practice tests
              </Button>
            </Link>
          </div>
        </div>
      );
    }
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className={`h-12 w-12 animate-spin ${uiSpin}`} />
      </div>
    );
  }

  if (!hasAccess) {
    // AccessDenied is only for purchase-required scenarios
    // Credit limit is handled by the modal overlay, not this component
    return <AccessDenied unitId={currentUnitForAccessCheck} subject={subject} isCreditLimit={false} />;
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
      {/* Season Pass Modal (daily limit for non-premium users) */}
      {showSeasonPassModal && (
        <SeasonPassModal
          subject={subject}
          onClose={() => {
            setShowSeasonPassModal(false);
            setHasDismissedSeasonPassModal(true);
          }}
        />
      )}
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8 pt-8">
          {isLoadingQuestionSet ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className={`h-12 w-12 animate-spin ${uiSpin}`} />
            </div>
          ) : questionsForPractice.length === 0 && !showAllQuestions && practiceMode === 'singleUnit' ? (
            // Congratulations panel - user has mastered the unit
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${uiCircle} mb-4`}>
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-700">
                    You have mastered {currentUnitName}
                  </p>
                </div>
                <div className="space-y-4 mt-8">
                  <Link href={`/select-practice-units?subject=${subject}`} className="block">
                    <Button 
                      size="lg" 
                      className={`w-full ${uiPrimary} text-white font-semibold text-lg py-6`}
                    >
                      Practice another unit
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => {
                      setShowAllQuestions(true);
                    }}
                    className={`w-full border-2 ${uiOutline} font-semibold text-lg py-6`}
                  >
                    Keep Practicing {currentUnitName}
                  </Button>
                </div>
              </div>
            </div>
          ) : questionsForPractice.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No questions available for the selected mode.</p>
            </div>
          ) : (
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
              isTopicMode={practiceMode === 'topic'}
              totalQuestions={totalQuestionsInSet}
              unitName={currentUnitName}
              subject={subject}
              practiceUnitIds={relevantUnitIdsForDisplay}
              isParentModalOpen={showLoginModal || showSignupModal}
              hasTestModeAccess={hasTestModeAccess}
              onEnterTestMode={handleEnterTestMode}
              isAnswerDisabled={
                (!isPremiumEffective && dailyQuestionsAnswered >= DAILY_FREE_ANSWERS)
              }
              onLoginPrompt={() => {
                if (!isPremiumEffective && dailyQuestionsAnswered >= DAILY_FREE_ANSWERS) {
                  if (!hasDismissedSeasonPassModal) {
                    setShowSeasonPassModal(true);
                  }
                }
              }}
              isNavigationDisabled={
                (!isPremiumEffective && dailyQuestionsAnswered >= DAILY_FREE_ANSWERS)
              }
            />
          )}
        </div>
      </div>
    </>
  );
}

function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
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



