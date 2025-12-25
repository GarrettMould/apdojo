export interface BeltThreshold {
  id: string;
  minXP: number;
  name: string;
  label: string;
  color: string;
  textColor: string;
}

export const BELT_THRESHOLDS: BeltThreshold[] = [
  {
    id: 'white',
    minXP: 0,
    name: 'White Belt',
    label: 'The Rookie',
    color: 'bg-gray-100',
    textColor: 'text-gray-800',
  },
  {
    id: 'yellow',
    minXP: 2000,
    name: 'Yellow Belt',
    label: 'The Apprentice',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-900',
  },
  {
    id: 'orange',
    minXP: 7500,
    name: 'Orange Belt',
    label: 'The Scholar',
    color: 'bg-orange-500',
    textColor: 'text-white',
  },
  {
    id: 'green',
    minXP: 20000,
    name: 'Green Belt',
    label: 'The Expert',
    color: 'bg-green-600',
    textColor: 'text-white',
  },
  {
    id: 'blue',
    minXP: 45000,
    name: 'Blue Belt',
    label: 'The Master',
    color: 'bg-blue-600',
    textColor: 'text-white',
  },
  {
    id: 'black',
    minXP: 80000,
    name: 'Black Belt',
    label: 'The Sensei',
    color: 'bg-gray-900',
    textColor: 'text-white',
  },
];

/**
 * Returns the highest belt achieved based on XP
 */
export function getCurrentBelt(xp: number): BeltThreshold {
  // Start from the highest belt and work backwards
  for (let i = BELT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= BELT_THRESHOLDS[i].minXP) {
      return BELT_THRESHOLDS[i];
    }
  }
  // Fallback to white belt (should never happen, but TypeScript safety)
  return BELT_THRESHOLDS[0];
}

/**
 * Returns the next belt object, or null if already at max rank
 */
export function getNextBelt(xp: number): BeltThreshold | null {
  const currentBelt = getCurrentBelt(xp);
  const currentIndex = BELT_THRESHOLDS.findIndex(b => b.id === currentBelt.id);
  
  // If already at the highest belt, return null
  if (currentIndex === BELT_THRESHOLDS.length - 1) {
    return null;
  }
  
  // Return the next belt
  return BELT_THRESHOLDS[currentIndex + 1];
}

export interface BeltProgress {
  currentXP: number;
  currentBelt: BeltThreshold;
  nextBelt: BeltThreshold | null;
  nextBeltXP: number | null;
  xpToNext: number | null;
  percent: number; // 0-100 representing progress within current level
}

/**
 * Returns detailed progress information for the current belt level
 */
export function getBeltProgress(xp: number): BeltProgress {
  const currentBelt = getCurrentBelt(xp);
  const nextBelt = getNextBelt(xp);
  
  const currentIndex = BELT_THRESHOLDS.findIndex(b => b.id === currentBelt.id);
  const currentBeltMinXP = currentBelt.minXP;
  const nextBeltMinXP = nextBelt?.minXP ?? null;
  
  // Calculate progress within current belt level
  let percent = 0;
  let xpToNext: number | null = null;
  
  if (nextBelt && nextBeltMinXP !== null) {
    // Calculate XP range for current belt
    const currentBeltRange = nextBeltMinXP - currentBeltMinXP;
    const xpInCurrentBelt = xp - currentBeltMinXP;
    
    // Calculate percentage (0-100) within current belt
    percent = Math.min(100, Math.max(0, (xpInCurrentBelt / currentBeltRange) * 100));
    xpToNext = nextBeltMinXP - xp;
  } else {
    // At max rank (Black Belt)
    percent = 100; // Show as fully progressed
    xpToNext = null;
  }
  
  return {
    currentXP: xp,
    currentBelt,
    nextBelt,
    nextBeltXP: nextBeltMinXP,
    xpToNext,
    percent,
  };
}


