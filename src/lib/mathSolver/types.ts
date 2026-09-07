/** Structured math-solver solution returned by `/api/math-solver`. */

export type MathSolverStep = {
  title: string;
  explanation: string;
};

export type MathSolverPart = {
  /** e.g. "a", "b", "1", or "Main" for single-part problems */
  label: string;
  prompt: string;
  steps: MathSolverStep[];
  answer: string;
};

export type MathSolverProblem = {
  title: string;
  restatement: string;
  topic?: string;
  parts: MathSolverPart[];
};

export type MathSolverSolution = {
  kind: 'solution';
  /** Short note if the upload was unclear / needs clarification */
  note?: string;
  problems: MathSolverProblem[];
};

/** Generated practice set based on an uploaded worksheet / photo. */
export type MathSolverPractice = {
  kind: 'practice';
  note?: string;
  problems: MathSolverProblem[];
};

export type MathSolverChatReply = {
  kind: 'chat';
  message: string;
};

export type MathSolverResponse = MathSolverSolution | MathSolverPractice | MathSolverChatReply;

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function parseStep(raw: unknown): MathSolverStep | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const title = asString(o.title) || 'Step';
  const explanation = asString(o.explanation);
  if (!explanation) return null;
  return { title, explanation };
}

function parsePart(raw: unknown, index: number): MathSolverPart | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const stepsRaw = Array.isArray(o.steps) ? o.steps : [];
  const steps = stepsRaw.map(parseStep).filter((s): s is MathSolverStep => s != null);
  const answer = asString(o.answer);
  if (steps.length === 0 && !answer) return null;
  return {
    label: asString(o.label) || String.fromCharCode(97 + index),
    prompt: asString(o.prompt),
    steps,
    answer: answer || '—',
  };
}

function parseProblem(raw: unknown, index: number): MathSolverProblem | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const partsRaw = Array.isArray(o.parts) ? o.parts : [];
  const parts = partsRaw.map(parsePart).filter((p): p is MathSolverPart => p != null);
  if (parts.length === 0) return null;
  return {
    title: asString(o.title) || `Problem ${index + 1}`,
    restatement: asString(o.restatement),
    topic: asString(o.topic) || undefined,
    parts,
  };
}

/** Strip ```json fences if the model wraps the payload anyway. */
export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fence ? fence[1].trim() : trimmed;
  return JSON.parse(candidate);
}

export function parseMathSolverResponse(raw: unknown): MathSolverResponse | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const kind = asString(o.kind);

  if (kind === 'chat') {
    const message = asString(o.message);
    if (!message) return null;
    return { kind: 'chat', message };
  }

  const problemsRaw = Array.isArray(o.problems) ? o.problems : [];
  const problems = problemsRaw.map(parseProblem).filter((p): p is MathSolverProblem => p != null);

  if (kind === 'practice') {
    if (problems.length === 0) return null;
    return {
      kind: 'practice',
      note: asString(o.note) || undefined,
      problems,
    };
  }

  // Default / solution
  if (problems.length === 0) {
    const message = asString(o.message);
    if (message) return { kind: 'chat', message };
    return null;
  }

  return {
    kind: 'solution',
    note: asString(o.note) || undefined,
    problems,
  };
}

/** Flatten a structured solution into chat-history text for follow-up turns. */
export function solutionToHistoryText(solution: MathSolverSolution | MathSolverPractice): string {
  const chunks: string[] = [];
  if (solution.kind === 'practice') {
    chunks.push('Generated practice problems:');
  }
  if (solution.note) chunks.push(solution.note);
  for (const problem of solution.problems) {
    chunks.push(`## ${problem.title}`);
    if (problem.restatement) chunks.push(problem.restatement);
    if (problem.topic) chunks.push(`Topic: ${problem.topic}`);
    for (const part of problem.parts) {
      chunks.push(`### Part ${part.label}`);
      if (part.prompt) chunks.push(part.prompt);
      part.steps.forEach((step, i) => {
        chunks.push(`${i + 1}. ${step.title}: ${step.explanation}`);
      });
      chunks.push(`Answer: ${part.answer}`);
    }
  }
  return chunks.join('\n\n');
}
