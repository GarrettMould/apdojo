import { govUnitSupremeCourtCases, type GovSupremeCourtCase } from '@/data/apGovTerms';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';

/** One of the 14 required AP Gov Supreme Court cases (CED). */
export type ScotusRequiredCase = {
  /** URL slug; matches `scotusEssayPrompts[].id` when practice is live. */
  id: string;
  caseName: string;
  year: number;
  unit: number;
};

/** Required cases in chronological order — one hub card each. */
export const AP_GOV_REQUIRED_SCOTUS_CASES: ScotusRequiredCase[] = [
  { id: 'marbury-v-madison', caseName: 'Marbury v. Madison', year: 1803, unit: 1 },
  { id: 'mcculloch-v-maryland', caseName: 'McCulloch v. Maryland', year: 1819, unit: 1 },
  { id: 'schenck-v-united-states', caseName: 'Schenck v. United States', year: 1919, unit: 3 },
  { id: 'brown-v-board-of-education', caseName: 'Brown v. Board of Education', year: 1954, unit: 5 },
  { id: 'baker-v-carr', caseName: 'Baker v. Carr', year: 1962, unit: 2 },
  { id: 'engel-v-vitale', caseName: 'Engel v. Vitale', year: 1962, unit: 3 },
  { id: 'gideon-v-wainwright', caseName: 'Gideon v. Wainwright', year: 1963, unit: 4 },
  {
    id: 'tinker-v-des-moines',
    caseName: 'Tinker v. Des Moines Independent Community School District',
    year: 1969,
    unit: 4,
  },
  { id: 'new-york-times-v-united-states', caseName: 'New York Times Co. v. United States', year: 1971, unit: 4 },
  { id: 'wisconsin-v-yoder', caseName: 'Wisconsin v. Yoder', year: 1972, unit: 3 },
  { id: 'shaw-v-reno', caseName: 'Shaw v. Reno', year: 1993, unit: 2 },
  { id: 'united-states-v-lopez', caseName: 'United States v. Lopez', year: 1995, unit: 1 },
  { id: 'mcdonald-v-chicago', caseName: 'McDonald v. Chicago', year: 2010, unit: 3 },
  {
    id: 'citizens-united-v-fec',
    caseName: 'Citizens United v. Federal Election Commission (FEC)',
    year: 2010,
    unit: 5,
  },
];

const scotusPromptIds = new Set(scotusEssayPrompts.map((p) => p.id));

export function isScotusPracticeLive(caseId: string): boolean {
  return scotusPromptIds.has(caseId);
}

export function getScotusRequiredCase(id: string): ScotusRequiredCase | undefined {
  return AP_GOV_REQUIRED_SCOTUS_CASES.find((c) => c.id === id);
}

/** Cheat-sheet case record for summary text on hub cards. */
export function getScotusCaseRecord(requiredCase: ScotusRequiredCase): GovSupremeCourtCase | undefined {
  const unitCases = govUnitSupremeCourtCases[requiredCase.unit] ?? [];
  return unitCases.find(
    (c) =>
      c.caseName === requiredCase.caseName ||
      c.id.startsWith(`${requiredCase.id}-`) ||
      c.id === requiredCase.id
  );
}

export function formatScotusCaseTitle(requiredCase: ScotusRequiredCase): string {
  return `${requiredCase.caseName} (${requiredCase.year})`;
}

/** Live SCOTUS comparison FRQ slugs (matches `scotusEssayPrompts[].id`). */
export function getLiveScotusPracticeCaseIds(): string[] {
  return AP_GOV_REQUIRED_SCOTUS_CASES.filter((c) => isScotusPracticeLive(c.id)).map((c) => c.id);
}

export function scotusPracticeCasePath(caseId: string): string {
  return `/scotus-essay-practice/${caseId}`;
}

/** Pick a random live case; pass `excludeId` to avoid re-picking the current case when shuffling. */
export function pickRandomScotusPracticeCaseId(excludeId?: string): string {
  const live = getLiveScotusPracticeCaseIds();
  const pool = excludeId ? live.filter((id) => id !== excludeId) : live;
  const ids = pool.length > 0 ? pool : live;
  if (ids.length === 0) {
    return scotusEssayPrompts[0]?.id ?? 'marbury-v-madison';
  }
  return ids[Math.floor(Math.random() * ids.length)];
}
