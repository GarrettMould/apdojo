'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { graphGymScenarios } from '@/data/graphGymScenarios';
import { getSlugForScenario } from '@/lib/graphGymSlugs';
import { Loader2 } from 'lucide-react';

export default function GraphGymPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to first scenario
    const firstScenario = graphGymScenarios[0];
    if (firstScenario) {
      const slug = getSlugForScenario(firstScenario);
      router.replace(`/${slug}`);
    }
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );
}



