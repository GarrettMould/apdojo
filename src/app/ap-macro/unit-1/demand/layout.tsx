import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('1', 'demand');

export default function DemandLayout({ children }: { children: React.ReactNode }) {
  return children;
}
