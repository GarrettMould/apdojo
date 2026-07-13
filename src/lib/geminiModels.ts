/**
 * Gemini model picks for `/api/cheat-sheet-chat`.
 * `gemini-2.0-flash` was retired June 2026; use 2.5 Flash-Lite for cheap tutor chat.
 */

/** Unit cheat-sheet tutor, MCQ coach, light back-and-forth (no thinking by default). */
export const GEMINI_TUTOR_CHAT_MODEL = 'gemini-2.5-flash-lite';

/** FRQ walkthrough, SCOTUS grading, and other heavier reasoning. */
export const GEMINI_REASONING_MODEL = 'gemini-2.5-flash';

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
