// Blog Post Data Structure for Graph Explanation Posts
export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3 for A-D)
  explanation: string;
}

export interface GraphGymChallenge {
  scenarioId: number; // ID from graphGymScenarios
  prompt: string; // e.g., "The Government increases deficit spending. Draw the shift."
  link: string; // Link to the Graph Gym tool
}

export interface WhiteboardImage {
  imageUrl: string;
  title: string;
  alt: string;
}

export interface RelatedTopic {
  slug: string;
  title: string;
}

export interface ActivePredictionQuiz {
  id: string; // e.g., "monetary-policy-quiz" - matches QUIZ_CONFIGS in ActivePredictionLoader
}

export interface CTAButton {
  text: string;
  link: string;
  description?: string; // Optional description text below the button
}

export interface GraphExplanationPost {
  slug: string;
  headline: string; // H1 Title: [Topic Name] Graph Explained - AP Macroeconomics
  intro: string; // First chunk of text (introduction paragraph)
  subject: 'macro' | 'micro';
  content?: string; // Full narrative content (rest of the text, can include HTML/markdown)
  visual: WhiteboardImage; // Clean, labeled image of the standard graph (first image in gallery)
  keyDeterminants?: string[]; // Optional: Bulleted list (e.g., "What shifts Supply of Loanable Funds?")
  graphGymChallenge?: GraphGymChallenge; // Interactive element
  mcqQuestions: MCQQuestion[]; // 2 MCQs with immediate feedback
  relatedTopics: RelatedTopic[]; // Links to other blog posts
  
  // Optional interactive sections from old blog format
  videoUrl?: string | null; // Video at the start of the post
  activePrediction?: ActivePredictionQuiz; // ActivePrediction interactive component
  draggableGraph?: boolean; // Show DraggableGraph component
  practiceQuestionId?: number; // For BlogComprehensionCheck component (from unitPracticeProblems)
  additionalImages?: Array<{ url: string; alt: string; title?: string }>; // Additional images in content
  ctaSection?: {
    title: string;
    description: string;
    button: CTAButton;
  }; // CTA section at the end
}

