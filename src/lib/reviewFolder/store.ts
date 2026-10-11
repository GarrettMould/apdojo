import { formatLessonHeading } from '@/lib/reviewFolder/labels';
import type {
  ReviewFolderState,
  ReviewLessonGroup,
  ReviewMiss,
} from '@/lib/reviewFolder/types';

const STORAGE_PREFIX = 'apdojo:reviewFolder';
const WARMTH_TO_CLEAR = 2;

function emptyState(): ReviewFolderState {
  return { version: 1, misses: [], lessonWarmth: {} };
}

export function reviewFolderStorageKey(
  userKey: string,
  subject: string,
  unitNumber: number
): string {
  return `${STORAGE_PREFIX}:${userKey}:${subject}:${unitNumber}`;
}

export function previewFromQuestion(text: string, maxLen = 110): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return cleaned;
  return `${cleaned.slice(0, maxLen - 1)}…`;
}

export function loadReviewFolder(
  userKey: string,
  subject: string,
  unitNumber: number
): ReviewFolderState {
  if (typeof window === 'undefined') return emptyState();
  try {
    const raw = localStorage.getItem(
      reviewFolderStorageKey(userKey, subject, unitNumber)
    );
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as ReviewFolderState;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.misses)) {
      return emptyState();
    }
    return {
      version: 1,
      misses: parsed.misses,
      lessonWarmth: parsed.lessonWarmth ?? {},
    };
  } catch {
    return emptyState();
  }
}

export function saveReviewFolder(
  userKey: string,
  subject: string,
  unitNumber: number,
  state: ReviewFolderState
): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    reviewFolderStorageKey(userKey, subject, unitNumber),
    JSON.stringify(state)
  );
}

export function recordMiss(
  state: ReviewFolderState,
  miss: Omit<ReviewMiss, 'missedAt'> & { missedAt?: number }
): ReviewFolderState {
  const nextMiss: ReviewMiss = {
    ...miss,
    missedAt: miss.missedAt ?? Date.now(),
    lessonIDS: miss.lessonIDS?.length ? miss.lessonIDS : ['unknown'],
  };
  const without = state.misses.filter((m) => m.questionId !== nextMiss.questionId);
  return {
    ...state,
    misses: [nextMiss, ...without],
  };
}

/**
 * On a correct answer: remove that question from the folder if present,
 * and bump warmth on its lessons. After enough warmth with no remaining
 * misses for a lesson, clear that lesson's warmth counter.
 */
export function recordCorrect(
  state: ReviewFolderState,
  questionId: number,
  lessonIDS: string[]
): ReviewFolderState {
  const wasMissed = state.misses.some((m) => m.questionId === questionId);
  let misses = state.misses.filter((m) => m.questionId !== questionId);
  const lessonWarmth = { ...state.lessonWarmth };

  const lessons = lessonIDS?.length ? lessonIDS : [];
  for (const lessonId of lessons) {
    const remainingForLesson = misses.some((m) =>
      m.lessonIDS.includes(lessonId)
    );
    if (wasMissed || remainingForLesson) {
      lessonWarmth[lessonId] = (lessonWarmth[lessonId] ?? 0) + 1;
    }
    if (
      !remainingForLesson &&
      (lessonWarmth[lessonId] ?? 0) >= WARMTH_TO_CLEAR
    ) {
      delete lessonWarmth[lessonId];
    }
  }

  return { ...state, misses, lessonWarmth };
}

export function removeMiss(
  state: ReviewFolderState,
  questionId: number
): ReviewFolderState {
  return {
    ...state,
    misses: state.misses.filter((m) => m.questionId !== questionId),
  };
}

export function clearReviewFolder(): ReviewFolderState {
  return emptyState();
}

/** Merge per-unit folders into one view (e.g. custom multi-unit practice). */
export function mergeReviewFolderStates(
  states: ReviewFolderState[]
): ReviewFolderState {
  const byQuestion = new Map<number, ReviewMiss>();
  const lessonWarmth: Record<string, number> = {};

  for (const state of states) {
    for (const miss of state.misses) {
      const existing = byQuestion.get(miss.questionId);
      if (!existing || miss.missedAt >= existing.missedAt) {
        byQuestion.set(miss.questionId, miss);
      }
    }
    for (const [lessonId, warmth] of Object.entries(state.lessonWarmth ?? {})) {
      lessonWarmth[lessonId] = Math.max(lessonWarmth[lessonId] ?? 0, warmth);
    }
  }

  const misses = [...byQuestion.values()].sort((a, b) => b.missedAt - a.missedAt);
  return { version: 1, misses, lessonWarmth };
}

export function loadMergedReviewFolders(
  userKey: string,
  subject: string,
  unitNumbers: number[]
): ReviewFolderState {
  const units = [...new Set(unitNumbers.filter((n) => Number.isFinite(n) && n > 0))];
  if (units.length === 0) return emptyState();
  return mergeReviewFolderStates(
    units.map((unitNumber) => loadReviewFolder(userKey, subject, unitNumber))
  );
}

/** Group misses by primary lesson (first lessonIDS entry), weak topics first. */
export function rollupByLesson(
  state: ReviewFolderState,
  subject: string
): ReviewLessonGroup[] {
  const byLesson = new Map<string, ReviewMiss[]>();
  for (const miss of state.misses) {
    const lessonId = miss.lessonIDS[0] || 'unknown';
    const list = byLesson.get(lessonId) ?? [];
    list.push(miss);
    byLesson.set(lessonId, list);
  }

  const groups: ReviewLessonGroup[] = [];
  for (const [lessonId, misses] of byLesson) {
    misses.sort((a, b) => b.missedAt - a.missedAt);
    groups.push({
      lessonId,
      label: formatLessonHeading(subject, lessonId),
      missCount: misses.length,
      misses,
    });
  }

  groups.sort((a, b) => b.missCount - a.missCount || a.lessonId.localeCompare(b.lessonId));
  return groups;
}

export function uniqueLessonIds(state: ReviewFolderState): string[] {
  const ids = new Set<string>();
  for (const miss of state.misses) {
    for (const id of miss.lessonIDS) ids.add(id);
  }
  return [...ids];
}

export function missedQuestionIds(state: ReviewFolderState): number[] {
  return state.misses.map((m) => m.questionId);
}

/** Keep only misses that belong to this course subject. */
export function filterReviewFolderBySubject(
  state: ReviewFolderState,
  subject: string,
  bankQuestions?: { id: number; subject: string | string[] }[]
): ReviewFolderState {
  const subjectTag =
    subject === 'gov'
      ? 'ap_us_government'
      : subject === 'stats'
        ? 'ap_statistics'
        : subject === 'micro'
          ? 'ap_microeconomics'
          : subject === 'macro'
            ? 'ap_macroeconomics'
            : subject;

  return {
    ...state,
    misses: state.misses.filter((m) => {
      if (m.subject === subject || m.subject === subjectTag) return true;
      if (m.subject) return false;
      if (!bankQuestions?.length) return false;
      const q = bankQuestions.find((bq) => bq.id === m.questionId);
      if (!q?.subject) return false;
      const tags = Array.isArray(q.subject) ? q.subject : [q.subject];
      return tags.includes(subjectTag);
    }),
  };
}
