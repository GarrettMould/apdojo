import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Micro Practice Tests',
  description:
    'Free AP Microeconomics unit MCQ tests and full-length practice exams with explanations. Built for the 2027 exam.',
  openGraph: {
    title: 'AP Micro Practice Tests',
    description:
      'Free AP Microeconomics unit MCQ tests and full-length practice exams with explanations.',
    url: 'https://apdojo.com/ap-micro-practice-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Micro Practice Tests',
    description:
      'Free AP Microeconomics unit MCQ tests and full-length practice exams with explanations.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-micro-practice-tests',
  },
};

export default function APMicroPracticeTestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
