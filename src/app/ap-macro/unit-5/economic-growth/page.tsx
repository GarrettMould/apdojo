'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { useLessonMcqPreview } from '@/hooks/useQuestionBank';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';

export default function EconomicGrowthDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 5.6' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 5, '5.6');
  const keyTerms = getKeyTermsForLesson('macro', 5, '5.6');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '5' && v.lessonIDS.includes('5.6') && v.subjects.includes('AP Macroeconomics')
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
    unit: 5,
    subject: 'ap_macroeconomics',
    lessonId: '5.6',
  });

  return (
    <DrillDeepDive
      drillId={null}
      backLink="/ap-macro-unit-5-cheat-sheet"
      backLinkText="Back to Unit 5 Cheat Sheet"
      lessonTitle="Economic Growth"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'Economic growth is an increase in real GDP over time, shown by a rightward shift of the LRAS curve. Growth comes from increases in resources (labor, capital, natural resources), technological advancement, and improvements in institutions that promote productivity.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
