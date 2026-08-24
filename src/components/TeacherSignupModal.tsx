'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FirebaseError } from 'firebase/app';

const TEACHER_CODE = '9759';

interface TeacherSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherSignupModal({ isOpen, onClose }: TeacherSignupModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthContext();
  const router = useRouter();

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== '';
  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && passwordsMatch;
  const isTeacherCodeValid = teacherCode.trim() === TEACHER_CODE;

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
    if (!isTeacherCodeValid) {
      setError('Please enter a valid teacher code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup(email, password, isSubscribed, true);
      onClose();
      router.push('/tutor/builder');
    } catch (err) {
      if (err instanceof FirebaseError) {
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[130]" />
      <div className="fixed inset-0 flex items-center justify-center z-[131] p-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 relative overflow-y-auto max-h-[90vh]">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-1 text-center pr-10">
              Create a Teacher Account
            </h2>
            <p className="text-slate-600 text-center mb-5">
              Enter your teacher code to unlock the full tutor experience.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="sensei@apdojo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 mb-2">Password requirements:</p>
                <ul className="space-y-1 text-sm">
                  {[
                    [hasMinLength, '8+ characters'],
                    [hasUpperCase, 'Uppercase letter'],
                    [hasLowerCase, 'Lowercase letter'],
                    [hasNumber, 'Number'],
                    [passwordsMatch, 'Passwords match'],
                  ].map(([ok, text], i) => (
                    <li key={i} className={`flex items-center gap-2 ${ok ? 'text-green-600' : 'text-slate-500'}`}>
                      <Check className={`w-4 h-4 flex-shrink-0 ${ok ? '' : 'opacity-30'}`} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Checkbox
                  id="teachers-subscribe"
                  checked={isSubscribed}
                  onCheckedChange={(c) => setIsSubscribed(c as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="teachers-subscribe" className="text-sm text-slate-700 cursor-pointer">
                  Send me helpful tips, course updates, and special offers.
                </Label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Teacher code
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your teacher code"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  disabled={loading}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    teacherCode && !isTeacherCodeValid
                      ? 'border-red-500'
                      : 'border-slate-200'
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !isValidPassword || !isTeacherCodeValid}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
              >
                {loading ? 'Creating account...' : 'Create teacher account'}
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
