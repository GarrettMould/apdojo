'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

function HeaderWithSuspense() {
  return <Header />;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  // Check if it's a graphing practice page (new format) or old graph-gym format
  const isGraphGymPage = pathname?.endsWith('-graphing-practice') || pathname?.startsWith('/graph-gym');
  const isUnitCheatSheetPage =
    pathname.startsWith('/unit/') ||
    pathname.includes('-cheat-sheet');
  
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-20 bg-white" />}>
        <HeaderWithSuspense />
      </Suspense>
      <main>
        {children}
      </main>
      {!isGraphGymPage && !isUnitCheatSheetPage && <Footer />}
    </div>
  );
} 