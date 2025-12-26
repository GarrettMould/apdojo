import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Question } from '@/data/questionBanks/types';

export interface QuizHistoryEntry {
  id: string;
  userId: string;
  type: 'cheat-sheet' | 'infinite-drill' | 'custom-link';
  title: string;
  score: number; // percentage
  correctCount: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: Record<string, string>; // Map of questionId -> selectedOption
  timestamp: any; // serverTimestamp
}

// Helper function to remove undefined values from an object recursively
function removeUndefined(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => removeUndefined(item));
  }
  
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        cleaned[key] = removeUndefined(obj[key]);
      }
    }
    return cleaned;
  }
  
  return obj;
}

// Helper function to clean questions array
function cleanQuestions(questions: Question[]): any[] {
  return questions.map(q => {
    // Convert image to string if it's an object
    let imageValue: string | null = null;
    if (q.image) {
      if (typeof q.image === 'string') {
        imageValue = q.image;
      } else if (typeof q.image === 'object' && 'src' in q.image) {
        imageValue = q.image.src;
      } else if (typeof q.image === 'object' && 'default' in q.image) {
        // Handle StaticImageData
        imageValue = (q.image as any).default?.src || (q.image as any).src || null;
      }
    }

    const cleaned: any = {
      id: q.id,
      unit: q.unit ?? null,
      subject: q.subject ?? null,
      unitName: q.unitName ?? null,
      question: q.question ?? '',
      options: q.options ?? [],
      correctAnswer: q.correctAnswer ?? '',
      lessonIDS: q.lessonIDS ?? [],
    };

    // Only add optional fields if they exist
    if (q.explanation) cleaned.explanation = q.explanation;
    if (imageValue) cleaned.image = imageValue;
    if (q.tableData) {
      // Convert nested arrays (string[][]) to array of objects for Firestore compatibility
      // Firestore doesn't support nested arrays, so we convert rows to objects
      cleaned.tableData = {
        headers: q.tableData.headers || [],
        rows: q.tableData.rows ? q.tableData.rows.map((row, index) => ({
          index,
          cells: row, // Convert string[] to object with cells array
        })) : [],
        rowHeaders: q.tableData.rowHeaders ?? null,
        playerNames: q.tableData.playerNames ?? null,
      };
    }
    if (q.optionTableHeaders) cleaned.optionTableHeaders = q.optionTableHeaders;
    if (q.videoExplanation) cleaned.videoExplanation = q.videoExplanation;
    if (q.sliderExplainer) cleaned.sliderExplainer = q.sliderExplainer;
    if (q.questionNumber !== undefined) cleaned.questionNumber = q.questionNumber;
    if (q.isTest !== undefined) cleaned.isTest = q.isTest;
    if (q.questionGroup !== undefined) cleaned.questionGroup = q.questionGroup;

    return cleaned;
  });
}

// Helper function to clean userAnswers object
function cleanUserAnswers(answers: Record<string, string>): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const key in answers) {
    if (answers[key] !== undefined && answers[key] !== null) {
      cleaned[key] = String(answers[key]);
    }
  }
  return cleaned;
}

// Helper function to convert stored tableData back to original format
export function restoreTableData(storedTableData: any): any {
  if (!storedTableData) return null;
  
  // If rows is already in the original format (string[][]), return as-is
  if (Array.isArray(storedTableData.rows) && storedTableData.rows.length > 0) {
    // Check if first row is an array (original format) or object (stored format)
    if (Array.isArray(storedTableData.rows[0])) {
      return storedTableData; // Already in original format
    }
    // Convert from stored format (array of objects with cells) back to original format
    return {
      ...storedTableData,
      rows: storedTableData.rows.map((rowObj: any) => rowObj.cells || []),
    };
  }
  
  return storedTableData;
}

export async function saveQuizResult(
  data: Omit<QuizHistoryEntry, 'id' | 'timestamp'>
): Promise<string> {
  try {
    // Clean the data to remove undefined values
    const cleanedData = {
      userId: data.userId,
      type: data.type,
      title: data.title || 'Untitled Quiz',
      score: data.score ?? 0,
      correctCount: data.correctCount ?? 0,
      totalQuestions: data.totalQuestions ?? 0,
      questions: cleanQuestions(data.questions || []),
      userAnswers: cleanUserAnswers(data.userAnswers || {}),
    };

    // Remove any remaining undefined values recursively
    const finalData = removeUndefined(cleanedData);
    
    const docRef = await addDoc(collection(db, 'userQuizHistory'), {
      ...finalData,
      timestamp: serverTimestamp(),
    });
    console.log(`[Quiz History] Saved quiz result with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('[Quiz History] Error saving quiz result:', error);
    throw error;
  }
}

