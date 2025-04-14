import { StaticImageData } from 'next/image';

export interface Question {
  id: number;
  unit: number;
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