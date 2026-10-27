import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'costs-inflation');

export default function CostsInflationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
