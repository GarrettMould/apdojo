'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export default function ForeignExchangeMarketDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 6.3' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 6, '6.3');
  const keyTerms = getKeyTermsForLesson('macro', 6, '6.3');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '6' && v.lessonIDS.includes('6.3') && v.subjects.includes('AP Macroeconomics')
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
      q => q.unit === 6 && q.subject === 'ap_macroeconomics' && q.lessonIDS?.includes('6.3')
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
      lessonTitle="The Foreign Exchange Market"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'The foreign exchange market determines exchange rates through supply and demand. Currency appreciation occurs when demand increases or supply decreases. Currency depreciation occurs when demand decreases or supply increases. Factors include interest rates, economic conditions, and capital flows.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
