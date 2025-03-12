'use client'

import { useAuth } from '@/lib/auth' // Your Firebase auth hook
import { PaymentForm } from '@/components/PaymentForm'

export default function PurchasePage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to purchase</div>
  }

  return (
    <div>
      <h1>Purchase Lesson</h1>
      <PaymentForm />
    </div>
  )
}