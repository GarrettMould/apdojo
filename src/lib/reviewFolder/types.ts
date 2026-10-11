export type ReviewMiss = {
  questionId: number;
  subject: string;
  unitNumber: number;
  lessonIDS: string[];
  selectedLetter?: string;
  /** Short stem for list display (not full question HTML). */
  questionPreview: string;
  missedAt: number;
};

export type ReviewFolderState = {
  version: 1;
  misses: ReviewMiss[];
  /** Correct answers on related lessons — used to soft-graduate. */
  lessonWarmth: Record<string, number>;
};

export type ReviewLessonGroup = {
  lessonId: string;
  label: string;
  missCount: number;
  misses: ReviewMiss[];
};
