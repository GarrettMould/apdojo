'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { SubscriptionOfferPrompt } from './SubscriptionOfferPrompt';
import { useRouter } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox" // Import the checkbox component
import { Label } from "@/components/ui/label"     // Import the label component

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

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[100]" />
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 border border-gray-300 rounded-lg shadow-md relative">
          <button onClick={onClose} className="absolute right-4 top-4">
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Sign in to your <span className="text-blue-500">AP Dojo</span> account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
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

export function SignupModal({ isOpen, onClose, switchToLogin, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true); // State for the checkbox, default to true
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthContext();
  const router = useRouter();

  // Password validation states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Check password requirements
  useEffect(() => {
    setHasMinLength(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setPasswordsMatch(password === confirmPassword && password !== '');
  }, [password, confirmPassword]);

  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && 
    hasNumber && passwordsMatch;

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
    if (!isValidPassword) {
      setError('Please ensure all password requirements are met.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      await signup(email, password, isSubscribed);
      onClose();
      onAuthSuccess?.();
      router.push('/select-subject');
    } catch (err: any) {
      // User-friendly error messages
      if (err.code) {
        switch (err.code) {
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
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm z-[100]" />
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 border border-gray-300 rounded-lg shadow-md relative">
          <button onClick={onClose} className="absolute right-4 top-4">
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
              Create an <span className="text-blue-500">AP Dojo</span> account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                  disabled={loading}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="text-base space-y-2">
              <p className="font-semibold text-gray-900">Password requirements:</p>
              <ul className="space-y-1 text-gray-600">
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

            {/* Subscribe Checkbox */}
            <div className="flex items-center space-x-3 pt-2">
              <Checkbox 
                id="subscribe-modal" 
                checked={isSubscribed} 
                onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                className="h-5 w-5"
              />
              <Label htmlFor="subscribe-modal" className="text-base font-medium leading-normal text-gray-600 cursor-pointer">
                Send me helpful tips, course updates, and special offers.
              </Label>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  (loading || !isValidPassword) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading || !isValidPassword}
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="text-base text-center">
            <button onClick={switchToLogin} className="font-medium text-blue-600 hover:text-blue-500">
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