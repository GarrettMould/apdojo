import type { Question } from '@/data/questionBanks/types';
import { getLessonLabel } from '@/lib/reviewFolder/labels';
import { rollupByLesson } from '@/lib/reviewFolder/store';
import type { ReviewFolderState } from '@/lib/reviewFolder/types';
import { getPacketKeyTermsForLesson } from '@/lib/practicePacket/terms';
import {
  PRACTICE_PACKET_MAX_CHAPTERS,
  type PracticePacket,
  type PracticePacketChapter,
} from '@/lib/practicePacket/types';

/**
 * Build a practice packet draft from review misses (no AI explainers / check quiz yet).
 * Pass `unitNumbers` to scope to selected units; defaults to all misses in state.
 */
export function assemblePracticePacket(
  reviewState: ReviewFolderState,
  subject: string,
  unitNumber: number,
  bankQuestions: Question[],
  unitNumbers?: number[]
): PracticePacket {
  const selectedUnits =
    unitNumbers && unitNumbers.length > 0
      ? [...new Set(unitNumbers.filter((n) => Number.isFinite(n) && n > 0))].sort(
          (a, b) => a - b
        )
      : null;

  const scopedState: ReviewFolderState = selectedUnits
    ? {
        ...reviewState,
        misses: reviewState.misses.filter((m) =>
          selectedUnits.includes(m.unitNumber)
        ),
      }
    : reviewState;

  const groups = rollupByLesson(scopedState, subject);
  const focusMap = groups.map((g) => ({
    lessonId: g.lessonId,
    lessonName: getLessonLabel(subject, g.lessonId),
    missCount: g.missCount,
  }));

  const byId = new Map(bankQuestions.map((q) => [q.id, q]));
  const top = groups
    .filter((g) => g.lessonId && g.lessonId !== 'unknown')
    .slice(0, PRACTICE_PACKET_MAX_CHAPTERS);

  const chapters: PracticePacketChapter[] = top.map((group) => {
    const selectedLetters: Record<number, string> = {};
    const missedQuestions: Question[] = [];

    for (const miss of group.misses) {
      const q = byId.get(miss.questionId);
      if (!q) continue;
      missedQuestions.push(q);
      if (miss.selectedLetter) {
        selectedLetters[miss.questionId] = miss.selectedLetter;
      }
    }

    const chapterUnit =
      group.misses.find((m) => typeof m.unitNumber === 'number')?.unitNumber ??
      unitNumber;

    return {
      lessonId: group.lessonId,
      lessonName: getLessonLabel(subject, group.lessonId),
      unitNumber: chapterUnit,
      missCount: group.missCount,
      keyTerms: getPacketKeyTermsForLesson(subject, chapterUnit, group.lessonId),
      missedQuestions,
      selectedLetters,
      explainer: null,
      checkQuestions: [],
    };
  });

  const packetUnits =
    selectedUnits ??
    [
      ...new Set(
        chapters.map((ch) => ch.unitNumber).filter((n) => Number.isFinite(n) && n > 0)
      ),
    ].sort((a, b) => a - b);

  return {
    subject,
    unitNumber: packetUnits[0] ?? unitNumber,
    unitNumbers: packetUnits.length > 0 ? packetUnits : [unitNumber],
    focusMap,
    chapters,
    builtAt: Date.now(),
  };
}
