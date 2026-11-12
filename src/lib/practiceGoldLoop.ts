/**
 * Golden questions and redemption rounds in MCQ practice.
 *
 * Free users: the 3rd free question each day is golden. Answer it right to unlock bonus free
 * questions for the day; miss it and it comes back tomorrow as that day's golden question.
 * Season Pass users: a question missed in a session comes back a few questions later as a
 * redemption round. Questions already in the review folder show as redemption rounds for everyone.
 *
 * All state lives in localStorage, like the daily free-answer count it extends.
 */

export const GOLD_BONUS_QUESTIONS = 3;
/** Free users' golden question is always this question of the day (the last of the 3 free ones). */
export const GOLD_FREE_QUESTION_NUMBER = 3;
/** A missed question comes back this many questions later (inclusive range). */
const REDEMPTION_GAP_MIN = 5;
const REDEMPTION_GAP_MAX = 8;

export type GoldDay = {
  date: string;
  /** Today's golden question has been answered (one per day for free users). */
  answered: boolean;
  /** Extra free answers unlocked today. */
  bonus: number;
};

export type GoldRedeem = {
  questionId: number;
  /** Local date the question was missed; it becomes golden from the next day. */
  savedOn: string;
};

export type GoldSlotKind = 'gold' | 'goldRedeem' | 'redeem';

export function localDateKey(d = new Date()): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the loop just doesn't persist */
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

const dayKey = (uid: string | null | undefined) => `apdojo_gold_day_v1:${uid ?? 'guest'}`;
const redeemKey = (uid: string | null | undefined, subject: string) =>
  `apdojo_gold_redeem_v1:${uid ?? 'guest'}:${subject}`;

export function readGoldDay(uid: string | null | undefined): GoldDay {
  const today = localDateKey();
  const saved = typeof window === 'undefined' ? null : readJson<GoldDay>(dayKey(uid));
  if (!saved || saved.date !== today) return { date: today, answered: false, bonus: 0 };
  return { date: today, answered: Boolean(saved.answered), bonus: Math.max(0, Number(saved.bonus) || 0) };
}

/** Records today's golden question as answered, adding the bonus when it was right. */
export function recordGoldAnswer(uid: string | null | undefined, correct: boolean): GoldDay {
  const day = readGoldDay(uid);
  const next: GoldDay = { ...day, answered: true, bonus: day.bonus + (correct ? GOLD_BONUS_QUESTIONS : 0) };
  writeJson(dayKey(uid), next);
  return next;
}

/** A missed golden question waiting to come back, once a day has passed. */
export function readGoldRedeem(uid: string | null | undefined, subject: string): GoldRedeem | null {
  if (typeof window === 'undefined') return null;
  const saved = readJson<GoldRedeem>(redeemKey(uid, subject));
  return saved && Number.isFinite(saved.questionId) ? saved : null;
}

export function saveGoldRedeem(uid: string | null | undefined, subject: string, questionId: number) {
  writeJson(redeemKey(uid, subject), { questionId, savedOn: localDateKey() } satisfies GoldRedeem);
}

export function clearGoldRedeem(uid: string | null | undefined, subject: string) {
  removeKey(redeemKey(uid, subject));
}

function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Index to re-insert a missed question at, a few questions after the current one. */
export function redemptionInsertIndex(currentIndex: number, setLength: number): number {
  return Math.min(currentIndex + randomInt(REDEMPTION_GAP_MIN, REDEMPTION_GAP_MAX), setLength);
}

/** Shifts slot indices at or after `at` up by one, after a question is inserted there. */
export function shiftSlots<T>(slots: Record<number, T>, at: number): Record<number, T> {
  const next: Record<number, T> = {};
  for (const [key, value] of Object.entries(slots)) {
    const index = Number(key);
    next[index >= at ? index + 1 : index] = value;
  }
  return next;
}
