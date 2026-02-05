/**
 * Unit-level flashcard arrays for each subject/unit.
 * Each lesson gets: key terms (list) + graph questions (if applicable) + 3–5 rapid-fire questions.
 */

import { keyTerms as apMacroTerms } from './apMacroTerms';

/** Compatible with DrillDeepDive FlashcardData (back as string). */
export interface UnitFlashcardData {
  id: string;
  type: 'visual' | 'rapid-fire' | 'list';
  tag: string;
  front: string;
  back: string;
}

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

// —— 1.2 PPC: terms + graph + rapid-fire ——
const lesson1_2: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.2'] ?? [], 'u1m-1.2'),
  {
    id: 'u1m-1.2-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'What does a point inside the PPC represent?',
    back: 'Inefficiency (underutilization). The economy could produce more of both goods without giving up anything; resources are not fully used.',
  },
  {
    id: 'u1m-1.2-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'What does the bowed-out (concave) shape of the PPC indicate?',
    back: 'Increasing opportunity cost. Resources are not equally good at producing both goods; as you produce more of one good, you give up increasing amounts of the other.',
  },
  {
    id: 'u1m-1.2-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'What do points outside the PPC represent?',
    back: 'Unattainable combinations with current resources and technology. The economy would need growth (more resources or better tech) to reach them.',
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

// —— 1.4 Demand: terms + graph + rapid-fire ——
const lesson1_4: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.4'] ?? [], 'u1m-1.4'),
  {
    id: 'u1m-1.4-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Why does the demand curve slope downward?',
    back: 'The law of demand: as price rises, quantity demanded falls (inverse relationship). Substitution effect and income effect explain this.',
  },
  {
    id: 'u1m-1.4-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'What does a rightward shift of the demand curve represent?',
    back: 'An increase in demand at every price. Caused by non-price determinants: more buyers, higher income (normal good), preferences, price of substitutes up or complements down, expectations.',
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

// —— 1.5 Supply: terms + graph + rapid-fire ——
const lesson1_5: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.5'] ?? [], 'u1m-1.5'),
  {
    id: 'u1m-1.5-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Why does the supply curve slope upward?',
    back: 'The law of supply: as price rises, quantity supplied rises. Higher prices make it worthwhile to produce more (profit motive and opportunity cost).',
  },
  {
    id: 'u1m-1.5-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'What does a rightward shift of the supply curve represent?',
    back: 'An increase in supply at every price. Caused by lower input costs, better technology, more sellers, subsidies, or expectations of lower future prices.',
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

// —— 1.6 Equilibrium: terms + graph + rapid-fire ——
const lesson1_6: UnitFlashcardData[] = [
  ...termsToListCards(unit1MacroTermsByLesson['1.6'] ?? [], 'u1m-1.6'),
  {
    id: 'u1m-1.6-g1',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'Where does market equilibrium occur on a supply and demand graph?',
    back: 'At the intersection of the demand and supply curves. Quantity demanded equals quantity supplied; no shortage or surplus.',
  },
  {
    id: 'u1m-1.6-g2',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'If price is above equilibrium, what exists and what happens to price?',
    back: 'A surplus (excess supply): Qs > Qd. Sellers cannot sell all they want, so price tends to fall back toward equilibrium.',
  },
  {
    id: 'u1m-1.6-g3',
    type: 'rapid-fire',
    tag: 'GRAPH',
    front: 'If price is below equilibrium, what exists and what happens to price?',
    back: 'A shortage (excess demand): Qd > Qs. Buyers cannot buy all they want, so price tends to rise toward equilibrium.',
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

/** Unit 1 Macro: lessonId → flashcard array (terms + graph where applicable + rapid-fire). */
export const macroUnit1Flashcards: Record<string, UnitFlashcardData[]> = {
  '1.1': lesson1_1,
  '1.2': lesson1_2,
  '1.3': lesson1_3,
  '1.4': lesson1_4,
  '1.5': lesson1_5,
  '1.6': lesson1_6,
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
  // Add micro Unit 1, macro Unit 2, etc. later
  return [];
}
