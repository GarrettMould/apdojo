'use client'

import { InlineWidget } from 'react-calendly'

export default function CalendlyWidget() {
  return (
    <InlineWidget
      url="https://calendly.com/garrettmould/apdojo" // Update this with your actual Calendly URL
      styles={{
        height: '700px',
        width: '100%',
      }}
      prefill={{
        email: undefined, // This will be filled by the user
        firstName: undefined,
        lastName: undefined,
      }}
    />
  )
} 