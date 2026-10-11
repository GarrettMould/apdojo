/** Flip to true to show Rematch on MCQ practice pages. */
export const REMATCH_ENABLED = false;

export type {
  ReviewMiss,
  ReviewFolderState,
  ReviewLessonGroup,
} from '@/lib/reviewFolder/types';
export {
  getLessonLabel,
  formatLessonHeading,
} from '@/lib/reviewFolder/labels';
export {
  reviewFolderStorageKey,
  previewFromQuestion,
  loadReviewFolder,
  saveReviewFolder,
  recordMiss,
  recordCorrect,
  removeMiss,
  clearReviewFolder,
  mergeReviewFolderStates,
  loadMergedReviewFolders,
  rollupByLesson,
  uniqueLessonIds,
  missedQuestionIds,
  filterReviewFolderBySubject,
} from '@/lib/reviewFolder/store';
export {
  loadReviewFolderFromCloud,
  saveReviewFolderToCloud,
  reviewFolderCloudDocId,
} from '@/lib/reviewFolder/cloud';
export {
  applyAnswerHistoryToReviewFolder,
  type AnswerLike,
} from '@/lib/reviewFolder/fromAnswers';
