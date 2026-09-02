'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ArrowRight, X } from 'lucide-react'
import Image from 'next/image'
import { AuthDividerOr, GoogleSignInButton } from '@/components/GoogleSignInButton'
import { PasswordInput } from '@/components/PasswordInput'

function LoginPageContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loginWithGoogle, user, loading: authLoading } = useAuthContext()
  const [googleLoading, setGoogleLoading] = useState(false)

  useEffect(() => {
    const redirectParam = searchParams.get('redirect')
    if (!authLoading && user && !redirectParam) {
      router.push('/')
    }
  }, [user, authLoading, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setLoadingSubmit(true)
      await login(email, password)
      const redirectPath = searchParams.get('redirect')
      if (redirectPath) {
        router.replace(redirectPath)
      } else {
        router.push('/')
      }
    } catch {
      setError('Failed to sign in. Please check your credentials.')
    } finally {
      setLoadingSubmit(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setError('')
      setGoogleLoading(true)
      await loginWithGoogle()
      const redirectPath = searchParams.get('redirect')
      if (redirectPath) {
        router.replace(redirectPath)
      } else {
        router.push('/')
      }
    } catch (err: unknown) {
      const code = err && typeof err === 'object' && 'code' in err ? String((err as { code: string }).code) : ''
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('')
      } else {
        setError('Google sign-in did not complete. Please try again or use email.')
      }
    } finally {
      setGoogleLoading(false)
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
    } catch {
      setError('Failed to send reset email. Please check your email address.')
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image src="/images/dojoIconJan26.svg" alt="AP Dojo" width={40} height={40} className="w-10 h-10" unoptimized />
          <span className="text-2xl font-black tracking-wide text-gray-900">
            AP <span className="text-blue-500">Dojo</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h2 className="text-3xl font-black text-gray-900 mb-1">
            Sign In
          </h2>
          <p className="text-gray-600 font-medium mb-6">
            Welcome back to the Dojo.
          </p>

          <GoogleSignInButton
            loading={googleLoading}
            disabled={loadingSubmit}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </GoogleSignInButton>
          <AuthDividerOr className="my-6" />

          {resetSent && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-600 rounded-xl text-green-700 font-semibold text-sm">
              Password reset email sent! Check your inbox.
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-sm font-semibold">
                <X className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loadingSubmit || googleLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
                Password
              </label>
              <PasswordInput
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loadingSubmit || googleLoading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSubmit || googleLoading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 font-black text-base text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all ${loadingSubmit || googleLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loadingSubmit ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-gray-100 flex flex-col items-center gap-3">
            <button
              onClick={handleForgotPassword}
              disabled={loadingSubmit || googleLoading}
              className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Forgot your password?
            </button>
            <p className="text-sm text-gray-600 font-medium">
              No account?{' '}
              <Link href="/signup" className="font-black text-blue-600 hover:text-blue-700 underline underline-offset-2">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading…</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
