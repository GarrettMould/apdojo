import type { Question } from '@/data/questionBanks/types';

const UNIT_NAME = 'Exploring One-Variable Data and Collecting Data';
/** Strip "A) " style prefixes — FullExam adds letter labels. */
function stripOptionPrefixes(options: string[]): string[] {
  return options.map((option) => option.replace(/^[A-E]\)\s*/, ''));
}

const TEXT_MESSAGES_TABLE = {
  headers: ['Student', 'Text messages (one day)'],
  rows: [
    ['1', '5'],
    ['2', '8'],
    ['3', '12'],
    ['4', '12'],
    ['5', '15'],
    ['6', '18'],
    ['7', '20'],
    ['8', '22'],
    ['9', '25'],
    ['10', '30'],
  ],
};

const CUSTOMERS_TABLE = {
  headers: ['Day', 'Number of customers'],
  rows: [
    ['1', '20'],
    ['2', '25'],
    ['3', '30'],
    ['4', '35'],
    ['5', '100'],
  ],
};

const KNOWN_VALUES_TABLE = {
  headers: ['Known value'],
  rows: [['8'], ['12'], ['10'], ['7']],
};

function summaryStatsTable(mean: string, sd: string) {
  return {
    headers: ['Statistic', 'Value'],
    rows: [
      ['Mean', mean],
      ['Standard deviation', sd],
    ],
  };
}

const PHYSICAL_ACTIVITY_HISTOGRAM = {
  src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1/q1.svg',
  alt: 'Histogram of weekend physical activity minutes for 50 high school students',
};

const COMMUTE_TIME_BOXPLOT = {
  src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1/commute_time_boxplot.svg',
  alt: 'Side-by-side boxplots of commute times for Office A and Office B',
};

const EMPLOYEE_AGE_HISTOGRAM = {
  src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1/employee_age.svg',
  alt: 'Histogram of employee ages at a small company',
};

/**
 * AP Statistics — Unit 1 **formal unit MCQ test** only
 * (`/unit-mcq-test/1?subject=stats`, pretty URL `/ap-stats-unit-1-mcq-test`).
 * IDs in 71xx range. Opens with the physical-activity histogram pair; other diagram pairs stay adjacent but are spread through the test.
 */
export const statsUnit1McqTestQuestions: Question[] = [
  {
    id: 7112,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: UNIT_NAME,
    question: 'A researcher is investigating the physical activity levels of teenagers. She selects a random sample of 50 high school students and asks them to record the total number of minutes of moderate-to-vigorous physical activity they engaged in over the course of one weekend. The data collected are summarized in the histogram below. Based on the distribution, which of the following statements about the mean and the median of the distribution is most likely true?',
    image: PHYSICAL_ACTIVITY_HISTOGRAM,
    options: stripOptionPrefixes([
      'A) The mean is greater than the median because the distribution is skewed to the right.',
      'B) The mean is less than the median because the distribution is skewed to the left.',
      'C) The mean is equal to the median because the distribution is approximately symmetric.',
      'D) The mean is less than the median because the distribution is skewed to the right.',
      'E) The mean is greater than the median because the distribution is skewed to the left.'
    ]),
    correctAnswer: 'B',
    explanation: 'Calculating the mean using midpoints: (30 × 5 + 90 × 12 + 150 × 22 + 210 × 8 + 270 × 3) / 50 = 140.4. The median falls in the 120–180 bin. Since the frequency of the bins to the right of the median bin (8 + 3 = 11) is lower than the frequency of the bins to the left (5 + 12 = 17), the distribution has a longer tail on the left, indicating it is skewed to the left. In a left-skewed distribution, the mean (140.4) is less than the median.'
  },
  {
    id: 7113,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: UNIT_NAME,
    question: 'Using the frequency distribution shown in the histogram below, what proportion of the 50 students spent less than 180 minutes on physical activity?',
    image: PHYSICAL_ACTIVITY_HISTOGRAM,
    questionGroup: 7112,
    options: stripOptionPrefixes(['A) 0.39', 'B) 0.50', 'C) 0.70', 'D) 0.78', 'E) 0.82']),
    correctAnswer: 'D',
    explanation: 'To find the proportion, sum the frequencies of the bins less than 180 minutes: 5 (0–60) + 12 (60–120) + 22 (120–180) = 39 students. Dividing 39 by the total (50) gives 0.78.'
  },
  {
    id: 7110,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: UNIT_NAME,
    question: 'Which of the following is an example of a continuous quantitative variable?',
    image: null,
    options: stripOptionPrefixes(['A) The number of students absent from school on a given day.', 'B) The brand of mobile phone used by a student.', 'C) The weight of a newborn baby in kilograms.', 'D) The number of siblings a student has.', 'E) The zip code of a student’s residence.']),
    correctAnswer: 'C',
    explanation: 'A continuous quantitative variable can take on an infinite number of possible values within a given interval, such as weight, which is measurable.'
  },
  {
    id: 7108,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.1'],
    unitName: UNIT_NAME,
    question: 'Which of the following describes the purpose of random assignment in a well-designed experiment?',
    image: null,
    options: stripOptionPrefixes(['A) To ensure that the sample is representative of the entire population.', 'B) To create treatment groups that are as similar as possible with respect to extraneous sources of variation.', 'C) To eliminate the need for a control group in the experiment.', 'D) To guarantee that the results of the experiment will be statistically significant.', 'E) To ensure that all participants in the experiment know which treatment they are receiving.']),
    correctAnswer: 'B',
    explanation: 'Random assignment is used in experiments to balance the effects of uncontrolled variables (extraneous sources of variation) across different treatment groups, helping to establish a cause-and-effect relationship.'
  },
  {
    id: 7101,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A researcher records the number of text messages sent by a sample of 10 students in one day, as shown in the table below. What is the interquartile range (IQR) of this data set?',
    image: null,
    tableData: TEXT_MESSAGES_TABLE,
    options: stripOptionPrefixes(['A) 7', 'B) 10', 'C) 12', 'D) 15', 'E) 22']),
    correctAnswer: 'B',
    explanation: 'The data is ordered. The median of the 10 values is between 15 and 18. Q1 is the median of the lower 5 values (5, 8, 12, 12, 15), which is 12. Q3 is the median of the upper 5 values (18, 20, 22, 25, 30), which is 22. The IQR is Q3 - Q1 = 22 - 12 = 10.'
  },
  {
    id: 7120,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A biologist measures the tail lengths (in millimeters) of 100 lizards in a specific habitat. The five-number summary is 40, 55, 70, 95, 120. About what percentage of lizards have a tail length between 55 and 120 millimeters?',
    image: null,
    options: stripOptionPrefixes(['A) 25%', 'B) 50%', 'C) 75%', 'D) 85%', 'E) 95%']),
    correctAnswer: 'C',
    explanation: 'Each segment of the five-number summary represents 25% of the data. The range from 55 (Q1) to 120 (Max) covers the second, third, and fourth segments, which totals 75%.'
  },
  {
    id: 7119,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A dataset of 50 test scores has a mean of 78 and a median of 80. It is discovered that a score of 72 was incorrectly recorded as 62. If the data is corrected, what is the effect on the mean and median?',
    image: null,
    options: stripOptionPrefixes(['A) The mean increases, but the median remains the same.', 'B) The mean and median both increase.', 'C) The median increases, but the mean remains the same.', 'D) The mean and median both remain the same.', 'E) The mean increases, but the variance decreases.']),
    correctAnswer: 'A',
    explanation: 'Correcting a recorded value from 62 to 72 increases the total sum, which increases the mean. The median is resistant to changes in individual values unless the shift moves a data point across the median position, which is unlikely here.'
  },
  {
    id: 7116,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: UNIT_NAME,
    question: 'The bar chart below shows the age distribution of 30 employees at a small company. Which of the following statements is correct regarding the distribution of employee ages?',
    image: EMPLOYEE_AGE_HISTOGRAM,
    options: stripOptionPrefixes(['A) The distribution is symmetric.', 'B) The distribution is skewed to the right.', 'C) The distribution is skewed to the left.', 'D) The distribution is uniform.', 'E) The distribution is bimodal.']),
    correctAnswer: 'B',
    explanation: 'The distribution has a peak at the younger age groups and a long tail extending toward the older age groups, which characterizes a right-skewed distribution.'
  },
  {
    id: 7117,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: UNIT_NAME,
    question: 'Based on the age distribution for the 30 employees shown in the bar chart, which of the following intervals contains the median age?',
    image: EMPLOYEE_AGE_HISTOGRAM,
    questionGroup: 7116,
    options: stripOptionPrefixes(['A) 20–29', 'B) 30–39', 'C) 40–49', 'D) 50–59', 'E) 60–69']),
    correctAnswer: 'B',
    explanation: 'With 30 total observations, the median is the average of the 15th and 16th values. The 20–29 bar contains the first 14 values, so the 15th and 16th values fall into the 30–39 interval.'
  },
  {
    id: 7104,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A dataset has the summary statistics shown in the table below. If every value in the dataset is multiplied by 2 and then increased by 5, what are the new mean and standard deviation?',
    image: null,
    tableData: summaryStatsTable('50', '10'),
    options: stripOptionPrefixes(['A) Mean=100, SD=20', 'B) Mean=105, SD=20', 'C) Mean=105, SD=25', 'D) Mean=100, SD=25', 'E) Mean=105, SD=10']),
    correctAnswer: 'B',
    explanation: 'Multiplication affects both mean and standard deviation (new mean = 2 × 50 = 100; new SD = 2 × 10 = 20). Adding a constant only affects the mean (new mean = 100 + 5 = 105).'
  },
  {
    id: 7121,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: UNIT_NAME,
    question: 'Two groups, Group X and Group Y, are compared using boxplots of their exam scores. The box for Group X is wider than the box for Group Y, and Group X\'s median is higher than Group Y\'s entire box. Which statement is NOT correct?',
    image: null,
    options: stripOptionPrefixes(['A) Group X has a larger interquartile range (IQR) than Group Y.', 'B) More than 50% of Group X scored higher than the lowest-scoring student in Group Y.', 'C) The median exam score for Group X is higher than the median for Group Y.', 'D) Group X shows more variability in exam scores than Group Y.', 'E) The range of exam scores for Group X is smaller than the range for Group Y.']),
    correctAnswer: 'E',
    explanation: 'Because Group X has a wider box and a higher center, it is inconsistent for it to have a smaller overall range than Group Y.'
  },
  {
    id: 7115,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'Based on the boxplot provided for Office A, what is the interquartile range (IQR) of the commute times?',
    image: COMMUTE_TIME_BOXPLOT,
    options: stripOptionPrefixes(['A) 10', 'B) 20', 'C) 35', 'D) 45', 'E) 25']),
    correctAnswer: 'B',
    explanation: 'The IQR is the length of the box, calculated as Q3 - Q1 = 45 - 25 = 20.'
  },
  {
    id: 7114,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7', '1.8'],
    unitName: UNIT_NAME,
    question: 'A researcher is studying commute times (in minutes) for employees at two offices. Both offices have 20 employees. Using the 1.5 × IQR rule, which of the following is true?',
    image: COMMUTE_TIME_BOXPLOT,
    questionGroup: 7115,
    options: stripOptionPrefixes(['A) Both Office A and Office B have at least one outlier.', 'B) Only Office A has an outlier.', 'C) Only Office B has an outlier.', 'D) Neither Office A nor Office B has an outlier.', 'E) Only Office A has an outlier in the upper tail.']),
    correctAnswer: 'C',
    explanation: 'Office A IQR = 20. Upper bound = 45 + (1.5 × 20) = 75 (no outlier). Office B IQR = 20. Upper bound = 40 + (1.5 × 20) = 70 (85 > 70, outlier present).'
  },
  {
    id: 7103,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A local business tracks the daily number of customers over 5 days. If an additional day has 30 customers, which of the following describes the change in the mean and median?',
    image: null,
    tableData: CUSTOMERS_TABLE,
    options: stripOptionPrefixes(['A) Both increase', 'B) Mean increases, median stays same', 'C) Mean decreases, median stays same', 'D) Both decrease', 'E) Both stay the same']),
    correctAnswer: 'C',
    explanation: 'Adding 30 customers to the sum decreases the mean from 42 to 40. The median remains 30.'
  },
  {
    id: 7122,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A teacher adjusts grades by multiplying every score by 1.1 and then adding 5 points. What are the new mean and new standard deviation?',
    image: null,
    options: stripOptionPrefixes(['A) 87.5, 5.5', 'B) 87.5, 10.5', 'C) 82.5, 5.5', 'D) 82.5, 11.0', 'E) 87.5, 6.0']),
    correctAnswer: 'A',
    explanation: 'Mean: (75 × 1.1) + 5 = 87.5. Standard deviation: 5 × 1.1 = 5.5.'
  },
  {
    id: 7105,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: UNIT_NAME,
    question: 'For a dataset with the summary statistics shown, what is the z-score of a value of 92?',
    image: null,
    tableData: summaryStatsTable('80', '8'),
    options: stripOptionPrefixes(['A) 0.66', 'B) 1.20', 'C) 1.50', 'D) 1.60', 'E) 2.00']),
    correctAnswer: 'C',
    explanation: 'z = (92 - 80) / 8 = 1.5.'
  },
  {
    id: 7123,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: UNIT_NAME,
    question: 'A machine fills boxes of cereal with a mean of 20.2 ounces and a standard deviation of 0.2 ounces. What is the approximate percentage of boxes between 20.0 and 20.2 ounces?',
    image: null,
    options: stripOptionPrefixes(['A) 16%', 'B) 34%', 'C) 47.5%', 'D) 68%', 'E) 95%']),
    correctAnswer: 'B',
    explanation: '20.0 is one SD below the mean. 68% falls within ±1 SD, so 34% falls between the mean and one SD below.'
  },
  {
    id: 7125,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: UNIT_NAME,
    question: 'A student scored an 85 on an exam where the class mean was 75 and the standard deviation was 5. What is the student\'s z-score?',
    image: null,
    options: stripOptionPrefixes(['A) 0.5', 'B) 1.0', 'C) 1.5', 'D) 2.0', 'E) 2.5']),
    correctAnswer: 'D',
    explanation: 'z = (85 - 75) / 5 = 2.0.'
  },
  {
    id: 7107,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: UNIT_NAME,
    question: 'A set of 5 numbers has a mean of 10. Four numbers are 8, 12, 10, and 7. What is the fifth number?',
    image: null,
    options: stripOptionPrefixes(['A) 9', 'B) 11', 'C) 12', 'D) 13', 'E) 15']),
    correctAnswer: 'D',
    explanation: 'Sum must be 50. 8 + 12 + 10 + 7 = 37. 50 - 37 = 13.'
  },
  {
    id: 7111,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: UNIT_NAME,
    question: 'In a double-blind experiment, which of the following is true?',
    image: null,
    options: stripOptionPrefixes(['A) Neither the participants nor the members of the research team who interact with them know which treatment each participant is receiving.', 'B) Only the participants are unaware of the treatment they are receiving.', 'C) Only the research team is unaware of which treatment each participant is receiving.', 'D) Neither the participants nor the statistical analysts know the purpose of the study.', 'E) The participants know the treatment, but the research team does not.']),
    correctAnswer: 'A',
    explanation: 'In a double-blind experiment, neither the participants nor the researchers who interact with them know the treatment assignment.'
  }
];