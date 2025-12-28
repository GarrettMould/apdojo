import { doc, updateDoc, getDoc, serverTimestamp, deleteField } from 'firebase/firestore';
import { db } from './firebase';

export interface DojoDrillProgress {
  [drillId: string]: {
    stage1: boolean;  // Video + Comprehension Check completed
    stage2: boolean;  // Interactive Activity completed
    stage3: boolean;  // MCQ Gauntlet completed
  };
}

/**
 * Save dojo drill progress for a specific stage
 */
export async function saveDojoDrillProgress(
  userId: string,
  drillId: string,
  stage: 'stage1' | 'stage2' | 'stage3'
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Use updateDoc with merge to preserve existing progress
    await updateDoc(userDocRef, {
      [`dojoDrillProgress.${drillId}.${stage}`]: true,
      [`dojoDrillProgress.${drillId}.lastUpdated`]: serverTimestamp(),
    });
    
    console.log(`[DojoDrillProgress] Saved ${stage} completion for drill ${drillId}`);
  } catch (error) {
    console.error(`[DojoDrillProgress] Error saving progress:`, error);
    throw error;
  }
}

/**
 * Load dojo drill progress for a user
 */
export async function loadDojoDrillProgress(
  userId: string
): Promise<DojoDrillProgress | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.dojoDrillProgress || null;
    }
    
    return null;
  } catch (error) {
    console.error(`[DojoDrillProgress] Error loading progress:`, error);
    return null;
  }
}

/**
 * Get progress for a specific drill
 */
export function getDrillProgress(
  progress: DojoDrillProgress | null,
  drillId: string
): { stage1: boolean; stage2: boolean; stage3: boolean } | null {
  if (!progress || !progress[drillId]) {
    return null;
  }
  
  return {
    stage1: progress[drillId].stage1 || false,
    stage2: progress[drillId].stage2 || false,
    stage3: progress[drillId].stage3 || false,
  };
}

/**
 * Reset progress for a specific drill
 */
export async function resetDojoDrillProgress(
  userId: string,
  drillId: string
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Delete the progress for this drill
    await updateDoc(userDocRef, {
      [`dojoDrillProgress.${drillId}`]: deleteField(),
    });
    
    console.log(`[DojoDrillProgress] Reset progress for drill ${drillId}`);
  } catch (error) {
    console.error(`[DojoDrillProgress] Error resetting progress:`, error);
    throw error;
  }
}

