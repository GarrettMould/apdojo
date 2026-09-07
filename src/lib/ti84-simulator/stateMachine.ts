/* ── TI-84 Plus Simulator — state machine ────────────────────── */

import type { CalcState, CalcAction, InputField, StatRoutine, ScreenLine } from './types';
import { INITIAL_STATE } from './types';
import {
  twoSampTTest, onePropZTest, twoPropZTest, tInterval, chiSquareGOF,
  normalcdf, invNorm, tcdf, invT,
  oneVarStats, linReg,
} from './ti84Math';
import type { TestResult } from './ti84Math';

// ─── Menu definitions ───────────────────────────────────────────

type MenuItem = { label: string; routine: StatRoutine };

const STAT_TESTS_MENU: MenuItem[] = [
  { label: '2:2-SampTTest…', routine: '2-SampTTest' },
  { label: '5:1-PropZTest…', routine: '1-PropZTest' },
  { label: '6:2-PropZTest…', routine: '2-PropZTest' },
  { label: '8:TInterval…', routine: 'TInterval' },
  { label: 'D:χ²GOF-Test…', routine: 'chi2-GOF' },
];

const DISTR_MENU: MenuItem[] = [
  { label: '2:normalcdf(', routine: 'normalcdf' },
  { label: '3:invNorm(', routine: 'invNorm' },
  { label: '5:tcdf(', routine: 'tcdf' },
  { label: '6:invT(', routine: 'invT' },
];

const STAT_CALC_MENU: MenuItem[] = [
  { label: '1:1-Var Stats', routine: '1-VarStats' },
  { label: '4:LinReg(a+bx)', routine: 'LinReg' },
];

// ─── Input field definitions per routine ────────────────────────

const ROUTINE_FIELDS: Record<StatRoutine, InputField[]> = {
  '2-SampTTest': [
    { label: 'x̄₁:', key: 'x1' },
    { label: 'Sx₁:', key: 's1' },
    { label: 'n₁:', key: 'n1' },
    { label: 'x̄₂:', key: 'x2' },
    { label: 'Sx₂:', key: 's2' },
    { label: 'n₂:', key: 'n2' },
  ],
  '1-PropZTest': [
    { label: 'p₀:', key: 'p0' },
    { label: 'x:', key: 'x' },
    { label: 'n:', key: 'n' },
  ],
  '2-PropZTest': [
    { label: 'x₁:', key: 'x1' },
    { label: 'n₁:', key: 'n1' },
    { label: 'x₂:', key: 'x2' },
    { label: 'n₂:', key: 'n2' },
  ],
  TInterval: [
    { label: 'x̄:', key: 'xbar' },
    { label: 'Sx:', key: 'sx' },
    { label: 'n:', key: 'n' },
    { label: 'C-Level:', key: 'cLevel', defaultValue: '.95' },
  ],
  'chi2-GOF': [
    { label: 'Observed(csv):', key: 'observed' },
    { label: 'Expected(csv):', key: 'expected' },
  ],
  normalcdf: [
    { label: 'lower:', key: 'lower', defaultValue: '-1E99' },
    { label: 'upper:', key: 'upper', defaultValue: '1E99' },
    { label: 'μ:', key: 'mu', defaultValue: '0' },
    { label: 'σ:', key: 'sigma', defaultValue: '1' },
  ],
  invNorm: [
    { label: 'area:', key: 'area' },
    { label: 'μ:', key: 'mu', defaultValue: '0' },
    { label: 'σ:', key: 'sigma', defaultValue: '1' },
  ],
  tcdf: [
    { label: 'lower:', key: 'lower' },
    { label: 'upper:', key: 'upper' },
    { label: 'df:', key: 'df' },
  ],
  invT: [
    { label: 'area:', key: 'area' },
    { label: 'df:', key: 'df' },
  ],
  '1-VarStats': [
    { label: 'List(csv):', key: 'data' },
  ],
  LinReg: [
    { label: 'Xlist(csv):', key: 'xData' },
    { label: 'Ylist(csv):', key: 'yData' },
  ],
};

// ─── Helpers ────────────────────────────────────────────────────

function menuScreen(title: string, items: MenuItem[], cursor: number): ScreenLine[] {
  return [
    { text: title },
    ...items.map((item, i) => ({
      text: item.label,
      selected: i === cursor,
    })),
  ];
}

function inputScreen(routine: StatRoutine, fields: InputField[], fieldIdx: number, values: Record<string, string>, buffer: string): ScreenLine[] {
  const lines: ScreenLine[] = [{ text: routineTitle(routine) }];
  for (let i = 0; i < fields.length; i++) {
    const val = i < fieldIdx ? values[fields[i].key] : i === fieldIdx ? buffer : (fields[i].defaultValue ?? '');
    lines.push({
      text: `${fields[i].label}${val}`,
      selected: i === fieldIdx,
    });
  }
  if (fieldIdx === fields.length) {
    lines.push({ text: 'Calculate', selected: true });
  } else {
    lines.push({ text: 'Calculate' });
  }
  return lines;
}

function routineTitle(r: StatRoutine): string {
  const map: Record<StatRoutine, string> = {
    '2-SampTTest': '2-SampTTest',
    '1-PropZTest': '1-PropZTest',
    '2-PropZTest': '2-PropZTest',
    TInterval: 'TInterval',
    'chi2-GOF': 'χ²GOF-Test',
    normalcdf: 'normalcdf(',
    invNorm: 'invNorm(',
    tcdf: 'tcdf(',
    invT: 'invT(',
    '1-VarStats': '1-Var Stats',
    LinReg: 'LinReg(a+bx)',
  };
  return map[r];
}

function parseNum(s: string): number {
  const v = s.replace(/[Ee]99/g, 'e99').replace(/−/g, '-');
  if (v.toLowerCase() === '-1e99') return -1e99;
  if (v.toLowerCase() === '1e99') return 1e99;
  return parseFloat(v);
}

function parseCsv(s: string): number[] {
  return s.split(',').map((v) => parseFloat(v.trim()));
}

/** Evaluate a simple arithmetic expression (supports +, -, *, /, ^, parens). */
function evalArithmetic(expr: string): number {
  const sanitized = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**')
    .replace(/π/g, `${Math.PI}`)
    .replace(/(?<![0-9.])(-)/g, '-'); // negative signs
  try {
    // eslint-disable-next-line no-new-func
    const result = new Function(`"use strict"; return (${sanitized})`)();
    if (typeof result === 'number' && isFinite(result)) return result;
    return NaN;
  } catch {
    return NaN;
  }
}

// ─── Execute routine ────────────────────────────────────────────

function executeRoutine(routine: StatRoutine, values: Record<string, string>): TestResult {
  switch (routine) {
    case '2-SampTTest':
      return twoSampTTest(
        parseNum(values.x1), parseNum(values.s1), parseNum(values.n1),
        parseNum(values.x2), parseNum(values.s2), parseNum(values.n2),
      );
    case '1-PropZTest':
      return onePropZTest(parseNum(values.p0), parseNum(values.x), parseNum(values.n));
    case '2-PropZTest':
      return twoPropZTest(parseNum(values.x1), parseNum(values.n1), parseNum(values.x2), parseNum(values.n2));
    case 'TInterval':
      return tInterval(parseNum(values.xbar), parseNum(values.sx), parseNum(values.n), parseNum(values.cLevel));
    case 'chi2-GOF':
      return chiSquareGOF(parseCsv(values.observed), parseCsv(values.expected));
    case 'normalcdf':
      return {
        lines: [
          { label: 'normalcdf(', value: '' },
          { label: '', value: normalcdf(parseNum(values.lower), parseNum(values.upper), parseNum(values.mu), parseNum(values.sigma)).toFixed(10) },
        ],
      };
    case 'invNorm':
      return {
        lines: [
          { label: 'invNorm(', value: '' },
          { label: '', value: invNorm(parseNum(values.area), parseNum(values.mu), parseNum(values.sigma)).toFixed(10) },
        ],
      };
    case 'tcdf':
      return {
        lines: [
          { label: 'tcdf(', value: '' },
          { label: '', value: tcdf(parseNum(values.lower), parseNum(values.upper), parseNum(values.df)).toFixed(10) },
        ],
      };
    case 'invT':
      return {
        lines: [
          { label: 'invT(', value: '' },
          { label: '', value: invT(parseNum(values.area), parseNum(values.df)).toFixed(10) },
        ],
      };
    case '1-VarStats':
      return oneVarStats(parseCsv(values.data));
    case 'LinReg':
      return linReg(parseCsv(values.xData), parseCsv(values.yData));
  }
}

// ─── Reducer ────────────────────────────────────────────────────

export function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case 'reset':
      return { ...INITIAL_STATE };

    case 'quit':
    case 'clear': {
      if (state.mode === 'home') {
        return { ...INITIAL_STATE, history: state.mode === 'home' && action.type === 'clear' ? [] : state.history };
      }
      return { ...INITIAL_STATE, history: state.history };
    }

    case 'stat':
      return {
        ...state,
        mode: 'stat-tests-menu',
        menuCursor: 0,
        screenLines: menuScreen('STAT TESTS', STAT_TESTS_MENU, 0),
      };

    case 'stat-calc':
      return {
        ...state,
        mode: 'stat-calc-menu',
        menuCursor: 0,
        screenLines: menuScreen('STAT CALC', STAT_CALC_MENU, 0),
      };

    case 'distr':
      return {
        ...state,
        mode: 'distr-menu',
        menuCursor: 0,
        screenLines: menuScreen('DISTR', DISTR_MENU, 0),
      };

    case 'arrow': {
      if (state.mode === 'stat-tests-menu' || state.mode === 'distr-menu' || state.mode === 'stat-calc-menu') {
        const menu = state.mode === 'stat-tests-menu' ? STAT_TESTS_MENU : state.mode === 'distr-menu' ? DISTR_MENU : STAT_CALC_MENU;
        const title = state.mode === 'stat-tests-menu' ? 'STAT TESTS' : state.mode === 'distr-menu' ? 'DISTR' : 'STAT CALC';
        const len = menu.length;
        const next = action.dir === 'down' ? Math.min(state.menuCursor + 1, len - 1) : Math.max(state.menuCursor - 1, 0);
        return { ...state, menuCursor: next, screenLines: menuScreen(title, menu, next) };
      }
      if (state.mode === 'input') {
        const totalSlots = state.inputFields.length + 1; // fields + Calculate
        const cur = state.inputFieldIndex;
        let next = action.dir === 'down' ? cur + 1 : cur - 1;
        next = Math.max(0, Math.min(next, totalSlots - 1));
        // Save current buffer
        const vals = { ...state.inputValues };
        if (cur < state.inputFields.length) {
          vals[state.inputFields[cur].key] = state.inputBuffer;
        }
        const newBuf = next < state.inputFields.length
          ? (vals[state.inputFields[next].key] ?? state.inputFields[next].defaultValue ?? '')
          : '';
        return {
          ...state,
          inputFieldIndex: next,
          inputBuffer: newBuf,
          inputValues: vals,
          screenLines: inputScreen(state.routine!, state.inputFields, next, vals, newBuf),
        };
      }
      // Result mode: scroll (no-op for now, could add scrolling for long results)
      return state;
    }

    case 'enter': {
      // ── Menu selection
      if (state.mode === 'stat-tests-menu' || state.mode === 'distr-menu' || state.mode === 'stat-calc-menu') {
        const menu = state.mode === 'stat-tests-menu' ? STAT_TESTS_MENU : state.mode === 'distr-menu' ? DISTR_MENU : STAT_CALC_MENU;
        const selected = menu[state.menuCursor];
        const fields = ROUTINE_FIELDS[selected.routine];
        const firstBuf = fields[0]?.defaultValue ?? '';
        return {
          ...state,
          mode: 'input',
          routine: selected.routine,
          inputFields: fields,
          inputFieldIndex: 0,
          inputBuffer: firstBuf,
          inputValues: {},
          screenLines: inputScreen(selected.routine, fields, 0, {}, firstBuf),
        };
      }

      // ── Input mode: advance field or calculate
      if (state.mode === 'input') {
        const vals = { ...state.inputValues };
        const cur = state.inputFieldIndex;
        if (cur < state.inputFields.length) {
          vals[state.inputFields[cur].key] = state.inputBuffer;
        }

        // If on Calculate or past last field → execute
        if (cur >= state.inputFields.length - 1 || state.inputFieldIndex >= state.inputFields.length) {
          // Make sure all fields have values
          for (const f of state.inputFields) {
            if (!(f.key in vals) || vals[f.key] === '') {
              vals[f.key] = f.defaultValue ?? '0';
            }
          }
          try {
            const result = executeRoutine(state.routine!, vals);
            return {
              ...state,
              mode: 'result',
              inputValues: vals,
              error: null,
              screenLines: result.lines.map((l) => ({
                // Prefer "label=value"; bare numeric lines when label is empty (DISTR outputs)
                text:
                  l.label && l.value
                    ? `${l.label}=${l.value}`
                    : l.value || l.label,
                align: 'left' as const,
              })),
            };
          } catch (e) {
            return {
              ...state,
              mode: 'result',
              error: 'ERR:DOMAIN',
              screenLines: [{ text: 'ERR:DOMAIN' }],
            };
          }
        }

        // Advance to next field
        const next = cur + 1;
        const nextBuf = vals[state.inputFields[next]?.key] ?? state.inputFields[next]?.defaultValue ?? '';
        return {
          ...state,
          inputFieldIndex: next,
          inputBuffer: nextBuf,
          inputValues: vals,
          screenLines: inputScreen(state.routine!, state.inputFields, next, vals, nextBuf),
        };
      }

      // ── Home screen: evaluate expression
      if (state.mode === 'home' && state.inputBuffer.trim()) {
        const expr = state.inputBuffer.trim();
        const result = evalArithmetic(expr);
        const newHistory: ScreenLine[] = [
          ...state.history,
          { text: expr, align: 'right' },
          { text: isNaN(result) ? 'ERR:SYNTAX' : formatNumber(result), align: 'right' },
        ];
        return {
          ...state,
          inputBuffer: '',
          history: newHistory,
          screenLines: newHistory.slice(-7),
          error: isNaN(result) ? 'ERR:SYNTAX' : null,
        };
      }

      // ── Result mode: go back to home
      if (state.mode === 'result') {
        return { ...INITIAL_STATE, history: state.history };
      }

      return state;
    }

    case 'del': {
      if (state.mode === 'home' || state.mode === 'input') {
        return {
          ...state,
          inputBuffer: state.inputBuffer.slice(0, -1),
          ...(state.mode === 'input'
            ? { screenLines: inputScreen(state.routine!, state.inputFields, state.inputFieldIndex, state.inputValues, state.inputBuffer.slice(0, -1)) }
            : {}),
        };
      }
      return state;
    }

    case 'key': {
      if (state.mode === 'result') {
        // Any key press from result goes home and starts typing
        const s = { ...INITIAL_STATE, history: state.history, inputBuffer: action.key };
        return { ...s, screenLines: [...s.history.slice(-6), { text: action.key, align: 'right' }] };
      }
      if (state.mode === 'home' || state.mode === 'input') {
        const newBuf = state.inputBuffer + action.key;
        if (state.mode === 'input') {
          return {
            ...state,
            inputBuffer: newBuf,
            screenLines: inputScreen(state.routine!, state.inputFields, state.inputFieldIndex, state.inputValues, newBuf),
          };
        }
        // Home
        const displayLines: ScreenLine[] = [...state.history.slice(-6), { text: newBuf, align: 'right' }];
        return { ...state, inputBuffer: newBuf, screenLines: displayLines };
      }
      return state;
    }

    case 'second':
      return state; // placeholder for future 2nd-key combos

    default:
      return state;
  }
}

function formatNumber(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e10) return n.toString();
  if (Math.abs(n) >= 1e10 || (Math.abs(n) < 0.001 && n !== 0)) return n.toExponential(9);
  return parseFloat(n.toFixed(10)).toString();
}
