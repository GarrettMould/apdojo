import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP Blog',
  description:
    'AP Macro, Micro, U.S. Government, and Statistics explainers with graphs, practice questions, and exam strategies.',
  openGraph: {
    title: 'AP Blog | AP Dojo',
    description:
      'AP Macro, Micro, U.S. Government, and Statistics explainers with graphs, practice questions, and exam strategies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Blog | AP Dojo',
    description:
      'AP Macro, Micro, U.S. Government, and Statistics explainers with graphs, practice questions, and exam strategies.',
  },
};

export default function BlogHomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
