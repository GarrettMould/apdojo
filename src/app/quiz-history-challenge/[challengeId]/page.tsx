'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2, AlertCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { UnitMCQs } from '@/components/unitMCQS';
import { Question as QuestionType } from '@/data/questionBanks/types';
import { macroUnits as allMacroUnitsData, microUnits as allMicroUnitsData } from '@/data/cheatSheets';

interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number;
  unit: number;
  lessonIDS: string[];
  image?: string;
  explanation?: string;
  tableData?: any;
}

interface QuizChallenge {
  generatedByUserId: string;
  quizHistoryId?: string;
  createdAt: any;
  subject: 'macro' | 'micro';
  status: string;
  numQuestions: number;
  quizQuestions: QuizQuestion[];
  originatorScore: number | null;
  originatorTime: number | null;
  opponentUserId: string | null;
  opponentScore: number | null;
  opponentTime: number | null;
  winnerUserId: string | null;
  xpAwarded: boolean;
  mode: 'challenge' | 'cooperate';
}

// Convert challenge questions to QuestionType format
function convertToQuestionType(
  challengeQuestion: QuizQuestion,
  index: number,
  subject: 'macro' | 'micro'
): QuestionType {
  // Convert correctAnswer index to letter (A, B, C, D, etc.)
  const correctAnswerLetter = String.fromCharCode(65 + challengeQuestion.correctAnswer);
  
  // Convert image string to object format if present
  const image = challengeQuestion.image
    ? { src: challengeQuestion.image, alt: 'Question image' }
    : null;

  return {
    id: typeof challengeQuestion.id === 'number' ? challengeQuestion.id : index + 10000, // Use index + offset if id is string
    unit: challengeQuestion.unit,
    subject: subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics',
    unitName: `Unit ${challengeQuestion.unit}`,
    question: challengeQuestion.question,
    image: image,
    options: challengeQuestion.options,
    correctAnswer: correctAnswerLetter,
    explanation: challengeQuestion.explanation,
    lessonIDS: challengeQuestion.lessonIDS || [],
    tableData: challengeQuestion.tableData,
  };
}

function QuizHistoryChallengeContent() {
  const params = useParams();
  const router = useRouter();
  const { 
    user, 
    userData,
    correctStreak,
    setCorrectStreak,
    awardXp,
  } = useAuthContext();
  const challengeId = params.challengeId as string;

  const [challengeData, setChallengeData] = useState<QuizChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, any>>({});
  const [questionsForPractice, setQuestionsForPractice] = useState<QuestionType[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Reset streak to 0 for challenge quizzes (introducing users to the dojo way)
  useEffect(() => {
    if (user && setCorrectStreak) {
      setCorrectStreak(0);
    }
  }, [user, setCorrectStreak]);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) {
        setError('Invalid challenge ID');
        setLoading(false);
        return;
      }

      try {
        const challengeRef = doc(db, 'quizChallenges', challengeId);
        const challengeSnap = await getDoc(challengeRef);

        if (!challengeSnap.exists()) {
          setError('Challenge not found');
          setLoading(false);
          return;
        }

        const data = challengeSnap.data() as QuizChallenge;
        setChallengeData(data);

        // Convert challenge questions to QuestionType format
        const convertedQuestions = data.quizQuestions.map((q, idx) =>
          convertToQuestionType(q, idx, data.subject)
        );
        setQuestionsForPractice(convertedQuestions);
      } catch (err) {
        console.error('Error fetching challenge:', err);
        setError('Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // Check if user needs to log in
  useEffect(() => {
    if (!loading && !user && challengeData) {
      setShowLoginModal(true);
    }
  }, [loading, user, challengeData]);

  // Start timer when quiz begins
  useEffect(() => {
    if (currentQuestionIndex === 0 && challengeData && user && startTime === null && questionsForPractice.length > 0) {
      setStartTime(Date.now());
    }
  }, [currentQuestionIndex, challengeData, user, startTime, questionsForPractice.length]);

  // Update timer
  useEffect(() => {
    if (startTime && !isQuizFinished) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, isQuizFinished]);

  const handleAnswer = async (questionId: number, answerLetter: string, isCorrect: boolean, lessonIDS: string[]) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: { selectedLetter: answerLetter, isCorrect }
    }));

    // Update streak (but don't award XP for challenge quizzes - just track for UI)
    if (setCorrectStreak) {
      if (isCorrect) {
        setCorrectStreak(prev => prev + 1);
      } else {
        setCorrectStreak(0);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsForPractice.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
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

  const handleSubmitQuiz = async () => {
    if (!challengeData || !user) return;

    let correctCount = 0;
    questionsForPractice.forEach((question, index) => {
      const answered = answeredQuestions[question.id];
      if (answered && answered.isCorrect) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / challengeData.numQuestions) * 100);
    const finalTime = timeElapsed;

    setScore(finalScore);
    setIsQuizFinished(true);

    // Update challenge in Firestore
    try {
      const challengeRef = doc(db, 'quizChallenges', challengeId);
      const challengeSnap = await getDoc(challengeRef);
      const currentData = challengeSnap.data() as QuizChallenge;

      if (user.uid === currentData.generatedByUserId) {
        // User is the originator
        await updateDoc(challengeRef, {
          originatorScore: finalScore,
          originatorTime: finalTime,
          status: currentData.opponentScore !== null ? 'completed' : 'originator_submitted',
        });
      } else {
        // User is the opponent
        await updateDoc(challengeRef, {
          opponentUserId: user.uid,
          opponentScore: finalScore,
          opponentTime: finalTime,
          status: currentData.originatorScore !== null ? 'completed' : 'opponent_submitted',
        });

        // Determine winner if both scores are in
        if (currentData.originatorScore !== null) {
          const winnerId =
            finalScore > currentData.originatorScore
              ? user.uid
              : finalScore < currentData.originatorScore
              ? currentData.generatedByUserId
              : finalTime < (currentData.originatorTime || Infinity)
              ? user.uid
              : currentData.generatedByUserId;

          await updateDoc(challengeRef, {
            winnerUserId: winnerId,
            status: 'completed',
          });
        }
      }
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };

  const handleUnitChange = () => {
    // Not applicable for challenge quizzes
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error || !challengeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-4 border-red-600 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-black mb-4">Error</h2>
          <p className="text-gray-700 font-semibold mb-6">{error || 'Challenge not found'}</p>
          <Button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // Check if user is logged in
  if (!user) {
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <CardTitle className="text-center">Login Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                You must be logged in to take this challenge. Please log in or sign up to continue.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => setShowSignupModal(true)}
                  variant="outline"
                >
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (isQuizFinished) {
    const correctCount = questionsForPractice.filter(
      (q) => answeredQuestions[q.id]?.isCorrect
    ).length;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
              <p className="text-gray-600">
                You got {correctCount} out of {challengeData.numQuestions} questions correct
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
              </p>
            </div>
            <div className="pt-4">
              <Button
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const unitsData = challengeData.subject === 'micro' ? allMicroUnitsData : allMacroUnitsData;
  const subject = challengeData.subject;

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
        <div className="max-w-7xl mx-auto px-4 py-8">
          {questionsForPractice.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className={`h-12 w-12 animate-spin ${subject === 'macro' ? 'text-blue-500' : 'text-green-500'}`} />
            </div>
          ) : (
            <UnitMCQs
              currentUnit={0} // Not applicable for challenge quizzes
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
              dojoProgress={0} // Start at 0 for challenge quizzes
              correctStreak={correctStreak || 0} // Start at 0 for challenge quizzes
              isWeakestUnitsMode={false}
              isTopicMode={false}
              totalQuestions={questionsForPractice.length}
              unitName="Challenge Quiz"
              subject={subject}
              practiceUnitIds={[]}
              isParentModalOpen={showLoginModal || showSignupModal}
              hasTestModeAccess={false}
              onEnterTestMode={() => {}}
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

export default function QuizHistoryChallengePage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <QuizHistoryChallengeContent />
    </Suspense>
  );
}
