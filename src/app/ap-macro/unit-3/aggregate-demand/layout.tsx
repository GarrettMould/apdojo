import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aggregate Demand (AD) Deep Dive: Understanding Total Demand in the Economy | AP Dojo',
  description: 'Master Aggregate Demand (AD) and understand how total demand for all goods and services in an economy works. Learn about the AD curve, price level, and the components of aggregate demand.',
  openGraph: {
    title: 'Aggregate Demand (AD) Deep Dive: Understanding Total Demand in the Economy | AP Dojo',
    description: 'Master Aggregate Demand (AD) and understand how total demand for all goods and services in an economy works.',
  },
  alternates: {
    canonical: 'https://apdojo.com/ap-macro/unit-3/aggregate-demand',
  },
};

export default function AggregateDemandDeepDiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
