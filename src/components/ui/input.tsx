import * as React from "react"

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      className={`flex h-24 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ${className}`}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input } 