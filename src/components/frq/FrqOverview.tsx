'use client';

import Link from 'next/link';
import { ArrowRight, Lock, PenLine, Printer, TrendingUp } from 'lucide-react';
import { macroUnits, microUnits } from '@/data/cheatSheets';
import { frqHasGraph, frqShortTitle, frqTotalPoints, type CourseFrq, type FrqCourse } from '@/lib/frqSet';

const COURSE_NAMES: Record<FrqCourse, string> = { macro: 'AP Macroeconomics', micro: 'AP Microeconomics' };

/**
 * The FRQ practice welcome page: what's in the set, a quick start, the printable packet, and every FRQ
 * grouped by unit. Opening an FRQ (or a locked one) is handled by the practice page.
 */
export function FrqOverview({
  course,
  questions,
  isPro,
  isLocked,
  onOpen,
  onLocked,
}: {
  course: FrqCourse;
  questions: CourseFrq[];
  isPro: boolean;
  isLocked: (q: CourseFrq) => boolean;
  onOpen: (q: CourseFrq) => void;
  onLocked: () => void;
}) {
  const units = (course === 'macro' ? macroUnits : microUnits).filter((u) => questions.some((q) => q.unit === u.number));
  const firstOpen = questions.find((q) => !isLocked(q));
  const freeCount = questions.filter((q) => !isLocked(q)).length;
  const graphCount = questions.filter(frqHasGraph).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">{COURSE_NAMES[course]}</p>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">FRQ Practice</h1>
          <p className="text-lg leading-relaxed text-gray-600">
            {questions.length} free-response questions in AP exam format, organized by unit. Work through each part,
            draw the graphs, and check yourself against the scoring guide.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-gray-500">
            <span>{questions.length} FRQs</span>
            <span>{units.length} units</span>
            <span>{graphCount} with graphs</span>
            {!isPro ? <span className="text-emerald-700">{freeCount} free to try</span> : null}
          </p>
        </div>
        {firstOpen ? (
          <button
            type="button"
            onClick={() => onOpen(firstOpen)}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-gray-900 px-6 py-3.5 text-base font-bold text-white transition hover:bg-gray-800 lg:self-auto"
          >
            {isPro ? 'Start with Unit 1' : 'Start a free FRQ'}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
      </header>

      {/* The printable packet: a Season Pass feature, shown to everyone */}
      <Link
        href={`/frq-packet?course=${course}`}
        className="group flex flex-col gap-5 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-5 transition hover:border-gray-300 sm:flex-row sm:items-center sm:p-6"
      >
        <PacketThumbnail course={course} />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
            <Printer className="h-4 w-4" aria-hidden /> Printable FRQ packet
          </p>
          <p className="text-xl font-black tracking-tight text-gray-900">All {questions.length} FRQs, ready to print</p>
          <p className="text-[15px] leading-relaxed text-gray-600">
            A booklet like the real exam: one FRQ per page, lined answer space, blank graph frames, and scoring guides at
            the back. Great for timed practice on paper, or for teachers.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-800 transition group-hover:border-gray-900 sm:self-center">
          {isPro ? 'Open the packet' : (
            <>
              <Lock className="h-4 w-4" aria-hidden /> Season Pass
            </>
          )}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>

      <div className="flex flex-col gap-8">
        {units.map((unit) => (
          <section key={unit.number} aria-labelledby={`frq-unit-${unit.number}`} className="flex flex-col gap-3">
            <h2 id={`frq-unit-${unit.number}`} className="text-lg font-black text-gray-900">
              <span className="text-gray-400">Unit {unit.number}</span> · {unit.title}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {questions
                .filter((q) => q.unit === unit.number)
                .map((q) => {
                  const locked = isLocked(q);
                  return (
                    <li key={q.id}>
                      <button
                        type="button"
                        onClick={() => (locked ? onLocked() : onOpen(q))}
                        className="flex h-full w-full flex-col gap-3 rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-gray-300"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-bold leading-snug text-gray-900">{frqShortTitle(q.title)}</span>
                          {locked ? (
                            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-label="Season Pass" />
                          ) : !isPro ? (
                            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">Free</span>
                          ) : null}
                        </span>
                        <span className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <PenLine className="h-3.5 w-3.5" aria-hidden /> {frqTotalPoints(q)} points
                          </span>
                          {frqHasGraph(q) ? (
                            <span className="inline-flex items-center gap-1">
                              <TrendingUp className="h-3.5 w-3.5" aria-hidden /> Graph
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/** A small drawing of the packet's pages: cover in front, an FRQ page with lines and a graph frame behind. */
function PacketThumbnail({ course }: { course: FrqCourse }) {
  return (
    <div className="relative h-28 w-32 shrink-0" aria-hidden>
      <div className="absolute left-6 top-0 flex h-28 w-20 flex-col gap-1.5 rounded-sm border border-gray-300 bg-white p-2 shadow-sm">
        <span className="h-1 w-10 rounded bg-gray-300" />
        <span className="h-8 w-full rounded-[2px] border border-gray-400" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-px w-full bg-gray-300" />
        ))}
      </div>
      <div className="absolute left-0 top-3 flex h-28 w-20 flex-col items-center justify-center gap-1 rounded-sm border border-gray-800 bg-white p-2 font-serif shadow-md">
        <span className="text-[9px] font-bold uppercase tracking-wide text-gray-800">AP {course === 'macro' ? 'Macro' : 'Micro'}</span>
        <span className="text-center text-[8px] leading-tight text-gray-600">Free-Response Practice</span>
        <span className="mt-1 h-px w-10 bg-gray-800" />
      </div>
    </div>
  );
}
