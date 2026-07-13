import type { Question } from '@/data/questionBanks/types';

const UNIT_NAME = 'Probability, Random Variables, and Probability Distributions';

/** Strip "A) " style prefixes — FullExam adds letter labels. */
function stripOptionPrefixes(options: string[]): string[] {
  return options.map((option) => option.replace(/^[A-E]\)\s*/, ''));
}

const SMARTPHONE_TABLET_TABLE = {
  headers: [' ', 'Owns Tablet', 'Does Not Own Tablet', 'Total'],
  rows: [
    ['Owns Smartphone', '140', '70', '210'],
    ['Does Not Own Smartphone', '20', '70', '90'],
    ['Total', '160', '140', '300'],
  ],
};

const PRIZE_DISTRIBUTION_TABLE = {
  headers: ['Prize (X)', 'P(x)'],
  rows: [
    ['$0', '0.40'],
    ['$50', '0.35'],
    ['$200', '0.20'],
    ['$500', '0.05'],
  ],
};

const MARIA_TEST_SCORES_TABLE = {
  headers: ['Test', 'Mean', 'SD', "Maria's Score"],
  rows: [
    ['Math', '500', '100', '620'],
    ['Verbal', '450', '80', '580'],
  ],
};

const STATS_UNIT2_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit2';

const SLEEP_STRESS_SEGMENTED_BAR = {
  src: `${STATS_UNIT2_IMAGE_BASE}/q1.png`,
  alt: 'Segmented bar chart of stress level by hours of sleep',
};

const PETS_PROBABILITY_HISTOGRAM = {
  src: `${STATS_UNIT2_IMAGE_BASE}/q2.png`,
  alt: 'Probability histogram for number of pets owned per household',
};

const IQ_NORMAL_CURVE = {
  src: `${STATS_UNIT2_IMAGE_BASE}/q3.png`,
  alt: 'Normal curve for IQ scores with shaded region above 115',
};

const BINOMIAL_PROBABILITY_HISTOGRAM = {
  src: `${STATS_UNIT2_IMAGE_BASE}/q4.png`,
  alt: 'Probability histogram for binomial distribution with n = 8 and p = 0.5',
};

const CLT_SAMPLING_DISTRIBUTION = {
  src: `${STATS_UNIT2_IMAGE_BASE}/q5.png`,
  alt: 'Sampling distributions of the sample mean for increasing sample sizes',
};

/**
 * AP Statistics — Unit 2 **formal unit MCQ test**
 * (`/unit-mcq-test/2?subject=stats`). IDs in 72xx range.
 * Image and table questions are spread through the test (fixed order).
 */
export const statsUnit2McqTestQuestions: Question[] = [
  {
    id: 7210,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.5', '2.7'],
    unitName: UNIT_NAME,
    question:
      'Suppose P(A) = 0.15, P(B) = 0.10, and P(A and B) = 0 for varsity sports participation. Which of the following is correct?',
    image: null,
    options: stripOptionPrefixes([
      'A) Events A and B are independent.',
      'B) Events A and B are mutually exclusive.',
      'C) Events A and B are both mutually exclusive and independent.',
      'D) P(A or B) = P(A) × P(B) = 0.015.',
      'E) Independence cannot be evaluated.',
    ]),
    correctAnswer: 'B',
    explanation: 'P(A and B) = 0 means the events cannot occur together, making them mutually exclusive.',
  }
,
  {
    id: 7201,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: UNIT_NAME,
    question:
      'A school counselor collected data on 200 students, recording their typical hours of sleep per night and whether they reported feeling stressed on a given day. Based on the segmented bar chart of these results, which of the following statements is best supported by the data?',
    image: SLEEP_STRESS_SEGMENTED_BAR,
    options: stripOptionPrefixes([
      'A) Hours of sleep and stress level are independent.',
      'B) Students who sleep less than 7 hours are more likely to report feeling stressed than students who sleep 7 or more hours.',
      'C) The majority of all 200 students reported feeling stressed.',
      'D) Exactly 70 students slept less than 7 hours.',
      'E) There is a higher count of stressed students among those sleeping 7+ hours.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The segmented bar chart shows conditional distributions—70% of the "less than 7 hours" group reported stress, compared to only 35% of the "7 or more hours" group. Since these conditional percentages differ substantially, there is an association between sleep and stress.',
  }
,
  {
    id: 7213,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: UNIT_NAME,
    question:
      'A bag contains 6 red, 4 blue, and 5 green marbles. What is the probability that a marble selected at random is NOT blue?',
    image: null,
    options: stripOptionPrefixes(['A) 0.267', 'B) 0.400', 'C) 0.600', 'D) 0.733', 'E) 0.800']),
    correctAnswer: 'D',
    explanation: 'P(not blue) = 1 - P(blue) = 1 - (4/15) ≈ 0.733.',
  }
,
  {
    id: 7211,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: UNIT_NAME,
    question:
      'A student flips a fair coin repeatedly. After 10 flips, the relative frequency of heads is 0.70. After 1,000 flips, it is 0.51. What explains this?',
    image: null,
    options: stripOptionPrefixes([
      'A) The coin became less biased.',
      'B) The law of large numbers: as trials increase, relative frequency gets closer to true probability.',
      'C) The result after 1,000 flips is unreliable.',
      'D) The coin is not fair.',
      'E) Relative frequency and true probability are unrelated.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The law of large numbers states that long-run relative frequency approaches the true probability.',
  }
,
  {
    id: 7206,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.2', '2.6'],
    unitName: UNIT_NAME,
    question:
      'A survey of 300 randomly selected adults asked whether they own a smartphone and whether they own a tablet. What is the probability that a randomly selected adult owns a tablet, given that they own a smartphone?',
    image: null,
    tableData: SMARTPHONE_TABLET_TABLE,
    options: stripOptionPrefixes(['A) 0.467', 'B) 0.500', 'C) 0.667', 'D) 0.700', 'E) 0.875']),
    correctAnswer: 'C',
    explanation: 'P(Tablet | Smartphone) = 140 / 210 ≈ 0.667.',
  }
,
  {
    id: 7207,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.7'],
    unitName: UNIT_NAME,
    question:
      'Using the smartphone and tablet survey data, are the events "owns a smartphone" and "owns a tablet" independent?',
    image: null,
    tableData: SMARTPHONE_TABLET_TABLE,
    options: stripOptionPrefixes([
      'A) Yes, because P(Tablet) = P(Tablet | Smartphone).',
      'B) Yes, because both events have a probability greater than 0.',
      'C) No, because P(Tablet) ≈ 0.533 but P(Tablet | Smartphone) ≈ 0.667.',
      'D) No, because the two-way table has unequal row totals.',
      'E) Cannot be determined without a chi-square test.',
    ]),
    correctAnswer: 'C',
    explanation:
      'P(Tablet) = 160/300 ≈ 0.533. P(Tablet | Smartphone) = 140/210 ≈ 0.667. Since these are not equal, the events are not independent.',
  }
,
  {
    id: 7203,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: UNIT_NAME,
    question:
      'IQ scores in a certain population are approximately normally distributed with a mean of 100 and a standard deviation of 15. Using the empirical rule, the shaded region in the figure representing scores greater than 115 represents approximately what percentage of the population?',
    image: IQ_NORMAL_CURVE,
    options: stripOptionPrefixes(['A) 2.5%', 'B) 13.5%', 'C) 16%', 'D) 34%', 'E) 50%']),
    correctAnswer: 'C',
    explanation:
      '115 is exactly 1 standard deviation above the mean (100 + 15 = 115). By the empirical rule, 68% of values fall within 1 SD of the mean, leaving 32% split evenly between the two tails (16% above 115).',
  }
,
  {
    id: 7216,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: UNIT_NAME,
    question:
      'A random variable X has P(X = 1) = 0.5 and P(X = 3) = 0.5. What is the standard deviation of X?',
    image: null,
    options: stripOptionPrefixes(['A) 0', 'B) 1', 'C) 1.41', 'D) 2', 'E) 4']),
    correctAnswer: 'B',
    explanation: 'E(X) = 2. Var(X) = (1-2)^2(0.5) + (3-2)^2(0.5) = 1. SD(X) = √1 = 1.',
  }
,
  {
    id: 7202,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.8', '2.9'],
    unitName: UNIT_NAME,
    question:
      'The probability distribution of X, the number of pets owned by a randomly selected household in a certain neighborhood, is shown in the probability histogram. What is the probability that a randomly selected household owns at least 2 pets?',
    image: PETS_PROBABILITY_HISTOGRAM,
    options: stripOptionPrefixes(['A) 0.30', 'B) 0.45', 'C) 0.55', 'D) 0.65', 'E) 0.70']),
    correctAnswer: 'C',
    explanation: 'P(X ≥ 2) = P(2) + P(3) + P(4) = 0.30 + 0.15 + 0.10 = 0.55.',
  }
,
  {
    id: 7212,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: UNIT_NAME,
    question:
      'A researcher simulates a basketball player making 80% of free throws 500 times (10 throws each). 380 trials resulted in at least 8 makes. What is the estimated probability?',
    image: null,
    options: stripOptionPrefixes(['A) 0.080', 'B) 0.380', 'C) 0.500', 'D) 0.760', 'E) 0.800']),
    correctAnswer: 'D',
    explanation: 'The estimated probability is the relative frequency: 380 / 500 = 0.76.',
  }
,
  {
    id: 7204,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: UNIT_NAME,
    question:
      'The histogram displays the probability distribution for X, the number of successes in 8 independent trials of a binomial random variable with probability of success p = 0.5 on each trial. Based on the histogram, which of the following is the best approximation for the standard deviation of X?',
    image: BINOMIAL_PROBABILITY_HISTOGRAM,
    options: stripOptionPrefixes(['A) 0.50', 'B) 1.00', 'C) 1.41', 'D) 2.00', 'E) 4.00']),
    correctAnswer: 'C',
    explanation:
      'For a binomial distribution, the standard deviation is σ = √(np(1-p)) = √(8 × 0.5 × 0.5) = √2 ≈ 1.41.',
  }
,
  {
    id: 7209,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: UNIT_NAME,
    question:
      'A high school has 1,200 students, of whom 30% participate in a fall sport. A researcher selects a random sample of 15 students without replacement and records how many participate in a fall sport. Why can this be treated as approximately binomial?',
    image: null,
    options: stripOptionPrefixes([
      'A) No, because sampling without replacement always violates independence.',
      'B) No, because np = 4.5, which is less than 10.',
      'C) Yes, because the sample size is less than 10% of the population.',
      'D) Yes, because every student has the same probability of participating.',
      'E) No, because the probability of success is not 0.5.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Since 15 is less than 10% of 1,200, the trials can be treated as approximately independent.',
  }
,
  {
    id: 7208,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: UNIT_NAME,
    question:
      'A game show contestant spins a wheel that lands on one of four prize amounts. What is the expected value of the prize amount?',
    image: null,
    tableData: PRIZE_DISTRIBUTION_TABLE,
    options: stripOptionPrefixes(['A) $100.00', 'B) $112.50', 'C) $137.50', 'D) $150.00', 'E) $187.50']),
    correctAnswer: 'C',
    explanation: 'E(X) = 0(0.40) + 50(0.35) + 200(0.20) + 500(0.05) = $137.50.',
  }
,
  {
    id: 7217,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: UNIT_NAME,
    question:
      'A multiple-choice quiz has 6 questions, each with 4 answer choices (one correct). If a student guesses randomly, what is the probability they get exactly 2 correct?',
    image: null,
    options: stripOptionPrefixes(['A) 0.0879', 'B) 0.1318', 'C) 0.2966', 'D) 0.3115', 'E) 0.4392']),
    correctAnswer: 'D',
    explanation:
      'Using the binomial formula with n=6, p=0.25, x=2: C(6,2) × (0.25)^2 × (0.75)^4 ≈ 0.3115.',
  }
,
  {
    id: 7205,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: UNIT_NAME,
    question:
      'A statistics class simulated the sampling distribution of the sample mean by repeatedly drawing random samples of size n from a population with a strongly right-skewed distribution. Which of the following best explains the pattern shown as sample size increases from n=5 to n=100?',
    image: CLT_SAMPLING_DISTRIBUTION,
    options: stripOptionPrefixes([
      'A) As sample size increases, the sampling distribution becomes more skewed.',
      'B) As sample size increases, the sampling distribution of the sample mean becomes approximately normal and less variable, illustrating the central limit theorem.',
      'C) As sample size increases, the population distribution becomes more normal.',
      'D) The shape change shown is due to bias introduced by larger sample sizes.',
      'E) The histograms should all have the same shape and spread regardless of sample size.',
    ]),
    correctAnswer: 'B',
    explanation:
      'This illustrates the central limit theorem: the sampling distribution of the sample mean becomes more normal and less variable as n increases.',
  }
,
  {
    id: 7214,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: UNIT_NAME,
    question:
      'A standard six-sided die is rolled once. Let event E be "the die shows a number greater than 4." What is P(E)?',
    image: null,
    options: stripOptionPrefixes(['A) 1/6', 'B) 1/3', 'C) 1/2', 'D) 2/3', 'E) 5/6']),
    correctAnswer: 'B',
    explanation: 'The outcomes greater than 4 are {5, 6}. P(E) = 2/6 = 1/3.',
  }
,
  {
    id: 7218,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: UNIT_NAME,
    question:
      'Bolt lengths are normally distributed (mean 50 mm, SD 0.8 mm). A bolt is "long" if it is at or above the 95th percentile. What is the minimum length for a bolt to be "long"?',
    image: null,
    options: stripOptionPrefixes(['A) 50.80', 'B) 51.32', 'C) 51.60', 'D) 52.40', 'E) 53.20']),
    correctAnswer: 'B',
    explanation: 'Using the 95th percentile z-score (1.645): x = 50 + 1.645(0.8) ≈ 51.32 mm.',
  }
,
  {
    id: 7215,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.6'],
    unitName: UNIT_NAME,
    question:
      'A box contains 10 components, 3 of which are defective. If two are selected without replacement, what is the probability that both are defective?',
    image: null,
    options: stripOptionPrefixes(['A) 0.06', 'B) 0.09', 'C) 0.067', 'D) 0.30', 'E) 0.233']),
    correctAnswer: 'C',
    explanation: 'P(both defective) = (3/10) × (2/9) = 6/90 ≈ 0.067.',
  }
,
  {
    id: 7219,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: UNIT_NAME,
    question:
      "Maria took a math test and a verbal test, each normally distributed with the mean, standard deviation, and Maria's score shown in the table below. On which test did she perform better relative to the distribution?",
    image: null,
    tableData: MARIA_TEST_SCORES_TABLE,
    options: stripOptionPrefixes([
      'A) Math, because 620 > 580.',
      'B) Math, because her z-score (1.20) is lower.',
      'C) Verbal, because her z-score (1.625) is higher.',
      'D) Cannot be compared.',
      'E) Verbal, because 580 is closer to a perfect score.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Math z = 1.20; Verbal z = 1.625. A higher z-score indicates better relative performance.',
  }
,
  {
    id: 7220,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: UNIT_NAME,
    question:
      'Adult heights have a mean of 68 inches and SD of 3 inches. For samples of size n = 36, what are the mean and standard deviation of the sampling distribution of the sample mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) Mean = 68, SD = 3',
      'B) Mean = 68, SD = 0.5',
      'C) Mean = 11.33, SD = 3',
      'D) Mean = 68, SD = 0.083',
      'E) Mean = 11.33, SD = 0.5',
    ]),
    correctAnswer: 'B',
    explanation:
      'The mean is the population mean (68). The standard deviation (standard error) is σ / √n = 3 / 6 = 0.5.',
  }

];
