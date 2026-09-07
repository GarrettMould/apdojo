'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import type { CourseSubject } from '@/lib/courseSubject';
import { displayCourseLabel } from '@/lib/courseSubject';
import { useAuthContext } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AuthDividerOr, GoogleSignInButton } from '@/components/GoogleSignInButton';
import { PasswordInput } from '@/components/PasswordInput';
import {
  SIGNUP_RESOURCE_OPTIONS,
  persistSignupOnboarding,
  type SignupResourceId,
} from '@/lib/signupOnboarding';

const COURSES: {
  id: CourseSubject;
  title: string;
  blurb: string;
  accent: string;
  selected: string;
  check: string;
  scoreSelected: string;
}[] = [
  {
    id: 'macro',
    title: 'AP Macroeconomics',
    blurb: 'National economy, policy, and graphs.',
    accent: 'border-gray-300 hover:border-blue-400',
    selected: 'border-blue-600 bg-blue-50 ring-2 ring-blue-200',
    check: 'bg-blue-600 border-blue-600',
    scoreSelected: 'border-blue-400 bg-blue-50 text-blue-800 ring-1 ring-blue-200',
  },
  {
    id: 'micro',
    title: 'AP Microeconomics',
    blurb: 'Firms, markets, and individual decisions.',
    accent: 'border-gray-300 hover:border-emerald-400',
    selected: 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-200',
    check: 'bg-emerald-600 border-emerald-600',
    scoreSelected: 'border-emerald-400 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200',
  },
  {
    id: 'gov',
    title: 'AP U.S. Government',
    blurb: 'Constitution, institutions, and SCOTUS.',
    accent: 'border-gray-300 hover:border-violet-400',
    selected: 'border-violet-600 bg-violet-50 ring-2 ring-violet-200',
    check: 'bg-violet-600 border-violet-600',
    scoreSelected: 'border-violet-400 bg-violet-50 text-violet-800 ring-1 ring-violet-200',
  },
  {
    id: 'stats',
    title: 'AP Statistics',
    blurb: 'Data, inference, and probability.',
    accent: 'border-gray-300 hover:border-orange-400',
    selected: 'border-orange-600 bg-orange-50 ring-2 ring-orange-200',
    check: 'bg-orange-600 border-orange-600',
    scoreSelected: 'border-orange-400 bg-orange-50 text-orange-800 ring-1 ring-orange-200',
  },
];

const AP_SCORE_OPTIONS = [3, 4, 5] as const;
type Step = 'account' | 'courses' | 'scores' | 'resources';
const STEPS: Step[] = ['account', 'courses', 'scores', 'resources'];

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function mapFirebaseSignupError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';
    case 'auth/weak-password':
      return 'Please choose a stronger password.';
    default:
      return 'An error occurred. Please try again.';
  }
}

export interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  switchToLogin?: () => void;
  onAuthSuccess?: () => void;
}

export function SignupOnboardingModal({
  isOpen,
  onClose,
  switchToLogin,
  onAuthSuccess,
}: SignupModalProps) {
  const router = useRouter();
  const {
    signup,
    loginWithGoogle,
    setSelectedSubject,
    redirectOnLogin,
    setRedirectOnLogin,
  } = useAuthContext();

  const [step, setStep] = useState<Step>('account');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [subjects, setSubjects] = useState<Set<CourseSubject>>(new Set());
  const [targetScores, setTargetScores] = useState<Partial<Record<CourseSubject, number>>>({});
  const [resources, setResources] = useState<Set<SignupResourceId>>(new Set());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  /** User authenticated via Google on step 1 — skip email signup on finish. */
  const [googleAuthenticatedUid, setGoogleAuthenticatedUid] = useState<string | null>(null);
  /** Deferred redirect — held while user completes onboarding steps. */
  const [deferredRedirect, setDeferredRedirect] = useState<string | null>(null);

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setStep('account');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsSubscribed(true);
    setSubjects(new Set());
    setTargetScores({});
    setResources(new Set());
    setError('');
    setLoading(false);
    setGoogleLoading(false);
    setGoogleAuthenticatedUid(null);
    setDeferredRedirect(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading && !googleLoading) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, loading, googleLoading]);

  const stepIndex = STEPS.indexOf(step);
  const selectedList = useMemo(() => Array.from(subjects), [subjects]);

  const toggleSubject = (id: CourseSubject) => {
    setError('');
    setSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setTargetScores((scores) => {
          const copy = { ...scores };
          delete copy[id];
          return copy;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleResource = (id: SignupResourceId) => {
    setError('');
    setResources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const finishOnboarding = async () => {
    setLoading(true);
    setError('');
    try {
      let userId = googleAuthenticatedUid;
      const destination = deferredRedirect ?? redirectOnLogin ?? '/';
      setRedirectOnLogin(null);
      setDeferredRedirect(null);

      if (!userId) {
        const result = await signup(email.trim(), password, isSubscribed, false);
        userId = result.user?.uid ?? null;
        if (!userId) {
          throw new Error('Account created but user session was not found.');
        }
      }

      await persistSignupOnboarding(userId, {
        subjects: selectedList,
        targetScores,
        resources: Array.from(resources),
      });

      setSelectedSubject(selectedList[0]);

      onClose();
      onAuthSuccess?.();
      router.push(destination);
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      setError(code ? mapFirebaseSignupError(code) : 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goNext = async () => {
    if (loading || googleLoading) return;

    if (step === 'account') {
      if (googleAuthenticatedUid) {
        setError('');
        setStep('courses');
        return;
      }
      if (!isValidEmail(email)) {
        setError('Enter a valid email address.');
        return;
      }
      if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
        setError('Password must meet all requirements.');
        return;
      }
      if (!passwordsMatch) {
        setError('Passwords do not match.');
        return;
      }
      setError('');
      setStep('courses');
      return;
    }
    if (step === 'courses') {
      if (subjects.size === 0) {
        setError('Pick at least one course to continue.');
        return;
      }
      setError('');
      setStep('scores');
      return;
    }
    if (step === 'scores') {
      const missing = selectedList.filter((s) => !targetScores[s]);
      if (missing.length > 0) {
        setError(`Set a target score for ${missing.map(displayCourseLabel).join(', ')}.`);
        return;
      }
      setError('');
      setStep('resources');
      return;
    }
    if (step === 'resources') {
      if (resources.size === 0) {
        setError('Pick at least one resource you want to use.');
        return;
      }
      await finishOnboarding();
    }
  };

  const goBack = () => {
    if (loading || googleLoading) return;
    setError('');
    if (step === 'courses') setStep('account');
    else if (step === 'scores') setStep('courses');
    else if (step === 'resources') setStep('scores');
  };

  const handleGoogleSignup = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const savedRedirect = redirectOnLogin;
      if (savedRedirect) setRedirectOnLogin(null);

      const result = await loginWithGoogle({ isSubscribedToMarketing: isSubscribed });
      const currentUser = result.user;
      if (!currentUser) {
        throw new Error('Google sign-up did not complete.');
      }

      const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
      if (userSnap.exists() && userSnap.data()?.hasCompletedSubjectSelection) {
        onClose();
        onAuthSuccess?.();
        if (savedRedirect) router.push(savedRedirect);
        return;
      }

      setDeferredRedirect(savedRedirect);
      setGoogleAuthenticatedUid(currentUser.uid);
      setEmail(currentUser.email ?? '');
      setStep('courses');
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('');
      } else if (code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email. Sign in with email and password instead.');
      } else {
        setError('Google sign-up did not complete. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!isOpen) return null;

  const accountLocked = !!googleAuthenticatedUid;

  return (
    <>
      <div className="fixed inset-0 z-[140] bg-black/55 backdrop-blur-sm" onClick={loading || googleLoading ? undefined : onClose} />
      <div className="fixed inset-0 z-[141] flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-onboarding-title"
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-4 border-black bg-gradient-to-b from-gray-50 to-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading || googleLoading}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-6 flex items-center gap-2.5 pr-10">
            <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={36} height={36} unoptimized />
            <span className="text-xl font-black tracking-wide text-gray-900">
              AP <span className="text-blue-500">Dojo</span>
            </span>
          </div>

          <div className="mb-6 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full border border-black ${
                  i <= stepIndex ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {step === 'account' && (
            <>
              <h2 id="signup-onboarding-title" className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                Create your account
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {accountLocked
                  ? `Signed in with Google as ${email}. Continue to personalize your Dojo.`
                  : 'Start with an email and password, or sign up with Google.'}
              </p>

              {!accountLocked ? (
                <>
                  <div className="mt-5 space-y-4">
                    <GoogleSignInButton
                      variant="modal"
                      loading={googleLoading}
                      disabled={loading}
                      onClick={handleGoogleSignup}
                    >
                      Sign up with Google
                    </GoogleSignInButton>
                    <AuthDividerOr centerBgClassName="bg-gradient-to-b from-gray-50 to-white" />
                  </div>
                  <div className="space-y-3">
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        setError('');
                        setEmail(e.target.value);
                      }}
                      disabled={loading || googleLoading}
                      className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-60"
                    />
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setError('');
                        setPassword(e.target.value);
                      }}
                      disabled={loading || googleLoading}
                      className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-60"
                    />
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setError('');
                        setConfirmPassword(e.target.value);
                      }}
                      disabled={loading || googleLoading}
                      className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none disabled:opacity-60"
                    />
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-gray-500">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-900">Password requirements</p>
                    <p className={hasMinLength ? 'font-medium text-green-600' : ''}>✓ At least 8 characters</p>
                    <p className={hasUpperCase ? 'font-medium text-green-600' : ''}>✓ At least one uppercase letter</p>
                    <p className={hasLowerCase ? 'font-medium text-green-600' : ''}>✓ At least one lowercase letter</p>
                    <p className={hasNumber ? 'font-medium text-green-600' : ''}>✓ At least one number</p>
                    <p className={passwordsMatch ? 'font-medium text-green-600' : ''}>✓ Passwords match</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-3 rounded-xl border-2 border-gray-200 bg-white p-3">
                    <Checkbox
                      id="subscribe-onboarding"
                      checked={isSubscribed}
                      onCheckedChange={(checked) => setIsSubscribed(checked === true)}
                      className="h-5 w-5"
                      disabled={loading || googleLoading}
                    />
                    <Label htmlFor="subscribe-onboarding" className="cursor-pointer text-sm font-medium leading-normal text-gray-600">
                      Send me helpful tips, course updates, and special offers.
                    </Label>
                  </div>
                </>
              ) : null}

              {switchToLogin ? (
                <p className="mt-4 text-center text-sm">
                  <button
                    type="button"
                    onClick={switchToLogin}
                    className="font-bold text-blue-600 hover:text-blue-500"
                    disabled={loading || googleLoading}
                  >
                    Already have an account? Sign in
                  </button>
                </p>
              ) : null}
            </>
          )}

          {step === 'courses' && (
            <>
              <h2 id="signup-onboarding-title" className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                What are you studying?
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-600">
                Select every AP course you&apos;re taking. You can add more later.
              </p>
              <div className="mt-5 space-y-3">
                {COURSES.map((course) => {
                  const on = subjects.has(course.id);
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => toggleSubject(course.id)}
                      disabled={loading}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all disabled:opacity-60 ${
                        on ? course.selected : `bg-white ${course.accent}`
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                          on ? course.check : 'border-gray-400 bg-white'
                        }`}
                      >
                        {on ? <Check className="h-3.5 w-3.5 text-white stroke-[3]" /> : null}
                      </span>
                      <span>
                        <span className="block text-base font-black text-gray-900">{course.title}</span>
                        <span className="block text-sm text-gray-500">{course.blurb}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 'scores' && (
            <>
              <h2 id="signup-onboarding-title" className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                What&apos;s your target AP score?
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-600">
                Pick a goal for each course you selected.
              </p>
              <div className="mt-5 space-y-5">
                {selectedList.map((subject) => {
                  const course = COURSES.find((c) => c.id === subject)!;
                  return (
                    <div key={subject}>
                      <p className="mb-2 text-sm font-black uppercase tracking-wide text-gray-700">
                        {displayCourseLabel(subject)}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {AP_SCORE_OPTIONS.map((score) => {
                          const on = targetScores[subject] === score;
                          return (
                            <button
                              key={score}
                              type="button"
                              onClick={() => {
                                setError('');
                                setTargetScores((prev) => ({ ...prev, [subject]: score }));
                              }}
                              disabled={loading}
                              className={`rounded-xl border-2 py-3 text-lg font-black transition-all disabled:opacity-60 ${
                                on
                                  ? course.scoreSelected
                                  : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'
                              }`}
                            >
                              {score}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {step === 'resources' && (
            <>
              <h2 id="signup-onboarding-title" className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                What do you want to use?
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-600">
                Choose the AP Dojo resources you care about most.
              </p>
              <div className="mt-5 space-y-2.5">
                {SIGNUP_RESOURCE_OPTIONS.map((resource) => {
                  const on = resources.has(resource.id);
                  return (
                    <button
                      key={resource.id}
                      type="button"
                      onClick={() => toggleResource(resource.id)}
                      disabled={loading}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all disabled:opacity-60 ${
                        on
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-300 bg-white hover:border-blue-400'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                          on ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-white'
                        }`}
                      >
                        {on ? <Check className="h-3.5 w-3.5 text-white stroke-[3]" /> : null}
                      </span>
                      <span>
                        <span className="block text-sm font-black text-gray-900">{resource.label}</span>
                        <span className="block text-xs text-gray-500">{resource.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex gap-3">
            {step !== 'account' ? (
              <button
                type="button"
                onClick={goBack}
                disabled={loading || googleLoading}
                className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm font-black text-gray-800 transition-colors hover:border-gray-500 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => void goNext()}
              disabled={loading || googleLoading}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border-2 border-blue-700 bg-blue-500 py-3 text-sm font-black text-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-all hover:bg-blue-600 active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(0,0,0,1)] disabled:opacity-50"
            >
              {loading
                ? 'Creating account…'
                : step === 'resources'
                  ? 'Create account'
                  : step === 'account' && accountLocked
                    ? 'Continue'
                    : 'Continue'}
              {!loading ? <ChevronRight className="h-4 w-4" /> : null}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
