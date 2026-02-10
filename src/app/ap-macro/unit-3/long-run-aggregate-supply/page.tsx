'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { videos } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export default function LongRunAggregateSupplyDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 3.4' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 3, '3.4');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '3' && v.lessonIDS.includes('3.4') && v.subjects.includes('AP Macroeconomics')
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
      q => q.unit === 3 && q.subject === 'ap_macroeconomics' && q.lessonIDS?.includes('3.4')
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
      backLink="/ap-macro-unit-3-cheat-sheet"
      backLinkText="Back to Unit 3 Cheat Sheet"
      lessonTitle="Long-Run Aggregate Supply (LRAS)"
      lessonPills={lessonPills}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
