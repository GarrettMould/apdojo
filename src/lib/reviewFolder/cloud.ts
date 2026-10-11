import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ReviewFolderState } from '@/lib/reviewFolder/types';

function emptyState(): ReviewFolderState {
  return { version: 1, misses: [], lessonWarmth: {} };
}

export function reviewFolderCloudDocId(subject: string, unitNumber: number): string {
  return `${subject}-${unitNumber}`;
}

export async function loadReviewFolderFromCloud(
  uid: string,
  subject: string,
  unitNumber: number
): Promise<{ state: ReviewFolderState; exists: boolean }> {
  const ref = doc(
    db,
    'users',
    uid,
    'reviewFolders',
    reviewFolderCloudDocId(subject, unitNumber)
  );
  const snap = await getDoc(ref);
  if (!snap.exists()) return { state: emptyState(), exists: false };
  const data = snap.data() as ReviewFolderState & { updatedAt?: unknown };
  if (!data || data.version !== 1 || !Array.isArray(data.misses)) {
    return { state: emptyState(), exists: true };
  }
  return {
    exists: true,
    state: {
      version: 1,
      misses: data.misses,
      lessonWarmth: data.lessonWarmth ?? {},
    },
  };
}

export async function saveReviewFolderToCloud(
  uid: string,
  subject: string,
  unitNumber: number,
  state: ReviewFolderState
): Promise<void> {
  const ref = doc(
    db,
    'users',
    uid,
    'reviewFolders',
    reviewFolderCloudDocId(subject, unitNumber)
  );
  await setDoc(
    ref,
    {
      version: 1 as const,
      misses: state.misses,
      lessonWarmth: state.lessonWarmth ?? {},
      subject,
      unitNumber,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function emptyReviewFolderState(): ReviewFolderState {
  return emptyState();
}
