import type { KeyTerm } from '../allContent';

/**
 * AP Statistics — Unit 4: Inference for Quantitative Data: Means
 * Unified Key Terms List (Procedural & Foundational Framework Alignment)
 */
export const apStatsUnit4KeyTerms: KeyTerm[] = [
  // ==========================================
  // TOPIC 4.1: Sampling Distributions for Sample Means
  // ==========================================
  {
    id: 'mean-sampling-distribution-means',
    term: 'Mean of the Sampling Distribution of x̄',
    definition:
      'The average or long-run center value tracking all possible sample means computed from repeated random samples of a fixed size n, denoted by μ_x̄. It is structurally equal to the true baseline population mean μ.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1'],
    subNotes: [
      'This formal identity (μ_x̄ = μ) establishes that the sample mean behaves as a perfectly unbiased estimator for the target population mean.',
    ],
  },
  {
    id: 'standard-deviation-sampling-distribution-means',
    term: 'Standard Deviation of the Sampling Distribution of x̄',
    definition:
      'A precise measure of the spread or variation that sample means exhibit across repeated independent trials of a fixed size n, defined mathematically by the curve formula σ_x̄ = σ / √n.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1'],
    subNotes: [
      'This parameter quantifies the long-run noise of your estimation system. It requires data independence or checking the 10% condition when operating without replacement.',
    ],
  },
  {
    id: 'central-limit-theorem-means',
    term: 'Central Limit Theorem (CLT)',
    definition:
      'A foundational statistical principle stating that for any underlying population distribution shape, the sampling distribution of x̄ approaches an approximately normal model as the sample size grows sufficiently large (n ≥ 30).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1'],
    subNotes: [
      'Crucial concept: The CLT is exclusively about the shape of the sampling distribution of the statistic, not the sample data distribution or the parent population shape.',
    ],
  },
  {
    id: 'normal-distribution-means',
    term: 'Normal Distribution',
    definition:
      'A continuous, symmetric, unimodal probability distribution characterized by a perfect mound-shaped curve whose absolute center and spread are governed completely by its mean (μ) and standard deviation (σ).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.6', '4.7', '4.10'],
    subNotes: [
      'Acts as the underlying probability blueprint for continuous metrics when sample sizes are sufficiently massive or the parent population is inherently symmetrical.',
    ],
  },
  {
    id: 'parameter-means-general',
    term: 'Parameter',
    definition:
      'A static, numerical summary value that describes a fixed structural trait of an entire target population, such as the true population mean μ.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.6', '4.7', '4.11', '4.12'],
    subNotes: [
      'Parameters are typically unknown in practice, which is why we must build confidence intervals or perform significance tests to make inferences about them.',
    ],
  },
  {
    id: 'population-means-general',
    term: 'Population',
    definition:
      'The entire comprehensive collection of individual elements, subjects, or items possessing attributes an analyst wishes to study and draw formal conclusions about.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.3', '4.8'],
    subNotes: [
      'The parameters we seek to capture belong entirely to this group, which is usually too vast to measure completely.',
    ],
  },
  {
    id: 'population-distribution-means-core',
    term: 'Population Distribution',
    definition:
      'The landscape configuration of a quantitative variable displaying all values and their formatting frequencies across every single individual entity that comprises the parent population.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.6'],
    subNotes: [
      'Students must never confuse the population distribution layout with either the raw sample data distribution or the long-run sampling distribution of the statistic.',
    ],
  },
  {
    id: 'population-mean-mu',
    term: 'Population Mean (μ)',
    definition:
      'The true arithmetic average value computed across all individual members of an entire targeted population.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.8'],
    subNotes: [
      'The fixed, ideal center target that sample means (x̄) seek to estimate via inference procedures.',
    ],
  },
  {
    id: 'population-means-mu1-mu2',
    term: 'Population Means (μ₁ and μ₂)',
    definition:
      'The respective mathematical averages belonging to two distinct target populations that are being systematically cross-evaluated for structural gaps.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10'],
    subNotes: [
      'Form the directional core targets modeled in two-sample t significance tests and estimation intervals.',
    ],
  },
  {
    id: 'population-size-capital-n',
    term: 'Population Size (N)',
    definition:
      'The total cumulative count of all standalone individual entities or items that make up the absolute targeted population under inspection.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1'],
    subNotes: [
      'Represented by the capital letter N, which scales our checks for the 10% safety condition when sampling without replacement.',
    ],
  },
  {
    id: 'probability-means-foundational',
    term: 'Probability',
    definition:
      'The long-run relative frequency of a specific empirical outcome occurring across an infinite number of identical random repetitions, bounded between 0 and 1.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.6', '4.11', '4.12'],
    subNotes: [
      'Serves as the foundational mathematical language used to calculate tail areas and define precise p-values under a true null model.',
    ],
  },
  {
    id: 'random-sampling-with-replacement-means',
    term: 'Random Sampling with Replacement',
    definition:
      'A method of picking data points where an individual unit is selected from the population, measured, and then returned to the main pool before the next unit is chosen.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.6'],
    subNotes: [
      'This collection approach preserves pristine statistical independence between trials, ensuring that the theoretical standard error parameters do not experience mathematical decay.',
    ],
  },
  {
    id: 'random-sampling-without-replacement-means',
    term: 'Random Sampling without Replacement',
    definition:
      'A method of picking data points where an individual entity is permanently held out of the population pool after selection, changing subsequent selection probabilities.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.4', '4.6', '4.7', '4.9'],
    subNotes: [
      'This requires verifying that our sample size represents no more than 10% of the entire population landscape to maintain practical independence properties.',
    ],
  },
  {
    id: 'sample-mean-xbar',
    term: 'Sample Mean (x̄)',
    definition:
      'The calculated average value extracted from a specific sample group of size n, used as our baseline focal point estimator for the unknown population parameter μ.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.5', '4.6', '4.7', '4.10'],
    subNotes: [
      'Subject to sampling variability, meaning its value fluctuates naturally across different sample extractions.',
    ],
  },
  {
    id: 'sample-size-n',
    term: 'Sample Size (n)',
    definition:
      'The total number of individual observations, counts, or measurements gathered within a single collected sample dataset.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.3', '4.4', '4.6', '4.8'],
    subNotes: [
      'Denoted by the lowercase letter n. Directly influences standard error scaling via an inverse square root relationship.',
    ],
  },
  {
    id: 'sampling-distribution-means-core',
    term: 'Sampling Distribution',
    definition:
      'The theoretical probability distribution displaying the exact value layout of a sample statistic across every single possible random sample combination of a fixed size n.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.4', '4.5', '4.6', '4.7', '4.9', '4.10'],
    subNotes: [
      'The core conceptual model enabling us to cross-link an observed sample statistic to a generalized population curve pattern.',
    ],
  },
  {
    id: 'standard-deviation-sigma-means',
    term: 'Standard Deviation (σ)',
    definition:
      'The typical distance or average spread pattern that values land away from their central mean within a population context.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.6', '4.7', '4.9', '4.11', '4.12'],
    subNotes: [
      'When this population value is unknown, we must drop standard normal z models and implement Student\'s t procedures using the sample standard deviation s instead.',
    ],
  },
  {
    id: 'quantitative-variable-means',
    term: 'Quantitative Variable',
    definition:
      'A characteristic or measured numerical attribute that counts a physical quantity or scale where arithmetic operations like computing an average make logical sense.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1', '4.2', '4.4', '4.6', '4.7', '4.9', '4.10'],
    subNotes: [
      'Unlike Unit 3 categorical proportions, Unit 4 focuses entirely on analyzing numerical metrics such as continuous time, weights, or physical lengths.',
    ],
  },
  {
    id: 'patterns-in-data-means',
    term: 'Patterns in Data',
    definition:
      'Observable regularities, clusters, or systemic paths that surface within a quantitative data layout under visual or mathematical inspection.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1'],
    subNotes: [
      'We use formal inference procedures to ensure that observed data trends mirror structural population changes rather than mere random sampling noise.',
    ],
  },
  {
    id: 'variation-sampling-noise',
    term: 'Variation',
    definition:
      'The natural, non-systematic fluctuations observed in sample statistics from sample to sample due strictly to the operations of chance mechanics.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.1'],
    subNotes: [
      'Variation is not an analytical mistake; it is an inherent property of random sampling that statistical inference is specifically built to model.',
    ],
  },

  // ==========================================
  // TOPIC 4.2: Constructing a Confidence Interval for a Population Mean
  // ==========================================
  {
    id: 'student-t-distribution-means',
    term: 't-Distribution',
    definition:
      'A symmetric, continuous, bell-shaped family of standardized density curves that possess thicker, heavier tails than a standard normal z-curve, uniquely calibrated by degrees of freedom.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.5', '4.7', '4.10'],
    subNotes: [
      'We use t-models because substituting the sample standard deviation s for the unknown population standard deviation σ introduces extra variation into our test statistics.',
    ],
  },
  {
    id: 'degrees-of-freedom-means',
    term: 'Degrees of Freedom (df)',
    definition:
      'The baseline shape parameter tracking independent pieces of variation left over in a sample calculation, computed as df = n − 1 for a basic one-sample numerical cohort.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.5', '4.7', '4.10'],
    subNotes: [
      'As your degrees of freedom parameter increases, the corresponding t-curve narrows down and converges onto the standard normal z-curve layout.',
    ],
  },
  {
    id: 'one-sample-t-interval',
    term: 'One-Sample t-Interval for a Population Mean',
    definition:
      'A statistical estimation procedure used to isolate a range of plausible values for an unknown population mean μ based on a single random sample group.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2'],
    subNotes: [
      'Constructed via the structural framework formula: x̄ ± t*(s / √n). Always ensure you declare the targeted parameter clearly in context.',
    ],
  },
  {
    id: 'matched-pairs-t-interval',
    term: 'One-Sample t-Interval for a Population Mean Difference',
    definition:
      'An inference estimation procedure applied to two dependent, paired data sets where the calculation simplifies down to analyzing a single sample of differences (denoted by x̄_d).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2'],
    subNotes: [
      'Commonly seen in pre-test vs. post-test experimental designs. You must state a clear order of subtraction when defining the parameter μ_d.',
    ],
  },
  {
    id: 'sample-data-condition-means',
    term: 'Sample Data Condition (Normality for Means)',
    definition:
      'The requirement that the population layout must be normal, the sample size must be large (n ≥ 30), or a small sample (n < 30) must exhibit a distribution free from severe skew or outliers.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.4', '4.7', '4.9', '4.10'],
    subNotes: [
      'This condition is non-negotiable for justifying that the sampling distribution can be safely modeled using a t-distribution curve.',
    ],
  },
  {
    id: 'standard-error-sample-mean',
    term: 'Standard Error of the Mean',
    definition:
      'An estimate of the true standard deviation of a sample mean’s sampling distribution, calculated when the true population standard deviation σ is unknown, using the formula SE_x = s / √n.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.5', '4.6', '4.7', '4.10'],
    subNotes: [
      'Quantifies the typical distance that a sample mean x will vary from the actual population mean μ across repeated samples.',
    ],
  },
  {
    id: 'margin-of-error-means',
    term: 'Margin of Error (MOE for Means)',
    definition:
      'The calculated spatial bound extending on either side of a point estimate, computed as the critical value times the standard error: t*(s / √n).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.3', '4.7'],
    subNotes: [
      'Reflects the maximum expected sampling variation threshold at your selected confidence level. It completely ignores procedural biases.',
    ],
  },
  {
    id: 'confidence-interval-means-base',
    term: 'Confidence Interval',
    definition:
      'A range of mathematically plausible values computed from sample trends that is highly likely to encapsulate an unknown population target.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.3', '4.7', '4.8'],
    subNotes: [
      'Formed by taking a sample statistic point estimate and applying a balanced margin of error expansion around it.',
    ],
  },
  {
    id: 'confidence-interval-procedure-means',
    term: 'Confidence Interval Procedure',
    definition:
      'The rigorous, step-by-step inference methodology used to verify conditions, formulate equations, and capture population attributes within structural intervals.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.7'],
    subNotes: [
      'Deploys specific curve critical scores (z* or t*) based directly on whether data tracking stems from proportions or means.',
    ],
  },
  {
    id: 'critical-value-means-tstar',
    term: 'Critical Value (t*)',
    definition:
      'The curve multiplier chosen from a t-distribution profile that marks the boundaries enclosing the central C% area of data variation.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.7'],
    subNotes: [
      'Determined using technology or tables, cross-referencing your targeted confidence percentage against your calculated sample degrees of freedom.',
    ],
  },
  {
    id: 'density-curve-means',
    term: 'Density Curve',
    definition:
      'A mathematical curve sketch model that maps a continuous probability distribution where the cumulative region area beneath the line sums exactly to 1.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2'],
    subNotes: [
      'The height tracking along the curve displays the localized relative concentration of potential values within that region.',
    ],
  },
  {
    id: 'independence-means-check',
    term: 'Independence (Means)',
    definition:
      'The condition where individual data measurements collected from one observational unit carry zero predictive influence over any alternate entity.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.4', '4.7', '4.9'],
    subNotes: [
      'Typically protected via random data group selection, or balanced randomized treatment sorting setups.',
    ],
  },
  {
    id: 'matched-pairs-design-trait',
    term: 'Matched Pairs',
    definition:
      'A structural grouping setup matching pairs of highly identical blocks together, or measuring a single subject cohort twice over time.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.3', '4.4', '4.5'],
    subNotes: [
      'Collapses two intersecting observation paths down into a singular clean dataset tracking unified individual variations.',
    ],
  },
  {
    id: 'mean-difference-mu-d',
    term: 'Mean Difference (μ_d)',
    definition:
      'The specific population mean parameter reflecting the ultimate global average of paired individual modifications across a matched pairs dataset.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.4'],
    subNotes: [
      'Requires keeping a rigorous, unchanging subtraction sequence completely uniform throughout your analytical text.',
    ],
  },
  {
    id: 'outlier-means-check',
    term: 'Outlier (Means)',
    definition:
      'An anomalous data measurement point landing an exceptional distance away from the primary mass concentration of a dataset.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.4', '4.9'],
    subNotes: [
      'Outliers heavily skew sample means and variance fields, making them non-resistant traits that require visual charting before running inference tests.',
    ],
  },
  {
    id: 'random-sample-means-base',
    term: 'Random Sample',
    definition:
      'A subset of individuals extracted from a broader population utilizing a verified chance selection mechanism to prevent systematic bias.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.3', '4.4'],
    subNotes: [
      'Fulfilling this condition validates your logical path to generalize sample averages out to larger parent cohorts.',
    ],
  },
  {
    id: 'randomized-experiment-means-link',
    term: 'Randomized Experiment',
    definition:
      'A clinical study framework sorting experimental subjects into alternate treatment groups purely by chance to eliminate confounding lines.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.4', '4.7', '4.9'],
    subNotes: [
      'The foundational research setup required to transition your interpretive text from simple association into definitive cause-and-effect arguments.',
    ],
  },
  {
    id: 'sample-standard-deviation-s',
    term: 'Sample Standard Deviation (s)',
    definition:
      'The standard deviation calculated directly from sample observation points, measuring typical metric variation around the sample mean x̄.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.7'],
    subNotes: [
      'Deploys an n − 1 denominator adjustment to remain an unbiased point estimator for the population parameter σ.',
    ],
  },
  {
    id: 'sample-statistic-means-base',
    term: 'Sample Statistic',
    definition:
      'Any numerical summary attribute computed directly from an isolated sample group, such as x̄ or s.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.7'],
    subNotes: [
      'Acts as the direct point estimator springboard needed to initiate confidence interval mapping equations.',
    ],
  },
  {
    id: 'skewness-means-check',
    term: 'Skewness',
    definition:
      'The measure of directional asymmetry in a distribution layout, where data columns trail out heavily to one specific side.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2', '4.4', '4.9'],
    subNotes: [
      'Severe skewness challenges normal modeling rules for small groups, requiring sample size validation or distribution symmetry checks.',
    ],
  },
  {
    id: 'tails-t-curve-mass',
    term: 'Tails (t-Curve)',
    definition:
      'The extreme lateral regions of a continuous probability layout extending far from the center mean anchor point.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.2'],
    subNotes: [
      't-curve tails pack significantly more probability mass than z-curves to balance out standard error estimation jumps.',
    ],
  },

  // ==========================================
  // TOPIC 4.3: Justifying a Claim Based on a Confidence Interval
  // ==========================================
  {
    id: 'confidence-interval-interpretation-means',
    term: 'Confidence Interval Interpretation (Means)',
    definition:
      'A formal statement capturing plausible values for the parameter: "We are C% confident that the interval from a to b captures the true [population mean parameter in context]."',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.3', '4.8'],
    subNotes: [
      'The interval provides a range of plausible values that can be used as evidence to evaluate a claim about a population mean.',
    ],
  },
  {
    id: 'confidence-level-interpretation-means',
    term: 'Confidence Level Interpretation (Means)',
    definition:
      'A statement regarding the reliability of the estimation method: "In repeated random sampling with the same sample size, approximately C% of the calculated intervals will capture the true population mean."',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.3', '4.8'],
    subNotes: [
      'A confidence level describes the long-run capture rate of the method, not the probability that a specific calculated interval contains the parameter.',
    ],
  },
  {
    id: 'confidence-level-percent',
    term: 'Confidence Level',
    definition:
      'The operational probability tracking the long-run success target of an estimation system across repeated sampling actions.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.3'],
    subNotes: [
      'Common defaults include 90%, 95%, or 99%. A higher confidence rate forces an expansion of your interval width.',
    ],
  },
  {
    id: 'sample-group-subset',
    term: 'Sample',
    definition:
      'The collected slice or smaller representative group chosen directly out of a full target population pool.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.3'],
    subNotes: [
      'We gather direct information from this source to calculate metrics that enable logical inference jumps.',
    ],
  },
  {
    id: 'width-of-confidence-interval-means',
    term: 'Width of a Confidence Interval',
    definition:
      'The complete numeric spread distance separating the absolute upper limit from the absolute lower limit of an interval.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.3', '4.8'],
    subNotes: [
      'Equal precisely to twice your margin of error value. Narrower intervals deliver tighter, cleaner parameter tracking loops.',
    ],
  },

  // ==========================================
  // TOPIC 4.4 & 4.5: Hypothesis Testing for a Population Mean
  // ==========================================
  {
    id: 'one-sample-t-test',
    term: 'One-Sample t-Test for a Population Mean',
    definition:
      'A standardized decision procedure used to weight sample evidence against a specific baseline null hypothesis statement concerning a single population mean μ.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4', '4.5'],
    subNotes: ['Calculated using the test statistic formula: t = (x̄ − μ₀) / (s / √n).'],
  },
  {
    id: 'matched-pairs-t-test',
    term: 'One-Sample t-Test for a Population Mean Difference',
    definition:
      'A significance test used to analyze the difference between two dependent or paired continuous measurement groups by running a one-sample test on the individual calculated changes.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4', '4.5'],
    subNotes: [
      'The null hypothesis is structured as H₀: μ_d = 0, indicating a baseline situation of zero forced treatment effect or zero change.',
    ],
  },
  {
    id: 'null-hypothesis-means',
    term: 'Null Hypothesis (H₀ for Means)',
    definition:
      'The initial default claim stating that a population mean equals a specific benchmark value, representing a status quo of no change or zero effect (e.g., H₀: μ = μ₀).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4', '4.5', '4.9', '4.10'],
    subNotes: [
      'Must be written purely in terms of parameters (like μ), never using sample statistics (like x̄).',
    ],
  },
  {
    id: 'alternative-hypothesis-means',
    term: 'Alternative Hypothesis (Hₐ for Means)',
    definition:
      'The purposeful directional assertion declaring that a population mean deviates from the null benchmark in a specific direction (<, >, or ≠), matching the analyst’s targeted inquiry.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4', '4.9'],
    subNotes: [
      'Determines whether the final calculated p-value will track a one-sided single tail area or a two-sided split layout.',
    ],
  },
  {
    id: 'p-value-interpretation-means',
    term: 'p-Value Interpretation (Means)',
    definition:
      'The probability of obtaining a sample mean as far from the null value or more extreme than our observed statistic x̄, calculated assuming that the null hypothesis is perfectly correct.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.5', '4.10'],
    subNotes: [
      'A lower value means your empirical sample looks too unusual to keep explaining away as generic sample noise, forcing a change in hypothesis status.',
    ],
  },
  {
    id: 'ten-percent-condition-test',
    term: '10% Condition (Testing Context)',
    definition:
      'A condition checked when selecting sample pools without replacing units, requiring that sample size n does not exceed 10% of total population assets N.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4'],
    subNotes: [
      'Ensures that variance additions align with independence parameters even when absolute replacement steps are skipped.',
    ],
  },
  {
    id: 'approximately-normal-shape-check',
    term: 'Approximately Normal',
    definition:
      'A descriptive designation showing that a data curve or sampling layout closely replicates a classic bell-shaped profile.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4', '4.7', '4.9'],
    subNotes: [
      'Allows researchers to implement smooth continuous theoretical density equations to capture area margins accurately.',
    ],
  },
  {
    id: 'conditions-for-the-test-means',
    term: 'Conditions for the Test',
    definition:
      'The structural data layout criteria—specifically Randomization, 10% limits, and Normality tracking—that must be cleared to ensure that the final calculations align with the target distribution curve models.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4'],
    subNotes: [
      'Superficial checkmarks like simply writing "SRS" without contextual support will fail to earn credit under standard scoring rubrics.',
    ],
  },
  {
    id: 'significance-test-means-base',
    term: 'Significance Test',
    definition:
      'The formal statistical decision procedure that weights real-world sample proof against competitive null parameters.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.4', '4.5', '4.9', '4.10'],
    subNotes: [
      'Converts raw numeric difference margins into standardized scores to determine precise tail probabilities.',
    ],
  },
  {
    id: 'reject-the-null-hypothesis-means',
    term: 'Reject the Null Hypothesis',
    definition:
      'The statistical choice executed when a computed p-value lands below your selected alpha cutoff mark.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.5', '4.10'],
    subNotes: [
      'Provides operational verification that your sample evidence heavily favors the alternative directional statement.',
    ],
  },
  {
    id: 'significance-level-alpha-means',
    term: 'Significance Level (α)',
    definition:
      'The fixed probability boundary limit chosen by researchers to serve as their critical decision cutoff threshold.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.5', '4.10'],
    subNotes: [
      'Structurally identical to your targeted probability of generating a false-positive Type I error loop.',
    ],
  },
  {
    id: 'test-statistic-t-score',
    term: 'Test Statistic',
    definition:
      'A standardized calculation metric checking exactly how far an observed sample results layout sits from a null benchmark target.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.5', '4.10'],
    subNotes: [
      'In Unit 4 means procedures, this metric presents as a calculated t score reflecting standard error distances.',
    ],
  },

  // ==========================================
  // TOPIC 4.6, 4.7, 4.8, 4.9 & 4.10: Difference Between Two Population Means
  // ==========================================
  {
    id: 'mean-sampling-distribution-diff-means',
    term: 'Mean of the Sampling Distribution of x̄₁ − x̄₂',
    definition:
      'The long-run expected average value tracking the gap between two independent sample averages, formally defined as μ_(x̄₁ − x̄₂) = μ₁ − μ₂.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.6'],
    subNotes: [
      'Confirms that subtracting independent statistics yields an unbiased system for locating the true spatial distance between separate parent means.',
    ],
  },
  {
    id: 'standard-deviation-sampling-distribution-diff-means',
    term: 'Standard Deviation of the Sampling Distribution of x̄₁ − x̄₂',
    definition:
      'The total mathematical parameter mapping variation across independent mean differences, evaluated as σ_(x̄₁ − x̄₂) = √(σ₁²/n₁ + σ₂²/n₂).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.6'],
    subNotes: [
      'Requires strict cohort independence. Variances are added here because combining separate sources of sampling error increases total noise.',
    ],
  },
  {
    id: 'two-sample-t-interval',
    term: 'Two-Sample t-Interval for the Difference Between Population Means',
    definition:
      'An estimation procedure that outputs a range of plausible values capturing the true spatial distance between two independent population averages (μ₁ − μ₂).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7', '4.8'],
    subNotes: [
      'Calculated as (x̄₁ − x̄₂) ± t*√(s₁²/n₁ + s₂²/n₂). If the finalized interval encompasses 0, you lack evidence to assume a true difference exists.',
    ],
  },
  {
    id: 'standard-error-diff-means',
    term: 'Standard Error for the Difference Between Two Means',
    definition:
      'The calculated estimate of the standard deviation tracking sample mean differences, deployed when group σ values are unknown: SE_(x̄₁ − x̄₂) = √(s₁²/n₁ + s₂²/n₂).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7', '4.10'],
    subNotes: [
      'Acts as the vital denominator metric that scales the final distance when computing two-sample t statistics.',
    ],
  },
  {
    id: 'two-sample-t-test',
    term: 'Two-Sample t-Test for the Difference Between Two Population Means',
    definition:
      'A significance procedure constructed to check if the observed distance between two independent sample averages represents an actual operational difference between their parent populations.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.9', '4.10'],
    subNotes: [
      'The standard null framework reads H₀: μ₁ − μ₂ = 0. The standardized score follows a t curve curve shape with complex degrees of freedom managed via calculator technology.',
    ],
  },
  {
    id: 'difference-in-sample-means-statistic',
    term: 'Difference in Sample Means',
    definition:
      'The final point statistic derived directly by subtracting one independent sample group mean from another, calculated as x̄₁ − x̄₂.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.6', '4.8', '4.10'],
    subNotes: [
      'Serves as the baseline center anchor used to execute two-sample difference interval procedures.',
    ],
  },
  {
    id: 'independent-populations-means',
    term: 'Independent Populations',
    definition:
      'Two target population cohorts whose elements possess no contextual connections or systematic tracking pairings.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.6'],
    subNotes: [
      'Ensures that selection mechanics inside group one inject zero structural probability distortion into group two choice pools.',
    ],
  },
  {
    id: 'difference-of-population-means-param',
    term: 'Difference of Population Means',
    definition:
      'The absolute target parameter reflecting the spatial distance between two continuous population centers, written as μ₁ − μ₂.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7', '4.8', '4.9', '4.10'],
    subNotes: [
      'When your confidence interval for this parameter maps entirely to positive or negative signs, you can justify a claim of a non-zero shift.',
    ],
  },
  {
    id: 'independent-samples-means-check',
    term: 'Independent Samples',
    definition:
      'Sample groups picked from separate pools where observations in group one provide zero structural clue about data values inside group two.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7'],
    subNotes: [
      'A baseline requirement that differentiates standard two-sample procedures from dependent paired matched tests.',
    ],
  },
  {
    id: 'population-standard-deviations-plural',
    term: 'Population Standard Deviations',
    definition:
      'The fixed population variance parameters mapping metric spread inside both distinct group populations under review.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7'],
    subNotes: [
      'Almost universally unknown when running continuous studies, forcing us to drop z curves for t tools.',
    ],
  },
  {
    id: 'sample-standard-deviations-plural',
    term: 'Sample Standard Deviations',
    definition:
      'The calculated metrics mapping spread variations inside both separate sample groups, denoted as s₁ and s₂.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7'],
    subNotes: [
      'Substituted directly into standard error formatting square roots to scale our interval expansions.',
    ],
  },
  {
    id: 'simple-random-sample-means-link',
    term: 'Simple Random Sample (SRS)',
    definition:
      'A collection framework where every possible subset group of size n carries the exact same selection probability.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7', '4.9', '4.10'],
    subNotes: [
      'Eliminates tracking preference lines, validating the execution of normal distribution inference steps.',
    ],
  },
  {
    id: 'skewed-distributions-means-danger',
    term: 'Skewed Distributions',
    definition:
      'Datasets featuring extreme asymmetrical horizontal extensions pushing off to one margin line.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.7'],
    subNotes: [
      'Demands checking the sample size metric; small sets with high skewness compromise t test validity maps.',
    ],
  },
  {
    id: 'independent-random-variables-combining',
    term: 'Independent Random Variables',
    definition:
      'Two or more separate random continuous functions whose value outcomes inject zero probability modifications into one another.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.9'],
    subNotes: [
      'Crucial state rule: You can add separate tracking variances together even if you are subtracting the base mean values.',
    ],
  },
  {
    id: 'linear-combinations-variables',
    term: 'Linear Combinations',
    definition:
      'An algebraic expression that scales or combines multiple random variables using fixed numerical coefficients (e.g., aX + bY).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.9'],
    subNotes: [
      'The combined center average translates directly, but variance summation strictly requires independent variable alignment.',
    ],
  },
  {
    id: 'linear-transformations-shift',
    term: 'Linear Transformations',
    definition:
      'Modifying a random variable by applying a scalar multiplier or adding a fixed numeric shift baseline constant (Y = a + bX).',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.9'],
    subNotes: [
      'Adding constants shifts the baseline mean center directly, but leaves standard deviation and variance spread markers untouched.',
    ],
  },
  {
    id: 'variance-sigma-squared',
    term: 'Variance',
    definition:
      'The squared standard deviation metric evaluating average squared differences tracking around the distribution center point.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.9'],
    subNotes: [
      'Variances scale cleanly when combining multiple independent continuous variable metrics together.',
    ],
  },
  {
    id: 'random-variable-definition',
    term: 'Random Variable',
    definition:
      'A quantitative metric mapping numerical outcomes that are governed directly by random physical operations.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.9', '4.11', '4.12'],
    subNotes: [
      'Classified as either discrete or continuous depending on the total domain layout of their possible paths.',
    ],
  },
  {
    id: 'statistical-reasoning-inference',
    term: 'Statistical Reasoning',
    definition:
      'The structured deductive logic stream where analysts match calculated tail areas with contextual claims to make research determinations.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.10'],
    subNotes: [
      'Ensures your text conclusions avoid acceptance claims, framing decisions around support indicators instead.',
    ],
  },
  {
    id: 'two-sample-test-means',
    term: 'Two-Sample Test',
    definition:
      'Any inferential hypothesis procedure structured to cross-examine variation margins tracking across two independent data pools.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.10'],
    subNotes: [
      'Requires precise parameter phrasing to separate its steps from simple paired change tests.',
    ],
  },

  // ==========================================
  // TOPIC 4.11 & 4.12: Binomial & Geometric Distributions
  // ==========================================
  {
    id: 'binomial-distribution-unit4',
    term: 'Binomial Distribution',
    definition:
      'A discrete probability distribution that models the count of success outcomes across a fixed number n of independent binary trials.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.11'],
    subNotes: [
      'Requires an unchanging success probability p throughout all tracking sequences to validate its mathematical equations.',
    ],
  },
  {
    id: 'geometric-distribution-unit4',
    term: 'Geometric Distribution',
    definition:
      'A discrete probability distribution mapping the total number of independent binary trials executed until the very first success outcome is achieved.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.12'],
    subNotes: [
      'The distribution domain extends out infinitely toward the right margin line, producing an inherently right-skewed profile layout.',
    ],
  },
  {
    id: 'geometric-probability-function',
    term: 'Geometric Probability Function',
    definition:
      'The formal mathematical formula used to compute the exact probability that the first success lands precisely on trial x, written as P(X = x) = (1 − p)^(x−1) * p.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.12'],
    subNotes: [
      'Tracks a series of initial failure runs multiplied directly by the single terminating success probability mark.',
    ],
  },
  {
    id: 'geometric-random-variable',
    term: 'Geometric Random Variable',
    definition:
      'A discrete random variable counting the precise trial instance number that hosts the initial success event within a sequence of trials.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.12'],
    subNotes: [
      'Its expected long-run mean value center parameter evaluates cleanly as the reciprocal fraction 1 / p.',
    ],
  },
  {
    id: 'independent-trials-binary',
    term: 'Independent Trials',
    definition:
      'A repetitive sequence of events where the outcome generated on any individual trial exerts zero statistical leverage over alternate trials.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.12'],
    subNotes: [
      'A non-negotiable core condition required to validate both binomial and geometric continuous product formulas.',
    ],
  },
  {
    id: 'probability-of-success-p',
    term: 'Probability of Success',
    definition:
      'The fixed, unchanging probability constant p associated with registering a favorable outcome during any single testing trial.',
    subject: 'ap_statistics',
    unit: 4,
    lessonIDs: ['4.12'],
    subNotes: [
      'Must remain completely steady across every single step of the experiment to use classic binomial or geometric equations.',
    ],
  },
];
