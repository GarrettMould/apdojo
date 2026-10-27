'use client';
 
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Lock, ArrowRight, CheckCircle2, Star, ShieldCheck, Pen, Sigma } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { loadStripe } from '@stripe/stripe-js';
import { useCreditSystem } from '@/hooks/useCreditSystem';
import { UnitMCQs } from '@/components/unitMCQS';
import { useQuestionBank } from '@/hooks/useQuestionBank';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { statsMcqPracticeQuestions } from '@/data/stats/statsMcqPractice';
import { govMcqPracticeQuestions } from '@/data/gov/govMcqPractice';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import dojoIcon from "../../../public/images/dojoIcon.png"
import { Button } from "@/components/ui/button";
import { videos as allVideos, Video } from '@/data/videos';
import {
  macroUnits as allMacroUnitsData,
  microUnits as allMicroUnitsData,
  govUnits as allGovUnitsData,
  statsUnits as allStatsUnitsData,
} from '@/data/cheatSheets';
import { macroLessons, microLessons } from '@/data/lessons'; // Import lessons
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { logger } from '@/utils/logger';
import { getSubjectSlug, getUnitSlug } from '@/lib/practiceSlugs';
import { hasValidSeasonPass } from '@/lib/utils';
import type { CourseSubject } from '@/lib/courseSubject';
import {
  apQuestionSubjectTag,
  isCourseSubject,
  isGovMcqPracticeUnitAvailable,
  isStatsMcqPracticeUnitAvailable,
} from '@/lib/courseSubject';
import { shufflePracticeQuestions } from '@/lib/shufflePracticeQuestions';
import { REMATCH_ENABLED } from '@/lib/reviewFolder';
import { ReviewFolderButton } from '@/components/review-folder/ReviewFolderButton';
import { ReviewFolderPanel } from '@/components/review-folder/ReviewFolderPanel';
import { PracticePacketModal } from '@/components/practice-packet/PracticePacketModal';
import {
  clearReviewFolder,
  loadReviewFolder,
  loadMergedReviewFolders,
  loadReviewFolderFromCloud,
  saveReviewFolder,
  saveReviewFolderToCloud,
  applyAnswerHistoryToReviewFolder,
  filterReviewFolderBySubject,
  missedQuestionIds,
  previewFromQuestion,
  recordCorrect,
  recordMiss,
  removeMiss,
  rollupByLesson,
  type ReviewFolderState,
} from '@/lib/reviewFolder';
import {
  assemblePracticePacket,
  PRACTICE_PACKET_SESSION_KEY,
  type PracticePacket,
} from '@/lib/practicePacket';

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
      : subject === 'stats'
        ? allStatsUnitsData.find((u) => u.number === unitNum)
        : subject === 'micro'
          ? allMicroUnitsData.find((u) => u.number === unitNum)
          : allMacroUnitsData.find((u) => u.number === unitNum);
  const price = unitData?.price || 4.99;
  const btnClass =
    subject === 'gov'
      ? 'bg-violet-600 hover:bg-violet-700'
      : subject === 'stats'
        ? 'bg-orange-600 hover:bg-orange-700'
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
  const questionBank = useQuestionBank();
  const allQuestions = questionBank ?? [];
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
    selectedSubject,
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
  const subject: CourseSubject = isCourseSubject(subjectParam)
    ? subjectParam
    : isCourseSubject(selectedSubject)
      ? selectedSubject
      : 'macro';
  const unitsParam = searchParams.get('units');
  const currentUnitForAccessCheck = unitsParam ? unitsParam.split(',')[0] : '1';
  const lessonIdParam = searchParams.get('lessonId');
  const modeParam = searchParams.get('mode');
  const testMode = searchParams.get('test') === 'true'; // Enable test questions when ?test=true
  const unitsData =
    subject === 'gov'
      ? allGovUnitsData
      : subject === 'stats'
        ? allStatsUnitsData
        : subject === 'micro'
          ? allMicroUnitsData
          : allMacroUnitsData;
  const uiSpin =
    subject === 'macro'
      ? 'text-blue-500'
      : subject === 'micro'
        ? 'text-green-500'
        : subject === 'stats'
          ? 'text-orange-600'
          : 'text-violet-600';
  const uiCircle =
    subject === 'macro'
      ? 'bg-blue-100'
      : subject === 'micro'
        ? 'bg-green-100'
        : subject === 'stats'
          ? 'bg-orange-100'
          : 'bg-violet-100';
  const uiPrimary =
    subject === 'macro'
      ? 'bg-blue-500 hover:bg-blue-600'
      : subject === 'micro'
        ? 'bg-green-500 hover:bg-green-600'
        : subject === 'stats'
          ? 'bg-orange-600 hover:bg-orange-700'
          : 'bg-violet-600 hover:bg-violet-700';
  const uiOutline =
    subject === 'macro'
      ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
      : subject === 'micro'
        ? 'border-green-500 text-green-600 hover:bg-green-50'
        : subject === 'stats'
          ? 'border-orange-600 text-orange-700 hover:bg-orange-50'
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
      (subject === 'gov'
        ? isGovMcqPracticeUnitAvailable(firstUnit)
        : subject === 'stats'
          ? isStatsMcqPracticeUnitAvailable(firstUnit)
          : firstUnit <= 6);
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

  // Review folder + scratch pad (same chrome as /mcq-practice/...)
  const [scratchToggleSignal, setScratchToggleSignal] = useState(0);
  const [scratchActive, setScratchActive] = useState<'draw' | 'notes' | null>(null);
  const [formulaToggleSignal, setFormulaToggleSignal] = useState(0);
  const [formulaSheetOpen, setFormulaSheetOpen] = useState(false);
  const [reviewState, setReviewState] = useState<ReviewFolderState>({
    version: 1,
    misses: [],
    lessonWarmth: {},
  });
  const [reviewFolderOpen, setReviewFolderOpen] = useState(false);
  const [reviewPulseKey, setReviewPulseKey] = useState(0);
  const [justFiledQuestionId, setJustFiledQuestionId] = useState<number | null>(null);
  const [practiceMissedMode, setPracticeMissedMode] = useState(false);
  const [practiceMissedUnitFilter, setPracticeMissedUnitFilter] = useState<
    number[] | null
  >(null);
  const [practicePacketOpen, setPracticePacketOpen] = useState(false);
  const [practicePacketBuilding, setPracticePacketBuilding] = useState(false);
  const [practicePacketError, setPracticePacketError] = useState<string | null>(null);
  const [practicePacket, setPracticePacket] = useState<PracticePacket | null>(null);
  const reviewUserKey = user?.uid ?? 'guest';

  // Developer tool: Test specific question by ID
  const [testQuestionId, setTestQuestionId] = useState<string>("");
  const [devJumpId, setDevJumpId] = useState('');
  const [devJumpError, setDevJumpError] = useState<string | null>(null);
  const isDeveloper = user?.email === 'garrett@apdojo.com' || user?.email === 'garrettmould@gmail.com' || (typeof window !== 'undefined' && window.location.hostname === 'localhost');
  
  // Track previous filter criteria to prevent unnecessary reloads
  const prevFilterCriteriaRef = useRef<string>('');

  const reviewUnitIds =
    practiceMode === 'custom'
      ? customUnitIds
      : practiceMode === 'weakest'
        ? weakestUnitIds
        : practiceMode === 'singleUnit'
          ? [currentUnit]
          : customUnitIds.length > 0
            ? customUnitIds
            : [currentUnit];

  const primaryReviewUnit = reviewUnitIds[0] ?? currentUnit;
  const reviewUnitLabel =
    reviewUnitIds.length > 1
      ? `Units ${reviewUnitIds.join(', ')}`
      : `Unit ${primaryReviewUnit}`;

  const persistReviewUnit = (unitNumber: number, next: ReviewFolderState) => {
    saveReviewFolder(reviewUserKey, subject, unitNumber, next);
    if (user?.uid) {
      void saveReviewFolderToCloud(user.uid, subject, unitNumber, next).catch(
        (err) => console.error('[ReviewFolder] cloud save failed:', err)
      );
    }
  };

  const refreshMergedReview = () => {
    const merged = filterReviewFolderBySubject(
      loadMergedReviewFolders(reviewUserKey, subject, reviewUnitIds),
      subject,
      allQuestions
    );
    setReviewState(merged);
    return merged;
  };

  // Hydrate review folders for all units in this session
  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      if (!questionBank) return;
      if (reviewUnitIds.length === 0) return;

      let merged = loadMergedReviewFolders(reviewUserKey, subject, reviewUnitIds);

      if (user?.uid) {
        try {
          for (const unitNumber of reviewUnitIds) {
            const cloud = await loadReviewFolderFromCloud(
              user.uid,
              subject,
              unitNumber
            );
            if (cloud.exists) {
              saveReviewFolder(reviewUserKey, subject, unitNumber, cloud.state);
            } else {
              const local = loadReviewFolder(reviewUserKey, subject, unitNumber);
              if (local.misses.length > 0) {
                void saveReviewFolderToCloud(
                  user.uid,
                  subject,
                  unitNumber,
                  local
                );
              }
            }
          }
          merged = loadMergedReviewFolders(reviewUserKey, subject, reviewUnitIds);
        } catch (err) {
          console.error('[ReviewFolder] cloud load failed:', err);
        }
      }

      if (cancelled) return;
      merged = filterReviewFolderBySubject(merged, subject, allQuestions);
      setReviewState(merged);
      setJustFiledQuestionId(null);
      setPracticeMissedMode(false);
      setPracticeMissedUnitFilter(null);
      setReviewFolderOpen(false);

      if (
        user?.uid &&
        merged.misses.length === 0 &&
        !loadingMcqData &&
        Array.isArray(mcqAnswersData) &&
        mcqAnswersData.length > 0
      ) {
        for (const unitNumber of reviewUnitIds) {
          const cloud = await loadReviewFolderFromCloud(
            user.uid,
            subject,
            unitNumber
          );
          if (cloud.exists) continue;
          const seeded = applyAnswerHistoryToReviewFolder(
            loadReviewFolder(reviewUserKey, subject, unitNumber),
            mcqAnswersData,
            { subject, unitNumber, bankQuestions: allQuestions }
          );
          const scoped = filterReviewFolderBySubject(seeded, subject, allQuestions);
          if (scoped.misses.length > 0) {
            persistReviewUnit(unitNumber, scoped);
          }
        }
        if (!cancelled) refreshMergedReview();
      }
    };

    void hydrate();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionBank, reviewUserKey, subject, reviewUnitIds.join(','), user?.uid]);

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
    if (!questionBank) {
      setIsLoadingQuestionSet(true);
      return;
    }

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
      practiceMissedMode,
      practiceMissedUnitFilter: practiceMissedUnitFilter?.join(',') ?? '',
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
    if (practiceMissedMode) {
      const scopedMisses =
        practiceMissedUnitFilter && practiceMissedUnitFilter.length > 0
          ? reviewState.misses.filter((m) =>
              practiceMissedUnitFilter.includes(m.unitNumber)
            )
          : reviewState.misses;
      const order = missedQuestionIds({
        ...reviewState,
        misses: scopedMisses,
      });
      const missIds = new Set(order);
      questions = questions
        .filter((q) => missIds.has(q.id))
        .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    } else if (!showAllQuestions && (!user || (user && mcqAnswersData && !loadingMcqData))) {
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

    const shuffled = practiceMissedMode
      ? questions
      : shufflePracticeQuestions(questions);
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
  }, [questionBank, practiceMode, currentUnit, customUnitIds, weakestUnitIds, lessonIdParam, subject, testQuestionId, isDeveloper, showAllQuestions, practiceMissedMode, practiceMissedUnitFilter, reviewState.misses.length, user, loadingMcqData]);

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
        : subject === 'stats'
          ? `/ap-stats-unit-${currentUnit}-mcq-test`
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

    const question = allQuestions.find(q => q.id === questionId);
    const lessons = lessonIDS || question?.lessonIDS || [];
    const missUnit = question?.unit ?? primaryReviewUnit;

    if (isCorrect) {
      setJustFiledQuestionId((prev) => (prev === questionId ? null : prev));
      const unitState = recordCorrect(
        loadReviewFolder(reviewUserKey, subject, missUnit),
        questionId,
        lessons
      );
      persistReviewUnit(missUnit, unitState);
      refreshMergedReview();
    } else {
      const unitState = recordMiss(
        loadReviewFolder(reviewUserKey, subject, missUnit),
        {
          questionId,
          subject,
          unitNumber: missUnit,
          lessonIDS: lessons,
          selectedLetter: answerLetter,
          questionPreview: previewFromQuestion(
            question?.question || `Question ${questionId}`
          ),
        }
      );
      persistReviewUnit(missUnit, unitState);
      refreshMergedReview();
      setJustFiledQuestionId(questionId);
      setReviewPulseKey((n) => n + 1);
    }

    // Save to Firestore if logged in
    if (user && isCorrect !== undefined) {
      try {
        if (question) {
          const answerData: McqAnswer = {
            questionId: questionId,
            isCorrect: isCorrect,
            unitId: question.unit,
            lessonIDS: lessons,
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

  const handlePracticeMissed = (unitNumbers: number[]) => {
    setReviewFolderOpen(false);
    setPracticeMissedUnitFilter(
      unitNumbers.length > 0 ? unitNumbers : reviewUnitIds
    );
    setPracticeMissedMode(true);
    setShowAllQuestions(true);
    prevFilterCriteriaRef.current = '';
  };

  const handleOpenPracticePacket = async (unitNumbers: number[]) => {
    if (reviewState.misses.length === 0) return;

    const selected =
      unitNumbers.length > 0 ? unitNumbers : [primaryReviewUnit];
    const draft = assemblePracticePacket(
      reviewState,
      subject,
      selected[0] ?? primaryReviewUnit,
      allQuestions,
      selected
    );
    if (draft.chapters.length === 0) {
      setPracticePacketError('Could not build a packet from your misses yet.');
      setPracticePacketOpen(true);
      return;
    }

    setReviewFolderOpen(false);
    setPracticePacketOpen(true);
    setPracticePacketBuilding(true);
    setPracticePacketError(null);
    setPracticePacket({ ...draft });

    try {
      const explainerRes = await fetch('/api/generate-practice-packet-explainers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          unit: selected[0] ?? primaryReviewUnit,
          lessons: draft.chapters.map((ch) => ({
            lessonNumber: ch.lessonId,
            name: ch.lessonName,
            unit: ch.unitNumber,
            keyTerms: ch.keyTerms,
          })),
        }),
      });

      if (!explainerRes.ok) {
        const errorData = await explainerRes.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate explainers');
      }

      const explainerData = await explainerRes.json();
      const explainerByLesson = new Map<
        string,
        { eli5: string; analogy: string; commonMistake: string }
      >(
        (explainerData.explainers || []).map(
          (e: {
            lessonNumber: string;
            eli5: string;
            analogy: string;
            commonMistake: string;
          }) => [
            e.lessonNumber,
            {
              eli5: e.eli5,
              analogy: e.analogy,
              commonMistake: e.commonMistake,
            },
          ]
        )
      );

      const completed: PracticePacket = {
        ...draft,
        chapters: draft.chapters.map((ch) => ({
          ...ch,
          explainer: explainerByLesson.get(ch.lessonId) ?? null,
          checkQuestions: [],
        })),
        builtAt: Date.now(),
      };

      if (completed.chapters.some((ch) => !ch.explainer)) {
        throw new Error('Incomplete explainers. Please try again.');
      }

      setPracticePacket(completed);
      try {
        sessionStorage.setItem(PRACTICE_PACKET_SESSION_KEY, JSON.stringify(completed));
      } catch {
        /* ignore quota */
      }
    } catch (error: any) {
      console.error('Practice packet error:', error);
      setPracticePacketError(
        error?.message || 'Failed to build practice packet. Please try again.'
      );
    } finally {
      setPracticePacketBuilding(false);
    }
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

  const handleDevJumpToId = (raw: string) => {
    const id = Number.parseInt(raw.trim(), 10);
    if (!Number.isFinite(id)) {
      setDevJumpError('Enter a numeric ID');
      return;
    }

    const inSession = questionsForPractice.findIndex((q) => Number(q.id) === id);
    if (inSession >= 0) {
      setCurrentQuestionIndex(inSession);
      setDevJumpError(null);
      return;
    }

    const bank =
      subject === 'stats'
        ? statsMcqPracticeQuestions
        : subject === 'gov'
          ? govMcqPracticeQuestions
          : allQuestions;
    const fromBank = bank.find((q) => Number(q.id) === id);
    if (!fromBank) {
      setDevJumpError(`No ${subject} question ${id}`);
      return;
    }

    setQuestionsForPractice((prev) => [fromBank, ...prev.filter((q) => Number(q.id) !== id)]);
    setTotalQuestionsInSet((n) => n + 1);
    setCurrentQuestionIndex(0);
    setDevJumpError(null);
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 pt-8">
          {!isLoadingQuestionSet && (questionsForPractice.length > 0 || reviewState.misses.length > 0) ? (
            <div className="mb-6 flex items-center justify-end gap-4">
              {process.env.NODE_ENV === 'development' ? (
                <form
                  className="flex flex-shrink-0 items-center gap-1.5 rounded border border-dashed border-amber-400 bg-amber-50 px-2 py-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDevJumpToId(devJumpId);
                  }}
                >
                  <label htmlFor="dev-mcq-id-jump-legacy" className="text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                    Dev ID
                  </label>
                  <input
                    id="dev-mcq-id-jump-legacy"
                    type="text"
                    inputMode="numeric"
                    value={devJumpId}
                    onChange={(e) => {
                      setDevJumpId(e.target.value);
                      if (devJumpError) setDevJumpError(null);
                    }}
                    placeholder={
                      questionsForPractice[currentQuestionIndex]?.id != null
                        ? String(questionsForPractice[currentQuestionIndex].id)
                        : 'id'
                    }
                    className="h-6 w-20 rounded border border-amber-300 bg-white px-1.5 text-xs text-gray-900 outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="h-6 rounded bg-amber-500 px-1.5 text-[10px] font-semibold uppercase text-white hover:bg-amber-600"
                  >
                    Go
                  </button>
                  {devJumpError ? (
                    <span className="max-w-[10rem] truncate text-[10px] text-red-600">{devJumpError}</span>
                  ) : questionsForPractice[currentQuestionIndex]?.id != null ? (
                    <span className="text-[10px] text-amber-800">
                      now {questionsForPractice[currentQuestionIndex].id}
                    </span>
                  ) : null}
                </form>
              ) : null}
              {REMATCH_ENABLED ? (
                <ReviewFolderButton
                  count={reviewState.misses.length}
                  pulseKey={reviewPulseKey}
                  active={reviewFolderOpen}
                  onClick={() => setReviewFolderOpen(true)}
                />
              ) : null}
              {questionsForPractice.length > 0 ? (
                <>
                  {subject === 'stats' ? (
                    <button
                      type="button"
                      onClick={() => setFormulaToggleSignal((n) => n + 1)}
                      className={`inline-flex flex-shrink-0 items-center gap-1.5 text-sm transition-colors ${
                        formulaSheetOpen
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                      aria-pressed={formulaSheetOpen}
                      aria-label={formulaSheetOpen ? 'Close formula sheet' : 'Open formula sheet'}
                      title={formulaSheetOpen ? 'Close formula sheet' : 'Exam-style formula sheet'}
                    >
                      <Sigma className="h-4 w-4" />
                      <span>Formulas</span>
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setScratchToggleSignal((n) => n + 1)}
                    className={`inline-flex flex-shrink-0 items-center gap-1.5 text-sm transition-colors ${
                      scratchActive
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                    aria-pressed={!!scratchActive}
                    aria-label={scratchActive ? 'Close scratch pad' : 'Open scratch pad'}
                    title={scratchActive ? 'Close scratch pad' : 'Scratch pad (draw or notes)'}
                  >
                    <Pen className="h-4 w-4" />
                    <span>Scratch pad</span>
                  </button>
                </>
              ) : null}
            </div>
          ) : null}
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
              showFloatingScratchToolbar={false}
              scratchToggleSignal={scratchToggleSignal}
              onScratchActiveChange={setScratchActive}
              formulaToggleSignal={formulaToggleSignal}
              onFormulaActiveChange={setFormulaSheetOpen}
            />
          )}
        </div>
      </div>

      {REMATCH_ENABLED ? (
      <>
      <ReviewFolderPanel
        open={reviewFolderOpen}
        onClose={() => setReviewFolderOpen(false)}
        unitNumber={primaryReviewUnit}
        unitLabel={reviewUnitLabel}
        groups={rollupByLesson(reviewState, subject)}
        totalCount={reviewState.misses.length}
        onRemoveMiss={(questionId) => {
          const miss = reviewState.misses.find((m) => m.questionId === questionId);
          const unitNumber = miss?.unitNumber ?? primaryReviewUnit;
          const next = removeMiss(
            loadReviewFolder(reviewUserKey, subject, unitNumber),
            questionId
          );
          persistReviewUnit(unitNumber, next);
          refreshMergedReview();
          if (justFiledQuestionId === questionId) setJustFiledQuestionId(null);
        }}
        onClearAll={() => {
          for (const unitNumber of reviewUnitIds) {
            persistReviewUnit(unitNumber, clearReviewFolder());
          }
          setReviewState(clearReviewFolder());
          setJustFiledQuestionId(null);
          setPracticeMissedMode(false);
          setPracticeMissedUnitFilter(null);
        }}
        onPracticeMissed={handlePracticeMissed}
        onOpenPracticePacket={(units) => {
          void handleOpenPracticePacket(units);
        }}
        isBuildingPacket={practicePacketBuilding}
      />

      <PracticePacketModal
        open={practicePacketOpen}
        onClose={() => setPracticePacketOpen(false)}
        packet={practicePacket}
        isBuilding={practicePacketBuilding}
        error={practicePacketError}
      />
      </>
      ) : null}
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



