/**
 * AP Statistics Full FRQ Exam 1 (Set A): 4 questions, 10 points each, 90 minutes (2027 format).
 *
 * Each part's `answer` holds the model answer followed by its scoring points, so students can score
 * themselves on the results screen. The alternate form (Set B) lives in `statsFullFrqExamSetB.ts`.
 */

const IMG = (file: string) =>
  `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/final_frq/${file}`;

export interface StatsFullFrqPart {
  label: string;
  text: string;
  answerType: 'text';
  answer: string;
}

export interface StatsFullFrqQuestion {
  questionNumber: number;
  questionTitle: string;
  prompt: string;
  tableData?: { title?: string; headers: string[]; rows: (string | number)[][]; rowHeaders?: boolean };
  directionsAfterTable?: string;
  image?: { src: string; alt: string };
  parts: StatsFullFrqPart[];
}

export interface StatsFullFrqExam {
  examTitle: string;
  questions: StatsFullFrqQuestion[];
}

/** Model answer, then one line per scoring point. */
export function frqAnswer(model: string, points: string[]): string {
  const heading = `Scoring (${points.length} point${points.length === 1 ? '' : 's'})`;
  return `${model}\n\n${heading}\n${points.map((p) => `• ${p}`).join('\n')}`;
}

export const statsFullFrqExam1: StatsFullFrqExam = {
  examTitle: 'AP Statistics Full FRQ Exam 1',
  questions: [
    {
      questionNumber: 1,
      questionTitle: 'Question 1: Library Hours Survey',
      prompt:
        'The city library board is considering extending Sunday hours. The board wants to estimate the proportion of all adult residents of the city who support the change. A librarian stands at the library exit on one Saturday afternoon and asks every 10th adult who leaves the building whether he or she supports extending Sunday hours. In all, 120 adults are surveyed. Each person is asked, "Don\'t you agree that a library is a valuable community resource that should be open more hours?"',
      parts: [
        {
          label: 'A',
          text: 'Identify the population of interest and the parameter of interest.',
          answerType: 'text',
          answer: frqAnswer(
            'Population: all adult residents of the city. Parameter: the proportion of all adult residents of the city who support extending Sunday hours.',
            [
              'Population: all adult residents of the city (not library patrons or the 120 surveyed).',
              'Parameter: the proportion of all adult residents of the city who support extending Sunday hours. It must be a proportion of the population, not of the sample.',
            ]
          ),
        },
        {
          label: 'B',
          text: 'Identify the sampling method the librarian used.',
          answerType: 'text',
          answer: frqAnswer(
            'Systematic sample (every 10th adult leaving the library). Because only people at the library could be chosen, it is also a convenience sample.',
            [
              'Names the method as a systematic sample. "Convenience sample" earns the point only if it also mentions the every-10th selection.',
            ]
          ),
        },
        {
          label: 'C',
          text: 'Identify one source of bias in this sampling plan other than the wording of the question, and explain how it could cause the sample result to differ from the truth in a particular direction.',
          answerType: 'text',
          answer: frqAnswer(
            'Undercoverage: only library users (on a Saturday afternoon) can be selected. Library users probably favor longer hours more than non-users, so the sample proportion would likely overestimate the population proportion.',
            [
              'Identifies undercoverage: only people at the library on a Saturday afternoon can be selected; residents who never visit are left out.',
              'Explains the direction: library users are more likely to want longer hours, so the sample proportion would be too high. A vague "not representative" does not earn the point.',
            ]
          ),
        },
        {
          label: 'D',
          text: "The board decides to take a new sample of 400 adult residents that accounts for the city's four neighborhoods. Describe how to select a stratified random sample of 400 adult residents using the four neighborhoods as strata, and explain one benefit of stratifying by neighborhood.",
          answerType: 'text',
          answer: frqAnswer(
            "Divide the list of adult residents into four groups by neighborhood. Use a random number generator to select 100 residents from each neighborhood (or numbers proportional to each neighborhood's population, totaling 400). Benefit: support may differ by neighborhood, and stratifying guarantees that each neighborhood is represented, giving a more precise estimate than a simple random sample of the same size.",
            [
              'Divides the adult residents into the four neighborhoods (the strata).',
              'Randomly selects residents within every neighborhood, with sample sizes that total 400 (equal or proportional allocation). Randomly choosing only some neighborhoods is a cluster sample and does not earn the point.',
              'Explains a benefit tied to the strata: support may differ by neighborhood, so guaranteeing each is represented gives a more precise or representative estimate.',
            ]
          ),
        },
        {
          label: 'E',
          text: 'The wording of the survey question is a concern. Explain why the wording may affect the survey results and describe the likely effect.',
          answerType: 'text',
          answer: frqAnswer(
            'The question is leading: it suggests that the library is valuable and should be open longer, which pushes respondents toward "yes." This response bias would make the proportion who say they support the change larger than the true proportion.',
            [
              'Identifies the wording as leading or loaded: it suggests the "correct" answer is yes.',
              'States the effect: more people say yes than otherwise would, so the sample proportion would be too high.',
            ]
          ),
        },
      ],
    },
    {
      questionNumber: 2,
      questionTitle: 'Question 2: Support Call Times',
      prompt:
        'A software company records the time it takes to resolve each of 150 customer support calls. The histogram shows the distribution of resolution times, in minutes. Each interval includes its left endpoint but not its right endpoint (for example, the second bar includes calls of exactly 2 minutes but not 4 minutes).',
      image: {
        src: IMG('frq_a2_histogram_calls.svg'),
        alt: 'Histogram of minutes to resolve 150 support calls, in 2-minute intervals from 0 to 18. Counts: 0 to 2, 8 calls; 2 to 4, 30; 4 to 6, 42; 6 to 8, 28; 8 to 10, 18; 10 to 12, 11; 12 to 14, 7; 14 to 16, 4; 16 to 18, 2.',
      },
      parts: [
        {
          label: 'A',
          text: 'Describe the shape, center, and spread of the distribution of resolution times.',
          answerType: 'text',
          answer: frqAnswer(
            'Shape: skewed right with a single peak. Center: the median resolution time is between 4 and 6 minutes (8 + 30 = 38 calls are under 4 minutes and 38 + 42 = 80 are under 6 minutes, so the 75th and 76th calls fall in that bar). Spread: times range from about 0 to 18 minutes.',
            [
              'Shape: skewed right (unimodal).',
              'Center in context, supported by the histogram: a median between 4 and 6 minutes (any single value from 4 to 7 minutes, or a mean of about 6.5 minutes if called the mean).',
              'Spread in context with numbers: times range from about 0 to 18 minutes, or a standard deviation of about 3 to 4 minutes.',
            ]
          ),
        },
        {
          label: 'B',
          text: 'Use the histogram to calculate the proportion of the 150 calls that took at least 10 minutes to resolve.',
          answerType: 'text',
          answer: frqAnswer('(11 + 7 + 4 + 2)/150 = 24/150 = 0.16.', [
            'Calculates 24/150 = 0.16 with the bars shown (11 + 7 + 4 + 2). Including the 8 to 10 bar does not earn the point.',
          ]),
        },
        {
          label: 'C',
          text: 'Is the mean resolution time greater than, less than, or approximately equal to the median? Justify your answer.',
          answerType: 'text',
          answer: frqAnswer(
            'The mean is greater than the median. The distribution is skewed right, and the few very long calls pull the mean toward the tail, while the median is resistant to extreme values.',
            [
              'States that the mean is greater than the median.',
              'Justifies with the right skew: the long tail of long calls pulls the mean up while the median is resistant.',
            ]
          ),
        },
        {
          label: 'D',
          text: 'For billing calls the mean resolution time is 7.5 minutes with a standard deviation of 4.0 minutes. For returns calls the mean is 4.0 minutes with a standard deviation of 2.0 minutes. A particular billing call took 9.5 minutes, and a particular returns call took 7.7 minutes. Relative to its own type of call, which call took longer? Justify your answer using standardized scores.',
          answerType: 'text',
          answer: frqAnswer(
            'Billing: z = (9.5 − 7.5)/4.0 = 0.50. Returns: z = (7.7 − 4.0)/2.0 = 1.85. The returns call is 1.85 standard deviations above its mean, compared with 0.50 for the billing call, so relative to its type the returns call took longer.',
            [
              'Calculates both z-scores: billing 0.50 and returns 1.85. Raw differences (2.0 and 3.7 minutes) do not earn the point.',
              "Concludes the returns call took longer relative to its type because its z-score is larger. A conclusion consistent with your own z-scores earns the point.",
            ]
          ),
        },
        {
          label: 'E',
          text: 'A manager proposes using a Normal model with mean 6.5 minutes and standard deviation 3.5 minutes to describe all 150 resolution times. Explain why this model is not appropriate.',
          answerType: 'text',
          answer: frqAnswer(
            'A Normal model is symmetric and bell-shaped, but the histogram is clearly skewed to the right.',
            ['Explains that the histogram is clearly skewed right, not symmetric and bell-shaped as a Normal model requires.']
          ),
        },
        {
          label: 'F',
          text: 'Suppose the 6 calls that took 14 minutes or longer are removed from the data. Describe the effect on the standard deviation of the resolution times. Explain your answer.',
          answerType: 'text',
          answer: frqAnswer(
            'The standard deviation would decrease. The removed calls are the ones farthest above the mean, so the remaining calls are more tightly clustered (the standard deviation falls from about 3.5 to about 3.0 minutes).',
            ['States that the standard deviation decreases and explains that the removed calls are far from the mean, so the remaining times are less spread out. Both the direction and the reason are needed.']
          ),
        },
      ],
    },
    {
      questionNumber: 3,
      questionTitle: 'Question 3: Sleep and Vocabulary Quizzes',
      prompt:
        'A psychologist wants to know whether a full night of sleep improves performance on vocabulary quizzes. She randomly selects 12 students from a large high school. Each student takes two different 40-point vocabulary quizzes: one after a night of normal sleep (rested) and one after a night with only 4 hours of sleep (sleep-deprived). For each student, a coin flip determines whether the rested or the sleep-deprived quiz is taken first, and the two versions of the quiz are of equal difficulty. The scores are shown in the table.',
      tableData: {
        title: 'Quiz scores (out of 40)',
        headers: ['Student', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        rows: [
          ['Sleep-deprived', 24, 28, 19, 30, 22, 26, 31, 18, 27, 25, 29, 21],
          ['Rested', 29, 31, 20, 36, 21, 28, 35, 18, 30, 31, 27, 23],
          ['Difference', 5, 3, 1, 6, -1, 2, 4, 0, 3, 6, -2, 2],
        ],
        rowHeaders: true,
      },
      directionsAfterTable:
        'Each difference is the rested score minus the sleep-deprived score. The mean of the 12 differences is 2.42 points and the standard deviation of the differences is 2.61 points. A dotplot of the differences is approximately symmetric with no outliers.',
      parts: [
        {
          label: 'A',
          text: 'Is there convincing evidence that, on average, students at this school score higher on the quiz after a full night of sleep than after a night of only 4 hours of sleep? Use a significance level of α = 0.05.',
          answerType: 'text',
          answer: frqAnswer(
            [
              'Hypotheses: H0: μd = 0 and Ha: μd > 0, where μd is the true mean difference (Rested − Deprived) in vocabulary quiz score for students at this school.',
              'Procedure and conditions: paired (one-sample) t-test for a mean difference. Random: the 12 students were randomly selected from the school, and the order of the quizzes was randomly assigned by a coin flip; 12 is less than 10% of the students at a large school. Normal: n = 12 < 30, but the dotplot of the differences is approximately symmetric with no outliers.',
              'Test: t = (2.4167 − 0)/(2.6097/√12) ≈ 3.21, df = 11, p-value ≈ 0.004.',
              'Conclusion: because 0.004 < 0.05, reject H0. There is convincing evidence that the true mean quiz score is higher after a full night of sleep than after 4 hours of sleep for students at this school.',
            ].join('\n\n'),
            [
              'States H0: μd = 0 and Ha: μd > 0, with μd defined in context as the true mean difference (rested minus deprived) for students at this school. A two-sided Ha or sample statistics do not earn the point.',
              'Identifies a paired t-test (one-sample t-test on the differences). A two-sample t-test does not earn the point.',
              'Random condition: the students were randomly selected, or the quiz order was randomly assigned by coin flip.',
              'Normal condition: with n = 12 < 30, uses the symmetric dotplot of differences with no outliers.',
              'Test statistic t ≈ 3.21 with df = 11.',
              'p-value ≈ 0.004 (0.003 to 0.005). A two-sided p-value of 0.008 does not earn the point.',
              'Compares the p-value to α: 0.004 < 0.05, so reject H0.',
              'Conclusion in context: convincing evidence that the true mean score is higher after a full night of sleep for students at this school. Generalizing beyond the school is not supported.',
            ]
          ),
        },
        {
          label: 'B',
          text: 'Interpret the p-value in the context of this study.',
          answerType: 'text',
          answer: frqAnswer(
            'If the true mean difference were 0, there would be about a 0.4% chance of observing a sample mean difference of 2.42 points or greater.',
            ['Interprets the p-value assuming H0 is true: about a 0.004 probability of a sample mean difference of 2.42 points or greater. "The probability that H0 is true" does not earn the point.']
          ),
        },
        {
          label: 'C',
          text: 'Based on your conclusion, describe a Type I error in the context of this study.',
          answerType: 'text',
          answer: frqAnswer(
            'A Type I error would be concluding that students at this school score higher on average after a full night of sleep when in fact the true mean scores are the same.',
            ['Describes a Type I error in context: concluding mean scores are higher after full sleep when in fact the true mean difference is 0.']
          ),
        },
      ],
    },
    {
      questionNumber: 4,
      questionTitle: 'Question 4: Movie Theater Concessions',
      prompt:
        "A movie theater manager studies purchases at the theater's concession stand. Let X be the number of snack items bought by a randomly selected concession customer. The probability distribution of X is shown in the table.",
      tableData: {
        title: 'Distribution of X, the number of snack items a randomly selected customer buys',
        headers: ['Number of snack items, x', '0', '1', '2', '3', '4'],
        rows: [['Probability', 0.21, 0.39, 0.25, 0.1, 0.05]],
        rowHeaders: true,
      },
      parts: [
        {
          label: 'A',
          text: 'What is the probability that a randomly selected customer buys at least 2 snack items?',
          answerType: 'text',
          answer: frqAnswer('P(X ≥ 2) = 0.25 + 0.10 + 0.05 = 0.40.', [
            'Calculates 0.40 (0.25 + 0.10 + 0.05, or 1 − 0.60). A correct answer with no work earns the point.',
          ]),
        },
        {
          label: 'B',
          text: 'Calculate the mean of X and interpret it in context.',
          answerType: 'text',
          answer: frqAnswer(
            'μX = 0(0.21) + 1(0.39) + 2(0.25) + 3(0.10) + 4(0.05) = 1.39. In the long run, customers buy an average of 1.39 snack items each.',
            [
              'Calculates μX = 1.39 with the sum shown.',
              'Interprets it as a long-run average over many customers, not what any one customer buys.',
            ]
          ),
        },
        {
          label: 'C',
          text: 'Calculate the standard deviation of X.',
          answerType: 'text',
          answer: frqAnswer(
            'σX = √[(0 − 1.39)²(0.21) + (1 − 1.39)²(0.39) + (2 − 1.39)²(0.25) + (3 − 1.39)²(0.10) + (4 − 1.39)²(0.05)] ≈ √1.158 ≈ 1.08.',
            ['Calculates σX ≈ 1.08 (1.07 to 1.08) with work or a calculator method. Reporting the variance (1.158) does not earn the point.']
          ),
        },
        {
          label: 'D',
          text: 'Two randomly selected customers make their purchases independently. What is the probability that both customers buy exactly 1 snack item?',
          answerType: 'text',
          answer: frqAnswer('(0.39)(0.39) = 0.1521.', ['Calculates (0.39)(0.39) ≈ 0.152.']),
        },
        {
          label: 'E',
          text: "The manager also wants to know how many concession customers buy a drink. The concession stand served about 4,000 customers last month. From last month's concession receipts, the manager selects a random sample of 180 receipts and finds that 63 of them include a drink. Construct and interpret a 95% confidence interval for the proportion of all of last month's concession customers who bought a drink. Verify the conditions for the interval.",
          answerType: 'text',
          answer: frqAnswer(
            [
              'One-sample z-interval for a proportion. Random: the 180 receipts were randomly selected, and 180 is less than 10% of the roughly 4,000 receipts. Large counts: 63 successes and 117 failures are both at least 10.',
              'p̂ = 63/180 = 0.35. 0.35 ± 1.96√(0.35 × 0.65/180) = 0.35 ± 1.96(0.0356) = 0.35 ± 0.070 = (0.280, 0.420).',
              "We are 95% confident that the interval from 0.280 to 0.420 captures the true proportion of all of last month's concession customers who bought a drink.",
            ].join('\n\n'),
            [
              'Random condition: random sample of receipts, and 180 < 10% of about 4,000. Both parts are needed.',
              'Large counts: 63 and 117 are both at least 10.',
              'Constructs the interval 0.35 ± 1.96√(0.35 × 0.65/180) ≈ (0.280, 0.420). Using t* or 0.45 in the standard error does not earn the point.',
              "Interprets: 95% confident the interval captures the true proportion of all of last month's concession customers who bought a drink. \"95% of customers\" or \"95% probability\" does not earn the point.",
            ]
          ),
        },
        {
          label: 'F',
          text: "The theater's business plan assumed that 45% of concession customers would buy a drink. Does the interval in part E provide convincing evidence that the true proportion of customers who bought a drink differs from 0.45? Justify your answer.",
          answerType: 'text',
          answer: frqAnswer(
            'Yes. The value 0.45 is not in the interval; every plausible value for the true proportion is below 0.45. So there is convincing evidence that the true proportion differs from 0.45 (it appears to be lower).',
            ['Concludes yes because 0.45 is not in the interval. Comparing 0.35 to 0.45 without the interval does not earn the point.']
          ),
        },
      ],
    },
  ],
};
