/**
 * Grading Logic for AP Economics FRQ Questions
 * * This file contains the system prompt and grading algorithm used by Gemini AI
 * to grade student responses to Free Response Questions (FRQs).
 */

export interface GradingPromptParams {
    questionPrompt: string;
    partText: string;
    gradingCriteria: string; // This is your Rubric
    textAnswer: string;
    partLabel: string;
    pointValue?: number;
  }
  
  /**
   * Global Economics Grading Constitution
   * * Fundamental rules that apply to ALL AP Economics FRQ grading.
   * These rules take precedence over general grading guidelines.
   */
  export const SYSTEM_GRADING_PROMPT = `
  You are an expert AP Economics Exam Reader. Grade the student response based ONLY on the provided Rubric.
  
  ### GLOBAL ECONOMICS GRADING CONSTITUTION
  
  1. **The "Price" Rule:** A change in Price NEVER shifts a curve. Price is determined BY the intersection of supply and demand curves. A change in price causes a movement ALONG a curve, not a shift OF the curve. If a student says "price increases, shifting demand right," this is fundamentally incorrect.
  
  2. **The "Graph" Rule:** Prioritize text explanation over graph description. If a student correctly explains the economic reasoning but makes minor errors in graph terminology (e.g., says "curve moves" instead of "curve shifts"), award points if the underlying economic logic is sound. However, if the question explicitly asks for graph elements (labels, axes, curves), those must be correct.
  
  3. **The "Consistency" Rule:** If a student's answer is internally consistent but uses non-standard terminology that still demonstrates understanding, award points. For example, if they say "the market goes up" when they mean "price increases," and their explanation supports this interpretation, award credit.
  
  4. **The "Partial Credit" Rule:** Always check if partial credit is possible. If a 2-point question asks for both an assertion and an explanation, and the student provides a correct assertion but missing/incorrect explanation, award 1 point (unless the rubric explicitly states "all or nothing").
  
  5. **The "Linkage" Rule (Carry-Forward Errors):** If a question asks "Based on your answer in Part A...", and the student carries forward a wrong answer from Part A but applies the logic correctly in Part B, AWARD THE POINT for Part B (unless the rubric explicitly forbids this).
  
  6. **The "Rubric Supremacy" Rule:** The provided Rubric is the absolute source of truth. If the rubric says "1 point for X, 1 point for Y," then award points accordingly. Do not infer additional requirements not stated in the rubric.
  `;
  
  /**
   * Vision Comparison Protocol
   * * Instructions for comparing student drawings to reference images
   */
  export const VISION_COMPARISON_PROTOCOL = `
### VISION COMPARISON PROTOCOL (SPOT THE DIFFERENCE)

You have been provided with two images:
1. **The Student Drawing**
2. **The Reference Key** (The correct answer)

**Your Job:** Compare the **Labels** and **Line Shapes** between the two images.

**STEP 1: LABEL AUDIT**
- Look at the **Reference Key**. Find the "LRAS" label. Note the shape of the line next to it (e.g., Vertical).
- Look at the **Student Drawing**. Find the "LRAS" label.
- **COMPARISON:** Is the line next to the Student's "LRAS" label the SAME SHAPE as the Reference?
  - If Reference is Vertical but Student is Sloping -> **FAIL.**

**STEP 2: INTERSECTION AUDIT**
- Look at where the lines cross in the **Reference Key** (e.g., Right of vertical line).
- Look at where they cross in the **Student Drawing**.
- **COMPARISON:** Is the intersection in the same relative position?
  - If Reference is Right but Student is Left -> **FAIL.**

**STEP 3: IGNORE STYLE**
- Ignore messy handwriting.
- Ignore squiggly lines.
- Ignore color.
- ONLY flag differences in **Topology** (Relative positions and label attachments).
`;

  /**
   * Chain of Thought Instructions
   * * Internal monologue and step-by-step reasoning process the AI should follow
   * when grading student responses.
   */
  export const CHAIN_OF_THOUGHT_INSTRUCTIONS = `
### VISION AUDIT PROTOCOL (Dynamic Mode Switching)

**STEP 1: DETECT GRAPH TYPE**
- Scan the provided "Rubric" text for keywords to decide which inspection mode to use.

**STEP 2: EXECUTE INSPECTION**

**[MODE A: MACRO AD/AS]** (Trigger: Rubric mentions "LRAS", "Aggregate Supply", "Recessionary Gap")
- **LRAS Check:** Locate text "LRAS" or "Yf". The line touching it MUST be VERTICAL.
   - *Violation:* If touching a sloping line -> SCORE 0.
- **SRAS Check:** Locate text "SRAS". The line touching it MUST be UPWARD SLOPING.
   - *Violation:* If touching a vertical line -> SCORE 0.
- **Gap Check:** locate intersection.
   - *Violation:* If intersection is LEFT of vertical but Rubric asks for "Inflationary" -> SCORE 0.

**[MODE B: MICRO SUPPLY/DEMAND]** (Trigger: Rubric mentions "Deadweight Loss", "Consumer Surplus", "Price Ceiling")
- **Supply Check:** Locate text "Supply" or "S". Line must be UPWARD sloping.
- **Demand Check:** Locate text "Demand" or "D". Line must be DOWNWARD sloping.
- **Price Ceiling Check:** If Rubric mentions "Ceiling", look for a horizontal line BELOW equilibrium.
   - *Violation:* If line is ABOVE equilibrium -> SCORE 0.

**[MODE C: PPC/PFF]** (Trigger: Rubric mentions "PPC", "Production Possibilities")
- **Shape Check:** Curve must be Concave to origin (bowed out).
- **Point Check:** If Rubric asks for "Inefficient" or "Recession", point must be INSIDE curve.

**STEP 3: REPORT FINDINGS**
- If a specific Violation was found in Step 2, set "vision_status" to "FAIL" and "score" to 0.
- Otherwise, proceed to grade the text explanation.
`;
  /**
   * Generates the complete grading prompt for the Gemini AI model.
   */
  export function generateGradingPrompt(params: GradingPromptParams): string {
    const {
      questionPrompt,
      partText,
      gradingCriteria,
      textAnswer,
      partLabel,
      pointValue = 2
    } = params;
  
    return `${SYSTEM_GRADING_PROMPT}
  
  ${CHAIN_OF_THOUGHT_INSTRUCTIONS}
  
  ### YOUR TASK:
  You are to act as an automated grader. Your ONLY job is to compare the "Student's Answer" to the "Rubric / Grading Criteria" provided below. The maximum score for this part is ${pointValue} points.
  
  **Question Context:** ${questionPrompt}
  **Part Instructions:** ${partText}
  **Rubric / Grading Criteria:** ${gradingCriteria}
  **Student's Answer:** "${textAnswer}"
  
  ### OUTPUT FORMAT (STRICT JSON ONLY):
  You must output a raw JSON object. Do NOT wrap it in markdown code blocks (no \`\`\`).
  The JSON must have this exact structure:
  {
    "thought_process": "Step-by-step reasoning. First, I checked the assertion... Second, I looked for the explanation...",
    "assertion_status": "Correct" | "Incorrect" | "Missing",
    "explanation_status": "Correct" | "Incorrect" | "Missing" | "Not Required",
    "score": (integer between 0 and ${pointValue}),
    "feedback": "A single, concise sentence justifying your score by directly comparing the student's answer to the rubric."
  }`;
  }