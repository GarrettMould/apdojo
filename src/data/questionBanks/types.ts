import { StaticImageData } from 'next/image';

export type { StaticImageData };

export interface Question {
  id: number;
  questionNumber?: number;
  unit: number;
  subject:
    | 'ap_macroeconomics'
    | 'ap_microeconomics'
    | 'ap_us_government'
    | 'ap_statistics'
    | ('ap_macroeconomics' | 'ap_microeconomics' | 'ap_us_government' | 'ap_statistics')[];
  unitName: string;
  question: string;
  image: StaticImageData | { src: string; alt: string } | null;
  /** Optional prose rendered after the question image (e.g. the ask when the figure is mid-stem). */
  questionAfterImage?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  explanationVideo?: string;
  videoExplanation?: string | null; // Video explanation path for MCQ questions
  lessonIDS: string[];
  isTest?: boolean; // Flag for test-only questions
  tableData?: {
    headers: string[];
    rows: string[][];
    rowHeaders?: boolean;
    playerNames?: {
      row: string;
      column: string;
    };
  };
  optionTableHeaders?: string[]; // Column headers for displaying options as a table
  questionGroup?: string | number; // Optional group identifier to keep questions together (e.g., questions sharing the same graph)
  sliderExplainer?: string; // URL to video explanation slider
  optionImages?: Array<{ src: string; alt: string }>; // Array of images for answer options (one per option)
}

export interface QuestionBank {
  name: string;
  questions: Question[];
} 