'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, X, Clock, Maximize2, Minimize2, Calculator, Pen, Eraser, Expand, Trash2, Circle, CircleDot, Check, Lock, Brain, FileText, ChevronLeft, ChevronRight, ChevronsRight, Triangle, Strikethrough, Eye, EyeOff, Play, ChevronDown, ChevronUp, List, Pause, Play as PlayIcon, Highlighter, Copy, Share2, Users, Mail, MessageCircle, Camera, Ghost } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { redirectToCheckout } from '@/lib/stripe';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from './AuthModals';
import { MCQFeedbackModal } from './MCQFeedbackModal';
import { SeasonPassModal } from './SeasonPassModal';
import { hasValidSeasonPass } from '@/lib/utils';
import { videos } from '@/data/videos';
import { createPortal } from 'react-dom';
import { HighlightableText } from './HighlightableText';
import { MCQSidecar } from './MCQSidecar';
import { DojoReadinessBand } from './DojoReadinessBand';
import { Scroll } from 'lucide-react';
import { QuestionWithKeyTerms } from './QuestionWithKeyTerms';
import { ApGovQuestionText, isApGovQuestion } from './ApGovQuestionText';
import { UnitTestQuestionBody, type QuestionTextHighlight } from './UnitTestQuestionBody';
import { ExamTutorialModal } from './ExamTutorialModal';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { saveQuizResult } from '@/lib/quizHistory';
import { saveTestResult, saveTestProgress, loadTestProgress, TestProgress } from '@/lib/testProgress';
import { apQuestionSubjectTag, type CourseSubject } from '@/lib/courseSubject';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';

/** Set when a guest uses Save & Exit so we persist to Firestore after they sign in (same tab or post-redirect). */
const UNIT_TEST_GUEST_SAVE_PENDING_SESSION_KEY = 'apdojo_unit_mcq_pending_guest_save_exit';

const Excalidraw = dynamic<any>(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);

interface FullExamProps {
  questionBank: QuestionBank;
  examType: CourseSubject;
  questionType: 'mcq' | 'frq';
  examNumber: string;
  onTimeUpdate?: (timeRemaining: number) => void;
  isCustomAssignment?: boolean;
  assignmentLinkId?: string; // Encoded parameter for custom assignments
  isFreeUser?: boolean; // If true, blur and restrict questions beyond question 1
  isUnitTest?: boolean; // If true, always show tools panel with test-like layout
  isPreviewMode?: boolean; // If true, disable submit and show tooltip (teacher preview)
  liveSessionId?: string; // Live session: update session student doc on submit
  liveStudentId?: string;
  liveStudentName?: string;
}

interface Answers {
  [key: number]: string;
}

// Add type for stored bookmarks
interface StoredBookmarks {
  [questionBankName: string]: {
    questionIds: number[];
    timestamp: number;
  };
}

// Add this type definition
type Operator = '×' | '÷' | '+' | '-';

// Update the precedence object with type
const precedence: Record<Operator, number> = {
  '×': 2,
  '÷': 2,
  '+': 1,
  '-': 1,
};

// Update the isOperator function to be a type guard
const isOperator = (char: string): char is Operator => {
  return ['+', '-', '×', '÷'].includes(char);
};

const FeedbackProgressBar = ({ status }: { status: 'incorrect' | 'partial' | 'correct' }) => {
  const bars = [
    { filled: status === 'incorrect' || status === 'partial' || status === 'correct' },
    { filled: status === 'partial' || status === 'correct' },
    { filled: status === 'correct' }
  ];

  const getColor = (status: 'incorrect' | 'partial' | 'correct') => {
    switch (status) {
      case 'incorrect': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500';
      case 'correct': return 'bg-green-500';
    }
  };

  return (
    <div className="flex gap-1.5">
      {bars.map((bar, index) => (
        <div 
          key={index}
          className={`h-2 w-12 rounded-full transition-all duration-300 ${
            bar.filled 
              ? getColor(status) 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

const SHARE_PREP_BODY =
  'How does your score stack up? Same unit MCQ on AP Dojo — see if everyone is prepared.\n\n';

/** Share row on unit test results — solid dojo purple + brutalist Share menu. */
function UnitTestSharePrepRow() {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState('');
  const shareWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageUrl(typeof window !== 'undefined' ? window.location.href : '');
  }, []);

  useEffect(() => {
    if (!shareOpen) return;
    const onDoc = (e: MouseEvent) => {
      const el = shareWrapRef.current;
      if (el && !el.contains(e.target as Node)) setShareOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [shareOpen]);

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : pageUrl);

  const flashHint = (msg: string) => {
    setHint(msg);
    setTimeout(() => setHint(null), 2800);
  };

  const handleCopy = async () => {
    const url = getUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      flashHint('Link copied to clipboard.');
    } catch (e) {
      console.error(e);
    }
  };

  const sharePayload = () => {
    const url = getUrl();
    const body = `${SHARE_PREP_BODY}${url}`;
    return { url, body };
  };

  const openGmail = () => {
    const { url, body } = sharePayload();
    if (!url) return;
    const sub = encodeURIComponent('AP Dojo — unit practice');
    const b = encodeURIComponent(body);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${sub}&body=${b}`, '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const openMessenger = () => {
    const { url } = sharePayload();
    if (!url) return;
    // Web-friendly share surface; on many devices users route to Messenger from the Facebook sheet.
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setShareOpen(false);
  };

  const openInstagram = async () => {
    const { url, body } = sharePayload();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(body);
      flashHint('Caption + link copied — paste into Instagram.');
    } catch {
      flashHint('Could not copy — try Copy link.');
    }
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const openSnapchat = async () => {
    const { url, body } = sharePayload();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(body);
      flashHint('Caption + link copied — paste into Snapchat.');
    } catch {
      flashHint('Could not copy — try Copy link.');
    }
    window.open('https://www.snapchat.com/', '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <div className="relative rounded-2xl border-4 border-black bg-violet-800 p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-6">
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-white text-violet-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Users className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-black tracking-tight text-white sm:text-xl">
              How does that compare to your friends?
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-white/90">
              Share a link to see if everyone is prepared — same practice, your crew.
            </p>
            {hint ? (
              <p className="mt-3 text-xs font-bold text-amber-200" role="status">
                {hint}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="relative" ref={shareWrapRef}>
                <button
                  type="button"
                  onClick={() => setShareOpen((o) => !o)}
                  aria-expanded={shareOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-white px-4 py-2.5 text-sm font-black text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-violet-50 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Share2 className="h-4 w-4 shrink-0" aria-hidden />
                  Share
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${shareOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                {shareOpen ? (
                  <div
                    role="menu"
                    className="absolute left-0 top-full z-30 mt-2 w-[min(100vw-2rem,18rem)] overflow-hidden rounded-xl border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openMessenger}
                      className="flex w-full items-center gap-3 border-b-4 border-black px-4 py-3 text-left font-black text-gray-900 transition hover:bg-violet-100"
                    >
                      <MessageCircle className="h-5 w-5 shrink-0 text-[#0084FF]" aria-hidden />
                      Messenger
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openInstagram}
                      className="flex w-full items-center gap-3 border-b-4 border-black px-4 py-3 text-left font-black text-gray-900 transition hover:bg-violet-100"
                    >
                      <Camera className="h-5 w-5 shrink-0 text-pink-600" aria-hidden />
                      Instagram
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openSnapchat}
                      className="flex w-full items-center gap-3 border-b-4 border-black px-4 py-3 text-left font-black text-gray-900 transition hover:bg-violet-100"
                    >
                      <Ghost className="h-5 w-5 shrink-0 text-yellow-500" aria-hidden />
                      Snapchat
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openGmail}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left font-black text-gray-900 transition hover:bg-violet-100"
                    >
                      <Mail className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
                      Gmail
                    </button>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-4 border-black bg-violet-950 px-4 py-2.5 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-violet-900 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-300" aria-hidden />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 shrink-0" aria-hidden />
                    Copy link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FullExam({ questionBank, examType, questionType, examNumber, onTimeUpdate, isCustomAssignment = false, assignmentLinkId, isFreeUser = false, isUnitTest = false, isPreviewMode = false, liveSessionId, liveStudentId, liveStudentName }: FullExamProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [showFullResults, setShowFullResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState<{[key: number]: boolean}>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set());
  const [questionHighlightModeById, setQuestionHighlightModeById] = useState<Record<number, boolean>>({});
  const [questionTextHighlights, setQuestionTextHighlights] = useState<Record<number, QuestionTextHighlight[]>>({});
  const [strikethroughState, setStrikethroughState] = useState<Record<number, number[]>>({});
  const [showBookmarkConfirmModal, setShowBookmarkConfirmModal] = useState(false);
  const [showNameInputModal, setShowNameInputModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [xpAwarded, setXpAwarded] = useState(false);
  const [showSeasonPassModal, setShowSeasonPassModal] = useState(false);
  /** Live session only: when true, show Score Summary card first; "See full results" sets to false. */
  const [liveSessionScoreSummaryOnly, setLiveSessionScoreSummaryOnly] = useState(true);
  
  // Remove the shuffling logic and just use the pre-shuffled questions
  const questions = questionBank.questions;

  // Calculate time limit dynamically for unit tests and preview exams
  // AP Econ MCQ: 70 minutes for 60 questions = 1.167 minutes per question
  // For unit tests, calculate based on number of questions
  // For preview exams (when isUnitTest is true), use fixed 70 minutes
  const initialTimeLimit = useMemo(() => {
    if (isUnitTest) {
      // Check if this is a preview exam (examNumber like "preview/macro/mcq/1")
      if (examNumber && (examNumber.includes('preview') || examNumber.startsWith('preview'))) {
        // Preview MCQ exam: 70 minutes = 4200 seconds
        return 70 * 60;
      }
      // Unit tests: 70 minutes = 4200 seconds for 60 questions
      // Time per question = 4200 / 60 = 70 seconds per question
      return Math.round(70 * questions.length);
    }
    // Default to 60 minutes for other exams
    return 60 * 60;
  }, [isUnitTest, questions.length, examNumber]);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(initialTimeLimit);
  
  // State to hide/show timer
  const [showTimer, setShowTimer] = useState(true);
  const [questionFontSize, setQuestionFontSize] = useState(1); // 0=sm, 1=base, 2=lg, 3=xl
  const FONT_SIZE_CLASSES = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
  const FONT_SIZE_MAX = 3;
  
  // State to pause/resume timer
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Get user context (needed for access checks and guest progress)
  const { user, userData, awardXp, selectedSubject, setRedirectOnLogin } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isFreshStart = searchParams?.get('fresh') === '1';

  const accentFull =
    examType === 'macro'
      ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
      : examType === 'micro'
        ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
        : 'bg-violet-600 hover:bg-violet-700 active:bg-violet-800';
  const accentHover =
    examType === 'macro'
      ? 'bg-blue-600 hover:bg-blue-700'
      : examType === 'micro'
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-violet-600 hover:bg-violet-700';
  const accentSolid =
    examType === 'macro' ? 'bg-blue-600' : examType === 'micro' ? 'bg-green-600' : 'bg-violet-600';

  // Restore guest progress on mount (including timer)
  // This works for both guests AND logged-in users who were guests when they started the exam
  // (e.g., started as guest, signed up during purchase, then returned)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('guest_quiz_progress');
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          // Only restore if it matches the current exam
          if (progress.examNumber === examNumber && progress.examType === examType) {
            // Restore answers
            if (progress.answers) {
              setAnswers(progress.answers);
            }
            // Restore current question index
            if (typeof progress.currentQuestionIndex === 'number') {
              setCurrentPage(progress.currentQuestionIndex);
            }
            // Restore timer - initialize with saved timeRemaining
            if (typeof progress.timeRemaining === 'number' && progress.timeRemaining > 0) {
              setTimeRemaining(progress.timeRemaining);
            }
            console.log('[FullExam] Restored guest progress:', {
              answers: Object.keys(progress.answers || {}).length,
              currentQuestionIndex: progress.currentQuestionIndex,
              timeRemaining: progress.timeRemaining,
              userWasGuest: !user,
              nowLoggedIn: !!user
            });
            
            // Clear the saved progress after restoring (so it doesn't restore again on next visit)
            localStorage.removeItem('guest_quiz_progress');
          }
        } catch (error) {
          console.error('[FullExam] Error restoring guest progress:', error);
        }
      }
    }
  }, []); // Only run on mount - note: we check user in the condition but restore regardless

  // Check if this is a full MCQ exam that should have save progress functionality
  const isFullMCQExam = examNumber === 'full' && questionType === 'mcq' && !isCustomAssignment;

  // Save unit test progress to Firestore
  const saveUnitTestProgress = async (): Promise<boolean> => {
    if (!user || !isUnitTest || showResults) return false;
    try {
      const testId = `unit_${examNumber}_${examType}`;
      const answeredQuestions: Record<string, { selectedAnswer: number; isCorrect: boolean }> = {};
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = questions.find(q => q.id === parseInt(questionId));
        if (question && answer) {
          answeredQuestions[questionId] = {
            selectedAnswer: answer.charCodeAt(0) - 65,
            isCorrect: answer === question.correctAnswer,
          };
        }
      });
      let existingProgress = null;
      try { existingProgress = await loadTestProgress(user.uid, testId); } catch {}
      const progress: TestProgress = {
        userId: user.uid,
        testType: 'unit_mcq',
        testId,
        progress: {
          answeredQuestions,
          currentQuestionIndex: currentPage,
          isSubmitted: false,
          totalQuestions: questions.length,
          timeRemaining,
          startedAt: existingProgress?.startedAt || (serverTimestamp() as any),
          lastUpdated: serverTimestamp() as any,
        },
      };
      await saveTestProgress(progress);
      return true;
    } catch (error) {
      console.error('[FullExam] Error saving unit test progress:', error);
      return false;
    }
  };

  const handleUnitTestSaveAndExit = async () => {
    if (user) {
      await saveUnitTestProgress();
      router.push(`/unit-final-practice-tests?subject=${examType}`);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('guest_quiz_progress', JSON.stringify({
          examNumber,
          examType,
          answers,
          currentQuestionIndex: currentPage,
          timeRemaining,
        }));
        try {
          sessionStorage.setItem(UNIT_TEST_GUEST_SAVE_PENDING_SESSION_KEY, '1');
        } catch {
          /* private mode */
        }
      }
      setShowGuestSaveModal(true);
    }
  };

  // Restore saved progress for logged-in users on unit tests, or finish guest Save & Exit after auth
  useEffect(() => {
    if (!isUnitTest || showResults || isFreshStart) return;

    let sessionPending = false;
    try {
      sessionPending =
        typeof window !== 'undefined' &&
        sessionStorage.getItem(UNIT_TEST_GUEST_SAVE_PENDING_SESSION_KEY) === '1';
    } catch {
      sessionPending = false;
    }
    const refPending = unitTestGuestSaveExitAfterAuthRef.current;
    const pendingGuestAuthFinish = sessionPending || refPending;

    if (!user) return;

    if (pendingGuestAuthFinish) {
      unitTestGuestSaveExitAfterAuthRef.current = false;
      try {
        sessionStorage.removeItem(UNIT_TEST_GUEST_SAVE_PENDING_SESSION_KEY);
      } catch {
        /* noop */
      }
      void (async () => {
        try {
          const ok = await saveUnitTestProgress();
          if (!ok) {
            console.warn('[FullExam] Guest post-auth save returned false (missing user or wrong mode).');
          }
        } catch (error) {
          console.error('[FullExam] Error saving guest progress after login:', error);
        }
        try {
          localStorage.removeItem('guest_quiz_progress');
        } catch {
          /* noop */
        }
        router.push(`/unit-final-practice-tests?subject=${examType}`);
      })();
      return;
    }

    const restoreUnitTestProgress = async () => {
      try {
        const testId = `unit_${examNumber}_${examType}`;
        const savedProgress = await loadTestProgress(user.uid, testId);
        if (savedProgress && !savedProgress.isSubmitted) {
          if (savedProgress.answeredQuestions) {
            const restoredAnswers: Answers = {};
            Object.entries(savedProgress.answeredQuestions).forEach(([qIndex, answerData]: [string, any]) => {
              if (typeof answerData.selectedAnswer === 'number') {
                restoredAnswers[parseInt(qIndex)] = String.fromCharCode(65 + answerData.selectedAnswer);
              }
            });
            setAnswers(restoredAnswers);
          }
          if (typeof savedProgress.currentQuestionIndex === 'number') {
            setCurrentPage(savedProgress.currentQuestionIndex);
          }
          if (typeof savedProgress.timeRemaining === 'number' && savedProgress.timeRemaining > 0) {
            setTimeRemaining(savedProgress.timeRemaining);
          }
        }
      } catch (error) {
        console.error('[FullExam] Error restoring unit test progress:', error);
      }
    };
    void restoreUnitTestProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- saveUnitTestProgress closes over latest exam state
  }, [user, isUnitTest, showResults, examNumber, examType, isFreshStart, router]);

  // Restore saved progress for logged-in users on full MCQ exams
  useEffect(() => {
    const restoreSavedProgress = async () => {
      if (!user || !isFullMCQExam || showResults) return;
      
      try {
        const testId = `full_${examType}_mcq`;
        const savedProgress = await loadTestProgress(user.uid, testId);
        
        if (savedProgress && !savedProgress.isSubmitted) {
          // Restore answers
          if (savedProgress.answeredQuestions) {
            const restoredAnswers: Answers = {};
            Object.entries(savedProgress.answeredQuestions).forEach(([qIndex, answerData]: [string, any]) => {
              // Convert selectedAnswer (0, 1, 2, 3) back to letter format ('A', 'B', 'C', 'D')
              if (typeof answerData.selectedAnswer === 'number') {
                restoredAnswers[parseInt(qIndex)] = String.fromCharCode(65 + answerData.selectedAnswer);
              }
            });
            setAnswers(restoredAnswers);
          }
          
          // Restore current question index
          if (typeof savedProgress.currentQuestionIndex === 'number') {
            setCurrentPage(savedProgress.currentQuestionIndex);
          }
          
          // Restore timer if available (calculate from startedAt and lastUpdated)
          if (savedProgress.startedAt && savedProgress.lastUpdated) {
            const started = savedProgress.startedAt.toDate ? savedProgress.startedAt.toDate() : new Date(savedProgress.startedAt);
            const lastUpdated = savedProgress.lastUpdated.toDate ? savedProgress.lastUpdated.toDate() : new Date(savedProgress.lastUpdated);
            const elapsed = Math.floor((lastUpdated.getTime() - started.getTime()) / 1000);
            const remaining = initialTimeLimit - elapsed;
            if (remaining > 0) {
              setTimeRemaining(remaining);
            }
          }
          
          console.log('[FullExam] Restored saved progress for logged-in user:', {
            answers: Object.keys(savedProgress.answeredQuestions || {}).length,
            currentQuestionIndex: savedProgress.currentQuestionIndex
          });
        }
      } catch (error) {
        console.error('[FullExam] Error restoring saved progress:', error);
      }
    };
    
    restoreSavedProgress();
  }, [user, isFullMCQExam, showResults, examType, initialTimeLimit]);

  // Update timeRemaining when initialTimeLimit changes (only if no saved progress)
  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      const savedProgress = localStorage.getItem('guest_quiz_progress');
      if (!savedProgress) {
        // Only set initial time if no saved progress exists
        setTimeRemaining(initialTimeLimit);
      }
    } else if (user) {
      // For logged-in users, always use initial time limit
      setTimeRemaining(initialTimeLimit);
    }
  }, [initialTimeLimit, user]);

  // Generate Dojo name for custom assignments only
  const customTitle = useMemo(() => {
    if (!isCustomAssignment) return null;
    return 'Dojo Challenge';
  }, [isCustomAssignment]);

  // Add tools panel state (slide-out panel for calculator and drawing pad)
  // Tools panel is closed by default on all exam types - users can open it if needed
  const isPreviewExam = examNumber && (examNumber.includes('preview') || examNumber.startsWith('preview'));
  const isFullExam = examNumber === 'full';
  // Show top bar and bottom navigation for unit tests, preview exams, and full exams
  const shouldShowTestUI = isUnitTest || isPreviewExam || isFullExam || isCustomAssignment;
  /** Live session only: apply tutor/builder-style UI (rounded cards, shadow-xl, indigo/slate). Do not use for logic. */
  const isLiveSession = !!(liveSessionId && liveStudentId);

  // Determine if this exam requires season pass (unit tests and full exams, but not custom assignments).
  // AP Gov is fully open for now — no season pass gate.
  const requiresSeasonPass =
    (isUnitTest || isFullExam || isPreviewExam) &&
    !isCustomAssignment &&
    examType !== 'gov';

  // Check if user has season pass access for this exam type
  // For unit tests and full exams, check season pass. For custom assignments, always allow.
  const hasSeasonPassAccess = useMemo(() => {
    if (isCustomAssignment || examType === 'gov') return true;
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, examType);
  }, [user, userData, examType, isCustomAssignment]);
  
  const shouldShowToolsByDefault = false; // Tools panel starts closed - users can open manually
  const [showToolsPanel, setShowToolsPanel] = useState(shouldShowToolsByDefault);
  const [leftPanelWidth, setLeftPanelWidth] = useState(shouldShowToolsByDefault ? 65 : 100); // Percentage width for left panel when tools panel is open
  // For all exam types, only show one tool at a time (calculator OR whiteboard)
  const [activeTool, setActiveTool] = useState<'calculator' | 'whiteboard'>('calculator');
  const [scratchPadTab, setScratchPadTab] = useState<'draw' | 'text'>('draw');
  const [scratchNotes, setScratchNotes] = useState('');
  const [excalidrawKey, setExcalidrawKey] = useState(0);

  const handleToolToggle = (tool: 'calculator' | 'whiteboard') => {
    // If panel is closed, open it and set the requested tool.
    if (!showToolsPanel) {
      setActiveTool(tool);
      setShowToolsPanel(true);
      return;
    }

    // If panel is open, clicking the same tool toggles close; otherwise switch tools.
    if (activeTool === tool) {
      setShowToolsPanel(false);
    } else {
      setActiveTool(tool);
      setShowToolsPanel(true);
    }
  };

  // Update leftPanelWidth when tools panel opens/closes
  useEffect(() => {
    if (showToolsPanel) {
      setLeftPanelWidth(65);
    } else {
      setLeftPanelWidth(100);
    }
  }, [showToolsPanel]);

  // Add calculator states (for inline calculator in slide-out)
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [calculatorPreviousValue, setCalculatorPreviousValue] = useState<number | null>(null);
  const [calculatorOperation, setCalculatorOperation] = useState<string | null>(null);
  const [calculatorWaitingForNewValue, setCalculatorWaitingForNewValue] = useState(false);

  // Excalidraw state
  const [excalidrawElements, setExcalidrawElements] = useState<any[]>([]);
  const [excalidrawAppState, setExcalidrawAppState] = useState<any>(null);

  // Add current question index state (for single question view)
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 1;

  // Clear scratch pad whenever the question changes
  useEffect(() => {
    setScratchNotes('');
    setExcalidrawElements([]);
    setExcalidrawAppState(null);
    setExcalidrawKey(k => k + 1);
  }, [currentPage]);

  // Add completed questions tracking
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  // Add state for image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  // Add state for expandable question navigation
  const [showQuestionNavigator, setShowQuestionNavigator] = useState(false);
  const questionNavigatorRef = useRef<HTMLDivElement>(null);
  const liveSessionScoreCardRef = useRef<HTMLDivElement>(null);

  // Scroll live session score card into view when it appears after submit
  useEffect(() => {
    if (showResults && showFullResults && liveSessionId && liveSessionScoreSummaryOnly && liveSessionScoreCardRef.current) {
      liveSessionScoreCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showResults, showFullResults, liveSessionId, liveSessionScoreSummaryOnly]);

  // Close question navigator when clicking outside
  // NOTE: must use 'click' (not 'mousedown') so button onClick handlers fire first
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (questionNavigatorRef.current && !questionNavigatorRef.current.contains(event.target as Node)) {
        setShowQuestionNavigator(false);
      }
    };

    if (showQuestionNavigator) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showQuestionNavigator]);

  const [showGuestSaveModal, setShowGuestSaveModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const allowNavigationRef = useRef(false); // Use ref for synchronous access in beforeunload
  /** True when user opened login from the guest “save progress” modal (belt-and-suspenders with sessionStorage). */
  const unitTestGuestSaveExitAfterAuthRef = useRef(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For client-side only rendering

  // Set mounted flag for client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll to top when page changes
  // Check if user has seen tutorial on mount (skip for custom assignments)
  useEffect(() => {
    if (typeof window !== 'undefined' && !isCustomAssignment) {
      const hasSeenTutorial = localStorage.getItem('hasSeenExamTutorial');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, [isCustomAssignment]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Timer countdown effect
  useEffect(() => {
    if (showResults || timeRemaining <= 0 || isTimerPaused || showSeasonPassModal || showSaveProgressModal) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showResults, timeRemaining, isTimerPaused, showSeasonPassModal, showSaveProgressModal]);

  // Notify parent of time updates
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(timeRemaining);
    }
  }, [timeRemaining, onTimeUpdate]);

  // Pause timer when save progress modal appears
  useEffect(() => {
    if (showSaveProgressModal) {
      setIsTimerPaused(true);
    } else if (!showSaveProgressModal && !showResults && timeRemaining > 0) {
      // Resume timer when modal closes (if user stays on page)
      // Note: If user navigates away, this won't matter
      setIsTimerPaused(false);
    }
  }, [showSaveProgressModal, showResults, timeRemaining]);

  // Handle navigation away for logged-in users on full MCQ exams
  useEffect(() => {
    console.log('[FullExam] Navigation guard check:', { 
      user: !!user, 
      isFullMCQExam, 
      showResults,
      examNumber,
      questionType,
      isCustomAssignment
    });
    
    if (!user || !isFullMCQExam || showResults) {
      console.log('[FullExam] Navigation guard not active:', { user: !!user, isFullMCQExam, showResults });
      return;
    }
    
    // Check if user has made any progress (answered at least one question)
    const hasProgress = Object.keys(answers).length > 0;
    console.log('[FullExam] Checking navigation guard:', { hasProgress, answerCount: Object.keys(answers).length });
    if (!hasProgress) return; // Don't show modal if no progress made
    
    // Handle beforeunload (browser close/refresh)
    // Note: beforeunload can only show browser's default dialog, not our custom modal
    // Only show if we haven't already handled the save via our modal
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Don't show browser dialog if we've already saved or are allowing navigation
      // Use ref for synchronous access (state updates are async)
      if (allowNavigationRef.current) {
        return;
      }
      console.log('[FullExam] beforeunload triggered');
      e.preventDefault();
      e.returnValue = 'You have unsaved progress. Are you sure you want to leave?';
      return e.returnValue;
    };
    
    // Intercept link clicks (including Next.js Link components)
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element or parent is a link
      const link = target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('#')) {
          // It's an internal link
          const url = new URL(href, window.location.origin);
          // Don't intercept if it's the same page
          if (url.pathname !== window.location.pathname) {
            console.log('[FullExam] Link click intercepted:', url.pathname);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            setIsTimerPaused(true); // Pause timer when modal appears
            setIsTimerPaused(true); // Pause timer when modal appears
            setPendingNavigation(url.pathname + url.search);
            setShowSaveProgressModal(true);
            return false;
          }
        }
      }
    };
    
    // Intercept router.push calls by wrapping the router
    const originalPush = router.push.bind(router);
    const wrappedPush = ((url: any, options?: any) => {
      const path = typeof url === 'string' ? url : (url?.pathname || String(url));
      if (path && path !== window.location.pathname) {
        console.log('[FullExam] Router.push intercepted:', path);
        setIsTimerPaused(true); // Pause timer when modal appears
        setPendingNavigation(path);
        setShowSaveProgressModal(true);
        return Promise.resolve(false);
      }
      return originalPush(url as any, options);
    }) as any;
    
    // Replace router.push temporarily
    (router as any).push = wrappedPush;
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleLinkClick, true); // Use capture phase
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleLinkClick, true);
      (router as any).push = originalPush; // Restore original
    };
  }, [user, isFullMCQExam, showResults, answers, router]);
  
  // Function to handle navigation attempts (called from outside, e.g., Link components)
  const handleNavigationAttempt = (url: string) => {
    if (!user || !isFullMCQExam || showResults) return true; // Allow navigation
    
    const hasProgress = Object.keys(answers).length > 0;
    if (!hasProgress) return true; // Allow navigation if no progress
    
    setPendingNavigation(url);
    setShowSaveProgressModal(true);
    return false; // Prevent navigation
  };
  
  // Expose handleNavigationAttempt for use in Link components if needed
  // For now, we'll rely on beforeunload for browser navigation

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // State for feedback panel container (outside exam container)
  const [feedbackContainer, setFeedbackContainer] = useState<HTMLElement | null>(null);
  // State for sidecar visibility and position
  const [showSidecar, setShowSidecar] = useState(false);
  const sidecarButtonRef = useRef<HTMLButtonElement | null>(null);

  // Effect to find or create feedback container
  useEffect(() => {
    let container = document.getElementById('exam-feedback-container');
    if (!container) {
      // Create container if it doesn't exist
      container = document.createElement('div');
      container.id = 'exam-feedback-container';
      document.body.appendChild(container);
    }
    setFeedbackContainer(container);
    
    // Cleanup: remove container when component unmounts
    return () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  // Effect to close sidecar when clicking outside
  useEffect(() => {
    if (!showSidecar) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking inside the sidecar or the button that opened it
      if (
        sidecarButtonRef.current?.contains(target) ||
        target.closest('.mcq-sidecar-popup')
      ) {
        return;
      }
      setShowSidecar(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidecar]);

  // State for text highlights
  const [textHighlights, setTextHighlights] = useState<Record<number, Array<{ start: number; end: number; id: string }>>>({});

  const handleHighlight = (questionId: number, highlights: Array<{ start: number; end: number; id: string }>) => {
    setTextHighlights(prev => ({
      ...prev,
      [questionId]: highlights
    }));
  };


  // Add this state to store the canvas image data
  const [canvasHistory, setCanvasHistory] = useState<ImageData | null>(null);

  // Add these new state variables inside the FullExam component
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    status: 'incorrect' | 'partial' | 'correct';
    message: string;
  } | null>(null);

  // Add this state for the tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  // First, add a new state for loading
  const [isAILoading, setIsAILoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add state for video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  // Add state for video loading
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Add state for video loading
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Add effect to control body scrolling when the video modal is open
  useEffect(() => {
    if (showVideoModal) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = '';
    }

    // Cleanup function to reset the overflow style when the component unmounts or the modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [showVideoModal]);

  // Save progress function for logged-in users on full MCQ exams
  const saveProgress = async (): Promise<boolean> => {
    if (!user || !isFullMCQExam || showResults) {
      console.log('[FullExam] saveProgress: Conditions not met', { user: !!user, isFullMCQExam, showResults });
      return false;
    }
    
    try {
      const testId = `full_${examType}_mcq`;
      const answeredQuestions: Record<string, { selectedAnswer: number; isCorrect: boolean }> = {};
      
      // Convert answers to the format expected by TestProgress
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = questions.find(q => q.id === parseInt(questionId));
        if (question && answer) {
          const answerIndex = answer.charCodeAt(0) - 65; // Convert 'A' to 0, 'B' to 1, etc.
          answeredQuestions[questionId] = {
            selectedAnswer: answerIndex,
            isCorrect: answer === question.correctAnswer
          };
        }
      });
      
      console.log('[FullExam] Saving progress:', { 
        testId, 
        answeredCount: Object.keys(answeredQuestions).length,
        currentPage,
        totalQuestions: questions.length
      });
      
      // Load existing progress to preserve startedAt timestamp
      let existingProgress = null;
      try {
        existingProgress = await loadTestProgress(user.uid, testId);
        console.log('[FullExam] Found existing progress:', !!existingProgress);
      } catch (e) {
        console.log('[FullExam] No existing progress found');
        // If no existing progress, that's fine
      }
      
      const progress: TestProgress = {
        userId: user.uid,
        testType: 'full_exam',
        testId: testId,
        progress: {
          answeredQuestions,
          currentQuestionIndex: currentPage,
          isSubmitted: false,
          totalQuestions: questions.length,
          startedAt: existingProgress?.startedAt || (serverTimestamp() as any),
          lastUpdated: serverTimestamp() as any
        }
      };
      
      const answeredCount = progress.progress.answeredQuestions 
        ? Object.keys(progress.progress.answeredQuestions).length 
        : 0;
      console.log('[FullExam] Calling saveTestProgress with:', {
        userId: progress.userId,
        testType: progress.testType,
        testId: progress.testId,
        answeredCount,
        currentQuestionIndex: progress.progress.currentQuestionIndex,
        totalQuestions: progress.progress.totalQuestions,
        isSubmitted: progress.progress.isSubmitted
      });
      
      await saveTestProgress(progress);
      console.log('[FullExam] Progress saved successfully to Firestore at path: userTestProgress/' + user.uid + '/tests/' + testId);
      
      // Verify the save by trying to load it back
      try {
        const verifyProgress = await loadTestProgress(user.uid, testId);
        if (verifyProgress) {
          const answeredCount = verifyProgress.answeredQuestions 
            ? Object.keys(verifyProgress.answeredQuestions).length 
            : 0;
          console.log('[FullExam] Verified: Progress exists in Firestore', {
            answeredCount,
            currentQuestionIndex: verifyProgress.currentQuestionIndex
          });
        } else {
          console.warn('[FullExam] Warning: Could not verify saved progress');
        }
      } catch (verifyError) {
        console.error('[FullExam] Error verifying saved progress:', verifyError);
      }
      
      return true;
    } catch (error) {
      console.error('[FullExam] Error saving progress:', error);
      return false;
    }
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    // If option is struck through, just remove strikethrough and don't select
    // This matches the exact logic from unitMCQS.tsx
    if (strikethroughState[questionId]?.includes(answerIndex)) {
      setStrikethroughState(prev => {
        const currentStrikes = prev[questionId] || [];
        const newStrikes = currentStrikes.filter(i => i !== answerIndex);
        if (newStrikes.length === 0) {
          const { [questionId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [questionId]: newStrikes };
      });
      return; // Exit early - do NOT select
    }
    
    setAnswers({
      ...answers,
      [questionId]: String.fromCharCode(65 + answerIndex)
    });
    setCompletedQuestions(prev => new Set([...prev, questionId]));
  };

  const handleStrikethroughToggle = (questionId: number, optionIndex: number) => {
    if (showResults) return;

    // If the option being struck through is the currently selected answer, deselect it.
    const currentAnswer = answers[questionId];
    if (currentAnswer && String.fromCharCode(65 + optionIndex) === currentAnswer) {
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      });
      setCompletedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }

    setStrikethroughState(prev => {
      const currentStrikes = prev[questionId] || [];
      const newStrikes = currentStrikes.includes(optionIndex)
        ? currentStrikes.filter(i => i !== optionIndex)
        : [...currentStrikes, optionIndex];
      
      return { ...prev, [questionId]: newStrikes };
    });
  };

  const handleSubmitClick = async () => {
    if (bookmarkedQuestions.size > 0) {
      setShowBookmarkConfirmModal(true);
    } else {
      const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
      const score = Math.round((correctCount / questions.length) * 100);
      
      // Award XP for unit tests and regular exams (not custom assignments - those handle it separately)
      if (!isCustomAssignment && awardXp && user && !xpAwarded) {
        if (correctCount > 0) {
          // Calculate XP: 20 for completion + 10 per correct answer (same as AssessmentResultsPanel)
          const totalXP = 20 + (correctCount * 10);
          try {
            await awardXp(totalXP, examType);
            setXpAwarded(true);
            console.log(`[FullExam] Awarded ${totalXP} XP (20 completion + ${correctCount} correct × 10 XP)`);
          } catch (xpError) {
            console.error('[FullExam] Error awarding XP:', xpError);
          }
        }
      }

      // Save test result for unit tests and full exams
      console.log('[FullExam] Checking if should save test result:', {
        isCustomAssignment,
        hasUser: !!user,
        isUnitTest,
        isFullExam,
        isPreviewExam,
        examNumber,
        examType
      });
      
      if (!isCustomAssignment && user && (isUnitTest || isFullExam || isPreviewExam)) {
        try {
          let testType: 'unit_mcq' | 'full_exam' | 'full_frq' = 'full_exam';
          let testId = 'full_mcq_exam';
          let testTitle = 'Full MCQ Exam';
          
          if (isUnitTest && examNumber) {
            testType = 'unit_mcq';
            testId = `unit_${examNumber}_${examType}`;
            testTitle = `Unit ${examNumber} MCQ Test`;
          } else if (isFullExam) {
            testType = questionType === 'frq' ? 'full_frq' : 'full_exam';
            testId = questionType === 'frq' ? 'full_frq_exam' : `full_${examType}_mcq`;
            testTitle =
              questionType === 'frq'
                ? 'Full FRQ Exam'
                : `Full MCQ Exam (${examType === 'macro' ? 'Macro' : examType === 'micro' ? 'Micro' : 'Gov'})`;
          } else if (isPreviewExam && examNumber) {
            // Preview exams are treated as full exams
            testType = questionType === 'frq' ? 'full_frq' : 'full_exam';
            testId = questionType === 'frq' ? `preview_frq_${examNumber}` : `preview_mcq_${examNumber}`;
            testTitle = questionType === 'frq' ? `Preview FRQ Exam ${examNumber}` : `Preview MCQ Exam ${examNumber}`;
          }

          console.log('[FullExam] Saving test result with:', {
            userId: user.uid,
            testType,
            testId,
            score,
            totalQuestions: questions.length
          });

          // Save to testResults collection (for my-assignment-history page)
          await saveTestResult({
            userId: user.uid,
            testType,
            testId,
            score,
            totalQuestions: questions.length,
            completedAt: new Date()
          });
          console.log(`[FullExam] Successfully saved test result: ${testType} - ${testId} - Score: ${score}%`);

          // Also save to quizHistory for Recent Activity on dashboard
          try {
            await saveQuizResult({
              userId: user.uid,
              type: 'custom-link', // Using existing type since we don't have 'unit-test' type yet
              title: testTitle,
              score,
              correctCount,
              totalQuestions: questions.length,
              questions: questions,
              userAnswers: answers as unknown as Record<string, string>,
            });
            console.log(`[FullExam] Successfully saved quiz history: ${testTitle}`);
          } catch (quizHistoryError) {
            console.error('[FullExam] Error saving quiz history:', quizHistoryError);
            // Don't throw - quizHistory is secondary, testResults is primary
          }
        } catch (testResultError) {
          console.error('[FullExam] Error saving test result:', testResultError);
        }
      } else {
        console.log('[FullExam] Skipping test result save - conditions not met');
      }

      // For assignments: live session already has name from lobby — skip name modal; link-only still asks for name
      if (isCustomAssignment) {
        if (liveSessionId && liveStudentId && liveStudentName) {
          setStudentName(liveStudentName);
          setShowResults(true);
          setShowFullResults(true);
          setShowNameInputModal(false);
          saveAssignmentResults(liveStudentName);
        } else {
          setShowResults(true);
          setShowFullResults(true); // Must be true so results are in the DOM and visible (blurred) behind the modal
          setShowNameInputModal(true); // Show name input overlay
        }
      } else {
        // Go straight to full results view (skip AssessmentResultsPanel)
        setShowResults(true);
        setShowFullResults(true);
      }
    }
  };

  const handleConfirmSubmit = async () => {
    setShowBookmarkConfirmModal(false);
    const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctCount / questions.length) * 100);
    
    // Award XP for unit tests and regular exams (not custom assignments - those handle it separately)
    if (!isCustomAssignment && awardXp && user && !xpAwarded) {
      if (correctCount > 0) {
        // Calculate XP: 20 for completion + 10 per correct answer (same as AssessmentResultsPanel)
        const totalXP = 20 + (correctCount * 10);
        try {
          await awardXp(totalXP, examType);
          setXpAwarded(true);
          console.log(`[FullExam] Awarded ${totalXP} XP (20 completion + ${correctCount} correct × 10 XP)`);
        } catch (xpError) {
          console.error('[FullExam] Error awarding XP:', xpError);
        }
      }
    }

    // Save test result for unit tests and full exams
    if (!isCustomAssignment && user && (isUnitTest || isFullExam || isPreviewExam)) {
      try {
        let testType: 'unit_mcq' | 'full_exam' | 'full_frq' = 'full_exam';
        let testId = 'full_mcq_exam';
        let testTitle = 'Full MCQ Exam';
        
        if (isUnitTest && examNumber) {
          testType = 'unit_mcq';
          testId = `unit_${examNumber}_${examType}`;
          testTitle = `Unit ${examNumber} MCQ Test`;
        } else if (isFullExam) {
          testType = questionType === 'frq' ? 'full_frq' : 'full_exam';
          testId = questionType === 'frq' ? 'full_frq_exam' : `full_${examType}_mcq`;
          testTitle =
            questionType === 'frq'
              ? 'Full FRQ Exam'
              : `Full MCQ Exam (${examType === 'macro' ? 'Macro' : examType === 'micro' ? 'Micro' : 'Gov'})`;
        } else if (isPreviewExam && examNumber) {
          // Preview exams are treated as full exams
          testType = questionType === 'frq' ? 'full_frq' : 'full_exam';
          testId = questionType === 'frq' ? `preview_frq_${examNumber}` : `preview_mcq_${examNumber}`;
          testTitle = questionType === 'frq' ? `Preview FRQ Exam ${examNumber}` : `Preview MCQ Exam ${examNumber}`;
        }

        // Save to testResults collection (for my-assignment-history page)
        await saveTestResult({
          userId: user.uid,
          testType,
          testId,
          score,
          totalQuestions: questions.length,
          completedAt: new Date()
        });
        console.log(`[FullExam] Saved test result: ${testType} - ${testId} - Score: ${score}%`);

        // Also save to quizHistory for Recent Activity on dashboard
        try {
          await saveQuizResult({
            userId: user.uid,
            type: 'custom-link', // Using existing type since we don't have 'unit-test' type yet
            title: testTitle,
            score,
            correctCount,
            totalQuestions: questions.length,
            questions: questions,
            userAnswers: answers as unknown as Record<string, string>,
          });
          console.log(`[FullExam] Successfully saved quiz history: ${testTitle}`);
        } catch (quizHistoryError) {
          console.error('[FullExam] Error saving quiz history:', quizHistoryError);
          // Don't throw - quizHistory is secondary, testResults is primary
        }
      } catch (testResultError) {
        console.error('[FullExam] Error saving test result:', testResultError);
      }
    }

    // For assignments, show results but blurred until name is entered (skip name for live session)
    if (isCustomAssignment) {
      if (liveSessionId && liveStudentId && liveStudentName) {
        setStudentName(liveStudentName);
        setShowResults(true);
        setShowNameInputModal(false);
        saveAssignmentResults(liveStudentName);
      } else {
        setShowResults(true);
        setShowFullResults(true); // Show results underneath so they're visible (blurred) behind the modal
        setShowNameInputModal(true); // Show name input overlay
      }
    } else {
      // Go straight to full results view (skip AssessmentResultsPanel)
      setShowResults(true);
      setShowFullResults(true);
    }
  };

  const handleNameSubmit = async () => {
    if (!studentName.trim()) {
      alert('Please enter your name');
      return;
    }
    setShowNameInputModal(false); // Hide name input, reveal results
    setShowFullResults(true); // Show full results panel (score + questions with correct answer & explanation)
    
    // Save results to Firebase with student name
    if (isCustomAssignment) {
      await saveAssignmentResults(studentName.trim());
    }
  };

  const saveAssignmentResults = async (studentNameInput?: string) => {
    if (!isCustomAssignment) return;

    // Live session: update session student doc only
    if (liveSessionId && liveStudentId) {
      try {
        const totalQuestions = questions.length;
        const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
        const score = Math.round((correctCount / totalQuestions) * 100);
        await updateDoc(doc(db, 'sessions', liveSessionId, 'students', liveStudentId), {
          completed: true,
          score,
          correctCount,
          totalQuestions,
          submittedAt: serverTimestamp(),
        });
      } catch (err) {
        console.error('[FullExam] Error updating live session student:', err);
      }
      setShowNameInputModal(false);
      setShowFullResults(true);
      setLiveSessionScoreSummaryOnly(true); // Show score summary gate first; "See full results" reveals breakdown
      return;
    }

    if (!assignmentLinkId) return;

    try {

      // Get assignment link document
      const assignmentLinkDoc = await getDocs(query(collection(db, 'assignmentLinks'), where('encodedParam', '==', assignmentLinkId)));
      
      if (assignmentLinkDoc.empty) {
        console.warn('Assignment link not found in Firebase');
        return;
      }

      const linkDoc = assignmentLinkDoc.docs[0];
      const linkDocId = linkDoc.id;

      // Calculate results
      const questionResults = questions.map(q => ({
        questionId: q.id,
        studentAnswer: answers[q.id] || null,
        correctAnswer: q.correctAnswer,
        isCorrect: answers[q.id] === q.correctAnswer,
        unit: q.unit,
        unitName: q.unitName
      }));

      const totalQuestions = questions.length;
      const correctCount = questionResults.filter(r => r.isCorrect).length;
      const score = Math.round((correctCount / totalQuestions) * 100);

      // Save results
      await addDoc(collection(db, 'assignmentResults'), {
        assignmentLinkId: linkDocId,
        tutorId: linkDoc.data().tutorId,
        studentId: user?.uid || null,
        studentEmail: user?.email || null,
        studentName: studentNameInput || user?.displayName || user?.email?.split('@')[0] || 'Student',
        questionResults: questionResults,
        totalQuestions: totalQuestions,
        correctCount: correctCount,
        incorrectCount: totalQuestions - correctCount,
        score: score,
        answers: answers,
        assignmentType: 'mcq', // Add assignment type
        submittedAt: serverTimestamp()
      });

      // Award XP for correct answers (100 XP per correct question)
      if (awardXp && correctCount > 0) {
        try {
          const totalXP = correctCount * 100;
          await awardXp(totalXP, examType);
          console.log(`[Custom Assignment] Awarded ${totalXP} XP (${correctCount} correct answers × 100 XP)`);
        } catch (xpError) {
          console.error('[Custom Assignment] Error awarding XP:', xpError);
        }
      }

      // Save quiz history
      if (user && questions.length > 0) {
        try {
          const title = linkDoc.data().subject === 'macro' 
            ? `Macro Custom Assignment` 
            : `Micro Custom Assignment`;
          
          await saveQuizResult({
            userId: user.uid,
            type: 'custom-link',
            title,
            score,
            correctCount,
            totalQuestions,
            questions: questions,
            userAnswers: answers as unknown as Record<string, string>,
          });
          console.log('[Custom Assignment] Saved quiz history');
        } catch (historyError) {
          console.error('[Custom Assignment] Error saving quiz history:', historyError);
        }
      }
    } catch (error) {
      console.error('Error saving assignment results to Firebase:', error);
    }
  };

  const calculateScore = () => {
    const totalQuestions = questionBank.questions.length;
    const correctAnswers = questionBank.questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    return (correctAnswers / totalQuestions) * 100;
  };
  const correctAnswersCount = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
  const totalQuestionsCount = questions.length;
  const percentScore =
    totalQuestionsCount > 0 ? Math.round((correctAnswersCount / totalQuestionsCount) * 100) : 0;
  const earnedXp = 20 + correctAnswersCount * 10;
  const resultsHubUrl =
    examType === 'gov'
      ? '/ap-gov-practice-tests'
      : examType === 'macro'
        ? '/ap-macro-practice-tests'
        : '/ap-micro-practice-tests';
  const unitResultsHubUrl = `/unit-final-practice-tests?subject=${examType}`;

  const toggleExplanation = (questionId: number) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarkedQuestions(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(questionId)) {
        newBookmarks.delete(questionId);
      } else {
        newBookmarks.add(questionId);
      }
      return newBookmarks;
    });
  };

  // Helper function to check if user can navigate to a specific question
  // Unit tests: first 2 questions (indices 0-1) are accessible
  // Full exams: first 5 questions (indices 0-4) are accessible
  // Beyond that, requires season pass
  const canNavigateToQuestion = (questionIndex: number): boolean => {
    // Custom assignments don't require season pass
    if (isCustomAssignment) return true;
    
    // For unit tests: allow first 2 questions (indices 0-1)
    if (isUnitTest && questionIndex <= 1) {
      return true;
    }
    
    // For full exams: allow first 5 questions (indices 0-4)
    if (isFullExam && questionIndex <= 4) {
      return true;
    }
    
    // For preview exams: allow first 5 questions (indices 0-4)
    if (isPreviewExam && questionIndex <= 4) {
      return true;
    }
    
    // For unit tests and full exams, questions beyond the free tier require season pass
    if (requiresSeasonPass) {
      return hasSeasonPassAccess;
    }
    
    return true;
  };

  // Helper function to save guest progress before showing purchase modal
  const saveProgressBeforePurchase = () => {
    if (typeof window !== 'undefined') {
      // Ensure timer is paused before saving
      if (!isTimerPaused) {
        setIsTimerPaused(true);
      }
      
      const currentUrl = window.location.href;
      const guestProgress = {
        answers,
        currentQuestionIndex: currentPage,
        timeRemaining, // Timer is paused, so this value is frozen
        examNumber,
        examType,
        questionType,
        unitId: isUnitTest ? examNumber : undefined
      };
      
      localStorage.setItem('guest_quiz_progress', JSON.stringify(guestProgress));
      localStorage.setItem('redirect_after_purchase', currentUrl);
      
      console.log('[FullExam] Saved progress before purchase:', {
        answers: Object.keys(answers).length,
        currentQuestionIndex: currentPage,
        timeRemaining,
        examNumber
      });
    }
  };

  // Helper function to handle navigation with access check
  const handleNavigateToQuestion = (questionIndex: number) => {
    // Check access for the requested question
    if (!canNavigateToQuestion(questionIndex)) {
      // Pause timer and save progress before showing modal
      setIsTimerPaused(true);
      saveProgressBeforePurchase();
      setShowSeasonPassModal(true);
      return;
    }
    
    setCurrentPage(questionIndex);
  };

  // Function to scroll to a question (used by sidecar)
  const scrollToQuestion = (questionId: number) => {
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) return;
    
    handleNavigateToQuestion(questionIndex);
    setShowSidecar(false); // Close sidecar after navigating
    
    // Small delay to ensure page change happens first
    setTimeout(() => {
      const element = document.getElementById(`question-${questionId}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Calculator functions for slide-out panel
  const handleCalculatorNumber = (num: string) => {
    if (calculatorWaitingForNewValue) {
      setCalculatorDisplay(num);
      setCalculatorWaitingForNewValue(false);
    } else {
      setCalculatorDisplay(calculatorDisplay === '0' ? num : calculatorDisplay + num);
    }
  };

  const handleCalculatorOperation = (op: string) => {
    const inputValue = parseFloat(calculatorDisplay);

    if (calculatorPreviousValue === null) {
      setCalculatorPreviousValue(inputValue);
    } else if (calculatorOperation) {
      const result = calculateResult(calculatorPreviousValue, inputValue, calculatorOperation);
      setCalculatorDisplay(String(result));
      setCalculatorPreviousValue(result);
    }

    setCalculatorWaitingForNewValue(true);
    setCalculatorOperation(op);
  };

  const calculateResult = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleCalculatorEquals = () => {
    if (calculatorPreviousValue !== null && calculatorOperation) {
      const inputValue = parseFloat(calculatorDisplay);
      const result = calculateResult(calculatorPreviousValue, inputValue, calculatorOperation);
      setCalculatorDisplay(String(result));
      setCalculatorPreviousValue(null);
      setCalculatorOperation(null);
      setCalculatorWaitingForNewValue(true);
    }
  };

  const handleCalculatorClear = () => {
    setCalculatorDisplay('0');
    setCalculatorPreviousValue(null);
    setCalculatorOperation(null);
    setCalculatorWaitingForNewValue(false);
  };

  const handleCalculatorDecimal = () => {
    if (calculatorWaitingForNewValue) {
      setCalculatorDisplay('0.');
      setCalculatorWaitingForNewValue(false);
    } else if (!calculatorDisplay.includes('.')) {
      setCalculatorDisplay(calculatorDisplay + '.');
    }
  };


  // Add effect to reset tools state when component unmounts/remounts
  useEffect(() => {
    // Don't reset tools panel on mount - let user control it
    return () => {
      setShowToolsPanel(false);
    };
  }, []);


  const handlePurchase = async () => {
    console.log('Current user state:', user); // Add debugging
    
    if (!user) {
      console.log('No user found, showing login modal');
      setShowLoginModal(true);
      return;
    }

    // Save guest progress before redirecting (for guest users who just signed up)
    saveProgressBeforePurchase();

    console.log('User is logged in, proceeding to checkout');
    if (examType === 'gov') {
      return;
    }
    try {
      await redirectToCheckout(examType, questionType, examNumber, user.uid);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  // AI Tutor function removed - can be re-added per-question if needed
  const handleAITutorClick = async (questionId: number) => {
    // TODO: Implement per-question AI tutor if needed
  };

  const getRelatedVideos = (lessonIds: string[]) => {
    const subjectName =
      examType === 'macro'
        ? 'AP Macroeconomics'
        : examType === 'micro'
          ? 'AP Microeconomics'
          : 'AP United States Government and Politics';
    return videos.filter(video => 
      video.lessonIDS.some(id => lessonIds.includes(id)) && video.subjects.includes(subjectName)
    );
  };

  // Removed currentQuestionIndex references since we show all questions at once

  return (
    <>
      {/* Name Input Modal for Custom Assignments Only */}
      {showNameInputModal && isCustomAssignment && typeof window !== 'undefined' && feedbackContainer && createPortal(
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border-4 border-black z-10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-black text-gray-900">
                Enter Your Name
              </h3>
            </div>
            <p className="text-gray-700 mb-6 font-semibold">
              Please enter your name so your teacher can identify your submission.
            </p>
            <div className="mb-6">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && studentName.trim()) {
                    handleNameSubmit();
                  }
                }}
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-black rounded-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleNameSubmit}
                disabled={!studentName.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Reveal Results
              </button>
            </div>
          </div>
        </div>,
        feedbackContainer
      )}

      {/* Add the modals */}
      {showTutorial && (
        <ExamTutorialModal
          onClose={() => {
            setShowTutorial(false);
            if (typeof window !== 'undefined') {
              localStorage.setItem('hasSeenExamTutorial', 'true');
            }
          }}
        />
      )}

      {/* Guest save progress modal — shown when a non-logged-in user clicks Save & Exit on a unit test */}
      {showGuestSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
          <div className="bg-gray-50 rounded-md shadow-2xl max-w-sm w-full p-8 border-2 border-black">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={32} height={32} className="w-8 h-8" unoptimized />
              <h3 className="text-xl font-black text-gray-900">Save your progress</h3>
            </div>
            <p className="text-gray-600 font-medium mb-1">
              You've answered <span className="font-normal text-gray-900">{Object.keys(answers).length}</span> question{Object.keys(answers).length !== 1 ? 's' : ''}.
            </p>
            <p className="text-gray-600 font-medium mb-6">
              Create a free account to save your progress and pick up exactly where you left off.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowGuestSaveModal(false);
                  // After signup, redirect back to this exact test
                  setRedirectOnLogin(window.location.href);
                  setShowSignupModal(true);
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-md border-2 border-blue-800 transition-colors tracking-wide"
              >
                Sign up free →
              </button>
              <button
                onClick={() => {
                  setShowGuestSaveModal(false);
                  setShowLoginModal(true);
                }}
                className="w-full py-3 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-bold rounded-md transition-colors tracking-wide"
              >
                Already have an account? Log in
              </button>
              <button
                onClick={() => {
                  setShowGuestSaveModal(false);
                  try {
                    sessionStorage.removeItem(UNIT_TEST_GUEST_SAVE_PENDING_SESSION_KEY);
                    localStorage.removeItem('guest_quiz_progress');
                  } catch {
                    /* noop */
                  }
                  router.push(`/unit-final-practice-tests?subject=${examType}`);
                }}
                className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Exit without saving
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={() => {
          setShowLoginModal(false);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={() => {
          setShowSignupModal(false);
        }}
      />

      {/* Season Pass Modal — AP Gov skips this (all questions free for now) */}
      {showSeasonPassModal && (
        <SeasonPassModal
          subject={examType}
          onClose={() => {
            setShowSeasonPassModal(false);
            // Resume timer when modal is closed (if user stays on page)
            if (!showResults && timeRemaining > 0) {
              setIsTimerPaused(false);
            }
          }}
        />
      )}

      {/* Debug Button - Only in Development */}
      {!showResults && isMounted && (
        (typeof window !== 'undefined' && (
          window.location.hostname === 'localhost' || 
          window.location.hostname === '127.0.0.1' || 
          localStorage.getItem('showDebugButton') === 'true' ||
          process.env.NODE_ENV === 'development'
        )) && (
          <>
            <button
              onClick={() => {
                saveProgressBeforePurchase();
                window.location.href = '/purchase/success';
              }}
              className="fixed bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg shadow-lg z-[9999] border-2 border-black"
              title="Test Payment Flow - Saves progress and redirects to success page"
              style={{ zIndex: 9999 }}
            >
              🧪 Test Payment Flow
            </button>
            {/* Test Save Progress Modal Button */}
            {isFullMCQExam && user && Object.keys(answers).length > 0 && (
              <button
                onClick={() => {
                  console.log('[FullExam] Test button clicked - showing save progress modal');
                  setShowSaveProgressModal(true);
                }}
                className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg z-[9999] border-2 border-black"
                title="Test Save Progress Modal"
                style={{ zIndex: 9999 }}
              >
                🧪 Test Save Modal
              </button>
            )}
          </>
        )
      )}

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={selectedImage.src} 
              alt="Question" 
              className="max-w-full max-h-[90vh] object-contain scale-150 transform"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
              className="absolute top-0 right-0 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 z-10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Video Slide-Out Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-[45%] bg-white shadow-2xl z-40 border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
          showVideoModal && videoUrl ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {showVideoModal && videoUrl && (
          <div className="h-full flex flex-col p-6 relative">
            <div className="flex-1 overflow-hidden">
              <video 
                key={videoUrl}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full rounded-lg object-contain"
                src={videoUrl}
                preload="auto"
                onLoadedData={() => {
                  setIsVideoLoaded(true);
                  setIsVideoLoading(false);
                }}
                onError={(e) => {
                  console.error('Error loading video:', e);
                  console.error('Video URL:', videoUrl);
                  setIsVideoLoading(false);
                }}
                onLoadStart={() => {
                  console.log('Video loading started:', videoUrl);
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={() => {
                setShowVideoModal(false);
                setVideoUrl('');
              }}
              className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white p-3 rounded-l-xl border border-r-0 border-gray-200 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
              aria-label="Close video"
            >
              <ChevronsRight size={24} className="text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Feedback modal removed - can be re-added per-question if needed */}


      {/* Only show exam content if not showing results, or if showing full results */}
      {(!showResults || showFullResults) && (
        <div className={`flex w-full flex-col relative ${shouldShowTestUI ? 'min-h-screen' : isCustomAssignment ? '' : 'lg:h-[calc(100vh-5rem)]'} ${shouldShowTestUI ? '' : 'overflow-hidden'}`}>
          {/* Top Bar */}
          {shouldShowTestUI && (!showResults || (showResults && showFullResults && isUnitTest)) && (
            <div className={`w-full flex items-center justify-between flex-shrink-0 fixed left-0 right-0 z-40 ${isUnitTest ? 'top-0 bg-white border-b border-gray-200 h-14 px-6 py-0' : 'top-20 bg-gray-200 px-6 py-4 border-b-4 border-black shadow-lg'}`}>
            {/* ── UNIT TEST: Fiveable-style header ── */}
            {isUnitTest && (
              showResults ? (
              <>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2.5 p-0.5 -m-0.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-left"
                  aria-label="Go home"
                  title="Home"
                >
                  <Image src="/images/dojoIconJan26.svg" alt="" width={26} height={26} unoptimized />
                  <span className="text-sm font-black text-gray-900 tracking-wide">AP Dojo</span>
                </button>
                <span className="text-sm font-medium text-gray-500 hidden sm:block">
                  Unit test results
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => router.push(unitResultsHubUrl)}
                    className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    Unit practice tests
                  </button>
                  <button
                    onClick={() => router.push(resultsHubUrl)}
                    className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    {examType === 'gov' ? 'AP Gov hub' : 'Practice hub'}
                  </button>
                </div>
              </>
              ) : (
              <>
                {/* Left: Logo + title — one save & exit control */}
                <button
                  type="button"
                  onClick={handleUnitTestSaveAndExit}
                  className="flex items-center gap-2.5 p-0.5 -m-0.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-left"
                  aria-label="Save and exit"
                  title="Save & exit"
                >
                  <Image src="/images/dojoIconJan26.svg" alt="" width={26} height={26} unoptimized />
                  {isCustomAssignment ? (
                    <span className="text-sm font-black text-gray-900 tracking-wide">Custom Assignment</span>
                  ) : (
                    <span className="text-sm font-black text-gray-900 tracking-wide">AP Dojo</span>
                  )}
                </button>
                {/* Center: section label */}
                <span className="text-sm font-medium text-gray-500 hidden sm:block">
                  {isCustomAssignment ? `${questions.length} Questions` : 'Section I – Multiple Choice'}
                </span>
                {/* Right: controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleUnitTestSaveAndExit}
                    className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    Save & Exit
                  </button>
                  <button
                    onClick={() => handleToolToggle('whiteboard')}
                    className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    Scratch Paper
                  </button>
                  {/* Text size control */}
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => setQuestionFontSize(s => Math.max(0, s - 1))}
                      disabled={questionFontSize === 0}
                      className="px-2 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
                      title="Decrease text size"
                    >−</button>
                    <span className="px-2 text-xs font-semibold text-gray-700 select-none">Aa</span>
                    <button
                      onClick={() => setQuestionFontSize(s => Math.min(FONT_SIZE_MAX, s + 1))}
                      disabled={questionFontSize === FONT_SIZE_MAX}
                      className="px-2 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
                      title="Increase text size"
                    >+</button>
                  </div>
                  {!isTimerPaused ? (
                    <button
                      onClick={() => setIsTimerPaused(true)}
                      className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-1"
                    >
                      <Pause className="w-3 h-3" /> Pause
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsTimerPaused(false)}
                      className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" /> Resume
                    </button>
                  )}
                  {showTimer ? (
                    <button
                      onClick={() => setShowTimer(false)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded border ${timeRemaining <= 300 && timeRemaining > 0 ? 'border-red-400 text-red-600 bg-red-50' : 'border-gray-300 text-gray-900 bg-white'} min-w-[72px] text-center`}
                      title="Hide timer"
                    >
                      {formatTime(timeRemaining)}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowTimer(true)}
                      className="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                      title="Show timer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </>
              )
            )}
            {/* ── EXISTING BAR (non-unit-test) ── */}
            {!isUnitTest && (
              <>
              {/* Timer Section - Only show for non-custom assignments */}
              {!isCustomAssignment && (
                <>
                  {showTimer ? (
                    <>
                      {isTimerPaused ? (
                        /* When paused: Show Resume Test button where timer was, keep buttons on right */
                        <>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsTimerPaused(false)}
                              className="text-2xl font-black tracking-wider text-gray-900 font-mono transition-colors hover:text-gray-700"
                              aria-label="Resume test"
                            >
                              Resume Test
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Calculator Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Calculator className="w-5 h-5 text-gray-900" />
                            </button>
                            {/* Drawing Pad Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Pen className="w-5 h-5 text-gray-900" />
                            </button>
                          </div>
                        </>
                      ) : (
                        /* When not paused: Normal layout */
                        <>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-black tracking-wider text-gray-900 font-mono w-24 text-right">
                              {formatTime(timeRemaining)}
                            </span>
                            {timeRemaining <= 300 && timeRemaining > 0 && (
                              <span className="text-lg font-bold animate-pulse text-gray-900">⚠️ Less than 5 minutes remaining!</span>
                            )}
                            {/* Hide Timer Button */}
                            <button
                              onClick={() => setShowTimer(false)}
                              className="text-gray-900 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-300 flex-shrink-0"
                              aria-label="Hide timer"
                              title="Hide timer"
                            >
                              <EyeOff className="w-5 h-5" />
                            </button>
                            {/* Pause Button */}
                            <button
                              onClick={() => setIsTimerPaused(true)}
                              className="text-gray-900 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-300 flex-shrink-0"
                              aria-label="Pause timer"
                              title="Pause timer"
                            >
                              <Pause className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Calculator Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Calculator className="w-5 h-5 text-gray-900" />
                            </button>
                            {/* Drawing Pad Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Pen className="w-5 h-5 text-gray-900" />
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {isTimerPaused ? (
                        /* When paused and timer hidden: Show Resume Test button where timer would be, keep buttons on right */
                        <>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setIsTimerPaused(false)}
                              className="text-2xl font-black tracking-wider text-gray-900 font-mono transition-colors hover:text-gray-700"
                              aria-label="Resume test"
                            >
                              Resume Test
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Calculator Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Calculator className="w-5 h-5 text-gray-900" />
                            </button>
                            {/* Drawing Pad Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Pen className="w-5 h-5 text-gray-900" />
                            </button>
                          </div>
                        </>
                      ) : (
                        /* When not paused and timer hidden: Normal layout */
                        <>
                          <div className="flex items-center gap-3">
                            {/* Show Timer Button */}
                            <button
                              onClick={() => setShowTimer(true)}
                              className="text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-300"
                              aria-label="Show timer"
                              title="Show timer"
                            >
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-semibold">Show Timer</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Calculator Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Calculator className="w-5 h-5 text-gray-900" />
                            </button>
                            {/* Drawing Pad Toggle Button */}
                            <button
                              onClick={() => handleToolToggle('calculator')}
                              className={`p-2 rounded-lg transition-colors ${
                                showToolsPanel 
                                  ? 'bg-gray-300 hover:bg-gray-400' 
                                  : 'hover:bg-gray-300'
                              }`}
                              aria-label="Toggle calculator and drawing pad"
                              title="Toggle calculator and drawing pad"
                            >
                              <Pen className="w-5 h-5 text-gray-900" />
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {/* For custom assignments: No timer, just calculator and drawing pad buttons */}
              {isCustomAssignment && (
                <div className="flex items-center gap-3 ml-auto">
                  {/* Calculator Toggle Button */}
                  <button
                    onClick={() => handleToolToggle('calculator')}
                    className={`p-2 rounded-lg transition-colors ${
                      showToolsPanel && activeTool === 'calculator'
                        ? 'bg-gray-300 hover:bg-gray-400' 
                        : 'hover:bg-gray-300'
                    }`}
                    aria-label="Toggle calculator"
                    title="Calculator"
                  >
                    <Calculator className="w-5 h-5 text-gray-900" />
                  </button>
                  {/* Drawing Pad Toggle Button */}
                  <button
                    onClick={() => handleToolToggle('whiteboard')}
                    className={`p-2 rounded-lg transition-colors ${
                      showToolsPanel && activeTool === 'whiteboard'
                        ? 'bg-gray-300 hover:bg-gray-400' 
                        : 'hover:bg-gray-300'
                    }`}
                    aria-label="Toggle drawing pad"
                    title="Drawing Pad"
                  >
                    <Pen className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              )}
              </>
            )}
            </div>
          )}
          <div className={`flex w-full flex-1 overflow-hidden relative ${!showToolsPanel ? 'flex-col' : 'lg:flex-row flex-col'}`} style={
            isUnitTest && !(showResults && isUnitTest)
              ? { height: 'calc(100vh - 56px)', marginTop: '56px' }
              : isUnitTest && showResults
              ? { marginTop: '56px' }
              : shouldShowTestUI && !(showResults && isUnitTest)
              ? { height: 'calc(100vh - 64px - 80px)', marginTop: '80px' }
              : shouldShowTestUI && showResults && isUnitTest
              ? { marginTop: '64px' }
              : {}
          }>
          {/* Blur Overlay when timer is paused - covers content but not top/bottom bars */}
          {isTimerPaused && shouldShowTestUI && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-40"></div>
          )}

          {/* Resources Panel - Custom Assignments only */}
          {isCustomAssignment && (
            <div className="fixed top-14 right-0 w-44 bg-white border-l border-gray-200 flex flex-col z-30" style={{ height: 'calc(100vh - 56px)' }}>
              <div className="px-4 pt-5 pb-3 border-b border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resources</p>
              </div>
              <nav className="flex flex-col gap-0.5 p-3 flex-1">
                {[
                  { label: 'Practice Tests', href: '/unit-final-practice-tests', icon: '📋' },
                  { label: 'Cheat Sheets', href: '/cheat-sheets', icon: '📄' },
                  { label: 'Unit Reviews', href: '/unit-review', icon: '📚' },
                  { label: 'Graph Gym', href: '/graph-gym', icon: '📈' },
                  { label: 'AP Dojo Home', href: '/', icon: '🏠' },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <span className="text-sm leading-none">{icon}</span>
                    <span className="leading-tight">{label}</span>
                  </a>
                ))}
              </nav>
              <div className="p-3 border-t border-gray-100">
                <a
                  href="https://apdojo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={18} height={18} unoptimized />
                  <span className="text-[10px] font-black text-gray-400 tracking-wide">AP DOJO</span>
                </a>
              </div>
            </div>
          )}
          {/* Question Container (Left Side / Top on Mobile) */}
          <motion.div 
            animate={{
              width: showToolsPanel ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${leftPanelWidth}%` : '100%') : '100%',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className={`flex-shrink-0 overflow-y-auto min-w-0 w-full lg:w-auto ${shouldShowTestUI ? 'pb-24' : ''}`}
          >
            <div className={`w-full ${
              isLiveSession
                ? 'p-6 md:p-8 max-w-4xl mx-auto'
                : isCustomAssignment
                  ? 'p-8 max-w-4xl mx-auto pr-52'
                  : showVideoModal && videoUrl
                    ? 'p-8'
                    : showToolsPanel
                      ? 'p-8'
                      : isUnitTest && showResults && showFullResults
                        ? 'max-w-7xl mx-auto p-0 sm:px-4'
                        : 'p-8 max-w-5xl mx-auto'
             } ${shouldShowTestUI ? 'pb-24' : ''}`}>
            {!showResults ? (
              <>
              {/* Progress Bar - Mobile Only */}
              {!(showVideoModal && videoUrl) && (
              <div className="border-b border-gray-200 mb-6 lg:hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="font-normal">Progress Bar</span>
                  </div>
                  <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(20, minmax(0, 1fr))' }}>
                    {questions.map((q, index) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isBookmarked = bookmarkedQuestions.has(q.id);
                      let buttonClasses = 'w-8 h-8 rounded-lg flex items-center justify-center font-normal text-xs transition-colors';
                      let textClasses = '';
                      if (isBookmarked) {
                        buttonClasses += ' bg-yellow-200';
                        textClasses += ' text-yellow-800';
                      } else if (isAnswered) {
                        buttonClasses += ' bg-blue-300';
                        textClasses += ' text-blue-800';
                      } else {
                        buttonClasses += ' bg-gray-200';
                        textClasses += ' text-gray-600';
                      }
                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            if (canNavigateToQuestion(index)) {
                              setCurrentPage(index);
                              setTimeout(() => {
                                const element = document.getElementById(`question-${q.id}`);
                                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }, 100);
                            } else {
                              // Pause timer and save progress before showing modal
                              setIsTimerPaused(true);
                              saveProgressBeforePurchase();
                              setShowSeasonPassModal(true);
                            }
                          }}
                          className={buttonClasses}
                          title={`Question ${index + 1}`}
                        >
                          <span className={textClasses}>{index + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              )}

              {/* Single Question View - Same for both free and pro users */}
              {(() => {
                const question = questions[currentPage];
                if (!question) return null;
                
                const selectedAnswer = answers[question.id];
                const selectedIndex = selectedAnswer ? selectedAnswer.charCodeAt(0) - 65 : null;
                const hasVisualContent = question.image || question.tableData;
                
                return (
                  <div className="w-full relative">
                    {/* Question Container */}
                  <div className="w-full">
                      <div id={`question-${question.id}`} className={`bg-white relative w-full ${
                        isLiveSession
                          ? 'rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8'
                          : isCustomAssignment
                            ? 'border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8'
                          : isUnitTest
                            ? 'p-8'
                            : 'rounded-lg shadow-md border border-gray-200 p-6 md:p-8'
                      }`}>
                        {/* Main Question Content */}
                        <div className={isUnitTest ? 'grid grid-cols-2 gap-x-0 gap-y-4' : 'space-y-6'}>
                          {/* Question Number, Bookmark, and Question Text */}
                          <div className={isUnitTest ? 'col-start-1 row-start-1 pr-8 border-r border-gray-100' : 'w-full'}>
                            <div className="flex items-start gap-3">
                              {/* Question Number */}
                              {isUnitTest ? (
                                <span className="flex-shrink-0 text-sm font-normal text-gray-400 mt-1">{currentPage + 1}.</span>
                              ) : (
                                <div className="flex-shrink-0 flex items-start justify-center w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg pt-2">
                                  <span className="text-lg font-normal text-slate-700">{currentPage + 1}</span>
                                </div>
                              )}
                              {/* Bookmark + highlighter (unit test: compact toolbar) */}
                              {isUnitTest ? (
                                <div className="flex flex-shrink-0 items-start gap-0.5 mt-0.5">
                                  <button
                                    type="button"
                                    onClick={() => toggleBookmark(question.id)}
                                    className="flex-shrink-0 p-0.5 rounded hover:bg-gray-100/90 text-slate-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500"
                                    aria-label={bookmarkedQuestions.has(question.id) ? 'Remove bookmark' : 'Bookmark question'}
                                    title={bookmarkedQuestions.has(question.id) ? 'Remove bookmark' : 'Bookmark'}
                                  >
                                    <Bookmark
                                      className={`w-4 h-4 ${bookmarkedQuestions.has(question.id) ? 'text-amber-500 fill-amber-400/30' : 'text-slate-400'}`}
                                    />
                                  </button>
                                  {!isCustomAssignment && !isPreviewMode && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setQuestionHighlightModeById((prev) => ({
                                          ...prev,
                                          [question.id]: !prev[question.id],
                                        }))
                                      }
                                      className={`flex-shrink-0 p-0.5 rounded hover:bg-gray-100/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 ${
                                        questionHighlightModeById[question.id] ? 'text-amber-500' : 'text-slate-400'
                                      }`}
                                      aria-pressed={!!questionHighlightModeById[question.id]}
                                      aria-label="Highlight mode"
                                      title="Highlight text in the question (not answers)"
                                    >
                                      <Highlighter className="w-4 h-4" strokeWidth={2} />
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleBookmark(question.id)}
                                  className={`flex-shrink-0 p-2 rounded-lg transition-colors mt-0.5 ${
                                    bookmarkedQuestions.has(question.id)
                                      ? 'bg-yellow-100 text-yellow-500'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                                  }`}
                                  aria-label={
                                    bookmarkedQuestions.has(question.id) ? 'Remove bookmark' : 'Bookmark question'
                                  }
                                >
                                  <Bookmark className="w-5 h-5" />
                                </button>
                              )}
                              {/* Question Text */}
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`leading-relaxed ${isUnitTest ? `font-normal text-gray-900 ${FONT_SIZE_CLASSES[questionFontSize]}` : 'text-base md:text-lg font-normal font-serif text-gray-800 max-h-48 overflow-y-auto pr-2'} ${
                                    isUnitTest && questionHighlightModeById[question.id] && !isPreviewMode
                                      ? 'cursor-text'
                                      : ''
                                  }`}
                                >
                                  {isCustomAssignment ? (
                                    <QuestionWithKeyTerms 
                                      questionText={question.question} 
                                      unit={question.unit} 
                                      subject={apQuestionSubjectTag(examType)}
                                    />
                                  ) : isUnitTest ? (
                                    <UnitTestQuestionBody
                                      question={question}
                                      examType={examType}
                                      highlightMode={!!questionHighlightModeById[question.id] && !isPreviewMode}
                                      highlights={questionTextHighlights[question.id] ?? []}
                                      onHighlightsChange={(next) =>
                                        setQuestionTextHighlights((p) => ({ ...p, [question.id]: next }))
                                      }
                                    />
                                  ) : isApGovQuestion(question) ? (
                                    <ApGovQuestionText text={question.question} />
                                  ) : (
                                    question.question
                                  )}
                                </p>
                                {/* Icons Row */}
                                <div className="flex items-center gap-2 mt-2">
                                  {/* Video Explanation Icon */}
                                  {question.videoExplanation && typeof question.videoExplanation === 'string' && question.videoExplanation.trim() !== '' && (
                          <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setVideoUrl(question.videoExplanation!);
                                        setShowVideoModal(true);
                                      }}
                                      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-colors"
                                      aria-label="View video explanation"
                                      title="Watch video explanation"
                                    >
                                      <Play className="w-4 h-4 ml-0.5" />
                          </button>
                                  )}
                                  {/* Slider Explainer Icon */}
                        {question.sliderExplainer && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Eye icon clicked, sliderExplainer:', question.sliderExplainer);
                              setVideoUrl(question.sliderExplainer!);
                              setShowVideoModal(true);
                            }}
                                      className="flex-shrink-0 flex items-center gap-2 text-sm font-normal text-gray-700 hover:text-gray-900 transition-colors"
                            aria-label="View video explanation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                            </div>
                          </div>

                          {/* Visual Content - Directly Below Question Text */}
                          {hasVisualContent && !isCustomAssignment && !(showVideoModal && videoUrl) && (
                            <div className={isUnitTest ? 'col-start-1 row-start-2 pr-8 border-r border-gray-100' : 'w-full'}>
                              {question.image && (
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                  <img 
                                    src={question.image.src}
                                    alt="Question diagram"
                                    className="w-full h-auto max-h-[400px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                                    onClick={() => {
                                      setSelectedImage(question.image as StaticImageData);
                                      setShowImageModal(true);
                                    }}
                                  />
                                </div>
                              )}
                              {question.tableData && (
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                  <div className="flex items-center gap-4">
                                    {question.tableData.playerNames && (
                                      <div className="flex items-center justify-center h-full w-12">
                                        <p className="transform -rotate-90 whitespace-nowrap text-center font-normal text-sm text-gray-900 leading-tight">
                                          {question.tableData.playerNames.row.split(' ')[0]}
                                          <br />
                                          {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                        </p>
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      {question.tableData.playerNames && (
                                        <p className="text-center font-normal text-sm text-gray-900 mb-2">
                                          {question.tableData.playerNames.column}
                                        </p>
                                      )}
                                      <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse border border-black text-xs">
                                          <thead className="bg-white">
                                            <tr>
                                              {question.tableData.headers.map(header => (
                                                <th key={header} className="border border-black px-2 py-2 text-center font-normal text-gray-900">
                                                  {header}
                                                </th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody className="bg-white">
                                            {question.tableData.rows.map((row, rowIndex) => (
                                              <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => {
                                                  return (
                                                    <td 
                                                      key={cellIndex} 
                                                      className={`border border-black px-2 py-2 text-center font-normal`}
                                                    >
                                                      {cell}
                                                    </td>
                                                  );
                                                })}
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Visual Content - Show below question text when video modal is open */}
                          {showVideoModal && videoUrl && hasVisualContent && !isCustomAssignment && (
                            <div className="space-y-4 w-full">
                              {question.image && (
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-center">
                                  <img 
                                    src={question.image.src}
                                    alt="Question diagram"
                                    className="w-full max-w-2xl h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                                    onClick={() => {
                                      setSelectedImage(question.image as StaticImageData);
                                      setShowImageModal(true);
                                    }}
                                  />
                                </div>
                              )}
                              {question.tableData && (
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                  <div className="flex items-center gap-4">
                                    {question.tableData.playerNames && (
                                      <div className="flex items-center justify-center h-full w-16">
                                        <p className="transform -rotate-90 whitespace-nowrap text-center font-normal text-lg text-gray-900 leading-tight">
                                          {question.tableData.playerNames.row.split(' ')[0]}
                                          <br />
                                          {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                        </p>
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      {question.tableData.playerNames && (
                                        <p className="text-center font-normal text-lg text-gray-900 mb-2">
                                          {question.tableData.playerNames.column}
                                        </p>
                                      )}
                                      <table className="min-w-full border-collapse border border-black">
                                        <thead className="bg-white">
                                          <tr>
                                            {question.tableData.headers.map(header => (
                                              <th key={header} className="border border-black px-4 py-3 text-center text-base font-normal text-gray-900">
                                                {header}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                          {question.tableData.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                              {row.map((cell, cellIndex) => {
                                                return (
                                                  <td 
                                                    key={cellIndex} 
                                                    className={`border border-black px-4 py-3 text-center text-base font-normal`}
                                                  >
                                                    {cell}
                                                  </td>
                                                );
                                              })}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Visual Content - Show below question text for custom assignments */}
                          {isCustomAssignment && question.image && (
                            <div className="bg-white border-2 border-gray-300 rounded-xl shadow-sm p-4 flex justify-center">
                              <img
                                src={
                                  typeof question.image === 'string'
                                    ? question.image
                                    : (question.image as any).src
                                }
                                alt={
                                  typeof question.image === 'string'
                                    ? "Question diagram"
                                    : (question.image as any).alt || "Question diagram"
                                }
                                className="w-full max-w-3xl h-auto object-contain transition-all rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:opacity-90"
                                onClick={() => {
                                  if (question.image && typeof question.image !== 'string') {
                                    // Only open modal if image is an object (not a string)
                                    setSelectedImage(question.image as StaticImageData);
                                    setShowImageModal(true);
                                  }
                                }}
                              />
                            </div>
                          )}

                          {isCustomAssignment && question.tableData && (
                            <div className="bg-white border-2 border-gray-300 rounded-xl shadow-sm p-4">
                              <div className="flex items-center gap-4">
                                {question.tableData.playerNames && (
                                  <div className="flex items-center justify-center h-full w-16">
                                    <p className="transform -rotate-90 whitespace-nowrap text-center font-normal text-lg text-gray-900 leading-tight">
                                      {question.tableData.playerNames.row.split(' ')[0]}
                                      <br />
                                      {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                                    </p>
                                  </div>
                                )}
                                <div className="flex-1">
                                  {question.tableData.playerNames && (
                                    <p className="text-center font-normal text-lg text-gray-900 mb-2">
                                      {question.tableData.playerNames.column}
                                    </p>
                                  )}
                                  <table className="min-w-full border-collapse border border-black">
                                    <thead className="bg-white">
                                      <tr>
                                        {question.tableData.headers.map(header => (
                                          <th key={header} className="border border-black px-4 py-3 text-center text-base font-normal text-gray-900">
                                            {header}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                      {question.tableData.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                          {row.map((cell, cellIndex) => {
                                            return (
                                              <td 
                                                key={cellIndex} 
                                                className={`border border-black px-4 py-3 text-center text-base font-normal`}
                                              >
                                                {cell}
                                              </td>
                                            );
                                          })}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}

                            {/* Answer Options */}
                            {question.optionTableHeaders ? (
                              <div className={`space-y-3 ${isUnitTest ? `[grid-column:2] ${hasVisualContent ? '[grid-row:1_/_span_2]' : '[grid-row:1]'} pl-8 overflow-y-auto self-start` : ''}`}>
                                {/* Column Headers */}
                                <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 px-3 pb-2 border-b-2 border-gray-300">
                                  <div className="w-8"></div>
                                  {question.optionTableHeaders.map((header, idx) => (
                                    <div key={idx} className="text-center font-normal text-sm text-gray-700">
                                      {header}
                                    </div>
                                  ))}
                                  <div className="w-8"></div>
                                </div>
                                {question.options.map((option, index) => {
                                  const isStruckThrough = strikethroughState[question.id]?.includes(index);
                                  // Only show as selected if NOT struck through (strikethrough takes priority)
                                  const isSelected = !isStruckThrough && selectedIndex === index;
                                  const optionValues = option.split(' | ');
                                  const correctAnswerIndex = question.correctAnswer ? question.correctAnswer.charCodeAt(0) - 65 : -1;
                                  const isCorrect = index === correctAnswerIndex;
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => handleAnswer(question.id, index)}
                                      disabled={showResults}
                                      className={`w-full text-left p-3 text-sm font-normal transition-all duration-150 flex items-center gap-3 ${
                                        isLiveSession
                                          ? 'rounded-xl shadow-lg border border-slate-200'
                                          : isCustomAssignment
                                            ? 'border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                            : 'rounded-lg border'
                                      } ${
                                        showResults ?
                                          (isCorrect ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' :
                                          isSelected ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' :
                                          'bg-transparent text-gray-900 border-gray-200 cursor-default')
                                        : isStruckThrough ?
                                          isLiveSession
                                            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-pointer'
                                            : isCustomAssignment
                                              ? 'bg-gray-100 border-black opacity-60 cursor-pointer'
                                              : 'bg-gray-100 border-gray-300 opacity-60 cursor-pointer'
                                        : isSelected ?
                                          isLiveSession
                                            ? 'bg-blue-50 border-2 border-blue-300 shadow-md'
                                            : isCustomAssignment
                                              ? 'bg-blue-100 border-2 border-blue-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                              : 'bg-blue-100 border-2 border-blue-500 shadow-md'
                                        :
                                          isLiveSession
                                            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:shadow-md'
                                            : isCustomAssignment
                                              ? 'bg-white hover:bg-gray-50 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                              : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                      }`}
                                    >
                                      {/* Letter bubble */}
                                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 ${
                                        isLiveSession ? 'font-normal text-blue-500 border border-slate-200 bg-white' : isCustomAssignment ? 'border-2 border-black font-normal' : 'border font-normal'
                                      } ${
                                        !isLiveSession && (showResults ? (isCorrect ? 'bg-green-100 border-green-300 text-green-700' : isSelected ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : isStruckThrough ? 'bg-gray-200 border-gray-300 text-gray-400' : isSelected ? 'bg-blue-500 border-blue-600 text-white font-normal' : 'bg-white border-gray-300 text-gray-600')
                                      } ${isLiveSession && isStruckThrough ? 'opacity-60' : ''}`}>
                                        {String.fromCharCode(65 + index)}
                                      </span>
                                      {/* Two-column content */}
                                      <div className="flex-1 grid grid-cols-2 gap-4">
                                        {optionValues.map((value, valIdx) => (
                                          <span key={valIdx} className={`text-sm text-center ${isStruckThrough ? 'line-through text-gray-400' : ''} ${showResults ? 'text-gray-800' : isSelected ? 'text-gray-900' : 'text-gray-900'}`}>
                                            {value.trim()}
                                          </span>
                                        ))}
                                      </div>
                                      {/* Strikethrough Button - Only show when not submitted */}
                                      {!showResults && (
                                        <div
                                          role="button"
                                          onClick={(e) => { e.stopPropagation(); handleStrikethroughToggle(question.id, index); }}
                                          className={`flex-shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${
                                            isStruckThrough ? 'bg-slate-200 text-slate-600' : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                          }`}
                                          aria-label={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                                        >
                                          <Strikethrough className="w-5 h-5" />
                                        </div>
                                      )}
                                      {/* Feedback Icon */}
                                      {showResults && (
                                        <div className="flex-shrink-0">
                                          {isCorrect
                                            ? <Check className="w-5 h-5 text-green-500" />
                                            : isSelected
                                              ? <X className="w-5 h-5 text-red-500" />
                                              : null
                                          }
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className={`space-y-3 ${isUnitTest ? `[grid-column:2] ${hasVisualContent ? '[grid-row:1_/_span_2]' : '[grid-row:1]'} pl-8 pt-1 overflow-y-auto self-start` : ''}`}>
                                {question.options.map((option, index) => {
                                  const isStruckThrough = strikethroughState[question.id]?.includes(index);
                                  // Only show as selected if NOT struck through (strikethrough takes priority)
                                  const isSelected = !isStruckThrough && selectedIndex !== null && selectedIndex === index;
                                  const correctAnswerIndex = question.correctAnswer ? question.correctAnswer.charCodeAt(0) - 65 : -1;
                                  const isCorrect = index === correctAnswerIndex;
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => handleAnswer(question.id, index)}
                                      disabled={showResults}
                                      className={`w-full text-left p-3 text-sm font-normal transition-all duration-150 flex items-center gap-3 ${
                                        isLiveSession
                                          ? 'rounded-xl shadow-lg border border-slate-200'
                                          : isCustomAssignment
                                            ? 'border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                            : 'rounded-lg border'
                                      } ${
                                        showResults ?
                                          (isCorrect ? 'bg-green-50 text-gray-900 shadow-sm border-green-200 cursor-default' :
                                          isSelected ? 'bg-red-50 text-gray-900 shadow-sm border-red-200 cursor-default' :
                                          'bg-transparent text-gray-900 border-gray-200 cursor-default')
                                        : isStruckThrough ?
                                          isLiveSession
                                            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-pointer'
                                            : isCustomAssignment
                                              ? 'bg-gray-100 border-black opacity-60 cursor-pointer'
                                              : 'bg-gray-100 border-gray-300 opacity-60 cursor-pointer'
                                        : isSelected ?
                                          isLiveSession
                                            ? 'bg-blue-50 border-2 border-blue-300 shadow-md'
                                            : isCustomAssignment
                                              ? 'bg-blue-100 border-2 border-blue-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                              : 'bg-blue-100 border-2 border-blue-500 shadow-md'
                                        :
                                          isLiveSession
                                            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:shadow-md'
                                            : isCustomAssignment
                                              ? 'bg-white hover:bg-gray-50 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                              : 'bg-transparent hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                      }`}
                                    >
                                      {/* Letter bubble */}
                                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 ${
                                        isLiveSession ? 'font-normal text-blue-500 border border-slate-200 bg-white' : isCustomAssignment ? 'border-2 border-black font-normal' : 'border font-normal'
                                      } ${
                                        !isLiveSession && (showResults ? (isCorrect ? 'bg-green-100 border-green-300 text-green-700' : isSelected ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-500') : isStruckThrough ? 'bg-gray-200 border-gray-300 text-gray-400' : isSelected ? 'bg-blue-500 border-blue-600 text-white font-normal' : 'bg-white border-gray-300 text-gray-600')
                                      } ${isLiveSession && isStruckThrough ? 'opacity-60' : ''}`}>
                                        {String.fromCharCode(65 + index)}
                                      </span>
                                      {/* Option Image or Text */}
                                      {question.optionImages && question.optionImages[index] ? (
                                        <div className="flex-1 flex items-center justify-center">
                                          <img 
                                            src={question.optionImages[index].src}
                                            alt={question.optionImages[index].alt || `Option ${String.fromCharCode(65 + index)}`}
                                            className={`max-w-[200px] max-h-[150px] object-contain ${isStruckThrough ? 'opacity-40' : ''}`}
                                          />
                                        </div>
                                      ) : (
                                        <span className={`flex-1 ${isUnitTest ? `font-normal ${FONT_SIZE_CLASSES[questionFontSize]}` : 'text-sm'} ${isStruckThrough ? 'line-through text-gray-400' : ''} ${showResults ? 'text-gray-800' : isSelected ? 'text-gray-900' : 'text-gray-900'}`}>{option}</span>
                                      )}
                                      {/* Strikethrough Button - Only show when not submitted */}
                                      {!showResults && (
                                        <div
                                          role="button"
                                          onClick={(e) => { e.stopPropagation(); handleStrikethroughToggle(question.id, index); }}
                                          className={`flex-shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${
                                            isStruckThrough ? 'bg-slate-200 text-slate-600' : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                          }`}
                                          aria-label={isStruckThrough ? "Remove strikethrough" : "Strikethrough option"}
                                        >
                                          <Strikethrough className="w-5 h-5" />
                                        </div>
                                      )}
                                      {/* Feedback Icon */}
                                      {showResults && (
                                        <div className="flex-shrink-0">
                                          {isCorrect
                                            ? <Check className="w-5 h-5 text-green-500" />
                                            : isSelected
                                              ? <X className="w-5 h-5 text-red-500" />
                                              : null
                                          }
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>


                        {/* Submit button for last question - only show if not using fixed bottom bar */}
                        {!(showVideoModal && videoUrl) && !shouldShowTestUI && currentPage === questions.length - 1 && (
                          <div className={`pt-4 mt-4 border-t border-gray-200`}>
                            <div className="relative group inline-block w-full">
                              <button
                                onClick={isPreviewMode ? undefined : handleSubmitClick}
                                disabled={isPreviewMode}
                                className={`w-full px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-200 ${
                                  isPreviewMode
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-black hover:bg-gray-800 text-white'
                                }`}
                              >
                                Submit Exam
                              </button>
                              {isPreviewMode && (
                                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-black text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                  Not available in Preview Mode
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                  </div>
                );
              })()}
              </>
            ) : showResults && showFullResults && liveSessionId && liveSessionScoreSummaryOnly ? (
              /* Live session: Score Summary gate (Digital Whiteboard style) before full results */
              <div ref={liveSessionScoreCardRef} className="min-h-screen flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border-2 border-slate-300 p-10 text-center">
                  <div className="text-6xl font-black text-slate-900 mb-2">
                    {Math.round((questions.filter((q) => answers[q.id] === q.correctAnswer).length / questions.length) * 100)}%
                  </div>
                  <p className="text-slate-600 font-medium mb-8">
                    {(() => {
                      const pct = Math.round((questions.filter((q) => answers[q.id] === q.correctAnswer).length / questions.length) * 100);
                      return pct >= 70 ? 'Nice work!' : 'Keep pushing!';
                    })()}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        examType === 'gov'
                          ? '/ap-gov-practice-tests'
                          : examType === 'macro'
                            ? '/ap-macro-unit-1-cheat-sheet'
                            : '/ap-micro-unit-1-cheat-sheet'
                      )
                    }
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-bold transition-colors"
                  >
                    {examType === 'gov' ? 'AP Gov Practice Tests' : `AP ${examType === 'macro' ? 'Macro' : 'Micro'} Cheat Sheets`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiveSessionScoreSummaryOnly(false)}
                    className="mt-4 block w-full text-slate-400 underline hover:text-slate-600 transition-colors"
                  >
                    See full results
                  </button>
                </div>
              </div>
            ) : (() => {
              const resultsInner = (
                <>
            {/* Compact results summary (title lives outside this card on unit tests & full exam column) */}
            {showResults && showFullResults && (
              <div
                className={`rounded-2xl bg-white p-5 md:p-6 ${
                  isUnitTest ? 'border border-gray-200 shadow-sm' : 'border border-slate-200 shadow-sm'
                }`}
              >
                <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
                  <span className="text-sm font-semibold text-slate-600">
                    {correctAnswersCount} of {totalQuestionsCount} correct
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Score</p>
                    <p className="mt-1 text-2xl font-black text-blue-900">{percentScore}%</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Questions</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {correctAnswersCount}/{totalQuestionsCount}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">XP Earned</p>
                    <p className="mt-1 inline-flex items-center gap-2 text-2xl font-black text-emerald-900">
                      <Image
                        src="/images/flame100.png"
                        alt="XP Flame"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                      {earnedXp}
                    </p>
                  </div>
                </div>
                {isUnitTest ? <UnitTestSharePrepRow /> : null}
              </div>
            )}
            {/* Questions Review */}
                {questions.map((question) => {
                  const isCorrect = answers[question.id] === question.correctAnswer;
                  const selectedAnswer = answers[question.id];
                  
                  return (
                    <div 
                      key={question.id} 
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                    {/* Question Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-normal text-gray-500">Question {questions.indexOf(question) + 1}</span>
                        <span className={`px-3 py-1 rounded-sm text-sm font-normal ${
                          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <p
                          className={`flex-1 leading-relaxed text-gray-800 ${isUnitTest ? `font-normal ${FONT_SIZE_CLASSES[questionFontSize]}` : 'text-base md:text-lg font-normal font-serif'}`}
                        >
                          {isCustomAssignment ? (
                          <QuestionWithKeyTerms 
                            questionText={question.question} 
                            unit={question.unit} 
                            subject={apQuestionSubjectTag(examType)}
                          />
                          ) : isUnitTest ? (
                            <UnitTestQuestionBody
                              question={question}
                              examType={examType}
                              highlightMode={false}
                              highlights={questionTextHighlights[question.id] ?? []}
                              onHighlightsChange={(next) =>
                                setQuestionTextHighlights((p) => ({ ...p, [question.id]: next }))
                              }
                            />
                          ) : isApGovQuestion(question) ? (
                            <ApGovQuestionText text={question.question} />
                          ) : (
                            question.question
                          )}
                        </p>
                        {/* Video Explanation Icon */}
                        {question.videoExplanation && typeof question.videoExplanation === 'string' && question.videoExplanation.trim() !== '' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoUrl(question.videoExplanation!);
                              setShowVideoModal(true);
                            }}
                            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-colors"
                            aria-label="View video explanation"
                            title="Watch video explanation"
                          >
                            <Play className="w-4 h-4 ml-0.5" />
                          </button>
                        )}
                      </div>
                    
                      {/* Table Data */}
                      {question.tableData && (
                        <div className="my-8 flex justify-center">
                        <div className="flex items-center gap-4">
                          {question.tableData.playerNames && (
                            <div className="flex items-center justify-center h-full w-16">
                              <p className="transform -rotate-90 whitespace-nowrap text-center font-normal text-lg text-gray-900 leading-tight">
                                {question.tableData.playerNames.row.split(' ')[0]}
                                <br />
                                {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                              </p>
                            </div>
                          )}
                          <div className="flex-1">
                            {question.tableData.playerNames && (
                              <p className="text-center font-normal text-lg text-gray-900 mb-2">
                                {question.tableData.playerNames.column}
                              </p>
                            )}
                            <table className="min-w-full border-collapse border border-black">
                              <thead className="bg-white">
                                <tr>
                                  {question.tableData.headers.map(header => (
                                    <th key={header} className="border border-black px-4 py-3 text-center text-base font-normal text-gray-900">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                {question.tableData.rows.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => {
                                      return (
                                        <td 
                                          key={cellIndex} 
                                          className={`border border-black px-4 py-3 text-center text-base font-normal`}
                                        >
                                          {cell}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Add image display */}
                      {question.image && !isCustomAssignment && (
                        <div className="my-4">
                          <img 
                            src={question.image.src}
                            alt="Question"
                            className="max-h-[300px] object-contain cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
                            onClick={() => {
                              setSelectedImage(question.image as StaticImageData);
                              setShowImageModal(true);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Answer Options */}
                    <div className="p-4 space-y-3">
                    {question.optionTableHeaders ? (
                      <div className="space-y-3">
                        {/* Column Headers */}
                        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 px-3 pb-2 border-b-2 border-gray-300">
                          <div className="w-8"></div>
                          {question.optionTableHeaders.map((header, idx) => (
                            <div key={idx} className="text-center font-normal text-sm text-gray-700">
                              {header}
                            </div>
                          ))}
                          <div className="w-8"></div>
                        </div>
                        {question.options.map((option, idx) => {
                          const letter = String.fromCharCode(65 + idx);
                          const isSelected = selectedAnswer === letter;
                          const isCorrectAnswer = question.correctAnswer === letter;
                          const optionValues = option.split(' | ');
                          
                          return (
                            <div
                              key={idx}
                              className={`w-full text-left p-3 rounded-lg text-sm font-normal border flex items-center gap-3 cursor-default ${
                                isCorrectAnswer ? 'bg-green-50 text-gray-900 shadow-sm border-green-200' :
                                (isSelected && !isCorrectAnswer) ? 'bg-red-50 text-gray-900 shadow-sm border-red-200' :
                                'bg-transparent text-gray-900 border-gray-200'
                              }`}
                            >
                              {/* Letter bubble */}
                              <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-normal flex-shrink-0 ${
                                isCorrectAnswer ? 'bg-green-100 border-green-300 text-green-700' :
                                (isSelected && !isCorrectAnswer) ? 'bg-red-100 border-red-300 text-red-700' :
                                'bg-white border-gray-300 text-gray-500'
                              }`}>
                                {letter}
                              </span>
                              {/* Two-column content */}
                              <div className="flex-1 grid grid-cols-2 gap-4">
                                {optionValues.map((value, valIdx) => (
                                  <span key={valIdx} className="text-sm text-center text-gray-800">
                                    {value.trim()}
                                  </span>
                                ))}
                              </div>
                              {/* Feedback Icon */}
                              {(isCorrectAnswer || (isSelected && !isCorrectAnswer)) && (
                                <div className="flex-shrink-0">
                                  {isCorrectAnswer ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <X className="w-5 h-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      question.options.map((option, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isSelected = selectedAnswer === letter;
                        const isCorrectAnswer = question.correctAnswer === letter;
                        
                        return (
                          <div
                            key={idx}
                            className={`w-full text-left p-3 rounded-lg text-sm font-normal border flex items-center gap-3 cursor-default ${
                              isCorrectAnswer ? 'bg-green-50 text-gray-900 shadow-sm border-green-200' :
                              (isSelected && !isCorrectAnswer) ? 'bg-red-50 text-gray-900 shadow-sm border-red-200' :
                              'bg-transparent text-gray-900 border-gray-200'
                            }`}
                          >
                            {/* Letter bubble */}
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-normal flex-shrink-0 ${
                              isCorrectAnswer ? 'bg-green-100 border-green-300 text-green-700' :
                              (isSelected && !isCorrectAnswer) ? 'bg-red-100 border-red-300 text-red-700' :
                              'bg-white border-gray-300 text-gray-500'
                            }`}>
                              {letter}
                            </span>
                            {/* Option Image or Text */}
                            {question.optionImages && question.optionImages[idx] ? (
                              <div className="flex-1 flex items-center justify-center">
                                <img 
                                  src={question.optionImages[idx].src}
                                  alt={question.optionImages[idx].alt || `Option ${letter}`}
                                  className="max-w-[200px] max-h-[150px] object-contain"
                                />
                              </div>
                            ) : (
                              <span className="flex-1 text-sm text-gray-800">{option}</span>
                            )}
                            {/* Feedback Icon */}
                            {(isCorrectAnswer || (isSelected && !isCorrectAnswer)) && (
                              <div className="flex-shrink-0">
                                {isCorrectAnswer ? (
                                  <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                  <X className="w-5 h-5 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                    </div>

                    {/* Explanation - Comp Check Style */}
                    {question.explanation && selectedAnswer && (
                      <div className="p-4 border-t border-gray-100">
                        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-sm text-gray-800 leading-relaxed">
                            <span className="text-gray-600">Explanation: </span>
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
                </>
              );
              return isUnitTest ? (
                <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 space-y-10 sm:space-y-12">
                  {showResults && showFullResults ? (
                    <div className="px-1 py-4 sm:px-2 sm:py-8 md:py-10">
                      <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-black sm:text-5xl md:text-6xl">
                        Assessment Results
                      </h1>
                    </div>
                  ) : null}
                  <div className="rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="p-4 sm:p-6 space-y-8 w-full">{resultsInner}</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 max-w-4xl mx-auto w-full">
                  {showResults && showFullResults ? (
                    <h2 className="text-2xl font-black text-black tracking-tight">Assessment Results</h2>
                  ) : null}
                  {resultsInner}
                </div>
              );
            })()}
            </div>
          </motion.div>

          {/* Tools Panel Slide-Out (Calculator and Excalidraw) - Right Side on Desktop, Below on Mobile */}
          <>
            {/* Desktop: Slide-out panel from right */}
            {/* For unit tests, preview exams, full exams, and custom assignments, always show panel without animation */}
            {shouldShowToolsByDefault ? (
                showToolsPanel && (
                  <div className="hidden lg:block flex-shrink-0 w-[35%] bg-white shadow-2xl z-40 border-l border-gray-200 overflow-hidden fixed right-0" style={{ top: isUnitTest ? '56px' : '144px', height: isUnitTest ? 'calc(100vh - 56px)' : 'calc(100vh - 144px)' }}>
                    <div className="w-full h-full flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
                      <span className="text-sm font-semibold text-gray-900">
                        {activeTool === 'calculator' ? 'Calculator' : 'Drawing Pad'}
                      </span>
                      {shouldShowToolsByDefault && (
                        <button
                          onClick={() => setShowToolsPanel(false)}
                          className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded p-1.5 transition-colors"
                          aria-label="Close tools panel"
                          title="Close"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* For all exam types: Show only the active tool */}
                    <>
                      {/* Excalidraw Section */}
                      {activeTool === 'whiteboard' && (
                        <div className="flex-1 flex flex-col overflow-hidden bg-white" style={{ minHeight: '400px', flex: '1 1 auto' }}>
                          <div className="w-full relative" style={{ height: '100%', minHeight: '400px', width: '100%', position: 'relative' }}>
                            <Excalidraw key={excalidrawKey}
                              zenModeEnabled={true}
                              viewModeEnabled={false}
                              gridModeEnabled={false}
                              UIOptions={{
                                library: false,
                                canvasActions: {
                                  toggleTheme: false,
                                  changeViewBackgroundColor: false,
                                  loadScene: false,
                                  saveToActiveFile: false,
                                  export: false,
                                },
                              }}
                              initialData={{
                                elements: excalidrawElements,
                                appState: {
                                  ...excalidrawAppState,
                                  zenModeEnabled: true,
                                  theme: "light",
                                  currentItemStrokeWidth: excalidrawAppState?.currentItemStrokeWidth ?? 1,
                                },
                              }}
                              onChange={(elements: any, appState: any) => {
                                setExcalidrawElements(elements);
                                setExcalidrawAppState(appState);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Calculator Section */}
                      {activeTool === 'calculator' && (
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                          <div className="p-4">
                            {/* Calculator Display */}
                            <div className="bg-white border border-gray-200 rounded-lg mb-3 p-4 shadow-sm">
                              <div className="text-right text-3xl font-semibold text-gray-900 overflow-hidden min-h-[48px] flex items-center justify-end">
                                {calculatorDisplay}
                              </div>
                            </div>

                            {/* Calculator Buttons */}
                            <div className="grid grid-cols-4 gap-2.5">
                              {/* Row 1 */}
                              <button
                                onClick={handleCalculatorClear}
                                className="col-span-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors text-sm"
                              >
                                Clear
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('÷')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ÷
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('×')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ×
                              </button>

                              {/* Row 2 */}
                              <button
                                onClick={() => handleCalculatorNumber('7')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                7
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('8')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                8
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('9')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                9
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('-')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                −
                              </button>

                              {/* Row 3 */}
                              <button
                                onClick={() => handleCalculatorNumber('4')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                4
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('5')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                5
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('6')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                6
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('+')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                +
                              </button>

                              {/* Row 4 */}
                              <button
                                onClick={() => handleCalculatorNumber('1')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                1
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('2')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                2
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('3')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                3
                              </button>
                              <button
                                onClick={handleCalculatorEquals}
                                className={`row-span-2 ${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-xl`}
                              >
                                =
                              </button>

                              {/* Row 5 */}
                              <button
                                onClick={() => handleCalculatorNumber('0')}
                                className="col-span-2 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                0
                              </button>
                              <button
                                onClick={handleCalculatorDecimal}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                  </div>
                )
              ) : (
                <AnimatePresence>
                  {showToolsPanel && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hidden lg:block flex-shrink-0 w-[35%] bg-white shadow-2xl z-40 border-l border-gray-200 overflow-hidden fixed right-0" style={{ top: isUnitTest ? '56px' : '144px', height: isUnitTest ? 'calc(100vh - 56px)' : 'calc(100vh - 144px)' }}
                    >
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="w-full h-full flex flex-col overflow-hidden"
                    >
                      {/* Header */}
                      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
                        {isUnitTest ? (
                          <div className="flex items-baseline gap-8 flex-1 min-w-0 font-mono">
                            <button
                              type="button"
                              onClick={() => setScratchPadTab('draw')}
                              className={`text-left text-lg font-semibold tracking-tight bg-transparent border-0 p-0 cursor-pointer shrink-0 transition-colors ${
                                scratchPadTab === 'draw'
                                  ? 'text-gray-900 underline decoration-2 underline-offset-4'
                                  : 'text-gray-400 hover:text-gray-700 hover:underline decoration-1 underline-offset-4'
                              }`}
                            >
                              drawing pad
                            </button>
                            <button
                              type="button"
                              onClick={() => setScratchPadTab('text')}
                              className={`text-left text-lg font-semibold tracking-tight bg-transparent border-0 p-0 cursor-pointer shrink-0 transition-colors ${
                                scratchPadTab === 'text'
                                  ? 'text-gray-900 underline decoration-2 underline-offset-4'
                                  : 'text-gray-400 hover:text-gray-700 hover:underline decoration-1 underline-offset-4'
                              }`}
                            >
                              type pad
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">Drawing Pad & Scratch Paper</span>
                        )}
                        {!shouldShowToolsByDefault && (
                          <button
                            onClick={() => setShowToolsPanel(false)}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded p-1.5 transition-colors shrink-0"
                            aria-label="Close tools panel"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* For all exam types: Show only the active tool */}
                      <>
                        {/* Calculator Section */}
                        {activeTool === 'calculator' && (
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                          <div className="p-4">
                            {/* Calculator Display */}
                            <div className="bg-white border border-gray-200 rounded-lg mb-3 p-4 shadow-sm">
                              <div className="text-right text-3xl font-semibold text-gray-900 overflow-hidden min-h-[48px] flex items-center justify-end">
                                {calculatorDisplay}
                              </div>
                            </div>

                            {/* Calculator Buttons */}
                            <div className="grid grid-cols-4 gap-2.5">
                              {/* Row 1 */}
                              <button
                                onClick={handleCalculatorClear}
                                className="col-span-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors text-sm"
                              >
                                Clear
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('÷')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ÷
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('×')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ×
                              </button>

                              {/* Row 2 */}
                              <button
                                onClick={() => handleCalculatorNumber('7')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                7
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('8')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                8
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('9')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                9
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('-')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                −
                              </button>

                              {/* Row 3 */}
                              <button
                                onClick={() => handleCalculatorNumber('4')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                4
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('5')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                5
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('6')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                6
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('+')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                +
                              </button>

                              {/* Row 4 */}
                              <button
                                onClick={() => handleCalculatorNumber('1')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                1
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('2')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                2
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('3')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                3
                              </button>
                              <button
                                onClick={handleCalculatorEquals}
                                className={`row-span-2 ${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-xl`}
                              >
                                =
                              </button>

                              {/* Row 5 */}
                              <button
                                onClick={() => handleCalculatorNumber('0')}
                                className="col-span-2 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                0
                              </button>
                              <button
                                onClick={handleCalculatorDecimal}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                        )}

                        {/* Excalidraw / Type Pad Section */}
                        {activeTool === 'whiteboard' && (
                          isUnitTest && scratchPadTab === 'text' ? (
                            <textarea
                              value={scratchNotes}
                              onChange={e => setScratchNotes(e.target.value)}
                              placeholder="Type your scratch notes here..."
                              className="flex-1 w-full p-4 text-base text-gray-800 resize-none outline-none font-mono leading-relaxed bg-white"
                            />
                          ) : (
                            <div className="flex-1 flex flex-col overflow-hidden bg-white">
                              <div className="h-full w-full relative">
                                <Excalidraw key={excalidrawKey}
                                  zenModeEnabled={true}
                                  viewModeEnabled={false}
                                  gridModeEnabled={false}
                                  UIOptions={{
                                    library: false,
                                    canvasActions: {
                                      toggleTheme: false,
                                      changeViewBackgroundColor: false,
                                      loadScene: false,
                                      saveToActiveFile: false,
                                      export: false,
                                    },
                                  }}
                                  initialData={{
                                    elements: excalidrawElements,
                                    appState: {
                                      ...excalidrawAppState,
                                      zenModeEnabled: true,
                                      theme: "light",
                                      currentItemStrokeWidth: excalidrawAppState?.currentItemStrokeWidth ?? 1,
                                    },
                                  }}
                                  onChange={(elements: any, appState: any) => {
                                    setExcalidrawElements(elements);
                                    setExcalidrawAppState(appState);
                                  }}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </>
                    </motion.div>
                  </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Mobile: Panel appears below question content */}
              {showToolsPanel && (
                <div className="lg:hidden w-full bg-white shadow-lg border-t border-gray-200">
                  {/* Header */}
                  <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0">
                    {isUnitTest && activeTool === 'whiteboard' ? (
                      <div className="flex items-baseline gap-8 flex-1 min-w-0 font-mono">
                        <button
                          type="button"
                          onClick={() => setScratchPadTab('draw')}
                          className={`text-left text-lg font-semibold tracking-tight bg-transparent border-0 p-0 cursor-pointer shrink-0 transition-colors ${
                            scratchPadTab === 'draw'
                              ? 'text-gray-900 underline decoration-2 underline-offset-4'
                              : 'text-gray-400 hover:text-gray-700 hover:underline decoration-1 underline-offset-4'
                          }`}
                        >
                          drawing pad
                        </button>
                        <button
                          type="button"
                          onClick={() => setScratchPadTab('text')}
                          className={`text-left text-lg font-semibold tracking-tight bg-transparent border-0 p-0 cursor-pointer shrink-0 transition-colors ${
                            scratchPadTab === 'text'
                              ? 'text-gray-900 underline decoration-2 underline-offset-4'
                              : 'text-gray-400 hover:text-gray-700 hover:underline decoration-1 underline-offset-4'
                          }`}
                        >
                          type pad
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900">
                        {activeTool === 'calculator' ? 'Calculator' : 'Drawing Pad'}
                      </span>
                    )}
                    {!shouldShowToolsByDefault && (
                      <button
                        onClick={() => setShowToolsPanel(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded p-1.5 transition-colors shrink-0"
                        aria-label="Close tools panel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* For all exam types: Show only the active tool */}
                  {shouldShowToolsByDefault ? (
                    <>
                      {/* Excalidraw / Type Pad Section */}
                      {activeTool === 'whiteboard' && (
                        isUnitTest && scratchPadTab === 'text' ? (
                          <textarea
                            value={scratchNotes}
                            onChange={e => setScratchNotes(e.target.value)}
                            placeholder="Type your scratch notes here..."
                            style={{ height: '400px' }}
                            className="w-full p-4 text-base text-gray-800 resize-none outline-none font-mono leading-relaxed bg-white"
                          />
                        ) : (
                          <div className="flex flex-col bg-white" style={{ height: '400px' }}>
                            <div className="h-full w-full relative">
                              <Excalidraw key={excalidrawKey}
                                zenModeEnabled={true}
                                viewModeEnabled={false}
                                gridModeEnabled={false}
                                UIOptions={{
                                  library: false,
                                  canvasActions: {
                                    toggleTheme: false,
                                    changeViewBackgroundColor: false,
                                    loadScene: false,
                                    saveToActiveFile: false,
                                    export: false,
                                  },
                                }}
                                initialData={{
                                  elements: excalidrawElements,
                                  appState: {
                                    ...excalidrawAppState,
                                    zenModeEnabled: true,
                                    theme: "light",
                                    currentItemStrokeWidth: excalidrawAppState?.currentItemStrokeWidth ?? 1,
                                  },
                                }}
                                onChange={(elements: any, appState: any) => {
                                  setExcalidrawElements(elements);
                                  setExcalidrawAppState(appState);
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}

                      {/* Calculator Section */}
                      {activeTool === 'calculator' && (
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                          <div className="p-4">
                            {/* Calculator Display */}
                            <div className="bg-white border border-gray-200 rounded-lg mb-3 p-4 shadow-sm">
                              <div className="text-right text-3xl font-semibold text-gray-900 overflow-hidden min-h-[48px] flex items-center justify-end">
                                {calculatorDisplay}
                              </div>
                            </div>

                            {/* Calculator Buttons */}
                            <div className="grid grid-cols-4 gap-2.5">
                              {/* Row 1 */}
                              <button
                                onClick={handleCalculatorClear}
                                className="col-span-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors text-sm"
                              >
                                Clear
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('÷')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ÷
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('×')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ×
                              </button>

                              {/* Row 2 */}
                              <button
                                onClick={() => handleCalculatorNumber('7')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                7
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('8')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                8
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('9')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                9
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('-')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                −
                              </button>

                              {/* Row 3 */}
                              <button
                                onClick={() => handleCalculatorNumber('4')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                4
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('5')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                5
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('6')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                6
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('+')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                +
                              </button>

                              {/* Row 4 */}
                              <button
                                onClick={() => handleCalculatorNumber('1')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                1
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('2')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                2
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('3')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                3
                              </button>
                              <button
                                onClick={handleCalculatorEquals}
                                className={`row-span-2 ${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-xl`}
                              >
                                =
                              </button>

                              {/* Row 5 */}
                              <button
                                onClick={() => handleCalculatorNumber('0')}
                                className="col-span-2 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                0
                              </button>
                              <button
                                onClick={handleCalculatorDecimal}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      </>
                    ) : (
                      <>
                        {/* For all exam types: Show only the active tool */}
                        {/* Calculator Section */}
                        {activeTool === 'calculator' && (
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                          <div className="p-4">
                            {/* Calculator Display */}
                            <div className="bg-white border border-gray-200 rounded-lg mb-3 p-4 shadow-sm">
                              <div className="text-right text-3xl font-semibold text-gray-900 overflow-hidden min-h-[48px] flex items-center justify-end">
                                {calculatorDisplay}
                              </div>
                            </div>

                            {/* Calculator Buttons - Same structure as unit test version */}
                            <div className="grid grid-cols-4 gap-2.5">
                              {/* Row 1 */}
                              <button
                                onClick={handleCalculatorClear}
                                className="col-span-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors text-sm"
                              >
                                Clear
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('÷')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ÷
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('×')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                ×
                              </button>

                              {/* Row 2 */}
                              <button
                                onClick={() => handleCalculatorNumber('7')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                7
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('8')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                8
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('9')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                9
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('-')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                −
                              </button>

                              {/* Row 3 */}
                              <button
                                onClick={() => handleCalculatorNumber('4')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                4
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('5')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                5
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('6')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                6
                              </button>
                              <button
                                onClick={() => handleCalculatorOperation('+')}
                                className={`${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-lg`}
                              >
                                +
                              </button>

                              {/* Row 4 */}
                              <button
                                onClick={() => handleCalculatorNumber('1')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                1
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('2')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                2
                              </button>
                              <button
                                onClick={() => handleCalculatorNumber('3')}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                3
                              </button>
                              <button
                                onClick={handleCalculatorEquals}
                                className={`row-span-2 ${accentFull} text-white font-semibold py-3 rounded-lg transition-colors text-xl`}
                              >
                                =
                              </button>

                              {/* Row 5 */}
                              <button
                                onClick={() => handleCalculatorNumber('0')}
                                className="col-span-2 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                0
                              </button>
                              <button
                                onClick={handleCalculatorDecimal}
                                className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg border border-gray-200 shadow-sm transition-colors text-base"
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                        )}

                        {/* Excalidraw Section */}
                        {activeTool === 'whiteboard' && (
                        <div className="flex flex-col bg-white" style={{ height: '400px' }}>
                          <div className="h-full w-full relative">
                            <Excalidraw key={excalidrawKey}
                              zenModeEnabled={true}
                              viewModeEnabled={false}
                              gridModeEnabled={false}
                              UIOptions={{
                                library: false,
                                canvasActions: {
                                  toggleTheme: false,
                                  changeViewBackgroundColor: false,
                                  loadScene: false,
                                  saveToActiveFile: false,
                                  export: false,
                                },
                              }}
                              initialData={{
                                elements: excalidrawElements,
                                appState: {
                                  ...excalidrawAppState,
                                  zenModeEnabled: true,
                                  theme: "light",
                                  currentItemStrokeWidth: excalidrawAppState?.currentItemStrokeWidth ?? 1,
                                },
                              }}
                              onChange={(elements: any, appState: any) => {
                                setExcalidrawElements(elements);
                                setExcalidrawAppState(appState);
                              }}
                            />
                          </div>
                        </div>
                        )}
                      </>
                    )}
                </div>
              )}
          </>
          </div>
        </div>
      )}

      {/* Fixed Bottom Bar - Navigation and Question Selector for custom assignments and tests */}
      {!showResults && shouldShowTestUI && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white z-50 ${isUnitTest ? 'border-t border-gray-200' : 'border-t-4 border-black shadow-lg'}`}>
          {/* Drawer — slides up out of the bottom bar */}
          <AnimatePresence>
            {showQuestionNavigator && (
              <motion.div
                key="question-navigator"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className={`overflow-hidden w-full ${isUnitTest ? 'border-b border-gray-200' : 'border-b-4 border-black'}`}
              >
                <div className="max-w-7xl mx-auto px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {questions.map((q, index) => {
                      const isAnswered = answers[q.id] !== undefined;
                      const isBookmarked = bookmarkedQuestions.has(q.id);
                      const isCurrent = index === currentPage;
                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            if (isTimerPaused && !isCustomAssignment) return;
                            if (canNavigateToQuestion(index)) {
                              setCurrentPage(index);
                              setShowQuestionNavigator(false);
                            } else {
                              setIsTimerPaused(true);
                              saveProgressBeforePurchase();
                              setShowSeasonPassModal(true);
                              setShowQuestionNavigator(false);
                            }
                          }}
                          disabled={isTimerPaused && !isCustomAssignment}
                          className={`w-10 h-10 rounded-lg font-normal text-sm transition-all ${
                            isTimerPaused && !isCustomAssignment
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'
                              : isCurrent
                              ? `${accentSolid} text-white ring-2 ${isUnitTest ? 'ring-offset-1 ring-gray-400' : 'ring-black'}`
                              : isBookmarked
                              ? 'bg-yellow-200 text-yellow-900 border-2 border-yellow-400'
                              : isAnswered
                              ? 'bg-blue-200 text-blue-900 border border-blue-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                          }`}
                          title={`Question ${index + 1}${isBookmarked ? ' (Bookmarked)' : ''}${isTimerPaused && !isCustomAssignment ? ' (Test Paused)' : ''}`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Sec label (unit test only) */}
            {isUnitTest && (
              <span className="hidden sm:block text-xs text-gray-400 font-normal shrink-0">
                Sec I-A &bull; {questions.length} Questions
              </span>
            )}
            {/* Question Navigator Button */}
            <div className="relative flex-1 max-w-md" ref={questionNavigatorRef}>
              <button
                onClick={() => setShowQuestionNavigator(!showQuestionNavigator)}
                disabled={isTimerPaused && !isCustomAssignment}
                className={`w-full px-4 py-2.5 rounded-lg font-normal flex items-center justify-between transition-colors ${
                  isTimerPaused && !isCustomAssignment
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <List className="w-5 h-5" />
                  <span>Question {currentPage + 1} of {questions.length}</span>
                </div>
                {showQuestionNavigator ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0 || (isTimerPaused && !isCustomAssignment)}
                className={`px-6 py-2.5 rounded font-normal transition-colors flex items-center gap-2 ${
                  currentPage === 0 || (isTimerPaused && !isCustomAssignment)
                    ? 'border border-gray-200 text-gray-300 cursor-not-allowed'
                    : isUnitTest
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : `${accentHover} text-white`
                }`}
              >
                Previous
              </button>

              {/* Next / Submit Button */}
              <div className="relative group inline-block">
                <button
                  onClick={() => {
                    if (isPreviewMode && currentPage === questions.length - 1) return;
                    if (isTimerPaused && !isCustomAssignment) {
                      return;
                    }
                    if (currentPage === questions.length - 1) {
                      handleSubmitClick();
                    } else {
                      const nextPage = currentPage + 1;
                      if (canNavigateToQuestion(nextPage)) {
                        setCurrentPage(nextPage);
                      } else {
                        // Pause timer and save progress before showing modal
                        setIsTimerPaused(true);
                        saveProgressBeforePurchase();
                        setShowSeasonPassModal(true);
                      }
                    }
                  }}
                  disabled={(isTimerPaused && !isCustomAssignment) || (isPreviewMode && currentPage === questions.length - 1)}
                  className={`px-6 py-2.5 rounded font-normal transition-colors flex items-center gap-2 ${
                    (isTimerPaused && !isCustomAssignment) || (isPreviewMode && currentPage === questions.length - 1)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : currentPage === questions.length - 1
                      ? 'bg-black hover:bg-gray-800 text-white'
                      : isUnitTest
                      ? 'bg-gray-900 hover:bg-gray-700 text-white'
                      : `${accentHover} text-white`
                  }`}
                >
                  {currentPage === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
                {isPreviewMode && currentPage === questions.length - 1 && (
                  <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-black text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Not available in Preview Mode
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool Buttons */}
      {!showResults && !shouldShowTestUI && (
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        {/* Calculator Toggle Button */}
        {!showToolsPanel && (
          <button
            onClick={() => handleToolToggle('calculator')}
            className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
            aria-label="Open calculator"
          >
            <Calculator className="w-6 h-6 text-black" />
          </button>
        )}

        {/* Whiteboard Toggle Button */}
        {!showToolsPanel && (
          <button
            onClick={() => handleToolToggle('whiteboard')}
            className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-gray-50 transition-all active:scale-95"
            aria-label="Open drawing pad"
          >
            <Pen className="w-6 h-6 text-black" />
          </button>
        )}
      </div>
      )}


      {/* Bookmark Confirmation Modal */}
      {showBookmarkConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Bookmark className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Bookmarked Questions
              </h3>
            </div>
            <p className="text-gray-700 mb-6">
              You have <span className="font-semibold text-gray-900">{bookmarkedQuestions.size}</span> question{bookmarkedQuestions.size !== 1 ? 's' : ''} bookmarked for review.
            </p>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit the exam anyway?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBookmarkConfirmModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Exit Confirmation Modal for Custom Assignments */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border-4 border-black">
            <div className="flex items-center gap-3 mb-4">
              <X className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-black text-gray-900">
                Exit assignment?
              </h3>
            </div>
            <p className="text-gray-700 mb-6 font-semibold">
              Progress will not be saved.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  window.location.href = '/';
                }}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Progress Modal for Full MCQ Exams */}
      {showSaveProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 border-4 border-black">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-black text-gray-900">
                Don't lose your hard work!
              </h3>
            </div>
            <p className="text-gray-700 mb-8 font-semibold">
              You have {Object.keys(answers).length} question{Object.keys(answers).length !== 1 ? 's' : ''} answered. Save your progress before leaving?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={async () => {
                  setIsSavingProgress(true);
                  try {
                    console.log('[FullExam] Starting save progress...');
                    const saved = await saveProgress();
                    console.log('[FullExam] Save progress result:', saved);
                    
                    if (saved) {
                      // Set ref to allow navigation and disable beforeunload
                      // Use ref for synchronous access in beforeunload handler
                      allowNavigationRef.current = true;
                      setShowSaveProgressModal(false);
                      setIsTimerPaused(false);
                      
                      console.log('[FullExam] Progress saved, navigating...');
                      
                      // Small delay to ensure save completes
                      await new Promise(resolve => setTimeout(resolve, 200));
                      
                      // Now navigate - beforeunload won't show dialog because ref is true
                      // Use window.location.href for reliable navigation
                      const targetUrl = pendingNavigation || '/';
                      console.log('[FullExam] Navigating to:', targetUrl);
                      setPendingNavigation(null);
                      
                      // Use setTimeout to ensure state updates complete before navigation
                      setTimeout(() => {
                        window.location.href = targetUrl;
                      }, 100);
                    } else {
                      console.error('[FullExam] Save progress returned false');
                      alert('Failed to save progress. Please try again.');
                      setIsSavingProgress(false);
                    }
                  } catch (error) {
                    console.error('[FullExam] Error saving progress:', error);
                    alert('Failed to save progress. Please try again.');
                    setIsSavingProgress(false);
                  }
                }}
                disabled={isSavingProgress}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingProgress ? 'Saving...' : 'Save Progress'}
              </button>
              <button
                onClick={() => {
                  // Allow navigation without save
                  allowNavigationRef.current = true;
                  setShowSaveProgressModal(false);
                  setIsTimerPaused(false);
                  const targetUrl = pendingNavigation || '/';
                  setPendingNavigation(null);
                  
                  // Use setTimeout to ensure state updates complete before navigation
                  setTimeout(() => {
                    window.location.href = targetUrl;
                  }, 100);
                }}
                disabled={isSavingProgress}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Leave Without Saving
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 