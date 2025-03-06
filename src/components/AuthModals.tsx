'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

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
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
      onAuthSuccess?.();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-50 p-8 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Log in to your AP Dojo account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export function SignupModal({ isOpen, onClose, switchToLogin, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuthContext();

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && 
    hasNumber && hasSpecialChar && passwordsMatch && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPassword) return;
    
    try {
      await signup(email, password);
      onClose();
      onAuthSuccess?.();
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-50 p-8 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Create an AP Dojo Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-base"
              required
            />
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
              <li className={hasSpecialChar ? "text-green-600" : ""}>
                ✓ At least one special character (!@#$%^&*)
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
  );
} 