import { keyTerms as apMicroTerms } from './apMicroTerms';

type Flashcard = {
    term: string;
    definition: string;
  }
  
  type MicroFlashcards = {
    [key: string]: Flashcard[];
  }
  
// Transform apMicroTerms into the flashcard format
const transformApMicroTermsToFlashcards = (): MicroFlashcards => {
  const flashcards: MicroFlashcards = {};
  
  apMicroTerms.forEach((term) => {
    // Only include microeconomics terms
    if (term.subject === 'ap_microeconomics') {
      const unitKey = `Unit ${term.unit}`;
      
      if (!flashcards[unitKey]) {
        flashcards[unitKey] = [];
      }
      
      // Combine definition with subNotes if they exist
      let backContent = term.definition;
      if (term.subNotes && term.subNotes.length > 0) {
        backContent += '\n\n' + term.subNotes.join('\n');
      }
      
      flashcards[unitKey].push({
        term: term.term,
        definition: backContent
      });
    }
  });
  
  return flashcards;
};

export const microFlashcards: MicroFlashcards = transformApMicroTermsToFlashcards(); 