'use client'; // Directive at the top!

import React from 'react'; 
import { HeaderWrapper } from '@/components/header-wrapper';
import { Footer } from '@/components/Footer';
import { PageContainer } from '@/components/ui/page-container';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { Analytics } from "@vercel/analytics/react";

export function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
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
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <HeaderWrapper />
      </div>

      {/* Main content area with padding ONLY for fixed header */}
      {/* Assuming header is h-16 (4rem) */}
      <main className="flex-1 w-full bg-gradient-to-b from-gray-100 via-white to-white via-5% pt-16 overflow-y-auto">
        <PageContainer>
          {children}
          <Analytics />
        </PageContainer>
      </main>

      {/* Footer (Not Fixed) */}
      <Footer />

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
