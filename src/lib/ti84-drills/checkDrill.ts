import type { CalcState } from '@/lib/ti84-simulator';
import type { CalculatorDrill, DrillCheckResult, ResultKey } from './types';

/** Pull a labeled value like `p=0.12` or a bare numeric result line. */
export function extractResultValue(state: CalcState, key: ResultKey): number | null {
  const lines = state.screenLines.map((l) => l.text.trim()).filter(Boolean);

  if (key === 'value') {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].replace(/−/g, '-').trim();
      // TInterval-style "(lower, upper)" — grade the lower bound
      const interval = line.match(/^\(\s*([^,]+)\s*,\s*([^)]+)\s*\)$/);
      if (interval) {
        const lo = parseFloat(interval[1]);
        if (!Number.isNaN(lo)) return lo;
      }
      // Skip labeled stats like "p=…" / "z=…" (those use other ResultKeys)
      if (/^[a-zA-Zχâ̄₂₁̂²]/.test(line) && line.includes('=')) continue;
      // Bare number, or legacy "=0.8925" from older DISTR formatting
      const numeric = line.replace(/^=/, '').trim();
      const n = parseFloat(numeric);
      if (!Number.isNaN(n) && /^-?\d/.test(numeric)) return n;
    }
    return null;
  }

  const aliases: Record<string, string[]> = {
    p: ['p'],
    z: ['z'],
    t: ['t'],
    df: ['df'],
    'p̂': ['p̂', 'phat', 'p-hat'],
    'x̄': ['x̄', 'xbar'],
    Sx: ['Sx', 'sx'],
    n: ['n'],
    a: ['a'],
    b: ['b'],
    r: ['r'],
    'r²': ['r²', 'r^2', 'r2'],
  };

  const names = aliases[key] ?? [key];
  for (const line of lines) {
    for (const name of names) {
      const re = new RegExp(`^${escapeRegExp(name)}\\s*=\\s*(.+)$`, 'i');
      const m = line.match(re);
      if (m) {
        const n = parseFloat(m[1].replace(/−/g, '-'));
        if (!Number.isNaN(n)) return n;
      }
    }
  }
  return null;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function nearlyEqual(a: number, b: number, tol: number): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= tol;
}

function softInputFeedback(drill: CalculatorDrill, state: CalcState): string | null {
  if (!drill.expectedInputs || state.routine !== drill.targetRoutine) return null;
  const mismatches: string[] = [];
  for (const [key, expected] of Object.entries(drill.expectedInputs)) {
    const got = state.inputValues[key];
    if (got === undefined) continue;
    const expN = parseFloat(expected);
    const gotN = parseFloat(got);
    if (!Number.isNaN(expN) && !Number.isNaN(gotN)) {
      if (!nearlyEqual(gotN, expN, 1e-6)) mismatches.push(key);
    } else if (got.trim() !== expected.trim()) {
      mismatches.push(key);
    }
  }
  if (mismatches.length === 0) return null;
  return `Right function — check these inputs: ${mismatches.join(', ')}.`;
}

export function checkDrill(drill: CalculatorDrill, state: CalcState): DrillCheckResult {
  const onTargetRoutine =
    state.routine === drill.targetRoutine &&
    (state.mode === 'input' || state.mode === 'result');

  if (drill.goal === 'locate') {
    if (onTargetRoutine) {
      return {
        status: 'correct',
        message: `Nice — you're in ${drill.targetRoutine}.`,
      };
    }
    if (state.mode === 'distr-menu' || state.mode === 'stat-tests-menu' || state.mode === 'stat-calc-menu') {
      return {
        status: 'incorrect',
        message: 'Right neighborhood — highlight the correct option, then press enter.',
      };
    }
    return {
      status: 'incorrect',
      message: 'Not there yet. Use the hint if you need the starting key.',
    };
  }

  // produce
  if (state.mode !== 'result') {
    if (onTargetRoutine && state.mode === 'input') {
      return {
        status: 'incorrect',
        message: 'Good — you found the function. Fill the fields and Calculate.',
      };
    }
    return {
      status: 'incorrect',
      message: 'Run the full calculator path until you see a result screen.',
    };
  }

  if (state.routine !== drill.targetRoutine) {
    return {
      status: 'incorrect',
      message: `You ran ${state.routine ?? 'a different routine'}, but this drill needs ${drill.targetRoutine}.`,
    };
  }

  const soft = softInputFeedback(drill, state);
  const key = drill.resultKey ?? 'value';
  const got = extractResultValue(state, key);
  const expected = drill.expected;
  const tol = drill.tolerance ?? 1e-3;

  if (expected === undefined) {
    return { status: 'correct', message: 'Result screen looks good.' };
  }

  if (got === null) {
    return {
      status: 'incorrect',
      message: soft ?? `Couldn't read ${key} from the screen. Try Calculate again.`,
    };
  }

  if (nearlyEqual(got, expected, tol)) {
    return { status: 'correct', message: 'Correct — that matches the expected result.' };
  }

  return {
    status: 'incorrect',
    message: soft ?? `Got ${got}, but looking for about ${expected}. Check your inputs.`,
  };
}
