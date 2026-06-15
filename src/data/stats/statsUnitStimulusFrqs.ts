/** Matches `FullExamFRQ` `tableData`. */
export interface StatsFrqTableData {
  headers: string[];
  rows: (string | number)[][];
  rowHeaders?: boolean;
}

export interface StatsFrqImage {
  src: string;
  alt: string;
}

export interface StatsFrqSubpart {
  label: string;
  text: string;
  answerType?: 'text' | 'draw';
  image?: StatsFrqImage;
  /** Sample response shown on results when set. */
  answer?: string;
}

export interface StatsFrqPart {
  label: string;
  text: string;
  answerType?: 'text' | 'draw';
  /** Sample response shown on results when set. */
  answer?: string;
  /** Optional table shown after the part stem (e.g. summary statistics). */
  tableData?: StatsFrqTableData;
  /** Stimulus image after the stem (e.g. summary statistics table SVG). */
  tableImage?: StatsFrqImage;
  /** Diagram for this part only (boxplot, stem-and-leaf, sketch grid). */
  image?: StatsFrqImage;
  /** When set with `answerType: 'text'`, also show a drawing pad (e.g. sketch a boxplot). */
  drawPrompt?: string;
  subparts?: StatsFrqSubpart[];
}

export interface StatsStimulusFrq {
  id: string;
  title: string;
  /** Scenario / directions shown above parts. */
  scenario: string;
  /** Stimulus image for the whole question (e.g. histogram). */
  image?: StatsFrqImage;
  parts: StatsFrqPart[];
}

const STATS_FRQ_IMAGE_BASE =
  'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/stats/unit1';

const FRQ2_SUMMARY_TABLE = `${STATS_FRQ_IMAGE_BASE}/frq2summary.svg`;

const TYPE_X_WEIGHTS =
  '410, 415, 430, 430, 440, 445, 445, 450, 450, 460, 470, 480, 490, 495, 495, 500';

export const statsUnit1StimulusFrqs: StatsStimulusFrq[] = [
  {
    id: 'u1-frq-stats-bakery',
    title: 'FRQ: Quantitative Data Analysis',
    scenario: `A bakery manager produces two types of artisanal sourdough loaves, Type X and Type Y. She wants to compare the weights of the two types and takes independent random samples of 16 loaves from each type. The weight, in grams, of each loaf is measured. The weights of the 16 Type X loaves are recorded below.

Weights of Type X Loaves (grams):
${TYPE_X_WEIGHTS}

Respond to parts A, B, and C below.`,
    parts: [
      {
        label: 'A',
        text: 'Use the data in the list to determine the five-number summary for the sample of Type X loaves.',
        answerType: 'text',
        answer:
          'Five-Number Summary for Type X: Min: 410, Q1: 435, Median: 450, Q3: 485, Max: 500.',
      },
      {
        label: 'B',
        text: 'Use the five-number summary from Part A and the boxplot of Type Y to compare the distribution of weight for the Type X loaves and the distribution of weight for the Type Y loaves, in context.',
        image: {
          src: `${STATS_FRQ_IMAGE_BASE}/type_y_boxplot.svg`,
          alt: 'Boxplot of Type Y sourdough loaf weights',
        },
        answerType: 'text',
        answer:
          'Center: The median weight of Type Y loaves (460g) is higher than Type X (450g). Outliers: No obvious outliers for either distribution based on the 1.5 × IQR rule. Variability: Type X has a larger IQR (50g) than Type Y (45g), but Type Y has a slightly larger overall range (95g) compared to Type X (90g).',
      },
      {
        label: 'C',
        text: 'Consider the five-number summary from Part A and the stem-and-leaf plot.',
        image: {
          src: `${STATS_FRQ_IMAGE_BASE}/type_x_stem_leaf.svg`,
          alt: 'Stem-and-leaf plot of Type X sourdough loaf weights',
        },
        subparts: [
          {
            label: 'i',
            text: 'If a boxplot were created from the five-number summary found in Part A, what characteristic of the shape of the distribution of weight for the Type X loaves would be apparent from the stem-and-leaf plot but not from the boxplot?',
            answerType: 'text',
            answer:
              'The stem-and-leaf plot reveals that the distribution is bimodal and shows a distinct gap, which is not apparent in the boxplot.',
          },
          {
            label: 'ii',
            text: 'Explain why a boxplot would not display the characteristic of the shape of the distribution identified in Part C (i).',
            answerType: 'text',
            answer:
              'A boxplot collapses the dataset into five summary statistics, discarding frequency information and specific gaps, masking the modality of the distribution.',
          },
        ],
      },
    ],
  },
  {
    id: 'u1-frq-2-steps-wellness',
    title: 'FRQ 2: Data Description and Study Design',
    scenario: `The daily step counts, in thousands of steps, of the 20 employees at a tech company over the course of one month are summarized in the following histogram.

Show all your work and indicate clearly the methods you use.`,
    image: {
      src: `${STATS_FRQ_IMAGE_BASE}/step_count_histogram.svg`,
      alt: 'Histogram showing daily step counts for 20 employees',
    },
    parts: [
      {
        label: 'A',
        text: 'Based on the histogram, describe the distribution of daily step counts for the employees.',
        answerType: 'text',
        answer:
          'The distribution is bimodal with two peaks (around 6–8k and 14–16k steps), the median is in the interval from 10–12k steps, the range is 14k steps, and there are no obvious outliers.',
      },
      {
        label: 'B',
        text: 'Summary statistics for the step counts are given in the following table.',
        tableImage: {
          src: FRQ2_SUMMARY_TABLE,
          alt: 'Summary statistics table for step counts',
        },
        subparts: [
          {
            label: 'i',
            text: 'Determine whether there are potential outliers in the data.',
            answerType: 'text',
            answer:
              'No outliers. Lower fence: 6 − (1.5 × 8.5) = −6.75; upper fence: 14.5 + (1.5 × 8.5) = 27.25.',
          },
          {
            label: 'ii',
            text: 'Use the following grid to sketch a boxplot of daily step count.',
            answerType: 'draw',
            image: {
              src: `${STATS_FRQ_IMAGE_BASE}/boxplot_sketch_grid.svg`,
              alt: 'Grid for sketching the boxplot',
            },
            answer:
              'Boxplot: box from 6 to 14.5, median line at 9.5, whiskers to 4 and 17.',
          },
        ],
      },
      {
        label: 'C',
        text: "Suppose the manager wants to know if these 20 employees are representative of the daily step counts for all 500 employees at the tech company. Explain why the manager's current data collection method might be problematic for making this generalization.",
        answerType: 'text',
        answer:
          'The 20 employees were not selected using a random mechanism. If this sample is not representative of the 500 employees (e.g., specific shifts or departments), the result may be biased and inappropriate to generalize to the population.',
      },
      {
        label: 'D',
        text: 'A researcher proposes a new study to determine if a wellness program increases the daily step counts of the employees. Determine a valid investigative question for this study. Ensure all three components of a valid investigative question are included in your response.',
        answerType: 'text',
        answer:
          'Is there convincing statistical evidence that the mean daily step count for all employees at the tech company is higher after participating in the wellness program compared to before? (Includes the mean step count variable, a higher direction of change, and all employees as the population of interest.)',
      },
      {
        label: 'E',
        text: 'Briefly describe how the researcher could improve the study design to establish a cause-and-effect relationship between the wellness program and daily step counts.',
        answerType: 'text',
        answer:
          'Conduct a well-designed experiment with random assignment. This balances extraneous sources of variation between the treatment group (wellness program) and the control group, allowing for a causal conclusion.',
      },
    ],
  },
];

export const statsUnitStimulusFrqByUnit: Record<number, StatsStimulusFrq[]> = {
  1: statsUnit1StimulusFrqs,
};

export function getStatsUnitStimulusFrqs(unitNumber: number): StatsStimulusFrq[] {
  return statsUnitStimulusFrqByUnit[unitNumber] ?? [];
}

export function getStatsUnitFrqFormatLabels(unitNumber: number): string[] {
  return getStatsUnitStimulusFrqs(unitNumber).map((frq) => {
    const m = frq.title.match(/^FRQ\s*\d+\s*:\s*(.+)$/i);
    return m ? m[1].trim() : frq.title;
  });
}

/** Shape expected by `FullExamFRQ`. */
export function buildStatsUnitFrqPackForFullExam(unitNumber: number): {
  examTitle: string;
  questions: Array<{
    questionNumber: number;
    questionTitle?: string;
    prompt: string;
    image?: StatsFrqImage;
    parts: Array<{
      label: string;
      text: string;
      answerType: 'text' | 'draw' | null;
      answer?: string;
      tableData?: StatsFrqTableData;
      stimulusImage?: StatsFrqImage;
      partImage?: StatsFrqImage;
      drawPrompt?: string;
      subparts?: Array<{
        label: string;
        text: string;
        answerType: 'text' | 'draw';
        answer?: string;
        partImage?: StatsFrqImage;
      }>;
    }>;
  }>;
} | null {
  const pack = getStatsUnitStimulusFrqs(unitNumber);
  if (pack.length === 0) return null;

  return {
    examTitle: `AP Statistics Unit ${unitNumber} FRQ Pack (${pack.length} Questions)`,
    questions: pack.map((frq, idx) => ({
      questionNumber: idx + 1,
      questionTitle: frq.title,
      prompt: frq.scenario,
      image: frq.image,
      parts: frq.parts.map((part) => ({
        label: part.label,
        text: part.text,
        answerType: part.answerType ?? (part.subparts?.length ? null : 'text'),
        answer: part.answer,
        tableData: part.tableData,
        stimulusImage: part.tableImage,
        partImage: part.image,
        drawPrompt: part.drawPrompt,
        subparts: part.subparts?.map((sub) => ({
          label: sub.label,
          text: sub.text,
          answerType: sub.answerType ?? 'text',
          answer: sub.answer,
          partImage: sub.image,
        })),
      })),
    })),
  };
}
