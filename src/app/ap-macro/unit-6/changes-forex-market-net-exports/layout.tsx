import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changes in the Foreign Exchange Market and Net Exports Deep Dive | AP Dojo',
  description: 'Understand how currency appreciation and depreciation affect net exports and aggregate demand.',
  openGraph: {
    title: 'Changes in the Foreign Exchange Market and Net Exports Deep Dive | AP Dojo',
    description: 'Understand how currency changes affect net exports and aggregate demand.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-6/changes-forex-market-net-exports',
  },
};

export default function ChangesForexMarketNetExportsDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
