import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'real-nominal-gdp');

export default function RealNominalGdpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
