'use client'
import { useState, useEffect, useRef } from 'react'
import { 
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp, collection, query, getDocs, onSnapshot, getDoc, where } from 'firebase/firestore'
import { UnitDetails } from '@/components/UnitPerformanceDisplay'

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
  totalXP?: number;
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

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthContextValue>;
  signup: (email: string, password: string) => Promise<AuthContextValue>;
  logout: () => Promise<void>;
  mcqAnswersData: McqAnswer[] | null;
  loadingMcqData: boolean;
  unitXPData: UnitXPData[] | null;
  loadingUnitXPData: boolean;
  userData: UserData | null;
  loadingUserData: boolean;
  lastSelectedPracticeUnits: LastSelectedUnits | null;
  setLastSelectedPracticeUnits: (subject: 'macro' | 'micro', unitIds: number[]) => void;
  globalLevel: number;
  globalProgress: number;
  totalXP: number;
  correctStreak: number;
  setCorrectStreak: (streak: number) => void;
  isNextQuestionDoubleXp: boolean;
  setIsNextQuestionDoubleXp: (isNext: boolean) => void;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // --- State for MCQ Answers ---
  const [mcqAnswersData, setMcqAnswersData] = useState<McqAnswer[]>([]);
  const [loadingMcqData, setLoadingMcqData] = useState(true); // Start true

  // Add state for unit XP data
  const [unitXPData, setUnitXPData] = useState<UnitXPData[] | null>(null);
  const [loadingUnitXPData, setLoadingUnitXPData] = useState(true);

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

  // --- Refs for unsubscribers ---
  const unsubscribeAnswersRef = useRef<(() => void) | null>(null);
  const unsubscribeXPRef = useRef<(() => void) | null>(null);

  // --- ADD Setter function for last selected practice units ---
  const setLastSelectedPracticeUnits = (subject: 'macro' | 'micro', unitIds: number[]) => {
      _setLastSelectedPracticeUnits(prev => ({
          ...(prev || {}),
          [subject]: unitIds
      }));
      console.log(`[useAuth] Updated last selected units for ${subject}:`, unitIds);
  };

  // --- Effect to Calculate Total XP and Level/Progress --- 
  useEffect(() => {
    if (unitXPData) {
      const currentTotalXP = unitXPData.reduce((sum, unit) => sum + (unit.totalXP || 0), 0);
      setTotalXP(currentTotalXP);
      const levelInfo = calculateLevelAndProgress(currentTotalXP);
      setGlobalLevel(levelInfo.level);
      setGlobalProgress(levelInfo.progress);
      console.log(`[useAuth] Total XP: ${currentTotalXP}, Level: ${levelInfo.level}, Progress: ${levelInfo.progress}%`);
    } else {
        // Reset if no XP data (e.g., logged out or error)
        setTotalXP(0);
        setGlobalLevel(1);
        setGlobalProgress(0);
    }
  }, [unitXPData]); // Re-run whenever unitXPData changes

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
      if (unsubscribeXPRef.current) {
          unsubscribeXPRef.current();
          unsubscribeXPRef.current = null;
          console.log("[useAuth] Cleaned up previous XP listener.");
      }

      if (firebaseUser) {
        console.log("[useAuth] User logged in. Setting loading states to true."); // Log state setting
        setLoadingMcqData(true);
        setLoadingUnitXPData(true); // <-- Set TRUE here
        setLoadingUserData(true);

        // --- Fetch User Document Data (including new fields) --- 
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        console.log("[useAuth] Setting up user document listener for:", firebaseUser.uid);
        const unsubscribeUser = onSnapshot(userDocRef, async (userDocSnap) => {
            console.log("[useAuth] User document snapshot received. Exists:", userDocSnap.exists());
            if (userDocSnap.exists()) {
                // Document exists - proceed as normal
                const fetchedUserData = userDocSnap.data() as UserData;
                setUserData(fetchedUserData);
                console.log("[useAuth] User document data updated:", fetchedUserData);

                // --- Fetch Unit XP Data (can now depend on fetched userData) --- 
                const selectedSubject = fetchedUserData.selectedSubject;
                console.log("[useAuth] User selected subject:", selectedSubject); // Log selected subject
                
                if (selectedSubject && !unsubscribeXPRef.current) { 
                    console.log("[useAuth] Setting up XP listener for subject:", selectedSubject);
                    const xpColRef = collection(db, 'users', firebaseUser.uid, 'unitXP');
                    const xpQuery = query(xpColRef, where("subject", "==", selectedSubject));
                    unsubscribeXPRef.current = onSnapshot(xpQuery, (snapshot) => {
                        console.log("[useAuth] XP snapshot received. Size:", snapshot.size); // Log XP snapshot
                        const xpData = snapshot.docs.map(doc => ({
                            unitId: parseInt(doc.id, 10), // Use doc ID as unitId
                            ...doc.data()
                         } as UnitXPData));
                         // Sort by unitId for consistency
                        xpData.sort((a, b) => a.unitId - b.unitId);
                        setUnitXPData(xpData);
                        console.log("[useAuth] Setting loadingUnitXPData to FALSE (XP data received)."); // Log state update
                        setLoadingUnitXPData(false); // <-- Set FALSE on success
                    }, (error) => {
                        console.error("[useAuth] Error fetching Unit XP data:", error);
                        setUnitXPData([]);
                        console.log("[useAuth] Setting loadingUnitXPData to FALSE (XP fetch error)."); // Log state update
                        setLoadingUnitXPData(false); // <-- Set FALSE on error
                    });
                } else if (!selectedSubject) {
                    console.log("[useAuth] User has no selected subject, clearing XP data.");
                    setUnitXPData([]);
                    console.log("[useAuth] Setting loadingUnitXPData to FALSE (no selected subject)."); // Log state update
                    setLoadingUnitXPData(false); // <-- Set FALSE if no subject
                } else if (unsubscribeXPRef.current) {
                     console.log("[useAuth] XP listener already exists for subject:", selectedSubject); // Log if listener already exists
                     // If the listener already exists, the loading state should already be false or handled by the existing listener.
                     // We might not need to explicitly set it to false here unless there's a specific edge case.
                }
            } else {
                // --- Document MISSING - Create it! ---
                console.warn("[useAuth] User document does not exist. Creating default document for user:", firebaseUser.uid);
                try {
                    const defaultUserData = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email || '', // Get from auth user
                        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User', // Get from auth user or derive
                        createdAt: serverTimestamp(),
                        // Set flags to false to trigger setup flow
                        hasCompletedSubjectSelection: false,
                        hasCompletedInitialUnitSelection: false,
                        initialPracticeUnitIds: [],
                        hasCompletedQuizTutorial: false // Add any other necessary default fields
                    };
                    await setDoc(userDocRef, defaultUserData); // Create the document
                    console.log("[useAuth] Default user document created successfully.");
                    // Set state based on the *newly created* default data
                    // Or set to null to force re-check? Let's try setting default data:
                    setUserData(defaultUserData as UserData);
                    // Still need to clear/set XP data based on this default state (likely no subject yet)
                    setUnitXPData([]);
                    setLoadingUnitXPData(false);
                } catch (createError) {
                    console.error("[useAuth] CRITICAL: Failed to create missing user document:", createError);
                    // If creation fails, we have a bigger problem. Set userData to null.
                    setUserData(null);
                    setUnitXPData([]);
                    setLoadingUnitXPData(false);
                }
                // --- End Document Creation ---
            }
            // Set loading false AFTER processing snapshot (or creating doc)
            console.log("[useAuth] Setting loadingUserData to FALSE.");
            setLoadingUserData(false);
        }, (error) => {
            console.error("[useAuth] Error listening to user document:", error);
            setUserData(null);
            setLoadingUserData(false);
            setUnitXPData([]); // Clear XP on error
            console.log("[useAuth] Setting loadingUnitXPData to FALSE (user doc listener error)."); // Log state update
            setLoadingUnitXPData(false); // <-- Set FALSE on error
        });

        // Fetch MCQ Answers (existing listener setup)
        const answersColRef = collection(db, 'users', firebaseUser.uid, 'mcqAnswers');
        console.log("[useAuth] Setting up answers listener for:", firebaseUser.uid); // Log answers listener setup
        unsubscribeAnswersRef.current = onSnapshot(answersColRef, (snapshot) => {
            console.log(`[useAuth] Answers snapshot received (size: ${snapshot.size})`);
            const answers: McqAnswer[] = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
               // Basic check - adjust if needed
              if (typeof data.unitId === 'number' && typeof data.isCorrect === 'boolean') {
                 answers.push({ id: doc.id, ...data } as McqAnswer);
              } else {
                 console.warn(`[useAuth] Listener skipping malformed answer doc: ${doc.id}`, data);
              }
            });
            setMcqAnswersData(answers);
            console.log("[useAuth] Setting loadingMcqData to FALSE."); // Log mcq data load completion
            setLoadingMcqData(false);
        }, (error) => {
           console.error("[useAuth] Error listening to MCQ answers:", error);
           setMcqAnswersData([]);
           console.log("[useAuth] Setting loadingMcqData to FALSE (answers listener error)."); // Log mcq data error
           setLoadingMcqData(false);
        });

        // Modify cleanup to include user listener
        return () => {
          console.log("[useAuth] Cleaning up listeners for user:", firebaseUser.uid);
          unsubscribeUser(); // Unsubscribe from user doc listener
          if (unsubscribeAnswersRef.current) {
            unsubscribeAnswersRef.current();
            unsubscribeAnswersRef.current = null; 
          }
          if (unsubscribeXPRef.current) {
            unsubscribeXPRef.current();
            unsubscribeXPRef.current = null;
          }
        };
      } else {
        // User logged out - clear all user-specific state
        console.log("[useAuth] User logged out. Clearing states and resetting loading flags."); // Log logout
        setUserData(null);
        setMcqAnswersData([]);
        setUnitXPData(null);
        _setLastSelectedPracticeUnits(null); // Clear last selected units on logout
        setLoadingUserData(true); // Still set true initially until confirmed no user data needed
        setLoadingMcqData(true);  // Still set true initially until confirmed no answers needed
        setLoadingUnitXPData(false); // <-- Set FALSE: No XP to load if no user
      }
    });

    // Cleanup auth listener on hook unmount
    return () => {
      console.log("[useAuth] Cleaning up auth listener.");
      unsubscribeAuth();
    };
  }, []);

  const signup = async (email: string, password: string): Promise<AuthContextValue> => {
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
          hasCompletedQuizTutorial: false
        });
        setUser(newUser);
        console.log("User created and initial document saved.");
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
        mcqAnswersData: mcqAnswersData, 
        loadingMcqData: loadingMcqData, 
        unitXPData: unitXPData, 
        loadingUnitXPData: loadingUnitXPData, 
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
        setIsNextQuestionDoubleXp: setIsNextQuestionDoubleXp 
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // User state will be updated by the onAuthStateChanged listener
        setLoading(false);
        // Return the current context state after login attempt (listener will update user)
        return { 
          user: auth.currentUser, 
          loading: false, 
          login, 
          signup, 
          logout, 
          mcqAnswersData: mcqAnswersData, 
          loadingMcqData: loadingMcqData, 
          unitXPData: unitXPData, 
          loadingUnitXPData: loadingUnitXPData, 
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
          setIsNextQuestionDoubleXp: setIsNextQuestionDoubleXp 
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

  const value: AuthContextValue = {
    user,
    loading,
    login,
    signup,
    logout,
    mcqAnswersData,
    loadingMcqData,
    unitXPData,
    loadingUnitXPData,
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
    setIsNextQuestionDoubleXp
  };

  return value;
} 