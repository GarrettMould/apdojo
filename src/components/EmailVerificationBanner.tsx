'use client'

import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { Mail, X, CheckCircle, AlertCircle } from 'lucide-react'

export function EmailVerificationBanner() {
  const { user, resendVerificationEmail } = useAuthContext()
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)

  // Check email verification status
  useEffect(() => {
    if (user) {
      // Reload user to get latest verification status
      user.reload().then(() => {
        setEmailVerified(user.emailVerified || false)
      }).catch(() => {
        setEmailVerified(user.emailVerified || false)
      })
    } else {
      setEmailVerified(false)
    }
  }, [user])

  // Don't show banner if email is verified or user is not logged in
  if (!user || emailVerified || isDismissed) {
    return null
  }

  const handleResend = async () => {
    setIsResending(true)
    setResendError(null)
    setResendSuccess(false)

    try {
      await resendVerificationEmail()
      setResendSuccess(true)
      setTimeout(() => {
        setResendSuccess(false)
      }, 3000)
    } catch (error: any) {
      if (error.message.includes('already verified')) {
        setEmailVerified(true)
      } else {
        setResendError(error.message || 'Failed to resend verification email')
      }
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                Please verify your email address
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  We've sent a verification email to <strong>{user.email}</strong>. 
                  Please check your inbox and click the verification link to verify your email address.
                </p>
                {resendSuccess && (
                  <div className="mt-2 flex items-center text-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Verification email sent! Please check your inbox.</span>
                  </div>
                )}
                {resendError && (
                  <div className="mt-2 text-red-700">
                    <p>{resendError}</p>
                  </div>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {isResending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsDismissed(true)}
              className="ml-4 flex-shrink-0 text-yellow-400 hover:text-yellow-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

