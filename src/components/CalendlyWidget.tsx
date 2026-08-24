'use client'

import { InlineWidget } from 'react-calendly'

interface CalendlyWidgetProps {
  url?: string;
  height?: number;
}

export default function CalendlyWidget({
  url = 'https://calendly.com/garrettmould/apdojo',
  height = 700,
}: CalendlyWidgetProps) {
  return (
    <InlineWidget
      url={url}
      styles={{
        height: `${height}px`,
        width: '100%',
        minWidth: '320px',
      }}
      prefill={{
        email: undefined,
        firstName: undefined,
        lastName: undefined,
      }}
    />
  )
}
