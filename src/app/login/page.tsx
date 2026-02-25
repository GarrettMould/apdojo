'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase'

// Define the component containing the logic that uses useSearchParams
function LoginPageContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loginWithGoogle, user, loading: authLoading } = useAuthContext()

  useEffect(() => {
    // Only redirect away from login page IF:
    // 1. Auth is not loading
    // 2. User is logged in
    // 3. There is NO 'redirect' query parameter present
    const redirectParam = searchParams.get('redirect');
    if (!authLoading && user && !redirectParam) {
      console.log('[Login Page Effect] User logged in and NO redirect param, pushing to /');
      router.push('/'); // CHANGED
    } else if (!authLoading && user && redirectParam) {
        console.log('[Login Page Effect] User logged in WITH redirect param, letting handleSubmit handle navigation.');
        // Do nothing here - handleSubmit already called router.replace()
    }
    // If !user or authLoading, do nothing (stay on login page)
  }, [user, authLoading, router, searchParams]); // Added searchParams dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setLoadingSubmit(true)
      await login(email, password)
      const redirectPath = searchParams.get('redirect')
      if (redirectPath) {
        console.log('Login page redirecting to:', redirectPath)
        router.replace(redirectPath)
      } else {
        console.log('Login page redirecting to default /');
        router.push('/'); // CHANGED
      }
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.')
    } finally {
      setLoadingSubmit(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setError('')
      setLoadingGoogle(true)
      await loginWithGoogle()
      const redirectPath = searchParams.get('redirect')
      if (redirectPath) router.replace(redirectPath)
      else router.push('/')
    } catch (err) {
      if (err instanceof FirebaseError && (err.code === 'auth/cancelled-popup-request' || err.code === 'auth/popup-closed-by-user')) {
        setError('') // User closed popup or cancelled; don't show an error
      } else {
        setError('Sign in with Google failed. Please try again or use email/password.')
      }
    } finally {
      setLoadingGoogle(false)
    }
  }

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address first')
      return
    }

    try {
      setError('')
      setLoadingSubmit(true)
      await sendPasswordResetEmail(auth, email)
      setResetSent(true)
    } catch (error) {
      setError('Failed to send reset email. Please check your email address.')
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            Sign in to your <span className="text-blue-500">AP Dojo</span> account
          </h2>
        </div>
        
        {resetSent && (
          <div className="text-base text-center p-3 bg-green-50 text-green-600 rounded-md">
            Password reset email sent! Please check your inbox.
          </div>
        )}

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
                disabled={loadingSubmit}
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
                disabled={loadingSubmit}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loadingSubmit || loadingGoogle}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 font-medium text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loadingGoogle ? 'Signing in...' : 'Continue with Google'}
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loadingSubmit ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? 'Signing in...' : 'Sign in with email'}
            </button>
          </div>
        </form>

        <div className="space-y-2 text-base text-center">
          <div>
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Don't have an account? Sign up
            </Link>
          </div>
          <div>
            <button
              onClick={handleForgotPassword}
              className="font-medium text-blue-600 hover:text-blue-500"
              disabled={loadingSubmit}
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// The default export now wraps the actual content in Suspense
export default function Login() {
  // Simple fallback, you can replace with a loading spinner component if desired
  const fallbackUI = <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  return (
    <Suspense fallback={fallbackUI}>
      <LoginPageContent />
    </Suspense>
  );
} 