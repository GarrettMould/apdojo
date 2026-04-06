'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCourseContext } from '@/contexts/CourseContext';
import { macroUnits, microUnits } from '@/data/cheatSheets';
import { getBundlesForSubject, BundleWithScenarios } from '@/data/graphGymBundles';

// ---------------------------------------------------------------------------
// Accent colour → Tailwind classes
// ---------------------------------------------------------------------------

const ACCENT_BG: Record<string, string> = {
  blue:   'bg-blue-100 border-blue-400',
  green:  'bg-green-100 border-green-400',
  yellow: 'bg-yellow-100 border-yellow-400',
  orange: 'bg-orange-100 border-orange-400',
  red:    'bg-red-100 border-red-400',
  purple: 'bg-purple-100 border-purple-400',
  pink:   'bg-pink-100 border-pink-400',
  teal:   'bg-teal-100 border-teal-400',
};

const ACCENT_TEXT: Record<string, string> = {
  blue:   'text-blue-700',
  green:  'text-green-700',
  yellow: 'text-yellow-700',
  orange: 'text-orange-700',
  red:    'text-red-700',
  purple: 'text-purple-700',
  pink:   'text-pink-700',
  teal:   'text-teal-700',
};

// ---------------------------------------------------------------------------
// BundleCard
// ---------------------------------------------------------------------------

function BundleCard({ item }: { item: BundleWithScenarios }) {
  const { bundle, scenarios, thumbnailUrl } = item;
  const accentBg = ACCENT_BG[bundle.accentColor] ?? 'bg-gray-100 border-gray-400';
  const accentText = ACCENT_TEXT[bundle.accentColor] ?? 'text-gray-700';

  return (
    <Link
      href={`/graph-gym/topic/${bundle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Thumbnail — image inset so it reads smaller inside the frame */}
      <div className="relative w-full overflow-hidden bg-white border-b-4 border-black" style={{ aspectRatio: '7/5' }}>
        {thumbnailUrl ? (
          <div className="absolute inset-3 sm:inset-4">
            <Image
              src={thumbnailUrl}
              alt={bundle.label}
              fill
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className={`h-full w-full flex items-center justify-center ${accentBg}`}>
            <span className={`text-4xl font-black ${accentText}`}>?</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-black text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
          {bundle.label}
        </h3>
        <p className="text-xs text-gray-500 font-medium leading-snug line-clamp-2">
          {bundle.description}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1 rounded-lg border-2 px-2 py-0.5 text-[11px] font-black ${accentBg} ${accentText}`}>
            {scenarios.length} {scenarios.length === 1 ? 'graph' : 'graphs'}
          </span>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

interface GraphGymDashboardProps {
  // kept for backwards compatibility — no longer used internally for navigation
  onSelectScenario?: (id: string) => void;
}

export function GraphGymDashboard({ onSelectScenario: _onSelectScenario }: GraphGymDashboardProps) {
  const { currentCourse } = useCourseContext();

  const bundles = useMemo(
    () => getBundlesForSubject(currentCourse),
    [currentCourse],
  );

  // Group bundles by unit
  const byUnit = useMemo(() => {
    const map = new Map<number, BundleWithScenarios[]>();
    for (const item of bundles) {
      const list = map.get(item.bundle.unit) ?? [];
      list.push(item);
      map.set(item.bundle.unit, list);
    }
    return map;
  }, [bundles]);

  const unitNumbers = useMemo(
    () => Array.from(byUnit.keys()).sort((a, b) => a - b),
    [byUnit],
  );

  const unitsWithTitles = useMemo(() => {
    const units = currentCourse === 'macro' ? macroUnits : microUnits;
    return unitNumbers
      .map((num) => units.find((u) => u.number === num))
      .filter(Boolean) as Array<{ number: number; title: string }>;
  }, [currentCourse, unitNumbers]);

  const FEATURED_IDS: Record<'macro' | 'micro', string[]> = {
    macro: ['macro-ad-as', 'macro-phillips', 'macro-ample-reserves'],
    micro: ['micro-monopoly', 'micro-perfect-competition', 'micro-externalities'],
  };

  const featuredBundles = useMemo(() => {
    const ids = FEATURED_IDS[currentCourse];
    return ids.map((id) => bundles.find((b) => b.bundle.id === id)).filter(Boolean) as BundleWithScenarios[];
  }, [bundles, currentCourse]);

  return (
    <div className="min-h-0 w-full overflow-auto bg-gray-50">
      <main className="px-4 py-12">
        <div className="mx-auto max-w-[960px]">

          {/* ── Feature Preview ─────────────────────────────────────── */}
          <section className="mb-20 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">

            {/* Left — copy */}
            <div className="lg:w-[340px] flex-shrink-0">
              <span className="inline-block text-[11px] font-black uppercase tracking-[0.18em] text-blue-600 border-2 border-blue-600 rounded-full px-3 py-1 mb-5">
                How it works
              </span>

              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
              Graph Gym
            </h1>
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
                The only AP Econ tool that makes you <em>draw</em> the graphs — just like the real FRQ section. No multiple choice. No shortcuts.
              </p>

              {/* Steps */}
              <ol className="space-y-5">
                {([
                  {
                    n: '1',
                    title: 'Pick a graph scenario',
                    desc: '90+ prompts covering every AP Macro and Micro graph the exam can throw at you.',
                  },
                  {
                    n: '2',
                    title: 'Draw it from scratch',
                    desc: 'Use the whiteboard to sketch curves, labels, and shifts — exactly as you would on paper.',
                  },
                  {
                    n: '3',
                    title: 'Self-grade with the rubric',
                    desc: 'Reveal the sample answer and check off each AP-style rubric item to find exactly what to fix.',
                  },
                ] as const).map((step) => (
                  <li key={step.n} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-xl border-2 border-black bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                      {step.n}
                    </span>
                    <div>
                      <p className="font-black text-gray-900 text-sm leading-snug">{step.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right — overlapping visual (desktop) */}
            <div className="flex-1 min-w-0">
              {/* Desktop: overlapping video + sidebar */}
              <div className="hidden sm:block relative h-[420px] overflow-visible">
                {/* Video — bottom-left, ~78% width */}
                <div className="absolute bottom-0 left-0 w-[78%] rounded-2xl border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <video
                    src="https://apdojovideos.s3.ap-southeast-2.amazonaws.com/prev_final.mov"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full block"
                  />
                </div>

                {/* Sidebar card — floats above, pushed left into the video */}
                <div className="absolute -top-2 right-[22%] sm:-top-3 sm:right-[24%] w-[185px] bg-white rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10">
                  <div className="p-2 border-b-2 border-black">
                    <p className="text-[8px] font-black uppercase tracking-widest text-black mb-1.5">Sample Answer</p>
                    <img
                      src="https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb15.jpg"
                      alt="Loanable funds sample answer"
                      className="w-full rounded-md border-2 border-black"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-black mb-1.5">Self-Correction Checklist</p>
                    <div className="space-y-1">
                      {[
                        'Demand for loanable funds shifts right',
                        'Real Interest Rate increases',
                        'Quantity of loanable funds increases',
                        'Axes are labeled correctly',
                      ].map((text, i) => (
                        <div key={i} className="flex items-start gap-1.5 p-1.5 rounded-md border-2 border-black bg-green-50">
                          <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] font-semibold text-black leading-snug">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: stacked */}
              <div className="sm:hidden space-y-4">
                <div className="rounded-2xl border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <video
                    src="https://apdojovideos.s3.ap-southeast-2.amazonaws.com/prev_final.mov"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full block"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* ── / Feature Preview ────────────────────────────────────── */}

          {/* ── Featured bundles ────────────────────────────────────── */}
          {featuredBundles.length > 0 && (
            <section className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-2xl font-black text-gray-900">Start Here</h2>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 border-2 border-blue-600 rounded-full px-2.5 py-0.5">
                  Most tested
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {featuredBundles.map((item) => (
                  <BundleCard key={item.bundle.id} item={item} />
                ))}
              </div>
            </section>
          )}
          {/* ── / Featured bundles ───────────────────────────────────── */}

          {/* Units */}
          <div className="space-y-14">
            {unitsWithTitles.map((unit) => {
              const items = byUnit.get(unit.number) ?? [];
              if (items.length === 0) return null;
              return (
                <section key={unit.number}>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 pt-4 border-t-4 border-black">
                    Unit {unit.number}: {unit.title}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {items.map((item) => (
                      <BundleCard key={item.bundle.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {unitNumbers.length === 0 && (
            <p className="py-12 text-center text-gray-500 text-lg">
              No scenarios found for this subject.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
