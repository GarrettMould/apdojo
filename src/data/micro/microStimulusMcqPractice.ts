import type { Question } from '@/data/questionBanks/types';

/**
 * Stimulus-based AP Micro practice MCQs (IDs 25101–25104).
 * Merged into Unit 2 practice via `unitPracticeProblems.ts`.
 */

const S3 = 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unit_mcq_images/ap_macro';

const M13 = {
  src: `${S3}/m13_tariff_market+1.svg`,
  alt: 'Domestic market graph with upward-sloping supply and downward-sloping demand. Dotted lines mark the world price Pw (lower) and the tariff-inclusive price Pt. Point S (quantity 40) and T (quantity 60) are on supply; point V (180) and W (200) are on demand; U is the domestic equilibrium.',
};

export const microStimulusMcqPracticeQuestions: Question[] = [
  {
    id: 25101,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Supply and Demand',
    questionGroup: 'm13-tariff',
    question: 'At the world price Pw, how many units does the country import?',
    image: M13,
    options: [
      '40',
      '120',
      '160',
      '180',
      '200',
    ],
    correctAnswer: 'C',
    explanation: 'At Pw, domestic quantity supplied is 40 (point S) and quantity demanded is 200 (point W). Imports = 200 − 40 = 160.',
    videoExplanation: null,
  },
  {
    id: 25102,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Supply and Demand',
    questionGroup: 'm13-tariff',
    question: 'After the tariff raises the domestic price to Pt, how many units does the country import?',
    image: M13,
    options: [
      '60',
      '120',
      '160',
      '180',
      '200',
    ],
    correctAnswer: 'B',
    explanation: 'At Pt, domestic producers supply 60 (point T) and consumers demand 180 (point V). Imports = 180 − 60 = 120.',
    videoExplanation: null,
  },
  {
    id: 25103,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Supply and Demand',
    questionGroup: 'm13-tariff',
    question: 'Pt is $10 above Pw. What is the government\'s tariff revenue?',
    image: M13,
    options: [
      '$400',
      '$600',
      '$1,200',
      '$1,600',
      '$1,800',
    ],
    correctAnswer: 'C',
    explanation: 'Tariff revenue = per-unit tariff × imports after the tariff = $10 × 120 = $1,200.',
    videoExplanation: null,
  },
  {
    id: 25104,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Supply and Demand',
    questionGroup: 'm13-tariff',
    question: 'Compared with free trade at the world price, which of the following correctly describes the effect of the tariff?',
    image: M13,
    options: [
      'Domestic producers are worse off and domestic consumers are better off.',
      'Domestic producers and domestic consumers are both better off.',
      'Domestic producers are better off and domestic consumers are worse off.',
      'Domestic producers and domestic consumers are both worse off.',
      'Neither group is affected because the tariff is paid by the government.',
    ],
    correctAnswer: 'C',
    explanation: 'A tariff raises the domestic price, so domestic producers sell more at a higher price and consumers pay more and buy less.',
    videoExplanation: null,
  },
];

export const microStimulusByUnit = (unit: number) =>
  microStimulusMcqPracticeQuestions.filter((q) => q.unit === unit);
