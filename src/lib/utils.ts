import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Assigns light pastel background colors based on unit ID
// (Using darker fills like bg-blue-500 for better visibility on the bar)
export const getUnitColor = (unitId: number): string => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500',
    'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
    // ... rest of function ...
  ]
  return colors[unitId % colors.length]
}
