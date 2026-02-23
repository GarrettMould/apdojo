'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GraphGymDashboard } from '@/components/GraphGymDashboard';
import { graphGymScenarios } from '@/data/graphGymScenarios';
import { getSlugForScenario } from '@/lib/graphGymSlugs';
import { CourseProvider } from '@/contexts/CourseContext';

function GraphGymPageContent() {
  const router = useRouter();

  const handleSelectScenario = useCallback((id: string) => {
    const scenarioId = parseInt(id, 10);
    if (Number.isNaN(scenarioId)) return;
    const scenario = graphGymScenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      const path = getSlugForScenario(scenario);
      router.push(`/${path}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <GraphGymDashboard onSelectScenario={handleSelectScenario} />
    </div>
  );
}

export default function GraphGymDashboardPage() {
  return (
    <CourseProvider>
      <GraphGymPageContent />
    </CourseProvider>
  );
}
