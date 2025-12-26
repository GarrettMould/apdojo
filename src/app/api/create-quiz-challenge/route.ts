import { NextResponse } from 'next/server';
import { db as adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, quizHistoryId, questions, subject } = body;

    // Validation
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid questions' }, { status: 400 });
    }

    // Map questions to challenge format
    const challengeQuestions = questions.map((q: any) => {
      // Convert correctAnswer from letter (A, B, C, D) to index (0, 1, 2, 3)
      let correctAnswerIndex = 0;
      if (typeof q.correctAnswer === 'string') {
        correctAnswerIndex = q.correctAnswer.charCodeAt(0) - 65; // A=0, B=1, etc.
      } else if (typeof q.correctAnswer === 'number') {
        correctAnswerIndex = q.correctAnswer;
      }

      return {
        id: q.id,
        question: q.question,
        options: q.options || [],
        correctAnswer: correctAnswerIndex,
        unit: q.unit || 0,
        lessonIDS: q.lessonIDS || [],
        image: q.image || null,
        explanation: q.explanation || null,
        tableData: q.tableData || null,
      };
    });

    // Create challenge document
    const challengeData = {
      generatedByUserId: userId,
      quizHistoryId: quizHistoryId, // Reference to original quiz
      createdAt: FieldValue.serverTimestamp(),
      subject: subject || 'macro',
      status: 'pending',
      numQuestions: challengeQuestions.length,
      quizQuestions: challengeQuestions,
      originatorScore: null,
      originatorTime: null,
      opponentUserId: null,
      opponentScore: null,
      opponentTime: null,
      winnerUserId: null,
      xpAwarded: false,
      mode: 'challenge',
    };

    // Add to Firestore
    const challengeRef = await adminDb.collection('quizChallenges').add(challengeData);
    const challengeId = challengeRef.id;

    return NextResponse.json({
      success: true,
      challengeId: challengeId,
      message: 'Challenge created successfully',
    });
  } catch (error: any) {
    console.error('Error creating quiz challenge:', error);
    return NextResponse.json(
      {
        error: 'Failed to create challenge',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

