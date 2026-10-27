import type { Question } from '@/data/questionBanks/types';

/**
 * Stimulus-based AP Statistics practice MCQs.
 * Merged into live practice by unit via `statsMcqPractice.ts`.
 *
 * Graph-option items use `optionImages` (not objects inside `options`).
 */

const S3 =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/final_mcq';

const DOTPLOT = (letter: 'A' | 'B' | 'C' | 'D' | 'E', alt: string) => ({
  src: `${S3}/s01_dotplots_five_classes+${letter}.svg`,
  alt,
});

const DOTPLOT_A = DOTPLOT(
  'A',
  'Dotplot of 12 quiz scores on a 0 to 10 scale tightly clustered around 5: two 4s, eight 5s, two 6s.'
);
const DOTPLOT_B = DOTPLOT(
  'B',
  'Dotplot of 12 quiz scores spread evenly across the whole 0 to 10 scale, one at each value 0 through 10 with an extra at 5.'
);
const DOTPLOT_C = DOTPLOT(
  'C',
  'Dotplot of 12 quiz scores split into two stacks: six scores of 2 and six scores of 8, with nothing in between.'
);
const DOTPLOT_D = DOTPLOT(
  'D',
  'Dotplot of 12 quiz scores with most values at the extremes: four 0s, one 1, two 5s, one 9, four 10s.'
);
const DOTPLOT_E = DOTPLOT(
  'E',
  'Dotplot of 12 quiz scores moderately spread between 3 and 7, with the most values at 5 and 7.'
);

const DOTPLOT_STEM =
  'A teacher recorded the quiz scores (out of 10) for a class of 12 students in each of five different sections. The mean score is about 5 in every section, and each option is a dotplot of the scores for one section.';

const RESIDUAL = (letter: 'A' | 'B' | 'C' | 'D' | 'E', alt: string) => ({
  src: `${S3}/s05_residual_plots+${letter}.svg`,
  alt,
});

const RESIDUAL_A = RESIDUAL(
  'A',
  'Residual plot against predicted value: the spread of residuals is large at small predicted values and narrows steadily as the predicted value increases.'
);
const RESIDUAL_B = RESIDUAL(
  'B',
  'Residual plot against predicted value: residuals are tightly clustered near zero at small predicted values and fan out, becoming more spread out, as the predicted value increases.'
);
const RESIDUAL_C = RESIDUAL(
  'C',
  'Residual plot against predicted value: residuals form a clear U-shaped curve, positive at both ends and negative in the middle.'
);
const RESIDUAL_D = RESIDUAL(
  'D',
  'Residual plot against predicted value: residuals are randomly scattered around zero with roughly constant spread and no pattern.'
);
const RESIDUAL_E = RESIDUAL(
  'E',
  'Residual plot against predicted value: residuals follow a wave-like pattern, positive then negative then positive again as the predicted value increases.'
);

const RESIDUAL_STEM =
  'A researcher fits a least-squares regression line to each of five different data sets and makes a residual plot for each.';

const SIM = (letter: 'A' | 'B' | 'C' | 'D' | 'E', alt: string) => ({
  src: `${S3}/s06_simulated_distributions+${letter}.svg`,
  alt,
});

const SIM_A = SIM(
  'A',
  'Bar chart of 400 trials with four roughly equal bars at values 0, 1, 2, 3 (about 100 each).'
);
const SIM_B = SIM(
  'B',
  'Bar chart of 400 trials with values from 2 to 8, symmetric and peaked at 5 (about 100), with the smallest bars at 2 and 8.'
);
const SIM_C = SIM(
  'C',
  'Bar chart of 400 trials with values 0 to 3 and bar heights of about 99, 149, 97, and 46, peaking at 1.'
);
const SIM_D = SIM(
  'D',
  'Bar chart of 400 trials with values 0 to 3 and bar heights decreasing from about 158 at 0 to about 44 at 3.'
);
const SIM_E = SIM(
  'E',
  'Bar chart of 400 trials with values from negative 3 to 3, peaking near negative 1 and 0 and shorter on the right side.'
);

export const statsStimulusMcqPracticeQuestions: Question[] = [
  {
    id: 9601,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    questionGroup: 's01-dotplots-five-classes',
    question: `${DOTPLOT_STEM} Which of the dotplots represents the section with the greatest standard deviation?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [DOTPLOT_A, DOTPLOT_B, DOTPLOT_C, DOTPLOT_D, DOTPLOT_E],
    correctAnswer: 'D',
    explanation:
      'Standard deviation measures the typical distance of the scores from the mean. With every mean about 5, the section whose scores are mostly at the extremes (0 and 10) has the greatest spread (SD ≈ 4.6). The scores in the 2-and-8 plot and the evenly spread plot are closer to 5 (SD ≈ 3.1).',
    videoExplanation: null,
  },
  {
    id: 9602,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    questionGroup: 's01-dotplots-five-classes',
    question: `${DOTPLOT_STEM} Which of the dotplots represents the section with the smallest standard deviation?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [DOTPLOT_D, DOTPLOT_E, DOTPLOT_A, DOTPLOT_C, DOTPLOT_B],
    correctAnswer: 'C',
    explanation:
      'The scores in this section are packed within one point of the mean of 5 (two 4s, eight 5s, two 6s), so its standard deviation is smallest (about 0.6).',
    videoExplanation: null,
  },
  {
    id: 9603,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    questionGroup: 's01-dotplots-five-classes',
    question: `${DOTPLOT_STEM} Which of the dotplots represents a section whose scores are spread roughly evenly over the entire 0 to 10 scale, with no gaps and no strong peak?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [DOTPLOT_C, DOTPLOT_B, DOTPLOT_E, DOTPLOT_A, DOTPLOT_D],
    correctAnswer: 'B',
    explanation:
      'Only one plot has scores at nearly every value from 0 through 10 with about the same number at each value, which is a roughly uniform distribution. The other plots are clustered, split into two stacks, or concentrated at the extremes.',
    videoExplanation: null,
  },
  {
    id: 9701,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Regression Analysis',
    questionGroup: 's05-residual-plots',
    question: `${RESIDUAL_STEM} Which of the residual plots provides the strongest evidence that a linear model is appropriate, with roughly constant variability of the residuals?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [RESIDUAL_E, RESIDUAL_D, RESIDUAL_A, RESIDUAL_B, RESIDUAL_C],
    correctAnswer: 'B',
    explanation:
      'A good linear model has residuals scattered randomly around zero with no pattern and about the same spread everywhere. Only the plot with randomly scattered residuals and constant spread shows this. The others show a change in spread (the plots that narrow or fan out) or a systematic pattern (the U-shape and the wave).',
    videoExplanation: null,
  },
  {
    id: 9702,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Regression Analysis',
    questionGroup: 's05-residual-plots',
    question: `${RESIDUAL_STEM} Which of the residual plots suggests that the variability of the response increases as the predicted value increases, violating the condition of constant variance?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [RESIDUAL_B, RESIDUAL_E, RESIDUAL_D, RESIDUAL_A, RESIDUAL_C],
    correctAnswer: 'A',
    explanation:
      'The plot that fans out from left to right has small residuals for small predicted values and large residuals for large predicted values, so the variability of the response increases with the predicted value. The plot with spread that narrows shows the opposite pattern, which also violates constant variance but does not match this description.',
    videoExplanation: null,
  },
  {
    id: 9703,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Regression Analysis',
    questionGroup: 's05-residual-plots',
    question: `${RESIDUAL_STEM} Which of the residual plots shows a single U-shaped curve, suggesting that a linear model is not appropriate?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [RESIDUAL_D, RESIDUAL_A, RESIDUAL_C, RESIDUAL_E, RESIDUAL_B],
    correctAnswer: 'C',
    explanation:
      'A U-shaped pattern means the line over-predicts in the middle and under-predicts at the ends, so the data have curvature that a straight line misses. A transformation or a nonlinear model would fit better.',
    videoExplanation: null,
  },
  {
    id: 9704,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Regression Analysis',
    questionGroup: 's05-residual-plots',
    question: `${RESIDUAL_STEM} Which of the residual plots shows a cyclical pattern that suggests a linear model is missing a repeating trend in the data?`,
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [RESIDUAL_A, RESIDUAL_C, RESIDUAL_B, RESIDUAL_D, RESIDUAL_E],
    correctAnswer: 'E',
    explanation:
      'Residuals that rise and fall in a wave as the predicted value increases indicate a systematic pattern left behind by the model. The plot with the repeating wave shows this; the single U-shaped curve is one bend, not a repeating pattern.',
    videoExplanation: null,
  },
  {
    id: 9711,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    questionGroup: 's06-simulated-distributions',
    question:
      'Two fair spinners, each numbered 1, 2, 3, and 4, are spun and the absolute difference of the two numbers is recorded. This is repeated for a total of 400 trials. Which of the graphs best represents the most reasonable distribution of the results?',
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [SIM_A, SIM_B, SIM_C, SIM_D, SIM_E],
    correctAnswer: 'C',
    explanation:
      'Of the 16 equally likely outcomes, a difference of 0 occurs 4 ways, 1 occurs 6 ways, 2 occurs 4 ways, and 3 occurs 2 ways. The expected counts out of 400 trials are about 100, 150, 100, and 50, so the correct graph has bars close to these heights, peaking at 1.',
    videoExplanation: null,
  },
  {
    id: 9712,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    questionGroup: 's06-simulated-distributions',
    question:
      'Two fair spinners, each numbered 1, 2, 3, and 4, are spun and the sum of the two numbers is recorded. This is repeated for a total of 400 trials. Which of the graphs best represents the most reasonable distribution of the results?',
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [SIM_C, SIM_D, SIM_E, SIM_A, SIM_B],
    correctAnswer: 'E',
    explanation:
      'Sums range from 2 to 8, and 5 is the most likely sum (4 of 16 outcomes) while 2 and 8 are the least likely (1 of 16 each). The distribution is symmetric and peaked at 5.',
    videoExplanation: null,
  },
  {
    id: 9713,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    questionGroup: 's06-simulated-distributions',
    question:
      'A fair spinner is divided into four equal sections numbered 0, 1, 2, and 3. The spinner is spun 400 times and each result is recorded. Which of the graphs best represents the most reasonable distribution of the results?',
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [SIM_D, SIM_A, SIM_E, SIM_C, SIM_B],
    correctAnswer: 'B',
    explanation:
      'Each number has a probability of 1/4, so each should appear about 100 times, with random variation. This is a roughly uniform distribution.',
    videoExplanation: null,
  },
  {
    id: 9714,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    questionGroup: 's06-simulated-distributions',
    question:
      'In a game, a player wins 0, 1, 2, or 3 prizes on each play with probabilities 0.4, 0.3, 0.2, and 0.1, respectively. The game is simulated 400 times. Which of the graphs best represents the most reasonable distribution of the number of prizes won?',
    image: null,
    options: ['', '', '', '', ''],
    optionImages: [SIM_D, SIM_C, SIM_B, SIM_E, SIM_A],
    correctAnswer: 'A',
    explanation:
      'The expected counts are 400(0.4) = 160, 400(0.3) = 120, 400(0.2) = 80, and 400(0.1) = 40. The correct graph has bars close to these values and decreases steadily from left to right.',
    videoExplanation: null,
  },
];

export const statsStimulusByUnit = (unit: number) =>
  statsStimulusMcqPracticeQuestions.filter((q) => q.unit === unit);
