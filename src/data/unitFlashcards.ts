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

/** Base URL for flippable card images */
const FLIPPABLE_BASE_URL = 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/';

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

function getUnit3MacroTermsByLesson(): Record<string, { term: string; definition: string }[]> {
  const byLesson: Record<string, { term: string; definition: string }[]> = {};
  apMacroTerms
    .filter((t) => t.unit === 3 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push({ term: t.term, definition: t.definition });
      });
    });
  return byLesson;
}

const unit3MacroTermsByLesson = getUnit3MacroTermsByLesson();

function getUnit4MacroTermsByLesson(): Record<string, { term: string; definition: string }[]> {
  const byLesson: Record<string, { term: string; definition: string }[]> = {};
  apMacroTerms
    .filter((t) => t.unit === 4 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push({ term: t.term, definition: t.definition });
      });
    });
  return byLesson;
}

const unit4MacroTermsByLesson = getUnit4MacroTermsByLesson();

function getUnit5MacroTermsByLesson(): Record<string, { term: string; definition: string }[]> {
  const byLesson: Record<string, { term: string; definition: string }[]> = {};
  apMacroTerms
    .filter((t) => t.unit === 5 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push({ term: t.term, definition: t.definition });
      });
    });
  return byLesson;
}

const unit5MacroTermsByLesson = getUnit5MacroTermsByLesson();

function getUnit6MacroTermsByLesson(): Record<string, { term: string; definition: string }[]> {
  const byLesson: Record<string, { term: string; definition: string }[]> = {};
  apMacroTerms
    .filter((t) => t.unit === 6 && t.lessonIDs && t.lessonIDs.length > 0)
    .forEach((t) => {
      t.lessonIDs!.forEach((lid) => {
        if (!byLesson[lid]) byLesson[lid] = [];
        byLesson[lid].push({ term: t.term, definition: t.definition });
      });
    });
  return byLesson;
}

const unit6MacroTermsByLesson = getUnit6MacroTermsByLesson();

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
    backImage: `${FLIPPABLE_BASE_URL}ppc_technology_increase.jpg`,
  },
  {
    id: 'u1m-1.2-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effects of a large-scale natural disaster on the PPC?',
    back: 'Shift the PPC inward. The disaster destroys or idles resources (labor, capital, land), reducing productive capacity. The economy can no longer produce as much; previously attainable combinations become unattainable.',
    backImage: `${FLIPPABLE_BASE_URL}ppc_disaster.jpg`,
  },
  {
    id: 'u1m-1.2-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you draw a PPC for two goods that use nearly identical factors of production?',
    back: 'Draw a PPC that is nearly a straight line (or only slightly bowed). When resources are equally good at producing both goods, opportunity cost is roughly constant—you give up the same amount of one good for each additional unit of the other.',
    backImage: `${FLIPPABLE_BASE_URL}ppc_straight_line.jpg`,
  },
  {
    id: 'u1m-1.2-g4',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of a decrease in the labor force on the PPC?',
    back: 'Shift the PPC inward. Fewer workers mean less productive capacity; the economy cannot produce as much of either good at every level of the other.',
    backImage: `${FLIPPABLE_BASE_URL}ppc_labor_decrease.jpg`,
  },
  {
    id: 'u1m-1.2-g5',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show on a PPC that a country is producing inefficiently (underutilizing resources)?',
    back: 'Show a point inside the curve. Any point inside the PPC represents inefficient production—the economy could produce more of both goods without giving up anything; resources are not fully used.',
    backImage: `${FLIPPABLE_BASE_URL}ppc_point_inside.jpg`,
  },
  {
    id: 'u1m-1.2-g6',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Scenario: A country gains more natural resources. How do you show this on the PPC?',
    back: 'Shift the PPC outward. More resources (e.g. land, raw materials) increase productive capacity, so the economy can produce more of at least one good at every level of the other.',
    backImage: `${FLIPPABLE_BASE_URL}ppc_resources_increase.jpg`,
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
    backImage: `${FLIPPABLE_BASE_URL}demand_increase.jpg`,
  },
  {
    id: 'u1m-1.4-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of a rise in the price of a substitute good on demand for the original good?',
    back: 'Shift the demand curve for the original good to the right. When the substitute becomes more expensive, consumers buy more of the original good at each price.',
    backImage: `${FLIPPABLE_BASE_URL}demand_substitute_increase.jpg`,
  },
  {
    id: 'u1m-1.4-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Scenario: Consumer income falls and the good is normal. How do you show the effect on the demand curve?',
    back: 'Shift the demand curve to the left. For a normal good, lower income means less demand at every price.',
    backImage: `${FLIPPABLE_BASE_URL}demand_decrease.jpg`,
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
    backImage: `${FLIPPABLE_BASE_URL}supply_increase.jpg`,
  },
  {
    id: 'u1m-1.5-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of higher input prices on the supply curve?',
    back: 'Shift the supply curve to the left. Higher costs (wages, raw materials, etc.) reduce supply at every price—producers supply less at each price level.',
    backImage: `${FLIPPABLE_BASE_URL}supply_decrease.jpg`,
  },
  {
    id: 'u1m-1.5-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show the effect of a subsidy to producers on the supply curve?',
    back: 'Shift the supply curve to the right. Subsidies lower production costs, so at every price producers supply more.',
    backImage: `${FLIPPABLE_BASE_URL}supply_subsidy.jpg`,
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
    backImage: `${FLIPPABLE_BASE_URL}equilibrium_surplus.jpg`,
  },
  {
    id: 'u1m-1.6-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'How do you show a shortage on a supply and demand graph?',
    back: 'Set a price below the equilibrium price. At that price, quantity demanded exceeds quantity supplied (Qd > Qs). The vertical gap between the demand and supply curves at that price shows the shortage.',
    backImage: `${FLIPPABLE_BASE_URL}equilibrium_shortage.jpg`,
  },
  {
    id: 'u1m-1.6-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Scenario: Demand increases (shifts right). How do you show the new equilibrium price and quantity?',
    back: 'Draw the demand curve shifting right. The new intersection with supply is at a higher price and higher quantity. Both equilibrium price and quantity increase when demand increases and supply is unchanged.',
    backImage: `${FLIPPABLE_BASE_URL}equilibrium_demand_increase.jpg`,
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

// —— Unit 3 Macro: terms + rapid-fire + graph where applicable ——
const lesson3_1: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.1'] ?? [], 'u3m-3.1'),
  { id: 'u3m-3.1-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What are the three effects that explain why the AD curve slopes downward?', back: 'Real Wealth Effect: Lower price level increases purchasing power, increasing consumption. Interest Rate Effect: Lower price level means less money needed for transactions, increasing savings and lowering interest rates, which increases investment. Net Export Effect: Lower domestic price level makes exports cheaper and imports more expensive, increasing net exports.' },
  { id: 'u3m-3.1-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What are the components of aggregate demand?', back: 'C + I + G + (X - M): Consumption (C), Investment (I), Government Spending (G), and Net Exports (X - M).' },
  { id: 'u3m-3.1-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show an increase in aggregate demand on an AD-AS graph?', back: 'Shift the AD curve to the right. This can be caused by increases in consumption (consumer confidence), investment (business confidence), government spending, or net exports (foreign income increases).', backImage: `${FLIPPABLE_BASE_URL}ad_increase.jpg` },
  { id: 'u3m-3.1-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show how the impact of a higher price level on Aggregate Demand.', back: 'Shift the AD curve to the right. This can be caused by increases in consumption (consumer confidence), investment (business confidence), government spending, or net exports (foreign income increases).', backImage: `${FLIPPABLE_BASE_URL}ad_price_level_increase.jpg` },
];

const lesson3_2: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.2'] ?? [], 'u3m-3.2'),
  { id: 'u3m-3.2-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the formula for the spending multiplier?', back: 'Spending Multiplier = 1 / MPS, where MPS is the Marginal Propensity to Save. Alternatively, 1 / (1 - MPC).' },
  { id: 'u3m-3.2-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is the formula for the tax multiplier?', back: 'Tax Multiplier = -MPC / MPS. The negative sign indicates that tax increases decrease GDP, and tax decreases increase GDP.' },
  { id: 'u3m-3.2-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What is the relationship between MPC and MPS?', back: 'MPC + MPS = 1. If you receive additional income, you either spend it (MPC) or save it (MPS), so they must add up to 100%.' },
  { id: 'u3m-3.2-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the effect of a decrease in government spending on AD-AS.', back: 'AD shifts left. The horizontal shift in real GDP is larger than the initial change in G because of the multiplier: ΔY = multiplier × ΔG. Draw AD shifting left; the distance of the shift in output reflects the multiplied effect.', backImage: `${FLIPPABLE_BASE_URL}ad_decrease.jpg` },
  { id: 'u3m-3.2-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of a decrease in consumer and business confidence on AD-AS graph.', back: 'AD shifts left. Consumption and private invested - two parts of aggregate demand - both decrease.', backImage: `${FLIPPABLE_BASE_URL}ad_decrease.jpg` },
];

const lesson3_3: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.3'] ?? [], 'u3m-3.3'),
  { id: 'u3m-3.3-rf1', type: 'rapid-fire', tag: 'RULE', front: 'Why does the SRAS curve slope upward?', back: 'Due to sticky wages. When the price level rises, firms can sell their products for more money while wages remain fixed, increasing profits and incentivizing more production.' },
  { id: 'u3m-3.3-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What factors cause the SRAS curve to shift?', back: 'Changes in input prices (wages, raw materials), productivity/technology, regulations, and expectations of future prices.' },
  { id: 'u3m-3.3-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show a decrease in short-run aggregate supply on an AD-AS graph?', back: 'Shift the SRAS curve to the left. This can be caused by increases in input prices (wages, energy), negative productivity shocks, or unfavorable regulations.', backImage: `${FLIPPABLE_BASE_URL}sras_decrease.jpg` },
  { id: 'u3m-3.3-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of government subsidies of the SRAS curve.', back: 'Shift the SRAS curve to the right. Widespread subsidies reduce production costs for business, allowing them to increase output.', backImage: `${FLIPPABLE_BASE_URL}sras_decrease.jpg`},
];

const lesson3_4: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.4'] ?? [], 'u3m-3.4'),
  { id: 'u3m-3.4-rf1', type: 'rapid-fire', tag: 'RULE', front: 'Why is the LRAS curve vertical?', back: 'In the long run, the economy produces at its potential output (full employment) regardless of the price level. Price level changes do not affect long-run output capacity.' },
  { id: 'u3m-3.4-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What factors cause the LRAS curve to shift?', back: 'Changes in quantity/quality of resources (labor, capital, natural resources), technology, and institutions that affect productivity.' },
  { id: 'u3m-3.4-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show economic growth on an AD-AS graph?', back: 'Shift the LRAS curve to the right. This represents an increase in potential output, allowing the economy to produce more goods and services at full employment.', backImage: `${FLIPPABLE_BASE_URL}lras_increase.jpg` },
];

const lesson3_5: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.5'] ?? [], 'u3m-3.5'),
  { id: 'u3m-3.5-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is long-run equilibrium in the AD-AS model?', back: 'When AD, SRAS, and LRAS all intersect at the same point. The economy is at potential output (full employment) with no output gaps.' },
  { id: 'u3m-3.5-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is a recessionary gap?', back: 'When actual output is below potential output. The intersection of AD and SRAS is to the left of LRAS, indicating unemployment above the natural rate.' },
  { id: 'u3m-3.5-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What is an inflationary gap?', back: 'When actual output is above potential output. The intersection of AD and SRAS is to the right of LRAS, indicating unemployment below the natural rate.' },
  { id: 'u3m-3.5-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show a recessionary gap on an AD-AS graph?', back: 'AD and SRAS intersect to the left of LRAS. The economy is producing below potential output, with cyclical unemployment present.', backImage: `${FLIPPABLE_BASE_URL}recessionary_gap.jpg` },
  { id: 'u3m-3.5-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw the AD-AS graph of a country with actual output > potential output?', back: 'AD and SRAS intersect to the right of LRAS.', backImage: `${FLIPPABLE_BASE_URL}adas_inflationary.jpg` },
];

const lesson3_6: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.6'] ?? [], 'u3m-3.6'),
  { id: 'u3m-3.6-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What happens in the short run when AD increases?', back: 'Both price level and real GDP increase. The economy moves up along the SRAS curve to a new equilibrium with higher output and prices.' },
  { id: 'u3m-3.6-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What happens in the short run when SRAS decreases (shifts left)?', back: 'Price level increases and real GDP decreases. This is called stagflation—inflation combined with recession.' },
  { id: 'u3m-3.6-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show stagflation on an AD-AS graph?', back: 'SRAS shifts left while AD stays constant. The new equilibrium has a higher price level and lower real GDP.', backImage: `${FLIPPABLE_BASE_URL}stagflation.jpg` },
];

const lesson3_7: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.7'] ?? [], 'u3m-3.7'),
  { id: 'u3m-3.7-rf1', type: 'rapid-fire', tag: 'RULE', front: 'How does the economy self-adjust from a recessionary gap?', back: 'High unemployment puts downward pressure on wages. As nominal wages fall, production costs decrease, shifting SRAS right until the economy returns to long-run equilibrium at potential output.' },
  { id: 'u3m-3.7-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How does the economy self-adjust from an inflationary gap?', back: 'Low unemployment creates upward pressure on wages. As nominal wages rise, production costs increase, shifting SRAS left until the economy returns to long-run equilibrium at potential output.' },
  { id: 'u3m-3.7-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show long-run self-adjustment from a recessionary gap?', back: 'SRAS shifts right (due to falling wages) until it intersects AD at the LRAS level. The economy returns to potential output, but at a lower price level.', backImage: `${FLIPPABLE_BASE_URL}long_run_adjustment_recessionary.jpg` },
];

const lesson3_8: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.8'] ?? [], 'u3m-3.8'),
  { id: 'u3m-3.8-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is expansionary fiscal policy?', back: 'Government actions to increase AD: increase government spending, decrease taxes, or increase transfer payments. Used to combat recessionary gaps.' },
  { id: 'u3m-3.8-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is contractionary fiscal policy?', back: 'Government actions to decrease AD: decrease government spending, increase taxes, or decrease transfer payments. Used to combat inflationary gaps.' },
  { id: 'u3m-3.8-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show expansionary fiscal policy on an AD-AS graph?', back: 'AD shifts right due to increased government spending or decreased taxes. In the short run, this increases both price level and real GDP.', backImage: `${FLIPPABLE_BASE_URL}adas_ad_increase.jpg` },
  { id: 'u3m-3.8-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Suppose a key input like oil becomes scarce. Show the impact on the AD-AS graph', back: 'SRAS shifts left because the higher cost of the key input drives up production prices in the economy.', backImage: `${FLIPPABLE_BASE_URL}adas_sras_decrease.jpg` },
];

const lesson3_9: UnitFlashcardData[] = [
  ...termsToListCards(unit3MacroTermsByLesson['3.9'] ?? [], 'u3m-3.9'),
  { id: 'u3m-3.9-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What are automatic stabilizers?', back: 'Government programs that automatically adjust spending or taxes in response to economic conditions without new legislation. Examples: progressive income taxes, unemployment insurance.' },
  { id: 'u3m-3.9-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How do automatic stabilizers work during a recession?', back: 'During recession: tax revenues fall automatically (lower incomes), and transfer payments (unemployment benefits) increase automatically. This puts more money in people\'s hands, helping stabilize AD.' },
  { id: 'u3m-3.9-rf3', type: 'rapid-fire', tag: 'RULE', front: 'How do automatic stabilizers work during an expansion?', back: 'During expansion: tax revenues rise automatically (higher incomes move people into higher brackets), and transfer payments decrease. This withdraws spending power, helping prevent overheating.' },

];

/** Unit 3 Macro: lessonId → flashcard array. */
export const macroUnit3Flashcards: Record<string, UnitFlashcardData[]> = {
  '3.1': lesson3_1,
  '3.2': lesson3_2,
  '3.3': lesson3_3,
  '3.4': lesson3_4,
  '3.5': lesson3_5,
  '3.6': lesson3_6,
  '3.7': lesson3_7,
  '3.8': lesson3_8,
  '3.9': lesson3_9,
};

// —— Unit 4 Macro: terms + rapid-fire + graph where applicable ——
const lesson4_1: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.1'] ?? [], 'u4m-4.1'),
  { id: 'u4m-4.1-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the difference between stocks and bonds?', back: 'Stocks represent ownership (equity) in a company and entitle holders to dividends. Bonds represent debt (IOU) and entitle holders to fixed interest payments and repayment of principal.' },
  { id: 'u4m-4.1-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is liquidity?', back: 'Liquidity is how easily an asset can be converted into cash without significant loss of value. Cash is most liquid; real estate and art are least liquid.' },
  { id: 'u4m-4.1-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What happens to the price of existing bonds when market interest rates fall?', back: 'The price of existing bonds increases. There is an inverse relationship between interest rates and bond prices. When new bonds offer lower rates, existing bonds with higher fixed rates become more valuable.' },

];

const lesson4_2: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.2'] ?? [], 'u4m-4.2'),
  { id: 'u4m-4.2-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the formula for the real interest rate?', back: 'Real Interest Rate ≈ Nominal Interest Rate - Inflation Rate. This shows the purchasing power return after accounting for inflation.' },
  { id: 'u4m-4.2-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is the Fisher Effect?', back: 'The Fisher Effect states that nominal interest rates adjust to reflect expected inflation. Lenders demand higher nominal rates when they expect higher inflation to maintain their real return.' },
  { id: 'u4m-4.2-rf3', type: 'rapid-fire', tag: 'RULE', front: 'Who benefits from unexpected inflation: borrowers or lenders?', back: 'Borrowers benefit. They repay loans with money that has less purchasing power than expected. Lenders are hurt because they receive repayment worth less in real terms.' },
];

const lesson4_3: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.3'] ?? [], 'u4m-4.3'),
  { id: 'u4m-4.3-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What are the three functions of money?', back: 'Medium of Exchange: used to buy goods and services. Unit of Account: provides a standard measure of value. Store of Value: holds value over time.' },
  { id: 'u4m-4.3-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is included in M1?', back: 'M1 includes currency in circulation, demand deposits (checking accounts), and traveler\'s checks. These are the most liquid forms of money used directly for transactions.' },
  { id: 'u4m-4.3-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What is included in M2?', back: 'M2 includes everything in M1 plus savings deposits, small time deposits (CDs), and money market mutual funds. M2 adds "near monies" that are less liquid but easily convertible.' },
];

const lesson4_4: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.4'] ?? [], 'u4m-4.4'),
  { id: 'u4m-4.4-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the money multiplier formula?', back: 'Money Multiplier = 1 / Required Reserve Ratio. If RRR is 10%, the multiplier is 10. This shows the maximum potential expansion of the money supply from new reserves.' },
  { id: 'u4m-4.4-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How does fractional reserve banking create money?', back: 'Banks keep only a fraction of deposits as reserves and lend out the rest. When loans are deposited in other banks, those banks can lend again, creating new money through the multiplier process.' },
  { id: 'u4m-4.4-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What are required reserves vs. excess reserves?', back: 'Required reserves are the minimum amount banks must hold (deposit × RRR). Excess reserves are any reserves above the required amount that can be loaned out.' },

];

const lesson4_5: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.5'] ?? [], 'u4m-4.5'),
  { id: 'u4m-4.5-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the relationship between interest rates and the quantity of money demanded?', back: 'Inverse relationship. Higher interest rates increase the opportunity cost of holding money (forgoing interest), so people hold less money. Lower interest rates reduce the opportunity cost, so people hold more money.' },
  { id: 'u4m-4.5-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show an increase in the money supply on a money market graph?', back: 'Shift the money supply curve to the right. This lowers the equilibrium interest rate and increases the quantity of money demanded.', backImage: `${FLIPPABLE_BASE_URL}money_supply_increase.jpg` },
  { id: 'u4m-4.5-g2', type: 'rapid-fire', tag: 'GRAPH', front: 'Show how a decrease in national income impacts money demand.', back: 'Shift the money demand curve to the left. Lower national income means fewer transactions, so people hold less money at each interest rate.', backImage: `${FLIPPABLE_BASE_URL}money_demand_decrease.jpg` },
  { id: 'u4m-4.5-g3', type: 'rapid-fire', tag: 'GRAPH', front: 'Show how an increase in the general price level impacts money demand.', back: 'Shift the money demand curve to the right. At higher price levels, people need to hold more money to buy the same things (M1 forms of money).', backImage: `${FLIPPABLE_BASE_URL}money_demand_increase.jpg` },
];

const lesson4_6: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.6'] ?? [], 'u4m-4.6'),
  { id: 'u4m-4.6-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is expansionary monetary policy?', back: 'Actions by the central bank to increase the money supply and lower interest rates: buying bonds (open market operations), lowering reserve requirements, or lowering the discount rate. Used to combat recession.' },
  { id: 'u4m-4.6-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is contractionary monetary policy?', back: 'Actions by the central bank to decrease the money supply and raise interest rates: selling bonds, raising reserve requirements, or raising the discount rate. Used to combat inflation.' },
  { id: 'u4m-4.6-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What are the three tools of monetary policy?', back: '1) Open Market Operations (buying/selling bonds), 2) Reserve Requirements (changing the RRR), 3) Discount Rate (interest rate on loans to banks). Open market operations are used most frequently.' },
  { id: 'u4m-4.6-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show expansionary monetary policy on a money market graph?', back: 'Shift the money supply curve to the right. This lowers the equilibrium interest rate, which increases investment and aggregate demand.', backImage: `${FLIPPABLE_BASE_URL}money_supply_increase.jpg` },
  { id: 'u4m-4.6-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw the ample reserves graph with correct labels.', back: 'Shift the money supply curve to the right. This lowers the equilibrium interest rate, which increases investment and aggregate demand.', backImage: `${FLIPPABLE_BASE_URL}ample_reserves.jpg` },
  { id: 'u4m-4.6-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the ample reserves graph when the central bank decreases the Discount Rate and IOR rate.', back: '', backImage: `${FLIPPABLE_BASE_URL}ample_expansionary.jpg` },
  { id: 'u4m-4.6-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of contractionary monetary policy on the ample reserves graph.', back: 'Shift the Discount Rate and IOR up.', backImage: `${FLIPPABLE_BASE_URL}ample_contractionary.jpg` },
];

const lesson4_7: UnitFlashcardData[] = [
  ...termsToListCards(unit4MacroTermsByLesson['4.7'] ?? [], 'u4m-4.7'),
  { id: 'u4m-4.7-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the loanable funds market?', back: 'The market where savers supply funds and borrowers demand funds. The price is the real interest rate, which balances saving and investment.' },
  { id: 'u4m-4.7-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What causes the supply of loanable funds to increase?', back: 'Higher savings (due to higher income, lower consumption, or government budget surpluses), or capital inflows from foreign investors seeking higher returns.' },
  { id: 'u4m-4.7-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What causes the demand for loanable funds to increase?', back: 'Higher investment demand (due to business confidence, technological advances, or lower taxes on investment), or government budget deficits that require borrowing.' },
  { id: 'u4m-4.7-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'How do you show the impcact of government deficit spending on a loanable funds graph?', back: 'Shift the demand for loanable funds curve to the right. This increases the real interest rate and the quantity of loanable funds, crowding out some private investment.', backImage: `${FLIPPABLE_BASE_URL}lf_demand_increase.jpg` },
  { id: 'u4m-4.7-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show what happens on the loanable funds graph when the actual RIR is lower than the equilibrium RIR.', back: 'Show a shortage of loanable funds, with QD > QS at a rate below equilibrium.', backImage: `${FLIPPABLE_BASE_URL}lf_graph_shortage.jpg` },
  { id: 'u4m-4.7-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of political instability on the loanable funds graph.', back: 'Shift the supply of loanable funds to the left. This increases the real interest rate.', backImage: `${FLIPPABLE_BASE_URL}lf_supply_decrease.jpg` },
];

/** Unit 4 Macro: lessonId → flashcard array. */
export const macroUnit4Flashcards: Record<string, UnitFlashcardData[]> = {
  '4.1': lesson4_1,
  '4.2': lesson4_2,
  '4.3': lesson4_3,
  '4.4': lesson4_4,
  '4.5': lesson4_5,
  '4.6': lesson4_6,
  '4.7': lesson4_7,
};

// —— Unit 5 Macro: terms + rapid-fire + graph where applicable ——
const lesson5_1: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.1'] ?? [], 'u5m-5.1'),
  { id: 'u5m-5.1-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is expansionary fiscal policy?', back: 'Increase government spending (G↑) or decrease taxes (T↓) to increase aggregate demand and combat recession.' },
  { id: 'u5m-5.1-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is expansionary monetary policy?', back: 'Buy bonds, decrease discount rate, or decrease required reserve ratio to increase money supply, lower interest rates, and increase aggregate demand.' },
  { id: 'u5m-5.1-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What happens when expansionary fiscal and contractionary monetary policy are used together?', back: 'Real output effect is indeterminate (fiscal increases AD, monetary decreases AD), but real interest rates increase (both policies push rates up).' },
];

const lesson5_2: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.2'] ?? [], 'u5m-5.2'),
  { id: 'u5m-5.2-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What does the Short-Run Phillips Curve (SRPC) show?', back: 'A downward-sloping curve showing a trade-off between inflation and unemployment in the short run. Lower unemployment is associated with higher inflation.' },
  { id: 'u5m-5.2-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What does the Long-Run Phillips Curve (LRPC) show?', back: 'A vertical line at the natural rate of unemployment. In the long run, there is no trade-off between inflation and unemployment.' },
  { id: 'u5m-5.2-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of expansionary fiscal policy on the short run Phillips curve.', back: 'Expansionary fiscal policy increases aggregate demand, reducing unemployment and raising inflation. On the SRPC graph, the economy moves up and to the left along the curve: unemployment falls and inflation rises.', backImage: `${FLIPPABLE_BASE_URL}srpc_downward_move.jpg` },
  { id: 'u5m-5.2-g2', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of an increase in inflationary expectations on the SRPC.', back: 'Higher inflationary expectations shift the SRPC upward (or rightward). At any given unemployment rate, inflation is now higher. The short-run trade-off worsens—wage and price setters build expected inflation into their decisions.', backImage: `${FLIPPABLE_BASE_URL}srpc_right_shift.jpg` },
  { id: 'u5m-5.2-g3', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of increased labor productivity on the SRPC.', back: 'Increased labor productivity shifts SRAS right, reducing cost-push pressure. On the SRPC, this can be shown as a favorable shift: at a given unemployment rate, inflation is lower, or the curve shifts inward. Lower unit labor costs improve the inflation-unemployment trade-off in the short run.', backImage: `${FLIPPABLE_BASE_URL}srpc_left_shift.jpg` },
  { id: 'u5m-5.2-g4', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw the LRPC and SRPC for a country currently in long-run equilibrium.', back: 'SRPC and LRPC intersect at the natural rate of unemployment. Actual inflation equals expected inflation; the economy is at potential output with no output gap.', backImage: `${FLIPPABLE_BASE_URL}phillips_equilibrium.jpg` },
  { id: 'u5m-5.2-g5', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw the LRPC and SRPC for an economy with actual output less than potential output.', back: 'The economy is to the right of the LRPC on the SRPC: unemployment above the natural rate, inflation below expected. This is a recessionary gap; the SRPC will eventually shift down as expectations adjust.', backImage: `${FLIPPABLE_BASE_URL}srpc_recessionary_gap.jpg` },
];

const lesson5_3: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.3'] ?? [], 'u5m-5.3'),
  { id: 'u5m-5.3-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the relationship between money growth and inflation?', back: 'In the long run, sustained increases in the money supply lead to inflation. The quantity theory of money states that MV = PY, so if money supply (M) grows faster than real output (Y), prices (P) must rise.' },
  { id: 'u5m-5.3-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is the classical dichotomy?', back: 'The separation of real and nominal variables. In the long run, money supply affects only nominal variables (prices, nominal GDP) and not real variables (real GDP, unemployment).' },
  { id: 'u5m-5.3-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw an AD-AS graph that shows the long-run impact of a large increase in the money supply', back: 'AD increases in the short run as a result of the expansionary policy. Eventually SRAS decreases as the economy self-adjusts, and in the long-run output remains unchanged while price level increases', backImage: `${FLIPPABLE_BASE_URL}adas_self_adjust_expansionary.jpg` },
];

const lesson5_4: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.4'] ?? [], 'u5m-5.4'),
  { id: 'u5m-5.4-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the difference between a budget deficit and the national debt?', back: 'A budget deficit is the annual shortfall when government spending exceeds tax revenue. The national debt is the cumulative total of all past deficits minus surpluses.' },
  { id: 'u5m-5.4-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What are the consequences of large government deficits?', back: 'Increased borrowing raises real interest rates, which can crowd out private investment. Large debt can also create concerns about future tax increases or inflation.' },
  { id: 'u5m-5.4-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of a regular budget surpluses on the loanable funds graph.', back: 'Plot national debt on the vertical axis and time on the horizontal axis. Each year with a deficit adds to the debt, so the debt line slopes upward. Surpluses would reduce the slope or decrease the debt. Label deficits and surpluses.', backImage: `${FLIPPABLE_BASE_URL}lf_supply_increase.jpg` },
];

const lesson5_5: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.5'] ?? [], 'u5m-5.5'),
  { id: 'u5m-5.5-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is crowding out?', back: 'When government borrowing increases the demand for loanable funds, raising real interest rates and reducing private investment spending.' },
  { id: 'u5m-5.5-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How do you show crowding out on a loanable funds graph?', back: 'Government deficit shifts demand for loanable funds right, increasing real interest rate. The higher rate reduces private investment (movement along the demand curve).' },
  { id: 'u5m-5.5-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw crowding out on a loanable funds market graph.', back: 'Real interest rate on vertical axis, quantity of loanable funds on horizontal axis. Supply slopes up, demand (private + government) slopes down. Show demand shifting right due to government deficit: new equilibrium has higher real interest rate and higher quantity, but private investment is lower (crowded out) than before.', backImage: `${FLIPPABLE_BASE_URL}lf_demand_increase.jpg` },
];

const lesson5_6: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.6'] ?? [], 'u5m-5.6'),
  { id: 'u5m-5.6-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What factors cause economic growth?', back: 'Increases in quantity/quality of resources (labor, capital, natural resources), technological advancement, and improvements in institutions that promote productivity.' },
  { id: 'u5m-5.6-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How do you show economic growth on an AD-AS graph?', back: 'Shift the LRAS curve to the right. This represents an increase in potential output, allowing the economy to produce more goods and services at full employment.' },
];

const lesson5_7: UnitFlashcardData[] = [
  ...termsToListCards(unit5MacroTermsByLesson['5.7'] ?? [], 'u5m-5.7'),
  { id: 'u5m-5.7-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What public policies promote economic growth?', back: 'Investment in education and human capital, infrastructure spending, research and development incentives, protection of property rights, and policies that encourage saving and investment.' },
  { id: 'u5m-5.7-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How do tax incentives affect economic growth?', back: 'Tax breaks for investment, R&D, or education can encourage activities that increase productivity and shift LRAS right, promoting long-run economic growth.' },
  { id: 'u5m-5.7-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show how an increase in private investment affects the loanable funds market and LRAS.', back: 'In loanable funds: demand for loanable funds could shift right (more investment demand) or supply could shift right (saving incentives). In AD-AS: over time, more investment in capital and R&D shifts LRAS right, increasing potential output.', backImage: `${FLIPPABLE_BASE_URL}lf_demand_increase.jpg` },
];

// —— Unit 6 Macro: terms + rapid-fire + graph where applicable ——
const lesson6_1: UnitFlashcardData[] = [
  ...termsToListCards(unit6MacroTermsByLesson['6.1'] ?? [], 'u6m-6.1'),
  { id: 'u6m-6.1-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the balance of payments?', back: 'A record of all economic transactions between a country and the rest of the world, including the current account (goods, services, income) and financial account (capital flows).' },
  { id: 'u6m-6.1-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What is the current account?', back: 'Records trade in goods and services, net income from abroad, and net transfers. A current account deficit means a country imports more than it exports.' },
];

const lesson6_2: UnitFlashcardData[] = [
  ...termsToListCards(unit6MacroTermsByLesson['6.2'] ?? [], 'u6m-6.2'),
  { id: 'u6m-6.2-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is an exchange rate?', back: 'The price of one currency in terms of another currency. For example, if 1 USD = 0.85 EUR, the exchange rate is 0.85 EUR per USD.' },
  { id: 'u6m-6.2-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What does it mean when a currency appreciates?', back: 'The currency becomes more valuable relative to other currencies. It takes fewer units of the appreciating currency to buy one unit of another currency.' },
  { id: 'u6m-6.2-rf3', type: 'rapid-fire', tag: 'RULE', front: 'What does it mean when a currency depreciates?', back: 'The currency becomes less valuable relative to other currencies. It takes more units of the depreciating currency to buy one unit of another currency.' },
  { id: 'u6m-6.2-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Draw the forex market for USD and CAD.', back: 'Graph with quantity of USD on the horizontal axis and exchange rate (CAD per USD, or price of USD) on the vertical axis. Supply of USD (from Americans supplying USD to buy Canadian goods and assets) slopes up; demand for USD (from Canadians demanding USD to buy US goods and assets) slopes down. Equilibrium determines the USD/CAD exchange rate.', backImage: `${FLIPPABLE_BASE_URL}forex_market.jpg` },
];

const lesson6_3: UnitFlashcardData[] = [
  ...termsToListCards(unit6MacroTermsByLesson['6.3'] ?? [], 'u6m-6.3'),
  { id: 'u6m-6.3-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What causes a currency to appreciate in the foreign exchange market?', back: 'Increased demand for the currency (due to higher interest rates, stronger economy, or capital inflows) or decreased supply of the currency.' },
  { id: 'u6m-6.3-rf2', type: 'rapid-fire', tag: 'RULE', front: 'What causes a currency to depreciate in the foreign exchange market?', back: 'Decreased demand for the currency (due to lower interest rates, weaker economy, or capital outflows) or increased supply of the currency.' },
];

const lesson6_4: UnitFlashcardData[] = [
  ...termsToListCards(unit6MacroTermsByLesson['6.4'] ?? [], 'u6m-6.4'),
  { id: 'u6m-6.4-rf1', type: 'rapid-fire', tag: 'RULE', front: 'How does expansionary monetary policy affect the exchange rate?', back: 'Lower interest rates reduce demand for the currency (capital outflows), causing the currency to depreciate. This makes exports cheaper and imports more expensive.' },
  { id: 'u6m-6.4-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How does expansionary fiscal policy affect the exchange rate?', back: 'Higher interest rates (from increased borrowing) increase demand for the currency (capital inflows), causing the currency to appreciate. This makes exports more expensive and imports cheaper.' },
  { id: 'u6m-6.4-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show expansionary monetary policy on a forex market graph (domestic currency).', back: 'Lower interest rates reduce demand for the domestic currency (capital flows abroad). Demand for domestic currency shifts left; the exchange rate falls (domestic currency depreciates).', backImage: `${FLIPPABLE_BASE_URL}forex_demand_decrease.jpg` },
  { id: 'u6m-6.4-g2', type: 'rapid-fire', tag: 'GRAPH', front: 'Show expansionary fiscal policy on a forex market graph (domestic currency).', back: 'Higher interest rates (from government borrowing) increase demand for the domestic currency. Demand shifts right; the exchange rate rises (domestic currency appreciates).', backImage: `${FLIPPABLE_BASE_URL}forex_demand_increase.jpg` },
];

const lesson6_5: UnitFlashcardData[] = [
  ...termsToListCards(unit6MacroTermsByLesson['6.5'] ?? [], 'u6m-6.5'),
  { id: 'u6m-6.5-rf1', type: 'rapid-fire', tag: 'RULE', front: 'How does currency depreciation affect net exports?', back: 'Currency depreciation makes exports cheaper for foreigners and imports more expensive for domestic consumers, increasing net exports (X - M).' },
  { id: 'u6m-6.5-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How does currency appreciation affect net exports?', back: 'Currency appreciation makes exports more expensive for foreigners and imports cheaper for domestic consumers, decreasing net exports (X - M).' },
];

const lesson6_6: UnitFlashcardData[] = [
  ...termsToListCards(unit6MacroTermsByLesson['6.6'] ?? [], 'u6m-6.6'),
  { id: 'u6m-6.6-rf1', type: 'rapid-fire', tag: 'RULE', front: 'What is the relationship between real interest rates and international capital flows?', back: 'Higher real interest rates in a country attract foreign capital (capital inflows), increasing demand for that country\'s currency and causing it to appreciate.' },
  { id: 'u6m-6.6-rf2', type: 'rapid-fire', tag: 'RULE', front: 'How do capital flows affect exchange rates?', back: 'Capital inflows (foreigners buying domestic assets) increase demand for the domestic currency, causing appreciation. Capital outflows decrease demand, causing depreciation.' },
  { id: 'u6m-6.6-g1', type: 'rapid-fire', tag: 'GRAPH', front: 'Show the impact of an increase in interest rates on the value of the YEN relative to the EURO.', back: 'Higher interest rates in Japan attract capital inflows into Japan, increasing demand for the yen. In the market for yen (e.g. EUR/JPY), demand for yen shifts right, causing the yen to appreciate relative to the euro. The euro depreciates relative to the yen.', backImage: `${FLIPPABLE_BASE_URL}forex_market_shifts.jpg` },
];

/** Unit 5 Macro: lessonId → flashcard array. */
export const macroUnit5Flashcards: Record<string, UnitFlashcardData[]> = {
  '5.1': lesson5_1,
  '5.2': lesson5_2,
  '5.3': lesson5_3,
  '5.4': lesson5_4,
  '5.5': lesson5_5,
  '5.6': lesson5_6,
  '5.7': lesson5_7,
};

/** Unit 6 Macro: lessonId → flashcard array. */
export const macroUnit6Flashcards: Record<string, UnitFlashcardData[]> = {
  '6.1': lesson6_1,
  '6.2': lesson6_2,
  '6.3': lesson6_3,
  '6.4': lesson6_4,
  '6.5': lesson6_5,
  '6.6': lesson6_6,
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
  if (subject === 'macro' && unit === 3) {
    return macroUnit3Flashcards[lessonId] ?? [];
  }
  if (subject === 'macro' && unit === 4) {
    return macroUnit4Flashcards[lessonId] ?? [];
  }
  if (subject === 'macro' && unit === 5) {
    return macroUnit5Flashcards[lessonId] ?? [];
  }
  if (subject === 'macro' && unit === 6) {
    return macroUnit6Flashcards[lessonId] ?? [];
  }
  return [];
}
