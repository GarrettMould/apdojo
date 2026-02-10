import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Effect of Changes in Policies and Economic Conditions on the Foreign Exchange Market Deep Dive | AP Dojo',
  description: 'Understand how fiscal and monetary policy affect exchange rates through interest rates and capital flows.',
  openGraph: {
    title: 'Effect of Changes in Policies and Economic Conditions on the Foreign Exchange Market Deep Dive | AP Dojo',
    description: 'Understand how fiscal and monetary policy affect exchange rates.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-6/changes-policies-forex-market',
  },
};

export default function ChangesPoliciesForexMarketDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
