import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 3 MCQ **practice** pool.
 * Practice IDs: 6077–6116. Merged via `govMcqPractice.ts` → `allQuestions`.
 *
 * Unit 3 **formal unit test** uses `govUnit3McqTestQuestions` in `govUnit3McqExam.ts` (separate bank).
 */
export const govUnit3McqPracticeQuestions: Question[] = [
  {
    id: 6077,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-miranda',
    question: 'The Miranda rule serves to protect which constitutional guarantee?',
    image: null,
    options: [
      'The right to be free from unreasonable searches.',
      'The right to a fair trial and protection from self-incrimination during interrogation.',
      'The right to petition the government for redress of grievances.',
      'The right to keep and bear arms.',
    ],
    correctAnswer: 'B',
    explanation:
      'Miranda warnings ensure that individuals in custody are aware of their 5th Amendment right against self-incrimination and 6th Amendment right to counsel.',
  },
];
