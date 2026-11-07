/**
 * AP Statistics Full FRQ, alternate form (Set B). Not shown on the site yet; kept ready as a second exam
 * or a replacement for Exam 1. Same shape and scoring format as `statsFullFrqExam1.ts`.
 */
import { frqAnswer, type StatsFullFrqExam } from './statsFullFrqExam1';

const IMG = (file: string) =>
  `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/final_frq/${file}`;

export const statsFullFrqExamSetB: StatsFullFrqExam = {
  examTitle: 'AP Statistics Full FRQ Exam 2',
  questions: [
    {
      questionNumber: 1,
      questionTitle: 'Question 1: Running Shoe Experiment',
      prompt:
        "A shoe company has developed a new running shoe and wants to know whether it reduces the time it takes runners to complete one mile compared with the company's standard shoe. Thirty volunteer runners, 15 who are beginners and 15 who are experienced, agree to take part. Each volunteer will run one mile on the same track, wearing one type of shoe.",
      parts: [
        {
          label: 'A',
          text: 'Identify the explanatory variable and the response variable in this study.',
          answerType: 'text',
          answer: frqAnswer('Explanatory: type of shoe (new or standard). Response: time to run one mile.', [
            'Explanatory variable: shoe type (not running experience).',
            'Response variable: time to complete one mile.',
          ]),
        },
        {
          label: 'B',
          text: 'Is this study an experiment or an observational study? Justify your answer.',
          answerType: 'text',
          answer: frqAnswer('Experiment, because the researchers assigned the type of shoe to each runner.', [
            'States experiment because the researchers impose the shoe type on the runners. "Experiment" with no reason does not earn the point.',
          ]),
        },
        {
          label: 'C',
          text: 'The company wants to account for running experience. Describe a randomized block design for this experiment, using experience (beginner or experienced) as the blocking variable.',
          answerType: 'text',
          answer: frqAnswer(
            'Form two blocks: the 15 beginners and the 15 experienced runners. Within each block, use a random number generator (or names drawn from a hat) to randomly assign about half of the runners to wear the new shoe and the others the standard shoe. All runners run the mile under the same conditions, and the mile times for the two shoe types are compared within each block.',
            [
              'Forms two blocks: the 15 beginners and the 15 experienced runners.',
              'Randomly assigns shoe types within each block with a clear random method. Random assignment across all 30 runners without blocks does not earn the point.',
              'Compares the mile times for the two shoe types (within blocks) after all runners run under the same conditions.',
            ]
          ),
        },
        {
          label: 'D',
          text: 'Explain why blocking by experience is useful in this experiment.',
          answerType: 'text',
          answer: frqAnswer(
            'Experienced runners tend to run faster than beginners. Blocking removes the variation caused by experience from the comparison of shoe types, so any difference due to the shoe is easier to detect.',
            ['Explains that experience affects mile times, so blocking removes that variability and makes a shoe effect easier to detect. "Blocking reduces bias" alone does not earn the point.']
          ),
        },
        {
          label: 'E',
          text: 'Identify one other variable that could affect mile times and describe how the researchers could control it.',
          answerType: 'text',
          answer: frqAnswer(
            'Weather conditions (such as wind or temperature). Control by having all runners run on the same track on the same day at about the same time.',
            ['Names a relevant variable (weather, time of day, warm-up, rest) and a way to control it. Shoe type and experience do not count.']
          ),
        },
        {
          label: 'F',
          text: 'Suppose the mile times for the new shoe are significantly shorter than for the standard shoe. Explain what conclusion about cause and effect is justified, and what conclusion about generalizing is not justified.',
          answerType: 'text',
          answer: frqAnswer(
            'Because shoes were randomly assigned, a significant difference in mile times can be attributed to the shoe. Because the runners were volunteers and not a random sample of all runners, the results cannot be generalized to all runners.',
            [
              'Cause and effect is justified because the shoes were randomly assigned.',
              'Results cannot be generalized to all runners because the runners were volunteers, not a random sample.',
            ]
          ),
        },
      ],
    },
    {
      questionNumber: 2,
      questionTitle: 'Question 2: Getting to School',
      prompt:
        'A random sample of 250 students at a large high school was asked how they usually get to school. The results are summarized in the table by grade group.',
      tableData: {
        title: 'Transportation to school by grade group (250 students)',
        headers: ['', 'Car', 'Bus', 'Walk or bike', 'Total'],
        rows: [
          ['Underclass (grades 9–10)', 30, 60, 30, 120],
          ['Upperclass (grades 11–12)', 55, 25, 50, 130],
          ['Total', 85, 85, 80, 250],
        ],
        rowHeaders: true,
      },
      parts: [
        {
          label: 'A',
          text: 'What proportion of the upperclass students in the sample usually ride the bus?',
          answerType: 'text',
          answer: frqAnswer('25/130 ≈ 0.192.', ['Calculates 25/130 ≈ 0.192 (not 25/250).']),
        },
        {
          label: 'B',
          text: 'Of the students in the sample who usually get to school by car, what proportion are upperclass students?',
          answerType: 'text',
          answer: frqAnswer('55/85 ≈ 0.647.', ['Calculates 55/85 ≈ 0.647 (not 55/130).']),
        },
        {
          label: 'C',
          text: 'Randomly select two different students from the 250 students in the sample. What is the probability that both are underclass students?',
          answerType: 'text',
          answer: frqAnswer('(120/250)(119/249) ≈ 0.229.', [
            'Calculates (120/250)(119/249) ≈ 0.229, without replacement. (120/250)² does not earn the point.',
          ]),
        },
        {
          label: 'D',
          text: 'Use probabilities to determine whether the events "usually gets to school by car" and "is an underclass student" are independent. Justify your answer.',
          answerType: 'text',
          answer: frqAnswer(
            'P(car) = 85/250 = 0.34, but P(car | underclass) = 30/120 = 0.25. Since these are not equal, the events are not independent.',
            [
              'Calculates a comparable pair, such as P(car) = 0.34 and P(car | underclass) = 0.25.',
              'Concludes not independent because the probabilities are not equal.',
            ]
          ),
        },
        {
          label: 'E',
          text: 'Compare the distribution of how underclass students usually get to school with the distribution for upperclass students.',
          answerType: 'text',
          answer: frqAnswer(
            'Underclass: 25% car, 50% bus, 25% walk/bike. Upperclass: 42% car, 19% bus, 38% walk/bike. A larger proportion of upperclass students come by car (42% vs. 25%), and a much larger proportion of underclass students ride the bus (50% vs. 19%).',
            [
              'One comparison using proportions within each group, e.g., car 42% vs. 25%. Comparing counts does not earn the point.',
              'A second comparison in a different category, e.g., bus 50% vs. 19%.',
            ]
          ),
        },
        {
          label: 'F',
          text: 'Construct and interpret a 95% confidence interval for the difference between the proportion of all upperclass students and the proportion of all underclass students at this school who usually get to school by car. Verify the conditions for the interval.',
          answerType: 'text',
          answer: frqAnswer(
            [
              "Two-sample z-interval for a difference in proportions. Random: the students were a random sample from the school (250 is less than 10% of a large school's students). Large counts: 55, 75, 30 and 90 are all at least 10.",
              'p̂U = 55/130 = 0.423 and p̂L = 30/120 = 0.250. (0.423 − 0.250) ± 1.96√(0.423 × 0.577/130 + 0.25 × 0.75/120) = 0.173 ± 1.96(0.0587) = 0.173 ± 0.115 = (0.058, 0.288).',
              'We are 95% confident that the interval from 0.058 to 0.288 captures the true difference (upperclass minus underclass) in the proportion of students at this school who usually get to school by car.',
            ].join('\n\n'),
            [
              'Verifies both conditions: random sample (250 < 10% of a large school) and all four counts at least 10.',
              'Constructs the interval ≈ (0.058, 0.288). Underclass minus upperclass, (−0.288, −0.058), also earns the point if the order is stated.',
              'Interprets in context, stating the order of subtraction or which proportion is larger.',
            ]
          ),
        },
      ],
    },
    {
      questionNumber: 3,
      questionTitle: 'Question 3: Breakfast at Three Schools',
      prompt:
        'A school district wants to know whether the proportion of students who regularly eat breakfast is the same at its three high schools: East, Central, and West. A random sample of 100 students was selected independently from each school and asked whether they regularly eat breakfast. The results are shown in the table.',
      tableData: {
        title: 'Counts of students by school and breakfast habit',
        headers: ['', 'East', 'Central', 'West'],
        rows: [
          ['Regularly eats breakfast', 54, 41, 30],
          ['Does not regularly eat breakfast', 46, 59, 70],
          ['Total', 100, 100, 100],
        ],
        rowHeaders: true,
      },
      parts: [
        {
          label: 'A',
          text: 'Do the data provide convincing evidence that the proportion of students who regularly eat breakfast is not the same at all three schools? Use a significance level of α = 0.05.',
          answerType: 'text',
          answer: frqAnswer(
            [
              'Hypotheses: H0: the proportion of students who regularly eat breakfast is the same at East, Central, and West. Ha: at least one of these proportions is different.',
              'Procedure and conditions: chi-square test for homogeneity. Random: independent random samples of 100 students from each school. Expected counts: (125)(100)/300 ≈ 41.7 in the "eats breakfast" row and 58.3 in the other row; all are at least 5.',
              'Test: χ² = 11.88, df = 2, p ≈ 0.0026.',
              'Conclusion: because 0.0026 < 0.05, reject H0. There is convincing evidence that the proportion of students who regularly eat breakfast is not the same at all three schools.',
            ].join('\n\n'),
            [
              'States H0 (same proportion at all three schools) and Ha (at least one differs) in context, about the populations.',
              'Identifies a chi-square test for homogeneity.',
              'Random condition: independent random samples from each school.',
              'Expected counts condition: at least one expected count calculated and all at least 5.',
              'χ² ≈ 11.88.',
              'df = 2.',
              'p ≈ 0.0026, consistent with χ² and df.',
              'Compares p to α: 0.0026 < 0.05, reject H0.',
              'Conclusion in context. Saying all three proportions differ from each other does not earn the point.',
            ]
          ),
        },
        {
          label: 'B',
          text: 'Which cell contributes the most to the test statistic? What does it tell you about how the schools differ?',
          answerType: 'text',
          answer: frqAnswer(
            'The largest contribution is East, "eats breakfast": (54 − 41.7)²/41.7 ≈ 3.65. More East students regularly eat breakfast than would be expected if the proportions were equal (54 vs. 41.7). The West "eats breakfast" cell (30 vs. 41.7, contribution ≈ 3.27) also contributes a lot, in the other direction.',
            ['Identifies East, eats breakfast (≈ 3.65) and says East has more breakfast eaters than expected under H0.']
          ),
        },
      ],
    },
    {
      questionNumber: 4,
      questionTitle: 'Question 4: Practice and Typing Speed',
      prompt:
        "A teacher wants to know how weekly practice time is related to typing speed. She selects a random sample of 15 students from a typing class, records each student's weekly practice time (in hours), and gives each a typing test to measure speed in words per minute. The scatterplot shows the data. Computer output for the least-squares regression line gives: predicted typing speed = 30.07 + 3.205(practice time), r² = 92.7%, and s = 2.28.",
      image: {
        src: IMG('frq_b4_scatter_typing.svg'),
        alt: 'Scatterplot of typing speed in words per minute against weekly practice time in hours for 15 students. Practice times range from 1 to 9 hours and speeds from 33 to 58 words per minute, in a strong positive linear pattern.',
      },
      parts: [
        {
          label: 'A',
          text: 'Describe the association between weekly practice time and typing speed shown in the scatterplot.',
          answerType: 'text',
          answer: frqAnswer(
            'There is a strong, positive, linear association between weekly practice time and typing speed, with no obvious outliers.',
            ['Direction and form: positive and linear.', 'Strength: strong (no outliers), with context somewhere in the answer.']
          ),
        },
        {
          label: 'B',
          text: 'Interpret the slope of the regression line in the context of the problem.',
          answerType: 'text',
          answer: frqAnswer(
            'For each additional hour of weekly practice, the model predicts the typing speed to increase by about 3.2 words per minute.',
            ['Interprets the slope as a predicted (or average) increase of about 3.2 words per minute per additional hour.']
          ),
        },
        {
          label: 'C',
          text: 'Interpret the value r² = 92.7% in the context of the problem.',
          answerType: 'text',
          answer: frqAnswer(
            'About 92.7% of the variation in typing speed is accounted for by the linear relationship with weekly practice time.',
            ['Interprets r² as the percent of variation in typing speed accounted for by the linear relationship with practice time.']
          ),
        },
        {
          label: 'D',
          text: 'One student practiced for 6 hours per week and typed 52 words per minute. Calculate the residual for this student and interpret it in context.',
          answerType: 'text',
          answer: frqAnswer(
            'Predicted speed = 30.07 + 3.205(6) = 49.30. Residual = 52 − 49.30 = +2.70. This student typed about 2.7 words per minute faster than the model predicts for a student who practices 6 hours per week.',
            ['Calculates the residual 52 − 49.30 ≈ +2.70 (actual − predicted).', 'Interprets it as typing about 2.7 words per minute faster than predicted.']
          ),
        },
        {
          label: 'E',
          text: 'Use the regression line to predict the typing speed of a student who practices 20 hours per week. Explain why this prediction is not reliable.',
          answerType: 'text',
          answer: frqAnswer(
            '30.07 + 3.205(20) ≈ 94.2 words per minute. Practice times in the sample range from 1 to 9 hours, so 20 hours is extrapolation and the linear pattern may not continue that far.',
            ['Calculates the prediction ≈ 94.2 words per minute.', 'Explains that 20 hours is outside the data (1 to 9 hours), so this is extrapolation.']
          ),
        },
        {
          label: 'F',
          text: 'Interpret the value s = 2.28 in the context of the problem.',
          answerType: 'text',
          answer: frqAnswer(
            'When predicting typing speed from practice time, the actual speeds typically differ from the predicted speeds by about 2.28 words per minute.',
            ['Interprets s as the typical prediction error: about 2.28 words per minute. "The standard deviation of typing speeds" does not earn the point.']
          ),
        },
        {
          label: 'G',
          text: 'The teacher plans to make a residual plot for this regression. Describe what the residual plot would look like if a linear model is appropriate.',
          answerType: 'text',
          answer: frqAnswer('The residuals would be randomly scattered about the horizontal line at 0 with no discernible pattern.', [
            'Residuals randomly scattered around 0 with no pattern and roughly constant spread.',
          ]),
        },
      ],
    },
  ],
};
