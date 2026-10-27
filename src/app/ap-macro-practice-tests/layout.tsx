import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Macro Practice Tests',
  description:
    'Free AP Macroeconomics unit MCQ tests and full-length practice exams with explanations. Built for the 2027 exam.',
  openGraph: {
    title: 'AP Macro Practice Tests',
    description:
      'Free AP Macroeconomics unit MCQ tests and full-length practice exams with explanations.',
    url: 'https://apdojo.com/ap-macro-practice-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Macro Practice Tests',
    description:
      'Free AP Macroeconomics unit MCQ tests and full-length practice exams with explanations.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro-practice-tests',
  },
};

export default function APMacroPracticeTestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
