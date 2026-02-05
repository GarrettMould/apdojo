import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPC and Opportunity Cost Deep Dive: Production Possibilities Curve Explained | AP Dojo',
  description: 'Master the Production Possibilities Curve (PPC) and understand how opportunity cost shapes economic decisions. Learn about bowed-out curves, efficiency, and economic growth.',
  openGraph: {
    title: 'PPC and Opportunity Cost Deep Dive: Production Possibilities Curve Explained | AP Dojo',
    description: 'Master the Production Possibilities Curve (PPC) and understand how opportunity cost shapes economic decisions.',
  },
  alternates: {
    canonical: 'https://apdojo.com/unit-1/ppc-deep-dive',
  },
};

export default function PPCCDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
