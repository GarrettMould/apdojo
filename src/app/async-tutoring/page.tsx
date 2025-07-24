'use client'

import { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, MessageSquare, Image, Video, FileText, Lock } from 'lucide-react'
import { LoginModal, SignupModal } from '@/components/AuthModals'

interface TutoringRequest {
  id: string
  title: string
  description: string
  type: 'text' | 'image' | 'video'
  status: 'pending' | 'completed'
  createdAt: Date
  response?: {
    content: string
    videoUrl?: string
    createdAt: Date
  }
}

export default function AsyncTutoringPage() {
  const { user, userData } = useAuthContext()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)

  // Mock data for demonstration - in real implementation this would come from database
  const [requests, setRequests] = useState<TutoringRequest[]>([
    {
      id: '1',
      title: 'Help with Phillips Curve',
      description: 'I need help understanding the relationship between inflation and unemployment',
      type: 'text',
      status: 'completed',
      createdAt: new Date('2024-01-15'),
      response: {
        content: 'The Phillips Curve shows the inverse relationship between inflation and unemployment...',
        createdAt: new Date('2024-01-16')
      }
    },
    {
      id: '2',
      title: 'AD-AS Graph Analysis',
      description: 'Can you help me analyze this AD-AS graph?',
      type: 'image',
      status: 'pending',
      createdAt: new Date('2024-01-20')
    }
  ])

  const isPremiumUser = user && userData?.purchases && userData.purchases.length > 0

  const handleNewRequest = () => {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    
    // TEMPORARILY DISABLED FOR TESTING - uncomment the block below to restore premium-only access
    /*
    if (!isPremiumUser) {
      // Show premium upgrade prompt
      return
    }
    */
    
    setShowNewRequestModal(true)
  }

  const handleAuthSuccess = () => {
    setShowLoginModal(false)
    setShowSignupModal(false)
  }

  const getTypeIcon = (type: 'text' | 'image' | 'video') => {
    switch (type) {
      case 'text':
        return <FileText className="w-5 h-5" />
      case 'image':
        return <Image className="w-5 h-5" />
      case 'video':
        return <Video className="w-5 h-5" />
    }
  }

  const getStatusBadge = (status: 'pending' | 'completed') => {
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'completed' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status === 'completed' ? 'Completed' : 'Pending'}
      </span>
    )
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Async Tutoring</h1>
          <p className="text-gray-600 mb-8">
            Get personalized help with your AP Economics questions. Upload text, images, or videos and receive detailed responses.
          </p>
          <Button onClick={() => setShowLoginModal(true)} size="lg">
            Sign In to Access
          </Button>
        </div>

        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          switchToSignup={() => {
            setShowLoginModal(false)
            setShowSignupModal(true)
          }}
          onAuthSuccess={handleAuthSuccess}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          switchToLogin={() => {
            setShowSignupModal(false)
            setShowLoginModal(true)
          }}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    )
  }

  // TEMPORARILY DISABLED FOR TESTING - uncomment the block below to restore premium-only access
  /*
  if (!isPremiumUser) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Premium Feature</h1>
          <p className="text-gray-600 mb-8">
            Async tutoring is available exclusively to premium users. Purchase any exam to unlock this feature.
          </p>
          <Button onClick={() => window.location.href = '/purchase/exams'} size="lg">
            Upgrade to Premium
          </Button>
        </div>
      </div>
    )
  }
  */

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Async Tutoring</h1>
        <p className="text-gray-600">
          Get personalized help with your AP Economics questions. Upload text, images, or videos and receive detailed responses.
        </p>
      </div>

      {/* New Request Button */}
      <div className="mb-8">
        <Button 
          onClick={handleNewRequest}
          size="lg"
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Submit New Request
        </Button>
      </div>

      {/* Your Responses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Responses</h2>
        
        {requests.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
            <p className="text-gray-600 mb-4">
              Submit your first request to get started with async tutoring.
            </p>
            <Button onClick={handleNewRequest}>
              Submit Your First Request
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(request.type)}
                    <div>
                      <h3 className="text-lg font-semibold">{request.title}</h3>
                      <p className="text-gray-600 text-sm">{request.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  Submitted on {request.createdAt.toLocaleDateString()}
                </div>

                {request.response && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Response</h4>
                    <p className="text-gray-700 mb-2">{request.response.content}</p>
                    {request.response.videoUrl && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Video Response:</p>
                        <div className="bg-gray-200 rounded h-32 flex items-center justify-center">
                          <span className="text-gray-500">Video Player Placeholder</span>
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-3">
                      Responded on {request.response.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => {
          setShowLoginModal(false)
          setShowSignupModal(true)
        }}
        onAuthSuccess={handleAuthSuccess}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false)
          setShowLoginModal(true)
        }}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  )
} 