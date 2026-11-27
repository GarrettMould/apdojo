import type { TeachingGuide } from './types';

const GAS_STATION_MATRIX = {
  type: 'matrix' as const,
  rowPlayer: 'Station A',
  colPlayer: 'Station B',
  rowStrategies: ['High price', 'Low price'],
  colStrategies: ['High price', 'Low price'],
  // Daily profit. Low price is each station's dominant strategy; Low/Low is the Nash equilibrium.
  payoffs: [
    [
      [500, 500],
      [100, 700],
    ],
    [
      [700, 100],
      [300, 300],
    ],
  ] as [number, number][][],
  unit: '$',
};

/**
 * AP Micro 4.5, drafted from Garrett's own recorded explanation of game theory (Nov 27). The Nash
 * equilibrium section and the matrix numbers were added for the exam; the quotes are his.
 */
export const microGameTheory: TeachingGuide = {
  course: 'ap-microeconomics',
  slug: '4-5-oligopoly-and-game-theory',
  unit: 4,
  lesson: '4.5',
  lessonName: 'Oligopoly and Game Theory',
  title: 'Game theory: when your best move depends on theirs',
  intro:
    'In an oligopoly there are only a few big firms, so each one has to think about what the others will do. Game theory is the toolkit for that kind of decision, and once you see it, you’ll spot it everywhere from gas stations to coral reefs.',
  metaDescription:
    'AP Micro 4.5 explained by an AP teacher: dominant strategies, payoff matrices, and how to find the Nash equilibrium, with a gas station price war and practice questions.',
  updated: '2026-11-27',
  sections: [
    {
      id: 'interdependence',
      title: 'Your best choice depends on everyone else',
      blocks: [
        {
          type: 'p',
          text: 'Game theory is about situations with **interdependence**: what another player does changes what’s best for you. That’s exactly the situation in an **oligopoly**, where a handful of firms each have to guess how the others will respond.',
        },
        {
          type: 'quote',
          text: 'Say you wake up at seven every day and get stuck in traffic on the way to school, because everybody else is waking up at seven too. So you decide to wake up an hour early tomorrow. Is that a good decision? It totally depends on what everyone else does. If everybody has the same idea, you’re all stuck in the same traffic jam at six, and you lost an hour of sleep.',
        },
        {
          type: 'p',
          text: 'Rock, paper, scissors works the same way. Rock isn’t always the best choice. It depends entirely on what the other person plays.',
        },
      ],
    },
    {
      id: 'dominant-strategy',
      title: 'Dominant strategies',
      blocks: [
        {
          type: 'p',
          text: 'Sometimes one choice is best *no matter what* the other player does. That’s a **dominant strategy**.',
        },
        {
          type: 'quote',
          text: 'Imagine if the game was just rock, paper. It would be a very boring game, because you’d never play rock. It would always be your best choice to play paper. Both players choose paper, and we never have a winner.',
        },
        {
          type: 'p',
          text: 'In “rock, paper”, paper is a dominant strategy: whatever the other person does, paper is at least as good. A player with a dominant strategy doesn’t have to guess. They just play it.',
        },
      ],
    },
    {
      id: 'gas-stations',
      title: 'The gas station price war',
      blocks: [
        {
          type: 'p',
          text: 'Two gas stations sit across the street from each other. Each morning, each one chooses a high price or a low price. The matrix shows each station’s daily profit for every combination. In each cell, **Station A’s profit is listed first**.',
        },
        { ...GAS_STATION_MATRIX, caption: 'Daily profit for each pair of choices. In each cell, Station A’s profit is listed first and Station B’s second.' },
        {
          type: 'quote',
          text: 'If I’m gas station A and station B across the street sets a high price, my best move is a low price, because then I steal all the customers. Sure, I make less per customer, but I end up making more money. And if they set a low price? If I go high, they steal all my customers. If I go low, at least we’re splitting them. Either way, low price is my best move.',
        },
        {
          type: 'figures',
          label: 'Station A, checking each thing B might do:',
          items: [
            { value: '$700 > $500', label: 'If B goes high, A does better with a low price' },
            { value: '$300 > $100', label: 'If B goes low, A still does better with a low price' },
          ],
        },
        {
          type: 'p',
          text: 'So **low price is Station A’s dominant strategy**. The game is symmetric, so it’s Station B’s dominant strategy too.',
        },
      ],
    },
    {
      id: 'nash-equilibrium',
      title: 'Nash equilibrium: where the game ends up',
      blocks: [
        {
          type: 'p',
          text: 'A **Nash equilibrium** is an outcome where neither player can do better by changing *only their own* choice. Once you’re there, nobody wants to move. In the gas station game it’s **Low price, Low price**, with $300 each.',
        },
        { ...GAS_STATION_MATRIX, highlight: [1, 1] as [number, number], caption: 'The Nash equilibrium (bold): both stations choose a low price and earn $300 each.' },
        {
          type: 'p',
          text: 'Here’s the twist: **High, High** would give both stations $500, more than the $300 they actually get. But each one, acting in its own self-interest, cuts its price anyway, and they both end up worse off. Economists call this a **prisoner’s dilemma**.',
        },
        {
          type: 'quote',
          text: 'When you have two competing businesses, it’s usually a price war to some degree. So who’s that good for? It’s good for the customers, who benefit from the competition. It’s not good for the competing businesses.',
        },
        {
          type: 'callout',
          title: 'How to find the Nash equilibrium on the AP exam',
          text: 'Take one player at a time. For each choice the *other* player could make, mark that player’s best response (circle or underline the higher payoff). Then do the same for the second player. Any cell where **both** payoffs are marked is a Nash equilibrium. A game can have one, more than one, or none, and a player doesn’t need a dominant strategy for there to be one.',
        },
      ],
    },
    {
      id: 'beyond-economics',
      title: 'Game theory outside economics',
      blocks: [
        {
          type: 'p',
          text: 'The same logic explains a lot of behavior in nature. Two animals hunting alone can each catch something small. Working together, they can take down a much bigger animal and both eat more. Cooperation wins because it pays off for each animal individually, not just for the group.',
        },
        {
          type: 'p',
          text: 'Then there’s the **cleaner wrasse**, a small fish that swims into the mouths of big predator fish and cleans parasites from their gums, making itself an easy meal.',
        },
        {
          type: 'quote',
          text: 'The big fish doesn’t eat the small fish. Why not? By taking the quick meal, it ruins its reputation as a fish that can be trusted to get its mouth cleaned, and it’ll have a hard time getting rid of parasites in the future. A small meal versus a lifetime of parasite removal is not a good trade-off.',
        },
        {
          type: 'p',
          text: 'The cleaner fish plays fair too: it skips the big fish’s nutritious mucus and sticks to parasites, to protect its own reputation. When players meet **again and again**, cheating today costs you tomorrow, so cooperation can last. It’s the same reason firms that compete day after day sometimes avoid all-out price wars.',
        },
      ],
    },
  ],
  mistakes: [
    {
      said: '“The dominant strategy is the one with the biggest number in the matrix.”',
      fix: 'A dominant strategy is the best response to *every* choice the other player could make. Compare your payoffs one column (or row) at a time, not the single biggest cell.',
    },
    {
      said: '“The Nash equilibrium is the best outcome for both players.”',
      fix: 'It’s the outcome nobody wants to leave on their own, not the best one. In the gas station game both would prefer High, High ($500 each), but the equilibrium is Low, Low ($300 each).',
    },
    {
      said: '“Station A’s best choice depends on what Station B does.”',
      fix: 'Sometimes it does. But when a player has a dominant strategy, their best choice is the same whatever the other does. That’s what makes it dominant.',
    },
    {
      said: 'Reading the wrong number in a cell.',
      fix: 'The row player’s payoff is listed first and the column player’s second. When checking Station B’s best responses, only compare the second numbers.',
    },
  ],
  questions: [
    {
      figure: GAS_STATION_MATRIX,
      stem: 'The payoff matrix shows the daily profits of two gas stations, A and B, that each choose a high or a low price. The first number in each cell is Station A’s profit. What is Station A’s dominant strategy?',
      options: [
        'High price',
        'Low price',
        'Station A has no dominant strategy',
        'High price, but only if Station B also chooses a high price',
        'It depends on what Station B chooses',
      ],
      correct: 1,
      explanation:
        'If B goes high, A earns $700 with a low price vs $500 with a high price. If B goes low, A earns $300 with a low price vs $100 with a high price. Low price is better either way, so it’s dominant.',
    },
    {
      figure: GAS_STATION_MATRIX,
      stem: 'Based on the payoff matrix, what is the Nash equilibrium?',
      options: [
        'High price, High price, because both stations earn the most there',
        'Low price, Low price',
        'High price for A, Low price for B',
        'Low price for A, High price for B',
        'There is no Nash equilibrium',
      ],
      correct: 1,
      explanation:
        'Both stations play their dominant strategy, a low price. At Low, Low neither station can raise its profit by switching on its own (switching to high would drop it from $300 to $100).',
    },
    {
      figure: GAS_STATION_MATRIX,
      stem: 'Both stations would earn more at High price, High price than at the Nash equilibrium. Why don’t they end up there?',
      options: [
        'Each station earns more by lowering its price, whatever the other station does',
        'Customers are legally required to buy from the cheapest station',
        'High price, High price does not actually give both stations more profit',
        'The stations cannot see each other’s prices',
        'Low prices always maximize the stations’ combined profit',
      ],
      correct: 0,
      explanation:
        'From High, High, either station can jump from $500 to $700 by cutting its price. Each acts in its own self-interest, so both cut, and they land at Low, Low. That’s a prisoner’s dilemma.',
    },
    {
      stem: 'A strategy is a dominant strategy for a player if it',
      options: [
        'gives the player the best payoff no matter what the other player does',
        'gives the player the best payoff when the other player cooperates',
        'contains the single largest payoff in the matrix',
        'is the strategy both players choose at the same time',
        'gives both players a higher combined payoff',
      ],
      correct: 0,
      explanation:
        'Dominant means best against every possible choice by the other player. It has nothing to do with the biggest single number or with what’s best for both players together.',
    },
    {
      stem: 'Two competing firms are stuck in a price war like the gas station game. Who benefits most from the outcome?',
      options: [
        'Consumers, who pay lower prices',
        'Both firms, who earn their highest possible profits',
        'Whichever firm sets its price first',
        'Neither firms nor consumers',
        'The government, through higher tax revenue',
      ],
      correct: 0,
      explanation:
        'Competition pushes both firms to a low price. That’s worse for the firms ($300 instead of $500 each) but good for customers, who benefit from the lower prices.',
    },
  ],
};
