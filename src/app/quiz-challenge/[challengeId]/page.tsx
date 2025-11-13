'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Corrected import path
import { useAuthContext } from '@/contexts/AuthContext'; // Added for getting user ID
import { Loader2, AlertCircle, Check, X, Copy, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define a type for the challenge data structure (based on your blueprint)
interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number; // Index
  unit: number;
  lessonIDS: string[];
  image?: string;
}

interface QuizChallenge {
  generatedByUserId: string;
  createdAt: any; // Firestore Timestamp type might be more specific
  subject: 'macro' | 'micro';
  status: string;
  numQuestions: number;
  quizQuestions: QuizQuestion[]; // Use the specific type
  originatorScore: number | null;
  originatorTime: number | null;
  opponentUserId: string | null;
  opponentScore: number | null;
  opponentTime: number | null;
  winnerUserId: string | null;
  xpAwarded: boolean;
  mode: 'challenge' | 'cooperate'; // Added mode field
}

// --- Reusable Question Card Component (Adapted from unitMCQS) ---
interface ChallengeQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswerIndex: number | null;
  isAnswerSubmitted: boolean;
  onAnswerSelect: (index: number) => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
}

const ChallengeQuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswerIndex,
  isAnswerSubmitted,
  onAnswerSelect,
  onSubmit,
  isLastQuestion,
}: ChallengeQuestionCardProps) => {
  const correctAnswerIndex = question.correctAnswer;

  // Format lesson display (use first lesson ID if available)
  let lessonDisplay = '';
  if (question.lessonIDS && question.lessonIDS.length > 0) {
     const firstLessonId = question.lessonIDS[0];
     // Extract only the part before the dot
     const mainLessonNumber = firstLessonId.split('.')[0];
     lessonDisplay = ` - Lesson ${mainLessonNumber}`;
  }

  // Determine button text and style based on isLastQuestion
  const submitButtonText = isLastQuestion ? "Submit Quiz" : "Submit Answer";
  const submitButtonClasses = isLastQuestion
      ? "w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
      : "w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50";

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 w-full max-w-2xl mx-auto">
       {/* Header section with Question number and Unit/Lesson tag */}
      <div className="flex justify-between items-center mb-4">
         <p className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</p>
         <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            Unit {question.unit}{lessonDisplay}
         </span>
      </div>

      {/* Main content area */}
      <div className="space-y-6">
        {/* Image */}
        {question.image && (
           <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
             <img
               src={question.image}
               alt="Question visual aid"
               className="max-h-60 w-auto mx-auto object-contain"
             />
           </div>
        )}
        {/* Question Text */}
        <p className="text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800">
          {question.question}
        </p>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, optIndex) => {
            const isSelected = selectedAnswerIndex === optIndex;
            const isCorrect = correctAnswerIndex === optIndex; // Keep isCorrect for logic, but not styling

            // Revert to style logic closer to unitMCQS, but remove correctness feedback
            let buttonClasses = `w-full text-left p-3 rounded-lg text-sm font-medium transition-all duration-150 border flex items-center gap-3 `;
            let bubbleClasses = `w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 `;

            if (isAnswerSubmitted) {
                // Submitted state: Highlight selection blue, fade others
                if (isSelected) {
                    buttonClasses += 'bg-blue-50 text-gray-900 shadow-sm border-blue-200 cursor-default opacity-100'; // Selected = visible blue
                    bubbleClasses += 'bg-blue-100 border-blue-300 text-blue-700';
                } else {
                    buttonClasses += 'bg-transparent text-gray-600 border-gray-200 cursor-default opacity-60'; // Faded
                    bubbleClasses += 'bg-white border-gray-300 text-gray-400 opacity-60';
                }
            } else {
                // Not submitted state: Default or blue selection highlight
                 if (isSelected) {
                    buttonClasses += 'bg-blue-100 text-gray-900 border-blue-300 shadow-sm'; // Blue highlight
                    bubbleClasses += 'bg-blue-200 border-blue-400 text-blue-800'; // Darker bubble for selected
                 } else {
                     buttonClasses += 'bg-transparent text-gray-900 hover:bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'; // Default
                     bubbleClasses += 'bg-white border-gray-300 text-gray-600';
                 }
            }

            return (
              <button
                key={optIndex}
                className={buttonClasses} // Apply the constructed classes
                onClick={() => !isAnswerSubmitted && onAnswerSelect(optIndex)}
                disabled={isAnswerSubmitted}
              >
                <span className={bubbleClasses}>
                  {String.fromCharCode(65 + optIndex)}
                </span>
                 {/* Use text-gray-900 for submitted+selected, fade others */} 
                <span className={`flex-1 whitespace-normal text-sm ${(isAnswerSubmitted && !isSelected) ? 'text-gray-600 opacity-80' : 'text-gray-900'}`}>
                  {option}
                </span>
                {/* Ensure no check/X icon */}
              </button>
            );
          })}
        </div>

        {/* Submit Button - Text and Style are now conditional */}
        <div className="pt-6">
          <Button
            onClick={onSubmit}
            disabled={selectedAnswerIndex === null || isAnswerSubmitted}
            size="lg"
            className={submitButtonClasses} // Use conditional classes
          >
             {submitButtonText} {/* Use conditional text */}
          </Button>
        </div>
      </div>
    </div>
  );
};
// --- End Reusable Question Card Component ---

export default function QuizChallengePage() {
  const params = useParams();
  const challengeId = params.challengeId as string;
  const { user, loading: authLoading, userData, loadingUserData } = useAuthContext();
  const router = useRouter(); // Initialize router

  const [challengeData, setChallengeData] = useState<QuizChallenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectMismatchError, setSubjectMismatchError] = useState<boolean>(false);

  // --- State for Quiz Flow ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  // --- NEW State for Copy Link --- 
  const [linkCopied, setLinkCopied] = useState(false);

  // --- NEW Effect for Auth Check & Redirect ---
  useEffect(() => {
    // Don't redirect until auth state is determined
    if (!authLoading) { 
        if (!user) {
            // User is not logged in, redirect to homepage
            console.log("[Auth Check] User not logged in or logged out. Redirecting to homepage.");
            router.push('/'); // Redirect to homepage
        }
        // else: user is logged in, allow component to render normally
    }
  }, [authLoading, user, router]); // challengeId is not strictly needed here
  // --- END Effect --- 

  // --- NEW Effect for Subject Mismatch Check ---
  useEffect(() => {
    // Wait for all loading flags to be false and data to be available
    if (!loading && !authLoading && !loadingUserData && userData && challengeData) {
        if (userData.selectedSubject && challengeData.subject && userData.selectedSubject !== challengeData.subject) {
            console.warn(`[Subject Mismatch] User subject: ${userData.selectedSubject}, Challenge subject: ${challengeData.subject}`);
            setError(`Subject mismatch: This challenge is for ${challengeData.subject}, but your selected subject is ${userData.selectedSubject}.`);
            setSubjectMismatchError(true);
        } else {
            // Ensure error is cleared if subjects match or one is undefined (shouldn't happen if setup is complete)
            setSubjectMismatchError(false);
            // Clear the generic error ONLY if it was previously set by this specific check
            if (error?.startsWith("Subject mismatch:")) {
                setError(null);
            }
        }
    }
  }, [loading, authLoading, loadingUserData, userData, challengeData, error]); // Add error to deps to clear it
  // --- END Effect ---

  // Fetch challenge data
  useEffect(() => {
    if (!challengeId) {
      setError('No challenge ID found in URL.');
      setLoading(false);
      return;
    }

    const fetchChallenge = async () => {
      setLoading(true);
      setError(null);
      try {
        const challengeDocRef = doc(db, 'quizChallenges', challengeId);
        const challengeSnap = await getDoc(challengeDocRef);

        if (challengeSnap.exists()) {
          const data = challengeSnap.data() as QuizChallenge;
          if (!data.quizQuestions || data.quizQuestions.length === 0) {
            setError("Challenge data is missing questions.");
          } else {
            setChallengeData(data);
            setStartTime(Date.now());
          }
        } else {
          setError(`Challenge not found (ID: ${challengeId}).`);
        }
      } catch (err: any) {
        console.error('Error fetching challenge:', err);
        setError(`Failed to load challenge: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // --- Handler Functions ---
  const handleAnswerSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswerIndex(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (!challengeData || isAnswerSubmitted) return;

    if (selectedAnswerIndex === null) return;

    setIsAnswerSubmitted(true);

    const currentQuestion = challengeData.quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < challengeData.numQuestions) {
      setTimeout(() => {
          setCurrentQuestionIndex(nextIndex);
          setSelectedAnswerIndex(null);
          setIsAnswerSubmitted(false);
      }, 300);
    } else {
      const finalEndTime = Date.now();
      const finalTimeTaken = finalEndTime - (startTime ?? finalEndTime);
      setEndTime(finalEndTime);

      setTimeout(() => {
           setIsQuizFinished(true);
           const finalScoreValue = score + (isCorrect ? 1 : 0);
           submitResults(finalScoreValue, finalTimeTaken);
      }, 300);
    }
  };

  const submitResults = async (finalScore: number, finalTimeTaken: number) => {
    if (!challengeData || !user || !startTime) {
        console.warn("Cannot submit results: Missing data, user, or startTime.");
        return;
    }

    console.log(`[submitResults] Called. User: ${user.uid}, Final Score: ${finalScore}, Time Taken: ${finalTimeTaken}ms. Challenge Data:`, JSON.stringify(challengeData));

    const challengeDocRef = doc(db, 'quizChallenges', challengeId);
    const isOriginator = user.uid === challengeData.generatedByUserId;
    const updateData: { [key: string]: any } = {};

    let opponentHasSubmitted = challengeData.opponentScore !== null;
    let originatorHasSubmitted = challengeData.originatorScore !== null;

    if (isOriginator) {
        if (challengeData.originatorScore !== null) {
            console.log("[submitResults] Originator already submitted.");
            setIsQuizFinished(true);
            return;
        }
        updateData.originatorScore = finalScore;
        updateData.originatorTime = finalTimeTaken;
        originatorHasSubmitted = true;

        if (opponentHasSubmitted) {
            updateData.status = 'completed';
            if (finalScore > challengeData.opponentScore!) updateData.winnerUserId = user.uid;
            else if (challengeData.opponentScore! > finalScore) updateData.winnerUserId = challengeData.opponentUserId;
            else updateData.winnerUserId = finalTimeTaken < challengeData.opponentTime! ? user.uid : challengeData.opponentUserId;
        } else {
            updateData.status = 'originator_submitted';
        }
    } else {
        if (challengeData.opponentUserId && challengeData.opponentUserId !== user.uid) {
            console.log("[submitResults] Opponent slot already taken by another user.");
            setError("Oops! This challenge has already been accepted by another opponent.");
            setIsQuizFinished(true);
            return;
        }
        if (challengeData.opponentScore !== null) {
            console.log("[submitResults] Opponent (this user) already submitted.");
            setIsQuizFinished(true);
            return;
        }
        updateData.opponentUserId = user.uid;
        updateData.opponentScore = finalScore;
        updateData.opponentTime = finalTimeTaken;
        opponentHasSubmitted = true;

        if (originatorHasSubmitted) {
            updateData.status = 'completed';
            if (finalScore > challengeData.originatorScore!) updateData.winnerUserId = user.uid;
            else if (challengeData.originatorScore! > finalScore) updateData.winnerUserId = challengeData.generatedByUserId;
            else updateData.winnerUserId = finalTimeTaken < challengeData.originatorTime! ? user.uid : challengeData.generatedByUserId;
        } else {
            updateData.status = 'opponent_submitted';
        }
    }

    if (Object.keys(updateData).length > 0) {
        try {
            console.log(`[submitResults] Attempting Firestore update for challenge ${challengeId} with data:`, JSON.stringify(updateData));
            await updateDoc(challengeDocRef, updateData);
            console.log(`[submitResults] Firestore update for challenge ${challengeId} successful.`);
            setChallengeData(prev => prev ? ({ ...prev, ...updateData }) : null);
        } catch (error) {
            console.error(`[submitResults] Error updating Firestore for challenge ${challengeId}:`, error);
            setError("Failed to submit your score. Please try refreshing.");
        }
    } else {
         console.log(`[submitResults] No update data generated for challenge ${challengeId} (likely already submitted).`);
         if (!isQuizFinished) setIsQuizFinished(true);
    }
};

  // --- NEW Copy Link Handler --- 
  const handleCopyLink = () => {
    if (challengeId) {
      const link = `${window.location.origin}/quiz-challenge/${challengeId}`;
      navigator.clipboard.writeText(link).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000); // Reset after 2s
      }, (err) => {
        console.error('Failed to copy link: ', err);
        // Optionally set an error state here to show feedback
      });
    }
  };

  // --- Render Helper Functions ---
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
      <p className="text-lg text-gray-600">Loading Challenge...</p>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Challenge</h2>
      <p className="text-gray-600">{error}</p>
    </div>
  );

  const renderQuizResults = () => {
     if (!challengeData) return renderError();

     // Reconstruct the link for display/copy
     const challengeLink = `${window.location.origin}/quiz-challenge/${challengeId}`;

     const isOriginator = user?.uid === challengeData.generatedByUserId;
     const finalScore = (isOriginator ? challengeData.originatorScore : challengeData.opponentScore) ?? score;
     const opponentScore = isOriginator ? challengeData.opponentScore : challengeData.originatorScore;
     const winnerId = challengeData.winnerUserId;
     const challengeStatus = challengeData.status;
     let resultMessage = "";
     let resultColor = "text-gray-700";
     let showOpponentScore = false;

     if (!user) {
         resultMessage = "Log in or sign up to save your score and see the final results!";
     } else if (isOriginator) {
         // --- Originator Logic ---
         if (challengeStatus === 'completed') {
             // Final result known
             showOpponentScore = true;
             if (winnerId === user.uid) {
                 resultMessage = "You won!";
                 resultColor = "text-green-600";
             } else if (winnerId === null || winnerId === undefined) {
                 resultMessage = "It's a tie!";
             } else {
                 resultMessage = "You lost.";
                 resultColor = "text-red-600";
             }
         } else {
             // Originator finished, opponent hasn't (or hasn't started)
             resultMessage = "Your score is submitted! Share the link with a friend to see who wins.";
             showOpponentScore = false; // Don't show opponent score yet
         }
     } else {
         // --- Opponent Logic ---
         const originatorScoreExists = challengeData.originatorScore !== null;
         const opponentTime = challengeData.opponentTime ?? Number.MAX_SAFE_INTEGER; // Use own time
         const originatorTime = challengeData.originatorTime ?? Number.MAX_SAFE_INTEGER; // Use originator time if exists

         if (originatorScoreExists) {
             // Originator HAS finished, determine result now
             showOpponentScore = true; // Can show originator score
             if (finalScore > challengeData.originatorScore!) {
                 resultMessage = "You won!"; // Opponent won based on score
                 resultColor = "text-green-600";
             } else if (challengeData.originatorScore! > finalScore) {
                 resultMessage = "You lost."; // Opponent lost based on score
                 resultColor = "text-red-600";
             } else { // Tie in score, check time
                 if (opponentTime < originatorTime) {
                     resultMessage = "You won! (Faster time)";
                     resultColor = "text-green-600";
                 } else if (originatorTime < opponentTime) {
                     resultMessage = "You lost. (Slower time)";
                     resultColor = "text-red-600";
                 } else {
                     resultMessage = "It's a tie!"; // Exact tie in score and time
                 }
             }
             // Override message if status is already 'completed' and reflects a different winner (edge case, should align)
             if (challengeStatus === 'completed') {
                  if (winnerId === user.uid) { resultMessage = "You won!"; resultColor = "text-green-600"; }
                  else if (winnerId === null) { resultMessage = "It's a tie!"; resultColor = "text-gray-700"; } // Keep tie color neutral gray
                  else if (winnerId !== null) { resultMessage = "You lost."; resultColor = "text-red-600"; }
             }

         } else if (challengeStatus === 'opponent_submitted' || challengeStatus === 'pending') {
             // Originator hasn't finished yet
             resultMessage = "Your score is submitted! Waiting for the challenger to finish...";
             showOpponentScore = false; // Cannot show opponent score yet
         } else {
             // Fallback or initial state before submission?
             resultMessage = "Challenge results are pending.";
             showOpponentScore = false;
         }
     }

     return (
        <Card className="w-full max-w-md mx-auto text-center relative">
            <CardContent className="space-y-6 p-10">

                {/* --- Styled Your Score Section --- */}
                <p className="text-2xl font-extrabold text-black mb-2">Your Score</p>
                <div className="text-2xl font-bold text-gray-800 select-none border border-gray-200 shadow-sm rounded-lg bg-white w-24 h-24 flex items-center justify-center mx-auto">
                    <span>
                        {finalScore} / {challengeData?.numQuestions ?? 5}
                    </span>
                </div>
                {/* --- End Your Score Section --- */}

                {/* --- Clickable Link (ONLY for Originator) --- */}
                {isOriginator && (
                    <div className="flex items-center gap-2 p-3 border border-gray-300 bg-gray-100 rounded-md"> {/* Use flex container like modal */}
                        {/* Link Text (Non-clickable Paragraph) */}
                        <p className="text-base text-gray-800 font-semibold truncate min-w-0"> 
                            {challengeLink}
                        </p>
                        {/* Separate Copy Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyLink}
                            className="flex-shrink-0 px-2 py-1 h-auto text-gray-600 hover:text-gray-900"
                            aria-label={linkCopied ? 'Link Copied' : 'Copy Link'}
                        >
                            {linkCopied ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                )}
                {/* --- End Clickable Link --- */}

                {/* Styled Instructions Text (Conditional) */}
                <p className="text-sm text-blue-500 font-bold px-4 pt-4 flex items-center justify-center gap-2"> {/* Increased top padding */}
                    <Info className="w-6 h-6 flex-shrink-0" />
                    {isOriginator ? (
                        <span>Share the link. Then check your user dashboard for results and XP.</span>
                    ) : (
                        <span>Check your dashboard to view challenge results and claim xp</span> // Opponent's message
                    )}
                </p>

            </CardContent>
        </Card>
     );
  };

  // --- NEW Function to Render Subject Mismatch Error ---
  const renderSubjectMismatchError = () => (
    <div className="w-full flex flex-col items-center space-y-6 mt-20 mb-20">
      {/* Mimic Question Card Styling */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 w-full max-w-2xl mx-auto text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        {/* Updated heading text: larger font, capitalized subject (safe check) */}
        <h2 className="text-2xl font-semibold text-red-700 mb-2"> {/* Changed to text-2xl */}
           {`Oops! This is not an AP ${userData?.selectedSubject ? (userData.selectedSubject.charAt(0).toUpperCase() + userData.selectedSubject.slice(1)) : 'Unknown Subject'} quiz.`}
        </h2>
        <Button 
          onClick={() => router.push('/userHomePage')}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Return to Home Page
        </Button>
      </div>
    </div>
  );
  // --- END Function --- 

  const renderQuizContent = () => {
    if (!challengeData) return renderError();
    if (isQuizFinished) return renderQuizResults();

    const currentQuestion = challengeData.quizQuestions[currentQuestionIndex];
    // Calculate isLastQuestion here
    const isLastQuestion = currentQuestionIndex === challengeData.numQuestions - 1;

    if (user && challengeData) {
        const isOriginator = user.uid === challengeData.generatedByUserId;
        const hasOriginatorSubmitted = challengeData.originatorScore !== null;
        const hasOpponentSubmitted = challengeData.opponentScore !== null;
        const isOpponent = user.uid === challengeData.opponentUserId;

        if ((isOriginator && hasOriginatorSubmitted) || (isOpponent && hasOpponentSubmitted)) {
            console.log("User already submitted, showing results.");
            if (!isQuizFinished) setIsQuizFinished(true);
            return renderQuizResults();
        }
        if (!isOriginator && challengeData.opponentUserId && !isOpponent) {
           setError("This challenge has already been accepted by another opponent.");
           return renderError();
        }
    }

    return (
      <div className="w-full flex flex-col items-center space-y-6">
        <ChallengeQuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={challengeData.numQuestions}
          selectedAnswerIndex={selectedAnswerIndex}
          isAnswerSubmitted={isAnswerSubmitted}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={handleSubmitAnswer}
          isLastQuestion={isLastQuestion}
        />
      </div>
    );
  };

  // --- Main Return Logic ---
  if (loading || authLoading || loadingUserData) return renderLoading(); // Combine loading states
  // Subject mismatch check (comes after loading, before other errors/content)
  if (subjectMismatchError) return renderSubjectMismatchError(); 
  // General error check (catches fetch errors etc.)
  if (error) return renderError(); 
  if (!challengeData) { // Fallback if challengeData is null after loading/no error
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-600">Challenge data could not be loaded.</p>
      </div>
    );
  }

  // Determine headline text based on mode
  const headlineText = challengeData.mode === 'cooperate'
      ? <>AP <span className="text-blue-500">Dojo</span> Cooperate Mode</>
      : <>AP <span className="text-blue-500">Dojo</span> Challenge Mode</>; // Default to Challenge

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen flex flex-col items-center pt-10 md:pt-16">
      {/* Updated Headline with conditional text and styling */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 md:mb-8">
          {headlineText}
      </h1>
      {renderQuizContent()}
    </div>
  );
} 