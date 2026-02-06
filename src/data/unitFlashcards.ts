/**
 * Unit-level flashcard arrays for each subject/unit.
 * Each lesson gets: key terms (list) + graph questions (if applicable) + 3–5 rapid-fire questions.
 */

import { keyTerms as apMacroTerms } from './apMacroTerms';

/** Compatible with DrillDeepDive FlashcardData (back as string). Optional image shown on back for graph cards. */
export interface UnitFlashcardData {
  id: string;
  type: 'visual' | 'rapid-fire' | 'list';
  tag: string;
  front: string;
  back: string;
  /** Optional image URL shown on the back of the card (e.g. for GRAPH cards). */
  backImage?: string;
}

/** Placeholder image used on the back of all GRAPH-type cards until per-card images are set. */
const GRAPH_CARD_BACK_IMAGE = 'https://placehold.co/400x250/ede9fe/6b21a8?text=PPC+Graph';

function termsToListCards(
  terms: { term: string; definition: string }[],
  prefix: string
): UnitFlashcardData[] {
  return terms.map((kt, i) => ({
    id: `${prefix}-list-${i}`,
    type: 'list',
    tag: 'LIST',
    front: kt.term,
    back: kt.definition,
  }));
}

function getUnit1MacroTermsByLesson(): Record<string, { term: string; definition: string }[]> {
  const byLesson: Record<string, { term: string; definition: string }[]> = {};
  apMacroTerms
    .filter((t) => t.unit === 1 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push({ term: t.term, definition: t.definition });
      });
    });
  return byLesson;
}

const unit1MacroTermsByLesson = getUnit1MacroTermsByLesson();

function getUnit2MacroTermsByLesson(): Record<string, { term: string; definition: string }[]> {
  const byLesson: Record<string, { term: string; definition: string }[]> = {};
  apMacroTerms
    .filter((t) => t.unit === 2 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push({ term: t.term, definition: t.definition });
      });
    });
  return byLesson;
}

const unit2MacroTermsByLesson = getUnit2MacroTermsByLesson();

// —— 1.1 Scarcity: terms + rapid-fire (no graph) ——
const lesson1_1: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.1'] ?? [], 'u1m-1.1'),
  {
    id: 'u1m-1.1-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is the central problem that economics addresses?',
    back: 'Scarcity—unlimited wants and limited resources. Because we cannot have everything, we must make choices.',
  },
  {
    id: 'u1m-1.1-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What are the four factors of production?',
    back: 'Land, labor, capital, and entrepreneurship. These are the resources used to produce goods and services.',
  },
  {
    id: 'u1m-1.1-rf3',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is the difference between physical capital and human capital?',
    back: 'Physical capital is tools, machinery, and buildings. Human capital is the knowledge and skills workers gain through education and experience.',
  },
  {
    id: 'u1m-1.1-rf4',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is the difference between macroeconomics and microeconomics?',
    back: 'Macroeconomics studies the economy as a whole (countries, inflation, GDP). Microeconomics studies individuals and firms (choices, prices, markets).',
  },
];

// —— 1.2 PPC: terms + graph (how to show / scenario) + rapid-fire ——
const lesson1_2: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.2'] ?? [], 'u1m-1.2'),
  {
    id: 'u1m-1.2-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of improved technology on a country\'s production possibilities?',
    back: 'Shift the PPC outward. Better technology increases productive capacity, so the economy can produce more of at least one good at every level of the other—previously unattainable combinations become attainable.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.2-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effects of a large-scale natural disaster on the PPC?',
    back: 'Shift the PPC inward. The disaster destroys or idles resources (labor, capital, land), reducing productive capacity. The economy can no longer produce as much; previously attainable combinations become unattainable.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.2-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you draw a PPC for two goods that use nearly identical factors of production?',
    back: 'Draw a PPC that is nearly a straight line (or only slightly bowed). When resources are equally good at producing both goods, opportunity cost is roughly constant—you give up the same amount of one good for each additional unit of the other.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.2-g4',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of a decrease in the labor force on the PPC?',
    back: 'Shift the PPC inward. Fewer workers mean less productive capacity; the economy cannot produce as much of either good at every level of the other.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.2-g5',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show on a PPC that a country is producing inefficiently (underutilizing resources)?',
    back: 'Show a point inside the curve. Any point inside the PPC represents inefficient production—the economy could produce more of both goods without giving up anything; resources are not fully used.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.2-g6',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Scenario: A country gains more natural resources. How do you show this on the PPC?',
    back: 'Shift the PPC outward. More resources (e.g. land, raw materials) increase productive capacity, so the economy can produce more of at least one good at every level of the other.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.2-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What causes the PPC to shift outward?',
    back: 'Economic growth: more resources (labor, capital), better technology, or higher productivity. The economy can produce more of at least one good at every level of the other.',
  },
  {
    id: 'u1m-1.2-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is opportunity cost?',
    back: 'The value of the next best alternative given up when you make a choice. On a PPC, it is what you give up of one good to get more of the other.',
  },
  {
    id: 'u1m-1.2-rf3',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What does allocative efficiency mean?',
    back: 'Resources are used to produce the combination of goods and services that society values most. It is the “right” point on the PPC given preferences.',
  },
  {
    id: 'u1m-1.2-rf4',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What could cause the PPC to shift inward?',
    back: 'Loss of resources or productive capacity—e.g. natural disaster, war, or disease that reduces labor or capital.',
  },
];

// —— 1.3 Comparative Advantage: terms + rapid-fire (no graph) ——
const lesson1_3: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.3'] ?? [], 'u1m-1.3'),
  {
    id: 'u1m-1.3-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is comparative advantage?',
    back: 'The ability to produce a good at a lower opportunity cost than another producer. Trade is beneficial when each party specializes in the good where they have comparative advantage.',
  },
  {
    id: 'u1m-1.3-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is absolute advantage?',
    back: 'The ability to produce more of a good than another producer using the same resources. Comparative advantage (lower opportunity cost), not absolute advantage, determines gains from trade.',
  },
  {
    id: 'u1m-1.3-rf3',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'In an output problem, how do you find opportunity cost of one unit of Good A?',
    back: 'Opportunity cost of 1 Good A = Other / Itself. If you can produce 10 A or 5 B, OC of 1 A = 5/10 = 0.5 B.',
  },
  {
    id: 'u1m-1.3-rf4',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'In an input problem, how do you find opportunity cost?',
    back: 'Opportunity cost: Itself / Other. If it takes 2 hours for Good A and 4 hours for Good B, OC of 1 A = 2/4 = 0.5 B.',
  },
  {
    id: 'u1m-1.3-rf5',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What must be true about terms of trade for both parties to gain from trade?',
    back: 'The terms of trade must lie between the two parties’ opportunity costs. If both trade at a rate better than their own OC, both gain.',
  },
];

// —— 1.4 Demand: terms + graph (how to show / scenario) + rapid-fire ——
const lesson1_4: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.4'] ?? [], 'u1m-1.4'),
  {
    id: 'u1m-1.4-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show an increase in demand on a demand curve graph?',
    back: 'Shift the demand curve to the right. At every price, quantity demanded is higher. Caused by non-price factors: more buyers, higher income (normal good), preferences, price of substitutes up or complements down, expectations.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.4-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of a rise in the price of a substitute good on demand for the original good?',
    back: 'Shift the demand curve for the original good to the right. When the substitute becomes more expensive, consumers buy more of the original good at each price.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.4-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Scenario: Consumer income falls and the good is normal. How do you show the effect on the demand curve?',
    back: 'Shift the demand curve to the left. For a normal good, lower income means less demand at every price.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.4-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is the difference between a normal good and an inferior good?',
    back: 'Normal good: demand increases when income rises. Inferior good: demand decreases when income rises (e.g. ramen, used cars).',
  },
  {
    id: 'u1m-1.4-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'If the price of a substitute rises, what happens to demand for the original good?',
    back: 'Demand for the original good increases (curve shifts right). Consumers switch toward the original good when the substitute becomes more expensive.',
  },
  {
    id: 'u1m-1.4-rf3',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'If the price of a complement rises, what happens to demand for the original good?',
    back: 'Demand for the original good decreases (curve shifts left). When complements cost more, consumers buy less of both.',
  },
];

// —— 1.5 Supply: terms + graph (how to show / scenario) + rapid-fire ——
const lesson1_5: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.5'] ?? [], 'u1m-1.5'),
  {
    id: 'u1m-1.5-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show an increase in supply on a supply curve graph?',
    back: 'Shift the supply curve to the right. At every price, quantity supplied is higher. Caused by lower input costs, better technology, more sellers, subsidies, or expectations of lower future prices.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.5-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of higher input prices on the supply curve?',
    back: 'Shift the supply curve to the left. Higher costs (wages, raw materials, etc.) reduce supply at every price—producers supply less at each price level.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.5-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of a subsidy to producers on the supply curve?',
    back: 'Shift the supply curve to the right. Subsidies lower production costs, so at every price producers supply more.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.5-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How do taxes on producers affect the supply curve?',
    back: 'Taxes increase production costs, so supply decreases—curve shifts left. At every price, less is supplied.',
  },
  {
    id: 'u1m-1.5-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'How do subsidies affect the supply curve?',
    back: 'Subsidies lower production costs, so supply increases—curve shifts right. At every price, more is supplied.',
  },
  {
    id: 'u1m-1.5-rf3',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'If the price of an alternative good a producer could make rises, what happens to supply of the current good?',
    back: 'Supply of the current good decreases (curve shifts left). Producers switch to the more profitable alternative.',
  },
];

// —— 1.6 Equilibrium: terms + graph (how to show / scenario) + rapid-fire ——
const lesson1_6: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.6'] ?? [], 'u1m-1.6'),
  {
    id: 'u1m-1.6-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show a surplus on a supply and demand graph?',
    back: 'Set a price above the equilibrium price. At that price, quantity supplied exceeds quantity demanded (Qs > Qd). The vertical gap between the supply and demand curves at that price shows the surplus.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.6-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show a shortage on a supply and demand graph?',
    back: 'Set a price below the equilibrium price. At that price, quantity demanded exceeds quantity supplied (Qd > Qs). The vertical gap between the demand and supply curves at that price shows the shortage.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.6-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Scenario: Demand increases (shifts right). How do you show the new equilibrium price and quantity?',
    back: 'Draw the demand curve shifting right. The new intersection with supply is at a higher price and higher quantity. Both equilibrium price and quantity increase when demand increases and supply is unchanged.',
    backImage: GRAPH_CARD_BACK_IMAGE,
  },
  {
    id: 'u1m-1.6-rf1',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'When demand shifts right, what happens to equilibrium price and quantity?',
    back: 'Both increase. Higher demand raises price and quantity when supply is unchanged.',
  },
  {
    id: 'u1m-1.6-rf2',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'When supply shifts right, what happens to equilibrium price and quantity?',
    back: 'Price falls and quantity rises. More supply at each price lowers price and increases quantity when demand is unchanged.',
  },
  {
    id: 'u1m-1.6-rf3',
    type: 'rapid-fire',
    tag: 'RULE',
    front: 'What is meant by indeterminate change in equilibrium?',
    back: 'When both demand and supply shift, the net effect on price or quantity can be ambiguous. It depends on the relative sizes of the shifts.',
  },
];

// —— Unit 2 Macro: terms + rapid-fire (minimal for deep dives) ——
const lesson2_1: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.1'] ?? [], 'u2m-2.1'),
  { id: 'u2m-2.1-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What are the four components of GDP (expenditure approach)?', back: 'C + I + G + (X - M): Consumption, Investment, Government spending, Net exports (exports minus imports).' },
  { id: 'u2m-2.1-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What does the circular flow model show?', back: 'The flow of money and goods between households and firms; households supply factors and buy goods; firms use factors and sell goods.' },
];
const lesson2_2: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.2'] ?? [], 'u2m-2.2'),
  { id: 'u2m-2.2-rf1', type: 'rapid-fire', tag: 'RULE', front: 'Why does GDP not measure welfare or well-being?', back: 'GDP ignores leisure, distribution of income, nonmarket production, environmental quality, and underground activity.' },
];
const lesson2_3: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.3'] ?? [], 'u2m-2.3'),
  { id: 'u2m-2.3-rf1', type: 'rapid-fire', tag: 'RULE', front: 'How do you calculate the unemployment rate?', back: 'Unemployment rate = (Unemployed / Labor force) × 100. Labor force = Employed + Unemployed.' },
  { id: 'u2m-2.3-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What are the three types of unemployment?', back: 'Frictional (temporary job search), Structural (skills mismatch), Cyclical (recession—demand for labor falls).' },
];
const lesson2_4: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.4'] ?? [], 'u2m-2.4'),
  { id: 'u2m-2.4-rf1', type: 'rapid-fire', tag: 'RULE', front: 'How is the CPI (Consumer Price Index) calculated?', back: 'CPI = (Cost of basket in current year / Cost of basket in base year) × 100. Base year CPI = 100.' },
  { id: 'u2m-2.4-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How do you find the inflation rate between two years?', back: 'Inflation rate = ((CPI year 2 - CPI year 1) / CPI year 1) × 100.' },
];
const lesson2_5: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.5'] ?? [], 'u2m-2.5'),
  { id: 'u2m-2.5-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What are costs of inflation?', back: 'Shoe-leather costs, menu costs, redistribution from lenders to borrowers (if unanticipated), uncertainty, and distortion of tax and price signals.' },
];
const lesson2_6: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.6'] ?? [], 'u2m-2.6'),
  { id: 'u2m-2.6-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the difference between nominal and real GDP?', back: 'Nominal GDP uses current prices; real GDP uses base-year prices to isolate changes in output from changes in prices.' },
  { id: 'u2m-2.6-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is the GDP deflator?', back: 'GDP deflator = (Nominal GDP / Real GDP) × 100. It measures the price level for all goods and services in GDP.' },
];
const lesson2_7: UnitFlashcardData[] = [
  ...termsToListCards(unit2MacroTermsByLesson['2.7'] ?? [], 'u2m-2.7'),
  { id: 'u2m-2.7-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What are the phases of the business cycle?', back: 'Expansion (rising output), Peak, Contraction/Recession (falling output), Trough. Then the cycle repeats.' },
];

/** Unit 1 Macro: lessonId → flashcard array (terms + graph where applicable + rapid-fire). */
export const macroUnit1Flashcards: Record<string, UnitFlashcardData[]> = {
  '1.1': lesson1_1,
  '1.2': lesson1_2,
  '1.3': lesson1_3,
  '1.4': lesson1_4,
  '1.5': lesson1_5,
  '1.6': lesson1_6,
};

/** Unit 2 Macro: lessonId → flashcard array. */
export const macroUnit2Flashcards: Record<string, UnitFlashcardData[]> = {
  '2.1': lesson2_1,
  '2.2': lesson2_2,
  '2.3': lesson2_3,
  '2.4': lesson2_4,
  '2.5': lesson2_5,
  '2.6': lesson2_6,
  '2.7': lesson2_7,
};

/**
 * Returns flashcards for a given subject, unit, and lesson.
 * Use on deep-dive pages to get the warm-up deck for that lesson.
 */
export function getFlashcardsForLesson(
  subject: 'macro' | 'micro',
  unit: number,
  lessonId: string
): UnitFlashcardData[] {
  if (subject === 'macro' && unit === 1) {
    return macroUnit1Flashcards[lessonId] ?? [];
  }
  if (subject === 'macro' && unit === 2) {
    return macroUnit2Flashcards[lessonId] ?? [];
  }
  return [];
}
