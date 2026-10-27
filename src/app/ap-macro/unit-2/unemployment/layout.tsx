import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'unemployment');

export default function UnemploymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
