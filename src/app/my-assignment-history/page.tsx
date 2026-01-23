'use client';

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCourseContext, CourseProvider } from '@/contexts/CourseContext';
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc, collectionGroup } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuizHistoryEntry, restoreTableData } from '@/lib/quizHistory';
import { getUnitMCQTestUrl } from '@/lib/utils';
import { dojoDrills, drillAppliesToSubject, getDrillUnitForSubject } from '@/data/dojoDrills';
import { loadDojoDrillProgress } from '@/lib/dojoDrillProgress';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, ClipboardList, BookOpen, Zap, Sparkles, ChevronRight, Loader2 } from 'lucide-react';

interface Activity {
  id: string;
  type: 'quiz' | 'custom-quiz' | 'dojo-drill' | 'full-exam' | 'unit-exam' | 'frq-exam';
  title: string;
  timestamp: any;
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
  answeredCount?: number;
  isSubmitted?: boolean;
  unit?: number;
  stagesCompleted?: number;
  source: 'quizHistory' | 'testProgress' | 'testResults' | 'drillProgress';
  xpEarned?: number;
}

function MyAssignmentHistoryContent() {
  const { user } = useAuthContext();
  const { currentCourse } = useCourseContext();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllActivities = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const allActivities: Activity[] = [];

        // 1. Get quiz history
        try {
          const q = query(
            collection(db, 'userQuizHistory'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc')
          );
          const querySnapshot = await getDocs(q);
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
            const entry = {
              id: doc.id,
              ...data,
            } as QuizHistoryEntry;

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

            if (subjectMatch && entry.totalQuestions > 0) {
              allActivities.push({
                id: entry.id,
                type: entry.type === 'cheat-sheet' ? 'quiz' : entry.type === 'infinite-drill' ? 'dojo-drill' : 'custom-quiz',
                title: entry.title,
                timestamp: entry.timestamp,
                score: entry.score,
                correctCount: entry.correctCount,
                totalQuestions: entry.totalQuestions,
                xpEarned: entry.xpEarned,
                source: 'quizHistory'
              });
            }
          });
        } catch (error: any) {
          console.error('[MyAssignmentHistory] Error loading quiz history:', error);
          if (error.code === 'failed-precondition') {
            console.warn('[MyAssignmentHistory] Firestore index may need to be created.');
          }
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
                
                allActivities.push({
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
          console.error('[MyAssignmentHistory] Error loading test progress:', error);
        }

        // 3. Get test results (completed exams)
        try {
          const testResultsRef = doc(db, 'userTestResults', user.uid);
          const testResultsDoc = await getDoc(testResultsRef);
          console.log('[MyAssignmentHistory] Test results doc exists:', testResultsDoc.exists());
          if (testResultsDoc.exists()) {
            const resultsRef = collection(testResultsRef, 'results');
            try {
              const resultsSnapshot = await getDocs(query(resultsRef, orderBy('completedAt', 'desc')));
              console.log('[MyAssignmentHistory] Found', resultsSnapshot.size, 'test results');
              resultsSnapshot.forEach(resultDoc => {
                const resultData = resultDoc.data();
                console.log('[MyAssignmentHistory] Processing test result:', {
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

                allActivities.push({
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
              console.error('[MyAssignmentHistory] Error querying test results:', queryError);
              // If orderBy fails (e.g., missing index), try without orderBy
              if (queryError.code === 'failed-precondition') {
                console.warn('[MyAssignmentHistory] Index may be missing, trying without orderBy');
                const resultsSnapshot = await getDocs(resultsRef);
                console.log('[MyAssignmentHistory] Found', resultsSnapshot.size, 'test results (without orderBy)');
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

                  allActivities.push({
                    id: resultDoc.id,
                    type: resultData.testType === 'full_exam' ? 'full-exam' : resultData.testType === 'unit_mcq' ? 'unit-exam' : 'frq-exam',
                    title,
                    timestamp: resultData.completedAt,
                    score: resultData.score,
                    totalQuestions: resultData.totalQuestions,
                    source: 'testResults'
                  });
                });
              } else {
                throw queryError;
              }
            }
          }
        } catch (error) {
          console.error('[MyAssignmentHistory] Error loading test results:', error);
        }

        // 4. Get dojo drill progress (drills with at least one stage completed)
        try {
          const drillProgress = await loadDojoDrillProgress(user.uid);
          if (drillProgress) {
            const expectedSubject = currentCourse === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
            Object.entries(drillProgress).forEach(([drillId, progress]: [string, any]) => {
              if (progress.stage1 || progress.stage2 || progress.stage3) {
                const drill = Object.values(dojoDrills).find(d => d.id === drillId);
                // Filter by subject: only include drills matching current course
                if (drill && drillAppliesToSubject(drill, expectedSubject)) {
                  const drillUnit = getDrillUnitForSubject(drill, expectedSubject) || drill.unit;
                  allActivities.push({
                    id: `drill-${drillId}`,
                    type: 'dojo-drill',
                    title: drill.title,
                    timestamp: progress.lastUpdated,
                    unit: drillUnit,
                    stagesCompleted: [progress.stage1, progress.stage2, progress.stage3].filter(Boolean).length,
                    source: 'drillProgress'
                  });
                }
              }
            });
          }
        } catch (error) {
          console.error('[MyAssignmentHistory] Error loading drill progress:', error);
        }

        // Sort by timestamp (most recent first)
        allActivities.sort((a, b) => {
          const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestamp ? new Date(a.timestamp).getTime() : 0);
          const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestamp ? new Date(b.timestamp).getTime() : 0);
          return timeB - timeA;
        });

        setActivities(allActivities);
      } catch (error) {
        console.error('[MyAssignmentHistory] Error loading activities:', error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllActivities();
  }, [user, currentCourse]);

  const getActivityHref = (activity: Activity): string => {
    if (activity.type === 'dojo-drill') {
      return `/dojo-drills/preview/${activity.id.replace('drill-', '')}`;
    } else if (activity.type === 'quiz' || activity.type === 'custom-quiz') {
      return `/dashboard/history/${activity.id}`;
    } else if (activity.type === 'full-exam') {
      return '/full-mcq-exam';
    } else if (activity.type === 'unit-exam') {
      const unitMatch = activity.title.match(/Unit (\d+)/);
      return unitMatch ? getUnitMCQTestUrl(parseInt(unitMatch[1]), currentCourse as 'macro' | 'micro') : '#';
    } else if (activity.type === 'frq-exam') {
      return '/full-frq-exam';
    }
    return '#';
  };

  const getActivityIcon = (activity: Activity) => {
    if (activity.type === 'dojo-drill') {
      return <Image src="/images/dojoIconBold.png" alt="Drill" width={20} height={20} className="w-5 h-5" />;
    } else if (activity.type === 'quiz' || activity.type === 'custom-quiz') {
      return <Image src="/images/boltIcon.svg" alt="Quiz" width={20} height={20} className="w-5 h-5" />;
    } else if (activity.type === 'frq-exam') {
      return <Image src="/images/pencilFinal.svg" alt="FRQ" width={20} height={20} className="w-5 h-5" />;
    } else {
      return <Image src="/images/exam.svg" alt="Exam" width={20} height={20} className="w-5 h-5" />;
    }
  };

  const getActivityTypeLabel = (activity: Activity): string => {
    if (activity.type === 'dojo-drill') return 'Drill';
    if (activity.type === 'quiz' || activity.type === 'custom-quiz') return 'Quiz';
    if (activity.type === 'full-exam') return 'Full Exam';
    if (activity.type === 'unit-exam') return 'Unit Exam';
    if (activity.type === 'frq-exam') return 'FRQ Exam';
    return 'Activity';
  };

  const formatDate = (timestamp: any): string => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your activity history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Activity History</h1>
          <p className="text-gray-600">View all your assignments, exams, and drills in chronological order</p>
        </div>

        {activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No activity history yet.</p>
            <p className="text-gray-400 text-sm mt-2">Start practicing to see your activity here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const unitMatch = activity.title.match(/Unit (\d+)/i);
              const unitNumber = unitMatch ? unitMatch[1] : undefined;

              return (
                <Link
                  key={activity.id}
                  href={getActivityHref(activity)}
                  className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {unitNumber && (
                              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                Unit {unitNumber}
                              </span>
                            )}
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              {getActivityTypeLabel(activity)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {activity.score !== undefined && (
                              <span className="font-semibold text-gray-900">
                                Score: {activity.score}%
                              </span>
                            )}
                            {activity.correctCount !== undefined && activity.totalQuestions !== undefined && (
                              <span>
                                {activity.correctCount} / {activity.totalQuestions} correct
                              </span>
                            )}
                            {activity.answeredCount !== undefined && activity.totalQuestions !== undefined && !activity.isSubmitted && (
                              <span className="text-blue-600">
                                {activity.answeredCount} / {activity.totalQuestions} answered
                              </span>
                            )}
                            {activity.stagesCompleted !== undefined && (
                              <span>
                                {activity.stagesCompleted} / 3 stages completed
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {activity.xpEarned !== undefined && (
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                              <span>{activity.xpEarned.toLocaleString()}</span>
                              <Image
                                src="/images/flame100.png"
                                alt="XP"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </div>
                          )}
                          <p className="text-xs text-gray-400">
                            {formatDate(activity.timestamp)}
                          </p>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyAssignmentHistoryPage() {
  return (
    <CourseProvider>
      <MyAssignmentHistoryContent />
    </CourseProvider>
  );
}

