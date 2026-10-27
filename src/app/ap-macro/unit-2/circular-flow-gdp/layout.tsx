import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'circular-flow-gdp');

export default function CircularFlowGdpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
