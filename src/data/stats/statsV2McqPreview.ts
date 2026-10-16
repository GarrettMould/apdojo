import type { Question } from '@/data/questionBanks/types';

/**
 * AP Statistics v2 table-heavy MCQ batch. IDs in 28xxx range.
 * Merged into live practice via `statsMcqPractice.ts`.
 */

function stripOptionPrefixes(options: string[]): string[] {
  return options.map((o) => o.replace(/^[A-E]\)\s*/, ''));
}

const PIZZA_TOPPING_TABLE = {
  headers: ['Topping', 'Frequency'],
  rows: [
    ['Pepperoni', '45'],
    ['Cheese', '30'],
    ['Sausage', '15'],
    ['Veggie', '10'],
  ],
};

const BREAKFAST_QUIZ_TABLE = {
  headers: [' ', 'Passed', 'Failed', 'Total'],
  rows: [
    ['Ate Breakfast', '70', '30', '100'],
    ['Skipped Breakfast', '40', '60', '100'],
    ['Total', '110', '90', '200'],
  ],
};

const HOMEWORK_VALUES_TABLE = {
  headers: ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5', 'Student 6', 'Student 7', 'Student 8'],
  rows: [
    ['4', '6', '7', '7', '9', '10', '12', '45'],
  ],
};

const FIVE_NUMBER_TABLE = {
  headers: ['Group', 'Min', 'Q1', 'Median', 'Q3', 'Max'],
  rows: [
    ['A', '12', '20', '25', '31', '58'],
    ['B', '18', '24', '29', '34', '44'],
  ],
};

const CLASS_TRANSPORT_TABLE = {
  headers: [' ', 'Walk', 'Bus', 'Car', 'Total'],
  rows: [
    ['Underclassman', '30', '70', '20', '120'],
    ['Upperclassman', '20', '20', '40', '80'],
    ['Total', '50', '90', '60', '200'],
  ],
};

const DISTRIBUTION_K_TABLE = {
  headers: ['x', 'P(x)'],
  rows: [
    ['0', '0.20'],
    ['1', '0.40'],
    ['2', 'k'],
    ['3', '0.10'],
  ],
};

const DISTRIBUTION_FULL_TABLE = {
  headers: ['x', 'P(x)'],
  rows: [
    ['0', '0.20'],
    ['1', '0.40'],
    ['2', '0.30'],
    ['3', '0.10'],
  ],
};

const INSURANCE_CLAIM_TABLE = {
  headers: ['Claim Amount', 'Probability'],
  rows: [
    ['$0', '0.95'],
    ['$1,000', '0.04'],
    ['$5,000', '0.01'],
  ],
};

const TEST_Z_TABLE = {
  headers: ['Test', 'Mean', 'SD', 'Student\'s Score'],
  rows: [
    ['Reading', '70', '8', '86'],
    ['Math', '65', '5', '73'],
  ],
};

const DRUG_TABLE = {
  headers: [' ', 'Recovered', 'Did Not Recover', 'Total'],
  rows: [
    ['Drug A', '84', '36', '120'],
    ['Drug B', '55', '45', '100'],
    ['Total', '139', '81', '220'],
  ],
};

const DRIVING_TABLE = {
  headers: [' ', 'Grade 10', 'Grade 11', 'Grade 12', 'Total'],
  rows: [
    ['Drives to School', '16', '35', '54', '105'],
    ['Does Not Drive', '64', '65', '66', '195'],
    ['Total', '80', '100', '120', '300'],
  ],
};

const EXERCISE_SLEEP_TABLE = {
  headers: [' ', 'Sleeps 7+ Hours', 'Sleeps Under 7 Hours', 'Total'],
  rows: [
    ['Exercises Regularly', '60', '40', '100'],
    ['Does Not Exercise', '40', '60', '100'],
    ['Total', '100', '100', '200'],
  ],
};

const CANDY_TABLE = {
  headers: ['Color', 'Claimed Percentage', 'Observed Count'],
  rows: [
    ['Red', '30%', '68'],
    ['Blue', '25%', '44'],
    ['Green', '20%', '36'],
    ['Yellow', '15%', '34'],
    ['Orange', '10%', '18'],
    ['Total', '100%', '200'],
  ],
};

const BATTERY_SUMMARY_TABLE = {
  headers: ['n', 'Sample Mean (hours)', 'Sample SD (hours)'],
  rows: [
    ['25', '48.2', '6.5'],
  ],
};

const PAIRED_SCORES_TABLE = {
  headers: ['Student', 'Before Program', 'After Program'],
  rows: [
    ['1', '72', '78'],
    ['2', '68', '70'],
    ['3', '80', '85'],
    ['4', '75', '77'],
    ['5', '66', '71'],
    ['6', '70', '76'],
  ],
};

const TWO_SAMPLE_TABLE = {
  headers: ['Group', 'n', 'Sample Mean', 'Sample SD'],
  rows: [
    ['Online', '32', '77.4', '9.0'],
    ['In Person', '30', '74.1', '8.0'],
  ],
};

const CAR_OUTPUT_TABLE = {
  headers: ['Predictor', 'Coef', 'SE Coef', 'T', 'P'],
  rows: [
    ['Constant', '21500', '850', '25.29', '0.000'],
    ['Age', '-1450', '180', '-8.06', '0.000'],
  ],
};

const STUDY_OUTPUT_TABLE = {
  headers: ['Predictor', 'Coef', 'SE Coef', 'T', 'P'],
  rows: [
    ['Constant', '52.1', '4.3', '12.12', '0.000'],
    ['Hours', '4.8', '1.1', '4.36', '0.000'],
  ],
};

const PRACTICE_SUMMARY_TABLE = {
  headers: ['Variable', 'Mean', 'SD'],
  rows: [
    ['x (hours of practice)', '10', '2'],
    ['y (score)', '50', '8'],
  ],
};

export const statsV2Unit1Questions: Question[] = [
  {
    id: 28101,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A survey asked 100 students to choose a favorite pizza topping. The results are shown in the table. What percentage of the students chose a topping other than pepperoni?',
    image: null,
    tableData: PIZZA_TOPPING_TABLE,
    options: stripOptionPrefixes([
      'A) 30%',
      'B) 55%',
      'C) 50%',
      'D) 45%',
      'E) 85%',
    ]),
    correctAnswer: 'B',
    explanation:
      'Pepperoni was chosen by 45 of 100 students, so 100 - 45 = 55 students chose another topping. 55/100 = 55%.',
    videoExplanation: null,
  },
  {
    id: 28102,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A teacher recorded whether 200 randomly selected students ate breakfast and whether they passed a quiz. What percentage of all 200 students passed the quiz?',
    image: null,
    tableData: BREAKFAST_QUIZ_TABLE,
    options: stripOptionPrefixes([
      'A) 40%',
      'B) 70%',
      'C) 60%',
      'D) 55%',
      'E) 85%',
    ]),
    correctAnswer: 'D',
    explanation:
      'The marginal total of students who passed is 70 + 40 = 110. 110/200 = 55%.',
    videoExplanation: null,
  },
  {
    id: 28103,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'Using the breakfast and quiz data, what percentage of the students who passed the quiz had skipped breakfast?',
    image: null,
    tableData: BREAKFAST_QUIZ_TABLE,
    options: stripOptionPrefixes([
      'A) 20%',
      'B) 36.4%',
      'C) 30%',
      'D) 40%',
      'E) 60%',
    ]),
    correctAnswer: 'B',
    explanation:
      'Among the 110 students who passed, 40 skipped breakfast. 40/110 ≈ 36.4%. The 40% option is the percentage of all 100 skippers who passed, which is a different conditional.',
    videoExplanation: null,
  },
  {
    id: 28104,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'Based on the breakfast and quiz data, which of the following statements is best supported?',
    image: null,
    tableData: BREAKFAST_QUIZ_TABLE,
    options: stripOptionPrefixes([
      'A) Students who ate breakfast were more likely to pass the quiz than students who skipped breakfast.',
      'B) The percentage of students who passed was the same for both breakfast groups.',
      'C) Skipping breakfast causes students to fail the quiz.',
      'D) More students ate breakfast than skipped breakfast.',
      'E) Most of the students who failed the quiz had eaten breakfast.',
    ]),
    correctAnswer: 'A',
    explanation:
      'Compare the conditional percentages: 70/100 = 70% of breakfast eaters passed versus 40/100 = 40% of skippers. Since the data come from an observational study, we cannot conclude that skipping breakfast causes failure. Of the 90 students who failed, 60 skipped breakfast.',
    videoExplanation: null,
  },
  {
    id: 28105,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'The table shows the number of minutes that eight students spent on homework last night. What are the mean and median, and which is the better measure of center for these data?',
    image: null,
    tableData: HOMEWORK_VALUES_TABLE,
    options: stripOptionPrefixes([
      'A) Mean = 8, median = 12.5; the median, because the data are skewed left.',
      'B) Mean = 12.5, median = 8; the mean, because it uses every value in the data set.',
      'C) Mean = 12.5, median = 8; the median, because the data are skewed right by the value of 45.',
      'D) Mean = 12.5, median = 9; the median, because the data are skewed right.',
      'E) Mean = 8, median = 8; either measure works because the data are symmetric.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The sum is 100, so the mean is 100/8 = 12.5. The two middle values are 7 and 9, so the median is 8. The extreme value of 45 pulls the mean above the median, so the data are skewed right and the median is the better measure of a typical value.',
    videoExplanation: null,
  },
  {
    id: 28106,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'Using the homework data, suppose the student who studied for 45 minutes is removed from the data set. Which of the following describes the effect on the mean and median?',
    image: null,
    tableData: HOMEWORK_VALUES_TABLE,
    options: stripOptionPrefixes([
      'A) The mean decreases to about 7.86 and the median decreases to 7.',
      'B) The mean stays at 12.5 and the median decreases to 7.',
      'C) The mean and the median both decrease by the same amount.',
      'D) The mean decreases to about 7.86 and the median stays at 8.',
      'E) The mean decreases to 8 and the median increases to 12.5.',
    ]),
    correctAnswer: 'A',
    explanation:
      'The remaining seven values are 4, 6, 7, 7, 9, 10, 12. The mean is 55/7 ≈ 7.86 (a drop of about 4.64) and the median is the fourth value, 7 (a drop of 1). The mean is much more sensitive to the outlier than the median.',
    videoExplanation: null,
  },
  {
    id: 28107,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'The table gives five-number summaries for the number of minutes two groups of students spent on a task. According to the 1.5 × IQR rule, which of the following is correct?',
    image: null,
    tableData: FIVE_NUMBER_TABLE,
    options: stripOptionPrefixes([
      'A) Group A has a high outlier, and Group B has no outliers.',
      'B) Both groups have high outliers.',
      'C) Neither group has any outliers.',
      'D) Group B has a high outlier because its maximum of 44 is greater than Q3 = 34.',
      'E) Group A has no outliers because 58 is less than 1.5 times its range.',
    ]),
    correctAnswer: 'A',
    explanation:
      'Group A: IQR = 31 - 20 = 11, so the upper fence is 31 + 1.5(11) = 47.5. The maximum of 58 is above the fence, so it is an outlier. Group B: IQR = 34 - 24 = 10, so the upper fence is 34 + 15 = 49, and 44 is below it. The lower fences (3.5 for A and 9 for B) are below both minimums.',
    videoExplanation: null,
  },
  {
    id: 28108,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'Using the same five-number summaries, which of the following comparisons is correct?',
    image: null,
    tableData: FIVE_NUMBER_TABLE,
    options: stripOptionPrefixes([
      'A) Group A has the higher median and the larger IQR.',
      'B) Group B has both the larger range and the larger IQR.',
      'C) The two groups have the same IQR.',
      'D) Group B has the larger range but the lower median.',
      'E) Group B has the higher median, but Group A has the larger range.',
    ]),
    correctAnswer: 'E',
    explanation:
      'Group B median = 29 versus 25 for Group A. Range for A = 58 - 12 = 46 and for B = 44 - 18 = 26. IQR for A is 11 and for B is 10, so the IQRs are close but not equal.',
    videoExplanation: null,
  },
  {
    id: 28109,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.11'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A school has 40 homerooms with about 25 students each. The principal randomly selects 4 homerooms and surveys every student in those homerooms. Which sampling method is this?',
    image: null,
    options: stripOptionPrefixes([
      'A) Cluster sample.',
      'B) Simple random sample.',
      'C) Systematic sample.',
      'D) Stratified random sample.',
      'E) Convenience sample.',
    ]),
    correctAnswer: 'A',
    explanation:
      'The homerooms are naturally occurring groups. Randomly choosing whole groups and surveying everyone in them is a cluster sample. A stratified sample would take some students from every group.',
    videoExplanation: null,
  },
  {
    id: 28110,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.11'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A city is 60% suburban and 40% rural. A researcher takes a simple random sample of 60 suburban residents and a separate simple random sample of 40 rural residents. Which sampling method is this?',
    image: null,
    options: stripOptionPrefixes([
      'A) Cluster sample.',
      'B) Voluntary response sample.',
      'C) Simple random sample.',
      'D) Systematic sample.',
      'E) Stratified random sample.',
    ]),
    correctAnswer: 'E',
    explanation:
      'The population is divided into groups (suburban and rural) and a random sample is taken from every group. That is a stratified random sample. It is not an SRS of the whole city because not every group of 100 residents has an equal chance of being selected.',
    videoExplanation: null,
  },
  {
    id: 28111,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.12'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A local news station asks viewers to visit its website and vote on whether the city should build a new stadium. Which type of bias is most likely present?',
    image: null,
    options: stripOptionPrefixes([
      'A) Response bias.',
      'B) Undercoverage.',
      'C) Voluntary response bias.',
      'D) Nonresponse bias.',
      'E) Confounding.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Viewers choose whether to respond, and people with strong opinions are more likely to participate. This is voluntary response bias, and the results cannot be generalized to the city.',
    videoExplanation: null,
  },
  {
    id: 28112,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.12'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A researcher wants to estimate the average household income in a city and selects households at random from a landline phone directory. Which type of bias is most likely present?',
    image: null,
    options: stripOptionPrefixes([
      'A) Voluntary response bias.',
      'B) Response bias.',
      'C) Placebo effect.',
      'D) Confounding.',
      'E) Undercoverage.',
    ]),
    correctAnswer: 'E',
    explanation:
      'Households without a listed landline, such as people who use only cell phones, have no chance of being selected. That is undercoverage, a flaw in the sampling frame.',
    videoExplanation: null,
  },
  {
    id: 28113,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'Which of the following is the most important feature of a study that allows researchers to conclude that a treatment caused a difference in responses?',
    image: null,
    options: stripOptionPrefixes([
      'A) A large sample size.',
      'B) Random assignment of subjects to treatment groups.',
      'C) Collecting data over a long period of time.',
      'D) Using a survey instead of an experiment.',
      'E) Random selection of subjects from the population.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Random assignment creates groups that are similar before the treatment, so differences in the response can be attributed to the treatment. Random selection allows generalizing to a population but does not establish cause and effect.',
    videoExplanation: null,
  },
  {
    id: 28114,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A farmer tests two fertilizers on 12 plots. Six plots are on a sunny hillside and six are in a shady valley. The farmer randomly assigns the fertilizers within the sunny plots and separately within the shady plots. What is the main purpose of this blocking?',
    image: null,
    options: stripOptionPrefixes([
      'A) To make sure the farmer cannot tell which plots received which fertilizer.',
      'B) To increase the number of plots used in the experiment.',
      'C) To remove the variability in crop yield that is caused by the difference in sunlight.',
      'D) To allow the results to be generalized to all farms.',
      'E) To eliminate the need for random assignment.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Blocking groups similar experimental units together. Here sunlight is likely to affect yield, so comparing fertilizers within each block keeps that source of variability from clouding the comparison.',
    videoExplanation: null,
  },
  {
    id: 28115,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'In an experiment testing a new cold medicine, some subjects receive a pill with no active ingredient. What is the main purpose of giving these subjects a placebo?',
    image: null,
    options: stripOptionPrefixes([
      'A) To eliminate all variability in the response variable.',
      'B) To increase the sample size of the treatment group.',
      'C) To ensure the subjects are randomly selected from the population.',
      'D) To account for the effect of simply receiving a treatment, so it can be separated from the effect of the medicine.',
      'E) To show that the medicine has no side effects.',
    ]),
    correctAnswer: 'D',
    explanation:
      'Subjects often respond to the belief that they are being treated. The placebo group gives a baseline for that effect, so any additional improvement in the medicine group can be attributed to the medicine.',
    videoExplanation: null,
  },
  {
    id: 28116,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: 'Exploring One-Variable Data and Collecting Data',
    question:
      'A study finds that months with higher ice cream sales also tend to have more drownings. Which of the following is the best explanation for this association?',
    image: null,
    options: stripOptionPrefixes([
      'A) Eating ice cream causes people to drown.',
      'B) Drownings cause people to buy more ice cream.',
      'C) The association must be due to chance.',
      'D) Hot weather is a confounding variable that increases both ice cream sales and swimming.',
      'E) Ice cream sales are the response variable and drownings are the explanatory variable.',
    ]),
    correctAnswer: 'D',
    explanation:
      'Warm temperatures increase both ice cream purchases and the number of people swimming. A confounding variable can create an association between two variables even when neither causes the other.',
    videoExplanation: null,
  },
];

export const statsV2Unit2Questions: Question[] = [
  {
    id: 28201,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A random sample of 200 students at a high school was classified by class standing and by how they usually get to school. What is the probability that a randomly selected student usually takes the bus?',
    image: null,
    tableData: CLASS_TRANSPORT_TABLE,
    options: stripOptionPrefixes([
      'A) 0.35',
      'B) 0.60',
      'C) 0.50',
      'D) 0.45',
      'E) 0.78',
    ]),
    correctAnswer: 'D',
    explanation:
      'P(Bus) = 90/200 = 0.45.',
    videoExplanation: null,
  },
  {
    id: 28202,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A random sample of 200 students at a high school was classified by class standing and by how they usually get to school. What is the probability that a randomly selected student is an upperclassman who usually rides in a car?',
    image: null,
    tableData: CLASS_TRANSPORT_TABLE,
    options: stripOptionPrefixes([
      'A) 0.33',
      'B) 0.20',
      'C) 0.40',
      'D) 0.50',
      'E) 0.67',
    ]),
    correctAnswer: 'B',
    explanation:
      'P(Upperclassman and Car) = 40/200 = 0.20. The values 0.50 and 0.67 are conditional probabilities and are not P(A and B).',
    videoExplanation: null,
  },
  {
    id: 28203,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.6'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A random sample of 200 students at a high school was classified by class standing and by how they usually get to school. Given that a randomly selected student usually rides in a car, what is the probability that the student is an upperclassman?',
    image: null,
    tableData: CLASS_TRANSPORT_TABLE,
    options: stripOptionPrefixes([
      'A) 0.200',
      'B) 0.333',
      'C) 0.667',
      'D) 0.500',
      'E) 0.800',
    ]),
    correctAnswer: 'C',
    explanation:
      'P(Upperclassman | Car) = 40/60 ≈ 0.667. The condition restricts the sample space to the 60 students who ride in a car.',
    videoExplanation: null,
  },
  {
    id: 28204,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.7'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A random sample of 200 students at a high school was classified by class standing and by how they usually get to school. Are the events "usually walks" and "is an underclassman" independent?',
    image: null,
    tableData: CLASS_TRANSPORT_TABLE,
    options: stripOptionPrefixes([
      'A) Yes, because P(Walk) = 0.25 and P(Walk | Underclassman) = 30/120 = 0.25.',
      'B) No, because P(Walk and Underclassman) = 0.15 is not equal to 0.',
      'C) No, because there are more underclassmen than upperclassmen.',
      'D) Yes, because the two events are mutually exclusive.',
      'E) Independence cannot be determined from a two-way table.',
    ]),
    correctAnswer: 'A',
    explanation:
      'Events are independent if P(A | B) = P(A). P(Walk) = 50/200 = 0.25 and P(Walk | Underclassman) = 30/120 = 0.25, so the events are independent. The events are not mutually exclusive because 30 students are both underclassmen and walkers.',
    videoExplanation: null,
  },
  {
    id: 28205,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.5'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A random sample of 200 students at a high school was classified by class standing and by how they usually get to school. What is the probability that a randomly selected student usually walks or is an underclassman?',
    image: null,
    tableData: CLASS_TRANSPORT_TABLE,
    options: stripOptionPrefixes([
      'A) 0.15',
      'B) 0.25',
      'C) 0.60',
      'D) 0.70',
      'E) 0.85',
    ]),
    correctAnswer: 'D',
    explanation:
      'P(Walk or Under) = P(Walk) + P(Under) - P(Walk and Under) = 0.25 + 0.60 - 0.15 = 0.70. Adding without subtracting the overlap would give 0.85.',
    videoExplanation: null,
  },
  {
    id: 28206,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.5', '2.7'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'For two events A and B, P(A) = 0.30, P(B) = 0.40, and P(A and B) = 0.12. Which of the following is correct?',
    image: null,
    options: stripOptionPrefixes([
      'A) A and B are mutually exclusive but not independent.',
      'B) A and B are independent but not mutually exclusive.',
      'C) A and B are neither mutually exclusive nor independent.',
      'D) P(A or B) = 0.70.',
      'E) A and B are both mutually exclusive and independent.',
    ]),
    correctAnswer: 'B',
    explanation:
      'P(A) × P(B) = 0.30 × 0.40 = 0.12 = P(A and B), so the events are independent. Since P(A and B) is not 0, they are not mutually exclusive. P(A or B) = 0.30 + 0.40 - 0.12 = 0.58.',
    videoExplanation: null,
  },
  {
    id: 28207,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'The table shows the probability distribution of a discrete random variable X, the number of defects found in a randomly selected product. What must be the value of k for this to be a valid probability distribution?',
    image: null,
    tableData: DISTRIBUTION_K_TABLE,
    options: stripOptionPrefixes([
      'A) 0.10',
      'B) 0.20',
      'C) 0.70',
      'D) 0.40',
      'E) 0.30',
    ]),
    correctAnswer: 'E',
    explanation:
      'The probabilities must sum to 1. 0.20 + 0.40 + k + 0.10 = 1, so k = 0.30.',
    videoExplanation: null,
  },
  {
    id: 28208,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'The probability distribution of X, the number of defects found in a randomly selected product, is shown. What is the expected value of X?',
    image: null,
    tableData: DISTRIBUTION_FULL_TABLE,
    options: stripOptionPrefixes([
      'A) 0.81',
      'B) 1.90',
      'C) 1.50',
      'D) 1.30',
      'E) 3.00',
    ]),
    correctAnswer: 'D',
    explanation:
      'E(X) = 0(0.20) + 1(0.40) + 2(0.30) + 3(0.10) = 1.30. The value 1.50 is the unweighted average of the four x-values.',
    videoExplanation: null,
  },
  {
    id: 28209,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'The probability distribution of X, the number of defects found in a randomly selected product, is shown. What is the standard deviation of X?',
    image: null,
    tableData: DISTRIBUTION_FULL_TABLE,
    options: stripOptionPrefixes([
      'A) 0.45',
      'B) 0.81',
      'C) 0.90',
      'D) 1.14',
      'E) 1.30',
    ]),
    correctAnswer: 'C',
    explanation:
      'With a mean of 1.30, Var(X) = (0-1.3)²(0.20) + (1-1.3)²(0.40) + (2-1.3)²(0.30) + (3-1.3)²(0.10) = 0.338 + 0.036 + 0.147 + 0.289 = 0.81. SD = √0.81 = 0.90. The value 0.81 is the variance.',
    videoExplanation: null,
  },
  {
    id: 28210,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'The number of defects X has mean 1.30 and standard deviation 0.90. A repair cost is modeled by Y = 3X + 2. What are the mean and standard deviation of Y?',
    image: null,
    tableData: DISTRIBUTION_FULL_TABLE,
    options: stripOptionPrefixes([
      'A) Mean = 5.9, SD = 4.7',
      'B) Mean = 3.9, SD = 2.7',
      'C) Mean = 5.9, SD = 2.7',
      'D) Mean = 5.9, SD = 0.9',
      'E) Mean = 1.3, SD = 2.7',
    ]),
    correctAnswer: 'C',
    explanation:
      'For Y = aX + b, the mean is a(μ) + b = 3(1.3) + 2 = 5.9. The SD is |a|(σ) = 3(0.9) = 2.7. Adding a constant does not change the spread.',
    videoExplanation: null,
  },
  {
    id: 28211,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'The table shows the distribution of the claim amount an insurance company pays on a randomly selected policy in one year. The company charges $120 per policy. What is the company\'s expected profit per policy?',
    image: null,
    tableData: INSURANCE_CLAIM_TABLE,
    options: stripOptionPrefixes([
      'A) $0',
      'B) $210',
      'C) $90',
      'D) $120',
      'E) $30',
    ]),
    correctAnswer: 'E',
    explanation:
      'The expected payout is 0(0.95) + 1,000(0.04) + 5,000(0.01) = $90. Expected profit = $120 - $90 = $30 per policy.',
    videoExplanation: null,
  },
  {
    id: 28212,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'Which of the following random variables has a binomial distribution?',
    image: null,
    options: stripOptionPrefixes([
      'A) The number of rolls of a fair die needed to get the first 6.',
      'B) The number of games a team must play to win its third game.',
      'C) The heights of 20 randomly selected students.',
      'D) The number of red cards in a hand of 5 cards dealt from a deck of 10 cards that contains 4 red cards.',
      'E) The number of heads in 15 flips of a fair coin.',
    ]),
    correctAnswer: 'E',
    explanation:
      'A binomial setting has a fixed number of independent trials, two outcomes, and the same probability of success on each trial. The coin flips satisfy all four conditions. The die rolls and the games count trials until a success, and the cards are dealt without replacement from a very small deck, so the trials are not independent.',
    videoExplanation: null,
  },
  {
    id: 28213,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A basketball player makes 30% of her shots. She takes 40 shots, and X is the number she makes. What are the mean and standard deviation of X?',
    image: null,
    options: stripOptionPrefixes([
      'A) Mean = 12, SD = 8.40',
      'B) Mean = 12, SD = 2.90',
      'C) Mean = 28, SD = 2.90',
      'D) Mean = 12, SD = 3.46',
      'E) Mean = 9, SD = 2.90',
    ]),
    correctAnswer: 'B',
    explanation:
      'μ = np = 40(0.30) = 12. σ = √(np(1-p)) = √(40 × 0.30 × 0.70) = √8.4 ≈ 2.90.',
    videoExplanation: null,
  },
  {
    id: 28214,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'The number of successes X in 10 independent trials with probability of success 0.4 on each trial is binomial. Which calculator command gives P(X ≥ 5)?',
    image: null,
    options: stripOptionPrefixes([
      'A) 1 - binomcdf(10, 0.4, 4)',
      'B) binomcdf(10, 0.4, 5)',
      'C) binompdf(10, 0.4, 5)',
      'D) 1 - binomcdf(10, 0.4, 5)',
      'E) binomcdf(10, 0.4, 4)',
    ]),
    correctAnswer: 'A',
    explanation:
      'binomcdf gives P(X ≤ k). P(X ≥ 5) is the complement of P(X ≤ 4), so the answer is 1 - binomcdf(10, 0.4, 4).',
    videoExplanation: null,
  },
  {
    id: 28215,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A student took a reading test and a math test. The table shows the mean and standard deviation of all scores on each test, along with the student\'s score. On which test did the student perform better relative to the other test takers?',
    image: null,
    tableData: TEST_Z_TABLE,
    options: stripOptionPrefixes([
      'A) Reading, because 86 is greater than 73.',
      'B) Math, because the standard deviation of math scores is smaller.',
      'C) Math, because 73 is closer to the mean than 86.',
      'D) Reading, because the z-score of 2.0 is higher than the math z-score of 1.6.',
      'E) The performances were equal because both scores are above the mean.',
    ]),
    correctAnswer: 'D',
    explanation:
      'Reading z = (86 - 70)/8 = 2.0. Math z = (73 - 65)/5 = 1.6. A higher z-score means the score is more standard deviations above the mean, so the student did relatively better on the reading test.',
    videoExplanation: null,
  },
  {
    id: 28216,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'Heights of adult women in a certain population are approximately Normal with a mean of 64 inches and a standard deviation of 3 inches. Using the empirical rule, approximately what percentage of these women are between 61 and 70 inches tall?',
    image: null,
    options: stripOptionPrefixes([
      'A) 81.5%',
      'B) 68%',
      'C) 84%',
      'D) 95%',
      'E) 97.5%',
    ]),
    correctAnswer: 'A',
    explanation:
      '61 is 1 SD below the mean and 70 is 2 SDs above the mean. The area is 34% + 47.5% = 81.5%.',
    videoExplanation: null,
  },
  {
    id: 28217,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'A population has mean 80 and standard deviation 12. A random sample of 36 observations is selected. What are the mean and standard deviation of the sampling distribution of the sample mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) Mean = 80, SD = 12',
      'B) Mean = 80, SD = 6',
      'C) Mean = 80, SD = 2',
      'D) Mean = 80, SD = 0.33',
      'E) Mean = 13.3, SD = 2',
    ]),
    correctAnswer: 'C',
    explanation:
      'The mean of the sampling distribution of x̄ equals the population mean, 80. The standard deviation is σ/√n = 12/√36 = 2.',
    videoExplanation: null,
  },
  {
    id: 28218,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'Suppose 40% of all voters in a large city support a ballot measure. A random sample of 100 voters is selected. What is the standard deviation of the sampling distribution of the sample proportion p̂?',
    image: null,
    options: stripOptionPrefixes([
      'A) 0.049',
      'B) 0.040',
      'C) 0.024',
      'D) 0.240',
      'E) 0.490',
    ]),
    correctAnswer: 'A',
    explanation:
      'σ = √(p(1-p)/n) = √(0.40 × 0.60/100) = √0.0024 ≈ 0.049. The value 0.49 forgets to divide by n.',
    videoExplanation: null,
  },
  {
    id: 28219,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Probability, Random Variables, and Probability Distributions',
    question:
      'Suppose 5% of the items from a factory are defective. A random sample of 100 items is selected. Can the sampling distribution of the sample proportion p̂ be approximated by a Normal distribution?',
    image: null,
    options: stripOptionPrefixes([
      'A) Yes, because the sample size is at least 30.',
      'B) No, because np = 5 is less than 10.',
      'C) Yes, because the sample is less than 10% of the population.',
      'D) No, because p is less than 0.5.',
      'E) Yes, because n(1 - p) = 95 is at least 10.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Both np ≥ 10 and n(1 - p) ≥ 10 must hold. Here np = 100(0.05) = 5, so the Normal condition is not met even though n(1 - p) = 95. The 10% condition only checks independence.',
    videoExplanation: null,
  },
];

export const statsV2Unit3Questions: Question[] = [
  {
    id: 28301,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.13'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a randomized experiment, 120 patients received Drug A and 100 patients received Drug B. The table shows whether each patient recovered. What is the pooled proportion of patients who recovered that is used in a test of H0: pA = pB?',
    image: null,
    tableData: DRUG_TABLE,
    options: stripOptionPrefixes([
      'A) 0.150',
      'B) 0.632',
      'C) 0.625',
      'D) 0.550',
      'E) 0.700',
    ]),
    correctAnswer: 'B',
    explanation:
      'The pooled proportion is the total number of successes over the total sample size: (84 + 55)/(120 + 100) = 139/220 ≈ 0.632. The value 0.625 is the average of the two sample proportions, which is not the same because the group sizes differ.',
    videoExplanation: null,
  },
  {
    id: 28302,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.13'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a randomized experiment, 120 patients received Drug A and 100 patients received Drug B. The table shows whether each patient recovered. What is the test statistic for a test of H0: pA = pB versus Ha: pA ≠ pB?',
    image: null,
    tableData: DRUG_TABLE,
    options: stripOptionPrefixes([
      'A) 0.15',
      'B) 1.96',
      'C) 2.30',
      'D) 2.58',
      'E) 3.45',
    ]),
    correctAnswer: 'C',
    explanation:
      'p̂A = 84/120 = 0.70, p̂B = 55/100 = 0.55, and the pooled proportion is 0.632. SE = √(0.632 × 0.368 × (1/120 + 1/100)) ≈ 0.0653. z = (0.70 - 0.55)/0.0653 ≈ 2.30.',
    videoExplanation: null,
  },
  {
    id: 28303,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.13'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a randomized experiment, 120 patients received Drug A and 100 patients received Drug B. The table shows whether each patient recovered. A two-proportion z-test of H0: pA = pB versus Ha: pA ≠ pB gives z ≈ 2.30 and a p-value of about 0.022. Which of the following is the correct conclusion at the α = 0.05 significance level?',
    image: null,
    tableData: DRUG_TABLE,
    options: stripOptionPrefixes([
      'A) Fail to reject H0. There is not convincing evidence that the true recovery proportions differ.',
      'B) Reject H0. There is a 2.2% chance that the two drugs have the same recovery proportion.',
      'C) Reject H0. There is convincing evidence that the true recovery proportions differ for the two drugs.',
      'D) Fail to reject H0. The two drugs have equal recovery proportions.',
      'E) Reject H0. Exactly 2.2% of patients will recover on Drug A.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Since 0.022 < 0.05, we reject H0 and conclude there is convincing evidence of a difference. The p-value is the probability of a result this extreme if H0 is true, not the probability that H0 is true.',
    videoExplanation: null,
  },
  {
    id: 28304,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a randomized experiment, 120 patients received Drug A and 100 patients received Drug B. The table shows whether each patient recovered. Which of the following is a 95% confidence interval for pA - pB?',
    image: null,
    tableData: DRUG_TABLE,
    options: stripOptionPrefixes([
      'A) (0.023, 0.277)',
      'B) (-0.017, 0.317)',
      'C) (0.043, 0.257)',
      'D) (0.068, 0.232)',
      'E) (0.085, 0.215)',
    ]),
    correctAnswer: 'A',
    explanation:
      'The standard error for a confidence interval does not use the pooled proportion: √(0.70(0.30)/120 + 0.55(0.45)/100) = 0.065. The margin of error is 1.96(0.065) ≈ 0.127, so the interval is 0.15 ± 0.127 = (0.023, 0.277).',
    videoExplanation: null,
  },
  {
    id: 28305,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A 95% confidence interval for pA - pB, the difference in the true recovery proportions for Drug A and Drug B, is (0.023, 0.277). Which of the following is the best interpretation of this interval?',
    image: null,
    options: stripOptionPrefixes([
      'A) We are 95% confident that the true difference in recovery proportions (A minus B) is between 0.023 and 0.277.',
      'B) 95% of patients have a recovery difference between 0.023 and 0.277.',
      'C) There is a 95% probability that the sample difference is between 0.023 and 0.277.',
      'D) Drug A will cure between 2.3% and 27.7% of patients.',
      'E) We are 95% confident that the sample difference is between 0.023 and 0.277.',
    ]),
    correctAnswer: 'A',
    explanation:
      'A confidence interval gives a range of plausible values for the population parameter, here the true difference pA - pB. Because the entire interval is above 0, it also suggests that Drug A has the higher recovery proportion.',
    videoExplanation: null,
  },
  {
    id: 28306,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.12'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a randomized experiment, 120 patients received Drug A and 100 patients received Drug B. The table shows whether each patient recovered. Which of the following verifies the large counts condition for inference about pA - pB?',
    image: null,
    tableData: DRUG_TABLE,
    options: stripOptionPrefixes([
      'A) Both group sizes are at least 30.',
      'B) The total sample size of 220 is greater than 10 times the number of groups.',
      'C) The number of patients in each group is less than 10% of all patients.',
      'D) The counts of successes and failures in both groups are all at least 10.',
      'E) The pooled proportion is between 0.10 and 0.90.',
    ]),
    correctAnswer: 'D',
    explanation:
      'For two-proportion procedures we check that the number of successes and failures in each group (84, 36, 55, and 45) is at least 10. Sample sizes of 30 are used for means, and the 10% condition is a separate independence check.',
    videoExplanation: null,
  },
  {
    id: 28307,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher takes independent random samples of 80 tenth graders, 100 eleventh graders, and 120 twelfth graders and asks whether each student drives to school. The results are shown in the table. What is the expected count of tenth graders who drive to school under the null hypothesis?',
    image: null,
    tableData: DRIVING_TABLE,
    options: stripOptionPrefixes([
      'A) 28',
      'B) 21',
      'C) 16',
      'D) 35',
      'E) 52',
    ]),
    correctAnswer: 'A',
    explanation:
      'The expected count is (row total)(column total)/(table total) = (105)(80)/300 = 28.',
    videoExplanation: null,
  },
  {
    id: 28308,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher takes independent random samples of 80 tenth graders, 100 eleventh graders, and 120 twelfth graders and asks whether each student drives to school. The results are shown in the table. What is the value of the chi-square test statistic?',
    image: null,
    tableData: DRIVING_TABLE,
    options: stripOptionPrefixes([
      'A) 5.14',
      'B) 6.59',
      'C) 26.37',
      'D) 13.19',
      'E) 144.00',
    ]),
    correctAnswer: 'D',
    explanation:
      'The expected counts are 28, 35, 42 for those who drive and 52, 65, 78 for those who do not. χ² = (16-28)²/28 + (35-35)²/35 + (54-42)²/42 + (64-52)²/52 + (65-65)²/65 + (66-78)²/78 ≈ 5.14 + 0 + 3.43 + 2.77 + 0 + 1.85 = 13.19.',
    videoExplanation: null,
  },
  {
    id: 28309,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher takes independent random samples of 80 tenth graders, 100 eleventh graders, and 120 twelfth graders and asks whether each student drives to school. The results are shown in the table. How many degrees of freedom does the chi-square test have?',
    image: null,
    tableData: DRIVING_TABLE,
    options: stripOptionPrefixes([
      'A) 1',
      'B) 4',
      'C) 3',
      'D) 2',
      'E) 6',
    ]),
    correctAnswer: 'D',
    explanation:
      'df = (rows - 1)(columns - 1) = (2 - 1)(3 - 1) = 2.',
    videoExplanation: null,
  },
  {
    id: 28310,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher takes independent random samples of 80 tenth graders, 100 eleventh graders, and 120 twelfth graders and asks whether each student drives to school. The results are shown in the table. Which of the following is the appropriate null hypothesis?',
    image: null,
    tableData: DRIVING_TABLE,
    options: stripOptionPrefixes([
      'A) Being a tenth, eleventh, or twelfth grader is independent of being a student at this school.',
      'B) The proportion of students who drive to school is the same in all three grades.',
      'C) The mean number of students who drive is the same in all three grades.',
      'D) The proportion of students in each grade who drive is 1/3.',
      'E) The number of students in each grade is equal.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The samples were taken independently from three populations (the grades) and one categorical variable was recorded, so this is a chi-square test for homogeneity. The null hypothesis is that the distribution of the response variable is the same in each population.',
    videoExplanation: null,
  },
  {
    id: 28311,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.15'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher takes independent random samples of 80 tenth graders, 100 eleventh graders, and 120 twelfth graders and asks whether each student drives to school. The results are shown in the table. The chi-square test gives χ² ≈ 13.19 and a p-value of about 0.0014. Which of the following is the correct conclusion at the α = 0.05 significance level?',
    image: null,
    tableData: DRIVING_TABLE,
    options: stripOptionPrefixes([
      'A) Fail to reject H0. There is not convincing evidence that the proportions differ among the grades.',
      'B) Fail to reject H0. The proportion of students who drive is the same in all three grades.',
      'C) Reject H0. There is convincing evidence that every grade has a different proportion of drivers.',
      'D) Reject H0. There is convincing evidence that grade level causes students to drive.',
      'E) Reject H0. There is convincing evidence that the proportion of students who drive is not the same in all three grades.',
    ]),
    correctAnswer: 'E',
    explanation:
      'The small p-value is evidence against H0. A chi-square test does not say which grades differ, only that at least two of the proportions are not equal. Grade level was not randomly assigned, so no causal conclusion can be made.',
    videoExplanation: null,
  },
  {
    id: 28312,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A random sample of 200 adults was classified by whether they exercise regularly and whether they sleep at least 7 hours per night. The results are shown. Which of the following is the appropriate null hypothesis for a chi-square test?',
    image: null,
    tableData: EXERCISE_SLEEP_TABLE,
    options: stripOptionPrefixes([
      'A) The mean hours of sleep is the same for adults who exercise and adults who do not.',
      'B) The proportion of adults who exercise regularly is the same as the proportion who sleep at least 7 hours.',
      'C) Exercising regularly and sleeping at least 7 hours are independent in the population of adults.',
      'D) The proportion of adults who exercise regularly is 0.50.',
      'E) Exercising regularly and sleeping at least 7 hours are mutually exclusive.',
    ]),
    correctAnswer: 'C',
    explanation:
      'One random sample was taken from one population and two categorical variables were recorded. This is a chi-square test for independence. The null hypothesis is that there is no association between the variables.',
    videoExplanation: null,
  },
  {
    id: 28313,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A random sample of 200 adults was classified by whether they exercise regularly and whether they sleep at least 7 hours per night. What is the value of the chi-square test statistic?',
    image: null,
    tableData: EXERCISE_SLEEP_TABLE,
    options: stripOptionPrefixes([
      'A) 2.00',
      'B) 4.00',
      'C) 10.00',
      'D) 8.00',
      'E) 16.00',
    ]),
    correctAnswer: 'D',
    explanation:
      'Under the null hypothesis, every expected count is (100)(100)/200 = 50. Each cell contributes (observed - 50)²/50 = 100/50 = 2, so χ² = 4(2) = 8.00 with df = 1.',
    videoExplanation: null,
  },
  {
    id: 28314,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A candy company claims that its mix contains the color percentages shown below. A random sample of 200 candies had the observed counts shown. What is the value of the chi-square test statistic for testing the company\'s claim?',
    image: null,
    tableData: CANDY_TABLE,
    options: stripOptionPrefixes([
      'A) 2.92',
      'B) 2.20',
      'C) 4.00',
      'D) 7.30',
      'E) 9.49',
    ]),
    correctAnswer: 'A',
    explanation:
      'The expected counts are 60, 50, 40, 30, and 20. χ² = (68-60)²/60 + (44-50)²/50 + (36-40)²/40 + (34-30)²/30 + (18-20)²/20 = 1.07 + 0.72 + 0.40 + 0.53 + 0.20 = 2.92. The value 9.49 is the critical value for df = 4 at α = 0.05.',
    videoExplanation: null,
  },
  {
    id: 28315,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.14'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A candy company claims that its mix contains the color percentages shown below. A random sample of 200 candies had the observed counts shown. The test statistic is χ² = 2.92 and the p-value is about 0.57. Which of the following gives the degrees of freedom and the correct conclusion at α = 0.05?',
    image: null,
    tableData: CANDY_TABLE,
    options: stripOptionPrefixes([
      'A) df = 4; fail to reject H0. The data are consistent with the company\'s claim.',
      'B) df = 4; reject H0. There is convincing evidence that the company\'s claim is false.',
      'C) df = 5; fail to reject H0. The data are consistent with the company\'s claim.',
      'D) df = 199; fail to reject H0. The data are consistent with the company\'s claim.',
      'E) df = 4; fail to reject H0. This proves the company\'s claim is true.',
    ]),
    correctAnswer: 'A',
    explanation:
      'For a goodness-of-fit test, df = (number of categories) - 1 = 5 - 1 = 4. A p-value of 0.57 is greater than 0.05, so we fail to reject H0. Failing to reject never proves that H0 is true.',
    videoExplanation: null,
  },
  {
    id: 28316,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a random sample of 250 voters, 140 say they support a proposed tax. What is the margin of error for a 95% confidence interval for the proportion of all voters who support the tax?',
    image: null,
    options: stripOptionPrefixes([
      'A) 0.031',
      'B) 0.044',
      'C) 0.121',
      'D) 0.079',
      'E) 0.062',
    ]),
    correctAnswer: 'E',
    explanation:
      'p̂ = 140/250 = 0.56. SE = √(0.56 × 0.44/250) ≈ 0.0314. ME = 1.96(0.0314) ≈ 0.062. The value 0.031 is the standard error, not the margin of error.',
    videoExplanation: null,
  },
  {
    id: 28317,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'In a random sample of 250 voters, 140 say they support a proposed tax. A council member claims that exactly half of all voters support the tax. What is the test statistic for H0: p = 0.50 versus Ha: p ≠ 0.50?',
    image: null,
    options: stripOptionPrefixes([
      'A) 0.06',
      'B) 1.90',
      'C) 1.34',
      'D) 2.69',
      'E) 3.80',
    ]),
    correctAnswer: 'B',
    explanation:
      'p̂ = 0.56. In a test, the standard error uses the null value: √(0.50 × 0.50/250) ≈ 0.0316. z = (0.56 - 0.50)/0.0316 ≈ 1.90.',
    videoExplanation: null,
  },
  {
    id: 28318,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A test of H0: p = 0.50 versus Ha: p ≠ 0.50 using a random sample of 250 voters (p̂ = 0.56) gives a p-value of about 0.058. Which of the following is the correct interpretation of the p-value?',
    image: null,
    options: stripOptionPrefixes([
      'A) There is a 5.8% chance that the true proportion is 0.50.',
      'B) There is a 5.8% chance that the null hypothesis is false.',
      'C) If the true proportion is 0.50, the probability of getting a sample proportion at least as far from 0.50 as 0.56 is about 0.058.',
      'D) 5.8% of the voters in the sample support the tax.',
      'E) If the true proportion is 0.56, the probability of getting a sample proportion of 0.50 is about 0.058.',
    ]),
    correctAnswer: 'C',
    explanation:
      'A p-value is a conditional probability computed assuming H0 is true. It is the probability of getting a result as extreme or more extreme (in the direction of Ha, here both directions) than the one observed by chance alone.',
    videoExplanation: null,
  },
  {
    id: 28319,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A manufacturer tests H0: p = 0.05 versus Ha: p > 0.05, where p is the true proportion of defective items in a large shipment. Which of the following describes a Type I error in this context?',
    image: null,
    options: stripOptionPrefixes([
      'A) Concluding that the proportion of defective items is 0.05 when it is actually greater than 0.05.',
      'B) Concluding that the proportion of defective items is greater than 0.05 when it is actually 0.05.',
      'C) Concluding that the proportion of defective items is less than 0.05 when it is actually 0.05.',
      'D) Failing to reject H0 when the shipment has a defective proportion of 0.05.',
      'E) Rejecting H0 when the shipment has a defective proportion greater than 0.05.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A Type I error is rejecting a true null hypothesis. Here that means concluding the defect rate is above 0.05 when it really is 0.05. Option A describes a Type II error (failing to conclude the rate is above 0.05 when it actually is).',
    videoExplanation: null,
  },
  {
    id: 28320,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher is planning a significance test about a population proportion. Which of the following would increase the power of the test?',
    image: null,
    options: stripOptionPrefixes([
      'A) Decreasing the probability of a Type I error.',
      'B) Decreasing the significance level.',
      'C) Using a two-sided alternative instead of a one-sided alternative in the correct direction.',
      'D) Choosing a null value closer to the true proportion.',
      'E) Increasing the sample size.',
    ]),
    correctAnswer: 'E',
    explanation:
      'Power is the probability of correctly rejecting a false null hypothesis. A larger sample size reduces the standard error and increases power. Decreasing α, choosing a null value closer to the truth, and using a two-sided alternative all make the test less likely to reject.',
    videoExplanation: null,
  },
  {
    id: 28321,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Inference for Categorical Data: Proportions',
    question:
      'A researcher changes the significance level of a test from α = 0.01 to α = 0.05 and keeps everything else the same. Which of the following is true?',
    image: null,
    options: stripOptionPrefixes([
      'A) The probability of a Type II error increases and the power decreases.',
      'B) The probability of a Type I error decreases and the power increases.',
      'C) The probability of a Type II error and the power both stay the same.',
      'D) The probability of a Type I error and the probability of a Type II error both decrease.',
      'E) The probability of a Type II error decreases and the power increases.',
    ]),
    correctAnswer: 'E',
    explanation:
      'Raising α makes it easier to reject H0. That increases the chance of a Type I error, decreases the chance of a Type II error, and increases power.',
    videoExplanation: null,
  },
];

export const statsV2Unit4Questions: Question[] = [
  {
    id: 28401,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A random sample of 25 batteries from a manufacturer was tested, and the summary statistics for the lifetimes are shown. The company claims the mean lifetime is 45 hours. Assume the conditions for inference are met. How many degrees of freedom are used for a one-sample t-test of H0: μ = 45?',
    image: null,
    tableData: BATTERY_SUMMARY_TABLE,
    options: stripOptionPrefixes([
      'A) 24',
      'B) 23',
      'C) 25',
      'D) 45',
      'E) 49',
    ]),
    correctAnswer: 'A',
    explanation:
      'df = n - 1 = 25 - 1 = 24.',
    videoExplanation: null,
  },
  {
    id: 28402,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A random sample of 25 batteries from a manufacturer was tested, and the summary statistics for the lifetimes are shown. The company claims the mean lifetime is 45 hours. Assume the conditions for inference are met. What is the value of the test statistic for H0: μ = 45 versus Ha: μ ≠ 45?',
    image: null,
    tableData: BATTERY_SUMMARY_TABLE,
    options: stripOptionPrefixes([
      'A) 0.49',
      'B) 1.96',
      'C) 2.46',
      'D) 3.20',
      'E) 12.31',
    ]),
    correctAnswer: 'C',
    explanation:
      'SE = s/√n = 6.5/√25 = 1.3. t = (48.2 - 45)/1.3 ≈ 2.46. The value 0.49 divides by s instead of the standard error, and 12.31 divides by s/n instead of s/√n.',
    videoExplanation: null,
  },
  {
    id: 28403,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A random sample of 25 batteries from a manufacturer was tested, and the summary statistics for the lifetimes are shown. The company claims the mean lifetime is 45 hours. Assume the conditions for inference are met. Which of the following is a 95% confidence interval for the true mean lifetime?',
    image: null,
    tableData: BATTERY_SUMMARY_TABLE,
    options: stripOptionPrefixes([
      'A) (34.78, 61.62)',
      'B) (41.70, 54.70)',
      'C) (45.65, 50.75)',
      'D) (45.52, 50.88)',
      'E) (45.98, 50.42)',
    ]),
    correctAnswer: 'D',
    explanation:
      'With df = 24, t* = 2.064. The margin of error is 2.064(1.3) ≈ 2.68, so the interval is 48.2 ± 2.68 = (45.52, 50.88). Using z* = 1.96 gives (45.65, 50.75), and a 90% interval gives (45.98, 50.42).',
    videoExplanation: null,
  },
  {
    id: 28404,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A 95% confidence interval for the mean lifetime, in hours, of a random sample of batteries is (45.52, 50.88). Which of the following is the best interpretation?',
    image: null,
    options: stripOptionPrefixes([
      'A) 95% of all batteries last between 45.52 and 50.88 hours.',
      'B) If we took many samples, 95% of the sample means would be between 45.52 and 50.88 hours.',
      'C) There is a 95% probability that the sample mean is between 45.52 and 50.88 hours.',
      'D) 95% of the batteries in the sample lasted between 45.52 and 50.88 hours.',
      'E) We are 95% confident that the true mean lifetime of all batteries from this manufacturer is between 45.52 and 50.88 hours.',
    ]),
    correctAnswer: 'E',
    explanation:
      'The interval estimates the population mean. It does not describe individual batteries or the percent of sample means.',
    videoExplanation: null,
  },
  {
    id: 28405,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A random sample of 12 customers\' wait times is collected. A dotplot of the sample shows strong right skewness and one extreme outlier. Why is a one-sample t procedure not appropriate for this sample?',
    image: null,
    options: stripOptionPrefixes([
      'A) The sample is less than 10% of the population.',
      'B) The population standard deviation is unknown.',
      'C) The sample size is small and the data are strongly skewed with an outlier, so the Normal/Large Sample condition is not met.',
      'D) The sample mean is greater than the median.',
      'E) The sample was randomly selected.',
    ]),
    correctAnswer: 'C',
    explanation:
      't procedures require that the sampling distribution of x̄ be approximately Normal. With n < 30, the sample data should show no strong skewness or outliers. Unknown σ is exactly why t is used, and random selection and the 10% condition are good things to have.',
    videoExplanation: null,
  },
  {
    id: 28406,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A tutoring program is evaluated using six randomly selected students. Each student\'s score on a test before the program and a similar test after the program are shown. Which of the following is the appropriate inference procedure to determine whether the program improved scores?',
    image: null,
    tableData: PAIRED_SCORES_TABLE,
    options: stripOptionPrefixes([
      'A) A two-sample t-test comparing the mean before score to the mean after score, with df = 10.',
      'B) A two-proportion z-test.',
      'C) A matched-pairs t-test using the differences for the six students, with df = 5.',
      'D) A one-sample t-test for the before scores only.',
      'E) A chi-square test for independence.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The same students were measured twice, so the data are paired. The appropriate procedure is a one-sample t-test on the six differences. With n = 6 pairs, df = 5.',
    videoExplanation: null,
  },
  {
    id: 28407,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'Using the before and after scores for the six students, what is the value of the t-statistic for testing whether the mean improvement is greater than 0? The differences (after - before) have a mean of 4.33 and a standard deviation of 1.86.',
    image: null,
    tableData: PAIRED_SCORES_TABLE,
    options: stripOptionPrefixes([
      'A) 0.76',
      'B) 2.33',
      'C) 4.33',
      'D) 5.70',
      'E) 13.96',
    ]),
    correctAnswer: 'D',
    explanation:
      'SE = 1.86/√6 ≈ 0.76. t = 4.33/0.76 ≈ 5.70. The value 2.33 forgets to divide by √n, and 13.96 divides by n instead of √n.',
    videoExplanation: null,
  },
  {
    id: 28408,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'For the tutoring program data, let μd be the true mean difference (after minus before) in test scores for all students. Which of the following are the correct hypotheses to test whether the program improved scores?',
    image: null,
    tableData: PAIRED_SCORES_TABLE,
    options: stripOptionPrefixes([
      'A) H0: μd = 0 and Ha: μd < 0',
      'B) H₀: μ(before) − μ(after) = 0 for two independent groups, and Hₐ: μ(before) − μ(after) ≠ 0',
      'C) H0: μd > 0 and Ha: μd = 0',
      'D) H0: μd = 0 and Ha: μd > 0',
      'E) H0: x̄d = 0 and Ha: x̄d > 0',
    ]),
    correctAnswer: 'D',
    explanation:
      'The parameter is the population mean difference, and the improvement means after is greater than before, so Ha: μd > 0. Hypotheses are always about parameters, not statistics, and are written with the null as the equality.',
    videoExplanation: null,
  },
  {
    id: 28409,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A researcher randomly assigned 62 students to either an online course or an in-person course. The summary statistics for the final exam scores are shown. Let μ1 be the true mean score for online students and μ2 be the true mean score for in-person students. Which of the following are the correct hypotheses to test whether the mean scores differ?',
    image: null,
    tableData: TWO_SAMPLE_TABLE,
    options: stripOptionPrefixes([
      'A) H0: μ1 - μ2 = 0 and Ha: μ1 - μ2 ≠ 0',
      'B) H0: μ1 - μ2 ≠ 0 and Ha: μ1 - μ2 = 0',
      'C) H0: μd = 0 and Ha: μd ≠ 0',
      'D) H0: x̄1 - x̄2 = 0 and Ha: x̄1 - x̄2 ≠ 0',
      'E) H0: p1 - p2 = 0 and Ha: p1 - p2 ≠ 0',
    ]),
    correctAnswer: 'A',
    explanation:
      'The students were randomly assigned to two independent groups, so this is a two-sample t-test for μ1 - μ2. The alternative is two-sided because the researcher asks whether the means differ.',
    videoExplanation: null,
  },
  {
    id: 28410,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A researcher randomly assigned 62 students to either an online course or an in-person course. The summary statistics for the final exam scores are shown. What is the standard error of the difference in sample means, x̄1 - x̄2?',
    image: null,
    tableData: TWO_SAMPLE_TABLE,
    options: stripOptionPrefixes([
      'A) 1.08',
      'B) 2.16',
      'C) 3.30',
      'D) 4.66',
      'E) 6.12',
    ]),
    correctAnswer: 'B',
    explanation:
      'SE = √(s1²/n1 + s2²/n2) = √(81/32 + 64/30) = √(2.531 + 2.133) = √4.664 ≈ 2.16. The value 4.66 is the variance and 3.30 is the observed difference in means.',
    videoExplanation: null,
  },
  {
    id: 28411,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A researcher randomly assigned 62 students to either an online course or an in-person course. The summary statistics for the final exam scores are shown. What is the value of the test statistic for testing H0: μ1 - μ2 = 0?',
    image: null,
    tableData: TWO_SAMPLE_TABLE,
    options: stripOptionPrefixes([
      'A) 0.38',
      'B) 4.66',
      'C) 2.16',
      'D) 3.30',
      'E) 1.53',
    ]),
    correctAnswer: 'E',
    explanation:
      't = (77.4 - 74.1)/2.16 = 3.3/2.16 ≈ 1.53.',
    videoExplanation: null,
  },
  {
    id: 28412,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A researcher randomly assigned 62 students to either an online course or an in-person course. The summary statistics for the final exam scores are shown. Which of the following statements about the conditions for a two-sample t procedure is supported by the information given?',
    image: null,
    tableData: TWO_SAMPLE_TABLE,
    options: stripOptionPrefixes([
      'A) Both sample sizes are less than 10% of the population, so the Normal/Large Sample condition is met.',
      'B) Both sample sizes are at least 30, so the Normal/Large Sample condition is met, and random assignment supplies independence.',
      'C) The sample standard deviations are close, so the Normal/Large Sample condition is met.',
      'D) The conditions cannot be met because the sample sizes are different.',
      'E) The conditions cannot be met because the samples came from a randomized experiment.',
    ]),
    correctAnswer: 'B',
    explanation:
      'With n1 = 32 and n2 = 30, both at least 30, the central limit theorem lets us use t procedures regardless of the shape of the data. Random assignment gives independent groups. The two sample sizes do not need to be equal, and similar standard deviations are not required for the two-sample t procedure.',
    videoExplanation: null,
  },
  {
    id: 28413,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'A researcher randomly assigned 62 students to either an online course or an in-person course. The summary statistics for the final exam scores are shown. A 95% confidence interval for μ1 - μ2 is (-1.12, 7.72). Based on this interval, which of the following is the best conclusion about a two-sided test at the α = 0.05 level?',
    image: null,
    tableData: TWO_SAMPLE_TABLE,
    options: stripOptionPrefixes([
      'A) Because the interval contains mostly positive values, there is convincing evidence that online students score higher.',
      'B) Because 0 is in the interval, there is not convincing evidence of a difference in the true mean scores.',
      'C) Because 0 is in the interval, the true mean scores are equal.',
      'D) Because the interval contains 3.3, the null hypothesis is true.',
      'E) Because the interval is wide, the sample sizes are too small to perform the test.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A two-sided test at α = 0.05 corresponds to a 95% interval. Since 0 is a plausible value for μ1 - μ2, we cannot reject H0. That is not evidence that the means are equal, only that we lack convincing evidence of a difference.',
    videoExplanation: null,
  },
  {
    id: 28414,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2', '4.3'],
    unitName: 'Inference for Quantitative Data: Means',
    question:
      'For which of the following situations is a matched-pairs t procedure appropriate?',
    image: null,
    options: stripOptionPrefixes([
      'A) The reaction time of each of 20 randomly selected students is measured using both the dominant and the nondominant hand.',
      'B) Forty students are randomly assigned to one of two study methods, and their test scores are compared.',
      'C) Independent random samples of 20 men and 20 women are timed on the same task.',
      'D) A random sample of 20 students is compared to a claimed mean of 5 hours of sleep.',
      'E) The proportion of 20 students who prefer one of two brands is compared.',
    ]),
    correctAnswer: 'A',
    explanation:
      'In a matched-pairs design, each unit provides two measurements, or two closely matched units are compared. Both measurements come from the same student here. The two groups in the other designs are independent, so a two-sample procedure would be used.',
    videoExplanation: null,
  },
];

export const statsV2Unit5Questions: Question[] = [
  {
    id: 28501,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). Which of the following is the correct interpretation of the slope?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) For each additional year of age, the price decreases by exactly $1,450.',
      'B) For each additional year of age, the predicted price decreases by about $1,450.',
      'C) For each additional $1,450 in price, the predicted age decreases by 1 year.',
      'D) A new car is predicted to cost $1,450 less than a one-year-old car.',
      'E) 78.4% of the cars decrease in price by $1,450 each year.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The slope is the predicted change in y for a one-unit increase in x. Because the slope is negative, the predicted price decreases by about $1,450 per additional year of age. A regression line gives predictions, not exact changes.',
    videoExplanation: null,
  },
  {
    id: 28502,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). What is the predicted price of a car that is 6 years old?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) $12,800',
      'B) $8,700',
      'C) $20,050',
      'D) $22,950',
      'E) $30,200',
    ]),
    correctAnswer: 'A',
    explanation:
      'ŷ = 21,500 - 1,450(6) = 21,500 - 8,700 = $12,800.',
    videoExplanation: null,
  },
  {
    id: 28503,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). A 4-year-old car sold for $14,000. What is the residual for this car?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) $14,000',
      'B) $1,700',
      'C) $7,300',
      'D) -$1,700',
      'E) $15,700',
    ]),
    correctAnswer: 'D',
    explanation:
      'ŷ = 21,500 - 1,450(4) = $15,700. Residual = actual - predicted = 14,000 - 15,700 = -$1,700. The car sold for $1,700 less than the model predicted.',
    videoExplanation: null,
  },
  {
    id: 28504,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). What is the correlation coefficient r between the age of a car and its price?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) 0.885',
      'B) -0.784',
      'C) -0.615',
      'D) 0.784',
      'E) -0.885',
    ]),
    correctAnswer: 'E',
    explanation:
      'r² = 0.784, so |r| = √0.784 ≈ 0.885. The slope is negative, so r is negative: r ≈ -0.885.',
    videoExplanation: null,
  },
  {
    id: 28505,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). Which of the following is the best interpretation of R-Sq = 78.4%?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) About 78.4% of the cars have prices that fall exactly on the regression line.',
      'B) The predicted price is within 78.4% of the actual price.',
      'C) The correlation between age and price is 0.784.',
      'D) About 78.4% of the cars decrease in price as they get older.',
      'E) About 78.4% of the variation in car prices is explained by the linear relationship with age.',
    ]),
    correctAnswer: 'E',
    explanation:
      'The coefficient of determination r² is the proportion of the variation in y that is accounted for by the linear relationship with x.',
    videoExplanation: null,
  },
  {
    id: 28506,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). Which of the following is the best interpretation of S = 1920?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) The price of a car decreases by $1,920 each year.',
      'B) The standard deviation of the ages of the cars is 1.92 years.',
      'C) The actual prices typically differ from the prices predicted by the regression line by about $1,920.',
      'D) 1,920 of the 30 cars fall on the regression line.',
      'E) The slope of the regression line could differ from the true slope by $1,920.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The value s is the standard deviation of the residuals. It measures the typical size of the prediction error when the least-squares line is used.',
    videoExplanation: null,
  },
  {
    id: 28507,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). A student uses the regression line to predict the price of a 20-year-old car and gets a negative price. Which of the following is the best explanation?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) The regression line is not appropriate because the correlation is negative.',
      'B) The residual for a 20-year-old car must be positive.',
      'C) The prediction is an extrapolation beyond the ages in the data (0 to 9 years), so the linear model may not apply.',
      'D) The slope should have been positive.',
      'E) The standard deviation of the residuals is too large.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Using a regression line to predict for x-values outside the range of the data is extrapolation, and the linear pattern may not continue. A predicted price of 21,500 - 1,450(20) = -$7,500 is impossible, which shows why.',
    videoExplanation: null,
  },
  {
    id: 28508,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). Which of the following is the correct interpretation of the y-intercept?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) The price of every new car is $21,500.',
      'B) For each additional year of age, the predicted price increases by $21,500.',
      'C) The predicted price of a new car (age 0) is $21,500.',
      'D) The average age of the cars is 21,500 years.',
      'E) The predicted age of a car with a price of $0 is 21,500 years.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The intercept is the predicted value of y when x = 0. Here that is a car with age 0, and age 0 is within the range of the data, so the interpretation is meaningful.',
    videoExplanation: null,
  },
  {
    id: 28509,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: 'Regression Analysis',
    question:
      'A used-car dealer selected 30 cars aged 0 to 9 years and used the age of the car, in years, to predict its price, in dollars. Computer output for the least-squares regression is shown (S = 1920, R-Sq = 78.4%). The output includes a test of H0: β = 0 versus Ha: β ≠ 0 for the slope, with P = 0.000. Which of the following is the correct conclusion?',
    image: null,
    tableData: CAR_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) There is convincing evidence of a linear relationship between the age and price of cars of this type.',
      'B) There is not convincing evidence of a linear relationship between age and price.',
      'C) The slope of the true regression line is exactly -1,450.',
      'D) Age causes a decrease in the price of every car.',
      'E) About 100% of the variation in price is explained by age.',
    ]),
    correctAnswer: 'A',
    explanation:
      'A very small p-value gives convincing evidence that the true slope is not 0, which means there is a linear relationship in the population. The test gives no information about causation, and R-Sq is 78.4%, not 100%.',
    videoExplanation: null,
  },
  {
    id: 28510,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: 'Regression Analysis',
    question:
      'A teacher randomly selected 20 students and used the hours each student studied to predict the student\'s exam score. Computer output for the regression is shown. Conditions for inference are met. Which of the following is a 95% confidence interval for the true slope? (For df = 18, t* = 2.101.)',
    image: null,
    tableData: STUDY_OUTPUT_TABLE,
    options: stripOptionPrefixes([
      'A) (2.49, 7.11)',
      'B) (1.50, 8.10)',
      'C) (-2.10, 11.70)',
      'D) (2.64, 6.96)',
      'E) (3.70, 5.90)',
    ]),
    correctAnswer: 'A',
    explanation:
      'The slope estimate is 4.8 with a standard error of 1.1. The margin of error is 2.101(1.1) ≈ 2.31, so the interval is 4.8 ± 2.31 = (2.49, 7.11). Using z* = 1.96 gives (2.64, 6.96).',
    videoExplanation: null,
  },
  {
    id: 28511,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Regression Analysis',
    question:
      'The table shows the mean and standard deviation of the hours of practice (x) and the test score (y) for a group of students. The correlation between the two variables is r = 0.75. What is the equation of the least-squares regression line?',
    image: null,
    tableData: PRACTICE_SUMMARY_TABLE,
    options: stripOptionPrefixes([
      'A) ŷ = 48.13 + 0.19x',
      'B) ŷ = 20 + 3x',
      'C) ŷ = 50 + 3x',
      'D) ŷ = 20 + 0.75x',
      'E) ŷ = 3 + 20x',
    ]),
    correctAnswer: 'B',
    explanation:
      'The slope is b = r(sy/sx) = 0.75(8/2) = 3. The line passes through (x̄, ȳ), so a = ȳ - b(x̄) = 50 - 3(10) = 20. The equation is ŷ = 20 + 3x.',
    videoExplanation: null,
  },
  {
    id: 28512,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Regression Analysis',
    question:
      'A residual plot for a linear regression model shows a clear U-shaped pattern. Which of the following is the best conclusion?',
    image: null,
    options: stripOptionPrefixes([
      'A) The data contain an outlier that should be removed.',
      'B) A linear model is appropriate because the residuals are centered at 0.',
      'C) The correlation must be 0.',
      'D) A linear model is not appropriate because the relationship is curved.',
      'E) The slope of the regression line must be negative.',
    ]),
    correctAnswer: 'D',
    explanation:
      'A good linear model has a residual plot with no clear pattern. A curved pattern means the form is not linear, so the line is not an appropriate model even if r is large.',
    videoExplanation: null,
  },
  {
    id: 28513,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Regression Analysis',
    question:
      'A scatterplot shows a moderately strong positive linear association. A new point is added that has an x-value much larger than all the others and a y-value well below the line. Which of the following is the most likely effect of adding the point?',
    image: null,
    options: stripOptionPrefixes([
      'A) The slope increases and the correlation becomes stronger.',
      'B) The slope and the correlation do not change.',
      'C) The slope increases and the correlation becomes weaker.',
      'D) The slope decreases and the correlation becomes weaker.',
      'E) The slope decreases and the correlation becomes stronger.',
    ]),
    correctAnswer: 'D',
    explanation:
      'A point far from the others in the x-direction has high leverage. Because it lies well below the pattern, it pulls the line down on the right, decreasing the slope and weakening the correlation. Such a point is called influential.',
    videoExplanation: null,
  },
  {
    id: 28514,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Regression Analysis',
    question:
      'A study of fires finds a correlation of r = 0.82 between the number of firefighters sent to a fire and the amount of damage the fire causes. Which of the following is the best conclusion?',
    image: null,
    options: stripOptionPrefixes([
      'A) Sending more firefighters causes more damage, so fewer firefighters should be sent.',
      'B) The association is strong, but it does not show that sending more firefighters causes more damage; the size of the fire is a likely lurking variable.',
      'C) 82% of fires with many firefighters have more damage.',
      'D) The association is weak because r is less than 1.',
      'E) Because r is close to 1, damage is caused by the number of firefighters.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Correlation does not imply causation. Larger fires cause both more damage and more firefighters being sent, so the size of the fire is a lurking variable.',
    videoExplanation: null,
  },
];

export const statsV2McqPreviewQuestions: Question[] = [
  ...statsV2Unit1Questions,
  ...statsV2Unit2Questions,
  ...statsV2Unit3Questions,
  ...statsV2Unit4Questions,
  ...statsV2Unit5Questions,
];
