'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { graphGymScenarios } from '@/data/graphGymScenarios';
import GraphGymPresenter, { GraphGymPresenterScenario } from '@/components/GraphGymPresenter';

function GraphGymPresentContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const scenarios: GraphGymPresenterScenario[] = useMemo(() => {
    if (!q) return [];
    try {
      const decoded = atob(decodeURIComponent(q));
      const ids = decoded.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !Number.isNaN(n));
      const resolved = ids
        .map((id) => graphGymScenarios.find((s) => s.id === id))
        .filter((s): s is NonNullable<typeof s> => s != null);
      return resolved.map((s) => ({
        prompt: s.description,
        subPrompt: s.instruction ?? (s.toDoList?.length ? s.toDoList.join(' • ') : undefined),
        answerImageUrl: s.correctImage,
      }));
    } catch {
      return [];
    }
  }, [q]);

  if (!q || scenarios.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
          <p className="text-lg text-slate-600">
            No scenarios to display. Use the tutor builder to select Graph Gym scenarios and click Start Activity.
          </p>
        </div>
      </div>
    );
  }

  return <GraphGymPresenter scenarios={scenarios} />;
}

export default function GraphGymPresentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-pulse text-slate-500">Loading…</div>
        </div>
      }
    >
      <GraphGymPresentContent />
    </Suspense>
  );
}
