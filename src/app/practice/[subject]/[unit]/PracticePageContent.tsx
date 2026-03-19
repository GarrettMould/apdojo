'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock, ArrowRight, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { useCreditSystem } from '@/hooks/useCreditSystem';
import { UnitMCQs } from '@/components/unitMCQS';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { logger } from '@/utils/logger';
import { getFullUnitName, getSubjectDisplayName, getSubjectSlug, getUnitSlug } from '@/lib/practiceSlugs';

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

// Breadcrumb Component
function Breadcrumb({ subject, unitNumber }: { subject: 'macro' | 'micro'; unitNumber: number }) {
  const subjectName = getSubjectDisplayName(subject);
  const unitName = getFullUnitName(subject, unitNumber);
  const subjectSlug = getSubjectSlug(subject);
  
  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
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
  subject: 'macro' | 'micro';
  unitNumber: number;
}

export function PracticePageContent({ subject, unitNumber }: PracticePageContentProps) {
  const router = useRouter();
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
  
  // Access Control State
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

  const unitsData = subject === 'micro' ? allMicroUnitsData : allMacroUnitsData;
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
    const subjectFilter = subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    
    let questions: QuestionType[] = allQuestions.filter(q => 
      q.subject === subjectFilter && 
      q.unit === unitNumber &&
      !q.isTest // Exclude test questions for practice mode
    );

    // Filter out correctly answered questions (unless showAllQuestions is true)
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
        
        console.log('[PracticePageContent] Filtered out correctly answered questions', {
          totalCorrectlyAnswered: correctlyAnsweredQuestionIds.size,
          remainingQuestions: questions.length
        });
      }
    }

    // Shuffle questions
    const shuffled = shuffleArray(questions);
    setQuestionsForPractice(shuffled);
    setTotalQuestionsInSet(shuffled.length);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions({});
    
    // Set unit name for display
    const unit = unitsData.find(u => u.number === unitNumber);
    setCurrentUnitName(unit ? `Unit ${unitNumber}: ${unit.title}` : `Unit ${unitNumber}`);

    setIsLoadingQuestionSet(false);
  }, [subject, unitNumber, showAllQuestions, user, loadingMcqData, mcqAnswersData]);

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

  const handleUnitChange = (unitNumber: number) => {
    // Navigate to new unit using the new route structure
    const subjectSlug = getSubjectSlug(subject);
    const unitSlug = getUnitSlug(unitNumber, subject);
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
        <Loader2 className={`h-12 w-12 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`} />
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
          subject={subject}
          onClose={() => {
            setShowSeasonPassModal(false);
            setHasDismissedSeasonPassModal(true);
          }}
        />
      )}
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8 pt-8">
          {/* Breadcrumb */}
          <Breadcrumb subject={subject} unitNumber={unitNumber} />
          
          {/* Page Title */}
          <h1 className="text-4xl font-black text-gray-900 mb-8">
            {fullUnitName}
          </h1>

          {isLoadingQuestionSet ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className={`h-12 w-12 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`} />
            </div>
          ) : questionsForPractice.length === 0 && !showAllQuestions ? (
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
              units={unitsData}
              dojoProgress={dojoProgress}
              correctStreak={correctStreak}
              isWeakestUnitsMode={false}
              isTopicMode={false}
              totalQuestions={totalQuestionsInSet}
              unitName={currentUnitName}
              subject={subject} 
              practiceUnitIds={[unitNumber]}
              isParentModalOpen={showLoginModal || showSignupModal}
              hasTestModeAccess={!!user && purchasedTests.includes(String(unitNumber))}
              onEnterTestMode={() => {
                const price = unitsData.find(u => u.number === unitNumber)?.price || 4.99;
                if (!purchasedTests.includes(String(unitNumber))) {
                  router.push(`/purchase/mcq-practice?units=${unitNumber}&total=${price}&subject=${subject}`);
                } else {
                  router.push(`/ap-${subject}-unit-${unitNumber}-mcq-test`);
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
            />
          )}
        </div>
      </div>
    </>
  );
}
