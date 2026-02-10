import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economic Growth Deep Dive | AP Dojo',
  description: 'Understand the sources of economic growth and how increases in resources, technology, and institutions shift the LRAS curve to increase potential output.',
  openGraph: {
    title: 'Economic Growth Deep Dive | AP Dojo',
    description: 'Understand the sources of economic growth and how they increase potential output.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/economic-growth',
  },
};

export default function EconomicGrowthDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
