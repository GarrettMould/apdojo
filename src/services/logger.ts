import { db } from '@/lib/firebase';
import { doc, writeBatch, setDoc, updateDoc, serverTimestamp, increment, getDoc } from 'firebase/firestore';

/**
 * Question Analytics Interface
 * Tracks global statistics for each question across all users
 */
export interface QuestionAnalytics {
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  difficultyRating?: number; // Computed field (optional) - can be calculated as incorrectCount / totalAttempts
  lastUpdated: any; // Firestore Timestamp
}

/**
 * Answer data structure for a single question
 */
export interface QuestionAnswer {
  questionId: string | number;
  isCorrect: boolean;
}

/**
 * Log student activity and update global question analytics
 * 
 * Uses a WriteBatch to efficiently update all question analytics in a single network request.
 * For questions that don't exist yet, initializes them with setDoc before incrementing.
 * 
 * @param answers - Array of question answers with questionId and isCorrect status
 * @returns Promise that resolves when all analytics updates are complete
 */
export async function logStudentActivity(answers: QuestionAnswer[]): Promise<void> {
  if (!answers || answers.length === 0) {
    console.warn('[QuestionAnalytics] No answers provided to logStudentActivity');
    return;
  }

  try {
    const analyticsCollection = 'analytics_questions';
    const questionRefs = answers.map(answer => ({
      ref: doc(db, analyticsCollection, String(answer.questionId)),
      answer,
    }));

    // Check which documents exist (single parallel read operation)
    const existenceChecks = await Promise.all(
      questionRefs.map(async ({ ref }) => {
        const snap = await getDoc(ref);
        return { ref, exists: snap.exists() };
      })
    );

    // Create batch for all operations
    const batch = writeBatch(db);

    // Initialize documents that don't exist yet, then update all
    existenceChecks.forEach(({ ref, exists }, index) => {
      const { answer } = questionRefs[index];
      
      if (!exists) {
        // Initialize with base values, then immediately increment
        // We'll set initial values and use updateDoc in the same batch
        // But since we can't do both, we'll initialize first, then update in next batch
        batch.set(ref, {
          totalAttempts: 0,
          correctCount: 0,
          incorrectCount: 0,
          lastUpdated: serverTimestamp(),
        }, { merge: true });
      }
    });

    // Commit initialization batch if needed
    const needsInit = existenceChecks.some(({ exists }) => !exists);
    if (needsInit) {
      await batch.commit();
    }

    // Create new batch for increments (all documents now exist)
    const incrementBatch = writeBatch(db);
    questionRefs.forEach(({ ref, answer }) => {
      incrementBatch.update(ref, {
        totalAttempts: increment(1),
        correctCount: increment(answer.isCorrect ? 1 : 0),
        incorrectCount: increment(answer.isCorrect ? 0 : 1),
        lastUpdated: serverTimestamp(),
      });
    });

    // Commit all increments in a single network request
    await incrementBatch.commit();
    
    console.log(`[QuestionAnalytics] Successfully logged analytics for ${answers.length} questions`);
  } catch (error) {
    console.error('[QuestionAnalytics] Error logging student activity:', error);
    // Don't throw - allow the application to continue even if analytics logging fails
    // Analytics should never block the user experience
  }
}

/**
 * Helper function to convert various answer formats to QuestionAnswer[]
 * This makes it easy to integrate with different components
 */
export function normalizeAnswers(
  answers: Record<string | number, { isCorrect: boolean } | string | boolean>
): QuestionAnswer[] {
  return Object.entries(answers).map(([questionId, answerData]) => {
    let isCorrect: boolean;
    
    if (typeof answerData === 'boolean') {
      isCorrect = answerData;
    } else if (typeof answerData === 'string') {
      // Handle case where answerData is the selected answer letter
      // This would need question context to determine correctness
      // For now, we'll need the caller to provide isCorrect
      throw new Error('String answer format requires isCorrect to be provided separately');
    } else if (answerData && typeof answerData === 'object' && 'isCorrect' in answerData) {
      isCorrect = answerData.isCorrect;
    } else {
      throw new Error(`Invalid answer format for question ${questionId}`);
    }
    
    return {
      questionId,
      isCorrect,
    };
  });
}

