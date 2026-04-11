export type SeasonPassPurchaseType = 'macro' | 'micro' | 'bundle';

export const COURSE_CONFIG: Record<
  SeasonPassPurchaseType,
  {
    badge: string;
    headline: string;
    subheadline: string;
    price: number;
    originalPrice: number;
    accentColor: string;
    accentBg: string;
    features: string[];
  }
> = {
  macro: {
    badge: 'AP MACRO SEASON PASS',
    headline: 'The Complete AP Macro Toolkit for a 5.',
    subheadline: 'Everything you need to ace AP Macroeconomics — in one place.',
    price: 29,
    originalPrice: 39,
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-600',
    features: [
      'Full Practice Exams (2026 AP Macro CED)',
      'Endless AP-Style MCQ Bank',
      'AI-Graded FRQs with Graphing Help',
      'Interactive Graphing Simulators',
      'Cheat Sheets + Downloadable PDFs',
      'Upload Notes to Create Quizzes',
    ],
  },
  micro: {
    badge: 'AP MICRO SEASON PASS',
    headline: 'The Complete AP Micro Toolkit for a 5.',
    subheadline: 'Everything you need to ace AP Microeconomics — in one place.',
    price: 29,
    originalPrice: 39,
    accentColor: 'text-green-600',
    accentBg: 'bg-green-600',
    features: [
      'Full Practice Exams (2026 AP Micro CED)',
      'Endless AP-Style MCQ Bank',
      'AI-Graded FRQs with Graphing Help',
      'Interactive Graphing Simulators',
      'Cheat Sheets + Downloadable PDFs',
      'Upload Notes to Create Quizzes',
    ],
  },
  bundle: {
    badge: 'MACRO + MICRO BUNDLE',
    headline: 'Both AP Econ Exams. One Price.',
    subheadline: 'The complete toolkit for AP Macro and AP Micro together.',
    price: 49,
    originalPrice: 58,
    accentColor: 'text-blue-600',
    accentBg: 'bg-blue-600',
    features: [
      'Full Practice Exams for Macro + Micro',
      'Endless AP-Style MCQ Bank (Both)',
      'AI-Graded FRQs with Graphing Help',
      'Interactive Graphing Simulators',
      'Cheat Sheets + Downloadable PDFs',
      'Upload Notes to Create Quizzes',
    ],
  },
};
