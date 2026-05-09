export type ScotusGroundTruth = {
  clause: string;
  requiredFacts: string;
  bridgeLogic: string;
  applicationPrinciple: string;
};

export type ScotusPointKey = {
  pointA: string;
  pointBFacts: string;
  pointBBridge: string;
  pointC: string;
};

export type ScotusGradingKey = {
  promptId: string;
  groundTruth: ScotusGroundTruth;
  gradingRules: ScotusPointKey;
};

export const scotusGradingKeysByPromptId: Record<string, ScotusGradingKey> = {
  'mcculloch-v-maryland': {
    promptId: 'mcculloch-v-maryland',
    groundTruth: {
      clause: 'The Supremacy Clause (Article VI).',
      requiredFacts:
        "Maryland tried to tax the 2nd Bank of the U.S.; Marshall ruled states cannot tax federal tools ('Power to tax is power to destroy').",
      bridgeLogic:
        'In both cases, state laws were struck down because they interfered with valid federal authority/law.',
      applicationPrinciple:
        'Federalism: The division of power where federal law preempts state law in delegated areas.',
    },
    gradingRules: {
      pointA:
        "Award 1pt ONLY for 'Supremacy Clause'. Reject '10th Amendment' or 'Elastic Clause' unless Supremacy is correctly identified.",
      pointBFacts:
        'Award 1pt for correctly identifying that Maryland tried to tax the federal bank or that the Court ruled for McCulloch/the Bank.',
      pointBBridge:
        "Award 1pt ONLY if they use explicit bridge logic: just as Maryland could not interfere with the federal bank, Arizona could not interfere with federal immigration authority.",
      pointC:
        'Award 1pt for explaining that federalism allows the national government to override (preempt) state actions when they conflict with federal sovereignty.',
    },
  },
};

export function getScotusGradingKey(promptId: string): ScotusGradingKey | null {
  return scotusGradingKeysByPromptId[promptId] ?? null;
}
