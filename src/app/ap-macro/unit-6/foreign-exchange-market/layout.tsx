import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Foreign Exchange Market Deep Dive | AP Dojo',
  description: 'Master the foreign exchange market and how supply and demand determine exchange rates. Understand what causes currency appreciation and depreciation.',
  openGraph: {
    title: 'The Foreign Exchange Market Deep Dive | AP Dojo',
    description: 'Master the foreign exchange market and how supply and demand determine exchange rates.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-6/foreign-exchange-market',
  },
};

export default function ForeignExchangeMarketDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
