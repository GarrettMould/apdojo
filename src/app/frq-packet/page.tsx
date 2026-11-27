'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, Loader2, Lock, Printer } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';
import { macroUnits, microUnits } from '@/data/cheatSheets';
import { courseFrqs, frqHasGraph, type FrqCourse } from '@/lib/frqSet';
import { FrqPacketPages } from '@/components/frq/FrqPacketPages';
import { SeasonPassModal } from '@/components/SeasonPassModal';
import { LoginModal, SignupModal } from '@/components/AuthModals';

/**
 * The printable FRQ packet. Season Pass holders get the print toolbar and the full booklet; everyone else
 * sees what's inside, a preview of real pages, and the Season Pass offer (nothing printable).
 */
function FrqPacketContent() {
  const params = useSearchParams();
  const { user, userData, loading, selectedSubject } = useAuthContext();
  const paramCourse = params.get('course');
  const course: FrqCourse =
    paramCourse === 'macro' || paramCourse === 'micro' ? paramCourse : selectedSubject === 'micro' ? 'micro' : 'macro';

  const all = useMemo(() => courseFrqs(course), [course]);
  const units = (course === 'macro' ? macroUnits : microUnits).filter((u) => all.some((q) => q.unit === u.number));
  const [unit, setUnit] = useState<number | 'all'>('all');
  const [includeKey, setIncludeKey] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const isPro = Boolean(user && userData && hasValidSeasonPass(userData, course));
  const questions = unit === 'all' ? all : all.filter((q) => q.unit === unit);
  const scopeLabel = unit === 'all' ? 'All units' : `Unit ${unit}`;
  const courseName = course === 'macro' ? 'AP Macro' : 'AP Micro';

  const modals = (
    <>
      {showPass ? <SeasonPassModal subject={course} onClose={() => setShowPass(false)} /> : null}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        switchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        onAuthSuccess={() => setShowLogin(false)}
      />
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        switchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
        onAuthSuccess={() => setShowSignup(false)}
      />
    </>
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading…
      </div>
    );
  }

  // Not a Season Pass holder: what's inside, a preview, and the offer. Printing shows a note instead.
  if (!isPro) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 pb-24 pt-10 sm:pt-14">
        {modals}
        <div className="mx-auto grid max-w-5xl gap-10 print:hidden lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="flex flex-col gap-5">
            <Link href="/unitFRQpracticePage" className="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" aria-hidden /> FRQ practice
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Season Pass</p>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">The {courseName} FRQ packet</h1>
            <p className="text-lg leading-relaxed text-gray-600">
              All {all.length} practice FRQs as one print-ready booklet, laid out like the real exam. Sit down with a
              pencil, time yourself, and grade it with the scoring guide.
            </p>
            <ul className="flex flex-col gap-2.5 text-[15px] text-gray-800">
              {[
                `${all.length} FRQs across ${units.length} units, one per page`,
                `Lined answer space, plus blank graph frames for the ${all.filter(frqHasGraph).length} graphing questions`,
                'Scoring guides at the back with model answers and point values',
                'Print the whole set or one unit at a time',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPass(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-base font-bold text-white transition hover:bg-gray-800"
              >
                <Lock className="h-4 w-4" aria-hidden /> Get the Season Pass
              </button>
              {!user ? (
                <button type="button" onClick={() => setShowLogin(true)} className="text-sm font-bold text-gray-600 hover:text-gray-900">
                  Already have it? Log in
                </button>
              ) : null}
            </div>
            <p className="text-sm text-gray-500">Teachers: one packet covers a whole unit of free-response practice for your class.</p>
          </div>

          {/* Preview: the cover and first question, faded out */}
          <div className="relative max-h-[560px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-4" aria-label="Preview of the packet">
            <div className="pointer-events-none origin-top-left scale-[0.62] select-none" style={{ width: '161.3%' }}>
              <FrqPacketPages course={course} questions={all.slice(0, 2)} scopeLabel="All units" includeScoringGuide={false} coverCount={all.length} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-100 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">Preview</span>
          </div>
        </div>
        <div className="hidden px-10 py-24 text-center font-serif print:block">
          <p className="text-2xl font-bold">The FRQ packet is included with the AP Dojo Season Pass.</p>
          <p className="mt-3 text-lg">apdojo.com</p>
        </div>
      </div>
    );
  }

  return (
    <div className="frq-packet-print min-h-screen bg-gray-100 px-4 pb-24 pt-6 print:bg-white print:p-0">
      {/* Print only the booklet: no site header, footer or toolbar, letter-size pages */}
      <style>{`@media print {
        @page { size: letter; margin: 0.6in; }
        body * { visibility: hidden; }
        .frq-packet-print, .frq-packet-print * { visibility: visible; }
        .frq-packet-print { position: absolute; inset: 0 auto auto 0; width: 100%; }
      }`}</style>
      {modals}
      <div className="sticky top-20 z-10 mx-auto mb-6 flex max-w-[8.5in] flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-sm backdrop-blur print:hidden">
        <Link href="/unitFRQpracticePage" className="inline-flex items-center gap-1.5 px-1 text-sm font-bold text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" aria-hidden /> FRQs
        </Link>
        <span className="text-sm font-black text-gray-900">{courseName} FRQ packet</span>
        <select
          id="packet-unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="ml-auto rounded-lg border border-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-800"
          aria-label="Which questions"
        >
          <option value="all">All units ({all.length} FRQs)</option>
          {units.map((u) => (
            <option key={u.number} value={u.number}>
              Unit {u.number} ({all.filter((q) => q.unit === u.number).length})
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <input id="packet-key" type="checkbox" checked={includeKey} onChange={(e) => setIncludeKey(e.target.checked)} className="h-4 w-4" />
          Scoring guides
        </label>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          <Printer className="h-4 w-4" aria-hidden /> Print
        </button>
      </div>
      <FrqPacketPages course={course} questions={questions} scopeLabel={scopeLabel} includeScoringGuide={includeKey} />
    </div>
  );
}

export default function FrqPacketPage() {
  return (
    <Suspense fallback={null}>
      <FrqPacketContent />
    </Suspense>
  );
}
