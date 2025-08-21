import { keyTerms as apMacroTerms } from './apMacroTerms';

type Flashcard = {
  term: string;
  definition: string;
}

type MacroFlashcards = {
  [key: string]: Flashcard[];
}

// Transform apMacroTerms into the flashcard format
const transformApMacroTermsToFlashcards = (): MacroFlashcards => {
  const flashcards: MacroFlashcards = {};
  
  apMacroTerms.forEach((term) => {
    // Only include macroeconomics terms
    if (term.subject === 'ap_macroeconomics') {
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

export const macroFlashcards: MacroFlashcards = transformApMacroTermsToFlashcards(); 