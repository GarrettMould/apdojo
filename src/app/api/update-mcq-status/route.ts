import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin'; 
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  let userId: string | null = null; // For use in error logging
  try {
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

    // Get user document reference
    const userRef = adminDb.collection('users').doc(userId);

    // Update the map field using dot notation
    await userRef.update({
      [`mcqAnswerStatus.${questionId}`]: isCorrect 
    });

    console.log(`Updated MCQ status for Q:${questionId} to ${isCorrect} for user ${userId}`);
    return NextResponse.json({ success: true, message: `MCQ status for Q:${questionId} updated.` });

  } catch (error: any) {
    console.error('Error in /api/update-mcq-status:', error);
    
    let errorMessage = 'Failed to update MCQ status.';
    let statusCode = 500;

    if (error.code === 5) { // Firestore NOT_FOUND
      errorMessage = `User document not found for userId: ${userId || 'unknown'}`;
      statusCode = 404;
    } else if (error instanceof SyntaxError && error.message.includes('JSON')) {
      errorMessage = 'Invalid JSON payload received.';
      statusCode = 400;
    }

    return NextResponse.json({ 
        error: errorMessage, 
        details: error.message || 'Unknown error details' 
    }, { status: statusCode });
  }
}
