// Import the macroSetTwoQuestions from the macroSetTwo.ts file
import { macroSetTwoQuestions } from '../questionBanks/macro/mcqs/macroSetTwo';

// Create arrays for each unit
const unit1Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 1);
const unit2Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 2);
const unit3Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 3);
const unit4Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 4);
const unit5Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 5);
const unit6Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 6);

// Export the arrays if needed
export {
  unit1Questions,
  unit2Questions,
  unit3Questions,
  unit4Questions,
  unit5Questions,
  unit6Questions
};
