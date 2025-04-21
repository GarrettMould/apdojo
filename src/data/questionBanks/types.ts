import { StaticImageData } from 'next/image';

export type { StaticImageData };

export interface Question {
  id: number;
  questionNumber?: number;
  unit: number;
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
  unitName: string;
  question: string;
  image: StaticImageData | null;
  options: string[];
  correctAnswer: string;
  explanation: string;
  lessonIDS: string[];
}

export interface QuestionBank {
  name: string;
  questions: Question[];
} 