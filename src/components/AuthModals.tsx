'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { SubscriptionOfferPrompt } from './SubscriptionOfferPrompt';
import { AuthDividerOr, GoogleSignInButton } from '@/components/GoogleSignInButton';
import { SignupOnboardingModal } from './SignupOnboardingModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  switchToSignup?: () => void;
  switchToLogin?: () => void;
  onAuthSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, switchToSignup, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuthContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onClose();
      onAuthSuccess?.();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      onClose();
      onAuthSuccess?.();
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('');
      } else {
        setError('Google sign-in did not complete. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[130]" />
      <div className="fixed inset-0 flex items-center justify-center z-[131] p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 border border-gray-300 rounded-lg shadow-md relative">
          <button onClick={onClose} className="absolute right-4 top-4">
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Sign in to your <span className="text-blue-500">AP Dojo</span> account
            </h2>
          </div>
          <div className="mt-6 space-y-4">
            <GoogleSignInButton
              variant="modal"
              loading={googleLoading}
              disabled={loading}
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </GoogleSignInButton>
            <AuthDividerOr />
          </div>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-600 text-base text-center bg-red-50 p-3 rounded">
                {error}
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || googleLoading}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading || googleLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading || googleLoading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          <div className="text-base text-center">
            <button onClick={switchToSignup} className="font-medium text-blue-600 hover:text-blue-500">
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function SignupModal(props: AuthModalProps) {
  return <SignupOnboardingModal {...props} />;
}

// Legacy export — onboarding modal is the canonical signup UI
export { SignupOnboardingModal } from './SignupOnboardingModal';

// New SelectPlanModal Component
interface SelectPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  switchToSignup: () => void; // To switch to SignupModal
  switchToLogin: () => void;  // To switch to LoginModal
  // onPlanSelected?: (planId: string) => void; // Optional: if you want to pass plan info back
}

export function SelectPlanModal({
  isOpen,
  onClose,
  switchToSignup,
  switchToLogin,
}: SelectPlanModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[130]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[131] p-4">
        <div className="bg-transparent w-full max-w-3xl relative">
          <button onClick={onClose} className="absolute top-10 right-14 text-gray-400 hover:text-gray-600 z-20">
            <X className="w-6 h-6" />
          </button>
          
          <SubscriptionOfferPrompt 
            onSelectPlan={(planId: string) => {
              console.log('Plan selected in modal:', planId);
              switchToSignup(); 
            }}
          />
        </div>
      </div>
    </>
  );
} 