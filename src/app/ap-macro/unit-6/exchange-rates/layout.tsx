import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exchange Rates Deep Dive | AP Dojo',
  description: 'Understand exchange rates, currency appreciation, and currency depreciation. Learn how exchange rates affect international trade.',
  openGraph: {
    title: 'Exchange Rates Deep Dive | AP Dojo',
    description: 'Understand exchange rates and how currency appreciation and depreciation affect trade.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-6/exchange-rates',
  },
};

export default function ExchangeRatesDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
