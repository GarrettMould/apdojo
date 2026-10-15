import type { Question } from '@/data/questionBanks/types';

/**
 * Gap-fill AP Stats MCQs.
 * Merged into live practice via `statsMcqPractice.ts`.
 * IDs continue the 28xxx batch: 28117+, 28220+, 28322+, 28415+, 28515+.
 */
export const statsGapMcqPreviewQuestions: Question[] = [
  {
    "id": 28117,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A cafeteria manager asked 120 students to name their favorite school lunch. The table shows the results. Which display is appropriate for showing the distribution of this variable?",
    "image": null,
    "tableData": {
      "headers": ["Favorite Lunch", "Number of Students"],
      "rows": [["Pizza", "48"], ["Tacos", "36"], ["Salad", "12"], ["Burgers", "24"]]
    },
    "options": [
      "A histogram, because the table gives counts.",
      "A boxplot, because it shows how the counts are spread out.",
      "A stemplot, because each student gave one response.",
      "A scatterplot, because the table has two columns of data.",
      "A bar graph, because favorite lunch is a categorical variable."
    ],
    "correctAnswer": "E",
    "explanation": "Favorite lunch is a categorical variable, so a bar graph (or a pie chart) showing the count or percent in each category is appropriate. Histograms, boxplots, and stemplots are for quantitative variables. The counts in the table are numbers, but the variable being measured is still the lunch choice.",
    "videoExplanation": null
  },
  {
    "id": 28118,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "The table shows the favorite school lunch of 120 students. If the data are displayed in a relative frequency bar graph, what is the height of the bar for tacos?",
    "image": null,
    "tableData": {
      "headers": ["Favorite Lunch", "Number of Students"],
      "rows": [["Pizza", "48"], ["Tacos", "36"], ["Salad", "12"], ["Burgers", "24"]]
    },
    "options": ["12%", "30%", "36%", "48%", "75%"],
    "correctAnswer": "B",
    "explanation": "Relative frequency = count / total = 36/120 = 0.30, or 30%. The value 36% treats the count as a percent, and 75% compares tacos to pizza (36/48) instead of to all students.",
    "videoExplanation": null
  },
  {
    "id": 28119,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A town survey asked 210 students how they usually get to school. The table shows the results. What percent of the students usually walk or bike?",
    "image": null,
    "tableData": {
      "headers": ["Method of Getting to School", "Number of Students"],
      "rows": [["Bus", "90"], ["Walk", "45"], ["Car", "60"], ["Bike", "15"]]
    },
    "options": ["7.1%", "21.4%", "28.6%", "42.9%", "50.0%"],
    "correctAnswer": "C",
    "explanation": "Walkers and bikers total 45 + 15 = 60 students. 60/210 ≈ 0.286, or 28.6%. The value 21.4% counts walkers only, and 50.0% compares walkers and bikers to the 120 students who do not ride the bus.",
    "videoExplanation": null
  },
  {
    "id": 28120,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A student council asked students to list every club they belong to. The table gives the percent of students who belong to each club. Why would a pie chart of these percents not be appropriate?",
    "image": null,
    "tableData": {
      "headers": ["Club", "Percent of Students Who Belong"],
      "rows": [["Band", "45%"], ["Robotics", "38%"], ["Drama", "27%"], ["Chess", "20%"]]
    },
    "options": [
      "The percents add to more than 100% because students could belong to more than one club.",
      "Pie charts can be used only with quantitative variables.",
      "Percents can be displayed only in a bar graph.",
      "There are too few categories to make a pie chart.",
      "The largest category is less than 50%, so it cannot be shown as a slice."
    ],
    "correctAnswer": "A",
    "explanation": "A pie chart shows how a whole is divided into categories that do not overlap, so the percents must total 100%. Here 45 + 38 + 27 + 20 = 130%, because students can appear in several clubs. A bar graph can show these percents.",
    "videoExplanation": null
  },
  {
    "id": 28121,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "The table summarizes the commute times of the 32 employees of a company. Which of the following best describes the shape of the distribution?",
    "image": null,
    "tableData": {
      "headers": ["Commute Time (minutes)", "Number of Employees"],
      "rows": [["0-9", "14"], ["10-19", "9"], ["20-29", "5"], ["30-39", "3"], ["40-49", "1"]]
    },
    "options": [
      "Skewed left, because most of the data are on the left side of the display.",
      "Approximately symmetric, because every bin has at least one employee.",
      "Bimodal, because the first two bins are tall.",
      "Approximately uniform, because the frequencies decrease by a similar amount.",
      "Skewed right, with most commutes short and a tail toward longer times."
    ],
    "correctAnswer": "E",
    "explanation": "The frequencies are largest for the short commute times and trail off toward the longer times, so the long tail is on the right and the distribution is skewed right. Skewness is named for the direction of the tail, not for where most of the data are.",
    "videoExplanation": null
  },
  {
    "id": 28122,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A teacher combined the scores of 38 students on a final exam into the bins shown in the table. Which statement best describes the distribution?",
    "image": null,
    "tableData": {
      "headers": ["Score", "Number of Students"],
      "rows": [["40-49", "3"], ["50-59", "12"], ["60-69", "4"], ["70-79", "3"], ["80-89", "11"], ["90-99", "5"]]
    },
    "options": [
      "Bimodal, with peaks at 50-59 and 80-89, which suggests that the scores may come from two different groups of students.",
      "Unimodal and symmetric, centered at 70-79.",
      "Skewed right, with an outlier at 90-99.",
      "Uniform, because every bin contains some students.",
      "Skewed left, because the largest frequency is at 50-59."
    ],
    "correctAnswer": "A",
    "explanation": "There are two separate peaks (12 students at 50-59 and 11 students at 80-89) with a dip between them. A distribution with two peaks is bimodal and often signals two subgroups.",
    "videoExplanation": null
  },
  {
    "id": 28123,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A soccer coach recorded the number of goals her team scored in each of 31 games. The table shows the distribution. Which feature of the distribution is most clearly shown?",
    "image": null,
    "tableData": {
      "headers": ["Goals Scored", "Number of Games"],
      "rows": [["0", "6"], ["1", "9"], ["2", "8"], ["3", "5"], ["4", "2"], ["8", "1"]]
    },
    "options": [
      "A uniform distribution, because each value from 0 to 4 occurred at least twice.",
      "A bimodal distribution with peaks at 1 goal and 8 goals.",
      "A skewed left distribution, because the mode is at 1 goal.",
      "A gap between 4 and 8 goals, with 8 goals a possible outlier.",
      "A symmetric distribution with no unusual values."
    ],
    "correctAnswer": "D",
    "explanation": "No games had 5, 6, or 7 goals, and one game had 8, which is far from the rest of the data. That isolated value is a possible outlier. The bulk of the data are at 0 to 4 goals with a tail toward higher values, so the distribution is skewed right, not left.",
    "videoExplanation": null
  },
  {
    "id": 28124,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "The stemplot shows the scores of 18 students on a quiz. Key: 7 | 2 means 72.\n\n4 | 2 5\n5 | 0 1 8\n6 | 2 4\n7 | 0 1 3 5 6 8\n8 | 2 4 6 9\n9 | 1\n\nWhich of the following best describes the shape of the distribution?",
    "image": null,
    "options": [
      "Skewed right, with a tail toward the high scores.",
      "Approximately symmetric, with a center near 80.",
      "Bimodal, with peaks at 70s and 90s.",
      "Approximately uniform, because every stem has at least one leaf.",
      "Skewed left, with a tail toward the low scores."
    ],
    "correctAnswer": "E",
    "explanation": "Most scores are in the 70s and 80s, and the data trail off through several low scores (42, 45, 50, 51, and 58), with only one score in the 90s. The longer tail is on the lower values, so the distribution is skewed left. The center is near 74, not 80.",
    "videoExplanation": null
  },
  {
    "id": 28125,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "The table shows the ages of 15 customers at a bookstore, grouped into bins of width 5. A student redraws the histogram using only two bins, 20-39 and 40-59. Which feature of the data would this display most likely hide?",
    "image": null,
    "tableData": {
      "headers": ["Age (years)", "Number of Customers"],
      "rows": [["20-24", "6"], ["25-29", "1"], ["30-34", "0"], ["35-39", "1"], ["40-44", "7"]]
    },
    "options": [
      "The two clusters of ages, near 20-24 and 40-44, separated by an almost empty middle.",
      "The total number of customers, because the bars would no longer add to 15.",
      "The overall center, because a histogram with two bins has no center.",
      "The units of the variable.",
      "Any skewness, because only symmetric data can be placed in two bins."
    ],
    "correctAnswer": "A",
    "explanation": "With width-5 bins the histogram shows two tall bars at the ends with almost nothing between them. With two wide bins the counts are 8 and 7, which looks nearly uniform and hides the clusters and the gap. Bin width can hide features of a distribution.",
    "videoExplanation": null
  },
  {
    "id": 28126,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "The table shows the wait times of 40 people at a clinic. In which bin does the median wait time lie?",
    "image": null,
    "tableData": {
      "headers": ["Wait Time (minutes)", "Number of People"],
      "rows": [["0-9", "10"], ["10-19", "3"], ["20-29", "5"], ["30-39", "9"], ["40-49", "13"]]
    },
    "options": ["0-9", "10-19", "20-29", "30-39", "40-49"],
    "correctAnswer": "D",
    "explanation": "With 40 values, the median is the mean of the 20th and 21st values. The cumulative counts are 10, 13, 18, and 27, so the 20th and 21st values are in the 30-39 bin. The tallest bar (40-49) is the mode bin, and 20-29 is just the middle bin by position.",
    "videoExplanation": null
  },
  {
    "id": 28127,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.10"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A teacher wanted to estimate the mean hours of homework completed per week by all students at her large high school. The table describes the data she collected. Which statement is best supported?",
    "image": null,
    "tableData": {
      "headers": ["Detail", "Description"],
      "rows": [
        ["Population of interest", "All students at a large public high school"],
        ["Sample", "The 36 students in the teacher's own AP Statistics class who volunteered"],
        ["Variable measured", "Hours of homework completed last week"]
      ]
    },
    "options": [
      "The results can be generalized to all students at the school because 36 is a large sample.",
      "The results describe only the 36 volunteers and cannot be generalized to all students at the school.",
      "The results can be generalized to all AP students in the country.",
      "The results show that taking AP Statistics causes students to do more homework.",
      "The results can be generalized to the whole school if she repeats the survey next week."
    ],
    "correctAnswer": "B",
    "explanation": "The sample was a convenience sample of volunteers from one class, so it may not represent all students at the school. A larger sample or a repeat survey of the same group does not fix this, and no comparison or experiment was done that would support a cause-and-effect claim.",
    "videoExplanation": null
  },
  {
    "id": 28128,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.10"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A counselor recorded the hours of sleep and the quiz score of five students, as shown in the table. Which investigative question can these data be used to answer?",
    "image": null,
    "tableData": {
      "headers": ["Student", "Hours of Sleep", "Quiz Score"],
      "rows": [["1", "6.0", "72"], ["2", "7.5", "85"], ["3", "5.5", "64"], ["4", "8.0", "90"], ["5", "6.5", "78"]]
    },
    "options": [
      "Would getting more sleep cause these students' quiz scores to improve?",
      "Do all students in the state who sleep more earn higher quiz scores?",
      "What is the favorite subject of these students?",
      "Is there an association between hours of sleep and quiz score for these students?",
      "Why do some students sleep less than others?"
    ],
    "correctAnswer": "D",
    "explanation": "The data contain two quantitative variables measured on the same students, so they can describe an association between them in this sample. They cannot show cause and effect (no experiment), cannot be generalized to all students (no random selection), and contain no information about subjects or reasons.",
    "videoExplanation": null
  },
  {
    "id": 28129,
    "subject": "ap_statistics",
    "unit": 1,
    "lessonIDS": ["1.10"],
    "unitName": "Exploring One-Variable Data and Collecting Data",
    "question": "A town council posted an online poll on its social media page asking residents whether to build a skate park. Anyone who saw the post could vote once. The table shows the results. Which conclusion is best supported by the data?",
    "image": null,
    "tableData": {
      "headers": ["Response", "Number of Responses"],
      "rows": [["Yes, build the skate park", "420"], ["No, do not build it", "80"]]
    },
    "options": [
      "About 84% of all town residents support building the skate park.",
      "A majority of town residents would use the skate park.",
      "The poll is accurate because there were 500 responses.",
      "The council should build the skate park because the poll represents the town.",
      "84% of the people who voted said yes, but the results cannot be generalized to all town residents because the voters chose themselves."
    ],
    "correctAnswer": "E",
    "explanation": "420/500 = 84% of the respondents said yes. Because the poll was voluntary, the respondents may differ from the town as a whole, and a large number of responses does not remove that bias.",
    "videoExplanation": null
  },
  {
    "id": 28220,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.1"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "A counselor asked 120 juniors (grade 11) and 80 seniors (grade 12) whether they have a part-time job. The table shows the results. Which display would best allow a comparison of the proportion of students with jobs in the two grades?",
    "image": null,
    "tableData": {
      "headers": [" ", "Has a Job", "Does Not Have a Job", "Total"],
      "rows": [["Grade 11", "30", "90", "120"], ["Grade 12", "60", "20", "80"], ["Total", "90", "110", "200"]]
    },
    "options": [
      "A segmented bar graph with one bar for each grade, showing the percent with a job and the percent without a job.",
      "A bar graph of the number of students with a job in each grade.",
      "A pie chart of all 200 students by grade.",
      "A histogram of the numbers in the table.",
      "A boxplot for each grade."
    ],
    "correctAnswer": "A",
    "explanation": "The grades have different numbers of students, so the groups must be compared with percents. A segmented bar graph shows the conditional distribution of job status within each grade. A bar graph of counts would be misleading because there are more juniors than seniors.",
    "videoExplanation": null
  },
  {
    "id": 28221,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.1"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "The table shows whether 120 juniors and 80 seniors have a part-time job. Which statement describes the conditional distribution of job status for the seniors?",
    "image": null,
    "tableData": {
      "headers": [" ", "Has a Job", "Does Not Have a Job", "Total"],
      "rows": [["Grade 11", "30", "90", "120"], ["Grade 12", "60", "20", "80"], ["Total", "90", "110", "200"]]
    },
    "options": [
      "30% have a job and 10% do not.",
      "75% have a job and 25% do not.",
      "66.7% have a job and 33.3% do not.",
      "45% have a job and 55% do not.",
      "60 have a job and 20 do not."
    ],
    "correctAnswer": "B",
    "explanation": "Among seniors, 60/80 = 75% have a job and 20/80 = 25% do not. The 30% and 10% values use the total of 200 as the denominator, 66.7% reverses the condition (60 of the 90 students with jobs are seniors), and 45% and 55% describe all students.",
    "videoExplanation": null
  },
  {
    "id": 28222,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.1"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "The table shows whether 120 juniors and 80 seniors have a part-time job. Does the table suggest an association between grade level and having a job?",
    "image": null,
    "tableData": {
      "headers": [" ", "Has a Job", "Does Not Have a Job", "Total"],
      "rows": [["Grade 11", "30", "90", "120"], ["Grade 12", "60", "20", "80"], ["Total", "90", "110", "200"]]
    },
    "options": [
      "No, because more of the 200 students do not have a job than have one.",
      "No, because there are more juniors than seniors.",
      "Yes, because the total number of students is 200.",
      "Yes, because the percent with a job differs by grade: 25% of the juniors and 75% of the seniors.",
      "The table cannot show an association because it does not give percents."
    ],
    "correctAnswer": "D",
    "explanation": "Variables are associated when the conditional distributions differ. Here 30/120 = 25% of juniors have a job compared to 60/80 = 75% of seniors. The overall number of students with or without jobs does not matter for the comparison.",
    "videoExplanation": null
  },
  {
    "id": 28223,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.1"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "The table shows whether 120 juniors and 80 seniors have a part-time job. A segmented bar graph is drawn with one bar for each grade, and each bar is scaled to 100%. Which statement describes the graph?",
    "image": null,
    "tableData": {
      "headers": [" ", "Has a Job", "Does Not Have a Job", "Total"],
      "rows": [["Grade 11", "30", "90", "120"], ["Grade 12", "60", "20", "80"], ["Total", "90", "110", "200"]]
    },
    "options": [
      "The \"has a job\" segment of the senior bar is twice as tall as the one for juniors, because 60 is twice 30.",
      "The two bars are identical because both bars total 100%.",
      "The senior bar is shorter than the junior bar because there are fewer seniors.",
      "The \"does not have a job\" segment is taller for seniors than for juniors.",
      "The \"has a job\" segment of the senior bar is three times as tall as the \"has a job\" segment of the junior bar."
    ],
    "correctAnswer": "E",
    "explanation": "Each bar shows percents. The \"has a job\" segment is 25% for juniors and 75% for seniors, so the senior segment is 3 times as tall. The bars have the same total height (100%), but the segments within them differ.",
    "videoExplanation": null
  },
  {
    "id": 28224,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "A basketball player makes 70% of her free throws, and each shot is independent. A student will use random digits 0-9 to simulate shots. Which assignment of digits correctly simulates a single free throw?",
    "image": null,
    "options": [
      "Let the digits 0, 1, 2, 3, 4, 5, and 6 represent a made shot and 7, 8, and 9 represent a missed shot.",
      "Let the digits 0 through 7 represent a made shot and 8 and 9 represent a missed shot.",
      "Let the digits 0 through 6 represent a missed shot and 7, 8, and 9 represent a made shot.",
      "Let the digits 4 through 9 represent a made shot and 0 through 3 represent a missed shot.",
      "Let the digits 0 through 6 represent a made shot, but ignore any digit that has already appeared in the trial."
    ],
    "correctAnswer": "A",
    "explanation": "Seven of the ten digits must represent a make so that P(make) = 0.70. Using 0 through 7 gives 80%, reversing the assignment gives 30%, and 4 through 9 gives 60%. Ignoring repeated digits is sampling without replacement, which would make the shots dependent.",
    "videoExplanation": null
  },
  {
    "id": 28225,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "A student simulates two consecutive free throws for a player who makes 70% of her shots. Digits 0-6 represent a made shot, and 7-9 represent a miss. Each trial uses two digits, as shown in the table for 10 trials. In how many of the trials did the player make exactly one shot?",
    "image": null,
    "tableData": {
      "headers": ["Trial", "Digits"],
      "rows": [["1", "5 8"], ["2", "9 2"], ["3", "0 3"], ["4", "6 1"], ["5", "7 7"], ["6", "1 5"], ["7", "4 0"], ["8", "2 9"], ["9", "8 4"], ["10", "6 6"]]
    },
    "options": ["2", "3", "4", "5", "6"],
    "correctAnswer": "C",
    "explanation": "Reading each pair: trial 1 (5 make, 8 miss) = 1 make; trial 2 (9 miss, 2 make) = 1; trial 8 (2 make, 9 miss) = 1; trial 9 (8 miss, 4 make) = 1. Trials 3, 4, 6, 7, and 10 have two makes, and trial 5 has none. Exactly one make occurred in 4 trials.",
    "videoExplanation": null
  },
  {
    "id": 28226,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "A student simulates two consecutive free throws for a player who makes 70% of her shots. Digits 0-6 represent a made shot, and 7-9 represent a miss. Each trial uses two digits, as shown in the table for 10 trials. Based on these trials, what is the estimated probability that the player makes both free throws?",
    "image": null,
    "tableData": {
      "headers": ["Trial", "Digits"],
      "rows": [["1", "5 8"], ["2", "9 2"], ["3", "0 3"], ["4", "6 1"], ["5", "7 7"], ["6", "1 5"], ["7", "4 0"], ["8", "2 9"], ["9", "8 4"], ["10", "6 6"]]
    },
    "options": ["0.10", "0.40", "0.50", "0.70", "0.90"],
    "correctAnswer": "C",
    "explanation": "A made shot is a digit from 0 to 6. Both shots were made in trials 3 (0 3), 4 (6 1), 6 (1 5), 7 (4 0), and 10 (6 6), which is 5 of the 10 trials. The estimated probability is 5/10 = 0.50.",
    "videoExplanation": null
  },
  {
    "id": 28227,
    "subject": "ap_statistics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Probability, Random Variables, and Probability Distributions",
    "question": "A player makes 60% of her shots. A student simulates 50 trials of 5 shots each and records the number of made shots in each trial, as shown in the table. Based on the simulation, what is the estimated probability that the player makes at least 4 of her 5 shots?",
    "image": null,
    "tableData": {
      "headers": ["Number of Made Shots (out of 5)", "Number of Trials"],
      "rows": [["0", "1"], ["1", "4"], ["2", "12"], ["3", "17"], ["4", "13"], ["5", "3"]]
    },
    "options": ["0.06", "0.26", "0.32", "0.60", "0.68"],
    "correctAnswer": "C",
    "explanation": "The trials with at least 4 made shots are those with 4 or 5 makes: 13 + 3 = 16 trials. 16/50 = 0.32. The value 0.26 counts only the trials with exactly 4 makes, and 0.68 is the estimated probability of 3 or fewer.",
    "videoExplanation": null
  },
  {
    "id": 28322,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "A teacher simulated 1,000 random samples of 50 students from a population in which 40% own a bike and recorded the sample proportion p̂ from each sample. The table summarizes the results. What do the results suggest about p̂ as an estimator of p?",
    "image": null,
    "tableData": {
      "headers": ["Quantity", "Value"],
      "rows": [
        ["True proportion of students who own a bike, p", "0.40"],
        ["Sample size for each sample", "50"],
        ["Number of simulated samples", "1,000"],
        ["Mean of the 1,000 values of p̂", "0.401"],
        ["Standard deviation of the 1,000 values of p̂", "0.069"]
      ]
    },
    "options": [
      "It is biased, because the mean of the simulated values (0.401) is not exactly 0.40.",
      "It appears to be unbiased, because the simulated values of p̂ are centered at about the true value of 0.40.",
      "It is unbiased, because every sample produces a value of p̂ very close to 0.40.",
      "It is biased, because the standard deviation of the simulated values is not 0.",
      "Nothing can be concluded, because the sample size of 50 is too small."
    ],
    "correctAnswer": "B",
    "explanation": "An unbiased estimator has a sampling distribution centered at the parameter. The mean of the 1,000 simulated values (0.401) is essentially 0.40. Some difference from 0.40 is expected from simulation, and the standard deviation measures variability, not bias.",
    "videoExplanation": null
  },
  {
    "id": 28323,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "Three different statistics, A, B, and C, are being considered as estimators of a population proportion whose true value is p = 0.50. The table summarizes the sampling distribution of each statistic. Which statement is correct?",
    "image": null,
    "tableData": {
      "headers": ["Estimator", "Mean of Sampling Distribution", "Standard Deviation of Sampling Distribution"],
      "rows": [["A", "0.50", "0.120"], ["B", "0.58", "0.040"], ["C", "0.46", "0.050"]]
    },
    "options": [
      "Statistic B is unbiased because it has the smallest standard deviation.",
      "Statistic C is unbiased because its mean is within 0.05 of 0.50.",
      "Statistic A is unbiased, even though it is the most variable.",
      "All three statistics are unbiased because each is computed from a random sample.",
      "None of the statistics can be unbiased because none has a standard deviation of 0."
    ],
    "correctAnswer": "C",
    "explanation": "A statistic is an unbiased estimator when the mean of its sampling distribution equals the parameter. Only A has a mean of 0.50. Statistic B is precise but biased, because its sampling distribution is centered at 0.58.",
    "videoExplanation": null
  },
  {
    "id": 28324,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "The table shows the mean and standard deviation of the sampling distribution of p̂ for two sample sizes when the true proportion is p = 0.60. Which statement describes what happens when the sample size increases from 100 to 400?",
    "image": null,
    "tableData": {
      "headers": ["Sample Size", "Mean of p̂", "Standard Deviation of p̂"],
      "rows": [["100", "0.600", "0.049"], ["400", "0.600", "0.025"]]
    },
    "options": [
      "The bias decreases, and the variability decreases.",
      "Both the bias and the variability stay the same.",
      "The estimator stays unbiased, and its variability is cut to one fourth.",
      "The estimator stays unbiased, and its variability is cut about in half.",
      "The bias increases, and the variability decreases."
    ],
    "correctAnswer": "D",
    "explanation": "The mean of p̂ is 0.600 for both sample sizes, so p̂ is unbiased in both cases. The standard deviation is √(0.6 × 0.4/n), which is 0.049 for n = 100 and 0.0245 for n = 400. Quadrupling n cuts the standard deviation in half.",
    "videoExplanation": null
  },
  {
    "id": 28325,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "A random sample of households is selected from a large town, as described in the table. What are the mean and standard deviation of the sampling distribution of the sample proportion p̂?",
    "image": null,
    "tableData": {
      "headers": ["Quantity", "Value"],
      "rows": [["Proportion of households in a town that recycle, p", "0.35"], ["Sample size, n", "200"]]
    },
    "options": [
      "Mean = 0.35, standard deviation ≈ 0.477",
      "Mean = 0.35, standard deviation ≈ 0.0011",
      "Mean = 70, standard deviation ≈ 6.75",
      "Mean = 0.35, standard deviation ≈ 0.048",
      "Mean = 0.35, standard deviation ≈ 0.034"
    ],
    "correctAnswer": "E",
    "explanation": "The mean of p̂ is p = 0.35. The standard deviation is √(p(1 - p)/n) = √(0.35 × 0.65/200) ≈ 0.034. The value 0.477 forgets to divide by n, 0.0011 is the variance, 70 and 6.75 are the mean and standard deviation of the count, and 0.048 uses n = 100.",
    "videoExplanation": null
  },
  {
    "id": 28326,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "In each scenario in the table, a random sample is taken without replacement and the sample proportion will be calculated. For which scenario is the 10% condition for independence met?",
    "image": null,
    "tableData": {
      "headers": ["Scenario", "Population Size", "Sample Size"],
      "rows": [["A", "500", "60"], ["B", "2,000", "150"], ["C", "300", "40"], ["D", "1,200", "130"]]
    },
    "options": ["Scenario B", "Scenario A", "Scenario C", "Scenario D", "All four scenarios"],
    "correctAnswer": "A",
    "explanation": "The sample size must be at most 10% of the population size. Scenario B: 10% of 2,000 is 200, and 150 ≤ 200. For A, 10% of 500 is 50 (60 is too large). For C, 10% of 300 is 30 (40 is too large). For D, 10% of 1,200 is 120 (130 is too large).",
    "videoExplanation": null
  },
  {
    "id": 28327,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "Random samples are taken from large populations, and the 10% condition is met in each scenario in the table. For which scenarios can the sampling distribution of p̂ be modeled as approximately Normal?",
    "image": null,
    "tableData": {
      "headers": ["Scenario", "True Proportion, p", "Sample Size, n"],
      "rows": [["1", "0.50", "40"], ["2", "0.05", "150"], ["3", "0.90", "100"], ["4", "0.02", "300"]]
    },
    "options": [
      "Scenario 1 only",
      "Scenarios 1 and 3 only",
      "Scenarios 1, 2, and 3",
      "Scenarios 2 and 4 only",
      "All four scenarios"
    ],
    "correctAnswer": "B",
    "explanation": "Both np and n(1 - p) must be at least 10. Scenario 1: 20 and 20. Scenario 2: np = 7.5, which fails. Scenario 3: np = 90 and n(1 - p) = 10, which passes. Scenario 4: np = 6, which fails.",
    "videoExplanation": null
  },
  {
    "id": 28328,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "A random sample is taken from a large population of customers, as described in the table. Assuming the conditions are met, what is the approximate probability that the sample proportion p̂ is less than 0.55?",
    "image": null,
    "tableData": {
      "headers": ["Quantity", "Value"],
      "rows": [
        ["Proportion of customers who prefer online ordering, p", "0.60"],
        ["Sample size, n", "150"]
      ]
    },
    "options": ["0.006", "0.106", "0.211", "0.459", "0.894"],
    "correctAnswer": "B",
    "explanation": "The standard deviation of p̂ is √(0.60 × 0.40/150) = 0.04. z = (0.55 - 0.60)/0.04 = -1.25, and P(z < -1.25) ≈ 0.106. The value 0.211 doubles the probability, 0.894 is P(p̂ > 0.55), 0.459 uses 0.49 instead of 0.04 as the standard deviation, and 0.006 uses a standard deviation of 0.02.",
    "videoExplanation": null
  },
  {
    "id": 28329,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "A pollster will take a random sample from a large population in which p = 0.50, as described in the table. What sample size is needed so that the standard deviation of the sampling distribution of p̂ is 0.025?",
    "image": null,
    "tableData": {
      "headers": ["Quantity", "Value"],
      "rows": [["Population proportion, p", "0.50"], ["Desired standard deviation of p̂", "0.025"]]
    },
    "options": ["20", "40", "200", "400", "1,600"],
    "correctAnswer": "D",
    "explanation": "Solve √(0.5 × 0.5/n) = 0.025. Squaring both sides gives 0.25/n = 0.000625, so n = 400. A sample of 1,600 would give a standard deviation of 0.0125.",
    "videoExplanation": null
  },
  {
    "id": 28330,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.11"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "Independent random samples of students were asked whether they are satisfied with the lunch at two cafeterias. The table shows the results. A 95% confidence interval for pA − pB is (−0.023, 0.203). Does the interval provide convincing evidence of a difference in the proportions of satisfied students?",
    "image": null,
    "tableData": {
      "headers": ["Cafeteria", "Sample Size", "Number Satisfied"],
      "rows": [["A", "150", "96"], ["B", "140", "77"]]
    },
    "options": [
      "Yes, because most of the values in the interval are positive.",
      "Yes, because the sample proportions are different (0.64 and 0.55).",
      "No, because 0 is in the interval, so a difference of 0 is plausible.",
      "No, because the interval is wide, which proves the two proportions are equal.",
      "Yes, because the confidence level is 95%."
    ],
    "correctAnswer": "C",
    "explanation": "A difference of 0 means the proportions are equal. Since 0 is inside the interval, equal proportions are plausible, so the interval does not justify a claim of a difference. This does not prove that the proportions are equal.",
    "videoExplanation": null
  },
  {
    "id": 28331,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.11"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "Patients were randomly assigned to a new therapy or a standard therapy, and the table shows how many improved. A 95% confidence interval for p(new) − p(standard) is (0.027, 0.232). Which claim is justified by the interval?",
    "image": null,
    "tableData": {
      "headers": ["Therapy", "Sample Size", "Number Who Improved"],
      "rows": [["New", "150", "118"], ["Standard", "140", "92"]]
    },
    "options": [
      "The proportion of patients who improve is greater with the standard therapy than with the new therapy.",
      "The two therapies have the same proportion of patients who improve.",
      "The new therapy improves exactly 13% more of the patients.",
      "The proportion of patients who improve is greater with the new therapy than with the standard therapy.",
      "There is a 95% probability that the new therapy will work for any given patient."
    ],
    "correctAnswer": "D",
    "explanation": "The entire interval is above 0, so p(new) − p(standard) is plausibly positive only, which supports the claim that the new therapy has the higher proportion. The point estimate of 0.13 is not the true difference, and the interval says nothing about individual patients.",
    "videoExplanation": null
  },
  {
    "id": 28332,
    "subject": "ap_statistics",
    "unit": 3,
    "lessonIDS": ["3.11"],
    "unitName": "Inference for Categorical Data: Proportions",
    "question": "Independent random samples of students were studied, and the table shows how many passed a placement exam. A 95% confidence interval for p(program) − p(no program) is (0.020, 0.139). A principal claims that the program increases the pass proportion by more than 0.05. Does the interval justify this claim?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Number Who Passed"],
      "rows": [["Tutoring program", "480", "336"], ["No program", "480", "298"]]
    },
    "options": [
      "Yes, because the entire interval is above 0.",
      "Yes, because the sample difference (0.079) is greater than 0.05.",
      "Yes, because the upper endpoint, 0.139, is greater than 0.05.",
      "No, because 0 is not in the interval.",
      "No, because the interval includes values less than 0.05."
    ],
    "correctAnswer": "E",
    "explanation": "The interval estimates plausible values of the true difference, and values from 0.020 to 0.050 are in it, so the true difference might be less than 0.05. The interval does justify a claim that the difference is greater than 0, but not that it is greater than 0.05.",
    "videoExplanation": null
  },
  {
    "id": 28415,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Independent random samples are taken from two populations, as described in the table. What are the mean and standard deviation of the sampling distribution of x̄₁ − x̄₂?",
    "image": null,
    "tableData": {
      "headers": ["Population", "Mean", "Standard Deviation", "Sample Size"],
      "rows": [["Group 1 (morning class)", "72", "10", "40"], ["Group 2 (afternoon class)", "68", "12", "50"]]
    },
    "options": [
      "Mean = 4, standard deviation ≈ 2.32",
      "Mean = 4, standard deviation ≈ 5.38",
      "Mean = 4, standard deviation ≈ 3.28",
      "Mean = 140, standard deviation ≈ 2.32",
      "Mean = 4, standard deviation ≈ 2.00"
    ],
    "correctAnswer": "A",
    "explanation": "The mean is μ₁ − μ₂ = 72 − 68 = 4. For independent samples the variances add: √(10²/40 + 12²/50) = √(2.5 + 2.88) ≈ 2.32. The value 5.38 is the variance, 3.28 adds the two standard deviations, and 140 adds the means.",
    "videoExplanation": null
  },
  {
    "id": 28416,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Independent random samples are taken from two populations in each scenario in the table. For which scenarios is the sampling distribution of x̄₁ − x̄₂ approximately Normal?",
    "image": null,
    "tableData": {
      "headers": ["Scenario", "Population Shapes", "n1", "n2"],
      "rows": [
        ["A", "Both Normal", "8", "10"],
        ["B", "Both strongly right skewed", "12", "15"],
        ["C", "Both strongly right skewed", "45", "50"],
        ["D", "One Normal, one strongly right skewed", "6", "9"]
      ]
    },
    "options": [
      "Scenario A only",
      "Scenarios A and C only",
      "Scenario C only",
      "Scenarios A, C, and D",
      "All four scenarios"
    ],
    "correctAnswer": "B",
    "explanation": "The sampling distribution is approximately Normal if both populations are Normal, or if both sample sizes are large (at least 30) by the central limit theorem. Scenario A has Normal populations, and Scenario C has large samples. In B and D, at least one small sample comes from a skewed population.",
    "videoExplanation": null
  },
  {
    "id": 28417,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Independent random samples are taken from two populations, as described in the table. The standard deviation of the sampling distribution of x̄₁ − x̄₂ is about 1.92. If both sample sizes are quadrupled (to 100 and 144), what is the new standard deviation?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Population Standard Deviation", "Sample Size"],
      "rows": [["1", "6", "25"], ["2", "9", "36"]]
    },
    "options": ["0.23", "0.48", "0.96", "1.92", "3.84"],
    "correctAnswer": "C",
    "explanation": "The standard deviation is √(σ1²/n1 + σ2²/n2). With the new sample sizes it is √(36/100 + 81/144) = √(0.36 + 0.5625) ≈ 0.96, which is half of 1.92. Quadrupling the sample sizes cuts the standard deviation in half, not to one fourth.",
    "videoExplanation": null
  },
  {
    "id": 28418,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.8"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Independent random samples of students from two classes recorded the minutes they read per night. The table shows the summary statistics. A 95% confidence interval for μA − μB is (−1.27, 7.47). Does the interval justify the claim that the mean reading times differ?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Sample Mean (minutes)", "Sample SD (minutes)"],
      "rows": [["Class A", "35", "78.5", "9.0"], ["Class B", "40", "75.4", "10.0"]]
    },
    "options": [
      "Yes, because the sample mean for Class A is larger.",
      "Yes, because the interval includes mostly positive values.",
      "No, because 0 is in the interval, so there is not convincing evidence of a difference.",
      "No, because the interval proves that the population means are equal.",
      "Yes, because 95% confidence is high enough to claim a difference."
    ],
    "correctAnswer": "C",
    "explanation": "A difference of 0 is in the interval (-1.27, 7.47), so equal population means are plausible and the claim of a difference is not justified. The sample means differ (3.1 minutes), but that difference could be due to sampling variability.",
    "videoExplanation": null
  },
  {
    "id": 28419,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.8"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Independent random samples of students were taught with two reading programs, and the table shows their test scores. A 95% confidence interval for μ₁ − μ₂ is (0.60, 11.20) points. Which is the correct interpretation of the interval?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Sample Mean (points)", "Sample SD (points)"],
      "rows": [["Program 1", "30", "82.4", "11.2"], ["Program 2", "34", "76.5", "9.8"]]
    },
    "options": [
      "We are 95% confident that individual students in Program 1 score between 0.60 and 11.20 points higher than students in Program 2.",
      "95% of all sample differences are between 0.60 and 11.20 points.",
      "The true difference in mean scores is exactly 5.9 points.",
      "We are 95% confident that the true mean score for Program 1 is between 0.60 and 11.20 points higher than the true mean score for Program 2.",
      "We are 95% confident that Program 2 has the higher mean score."
    ],
    "correctAnswer": "D",
    "explanation": "A confidence interval for μ₁ − μ₂ estimates the difference in population means. Because the entire interval is above 0, it suggests that Program 1 has the higher mean. The interval does not describe individual students or the distribution of sample differences.",
    "videoExplanation": null
  },
  {
    "id": 28420,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.8"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Patients were randomly assigned to a drug or a placebo. The table shows their cholesterol levels after treatment. A 95% confidence interval for μ(drug) − μ(placebo) is (−14.01, −1.99) mg/dL. Which claim is justified by the interval?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Sample Mean (mg/dL)", "Sample SD (mg/dL)"],
      "rows": [["Drug", "45", "187.2", "14.0"], ["Placebo", "50", "195.2", "15.5"]]
    },
    "options": [
      "The drug raises mean cholesterol compared to the placebo.",
      "There is no difference in mean cholesterol between the drug and the placebo.",
      "The drug lowers every patient's cholesterol by between 1.99 and 14.01 mg/dL.",
      "The drug lowers mean cholesterol by exactly 8 mg/dL.",
      "The drug lowers mean cholesterol compared to the placebo."
    ],
    "correctAnswer": "E",
    "explanation": "The entire interval is below 0, so μ(drug) − μ(placebo) is plausibly negative only. This supports the claim that the drug group has the lower mean, and random assignment supports a causal conclusion. The sample difference of -8.0 is only an estimate.",
    "videoExplanation": null
  },
  {
    "id": 28421,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.10"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Independent random samples of students from two classes took the same exam. The table shows the summary statistics. A researcher tests H₀: μA − μB = 0 versus Hₐ: μA − μB ≠ 0, and a calculator gives t ≈ 2.18, df ≈ 59.1, and p-value ≈ 0.033. At the 5% significance level, what is the conclusion?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Sample Mean (points)", "Sample SD (points)"],
      "rows": [["Class A", "32", "81.4", "9.6"], ["Class B", "30", "75.9", "10.2"]]
    },
    "options": [
      "Reject H₀. There is convincing evidence that the mean exam scores differ for the two classes.",
      "Fail to reject H₀. There is not convincing evidence that the mean scores differ.",
      "Reject H₀. There is a 3.3% probability that the two class means are equal.",
      "Fail to reject H₀. The two classes have the same mean score.",
      "Reject H₀. The sample means are not equal."
    ],
    "correctAnswer": "A",
    "explanation": "Since 0.033 < 0.05, we reject H₀. The data provide convincing evidence of a difference in the population means. The p-value is not the probability that H₀ is true, and the sample means will almost always differ, so that alone does not justify the conclusion.",
    "videoExplanation": null
  },
  {
    "id": 28422,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.10"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Plants were randomly assigned to fertilizer A or B, and the table shows the growth of each plant. A researcher tests H₀: μA − μB = 0 versus Hₐ: μA − μB > 0, and a calculator gives t ≈ 1.34, df ≈ 51.0, and p-value ≈ 0.093. At the 5% significance level, which conclusion is correct?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Sample Mean (inches)", "Sample SD (inches)"],
      "rows": [["Fertilizer A", "25", "12.8", "3.1"], ["Fertilizer B", "28", "11.6", "3.4"]]
    },
    "options": [
      "Reject H₀. There is convincing evidence that fertilizer A produces a greater mean growth.",
      "Fail to reject H₀. There is not convincing evidence that fertilizer A produces a greater mean growth than fertilizer B.",
      "Fail to reject H₀. The two fertilizers produce the same mean growth.",
      "Accept H₀, because the p-value is greater than 0.05.",
      "Reject H₀, because the sample mean for fertilizer A is larger."
    ],
    "correctAnswer": "B",
    "explanation": "Since 0.093 > 0.05, we fail to reject H₀. The sample difference of 1.2 inches could reasonably be due to chance. Failing to reject H₀ is not evidence that the means are equal, and we do not accept H₀.",
    "videoExplanation": null
  },
  {
    "id": 28423,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.10"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Six runners each ran a mile once in old shoes and once in new shoes, in random order, and the table shows their times. Which procedure is appropriate for testing whether the mean mile time is lower in the new shoes?",
    "image": null,
    "tableData": {
      "headers": ["Runner", "Old Shoes (seconds)", "New Shoes (seconds)"],
      "rows": [["1", "412", "405"], ["2", "398", "396"], ["3", "430", "421"], ["4", "405", "404"], ["5", "421", "410"], ["6", "389", "385"]]
    },
    "options": [
      "A two-sample t-test comparing the mean of the old times to the mean of the new times, because there are two sets of times.",
      "A two-sample t-test with 10 degrees of freedom, because there are 12 times in all.",
      "A paired t-test on the six differences, because each runner was measured twice.",
      "A two-proportion z-test, because the runners either improved or did not.",
      "A chi-square test of independence, because there are two variables."
    ],
    "correctAnswer": "C",
    "explanation": "The same runners are in both columns, so the two sets of times are not independent. The correct procedure is a one-sample t-test on the differences, with n = 6 pairs and df = 5. Treating the data as two independent samples ignores the pairing.",
    "videoExplanation": null
  },
  {
    "id": 28424,
    "subject": "ap_statistics",
    "unit": 4,
    "lessonIDS": ["4.10"],
    "unitName": "Inference for Quantitative Data: Means",
    "question": "Patients were randomly assigned to a drug or a placebo, and the table shows their blood sugar levels. A researcher tests H₀: μ(drug) − μ(placebo) = 0 versus Hₐ: μ(drug) − μ(placebo) < 0, and a calculator gives t ≈ -1.95, df ≈ 92.5, and p-value ≈ 0.027. At the 1% significance level, which conclusion is correct?",
    "image": null,
    "tableData": {
      "headers": ["Group", "Sample Size", "Sample Mean (mg/dL)", "Sample SD (mg/dL)"],
      "rows": [["Drug", "50", "12.1", "4.2"], ["Placebo", "48", "13.9", "4.9"]]
    },
    "options": [
      "Reject H₀. There is convincing evidence that the drug lowers mean blood sugar.",
      "Reject H₀. The drug lowers blood sugar for 97.3% of patients.",
      "Fail to reject H₀. The drug has no effect on blood sugar.",
      "Fail to reject H₀. There is not convincing evidence that the drug lowers mean blood sugar.",
      "Reject H₀, because the sample mean for the drug is lower."
    ],
    "correctAnswer": "D",
    "explanation": "The p-value of 0.027 is greater than the significance level of 0.01, so we fail to reject H₀. This would have been significant at the 5% level, but the conclusion depends on the chosen α. Failing to reject does not show the drug has no effect.",
    "videoExplanation": null
  },
  {
    "id": 28515,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Regression Analysis",
    "question": "A counselor calculated the correlation for several pairs of variables measured on the same sample of students. The results are shown in the table. Which pair shows the strongest linear association?",
    "image": null,
    "tableData": {
      "headers": ["Pair of Variables", "Correlation, r"],
      "rows": [
        ["Hours studied and GPA", "0.62"],
        ["Absences and GPA", "-0.78"],
        ["Shoe size and GPA", "0.05"],
        ["Hours of sleep and GPA", "0.41"]
      ]
    },
    "options": [
      "Hours studied and GPA, because 0.62 is the largest correlation.",
      "Shoe size and GPA, because 0.05 is the closest to 0.",
      "Absences and GPA is the weakest, because a negative correlation means no association.",
      "None of the pairs, because correlation shows strength only when the association is causal.",
      "Absences and GPA, because -0.78 is farthest from 0."
    ],
    "correctAnswer": "E",
    "explanation": "The strength of a linear association is measured by the absolute value of r. |-0.78| = 0.78 is the largest, so absences and GPA have the strongest linear association (negative direction). The sign gives only the direction.",
    "videoExplanation": null
  },
  {
    "id": 28516,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Regression Analysis",
    "question": "A researcher studied the relationship between the daily high temperature and ice cream sales for a sample of days. The table shows the correlation and r². Which statement is correct?",
    "image": null,
    "tableData": {
      "headers": ["Statistic", "Value"],
      "rows": [["Correlation, r", "0.80"], ["Coefficient of determination, r²", "0.64"]]
    },
    "options": [
      "About 64% of the variation in ice cream sales is accounted for by the linear relationship with temperature.",
      "About 80% of the variation in ice cream sales is explained by temperature.",
      "Sales increase by 0.80 units for each additional degree.",
      "On 80% of the days, sales were higher on the hotter day.",
      "Temperature causes 64% of the ice cream sales."
    ],
    "correctAnswer": "A",
    "explanation": "The coefficient of determination r² = (0.80)² = 0.64 is the proportion of the variation in y accounted for by the linear relationship with x. The correlation r is not a percent of variation, it is not a slope, and neither value shows causation.",
    "videoExplanation": null
  },
  {
    "id": 28517,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Regression Analysis",
    "question": "A travel website used the distance from the beach (miles) to predict the nightly price (dollars) for a random sample of 24 hotels. The table shows computer output for the regression. Which is the equation of the least-squares regression line?",
    "image": null,
    "tableData": {
      "headers": ["Predictor", "Coef", "SE Coef", "T", "P"],
      "rows": [["Constant", "245.3", "12.8", "19.16", "0.000"], ["Distance", "-18.6", "3.1", "-6.00", "0.000"]]
    },
    "options": [
      "predicted price = -18.6 + 245.3(distance)",
      "predicted price = 245.3 - 18.6(distance)",
      "predicted price = 245.3 + 18.6(distance)",
      "predicted price = 245.3 - 3.1(distance)",
      "predicted distance = 245.3 - 18.6(price)"
    ],
    "correctAnswer": "B",
    "explanation": "In the coefficient table, the constant (245.3) is the y-intercept and the Distance coefficient (-18.6) is the slope. The equation is predicted price = 245.3 - 18.6(distance). The SE Coef column (3.1) is not part of the equation.",
    "videoExplanation": null
  },
  {
    "id": 28518,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Regression Analysis",
    "question": "A travel website used the distance from the beach (miles) to predict the nightly price (dollars) for a random sample of 24 hotels. The table shows computer output for the regression. Which is the correct interpretation of the slope?",
    "image": null,
    "tableData": {
      "headers": ["Predictor", "Coef", "SE Coef", "T", "P"],
      "rows": [["Constant", "245.3", "12.8", "19.16", "0.000"], ["Distance", "-18.6", "3.1", "-6.00", "0.000"]]
    },
    "options": [
      "For each additional mile from the beach, the nightly price decreases by exactly $18.60.",
      "For each additional $18.60 in price, the predicted distance from the beach decreases by 1 mile.",
      "For each additional mile from the beach, the predicted nightly price decreases by about $18.60.",
      "The nightly price of a hotel on the beach is $18.60.",
      "Each additional mile from the beach decreases the predicted price by 18.6%."
    ],
    "correctAnswer": "C",
    "explanation": "The slope is the predicted change in y for a one-unit increase in x. Here the predicted price decreases by $18.60 per mile. The slope gives a predicted average change, not an exact change, and it is in dollars, not percent.",
    "videoExplanation": null
  },
  {
    "id": 28519,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.5"],
    "unitName": "Regression Analysis",
    "question": "A travel website used the distance from the beach (miles) to predict the nightly price (dollars) for a random sample of 24 hotels. The table shows computer output for the regression, and the output also reports R-Sq = 62.1%. What is the correlation between distance and price?",
    "image": null,
    "tableData": {
      "headers": ["Predictor", "Coef", "SE Coef", "T", "P"],
      "rows": [["Constant", "245.3", "12.8", "19.16", "0.000"], ["Distance", "-18.6", "3.1", "-6.00", "0.000"]]
    },
    "options": ["-0.788", "-0.621", "-0.386", "0.621", "0.788"],
    "correctAnswer": "A",
    "explanation": "r² = 0.621, so |r| = √0.621 ≈ 0.788. The slope is negative, so r is negative: r ≈ -0.788. The value -0.621 reads r² as the correlation.",
    "videoExplanation": null
  },
  {
    "id": 28520,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.5"],
    "unitName": "Regression Analysis",
    "question": "A travel website used the distance from the beach (miles) to predict the nightly price (dollars) for a random sample of 24 hotels. The distances in the sample ranged from 0.2 to 4.8 miles. The table shows computer output for the regression. What is the predicted price for a hotel that is 2.5 miles from the beach?",
    "image": null,
    "tableData": {
      "headers": ["Predictor", "Coef", "SE Coef", "T", "P"],
      "rows": [["Constant", "245.3", "12.8", "19.16", "0.000"], ["Distance", "-18.6", "3.1", "-6.00", "0.000"]]
    },
    "options": ["$46.50", "$198.80", "$226.70", "$245.30", "$291.80"],
    "correctAnswer": "B",
    "explanation": "Substitute x = 2.5 into the regression equation: predicted price = 245.3 - 18.6(2.5) = 245.3 - 46.5 = $198.80. The distance of 2.5 miles is within the range of the data, so this is interpolation.",
    "videoExplanation": null
  },
  {
    "id": 28521,
    "subject": "ap_statistics",
    "unit": 5,
    "lessonIDS": ["5.5"],
    "unitName": "Regression Analysis",
    "question": "For a sample of basketball players, the table shows summary statistics for weekly practice hours (x) and free-throw percentage (y). The correlation is r = 0.60. What is the equation of the least-squares regression line for predicting y from x?",
    "image": null,
    "tableData": {
      "headers": ["Variable", "Mean", "Standard Deviation"],
      "rows": [["x: weekly practice hours", "6", "2"], ["y: free-throw percentage", "70", "8"]]
    },
    "options": [
      "predicted y = 69.1 + 0.15x",
      "predicted y = 66.4 + 0.60x",
      "predicted y = 70 + 2.4x",
      "predicted y = 55.6 + 2.4x",
      "predicted y = 2.4 + 55.6x"
    ],
    "correctAnswer": "D",
    "explanation": "The slope is b = r(sy/sx) = 0.60(8/2) = 2.4. The line passes through (x̄, ȳ), so the intercept is a = ȳ - b·x̄ = 70 - 2.4(6) = 55.6. The line is predicted y = 55.6 + 2.4x. The value 0.15 comes from using sx/sy, and 0.60 uses r as the slope.",
    "videoExplanation": null
  }
];
