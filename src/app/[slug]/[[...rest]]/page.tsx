'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GraphGym } from '@/components/GraphGym';
import { Loader2 } from 'lucide-react';
import { getScenarioBySlug, getSlugForScenario } from '@/lib/graphGymSlugs';
import { getLessonData } from '@/data/lessonRegistry';
import { getVideosForLessonId } from '@/data/videosByLessonId';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
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

  // Cheat sheet video for this lesson (same source as unit hub); show on deep dive when lesson has no drill video
  const fallbackVideo = useMemo(() => {
    if (!lesson) return null;
    const subjectForVideos = slug === 'ap-macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
    const lessonVideos = getVideosForLessonId(lesson.id).filter((video) => {
      if (!video.subjects.includes(subjectForVideos)) return false;
      if (slug === 'ap-micro' && lesson.id === '1.3') {
        const isCompAdv = video.title.toLowerCase().includes('comparative advantage') || video.tags.some(t => t.toLowerCase().includes('comparative advantage'));
        if (isCompAdv) return false;
      }
      if (slug === 'ap-macro' && lesson.id === '1.4') {
        const isCompAdv = video.title.toLowerCase().includes('comparative advantage') || video.tags.some(t => t.toLowerCase().includes('comparative advantage'));
        if (isCompAdv) return false;
      }
      return true;
    });
    const first = lessonVideos[0];
    return first
      ? {
          videoUrl: first.videoUrl,
          title: first.title,
          questions: first.questions?.length
            ? first.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
              }))
            : undefined,
        }
      : null;
  }, [lesson, slug]);

  // 3 MCQs per lesson from unitPracticeProblems for Unit 1 & 2 macro deep dives
  const lessonMcqQuestions = useMemo(() => {
    if (!lesson || slug !== 'ap-macro') return undefined;
    const unitId = rest?.[0]?.replace(/^unit-/, '');
    const unitNum = unitId === '1' ? 1 : unitId === '2' ? 2 : null;
    if (unitNum == null) return undefined;
    const matching = allQuestions.filter(
      (q) =>
        q.unit === unitNum &&
        q.subject === 'ap_macroeconomics' &&
        q.lessonIDS?.includes(lesson.id)
    );
    return matching.slice(0, 3).map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      image: q.image ?? null,
      tableData: q.tableData,
    }));
  }, [lesson, slug, rest]);

  useEffect(() => {
    if (!isDeepDive) return;
    if (lesson == null) {
      router.replace('/404');
    }
  }, [isDeepDive, lesson, router]);

  if (isDeepDive) {
    if (lesson == null) {
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
        lessonTitle={lesson.title}
        lessonPills={lessonPills}
        flashcards={lesson.flashcards}
        instantAnswer={lesson.instantAnswer}
        keyTakeaways={lesson.content ?? <PPCKeyTakeaways />}
        fallbackVideo={fallbackVideo}
        lessonMcqQuestions={lessonMcqQuestions}
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
