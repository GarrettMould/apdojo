import type { Question } from '@/data/questionBanks/types';

const UNIT_NAME = 'Inference for Quantitative Data: Means';

/** Strip "A) " style prefixes — FullExam adds letter labels. */
function stripOptionPrefixes(options: string[]): string[] {
  return options.map((option) => option.replace(/^[A-E]\)\s*/, ''));
}

const STATS_UNIT4_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit4';

const ROUTE_COMMUTE_BOXPLOTS = {
  src: `${STATS_UNIT4_IMAGE_BASE}/u4_7421.png`,
  alt: 'Boxplots of commute times for Route A and Route B',
};

const GOLF_SCORE_DIFF_DOTPLOT = {
  src: `${STATS_UNIT4_IMAGE_BASE}/u4_7422.png`,
  alt: 'Dotplot of score differences after minus before golf lessons',
};

const SAMPLING_DIST_MEAN_CURVE = {
  src: `${STATS_UNIT4_IMAGE_BASE}/u4_7423.png`,
  alt: 'Normal curve for the sampling distribution of the sample mean with shaded region',
};

const ONBOARDING_TIME_HISTOGRAM = {
  src: `${STATS_UNIT4_IMAGE_BASE}/u4_7424.png`,
  alt: 'Histogram of onboarding task completion times',
};

/**
 * AP Statistics — Unit 4 **formal unit MCQ test**
 * (`/unit-mcq-test/4?subject=stats`, pretty URL `/ap-stats-unit-4-mcq-test`).
 * IDs in 74xx range (20 questions).
 */
/* export const statsUnit4McqTestQuestions: Question[] = [
  {
    id: 7401,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: UNIT_NAME,
    question: 'What is the mean of the sampling distribution of the sample mean (x̄)?',
    image: null,
    options: stripOptionPrefixes(['A) σ', 'B) μ', 'C) μ / √n', 'D) x̄', 'E) σ / n']),
    correctAnswer: 'B',
    explanation:
      'The mean of the sampling distribution of the sample mean is equal to the population mean μ. The mean of x̄ is an unbiased estimator of μ.',
  },
  {
    id: 7402,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: UNIT_NAME,
    question:
      'If a distribution of a quantitative variable is extremely skewed, what must be true for the sampling distribution of the sample mean to be approximately normal?',
    image: null,
    options: stripOptionPrefixes([
      'A) The sample size n must be very large (n >> 30).',
      'B) The sample size n can be as small as 5.',
      'C) The population standard deviation must be known.',
      'D) The t-distribution cannot be used.',
      'E) The mean must be 0.',
    ]),
    correctAnswer: 'A',
    explanation:
      'If the population distribution is extremely skewed, a sample size much larger than 30 may be needed to ensure the sampling distribution is approximately normal.',
  },
  {
    id: 7403,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question:
      'Which of the following describes a key difference between the t-distribution and the standard normal (z) distribution?',
    image: null,
    options: stripOptionPrefixes([
      'A) The t-distribution is skewed to the right.',
      'B) The t-distribution has wider tails than the normal distribution.',
      'C) The t-distribution is only used for proportions.',
      'D) The t-distribution has a smaller mean than the normal distribution.',
      'E) The t-distribution is independent of sample size.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The t-distribution is symmetric and bell-shaped like the normal distribution but has wider, fatter tails to account for the additional variability of using the sample standard deviation.',
  },
  {
    id: 7404,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question: 'What happens to the shape of the t-distribution as the degrees of freedom increase?',
    image: null,
    options: stripOptionPrefixes([
      'A) It becomes more skewed to the right.',
      'B) It becomes more skewed to the left.',
      'C) It becomes more like the standard normal distribution.',
      'D) It becomes flatter with wider tails.',
      'E) It loses its bell shape.',
    ]),
    correctAnswer: 'C',
    explanation:
      'As degrees of freedom increase, the t-distribution approaches the standard normal distribution.',
  },
  {
    id: 7405,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question: 'What is the standard error of the sample mean?',
    image: null,
    options: stripOptionPrefixes(['A) s / √n', 'B) σ / n', 'C) s / n', 'D) σ / √n', 'E) s × √n']),
    correctAnswer: 'A',
    explanation:
      'The standard error of a sample mean is estimated as s / √n. Use s for standard error when σ is unknown; σ / √n describes the standard deviation of the sampling distribution when σ is known.',
  },
  {
    id: 7406,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: UNIT_NAME,
    question: 'When is it appropriate to use a one-sample t-test for a population mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) When the population standard deviation is known.',
      'B) When the population standard deviation is unknown and we use the sample standard deviation.',
      'C) When we are comparing the means of two independent groups.',
      'D) When the sample size is less than 5.',
      'E) Only when the population distribution is perfectly normal.',
    ]),
    correctAnswer: 'B',
    explanation:
      'T-distributions are used for inferences about a population mean when the population standard deviation is unknown and the sample standard deviation is used instead.',
  },
  {
    id: 7407,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question: 'Which of the following is a condition for the one-sample t-interval for a population mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) The population must be exactly 10 times the sample size.',
      'B) The sample size must be exactly 30.',
      'C) The sample data should be free from strong skewness and outliers if n < 30.',
      'D) The population must be skewed.',
      'E) The mean must be 0.',
    ]),
    correctAnswer: 'C',
    explanation:
      'For small samples (n < 30), the sample data distribution should be free from strong skewness and outliers.',
  },
  {
    id: 7408,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: UNIT_NAME,
    question: 'In a matched pairs t-test, how are the data analyzed?',
    image: null,
    options: stripOptionPrefixes([
      'A) The means of the two groups are compared directly.',
      'B) The differences between pairs of values are calculated to produce one sample.',
      'C) The two groups are pooled.',
      'D) The variances are added.',
      'E) The sample sizes must be different.',
    ]),
    correctAnswer: 'B',
    explanation:
      'In a matched pairs design, differences between pairs are calculated to reduce variation, and then a one-sample t-procedure is applied to those differences.',
  },
  {
    id: 7409,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: UNIT_NAME,
    question:
      'What is the standard deviation of the sampling distribution of the difference between two sample means (x̄₁ − x̄₂)?',
    image: null,
    options: stripOptionPrefixes([
      'A) √(σ₁²/n₁ + σ₂²/n₂)',
      'B) σ₁/n₁ + σ₂/n₂',
      'C) √(σ₁/n₁ + σ₂/n₂)',
      'D) σ₁²/n₁ − σ₂²/n₂',
      'E) (σ₁ + σ₂) / √(n₁ + n₂)',
    ]),
    correctAnswer: 'A',
    explanation:
      'The standard deviation of the sampling distribution of the difference in sample means is √(σ₁²/n₁ + σ₂²/n₂). Variances are added, not standard deviations.',
  },
  {
    id: 7410,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.7'],
    unitName: UNIT_NAME,
    question: 'What is the standard error for a two-sample t-interval for the difference between two population means?',
    image: null,
    options: stripOptionPrefixes([
      'A) √(s₁²/n₁ + s₂²/n₂)',
      'B) s₁/√n₁ + s₂/√n₂',
      'C) (s₁ + s₂) / √(n₁ + n₂)',
      'D) √(s₁/n₁ + s₂/n₂)',
      'E) s₁²/n₁ + s₂²/n₂',
    ]),
    correctAnswer: 'A',
    explanation:
      'The standard error for the difference between two sample means is √(s₁²/n₁ + s₂²/n₂).',
  },
  {
    id: 7411,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: UNIT_NAME,
    question:
      'If a 95% confidence interval for a mean difference is (−5, 10), what is the correct conclusion at the α = 0.05 level?',
    image: null,
    options: stripOptionPrefixes([
      'A) There is a significant difference.',
      'B) The mean difference is likely 2.5.',
      'C) There is no significant difference.',
      'D) The means are definitely equal.',
      'E) The sample size was too large.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Because the interval contains 0, we do not have sufficient evidence to conclude a difference exists at the 0.05 significance level.',
  },
  {
    id: 7412,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: UNIT_NAME,
    question: 'Which of the following is true about the p-value in a hypothesis test?',
    image: null,
    options: stripOptionPrefixes([
      'A) It is the probability that the null hypothesis is true.',
      'B) It is the probability that the alternative hypothesis is true.',
      'C) It is the probability of observing a result at least as extreme as the one obtained, assuming H₀ is true.',
      'D) It is the same as the significance level.',
      'E) It is 1 minus the power of the test.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The p-value is the probability of obtaining a test statistic as extreme or more extreme than observed, given that the null hypothesis is true.',
  },
  {
    id: 7413,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.10'],
    unitName: UNIT_NAME,
    question: 'When testing H₀: μ₁ − μ₂ = 0, what does a p-value less than α signify?',
    image: null,
    options: stripOptionPrefixes([
      'A) The null hypothesis is proven true.',
      'B) The null hypothesis should be rejected.',
      'C) The alternative hypothesis is false.',
      'D) The sample sizes were equal.',
      'E) The difference between the means is exactly 0.',
    ]),
    correctAnswer: 'B',
    explanation:
      'When the p-value ≤ α, we reject the null hypothesis and have convincing evidence for the alternative. Use non-definitive language in conclusions.',
  },
]; */

export const statsUnit4McqTestQuestions: Question[] = [
  {
    id: 7401,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question:
      'A veterinary clinic weighs a random sample of 25 newborn kittens brought in for checkups over the course of a month. Based on this sample, the clinic calculates a 90% confidence interval for the mean birth weight (in grams) of newborn kittens: (85.2, 94.8). What is the sample mean weight, and what is the margin of error?',
    image: null,
    options: stripOptionPrefixes([
      'A) Mean = 90.0, Margin of Error = 4.8',
      'B) Mean = 90.0, Margin of Error = 9.6',
      'C) Mean = 85.2, Margin of Error = 9.6',
      'D) Mean = 94.8, Margin of Error = 4.8',
      'E) Mean = 90.0, Margin of Error = 2.4',
    ]),
    correctAnswer: 'A',
    explanation:
      'The sample mean is the midpoint of the interval: (85.2 + 94.8) / 2 = 90.0. The margin of error is the distance from the mean to the bound: 94.8 - 90.0 = 4.8.',
  },
  {
    id: 7402,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: UNIT_NAME,
    question:
      'A battery manufacturer claims its new AA battery has a mean voltage output of 100 millivolts above baseline. A quality control engineer wants to test whether the true mean output actually differs from this target, so she tests $H_0: \\mu = 100$ versus $H_a: \\mu \\neq 100$ using a random sample of 20 batteries. The calculated t-statistic is 2.15. Which of the following is the correct range for the p-value?',
    image: null,
    options: stripOptionPrefixes([
      'A) 0.01 < p < 0.02',
      'B) 0.02 < p < 0.05',
      'C) 0.05 < p < 0.10',
      'D) 0.10 < p < 0.20',
      'E) p > 0.20',
    ]),
    correctAnswer: 'B',
    explanation:
      'With df = 19, a t-statistic of 2.15 is between the critical values for alpha = 0.05 (2.093) and alpha = 0.025 (2.539). For a two-tailed test, the p-value is between 0.02 and 0.05.',
  },
  {
    id: 7423,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: UNIT_NAME,
    question:
      'Scores on a standardized math exam have a population mean of 680 and a population standard deviation of 90. For a random sample of $n = 36$ test-takers, the sampling distribution of the sample mean is shown below.',
    image: SAMPLING_DIST_MEAN_CURVE,
    questionAfterImage:
      'Using the empirical rule (68-95-99.7 rule) and the shaded region, what is the approximate probability that the sample mean falls between 665 and 710?',
    options: stripOptionPrefixes([
      'A) 81.5%',
      'B) 68%',
      'C) 95%',
      'D) 47.5%',
      'E) 13.5%',
    ]),
    correctAnswer: 'A',
    explanation:
      'The shaded region spans from 1 standard deviation below the mean (665) to 2 standard deviations above the mean (710). Using the empirical rule, the area from -1 SD to +1 SD is 68%, so the area from -1 SD to the mean is 34%. The area from the mean to +2 SD is 34% + 13.5% = 47.5%. Adding these pieces together: 34% + 47.5% = 81.5%.',
  },
  {
    id: 7403,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: UNIT_NAME,
    question:
      "A cereal company's automated filling machine dispenses boxes of cereal with a population standard deviation of 12 grams. A quality inspector plans to randomly sample 36 boxes each shift to monitor the process. What is the standard deviation of the sampling distribution of the sample mean weight?",
    image: null,
    options: stripOptionPrefixes(['A) 12', 'B) 6', 'C) 3', 'D) 2', 'E) 0.33']),
    correctAnswer: 'D',
    explanation:
      'The standard deviation of the sampling distribution is sigma / sqrt(n). 12 / sqrt(36) = 12 / 6 = 2.',
  },
  {
    id: 7404,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: UNIT_NAME,
    question:
      'A lightbulb manufacturer, Brightline Inc., claims that the mean lifespan of its LED bulbs is 1,200 hours. A consumer advocacy group suspects this is overstated and tests a random sample of 40 bulbs, finding a mean lifespan of 1,180 hours with a standard deviation of 50 hours. To test whether the true mean lifespan is less than 1,200 hours, they calculate a test statistic. What is it?',
    image: null,
    options: stripOptionPrefixes([
      'A) (1180 - 1200) / (50/sqrt(40))',
      'B) (1200 - 1180) / (50/sqrt(40))',
      'C) (1180 - 1200) / (50/40)',
      'D) (1180 - 1200) / (50/sqrt(39))',
      'E) (1180 - 1200) / 50',
    ]),
    correctAnswer: 'A',
    explanation:
      'The t-statistic formula is (x-bar - mu0) / (s / sqrt(n)). Here: (1180 - 1200) / (50 / sqrt(40)).',
  },
  {
    id: 7424,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question:
      'An operations manager records the time (in minutes) it takes a random sample of $n = 24$ employees to complete a new onboarding task. Based on the histogram of the data shown below, is it appropriate to construct a one-sample t-interval?',
    image: ONBOARDING_TIME_HISTOGRAM,
    options: stripOptionPrefixes([
      'A) Yes, because the sample was randomly selected, and that is the only condition that must be checked.',
      'B) Yes, because the t-distribution automatically adjusts for skewness regardless of sample size.',
      'C) No, because the sample size is less than 30 and the histogram shows strong right skew with an outlier, so the sample data condition is not met.',
      'D) No, because the population standard deviation is unknown.',
      'E) Yes, because n = 24 is close enough to 30 for the central limit theorem to apply.',
    ]),
    correctAnswer: 'C',
    explanation:
      'A one-sample t-interval requires the sample data condition: the population distribution is approximately normal, or n ≥ 30, or (if n < 30) the sample data are free of strong skewness and outliers. Here n = 24 < 30, and the histogram shows strong right skew along with an isolated outlier near 60 minutes, so this condition is not satisfied. Not knowing the population standard deviation (D) is actually the reason a t-procedure, rather than a z-procedure, is used — it is not a barrier to inference.',
  },
  {
    id: 7405,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: UNIT_NAME,
    question:
      'An automotive magazine compared the fuel efficiency of two competing sedan models by test-driving independent samples of each on identical routes. A 95% confidence interval for the difference in mean miles per gallon ($\\mu_1 - \\mu_2$) is (-3.2, 1.8). What is the correct interpretation?',
    image: null,
    options: stripOptionPrefixes([
      'A) We are 95% confident that the mean fuel efficiency of model 1 is 3.2 mpg less than model 2.',
      'B) There is a 95% chance that the true mean difference is between -3.2 and 1.8.',
      'C) We are 95% confident that the true difference in mean fuel efficiency is between -3.2 and 1.8 mpg.',
      'D) 95% of cars have a difference in efficiency between -3.2 and 1.8.',
      'E) We can conclude that model 1 is more efficient than model 2.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The standard interpretation of a confidence interval for a mean difference is that we are C% confident the true difference in means is contained within the interval.',
  },
  {
    id: 7406,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: UNIT_NAME,
    question:
      'A pollster is constructing a confidence interval for the mean amount of time (in minutes) that registered voters spent researching candidates before a local election, using a known population standard deviation. If the pollster changes the confidence level from 95% to 90%, what will happen to the margin of error?',
    image: null,
    options: stripOptionPrefixes([
      'A) The margin of error will increase.',
      'B) The margin of error will decrease.',
      'C) The margin of error will stay the same.',
      'D) The margin of error will double.',
      'E) The effect on the margin of error cannot be determined.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The margin of error is calculated as $z^* \\times (\\sigma / \\sqrt{n})$. A 90% confidence level has a smaller critical value than a 95% level, resulting in a smaller margin of error.',
  },
  {
    id: 7407,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: UNIT_NAME,
    question:
      'A snack food company labels its granola bars as containing 50 calories. A dietitian suspects the true mean calorie content is higher and collects a random sample of 25 bars, finding a sample mean of 52 calories with a standard error of 1.5. What is the value of the t-statistic for testing whether the true mean differs from the labeled value?',
    image: null,
    options: stripOptionPrefixes(['A) 0.67', 'B) 1.33', 'C) 2.00', 'D) 3.00', 'E) 33.33']),
    correctAnswer: 'B',
    explanation:
      'The t-statistic is calculated as $( \\overline{x} - \\mu_0 ) / SE$. Here, $(52 - 50) / 1.5 = 2 / 1.5 = 1.33$.',
  },
  {
    id: 7422,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: UNIT_NAME,
    question:
      'A golf instructor records the scores of 8 golfers before and after a one-week lesson series. The dotplot below shows the difference in score (after − before) for each golfer, where a negative value indicates the golfer\'s score improved (decreased).\n\n' +
      'What is the sample mean difference, $\\bar{x}_d$ (after − before), for these 8 golfers?',
    image: GOLF_SCORE_DIFF_DOTPLOT,
    options: stripOptionPrefixes([
      'A) -3.0',
      'B) -2.5',
      'C) -24',
      'D) -2.0',
      'E) 3.0',
    ]),
    correctAnswer: 'A',
    explanation:
      'Reading the dotplot, the 8 differences are -5, -4, -4, -3, -3, -2, -2, -1. The sum is -24, so the sample mean difference is $-24 / 8 = -3.0$. Answer (C) is the sum rather than the mean, and the other options result from misreading the dots or the direction of the difference.',
  },
  {
    id: 7408,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.7'],
    unitName: UNIT_NAME,
    question:
      'A school district compares standardized test scores between two middle schools, School A and School B, using independent random samples of students from each. A 95% confidence interval for the difference in mean scores ($\\mu_A - \\mu_B$) is (2.5, 7.5). What is the point estimate for the difference in means?',
    image: null,
    options: stripOptionPrefixes(['A) 2.5', 'B) 5.0', 'C) 7.5', 'D) 10.0', 'E) 0']),
    correctAnswer: 'B',
    explanation: 'The point estimate is the midpoint of the confidence interval: $(2.5 + 7.5) / 2 = 5.0$.',
  },
  {
    id: 7409,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question:
      'A botanist studying an endangered species of orchid wants to estimate the mean height of mature plants to within 2 cm with 95% confidence. Based on similar species, she assumes the population standard deviation is 10 cm. Approximately how large a sample of orchids is required?',
    image: null,
    options: stripOptionPrefixes(['A) 25', 'B) 50', 'C) 97', 'D) 100', 'E) 150']),
    correctAnswer: 'C',
    explanation:
      'Margin of Error (MOE) = $z^* \\times (\\sigma / \\sqrt{n})$. $2 = 1.96 \\times (10 / \\sqrt{n})$. Solving for n gives $n = (1.96 * 10 / 2)^2 \\approx 96.04$. Round up to 97.',
  },
  {
    id: 7410,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.9'],
    unitName: UNIT_NAME,
    question:
      'A marketing analyst wants to compare the average dollar amount spent by customers who viewed Advertisement A versus customers who viewed Advertisement B, using two separately recruited groups of shoppers. Which of the following is an assumption required to perform a two-sample t-test for the difference between these two population means?',
    image: null,
    options: stripOptionPrefixes([
      'A) The two population standard deviations must be equal.',
      'B) Both sample sizes must be exactly equal.',
      'C) The two samples must be independent.',
      'D) The population distributions must be exactly normal for any sample size.',
      'E) The sum of the means must be 0.',
    ]),
    correctAnswer: 'C',
    explanation: 'For a two-sample t-test, the two samples must be independent.',
  },
  {
    id: 7411,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: UNIT_NAME,
    question:
      'A pharmaceutical company tests a new supplement to see whether it raises mean HDL ("good") cholesterol above the current population mean of 20 mg/dL. The researchers test $H_0: \\mu = 20$ vs $H_a: \\mu > 20$ and calculate a p-value of 0.08. At the $\\alpha = 0.05$ significance level, what should they conclude?',
    image: null,
    options: stripOptionPrefixes([
      'A) Reject H0 and conclude the mean is greater than 20.',
      'B) Fail to reject H0 and conclude the mean is greater than 20.',
      'C) Fail to reject H0 and conclude there is not sufficient evidence the mean is greater than 20.',
      'D) Accept H0 as true.',
      'E) The test is invalid because the p-value is too high.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Since 0.08 > 0.05, we fail to reject the null. We conclude there is not sufficient evidence for the alternative.',
  },
  {
    id: 7421,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.7', '4.8'],
    unitName: UNIT_NAME,
    question:
      'A transportation researcher wants to estimate the difference in mean commute time between two bus routes. Independent random samples of riders were selected from each route, and their commute times (in minutes) were recorded. The boxplots and summary statistics for each sample are shown below:',
    image: ROUTE_COMMUTE_BOXPLOTS,
    questionAfterImage:
      'What is the margin of error for a 95% confidence interval for the difference in mean commute times ($\\mu_A - \\mu_B$)?',
    options: stripOptionPrefixes([
      'A) 4.89 minutes',
      'B) 3.43 minutes',
      'C) 11.06 minutes',
      'D) 4.44 minutes',
      'E) 2.26 minutes',
    ]),
    correctAnswer: 'A',
    explanation:
      'The standard error is $SE = \\sqrt{s_1^2/n_1 + s_2^2/n_2} = \\sqrt{5.8^2/16 + 6.5^2/14} = \\sqrt{2.1025 + 3.0179} = \\sqrt{5.1204} \\approx 2.263$. The margin of error is $t^* \\times SE = 2.160 \\times 2.263 \\approx 4.89$ minutes. (B) results from incorrectly pooling the sample sizes in the denominator, (C) omits the square root in the SE calculation, (D) incorrectly uses $z^* = 1.96$ instead of $t^*$, and (E) reports the standard error without multiplying by the critical value.',
  },
  {
    id: 7412,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question:
      'A landscaper measures the height of a random sample of 18 saplings from a new shipment to construct a t-interval for the mean height of all saplings in the shipment. What are the degrees of freedom for this one-sample t-procedure?',
    image: null,
    options: stripOptionPrefixes(['A) 19', 'B) 18', 'C) 17', 'D) 9', 'E) 35']),
    correctAnswer: 'C',
    explanation: 'Degrees of freedom for a one-sample t-test is n - 1. Here, 18 - 1 = 17.',
  },
  {
    id: 7414,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: UNIT_NAME,
    question:
      'A high school counselor surveys a random sample of 40 students and finds a mean weekly study time of 15 hours with a standard deviation of 4 hours. What is the margin of error for a 90% confidence interval for the true mean study time of all students at the school?',
    image: null,
    options: stripOptionPrefixes([
      'A) 1.645 * (4 / sqrt(40))',
      'B) 1.684 * (4 / sqrt(40))',
      'C) 1.96 * (4 / sqrt(40))',
      'D) 1.645 * (4 / 40)',
      'E) 1.684 * (4 / 40)',
    ]),
    correctAnswer: 'B',
    explanation:
      'Margin of error is $t^* \\times (s / \\sqrt{n})$. For 90% confidence and df=39, $t^* \\approx 1.684$.',
  },
  {
    id: 7425,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.9', '4.10'],
    unitName: UNIT_NAME,
    question:
      'An education researcher believes that students taught with Method A will have a higher mean exam score than students taught with Method B. She conducts a two-sample t-test using statistical software, which by default reports a two-tailed p-value. The output is shown below:\n\n' +
      'Two-Sample T-Test\n' +
      'Difference = μ(Method A) − μ(Method B)\n' +
      't = 2.87     DF = 26     P-value (two-tailed) = 0.0081\n\n' +
      'Since the researcher\'s alternative hypothesis is one-sided ($H_a: \\mu_A > \\mu_B$), which of the following gives the correct p-value to use for her test, along with the correct conclusion at $\\alpha = 0.01$?',
    image: null,
    options: stripOptionPrefixes([
      'A) p ≈ 0.0081; fail to reject H0; there is not sufficient evidence Method A produces a higher mean score.',
      'B) p ≈ 0.0041; reject H0; there is sufficient evidence Method A produces a higher mean score.',
      'C) p ≈ 0.0162; reject H0; there is sufficient evidence Method A produces a higher mean score.',
      'D) p ≈ 0.0041; fail to reject H0; there is not sufficient evidence Method A produces a higher mean score.',
      'E) p ≈ 0.0081; reject H0; there is sufficient evidence Method A produces a higher mean score.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Because the software reports a two-tailed p-value but the researcher is conducting a one-sided test, the correct p-value is half the reported value: $0.0081 / 2 \\approx 0.0041$. Since $0.0041 < \\alpha = 0.01$, the researcher should reject H0. There is sufficient evidence that Method A produces a higher mean exam score than Method B. Answer (E) fails to halve the p-value, and (A), (C), and (D) either misapply the halving or draw the wrong conclusion from the resulting p-value.',
  },
  {
    id: 7419,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: UNIT_NAME,
    question:
      'An orchard owner records the weight of every apple harvested this season, forming a population with mean $\\mu$. If she repeatedly draws random samples of apples and computes the sample mean weight each time, what is the mean of this sampling distribution of $\\overline{x}$?',
    image: null,
    options: stripOptionPrefixes(['A) sigma', 'B) mu', 'C) mu / sqrt(n)', 'D) x-bar', 'E) sigma / n']),
    correctAnswer: 'B',
    explanation:
      'The mean of the sampling distribution of the sample mean is equal to the population mean, mu.',
  },
  {
    id: 7420,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: UNIT_NAME,
    question:
      "As in data on sale prices for previously owned homes in a western city, suppose a quantitative variable's population distribution is strongly right-skewed. What must be true for the sampling distribution of the sample mean to be approximately normal?",
    image: null,
    options: stripOptionPrefixes([
      'A) The sample size n must be very large (n >> 30).',
      'B) The sample size n can be as small as 5.',
      'C) The population standard deviation must be known.',
      'D) The t-distribution cannot be used.',
      'E) The mean must be 0.',
    ]),
    correctAnswer: 'A',
    explanation:
      'If the population distribution is extremely skewed, a sample size much larger than 30 may be needed to ensure the sampling distribution is approximately normal.',
  },
];
