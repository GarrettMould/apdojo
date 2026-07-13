import type { Question } from '@/data/questionBanks/types';

const UNIT_NAME = 'Regression Analysis';

/** Strip "A) " style prefixes — FullExam adds letter labels. */
function stripOptionPrefixes(options: string[]): string[] {
  return options.map((option) => option.replace(/^[A-E]\)\s*/, ''));
}

const STATS_UNIT5_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit5';

const RESIDUAL_SCATTERPLOT = {
  src: `${STATS_UNIT5_IMAGE_BASE}/u5_7516.png`,
  alt: 'Scatterplot of hours studied versus quiz score with least-squares regression line',
};

const RESIDUAL_PLOT_HIGH_R = {
  src: `${STATS_UNIT5_IMAGE_BASE}/u5_7517.png`,
  alt: 'Residual plot showing a curved U-shaped pattern',
};

const INFLUENTIAL_POINT_SCATTERPLOT = {
  src: `${STATS_UNIT5_IMAGE_BASE}/u5_7518.png`,
  alt: 'Scatterplot with influential point P and least-squares regression line',
};

const EXTRAPOLATION_SCATTERPLOT = {
  src: `${STATS_UNIT5_IMAGE_BASE}/u5_7519.png`,
  alt: 'Scatterplot of used car age versus value with regression line',
};

const CORRELATION_COMPARISON_PLOTS = {
  src: `${STATS_UNIT5_IMAGE_BASE}/u5_7520.png`,
  alt: 'Five scatterplots labeled A through E for correlation comparison',
};

/**
 * AP Statistics — Unit 5 **formal unit MCQ test**
 * (`/unit-mcq-test/5?subject=stats`, pretty URL `/ap-stats-unit-5-mcq-test`).
 * IDs in 75xx range (20 questions).
 */
/* export const statsUnit5McqTestQuestions: Question[] = [
  {
    id: 7501,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: UNIT_NAME,
    question: 'What is a bivariate quantitative data set?',
    image: null,
    options: stripOptionPrefixes([
      'A) Data set with only one variable.',
      'B) Data set with two categorical variables.',
      'C) Data set with ordered pairs from two quantitative variables.',
      'D) Data set with no explanatory variable.',
      'E) Data set collected from two different populations.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A bivariate quantitative data set consists of observations of ordered pairs from two quantitative variables.',
  },
  {
    id: 7502,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: UNIT_NAME,
    question: 'Which of the following is NOT part of describing an association in a scatterplot?',
    image: null,
    options: stripOptionPrefixes(['A) Form', 'B) Direction', 'C) Strength', 'D) Mean', 'E) Unusual features']),
    correctAnswer: 'D',
    explanation:
      'A description of an association in a scatterplot includes form, direction, strength, and unusual features — not the mean.',
  },
  {
    id: 7503,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: UNIT_NAME,
    question: 'What is the "explanatory variable" in a regression model?',
    image: null,
    options: stripOptionPrefixes([
      'A) The variable being predicted.',
      'B) The variable used to explain or predict values for the response variable.',
      'C) The variable plotted on the y-axis.',
      'D) The variable that represents the residual.',
      'E) The variable that is always 0.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The explanatory variable is the variable whose values are used to explain or predict the corresponding values for the response variable. Explanatory is on the x-axis; response is on the y-axis.',
  },
  {
    id: 7504,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: UNIT_NAME,
    question: 'Which of the following is true regarding the correlation coefficient, r?',
    image: null,
    options: stripOptionPrefixes([
      'A) It is always positive.',
      'B) It is affected by the units of measurement of the variables.',
      'C) It measures the strength of a non-linear relationship.',
      'D) It is always between -1 and 1, inclusive.',
      'E) A correlation of 0 implies no relationship between variables.',
    ]),
    correctAnswer: 'D',
    explanation:
      'The correlation coefficient r is unit-free and is always between -1 and 1, inclusive. A correlation of 0 means no linear relationship, not necessarily no relationship at all.',
  },
  {
    id: 7505,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: UNIT_NAME,
    question: 'What does r = -0.95 indicate about the relationship between two quantitative variables?',
    image: null,
    options: stripOptionPrefixes([
      'A) A weak, negative linear association.',
      'B) A strong, positive linear association.',
      'C) A strong, negative linear association.',
      'D) No linear association.',
      'E) A perfect non-linear association.',
    ]),
    correctAnswer: 'C',
    explanation: 'A value close to -1 indicates a strong, negative linear association.',
  },
  {
    id: 7506,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: UNIT_NAME,
    question: 'If two variables have a correlation coefficient of 0, what does this mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) They are perfectly related.',
      'B) They have no linear association.',
      'C) They have a strong positive association.',
      'D) They have a strong negative association.',
      'E) One causes the other.',
    ]),
    correctAnswer: 'B',
    explanation: 'A correlation coefficient of 0 indicates that there is no linear association. Correlation only measures linear relationships.',
  },
  {
    id: 7507,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: UNIT_NAME,
    question: 'Which of the following is true about extrapolation?',
    image: null,
    options: stripOptionPrefixes([
      'A) It is the most accurate way to make predictions.',
      'B) It involves predicting values within the range of x-values used to build the model.',
      'C) It involves predicting values outside the range of x-values used to build the model.',
      'D) It only happens in non-linear models.',
      'E) It is a required step in regression analysis.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Extrapolation is predicting a response value using an x-value beyond the interval used to determine the regression line. Extrapolated predictions are less reliable.',
  },
  {
    id: 7508,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question: 'Which of the following describes the purpose of a residual plot?',
    image: null,
    options: stripOptionPrefixes([
      'A) To determine the mean of the explanatory variable.',
      'B) To visualize the strength of a non-linear association.',
      'C) To investigate the appropriateness of the linear regression model.',
      'D) To calculate the coefficient of determination.',
      'E) To find the y-intercept of the regression line.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Residual plots are used to investigate whether the linear regression model is appropriate for the observed data. Random scatter suggests a linear model is appropriate.',
  },
  {
    id: 7509,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question: 'How are residuals calculated in simple linear regression?',
    image: null,
    options: stripOptionPrefixes([
      'A) Observed value + Predicted value',
      'B) Observed value - Predicted value',
      'C) Predicted value - Observed value',
      'D) Predicted value × Observed value',
      'E) Observed value / Predicted value',
    ]),
    correctAnswer: 'B',
    explanation:
      'A residual is the difference between the observed response value and the predicted response value: residual = y − ŷ.',
  },
  {
    id: 7510,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question: 'If a residual is negative, what does this indicate about the regression model?',
    image: null,
    options: stripOptionPrefixes([
      'A) The model underpredicted the response value.',
      'B) The model overpredicted the response value.',
      'C) The model made a perfectly accurate prediction.',
      'D) The slope of the model is negative.',
      'E) The correlation is negative.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A residual is (observed − predicted). If the residual is negative, the predicted value is greater than the observed value, meaning the model overpredicted.',
  },
  {
    id: 7511,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question: 'What does a curved pattern in a residual plot suggest?',
    image: null,
    options: stripOptionPrefixes([
      'A) A linear model is appropriate.',
      'B) The model has high correlation.',
      'C) A linear model is likely not the most appropriate model.',
      'D) The residuals are normally distributed.',
      'E) The slope is zero.',
    ]),
    correctAnswer: 'C',
    explanation:
      'Curvature in a residual plot suggests that a linear model is not the most appropriate model for the data. Residual plots should look like a random scatter for a linear model.',
  },
  {
    id: 7512,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question: 'What point must the least-squares regression line always pass through?',
    image: null,
    options: stripOptionPrefixes(['A) (0, 0)', 'B) (min x, min y)', 'C) (max x, max y)', 'D) (x̄, ȳ)', 'E) (0, a)']),
    correctAnswer: 'D',
    explanation: 'The least-squares regression line always passes through the point of averages, (x̄, ȳ).',
  },
  {
    id: 7513,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question: 'What does the coefficient of determination, r², represent?',
    image: null,
    options: stripOptionPrefixes([
      'A) The slope of the regression line.',
      'B) The proportion of variation in the response variable explained by the linear relationship with the explanatory variable.',
      'C) The strength of the correlation.',
      'D) The standard deviation of the residuals.',
      'E) The predicted value of y when x = 0.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The coefficient of determination, r², is the proportion of variation in the response variable explained by the linear relationship with the explanatory variable.',
  },
  {
    id: 7514,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question: 'In the least-squares regression equation ŷ = a + bx, what does the slope b represent?',
    image: null,
    options: stripOptionPrefixes([
      'A) The predicted value of y when x is 0.',
      'B) The predicted increase or decrease in y for each one-unit increase in x.',
      'C) The total variation in y explained by the model.',
      'D) The correlation between x and y.',
      'E) The mean value of x.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The slope b is interpreted as the predicted change in the response variable for a one-unit increase in the explanatory variable.',
  },
  {
    id: 7515,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question: 'How is the y-intercept (a) of the least-squares regression line interpreted?',
    image: null,
    options: stripOptionPrefixes([
      'A) The increase in y for every increase in x.',
      'B) The predicted value of y when x = 0.',
      'C) The mean value of y.',
      'D) The total number of observations.',
      'E) The correlation coefficient.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The y-intercept a is the predicted value of the response variable when the explanatory variable is equal to 0. It does not always have a logical interpretation in context.',
  },
]; */

export const statsUnit5McqTestQuestions: Question[] = [
  {
    id: 7501,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question:
      'A real estate agent builds a least-squares regression line to predict a home\'s sale price (y, in thousands of dollars) from its square footage (x): ŷ = 50 + 0.15x. One house in her listings has 2,000 square feet and actually sold for $380,000. What is the residual for this house?',
    image: null,
    options: stripOptionPrefixes(['A) 350', 'B) 30', 'C) -30', 'D) 0.15', 'E) 50']),
    correctAnswer: 'B',
    explanation:
      'Predicted price is ŷ = 50 + 0.15(2000) = 350 (thousand). Observed price is y = 380 (thousand). Residual is y − ŷ = 380 − 350 = 30.',
  },
  {
    id: 7502,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'A nutritionist studies the relationship between daily fiber intake (grams) and reduction in LDL cholesterol (mg/dL) among a sample of patients and finds a correlation of r = -0.80. What proportion of the variation in cholesterol reduction is explained by the linear relationship with fiber intake?',
    image: null,
    options: stripOptionPrefixes(['A) 0.20', 'B) 0.64', 'C) 0.80', 'D) 0.36', 'E) -0.64']),
    correctAnswer: 'B',
    explanation: 'The coefficient of determination is r². Here, (-0.80)² = 0.64.',
  },
  {
    id: 7516,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question:
      'The scatterplot above shows the relationship between hours studied (x) and quiz score (y) for five students, along with the least-squares regression line. Point C represents a student who studied 6 hours and scored 65 points. Which of the following is closest to the residual for this student, calculated as observed − predicted?',
    image: RESIDUAL_SCATTERPLOT,
    options: stripOptionPrefixes(['A) -20', 'B) -15', 'C) -5', 'D) 5', 'E) 15']),
    correctAnswer: 'B',
    explanation:
      'Reading the graph, the regression line passes through (0, 50) and (10, 100), so the predicted score at x = 6 is 50 + 5(6) = 80. The residual is observed − predicted = 65 − 80 = -15.',
  },
  {
    id: 7503,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'An agricultural researcher models crop yield (bushels per acre) as a function of fertilizer applied (pounds per acre). The least-squares regression line has a slope of 2.5. If a farmer increases fertilizer application by 4 pounds per acre, what is the predicted change in crop yield?',
    image: null,
    options: stripOptionPrefixes([
      'A) Increase of 2.5 bushels per acre',
      'B) Increase of 6.5 bushels per acre',
      'C) Increase of 10.0 bushels per acre',
      'D) Increase of 1.6 bushels per acre',
      'E) Decrease of 10.0 bushels per acre',
    ]),
    correctAnswer: 'C',
    explanation: 'The predicted change is slope × change in x: 2.5 × 4 = 10.0 bushels per acre.',
  },
  {
    id: 7504,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'A tutoring company studies the relationship between weekly study hours (mean x̄ = 10 hours) and exam scores (mean ȳ = 20 points above baseline) for its students. The least-squares regression line is ŷ = 5 + 1.5x. If a new student is added to the data set with exactly 10 study hours and a score of 20 points above baseline, what happens to the regression line?',
    image: null,
    options: stripOptionPrefixes([
      'A) The slope increases.',
      'B) The y-intercept decreases.',
      'C) The regression line does not change.',
      'D) The correlation increases.',
      'E) The residual sum of squares increases.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The least-squares regression line always passes through (x̄, ȳ). Adding a point exactly at (x̄, ȳ) does not change the line.',
  },
  {
    id: 7505,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'A pediatrician models the relationship between a child\'s age in years (x) and height in centimeters (y) using the equation ŷ = 10 + 2x. Which of the following is an appropriate interpretation of the y-intercept in this model?',
    image: null,
    options: stripOptionPrefixes([
      'A) The predicted height of a newborn (0 years old) is 10 cm.',
      'B) The average height of all people is 10 cm.',
      'C) For every year of age, height increases by 10 cm.',
      'D) The height of a person when they stop growing.',
      'E) The intercept has no practical meaning.',
    ]),
    correctAnswer: 'A',
    explanation: 'The y-intercept is the predicted value of y when x = 0.',
  },
  {
    id: 7517,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2', '5.4'],
    unitName: UNIT_NAME,
    question:
      'A statistics student calculates r = 0.93 for the linear relationship between two variables and constructs the residual plot shown above. Which of the following is the most appropriate conclusion?',
    image: RESIDUAL_PLOT_HIGH_R,
    options: stripOptionPrefixes([
      'A) Because r is close to 1, the linear model is appropriate despite the pattern in the residual plot.',
      'B) The residual plot shows a curved pattern, indicating that a linear model may not be appropriate even though r is close to 1.',
      'C) The correlation of 0.93 confirms that the residuals are randomly scattered.',
      'D) The curved pattern indicates that the correlation is actually negative.',
      'E) Because the residuals are all less than 10 in absolute value, the linear model provides a good fit.',
    ]),
    correctAnswer: 'B',
    explanation:
      'A high correlation does not guarantee a linear model is appropriate. The residual plot shows a clear U-shaped (curved) pattern, which indicates the true relationship is non-linear even though r is close to 1.',
  },
  {
    id: 7506,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question:
      'An economist fits a straight-line model relating a company\'s monthly advertising spend to its monthly sales revenue. When she plots the residuals against advertising spend, the residual plot shows a clear U-shaped pattern. What does this indicate?',
    image: null,
    options: stripOptionPrefixes([
      'A) The data are perfectly linear.',
      'B) The model is a good fit.',
      'C) The relationship between advertising spend and sales revenue is non-linear.',
      'D) There are no outliers.',
      'E) The correlation is -1.',
    ]),
    correctAnswer: 'C',
    explanation:
      'A curved pattern in a residual plot indicates a linear model is not appropriate.',
  },
  {
    id: 7507,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: UNIT_NAME,
    question:
      'A physics student records the time elapsed (x) and remaining battery charge (y) for a device that drains power at a perfectly constant rate. When she plots her data, every point falls exactly on a line with a negative slope. What is the correlation coefficient r for this data set?',
    image: null,
    options: stripOptionPrefixes(['A) 0', 'B) 1', 'C) -1', 'D) 0.5', 'E) -0.5']),
    correctAnswer: 'C',
    explanation: 'A perfect negative linear association has r = -1.',
  },
  {
    id: 7508,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'A real estate analyst is building a regression model relating house size to sale price for a neighborhood of modest, similarly sized homes. One enormous mansion is included in the data set, far larger and more expensive than any other house. What is the likely effect of this influential point on the least-squares regression line?',
    image: null,
    options: stripOptionPrefixes([
      'A) It has no effect.',
      'B) It pulls the line toward itself, changing the slope and intercept.',
      'C) It moves the line away from itself.',
      'D) It only changes the y-intercept.',
      'E) It only changes the slope.',
    ]),
    correctAnswer: 'B',
    explanation:
      'Influential outliers pull the least-squares regression line toward them, often substantially changing slope and intercept.',
  },
  {
    id: 7518,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2', '5.5'],
    unitName: UNIT_NAME,
    question:
      'The scatterplot above shows the relationship between two variables for 10 observations, with the least-squares regression line drawn (all 10 points, including P, were used to fit this line). If the point labeled P is removed and the regression line is refit, which of the following would most likely happen?',
    image: INFLUENTIAL_POINT_SCATTERPLOT,
    options: stripOptionPrefixes([
      'A) The slope would increase, and r would increase in magnitude.',
      'B) The slope would increase, and r would decrease in magnitude.',
      'C) The slope would decrease, and r would increase in magnitude.',
      'D) The slope would decrease, and r would decrease in magnitude.',
      'E) Neither the slope nor r would change because P is not an outlier.',
    ]),
    correctAnswer: 'A',
    explanation:
      'Point P is a high-leverage point far to the right of the main cluster and well below the pattern formed by the other 9 points. It pulls the regression line down, flattening the slope and weakening the fit. Removing P allows the line to fit the tightly linear main cluster, so the slope increases (becomes steeper) and r increases in magnitude (closer to +1).',
  },
  {
    id: 7509,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: UNIT_NAME,
    question:
      'A pediatric researcher builds a scatterplot relating children\'s height (cm) to weight, originally measured in kilograms. If she converts the weight measurements to grams (1 kg = 1,000 g) before recalculating the correlation coefficient, what happens to r?',
    image: null,
    options: stripOptionPrefixes([
      'A) r increases by 1000.',
      'B) r decreases by 1000.',
      'C) r is multiplied by 1000.',
      'D) r stays the same.',
      'E) r becomes 0.',
    ]),
    correctAnswer: 'D',
    explanation:
      'Correlation is unit-free and does not change under linear rescaling of either variable.',
  },
  {
    id: 7510,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question:
      'A teacher uses a linear model to predict a student\'s final exam score from hours spent studying. For one particular student, the residual from this model is 5. What does this residual mean?',
    image: null,
    options: stripOptionPrefixes([
      'A) The student\'s actual score was 5 points higher than the model predicted.',
      'B) The student\'s actual score was 5 points lower than the model predicted.',
      'C) The model predicted a score 5 points higher than the student actually earned.',
      'D) The correlation between study hours and score is 0.5.',
      'E) The model made a perfectly accurate prediction.',
    ]),
    correctAnswer: 'A',
    explanation:
      'Residual = observed − predicted. If the residual is 5, the observed value is 5 units higher than the predicted value.',
  },
  {
    id: 7511,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'A college admissions office studies the relationship between applicants\' SAT scores and their first-year college GPA and finds a correlation of 0.85. Which of the following statements is a correct interpretation of this result?',
    image: null,
    options: stripOptionPrefixes([
      'A) 85% of the variation in GPA is explained by the linear relationship with SAT scores.',
      'B) 72.25% of the variation in GPA is explained by the linear relationship with SAT scores.',
      'C) 85% of students\' GPAs lie exactly on the regression line.',
      'D) The slope of the regression line is 0.85.',
      'E) SAT scores and GPA have a perfectly linear relationship.',
    ]),
    correctAnswer: 'B',
    explanation: 'Explained variation is r². Here, (0.85)² = 0.7225 = 72.25%.',
  },
  {
    id: 7519,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: UNIT_NAME,
    question:
      'The scatterplot shows the relationship between the age of a used car (in years) and its value (in thousands of dollars) for a sample of 10 cars, along with the least-squares regression line. A collector wants to use this line to predict the value of a car that is 25 years old. Which of the following best explains whether this is an appropriate use of the regression line?',
    image: EXTRAPOLATION_SCATTERPLOT,
    options: stripOptionPrefixes([
      'A) Appropriate, because substituting x = 25 into the equation of the line gives a predicted value of -$28,000, which makes sense for an old car.',
      'B) Appropriate, because the correlation between age and value appears strong and negative.',
      'C) Not appropriate, because 25 years is outside the interval of ages (about 1 to 9 years) represented in the data, so the prediction would require extrapolation.',
      'D) Not appropriate, because the slope of the line is negative.',
      'E) Not appropriate, because the y-intercept of $22,000 has no meaningful interpretation.',
    ]),
    correctAnswer: 'C',
    explanation:
      'The data only cover ages from about 1 to 9 years. Using the line to predict at x = 25 requires extrapolating far beyond the observed x-values, which is unreliable — as shown by the nonsensical negative predicted value in choice A.',
  },
  {
    id: 7512,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'A marketing analyst fits a regression model relating monthly advertising budget to monthly sales using data from a sample of 50 franchise stores. The calculated slope is 0.5 with a standard error of 0.1. What is the t-statistic for testing whether the true slope differs from 0?',
    image: null,
    options: stripOptionPrefixes(['A) 0.05', 'B) 0.5', 'C) 5', 'D) 0.1', 'E) 50']),
    correctAnswer: 'C',
    explanation: 'The t-statistic for slope is b / SE(b) = 0.5 / 0.1 = 5.',
  },
  {
    id: 7513,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: UNIT_NAME,
    question:
      'A botanist wants to study how the amount of daily sunlight a plant receives affects its height, so she plans to construct a scatterplot using data collected from a greenhouse experiment. Which of the following is true regarding how she should set up this scatterplot?',
    image: null,
    options: stripOptionPrefixes([
      'A) Plant height (the response variable) is always on the x-axis.',
      'B) Sunlight exposure (the explanatory variable) is always on the x-axis.',
      'C) The axes must be measured in the same units.',
      'D) The points must form a straight line.',
      'E) The correlation must be positive.',
    ]),
    correctAnswer: 'B',
    explanation:
      'By convention, the explanatory variable is on the x-axis and the response variable is on the y-axis.',
  },
  {
    id: 7514,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: UNIT_NAME,
    question:
      'An engineer fits a straight-line model relating the temperature of a metal rod to its length, using the "least-squares" method to determine the line of best fit. What is the primary goal of this method?',
    image: null,
    options: stripOptionPrefixes([
      'A) To maximize the correlation.',
      'B) To minimize the sum of the squares of the residuals.',
      'C) To make the y-intercept 0.',
      'D) To force the line to pass through the origin.',
      'E) To make the slope equal to 1.',
    ]),
    correctAnswer: 'B',
    explanation:
      'The least-squares regression line minimizes the sum of squared residuals.',
  },
  {
    id: 7520,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: UNIT_NAME,
    question:
      'Of the following scatterplots, which shows a correlation coefficient r closest to -0.9?',
    image: CORRELATION_COMPARISON_PLOTS,
    options: stripOptionPrefixes(['A) Plot A', 'B) Plot B', 'C) Plot C', 'D) Plot D', 'E) Plot E']),
    correctAnswer: 'B',
    explanation:
      'Plot B shows a tight, strongly negative linear pattern with almost no scatter around the trend, consistent with r ≈ -0.9. Plot A is strongly positive, Plot C is only moderately negative, Plot D shows almost no linear association, and Plot E is weakly negative.',
  },
  {
    id: 7515,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: UNIT_NAME,
    question:
      'A quality control engineer builds a model relating a machine\'s input settings to its output measurements. When she checks the model against every observation in her data set, she finds that every single residual equals 0. What does this tell her about the data?',
    image: null,
    options: stripOptionPrefixes([
      'A) The correlation is 0.',
      'B) The model is non-linear.',
      'C) Every data point lies exactly on the regression line.',
      'D) The sample size is too small.',
      'E) The slope is 0.',
    ]),
    correctAnswer: 'C',
    explanation:
      'If every residual is 0, observed values equal predicted values for all points, so all points lie on the regression line.',
  },
];
