'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GraphGym } from '@/components/GraphGym';
import { Loader2 } from 'lucide-react';
import { getScenarioBySlug, getSlugForScenario } from '@/lib/graphGymSlugs';
import { getLessonData } from '@/data/lessonRegistry';
import { DrillDeepDive } from '@/components/DrillDeepDive';

/** Key Takeaways for PPC deep dive (same as old page). */
function PPCKeyTakeaways() {
  return (
    <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
      <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
      <ul className="space-y-4">
        <li className="flex items-start gap-4">
          <span className="text-2xl">📊</span>
          <div>
            <strong className="text-black">The PPC shows trade-offs:</strong> Moving along the curve means
            giving up some of one good to get more of another, demonstrating opportunity cost.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">📈</span>
          <div>
            <strong className="text-black">Bowed-out shape indicates increasing opportunity costs:</strong>
            Resources are specialized, so reallocating them becomes more costly as you move along the curve.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">✅</span>
          <div>
            <strong className="text-black">Points on the curve are efficient:</strong> All resources are
            fully utilized. Points inside are inefficient, and points outside are unattainable.
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl">🚀</span>
          <div>
            <strong className="text-black">The curve shifts outward with growth:</strong> Economic growth,
            technological advancement, or increased resources can shift the PPC outward, making previously
            unattainable combinations possible.
          </div>
        </li>
      </ul>
    </div>
  );
}

function GraphGymSlugContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug && slug.endsWith('-graphing-practice') && !slug.startsWith('graph-gym/')) {
      const scenario = getScenarioBySlug(slug);
      if (scenario) {
        const newSlug = getSlugForScenario(scenario);
        router.replace(`/${newSlug}`);
        return;
      }
    }
    if (!slug || !slug.endsWith('-graphing-practice')) {
      router.replace('/404');
      return;
    }
  }, [slug, router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );
}

function SlugPageContent() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) ?? '';
  const rest = params?.rest as string[] | undefined;

  const isDeepDive = useMemo(() => {
    if (!rest || rest.length !== 2) return false;
    const [unitSegment, lessonSlug] = rest;
    return unitSegment?.startsWith('unit-') === true && !!lessonSlug;
  }, [rest]);

  const lesson = useMemo(() => {
    if (!isDeepDive || !rest) return null;
    const [unitSegment, lessonSlug] = rest;
    const unitId = unitSegment!.replace(/^unit-/, '');
    return getLessonData(slug, unitId, lessonSlug!);
  }, [isDeepDive, rest, slug]);

  useEffect(() => {
    if (!isDeepDive) return;
    if (lesson == null || lesson.drillId == null) {
      router.replace('/404');
    }
  }, [isDeepDive, lesson, router]);

  if (isDeepDive) {
    if (lesson == null || lesson.drillId == null) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }
    const unitId = rest![0].replace(/^unit-/, '');
    const backLink = `/${slug}-unit-${unitId}-cheat-sheet`;
    const backLinkText = `Back to Unit ${unitId} Cheat Sheet`;
    const lessonPills = [
      { label: `AP Macro - ${lesson.id}` },
      { label: `AP Micro - ${lesson.id}` },
    ];
    return (
      <DrillDeepDive
        drillId={lesson.drillId}
        backLink={backLink}
        backLinkText={backLinkText}
        lessonPills={lessonPills}
        flashcards={lesson.flashcards}
        keyTakeaways={lesson.content ?? <PPCKeyTakeaways />}
      />
    );
  }

  return <GraphGymSlugContent />;
}

export default function SlugPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <SlugPageContent />
    </Suspense>
  );
}
