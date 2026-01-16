'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

interface AuthGateProps {
  onAuthSuccess?: () => void;
}

export function AuthGate({ onAuthSuccess }: AuthGateProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const { signup, login } = useAuthContext();

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && 
    hasNumber && passwordsMatch && password.length > 0;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidPassword || !validateEmail(email)) return;
    
    try {
      await signup(email, password, false, false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
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

  return (
    <div className="h-screen flex bg-white">
      {/* Left Section - 1/2 width, blank for now */}
      <div className="w-1/2"></div>
      
      {/* Right Section - 1/2 width, auth form */}
      <div className="w-1/2 flex items-center justify-start">
        <div className="max-w-sm w-full px-8">
          {/* Headline */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center w-full">
            Access <span className="text-blue-500">AP Dojo</span> Content
          </h1>

          {/* Auth Form */}
          <form onSubmit={isLoginMode ? handleLogin : handleSignup} className="space-y-4">
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
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
                  emailError ? 'border-red-500' : 'border-gray-300'
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base"
                required
              />
            </div>
            
            {!isLoginMode && (
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base"
                  required
                />
              </div>
            )}

            {/* Password requirements for signup */}
            {!isLoginMode && (
              <div className="text-sm space-y-1">
                <p className="font-medium text-gray-700">Password requirements:</p>
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
            )}

            <Button 
              type="submit" 
              className="w-full py-3 text-base"
              disabled={!isLoginMode && !isValidPassword}
            >
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Login/Signup toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setError('');
                  setEmailError('');
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                {isLoginMode ? 'Sign up (It\'s Free!)' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 