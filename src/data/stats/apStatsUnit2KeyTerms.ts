import type { KeyTerm } from '../allContent';

/** Lesson-level study tips for Unit 2 (keyed by lesson id, e.g. "2.1"). */
export type StatsLessonStudyTips = Record<string, string[]>;

export const apStatsUnit2StudyTips: StatsLessonStudyTips = {
  '2.1': [
    'Visual vs. Numerical: Tables are the source of truth for raw counts, but graphs reveal the story of the relationship at a glance.',
    'Choose the Right Graph: Use side-by-side bar charts for raw frequency comparison and segmented or mosaic plots to compare proportions when group sizes differ.',
  ],
  '2.2': [
    'The "Given" Denominator: When calculating conditional relative frequencies, the total of the given group (the row or column) is your denominator.',
    "Justification: Don't just claim an association exists; cite the specific percentage difference between groups to back it up.",
  ],
  '2.3': [
    'The "Gold Standard": Simulations require more trials to reach accuracy. Always note that more trials reduce the impact of random luck.',
    'Structure: Follow the steps: assign digits, describe the trial, record counts, and calculate the relative frequency.',
  ],
  '2.4': [
    'Complement Shortcut: If you need to find the probability of "at least one," calculate 1 − P(none).',
    'Sanity Check: Theoretical probabilities must always sum to 1 and be between 0 and 1 inclusive.',
  ],
  '2.5': [
    'The Litmus Test: To prove two events are mutually exclusive, you must show the joint probability P(A ∩ B) = 0.',
    'Venn Visuals: If circles overlap, they are not mutually exclusive.',
  ],
  '2.6': [
    'Denominator Watch: The event after the "given" bar (|) is always the denominator.',
    'Sequence Logic: Think of the General Multiplication Rule as a two-step story: P(A) · P(B|A) is the probability of A happening, then B happening given that A has already occurred.',
  ],
};

/**
 * AP Statistics — Unit 2: Probability, Random Variables, and Probability Distributions
 */
export const apStatsUnit2KeyTerms: KeyTerm[] = [
  // 2.1
  {
    id: 'bivariate-categorical-data',
    term: 'Bivariate Categorical Data',
    definition:
      'Data involving two distinct categorical variables measured on the same observational units.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },
  {
    id: 'two-way-table',
    term: 'Two-Way Table (Contingency Table)',
    definition:
      'A table used to organize frequencies or relative frequencies for two categorical variables, with one variable forming rows and the other forming columns.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },
  {
    id: 'cell-two-way-table',
    term: 'Cell',
    definition:
      'The intersection of a row and a column in a two-way table, containing the count of individuals fitting both categories.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },
  {
    id: 'side-by-side-bar-chart',
    term: 'Side-by-Side Bar Chart',
    definition:
      'A graph grouping bars for each category to allow direct comparison of frequencies across levels of another variable.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },
  {
    id: 'segmented-bar-chart',
    term: 'Segmented Bar Chart',
    definition:
      'A chart where bars are stacked into a single bar representing 100% of the category, allowing for comparison of proportions regardless of group size.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },
  {
    id: 'mosaic-plot',
    term: 'Mosaic Plot',
    definition:
      'A specialized segmented bar chart where bar width is proportional to the sample size of the group.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },
  {
    id: 'association-categorical',
    term: 'Association',
    definition:
      'A relationship identified when the distribution of one categorical variable differs across the levels of the other.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.1'],
  },

  // 2.2
  {
    id: 'joint-relative-frequency',
    term: 'Joint Relative Frequency',
    definition: 'The ratio of a specific cell frequency to the total count for the entire table.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.2'],
  },
  {
    id: 'marginal-relative-frequency',
    term: 'Marginal Relative Frequency',
    definition: 'A row or column total divided by the total for the entire table.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.2'],
  },
  {
    id: 'conditional-relative-frequency',
    term: 'Conditional Relative Frequency',
    definition:
      'A relative frequency computed by restricting focus to a specific category; a cell frequency divided by its specific row or column total.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.2'],
  },
  {
    id: 'independence-categorical',
    term: 'Independence',
    definition:
      'A state where the distribution of one categorical variable is identical across all levels of the other; the variables are not associated.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.2'],
  },
  {
    id: 'association-justification',
    term: 'Justification',
    definition:
      'Using specific summary statistics as evidence to defend a claim about the variables in context.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.2'],
  },

  // 2.3
  {
    id: 'random-process',
    term: 'Random Process',
    definition: 'Any procedure that generates results determined by chance.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },
  {
    id: 'outcome-random-process',
    term: 'Outcome',
    definition: 'The specific result of one trial of a random process.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },
  {
    id: 'event-probability',
    term: 'Event',
    definition: 'A collection of specific outcomes.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },
  {
    id: 'simulation-probability',
    term: 'Simulation',
    definition:
      'A model of a random process used to estimate probabilities that are difficult to calculate directly.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },
  {
    id: 'long-run-relative-frequency',
    term: 'Long-Run Relative Frequency',
    definition:
      'The probability of an event, defined as its relative frequency over a very large number of trials.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },
  {
    id: 'law-of-large-numbers',
    term: 'Law of Large Numbers (LLN)',
    definition:
      'The principle stating that as the number of independent trials increases, the empirical relative frequency converges toward the true probability.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },
  {
    id: 'empirical-data',
    term: 'Empirical Data',
    definition: 'Data determined from actual observations or simulations.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.3'],
  },

  // 2.4
  {
    id: 'sample-space',
    term: 'Sample Space (S)',
    definition: 'The set of all possible, non-overlapping outcomes.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.4'],
  },
  {
    id: 'theoretical-probability',
    term: 'Theoretical Probability (P(E))',
    definition:
      'The ratio of the number of outcomes in event E to the total number of outcomes in the sample space (when outcomes are equally likely).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.4'],
  },
  {
    id: 'complement-event',
    term: "Complement (E^C or E')",
    definition: 'The event consisting of all outcomes in the sample space not in E.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.4'],
  },
  {
    id: 'complement-rule',
    term: 'Complement Rule',
    definition: 'The calculation P(E^C) = 1 − P(E).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.4'],
  },

  // 2.5
  {
    id: 'mutually-exclusive',
    term: 'Mutually Exclusive (Disjoint)',
    definition: 'Events that cannot occur at the same time.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.5'],
  },
  {
    id: 'joint-probability',
    term: 'Joint Probability',
    definition: 'The probability of the intersection of two events (P(A ∩ B)).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.5'],
  },
  {
    id: 'intersection-events',
    term: 'Intersection',
    definition: 'The outcomes common to both events.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.5'],
  },

  // 2.6
  {
    id: 'conditional-probability',
    term: 'Conditional Probability (P(A|B))',
    definition: 'The probability that event A will occur, given that B has already occurred.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.6'],
  },
  {
    id: 'conditional-probability-formula',
    term: 'Conditional Formula',
    definition: 'P(A|B) = P(A ∩ B) / P(B).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.6'],
  },
  {
    id: 'general-multiplication-rule',
    term: 'General Multiplication Rule',
    definition:
      'The formula for the probability that both A and B occur: P(A ∩ B) = P(A) · P(B|A).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.6'],
  },
  {
    id: 'dependent-events',
    term: 'Dependent Events',
    definition:
      'Events where the outcome of one event changes the probability of the other.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.6'],
  },

  // 2.7
  {
    id: 'independent-events',
    term: 'Independent Events',
    definition:
      'Two events are independent if the occurrence of one does not change the probability of the other.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.7'],
  },
  {
    id: 'multiplication-rule-independence',
    term: 'Multiplication Rule for Independence',
    definition:
      'If events A and B are independent, the joint probability is the product of their individual probabilities: P(A ∩ B) = P(A) · P(B).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.7'],
  },
  {
    id: 'union-of-events',
    term: 'Union of Events (A ∪ B)',
    definition: 'The event that A occurs, B occurs, or both occur.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.7'],
  },
  {
    id: 'general-addition-rule',
    term: 'General Addition Rule',
    definition:
      'The formula for finding the probability of a union: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.7'],
  },

  // 2.8
  {
    id: 'random-variable',
    term: 'Random Variable',
    definition:
      'A variable whose values are numerical outcomes resulting from a random phenomenon.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },
  {
    id: 'discrete-random-variable',
    term: 'Discrete Random Variable',
    definition:
      'A random variable that can only take on a countable or finite number of values.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },
  {
    id: 'probability-distribution',
    term: 'Probability Distribution',
    definition:
      'A representation (graph, table, or function) showing the probability associated with every possible value of a discrete random variable.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },
  {
    id: 'sum-of-probabilities-property',
    term: 'Sum of Probabilities Property',
    definition:
      'The fundamental rule that the sum of the probabilities over all possible values of a discrete random variable must equal 1.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },
  {
    id: 'cumulative-probability-distribution',
    term: 'Cumulative Probability Distribution',
    definition:
      'A representation showing the probability of the random variable being less than or equal to each value.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },
  {
    id: 'random-phenomenon',
    term: 'Random Phenomenon',
    definition: 'A process that generates numerical outcomes determined by chance.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },
  {
    id: 'construction-methods-distribution',
    term: 'Construction Methods',
    definition:
      'Discrete probability distributions can be determined through the rules of probability or estimated via simulation.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.8'],
  },

  // 2.9
  {
    id: 'parameter-distribution',
    term: 'Parameter',
    definition:
      'A numerical value that measures a characteristic of a probability distribution of a random variable or a population.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
  },
  {
    id: 'fixed-value-parameter',
    term: 'Fixed Value',
    definition:
      'The property that a parameter is a single, constant value, unlike a statistic which varies from sample to sample.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
  },
  {
    id: 'expected-value-mean',
    term: 'Expected Value (Mean)',
    definition:
      'A parameter denoted by E(X) or μ_X that represents the long-run average outcome of a random variable.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
    subNotes: ['Formula: μ_X = Σ x_i · P(x_i).'],
  },
  {
    id: 'expected-value-formula',
    term: 'Expected Value Formula',
    definition:
      'Calculated as μ_X = Σ x_i · P(x_i), where x_i is a possible value and P(x_i) is its probability.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
  },
  {
    id: 'standard-deviation-distribution',
    term: 'Standard Deviation of a Distribution',
    definition:
      'A parameter denoted by SD(X) or σ_X that measures the typical deviation of the values of the random variable from the mean.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
    subNotes: ['Formula: σ_X = √(Σ(x_i − μ_X)² · P(x_i)).'],
  },
  {
    id: 'standard-deviation-formula-rv',
    term: 'Standard Deviation Formula',
    definition: 'Calculated as σ_X = √(Σ(x_i − μ_X)² · P(x_i)).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
  },
  {
    id: 'variance-random-variable',
    term: 'Variance',
    definition:
      'The square of the standard deviation of a random variable, denoted as V(X) or σ_X².',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.9'],
  },

  // 2.10
  {
    id: 'binomial-random-variable',
    term: 'Binomial Random Variable',
    definition:
      'A discrete random variable that counts the number of successes in a fixed number of independent trials.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },
  {
    id: 'success-failure-binomial',
    term: 'Success/Failure',
    definition: 'The two possible, mutually exclusive outcomes of a single trial in a binomial setting.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },
  {
    id: 'independence-of-trials',
    term: 'Independence of Trials',
    definition:
      'The requirement that the outcome of one trial does not affect the probability of success in any other trial.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },
  {
    id: 'binomial-mean',
    term: 'Binomial Mean (μ_X)',
    definition: 'The parameter for the expected number of successes, calculated as np.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },
  {
    id: 'binomial-standard-deviation',
    term: 'Binomial Standard Deviation (σ_X)',
    definition:
      'The parameter measuring the spread of the number of successes, calculated as √(np(1 − p)).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },
  {
    id: 'binomial-probability-function',
    term: 'Binomial Probability Function',
    definition:
      'The formula P(X = x) = (n choose x) p^x (1 − p)^(n−x), used to find the probability of exactly x successes in n trials.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },
  {
    id: 'binomial-parameters',
    term: 'Binomial Parameters',
    definition:
      'The specific values n (number of trials) and p (probability of success) that define a unique binomial distribution.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.10'],
  },

  // 2.11
  {
    id: 'continuous-random-variable',
    term: 'Continuous Random Variable',
    definition:
      'A variable that takes on any value in a domain; probabilities are associated with intervals.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'normal-distribution',
    term: 'Normal Distribution',
    definition: 'A continuous, unimodal, bell-shaped, and symmetric model.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'normal-curve-parameters',
    term: 'Normal Curve Parameters',
    definition: 'The mean (μ) and standard deviation (σ).',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'standard-normal-distribution',
    term: 'Standard Normal Distribution',
    definition: 'A normal distribution where μ = 0 and σ = 1.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'empirical-rule',
    term: 'Empirical Rule (68-95-99.7 Rule)',
    definition: 'A heuristic for estimating areas under the normal curve.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'area-under-the-curve',
    term: 'Area Under the Curve',
    definition:
      'The representation of probability; the total area under the curve is always 1.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'z-score',
    term: 'Z-score',
    definition:
      'A standardized score indicating distance from the mean in units of standard deviation.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },
  {
    id: 'percentile',
    term: 'Percentile',
    definition:
      'A measure of relative position based on the proportion of values below a given point.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.11'],
  },

  // 2.12
  {
    id: 'sampling-distribution-statistic',
    term: 'Sampling Distribution of a Statistic',
    definition:
      'The distribution of all possible values of a statistic for samples of a given size from a population.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.12'],
  },
  {
    id: 'simulation-sampling-distribution',
    term: 'Simulation of Sampling Distribution',
    definition: 'Using random sampling to approximate a sampling distribution.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.12'],
  },
  {
    id: 'randomization-distribution',
    term: 'Randomization Distribution',
    definition:
      'A distribution generated by repeatedly reallocating response values to treatment groups to approximate a sampling distribution.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.12'],
  },
  {
    id: 'central-limit-theorem',
    term: 'Central Limit Theorem (CLT)',
    definition:
      'The statement that the sampling distribution of a sample mean is approximately normal for sufficiently large samples.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.12'],
  },
  {
    id: 'sample-size-effect-clt',
    term: 'Sample Size Effect',
    definition:
      'The property that a larger sample size improves the normal approximation provided by the CLT.',
    subject: 'ap_statistics',
    unit: 2,
    lessonIDs: ['2.12'],
  },
];
