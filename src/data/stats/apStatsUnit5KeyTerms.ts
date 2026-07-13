import type { KeyTerm } from '../allContent';

/**
 * AP Statistics — Unit 5: Inference for Quantitative Data: Slopes
 * Key Terms List (Bivariate Data & Linear Regression)
 */
export const apStatsUnit5KeyTerms: KeyTerm[] = [
  // 5.1
  {
    id: 'u5_bivariate_quantitative_data',
    term: 'Bivariate quantitative data',
    definition:
      'A data set consisting of observations of two different quantitative variables measured on the same individuals in a sample or population.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Formed by coordinate pairs (x, y) where both metrics capture numerical counts or physical scales.',
    ],
  },
  {
    id: 'u5_cluster',
    term: 'Cluster',
    definition:
      'Concentrations of data usually separated by gaps in a distribution.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Clusters often indicate the presence of hidden categorical subgroups within the broader dataset.',
    ],
  },
  {
    id: 'u5_direction',
    term: 'Direction',
    definition:
      'The type of association between two variables in a scatter plot, described as positive or negative.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Classified strictly as positive or negative based on the upward or downward slant of the data cloud.',
    ],
  },
  {
    id: 'u5_explanatory_variable',
    term: 'Explanatory variable',
    definition:
      'A variable whose values are used to explain or predict corresponding values for the response variable.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1', '5.3', '5.5'],
    subNotes: [
      'Its values are treated as the given conditions used to explain variance in the accompanying response metric.',
    ],
  },
  {
    id: 'u5_form',
    term: 'Form',
    definition:
      'The pattern or shape of the relationship between two variables in a scatter plot, such as linear or non-linear.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Categorized broadly as linear or non-linear depending on whether the rate of change is constant or curved.',
    ],
  },
  {
    id: 'u5_linear',
    term: 'Linear',
    definition:
      'A form of association in a scatter plot where the points follow a straight-line pattern.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Avoid saying "the points form a line"; instead, explain that the trend advances at a fixed, uniform rate.',
    ],
  },
  {
    id: 'u5_negative_association',
    term: 'Negative association',
    definition:
      'A relationship between two variables where as values of one variable increase, values of the other variable tend to decrease.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'On a graph, a negative trend shows an overarching data track that paths downward from left to right.',
    ],
  },
  {
    id: 'u5_non_linear',
    term: 'Non-linear',
    definition:
      'A form of association in a scatter plot where the points do not follow a straight-line pattern.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Standard simple linear equations are inappropriate for optimizing or tracking curved bivariate shapes.',
    ],
  },
  {
    id: 'u5_outlier',
    term: 'Outlier',
    definition:
      'Data points that are unusually small or large relative to the rest of the data.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Can drastically manipulate distance averages and model tracks depending on its specific placement.',
    ],
  },
  {
    id: 'u5_positive_association',
    term: 'Positive association',
    definition:
      'A relationship between two variables where as values of one variable increase, values of the other variable tend to increase.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Visually recognized as a coordinate cloud that slants consistently upward from left to right.',
    ],
  },
  {
    id: 'u5_response_variable',
    term: 'Response variable',
    definition:
      'A variable whose values are being explained or predicted based on the explanatory variable.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1', '5.3', '5.5'],
    subNotes: [
      'The dependent variable whose internal variation is the main property we seek to explain.',
    ],
  },
  {
    id: 'u5_scatter_plot',
    term: 'Scatter plot',
    definition:
      'A graph that displays the relationship between two quantitative variables using points plotted on a coordinate plane.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'The indispensable initial tool used to diagnose form, direction, strength, and anomalies.',
    ],
  },
  {
    id: 'u5_strength',
    term: 'Strength',
    definition:
      'A measure of how closely individual points in a scatter plot follow a specific pattern, described as strong, moderate, or weak.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.1'],
    subNotes: [
      'Linguistically classified as strong, moderate, or weak depending on the amount of scattered noise.',
    ],
  },

  // 5.2
  {
    id: 'u5_causation',
    term: 'Causation',
    definition:
      'A relationship where changes in one variable directly cause changes in another variable.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.2'],
    subNotes: [
      'Can never be verified by observing high correlation alone; requires well-designed, randomized experiments.',
    ],
  },
  {
    id: 'u5_correlation',
    term: 'Correlation',
    definition:
      'A numerical measure (r) that describes the strength and direction of a linear relationship between two variables, ranging from -1 to 1.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.2', '5.5'],
    subNotes: [
      'Sign tracks the direction, while absolute proximity to 1 validates the relative strength of the linear model.',
    ],
  },
  {
    id: 'u5_linear_model',
    term: 'Linear model',
    definition:
      'A mathematical representation of the linear relationship between two variables.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.2', '5.4'],
    subNotes: [
      'Employed to standardize, interpret, and calculate estimated behaviors across a linear domain space.',
    ],
  },
  {
    id: 'u5_linear_relationship',
    term: 'Linear relationship',
    definition:
      'A relationship between two variables that can be described by a straight line.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.2'],
    subNotes: [
      'The singular target pattern designed to be evaluated by the correlation metric r.',
    ],
  },
  {
    id: 'u5_quantitative_variable',
    term: 'Quantitative variable',
    definition:
      'A variable that is measured numerically and can take on a range of values, allowing for mathematical operations and statistical analysis.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.2'],
    subNotes: [
      'Must possess measurable units, separating it from group label definitions like zip codes or names.',
    ],
  },

  // 5.3
  {
    id: 'u5_extrapolation',
    term: 'Extrapolation',
    definition:
      'Predicting a response value using a value for the explanatory variable that is beyond the range of x-values used to create the regression model, resulting in less reliable predictions.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.3'],
    subNotes: [
      'Highly suspect because we cannot confirm that the uniform rate of change persists beyond our sample parameters.',
    ],
  },
  {
    id: 'u5_least_squares_regression_line',
    term: 'Least-squares regression line',
    definition:
      'A linear model that minimizes the sum of squared residuals to find the best-fitting line through a set of data points.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.3', '5.5'],
    subNotes: [
      'This path is mathematically locked into intersecting the precise group coordinate mean center (x̄, ȳ).',
    ],
  },
  {
    id: 'u5_linear_regression_model',
    term: 'Linear regression model',
    definition:
      'An equation that uses an explanatory variable to predict a response variable in a linear relationship.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.3'],
    subNotes: [
      'The core tool used to mathematically describe stable straight bivariate relationships.',
    ],
  },
  {
    id: 'u5_predicted_value',
    term: 'Predicted value',
    definition:
      'The estimated response value obtained from a regression model, denoted as ŷ.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.3', '5.4', '5.5'],
    subNotes: [
      'Represents an idealized model expectation along the trend line rather than a factual empirical tracking point.',
    ],
  },
  {
    id: 'u5_slope',
    term: 'Slope',
    definition:
      'The value b in the regression equation ŷ = a + bx, representing the rate of change in the predicted response for each unit increase in the explanatory variable.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.3', '5.5'],
    subNotes: [
      'Requires tentative framing like "predicted expansion" or "on average" to secure full AP context credit.',
    ],
  },
  {
    id: 'u5_y_intercept',
    term: 'y-intercept',
    definition:
      'The value a in the regression equation ŷ = a + bx, representing the predicted response value when the explanatory variable equals zero.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.3', '5.5'],
    subNotes: [
      'Often maps to an illogical baseline condition if an input value of zero represents a physical or structural impossibility.',
    ],
  },

  // 5.4
  {
    id: 'u5_actual_value',
    term: 'Actual value',
    definition:
      'The observed or measured response value in a dataset, denoted as y.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.4'],
    subNotes: [
      'Serves as the concrete data factual baseline used to judge the relative accuracy of model trends.',
    ],
  },
  {
    id: 'u5_bivariate_data',
    term: 'Bivariate data',
    definition:
      'Data involving two variables, typically represented as ordered pairs (x, y) to examine the relationship between them.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.4'],
    subNotes: [
      'Can link categorical groups (Unit 2) or explore numerical patterns via scatterplots (Unit 5).',
    ],
  },
  {
    id: 'u5_form_of_association',
    term: 'Form of association',
    definition:
      'The pattern or type of relationship between two variables, such as linear, curved, or no relationship.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.4'],
    subNotes: [
      'Identifying the form dictates whether fitting a simple linear equation is mathematically logical.',
    ],
  },
  {
    id: 'u5_randomness_in_residuals',
    term: 'Randomness in residuals',
    definition:
      'The absence of a clear pattern in a residual plot, indicating that a linear model is appropriate for the data.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.4'],
    subNotes: [
      'The absence of clear shapes or bends in error tracking confirms a steady, linear trend rate.',
    ],
  },
  {
    id: 'u5_residual',
    term: 'Residual',
    definition:
      'The difference between the actual observed value and the predicted value in a regression model, calculated as residual = y − ŷ.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.4', '5.5'],
    subNotes: [
      'Positive values reveal the line underpredicted reality; negative results index an overprediction trend.',
    ],
  },
  {
    id: 'u5_residual_plot',
    term: 'Residual plot',
    definition:
      'A scatterplot of the residuals against the explanatory variable, used to assess whether a linear model is appropriate.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.4'],
    subNotes: [
      'Any visible curvature or expansion pattern signals that standard linear formulas are mathematically flawed.',
    ],
  },

  // 5.5
  {
    id: 'u5_coefficient_of_determination',
    term: 'Coefficient of determination',
    definition:
      'The value r², which represents the proportion of variation in the response variable that is explained by the explanatory variable in the regression model.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.5'],
    subNotes: [
      'Interpreted uniformly via the script: "X% of the variation in response is accounted for by the linear relationship with input."',
    ],
  },
  {
    id: 'u5_coefficients',
    term: 'Coefficients',
    definition:
      'The numerical values in a regression equation that represent the slope and y-intercept of the least-squares regression line.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.5'],
    subNotes: [
      'Extracted from software printouts to assemble the tracking model equation ŷ = a + bx.',
    ],
  },
  {
    id: 'u5_parameter',
    term: 'Parameter',
    definition:
      'A numerical summary that describes a characteristic of an entire population.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.5'],
    subNotes: [
      'Remains hidden in empirical practice; our sample coefficients act as provisional estimates for these metrics.',
    ],
  },
  {
    id: 'u5_sample_standard_deviation',
    term: 'Sample standard deviation',
    definition:
      'The standard deviation calculated for a sample, denoted by s.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.5'],
    subNotes: [
      'Used to manually compute line slopes when coupled with correlation metrics via b = r(s_y / s_x).',
    ],
  },
  {
    id: 'u5_simple_linear_regression',
    term: 'Simple linear regression',
    definition:
      'A regression model that describes the linear relationship between one explanatory variable and one response variable.',
    subject: 'ap_statistics',
    unit: 5,
    lessonIDs: ['5.5'],
    subNotes: [
      'Restricted entirely to single variable pairings, separating it from advanced multi-variable tracking procedures.',
    ],
  },
];
