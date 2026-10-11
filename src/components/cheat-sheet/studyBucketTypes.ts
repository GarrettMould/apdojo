export const STUDY_BUCKET_MIME = 'application/x-apdojo-study-bucket';

export type StudyBucketTermItem = {
  kind: 'term';
  id: string;
  label: string;
};

export type StudyBucketLessonItem = {
  kind: 'lesson';
  lessonId: string;
  label: string;
  termIds: string[];
  termLabels: string[];
};

export type StudyBucketItem = StudyBucketTermItem | StudyBucketLessonItem;

export function studyBucketItemKey(item: StudyBucketItem): string {
  return item.kind === 'term' ? `term:${item.id}` : `lesson:${item.lessonId}`;
}

export function setStudyBucketDragData(
  event: React.DragEvent,
  item: StudyBucketItem
): void {
  event.dataTransfer.setData(STUDY_BUCKET_MIME, JSON.stringify(item));
  event.dataTransfer.setData('text/plain', item.label);
  event.dataTransfer.effectAllowed = 'copy';
}

export function parseStudyBucketDragData(
  event: React.DragEvent
): StudyBucketItem | null {
  const raw = event.dataTransfer.getData(STUDY_BUCKET_MIME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StudyBucketItem;
    if (parsed?.kind === 'term' && parsed.id && parsed.label) return parsed;
    if (
      parsed?.kind === 'lesson' &&
      parsed.lessonId &&
      parsed.label &&
      Array.isArray(parsed.termIds)
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** Flatten bucket into unique term names for quiz generation. */
export function termNamesFromStudyBucket(items: StudyBucketItem[]): string[] {
  const names: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    if (item.kind === 'term') {
      if (!seen.has(item.label)) {
        seen.add(item.label);
        names.push(item.label);
      }
    } else {
      for (const label of item.termLabels) {
        if (!seen.has(label)) {
          seen.add(label);
          names.push(label);
        }
      }
    }
  }
  return names;
}

export function mergeStudyBucketItem(
  prev: StudyBucketItem[],
  next: StudyBucketItem
): StudyBucketItem[] {
  const key = studyBucketItemKey(next);
  if (prev.some((item) => studyBucketItemKey(item) === key)) return prev;
  // Drop individual terms that are already covered by a newly added lesson
  if (next.kind === 'lesson') {
    const termIdSet = new Set(next.termIds);
    const withoutCoveredTerms = prev.filter(
      (item) => !(item.kind === 'term' && termIdSet.has(item.id))
    );
    return [...withoutCoveredTerms, next];
  }
  // Skip term if already covered by a lesson in the bucket
  const coveredByLesson = prev.some(
    (item) => item.kind === 'lesson' && item.termIds.includes(next.id)
  );
  if (coveredByLesson) return prev;
  return [...prev, next];
}
