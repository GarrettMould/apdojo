'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { useLessonMcqPreview } from '@/hooks/useQuestionBank';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';

export default function AggregateDemandDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 3.1' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 3, '3.1');
  const keyTerms = getKeyTermsForLesson('macro', 3, '3.1');

  // Find video for lesson 3.1
  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '3' && v.lessonIDS.includes('3.1') && v.subjects.includes('AP Macroeconomics')
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

  // Get 3 MCQ questions for lesson 3.1
  const lessonMcqQuestions = useLessonMcqPreview({
    unit: 3,
    subject: 'ap_macroeconomics',
    lessonId: '3.1',
  });

  return (
    <DrillDeepDive
      drillId={null}
      backLink="/ap-macro-unit-3-cheat-sheet"
      backLinkText="Back to Unit 3 Cheat Sheet"
      lessonTitle="Aggregate Demand (AD)"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'Aggregate demand (AD) is the total quantity of goods and services demanded at different price levels. AD = C + I + G + (X - M). The AD curve slopes downward because of the wealth effect, interest rate effect, and foreign trade effect.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
