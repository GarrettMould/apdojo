import type { CalculatorDrill, CalculatorDrillDeck } from './types';

/** DISTR · Find an area — normalcdf */
const NORMALCDF_DRILLS: CalculatorDrill[] = [
  {
    id: 'distr-locate-normalcdf',
    family: 'DISTR',
    goal: 'locate',
    skillLabel: 'Locate · DISTR',
    prompt:
      'You need the area under a normal curve between two boundaries for an FRQ.',
    goalText: 'Open DISTR and select normalcdf( — stop on the input screen.',
    targetRoutine: 'normalcdf',
    hints: [
      'Press vars to open DISTR.',
      'Choose 2:normalcdf( and press enter.',
    ],
    showPath: 'vars → normalcdf( → enter',
  },
  {
    id: 'distr-produce-z-left',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · normalcdf',
    prompt: 'Let Z ~ N(0, 1). Find P(Z < 1.24).',
    goalText: 'Use normalcdf with lower = −1E99, upper = 1.24, μ = 0, σ = 1.',
    successCue: 'You should see a result ≈ 0.8925',
    targetRoutine: 'normalcdf',
    resultKey: 'value',
    expected: 0.8925122348,
    tolerance: 0.002,
    expectedInputs: { lower: '-1E99', upper: '1.24', mu: '0', sigma: '1' },
    hints: [
      'Press vars → normalcdf(.',
      'Leave μ=0 and σ=1. Set upper to 1.24. Use the default lower (−1E99) for “less than.”',
      'Arrow to Calculate and press enter (or enter through the last field).',
    ],
    showPath: 'vars → normalcdf( → upper: 1.24 → Calculate',
  },
  {
    id: 'distr-produce-z-right',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · normalcdf',
    prompt: 'Let Z ~ N(0, 1). Find P(Z > 1.8).',
    goalText: 'Use normalcdf with lower = 1.8, upper = 1E99, μ = 0, σ = 1.',
    successCue: 'You should see a result ≈ 0.0359',
    targetRoutine: 'normalcdf',
    resultKey: 'value',
    expected: 0.0359302668,
    tolerance: 0.002,
    expectedInputs: { lower: '1.8', upper: '1E99', mu: '0', sigma: '1' },
    hints: [
      'Right-tail areas use a large upper bound (1E99), not −1E99.',
      'Set lower = 1.8 and leave μ=0, σ=1.',
    ],
    showPath: 'vars → normalcdf( → lower 1.8, upper 1E99 → Calculate',
  },
  {
    id: 'distr-produce-normal-interval',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · normalcdf',
    prompt:
      'Exam scores are approximately N(μ = 75, σ = 8). Find P(70 < X < 85).',
    goalText: 'Use normalcdf(lower=70, upper=85, μ=75, σ=8).',
    successCue: 'You should see a result ≈ 0.628',
    targetRoutine: 'normalcdf',
    resultKey: 'value',
    expected: 0.6283646848,
    tolerance: 0.003,
    expectedInputs: { lower: '70', upper: '85', mu: '75', sigma: '8' },
    hints: [
      'This is still normalcdf — not a z-table by hand.',
      'Overwrite the defaults: lower 70, upper 85, μ 75, σ 8.',
    ],
    showPath: 'vars → normalcdf( → 70, 85, 75, 8 → Calculate',
  },
];

/** DISTR · Find a cutoff — invNorm */
const INVNORM_DRILLS: CalculatorDrill[] = [
  {
    id: 'distr-locate-invnorm',
    family: 'DISTR',
    goal: 'locate',
    skillLabel: 'Locate · DISTR',
    prompt:
      'A scoring rubric asks for the critical z* that cuts off the top 5% of a standard normal distribution.',
    goalText: 'Open DISTR and select invNorm( — stop once the input screen appears.',
    targetRoutine: 'invNorm',
    hints: [
      'DISTR lives on the vars key (blue label: distr).',
      'From the DISTR menu, arrow to 3:invNorm( then press enter.',
    ],
    showPath: 'vars → arrow to invNorm( → enter',
  },
  {
    id: 'distr-produce-invnorm-95',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · invNorm',
    prompt:
      'Find the z-score with area 0.95 to its left under the standard normal curve.',
    goalText: 'Use invNorm(area=0.95, μ=0, σ=1).',
    successCue: 'You should see a result ≈ 1.645',
    targetRoutine: 'invNorm',
    resultKey: 'value',
    expected: 1.6448536251,
    tolerance: 0.005,
    expectedInputs: { area: '0.95', mu: '0', sigma: '1' },
    hints: [
      'vars → invNorm(.',
      'area is the left-tail probability (0.95), not the right-tail 0.05.',
    ],
    showPath: 'vars → invNorm( → area 0.95 → Calculate',
  },
  {
    id: 'distr-produce-invnorm-025',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · invNorm',
    prompt:
      'Find the z-score that cuts off the bottom 2.5% of a standard normal distribution.',
    goalText: 'Use invNorm(area=0.025, μ=0, σ=1).',
    successCue: 'You should see a result ≈ −1.960',
    targetRoutine: 'invNorm',
    resultKey: 'value',
    expected: -1.9599639861,
    tolerance: 0.005,
    expectedInputs: { area: '0.025', mu: '0', sigma: '1' },
    hints: [
      'Bottom 2.5% means left-tail area 0.025.',
      'Expect a negative z-score.',
    ],
    showPath: 'vars → invNorm( → area 0.025 → Calculate',
  },
  {
    id: 'distr-produce-invnorm-975',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · invNorm',
    prompt:
      'For a 95% z-interval, find the critical value z* (upper cutoff with 0.025 in each tail).',
    goalText: 'Use invNorm(area=0.975, μ=0, σ=1).',
    successCue: 'You should see a result ≈ 1.960',
    targetRoutine: 'invNorm',
    resultKey: 'value',
    expected: 1.9599639861,
    tolerance: 0.005,
    expectedInputs: { area: '0.975', mu: '0', sigma: '1' },
    hints: [
      'For a two-sided 95% interval, use area = 1 − 0.025 = 0.975 (not 0.95).',
      'vars → invNorm( → 0.975.',
    ],
    showPath: 'vars → invNorm( → area 0.975 → Calculate',
  },
];

/** Inference · 1-PropZTest */
const ONE_PROP_DRILLS: CalculatorDrill[] = [
  {
    id: 'stat-locate-1prop',
    family: 'STAT TESTS',
    goal: 'locate',
    skillLabel: 'Locate · STAT TESTS',
    prompt:
      'A one-sample proportion significance test is the right inference procedure.',
    goalText: 'Open STAT → TESTS and select 1-PropZTest — stop on the input screen.',
    targetRoutine: '1-PropZTest',
    hints: [
      'Press the stat key (opens STAT TESTS on this simulator).',
      'Arrow to 5:1-PropZTest… and press enter.',
    ],
    showPath: 'stat → 1-PropZTest → enter',
  },
  {
    id: 'stat-produce-1prop-a',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 1-PropZTest',
    prompt:
      'Test H₀: p = 0.50 vs Hₐ: p ≠ 0.50 with x = 62 successes in n = 100 trials. Find the p-value.',
    goalText: 'Run 1-PropZTest with p₀=0.5, x=62, n=100. Read the p-value.',
    successCue: 'You should see p ≈ 0.0164',
    targetRoutine: '1-PropZTest',
    resultKey: 'p',
    expected: 0.0163950584,
    tolerance: 0.001,
    expectedInputs: { p0: '0.5', x: '62', n: '100' },
    hints: [
      'stat → 1-PropZTest…',
      'Enter p₀ = .5, x = 62, n = 100, then Calculate.',
      'On the result screen, look for the line labeled p=…',
    ],
    showPath: 'stat → 1-PropZTest → p0=.5, x=62, n=100 → Calculate',
  },
  {
    id: 'stat-produce-1prop-b',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 1-PropZTest',
    prompt:
      'Test H₀: p = 0.35 vs Hₐ: p ≠ 0.35 with x = 48 successes in n = 120 trials. Find the p-value.',
    goalText: 'Run 1-PropZTest with p₀=0.35, x=48, n=120. Read the p-value.',
    successCue: 'You should see p ≈ 0.251',
    targetRoutine: '1-PropZTest',
    resultKey: 'p',
    expected: 0.2508289625,
    tolerance: 0.002,
    expectedInputs: { p0: '0.35', x: '48', n: '120' },
    hints: [
      'Same path as before — only the numbers change.',
      'p₀ is the hypothesized proportion under H₀ (0.35), not p̂.',
    ],
    showPath: 'stat → 1-PropZTest → p0=.35, x=48, n=120 → Calculate',
  },
  {
    id: 'stat-produce-1prop-c',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 1-PropZTest',
    prompt:
      'Test H₀: p = 0.25 vs Hₐ: p ≠ 0.25 with x = 18 successes in n = 50 trials. Find the p-value.',
    goalText: 'Run 1-PropZTest with p₀=0.25, x=18, n=50. Read the p-value.',
    successCue: 'You should see p ≈ 0.0724',
    targetRoutine: '1-PropZTest',
    resultKey: 'p',
    expected: 0.07244791029,
    tolerance: 0.002,
    expectedInputs: { p0: '0.25', x: '18', n: '50' },
    hints: [
      'stat → 1-PropZTest…',
      'Enter p₀ = .25, x = 18, n = 50, then Calculate.',
    ],
    showPath: 'stat → 1-PropZTest → p0=.25, x=18, n=50 → Calculate',
  },
];

/** Inference · TInterval */
const T_INTERVAL_DRILLS: CalculatorDrill[] = [
  {
    id: 'stat-locate-tinterval',
    family: 'STAT TESTS',
    goal: 'locate',
    skillLabel: 'Locate · STAT TESTS',
    prompt:
      'You need a one-sample t confidence interval for a population mean μ.',
    goalText: 'Open STAT → TESTS and select TInterval — stop on the input screen.',
    targetRoutine: 'TInterval',
    hints: [
      'Press the stat key.',
      'Arrow to 8:TInterval… and press enter.',
    ],
    showPath: 'stat → TInterval → enter',
  },
  {
    id: 'stat-produce-tinterval-a',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · TInterval',
    prompt:
      'A sample of n = 40 has x̄ = 52.3 and Sx = 8.1. Construct a 95% t-interval for μ.',
    goalText: 'Run TInterval with x̄=52.3, Sx=8.1, n=40, C-Level=.95. Check the lower bound.',
    successCue: 'Lower endpoint should be ≈ 49.71',
    targetRoutine: 'TInterval',
    resultKey: 'value',
    expected: 49.709494,
    tolerance: 0.05,
    expectedInputs: { xbar: '52.3', sx: '8.1', n: '40', cLevel: '.95' },
    hints: [
      'stat → TInterval…',
      'Enter Stats values: x̄, Sx, n, then leave C-Level at .95.',
      'The result shows an interval (lower, upper) — Check grades the lower bound.',
    ],
    showPath: 'stat → TInterval → 52.3, 8.1, 40, .95 → Calculate',
  },
  {
    id: 'stat-produce-tinterval-b',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · TInterval',
    prompt:
      'A sample of n = 20 has x̄ = 12.4 and Sx = 3.2. Construct a 95% t-interval for μ.',
    goalText: 'Run TInterval with x̄=12.4, Sx=3.2, n=20, C-Level=.95. Check the lower bound.',
    successCue: 'Lower endpoint should be ≈ 10.90',
    targetRoutine: 'TInterval',
    resultKey: 'value',
    expected: 10.902354,
    tolerance: 0.05,
    expectedInputs: { xbar: '12.4', sx: '3.2', n: '20', cLevel: '.95' },
    hints: [
      'Same menu path — new summary stats.',
      'Keep C-Level at .95 unless the problem says otherwise.',
    ],
    showPath: 'stat → TInterval → 12.4, 3.2, 20, .95 → Calculate',
  },
  {
    id: 'stat-produce-tinterval-c',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · TInterval',
    prompt:
      'A sample of n = 25 has x̄ = 68.2 and Sx = 9.5. Construct a 95% t-interval for μ.',
    goalText: 'Run TInterval with x̄=68.2, Sx=9.5, n=25, C-Level=.95. Check the lower bound.',
    successCue: 'Lower endpoint should be ≈ 64.28',
    targetRoutine: 'TInterval',
    resultKey: 'value',
    expected: 64.278593,
    tolerance: 0.05,
    expectedInputs: { xbar: '68.2', sx: '9.5', n: '25', cLevel: '.95' },
    hints: [
      'stat → TInterval…',
      'Enter x̄=68.2, Sx=9.5, n=25, C-Level=.95.',
    ],
    showPath: 'stat → TInterval → 68.2, 9.5, 25, .95 → Calculate',
  },
];

/** DISTR · tcdf */
const TCDF_DRILLS: CalculatorDrill[] = [
  {
    id: 'distr-locate-tcdf',
    family: 'DISTR',
    goal: 'locate',
    skillLabel: 'Locate · DISTR',
    prompt:
      'You need a t-distribution probability for an inference FRQ (not a normal curve).',
    goalText: 'Open DISTR and select tcdf( — stop on the input screen.',
    targetRoutine: 'tcdf',
    hints: [
      'Press vars to open DISTR.',
      'Arrow to 5:tcdf( and press enter.',
    ],
    showPath: 'vars → tcdf( → enter',
  },
  {
    id: 'distr-produce-tcdf-left',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · tcdf',
    prompt: 'A t random variable has df = 10. Find P(T < 1.5).',
    goalText: 'Use tcdf with lower = −1E99, upper = 1.5, df = 10.',
    successCue: 'You should see a result ≈ 0.918',
    targetRoutine: 'tcdf',
    resultKey: 'value',
    expected: 0.9177463368,
    tolerance: 0.003,
    expectedInputs: { lower: '-1E99', upper: '1.5', df: '10' },
    hints: [
      'vars → tcdf(.',
      'For “less than,” use a very small lower bound (−1E99).',
    ],
    showPath: 'vars → tcdf( → upper 1.5, df 10 → Calculate',
  },
  {
    id: 'distr-produce-tcdf-between',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · tcdf',
    prompt: 'A t random variable has df = 20. Find P(0 < T < 2.2).',
    goalText: 'Use tcdf with lower = 0, upper = 2.2, df = 20.',
    successCue: 'You should see a result ≈ 0.480',
    targetRoutine: 'tcdf',
    resultKey: 'value',
    expected: 0.4801357052,
    tolerance: 0.003,
    expectedInputs: { lower: '0', upper: '2.2', df: '20' },
    hints: [
      'Both bounds are finite here — no need for ±1E99.',
      'Enter df carefully; mixing up df and a bound is a common slip.',
    ],
    showPath: 'vars → tcdf( → 0, 2.2, 20 → Calculate',
  },
  {
    id: 'distr-produce-tcdf-two-sided',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · tcdf',
    prompt: 'A t random variable has df = 15. Find P(−1.8 < T < 1.8).',
    goalText: 'Use tcdf with lower = −1.8, upper = 1.8, df = 15.',
    successCue: 'You should see a result ≈ 0.908',
    targetRoutine: 'tcdf',
    resultKey: 'value',
    expected: 0.9079978818,
    tolerance: 0.003,
    expectedInputs: { lower: '-1.8', upper: '1.8', df: '15' },
    hints: [
      'Use the (−) key for negative lower bounds.',
      'vars → tcdf( → −1.8, 1.8, 15.',
    ],
    showPath: 'vars → tcdf( → -1.8, 1.8, 15 → Calculate',
  },
];

/** DISTR · invT */
const INVT_DRILLS: CalculatorDrill[] = [
  {
    id: 'distr-locate-invt',
    family: 'DISTR',
    goal: 'locate',
    skillLabel: 'Locate · DISTR',
    prompt:
      'You need a critical t* value from the t-distribution (not invNorm).',
    goalText: 'Open DISTR and select invT( — stop on the input screen.',
    targetRoutine: 'invT',
    hints: [
      'Press vars to open DISTR.',
      'Arrow to 6:invT( and press enter.',
    ],
    showPath: 'vars → invT( → enter',
  },
  {
    id: 'distr-produce-invt-95',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · invT',
    prompt:
      'Find the t critical value with area 0.95 to its left when df = 10.',
    goalText: 'Use invT(area=0.95, df=10).',
    successCue: 'You should see a result ≈ 1.812',
    targetRoutine: 'invT',
    resultKey: 'value',
    expected: 1.8124611228,
    tolerance: 0.01,
    expectedInputs: { area: '0.95', df: '10' },
    hints: [
      'invT wants left-tail area, just like invNorm.',
      'vars → invT( → 0.95, 10.',
    ],
    showPath: 'vars → invT( → area 0.95, df 10 → Calculate',
  },
  {
    id: 'distr-produce-invt-975',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · invT',
    prompt:
      'For a 95% t-interval with df = 20, find t* (upper cutoff with 0.025 in each tail).',
    goalText: 'Use invT(area=0.975, df=20).',
    successCue: 'You should see a result ≈ 2.086',
    targetRoutine: 'invT',
    resultKey: 'value',
    expected: 2.0859634473,
    tolerance: 0.01,
    expectedInputs: { area: '0.975', df: '20' },
    hints: [
      'Two-sided 95% → area = 0.975, not 0.95.',
      'That matches how you find z* with invNorm(0.975).',
    ],
    showPath: 'vars → invT( → area 0.975, df 20 → Calculate',
  },
  {
    id: 'distr-produce-invt-90',
    family: 'DISTR',
    goal: 'produce',
    skillLabel: 'Produce · invT',
    prompt:
      'Find the t critical value with area 0.90 to its left when df = 8.',
    goalText: 'Use invT(area=0.90, df=8).',
    successCue: 'You should see a result ≈ 1.397',
    targetRoutine: 'invT',
    resultKey: 'value',
    expected: 1.3968153097,
    tolerance: 0.01,
    expectedInputs: { area: '0.9', df: '8' },
    hints: [
      'vars → invT(.',
      'Enter area 0.9 (or .9) and df 8.',
    ],
    showPath: 'vars → invT( → area 0.9, df 8 → Calculate',
  },
];

/** Inference · 2-PropZTest */
const TWO_PROP_DRILLS: CalculatorDrill[] = [
  {
    id: 'stat-locate-2prop',
    family: 'STAT TESTS',
    goal: 'locate',
    skillLabel: 'Locate · STAT TESTS',
    prompt:
      'A two-sample proportion significance test is the right inference procedure.',
    goalText: 'Open STAT → TESTS and select 2-PropZTest — stop on the input screen.',
    targetRoutine: '2-PropZTest',
    hints: [
      'Press the stat key.',
      'Arrow to 6:2-PropZTest… and press enter.',
    ],
    showPath: 'stat → 2-PropZTest → enter',
  },
  {
    id: 'stat-produce-2prop-a',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 2-PropZTest',
    prompt:
      'Group 1: x₁ = 42 successes in n₁ = 100. Group 2: x₂ = 30 in n₂ = 100. Test H₀: p₁ = p₂ vs Hₐ: p₁ ≠ p₂. Find the p-value.',
    goalText: 'Run 2-PropZTest with x₁=42, n₁=100, x₂=30, n₂=100. Read the p-value.',
    successCue: 'You should see p ≈ 0.0771',
    targetRoutine: '2-PropZTest',
    resultKey: 'p',
    expected: 0.07709978006,
    tolerance: 0.002,
    expectedInputs: { x1: '42', n1: '100', x2: '30', n2: '100' },
    hints: [
      'stat → 2-PropZTest…',
      'Enter counts and sample sizes — not proportions.',
      'Read the line labeled p=… on the result screen.',
    ],
    showPath: 'stat → 2-PropZTest → 42, 100, 30, 100 → Calculate',
  },
  {
    id: 'stat-produce-2prop-b',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 2-PropZTest',
    prompt:
      'Group 1: x₁ = 55 in n₁ = 120. Group 2: x₂ = 48 in n₂ = 130. Test H₀: p₁ = p₂ vs Hₐ: p₁ ≠ p₂. Find the p-value.',
    goalText: 'Run 2-PropZTest with x₁=55, n₁=120, x₂=48, n₂=130. Read the p-value.',
    successCue: 'You should see p ≈ 0.153',
    targetRoutine: '2-PropZTest',
    resultKey: 'p',
    expected: 0.1527084321,
    tolerance: 0.002,
    expectedInputs: { x1: '55', n1: '120', x2: '48', n2: '130' },
    hints: [
      'Same menu path — new counts.',
      'Keep the groups in order: first sample, then second.',
    ],
    showPath: 'stat → 2-PropZTest → 55, 120, 48, 130 → Calculate',
  },
  {
    id: 'stat-produce-2prop-c',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 2-PropZTest',
    prompt:
      'Group 1: x₁ = 28 in n₁ = 80. Group 2: x₂ = 22 in n₂ = 90. Test H₀: p₁ = p₂ vs Hₐ: p₁ ≠ p₂. Find the p-value.',
    goalText: 'Run 2-PropZTest with x₁=28, n₁=80, x₂=22, n₂=90. Read the p-value.',
    successCue: 'You should see p ≈ 0.132',
    targetRoutine: '2-PropZTest',
    resultKey: 'p',
    expected: 0.1316480529,
    tolerance: 0.002,
    expectedInputs: { x1: '28', n1: '80', x2: '22', n2: '90' },
    hints: [
      'stat → 2-PropZTest…',
      'Enter 28, 80, 22, 90 then Calculate.',
    ],
    showPath: 'stat → 2-PropZTest → 28, 80, 22, 90 → Calculate',
  },
];

/** Inference · 2-SampTTest */
const TWO_SAMP_T_DRILLS: CalculatorDrill[] = [
  {
    id: 'stat-locate-2sampt',
    family: 'STAT TESTS',
    goal: 'locate',
    skillLabel: 'Locate · STAT TESTS',
    prompt:
      'A two-sample t-test for means is the right inference procedure.',
    goalText: 'Open STAT → TESTS and select 2-SampTTest — stop on the input screen.',
    targetRoutine: '2-SampTTest',
    hints: [
      'Press the stat key.',
      'Choose 2:2-SampTTest… and press enter.',
    ],
    showPath: 'stat → 2-SampTTest → enter',
  },
  {
    id: 'stat-produce-2sampt-a',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 2-SampTTest',
    prompt:
      'Sample 1: x̄₁ = 52.1, Sx₁ = 8.2, n₁ = 30. Sample 2: x̄₂ = 48.4, Sx₂ = 7.5, n₂ = 28. Test H₀: μ₁ = μ₂ vs Hₐ: μ₁ ≠ μ₂. Find the p-value.',
    goalText: 'Run 2-SampTTest with those Stats values. Read the p-value.',
    successCue: 'You should see p ≈ 0.0781',
    targetRoutine: '2-SampTTest',
    resultKey: 'p',
    expected: 0.07809990436,
    tolerance: 0.002,
    expectedInputs: { x1: '52.1', s1: '8.2', n1: '30', x2: '48.4', s2: '7.5', n2: '28' },
    hints: [
      'stat → 2-SampTTest…',
      'Enter summary stats in order: x̄₁, Sx₁, n₁, then sample 2.',
      'Read p=… on the result screen.',
    ],
    showPath: 'stat → 2-SampTTest → 52.1, 8.2, 30, 48.4, 7.5, 28 → Calculate',
  },
  {
    id: 'stat-produce-2sampt-b',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 2-SampTTest',
    prompt:
      'Sample 1: x̄₁ = 18.6, Sx₁ = 3.1, n₁ = 22. Sample 2: x̄₂ = 20.4, Sx₂ = 3.8, n₂ = 25. Test H₀: μ₁ = μ₂ vs Hₐ: μ₁ ≠ μ₂. Find the p-value.',
    goalText: 'Run 2-SampTTest with those Stats values. Read the p-value.',
    successCue: 'You should see p ≈ 0.0807',
    targetRoutine: '2-SampTTest',
    resultKey: 'p',
    expected: 0.08068307227,
    tolerance: 0.002,
    expectedInputs: { x1: '18.6', s1: '3.1', n1: '22', x2: '20.4', s2: '3.8', n2: '25' },
    hints: [
      'Same path as before — new numbers.',
      'Watch the order of the six inputs carefully.',
    ],
    showPath: 'stat → 2-SampTTest → 18.6, 3.1, 22, 20.4, 3.8, 25 → Calculate',
  },
  {
    id: 'stat-produce-2sampt-c',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · 2-SampTTest',
    prompt:
      'Sample 1: x̄₁ = 105.2, Sx₁ = 12.0, n₁ = 40. Sample 2: x̄₂ = 98.7, Sx₂ = 11.4, n₂ = 35. Test H₀: μ₁ = μ₂ vs Hₐ: μ₁ ≠ μ₂. Find the p-value.',
    goalText: 'Run 2-SampTTest with those Stats values. Read the p-value.',
    successCue: 'You should see p ≈ 0.0188',
    targetRoutine: '2-SampTTest',
    resultKey: 'p',
    expected: 0.01879356001,
    tolerance: 0.002,
    expectedInputs: { x1: '105.2', s1: '12', n1: '40', x2: '98.7', s2: '11.4', n2: '35' },
    hints: [
      'stat → 2-SampTTest…',
      'Enter all six Stats fields, then Calculate.',
    ],
    showPath: 'stat → 2-SampTTest → 105.2, 12, 40, 98.7, 11.4, 35 → Calculate',
  },
];

/** Inference · χ² GOF */
const CHI2_GOF_DRILLS: CalculatorDrill[] = [
  {
    id: 'stat-locate-chi2gof',
    family: 'STAT TESTS',
    goal: 'locate',
    skillLabel: 'Locate · STAT TESTS',
    prompt:
      'A chi-square goodness-of-fit test is the right inference procedure.',
    goalText: 'Open STAT → TESTS and select χ²GOF-Test — stop on the input screen.',
    targetRoutine: 'chi2-GOF',
    hints: [
      'Press the stat key.',
      'Arrow to D:χ²GOF-Test… and press enter.',
    ],
    showPath: 'stat → χ²GOF-Test → enter',
  },
  {
    id: 'stat-produce-chi2gof-a',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · χ²GOF',
    prompt:
      'Observed counts: 18, 22, 20, 25. Expected counts (equal): 21.25, 21.25, 21.25, 21.25. Run a GOF test and find the p-value.',
    goalText: 'Enter observed and expected as comma-separated lists, then Calculate. Read p.',
    successCue: 'You should see p ≈ 0.739',
    targetRoutine: 'chi2-GOF',
    resultKey: 'p',
    expected: 0.7389332689,
    tolerance: 0.005,
    expectedInputs: {
      observed: '18,22,20,25',
      expected: '21.25,21.25,21.25,21.25',
    },
    hints: [
      'stat → χ²GOF-Test…',
      'Use the comma key between list values (no spaces needed).',
      'Read the p=… line on the result screen.',
    ],
    showPath: 'stat → χ²GOF → observed 18,22,20,25 → expected 21.25×4 → Calculate',
  },
  {
    id: 'stat-produce-chi2gof-b',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · χ²GOF',
    prompt:
      'Observed counts: 10, 15, 12, 13, 10. Expected counts (equal): 12, 12, 12, 12, 12. Find the p-value.',
    goalText: 'Enter both lists as csv, Calculate, and read p.',
    successCue: 'You should see p ≈ 0.827',
    targetRoutine: 'chi2-GOF',
    resultKey: 'p',
    expected: 0.8266414673,
    tolerance: 0.005,
    expectedInputs: {
      observed: '10,15,12,13,10',
      expected: '12,12,12,12,12',
    },
    hints: [
      'Same path — new lists.',
      'Observed and expected must have the same number of categories.',
    ],
    showPath: 'stat → χ²GOF → 10,15,12,13,10 / 12,12,12,12,12 → Calculate',
  },
  {
    id: 'stat-produce-chi2gof-c',
    family: 'STAT TESTS',
    goal: 'produce',
    skillLabel: 'Produce · χ²GOF',
    prompt:
      'Observed counts: 30, 25, 28, 17. Expected counts: 25, 25, 25, 25. Find the p-value.',
    goalText: 'Enter both lists as csv, Calculate, and read p.',
    successCue: 'You should see p ≈ 0.270',
    targetRoutine: 'chi2-GOF',
    resultKey: 'p',
    expected: 0.270233271,
    tolerance: 0.005,
    expectedInputs: {
      observed: '30,25,28,17',
      expected: '25,25,25,25',
    },
    hints: [
      'stat → χ²GOF-Test…',
      'Observed: 30,25,28,17 — Expected: 25,25,25,25.',
    ],
    showPath: 'stat → χ²GOF → 30,25,28,17 / 25,25,25,25 → Calculate',
  },
];

export const CALCULATOR_DRILL_DECKS: CalculatorDrillDeck[] = [
  {
    id: 'normalcdf',
    title: 'DISTR · Find an area',
    description: 'Use normalcdf to find probabilities under a normal curve.',
    family: 'DISTR',
    drills: NORMALCDF_DRILLS,
  },
  {
    id: 'invnorm',
    title: 'DISTR · Find a cutoff',
    description: 'Use invNorm to find z-scores and critical values.',
    family: 'DISTR',
    drills: INVNORM_DRILLS,
  },
  {
    id: 'tcdf',
    title: 'DISTR · t probabilities',
    description: 'Use tcdf to find areas under a t-curve.',
    family: 'DISTR',
    drills: TCDF_DRILLS,
  },
  {
    id: 'invt',
    title: 'DISTR · t critical values',
    description: 'Use invT to find t* cutoffs for intervals and tests.',
    family: 'DISTR',
    drills: INVT_DRILLS,
  },
  {
    id: '1-prop-ztest',
    title: 'Inference · 1-PropZTest',
    description: 'Run a one-sample proportion z-test and read the p-value.',
    family: 'STAT TESTS',
    drills: ONE_PROP_DRILLS,
  },
  {
    id: '2-prop-ztest',
    title: 'Inference · 2-PropZTest',
    description: 'Compare two proportions and read the p-value.',
    family: 'STAT TESTS',
    drills: TWO_PROP_DRILLS,
  },
  {
    id: '2-samp-ttest',
    title: 'Inference · 2-SampTTest',
    description: 'Compare two means with a two-sample t-test.',
    family: 'STAT TESTS',
    drills: TWO_SAMP_T_DRILLS,
  },
  {
    id: 'tinterval',
    title: 'Inference · TInterval',
    description: 'Build a one-sample t confidence interval for μ.',
    family: 'STAT TESTS',
    drills: T_INTERVAL_DRILLS,
  },
  {
    id: 'chi2-gof',
    title: 'Inference · χ² GOF',
    description: 'Run a chi-square goodness-of-fit test from count lists.',
    family: 'STAT TESTS',
    drills: CHI2_GOF_DRILLS,
  },
];

/** Flat list of every drill (legacy / lookup). */
export const CALCULATOR_DRILLS: CalculatorDrill[] = CALCULATOR_DRILL_DECKS.flatMap(
  (deck) => deck.drills,
);

export function getDeckById(id: string): CalculatorDrillDeck | undefined {
  return CALCULATOR_DRILL_DECKS.find((d) => d.id === id);
}

export function getDrillById(id: string): CalculatorDrill | undefined {
  return CALCULATOR_DRILLS.find((d) => d.id === id);
}
