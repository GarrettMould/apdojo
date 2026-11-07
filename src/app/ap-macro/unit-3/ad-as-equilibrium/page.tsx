'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { useLessonMcqPreview } from '@/hooks/useQuestionBank';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { videos } from '@/data/videos';

export default function ADASEquilibriumDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 3.5' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 3, '3.5');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '3' && v.lessonIDS.includes('3.5') && v.subjects.includes('AP Macroeconomics')
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
    unit: 3,
    subject: 'ap_macroeconomics',
    lessonId: '3.5',
  });

  return (
    <DrillDeepDive
      drillId={null}
      backLink="/ap-macro-unit-3-cheat-sheet"
      backLinkText="Back to Unit 3 Cheat Sheet"
      lessonTitle="Equilibrium in the Aggregate Demand - Aggregate Supply (AD-AS) Model"
      lessonPills={lessonPills}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
