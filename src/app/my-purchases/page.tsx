'use client'

import { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase'
import { doc, getDoc, enableNetwork } from 'firebase/firestore'

interface Purchase {
  examType: 'macro' | 'micro'
  questionType: 'mcq' | 'frq'
  examNumber: string
}

export default function MyPurchases() {
  const { user } = useAuthContext()
  const [purchases, setPurchases] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let mounted = true
    let retryTimeout: NodeJS.Timeout

    async function fetchPurchases() {
      if (!user || !mounted) {
        setLoading(false)
        return
      }

      try {
        // First, verify Firebase is initialized
        if (!db) {
          throw new Error('Firebase is not initialized')
        }

        // Log the user state
        console.log('Auth state:', {
          user: !!user,
          uid: user?.uid,
          email: user?.email
        })

        // Try to get the document without enabling network
        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)
        
        if (mounted) {
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setPurchases(userData?.purchases || [])
          } else {
            setPurchases([])
          }
          setError(null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Firebase Error:', {
          error,
          message: error instanceof Error ? error.message : 'Unknown error',
          code: error instanceof Error ? (error as any).code : undefined
        })
        
        if (mounted) {
          if (retryCount < 3) {
            setRetryCount(prev => prev + 1)
            retryTimeout = setTimeout(() => {
              if (mounted) fetchPurchases()
            }, 3000)
          } else {
            setError('Unable to load purchases. Please refresh the page.')
            setLoading(false)
          }
        }
      }
    }

    setLoading(true)
    fetchPurchases()

    return () => {
      mounted = false
      if (retryTimeout) clearTimeout(retryTimeout)
    }
  }, [user, retryCount])

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Purchases</h1>
      
      {!user ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in to view your purchases</h2>
        </div>
      ) : (
        <div className="grid gap-6">
          {loading ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {retryCount > 0 
                  ? `Attempting to reconnect... (Attempt ${retryCount}/3)`
                  : 'Please wait while your purchases load'}
              </h2>
            </div>
          ) : error ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">{error}</h2>
              {retryCount >= 3 && (
                <button
                  onClick={() => {
                    setRetryCount(0)
                    setLoading(true)
                  }}
                  className="mx-auto block px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              )}
            </div>
          ) : purchases.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900">No Purchases Yet</h2>
            </div>
          ) : (
            purchases.map((productId) => {
              const [examType, questionType, examNumber] = productId.split('-')
              return (
                <div 
                  key={productId}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    AP {examType === 'macro' ? 'Macroeconomics' : 'Microeconomics'}
                  </h2>
                  <p className="text-gray-600">
                    {questionType.toUpperCase()} Exam {examNumber}
                  </p>
                  <a 
                    href={`/exams/${productId}`}
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    View Exam
                  </a>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
} 