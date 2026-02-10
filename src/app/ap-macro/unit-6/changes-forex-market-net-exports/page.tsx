'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export default function ChangesForexMarketNetExportsDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 6.5' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 6, '6.5');
  const keyTerms = getKeyTermsForLesson('macro', 6, '6.5');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '6' && v.lessonIDS.includes('6.5') && v.subjects.includes('AP Macroeconomics')
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

  const lessonMcqQuestions = useMemo(() => {
    const matching = allQuestions.filter(
      q => q.unit === 6 && q.subject === 'ap_macroeconomics' && q.lessonIDS?.includes('6.5')
    );
    return matching.slice(0, 3).map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: typeof q.correctAnswer === 'string' ? q.correctAnswer.charCodeAt(0) - 65 : q.correctAnswer,
      explanation: q.explanation,
      image: q.image ?? null,
      tableData: q.tableData,
    }));
  }, []);

  return (
    <DrillDeepDive
      drillId={null}
      backLink="/ap-macro-unit-6-cheat-sheet"
      backLinkText="Back to Unit 6 Cheat Sheet"
      lessonTitle="Changes in the Foreign Exchange Market and Net Exports"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'Currency depreciation makes exports cheaper for foreigners and imports more expensive for domestic consumers, increasing net exports (X - M) and shifting aggregate demand right. Currency appreciation has the opposite effect, decreasing net exports and shifting aggregate demand left.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
