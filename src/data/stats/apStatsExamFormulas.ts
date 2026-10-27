/**
 * Exam-style AP Statistics formula sheet.
 * Matches the three sections provided on the AP Statistics exam.
 * Recreated for on-screen lookup (not a College Board document).
 */

export type StatsFormulaSectionId = 'descriptive' | 'probability' | 'inferential';

export type FormulaBlock =
  | { type: 'note'; text: string }
  | { type: 'formula'; latex: string }
  | {
      type: 'table';
      headers: string[];
      rows: { label: string; latex: string; note?: string }[];
    };

export type StatsFormulaSection = {
  id: StatsFormulaSectionId;
  roman: string;
  title: string;
  blocks: FormulaBlock[];
};

export const AP_STATS_EXAM_FORMULA_SECTIONS: StatsFormulaSection[] = [
  {
    id: 'descriptive',
    roman: 'I',
    title: 'Descriptive Statistics',
    blocks: [
      { type: 'formula', latex: String.raw`\bar{x}=\dfrac{\sum x_i}{n}` },
      { type: 'formula', latex: String.raw`s_x=\sqrt{\dfrac{\sum(x_i-\bar{x})^2}{n-1}}` },
      {
        type: 'formula',
        latex: String.raw`s_p=\sqrt{\dfrac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}}`,
      },
      { type: 'formula', latex: String.raw`\hat{y}=b_0+b_1x` },
      {
        type: 'formula',
        latex: String.raw`b_1=\dfrac{\sum(x_i-\bar{x})(y_i-\bar{y})}{\sum(x_i-\bar{x})^2}`,
      },
      { type: 'formula', latex: String.raw`b_0=\bar{y}-b_1\bar{x}` },
      {
        type: 'formula',
        latex: String.raw`r=\dfrac{1}{n-1}\sum\left(\dfrac{x_i-\bar{x}}{s_x}\right)\left(\dfrac{y_i-\bar{y}}{s_y}\right)`,
      },
      { type: 'formula', latex: String.raw`b_1=r\dfrac{s_y}{s_x}` },
      {
        type: 'formula',
        latex: String.raw`s_{b_1}=\dfrac{\sqrt{\dfrac{\sum(y_i-\hat{y}_i)^2}{n-2}}}{\sqrt{\sum(x_i-\bar{x})^2}}`,
      },
    ],
  },
  {
    id: 'probability',
    roman: 'II',
    title: 'Probability',
    blocks: [
      { type: 'formula', latex: String.raw`P(A\cup B)=P(A)+P(B)-P(A\cap B)` },
      { type: 'formula', latex: String.raw`P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}` },
      { type: 'formula', latex: String.raw`E(X)=\mu_x=\sum x_i p_i` },
      {
        type: 'formula',
        latex: String.raw`\operatorname{Var}(X)=\sigma_x^2=\sum(x_i-\mu_x)^2 p_i`,
      },
      {
        type: 'note',
        text: 'If X has a binomial distribution with parameters n and p, then:',
      },
      {
        type: 'formula',
        latex: String.raw`P(X=k)=\dbinom{n}{k}p^k(1-p)^{n-k}`,
      },
      { type: 'formula', latex: String.raw`\mu_x=np` },
      { type: 'formula', latex: String.raw`\sigma_x=\sqrt{np(1-p)}` },
      { type: 'formula', latex: String.raw`\mu_{\hat{p}}=p` },
      { type: 'formula', latex: String.raw`\sigma_{\hat{p}}=\sqrt{\dfrac{p(1-p)}{n}}` },
      {
        type: 'note',
        text: 'If x̄ is the mean of a random sample of size n from an infinite population with mean μ and standard deviation σ, then:',
      },
      { type: 'formula', latex: String.raw`\mu_{\bar{x}}=\mu` },
      { type: 'formula', latex: String.raw`\sigma_{\bar{x}}=\dfrac{\sigma}{\sqrt{n}}` },
    ],
  },
  {
    id: 'inferential',
    roman: 'III',
    title: 'Inferential Statistics',
    blocks: [
      {
        type: 'formula',
        latex: String.raw`\text{standardized test statistic}=\dfrac{\text{statistic}-\text{parameter}}{\text{standard deviation of statistic}}`,
      },
      {
        type: 'formula',
        latex: String.raw`\text{confidence interval: statistic}\pm(\text{critical value})(\text{standard deviation of statistic})`,
      },
      {
        type: 'table',
        headers: ['Statistic', 'Standard Deviation of Statistic'],
        rows: [
          { label: 'Sample Mean', latex: String.raw`\dfrac{\sigma}{\sqrt{n}}` },
          {
            label: 'Sample Proportion',
            latex: String.raw`\sqrt{\dfrac{p(1-p)}{n}}`,
          },
          {
            label: 'Difference of sample means',
            latex: String.raw`\sqrt{\dfrac{\sigma_1^2}{n_1}+\dfrac{\sigma_2^2}{n_2}}`,
            note: String.raw`\text{Special case when }\sigma_1=\sigma_2=\sigma:\quad \sigma\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}`,
          },
          {
            label: 'Difference of sample proportions',
            latex: String.raw`\sqrt{\dfrac{p_1(1-p_1)}{n_1}+\dfrac{p_2(1-p_2)}{n_2}}`,
            note: String.raw`\text{Special case when }p_1=p_2=p:\quad \sqrt{p(1-p)\left(\dfrac{1}{n_1}+\dfrac{1}{n_2}\right)}`,
          },
        ],
      },
      {
        type: 'formula',
        latex: String.raw`\chi^2=\sum\dfrac{(\text{observed}-\text{expected})^2}{\text{expected}}`,
      },
    ],
  },
];

/** Default tab on the exam sheet for a Stats unit. Full sheet remains available. */
export function defaultFormulaSectionForUnit(unit: number): StatsFormulaSectionId {
  if (unit <= 1) return 'descriptive';
  if (unit === 2 || unit === 3) return 'probability';
  if (unit === 5) return 'descriptive';
  return 'inferential';
}
