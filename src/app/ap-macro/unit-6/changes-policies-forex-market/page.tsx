'use client';

import { useMemo } from 'react';
import { DrillDeepDive } from '@/components/DrillDeepDive';
import { getFlashcardsForLesson } from '@/data/unitFlashcards';
import { getKeyTermsForLesson } from '@/data/cheatSheetTerms';
import { videos } from '@/data/videos';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export default function ChangesPoliciesForexMarketDeepDivePage() {
  const lessonPills = [
    { label: 'AP Macro - 6.4' },
  ];

  const flashcards = getFlashcardsForLesson('macro', 6, '6.4');
  const keyTerms = getKeyTermsForLesson('macro', 6, '6.4');

  const fallbackVideo = useMemo(() => {
    const video = videos.find(
      v => v.unit === '6' && v.lessonIDS.includes('6.4') && v.subjects.includes('AP Macroeconomics')
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
      q => q.unit === 6 && q.subject === 'ap_macroeconomics' && q.lessonIDS?.includes('6.4')
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
      lessonTitle="Effect of Changes in Policies and Economic Conditions on the Foreign Exchange Market"
      lessonPills={lessonPills}
      instantAnswer={{
        blurb: 'Expansionary monetary policy (lower interest rates) causes currency depreciation through capital outflows. Expansionary fiscal policy (higher interest rates from borrowing) causes currency appreciation through capital inflows. Economic conditions and expectations also affect exchange rates.',
        keyTerms: keyTerms,
      }}
      flashcards={flashcards}
      fallbackVideo={fallbackVideo}
      lessonMcqQuestions={lessonMcqQuestions}
    />
  );
}
