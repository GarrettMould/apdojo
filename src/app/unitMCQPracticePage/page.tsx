'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Lock, ArrowRight, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCreditSystem } from '@/hooks/useCreditSystem';
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
import { logger } from '@/utils/logger';
import { getSubjectSlug, getUnitSlug } from '@/lib/practiceSlugs';

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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled;
}

// Season Pass Modal Component - Shows purchase page info
function SeasonPassModal({ subject, onClose }: { subject: 'macro' | 'micro'; onClose: () => void }) {
  useEffect(() => {
    // Allow Escape key to close the modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const isGreen = subject === 'micro';
  const config = {
    badge: subject === 'macro' ? 'AP MACRO SEASON PASS' : 'AP MICRO SEASON PASS',
    price: 29,
    features: [
      { text: 'Full Practice Exams based on 2026 AP ' + (subject === 'macro' ? 'Macro' : 'Micro') + ' CED', key: 'Full Practice Exams' },
      { text: 'Endless AP-Style MCQ Bank', key: 'Endless' },
      { text: 'AI-Graded FRQs with Graphing Help', key: 'AI-Graded' },
      { text: 'Interactive Graphing Simulators', key: 'Interactive Graphing Simulators' },
      { text: 'Interactive Cheat Sheets + Downloadable PDFs', key: 'Interactive Cheat Sheets' },
      { text: 'Upload Notes to Create Quizzes', key: 'Upload Notes' },
    ],
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          // Close when clicking outside the modal content
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-xl w-full relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="space-y-4">
            {/* Badge */}
            <div>
              <h3 className="text-3xl font-black text-black uppercase tracking-wide">
                {subject === 'macro' ? 'AP MACRO ' : 'AP MICRO '}
                <span className={isGreen ? 'text-green-600' : 'text-blue-600'}>SEASON PASS</span>
              </h3>
            </div>

            {/* Price Section */}
            <div className="space-y-1">
              <p className="text-base font-semibold text-gray-700">
                One-time payment of
              </p>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-extrabold ${isGreen ? 'text-green-600' : 'text-blue-600'}`}>
                  ${config.price}
                </span>
                <span className="text-base text-gray-400 line-through ml-1">
                  $39
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Valid until June 30th, 2026
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">
                500+ Students Trained
              </span>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-black">
                What's Included:
              </h2>
              <ul className="space-y-2">
                {config.features.map((benefit, index) => {
                  const parts = benefit.text.split(benefit.key);
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isGreen ? 'text-green-600' : 'text-blue-600'}`} />
                      <span className="text-sm font-semibold text-gray-900">
                        {parts[0]}
                        <strong>{benefit.key}</strong>
                        {parts[1]}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={`/purchase/season-pass?courseType=${subject}`}
                className={`block w-full text-white font-extrabold text-lg py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-wide text-center ${
                  isGreen 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => onClose()}
              >
                UNLOCK INSTANT ACCESS
              </Link>

              {/* Trust Elements */}
              <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-gray-400" />
                100% Money-Back Guarantee
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AccessDenied({ unitId, subject, isCreditLimit = false }: { unitId: string, subject: string, isCreditLimit?: boolean }) {
  const unitData = (subject === 'macro' ? allMacroUnitsData : allMicroUnitsData).find(u => u.number === parseInt(unitId));
  const price = unitData?.price || 4.99;

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
            <Button size="lg" className={`w-full ${subject === 'macro' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}>
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
  const subject = (subjectParam === 'macro' || subjectParam === 'micro') ? subjectParam : 'macro';
  const unitsParam = searchParams.get('units');
  const currentUnitForAccessCheck = unitsParam ? unitsParam.split(',')[0] : '1';
  const lessonIdParam = searchParams.get('lessonId');
  const modeParam = searchParams.get('mode');
  const testMode = searchParams.get('test') === 'true'; // Enable test questions when ?test=true
  const unitsData = subject === 'micro' ? allMicroUnitsData : allMacroUnitsData;

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
    if (
      !testMode && 
      !lessonIdParam &&
      initialPracticeMode !== 'weakest' &&
      initialCustomUnitIds.length === 1 &&
      initialCustomUnitIds[0] >= 1 &&
      initialCustomUnitIds[0] <= 6
    ) {
      const unitNumber = initialCustomUnitIds[0];
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
    purchasedTests.includes(String(currentUnit));

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
    const subjectFilter = subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';

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

    // Shuffle questions
    const shuffled = shuffleArray(questions);
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
    // Only Macro has unit MCQ tests wired up currently
    if (subject !== 'macro') {
      return;
    }

    if (!user) {
      // Show season pass modal for guest users trying to access test mode
      if (!hasDismissedSeasonPassModal) {
        setShowSeasonPassModal(true);
      }
      return;
    }

    const price =
      unitsData.find(u => u.number === currentUnit)?.price || 4.99;

    if (!purchasedTests.includes(String(currentUnit))) {
      // Redirect to purchase page for this unit test
      router.push(
        `/purchase/mcq-practice?units=${currentUnit}&total=${price}&subject=${subject}`
      );
      return;
    }

    // User has access → go to test page
    router.push(`/ap-${subject}-unit-${currentUnit}-mcq-test`);
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

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className={`h-12 w-12 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`} />
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
              <Loader2 className={`h-12 w-12 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`} />
            </div>
          ) : questionsForPractice.length === 0 && !showAllQuestions && practiceMode === 'singleUnit' ? (
            // Congratulations panel - user has mastered the unit
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${subject === 'macro' ? 'bg-blue-100' : 'bg-green-100'} mb-4`}>
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
                      className={`w-full ${subject === 'macro' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold text-lg py-6`}
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
                    className={`w-full border-2 ${subject === 'macro' ? 'border-blue-500 text-blue-600 hover:bg-blue-50' : 'border-green-500 text-green-600 hover:bg-green-50'} font-semibold text-lg py-6`}
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



