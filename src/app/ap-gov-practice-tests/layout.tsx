import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Gov Practice Tests',
  description:
    'Free AP U.S. Government unit MCQ tests and FRQ practice with explanations. Built for the 2027 exam.',
  openGraph: {
    title: 'AP Gov Practice Tests',
    description: 'Free AP U.S. Government unit MCQ tests and FRQ practice with explanations.',
    url: 'https://apdojo.com/ap-gov-practice-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Gov Practice Tests',
    description: 'Free AP U.S. Government unit MCQ tests and FRQ practice with explanations.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-gov-practice-tests',
  },
};

export default function APGovPracticeTestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
