import { useState, useEffect } from 'react';

const TUTORIAL_STORAGE_KEY = 'has_seen_cheatsheet_tutorial';

/**
 * Custom hook to manage the first-time cheat sheet tutorial state
 * @returns { showTutorial: boolean, completeTutorial: () => void }
 */
export function useCheatSheetTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    if (typeof window !== 'undefined') {
      const hasSeenTutorial = localStorage.getItem(TUTORIAL_STORAGE_KEY);
      if (hasSeenTutorial !== 'true') {
        setShowTutorial(true);
      }
    }
  }, []);

  const completeTutorial = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
      setShowTutorial(false);
    }
  };

  return { showTutorial, completeTutorial };
}
