import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export interface TestPerformance {
  userId: string;
  examType: 'macro' | 'micro';
  examNumber: string;
  timestamp: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  unitPerformance: {
    [unitNumber: string]: {
      total: number;
      correct: number;
      percentage: number;
    }
  };
  questionDetails: {
    [questionId: string]: {
      userAnswer: string;
      isCorrect: boolean;
      timeSpent: number;
      unitNumber: number;
    }
  };
}

export const testPerformanceService = {
  // Save a new test performance record
  async saveTestPerformance(performance: TestPerformance): Promise<void> {
    try {
      const performanceRef = doc(collection(db, 'testPerformances'));
      await setDoc(performanceRef, {
        ...performance,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving test performance:', error);
      throw error;
    }
  },

  // Get all test performances for a user
  async getUserTestPerformances(userId: string): Promise<TestPerformance[]> {
    try {
      const q = query(
        collection(db, 'testPerformances'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as TestPerformance);
    } catch (error) {
      console.error('Error getting user test performances:', error);
      throw error;
    }
  },

  // Get user's performance for a specific exam type
  async getUserExamTypePerformances(userId: string, examType: 'macro' | 'micro'): Promise<TestPerformance[]> {
    try {
      const q = query(
        collection(db, 'testPerformances'),
        where('userId', '==', userId),
        where('examType', '==', examType),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as TestPerformance);
    } catch (error) {
      console.error('Error getting user exam type performances:', error);
      throw error;
    }
  },

  // Get user's performance analytics
  async getUserPerformanceAnalytics(userId: string) {
    try {
      const performances = await this.getUserTestPerformances(userId);
      
      return {
        totalExamsTaken: performances.length,
        averageScore: performances.reduce((acc, curr) => 
          acc + (curr.correctAnswers / curr.totalQuestions), 0) / performances.length,
        byUnit: this.aggregateUnitPerformance(performances),
        recentPerformances: performances.slice(0, 5), // Last 5 performances
      };
    } catch (error) {
      console.error('Error getting user performance analytics:', error);
      throw error;
    }
  },

  // Helper function to aggregate unit performance
  aggregateUnitPerformance(performances: TestPerformance[]) {
    const unitStats: {
      [unit: string]: {
        total: number;
        correct: number;
        attempts: number;
      }
    } = {};

    performances.forEach(performance => {
      Object.entries(performance.unitPerformance).forEach(([unit, stats]) => {
        if (!unitStats[unit]) {
          unitStats[unit] = { total: 0, correct: 0, attempts: 0 };
        }
        unitStats[unit].total += stats.total;
        unitStats[unit].correct += stats.correct;
        unitStats[unit].attempts += 1;
      });
    });

    return Object.entries(unitStats).map(([unit, stats]) => ({
      unit,
      averageScore: stats.correct / stats.total,
      totalAttempts: stats.attempts,
    }));
  }
}; 