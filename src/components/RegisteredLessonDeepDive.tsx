'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getLessonData, listRegisteredLessons } from '@/data/lessonRegistry';
import { getVideosForLessonId } from '@/data/videosByLessonId';
import { useLessonMcqPreview } from '@/hooks/useQuestionBank';
import { getDeepDiveUrl } from '@/lib/routes';

export function RegisteredLessonDeepDive({
  subject,
  unit,
  slug,
}: {
  subject: 'ap-macro' | 'ap-micro';
  unit: string;
  slug: string;
}) {
  const lesson = getLessonData(subject, unit, slug);
  const siblings = listRegisteredLessons(subject).filter((item) => item.unit === unit);

  const fallbackVideo = useMemo(() => {
    if (!lesson) return null;
    const subjectForVideos = subject === 'ap-macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
    const lessonVideos = getVideosForLessonId(lesson.id).filter((video) => {
      if (!video.subjects.includes(subjectForVideos)) return false;
      if (subject === 'ap-micro' && lesson.id === '1.3') {
        const isCompAdv =
          video.title.toLowerCase().includes('comparative advantage') ||
          video.tags.some((t) => t.toLowerCase().includes('comparative advantage'));
        if (isCompAdv) return false;
      }
      if (subject === 'ap-macro' && lesson.id === '1.4') {
        const isCompAdv =
          video.title.toLowerCase().includes('comparative advantage') ||
          video.tags.some((t) => t.toLowerCase().includes('comparative advantage'));
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
  }, [lesson, subject]);

  const lessonMcqQuestions = useLessonMcqPreview({
    unit: Number(unit),
    subject: subject === 'ap-macro' ? 'ap_macroeconomics' : 'ap_microeconomics',
    lessonId: lesson?.id ?? '',
    answerAsIndex: false,
  });

  if (!lesson) return null;

  return (
    <div>
      <DrillDeepDive
        drillId={lesson.drillId}
        backLink={`/${subject}-unit-${unit}-cheat-sheet`}
        backLinkText={`Back to Unit ${unit} Cheat Sheet`}
        lessonTitle={lesson.title}
        lessonPills={[{ label: `AP Macro - ${lesson.id}` }]}
        flashcards={lesson.flashcards}
        instantAnswer={lesson.instantAnswer}
        keyTakeaways={lesson.content}
        fallbackVideo={fallbackVideo}
        lessonMcqQuestions={lessonMcqQuestions}
      />
      {siblings.length > 1 && (
        <nav className="mx-auto max-w-4xl px-4 pb-12" aria-label="More lessons in this unit">
          <h2 className="mb-3 text-lg font-black text-gray-900">More Unit {unit} lessons</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link
                  href={getDeepDiveUrl(subject, item.unit, item.slug)}
                  className={`block rounded-lg border px-3 py-2 text-sm font-semibold ${
                    item.slug === slug
                      ? 'border-black bg-yellow-50 text-black'
                      : 'border-gray-200 text-gray-800 hover:border-black'
                  }`}
                >
                  {item.id} {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
