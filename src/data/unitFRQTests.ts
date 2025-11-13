import { StaticImageData } from 'next/image';

// FRQ Question Types for Unit Tests
export interface FRQSubPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: StaticImageData | string;
}

export interface FRQPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text' | null;
  answer?: StaticImageData | string;
  subparts?: FRQSubPart[];
}

export interface FRQQuestion {
  questionNumber: number;
  prompt: string;
  image?: StaticImageData | { src: string; alt: string } | null;
  parts: FRQPart[];
  unit: number;
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
  unitName: string;
}

export interface UnitFRQTest {
  examTitle: string;
  questions: FRQQuestion[];
}

// Import existing FRQ images for Unit 1
import macroSetOneFRQ2 from '../../public/images/macroSetOneFRQ2.png';
import macroSetOneFRQA1A from '../../public/images/macroSetOneFRQA1A.png';
import macroSetOneFRQA1E from '../../public/images/macroSetOneFRQA1E.png';

// Unit 1 FRQ Test Questions (using existing FRQs as placeholders)
export const unit1FRQTest: UnitFRQTest = {
  examTitle: "Unit 1: Basic Economic Concepts FRQ Test",
  questions: [
    {
      questionNumber: 1,
      prompt: "Assume that Japan is in a recession and the government has a balanced budget.",
      image: null,
      unit: 1,
      subject: 'ap_macroeconomics',
      unitName: 'Basic Economic Concepts',
      parts: [
        {
          label: "A",
          text: "Draw a single correctly labeled AD-AS graph for Japan and label the current equilibrium output as Y* and the current price level PL*",
          answerType: "draw",
          answer: macroSetOneFRQA1A,
          subparts: [
            {
              label: "i",
              text: "Is the actual unemployment rate in Japan higher than, lower than, or equal to the natural rate of unemployment?", 
              answerType: "text",
              answer: "The actual unemployment rate in Japan is higher than the natural rate of unemployment.",
            },
            {
              label: "ii",
              text: "If no discretionary fiscal policy action is taken, will the government budget remain balanced, move into surplus, or move into deficit? Explain.",
              answerType: "text",
              answer: "The government budget will move into deficit. Even without any discretionary fiscal policy action, automatic stabilizers will cause the government budget to move into deficit. These automatic stabilizers include increased spending on unemployment benefits and other social programs, as well as decreased tax revenue due to lower income levels.",
            }
          ]
        },
        {
          label: "B",
          text: "Assume the banking system has ample reserves. Identify one monetary policy action that the central bank could use to close the output gap.",
          answerType: "text",
          answer: "Potential answers include: lowering the policy rate, lowering the interest on reserves rate, or engaging in open market operations to purchase government bonds.",
        },
        {
          label: "C",
          text: "What impact will the monetary policy action in part B) have on the nominal interest rate in the country?",
          answerType: "text",
          answer: "The nominal interest rate will decrease.",
        }
      ]
    },
    {
      questionNumber: 2,
      prompt: "The data provided in the tables below are from two countries, Omegaland and Deltaville.",
      image: macroSetOneFRQ2,
      unit: 1,
      subject: 'ap_macroeconomics',
      unitName: 'Basic Economic Concepts',
      parts: [
        {
          label: "A",
          text: "Calculate each of the following for Year 2. Show your work.", 
          answerType: null,
          subparts: [
            {
              label: "i",
              text: "Real GDP for Omegaland",
              answerType: "text",
              answer: "$1,200. Explanation: Real GDP = (nominal GDP / GDP deflator) * 100.",
            },
            {
              label: "ii",
              text: "Real GDP for Deltaville",
              answerType: "text",
              answer: "$2,095. Explanation: Real GDP = (nominal GDP / GDP deflator) * 100.",
            }
          ]
        },
        {
          label: "B",
          text: "Calculate each of the following for Year 2. Show your work.",
          answerType: null,
          subparts: [
            {
              label: "i",
              text: "The inflation rate in Omegaland",
              answerType: "text",
              answer: "10%. Explanation: Inflation rate = ((GDP deflator in Year 2 - GDP deflator in Year 1) / GDP deflator in Year 1) * 100.",
            },
            {
              label: "ii",
              text: "The inflation rate in Deltaville",
              answerType: "text",
              answer: "5%. Explanation: Inflation rate = ((GDP deflator in Year 2 - GDP deflator in Year 1) / GDP deflator in Year 1) * 100.",
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to get unit FRQ test for a specific unit
export const getUnitFRQTest = (unitNumber: number): UnitFRQTest | null => {
  switch (unitNumber) {
    case 1:
      return unit1FRQTest;
    default:
      return null; // Only Unit 1 is available for now
  }
};

// Export all unit FRQ tests for easy access
export const allUnitFRQTests = {
  1: unit1FRQTest,
};
