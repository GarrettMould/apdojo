/**
 * Shared look for the lesson pages: AP Dojo's heavy headline type and blue accent, with soft cards and
 * controls (like the homepage question card) rather than the bold outlined style.
 */

export const dojoPage = 'min-h-screen bg-slate-50 px-4 pb-28 pt-12 text-slate-900 sm:pt-16';

export const dojoCard = 'rounded-3xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]';

/** A clickable card that lifts slightly on hover. */
export const dojoCardLink =
  'rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:-translate-y-px hover:border-slate-300 hover:shadow-[0_6px_16px_-6px_rgba(15,23,42,0.15)]';

export const dojoTitle = 'text-4xl font-black tracking-tight text-slate-900 sm:text-5xl';

export const dojoSectionTitle = 'text-lg font-extrabold tracking-tight text-slate-900';

/** Small uppercase label, like "AP MACRO · UNIT 1" on the homepage question card. */
export const dojoLabel = 'text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500';

const dojoButtonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40';

export const dojoButtonPrimary = `${dojoButtonBase} bg-slate-900 text-white hover:bg-slate-800`;

export const dojoButtonSecondary = `${dojoButtonBase} border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50`;

export const dojoButtonAccent = `${dojoButtonBase} bg-blue-600 text-white hover:bg-blue-700`;

export const dojoInput =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100';
