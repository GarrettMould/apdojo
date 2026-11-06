import type { Metadata } from 'next';
import { MacroExplainersHub } from '@/components/guidedLesson/MacroExplainersHub';

const title = 'AP Macro Explainers';
const description =
  'Guided AP Macroeconomics lessons: watch, try the big question, walk through the key ideas, check yourself, and explain it in your own words.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: 'summary_large_image', title, description },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/explainers',
  },
};

export default function MacroExplainersPage() {
  return <MacroExplainersHub />;
}
