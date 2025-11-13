'use client';

import React, { useState } from 'react';
import { QuestionsGrid } from '@/components/questionsGrid';
import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';
import { useAuthContext } from '@/contexts/AuthContext';

export default function AiFrqHelperPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);

  const handleGuestActionAttempt = () => {
    setShowSelectPlanModal(true);
  };

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
  };

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => { 
            setShowLoginModal(false); 
            setShowSelectPlanModal(false);
            setShowSignupModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => { 
            setShowSignupModal(false); 
            setShowSelectPlanModal(false);
            setShowLoginModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SelectPlanModal 
        isOpen={showSelectPlanModal}
        onClose={() => setShowSelectPlanModal(false)}
        switchToLogin={() => { 
            setShowSelectPlanModal(false); 
            setShowLoginModal(true); 
        }}
        switchToSignup={() => { 
            setShowSelectPlanModal(false); 
            setShowSignupModal(true); 
        }}
      />

      <div>
        <QuestionsGrid onGuestActionAttempt={handleGuestActionAttempt} />
      </div>
    </>
  );
}
