'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { SubscriptionOfferPrompt } from './SubscriptionOfferPrompt';

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
  const { login } = useAuthContext();

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
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[100]" />
      <div className="fixed inset-0 flex items-center justify-center z-[101]">
        <div className="bg-gray-50 p-8 rounded-lg w-full max-w-md relative">
          <button onClick={onClose} className="absolute right-4 top-4">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Login to <span className="text-blue-500">AP Dojo</span> to Access this Feature
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-base"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-base"
              />
            </div>
            <Button type="submit" className="w-full py-3 text-base">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2">
            <button onClick={switchToSignup} className="text-blue-600 hover:underline text-base">
              Don't have an account? Sign up (It's Free!)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function SignupModal({ isOpen, onClose, switchToLogin, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuthContext();

  // Updated password validation - removed special character requirement
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && 
    hasNumber && passwordsMatch && password.length > 0;

  const validateEmail = (email: string) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

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
    if (!isValidPassword || !validateEmail(email)) return;
    
    try {
      await signup(email, password);
      onClose();
      onAuthSuccess?.();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/email-already-in-use':
          setError('An account already exists with this email');
          break;
        case 'auth/weak-password':
          setError('Please choose a stronger password');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[100]" />
      <div className="fixed inset-0 flex items-center justify-center z-[101]">
        <div className="bg-gray-50 p-8 rounded-lg w-full max-w-md relative">
          <button onClick={onClose} className="absolute right-4 top-4">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Create an <span className="text-blue-500">AP Dojo</span> Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                className={`w-full px-4 py-3 rounded-lg border text-base ${
                  emailError ? 'border-red-500' : ''
                }`}
                required
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-base"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-base"
                required
              />
            </div>

            <div className="text-base space-y-2">
              <p className="font-medium text-gray-700">Password requirements:</p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li className={hasMinLength ? "text-green-600" : ""}>
                  ✓ At least 8 characters
                </li>
                <li className={hasUpperCase ? "text-green-600" : ""}>
                  ✓ At least one uppercase letter
                </li>
                <li className={hasLowerCase ? "text-green-600" : ""}>
                  ✓ At least one lowercase letter
                </li>
                <li className={hasNumber ? "text-green-600" : ""}>
                  ✓ At least one number
                </li>
                <li className={passwordsMatch ? "text-green-600" : ""}>
                  ✓ Passwords match
                </li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-base"
              disabled={!isValidPassword}
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={switchToLogin} className="text-blue-600 hover:underline text-base">
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

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
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
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