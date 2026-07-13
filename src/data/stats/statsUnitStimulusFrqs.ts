import { getStatsFrqWalkthroughVideoUrl } from './statsFrqWalkthroughVideos';

/** Matches `FullExamFRQ` `tableData`. */
export interface StatsFrqTableData {
  headers: string[];
  rows: (string | number)[][];
  rowHeaders?: boolean;
}

export interface StatsFrqImage {
  src: string;
  alt: string;
}

export interface StatsFrqSubpart {
  label: string;
  text: string;
  answerType?: 'text' | 'draw';
  image?: StatsFrqImage;
  /** Background template drawn inside the answer pad (students ink on top). */
  templateImageUrl?: string;
  /** Sample response shown on results when set. */
  answer?: string;
}

export interface StatsFrqPart {
  label: string;
  text: string;
  answerType?: 'text' | 'draw';
  /** Sample response shown on results when set. */
  answer?: string;
  /** Optional table shown after the part stem (e.g. summary statistics). */
  tableData?: StatsFrqTableData;
  /** Stimulus image after the stem (e.g. summary statistics table SVG). */
  tableImage?: StatsFrqImage;
  /** Diagram for this part only (boxplot, stem-and-leaf, sketch grid). */
  image?: StatsFrqImage;
  /** Background template drawn inside the answer pad (students ink on top). */
  templateImageUrl?: string;
  /** When set with `answerType: 'text'`, also show a drawing pad (e.g. sketch a boxplot). */
  drawPrompt?: string;
  subparts?: StatsFrqSubpart[];
}

export interface StatsStimulusFrq {
  id: string;
  title: string;
  /** Scenario / directions shown above parts (or above the table when `tableData` is set). */
  scenario: string;
  /** When set, rendered as a table above part stems (e.g. two-way tables). */
  tableData?: StatsFrqTableData;
  /** Shown after `tableData` when set (e.g. “Show all your work…”). */
  directionsAfterTable?: string;
  /** Stimulus image for the whole question (e.g. histogram). */
  image?: StatsFrqImage;
  parts: StatsFrqPart[];
}

const STATS_UNIT1_FRQ_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1';

const STATS_UNIT2_FRQ_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit2';

const FRQ2_SUMMARY_TABLE = `${STATS_UNIT1_FRQ_IMAGE_BASE}/frq2summary.svg`;

const TYPE_X_WEIGHTS =
  '410, 415, 430, 430, 440, 445, 445, 450, 450, 460, 470, 480, 490, 495, 495, 500';

export const statsUnit1StimulusFrqs: StatsStimulusFrq[] = [
  {
    id: 'u1-frq-stats-bakery',
    title: 'FRQ: Quantitative Data Analysis',
    scenario: `A bakery manager produces two types of artisanal sourdough loaves, Type X and Type Y. She wants to compare the weights of the two types and takes independent random samples of 16 loaves from each type. The weight, in grams, of each loaf is measured. The weights of the 16 Type X loaves are recorded below.

Weights of Type X Loaves (grams):
${TYPE_X_WEIGHTS}

Respond to parts A, B, and C below.`,
    parts: [
      {
        label: 'A',
        text: 'Use the data in the list to determine the five-number summary for the sample of Type X loaves.',
        answerType: 'text',
        answer:
          'Five-Number Summary for Type X: Min: 410, Q1: 435, Median: 450, Q3: 485, Max: 500.',
      },
      {
        label: 'B',
        text: 'Use the five-number summary from Part A and the boxplot of Type Y to compare the distribution of weight for the Type X loaves and the distribution of weight for the Type Y loaves, in context.',
        image: {
          src: `${STATS_UNIT1_FRQ_IMAGE_BASE}/type_y_boxplot.svg`,
          alt: 'Boxplot of Type Y sourdough loaf weights',
        },
        answerType: 'text',
        answer:
          'Center: The median weight of Type Y loaves (460g) is higher than Type X (450g). Outliers: No obvious outliers for either distribution based on the 1.5 × IQR rule. Variability: Type X has a larger IQR (50g) than Type Y (45g), but Type Y has a slightly larger overall range (95g) compared to Type X (90g).',
      },
      {
        label: 'C',
        text: 'Consider the five-number summary from Part A and the stem-and-leaf plot.',
        image: {
          src: `${STATS_UNIT1_FRQ_IMAGE_BASE}/type_x_stem_leaf.svg`,
          alt: 'Stem-and-leaf plot of Type X sourdough loaf weights',
        },
        subparts: [
          {
            label: 'i',
            text: 'If a boxplot were created from the five-number summary found in Part A, what characteristic of the shape of the distribution of weight for the Type X loaves would be apparent from the stem-and-leaf plot but not from the boxplot?',
            answerType: 'text',
            answer:
              'The stem-and-leaf plot reveals that the distribution is bimodal and shows a distinct gap, which is not apparent in the boxplot.',
          },
          {
            label: 'ii',
            text: 'Explain why a boxplot would not display the characteristic of the shape of the distribution identified in Part C (i).',
            answerType: 'text',
            answer:
              'A boxplot collapses the dataset into five summary statistics, discarding frequency information and specific gaps, masking the modality of the distribution.',
          },
        ],
      },
    ],
  },
  {
    id: 'u1-frq-2-steps-wellness',
    title: 'FRQ 2: Data Description and Study Design',
    scenario: `The daily step counts, in thousands of steps, of the 20 employees at a tech company over the course of one month are summarized in the following histogram.

Show all your work and indicate clearly the methods you use.`,
    image: {
      src: `${STATS_UNIT1_FRQ_IMAGE_BASE}/step_count_histogram.svg`,
      alt: 'Histogram showing daily step counts for 20 employees',
    },
    parts: [
      {
        label: 'A',
        text: 'Based on the histogram, describe the distribution of daily step counts for the employees.',
        answerType: 'text',
        answer:
          'The distribution is bimodal with two peaks (around 6–8k and 14–16k steps), the median is in the interval from 10–12k steps, the range is 14k steps, and there are no obvious outliers.',
      },
      {
        label: 'B',
        text: 'Summary statistics for the step counts are given in the following table.',
        tableImage: {
          src: FRQ2_SUMMARY_TABLE,
          alt: 'Summary statistics table for step counts',
        },
        subparts: [
          {
            label: 'i',
            text: 'Determine whether there are potential outliers in the data.',
            answerType: 'text',
            answer:
              'No outliers. Lower fence: 6 − (1.5 × 8.5) = −6.75; upper fence: 14.5 + (1.5 × 8.5) = 27.25.',
          },
          {
            label: 'ii',
            text: 'Use the following grid to sketch a boxplot of daily step count.',
            answerType: 'draw',
            image: {
              src: `${STATS_UNIT1_FRQ_IMAGE_BASE}/boxplot_sketch_grid.svg`,
              alt: 'Grid for sketching the boxplot',
            },
            answer:
              'Boxplot: box from 6 to 14.5, median line at 9.5, whiskers to 4 and 17.',
          },
        ],
      },
      {
        label: 'C',
        text: "Suppose the manager wants to know if these 20 employees are representative of the daily step counts for all 500 employees at the tech company. Explain why the manager's current data collection method might be problematic for making this generalization.",
        answerType: 'text',
        answer:
          'The 20 employees were not selected using a random mechanism. If this sample is not representative of the 500 employees (e.g., specific shifts or departments), the result may be biased and inappropriate to generalize to the population.',
      },
      {
        label: 'D',
        text: 'A researcher proposes a new study to determine if a wellness program increases the daily step counts of the employees. Determine a valid investigative question for this study. Ensure all three components of a valid investigative question are included in your response.',
        answerType: 'text',
        answer:
          'Is there convincing statistical evidence that the mean daily step count for all employees at the tech company is higher after participating in the wellness program compared to before? (Includes the mean step count variable, a higher direction of change, and all employees as the population of interest.)',
      },
      {
        label: 'E',
        text: 'Briefly describe how the researcher could improve the study design to establish a cause-and-effect relationship between the wellness program and daily step counts.',
        answerType: 'text',
        answer:
          'Conduct a well-designed experiment with random assignment. This balances extraneous sources of variation between the treatment group (wellness program) and the control group, allowing for a causal conclusion.',
      },
    ],
  },
];

const MEMBERSHIP_YOGA_TABLE: StatsFrqTableData = {
  headers: ['Membership', 'Attended Yoga', 'Did Not Attend', 'Total'],
  rows: [
    ['Basic', '60', '240', '300'],
    ['Premium', '120', '80', '200'],
    ['Total', '180', '320', '500'],
  ],
};

export const statsUnit2StimulusFrqs: StatsStimulusFrq[] = [
  {
    id: 'u2-frq-1-membership-yoga',
    title: 'FRQ 1: Two-Way Tables and Independence',
    scenario:
      'A local fitness center tracks the membership type (Basic, Premium) and whether members attended a yoga class last month (Attended, Did Not Attend). The data for the 500 members are summarized in the table below.',
    tableData: MEMBERSHIP_YOGA_TABLE,
    directionsAfterTable: 'Show all your work and indicate clearly the methods you use.',
    parts: [
      {
        label: 'A',
        text: 'Calculate the probability that a randomly selected member is a Premium member given that they attended a yoga class last month. Show your work.',
        answerType: 'text',
        answer:
          'P(Premium | Attended Yoga) = P(Premium and Attended) / P(Attended Yoga) = (120/500) / (180/500) = 120/180 = 2/3 ≈ 0.667. There is a 0.667 (66.7%) probability that a randomly selected member is a Premium member, given that they attended a yoga class last month.',
      },
      {
        label: 'B',
        text: 'Is the event of being a "Premium member" independent of the event of having "Attended Yoga"? Justify your answer.',
        answerType: 'text',
        answer:
          'No, the events are not independent. P(Premium) = 200/500 = 0.40. P(Premium | Attended) = 120/180 ≈ 0.667. Since P(Premium) ≠ P(Premium | Attended), the events are not independent. Knowing a member attended yoga changes the probability that they are a Premium member, indicating an association between membership type and yoga attendance.',
      },
      {
        label: 'C',
        text: 'On the axes below, construct a segmented bar chart that displays the distribution of yoga attendance for each membership type. Label both axes and include a key.',
        answerType: 'draw',
        templateImageUrl: '/unit-test-images/stats/unit2/frq1ptC.svg',
        answer:
          'The chart should have two bars, "Basic" and "Premium," each with a total height of 100%. The Basic bar should show 20% "Attended" and 80% "Did Not Attend." The Premium bar should show 60% "Attended" and 40% "Did Not Attend." A key must distinguish the two categories.',
      },
    ],
  },
  {
    id: 'u2-frq-3-manufacturing-components',
    title: 'FRQ 3: Binomial and Normal Distributions',
    scenario:
      'A manufacturing company produces electronic components. It is known that 12% of the components produced are defective.',
    parts: [
      {
        label: 'A',
        text: 'Suppose a random sample of 20 components is selected. What is the probability that exactly 3 components are defective? Identify the distribution you are using, including its parameters, before calculating your answer.',
        answerType: 'text',
        answer:
          'Let X be the number of defective components. X ~ Binomial(n = 20, p = 0.12). P(X = 3) = C(20, 3) × (0.12)^3 × (0.88)^17 ≈ 1140 × 0.001728 × 0.1122 ≈ 0.2242. There is a 0.2242 probability that exactly 3 components are defective.',
      },
      {
        label: 'B',
        text: 'Suppose the manufacturing process is adjusted, and the weights of the components are now approximately normally distributed with a mean of 50 grams and a standard deviation of 2 grams. What is the probability that a randomly selected component weighs between 47 grams and 53 grams? Show the standardized (z-score) setup for your calculation.',
        answerType: 'text',
        answer:
          'Let W ~ N(μ = 50, σ = 2). Standardizing: z1 = (47 - 50) / 2 = -1.5; z2 = (53 - 50) / 2 = 1.5. P(47 < W < 53) = P(-1.5 < Z < 1.5) = P(Z < 1.5) - P(Z < -1.5) = 0.9332 - 0.0668 = 0.8664.',
      },
      {
        label: 'C',
        text: 'Based on the normal distribution described in part (b), determine the 90th percentile for the weight of the components. Show the equation you are solving.',
        answerType: 'text',
        answer:
          'We solve for x such that P(W < x) = 0.90. The z-score corresponding to the 90th percentile is z ≈ 1.282. Using the equation x = μ + zσ, we have x = 50 + (1.282)(2) = 52.564 grams. The 90th percentile is approximately 52.56 grams.',
      },
    ],
  },
];

const TRANSPORTATION_GRADE_TABLE: StatsFrqTableData = {
  headers: ['', 'Bus', 'Car', 'Walk/Bike', 'Total'],
  rows: [
    ['Freshman', '58', '22', '20', '100'],
    ['Sophomore', '50', '30', '20', '100'],
    ['Junior', '35', '45', '20', '100'],
    ['Senior', '25', '55', '20', '100'],
    ['Total', '168', '152', '80', '400'],
  ],
};

export const statsUnit3StimulusFrqs: StatsStimulusFrq[] = [
  {
    id: 'u3-frq-bike-lane-inference',
    title: 'FRQ 1: Inference for Proportions',
    scenario: `A city's parks department wants to estimate the proportion of all residents who support a proposed new bike-lane initiative. An intern on the team, Priya, proposes the following method: she will stand outside the downtown farmers market on a Saturday morning and ask every adult who walks by whether they support the initiative, recording responses until she has 150 completed surveys.

Priya's supervisor is skeptical of this approach and instead has the department select a simple random sample of 150 residents from the city's voter registration list, mail each of them a survey, and follow up with non-respondents until all 150 have responded. Of those 150 residents, 96 say they support the initiative.`,
    parts: [
      {
        label: 'A',
        text: "Explain why Priya's sampling method would likely produce a biased estimate of the population proportion, and identify the type of bias most likely to result.",
        answerType: 'text',
        answer:
          "Priya's method is a convenience sample. It is biased because residents who visit a farmers market on a Saturday morning are not representative of all city residents; they may be more likely to support environmental or healthy-lifestyle initiatives (undercoverage/selection bias).",
      },
      {
        label: 'B',
        text: "Using the supervisor's sample of 150 residents, the sample proportion p-hat is a point estimator for the population proportion p. Explain why p-hat is an unbiased estimator of p, provided the supervisor's sampling method is used.",
        answerType: 'text',
        answer:
          'An estimator is unbiased if, on average, the value of the estimator does not underestimate or overestimate the population parameter. Since the supervisor used a simple random sample, the expected value of the sample proportion equals the population proportion.',
      },
      {
        label: 'C',
        text: "Identify, by name, the appropriate confidence interval procedure for estimating the population proportion of residents who support the initiative, and verify that the conditions for this procedure are met using the supervisor's sample data.",
        answerType: 'text',
        answer:
          "Procedure: One-sample z-interval for a population proportion. Conditions: 1) Randomization: The supervisor used a simple random sample. 2) 10% Condition: 150 residents is assumed to be less than 10% of the city's population. 3) Normality: Observed successes = 96, Observed failures = 54. Both are ≥ 10.",
      },
      {
        label: 'D',
        text: 'Construct and interpret a 90% confidence interval for the population proportion of residents who support the initiative. Show all work.',
        answerType: 'text',
        answer:
          'p-hat = 96/150 = 0.64. SE = sqrt((0.64 * 0.36) / 150) ≈ 0.0392. Critical value (z*) for 90% = 1.645. ME = 1.645 * 0.0392 ≈ 0.0645. Interval: 0.64 ± 0.0645 = (0.5755, 0.7045). Interpretation: We are 90% confident that the true population proportion of city residents who support the initiative is between 0.5755 and 0.7045.',
      },
      {
        label: 'E',
        text: 'Suppose the department had instead selected a random sample of only 50 residents, and that sample also resulted in 64% support. Without performing any calculations, explain how the width of a 90% confidence interval constructed from this smaller sample would compare to the interval from part D, and explain why.',
        answerType: 'text',
        answer:
          'The width would increase. The width of the confidence interval is inversely proportional to the square root of the sample size. Decreasing the sample size (n) increases the standard error, thereby increasing the margin of error and the overall width of the interval.',
      },
    ],
  },
  {
    id: 'u3-frq-transportation-association',
    title: 'FRQ 2: Chi-Square Test for Independence',
    scenario:
      "A high school counselor is investigating whether there is an association between a student's grade level (Freshman, Sophomore, Junior, Senior) and the primary mode of transportation a student uses to get to school (Bus, Car, Walk/Bike). The counselor selected a random sample of 400 students and recorded their grade level and primary mode of transportation. The results are summarized in the two-way table below.",
    tableData: TRANSPORTATION_GRADE_TABLE,
    parts: [
      {
        label: 'A',
        text: '',
        subparts: [
          {
            label: 'i',
            text: 'Identify the appropriate inference procedure for this study, and explain why it is more appropriate than an alternative chi-square procedure.',
            answerType: 'text',
            answer:
              'Chi-square test for independence. This is appropriate because we are testing for an association between two categorical variables within a single population of 400 students, rather than comparing distributions across distinct, pre-defined populations (which would be homogeneity).',
          },
          {
            label: 'ii',
            text: 'State the null and alternative hypotheses in context.',
            answerType: 'text',
            answer:
              'H0: There is no association between grade level and primary mode of transportation for students at this high school (the variables are independent). Ha: There is an association between grade level and primary mode of transportation (the variables are not independent).',
          },
        ],
      },
      {
        label: 'B',
        text: 'Verify that the conditions for the inference procedure identified in part A are met. Show all relevant calculations.',
        answerType: 'text',
        answer:
          '1) Randomization: A random sample of 400 students was selected. 2) 10% Condition: 400 students is assumed to be less than 10% of the total student population. 3) Expected counts condition: All expected counts are ≥ 5. Example expected count for Freshman/Bus: (168 * 100) / 400 = 42. Since 42 ≥ 5 and the lowest expected count (Senior/Walk/Bike: (80 * 100) / 400 = 20) is ≥ 5, the condition is met.',
      },
      {
        label: 'C',
        text: 'Calculate the chi-square test statistic and the corresponding p-value. Show your work.',
        answerType: 'text',
        answer:
          'Calculation: Σ(O-E)²/E. Expected counts matrix: (42, 38, 20; 42, 38, 20; 42, 38, 20; 42, 38, 20). Chi-square = (58-42)²/42 + ... = 32.89. Degrees of freedom = (4-1)*(3-1) = 6. P-value ≈ 0.000007.',
      },
      {
        label: 'D',
        text: 'Using a significance level of α = 0.05, justify a conclusion in context.',
        answerType: 'text',
        answer:
          'Since the p-value (0.000007) < α = 0.05, we reject the null hypothesis. There is convincing statistical evidence of an association between grade level and mode of transportation for students at this high school.',
      },
      {
        label: 'E',
        text: "The counselor's colleague looks at the chi-square result and states, \"Since the p-value is small, this proves that grade level causes students to choose a particular mode of transportation.\" Explain what is wrong with this statement.",
        answerType: 'text',
        answer:
          'The study is an observational study, not a randomized experiment. We cannot infer causation from an observational study because there may be confounding variables (e.g., age-related driving privileges) that explain the association.',
      },
    ],
  },
];

export const statsUnit4StimulusFrqs: StatsStimulusFrq[] = [
  {
    id: 'u4-frq-water-filtration-comparison',
    title: 'FRQ 1: Inference for Difference of Means',
    scenario: `An environmental scientist is investigating the impact of a new filtration system on the water quality in two different industrial ponds. She selects a random sample of 40 water specimens from Pond A, where the new system is installed, and finds a mean pollutant level of 12.5 mg/L with a sample standard deviation of 3.2 mg/L. She also selects a random sample of 45 water specimens from Pond B, which uses the old filtration system, and finds a mean pollutant level of 14.8 mg/L with a sample standard deviation of 3.5 mg/L.

Respond to parts A, B, C, and D below.`,
    parts: [
      {
        label: 'A',
        text: 'Identify the appropriate inference procedure to compare the true mean pollutant levels between the two ponds. Include the parameter(s) and their definitions in context.',
        answerType: 'text',
        answer:
          'Procedure: Two-sample t-test for the difference between two population means. Parameters: Let μ_A be the true mean pollutant level (mg/L) for all water specimens in Pond A, and μ_B be the true mean pollutant level (mg/L) for all water specimens in Pond B.',
      },
      {
        label: 'B',
        text: 'Verify that the conditions for the procedure identified in part (a) are met.',
        answerType: 'text',
        answer:
          'Conditions: 1) Randomization: The scenario states that random samples were taken from both ponds. 2) 10% Condition: It is reasonable to assume that 40 and 45 specimens are less than 10% of the total volume of water specimens in each respective pond. 3) Sample data condition: Both sample sizes (n_A = 40 and n_B = 45) are greater than or equal to 30, so the sampling distribution of the difference in sample means is approximately normal by the Central Limit Theorem.',
      },
      {
        label: 'C',
        text: 'Calculate the test statistic and then find and interpret the p-value for a test to determine if there is a significant difference in the mean pollutant levels between the two ponds.',
        answerType: 'text',
        answer:
          'Test statistic: t = (12.5 - 14.8 - 0) / sqrt(3.2²/40 + 3.5²/45) ≈ -2.3 / 0.718 ≈ -3.20. The p-value for a two-sided test with this t-statistic is approximately 0.002. Interpretation: Assuming the null hypothesis is true (there is no difference in the true mean pollutant levels between the two filtration systems), there is approximately a 0.2% probability of observing a difference in sample means as extreme or more extreme than -2.3 mg/L by random chance alone.',
      },
      {
        label: 'D',
        text: 'Using a significance level of α = 0.05, provide a conclusion in the context of the study.',
        answerType: 'text',
        answer:
          'Since the p-value (0.002) is less than the significance level of α = 0.05, we reject the null hypothesis. There is convincing statistical evidence to conclude that there is a difference in the true mean pollutant levels between the two filtration systems.',
      },
    ],
  },
  {
    id: 'u4-frq-student-weight-inference',
    title: 'FRQ 2: Sampling Distributions and Hypothesis Testing for Means',
    scenario:
      'A university health center tracks the weight of incoming first-year students. Historically, the mean weight of first-year students is 150 lbs with a standard deviation of 20 lbs. This year, the health center takes a random sample of 40 students and finds a sample mean weight of 156 lbs.',
    parts: [
      {
        label: 'A',
        text: 'Calculate the mean and standard deviation of the sampling distribution of the sample mean for samples of size n = 40.',
        answerType: 'text',
        answer:
          'Mean of the sampling distribution (μ_x̄) = 150 lbs. Standard deviation of the sampling distribution (σ_x̄) = 20/√40 ≈ 3.16 lbs.',
      },
      {
        label: 'B',
        text: 'Is it appropriate to assume the sampling distribution of the sample mean is approximately normal? Justify your answer.',
        answerType: 'text',
        answer:
          'Yes. Although we do not know the shape of the population distribution, the sample size (n = 40) is greater than 30. Therefore, by the Central Limit Theorem, the sampling distribution of the sample mean is approximately normal.',
      },
      {
        label: 'C',
        text: 'The health center wants to test if the mean weight of all first-year students this year has increased from the historical mean. State the null and alternative hypotheses.',
        answerType: 'text',
        answer: 'H₀: μ = 150; Hₐ: μ > 150.',
      },
      {
        label: 'D',
        text: 'Suppose the health center calculates a p-value of 0.045. Interpret this p-value in the context of the study.',
        answerType: 'text',
        answer:
          'Assuming that the true mean weight of all first-year students is 150 lbs, there is a 0.045 probability of obtaining a sample mean weight of 156 lbs or greater by random chance alone.',
      },
    ],
  },
];

const STATS_UNIT5_FRQ_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit5';

export const statsUnit5StimulusFrqs: StatsStimulusFrq[] = [
  {
    id: 'u5-frq-car-weight-regression',
    title: 'FRQ 1: Least-Squares Regression Analysis',
    scenario: `An automotive engineer is studying the relationship between the weight of a car (in hundreds of pounds, x) and its fuel efficiency (in miles per gallon, y). Data were collected from 30 different car models. A scatterplot of the data shows a strong, negative, linear relationship. The computer output for the least-squares regression line is shown below.`,
    image: {
      src: `${STATS_UNIT5_FRQ_IMAGE_BASE}/u5frq1.png`,
      alt: 'Computer output for the least-squares regression of fuel efficiency on car weight',
    },
    parts: [
      {
        label: 'A',
        text: 'Interpret the slope of the regression line in the context of the study.',
        answerType: 'text',
        answer:
          "For each additional 100-pound increase in a car's weight, the model predicts a decrease of 0.35 mpg in fuel efficiency on average.",
      },
      {
        label: 'B',
        text: 'Calculate the coefficient of determination (r-squared) and interpret its value in the context of the study.',
        answerType: 'text',
        answer:
          "r-squared = (-0.902)^2 = 0.814. Approximately 81.4% of the variation in fuel efficiency is explained by the linear relationship with the car's weight.",
      },
      {
        label: 'C',
        text: 'A specific car model weighs 3,000 pounds (x = 30) and has a fuel efficiency of 33 mpg. Calculate the residual for this car.',
        answerType: 'text',
        answer: 'Predicted efficiency: y-hat = 45.2 - 0.35(30) = 34.7 mpg. Residual = 33 - 34.7 = -1.7 mpg.',
      },
      {
        label: 'D',
        text: "Explain what the value of the residual calculated in part (c) indicates about the model's prediction for this car.",
        answerType: 'text',
        answer:
          'The negative residual indicates that the model overpredicted the fuel efficiency of this car.',
      },
    ],
  },
  {
    id: 'u5-frq2-bacteria-transformation',
    title: 'FRQ 2: Model Appropriateness and Transformations',
    scenario:
      'A biologist is modeling the population growth of a bacteria colony. The colony size (y, in thousands) is measured over time (x, in hours). A linear regression model y-hat = 2.5 + 1.2x is fitted to the data. However, a plot of the residuals against time shows a distinct upward-curving pattern, as shown below.',
    image: {
      src: `${STATS_UNIT5_FRQ_IMAGE_BASE}/u5frq2.png`,
      alt: 'Residual plot of population size against time showing a curved pattern',
    },
    parts: [
      {
        label: 'A',
        text: 'Is the linear regression model appropriate for these data? Justify your answer using the residual plot information.',
        answerType: 'text',
        answer:
          'No, the linear model is not appropriate. The distinct curved pattern in the residual plot indicates that the relationship between time and population size is non-linear.',
      },
      {
        label: 'B',
        text: 'The biologist decides to use a log-transformation on the population size (y) to linearize the data. If the new regression equation is log(y)-hat = 0.4 + 0.05x, calculate the predicted colony size (y-hat) for a time of x = 10 hours.',
        answerType: 'text',
        answer: 'log(y)-hat = 0.4 + 0.05(10) = 0.9. y-hat = 10^0.9 = 7.94 thousand bacteria.',
      },
      {
        label: 'C',
        text: 'If the y-intercept of the original linear model was 2.5, interpret this value in the context of the study. Determine if it is a reasonable interpretation.',
        answerType: 'text',
        answer:
          'The y-intercept of 2.5 indicates that at time x = 0 hours, the predicted population size is 2.5 thousand bacteria. This is a reasonable interpretation as it represents the initial colony size.',
      },
      {
        label: 'D',
        text: 'Why might a log-transformation be preferred over the original linear model for population growth data?',
        answerType: 'text',
        answer:
          'Population growth is often exponential rather than linear. A log-transformation linearizes exponential data, allowing for a better fit and more accurate predictions over time.',
      },
    ],
  },
];

export const statsUnitStimulusFrqByUnit: Record<number, StatsStimulusFrq[]> = {
  1: statsUnit1StimulusFrqs,
  2: statsUnit2StimulusFrqs,
  3: statsUnit3StimulusFrqs,
  4: statsUnit4StimulusFrqs,
  5: statsUnit5StimulusFrqs,
};

export function getStatsUnitStimulusFrqs(unitNumber: number): StatsStimulusFrq[] {
  return statsUnitStimulusFrqByUnit[unitNumber] ?? [];
}

export function getStatsUnitFrqFormatLabels(unitNumber: number): string[] {
  return getStatsUnitStimulusFrqs(unitNumber).map((frq) => {
    const m = frq.title.match(/^FRQ\s*\d+\s*:\s*(.+)$/i);
    return m ? m[1].trim() : frq.title;
  });
}

/** Shape expected by `FullExamFRQ`. */
export function buildStatsUnitFrqPackForFullExam(unitNumber: number): {
  examTitle: string;
  questions: Array<{
    questionNumber: number;
    questionTitle?: string;
    prompt: string;
    tableData?: StatsFrqTableData;
    directionsAfterTable?: string;
    image?: StatsFrqImage;
    walkthroughVideoUrl?: string;
    parts: Array<{
      label: string;
      text: string;
      answerType: 'text' | 'draw' | null;
      answer?: string;
      tableData?: StatsFrqTableData;
      stimulusImage?: StatsFrqImage;
      partImage?: StatsFrqImage;
      drawPrompt?: string;
      templateImageUrl?: string;
      subparts?: Array<{
        label: string;
        text: string;
        answerType: 'text' | 'draw';
        answer?: string;
        partImage?: StatsFrqImage;
        templateImageUrl?: string;
      }>;
    }>;
  }>;
} | null {
  const pack = getStatsUnitStimulusFrqs(unitNumber);
  if (pack.length === 0) return null;

  return {
    examTitle: `AP Statistics Unit ${unitNumber} FRQ Pack (${pack.length} Questions)`,
    questions: pack.map((frq, idx) => {
      const questionNumber = idx + 1;
      if (frq.tableData) {
        return {
          questionNumber,
          questionTitle: frq.title,
          prompt: frq.scenario.trim(),
          tableData: frq.tableData,
          directionsAfterTable: frq.directionsAfterTable?.trim() || undefined,
          walkthroughVideoUrl: getStatsFrqWalkthroughVideoUrl(unitNumber, questionNumber),
          parts: frq.parts.map((part) => ({
            label: part.label,
            text: part.text,
            answerType: part.answerType ?? (part.subparts?.length ? null : 'text'),
            answer: part.answer,
            tableData: part.tableData,
            stimulusImage: part.tableImage,
            partImage: part.image,
            drawPrompt: part.drawPrompt,
            templateImageUrl: part.templateImageUrl,
            subparts: part.subparts?.map((sub) => ({
              label: sub.label,
              text: sub.text,
              answerType: sub.answerType ?? 'text',
              answer: sub.answer,
              partImage: sub.image,
              templateImageUrl: sub.templateImageUrl,
            })),
          })),
        };
      }
      return {
      questionNumber,
      questionTitle: frq.title,
      prompt: frq.scenario,
      image: frq.image,
      walkthroughVideoUrl: getStatsFrqWalkthroughVideoUrl(unitNumber, questionNumber),
      parts: frq.parts.map((part) => ({
        label: part.label,
        text: part.text,
        answerType: part.answerType ?? (part.subparts?.length ? null : 'text'),
        answer: part.answer,
        tableData: part.tableData,
        stimulusImage: part.tableImage,
        partImage: part.image,
        drawPrompt: part.drawPrompt,
        templateImageUrl: part.templateImageUrl,
        subparts: part.subparts?.map((sub) => ({
          label: sub.label,
          text: sub.text,
          answerType: sub.answerType ?? 'text',
          answer: sub.answer,
          partImage: sub.image,
          templateImageUrl: sub.templateImageUrl,
        })),
      })),
    };
    }),
  };
}
