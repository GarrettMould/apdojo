'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { FirebaseError } from 'firebase/app'
import { Check, X } from 'lucide-react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signup } = useAuthContext()

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
      await signup(email, password)
      router.push('/select-subject')
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-6">
      <div className="max-w-md w-full space-y-8">
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
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}