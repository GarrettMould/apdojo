import { allQuestions } from './unitPracticeProblems/unitPracticeProblems';
import { Question as QuestionType } from './questionBanks/types';
import { videos as allVideos } from './videos';

export interface TopicBundle {
  title: string;
  lessonId: string;
  unit: number;
  videoSlug?: string;
  thumbnailUrl?: string; // This name is used in the TopicCard, so we'll map to it
  questions: QuestionType[];
}

// CORRECTED createBundle function
const createBundle = ({ title, lessonId, unit, questionIds }: {
  title: string;
  lessonId: string;
  unit: number;
  questionIds: number[];
}): TopicBundle => {
  const questions = allQuestions.filter(q => questionIds.includes(q.id));
  
  const video = Array.isArray(allVideos) 
    ? allVideos.find(v => v.lessonIDS.includes(lessonId) && v.subjects.includes('AP Macroeconomics'))
    : undefined;

  return {
    title,
    lessonId,
    unit,
    videoSlug: video?.videoSlug,
    thumbnailUrl: video?.thumbnail,
    questions,
  };
};

export const topicBundles: TopicBundle[] = [
  createBundle({ 
    title: 'The Phillips Curve',
    lessonId: '5.2', 
    unit: 5,
    questionIds: [120, 121, 122, 123]
  }),
  createBundle({ 
    title: 'Comparative Advantage',
    lessonId: '1.3', 
    unit: 1,
    questionIds: [11, 12, 13, 14]
  }),
  createBundle({ 
    title: 'Demand',
    lessonId: '1.4', 
    unit: 1,
    questionIds: [15, 16, 17, 18]
  }),
  createBundle({ 
    title: 'Market Equilibrium',
    lessonId: '1.6', 
    unit: 1,
    questionIds: [30, 31, 28, 29]
  }),
  createBundle({ 
    title: 'Business Cycles',
    lessonId: '2.7', 
    unit: 2,
    questionIds: [58, 59, 60, 61]
  }),
  createBundle({ 
    title: 'Supply',
    lessonId: '1.5', 
    unit: 1,
    questionIds: [23, 24, 25, 26]
  }),
];
