import type { Metadata } from 'next';
import { macroLessonMetadata } from '@/lib/macroLessonMetadata';

export const metadata: Metadata = macroLessonMetadata('2', 'price-indices-inflation');

export default function PriceIndicesInflationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
