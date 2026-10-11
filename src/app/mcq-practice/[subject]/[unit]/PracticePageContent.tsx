'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Lock, ArrowRight, ChevronRight, Home, Pen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCreditSystem } from '@/hooks/useCreditSystem';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import {
  macroUnits as allMacroUnitsData,
  microUnits as allMicroUnitsData,
  govUnits as allGovUnitsData,
  statsUnits as allStatsUnitsData,
} from '@/data/cheatSheets';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { logger } from '@/utils/logger';
import {
  getFullUnitName,
  getSubjectDisplayName,
  getSubjectSlug,
  getUnitSlug,
  type PracticeMcqSubject,
} from '@/lib/practiceSlugs';
import {
  isGovMcqPracticeUnitAvailable,
  isStatsMcqPracticeUnitAvailable,
  type CourseSubject,
} from '@/lib/courseSubject';
import { apQuestionSubjectTag } from '@/lib/courseSubject';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { hasValidSeasonPass } from '@/lib/utils';
import { shufflePracticeQuestions } from '@/lib/shufflePracticeQuestions';
import { REMATCH_ENABLED } from '@/lib/reviewFolder';
import { ReviewFolderButton } from '@/components/review-folder/ReviewFolderButton';
import { ReviewFolderPanel } from '@/components/review-folder/ReviewFolderPanel';
import { PracticePacketModal } from '@/components/practice-packet/PracticePacketModal';
import {
  clearReviewFolder,
  loadReviewFolder,
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
  selectedLetter?: string;
  subject?: string;
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

  answers.forEach((answer, index) => {
    if (index < 5) {
       logger.debug(`[Calc] Answer ${index} unitId value:`, answer.unitId, typeof answer.unitId);
    }

    if (typeof answer.unitId === 'number') {
      const unitId = answer.unitId;
      if (!unitStats[unitId]) {
        unitStats[unitId] = { correct: 0, total: 0 };
      }
      unitStats[unitId].total++;
      if (answer.isCorrect) {
        unitStats[unitId].correct++;
      }
      processedCount++;
    } else {
        if (index < 10) {
             logger.warn(`[Calc] Answer ${index} has invalid unitId:`, answer.unitId);
        }
    }
  });

  logger.debug("[Calc] Aggregated unitStats:", unitStats);
  logger.debug(`[Calc] Processed ${processedCount} answers with valid numeric unit IDs.`);

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

  unitsWithStats.sort((a, b) => a.unitId - b.unitId);

  logger.debug("[Calc] Final unitsWithStats (sorted by Unit ID):", unitsWithStats);

  return unitsWithStats;
}

function AccessDenied({
  unitId,
  subject,
  isCreditLimit = false,
}: {
  unitId: string;
  subject: PracticeMcqSubject;
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
  const seasonBtnClass =
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
            <Button size="lg" className={`w-full ${seasonBtnClass}`}>
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

// Breadcrumb Component
function Breadcrumb({ subject, unitNumber }: { subject: PracticeMcqSubject; unitNumber: number }) {
  const subjectName = getSubjectDisplayName(subject);
  const subjectSlug = getSubjectSlug(subject);
  
  return (
    <nav className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <Link 
        href="/select-practice-units" 
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Practice
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <Link 
        href={`/mcq-practice/${subjectSlug}/${getUnitSlug(unitNumber, subject)}`}
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        {subjectName}
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-900 font-semibold">Unit {unitNumber}</span>
    </nav>
  );
}

interface PracticePageContentProps {
  subject: PracticeMcqSubject;
  unitNumber: number;
}

export function PracticePageContent({ subject, unitNumber }: PracticePageContentProps) {
  const router = useRouter();
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
  
  // Access Control State
  const [hasAccess, setHasAccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const DAILY_FREE_ANSWERS = 3;
  const [dailyQuestionsAnswered, setDailyQuestionsAnswered] = useState(0);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);
  const [hasDismissedSeasonPassModal, setHasDismissedSeasonPassModal] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [scratchToggleSignal, setScratchToggleSignal] = useState(0);
  const [scratchActive, setScratchActive] = useState<'draw' | 'notes' | null>(null);
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

  const persistReview = (next: ReviewFolderState) => {
    saveReviewFolder(reviewUserKey, subject, unitNumber, next);
    if (user?.uid) {
      void saveReviewFolderToCloud(user.uid, subject, unitNumber, next).catch(
        (err) => console.error('[ReviewFolder] cloud save failed:', err)
      );
    }
  };

  // Hydrate from localStorage + Firestore (logged-in). Cloud wins when present.
  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      let next = loadReviewFolder(reviewUserKey, subject, unitNumber);
      let cloudExists = false;

      if (user?.uid) {
        try {
          const cloud = await loadReviewFolderFromCloud(
            user.uid,
            subject,
            unitNumber
          );
          cloudExists = cloud.exists;
          if (cloud.exists) {
            next = cloud.state;
          } else if (next.misses.length > 0) {
            // Migrate local → cloud on first login for this unit
            void saveReviewFolderToCloud(user.uid, subject, unitNumber, next);
            cloudExists = true;
          }
        } catch (err) {
          console.error('[ReviewFolder] cloud load failed:', err);
        }
      }

      if (cancelled) return;
      next = filterReviewFolderBySubject(next, subject, allQuestions);
      setReviewState(next);
      saveReviewFolder(reviewUserKey, subject, unitNumber, next);
      setJustFiledQuestionId(null);
      setPracticeMissedMode(false);
      setPracticeMissedUnitFilter(null);
      setReviewFolderOpen(false);

      // Seed from answer history only when this user has never had a cloud folder
      if (
        user?.uid &&
        !cloudExists &&
        next.misses.length === 0 &&
        !loadingMcqData &&
        Array.isArray(mcqAnswersData) &&
        mcqAnswersData.length > 0
      ) {
        const seeded = applyAnswerHistoryToReviewFolder(next, mcqAnswersData, {
          subject,
          unitNumber,
          bankQuestions: allQuestions,
        });
        const scoped = filterReviewFolderBySubject(seeded, subject, allQuestions);
        if (scoped.misses.length > 0) {
          setReviewState(scoped);
          persistReview(scoped);
        } else {
          void saveReviewFolderToCloud(user.uid, subject, unitNumber, scoped);
        }
      }
    };

    void hydrate();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewUserKey, subject, unitNumber, user?.uid]);

  // Seed once answers load if cloud folder still doesn't exist and local is empty
  useEffect(() => {
    if (!user?.uid || loadingMcqData) return;
    if (!Array.isArray(mcqAnswersData) || mcqAnswersData.length === 0) return;

    let cancelled = false;
    (async () => {
      try {
        const cloud = await loadReviewFolderFromCloud(
          user.uid,
          subject,
          unitNumber
        );
        if (cancelled || cloud.exists) return;

        setReviewState((prev) => {
          if (prev.misses.length > 0) {
            void saveReviewFolderToCloud(user.uid, subject, unitNumber, prev);
            return prev;
          }
          const seeded = applyAnswerHistoryToReviewFolder(prev, mcqAnswersData, {
            subject,
            unitNumber,
            bankQuestions: allQuestions,
          });
          const scoped = filterReviewFolderBySubject(seeded, subject, allQuestions);
          void saveReviewFolderToCloud(user.uid, subject, unitNumber, scoped);
          saveReviewFolder(reviewUserKey, subject, unitNumber, scoped);
          return scoped;
        });
      } catch (err) {
        console.error('[ReviewFolder] seed failed:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    user?.uid,
    loadingMcqData,
    mcqAnswersData,
    subject,
    unitNumber,
    reviewUserKey,
  ]);

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

  // Load daily answered count from localStorage
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

  const unitsData =
    subject === 'gov'
      ? allGovUnitsData
      : subject === 'stats'
        ? allStatsUnitsData
        : subject === 'micro'
          ? allMicroUnitsData
          : allMacroUnitsData;
  /** Only units with practice banks appear in the in-quiz unit switcher. */
  const unitsForMcq =
    subject === 'gov'
      ? unitsData.filter((u) => isGovMcqPracticeUnitAvailable(u.number))
      : subject === 'stats'
        ? unitsData.filter((u) => isStatsMcqPracticeUnitAvailable(u.number))
        : unitsData;
  const uiTheme =
    subject === 'gov'
      ? {
          spin: 'text-violet-600',
          circle: 'bg-violet-100',
          primary: 'bg-violet-600 hover:bg-violet-700',
          outline: 'border-violet-600 text-violet-700 hover:bg-violet-50',
        }
      : subject === 'stats'
        ? {
            spin: 'text-orange-600',
            circle: 'bg-orange-100',
            primary: 'bg-orange-600 hover:bg-orange-700',
            outline: 'border-orange-600 text-orange-700 hover:bg-orange-50',
          }
        : subject === 'micro'
          ? {
              spin: 'text-green-500',
              circle: 'bg-green-100',
              primary: 'bg-green-500 hover:bg-green-600',
              outline: 'border-green-500 text-green-600 hover:bg-green-50',
            }
          : {
              spin: 'text-blue-500',
              circle: 'bg-blue-100',
              primary: 'bg-blue-500 hover:bg-blue-600',
              outline: 'border-blue-500 text-blue-600 hover:bg-blue-50',
            };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  const [questionsForPractice, setQuestionsForPractice] = useState<QuestionType[]>([]);
  const [isLoadingQuestionSet, setIsLoadingQuestionSet] = useState(true);
  const [dojoProgress, setDojoProgress] = useState(0);
  const [hasConsumedDailyCredit, setHasConsumedDailyCredit] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [totalQuestionsInSet, setTotalQuestionsInSet] = useState(0);
  const [currentUnitName, setCurrentUnitName] = useState('');
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const purchasedTests = (userData?.purchasedTests || []) as string[];

  // Track previous filter criteria to prevent unnecessary reloads
  const prevFilterCriteriaRef = useRef<string>('');

  // Load questions for single unit mode
  useEffect(() => {
    const filterKey = JSON.stringify({
      subject,
      unitNumber,
      showAllQuestions,
      practiceMissedMode,
      practiceMissedUnitFilter: practiceMissedUnitFilter?.join(',') ?? '',
      loadingMcqData: loadingMcqData ? 'loading' : 'loaded'
    });
    
    if (filterKey === prevFilterCriteriaRef.current) {
      return;
    }
    
    prevFilterCriteriaRef.current = filterKey;
    
    if (user && loadingMcqData) {
      setIsLoadingQuestionSet(true);
      return;
    }

    setIsLoadingQuestionSet(true);
    const subjectFilter = apQuestionSubjectTag(subject as CourseSubject);
    
    let questions: QuestionType[] = allQuestions.filter(q => 
      q.subject === subjectFilter && 
      q.unit === unitNumber &&
      !q.isTest // Exclude test questions for practice mode
    );

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
        
        console.log('[PracticePageContent] Filtered out correctly answered questions', {
          totalCorrectlyAnswered: correctlyAnsweredQuestionIds.size,
          remainingQuestions: questions.length
        });
      }
    }

    const shuffled = practiceMissedMode
      ? questions
      : shufflePracticeQuestions(questions);
    setQuestionsForPractice(shuffled);
    setTotalQuestionsInSet(shuffled.length);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions({});
    
    // Set unit name for display
    const unit = unitsData.find(u => u.number === unitNumber);
    setCurrentUnitName(unit ? `Unit ${unitNumber}: ${unit.title}` : `Unit ${unitNumber}`);

    setIsLoadingQuestionSet(false);
  }, [subject, unitNumber, showAllQuestions, practiceMissedMode, practiceMissedUnitFilter, reviewState.misses, reviewUserKey, user, loadingMcqData, mcqAnswersData]);

  // Access control check
  useEffect(() => {
    setHasAccess(true);
    setIsVerifying(false);
  }, [user, userData, isPremium, unitNumber]);

  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
    logger.debug('[UnitMCQ] handleAnswer called:', { questionId, answerLetter, isCorrect, hasAwardXp: !!awardXp });
    
    const isNewQuestion = !answeredQuestions[questionId];
    
    // Daily free-answer limit for ALL non-premium users
    if (!isPremiumEffective && isNewQuestion) {
      const currentCount = readDailyCount();
      if (currentCount >= DAILY_FREE_ANSWERS) {
        if (!hasDismissedSeasonPassModal) {
          setShowSeasonPassModal(true);
        }
        return;
      }
      const nextCount = currentCount + 1;
      writeDailyCount(nextCount);
      setDailyQuestionsAnswered(nextCount);

      if (
        nextCount === DAILY_FREE_ANSWERS &&
        !hasDismissedSeasonPassModal
      ) {
        window.setTimeout(() => {
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

    if (isCorrect) {
      setJustFiledQuestionId((prev) => (prev === questionId ? null : prev));
      setReviewState((prev) => {
        const next = recordCorrect(prev, questionId, lessons);
        persistReview(next);
        return next;
      });
    } else {
      setReviewState((prev) => {
        const next = recordMiss(prev, {
          questionId,
          subject,
          unitNumber,
          lessonIDS: lessons,
          selectedLetter: answerLetter,
          questionPreview: previewFromQuestion(question?.question || `Question ${questionId}`),
        });
        persistReview(next);
        return next;
      });
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
            selectedLetter: answerLetter,
            subject,
            timestamp: serverTimestamp()
          };

          await addDoc(collection(db, 'users', user.uid, 'mcqAnswers'), answerData);
          
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
  };

  const handlePracticeMissed = (unitNumbers: number[]) => {
    setReviewFolderOpen(false);
    setPracticeMissedUnitFilter(
      unitNumbers.length > 0 ? unitNumbers : [unitNumber]
    );
    setPracticeMissedMode(true);
    setShowAllQuestions(true);
    prevFilterCriteriaRef.current = '';
  };

  const handleOpenPracticePacket = async (unitNumbers: number[]) => {
    if (reviewState.misses.length === 0) return;

    const selected =
      unitNumbers.length > 0 ? unitNumbers : [unitNumber];
    const draft = assemblePracticePacket(
      reviewState,
      subject,
      selected[0] ?? unitNumber,
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
          unit: selected[0] ?? unitNumber,
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
    if (currentQuestionIndex < questionsForPractice.length - 1) {
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

  const handleUnitChange = (nextUnit: number) => {
    if (subject === 'gov' && !isGovMcqPracticeUnitAvailable(nextUnit)) return;
    if (subject === 'stats' && !isStatsMcqPracticeUnitAvailable(nextUnit)) return;
    const subjectSlug = getSubjectSlug(subject);
    const unitSlug = getUnitSlug(nextUnit, subject);
    router.push(`/mcq-practice/${subjectSlug}/${unitSlug}`);
  };

  // Keyboard navigation: Left/Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        showLoginModal ||
        showSignupModal ||
        showSeasonPassModal ||
        (!isPremiumEffective && dailyQuestionsAnswered >= DAILY_FREE_ANSWERS)
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePreviousQuestion();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestionIndex, questionsForPractice.length, showLoginModal, showSignupModal, showSeasonPassModal, isPremiumEffective, dailyQuestionsAnswered]);

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };


  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className={`h-12 w-12 animate-spin ${uiTheme.spin}`} />
      </div>
    );
  }

  if (!hasAccess) {
    return <AccessDenied unitId={String(unitNumber)} subject={subject} isCreditLimit={false} />;
  }

  const fullUnitName = getFullUnitName(subject, unitNumber);

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
      {showSeasonPassModal && (
        <SeasonPassModal
          subject={subject as CourseSubject}
          onClose={() => {
            setShowSeasonPassModal(false);
            setHasDismissedSeasonPassModal(true);
          }}
        />
      )}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 pt-8">

          <div className="mb-6 flex items-center justify-between gap-3">
            {!isTutorOpen ? (
              <Breadcrumb subject={subject} unitNumber={unitNumber} />
            ) : (
              <div className="min-w-0 flex-1" />
            )}
            {!isLoadingQuestionSet && (questionsForPractice.length > 0 || reviewState.misses.length > 0) ? (
              <div className="flex flex-shrink-0 items-center gap-4">
                {REMATCH_ENABLED ? (
                  <ReviewFolderButton
                    count={reviewState.misses.length}
                    pulseKey={reviewPulseKey}
                    active={reviewFolderOpen}
                    onClick={() => setReviewFolderOpen(true)}
                  />
                ) : null}
                {questionsForPractice.length > 0 ? (
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
                ) : null}
              </div>
            ) : null}
          </div>

          {isLoadingQuestionSet ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className={`h-12 w-12 animate-spin ${uiTheme.spin}`} />
            </div>
          ) : questionsForPractice.length === 0 && !showAllQuestions ? (
            // Congratulations panel - user has mastered the unit
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${uiTheme.circle} mb-4`}>
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
                      className={`w-full ${uiTheme.primary} text-white font-semibold text-lg py-6`}
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
                    className={`w-full border-2 ${uiTheme.outline} font-semibold text-lg py-6`}
                  >
                    Keep Practicing {currentUnitName}
                  </Button>
                </div>
              </div>
            </div>
          ) : questionsForPractice.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No questions available for this unit.</p>
            </div>
          ) : (
            <UnitMCQs
              currentUnit={unitNumber}
              currentQuestionIndex={currentQuestionIndex}
              isLoggedIn={!!user}
              onAnswer={handleAnswer}
              onNextQuestion={handleNextQuestion}
              questions={questionsForPractice}
              onPreviousQuestion={handlePreviousQuestion}
              onQuestionSelect={handleQuestionSelect}
              onUnitChange={handleUnitChange}
              answeredQuestions={answeredQuestions}
              units={unitsForMcq}
              dojoProgress={dojoProgress}
              correctStreak={correctStreak}
              isWeakestUnitsMode={false}
              isTopicMode={false}
              totalQuestions={totalQuestionsInSet}
              unitName={currentUnitName}
              subject={subject as CourseSubject}
              practiceUnitIds={[unitNumber]}
              isParentModalOpen={showLoginModal || showSignupModal}
              hasTestModeAccess={!!user && (hasValidSeasonPass(userData, subject as CourseSubject) || purchasedTests.includes(String(unitNumber)))}
              onEnterTestMode={() => {
                const price = unitsData.find(u => u.number === unitNumber)?.price || 4.99;
                const hasSeasonPassAccess = hasValidSeasonPass(userData, subject as CourseSubject);
                const hasPurchasedUnitTest = purchasedTests.includes(String(unitNumber));
                if (!hasSeasonPassAccess && !hasPurchasedUnitTest) {
                  router.push(`/purchase/mcq-practice?units=${unitNumber}&total=${price}&subject=${subject}`);
                } else {
                  const testHref =
                    subject === 'gov'
                      ? `/ap-gov-unit-${unitNumber}-mcq-test`
                      : subject === 'stats'
                        ? `/ap-stats-unit-${unitNumber}-mcq-test`
                        : `/ap-${subject}-unit-${unitNumber}-mcq-test`;
                  router.push(testHref);
                }
              }}
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
              onTutorOpenChange={setIsTutorOpen}
              showFloatingScratchToolbar={false}
              scratchToggleSignal={scratchToggleSignal}
              onScratchActiveChange={setScratchActive}
            />
          )}
        </div>
      </div>

      {REMATCH_ENABLED ? (
      <>
      <ReviewFolderPanel
        open={reviewFolderOpen}
        onClose={() => setReviewFolderOpen(false)}
        unitNumber={unitNumber}
        groups={rollupByLesson(reviewState, subject)}
        totalCount={reviewState.misses.length}
        onRemoveMiss={(questionId) => {
          setReviewState((prev) => {
            const next = removeMiss(prev, questionId);
            persistReview(next);
            return next;
          });
          if (justFiledQuestionId === questionId) setJustFiledQuestionId(null);
        }}
        onClearAll={() => {
          const next = clearReviewFolder();
          setReviewState(next);
          persistReview(next);
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
