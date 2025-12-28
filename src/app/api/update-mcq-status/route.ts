import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  let userId: string | null = null; // For use in error logging
  try {
    // Validate Firebase Admin is initialized
    if (!adminDb) {
      console.error('Firebase Admin database is not initialized');
      console.error('Check that these environment variables are set:');
      console.error('- FIREBASE_PROJECT_ID');
      console.error('- FIREBASE_CLIENT_EMAIL');
      console.error('- FIREBASE_PRIVATE_KEY');
      return NextResponse.json({ 
        error: 'Database not initialized',
        details: 'Firebase Admin SDK failed to initialize. Please check server environment variables.',
        hint: 'Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set'
      }, { status: 500 });
    }

    const body = await request.json();
    userId = body.userId;
    const questionId = body.questionId; // Assuming client sends a single ID
    const isCorrect = body.isCorrect;

    // Validate input
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
    }
    if (questionId === undefined || questionId === null || (typeof questionId !== 'number' && typeof questionId !== 'string')) {
      return NextResponse.json({ error: 'Missing or invalid questionId' }, { status: 400 });
    }
    if (typeof isCorrect !== 'boolean') {
      return NextResponse.json({ error: 'Missing or invalid isCorrect value (must be boolean)' }, { status: 400 });
    }

    // Convert questionId to string for consistent field naming
    const questionIdStr = String(questionId);

    // Get user document reference
    const userRef = adminDb.collection('users').doc(userId);

    try {
      // Use set with merge: true to create document if it doesn't exist
      // This is more robust than update() which fails if document doesn't exist
      await userRef.set({
        [`mcqAnswerStatus.${questionIdStr}`]: isCorrect 
      }, { merge: true });

      console.log(`[update-mcq-status] Updated MCQ status for Q:${questionIdStr} to ${isCorrect} for user ${userId}`);
      return NextResponse.json({ success: true, message: `MCQ status for Q:${questionIdStr} updated.` });
    } catch (firestoreError: any) {
      console.error(`[update-mcq-status] Firestore operation failed:`, {
        error: firestoreError,
        code: firestoreError.code,
        message: firestoreError.message,
        userId,
        questionId: questionIdStr
      });
      // Re-throw to be caught by outer catch block
      throw firestoreError;
    }

  } catch (error: any) {
    console.error('Error in /api/update-mcq-status:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
      userId: userId || 'unknown',
      name: error.name,
      cause: error.cause,
    });
    
    let errorMessage = 'Failed to update MCQ status.';
    let statusCode = 500;
    let errorDetails: any = {
      message: error.message || 'Unknown error details',
      code: error.code || 'UNKNOWN'
    };

    if (error.code === 5) { // Firestore NOT_FOUND
      errorMessage = `User document not found for userId: ${userId || 'unknown'}`;
      statusCode = 404;
    } else if (error.code === 7) { // Firestore PERMISSION_DENIED
      errorMessage = `Permission denied for userId: ${userId || 'unknown'}`;
      statusCode = 403;
    } else if (error.code === 3) { // Firestore INVALID_ARGUMENT
      errorMessage = `Invalid argument: ${error.message || 'Unknown'}`;
      statusCode = 400;
    } else if (error instanceof SyntaxError && error.message.includes('JSON')) {
      errorMessage = 'Invalid JSON payload received.';
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Include more details in development
    if (process.env.NODE_ENV === 'development') {
      errorDetails.stack = error.stack;
    }

    return NextResponse.json({ 
        error: errorMessage, 
        ...errorDetails
    }, { status: statusCode });
  }
}
