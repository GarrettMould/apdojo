'use client'; // Directive at the top!

import React from 'react'; 
import { usePathname } from 'next/navigation';
// Remove HeaderWrapper and Footer imports as they are now in LayoutWrapper
// import { HeaderWrapper } from '@/components/header-wrapper';
// import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/ui/page-container';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { EmailVerificationBanner } from '@/components/EmailVerificationBanner';
import { Analytics } from "@vercel/analytics/react";

export function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { 
    showLoginModal, 
    setShowLoginModal, 
    showSignupModal, 
    setShowSignupModal 
  } = useAuthContext();

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      {/* Layout without sidebar */}
      <main className="flex-1 w-full overflow-y-auto bg-white">
        {/* REMOVE PageContainer here to allow full width */}
        <EmailVerificationBanner />
        {children}
        <Analytics />
      </main>

      {/* Render Modals Conditionally */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        switchToSignup={handleSwitchToSignup} 
      />
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
        switchToLogin={handleSwitchToLogin} 
      />
    </>
  );
}
