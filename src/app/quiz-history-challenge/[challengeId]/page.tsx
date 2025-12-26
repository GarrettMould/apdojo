'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2, AlertCircle, Check, X, Copy, Info, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginModal, SignupModal } from '@/components/AuthModals';

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

export default function QuizHistoryChallengePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const challengeId = params.challengeId as string;

  const [challengeData, setChallengeData] = useState<QuizChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

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
    if (currentQuestionIndex === 0 && challengeData && user && startTime === null) {
      setStartTime(Date.now());
    }
  }, [currentQuestionIndex, challengeData, user, startTime]);

  // Update timer
  useEffect(() => {
    if (startTime && !isQuizFinished) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, isQuizFinished]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (challengeData?.numQuestions || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    if (!challengeData || !user) return;

    let correctCount = 0;
    challengeData.quizQuestions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      if (selectedAnswer === question.correctAnswer) {
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
          onAuthSuccess={() => setShowLoginModal(false)}
        />
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          switchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          onAuthSuccess={() => setShowSignupModal(false)}
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

  const currentQuestion = challengeData.quizQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  if (isQuizFinished) {
    const correctCount = challengeData.quizQuestions.filter(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
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
              <p className="text-sm text-gray-500 mt-2">Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</p>
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

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={() => setShowLoginModal(false)}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onAuthSuccess={() => setShowSignupModal(false)}
      />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Quiz Challenge</h1>
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {challengeData.numQuestions}
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              {/* Question Image */}
              {currentQuestion.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={currentQuestion.image}
                    alt="Question"
                    className="max-h-64 rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* Question Text */}
              <p className="text-lg font-medium text-gray-900 mb-6">
                {currentQuestion.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isSelected = selectedAnswer === index;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}
                        >
                          {letter}
                        </div>
                        <span className="flex-1 text-gray-800">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === undefined}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentQuestionIndex === challengeData.numQuestions - 1
                ? 'Submit Quiz'
                : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}


