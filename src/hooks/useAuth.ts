'use client'
import { useState, useEffect, useRef } from 'react'
import { 
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp, collection, query, getDocs, onSnapshot, getDoc, where, increment } from 'firebase/firestore'
import { UnitDetails } from '@/components/UnitPerformanceDisplay'
import { getSubjectXP } from './useUserProgress'

// Define the structure of your MCQ answer data
interface McqAnswer {
  id?: string; // Optional: Firestore document ID
  questionId: string | number; // Or whatever type your question ID is
  isCorrect: boolean;
  unitId: number; // Corrected field name
  lessonIDS: string[];
  timestamp?: any; // Optional: if you store a timestamp
}

// Interface for data stored in the unitXP subcollection
export interface UnitXPData {
  unitId: number;
  subject: string;
  totalXP: number;
  lastUpdated: any; // Firestore Timestamp
}

// Define state structure for remembered unit selections
export interface LastSelectedUnits {
    [subject: string]: number[];
}

// Define UserData interface (if not already defined)
export interface UserData {
  displayName: string;
  email: string;
  // ... other user data fields ...
  selectedSubject?: 'macro' | 'micro';
  hasCompletedInitialUnitSelection?: boolean;
  initialPracticeUnitIds?: number[];
  // Add level/XP fields if they are part of UserData
  /** @deprecated Use xp_macro and xp_micro instead. Legacy field for backward compatibility. */
  totalXP?: number;
  // New subject-specific XP fields
  xp_macro?: number;
  xp_micro?: number;
  // Add the new map field for MCQ answer status
  mcqAnswerStatus?: { [key: string]: boolean }; 
  // Keep viewedMcqIds for now if needed elsewhere, remove later if redundant
  viewedMcqIds?: (string | number)[]; 
  // Add purchases field for premium features
  purchases?: string[];
  // Add purchasedTests field for unit MCQ tests
  purchasedTests?: string[];
  // Add seasonPass field for pro customers (array of 'macro' | 'micro')
  seasonPass?: string[];
}

// --- ADD LEVELING LOGIC --- 

const LEVEL_THRESHOLDS = [
    0,    // Level 1 starts at 0 XP
    100,  // Reach Level 2 at 100 XP
    250,  // Reach Level 3 at 250 XP
    450,  // Reach Level 4 at 450 XP
    700,  // Reach Level 5 at 700 XP
    1000, // Reach Level 6 at 1000 XP
    1350, // Reach Level 7 at 1350 XP
    1750, // Reach Level 8 at 1750 XP
    2200, // Reach Level 9 at 2200 XP
    2700, // Reach Level 10 at 2700 XP
    3250  // "Level 11" threshold for progress calculation at max level
];
const MAX_LEVEL = 10;

export interface LevelInfo {
    level: number;
    progress: number; // Percentage (0-100) towards next level
    xpForCurrentLevel: number;
    xpForNextLevel: number;
}

export function calculateLevelAndProgress(totalXP: number): LevelInfo {
    let currentLevel = 1;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (totalXP >= LEVEL_THRESHOLDS[i]) {
            currentLevel = i + 1;
            break;
        }
    }
    currentLevel = Math.min(currentLevel, MAX_LEVEL);
    const xpForCurrentLevel = LEVEL_THRESHOLDS[currentLevel - 1];
    const xpForNextLevel = LEVEL_THRESHOLDS[currentLevel] ?? xpForCurrentLevel;
    let progress = 0;
    if (currentLevel < MAX_LEVEL) {
        const xpNeededForNext = xpForNextLevel - xpForCurrentLevel;
        const xpEarnedThisLevel = totalXP - xpForCurrentLevel;
        if (xpNeededForNext > 0) {
            progress = Math.min(100, Math.max(0, (xpEarnedThisLevel / xpNeededForNext) * 100));
        } else {
             progress = 100;
        }
    } else {
        progress = 100;
    }
    return {
        level: currentLevel,
        progress: Math.round(progress),
        xpForCurrentLevel,
        xpForNextLevel,
    };
}

// --- END LEVELING LOGIC ---

// --- ADD: Interface for calculated unit stats ---
export interface UnitPerformanceStat {
  unitId: number;
  percentage: number;
  correctAnswers: number;
  totalAnswers: number;
  subject: 'macro' | 'micro'; // Store subject for easier filtering later
}
// --- END: Interface ---

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthContextValue>;
  signup: (email: string, password: string, isSubscribed: boolean) => Promise<AuthContextValue>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  mcqAnswersData: McqAnswer[] | null;
  loadingMcqData: boolean;
  userData: UserData | null;
  loadingUserData: boolean;
  lastSelectedPracticeUnits: LastSelectedUnits | null;
  setLastSelectedPracticeUnits: (subject: 'macro' | 'micro', unitIds: number[]) => void;
  globalLevel: number;
  globalProgress: number;
  totalXP: number;
  correctStreak: number;
  setCorrectStreak: (streak: number | ((prev: number) => number)) => void;
  isNextQuestionDoubleXp: boolean;
  setIsNextQuestionDoubleXp: (isNext: boolean | ((prev: boolean) => boolean)) => void;
  // --- ADD: Unit Performance Stats ---
  unitPerformanceStats: UnitPerformanceStat[] | null;
  loadingUnitPerformance: boolean;
  // --- END: Unit Performance Stats ---

  // --- ADD: Modal State and Setters ---
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSignupModal: boolean;
  setShowSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
  // --- END: Modal State and Setters ---
  // --- ADD: Subject State and Setters ---
  selectedSubject: 'macro' | 'micro';
  setSelectedSubject: (subject: 'macro' | 'micro') => void;
  toggleSubject: () => void;
  // --- END: Subject State and Setters ---

  // --- ADD: XP Helper + Guest XP + Toast ---
  guestXp: number;
  awardXp: (amount: number, subject?: 'macro' | 'micro') => Promise<void>;
  xpToast: { amount: number; total: number } | null;
  // --- END: XP Helper + Guest XP + Toast ---

  // --- ADD: Redirect on Login ---
  redirectOnLogin: string | null;
  setRedirectOnLogin: (path: string | null) => void;

  // --- ADD: Character Closet State ---
  isCharacterClosetOpen: boolean;
  setIsCharacterClosetOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  // --- END: Character Closet State ---
}

// --- ADD: Helper Function to Calculate Unit Performance ---
function calculateUnitPerformance(answers: McqAnswer[], subject: 'macro' | 'micro'): UnitPerformanceStat[] {
  console.log(`[Calc Unit Perf] Calculating for ${subject} with ${answers.length} answers.`);
  if (!answers || answers.length === 0) return [];

  const unitStats: { [key: number]: { correct: number; total: number } } = {};

  answers.forEach(answer => {
    // Ensure unitId is a number and exists
    if (typeof answer.unitId === 'number') {
      const unitId = answer.unitId;
      if (!unitStats[unitId]) {
        unitStats[unitId] = { correct: 0, total: 0 };
      }
      unitStats[unitId].total++;
      if (answer.isCorrect) {
        unitStats[unitId].correct++;
      }
    } else {
      // Optionally log if unitId is missing or not a number
      // console.warn('[Calc Unit Perf] Skipping answer due to invalid unitId:', answer);
    }
  });

  const calculatedStats = Object.entries(unitStats).map(([unitIdStr, stats]) => {
    const unitId = parseInt(unitIdStr, 10);
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return {
      unitId,
      percentage,
      correctAnswers: stats.correct,
      totalAnswers: stats.total,
      subject: subject // Add subject here
    };
  });

  // Sort by unitId for consistent order
  calculatedStats.sort((a, b) => a.unitId - b.unitId);

  console.log('[Calc Unit Perf] Calculated Stats:', calculatedStats);
  return calculatedStats;
}
// --- END: Helper Function ---

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // --- State for MCQ Answers ---
  const [mcqAnswersData, setMcqAnswersData] = useState<McqAnswer[]>([]);
  const [loadingMcqData, setLoadingMcqData] = useState(true); // Start true

  // Add state for the user document data
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  // --- ADD State for last selected practice units ---
  const [lastSelectedPracticeUnits, _setLastSelectedPracticeUnits] = useState<LastSelectedUnits | null>(null);

  // --- ADD State for global level/progress --- 
  const [globalLevel, setGlobalLevel] = useState<number>(1);
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [totalXP, setTotalXP] = useState<number>(0); // Add state for total XP

  // --- ADD State for streak and double XP
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [isNextQuestionDoubleXp, setIsNextQuestionDoubleXp] = useState<boolean>(false);
  
   // --- ADD State for guest XP and XP toast ---
   const [guestXp, setGuestXp] = useState<number>(0);
   const [xpToast, setXpToast] = useState<{ amount: number; total: number } | null>(null);

   // --- ADD State for redirect on login ---
  const [redirectOnLogin, setRedirectOnLogin] = useState<string | null>(null);

  // --- ADD State for Character Closet ---
  const [isCharacterClosetOpen, setIsCharacterClosetOpen] = useState<boolean>(false);
  // --- END: Character Closet State ---

  // --- ADD State for Unit Performance ---
  const [unitPerformanceStats, setUnitPerformanceStats] = useState<UnitPerformanceStat[] | null>(null);
  const [loadingUnitPerformance, setLoadingUnitPerformance] = useState(true);
  // --- END State ---

  // --- ADD State for Selected Subject (works for both logged-in and guests) ---
  const [selectedSubject, setSelectedSubjectState] = useState<'macro' | 'micro'>('macro');
  
  // Initialize subject from userData or localStorage
  useEffect(() => {
    if (user && userData?.selectedSubject) {
      setSelectedSubjectState(userData.selectedSubject);
    } else if (!user && typeof window !== 'undefined') {
      const storedSubject = localStorage.getItem('guestAPSubject') as 'macro' | 'micro' | null;
      if (storedSubject) {
        setSelectedSubjectState(storedSubject);
      }
    }
  }, [user, userData?.selectedSubject]);

  // Initialize guest XP from localStorage for logged-out users
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const raw = localStorage.getItem('guestXp');
      const parsed = raw ? parseInt(raw, 10) : 0;
      console.log('[XP] Initializing guest XP from localStorage:', { raw, parsed, isValid: !Number.isNaN(parsed) });
      if (!Number.isNaN(parsed)) {
        setGuestXp(parsed);
        console.log('[XP] Guest XP initialized to:', parsed);
      }
    } else if (user) {
      console.log('[XP] User is logged in, clearing guest XP state');
      setGuestXp(0);
    }
  }, [user]);

  // Auto-hide XP toast after a short delay
  useEffect(() => {
    if (!xpToast) return;
    const timer = setTimeout(() => {
      setXpToast(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [xpToast]);

  // Update totalXP when selectedSubject or userData changes
  useEffect(() => {
    if (user && userData) {
      const currentXP = getSubjectXP(userData, selectedSubject);
      setTotalXP(currentXP);
      const levelInfo = calculateLevelAndProgress(currentXP);
      setGlobalLevel(levelInfo.level);
      setGlobalProgress(levelInfo.progress);
    }
  }, [user, userData, selectedSubject]);

  // Function to set selected subject (updates both state and storage)
  const setSelectedSubject = async (subject: 'macro' | 'micro') => {
    setSelectedSubjectState(subject);
    if (user) {
      // Update in Firestore for logged-in users
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { selectedSubject: subject }, { merge: true });
      } catch (error) {
        console.error('[useAuth] Error updating selected subject:', error);
      }
    } else {
      // Store in localStorage for guests
      if (typeof window !== 'undefined') {
        localStorage.setItem('guestAPSubject', subject);
      }
    }
  };

  // Function to toggle between macro and micro
  const toggleSubject = () => {
    const newSubject = selectedSubject === 'macro' ? 'micro' : 'macro';
    setSelectedSubject(newSubject);
  };
  // --- END Subject State ---

  // --- Refs for unsubscribers ---
  const unsubscribeAnswersRef = useRef<(() => void) | null>(null);
  const unsubscribeUserRef = useRef<(() => void) | null>(null); // Add ref for user doc listener

  // --- ADD Setter function for last selected practice units ---
  const setLastSelectedPracticeUnits = (subject: 'macro' | 'micro', unitIds: number[]) => {
      _setLastSelectedPracticeUnits(prev => ({
          ...(prev || {}),
          [subject]: unitIds
      }));
      console.log(`[useAuth] Updated last selected units for ${subject}:`, unitIds);
  };

  useEffect(() => {
    console.log("[useAuth] Auth listener effect setup."); // Log effect setup
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("[useAuth] Auth state changed. User:", firebaseUser?.uid); // Log auth state change
      setUser(firebaseUser);
      setLoading(false);

      // Cleanup previous listeners
      if (unsubscribeAnswersRef.current) {
          unsubscribeAnswersRef.current();
          unsubscribeAnswersRef.current = null;
          console.log("[useAuth] Cleaned up previous answers listener.");
      }
      if (unsubscribeUserRef.current) {
          unsubscribeUserRef.current();
          unsubscribeUserRef.current = null;
          console.log("[useAuth] Cleaned up previous user document listener.");
      }

      if (firebaseUser) {
        console.log("[useAuth] User logged in. Setting loading states to true."); // Log state setting
        setLoadingMcqData(true);
        setLoadingUserData(true);
        setLoadingUnitPerformance(true); // Reset unit performance loading

        // --- Merge any guest XP into this user once on login --- 
        (async () => {
          try {
            if (typeof window !== 'undefined') {
              const rawGuestXp = localStorage.getItem('guestXp');
              const pendingGuestXp = rawGuestXp ? parseInt(rawGuestXp, 10) : 0;
              if (pendingGuestXp > 0) {
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                await setDoc(
                  userDocRef,
                  { totalXP: increment(pendingGuestXp) },
                  { merge: true }
                );
                // Fallback: if increment isn't available via window, we'll rely on snapshot overwrite
                localStorage.removeItem('guestXp');
                setGuestXp(0);
                console.log(`[useAuth] Merged ${pendingGuestXp} guest XP into user ${firebaseUser.uid}.`);
              }
            }
          } catch (err) {
            console.error('[useAuth] Error merging guest XP into user:', err);
          }
        })();

        // --- Fetch User Document Data (now includes totalXP calculation) --- 
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        console.log("[useAuth] Setting up user document listener for:", firebaseUser.uid);
        // Assign the listener to the ref
        unsubscribeUserRef.current = onSnapshot(userDocRef, async (userDocSnap) => {
            console.log("[useAuth] User document snapshot received. Exists:", userDocSnap.exists());
            if (userDocSnap.exists()) {
                // Document exists - proceed as normal
                const fetchedUserData = userDocSnap.data() as UserData;
                setUserData(fetchedUserData); // Set the main user data
                console.log("[useAuth] User document data updated:", fetchedUserData);

                // --- Calculate Total XP and Level/Progress from user data --- 
                // Use the helper to get XP for the current subject (with legacy fallback)
                const currentSubject = fetchedUserData?.selectedSubject ?? 'macro';
                const currentTotalXP = getSubjectXP(fetchedUserData, currentSubject);
                setTotalXP(currentTotalXP);
                const levelInfo = calculateLevelAndProgress(currentTotalXP);
                setGlobalLevel(levelInfo.level);
                setGlobalProgress(levelInfo.progress);
                console.log(`[useAuth] Read Total XP for ${currentSubject}: ${currentTotalXP}, Calculated Level: ${levelInfo.level}, Progress: ${levelInfo.progress}%`);
                // --- End calculation ---

                console.log("[useAuth] Setting loadingUserData to FALSE.");
                setLoadingUserData(false); // User data is loaded

                // --- Setup MCQ Answers Listener (using fetchedUserData.selectedSubject) --- 
                // currentSubject already defined above
                if (currentSubject && !unsubscribeAnswersRef.current) {
                     console.log(`[useAuth] Setting up MCQ answers listener for user ${firebaseUser.uid}, subject ${currentSubject}`);
                     const answersColRef = collection(db, 'users', firebaseUser.uid, 'mcqAnswers');
                     // Consider adding a 'where' clause if you stored subject on answers, 
                     // otherwise, filtering happens in calculateUnitPerformance
                     const answersQuery = query(answersColRef);
                     unsubscribeAnswersRef.current = onSnapshot(answersQuery, (snapshot) => {
                         console.log(`[useAuth] MCQ answers snapshot received. Size: ${snapshot.size}`);
                         const answers = snapshot.docs.map(doc => ({
                             id: doc.id,
                             ...doc.data()
                         } as McqAnswer));
                         setMcqAnswersData(answers);
                         
                         // --- Calculate and set Unit Performance Stats --- 
                         const perfStats = calculateUnitPerformance(answers, currentSubject);
                         setUnitPerformanceStats(perfStats);
                         setLoadingUnitPerformance(false); // Performance calculation done
                         // --- End Calculation ---

                         setLoadingMcqData(false); // Raw answers data also loaded
                     }, (error) => {
                         console.error("[useAuth] Error fetching MCQ answers:", error);
                         setMcqAnswersData([]);
                         setUnitPerformanceStats(null); // Clear stats on error
                         setLoadingMcqData(false);
                         setLoadingUnitPerformance(false); // Finish loading even on error
                     });
                } else if (!currentSubject) {
                     console.warn("[useAuth] No selected subject found in user data. Cannot setup MCQ answers listener or calculate performance.");
                     setMcqAnswersData([]);
                     setUnitPerformanceStats(null);
                     setLoadingMcqData(false);
                     setLoadingUnitPerformance(false);
                }
                // --- End MCQ Answers Listener Setup --- 

            } else {
                 // Handle case where user document doesn't exist (might need creation)
                 console.warn("[useAuth] User document does not exist for user:", firebaseUser.uid);
                 setUserData(null);
                 setTotalXP(0); // Reset XP
                 setGlobalLevel(1);
                 setGlobalProgress(0);
                 setMcqAnswersData([]); // Reset answers
                 setLoadingUserData(false); // Finish loading even if no doc
                 setLoadingMcqData(false); // Finish answers loading
                 setUnitPerformanceStats(null);
                 setLoadingUnitPerformance(false);
            }
        }, (error) => {
             console.error("[useAuth] Error listening to user document:", error);
             // Handle listener error (e.g., permissions)
             setUserData(null);
             setTotalXP(0);
             setGlobalLevel(1);
             setGlobalProgress(0);
             setMcqAnswersData([]);
             setLoadingUserData(false);
             setLoadingMcqData(false);
             setUnitPerformanceStats(null);
             setLoadingUnitPerformance(false);
        });

      } else {
        // User logged out
        console.log("[useAuth] User logged out. Resetting states.");
        setUserData(null);
        setMcqAnswersData([]);
        setTotalXP(0);
        setGlobalLevel(1);
        setGlobalProgress(0);
        setLoadingUserData(false); // No user data to load
        setLoadingMcqData(false); // No answers to load
        setUnitPerformanceStats(null);
        setLoadingUnitPerformance(false);
      }
    })

    // Cleanup auth listener on component unmount
    return () => {
        console.log("[useAuth] Cleaning up auth listener.");
        unsubscribeAuth();
        // Ensure other listeners are also cleaned up
        if (unsubscribeAnswersRef.current) {
            unsubscribeAnswersRef.current();
            unsubscribeAnswersRef.current = null;
        }
        if (unsubscribeUserRef.current) {
            unsubscribeUserRef.current();
            unsubscribeUserRef.current = null;
        }
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  // --- ADD: awardXp helper ---
  const awardXp = async (amount: number, subject: 'macro' | 'micro' = selectedSubject): Promise<void> => {
    console.log('[XP] ===== awardXp FUNCTION CALLED =====', { amount, subject, hasUser: !!user, userId: user?.uid });
    try {
      console.log('[XP] Awarding XP:', { amount, subject, hasUser: !!user });
      if (user) {
        // Use the helper to get current XP (with legacy fallback)
        const currentXP = getSubjectXP(userData, subject);
        const newTotal = currentXP + amount;
        
        // Determine which field to update
        const fieldName = subject === 'macro' ? 'xp_macro' : 'xp_micro';
        
        // Logged-in: update subject-specific XP in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { [fieldName]: newTotal }, { merge: true });

        // Optimistic toast using calculated new total
        setXpToast({ amount, total: newTotal });
        console.log(`[XP] Updated ${fieldName} to ${newTotal} (was ${currentXP}, added ${amount})`);
      } else {
        // Guest: track XP locally (for now, we'll use a single guest XP value)
        // In the future, you might want to separate guest macro/micro XP too
        console.log('[XP] Guest user - updating guestXp state and localStorage');
        setGuestXp(prev => {
          const next = prev + amount;
          console.log('[XP] Guest XP state update:', { previous: prev, amount, next });
          if (typeof window !== 'undefined') {
            localStorage.setItem('guestXp', String(next));
            console.log('[XP] Saved to localStorage:', next);
          }
          console.log('[XP] New guestXp total:', next);
          setXpToast({ amount, total: next });
          return next;
        });
      }
    } catch (err) {
      console.error('[useAuth] Error awarding XP:', err);
    }
  };

  const signup = async (email: string, password: string, isSubscribed: boolean): Promise<AuthContextValue> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      if (newUser) {
        const userDocRef = doc(db, 'users', newUser.uid);
        await setDoc(userDocRef, {
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName || email.split('@')[0],
          createdAt: serverTimestamp(),
          hasCompletedSubjectSelection: false,
          hasCompletedInitialUnitSelection: false,
          initialPracticeUnitIds: [],
          hasCompletedQuizTutorial: false,
          mcqAnswerStatus: {}, // Initialize the map field
          viewedMcqIds: [],   // Initialize the array field
          totalXP: 150, // <-- Initialize totalXP to 150
          isSubscribedToMarketing: isSubscribed
        });
        
        // If user subscribed, add their email to the subscribedEmails collection
        if (isSubscribed && newUser.email) {
          try {
            const subscribedEmailRef = doc(db, 'subscribedEmails', newUser.email);
            await setDoc(subscribedEmailRef, {
              email: newUser.email,
              userId: newUser.uid,
              subscribedAt: serverTimestamp(),
              displayName: newUser.displayName || email.split('@')[0]
            });
            console.log("[useAuth] Added email to subscribedEmails collection:", newUser.email);
          } catch (emailError) {
            // Log error but don't fail signup if email collection write fails
            console.error("[useAuth] Failed to add email to subscribedEmails collection:", emailError);
          }
        }
        
        // Send email verification
        try {
          await sendEmailVerification(newUser);
          console.log("[useAuth] Verification email sent to:", newUser.email);
        } catch (verificationError) {
          // Log error but don't fail signup if verification email fails
          console.error("[useAuth] Failed to send verification email:", verificationError);
        }
        
        setUser(newUser);
        console.log("[useAuth] New user document created with initial totalXP 150."); // Updated log message
      } else {
         throw new Error("User creation failed in Firebase Auth.");
      }
      setLoading(false);
      // Return the full context object to satisfy the type
      return { 
        user: newUser, 
        loading: false, 
        login, 
        signup, 
        logout, 
        resendVerificationEmail,
        mcqAnswersData: mcqAnswersData, 
        loadingMcqData: loadingMcqData, 
        userData: userData, 
        loadingUserData: loadingUserData, 
        lastSelectedPracticeUnits: lastSelectedPracticeUnits, 
        setLastSelectedPracticeUnits: setLastSelectedPracticeUnits, 
        globalLevel: globalLevel, 
        globalProgress: globalProgress, 
        totalXP: totalXP, 
        correctStreak: correctStreak, 
        setCorrectStreak: setCorrectStreak, 
        isNextQuestionDoubleXp: isNextQuestionDoubleXp, 
        setIsNextQuestionDoubleXp: setIsNextQuestionDoubleXp,
        unitPerformanceStats,
        loadingUnitPerformance,
        showLoginModal,
        setShowLoginModal,
        showSignupModal,
        setShowSignupModal,
        selectedSubject,
        setSelectedSubject,
        toggleSubject,
        guestXp,
        awardXp,
        xpToast,
        redirectOnLogin,
        setRedirectOnLogin
      };
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
      throw error;
    }
  }

  const login = async (email: string, password: string): Promise<AuthContextValue> => {
    setLoading(true);
    try {
        // Only call Firebase auth here. Redirect is handled by the calling page.
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("[useAuth] Login successful trigger for:", userCredential.user?.email);
        setLoading(false);

        // --- ADD: Handle redirect ---
        if (redirectOnLogin) {
          window.location.href = redirectOnLogin;
          setRedirectOnLogin(null);
        }
        // --- END: Handle redirect ---

        // Return the current context state 
        // The onAuthStateChanged listener will update the user state globally
        return { 
          user: auth.currentUser, 
          loading: false, 
          login, 
          signup, 
          logout, 
          resendVerificationEmail,
          mcqAnswersData: mcqAnswersData, 
          loadingMcqData: loadingMcqData, 
          userData: userData, 
          loadingUserData: loadingUserData, 
          lastSelectedPracticeUnits: lastSelectedPracticeUnits, 
          setLastSelectedPracticeUnits: setLastSelectedPracticeUnits, 
          globalLevel: globalLevel, 
          globalProgress: globalProgress, 
          totalXP: totalXP, 
          correctStreak: correctStreak, 
          setCorrectStreak: setCorrectStreak, 
          isNextQuestionDoubleXp: isNextQuestionDoubleXp, 
          setIsNextQuestionDoubleXp: setIsNextQuestionDoubleXp,
          unitPerformanceStats,
          loadingUnitPerformance,
          showLoginModal,
          setShowLoginModal,
          showSignupModal,
          setShowSignupModal,
          selectedSubject,
          setSelectedSubject,
          toggleSubject,
          guestXp,
          awardXp,
          xpToast,
          redirectOnLogin,
          setRedirectOnLogin
        };
    } catch (error) {
        console.error("Login failed:", error);
        setLoading(false);
        throw error; // Re-throw error to be caught by caller
    }
  }

  const logout = async () => {
    setUser(null)
    setShowLoginModal(false);
    setShowSignupModal(false);
    return signOut(auth)
  }

  const resendVerificationEmail = async (): Promise<void> => {
    if (!user || !user.email) {
      throw new Error("No user logged in");
    }
    
    // Reload user to get latest emailVerified status
    await user.reload();
    
    if (user.emailVerified) {
      throw new Error("Email is already verified");
    }
    
    await sendEmailVerification(user);
    console.log("[useAuth] Verification email resent to:", user.email);
  }

  const value: AuthContextValue = {
    user,
    loading,
    login,
    signup,
    logout,
    resendVerificationEmail,
    mcqAnswersData,
    loadingMcqData,
    userData,
    loadingUserData,
    lastSelectedPracticeUnits,
    setLastSelectedPracticeUnits,
    globalLevel,
    globalProgress,
    totalXP,
    correctStreak,
    setCorrectStreak,
    isNextQuestionDoubleXp,
    setIsNextQuestionDoubleXp,
    unitPerformanceStats,
    loadingUnitPerformance,
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal,
    selectedSubject,
    setSelectedSubject,
    toggleSubject,
    guestXp,
    awardXp,
    xpToast,
    redirectOnLogin,
    setRedirectOnLogin,
    isCharacterClosetOpen,
    setIsCharacterClosetOpen,
  };

  return value;
} 