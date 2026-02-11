'use client'; // Directive at the top!

import React, { useEffect, useRef } from 'react'; 
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
  const characterRef = useRef<HTMLDivElement>(null);
  const isDeepDivePage = (pathname?.includes('deep-dive') ?? false)
    || (!!pathname?.match(/ap-(macro|micro)\/unit-\d+\//) && !pathname?.includes('cheat-sheet'));
  const { 
    showLoginModal, 
    setShowLoginModal, 
    showSignupModal, 
    setShowSignupModal,
    xpToast,
    isCharacterClosetOpen,
    setIsCharacterClosetOpen,
  } = useAuthContext();

  // Close character closet when pathname changes (navigation)
  useEffect(() => {
    if (isCharacterClosetOpen) {
      setIsCharacterClosetOpen(false);
    }
  }, [pathname, isCharacterClosetOpen, setIsCharacterClosetOpen]);

  // Close character closet when clicking outside, on links, or on buttons
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isCharacterClosetOpen) return;

      const target = event.target as HTMLElement;
      
      // Don't close if clicking the character image itself
      if (characterRef.current?.contains(target)) {
        return;
      }

      // Don't close if clicking the XP button - check by data attribute first, then by content
      const xpButton = target.closest('button[data-xp-button="true"]');
      if (xpButton) {
        return; // Don't close if clicking XP button
      }
      
      // Also check by content as fallback
      const anyButton = target.closest('button');
      if (anyButton) {
        const buttonText = anyButton.textContent || '';
        const hasXpText = buttonText.includes('XP');
        const hasFlameImage = anyButton.querySelector('img[alt*="Flame"]') || anyButton.querySelector('img[src*="flame"]');
        if (hasXpText || hasFlameImage) {
          return; // Don't close if clicking XP button
        }
      }

      // Close for any other click (outside, links, buttons, etc.)
      setIsCharacterClosetOpen(false);
    };

    if (isCharacterClosetOpen) {
      // Use bubble phase (not capture) so XP button's onClick fires first
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [isCharacterClosetOpen, setIsCharacterClosetOpen]);

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
      {/* Character Image - Fixed to top right corner, visible on all pages when closet is open */}
      {isCharacterClosetOpen && (
        <div 
          ref={characterRef}
          className="fixed top-20 right-4 z-50 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/images/base-character.jpg"
            alt="Character"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      )}
      
      {/* Layout without sidebar */}
      <main className={`flex-1 w-full overflow-y-auto ${isDeepDivePage ? 'bg-gray-50' : 'bg-white'}`}>
        {/* Email verification banner disabled for now */}
        {/* <EmailVerificationBanner /> */}
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
