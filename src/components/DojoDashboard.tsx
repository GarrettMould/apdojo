'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText, Target, ChevronRight, CheckCircle2, Clock, ClipboardList, BookOpen, ChevronDown, ChevronUp, Lock, Zap, Sparkles, Brain } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCourseContext, useCourseTheme } from '@/contexts/CourseContext';
import { SubjectToggle } from '@/components/dashboard/SubjectToggle';
import { CourseToggle } from '@/components/CourseToggle';
import { dojoDrills, drillAppliesToSubject, getDrillUnitForSubject } from '@/data/dojoDrills';
import { frqExams } from '@/data/frqQuestions';
import { getBeltProgress } from '@/lib/beltSystem';
import { loadDojoDrillProgress, getDrillProgress, DojoDrillProgress } from '@/lib/dojoDrillProgress';
import { getSubjectXP } from '@/hooks/useUserProgress';
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc, collectionGroup } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuizHistoryEntry, restoreTableData } from '@/lib/quizHistory';
import { hasValidSeasonPass, getUnitMCQTestUrl } from '@/lib/utils';

// Container animation variants (LITE - very subtle)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Item animation variants (LITE - minimal movement)
const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Card hover animation (LITE - subtle lift with shadow)
const cardHoverVariants = {
  rest: { 
    y: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export function DojoDashboard() {
  const { user, totalXP, guestXp, unitPerformanceStats, userData, selectedSubject, setSelectedSubject } = useAuthContext();
  const { currentCourse } = useCourseContext();
  const theme = useCourseTheme();
  const [drillProgress, setDrillProgress] = useState<DojoDrillProgress | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [isProgressExpanded, setIsProgressExpanded] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>([]);
  const [loadingQuizHistory, setLoadingQuizHistory] = useState(true);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // Helper to check if user has access to a course
  const hasCourseAccess = useMemo(() => {
    if (!user || !userData) return false;
    // Check if user has valid season pass for the current course
    if (hasValidSeasonPass(userData, currentCourse as 'macro' | 'micro')) return true;
    // Check if user has purchased units (for now, assume any purchase = access)
    const purchasedTests = userData.purchasedTests as string[] | undefined;
    if (purchasedTests && purchasedTests.length > 0) return true;
    return false;
  }, [user, userData, currentCourse]);

  // Helper to check if a unit is locked
  const isUnitLocked = (unitNumber: number): boolean => {
    if (unitNumber === 1) return false; // Unit 1 is always free
    return !hasCourseAccess; // Units 2-6 require access
  };

  // Get XP from user or guest using the helper (with legacy fallback)
  const xp = user ? getSubjectXP(userData, currentCourse) : (guestXp ?? 0);

  // Calculate belt progress
  const beltProgress = getBeltProgress(xp);
  const { currentBelt, nextBelt, xpToNext, percent, nextBeltXP } = beltProgress;
  const beltName = currentBelt.name.replace(' Belt', '');
  const nextBeltName = nextBelt?.name.replace(' Belt', '') ?? '';

  // Load drill progress
  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        setLoadingProgress(true);
        try {
          const progress = await loadDojoDrillProgress(user.uid);
          setDrillProgress(progress);
        } catch (error) {
          console.error('[DojoDashboard] Error loading drill progress:', error);
        } finally {
          setLoadingProgress(false);
        }
      } else {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [user]);

  // Load quiz history
  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (user) {
        setLoadingQuizHistory(true);
        try {
          const q = query(
            collection(db, 'userQuizHistory'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc'),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          const history: QuizHistoryEntry[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Restore tableData format if present
            if (data.questions && Array.isArray(data.questions)) {
              data.questions = data.questions.map((q: any) => {
                if (q.tableData) {
                  q.tableData = restoreTableData(q.tableData);
                }
                return q;
              });
            }
            history.push({
              id: doc.id,
              ...data,
            } as QuizHistoryEntry);
          });
          console.log('[DojoDashboard] Loaded quiz history:', history.length, 'entries');
          setQuizHistory(history);
        } catch (error: any) {
          console.error('[DojoDashboard] Error loading quiz history:', error);
          // If it's an index error, log it but don't break
          if (error.code === 'failed-precondition') {
            console.warn('[DojoDashboard] Firestore index may need to be created. Check console for index URL.');
          }
          setQuizHistory([]); // Set empty array on error
        } finally {
          setLoadingQuizHistory(false);
        }
      } else {
        setLoadingQuizHistory(false);
        setQuizHistory([]);
      }
    };

    fetchQuizHistory();
  }, [user]);

  // Load recent activities from multiple sources
  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (user) {
        setLoadingActivities(true);
        try {
          const activities: any[] = [];

          // 1. Get quiz history (already have this, but need to format for activity feed)
          if (quizHistory.length > 0) {
            quizHistory.forEach(entry => {
              if (entry.totalQuestions > 0) { // At least one question answered
                // Filter by subject: check if any question matches current course
                const subjectMatch = entry.questions?.some(q => {
                  const questionSubject = q.subject;
                  if (Array.isArray(questionSubject)) {
                    return questionSubject.includes(currentCourse);
                  }
                  // Map 'ap_macroeconomics' to 'macro' and 'ap_microeconomics' to 'micro'
                  if (questionSubject === 'ap_macroeconomics' && currentCourse === 'macro') return true;
                  if (questionSubject === 'ap_microeconomics' && currentCourse === 'micro') return true;
                  return questionSubject === currentCourse;
                });
                
                if (subjectMatch) {
                  activities.push({
                    id: entry.id,
                    type: entry.type === 'cheat-sheet' ? 'quiz' : entry.type === 'infinite-drill' ? 'drill' : 'custom-quiz',
                    title: entry.title,
                    timestamp: entry.timestamp,
                    score: entry.score,
                    correctCount: entry.correctCount,
                    totalQuestions: entry.totalQuestions,
                    source: 'quizHistory'
                  });
                }
              }
            });
          }

          // 2. Get test progress (exams with at least one answer)
          try {
            const testProgressRef = doc(db, 'userTestProgress', user.uid);
            const testProgressDoc = await getDoc(testProgressRef);
            if (testProgressDoc.exists()) {
              const testsRef = collection(testProgressRef, 'tests');
              const testsSnapshot = await getDocs(testsRef);
              testsSnapshot.forEach(testDoc => {
                const testData = testDoc.data();
                const progress = testData.progress;
                if (progress && (
                  (progress.answeredQuestions && Object.keys(progress.answeredQuestions).length > 0) ||
                  (progress.textAnswers && Object.keys(progress.textAnswers).length > 0)
                )) {
                  const answeredCount = progress.answeredQuestions 
                    ? Object.keys(progress.answeredQuestions).length 
                    : (progress.textAnswers ? Object.keys(progress.textAnswers).length : 0);
                  
                  activities.push({
                    id: testDoc.id,
                    type: testData.testType === 'full_exam' ? 'full-exam' : testData.testType === 'unit_mcq' ? 'unit-exam' : 'frq-exam',
                    title: testData.testType === 'full_exam' ? 'Full MCQ Exam' : 
                           testData.testType === 'unit_mcq' ? `Unit ${testData.testId} MCQ Test` :
                           'Full FRQ Exam',
                    timestamp: progress.lastUpdated || progress.startedAt,
                    answeredCount,
                    totalQuestions: progress.totalQuestions,
                    isSubmitted: progress.isSubmitted,
                    score: progress.score,
                    source: 'testProgress'
                  });
                }
              });
            }
          } catch (error) {
            console.error('[DojoDashboard] Error loading test progress:', error);
          }

          // 3. Get test results (completed exams)
          try {
            const testResultsRef = doc(db, 'userTestResults', user.uid);
            const testResultsDoc = await getDoc(testResultsRef);
            console.log('[DojoDashboard] Test results doc exists:', testResultsDoc.exists());
            if (testResultsDoc.exists()) {
              const resultsRef = collection(testResultsRef, 'results');
              try {
                const resultsSnapshot = await getDocs(query(resultsRef, orderBy('completedAt', 'desc'), limit(10)));
                console.log('[DojoDashboard] Found', resultsSnapshot.size, 'test results');
                resultsSnapshot.forEach(resultDoc => {
                  const resultData = resultDoc.data();
                  console.log('[DojoDashboard] Processing test result:', {
                    id: resultDoc.id,
                    testType: resultData.testType,
                    testId: resultData.testId,
                    score: resultData.score
                  });
                  // Extract unit number from testId if it's a unit test
                  let title = 'Full MCQ Exam';
                  if (resultData.testType === 'unit_mcq') {
                    // testId format: unit_{unitNumber}_{subject} (e.g., "unit_3_macro")
                    const unitMatch = resultData.testId.match(/unit_(\d+)_/);
                    const unitNumber = unitMatch ? unitMatch[1] : resultData.testId.replace('unit_', '');
                    title = `Unit ${unitNumber} MCQ Test`;
                  } else if (resultData.testType === 'full_frq') {
                    title = 'Full FRQ Exam';
                  }

                  activities.push({
                    id: resultDoc.id,
                    type: resultData.testType === 'full_exam' ? 'full-exam' : resultData.testType === 'unit_mcq' ? 'unit-exam' : 'frq-exam',
                    title,
                    timestamp: resultData.completedAt,
                    score: resultData.score,
                    totalQuestions: resultData.totalQuestions,
                    source: 'testResults'
                  });
                });
              } catch (queryError: any) {
                console.error('[DojoDashboard] Error querying test results:', queryError);
                // If orderBy fails (e.g., missing index), try without orderBy
                if (queryError.code === 'failed-precondition') {
                  console.warn('[DojoDashboard] Index may be missing, trying without orderBy');
                  const resultsSnapshot = await getDocs(query(resultsRef, limit(10)));
                  console.log('[DojoDashboard] Found', resultsSnapshot.size, 'test results (without orderBy)');
                  resultsSnapshot.forEach(resultDoc => {
                    const resultData = resultDoc.data();
                    let title = 'Full MCQ Exam';
                    if (resultData.testType === 'unit_mcq') {
                      const unitMatch = resultData.testId.match(/unit_(\d+)_/);
                      const unitNumber = unitMatch ? unitMatch[1] : resultData.testId.replace('unit_', '');
                      title = `Unit ${unitNumber} MCQ Test`;
                    } else if (resultData.testType === 'full_frq') {
                      title = 'Full FRQ Exam';
                    }

                    activities.push({
                      id: resultDoc.id,
                      type: resultData.testType === 'full_exam' ? 'full-exam' : resultData.testType === 'unit_mcq' ? 'unit-exam' : 'frq-exam',
                      title,
                      timestamp: resultData.completedAt,
                      score: resultData.score,
                      totalQuestions: resultData.totalQuestions,
                      source: 'testResults'
                    });
                  });
                  // Sort manually by timestamp
                  activities.sort((a, b) => {
                    const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestamp ? new Date(a.timestamp).getTime() : 0);
                    const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestamp ? new Date(b.timestamp).getTime() : 0);
                    return timeB - timeA;
                  });
                } else {
                  throw queryError;
                }
              }
            }
          } catch (error) {
            console.error('[DojoDashboard] Error loading test results:', error);
          }

          // 4. Get dojo drill progress (drills with at least one stage completed)
          if (drillProgress) {
            const expectedSubject = currentCourse === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
            Object.entries(drillProgress).forEach(([drillId, progress]) => {
              if (progress.stage1 || progress.stage2 || progress.stage3) {
                const drill = Object.values(dojoDrills).find(d => d.id === drillId);
                // Filter by subject: only include drills matching current course
                if (drill && drillAppliesToSubject(drill, expectedSubject)) {
                  const drillUnit = getDrillUnitForSubject(drill, expectedSubject) || drill.unit;
                  activities.push({
                    id: `drill-${drillId}`,
                    type: 'dojo-drill',
                    title: drill.title,
                    timestamp: (progress as any).lastUpdated,
                    unit: drillUnit,
                    stagesCompleted: [progress.stage1, progress.stage2, progress.stage3].filter(Boolean).length,
                    source: 'drillProgress'
                  });
                }
              }
            });
          }

          // Sort by timestamp (most recent first) and limit to 10
          activities.sort((a, b) => {
            const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestamp ? new Date(a.timestamp).getTime() : 0);
            const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestamp ? new Date(b.timestamp).getTime() : 0);
            return timeB - timeA;
          });

          setRecentActivities(activities.slice(0, 10));
        } catch (error) {
          console.error('[DojoDashboard] Error loading recent activities:', error);
          setRecentActivities([]);
        } finally {
          setLoadingActivities(false);
        }
      } else {
        setLoadingActivities(false);
        setRecentActivities([]);
      }
    };

    // Only fetch activities if we have quiz history and drill progress loaded
    if (!loadingQuizHistory && !loadingProgress) {
      fetchRecentActivities();
    }
  }, [user, quizHistory, drillProgress, loadingQuizHistory, loadingProgress, currentCourse]);

  // Filter dojo drills by course
  const subjectFilter = currentCourse === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
  const filteredDrills = Object.values(dojoDrills).filter(
    (drill) => drillAppliesToSubject(drill, subjectFilter)
  );

  // Filter FRQ exams by course
  const filteredFRQs = frqExams.filter((exam) =>
    exam.questions.some((q) =>
      Array.isArray(q.subject) ? q.subject.includes(currentCourse) : q.subject === currentCourse
    )
  );

  // Get unique FRQ questions (flattened from exams)
  const allFRQQuestions = filteredFRQs.flatMap((exam) =>
    exam.questions.map((q) => ({
      ...q,
      examTitle: exam.examTitle,
      thumbnailUrl: exam.thumbnailUrl || '/images/frqPracticePage/unit4MacroFRQCover.jpg', // Fallback thumbnail
      unit: exam.unit,
    }))
  );

  // Limit to first 4 for display (4 per row, no second row)
  const displayedDrills = filteredDrills.slice(0, 4);
  const displayedFRQs = allFRQQuestions.slice(0, 4);

  // Full Exams data
  const fullExams = [
    {
      id: 'full-mcq-exam',
      title: 'Full MCQ Exam',
      description: 'Complete AP-style multiple choice exam',
      type: 'MCQ',
      href: '/full-mcq-exam',
    },
    {
      id: 'full-frq-exam',
      title: 'Full FRQ Exam',
      description: 'Complete AP-style free response exam',
      type: 'FRQ',
      href: '/full-frq-exam',
    },
  ];

  // Unit Exams data - create cards for units 1-6
  const unitExams = useMemo(() => {
    const units = currentCourse === 'macro' 
      ? [
          { number: 1, title: 'Basic Economic Concepts' },
          { number: 2, title: 'Economic Indicators and the Business Cycle' },
          { number: 3, title: 'National Income and Price Determination' },
          { number: 4, title: 'Financial Sector' },
          { number: 5, title: 'Long-Run Consequences of Stabilization Policies' },
          { number: 6, title: 'Open Economy—International Trade and Finance' },
        ]
      : [
          { number: 1, title: 'Basic Economic Concepts' },
          { number: 2, title: 'Supply and Demand' },
          { number: 3, title: 'Production, Cost, and the Perfect Competition Model' },
          { number: 4, title: 'Imperfect Competition' },
          { number: 5, title: 'Factor Markets' },
          { number: 6, title: 'Market Failure and the Role of Government' },
        ];
    
    return units.map(unit => ({
      id: `unit-${unit.number}`,
      title: `Unit ${unit.number} Test`,
      description: unit.title,
      unitNumber: unit.number,
      href: getUnitMCQTestUrl(unit.number, currentCourse as 'macro' | 'micro'),
      isLocked: isUnitLocked(unit.number),
    }));
  }, [currentCourse, hasCourseAccess]);

  // Limit to first 4 for display
  const displayedFullExams = fullExams.slice(0, 4);
  const displayedUnitExams = unitExams.slice(0, 4);

  // Get unit performance stats for current course
  const currentSubjectStats = useMemo(() => {
    if (!unitPerformanceStats) return [];
    return unitPerformanceStats.filter(stat => stat.subject === currentCourse);
  }, [unitPerformanceStats, currentCourse]);

  // Find weakest and strongest units
  const weakestUnit = useMemo(() => {
    if (currentSubjectStats.length === 0) return null;
    return currentSubjectStats.reduce((prev, current) => 
      current.percentage < prev.percentage ? current : prev
    );
  }, [currentSubjectStats]);

  const strongestUnit = useMemo(() => {
    if (currentSubjectStats.length === 0) return null;
    return currentSubjectStats.reduce((prev, current) => 
      current.percentage > prev.percentage ? current : prev
    );
  }, [currentSubjectStats]);

  // Get unit names
  const getUnitName = (unitId: number): string => {
    const units = currentCourse === 'macro' 
      ? [
          { number: 1, title: 'Basic Economic Concepts' },
          { number: 2, title: 'Economic Indicators and the Business Cycle' },
          { number: 3, title: 'National Income and Price Determination' },
          { number: 4, title: 'Financial Sector' },
          { number: 5, title: 'Long-Run Consequences of Stabilization Policies' },
          { number: 6, title: 'Open Economy—International Trade and Finance' },
        ]
      : [
          { number: 1, title: 'Basic Economic Concepts' },
          { number: 2, title: 'Supply and Demand' },
          { number: 3, title: 'Production, Cost, and the Perfect Competition Model' },
          { number: 4, title: 'Imperfect Competition' },
          { number: 5, title: 'Factor Markets' },
          { number: 6, title: 'Market Failure and the Role of Government' },
        ];
    const unit = units.find(u => u.number === unitId);
    return unit ? `Unit ${unitId}: ${unit.title}` : `Unit ${unitId}`;
  };

  // Helper to check if drill is completed
  const isDrillCompleted = (drillId: string): boolean => {
    if (!drillProgress) return false;
    const progress = getDrillProgress(drillProgress, drillId);
    return progress ? progress.stage1 && progress.stage2 && progress.stage3 : false;
  };

  // Helper to check if drill is in progress
  const isDrillInProgress = (drillId: string): boolean => {
    if (!drillProgress) return false;
    const progress = getDrillProgress(drillProgress, drillId);
    return progress ? (progress.stage1 || progress.stage2 || progress.stage3) && !(progress.stage1 && progress.stage2 && progress.stage3) : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Toggle - Mobile Only (visible on small screens) */}
        <div className="mb-4 md:hidden">
          <CourseToggle activeTab={selectedSubject} onToggle={setSelectedSubject} />
        </div>
        {/* Compact Progress Header - Expandable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            {/* Main Header - Always Visible */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsProgressExpanded(!isProgressExpanded)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Belt Badge with Image */}
                  {(() => {
                    const getBeltImage = () => {
                      if (currentBelt.name === 'White Belt') {
                        return '/images/beltNewWhite.svg';
                      } else if (currentBelt.name === 'Yellow Belt') {
                        return '/images/beltNewYellow.svg';
                      } else if (currentBelt.name === 'Green Belt') {
                        return '/images/beltNewGreen.svg';
                      } else if (currentBelt.name === 'Purple Belt') {
                        return '/images/beltNewPurple.svg';
                      } else if (currentBelt.name === 'Black Belt') {
                        return '/images/beltNewBlack.svg';
                      } else {
                        return '/images/beltNewWhite.svg'; // Default to white
                      }
                    };
                    
                    return (
                      <>
                        <div className="flex-shrink-0">
              <Image
                            src={getBeltImage()}
                            alt={currentBelt.name}
                            width={96}
                            height={96}
                            className="w-24 h-auto"
                          />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{currentBelt.label}</h2>
                          <p className="text-sm text-gray-600">
                            {xp.toLocaleString()} XP
                            {nextBelt && ` • ${xpToNext?.toLocaleString() || 0} to ${nextBeltName}`}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="flex items-center gap-4">
                  {/* Subject Toggle */}
                  <div className="hidden md:block">
                    <CourseToggle activeTab={selectedSubject} onToggle={setSelectedSubject} />
                  </div>
                  {/* XP Progress Bar */}
                  {nextBelt && (
                    <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                          className={`h-full ${theme.primary} rounded-full`}
                    initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{Math.round(percent)}%</span>
                    </div>
                  )}
                  {/* Expand/Collapse Button */}
                  <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                    {isProgressExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isProgressExpanded && (
            <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                    {/* Weakest and Strongest Units */}
                    {(weakestUnit || strongestUnit) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Strongest Unit */}
                        {strongestUnit && (
                          <div className="bg-green-100 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="w-6 h-6 text-green-700" />
                              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Strongest Unit</h3>
                </div>
                            <p className="text-lg font-black text-green-800 mb-1">{getUnitName(strongestUnit.unitId)}</p>
                            <p className="text-base font-bold text-gray-700">{strongestUnit.percentage}% correct</p>
                </div>
                        )}
                        {/* Weakest Unit */}
                        {weakestUnit && (
                          <div className="bg-red-100 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="w-6 h-6 text-red-700" />
                              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Weakest Unit</h3>
              </div>
                            <p className="text-lg font-black text-red-800 mb-1">{getUnitName(weakestUnit.unitId)}</p>
                            <p className="text-base font-bold text-gray-700">{weakestUnit.percentage}% correct</p>
                </div>
                        )}
          </div>
                    )}

                    {/* All Units Performance */}
                    {currentSubjectStats.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Unit Performance</h3>
                        <div className="space-y-3">
                          {currentSubjectStats.map((stat) => (
                            <div key={stat.unitId} className="bg-white border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-black text-gray-900">Unit {stat.unitId}</span>
                                  <span className="text-sm font-semibold text-gray-700">{getUnitName(stat.unitId).split(': ')[1]}</span>
                      </div>
                                <span className="text-lg font-black text-gray-900">{stat.percentage}%</span>
                        </div>
                              <div className="h-6 w-full bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stat.percentage}%` }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                                    stat.percentage >= 80
                                ? 'bg-green-500'
                                      : stat.percentage >= 60
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Stats Available */}
                    {currentSubjectStats.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500">Complete practice questions to see your unit performance</p>
                      </div>
                    )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Library</h1>
          <p className="text-gray-600">Continue learning with your saved content</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCourse}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
          {/* Quick Access Section - Moved to Top */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/unitMCQPracticePage">
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className={`bg-white rounded-lg p-6 cursor-pointer border border-gray-200 ${theme.hoverBorder} transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <Image
                        src="/images/boltGrey.svg"
                        alt="MCQ Practice"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">MCQ Practice</h3>
                      <p className="text-sm text-gray-600">Practice questions by unit</p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/dojo/infinite">
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className={`bg-white rounded-lg p-6 cursor-pointer border border-gray-200 ${theme.hoverBorder} transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <Brain className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Generate Quiz</h3>
                      <p className="text-sm text-gray-600">AI-powered practice mode</p>
                    </div>
                      </div>
                </motion.div>
              </Link>

              <Link href="/diagnostic-test">
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className={`bg-white rounded-lg p-6 cursor-pointer border border-gray-200 ${theme.hoverBorder} transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <Image
                        src="/images/fiveGrey.svg"
                        alt="Diagnostic Test"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Diagnostic Test</h3>
                      <p className="text-sm text-gray-600">Assess your knowledge</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.section>

          {/* Recent Activity Row */}
          {!loadingActivities && recentActivities.length > 0 && (
            <section style={{ opacity: 1, visibility: 'visible', position: 'relative', zIndex: 10 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <Link
                  href="/my-assignment-history"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                  See All Activity
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recentActivities.slice(0, 4).map((activity) => {
                  // Determine thumbnail type and icon
                  let thumbnailType: 'micro' | 'macro' | 'drill' | 'exam' | 'resource' = 'exam';
                  let Icon = FileText;
                  let href = '#';
                  
                  if (activity.type === 'dojo-drill') {
                    thumbnailType = 'drill';
                    Icon = Zap;
                    href = `/dojo-drills/preview/${activity.id.replace('drill-', '')}`;
                  } else if (activity.type === 'quiz' || activity.type === 'custom-quiz') {
                    thumbnailType = currentCourse === 'macro' ? 'macro' : 'micro';
                    Icon = Zap;
                    href = `/dashboard/history/${activity.id}`;
                  } else if (activity.type === 'full-exam') {
                    thumbnailType = 'exam';
                    Icon = ClipboardList;
                    href = '/full-mcq-exam';
                  } else if (activity.type === 'unit-exam') {
                    thumbnailType = 'exam';
                    Icon = BookOpen;
                    const unitMatch = activity.title.match(/Unit (\d+)/);
                    href = unitMatch ? getUnitMCQTestUrl(parseInt(unitMatch[1]), currentCourse as 'macro' | 'micro') : '#';
                  } else if (activity.type === 'frq-exam') {
                    thumbnailType = 'exam';
                    Icon = FileText;
                    href = '/full-frq-exam';
                  }

                  const unitMatch = activity.title.match(/Unit (\d+)/i);
                  const unitNumber = unitMatch ? unitMatch[1] : undefined;

                  return (
                    <motion.div
                      key={activity.id}
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      className="group"
                      style={{ opacity: 1, visibility: 'visible' }}
                    >
                      <Link href={href}>
                        <motion.div
                          variants={cardHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          className="bg-white border border-gray-300 rounded-lg p-6 text-left transition-all flex flex-col h-full relative overflow-hidden"
                          style={{ 
                            backgroundColor: '#ffffff',
                            opacity: 1,
                            visibility: 'visible',
                            zIndex: 1
                          }}
                        >
                          {/* Header: Icon, XP, Activity Type */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                                {activity.type === 'dojo-drill' ? (
                                  <Image
                                    src="/images/dojoIconBold.png"
                                    alt="Drill"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                  />
                                ) : activity.type === 'frq-exam' ? (
                                  <Image
                                    src="/images/pencilFinal.svg"
                                    alt="FRQ"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                  />
                                ) : activity.type === 'unit-exam' || activity.type === 'full-exam' ? (
                                  <Image
                                    src="/images/exam.svg"
                                    alt="Exam"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  <Icon className="w-5 h-5 text-gray-700" />
                                )}
                              </div>
                              <div className="flex flex-col gap-1">
                                {unitNumber && (
                                  <span className="text-xs font-medium text-gray-500">Unit {unitNumber}</span>
                                )}
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                  {activity.type === 'dojo-drill' ? 'Drill' : activity.type === 'full-exam' ? 'Exam' : activity.type === 'unit-exam' ? 'Test' : activity.type === 'frq-exam' ? 'FRQ' : 'Quiz'}
                                </span>
                              </div>
                            </div>
                            {activity.xpReward !== undefined && (
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                <span>{activity.xpReward.toLocaleString()}</span>
                                <Image
                                  src="/images/flame100.png"
                                  alt="XP"
                                  width={16}
                                  height={16}
                                  className="w-4 h-4"
                                />
                              </div>
                            )}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {activity.title}
                          </h3>
                          
                          {/* Meta */}
                          <div className="mt-auto space-y-2">
                            {activity.score !== undefined && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">{activity.score}%</span>
                                <span className="text-sm text-gray-500">correct</span>
                              </div>
                            )}
                            {activity.answeredCount && !activity.isSubmitted && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">{activity.answeredCount}/{activity.totalQuestions}</span>
                                <span className="text-sm text-gray-500">answered</span>
                              </div>
                            )}
                            {activity.stagesCompleted && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">{activity.stagesCompleted}/3</span>
                                <span className="text-sm text-gray-500">stages completed</span>
                              </div>
                            )}
                            {activity.timestamp && (
                              <p className="text-xs text-gray-400 mt-2">
                                {activity.timestamp.toDate ? new Date(activity.timestamp.toDate()).toLocaleDateString() : 
                                 activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Recently'}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Dojo Drills Row */}
          {displayedDrills.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Dojo Drills</h2>
                <Link
                  href="/dojo-drills"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                  See all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedDrills.map((drill) => {
                  const isCompleted = isDrillCompleted(drill.id);
                  const inProgress = isDrillInProgress(drill.id);
                  
                  return (
                    <motion.div
                      key={drill.id}
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      className="group relative"
                    >
                      <Link href={`/dojo-drills/preview/${drill.id}`}>
                        <motion.div
                          variants={cardHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          className="bg-white border border-gray-300 rounded-lg p-6 text-left transition-all flex flex-col h-full overflow-hidden"
                        >
                          {/* Header: Icon, XP, Activity Type */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Image
                                  src="/images/dojoIconBold.png"
                                  alt="Drill"
                                  width={20}
                                  height={20}
                                  className="w-5 h-5"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-medium text-gray-500">Unit {(getDrillUnitForSubject(drill, subjectFilter) || drill.unit).toString().padStart(2, '0')}</span>
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Drill</span>
                              </div>
                            </div>
                            {drill.xpReward.total !== undefined && (
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                <span>{drill.xpReward.total.toLocaleString()}</span>
                                <Image
                                  src="/images/flame100.png"
                                  alt="XP"
                                  width={16}
                                  height={16}
                                  className="w-4 h-4"
                                />
                              </div>
                            )}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {drill.title}
                          </h3>
                          
                          {/* Meta */}
                          <div className="flex items-center justify-between mt-auto">
                            {inProgress && (
                              <span className="text-xs text-blue-600 font-medium">Continue</span>
                            )}
                            {isCompleted && (
                              <span className="text-xs text-green-600 font-medium">Completed</span>
                            )}
                            {!inProgress && !isCompleted && <span></span>}
                          </div>
                        </motion.div>
                      </Link>
                </motion.div>
              );
            })}
          </div>
            </motion.section>
          )}

          {/* FRQ Practice Row */}
          {displayedFRQs.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FRQ Practice</h2>
                <Link
                  href="/unitFRQpracticePage"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                  See all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedFRQs.map((frq, index) => (
                  <motion.div
                    key={frq.id || index}
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="group"
                  >
                    <Link href={`/unitFRQpracticePage?frqId=${frq.id}`}>
                      <motion.div
                        variants={cardHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="bg-white border border-gray-300 rounded-lg p-6 text-left transition-all flex flex-col h-full overflow-hidden"
                      >
                        {/* Header: Icon, XP, Activity Type */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Image
                                src="/images/pencilFinal.svg"
                                alt="FRQ"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              {frq.unit && (
                                <span className="text-xs font-medium text-gray-500">Unit {frq.unit.toString().padStart(2, '0')}</span>
                              )}
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">FRQ</span>
                            </div>
                          </div>
                          {frq.totalPoints && (
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                              <span>{(frq.totalPoints * 100).toLocaleString()}</span>
                              <Image
                                src="/images/flame100.png"
                                alt="XP"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {frq.title}
                        </h3>
                        
                        {/* Meta */}
                        {frq.unit && (
                          <p className="text-sm text-gray-500 mt-auto">Unit {frq.unit}</p>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Full Exams Row */}
          {displayedFullExams.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Full Exams</h2>
                <Link
                  href="/full-mcq-exam"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                  See all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedFullExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="group"
                  >
                    <Link href={exam.href}>
                      <motion.div
                        variants={cardHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="bg-white border border-gray-300 rounded-lg p-6 text-left transition-all flex flex-col h-full overflow-hidden"
                      >
                        {/* Header: Icon, XP, Activity Type */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Image
                                src="/images/exam.svg"
                                alt="Exam"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Exam</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                            <span>6,000</span>
                            <Image
                              src="/images/flame100.png"
                              alt="XP"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {exam.title}
                        </h3>
                        
                        {/* Meta */}
                        <p className="text-sm text-gray-500 mt-auto">{exam.description}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Unit Exams Row */}
          {displayedUnitExams.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Unit Exams</h2>
                <Link
                  href={getUnitMCQTestUrl(1, currentCourse as 'macro' | 'micro')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                  See all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedUnitExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="group"
                  >
                    <Link href={exam.isLocked ? `/purchase/season-pass?courseType=${currentCourse}` : exam.href}>
                      <motion.div
                        variants={cardHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="bg-white border border-gray-300 rounded-lg p-6 text-left transition-all relative overflow-hidden flex flex-col h-full"
                      >
                        {/* Header: Icon, XP, Activity Type */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Image
                                src="/images/exam.svg"
                                alt="Exam"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              {exam.unitNumber && (
                                <span className="text-xs font-medium text-gray-500">Unit {exam.unitNumber.toString().padStart(2, '0')}</span>
                              )}
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Test</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                            <span>1,000</span>
                            <Image
                              src="/images/flame100.png"
                              alt="XP"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold line-clamp-2 mb-3 text-gray-900">
                          {exam.title}
                        </h3>
                        
                        {/* Meta */}
                        <p className="text-sm line-clamp-2 mt-auto text-gray-500">{exam.description}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}


          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
