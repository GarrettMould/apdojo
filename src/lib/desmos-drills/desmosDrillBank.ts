import type { DesmosDrill, DesmosDrillDeck } from './types';

/**
 * Sample Desmos drill — same stats skill as TI invNorm, different UI.
 * In Desmos: Inference → Normal → Bounds (critical value), not vars → DISTR.
 */
const NORMAL_CRITICAL_Z: DesmosDrill = {
  id: 'desmos-normal-critical-z',
  skillLabel: 'Distributions · Normal bounds',
  prompt:
    'A scoring rubric asks for the critical z* that cuts off the top 5% of a standard normal distribution.',
  goalText:
    'In Desmos, open Add Item (+) → Inference → Normal. Use μ = 0 and σ = 1, then find the bound that cuts off the top 5% (right-tail area 0.05). Read the critical value Desmos reports.',
  successCue: 'z* ≈ 1.645',
  hints: [
    'Click + (Add Item) in the top-left expression list, then choose Inference.',
    'Select Normal. Keep the standard normal defaults μ = 0 and σ = 1.',
    'Look for Bounds (or an equivalent critical-value / percentile control) — this is Desmos’s version of invNorm, not a TI menu.',
    'You want the cutoff for the upper 5%, so the right-tail probability is 0.05 (left area 0.95).',
  ],
  showPath: '+ → Inference → Normal → μ=0, σ=1 → Bounds / top 5% → read z*',
};

export const DESMOS_DRILL_DECKS: DesmosDrillDeck[] = [
  {
    id: 'desmos-distributions-normal',
    title: 'Desmos · Critical z*',
    description:
      'Sample task: find a normal critical value with Inference → Bounds (exam-style Desmos).',
    family: 'DISTRIBUTIONS',
    drills: [NORMAL_CRITICAL_Z],
  },
];

export const DESMOS_DRILLS: DesmosDrill[] = DESMOS_DRILL_DECKS.flatMap((d) => d.drills);

export function getDesmosDeckById(id: string): DesmosDrillDeck | undefined {
  return DESMOS_DRILL_DECKS.find((d) => d.id === id);
}

export function isDesmosDeck(deck: { id: string }): boolean {
  return DESMOS_DRILL_DECKS.some((d) => d.id === deck.id);
}
