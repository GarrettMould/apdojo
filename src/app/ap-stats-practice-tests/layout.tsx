import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Stats Practice Tests',
  description:
    'Free AP Statistics unit MCQ tests and FRQ practice with explanations. Built for the 2027 exam.',
  openGraph: {
    title: 'AP Stats Practice Tests',
    description: 'Free AP Statistics unit MCQ tests and FRQ practice with explanations.',
    url: 'https://apdojo.com/ap-stats-practice-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Stats Practice Tests',
    description: 'Free AP Statistics unit MCQ tests and FRQ practice with explanations.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-stats-practice-tests',
  },
};

export default function APStatsPracticeTestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
