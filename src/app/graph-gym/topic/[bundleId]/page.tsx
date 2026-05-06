'use client';

import { Suspense, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, LineChart, Loader2 } from 'lucide-react';
import { CourseProvider } from '@/contexts/CourseContext';
import { getBundleById, GRAPH_GYM_BUNDLES } from '@/data/graphGymBundles';
import { GraphGymScenario } from '@/data/graphGymScenarios';
import { getSlugForScenario } from '@/lib/graphGymSlugs';

// ---------------------------------------------------------------------------
// Difficulty badge
// ---------------------------------------------------------------------------

const DIFFICULTY_STYLES: Record<string, string> = {
  easy:   'bg-emerald-50 border-emerald-200 text-emerald-900',
  medium: 'bg-slate-50 border-slate-200 text-slate-800',
  hard:   'bg-rose-50 border-rose-200 text-rose-900',
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy:   'Beginner',
  medium: 'Intermediate',
  hard:   'Advanced',
};

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls = DIFFICULTY_STYLES[difficulty] ?? 'bg-muted border-border text-gray-800';
  const label = DIFFICULTY_LABEL[difficulty] ?? difficulty;
  return (
    <span className={`inline-flex items-center rounded border-2 px-1.5 py-0.5 text-[10px] font-black leading-tight ${cls}`}>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Thumbnail color palette — cycles per card index
// ---------------------------------------------------------------------------

/** Really light washes + matching soft icon tint (cycles per card) */
const THUMB_PALETTES: { bg: string; icon: string }[] = [
  { bg: 'bg-sky-50', icon: 'text-sky-400/65' },
  { bg: 'bg-violet-50', icon: 'text-violet-400/60' },
  { bg: 'bg-emerald-50', icon: 'text-emerald-400/60' },
  { bg: 'bg-amber-50', icon: 'text-amber-400/70' },
  { bg: 'bg-rose-50', icon: 'text-rose-400/55' },
  { bg: 'bg-blue-50', icon: 'text-blue-400/55' },
  { bg: 'bg-teal-50', icon: 'text-teal-400/60' },
  { bg: 'bg-indigo-50', icon: 'text-indigo-400/55' },
];

// ---------------------------------------------------------------------------
// Scenario card inside the collection
// ---------------------------------------------------------------------------

function ScenarioCard({
  scenario,
  index,
  onSelect,
}: {
  scenario: GraphGymScenario;
  index: number;
  onSelect: (s: GraphGymScenario) => void;
}) {
  const thumb = THUMB_PALETTES[index % THUMB_PALETTES.length];

  return (
    <button
      onClick={() => onSelect(scenario)}
      className="group text-left w-full flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Thumbnail — light tint + centered graph icon */}
      <div
        className={`relative h-28 w-full border-b-4 border-black flex items-center justify-center ${thumb.bg}`}
        aria-hidden
      >
        <LineChart
          className={`h-10 w-10 ${thumb.icon} transition-transform duration-300 group-hover:scale-105`}
          strokeWidth={1.5}
          aria-hidden
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-black text-gray-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
          {scenario.title}
        </h3>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">
            {scenario.lessonId}
          </span>
          <DifficultyBadge difficulty={scenario.difficulty} />
        </div>
        <div className="mt-auto pt-2 flex justify-end">
          <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600 group-hover:gap-2 transition-all">
            Start <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main page content
// ---------------------------------------------------------------------------

const ACCENT_TEXT: Record<string, string> = {
  blue:   'text-gray-900',
  green:  'text-gray-900',
  yellow: 'text-gray-900',
  orange: 'text-gray-900',
  red:    'text-gray-900',
  purple: 'text-gray-900',
  pink:   'text-gray-900',
  teal:   'text-gray-900',
};

const ACCENT_BG: Record<string, string> = {
  blue:   'bg-blue-50/90 border-blue-200/90 text-gray-800',
  green:  'bg-emerald-50/90 border-emerald-200/90 text-gray-800',
  yellow: 'bg-amber-50/90 border-amber-200/90 text-gray-800',
  orange: 'bg-orange-50/90 border-orange-200/90 text-gray-800',
  red:    'bg-rose-50/90 border-rose-200/90 text-gray-800',
  purple: 'bg-violet-50/90 border-violet-200/90 text-gray-800',
  pink:   'bg-rose-50/90 border-rose-200/90 text-gray-800',
  teal:   'bg-teal-50/90 border-teal-200/90 text-gray-800',
};

function TopicCollectionContent() {
  const params = useParams();
  const router = useRouter();
  const bundleId = params?.bundleId as string;

  const bundleMeta = useMemo(
    () => GRAPH_GYM_BUNDLES.find((b) => b.id === bundleId) ?? null,
    [bundleId],
  );

  const bundleData = useMemo(() => {
    if (!bundleMeta) return null;
    return getBundleById(bundleId, bundleMeta.subject);
  }, [bundleId, bundleMeta]);

  if (!bundleMeta || !bundleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-xl font-black text-gray-700">Bundle not found.</p>
          <Link
            href="/graph-gym-dashboard"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Graph Gym
          </Link>
        </div>
      </div>
    );
  }

  const { bundle, scenarios } = bundleData;
  const accentText = ACCENT_TEXT[bundle.accentColor] ?? 'text-gray-900';
  const accentBadge = ACCENT_BG[bundle.accentColor] ?? 'bg-muted border-border text-gray-800';

  const backHref = '/graph-gym-dashboard';

  function handleSelect(scenario: GraphGymScenario) {
    const path = getSlugForScenario(scenario);
    router.push(`/${path}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-4 py-10">
        <div className="mx-auto max-w-[800px]">
          {/* Back link */}
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-black text-gray-500 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Graph Gym
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-flex items-center rounded-lg border-2 px-3 py-1 text-xs font-black ${accentBadge}`}>
                Unit {bundle.unit}
              </span>
              <span className={`inline-flex items-center rounded-lg border-2 px-3 py-1 text-xs font-black ${accentBadge}`}>
                {scenarios.length} {scenarios.length === 1 ? 'graph' : 'graphs'}
              </span>
            </div>
            <h1 className={`text-4xl sm:text-5xl font-black tracking-tight mb-3 ${accentText}`}>
              {bundle.label}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {bundle.description}
            </p>
          </div>

          {/* Grid of scenario cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {scenarios.map((scenario, i) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                index={i}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TopicCollectionPage() {
  return (
    <CourseProvider>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <TopicCollectionContent />
      </Suspense>
    </CourseProvider>
  );
}
