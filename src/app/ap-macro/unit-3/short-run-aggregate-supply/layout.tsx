import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Short-Run Aggregate Supply (SRAS) Deep Dive: Understanding Short-Run Production | AP Dojo',
  description: 'Master Short-Run Aggregate Supply (SRAS) and understand how firms respond to price level changes in the short run. Learn about the SRAS curve and its determinants.',
  openGraph: {
    title: 'Short-Run Aggregate Supply (SRAS) Deep Dive: Understanding Short-Run Production | AP Dojo',
    description: 'Master Short-Run Aggregate Supply (SRAS) and understand how firms respond to price level changes in the short run.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/short-run-aggregate-supply',
  },
};

export default function ShortRunAggregateSupplyDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
