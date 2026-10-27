import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('1', 'production-possibilities-curve');

export default function ProductionPossibilitiesCurveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
