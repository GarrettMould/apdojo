/* ── TI-84 Plus Simulator — math implementations ─────────────── */

/**
 * All math here is plain JS — no external stats library needed.
 * We use well-known approximations for the normal CDF, t-distribution, etc.
 */

// ─── Normal distribution helpers ────────────────────────────────

/** Standard normal CDF (Abramowitz & Stegun approximation, max error ~1.5e-7). */
export function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * z);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  return 0.5 * (1.0 + sign * y);
}

/** normalcdf(lower, upper, μ, σ) — area under normal curve. */
export function normalcdf(lower: number, upper: number, mu = 0, sigma = 1): number {
  return normalCDF((upper - mu) / sigma) - normalCDF((lower - mu) / sigma);
}

/** invNorm(area, μ, σ) — inverse normal using rational approximation. */
export function invNorm(area: number, mu = 0, sigma = 1): number {
  if (area <= 0 || area >= 1) return NaN;
  return mu + sigma * rationalApproxInvNorm(area);
}

function rationalApproxInvNorm(p: number): number {
  // Peter Acklam's algorithm
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.383577518672690e2, -3.066479806614716e1, 2.506628277459239e0,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0,
    -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0,
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0,
    3.754408661907416e0,
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number, r: number;

  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return (
      -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
}

// ─── t-distribution helpers ─────────────────────────────────────

/** Regularized incomplete beta function (for t-distribution CDF). */
function incompleteBeta(a: number, b: number, x: number): number {
  if (x === 0 || x === 1) return x;
  const maxIter = 200;
  const eps = 1e-12;

  const lnBeta = lgamma(a) + lgamma(b) - lgamma(a + b);
  const front = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lnBeta) / a;

  // Lentz's continued fraction
  let f = 1, c = 1, d = 0;
  for (let i = 0; i <= maxIter; i++) {
    let m = Math.floor(i / 2);
    let numerator: number;
    if (i === 0) {
      numerator = 1;
    } else if (i % 2 === 0) {
      numerator = (m * (b - m) * x) / ((a + 2 * m - 1) * (a + 2 * m));
    } else {
      numerator = -((a + m) * (a + b + m) * x) / ((a + 2 * m) * (a + 2 * m + 1));
    }
    d = 1 + numerator * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    d = 1 / d;
    c = 1 + numerator / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    f *= c * d;
    if (Math.abs(c * d - 1) < eps) break;
  }

  return front * (f - 1);
}

/** Log-gamma (Stirling / Lanczos). */
function lgamma(x: number): number {
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  }
  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += coef[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

/** CDF of t-distribution with df degrees of freedom. */
export function tCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  const ib = incompleteBeta(df / 2, 0.5, x);
  return t >= 0 ? 1 - 0.5 * ib : 0.5 * ib;
}

/** tcdf(lower, upper, df) — area under t-curve. */
export function tcdf(lower: number, upper: number, df: number): number {
  return tCDF(upper, df) - tCDF(lower, df);
}

/** invT(area, df) — inverse t via bisection. */
export function invT(area: number, df: number): number {
  if (area <= 0 || area >= 1) return NaN;
  let lo = -100, hi = 100;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (tCDF(mid, df) < area) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// ─── Chi-square helpers ─────────────────────────────────────────

/** CDF of chi-square distribution. */
function chi2CDF(x: number, k: number): number {
  if (x <= 0) return 0;
  return regularizedGammaP(k / 2, x / 2);
}

function regularizedGammaP(a: number, x: number): number {
  if (x === 0) return 0;
  if (x < a + 1) {
    // Series expansion
    let sum = 1 / a, term = 1 / a;
    for (let n = 1; n < 200; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < 1e-12) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
  } else {
    // Continued fraction
    return 1 - regularizedGammaQ(a, x);
  }
}

function regularizedGammaQ(a: number, x: number): number {
  let f = 1, c = 1, d = 0;
  for (let i = 0; i < 200; i++) {
    const an = i === 0 ? 1 : (i % 2 === 1 ? Math.ceil(i / 2) : -(a - 1 + i / 2)) ;
    const bn = i === 0 ? 0 : (i === 1 ? x : 1);
    // Simplified: use Lentz for gamma continued fraction
    if (i === 0) { d = x + 1 - a; if (Math.abs(d) < 1e-30) d = 1e-30; d = 1/d; f = d; continue; }
    const delta = (i % 2 === 1) ? (Math.ceil(i/2)) * 1.0 : -(a - 1 + i/2);
    d = x + 1 - a + i + delta / d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    d = 1/d;
    c = x + 1 - a + i + delta / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    f *= c * d;
    if (Math.abs(c * d - 1) < 1e-12) break;
  }
  return Math.exp(-x + a * Math.log(x) - lgamma(a)) * f;
}

// ─── Statistical tests ──────────────────────────────────────────

export type TestResult = { lines: { label: string; value: string }[] };

/** 2-Sample T-Test (unequal variances / Welch's). */
export function twoSampTTest(
  x1: number, s1: number, n1: number,
  x2: number, s2: number, n2: number,
): TestResult {
  const se = Math.sqrt(s1 * s1 / n1 + s2 * s2 / n2);
  const t = (x1 - x2) / se;
  const v1 = s1 * s1 / n1, v2 = s2 * s2 / n2;
  const df = (v1 + v2) ** 2 / (v1 * v1 / (n1 - 1) + v2 * v2 / (n2 - 1));
  const p = 2 * (1 - tCDF(Math.abs(t), df));
  return {
    lines: [
      { label: '2-SampTTest', value: '' },
      { label: 't', value: t.toFixed(10) },
      { label: 'p', value: p.toExponential(9) },
      { label: 'df', value: df.toFixed(6) },
      { label: 'x̄₁', value: x1.toString() },
      { label: 'x̄₂', value: x2.toString() },
      { label: 'Sx₁', value: s1.toString() },
      { label: 'Sx₂', value: s2.toString() },
      { label: 'n₁', value: n1.toString() },
      { label: 'n₂', value: n2.toString() },
    ],
  };
}

/** 1-Prop Z-Test. */
export function onePropZTest(
  p0: number, x: number, n: number,
): TestResult {
  const pHat = x / n;
  const se = Math.sqrt(p0 * (1 - p0) / n);
  const z = (pHat - p0) / se;
  const pVal = 2 * (1 - normalCDF(Math.abs(z)));
  return {
    lines: [
      { label: '1-PropZTest', value: '' },
      { label: 'z', value: z.toFixed(10) },
      { label: 'p', value: pVal.toExponential(9) },
      { label: 'p̂', value: pHat.toFixed(10) },
      { label: 'n', value: n.toString() },
    ],
  };
}

/** 2-Prop Z-Test. */
export function twoPropZTest(
  x1: number, n1: number, x2: number, n2: number,
): TestResult {
  const p1 = x1 / n1, p2 = x2 / n2;
  const pPool = (x1 + x2) / (n1 + n2);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / n1 + 1 / n2));
  const z = (p1 - p2) / se;
  const pVal = 2 * (1 - normalCDF(Math.abs(z)));
  return {
    lines: [
      { label: '2-PropZTest', value: '' },
      { label: 'z', value: z.toFixed(10) },
      { label: 'p', value: pVal.toExponential(9) },
      { label: 'p̂₁', value: p1.toFixed(10) },
      { label: 'p̂₂', value: p2.toFixed(10) },
      { label: 'p̂', value: pPool.toFixed(10) },
      { label: 'n₁', value: n1.toString() },
      { label: 'n₂', value: n2.toString() },
    ],
  };
}

/** T-Interval (1-sample). */
export function tInterval(
  xbar: number, sx: number, n: number, cLevel: number,
): TestResult {
  const df = n - 1;
  const tStar = invT(1 - (1 - cLevel) / 2, df);
  const me = tStar * sx / Math.sqrt(n);
  return {
    lines: [
      { label: 'TInterval', value: '' },
      { label: '', value: `(${(xbar - me).toFixed(6)}, ${(xbar + me).toFixed(6)})` },
      { label: 'x̄', value: xbar.toFixed(6) },
      { label: 'Sx', value: sx.toFixed(6) },
      { label: 'n', value: n.toString() },
    ],
  };
}

/** Chi-Square Goodness-of-Fit Test. */
export function chiSquareGOF(
  observed: number[], expected: number[],
): TestResult {
  const df = observed.length - 1;
  let chi2 = 0;
  for (let i = 0; i < observed.length; i++) {
    chi2 += (observed[i] - expected[i]) ** 2 / expected[i];
  }
  const pVal = 1 - chi2CDF(chi2, df);
  return {
    lines: [
      { label: 'χ²-Test', value: '' },
      { label: 'χ²', value: chi2.toFixed(10) },
      { label: 'p', value: pVal.toExponential(9) },
      { label: 'df', value: df.toString() },
    ],
  };
}

// ─── STAT > CALC routines ───────────────────────────────────────

/** 1-Var Stats from a data list. */
export function oneVarStats(data: number[]): TestResult {
  const n = data.length;
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const sumSq = data.reduce((a, b) => a + b * b, 0);
  const sx = Math.sqrt(data.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1));
  const sorted = [...data].sort((a, b) => a - b);
  const median = n % 2 === 1 ? sorted[Math.floor(n / 2)] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const q1 = quartile(sorted, 0.25);
  const q3 = quartile(sorted, 0.75);

  return {
    lines: [
      { label: '1-Var Stats', value: '' },
      { label: 'x̄', value: mean.toFixed(9) },
      { label: 'Σx', value: sum.toString() },
      { label: 'Σx²', value: sumSq.toString() },
      { label: 'Sx', value: sx.toFixed(9) },
      { label: 'σx', value: (Math.sqrt(data.reduce((a, b) => a + (b - mean) ** 2, 0) / n)).toFixed(9) },
      { label: 'n', value: n.toString() },
      { label: 'minX', value: sorted[0].toString() },
      { label: 'Q₁', value: q1.toString() },
      { label: 'Med', value: median.toString() },
      { label: 'Q₃', value: q3.toString() },
      { label: 'maxX', value: sorted[n - 1].toString() },
    ],
  };
}

function quartile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

/** LinReg(a+bx) — simple linear regression. */
export function linReg(xData: number[], yData: number[]): TestResult {
  const n = xData.length;
  const sx = xData.reduce((a, b) => a + b, 0);
  const sy = yData.reduce((a, b) => a + b, 0);
  const sxy = xData.reduce((a, b, i) => a + b * yData[i], 0);
  const sx2 = xData.reduce((a, b) => a + b * b, 0);
  const sy2 = yData.reduce((a, b) => a + b * b, 0);

  const b = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const a = (sy - b * sx) / n;
  const r = (n * sxy - sx * sy) / Math.sqrt((n * sx2 - sx * sx) * (n * sy2 - sy * sy));
  const r2 = r * r;

  return {
    lines: [
      { label: 'LinReg', value: '' },
      { label: 'y=a+bx', value: '' },
      { label: 'a', value: a.toFixed(9) },
      { label: 'b', value: b.toFixed(9) },
      { label: 'r²', value: r2.toFixed(9) },
      { label: 'r', value: r.toFixed(9) },
    ],
  };
}
