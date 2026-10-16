import type { Question } from '@/data/questionBanks/types';

/**
 * AP Statistics — Unit 5 MCQ **practice** pool (cheat-sheet drills, `/mcq-practice`, etc.).
 * Same shape as Macro/Micro/Gov: merged into `allQuestions` via `statsMcqPractice.ts`.
 *
 * Unit 5 **formal unit test** uses `statsUnit5McqTestQuestions` (separate bank).
 */
export const statsUnit5McqPracticeQuestions: Question[] = [
  {
    id: 8501,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "Regression Analysis",
    question: "A least-squares regression line predicting monthly utility cost (y, in dollars) from average daily temperature (x, in degrees) is ŷ = 40 + 2.5x. For a month with an average temperature of 30 degrees, the actual utility cost was $130. What is the residual for this observation?",
    image: null,
    options: [
      "15",
      "-35",
      "35",
      "75",
      "115",
    ],
    correctAnswer: "A",
    explanation: "Predicted cost: ŷ = 40 + 2.5(30) = 115. Residual = observed − predicted = 130 − 115 = 15.",
  },
];
