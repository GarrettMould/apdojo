import { StaticImageData } from 'next/image';

export type { StaticImageData };

export interface Question {
  id: number;
  questionNumber?: number;
  unit: number;
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
  unitName: string;
  question: string;
  image: StaticImageData | { src: string; alt: string } | null;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  explanationVideo?: string;
  lessonIDS: string[];
  isTest?: boolean; // Flag for test-only questions
}

export interface QuestionBank {
  name: string;
  questions: Question[];
} 