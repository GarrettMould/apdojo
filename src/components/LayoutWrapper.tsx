'use client';

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if we're on the home page (for extended mode)
  const isOnHomePage = pathname === '/' || pathname === '/userHomePage';
  
  // Determine the left margin based on the sidebar mode
  // Use condensed sidebar (ml-16) for all pages except home page
  const leftMargin = isOnHomePage ? 'ml-72' : 'ml-16';

  return (
    <div className={`flex-1 ${leftMargin} bg-gray-50 min-h-screen`}>
      {children}
    </div>
  );
} 