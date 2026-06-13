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
}

export interface StatsFrqPart {
  label: string;
  text: string;
  answerType?: 'text' | 'draw';
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
    id: 'u1-frq-1-sourdough-weights',
    title: 'FRQ 1: Comparing Distributions of Loaf Weights',
    scenario: `Scenario: A bakery manager produces two types of artisanal sourdough loaves, Type X and Type Y. She wants to compare the weights of the two types and takes independent random samples of 16 loaves from each type. The weight, in grams, of each loaf is measured. The weights of the 16 Type X loaves are recorded below.

Weights of Type X Loaves (grams):
${TYPE_X_WEIGHTS}`,
    parts: [
      {
        label: 'A',
        text: 'Use the data in the list to determine the five-number summary for the sample of Type X loaves.',
        answerType: 'text',
      },
      {
        label: 'B',
        text: 'The distribution of weight for Type Y loaves is displayed in the boxplot below.\n\nUse the five-number summary from Part A and the boxplot of Type Y to compare the distribution of weight for the Type X loaves and the distribution of weight for the Type Y loaves, in context.',
        image: {
          src: `${STATS_FRQ_IMAGE_BASE}/type_y_boxplot.svg`,
          alt: 'Boxplot of Type Y sourdough loaf weights in grams',
        },
        answerType: 'text',
      },
      {
        label: 'C',
        text: 'A stem-and-leaf plot is another way to display the weights of the loaves. The distribution of weight for the Type X loaves is displayed in the stem-and-leaf plot below.\n\nConsider the five-number summary from Part A and the stem-and-leaf plot.',
        image: {
          src: `${STATS_FRQ_IMAGE_BASE}/type_x_stem_leaf.svg`,
          alt: 'Stem-and-leaf plot of Type X sourdough loaf weights in grams',
        },
        subparts: [
          {
            label: 'i',
            text: 'If a boxplot were created from the five-number summary found in Part A, what characteristic of the shape of the distribution of weight for the Type X loaves would be apparent from the stem-and-leaf plot but not from the boxplot?',
            answerType: 'text',
          },
          {
            label: 'ii',
            text: 'Explain why a boxplot would not display the characteristic of the shape of the distribution identified in Part C (i).',
            answerType: 'text',
          },
        ],
      },
    ],
  },
  {
    id: 'u1-frq-2-daily-steps',
    title: 'FRQ 2: Displaying Daily Step Counts',
    scenario:
      'Directions: Show all your work. Indicate clearly the methods you use, because you will be scored on the correctness of your methods as well as on the accuracy and completeness of your results and explanations.\n\nThe daily step counts, in thousands of steps, of the 20 employees at a tech company over the course of one month are summarized in the following histogram.',
    image: {
      src: `${STATS_FRQ_IMAGE_BASE}/step_count_histogram.svg`,
      alt: 'Histogram of daily step counts in thousands for 20 employees',
    },
    parts: [
      {
        label: 'a',
        text: 'Based on the histogram, write a few sentences describing the distribution of daily step counts for the employees.',
        answerType: 'text',
      },
      {
        label: 'b',
        text: 'Summary statistics for the step counts are given in the following table.\n\nDetermine whether there are potential outliers in the data.',
        tableImage: {
          src: FRQ2_SUMMARY_TABLE,
          alt: 'Summary statistics for daily step counts in thousands of steps',
        },
        answerType: 'text',
        drawPrompt: 'Use the following grid to sketch a boxplot of daily step count.',
        image: {
          src: `${STATS_FRQ_IMAGE_BASE}/boxplot_sketch_grid.svg`,
          alt: 'Empty grid for sketching a boxplot',
        },
      },
      {
        label: 'c',
        text: 'What characteristic of the shape of the distribution of daily step counts is apparent from the histogram but not from the boxplot?',
        answerType: 'text',
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
      tableData?: StatsFrqTableData;
      stimulusImage?: StatsFrqImage;
      partImage?: StatsFrqImage;
      drawPrompt?: string;
      subparts?: Array<{
        label: string;
        text: string;
        answerType: 'text' | 'draw';
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
        tableData: part.tableData,
        stimulusImage: part.tableImage,
        partImage: part.image,
        drawPrompt: part.drawPrompt,
        subparts: part.subparts?.map((sub) => ({
          label: sub.label,
          text: sub.text,
          answerType: sub.answerType ?? 'text',
          partImage: sub.image,
        })),
      })),
    })),
  };
}
