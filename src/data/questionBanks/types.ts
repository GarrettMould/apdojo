import { StaticImageData } from 'next/image';

export type { StaticImageData };

export interface Question {
  id: number;
  questionNumber?: number;
  unit: number;
  subject: 'ap_macroeconomics' | 'ap_microeconomics' | ('ap_macroeconomics' | 'ap_microeconomics')[];
  unitName: string;
  question: string;
  image: StaticImageData | { src: string; alt: string } | null;
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