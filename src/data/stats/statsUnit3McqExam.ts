import type { Question } from '@/data/questionBanks/types';

const UNIT_NAME = 'Inference for Categorical Data: Proportions';

/** Strip "A) " style prefixes — FullExam adds letter labels. */
function stripOptionPrefixes(options: string[]): string[] {
  return options.map((option) => option.replace(/^[A-E]\)\s*/, ''));
}

const LEARNING_STYLE_AGE_TABLE = {
  headers: ['Age Group', 'Visual', 'Auditory', 'Kinesthetic', 'Total'],
  rows: [
    ['18-24', '12', '8', '9', '29'],
    ['25-34', '10', '15', '55', '80'],
    ['35+', '18', '22', '51', '91'],
    ['Total', '40', '45', '115', '200'],
  ],
};

const TWO_CITY_VOTER_TABLE = {
  headers: ['City', 'Sample Size (n)', 'In Favor of Candidate A (x)'],
  rows: [
    ['City 1', '100', '60'],
    ['City 2', '150', '75'],
  ],
};

const SODA_TAX_OPINION_TOTALS_TABLE = {
  headers: ['Category', 'Support', 'Oppose', 'Total'],
  rows: [
    ['Row totals', '100', '100', '200'],
    ['Age-group column totals', '50', '70', '80'],
  ],
};

const COUNTY_BALLOT_INTERVAL_TABLE = {
  headers: ['Statistic', 'Value'],
  rows: [
    ['Lower bound', '0.03'],
    ['Upper bound', '0.12'],
  ],
};

const STATS_UNIT3_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit3';


const TREATMENT_RECOVERY_SEGMENTED_BAR = {
  src: `${STATS_UNIT3_IMAGE_BASE}/u3q3.png`,
  alt: 'Segmented bar chart comparing recovery proportions for treatment vs. placebo',
};

const SMARTPHONE_OWNERSHIP_MOSAIC = {
  src: `${STATS_UNIT3_IMAGE_BASE}/u3q4.png`,
  alt: 'Mosaic plot of smartphone ownership by age range',
};

const SAMPLING_DIST_PROPORTION_CURVE = {
  src: `${STATS_UNIT3_IMAGE_BASE}/u3_7312.png`,
  alt: 'Sampling distribution of sample proportion with one standard deviation shaded',
};

const PVALUE_TWO_TAILED_CURVE = {
  src: `${STATS_UNIT3_IMAGE_BASE}/u3_7316.png`,
  alt: 'Standard normal curve with two-tailed p-value regions shaded beyond z = 2.10',
};

const TYPE_I_II_ERROR_DIAGRAM = {
  src: `${STATS_UNIT3_IMAGE_BASE}/u3_7318.png`,
  alt: 'Null and true sampling distributions with Type I and Type II error regions labeled',
};

const TWO_POPULATION_PROPORTIONS_TABLE = {
  headers: ['Population', 'True proportion (p)', 'Sample size (n)'],
  rows: [
    ['Population 1', '0.40', '120'],
    ['Population 2', '0.35', '150'],
  ],
};

/**
 * AP Statistics — Unit 3 **formal unit MCQ test**
 * (`/unit-mcq-test/3?subject=stats`, pretty URL `/ap-stats-unit-3-mcq-test`).
 * IDs in 73xx range (7301–7320).
 */
/* export const statsUnit3McqTestQuestions: Question[] = [
  {
    id: 7301,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: UNIT_NAME,
    question:
      'A researcher conducted a chi-square test for homogeneity to compare the distribution of preferred learning styles (Visual, Auditory, Kinesthetic) across three different age groups (18-24, 25-34, 35+). Based on the two-way table provided below, what is the expected count for the number of participants aged 35+ who prefer a Visual learning style?',
    image: null,
    tableData: LEARNING_STYLE_AGE_TABLE,
    options: stripOptionPrefixes(['A) 12.5', 'B) 15.0', 'C) 18.2', 'D) 20.0', 'E) 22.5']),
    correctAnswer: 'C',
    explanation:
      'The expected count for a cell is (row total × column total) / table total. For 35+ and Visual: (91 × 40) / 200 = 18.2.',
  },
  {
    id: 7302,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: UNIT_NAME,
    question:
      'A polling firm surveyed 400 voters regarding their support for a local bond issue. The 95% confidence interval for the proportion of voters who support the issue is (0.42, 0.54). Based on the provided confidence interval, which of the following statements is correct?',
    image: null,
    options: stripOptionPrefixes([
      'A) We are 95% confident that the sample proportion is 0.48.',
      'B) There is a 95% probability that the population proportion is between 0.42 and 0.54.',
      'C) We are 95% confident that the population proportion of voters who support the bond issue is between 0.42 and 0.54.',
      'D) 95% of all voters support the bond issue.',
      'E) The margin of error for this interval is 0.12.',
    ]),
    correctAnswer: 'C',
    explanation:
      'A confidence interval is interpreted in terms of the population parameter: we are C% confident that the interval captures the true population proportion.',
  },
  {
    id: 7303,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: UNIT_NAME,
    question:
      'Two independent samples were taken to compare the proportions of success for a new medicine vs. a placebo. The segment bar chart below displays the proportion of patients who recovered. Which observation is best supported by the chart?',
    image: TREATMENT_RECOVERY_SEGMENTED_BAR,
    options: stripOptionPrefixes([
      'A) The proportion of recovery is higher for the placebo group.',
      'B) The proportions of recovery are identical.',
      'C) The proportion of recovery is significantly higher for the treatment group.',
      'D) The sample sizes for both groups must be different.',
      'E) The data is not categorical.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The segmented bar chart shows the proportion of successes (recovery) is visually larger for the treatment bar than the placebo bar.',
  },
  {
    id: 7304,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: UNIT_NAME,
    question:
      'A study was conducted to check for an association between age range and smartphone ownership. The mosaic plot below shows the breakdown of ownership across four age groups (18-29, 30-44, 45-59, and 60+). If the two variables were independent, what would the mosaic plot look like?',
    image: SMARTPHONE_OWNERSHIP_MOSAIC,
    options: stripOptionPrefixes([
      'A) The heights of the bars would be different, but the widths would be the same.',
      'B) The segment proportions within each age-group bar would be identical across all four age groups.',
      'C) The area of the "Owns Smartphone" segments would be zero.',
      'D) The bars would show a strong upward trend.',
      'E) The plot would be skewed to the left.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Independence in a mosaic plot is visualized when the conditional distributions are identical across categories (horizontal segment lines align across bars).',
  },
  {
    id: 7305,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: UNIT_NAME,
    question:
      'A company tests a new packaging design. The null hypothesis is that the proportion of damaged packages is 0.05. A sample of 200 packages results in a p-value of 0.02. Which conclusion is correct?',
    image: null,
    options: stripOptionPrefixes([
      'A) There is convincing evidence that the proportion of damaged packages is 0.05.',
      'B) There is convincing evidence that the proportion of damaged packages is different from 0.05.',
      'C) We fail to reject the null hypothesis at the 0.05 level.',
      'D) The proportion of damaged packages is exactly 0.02.',
      'E) The result is not statistically significant.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Since the p-value (0.02) < α (0.05), we reject the null hypothesis, providing convincing evidence for the alternative.',
  },
  {
    id: 7306,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: UNIT_NAME,
    question:
      'A researcher is investigating whether the proportion of all residents in a large city who favor a new park project is equal to 0.50. She takes a random sample of 100 residents and finds 58 are in favor. Which of the following is a correct interpretation of the p-value in this context?',
    image: null,
    options: stripOptionPrefixes([
      'A) The probability that the true proportion is 0.50.',
      'B) The probability that the true proportion is 0.58.',
      'C) The probability of obtaining a sample proportion of at least 0.58 if the true population proportion is 0.50.',
      'D) The probability that the null hypothesis is true.',
      'E) The probability that the alternative hypothesis is true.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The p-value is the probability of observing a result as extreme or more extreme than the one observed, assuming the null hypothesis is true.',
  },
  {
    id: 7307,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: UNIT_NAME,
    question:
      'Which of the following conditions must be met for a one-sample z-interval for a population proportion to be valid?',
    image: null,
    options: stripOptionPrefixes([
      'A) The population must be normally distributed.',
      'B) The sample size n must be greater than 30.',
      'C) The expected number of successes and failures in the sample must each be at least 10.',
      'D) The population size must be at least 100 times the sample size.',
      'E) The sample proportion must be exactly 0.5.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The normality condition for proportions requires the observed number of successes and failures to be at least 10.',
  },
  {
    id: 7308,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: UNIT_NAME,
    question:
      'A study compares the proportion of left-handed students at two different universities. If the 95% confidence interval for the difference in proportions (p₁ − p₂) is (−0.02, 0.08), what conclusion can be drawn?',
    image: null,
    options: stripOptionPrefixes([
      'A) There is a statistically significant difference between the two proportions.',
      'B) There is no statistically significant difference because the interval contains 0.',
      'C) Both proportions are likely equal to 0.03.',
      'D) The proportion at university 1 is significantly higher.',
      'E) The sample sizes are too small to make a conclusion.',
    ]),
    correctAnswer: 'B',
    explanation:
      'If a confidence interval for the difference between two parameters contains 0, there is insufficient evidence to conclude a difference exists.',
  },
  {
    id: 7309,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: UNIT_NAME,
    question:
      'In a chi-square test for independence, what are the degrees of freedom if the two-way table has 3 rows and 4 columns?',
    image: null,
    options: stripOptionPrefixes(['A) 2', 'B) 3', 'C) 6', 'D) 12', 'E) 5']),
    correctAnswer: 'C',
    explanation:
      'Degrees of freedom for a chi-square test are (number of rows − 1) × (number of columns − 1). Here, (3 − 1)(4 − 1) = 6.',
  },
  {
    id: 7310,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: UNIT_NAME,
    question:
      'A researcher finds a p-value of 0.0036. Using a significance level of α = 0.05, what is the appropriate formal decision?',
    image: null,
    options: stripOptionPrefixes([
      'A) Reject the null hypothesis.',
      'B) Fail to reject the null hypothesis.',
      'C) Accept the null hypothesis.',
      'D) Accept the alternative hypothesis.',
      'E) The test is inconclusive.',
    ]),
    correctAnswer: 'A',
    explanation: 'If the p-value is less than or equal to α, the null hypothesis must be rejected.',
  },
  {
    id: 7311,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: UNIT_NAME,
    question: 'Which of the following is true regarding a Type II error?',
    image: null,
    options: stripOptionPrefixes([
      'A) It occurs when we reject a true null hypothesis.',
      'B) It is the probability of failing to reject a false null hypothesis.',
      'C) Its probability is denoted by α.',
      'D) It can be minimized by decreasing the sample size.',
      'E) It occurs when we accept the null hypothesis as true.',
    ]),
    correctAnswer: 'B',
    explanation: 'A Type II error occurs when we fail to reject a false null hypothesis.',
  },
  {
    id: 7312,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.12'],
    unitName: UNIT_NAME,
    question:
      'For two independent samples used in a two-sample z-test for proportions, what must be true about the combined (pooled) proportion?',
    image: null,
    options: stripOptionPrefixes([
      'A) It is the average of the two sample proportions.',
      'B) It is used only if the sample sizes are equal.',
      'C) It is the total number of successes divided by the total number of observations.',
      'D) It is only used when the population proportions are known.',
      'E) It is not required for the normality condition.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The pooled proportion is calculated as the sum of successes from both samples divided by the sum of sample sizes.',
  },
  {
    id: 7313,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: UNIT_NAME,
    question: 'What is the purpose of the 10% condition in a one-sample z-test for a proportion?',
    image: null,
    options: stripOptionPrefixes([
      'A) To ensure the sample size is large enough.',
      'B) To ensure the independence of the observations when sampling without replacement.',
      'C) To ensure the distribution of the sample proportion is normal.',
      'D) To minimize response bias.',
      'E) To define the population size.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The 10% condition ensures that samples are effectively independent when sampling without replacement.',
  },
  {
    id: 7314,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: UNIT_NAME,
    question:
      'In a chi-square test for homogeneity, what does a very large chi-square statistic indicate?',
    image: null,
    options: stripOptionPrefixes([
      'A) The observed counts are very close to the expected counts.',
      'B) The p-value is very large.',
      'C) There is a large difference between observed and expected counts.',
      'D) The variables are independent.',
      'E) The sample size is too small.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The chi-square statistic measures the distance between observed and expected counts; a larger distance results in a larger statistic.',
  },
  {
    id: 7315,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: UNIT_NAME,
    question: 'Which of the following is true about a point estimator?',
    image: null,
    options: stripOptionPrefixes([
      'A) It must always equal the population parameter.',
      'B) It is unbiased if it underestimates the parameter on average.',
      'C) It is unbiased if it does not overestimate or underestimate the parameter on average.',
      'D) It cannot be a sample statistic.',
      'E) It is only valid if the sample size is greater than 100.',
    ]),
    correctAnswer: 'C',
    explanation:
      'An estimator is unbiased if, on average, it does not underestimate or overestimate the population parameter.',
  },
  {
    id: 7316,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: UNIT_NAME,
    question:
      'If a researcher wants to decrease the width of a confidence interval, which of the following actions should they take?',
    image: null,
    options: stripOptionPrefixes([
      'A) Increase the confidence level.',
      'B) Decrease the sample size.',
      'C) Increase the sample size.',
      'D) Use a larger critical z-value.',
      'E) Change the parameter of interest.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Confidence interval width is proportional to 1/√n; increasing sample size decreases the margin of error and the interval width.',
  },
  {
    id: 7317,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: UNIT_NAME,
    question: 'Which of the following is true about the chi-square distribution?',
    image: null,
    options: stripOptionPrefixes([
      'A) It can take negative values.',
      'B) It is always symmetric.',
      'C) It is always skewed to the right.',
      'D) Its shape does not depend on the degrees of freedom.',
      'E) It is equivalent to a normal distribution.',
    ]),
    correctAnswer: 'C',
    explanation: 'Chi-square distributions have positive values and are always skewed right.',
  },
  {
    id: 7318,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: UNIT_NAME,
    question: 'When performing a hypothesis test, what is the significance level α?',
    image: null,
    options: stripOptionPrefixes([
      'A) The probability of rejecting the null hypothesis when it is false.',
      'B) The probability of failing to reject the null hypothesis when it is false.',
      'C) The predetermined probability of rejecting a true null hypothesis.',
      'D) The probability that the alternative hypothesis is true.',
      'E) The p-value of the test.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Significance level α is the predetermined probability of rejecting the null hypothesis given that it is true (Type I error rate).',
  },
  {
    id: 7319,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.9'],
    unitName: UNIT_NAME,
    question:
      'Which of the following describes the sampling distribution of the difference in sample proportions (p̂₁ − p̂₂)?',
    image: null,
    options: stripOptionPrefixes([
      'A) It is always uniform.',
      'B) It has a mean equal to (p₁ − p₂).',
      'C) It has a standard deviation equal to the sum of the individual standard deviations.',
      'D) It can only be used if the sample sizes are equal.',
      'E) It is always skewed.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The mean of the sampling distribution of the difference in sample proportions is the difference of the population proportions.',
  },
  {
    id: 7320,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: UNIT_NAME,
    question:
      'What happens to the power of a hypothesis test if the true parameter value is farther from the null hypothesis?',
    image: null,
    options: stripOptionPrefixes([
      'A) Power decreases.',
      'B) Power increases.',
      'C) Power stays the same.',
      'D) The significance level must change.',
      'E) Power becomes zero.',
    ]),
    correctAnswer: 'B',
    explanation: 'Power increases when the true parameter value is farther from the null hypothesis.',
  },
  {
    id: 7321,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: UNIT_NAME,
    question:
      'A survey finds that 60% of students prefer blue, with a 3% margin of error at the 95% confidence level. What does this mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) 95% of the population prefers blue.',
      'B) We are 95% confident that the true population proportion is between 57% and 63%.',
      'C) 95% of the samples will have 60% preference.',
      'D) The probability that the true proportion is 0.60 is 0.95.',
      'E) The margin of error will be smaller if we reduce the confidence level.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A confidence interval provides a range of plausible values that we are C% confident captures the true population parameter.',
  },
  {
    id: 7322,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: UNIT_NAME,
    question: 'What does a chi-square test for independence assess?',
    image: null,
    options: stripOptionPrefixes([
      'A) If two populations have the same distribution.',
      'B) If two categorical variables are associated in a single population.',
      'C) If the sample proportion equals the population proportion.',
      'D) If the means of two groups are equal.',
      'E) If a distribution is normal.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A chi-square test for independence assesses association between two categorical variables within a single population.',
  },
  {
    id: 7323,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: UNIT_NAME,
    question:
      'Which of the following is true about a confidence interval as the confidence level increases (e.g., from 90% to 99%)?',
    image: null,
    options: stripOptionPrefixes([
      'A) The width of the interval decreases.',
      'B) The margin of error decreases.',
      'C) The width of the interval increases.',
      'D) The sample size required increases.',
      'E) The probability that the parameter is in the interval decreases.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Increasing the confidence level requires a larger critical value, which increases the margin of error and the interval width.',
  },
  {
    id: 7324,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.5'],
    unitName: UNIT_NAME,
    question:
      'In a one-sample z-test for a proportion, what is the null hypothesis regarding the population proportion p?',
    image: null,
    options: stripOptionPrefixes([
      'A) p = p̂',
      'B) p = p₀',
      'C) p < p₀',
      'D) p > p₀',
      'E) p ≠ p₀',
    ]),
    correctAnswer: 'B',
    explanation:
      'The null hypothesis states that the population proportion is equal to a specific null hypothesized value, p₀.',
  },
  {
    id: 7325,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: UNIT_NAME,
    question: 'What is the standard error of the sample proportion p̂?',
    image: null,
    options: stripOptionPrefixes([
      'A) √(p(1 − p)/n)',
      'B) √(p̂(1 − p̂)/n)',
      'C) p̂(1 − p̂)/n',
      'D) n / √(p̂)',
      'E) p / n',
    ]),
    correctAnswer: 'B',
    explanation:
      'The standard error of the sample proportion is √(p̂(1 − p̂)/n). Standard error uses the sample proportion, while the standard deviation of the sampling distribution uses the population proportion.',
  },
]; */

export const statsUnit3McqTestQuestions: Question[] = [
  {
    id: 7301,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: UNIT_NAME,
    question:
      'A researcher conducted a chi-square test for homogeneity to compare the distribution of preferred learning styles (Visual, Auditory, Kinesthetic) across three different age groups (18-24, 25-34, 35+). Based on the two-way table provided below, what is the expected count for the number of participants aged 35+ who prefer a Visual learning style?',
    image: null,
    tableData: LEARNING_STYLE_AGE_TABLE,
    options: stripOptionPrefixes(['A) 12.5', 'B) 15.0', 'C) 18.2', 'D) 20.0', 'E) 22.5']),
    correctAnswer: 'C',
    explanation:
      'The expected count for a cell is (row total x column total) / table total. For 35+ and Visual: (91 x 40) / 200 = 18.2.',
  },
  {
    id: 7302,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: UNIT_NAME,
    question:
      'A polling firm surveyed 400 voters regarding their support for a local bond issue. The 95% confidence interval for the proportion of voters who support the issue is (0.42, 0.54). Based on the provided confidence interval, which of the following statements is correct?',
    image: null,
    options: stripOptionPrefixes([
      'A) We are 95% confident that the sample proportion is 0.48.',
      'B) There is a 95% probability that the population proportion is between 0.42 and 0.54.',
      'C) We are 95% confident that the population proportion of voters who support the bond issue is between 0.42 and 0.54.',
      'D) 95% of all voters support the bond issue.',
      'E) The margin of error for this interval is 0.12.',
    ]),
    correctAnswer: 'C',
    explanation:
      'A confidence interval is interpreted in terms of the population parameter: we are C% confident that the interval captures the true population proportion.',
  },
  {
    id: 7303,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: UNIT_NAME,
    question:
      'Two independent samples were taken to compare the proportions of success for a new medicine vs. a placebo. The segment bar chart below displays the proportion of patients who recovered. Which observation is best supported by the chart?',
    image: TREATMENT_RECOVERY_SEGMENTED_BAR,
    options: stripOptionPrefixes([
      'A) The proportion of recovery is higher for the placebo group.',
      'B) The proportions of recovery are identical.',
      'C) The proportion of recovery is significantly higher for the treatment group.',
      'D) The sample sizes for both groups must be different.',
      'E) The data is not categorical.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The segmented bar chart shows the proportion of successes (recovery) is visually larger for the treatment bar than the placebo bar.',
  },
  {
    id: 7304,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: UNIT_NAME,
    question:
      'A study was conducted to check for an association between age range and smartphone ownership. The mosaic plot below shows the breakdown of ownership across four age groups (18-29, 30-44, 45-59, and 60+). If the two variables were independent, what would the mosaic plot look like?',
    image: SMARTPHONE_OWNERSHIP_MOSAIC,
    options: stripOptionPrefixes([
      'A) The heights of the bars would be different, but the widths would be the same.',
      'B) The segment proportions within each age-group bar would be identical across all four age groups.',
      'C) The area of the "Owns Smartphone" segments would be zero.',
      'D) The bars would show a strong upward trend.',
      'E) The plot would be skewed to the left.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Independence in a mosaic plot is visualized when conditional distributions are identical across categories (horizontal segment lines align across bars).',
  },
  {
    id: 7305,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: UNIT_NAME,
    question:
      'A company tests a new packaging design. The null hypothesis is that the proportion of damaged packages is 0.05. A sample of 200 packages results in a p-value of 0.02. Which conclusion is correct?',
    image: null,
    options: stripOptionPrefixes([
      'A) There is convincing evidence that the proportion of damaged packages is 0.05.',
      'B) There is convincing evidence that the proportion of damaged packages is different from 0.05.',
      'C) We fail to reject the null hypothesis at the 0.05 level.',
      'D) The proportion of damaged packages is exactly 0.02.',
      'E) The result is not statistically significant.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Since the p-value (0.02) < alpha (0.05), we reject the null hypothesis, providing convincing evidence for the alternative.',
  },
  {
    id: 7306,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.13'],
    unitName: UNIT_NAME,
    question:
      'A researcher conducts a two-sample z-test for the difference in proportions of voters favoring Candidate A in two cities. The sample summaries are shown in the table below. What is the pooled proportion (p-hat-c) used for the test statistic?',
    image: null,
    tableData: TWO_CITY_VOTER_TABLE,
    options: stripOptionPrefixes(['A) 0.54', 'B) 0.55', 'C) 0.60', 'D) 0.50', 'E) 0.53']),
    correctAnswer: 'A',
    explanation:
      'The pooled proportion is total successes divided by total sample size: (60 + 75) / (100 + 150) = 135 / 250 = 0.54.',
  },
  {
    id: 7307,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: UNIT_NAME,
    question:
      'A city health department reports a 90% confidence interval for the proportion of residents who received a flu vaccine this year as (0.35, 0.45). If the department recalculates using the same sample data but increases the confidence level to 99%, what happens to the width of the interval?',
    image: null,
    options: stripOptionPrefixes([
      'A) The width remains constant.',
      'B) The width increases.',
      'C) The width decreases.',
      'D) The interval becomes (0.38, 0.42).',
      'E) The width is halved.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Increasing confidence requires a larger critical value, which increases margin of error and makes the interval wider.',
  },
  {
    id: 7308,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: UNIT_NAME,
    question:
      'A public health researcher wants to know whether opinion on a proposed soda tax (support or oppose) is associated with age group. She surveys 200 randomly selected adults. The relevant row and column totals are shown in the table below. If the chi-square test assumes the variables are independent, what is the expected count for the "support" and "31–50" cell?',
    image: null,
    tableData: SODA_TAX_OPINION_TOTALS_TABLE,
    options: stripOptionPrefixes(['A) 25', 'B) 35', 'C) 40', 'D) 50', 'E) 70']),
    correctAnswer: 'B',
    explanation:
      'Expected count = (row total x column total) / total. Here, (100 x 70) / 200 = 35.',
  },
  {
    id: 7309,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: UNIT_NAME,
    question:
      'A mobile game studio claims that 20% of new players who download their app are still playing after one week. A market analyst suspects the true retention rate is different and tests H0: p = 0.20 versus Ha: p ≠ 0.20 using a random sample of new players, obtaining a p-value of 0.04. Which of the following is true at alpha = 0.05?',
    image: null,
    options: stripOptionPrefixes([
      'A) We reject the null and conclude there is evidence p does not equal 0.20.',
      'B) We fail to reject the null and conclude p = 0.20.',
      'C) We reject the null and conclude p is 0.20.',
      'D) We fail to reject the null because the p-value is too low.',
      'E) We reject the null and conclude there is no evidence of a difference.',
    ]),
    correctAnswer: 'A',
    explanation:
      'Since p-value (0.04) is less than alpha (0.05), we reject the null hypothesis and provide evidence for the alternative.',
  },
  {
    id: 7310,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: UNIT_NAME,
    question:
      'A pollster compares the proportion of registered voters who support a ballot initiative in two neighboring counties. She constructs a 95% confidence interval for the difference in proportions (p₁ − p₂). The interval endpoints are shown in the table below. What is the margin of error for this interval?',
    image: null,
    tableData: COUNTY_BALLOT_INTERVAL_TABLE,
    options: stripOptionPrefixes(['A) 0.09', 'B) 0.045', 'C) 0.15', 'D) 0.075', 'E) 0.03']),
    correctAnswer: 'B',
    explanation:
      'Margin of error is half the interval width. Width = 0.12 - 0.03 = 0.09, so MOE = 0.09 / 2 = 0.045.',
  },
  {
    id: 7311,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: UNIT_NAME,
    question:
      'A statistician is deciding how to estimate an unknown population proportion p from a random sample of size n in which x successes are observed. She considers five possible formulas for the estimator. Which of the following formulas is an unbiased estimator of p?',
    image: null,
    options: stripOptionPrefixes([
      'A) x / n',
      'B) (x + 1) / (n + 2)',
      'C) (x + 2) / n',
      'D) x / (n - 1)',
      'E) (x - 1) / n',
    ]),
    correctAnswer: 'A',
    explanation:
      'An estimator is unbiased if, on average, it neither overestimates nor underestimates the parameter. The sample proportion p-hat = x/n is the standard unbiased estimator of a population proportion because E(x/n) = p. The other formulas each add or subtract a constant to the numerator or denominator, which shifts the expected value away from p and introduces bias (e.g., option B is a form of the Laplace/"add-two" smoothed estimator, which is biased toward 0.5).',
  },
  {
    id: 7312,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: UNIT_NAME,
    question:
      'A machine produces bolts with a true defect proportion of p = 0.08. A quality control engineer takes a random sample of n = 200 bolts. The graph below shows the sampling distribution of the sample proportion of defective bolts, with the shaded region representing the values within one standard deviation of the mean. Which of the following is closest to the standard deviation of this sampling distribution?',
    image: SAMPLING_DIST_PROPORTION_CURVE,
    options: stripOptionPrefixes(['A) 0.019', 'B) 0.038', 'C) 0.0128', 'D) 0.0026', 'E) 0.16']),
    correctAnswer: 'A',
    explanation:
      'The standard deviation of the sampling distribution of p-hat is sqrt[p(1-p)/n] = sqrt[(0.08)(0.92)/200] = sqrt(0.000368) ≈ 0.019, matching the width of the shaded region in the graph. Option B doubles this value (a common error from failing to take the square root correctly), option C uses n = 400, option D omits the square root entirely, and option E uses p(1-p) without dividing by n.',
  },
  {
    id: 7313,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: UNIT_NAME,
    question:
      'In a random sample of 85 adults, 34 reported that they read at least one book per month. Assuming all conditions for inference are met, which of the following is a correctly calculated 90% confidence interval for the true proportion of adults who read at least one book per month?',
    image: null,
    options: stripOptionPrefixes([
      'A) (0.313, 0.487)',
      'B) (0.296, 0.504)',
      'C) (0.362, 0.438)',
      'D) (0.395, 0.405)',
      'E) (0.4, 0.6)',
    ]),
    correctAnswer: 'A',
    explanation:
      'p-hat = 34/85 = 0.400. SE = sqrt[(0.4)(0.6)/85] ≈ 0.0531. For 90% confidence, z* = 1.645, so the margin of error ≈ 1.645(0.0531) ≈ 0.087, giving the interval (0.313, 0.487). Option B incorrectly uses z* = 1.96 (the 95% critical value). Option D results from forgetting to take the square root when calculating SE, which produces an interval that is far too narrow.',
  },
  {
    id: 7314,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: UNIT_NAME,
    question:
      'A researcher wants to construct a 95% confidence interval to estimate the proportion of left-handed students in a large school district (N = 3,000 students). She selects a random sample of n = 20 students and finds that 1 student is left-handed. Which condition required for constructing a one-sample z-interval for a population proportion is NOT met?',
    image: null,
    options: stripOptionPrefixes([
      'A) The randomization condition',
      'B) The 10% condition',
      'C) The normality condition',
      'D) The independence condition',
      'E) All conditions are met',
    ]),
    correctAnswer: 'C',
    explanation:
      'The normality condition requires that the observed number of successes and the observed number of failures each be at least 10. Here, the number of observed successes is only 1 (fewer than 10), so the sampling distribution of p-hat cannot be assumed to be approximately normal. The randomization condition is satisfied (random sample), and the 10% condition is satisfied since 20 is well under 10% of 3,000.',
  },
  {
    id: 7315,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.5'],
    unitName: UNIT_NAME,
    question:
      "A shipping company claims that 90% of its packages are delivered on time. A consumer watchdog group suspects the true on-time delivery rate is lower than claimed and plans to test this suspicion using a random sample of the company's shipping records. Which of the following is the correct set of hypotheses for the appropriate significance test?",
    image: null,
    options: stripOptionPrefixes([
      'A) H0: p = 0.90, Ha: p < 0.90',
      'B) H0: p = 0.90, Ha: p ≠ 0.90',
      'C) H0: p-hat = 0.90, Ha: p-hat < 0.90',
      'D) H0: p < 0.90, Ha: p = 0.90',
      'E) H0: p = 0.90, Ha: p > 0.90',
    ]),
    correctAnswer: 'A',
    explanation:
      'Let p be the true proportion of all packages delivered on time. Because the watchdog group suspects the rate is lower than claimed, the alternative hypothesis should be one-sided: Ha: p < 0.90, with H0: p = 0.90. Option B is two-sided and does not match the stated suspicion. Option C incorrectly states the hypotheses in terms of the sample statistic p-hat rather than the population parameter p. Option D reverses the null and alternative hypotheses, and option E has the alternative pointed in the wrong direction.',
  },
  {
    id: 7316,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: UNIT_NAME,
    question:
      'A researcher tests H0: p = 0.50 versus Ha: p ≠ 0.50 and obtains a test statistic of z = 2.10. The graph below shows the null distribution of the test statistic, with the shaded regions representing the p-value. Which of the following is closest to the p-value of this test?',
    image: PVALUE_TWO_TAILED_CURVE,
    options: stripOptionPrefixes(['A) 0.0179', 'B) 0.0358', 'C) 0.9642', 'D) 0.4821', 'E) 0.0716']),
    correctAnswer: 'B',
    explanation:
      'Because the alternative hypothesis is two-sided, the p-value is the combined area in both tails beyond |z| = 2.10, matching the two shaded regions shown in the graph: P(z ≤ -2.10) + P(z ≥ 2.10) = 2(0.0179) = 0.0358. Option A gives only one tail’s area, and option C gives the area between -2.10 and 2.10 (the complement of the p-value).',
  },
  {
    id: 7317,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: UNIT_NAME,
    question:
      'A hypothesis test of H0: p = 0.60 versus Ha: p ≠ 0.60 produces a p-value of 0.031. Which of the following is the correct interpretation of this p-value?',
    image: null,
    options: stripOptionPrefixes([
      'A) Assuming the true population proportion is 0.60, there is a 0.031 probability of obtaining a sample proportion as extreme as, or more extreme than, the one observed.',
      'B) There is a 3.1% probability that H0 is true.',
      'C) There is a 96.9% probability that Ha is true.',
      'D) The probability that the sample proportion exactly equals 0.60 is 0.031.',
      'E) Only 3.1% of all possible samples would produce this result.',
    ]),
    correctAnswer: 'A',
    explanation:
      'A p-value is a conditional probability computed by assuming the null hypothesis is true; it describes how unusual the observed (or a more extreme) sample result would be under that assumption. It is never a probability statement about whether H0 or Ha is true — that is a common misinterpretation reflected in options B and C. It also does not refer to the probability of an exact outcome (option D).',
  },
  {
    id: 7318,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: UNIT_NAME,
    question:
      'The graph below shows the null sampling distribution (solid curve, centered at the hypothesized proportion p0 = 0.50) and the true sampling distribution (dashed curve, centered at the true proportion p = 0.58) for a one-sided test of H0: p = 0.50 versus Ha: p > 0.50. Region A is the shaded area under the solid curve to the right of the critical value; Region B is the shaded area under the dashed curve to the left of the critical value. Which region represents the probability of a Type II error?',
    image: TYPE_I_II_ERROR_DIAGRAM,
    options: stripOptionPrefixes([
      'A) Region A',
      'B) Region B',
      'C) The unshaded area under the solid curve to the left of the critical value',
      'D) Region A and Region B combined',
      'E) The area where the two curves overlap entirely',
    ]),
    correctAnswer: 'B',
    explanation:
      'A Type II error occurs when the null hypothesis is not rejected even though the alternative hypothesis is actually true. This corresponds to outcomes that fall short of the critical value even though the true sampling distribution (centered at p = 0.58) generated them — that is, Region B. Region A represents alpha, the probability of a Type I error (rejecting H0 when it is actually true), since it is the tail of the null distribution beyond the critical value.',
  },
  {
    id: 7319,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.9'],
    unitName: UNIT_NAME,
    question:
      'Two large populations have true proportions of support for a policy of p1 = 0.40 and p2 = 0.35. Independent random samples of size n1 = 120 and n2 = 150 are planned. Using the table below, what is the standard deviation of the sampling distribution of the difference in sample proportions, p-hat1 − p-hat2?',
    image: null,
    tableData: TWO_POPULATION_PROPORTIONS_TABLE,
    options: stripOptionPrefixes(['A) 0.059', 'B) 0.0035', 'C) 0.0129', 'D) 0.077', 'E) 0.240']),
    correctAnswer: 'A',
    explanation:
      'The standard deviation of the sampling distribution for the difference in sample proportions is sqrt[p1(1-p1)/n1 + p2(1-p2)/n2] = sqrt[(0.4)(0.6)/120 + (0.35)(0.65)/150] = sqrt(0.0020 + 0.001517) = sqrt(0.003517) ≈ 0.059. Option B is the value before taking the square root, and option D incorrectly adds the two standard deviations (sqrt of each term) instead of combining variances first.',
  },
  {
    id: 7320,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.12'],
    unitName: UNIT_NAME,
    question:
      'A marketing team runs an A/B test on two landing page designs to see whether Design A produces a higher conversion rate than Design B. Of 500 visitors randomly assigned to Design A, 60 converted; of 500 visitors randomly assigned to Design B, 45 converted. Which of the following is the correct set of hypotheses for the appropriate significance test?',
    image: null,
    options: stripOptionPrefixes([
      'A) H0: pA = pB, Ha: pA > pB',
      'B) H0: pA ≠ pB, Ha: pA = pB',
      'C) H0: p-hatA = p-hatB, Ha: p-hatA > p-hatB',
      'D) H0: pA − pB = 1, Ha: pA − pB ≠ 1',
      'E) H0: pA = pB, Ha: pA ≠ pB',
    ]),
    correctAnswer: 'A',
    explanation:
      'Let pA and pB be the true conversion rates for Design A and Design B, respectively. Since the marketing team specifically wants to know whether Design A’s rate is higher, the test should be one-sided: H0: pA = pB (no difference) versus Ha: pA > pB. Option B reverses the null and alternative statements, option C incorrectly uses sample statistics (p-hat) rather than population parameters, option D uses a nonsensical hypothesized difference of 1, and option E is two-sided and does not match the stated research question.',
  },
];
