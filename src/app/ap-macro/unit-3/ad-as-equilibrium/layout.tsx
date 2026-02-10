import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AD-AS Equilibrium Deep Dive: Understanding Economic Equilibrium | AP Dojo',
  description: 'Master equilibrium in the Aggregate Demand-Aggregate Supply (AD-AS) model. Learn how AD, SRAS, and LRAS interact to determine price level and real GDP.',
  openGraph: {
    title: 'AD-AS Equilibrium Deep Dive: Understanding Economic Equilibrium | AP Dojo',
    description: 'Master equilibrium in the Aggregate Demand-Aggregate Supply (AD-AS) model and how it determines price level and real GDP.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/ad-as-equilibrium',
  },
};

export default function ADASEquilibriumDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
