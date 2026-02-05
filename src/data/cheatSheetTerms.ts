import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as apMicroTerms } from '@/data/apMicroTerms';

export interface CheatSheetKeyTerm {
  term: string;
  definition: string;
}

/**
 * Returns key terms from the unit cheat sheet for a given subject, unit, and lesson.
 * Used by deep dive pages to show the same flip-card terms students see on the cheat sheet.
 */
export function getKeyTermsForLesson(
  subject: 'macro' | 'micro',
  unit: number,
  lessonId: string
): CheatSheetKeyTerm[] {
  const terms = subject === 'macro' ? apMacroTerms : apMicroTerms;
  return terms
    .filter(
      (t) => t.unit === unit && t.lessonIDs && t.lessonIDs.includes(lessonId)
    )
    .map((t) => ({ term: t.term, definition: t.definition }));
}
