import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Long-Run Aggregate Supply (LRAS) Deep Dive: Understanding Potential Output | AP Dojo',
  description: 'Master Long-Run Aggregate Supply (LRAS) and understand how the economy operates at full employment in the long run. Learn about potential output and the vertical LRAS curve.',
  openGraph: {
    title: 'Long-Run Aggregate Supply (LRAS) Deep Dive: Understanding Potential Output | AP Dojo',
    description: 'Master Long-Run Aggregate Supply (LRAS) and understand how the economy operates at full employment in the long run.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/long-run-aggregate-supply',
  },
};

export default function LongRunAggregateSupplyDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
