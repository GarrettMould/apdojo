import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Assets Deep Dive: Understanding Stocks, Bonds, and Liquidity | AP Dojo',
  description: 'Master financial assets including stocks, bonds, and liquidity. Learn the differences between equity and debt instruments and how they function in the economy.',
  openGraph: {
    title: 'Financial Assets Deep Dive: Understanding Stocks, Bonds, and Liquidity | AP Dojo',
    description: 'Master financial assets including stocks, bonds, and liquidity and how they function in the economy.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-4/financial-assets',
  },
};

export default function FinancialAssetsDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
