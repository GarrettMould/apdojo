import { Question as QuestionType } from '@/data/questionBanks/types';
import { getUnitTestQuestions } from './unitTestQuestions';

// Function to get unit test questions for each unit
// Using dedicated unit test questions to ensure uniqueness
const getUnitTestQuestionsForUnit = (
  unitNumber: number,
  subject?: 'ap_macroeconomics' | 'ap_microeconomics'
): QuestionType[] => {
  return getUnitTestQuestions(unitNumber, subject);
};

// Unit 1: Basic Economic Concepts
export const unit1MCQTest: QuestionType[] = getUnitTestQuestionsForUnit(1);

// Unit 2: Economic Indicators and the Business Cycle
export const unit2MCQTest: QuestionType[] = getUnitTestQuestionsForUnit(2);

// Unit 3: National Income and Price Determination
export const unit3MCQTest: QuestionType[] = getUnitTestQuestionsForUnit(3);

// Unit 4: Financial Sector
export const unit4MCQTest: QuestionType[] = getUnitTestQuestionsForUnit(4);

// Unit 5: Long-Run Consequences of Stabilization Policies
export const unit5MCQTest: QuestionType[] = getUnitTestQuestionsForUnit(5);

// Unit 6: Open Economy—International Trade and Finance
export const unit6MCQTest: QuestionType[] = getUnitTestQuestionsForUnit(6);

// Helper function to get test for any unit
// Optionally filter by subject to ensure macro and micro questions don't mix
export const getUnitMCQTest = (
  unitNumber: number,
  subject?: 'ap_macroeconomics' | 'ap_microeconomics'
): QuestionType[] => {
  // If subject is provided, filter directly from the source
  if (subject) {
    return getUnitTestQuestions(unitNumber, subject);
  }
  
  // Otherwise, return the pre-computed arrays (for backward compatibility)
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