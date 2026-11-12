'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check, Loader2, Lock, ArrowRight, ChevronRight, Home, Pen, Sigma, Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCreditSystem } from '@/hooks/useCreditSystem';
import { UnitMCQs } from '@/components/unitMCQS';
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
import { statsMcqPracticeQuestions } from '@/data/stats/statsMcqPractice';
import { govMcqPracticeQuestions } from '@/data/gov/govMcqPractice';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { hasValidSeasonPass } from '@/lib/utils';
import { shufflePracticeQuestions } from '@/lib/shufflePracticeQuestions';
import { FEATURES } from '@/lib/featureFlags';
import {
  GOLD_BONUS_QUESTIONS,
  GOLD_FREE_QUESTION_NUMBER,
  clearGoldRedeem,
  localDateKey,
  readGoldDay,
  readGoldRedeem,
  recordGoldAnswer,
  redemptionInsertIndex,
  saveGoldRedeem,
  shiftSlots,
  type GoldSlotKind,
} from '@/lib/practiceGoldLoop';
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
    <nav className="flex w-full min-w-0 flex-wrap items-center gap-2 text-sm sm:w-auto sm:flex-1" aria-label="Breadcrumb">
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
  practiceQuestions?: QuestionType[];
}

function sameQuestionId(question: QuestionType, id: number) {
  return Number(question.id) === id;
}

/** Client modules stay current across HMR; the server-passed bank can lag on Stats/Gov. */
function livePracticeBank(
  subject: PracticeMcqSubject,
  passed: QuestionType[] | undefined
): QuestionType[] {
  if (subject === 'stats') return statsMcqPracticeQuestions;
  if (subject === 'gov') return govMcqPracticeQuestions;
  return passed ?? [];
}

type GoldOutcome = {
  kind: GoldSlotKind | null;
  correct: boolean;
  /** Bonus free questions unlocked by this answer. */
  bonus: number;
  /** Free user missed today's golden question: it returns tomorrow. */
  backTomorrow: boolean;
  /** Season Pass user missed it: it returns later in this session. */
  backSoon: boolean;
  lessonIds: string[];
};

const BURST = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return { x: Math.cos(angle) * (46 + (i % 3) * 14), y: Math.sin(angle) * (30 + (i % 2) * 12) };
});

/** Header strip across the top of a golden or redemption question card. It shows the result once answered. */
function GoldQuestionBanner({
  kind,
  outcome,
}: {
  kind: GoldSlotKind;
  outcome?: GoldOutcome;
}) {
  const redeem = kind === 'redeem';
  const state: 'open' | 'right' | 'wrong' = !outcome ? 'open' : outcome.correct ? 'right' : 'wrong';
  const label = redeem ? 'Redemption round' : kind === 'goldRedeem' ? 'Golden question · Yesterday\'s miss' : 'Golden question';

  let title: string;
  let detail: string | null = null;
  if (state === 'open') {
    title = redeem
      ? 'You missed this one before. Get it right to clear it from your review folder.'
      : `Get it right to unlock ${GOLD_BONUS_QUESTIONS} bonus questions today.`;
  } else if (state === 'right') {
    if (redeem) {
      title = 'Redeemed! Cleared from your review folder.';
    } else if (outcome!.bonus > 0) {
      title = `Correct! ${outcome!.bonus} bonus questions unlocked.`;
    } else {
      title = 'Correct!';
    }
  } else {
    title = 'Not this time.';
    detail = outcome!.backTomorrow
      ? 'It will be back tomorrow as your golden question, with another shot at the bonus.'
      : outcome!.backSoon
        ? 'You will get another shot at it in a few questions.'
        : redeem
          ? 'It stays in your review folder for another try.'
          : null;
  }

  const tone =
    state === 'wrong'
      ? 'bg-gradient-to-r from-slate-600 to-slate-500 text-white'
      : redeem
        ? state === 'right'
          ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-white'
          : 'bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-white'
        : 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 text-amber-950';
  const Icon = state === 'wrong' ? X : state === 'right' ? Check : redeem ? RotateCcw : Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative -mx-4 -mt-4 mb-5 overflow-hidden rounded-t-[7px] px-4 py-3.5 transition-colors duration-500 md:-mx-5 md:-mt-5 md:px-5 ${tone}`}
      aria-live="polite"
    >
      {/* Shimmer sweep when the card appears, and again on a right answer */}
      {state !== 'wrong' ? (
        <motion.span
          key={state}
          aria-hidden
          initial={{ x: '-120%' }}
          animate={{ x: '320%' }}
          transition={{ duration: 1.1, delay: state === 'open' ? 0.25 : 0, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      ) : null}
      <div className="relative flex items-center gap-3">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
          {state === 'right'
            ? BURST.map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`absolute h-1.5 w-1.5 rounded-full ${redeem ? 'bg-white' : i % 2 ? 'bg-white' : 'bg-amber-600'}`}
                />
              ))
            : null}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={state}
              initial={{ scale: 0.3, rotate: state === 'right' ? -40 : 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                state === 'wrong' || redeem ? 'bg-white/20' : 'bg-white/60'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={state === 'open' ? 2 : 3} aria-hidden />
            </motion.span>
          </AnimatePresence>
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={state}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="min-w-0"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-80">{label}</p>
            <p className="text-[15px] font-bold leading-snug sm:text-base">{title}</p>
            {detail ? <p className="mt-0.5 text-sm font-medium opacity-90">{detail}</p> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** Replaces the question card when a free user has used today's free questions. */
function OutOfQuestionsPanel({ missedGold, onUnlock }: { missedGold: boolean; onUnlock: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center px-1 py-8 text-center sm:py-10"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <Sparkles className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900">
        That&apos;s your free questions for today
      </h2>
      <p className="mt-2 max-w-md text-base leading-relaxed text-gray-600">
        {missedGold
          ? 'Good effort. Your golden question comes back tomorrow, with another shot at the bonus.'
          : `Nice work. Come back tomorrow for ${DAILY_FREE_ANSWERS_DEFAULT} more, plus a new golden question.`}
      </p>
      <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <button
          type="button"
          onClick={onUnlock}
          className="rounded-xl bg-blue-600 px-5 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          Unlock Unlimited Questions
        </button>
        <Link
          href="/"
          className="rounded-xl border-2 border-gray-200 bg-white px-5 py-3 text-base font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
        >
          Return home
        </Link>
      </div>
    </motion.div>
  );
}

/** Under an ordinary question a Season Pass user missed: it comes back later in the session. */
function GoldOutcomeNote({ outcome }: { outcome: GoldOutcome }) {
  if (outcome.kind || outcome.correct || !outcome.backSoon) return null;
  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
      <RotateCcw className="h-4 w-4 shrink-0 text-sky-600" aria-hidden />
      You will get another shot at this one in a few questions.
    </div>
  );
}

const DAILY_FREE_ANSWERS_DEFAULT = 3;

export function PracticePageContent({ subject, unitNumber, practiceQuestions }: PracticePageContentProps) {
  const practiceBank = livePracticeBank(subject, practiceQuestions);
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
  const DAILY_FREE_ANSWERS = DAILY_FREE_ANSWERS_DEFAULT;
  const [dailyQuestionsAnswered, setDailyQuestionsAnswered] = useState(0);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);
  const [hasDismissedSeasonPassModal, setHasDismissedSeasonPassModal] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
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
      next = filterReviewFolderBySubject(next, subject, practiceBank);
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
          bankQuestions: practiceBank,
        });
        const scoped = filterReviewFolderBySubject(seeded, subject, practiceBank);
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
            bankQuestions: practiceBank,
          });
          const scoped = filterReviewFolderBySubject(seeded, subject, practiceBank);
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
      if (!goldLoopOn && !isPremiumEffective && dailyCount >= DAILY_FREE_ANSWERS && !hasDismissedSeasonPassModal) {
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
  // Golden questions and redemption rounds (see src/lib/practiceGoldLoop.ts), keyed by position in the set.
  const goldLoopOn = FEATURES.practiceGoldLoop;
  const [buildId, setBuildId] = useState(0);
  const [slotKinds, setSlotKinds] = useState<Record<number, GoldSlotKind>>({});
  const [slotOutcomes, setSlotOutcomes] = useState<Record<number, GoldOutcome>>({});
  const [goldBonus, setGoldBonus] = useState(0);
  const plannedRef = useRef('');
  const reinsertedIdsRef = useRef<Set<number>>(new Set());
  /** Re-inserted positions whose earlier answer is cleared when the student reaches them. */
  const pendingResetRef = useRef<Record<number, number>>({});
  const dailyLimit = DAILY_FREE_ANSWERS + (goldLoopOn ? goldBonus : 0);
  /** Free questions are used up and the last answer's result has had time to show. */
  const [outPanelReady, setOutPanelReady] = useState(false);
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
    
    let questions: QuestionType[] = practiceBank.filter(q => 
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

    setSlotKinds({});
    setSlotOutcomes({});
    reinsertedIdsRef.current = new Set();
    pendingResetRef.current = {};
    setBuildId((n) => n + 1);
    setIsLoadingQuestionSet(false);
  }, [subject, unitNumber, showAllQuestions, practiceMissedMode, practiceMissedUnitFilter, reviewState.misses, reviewUserKey, user, loadingMcqData, mcqAnswersData]);

  // Plan golden questions and redemption rounds for each new question set.
  useEffect(() => {
    if (!goldLoopOn || isLoadingQuestionSet || buildId === 0) return;
    if (user && loadingUserData) return;
    const planKey = `${buildId}:${isPremiumEffective}`;
    if (plannedRef.current === planKey) return;
    plannedRef.current = planKey;

    let list = questionsForPractice;
    const kinds: Record<number, GoldSlotKind> = {};
    let goldRedeemSlot: number | null = null;

    if (!isPremiumEffective) {
      const day = readGoldDay(user?.uid);
      setGoldBonus(day.bonus);
      // The golden question is always the day's 3rd free question.
      const thirdFreeSlot = GOLD_FREE_QUESTION_NUMBER - 1 - readDailyCount();
      if (!day.answered && thirdFreeSlot >= 0) {
        const redeem = readGoldRedeem(user?.uid, subject);
        const redeemQuestion =
          redeem && redeem.savedOn < localDateKey()
            ? practiceBank.find((q) => sameQuestionId(q, redeem.questionId))
            : undefined;
        if (redeemQuestion) {
          const rest = list.filter((q) => !sameQuestionId(q, redeemQuestion.id));
          const slot = Math.min(thirdFreeSlot, rest.length);
          list = [...rest.slice(0, slot), redeemQuestion, ...rest.slice(slot)];
          goldRedeemSlot = slot;
          setQuestionsForPractice(list);
          setTotalQuestionsInSet(list.length);
        } else {
          if (thirdFreeSlot < list.length) kinds[thirdFreeSlot] = 'gold';
        }
      }
    }

    // Questions already in the review folder are redemption rounds, unless they are golden.
    const missIds = new Set(reviewState.misses.map((m) => m.questionId));
    list.forEach((q, i) => {
      if (!kinds[i] && missIds.has(q.id)) kinds[i] = 'redeem';
    });
    if (goldRedeemSlot !== null) kinds[goldRedeemSlot] = 'goldRedeem';
    setSlotKinds(kinds);
  }, [buildId, isPremiumEffective, loadingUserData, isLoadingQuestionSet]);

  // Keep today's bonus in sync when the signed-in user changes.
  useEffect(() => {
    if (goldLoopOn) setGoldBonus(readGoldDay(user?.uid).bonus);
  }, [user?.uid]);

  // Reaching a re-inserted question clears its earlier answer so it can be tried again.
  useEffect(() => {
    const id = pendingResetRef.current[currentQuestionIndex];
    if (id === undefined) return;
    const { [currentQuestionIndex]: _reached, ...rest } = pendingResetRef.current;
    pendingResetRef.current = rest;
    setAnsweredQuestions((prev) => {
      const { [id]: _old, ...others } = prev;
      return others;
    });
  }, [currentQuestionIndex]);

  // Access control check
  useEffect(() => {
    setHasAccess(true);
    setIsVerifying(false);
  }, [user, userData, isPremium, unitNumber]);

  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
    logger.debug('[UnitMCQ] handleAnswer called:', { questionId, answerLetter, isCorrect, hasAwardXp: !!awardXp });
    
    const isNewQuestion = !answeredQuestions[questionId];
    const question = practiceBank.find(q => q.id === questionId);
    const lessons = lessonIDS || question?.lessonIDS || [];
    const freeLimitNow = () =>
      DAILY_FREE_ANSWERS + (goldLoopOn ? readGoldDay(user?.uid).bonus : 0);
    
    // Daily free-answer limit for ALL non-premium users
    let nextFreeCount: number | null = null;
    if (!isPremiumEffective && isNewQuestion) {
      const currentCount = readDailyCount();
      if (currentCount >= freeLimitNow()) {
        if (goldLoopOn) {
          setOutPanelReady(true);
        } else if (!hasDismissedSeasonPassModal) {
          setShowSeasonPassModal(true);
        }
        return;
      }
      nextFreeCount = currentCount + 1;
      writeDailyCount(nextFreeCount);
      setDailyQuestionsAnswered(nextFreeCount);
    }

    // Golden question / redemption round outcome for this position in the set.
    const slotIndex = currentQuestionIndex;
    const slotKind = goldLoopOn && isNewQuestion ? slotKinds[slotIndex] ?? null : null;
    if (goldLoopOn && isNewQuestion) {
      const isGold = slotKind === 'gold' || slotKind === 'goldRedeem';
      let bonus = 0;
      let backTomorrow = false;
      let backSoon = false;
      if (isGold && !isPremiumEffective) {
        const day = recordGoldAnswer(user?.uid, isCorrect);
        setGoldBonus(day.bonus);
        if (isCorrect) {
          bonus = GOLD_BONUS_QUESTIONS;
          if (slotKind === 'goldRedeem') clearGoldRedeem(user?.uid, subject);
        } else {
          saveGoldRedeem(user?.uid, subject, questionId);
          backTomorrow = true;
        }
      }

      // Season Pass: a miss comes back a few questions later, once per session.
      if (!isCorrect && isPremiumEffective && question && !reinsertedIdsRef.current.has(questionId)) {
        reinsertedIdsRef.current.add(questionId);
        const at = redemptionInsertIndex(slotIndex, questionsForPractice.length);
        setQuestionsForPractice((prev) => [...prev.slice(0, at), question, ...prev.slice(at)]);
        setTotalQuestionsInSet((n) => n + 1);
        setSlotKinds((prev) => ({ ...shiftSlots(prev, at), [at]: 'redeem' }));
        setSlotOutcomes((prev) => shiftSlots(prev, at));
        pendingResetRef.current = { ...shiftSlots(pendingResetRef.current, at), [at]: questionId };
        backSoon = true;
      }

      setSlotOutcomes((prev) => ({
        ...prev,
        [slotIndex]: { kind: slotKind, correct: isCorrect, bonus, backTomorrow, backSoon, lessonIds: lessons },
      }));
    }

    if (nextFreeCount !== null && nextFreeCount === freeLimitNow()) {
      if (goldLoopOn) {
        // Show the out-of-questions panel once the student has seen this answer's result.
        window.setTimeout(() => setOutPanelReady(true), slotKind ? 3500 : 2000);
      } else if (!hasDismissedSeasonPassModal) {
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
      practiceBank,
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
        (!isPremiumEffective && dailyQuestionsAnswered >= dailyLimit)
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
  }, [currentQuestionIndex, questionsForPractice.length, showLoginModal, showSignupModal, showSeasonPassModal, isPremiumEffective, dailyQuestionsAnswered, dailyLimit]);

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

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            {!isTutorOpen ? (
              <Breadcrumb subject={subject} unitNumber={unitNumber} />
            ) : (
              <div className="min-w-0 flex-1" />
            )}
            {!isLoadingQuestionSet && (questionsForPractice.length > 0 || reviewState.misses.length > 0) ? (
              <div className="flex flex-shrink-0 flex-wrap items-center gap-x-4 gap-y-2">
                {!isPremiumEffective && !scratchActive ? (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold tabular-nums ${
                      dailyQuestionsAnswered >= dailyLimit
                        ? 'border-red-200 bg-red-50 text-red-700'
                        : goldBonus > 0
                          ? 'border-amber-300 bg-amber-50 text-amber-900'
                          : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    aria-live="polite"
                  >
                    {goldBonus > 0 ? <Sparkles className="h-3.5 w-3.5 text-amber-600" aria-hidden /> : null}
                    <span>
                      {Math.max(0, dailyLimit - dailyQuestionsAnswered)} of {dailyLimit}{' '}
                      <span className="sm:hidden">free left</span>
                      <span className="hidden sm:inline">free questions left today</span>
                    </span>
                  </span>
                ) : null}
                {REMATCH_ENABLED && !scratchActive ? (
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
                (!isPremiumEffective && dailyQuestionsAnswered >= dailyLimit)
              }
              onLoginPrompt={() => {
                if (!isPremiumEffective && dailyQuestionsAnswered >= dailyLimit) {
                  if (goldLoopOn) {
                    setOutPanelReady(true);
                  } else if (!hasDismissedSeasonPassModal) {
                    setShowSeasonPassModal(true);
                  }
                }
              }}
              isNavigationDisabled={
                (!isPremiumEffective && dailyQuestionsAnswered >= dailyLimit)
              }
              onTutorOpenChange={setIsTutorOpen}
              showFloatingScratchToolbar={false}
              scratchToggleSignal={scratchToggleSignal}
              onScratchActiveChange={setScratchActive}
              formulaToggleSignal={formulaToggleSignal}
              onFormulaActiveChange={setFormulaSheetOpen}
              questionTone={
                goldLoopOn && slotKinds[currentQuestionIndex]
                  ? slotOutcomes[currentQuestionIndex] && !slotOutcomes[currentQuestionIndex].correct
                    ? 'missed'
                    : slotKinds[currentQuestionIndex] === 'redeem'
                      ? 'redeem'
                      : 'gold'
                  : null
              }
              answerFeedback={
                goldLoopOn && slotKinds[currentQuestionIndex] && slotOutcomes[currentQuestionIndex]
                  ? slotOutcomes[currentQuestionIndex].correct
                    ? 'correct'
                    : 'incorrect'
                  : null
              }
              replacementPanel={
                goldLoopOn &&
                !isPremiumEffective &&
                dailyQuestionsAnswered >= dailyLimit &&
                (outPanelReady || !answeredQuestions[questionsForPractice[currentQuestionIndex]?.id]) ? (
                  <OutOfQuestionsPanel
                    missedGold={readGoldRedeem(user?.uid, subject)?.savedOn === localDateKey()}
                    onUnlock={() => setShowSeasonPassModal(true)}
                  />
                ) : null
              }
              questionBanner={
                goldLoopOn && slotKinds[currentQuestionIndex] ? (
                  <GoldQuestionBanner
                    kind={slotKinds[currentQuestionIndex]}
                    outcome={slotOutcomes[currentQuestionIndex]}
                  />
                ) : null
              }
              answerFooter={
                goldLoopOn && slotOutcomes[currentQuestionIndex] ? (
                  <GoldOutcomeNote outcome={slotOutcomes[currentQuestionIndex]} />
                ) : null
              }
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
