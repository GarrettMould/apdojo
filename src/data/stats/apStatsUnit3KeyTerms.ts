import type { KeyTerm } from '../allContent';

/**
 * AP Statistics — Unit 3: Inference for Categorical Data: Proportions
 * Comprehensive Vocabulary List (Updated Fall 2026 CED)
 */
export const apStatsUnit3KeyTerms: KeyTerm[] = [
  // 3.1
  {
    id: 'point-estimator-categorical',
    term: 'Point Estimator',
    definition:
      'A sample statistic used to estimate the value of an unknown population parameter. For categorical data, the sample proportion p̂ serves as the point estimator for the population proportion p.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'A single value calculated from sample data; it represents our best baseline guess of the true parameter.',
    ],
  },
  {
    id: 'unbiased-estimator-categorical',
    term: 'Unbiased Estimator',
    definition:
      'An estimator whose sampling distribution has a mean equal to the true value of the population parameter being estimated; on average, it does not systematically underestimate or overestimate the parameter.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Unbiasedness describes the center of the estimator’s long-run sampling distribution, not the accuracy of a single sample statistic.',
    ],
  },
  {
    id: 'biased-estimator-categorical',
    term: 'Biased Estimator',
    definition:
      'An estimator that systematically overestimates or underestimates the true population parameter across repeated sampling because the center of its sampling distribution does not equal the parameter.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Bias is a structural flaw in how an estimator behaves in the long run, often caused by bad sampling designs or an unrepresentative framework.',
    ],
  },
  {
    id: 'population-parameter-categorical',
    term: 'Population Parameter',
    definition:
      'A fixed, typically unknown numerical characteristic of an entire population, such as the true population proportion p.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1', '3.2'],
    subNotes: [
      'Always represented by standard letters (like p) rather than symbols with hats or bars, which are reserved for samples.',
    ],
  },
  {
    id: 'sample-statistic-categorical',
    term: 'Sample Statistic',
    definition:
      'A numerical value computed from a specific sample that describes a characteristic of that sample and is used to estimate the parameter.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Statistics vary from sample to sample due to sampling variability, unlike parameters which are fixed.',
    ],
  },
  {
    id: 'variability-categorical',
    term: 'Variability',
    definition:
      'The spread or dispersion of a statistic’s values across a collection of different data points or across repeated realizations of a sampling distribution.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1', '3.2'],
    subNotes: [
      'An ideal estimator balances low bias with low variability to provide consistently accurate predictions.',
    ],
  },
  {
    id: 'data-collection-methods-categorical',
    term: 'Data Collection Methods',
    definition:
      'The foundational techniques used to acquire measurements or data points, categorized broadly into observational studies and experiments.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'The choice of collection method dictates whether results can establish a causal link or if they can merely generalize to a population.',
    ],
  },

  // 3.2
  {
    id: 'causal-relationship-categorical',
    term: 'Causal Relationship',
    definition:
      'A direct link between variables where changes in an explanatory variable are shown to actively force or generate changes in a response variable.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.7'],
    subNotes: [
      'Can only be confidently established via a well-designed, randomized experiment where treatments are forced onto units.',
    ],
  },
  {
    id: 'experiment-categorical',
    term: 'Experiment',
    definition:
      'A statistical study design where researchers deliberately impose specific conditions or treatments on experimental units to observe their effects on a response.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.6', '3.7'],
    subNotes: [
      'Differs from an observational study because the investigator actively alters environment or action rather than just tracking baseline traits.',
    ],
  },
  {
    id: 'experimental-unit-categorical',
    term: 'Experimental Unit',
    definition:
      'The smallest individual entity or object to which a specific treatment condition is randomly assigned within an experiment.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.6', '3.7'],
    subNotes: [
      'When these entities are humans, they are formally termed subjects or participants.',
    ],
  },
  {
    id: 'generalization-categorical',
    term: 'Generalization',
    definition:
      'The process of extending empirical conclusions derived from a sample data set to a broader, unmeasured target population.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.7'],
    subNotes: [
      'This extension is only statistically valid if the sample group was selected using a verified random sampling mechanism.',
    ],
  },
  {
    id: 'observational-study-categorical',
    term: 'Observational Study',
    definition:
      'A study design where researchers track traits and gather data from a sample without imposing any treatments or manipulating assignments.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Useful for identifying natural real-world associations, but cannot verify definitive causal relationships due to confounding.',
    ],
  },
  {
    id: 'prospective-study-categorical',
    term: 'Prospective Study',
    definition:
      'An observational approach where a sample group is identified in the present and tracked forward into the future to monitor outcomes over time.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Excellent for reducing recall errors, but often requires significant time and cost resources compared to historical reviews.',
    ],
  },
  {
    id: 'retrospective-study-categorical',
    term: 'Retrospective Study',
    definition:
      'An observational approach where individuals are sampled based on a current condition, and researchers look back at historical records or past data.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Efficient for studying rare conditions or immediate analysis since all relevant actions have already occurred.',
    ],
  },
  {
    id: 'randomly-selected-categorical',
    term: 'Randomly Selected',
    definition:
      'A process where every individual member of a target population has a known, equal chance of being picked to join a sample group.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.7'],
    subNotes: [
      'Eliminates selection bias and provides the foundational representative baseline needed for population generalization.',
    ],
  },
  {
    id: 'representative-sample-categorical',
    term: 'Representative Sample',
    definition:
      'A sample whose key demographics and compositional traits closely mirror those of the entire population from which it was extracted.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.7'],
    subNotes: [
      'Random selection naturally yields representative groups over long-run trials, shielding studies from bias.',
    ],
  },
  {
    id: 'sample-survey-categorical',
    term: 'Sample Survey',
    definition:
      'A specific type of observational study where data are gathered from a distinct subset of human individuals using a uniform questionnaire.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'The accuracy of a survey depends on both clear question design and rigorous random sampling deployment.',
    ],
  },
  {
    id: 'treatment-categorical',
    term: 'Treatment',
    definition:
      'A specific environmental state, action, or condition artificially forced onto an experimental unit by a researcher.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.7'],
    subNotes: [
      'Can be formed by a single explanatory factor level, or a combination of multiple factor levels simultaneously.',
    ],
  },
  {
    id: 'variable-categorical',
    term: 'Variable',
    definition:
      'Any characteristic or measured trait that changes or takes on different values from one individual or observational unit to another.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Classified fundamentally as either categorical (qualitative) or quantitative (numerical) depending on its data format.',
    ],
  },
  {
    id: 'categorical-variable-unit3',
    term: 'Categorical Variable',
    definition:
      'A variable that groups observational units into distinct classes or descriptive labels rather than recording a numerical measurement.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.3', '3.5', '3.9', '3.10', '3.12', '3.14'],
    subNotes: [
      'Examples include blood types, response options like yes/no, or classification categories. Form the focus of Unit 3 proportion tests.',
    ],
  },
  {
    id: 'independent-samples-categorical',
    term: 'Independent Samples',
    definition:
      'Two or more separate sample groups where the individuals chosen or data values gathered from one group have no statistical influence over the choices or values in the other group.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.9'],
    subNotes: [
      'This independence is a vital condition for calculating standard errors in two-sample proportion procedures.',
    ],
  },
  {
    id: 'mean-sampling-distribution-one-prop',
    term: 'Mean of the Sampling Distribution of p̂',
    definition:
      'The expected value of all possible sample proportions from samples of size n, denoted by μ_p̂, which is equal to the true population proportion p when sampled values are independent.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.9'],
    subNotes: ['This equality (μ_p̂ = p) formally demonstrates that p̂ is an unbiased estimator.'],
  },
  {
    id: 'standard-deviation-sampling-distribution-one-prop',
    term: 'Standard Deviation of the Sampling Distribution of p̂',
    definition:
      'A measure of the variability of the sample proportion across repeated independent samples of size n, calculated using the formula σ_p̂ = √(p(1 − p) / n).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.9'],
    subNotes: [
      'This formula requires independent observations. When sampling without replacement, the 10% condition must be met to use it safely.',
    ],
  },
  {
    id: 'ten-percent-condition-categorical',
    term: '10% Condition',
    definition:
      'A condition checked when sampling without replacement, requiring that the sample size n be less than or equal to 10% of the population size N (n ≤ 10%N).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.3', '3.5', '3.10', '3.12', '3.14'],
    subNotes: [
      'Verifying this allows us to use the standard deviation formula for a sampling distribution, even though a tiny amount of dependence is introduced by not replacing units.',
    ],
  },
  {
    id: 'large-counts-condition-one-prop',
    term: 'Normality Condition for p̂ (Large Counts)',
    definition:
      'The requirement that the expected number of successes (np ≥ 10) and expected number of failures (n(1 − p) ≥ 10) are both at least 10, ensuring the sampling distribution of p̂ is approximately normal.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.5', '3.9', '3.12'],
    subNotes: [
      'Use the true population proportion p or hypothesized value p₀ here. For confidence intervals where p is unknown, we substitute the observed counts instead.',
    ],
  },
  {
    id: 'sampling-distribution-broad-categorical',
    term: 'Sampling Distribution',
    definition:
      'The theoretical probability distribution displaying the value of a statistic across every single possible random sample of a fixed size n from a given population.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.3', '3.5', '3.9', '3.10', '3.12'],
    subNotes: [
      'Forms the foundational conceptual bridge linking raw descriptive statistics to population-level inference.',
    ],
  },
  {
    id: 'sampling-with-replacement-categorical',
    term: 'Sampling with Replacement',
    definition:
      'A selection strategy where an individual unit is drawn from the population, its data recorded, and then immediately returned to the population pool before the next unit is picked.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.9'],
    subNotes: [
      'Maintains perfect statistical independence between successive selections, meaning the population size does not restrict calculations.',
    ],
  },
  {
    id: 'sampling-without-replacement-categorical',
    term: 'Sampling without Replacement',
    definition:
      'A selection strategy where each chosen individual unit is removed from the population pool permanently after its data is pulled.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.2', '3.3', '3.5', '3.9', '3.10', '3.12', '3.14'],
    subNotes: [
      'Alters probabilities slightly on each draw, forcing us to check the 10% condition to treat observations as practically independent.',
    ],
  },

  // 3.3 & 3.4
  {
    id: 'one-sample-z-interval-proportion',
    term: 'One-Sample z-Interval for a Population Proportion',
    definition:
      'The statistical inference procedure used to estimate an unknown population proportion p using a single random sample.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Calculated as p̂ ± z*√(p̂(1 − p̂) / n). Always state the parameter clearly in context.',
    ],
  },
  {
    id: 'standard-error-one-proportion',
    term: 'Standard Error of p̂',
    definition:
      'An estimate of the standard deviation of the sampling distribution of a statistic, calculated when the true parameter value is unknown. For one proportion, SE_p̂ = √(p̂(1 − p̂) / n).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Quantifies the typical amount that the sample statistic p̂ varies from the population parameter p in repeated samples.',
    ],
  },
  {
    id: 'margin-of-error-one-proportion',
    term: 'Margin of Error (MOE)',
    definition:
      'Half the width of a confidence interval, calculated as the critical value times the standard error: z*√(p̂(1 − p̂) / n). It shows the maximum expected distance between the point estimate and the true parameter.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3', '3.4'],
    subNotes: [
      'Does not account for systematic errors like selection bias, nonresponse bias, or response bias.',
    ],
  },
  {
    id: 'critical-value-categorical',
    term: 'Critical Value (z*)',
    definition:
      'A multiplier based on the standard normal distribution that marks the boundaries enclosing the middle C% of the distribution for a specified confidence level.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Common critical values include z* = 1.96 for a 95% confidence level and z* = 1.645 for a 90% confidence level.',
    ],
  },
  {
    id: 'confidence-interval-core-def',
    term: 'Confidence Interval',
    definition:
      'A range of plausible values computed from sample data that is likely to encompass an unknown population parameter.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3', '3.4', '3.10', '3.11'],
    subNotes: [
      'Formed broadly by taking a point estimate and adding or subtracting a calculated margin of error.',
    ],
  },
  {
    id: 'confidence-level-core-def',
    term: 'Confidence Level',
    definition:
      'The long-run success rate of an estimation method, representing the percentage of intervals that will successfully capture the true parameter across infinitely repeated identical sampling conditions.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3', '3.4'],
    subNotes: [
      'Describes the reliability of the system/process, not the probability of any single completed interval.',
    ],
  },
  {
    id: 'independence-condition-categorical',
    term: 'Independence',
    definition:
      'The structural assumption or verified state where individual sample measurements do not alter or depend on one another, usually managed via random selection or group formatting.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3', '3.5', '3.10', '3.12', '3.14'],
    subNotes: [
      'Violating this core condition fundamentally compromises the validity of calculated standard error formulas.',
    ],
  },
  {
    id: 'number-of-successes-observed',
    term: 'Number of Successes',
    definition:
      'The concrete count of favorable outcomes observed within a sample group, computed as np̂ for intervals or np₀ under a null hypothesis check.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3', '3.5'],
    subNotes: [
      'Must clear a minimum threshold value of 10 to satisfy basic normal distribution model assumptions.',
    ],
  },
  {
    id: 'number-of-failures-observed',
    term: 'Number of Failures',
    definition:
      'The concrete count of unfavorable or alternative outcomes within a sample group, evaluated as n(1 − p̂) for intervals or n(1 − p₀) during testing setup.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3', '3.5'],
    subNotes: [
      'Checked alongside successes to ensure a distribution is not skewed too extremely to support normal approximation methods.',
    ],
  },
  {
    id: 'standard-normal-distribution-unit3',
    term: 'Standard Normal Distribution',
    definition:
      'A specific normal curve possessing a mean value of 0 and a fixed standard deviation value of 1, providing the critical z* benchmarks for intervals.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Proportion inference scales directly to this z-distribution because we model categorical metrics as standardized counts.',
    ],
  },
  {
    id: 'claim-categorical',
    term: 'Claim',
    definition:
      'An assertion or speculative statement concerning the true value of an unknown population parameter that can be verified using statistical evidence.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.4'],
    subNotes: [
      'We test claims by observing if their stated values reside inside or outside computed confidence intervals.',
    ],
  },
  {
    id: 'width-confidence-interval',
    term: 'Width of a Confidence Interval',
    definition:
      'The full distance or numeric spread span between the absolute upper bound and absolute lower bound of a confidence interval, equivalent to twice the margin of error.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.4'],
    subNotes: [
      'Can be compressed by increasing sample size n or by accepting a lower confidence level percentage.',
    ],
  },
  {
    id: 'confidence-interval-interpretation',
    term: 'Confidence Interval Interpretation',
    definition:
      'A formal statement capturing plausible values for the parameter: "We are C% confident that the interval from a to b captures the true [parameter in context]."',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.4', '3.11'],
    subNotes: [
      'The interval itself provides a range of plausible values that can be used as evidence to evaluate a claim about a population.',
    ],
  },
  {
    id: 'confidence-level-interpretation',
    term: 'Confidence Level Interpretation',
    definition:
      'A statement regarding the reliability of the estimation method: "In repeated random sampling with the same sample size, approximately C% of the calculated intervals will capture the true population proportion."',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.4', '3.11'],
    subNotes: [
      'A confidence level describes the long-run capture rate of the method, not the probability that a specific calculated interval contains the parameter.',
    ],
  },

  // 3.5, 3.6, 3.7 & 3.8
  {
    id: 'one-sample-z-test-proportion',
    term: 'One-Sample z-Test for a Population Proportion',
    definition:
      'A statistical test used to evaluate a claim about a single population proportion by comparing an observed sample proportion to a null hypothesized value p₀.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.5', '3.7'],
    subNotes: ['Test statistic: z = (p̂ − p₀) / √(p₀(1 − p₀) / n).'],
  },
  {
    id: 'null-hypothesis-categorical',
    term: 'Null Hypothesis (H₀)',
    definition:
      'The baseline statement about a population parameter that is assumed to be correct unless convincing statistical evidence dictates otherwise; represents a state of equality or no change.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.5', '3.6', '3.7', '3.8', '3.12', '3.13', '3.14', '3.15'],
    subNotes: [
      'For a single proportion test, it is structured as H₀: p = p₀. Always write hypotheses using population parameters, never sample statistics.',
    ],
  },
  {
    id: 'alternative-hypothesis-categorical',
    term: 'Alternative Hypothesis (Hₐ)',
    definition:
      'The researcher’s claim or belief about a population parameter for which convincing statistical evidence is being gathered.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.5', '3.6', '3.7', '3.12', '3.14'],
    subNotes: ['Can be one-sided (Hₐ: p > p₀ or Hₐ: p < p₀) or two-sided (Hₐ: p ≠ p₀).'],
  },
  {
    id: 'significance-level-categorical',
    term: 'Significance Level (α)',
    definition:
      'The predetermined threshold probability used to decide whether a p-value provides strong enough evidence to reject the null hypothesis; it is the probability of committing a Type I error.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.7', '3.8', '3.13', '3.15'],
    subNotes: ['If p-value ≤ α, reject H₀. If p-value > α, fail to reject H₀.'],
  },
  {
    id: 'one-sided-hypothesis-prop',
    term: 'One-Sided Alternative Hypothesis',
    definition:
      'An alternative hypothesis that specifies a definitive direction of deviation from the null value (e.g., Hₐ: p > p₀ or Hₐ: p < p₀).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.5', '3.12'],
    subNotes: [
      'Concentrates the full alpha region into a single tail of the null distribution curve, shifting calculation limits.',
    ],
  },
  {
    id: 'two-sided-hypothesis-prop',
    term: 'Two-Sided Alternative Hypothesis',
    definition:
      'An alternative hypothesis stating that the parameter differs from the null value in either direction (Hₐ: p ≠ p₀).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.5', '3.12'],
    subNotes: [
      'Splits the alpha significance region evenly across both tails of the reference normal model curve.',
    ],
  },
  {
    id: 'statistical-inference-broad',
    term: 'Statistical Inference',
    definition:
      'The analytical framework of utilizing sample statistics along with probability theory to draw formal conclusions about unknown populations.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.5', '3.7', '3.12', '3.14'],
    subNotes: [
      'In Unit 3, this practice manifests as creating confidence intervals or executing significance tests.',
    ],
  },
  {
    id: 'p-value-categorical',
    term: 'p-Value',
    definition:
      'The probability of obtaining a test statistic as extreme or more extreme than the observed value, in the direction of the alternative hypothesis, assuming that the null hypothesis is true.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6', '3.7', '3.13', '3.15'],
    subNotes: [
      'A small p-value indicates that the observed sample data would be highly unusual if the null hypothesis were true, providing evidence for Hₐ.',
    ],
  },
  {
    id: 'null-distribution-prop',
    term: 'Null Distribution',
    definition:
      'The specific sampling distribution modeled under the absolute structural assumption that the null hypothesis claim is perfectly true.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6'],
    subNotes: [
      'Acts as the vital baseline scale used to isolate exactly how unusual our real-world sample looks.',
    ],
  },
  {
    id: 'probability-model-unit3',
    term: 'Probability Model',
    definition:
      'A formal mathematical framework that matches all possible experimental outcomes with their long-run chances of occurrence.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6', '3.15'],
    subNotes: [
      'Proportion hypothesis tests rely on normal curves as their default mathematical model.',
    ],
  },
  {
    id: 'theoretical-distribution-prop',
    term: 'Theoretical Distribution',
    definition:
      'An idealized, continuous mathematical density curve model used to approximate a true sampling distribution, bypassing empirical simulation.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6'],
    subNotes: [
      'The standard normal z-curve serves as the theoretical distribution for categorical proportion test statistics.',
    ],
  },
  {
    id: 'significance-test-prop',
    term: 'Significance Test',
    definition:
      'A formal, standardized procedure that weights sample evidence to decide between competing null and alternative claims.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6', '3.7', '3.13', '3.15'],
    subNotes: [
      'Operates by converting raw statistics into standardized test scores linked to precise tail areas.',
    ],
  },
  {
    id: 'test-statistic-general-prop',
    term: 'Test Statistic',
    definition:
      'A standardized value computed from sample statistics measuring exactly how many standard errors an observed sample lands away from a null value.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6', '3.7', '3.13', '3.15'],
    subNotes: [
      'Follows the general framework format of: (Statistic − Parameter value under H₀) / Standard Error.',
    ],
  },
  {
    id: 'z-statistic-one-prop',
    term: 'z-Statistic (z-Test)',
    definition:
      'The specific standardized test statistic used for population proportion evaluations, assuming standard normal parameters apply.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.6', '3.7'],
    subNotes: [
      'Measures exactly how far p̂ sits from p₀ in units of the hypothesized standard deviation.',
    ],
  },
  {
    id: 'generalize-experimental-context',
    term: 'Generalize (Experiments)',
    definition:
      'Extending experimental findings outward to a larger scope, a move restricted strictly to populations displaying matching initial traits when dealing with volunteers.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.7'],
    subNotes: [
      'Since experiments typically use voluntary subjects, we can only generalize to individuals who match those background traits.',
    ],
  },
  {
    id: 'random-assignment-inference-link',
    term: 'Random Assignment',
    definition:
      'The sorting of experimental units into treatment groups using chance, which evens out extraneous variables and limits confounding.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.7'],
    subNotes: [
      'Crucial step needed to validate cause-and-effect conclusions from data.',
    ],
  },
  {
    id: 'statistically-significant-prop',
    term: 'Statistically Significant',
    definition:
      'A result whose calculated p-value lands below the alpha threshold, making it too extreme to safely credit to random sampling chance alone.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.7'],
    subNotes: [
      'Triggers the formal statistical action to reject the null hypothesis and support the alternative claim.',
    ],
  },
  {
    id: 'reject-the-null-hypothesis-action',
    term: 'Reject the Null Hypothesis',
    definition:
      'The final statistical decision executed when a p-value is smaller than or equal to alpha, indicating convincing evidence exists for the alternative.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.7', '3.13', '3.15'],
    subNotes: [
      'Never write that you "accept the alternative as fact" or "proved the alternative"; always frame outcomes as supporting evidence.',
    ],
  },
  {
    id: 'statistical-evidence-definition',
    term: 'Statistical Evidence',
    definition:
      'The empirical weight of facts delivered by a p-value or interval that systematically guides an analyst to support or drop a hypothesis.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.7'],
    subNotes: [
      'A high p-value does not provide evidence that H₀ is true; it simply shows a lack of evidence to drop it.',
    ],
  },
  {
    id: 'type-i-error-categorical',
    term: 'Type I Error',
    definition:
      'An error that occurs when a hypothesis test finds convincing evidence for the alternative hypothesis (Hₐ), leading to the rejection of a null hypothesis (H₀) that is actually true.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.8'],
    subNotes: ['The probability of a Type I error is exactly equal to the significance level α.'],
  },
  {
    id: 'type-ii-error',
    term: 'Type II Error',
    definition:
      'An error that occurs when a hypothesis test fails to find convincing evidence for the alternative hypothesis, but the alternative hypothesis is actually true (failing to reject a false null hypothesis).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.8'],
    subNotes: ['The probability of a Type II error is equal to 1 − power.'],
  },
  {
    id: 'power-hypothesis-test',
    term: 'Power',
    definition:
      'The probability that a hypothesis test will correctly reject a false null hypothesis.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.8'],
    subNotes: [
      'Power can be increased by increasing the sample size or increasing the significance level α.',
    ],
  },

  // 3.9, 3.10 & 3.11
  {
    id: 'mean-sampling-distribution-diff-prop',
    term: 'Mean of the Sampling Distribution of p̂₁ − p̂₂',
    definition:
      'The expected value of the difference between two independent sample proportions, denoted by μ_(p̂₁ − p̂₂), which is equal to the true difference between the two population proportions (p₁ − p₂).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.9'],
    subNotes: [
      'This proves that the difference between two sample proportions is an unbiased estimator for the difference between two population proportions.',
    ],
  },
  {
    id: 'standard-deviation-sampling-distribution-diff-prop',
    term: 'Standard Deviation of the Sampling Distribution of p̂₁ − p̂₂',
    definition:
      'A measure of the variability of the difference between two independent sample proportions across repeated samples, calculated as σ_(p̂₁ − p̂₂) = √(p₁(1 − p₁) / n₁ + p₂(1 − p₂) / n₂).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.9'],
    subNotes: [
      'This formula is strictly used when the true population proportions (p₁ and p₂) are known or assumed, and requires that the samples are independent of each other.',
    ],
  },
  {
    id: 'large-counts-condition-diff-prop',
    term: 'Normality Condition for p̂₁ − p̂₂',
    definition:
      'The requirement that the expected number of successes and failures for both independent samples are all at least 10 (n₁p₁ ≥ 10, n₁(1 − p₁) ≥ 10, n₂p₂ ≥ 10, and n₂(1 − p₂) ≥ 10), ensuring the sampling distribution of the difference is approximately normal.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.9', '3.12'],
    subNotes: [
      'If the data come from a randomized experiment rather than random samples, the same threshold of 10 applies to the expected counts per treatment group.',
    ],
  },
  {
    id: 'difference-in-population-proportions',
    term: 'Difference in Proportions (p₁ − p₂)',
    definition:
      'The static population parameter representing the true spatial gap between two baseline categorical group probabilities.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.9', '3.10', '3.11'],
    subNotes: [
      'The primary structural parameter estimated via a two-sample categorical confidence interval.',
    ],
  },
  {
    id: 'difference-in-sample-proportions-statistic',
    term: 'Difference in Sample Proportions (p̂₁ − p̂₂)',
    definition:
      'The point estimate statistic derived by subtracting one calculated sample proportion from another.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.9', '3.13'],
    subNotes: [
      'Serves as the raw baseline measure that anchors the center of the two-sample z-test score calculations.',
    ],
  },
  {
    id: 'independent-populations-definition',
    term: 'Independent Populations',
    definition:
      'Two target collection groups whose background traits or subject assignments display zero structural overlap or communication links.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.9'],
    subNotes: [
      'A necessary condition to prevent cross-group covariance from disrupting standard deviation formulas.',
    ],
  },
  {
    id: 'two-sample-z-interval-long-def',
    term: 'Two-Sample z-Interval for the Difference Between Population Proportions',
    definition:
      'The statistical inference procedure used to estimate the true difference between two population proportions (p₁ − p₂) based on data from two independent random samples or a randomized experiment.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.10'],
    subNotes: [
      'Formula: (p̂₁ − p̂₂) ± z*√(p̂₁(1 − p̂₁) / n₁ + p̂₂(1 − p̂₂) / n₂).',
    ],
  },
  {
    id: 'standard-error-diff-proportions',
    term: 'Standard Error for the Difference Between Two Proportions',
    definition:
      'An estimate of the standard deviation of the sampling distribution of p̂₁ − p̂₂, calculated when the true population parameters are unknown: SE_(p̂₁ − p̂₂) = √(p̂₁(1 − p̂₁) / n₁ + p̂₂(1 − p̂₂) / n₂).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.10'],
    subNotes: [
      'This formula quantifies the typical variation observed between the two sample proportions in repeated independent trials.',
    ],
  },
  {
    id: 'normality-condition-two-sample-interval',
    term: 'Normality Condition for a Two-Sample z-Interval',
    definition:
      'The requirement that the observed number of successes and failures in both samples are all at least 10 (n₁p̂₁ ≥ 10, n₁(1 − p̂₁) ≥ 10, n₂p̂₂ ≥ 10, and n₂(1 − p̂₂) ≥ 10).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.10'],
    subNotes: [
      'Unlike hypothesis testing, confidence intervals use the observed sample counts of successes and failures because the true population proportions are completely unknown.',
    ],
  },
  {
    id: 'success-failure-condition-two-sample',
    term: 'Success-Failure Condition',
    definition:
      'The explicit requirement that all descriptive categorical buckets contain at least 10 observations to clear normal curve conditions.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.10'],
    subNotes: [
      'In a two-sample interval, this check is anchored purely to observed sample data because parameters are unknown.',
    ],
  },
  {
    id: 'simple-random-sample-core-definition',
    term: 'Simple Random Sample (SRS)',
    definition:
      'A sample size n picked from a population where every possible subset group of that size shares the exact same chance of being chosen.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.10', '3.12', '3.14'],
    subNotes: [
      'The gold standard choice for avoiding bias and maximizing data independence checks.',
    ],
  },
  {
    id: 'zero-in-confidence-interval-proportions',
    term: 'Justifying a Claim of Difference Using a Confidence Interval',
    definition:
      'An inference method where if a C% confidence interval for p₁ − p₂ contains 0, there is insufficient evidence to conclude a difference exists; if the interval does not contain 0, there is sufficient evidence of a difference.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.11'],
    subNotes: [
      'If the entire interval contains only positive values, it provides convincing evidence that p₁ > p₂. If entirely negative, it implies p₁ < p₂.',
    ],
  },

  // 3.12 & 3.13
  {
    id: 'two-sample-z-test-proportions',
    term: 'Two-Sample z-Test for the Difference Between Two Population Proportions',
    definition:
      'The statistical test used to evaluate a claim of a difference between two population proportions by evaluating independent random samples or a randomized experiment.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.12', '3.13'],
    subNotes: [
      'The null hypothesis states there is no difference (H₀: p₁ = p₂ or H₀: p₁ − p₂ = 0).',
    ],
  },
  {
    id: 'combined-pooled-proportion',
    term: 'Combined (or Pooled) Proportion (p̂_c)',
    definition:
      'The overall proportion of successes across both groups combined, calculated under the assumption that the null hypothesis is true: p̂_c = (n₁p̂₁ + n₂p̂₂) / (n₁ + n₂) = total successes / total sample size.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.12', '3.13'],
    subNotes: [
      'Used strictly for calculating the standard error and checking the normality condition in a two-sample z-test for a difference between proportions.',
    ],
  },
  {
    id: 'test-statistic-two-sample-prop',
    term: 'Test Statistic for a Two-Sample z-Test of Proportions',
    definition:
      'The standardized score measuring the distance between the observed sample difference and the hypothesized difference of 0, calculated as z = (p̂₁ − p̂₂) / √(p̂_c(1 − p̂_c)) · √(1/n₁ + 1/n₂).',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.13'],
    subNotes: [
      'This z-statistic follows a standard normal distribution when the null hypothesis of equal population proportions is true.',
    ],
  },

  // 3.14 & 3.15
  {
    id: 'chi-square-statistic',
    term: 'χ² (Chi-Square) Statistic',
    definition:
      'A test statistic that measures the overall distance between observed cell counts and the counts expected under a specific null hypothesis in a two-way table, defined as χ² = Σ (Observed − Expected)² / Expected.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14', '3.15'],
    subNotes: [
      'Chi-square values are always positive and follow a distribution skewed to the right, becoming more symmetric as the degrees of freedom increase.',
    ],
  },
  {
    id: 'chi-square-test-homogeneity',
    term: 'χ² Test for Homogeneity',
    definition:
      'A significance test used to determine whether the distributions of a single categorical variable differ across two or more independent populations or treatment groups.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14', '3.15'],
    subNotes: [
      'The null hypothesis states there is no difference in the distribution of the categorical variable across the targeted populations.',
    ],
  },
  {
    id: 'chi-square-test-independence',
    term: 'χ² Test for Independence',
    definition:
      'A significance test used to determine whether there is an association between row and column categorical variables measured within a single population sample.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14', '3.15'],
    subNotes: [
      'The null hypothesis states that the two categorical variables are independent (not associated) in the targeted population.',
    ],
  },
  {
    id: 'expected-counts-condition-chi-square',
    term: 'Expected Counts Condition (Chi-Square)',
    definition:
      'A condition requiring that all expected counts in each cell of a two-way table are greater than 5 (Expected ≥ 5) under the assumption that the null hypothesis is true.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14', '3.15'],
    subNotes: [
      'This check applies entirely to the calculated expected counts, not the raw observed sample counts.',
    ],
  },
  {
    id: 'expected-count-formula-two-way',
    term: 'Expected Count Calculation',
    definition:
      'The formula used to determine the cell counts expected under the null hypothesis in a two-way table: Expected Count = (Row Total × Column Total) / Total Table Count.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14', '3.15'],
    subNotes: [
      'These expected counts represent what distributions would look like if perfect independence or homogeneity existed in the data set.',
    ],
  },
  {
    id: 'degrees-of-freedom-chi-square',
    term: 'Degrees of Freedom (df) for a Two-Way Table',
    definition:
      'The parameter that identifies the specific chi-square distribution curve based on the dimensions of a contingency table, calculated as df = (r − 1)(c − 1), where r is the number of rows and c is the number of columns.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.15'],
    subNotes: [
      'Crucial for determining the correct p-value from a chi-square distribution table or using graphing calculators.',
    ],
  },
  {
    id: 'association-categorical-def',
    term: 'Association',
    definition:
      'A statistical relationship between variables where knowing the categorical assignment of one variable provides meaningful information about the distribution or likelihood of another.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14'],
    subNotes: [
      'Association does not instantly imply causation; it simply identifies a baseline pattern of shared variation.',
    ],
  },
  {
    id: 'categorical-data-general-def',
    term: 'Categorical Data',
    definition:
      'Counts or qualitative values that code individual observations into unranked or descriptive grouping labels rather than continuous numbers.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14'],
    subNotes: [
      'Analyzed natively using frequencies and two-way cross-tabulation structures.',
    ],
  },
  {
    id: 'chi-square-distribution-curve-def',
    term: 'Chi-Square Distribution',
    definition:
      'A continuous, family of probability density curves skewed heavily to the right, uniquely shaped by specific degrees of freedom.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.15'],
    subNotes: [
      'As degrees of freedom grow larger, the curve naturally shifts more open and begins to mirror a standard normal curve layout.',
    ],
  },
  {
    id: 'distribution-broad-def',
    term: 'Distribution',
    definition:
      'The structural map outlining all possible values a variable can record, alongside how frequently those specific occurrences surface.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14'],
    subNotes: [
      'Can be evaluated visually using tables, counts, relative percentages, or dedicated graphical plots.',
    ],
  },
  {
    id: 'observed-count-definition',
    term: 'Observed Count',
    definition:
      'The real, factual sample frequencies gathered directly from a study data set and recorded within the cells of a contingency table.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.15'],
    subNotes: [
      'These represent raw empirical data, untouched by any baseline null hypothesis assumptions.',
    ],
  },
  {
    id: 'homogeneity-categorical-def',
    term: 'Homogeneity',
    definition:
      'The specific relational state where the proportional breakdown of a categorical variable remains perfectly uniform across separate target populations.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14'],
    subNotes: [
      'Tested directly by cross-comparing multiple standalone sample populations rather than collecting metrics on a single cohort.',
    ],
  },
  {
    id: 'row-column-variables-def',
    term: 'Row and Column Variables',
    definition:
      'The two distinct categorical dimensions crossed within a contingency matrix layout to inspect structural cross-interactions.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14'],
    subNotes: [
      'One variable defines horizontal lines while the alternate controls vertical buckets to split up collected totals.',
    ],
  },
  {
    id: 'stratified-random-sample-def',
    term: 'Stratified Random Sample',
    definition:
      'A sampling method where a population is broken into homogeneous groups called strata, and separate simple random samples are drawn from each stratum.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14'],
    subNotes: [
      'Helps guarantee equal representation across minor background subsets, reducing total sampling noise.',
    ],
  },
  {
    id: 'two-way-table-contingency-def',
    term: 'Two-Way Table',
    definition:
      'A contingency matrix cross-tabulating frequency counts for two categorical variables across a grid of intersecting cells.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.14', '3.15'],
    subNotes: [
      'The essential structural data layout required to initiate multi-categorical chi-square assessments.',
    ],
  },
  {
    id: 'research-question-definition',
    term: 'Research Question',
    definition:
      'The formal, contextual inquiry statement tracking an active problem that a data-driven statistical test is purposefully built to address.',
    subject: 'ap_statistics',
    unit: 3,
    lessonIDs: ['3.15'],
    subNotes: [
      'Dictates the foundational boundaries that fix how hypotheses are worded and how group profiles get categorized.',
    ],
  },
];
