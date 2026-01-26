'use client';

import { Suspense, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GraphGym } from '@/components/GraphGym';
import { CourseProvider } from '@/contexts/CourseContext';
import { Loader2 } from 'lucide-react';
import { getScenarioBySlug } from '@/lib/graphGymSlugs';

function GraphGymSlugContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    // Only handle URLs ending in -graphing-practice
    if (!slug || !slug.endsWith('-graphing-practice')) {
      router.replace('/404');
      return;
    }

    // Verify the scenario exists
    const scenario = getScenarioBySlug(slug);
    if (!scenario) {
      router.replace('/404');
      return;
    }
  }, [slug, router]);

  // If not a valid graphing practice slug, show loading (will redirect)
  if (!slug || !slug.endsWith('-graphing-practice')) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <CourseProvider>
      <GraphGym initialScenarioSlug={slug} />
    </CourseProvider>
  );
}

export default function GraphGymSlugPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <GraphGymSlugContent />
    </Suspense>
  );
}
