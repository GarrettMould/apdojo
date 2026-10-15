'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { useLessonMcqPreview } from '@/hooks/useQuestionBank';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { videos } from '@/data/videos';

export default function DefinitionMeasurementFunctionsMoneyDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 4.3' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 4, '4.3');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '4' && v.lessonIDS.includes('4.3') && v.subjects.includes('AP Macroeconomics')
    );
    if (!video) return null;
    return {
      videoUrl: video.videoUrl,
      title: video.title,
      questions: video.questions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      })),
    };
  }, []);

  const lessonMcqQuestions = useLessonMcqPreview({
    unit: 4,
    subject: 'ap_macroeconomics',
    lessonId: '4.3',
  });

  return (
    <DrillDeepDive
      drillId={null}
      backLink="/ap-macro-unit-4-cheat-sheet"
      backLinkText="Back to Unit 4 Cheat Sheet"
      lessonTitle="Definition, Measurement, and Functions of Money"
      lessonPills={lessonPills}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
