import { Question as QuestionType } from '@/data/questionBanks/types';
import { allQuestions } from './unitPracticeProblems/unitPracticeProblems';

// Function to get 15 consistent questions for each unit
// Using a deterministic selection based on question IDs to ensure consistency
const getUnitTestQuestions = (unitNumber: number): QuestionType[] => {
  const unitQuestions = allQuestions.filter(q => q.unit === unitNumber);
  
  // Sort by ID to ensure consistent ordering
  const sortedQuestions = unitQuestions.sort((a, b) => a.id - b.id);
  
  // Select first 15 questions (or all if less than 15)
  return sortedQuestions.slice(0, 15);
};

// Unit 1: Basic Economic Concepts
export const unit1MCQTest: QuestionType[] = getUnitTestQuestions(1);

// Unit 2: Economic Indicators and the Business Cycle
export const unit2MCQTest: QuestionType[] = getUnitTestQuestions(2);

// Unit 3: National Income and Price Determination
export const unit3MCQTest: QuestionType[] = getUnitTestQuestions(3);

// Unit 4: Financial Sector
export const unit4MCQTest: QuestionType[] = getUnitTestQuestions(4);

// Unit 5: Long-Run Consequences of Stabilization Policies
export const unit5MCQTest: QuestionType[] = getUnitTestQuestions(5);

// Unit 6: Open Economy—International Trade and Finance
export const unit6MCQTest: QuestionType[] = getUnitTestQuestions(6);

// Helper function to get test for any unit
export const getUnitMCQTest = (unitNumber: number): QuestionType[] => {
  switch (unitNumber) {
    case 1:
      return unit1MCQTest;
    case 2:
      return unit2MCQTest;
    case 3:
      return unit3MCQTest;
    case 4:
      return unit4MCQTest;
    case 5:
      return unit5MCQTest;
    case 6:
      return unit6MCQTest;
    default:
      return [];
  }
};

// Export all unit tests for easy access
export const allUnitMCQTests = {
  1: unit1MCQTest,
  2: unit2MCQTest,
  3: unit3MCQTest,
  4: unit4MCQTest,
  5: unit5MCQTest,
  6: unit6MCQTest,
}; 