'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export default function MoneyGrowthInflationDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 5.3' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 5, '5.3');
  const keyTerms = getKeyTermsForLesson('macro', 5, '5.3');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '5' && v.lessonIDS.includes('5.3') && v.subjects.includes('AP Macroeconomics')
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
      q => q.unit === 5 && q.subject === 'ap_macroeconomics' && q.lessonIDS?.includes('5.3')
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
      backLink="/ap-macro-unit-5-cheat-sheet"
      backLinkText="Back to Unit 5 Cheat Sheet"
      lessonTitle="Money Growth and Inflation"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'In the long run, sustained increases in the money supply lead to inflation. The quantity theory of money (MV = PY) shows that if money supply grows faster than real output, prices must rise. Money is neutral in the long run: it affects nominal variables but not real variables.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
