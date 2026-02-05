import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Absolute and Comparative Advantage Deep Dive: Trade and Specialization Explained | AP Dojo',
  description: 'Master absolute and comparative advantage to understand how countries benefit from specialization and trade. Learn to calculate opportunity costs and identify comparative advantages.',
  openGraph: {
    title: 'Absolute and Comparative Advantage Deep Dive: Trade and Specialization Explained | AP Dojo',
    description: 'Master absolute and comparative advantage to understand how countries benefit from specialization and trade.',
  },
  alternates: {
    canonical: 'https://apdojo.com/unit-1/comparative-advantage-deep-dive',
  },
};

export default function ComparativeAdvantageDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
