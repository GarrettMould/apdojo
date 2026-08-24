/**
 * Gemini model picks for `/api/cheat-sheet-chat`.
 * See `SCOTUS_FULL_GRADE.md` for the SCOTUS full-grade path.
 *
 * - Tutor / coach / part_check → `GEMINI_TUTOR_CHAT_MODEL` (`gemini-2.5-flash-lite`)
 * - SCOTUS `full_grade` + FRQ tutor → `GEMINI_REASONING_MODEL` (`gemini-3.5-flash`)
 *
 * Do not use `gemini-2.5-flash` (blocked for new API keys → 404).
 */

/** Unit cheat-sheet tutor, MCQ coach, light back-and-forth (no thinking by default). */
export const GEMINI_TUTOR_CHAT_MODEL = 'gemini-2.5-flash-lite';

/** FRQ walkthrough, SCOTUS full_grade, and other heavier reasoning. */
export const GEMINI_REASONING_MODEL = 'gemini-3.5-flash';

export function geminiModelForCheatSheetChat(opts: {
  mode: 'default' | 'scotus_essay';
  scotusEssayIntent: 'coach' | 'part_check' | 'full_grade';
  hasMcqContext: boolean;
  hasFrqContext: boolean;
}): string {
  if (opts.mode === 'scotus_essay' && opts.scotusEssayIntent === 'full_grade') {
    return GEMINI_REASONING_MODEL;
  }
  if (opts.hasFrqContext) {
    return GEMINI_REASONING_MODEL;
  }
  return GEMINI_TUTOR_CHAT_MODEL;
}
