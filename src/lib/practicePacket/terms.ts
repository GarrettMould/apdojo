import { keyTerms as apGovTerms } from '@/data/apGovTerms';
import { keyTerms as apStatsTerms } from '@/data/apStatsTerms';
import { keyTerms as apMacroTerms } from '@/data/apMacroTerms';
import { keyTerms as apMicroTerms } from '@/data/apMicroTerms';
import type { KeyTerm } from '@/data/allContent';
import type { PacketKeyTerm } from '@/lib/practicePacket/types';
import { PRACTICE_PACKET_MAX_TERMS } from '@/lib/practicePacket/types';

function termsForSubject(subject: string): KeyTerm[] {
  if (subject === 'gov' || subject === 'ap_us_government') return apGovTerms;
  if (subject === 'stats' || subject === 'ap_statistics') return apStatsTerms;
  if (subject === 'macro' || subject === 'ap_macroeconomics') return apMacroTerms;
  if (subject === 'micro' || subject === 'ap_microeconomics') return apMicroTerms;
  return [];
}

/** Curated key terms for a CED lesson. Caps at MAX_TERMS. */
export function getPacketKeyTermsForLesson(
  subject: string,
  unitNumber: number,
  lessonId: string
): PacketKeyTerm[] {
  const terms = termsForSubject(subject)
    .filter(
      (t) =>
        t.unit === unitNumber &&
        Array.isArray(t.lessonIDs) &&
        t.lessonIDs.includes(lessonId)
    )
    .map((t) => ({ term: t.term, definition: t.definition }));

  const seen = new Set<string>();
  const unique: PacketKeyTerm[] = [];
  for (const t of terms) {
    const key = t.term.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(t);
    if (unique.length >= PRACTICE_PACKET_MAX_TERMS) break;
  }
  return unique;
}
