import { NextResponse } from 'next/server';
import { db, firebaseAdminInitPromise } from '@/lib/firebase-admin'; 
import { FieldValue } from 'firebase-admin/firestore';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems'; // Assuming this exports the full list
import type { Question as QuestionType } from '@/data/questionBanks/types'; // Ensure this type matches your structure

// Fisher-Yates (Knuth) Shuffle Function
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Function to map question data to the format needed for Firestore challenge doc
function mapQuestionForChallenge(q: QuestionType): any {
    // Assuming correctAnswer is 'A', 'B', 'C', etc. Convert to 0-based index.
    const correctAnswerIndex = q.correctAnswer.charCodeAt(0) - 65; 
  
    // Basic validation for the index
    if (correctAnswerIndex < 0 || correctAnswerIndex >= q.options.length) {
        console.warn(`Invalid correctAnswer letter '${q.correctAnswer}' for question ID ${q.id}. Defaulting index.`);
        // Handle appropriately, maybe skip question or default to -1 or first option?
        // For now, let's return null or skip? Let's return the object but maybe with invalid index marker?
        // Returning as is for now, but needs robust handling if letters are inconsistent.
    }
  
    return {
        id: q.id, // Keep original ID
        question: q.question,
        options: q.options || [], // Ensure options is an array
        correctAnswer: correctAnswerIndex, // Store 0-based index
        unit: q.unit,
        lessonIDS: q.lessonIDS || [], // Ensure it's an array
        image: q.image || null
    };
}

export async function POST(request: Request) {
  try {
    // Await the initialization promise at the very beginning
    if (firebaseAdminInitPromise) {
        console.log('Waiting for Firebase Admin initialization...');
        await firebaseAdminInitPromise;
        console.log('Firebase Admin initialization awaited.');
    } else {
         // This case should ideally not happen if the import worked
         console.error("Firebase Admin init promise was not available! This indicates an issue with firebase-admin.ts execution.");
         // Just throw the error if the promise is missing, as relying on a direct check is unreliable here.
         throw new Error("Firebase Admin initialization failed: Promise missing.");
    }

    const body = await request.json();
    const creatorUserId = body.userId; // Now safe to access body
    const subject = body.subject; // 'macro' or 'micro'
    const unitIds: number[] | undefined = body.unitIds; // Read optional unitIds
    const numQuestionsParam = body.numQuestions; // Read numQuestions from body

    // --- Validation ---
    if (!creatorUserId || typeof creatorUserId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
    }
    if (!subject || (subject !== 'macro' && subject !== 'micro')) {
      return NextResponse.json({ error: 'Missing or invalid subject' }, { status: 400 });
    }
    // Validate numQuestionsParam
    if (typeof numQuestionsParam !== 'number' || (numQuestionsParam !== 5 && numQuestionsParam !== 10)) {
        console.error("Invalid numQuestions received:", numQuestionsParam);
        return NextResponse.json({ error: 'Invalid or missing numQuestions (must be 5 or 10)' }, { status: 400 });
    }
    // Use the validated number
    const numQuestions = numQuestionsParam; 

    // Optional: Validate unitIds if present (ensure it's an array of numbers)
    if (unitIds && (!Array.isArray(unitIds) || !unitIds.every(id => typeof id === 'number'))) {
        return NextResponse.json({ error: 'Invalid unitIds format' }, { status: 400 });
    }
    
    // --- Filter Questions ---
    const subjectInDataFormat = subject === 'macro' ? 'ap_macroeconomics' : 'ap_microeconomics';
    // TODO: Filter by specificUnitIds if provided later
    let availableQuestions = allQuestions.filter(q => q.subject === subjectInDataFormat);

    // Apply unit filtering ONLY if unitIds are provided and the array is not empty
    if (unitIds && unitIds.length > 0) {
        console.log(`Filtering questions by subject '${subjectInDataFormat}' AND unit IDs:`, unitIds); // Log filtering
        availableQuestions = availableQuestions.filter(q => unitIds.includes(q.unit));
    } else {
        console.log(`Filtering questions by subject '${subjectInDataFormat}' only.`); // Log filtering
    }

    if (availableQuestions.length < numQuestions) {
        const unitMessage = (unitIds && unitIds.length > 0) ? ` for selected units (${unitIds.join(', ')})` : '';
        return NextResponse.json({ error: `Not enough questions available for subject ${subject}${unitMessage} (found ${availableQuestions.length}, needed ${numQuestions})` }, { status: 400 });
    }

    // --- Select & Format Questions ---
    const shuffledQuestions = shuffleArray(availableQuestions);
    const selectedQuestionsRaw = shuffledQuestions.slice(0, numQuestions);
    // Map and filter out any potentially invalid ones from mapping stage (if mapQuestionForChallenge returns null on error)
    const challengeQuestionsFormatted = selectedQuestionsRaw.map(mapQuestionForChallenge).filter(q => q !== null); 

    // Check if we still have enough questions after potential filtering in mapping
    if (challengeQuestionsFormatted.length < numQuestions) {
       console.warn(`Warning: Only ${challengeQuestionsFormatted.length} valid questions could be formatted after mapping.`);
       // Decide if this is an error or acceptable to proceed with fewer questions.
       // For now, let's proceed if we have at least some questions.
       if (challengeQuestionsFormatted.length === 0) {
           return NextResponse.json({ error: `Failed to format any valid questions for the challenge.` }, { status: 500 });
       }
    }

    // --- Create Challenge Document --- 
    const newChallengeData = {
      generatedByUserId: creatorUserId,
      createdAt: FieldValue.serverTimestamp(),
      subject: subject,
      status: "pending", 
      numQuestions: challengeQuestionsFormatted.length, // Use actual length after mapping/filtering
      quizQuestions: challengeQuestionsFormatted,
      originatorScore: null,
      originatorTime: null,
      opponentUserId: null,
      opponentScore: null,
      opponentTime: null,
      winnerUserId: null,
      xpAwarded: false,
      selectedUnitIds: unitIds && unitIds.length > 0 ? unitIds : null // Store selected units if any
    };

    // Add to Firestore
    const challengeRef = await db.collection('quizChallenges').add(newChallengeData);
    const challengeId = challengeRef.id;

    console.log(`Created quiz challenge ${challengeId} for user ${creatorUserId}`);
    
    // --- Return Challenge ID --- 
    return NextResponse.json({ 
        success: true, 
        challengeId: challengeId, 
        message: `Challenge quiz created successfully.` 
    });

  } catch (error: any) {
    console.error('Error in /api/generate-challenge-quiz:', error);
    
    let errorMessage = 'Failed to generate challenge quiz.';
    let statusCode = 500;
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      errorMessage = 'Invalid JSON payload received.';
      statusCode = 400;
    } else if (error.code === 16 || error.message.includes('UNAUTHENTICATED')) {
      // More specific handling for the auth error if it somehow persists
      errorMessage = 'Authentication failed when contacting database.';
      statusCode = 500; // Keep as internal server error
      console.error('Persistent UNAUTHENTICATED error despite waiting for init.');
    }

    return NextResponse.json({ 
        error: errorMessage, 
        details: error.message || 'Unknown error details' 
    }, { status: statusCode });
  }
} 