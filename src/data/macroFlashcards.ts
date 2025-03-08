type Flashcard = {
  term: string;
  definition: string;
}

type MacroFlashcards = {
  [key: string]: Flashcard[];
}

export const macroFlashcards: MacroFlashcards = {
  'Unit 1: Basic Economic Concepts': [
    {
      term: 'Scarcity',
      definition: 'The fundamental economic problem that exists because there are limited resources and unlimited wants'
    },
    {
      term: 'Opportunity Cost',
      definition: 'The next best alternative that must be given up when making a choice'
    }
  ],
  'Unit 2: Economic Indicators and the Business Cycle': [
    {
      term: 'GDP (Gross Domestic Product)',
      definition: 'The total market value of all final goods and services produced within a country in a given year'
    },
    {
      term: 'CPI (Consumer Price Index)',
      definition: 'A measure of the average change over time in the prices paid by urban consumers for a market basket of consumer goods and services'
    }
  ]
}; 