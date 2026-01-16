'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { FirebaseError } from 'firebase/app'
import { Check, X, ArrowRight } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(true) // State for the checkbox, default to true
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signup } = useAuthContext()
  
  // Typing animation for email placeholder
  const [emailPlaceholder, setEmailPlaceholder] = useState('')
  const fullPlaceholder = 'sensei@apdojo.com'
  
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullPlaceholder.length) {
        setEmailPlaceholder(fullPlaceholder.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100) // Typing speed
    
    return () => clearInterval(typingInterval)
  }, [])
  
  // Check for teacher access code in URL (secret code: 9759)
  const [isTeacher, setIsTeacher] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const accessCode = params.get('code')
      // Secret teacher access code: 9759
      setIsTeacher(accessCode === '9759')
    }
  }, [])

  // Password validation states
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasUpperCase, setHasUpperCase] = useState(false)
  const [hasLowerCase, setHasLowerCase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  // Check password requirements
  useEffect(() => {
    setHasMinLength(password.length >= 8)
    setHasUpperCase(/[A-Z]/.test(password))
    setHasLowerCase(/[a-z]/.test(password))
    setHasNumber(/[0-9]/.test(password))
    setPasswordsMatch(password === confirmPassword && password !== '')
  }, [password, confirmPassword])

  const isValidPassword = hasMinLength && hasUpperCase && hasLowerCase && 
    hasNumber && passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidPassword) {
      setError('Please ensure all password requirements are met.')
      return
    }
    
    setError('')
    setLoading(true)

    try {
      await signup(email, password, isSubscribed, isTeacher)
      router.push('/')
    } catch (err: any) {
      // User-friendly error messages
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
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="max-w-2xl w-full relative z-10 mx-auto">
        {/* Signup form - Centered */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-10" style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15)' }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  Join the <span className="text-blue-500">Dojo</span>
                </h2>
                <p className="text-gray-600">
                  Create your free account and unlock your potential
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-4 rounded-xl border border-red-200 flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
                      placeholder={emailPlaceholder || 'sensei@apdojo.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password requirements */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Password requirements:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 text-sm ${hasMinLength ? "text-green-600" : "text-gray-500"}`}>
                      <Check className={`w-4 h-4 ${hasMinLength ? "" : "opacity-30"}`} />
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${hasUpperCase ? "text-green-600" : "text-gray-500"}`}>
                      <Check className={`w-4 h-4 ${hasUpperCase ? "" : "opacity-30"}`} />
                      <span>Uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${hasLowerCase ? "text-green-600" : "text-gray-500"}`}>
                      <Check className={`w-4 h-4 ${hasLowerCase ? "" : "opacity-30"}`} />
                      <span>Lowercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${hasNumber ? "text-green-600" : "text-gray-500"}`}>
                      <Check className={`w-4 h-4 ${hasNumber ? "" : "opacity-30"}`} />
                      <span>Number</span>
                    </div>
                  </div>
                  <div className={`mt-2 flex items-center gap-2 text-sm ${passwordsMatch ? "text-green-600" : "text-gray-500"}`}>
                    <Check className={`w-4 h-4 ${passwordsMatch ? "" : "opacity-30"}`} />
                    <span>Passwords match</span>
                  </div>
                </div>

                {/* Subscribe Checkbox */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Checkbox 
                    id="subscribe" 
                    checked={isSubscribed} 
                    onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                    className="h-5 w-5 mt-0.5"
                  />
                  <Label htmlFor="subscribe" className="text-sm font-medium leading-relaxed text-gray-700 cursor-pointer">
                    Send me helpful tips, course updates, and special offers.
                  </Label>
                </div>

                <button
                  type="submit"
                  className={`group relative w-full flex items-center justify-center gap-2 py-4 px-6 text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] ${
                    (loading || !isValidPassword) ? 'opacity-50 cursor-not-allowed transform-none' : ''
                  }`}
                  disabled={loading || !isValidPassword}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
    </div>
  )
}