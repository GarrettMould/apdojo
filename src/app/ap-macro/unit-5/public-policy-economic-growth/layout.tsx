import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Policy and Economic Growth Deep Dive | AP Dojo',
  description: 'Learn how public policies such as education investment, infrastructure spending, and R&D incentives promote long-run economic growth.',
  openGraph: {
    title: 'Public Policy and Economic Growth Deep Dive | AP Dojo',
    description: 'Learn how public policies promote long-run economic growth.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-5/public-policy-economic-growth',
  },
};

export default function PublicPolicyEconomicGrowthDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
