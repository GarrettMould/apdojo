'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { videos } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export default function LoanableFundsMarketDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 4.7' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 4, '4.7');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '4' && v.lessonIDS.includes('4.7') && v.subjects.includes('AP Macroeconomics')
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
      q => q.unit === 4 && q.subject === 'ap_macroeconomics' && q.lessonIDS?.includes('4.7')
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
      backLink="/ap-macro-unit-4-cheat-sheet"
      backLinkText="Back to Unit 4 Cheat Sheet"
      lessonTitle="The Loanable Funds Market"
      lessonPills={lessonPills}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
