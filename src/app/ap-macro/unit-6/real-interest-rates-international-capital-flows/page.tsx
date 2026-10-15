'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { useLessonMcqPreview } from '@/hooks/useQuestionBank';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';

export default function RealInterestRatesInternationalCapitalFlowsDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 6.6' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 6, '6.6');
  const keyTerms = getKeyTermsForLesson('macro', 6, '6.6');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '6' && v.lessonIDS.includes('6.6') && v.subjects.includes('AP Macroeconomics')
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
    unit: 6,
    subject: 'ap_macroeconomics',
    lessonId: '6.6',
  });

  return (
    <DrillDeepDive
      drillId={null}
      backLink="/ap-macro-unit-6-cheat-sheet"
      backLinkText="Back to Unit 6 Cheat Sheet"
      lessonTitle="Real Interest Rates and International Capital Flows"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'Higher real interest rates in a country attract foreign capital (capital inflows), increasing demand for that country\'s currency and causing it to appreciate. Lower real interest rates cause capital outflows and currency depreciation. Capital flows link interest rates, exchange rates, and net exports.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
