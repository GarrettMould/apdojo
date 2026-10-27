import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('1', 'market-equilibrium');

export default function MarketEquilibriumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
