'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 