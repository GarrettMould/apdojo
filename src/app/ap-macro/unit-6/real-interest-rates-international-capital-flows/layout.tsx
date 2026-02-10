import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Interest Rates and International Capital Flows Deep Dive | AP Dojo',
  description: 'Understand how real interest rates affect international capital flows and exchange rates. Learn the connection between interest rates, currency values, and net exports.',
  openGraph: {
    title: 'Real Interest Rates and International Capital Flows Deep Dive | AP Dojo',
    description: 'Understand how real interest rates affect international capital flows and exchange rates.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-6/real-interest-rates-international-capital-flows',
  },
};

export default function RealInterestRatesInternationalCapitalFlowsDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
