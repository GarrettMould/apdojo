import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export interface TestProgress {
  userId: string;
  testType: 'unit_mcq' | 'full_exam' | 'full_frq';
  testId: string;
  progress: {
    // For MCQ exams
    answeredQuestions?: Record<string, {
      selectedAnswer: number;
      isCorrect: boolean;
    }>;
    // For FRQ exams
    textAnswers?: Record<string, string>;
    drawingAnswers?: Record<string, string>;
    currentQuestionIndex: number;
    isSubmitted: boolean;
    score?: number;
    totalQuestions: number;
    startedAt: any;
    lastUpdated: any;
  };
}

export interface TestResult {
  userId: string;
  testType: 'unit_mcq' | 'full_exam' | 'full_frq';
  testId: string;
  score: number;
  totalQuestions: number;
  completedAt: any;
}

// Save test progress in real-time
export const saveTestProgress = async (progress: TestProgress) => {
  try {
    console.log('Attempting to save progress to Firebase:', progress);
    const userDocRef = doc(db, 'userTestProgress', progress.userId);
    const testDocRef = doc(userDocRef, 'tests', progress.testId);
    
    const dataToSave = {
      ...progress,
      progress: {
        ...progress.progress,
        lastUpdated: serverTimestamp()
      }
    };
    
    console.log('Saving data to Firebase:', dataToSave);
    await setDoc(testDocRef, dataToSave, { merge: true });
    
    console.log('Test progress saved successfully to:', testDocRef.path);
  } catch (error) {
    console.error('Error saving test progress:', error);
    throw error; // Re-throw to see the error in the component
  }
};

// Load test progress
export const loadTestProgress = async (userId: string, testId: string): Promise<TestProgress['progress'] | null> => {
  try {
    console.log('Attempting to load progress for:', { userId, testId });
    const userDocRef = doc(db, 'userTestProgress', userId);
    const testDocRef = doc(userDocRef, 'tests', testId);
    
    console.log('Checking document at:', testDocRef.path);
    const testDoc = await getDoc(testDocRef);
    
    if (testDoc.exists()) {
      const data = testDoc.data();
      console.log('Found existing progress data:', data);
      return data.progress;
    }
    
    console.log('No existing progress found');
    return null;
  } catch (error) {
    console.error('Error loading test progress:', error);
    return null;
  }
};

// Save final test result
export const saveTestResult = async (result: TestResult) => {
  try {
    const userDocRef = doc(db, 'userTestResults', result.userId);
    const testDocRef = doc(userDocRef, 'results', result.testId);
    
    await setDoc(testDocRef, {
      ...result,
      completedAt: serverTimestamp()
    });
    
    console.log('Test result saved successfully');
  } catch (error) {
    console.error('Error saving test result:', error);
  }
};

// Get user's test completion history
export const getUserTestHistory = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'userTestResults', userId);
    const resultsDoc = await getDoc(userDocRef);
    
    if (resultsDoc.exists()) {
      return resultsDoc.data();
    }
    
    return {};
  } catch (error) {
    console.error('Error loading test history:', error);
    return {};
  }
}; 