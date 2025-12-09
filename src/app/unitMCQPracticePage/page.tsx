'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Loader2, Lock, ArrowRight } from 'lucide-react';
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
          <Button size="lg" className={`w-full ${subject === 'macro' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}>
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
    awardXp,
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

  const [practiceMode, setPracticeMode] = useState<PracticeMode>(initialPracticeMode);
  const [currentUnit, setCurrentUnit] = useState<number>(initialCustomUnitIds[0] || 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  const [questionsForPractice, setQuestionsForPractice] = useState<QuestionType[]>([]);
  const [isLoadingQuestionSet, setIsLoadingQuestionSet] = useState(true);
  const [customUnitIds, setCustomUnitIds] = useState<number[]>(initialCustomUnitIds);
  const [weakestUnitIds, setWeakestUnitIds] = useState<number[]>([]);
  const [dojoProgress, setDojoProgress] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [totalQuestionsInSet, setTotalQuestionsInSet] = useState(0);
  const [currentUnitName, setCurrentUnitName] = useState('');
  const [showPracticeTestBanner, setShowPracticeTestBanner] = useState(false);
  const [practiceBannerDismissed, setPracticeBannerDismissed] = useState(false);
  const [questionsAnsweredSinceBannerShown, setQuestionsAnsweredSinceBannerShown] = useState(0);
  const purchasedTests = (userData?.purchasedTests || []) as string[];

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
      console.log('[UnitMCQPractice] Weakest units calculated:', weakestIds);
    }
  }, [mcqAnswersData, loadingMcqData, practiceMode]);

  // Load questions based on practice mode
  useEffect(() => {
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

    // Shuffle questions
    const shuffled = shuffleArray(questions);
    setQuestionsForPractice(shuffled);
    setTotalQuestionsInSet(shuffled.length);
    setCurrentQuestionIndex(0);
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
  }, [practiceMode, currentUnit, customUnitIds, weakestUnitIds, lessonIdParam, subject]);

  // Access control check
  useEffect(() => {
    if (!user) {
      setHasAccess(true); // Allow access for non-logged-in users in practice mode
      setIsVerifying(false);
      return;
    }

    // For practice mode, allow access
    if (practiceMode !== 'singleUnit' || !currentUnitForAccessCheck) {
      setHasAccess(true);
      setIsVerifying(false);
      return;
    }

    // Check if user has purchased the test
    const purchasedTests = userData?.purchasedTests || [];
    if (purchasedTests.includes(currentUnitForAccessCheck)) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
    setIsVerifying(false);
  }, [user, userData, currentUnitForAccessCheck, practiceMode]);

  // Show banner after 3 questions answered (unless dismissed)
  useEffect(() => {
    const answeredCount = Object.keys(answeredQuestions).length;
    if (answeredCount >= 3 && !practiceBannerDismissed && !showPracticeTestBanner) {
      setShowPracticeTestBanner(true);
      setQuestionsAnsweredSinceBannerShown(0);
    }
  }, [answeredQuestions, practiceBannerDismissed, showPracticeTestBanner]);

  // Auto-close banner after 2 more questions answered (without clicking it)
  useEffect(() => {
    if (showPracticeTestBanner && !practiceBannerDismissed) {
      const answeredCount = Object.keys(answeredQuestions).length;
      // Count questions answered since banner appeared (banner shows at 3, so count from 3)
      const questionsSinceBanner = answeredCount >= 3 ? answeredCount - 3 : 0;
      
      if (questionsSinceBanner >= 2) {
        setShowPracticeTestBanner(false);
        setPracticeBannerDismissed(true);
      }
    }
  }, [answeredQuestions, showPracticeTestBanner, practiceBannerDismissed]);

  const handleClosePracticeTestBanner = () => {
    setShowPracticeTestBanner(false);
    setPracticeBannerDismissed(true);
  };

  const handleEnterTestMode = () => {
    // Only Macro has unit MCQ tests wired up currently
    if (subject !== 'macro') {
      return;
    }

    if (!user) {
      setShowLoginModal(true);
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
    router.push(`/unit-mcq-test/${currentUnit}`);
  };

  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
    console.log('[UnitMCQ] handleAnswer called:', { questionId, answerLetter, isCorrect, hasAwardXp: !!awardXp });
    
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
    setCurrentUnit(unitNumber);
    setCurrentQuestionIndex(0);
  };

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
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        {/* Sticky Practice Test Banner - Fixed to bottom of header */}
        <div 
          className={`fixed top-16 left-0 right-0 z-40 ${subject === 'macro' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-green-600 to-green-700'} text-white shadow-lg transition-all duration-500 ease-out ${
            showPracticeTestBanner 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <p className="text-xs md:text-sm font-medium">
                  Ready for a full-length exam? Test your knowledge with our practice tests! <span className="text-base md:text-lg">🎯</span>
                </p>
                <Link href="/unit-final-practice-tests">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-medium whitespace-nowrap backdrop-blur-sm"
                  >
                    View Practice Tests
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <button
                onClick={handleClosePracticeTestBanner}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Dismiss practice test banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Add padding-top to account for fixed banner below header */}
        <div className={`max-w-7xl mx-auto px-4 py-8 ${showPracticeTestBanner ? 'pt-20' : 'pt-8'}`}>
          {isLoadingQuestionSet ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className={`h-12 w-12 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`} />
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
              totalQuestions={totalQuestionsInSet}
              unitName={currentUnitName}
              subject={subject} 
              practiceUnitIds={relevantUnitIdsForDisplay}
              isParentModalOpen={showLoginModal || showSignupModal}
              hasTestModeAccess={hasTestModeAccess}
              onEnterTestMode={handleEnterTestMode}
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



