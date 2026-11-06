/**
 * AP Stats Full MCQ Exam 1, in exam order (grouped by unit, shared stimuli kept together).
 * Built to `examStimulusPolicy`: at most 2 questions per graph or table, at most 1 per picture-option set.
 * Exam questions must not also appear in practice; `statsStimulusMcqPractice.ts` filters these out.
 *
 * 40 questions, close to the real Section I mix: ~55% text-only scenario and inference items
 * (`statsFullMcqExamText.ts`), with the rest on graphs, tables and computer output.
 */
export const STATS_FULL_MCQ_EXAM_1_IDS: readonly number[] = [
  // Unit 1
  9522, 9547, 9601, 9534, 9801, 9802, 9803, 9804, 9820,
  // Unit 2
  9526, 9525, 9549, 9714, 9805, 9806, 9807, 9808, 9822,
  // Unit 3
  9528, 9529, 9809, 9810, 9811, 9812, 9813, 9817, 9818,
  // Unit 4
  9532, 9535, 9537, 9814, 9815, 9816, 9819,
  // Unit 5
  9541, 9542, 9544, 9538, 9701, 9821,
];
