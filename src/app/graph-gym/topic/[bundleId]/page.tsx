'use client';

import { Suspense, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { CourseProvider } from '@/contexts/CourseContext';
import { getBundleById, GRAPH_GYM_BUNDLES } from '@/data/graphGymBundles';
import { GraphGymScenario } from '@/data/graphGymScenarios';
import { getSlugForScenario } from '@/lib/graphGymSlugs';

// ---------------------------------------------------------------------------
// Difficulty badge
// ---------------------------------------------------------------------------

const DIFFICULTY_STYLES: Record<string, string> = {
  easy:   'bg-green-500 border-green-600 text-white',
  medium: 'bg-blue-500 border-blue-600 text-white',
  hard:   'bg-red-500 border-red-600 text-white',
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy:   'Beginner',
  medium: 'Intermediate',
  hard:   'Advanced',
};

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls = DIFFICULTY_STYLES[difficulty] ?? 'bg-gray-400 border-gray-500 text-white';
  const label = DIFFICULTY_LABEL[difficulty] ?? difficulty;
  return (
    <span className={`inline-flex items-center rounded border-2 px-1.5 py-0.5 text-[10px] font-black leading-tight ${cls}`}>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Scenario card inside the collection
// ---------------------------------------------------------------------------

function ScenarioCard({
  scenario,
  onSelect,
}: {
  scenario: GraphGymScenario;
  onSelect: (s: GraphGymScenario) => void;
}) {
  const hasImage = scenario.correctImage.startsWith('https://');

  return (
    <button
      onClick={() => onSelect(scenario)}
      className="group text-left w-full flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Thumbnail */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100 border-b-4 border-black">
        {hasImage ? (
          <Image
            src={scenario.correctImage}
            alt={scenario.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-50">
            <span className="text-3xl text-gray-300 font-black">—</span>
          </div>
        )}
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
  blue:   'text-blue-600',
  green:  'text-green-600',
  yellow: 'text-yellow-600',
  orange: 'text-orange-600',
  red:    'text-red-600',
  purple: 'text-purple-600',
  pink:   'text-pink-600',
  teal:   'text-teal-600',
};

const ACCENT_BG: Record<string, string> = {
  blue:   'bg-blue-100 border-blue-400 text-blue-700',
  green:  'bg-green-100 border-green-400 text-green-700',
  yellow: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  orange: 'bg-orange-100 border-orange-400 text-orange-700',
  red:    'bg-red-100 border-red-400 text-red-700',
  purple: 'bg-purple-100 border-purple-400 text-purple-700',
  pink:   'bg-pink-100 border-pink-400 text-pink-700',
  teal:   'bg-teal-100 border-teal-400 text-teal-700',
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
  const accentText = ACCENT_TEXT[bundle.accentColor] ?? 'text-gray-600';
  const accentBadge = ACCENT_BG[bundle.accentColor] ?? 'bg-gray-100 border-gray-400 text-gray-700';

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
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
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
