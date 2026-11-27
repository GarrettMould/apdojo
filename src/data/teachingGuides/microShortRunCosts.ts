import type { TeachingGuide } from './types';

/**
 * AP Micro 3.2, drafted from two Unit 3 tutoring sessions and approved by Garrett. Explanations and
 * examples are his; no student names or words are included.
 */
export const microShortRunCosts: TeachingGuide = {
  course: 'ap-microeconomics',
  slug: '3-2-short-run-production-costs',
  unit: 3,
  lesson: '3.2',
  lessonName: 'Short-Run Production Costs',
  title: 'Short-run costs: why marginal cost runs the show',
  intro:
    'In 3.1 we asked what happens to output when a firm adds workers. In 3.2 we flip it: if the firm makes more, what happens to the cost of each unit? We’ll use a pizza shop the whole way through.',
  metaDescription:
    'AP Micro 3.2 explained by an AP teacher: fixed vs variable costs, why AFC falls, why MC rises, and why MC crosses ATC and AVC at their minimums. With practice questions.',
  updated: '2026-11-25',
  sections: [
    {
      id: 'fixed-and-variable',
      title: 'Fixed costs and variable costs',
      blocks: [
        {
          type: 'p',
          text: 'A **fixed cost** doesn’t change with how much you produce. A **variable cost** does. The test for any cost: *if we make more pizza, do we have to pay more of it?*',
        },
        {
          type: 'table',
          headers: ['Fixed (same at 1 pizza or 100)', 'Variable (rises with every pizza)'],
          rows: [
            ['Rent on the kitchen space', 'Ingredients: dough, cheese, pepperoni'],
            ['Loan payments and interest', 'Wages for the chefs you hire'],
            ['Insurance', 'Electricity to run the ovens'],
            ['Ovens you’ve already bought (in the short run you only have so many)', ''],
          ],
        },
        {
          type: 'p',
          text: 'Add them together and you get total cost: `TC = TFC + TVC`. Because fixed cost never changes, the gap between the total cost curve and the total variable cost curve stays the same at every quantity. That gap *is* total fixed cost.',
        },
      ],
    },
    {
      id: 'average-fixed-cost',
      title: 'Average fixed cost always falls',
      blocks: [
        {
          type: 'p',
          text: 'Average just means total divided by how many you make: `AFC = TFC ÷ Q`. The number on top never changes, but Q keeps growing, so AFC gets smaller and smaller. It heads toward zero but never reaches it.',
        },
        {
          type: 'quote',
          text: 'Think about a gym membership. It costs the same whether you never go or go every day. If you go once, that was an expensive visit. If you go every day, each visit is cheap. Same with an oven: use it once and it’s a really expensive oven. Use it every day and it turns out not to be that expensive.',
        },
        {
          type: 'figures',
          label: 'If fixed costs are $2,000:',
          items: [
            { value: '$20', label: 'AFC at 100 pizzas ($2,000 ÷ 100)' },
            { value: '$10', label: 'AFC at 200 pizzas' },
            { value: '$5', label: 'AFC at 400 pizzas' },
          ],
        },
        {
          type: 'p',
          text: 'This is why, on the graph, the gap between **ATC** and **AVC** keeps shrinking. Since `ATC = AVC + AFC`, the vertical distance between them is average fixed cost, and AFC is always falling.',
        },
      ],
    },
    {
      id: 'marginal-cost',
      title: 'Why marginal cost rises',
      blocks: [
        {
          type: 'p',
          text: '**Marginal cost** is the cost of making the next pizza. It rises because of diminishing marginal returns from 3.1: each extra chef adds less pizza than the one before, but you pay them the same wage.',
        },
        {
          type: 'quote',
          text: 'If I pay you $20 an hour and you make 10 pizzas, I’m paying $2 of labor per pizza. If I hire more chefs at $20 an hour but they’re only making 5 pizzas an hour because they’re less productive, now each pizza has $4 of labor in it. It’s a more expensive pizza to make.',
        },
        {
          type: 'p',
          text: 'So the marginal cost curve is basically a flipped version of the marginal product curve. Marginal product goes up at first (chefs specialize), then down (too many chefs, not enough to do). Marginal cost goes down at first, then up, for the same reasons.',
        },
        {
          type: 'callout',
          title: 'How the AP exam asks it',
          text: 'They show you only the marginal product curve, point to its peak, and ask what happens to marginal *cost* if the firm keeps hiring. They never draw MC. You have to know it rises, because each new worker is less productive.',
        },
      ],
    },
    {
      id: 'marginal-average-rule',
      title: 'The marginal–average rule',
      blocks: [
        {
          type: 'p',
          text: 'This is the idea that trips up the most students, so slow down here. **Whether an average rises or falls depends on whether the marginal is above or below it, not on whether the marginal is rising.**',
        },
        {
          type: 'quote',
          text: 'Say your test average is a 90. You bomb the next test and get a 20, so your average drops to about an 81. Next test you get a 25. You improved! But 25 is still below your 81 average, so your average still goes down. Even a 79 pulls it down, just by less. As long as the next score is below the average, the average falls.',
        },
        {
          type: 'figures',
          label: 'How each new test score moves an 81 average:',
          items: [
            { value: '25', label: 'Below 81: average falls', tone: 'down' },
            { value: '79', label: 'Still below 81: average falls, just less', tone: 'down' },
            { value: '81', label: 'Equal: average stays put' },
            { value: '95', label: 'Above 81: average rises', tone: 'up' },
          ],
        },
        {
          type: 'p',
          text: 'Or picture an elevator where the average weight is 200 pounds. A 150-pound person walks on and the average drops. Someone who weighs exactly the average walks on and nothing changes. Someone heavier walks on and it rises. Cost curves work the same way:',
        },
        {
          type: 'table',
          headers: ['When MC is…', 'ATC (and AVC) will…'],
          rows: [
            ['below ATC', 'fall, even if MC is already rising'],
            ['equal to ATC', 'be at its minimum'],
            ['above ATC', 'rise'],
          ],
        },
        {
          type: 'p',
          text: 'That’s why **MC crosses both AVC and ATC at their lowest points.** The same rule works for marginal and average product in 3.1, and in other units too.',
        },
        { type: 'diagram', id: 'short-run-cost-curves' },
      ],
    },
  ],
  mistakes: [
    {
      said: '“Wages are a fixed cost, because the hourly rate doesn’t change.”',
      fix: 'The rate might stay the same, but to make more pizza you hire more chefs or pay for more hours. Total wages rise with output, so labor is a variable cost.',
    },
    {
      said: '“The gap between ATC and AVC is marginal cost.”',
      fix: 'MC is its own curve. The gap is the cost that isn’t on the graph: average fixed cost. That’s why it shrinks as Q rises.',
    },
    {
      said: '“MC is rising, so ATC must be rising too.”',
      fix: 'Look at the stretch right after MC’s lowest point: MC is climbing but ATC is still falling. What matters is whether MC is above or below ATC, not which way MC is moving.',
    },
    {
      said: '“To find average fixed cost, divide by the fixed cost.”',
      fix: 'Fixed cost divided by fixed cost is always 1. Average means per pizza: divide total fixed cost by the quantity produced.',
    },
  ],
  questions: [
    {
      stem: 'A pizza shop rents its kitchen and has already bought five ovens. Which of the following is a variable cost for the shop?',
      options: [
        'Monthly rent for the kitchen',
        'Fire insurance on the building',
        'Wages paid to chefs, who are paid by the hour',
        'Interest on the loan used to open the shop',
        'The cost of the five ovens',
      ],
      correct: 2,
      explanation:
        'Making more pizza means hiring more chefs or paying for more hours, so total wages rise with output. Rent, insurance, loan interest and ovens you already own cost the same at 1 pizza or 100.',
    },
    {
      stem: 'On a graph of a firm’s short-run cost curves, the vertical distance between the average total cost curve and the average variable cost curve at a given quantity represents',
      options: ['marginal cost', 'average fixed cost', 'total fixed cost', 'profit per unit', 'average variable cost'],
      correct: 1,
      explanation:
        'ATC = AVC + AFC, so the gap is AFC. It’s average, not total, because both curves are per unit. That’s why the gap shrinks as output rises.',
    },
    {
      stem: 'A firm is producing a quantity at which marginal cost is rising but is still below average total cost. If the firm increases output slightly, average total cost will',
      options: [
        'increase, because marginal cost is increasing',
        'decrease, because marginal cost is below average total cost',
        'stay the same, because marginal cost is rising at a constant rate',
        'increase, because average fixed cost is increasing',
        'be impossible to determine without knowing total fixed cost',
      ],
      correct: 1,
      explanation:
        'Whenever the marginal is below the average, it pulls the average down, even if the marginal is climbing. Like scoring a 79 when your average is 81: you improved, but your average still drops.',
    },
    {
      stem: 'A pizza shop has total fixed costs of $2,000 per month. What is its average fixed cost when it makes 100 pizzas, and when it makes 400 pizzas?',
      options: ['$20 and $5', '$20 and $20', '$2,000 and $2,000', '$1 and $1', '$20 and $80'],
      correct: 0,
      explanation:
        'AFC = TFC ÷ Q: $2,000 ÷ 100 = $20, and $2,000 ÷ 400 = $5. Total fixed cost stays at $2,000, but spread over more pizzas, each one carries less of it.',
    },
    {
      stem: 'A firm has hired workers up to the point where the marginal product of labor is at its maximum. If the firm keeps hiring workers at the same wage, what happens to its marginal cost, and why?',
      options: [
        'It falls, because workers can specialize',
        'It rises, because each additional worker adds less output',
        'It stays the same, because the wage does not change',
        'It falls, because average fixed cost is falling',
        'It rises, because average fixed cost is rising',
      ],
      correct: 1,
      explanation:
        'Past its peak, marginal product falls. Paying the same wage for less output means each extra unit costs more: $20 an hour for 10 pizzas is $2 a pizza, and $20 for 5 pizzas is $4. MC is the mirror image of MP.',
    },
  ],
};
