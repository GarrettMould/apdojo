'use client';

import { useState, useCallback } from 'react';
import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/contexts/AuthContext';
import { UserData } from './useAuth';

interface CreditConsumptionResult {
  success: boolean;
  remaining?: number;
  message?: string;
}

/**
 * Custom hook for managing user credits (daily practice and lifetime AI generations)
 * 
 * Features:
 * - Daily practice credits reset automatically at midnight (lazy reset)
 * - Lifetime AI generations are one-time tokens
 * - Premium users (with seasonPass) have unlimited access
 * - Uses Firebase transactions for atomic updates
 * - Updates local state immediately after successful consumption
 */
export function useCreditSystem() {
  const { user, userData, setUserData } = useAuthContext();
  const [isConsuming, setIsConsuming] = useState(false);

  /**
   * Helper function to check if user is premium
   * Checks both seasonPass array and expiration dates
   */
  const isPremium = useCallback((): boolean => {
    if (!userData) return false;
    
    const seasonPass = userData.seasonPass as string[] | undefined;
    const expiration = userData.seasonPassExpiration as Record<string, string> | undefined;
    
    if (!seasonPass || seasonPass.length === 0) return false;
    if (!expiration) return false; // If no expiration data, assume not premium (safety check)
    
    // Get current UTC time
    const now = new Date();
    const nowUTC = now.toISOString();
    
    // Check if user has at least one valid (non-expired) season pass
    const hasValidPass = seasonPass.some((subject: string) => {
      const expDate = expiration[subject];
      if (!expDate) return false; // No expiration date = not valid
      
      // Compare ISO strings (lexicographic comparison works for ISO 8601)
      return expDate >= nowUTC;
    });
    
    return hasValidPass;
  }, [userData]);

  /**
   * Helper function to get today's date as YYYY-MM-DD
   */
  const getTodayDateString = useCallback((): string => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }, []);

  /**
   * Helper function to initialize credits if they don't exist
   */
  const initializeCredits = useCallback((currentData: UserData): UserData => {
    const today = getTodayDateString();
    return {
      ...currentData,
      credits: {
        dailyPractice: {
          remaining: 3,
          lastResetDate: today,
        },
        lifetimeAiGenerations: 1,
      },
    };
  }, [getTodayDateString]);

  /**
   * Consume a daily practice credit
   * 
   * Logic:
   * 1. Lazy Reset: Compare server date vs lastResetDate. If different, reset to 3.
   * 2. Premium Check: If user is premium, return success without deduction.
   * 3. Deduction: If remaining > 0, decrement by 1 and update Firestore.
   * 4. Return: success: true/false with remaining count.
   */
  const consumeDailyCredit = useCallback(async (): Promise<CreditConsumptionResult> => {
    if (!user || !userData) {
      return { success: false, message: 'User not authenticated' };
    }

    setIsConsuming(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);

      const result = await runTransaction(db, async (transaction) => {
        // Get current user document
        const userDoc = await transaction.get(userDocRef);
        
        if (!userDoc.exists()) {
          throw new Error('User document not found');
        }

        const currentData = userDoc.data() as UserData;
        const today = getTodayDateString();

        // Initialize credits if they don't exist
        let credits = currentData.credits || {
          dailyPractice: { remaining: 3, lastResetDate: today },
          lifetimeAiGenerations: 1,
        };

        // Lazy Reset: Check if date has changed
        if (credits.dailyPractice.lastResetDate !== today) {
          credits = {
            ...credits,
            dailyPractice: {
              remaining: 3,
              lastResetDate: today,
            },
          };
        }

        // Premium Check: If user is premium, return success without deduction
        const seasonPass = currentData.seasonPass as string[] | undefined;
        const isUserPremium = !!seasonPass && (seasonPass.includes('macro') || seasonPass.includes('micro'));

        if (isUserPremium) {
          // Update the document with reset credits (if needed) but don't deduct
          transaction.update(userDocRef, {
            credits,
            updatedAt: serverTimestamp(),
          });
          return { success: true, remaining: credits.dailyPractice.remaining };
        }

        // Deduction: Check if remaining > 0
        if (credits.dailyPractice.remaining > 0) {
          const newRemaining = credits.dailyPractice.remaining - 1;
          const updatedCredits = {
            ...credits,
            dailyPractice: {
              ...credits.dailyPractice,
              remaining: newRemaining,
            },
          };

          // Update Firestore atomically
          transaction.update(userDocRef, {
            credits: updatedCredits,
            updatedAt: serverTimestamp(),
          });

          return { success: true, remaining: newRemaining };
        } else {
          // No credits remaining
          return { success: false, remaining: 0 };
        }
      });

      // Update local state immediately after successful transaction
      if (result.success && result.remaining !== undefined) {
        setUserData((prev) => {
          if (!prev) return prev;
          const today = getTodayDateString();
          return {
            ...prev,
            credits: {
              ...(prev.credits || {
                dailyPractice: { remaining: 3, lastResetDate: today },
                lifetimeAiGenerations: 1,
              }),
              dailyPractice: {
                remaining: result.remaining!,
                lastResetDate: today,
              },
            },
          };
        });
      }

      return result;
    } catch (error) {
      console.error('[useCreditSystem] Error consuming daily credit:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsConsuming(false);
    }
  }, [user, userData, setUserData, getTodayDateString]);

  /**
   * Consume a lifetime AI generation credit
   * 
   * Logic:
   * 1. Premium Check: If user is premium, return success (unlimited).
   * 2. Deduction: If lifetimeAiGenerations > 0, decrement by 1 and update Firestore.
   * 3. Return: success: true/false.
   */
  const consumeLifetimeCredit = useCallback(async (): Promise<CreditConsumptionResult> => {
    if (!user || !userData) {
      return { success: false, message: 'User not authenticated' };
    }

    setIsConsuming(true);

    try {
      const userDocRef = doc(db, 'users', user.uid);

      const result = await runTransaction(db, async (transaction) => {
        // Get current user document
        const userDoc = await transaction.get(userDocRef);
        
        if (!userDoc.exists()) {
          throw new Error('User document not found');
        }

        const currentData = userDoc.data() as UserData;

        // Initialize credits if they don't exist
        let credits = currentData.credits || {
          dailyPractice: { remaining: 3, lastResetDate: getTodayDateString() },
          lifetimeAiGenerations: 1,
        };

        // Premium Check: If user is premium, return success (unlimited)
        const seasonPass = currentData.seasonPass as string[] | undefined;
        const isUserPremium = !!seasonPass && (seasonPass.includes('macro') || seasonPass.includes('micro'));

        if (isUserPremium) {
          // Update the document with initialized credits (if needed) but don't deduct
          transaction.update(userDocRef, {
            credits,
            updatedAt: serverTimestamp(),
          });
          return { success: true, remaining: credits.lifetimeAiGenerations };
        }

        // Deduction: Check if lifetimeAiGenerations > 0
        if (credits.lifetimeAiGenerations > 0) {
          const newLifetime = credits.lifetimeAiGenerations - 1;
          const updatedCredits = {
            ...credits,
            lifetimeAiGenerations: newLifetime,
          };

          // Update Firestore atomically
          transaction.update(userDocRef, {
            credits: updatedCredits,
            updatedAt: serverTimestamp(),
          });

          return { success: true, remaining: newLifetime };
        } else {
          // No credits remaining
          return { success: false, remaining: 0 };
        }
      });

      // Update local state immediately after successful transaction
      if (result.success && result.remaining !== undefined) {
        setUserData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            credits: {
              ...(prev.credits || {
                dailyPractice: { remaining: 3, lastResetDate: getTodayDateString() },
                lifetimeAiGenerations: 1,
              }),
              lifetimeAiGenerations: result.remaining!,
            },
          };
        });
      }

      return result;
    } catch (error) {
      console.error('[useCreditSystem] Error consuming lifetime credit:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsConsuming(false);
    }
  }, [user, userData, setUserData, getTodayDateString]);

  /**
   * Get current credit status (for UI display)
   */
  const getCreditStatus = useCallback(() => {
    if (!userData) {
      return {
        dailyPractice: { remaining: 0, lastResetDate: getTodayDateString() },
        lifetimeAiGenerations: 0,
        isPremium: false,
      };
    }

    const today = getTodayDateString();
    const credits = userData.credits || {
      dailyPractice: { remaining: 3, lastResetDate: today },
      lifetimeAiGenerations: 1,
    };

    // Check if daily credits need reset
    let dailyRemaining = credits.dailyPractice.remaining;
    if (credits.dailyPractice.lastResetDate !== today) {
      dailyRemaining = 3; // Would be reset on next consumption
    }

    return {
      dailyPractice: {
        remaining: dailyRemaining,
        lastResetDate: credits.dailyPractice.lastResetDate,
      },
      lifetimeAiGenerations: credits.lifetimeAiGenerations,
      isPremium: isPremium(),
    };
  }, [userData, isPremium, getTodayDateString]);

  return {
    consumeDailyCredit,
    consumeLifetimeCredit,
    getCreditStatus,
    isConsuming,
    isPremium: isPremium(),
  };
}

