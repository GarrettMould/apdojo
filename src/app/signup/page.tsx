'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { FirebaseError } from 'firebase/app'
import { Check, X, ArrowRight } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { AuthDividerOr, GoogleSignInButton } from '@/components/GoogleSignInButton'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const { signup, loginWithGoogle } = useAuthContext()

  const [emailPlaceholder, setEmailPlaceholder] = useState('')
  const fullPlaceholder = 'sensei@apdojo.com'

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i <= fullPlaceholder.length) {
        setEmailPlaceholder(fullPlaceholder.slice(0, i))
        i++
      } else {
        clearInterval(id)
      }
    }, 100)
    return () => clearInterval(id)
  }, [])

  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasUpperCase, setHasUpperCase] = useState(false)
  const [hasLowerCase, setHasLowerCase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  useEffect(() => {
    setHasMinLength(password.length >= 8)
    setHasUpperCase(/[A-Z]/.test(password))
    setHasLowerCase(/[a-z]/.test(password))
    setHasNumber(/[0-9]/.test(password))
    setPasswordsMatch(password === confirmPassword && password !== '')
  }, [password, confirmPassword])

  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidPassword) {
      setError('Please meet all password requirements.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await signup(email, password, isSubscribed, false)
      router.push('/')
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email': setError('Please enter a valid email address'); break
          case 'auth/email-already-in-use': setError('An account already exists with this email'); break
          case 'auth/weak-password': setError('Please choose a stronger password'); break
          default: setError('An error occurred. Please try again.')
        }
      } else {
        setError('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      await loginWithGoogle({ isSubscribedToMarketing: isSubscribed })
      router.push('/')
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
          setError('')
        } else if (err.code === 'auth/account-exists-with-different-credential') {
          setError('An account already exists with this email. Sign in with email and password instead.')
        } else {
          setError('Google sign-up did not complete. Please try again.')
        }
      } else {
        setError('Google sign-up did not complete. Please try again.')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  const reqRow = (met: boolean, label: string) => (
    <div className={`flex items-center gap-2 text-sm font-semibold ${met ? 'text-green-600' : 'text-gray-400'}`}>
      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${met ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
        {met && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </div>
      {label}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">

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
            Join the Dojo
          </h2>
          <p className="text-gray-600 font-medium mb-6">
            Create your free account and start scoring 5s.
          </p>

          {error && (
            <div className="mb-5 flex items-center gap-2 p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 text-sm font-semibold">
              <X className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <GoogleSignInButton
            loading={googleLoading}
            disabled={loading}
            onClick={handleGoogleSignup}
          >
            Sign up with Google
          </GoogleSignInButton>
          <AuthDividerOr className="my-6" />

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                placeholder={emailPlaceholder || 'sensei@apdojo.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || googleLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || googleLoading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-black rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading || googleLoading}
              />
            </div>

            {/* Password requirements */}
            <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
              <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3">Password requirements</p>
              <div className="grid grid-cols-2 gap-2">
                {reqRow(hasMinLength, '8+ characters')}
                {reqRow(hasUpperCase, 'Uppercase letter')}
                {reqRow(hasLowerCase, 'Lowercase letter')}
                {reqRow(hasNumber, 'Number')}
              </div>
              <div className="mt-2">
                {reqRow(passwordsMatch, 'Passwords match')}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <Checkbox
                id="subscribe-email"
                checked={isSubscribed}
                onCheckedChange={(v) => setIsSubscribed(v as boolean)}
                className="h-5 w-5 mt-0.5 border-2 border-black"
                disabled={loading || googleLoading}
              />
              <Label htmlFor="subscribe-email" className="text-sm font-semibold leading-relaxed text-gray-700 cursor-pointer">
                Send me helpful tips, course updates, and special offers.
              </Label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || googleLoading || !isValidPassword}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 font-black text-base text-white bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-all ${
                loading || googleLoading || !isValidPassword ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-gray-100 text-center">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="font-black text-blue-600 hover:text-blue-700 underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
