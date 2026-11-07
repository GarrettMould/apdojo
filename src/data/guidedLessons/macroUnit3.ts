import type { GuidedLessonContent } from './types';

/** AP Macro Unit 3: National Income and Price Determination. Pilot unit — draft for review. */
export const macroUnit3GuidedLessons: GuidedLessonContent[] = [
  {
    lessonId: '3.1',
    unit: 3,
    slug: 'aggregate-demand',
    brief:
      'Aggregate demand (AD) is the total demand for all goods and services in an economy: consumption, investment, government spending and net exports (AD = C + I + G + Xn). The AD curve shows how much real GDP is demanded at each price level, and it slopes downward. When the price level falls, the quantity of real GDP demanded rises.\n\n' +
      'This is not the same reason a single product’s demand curve slopes down. There are three economy-wide reasons. The real wealth effect: lower prices make the money people hold worth more, so they spend more. The interest rate effect: lower prices mean people need less money for purchases and save more, which lowers interest rates and encourages investment. The net export effect: lower domestic prices make our goods cheaper than foreign goods, so net exports rise.\n\n' +
      'Keep one distinction clear. A change in the price level moves the economy along the AD curve. A change in C, I, G or Xn for any other reason, like a stock market crash or a tax cut, shifts the whole curve.',
    coreQuestion:
      'Suppose the price level falls. Explain why the quantity of real GDP demanded increases.',
    rubric: [
      {
        id: 'inverse',
        criterion:
          'States that a lower price level leads to a greater quantity of real GDP demanded (a movement along a downward-sloping AD curve).',
      },
      {
        id: 'mechanism',
        criterion:
          'Correctly explains at least one effect with its mechanism: real wealth effect (money buys more, so consumption rises), interest rate effect (lower interest rates, so investment rises), or net export effect (domestic goods become relatively cheaper, so net exports rise).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'A lower price level moves the economy down along the AD curve to a larger quantity of real GDP demanded. Through the real wealth effect, the money people hold buys more, so they feel wealthier and consume more. Lower prices also lower interest rates, which raises investment, and make domestic goods cheaper than foreign goods, which raises net exports.',
    walkthrough: [
      {
        kicker: 'The big idea',
        title: 'AD slopes down: a lower price level means more real GDP demanded',
        boards: ['Aggregate Demand 10'],
        terms: ['Aggregate Demand (AD)', 'Inverse Relationship between Price Level and AD'],
      },
      {
        kicker: 'Why it slopes down · reason 1',
        title: 'Real wealth effect',
        boards: ['Aggregate Demand 12'],
        terms: ['Real Wealth Effect'],
      },
      {
        kicker: 'Why it slopes down · reason 2',
        title: 'Interest rate effect',
        boards: ['Aggregate Demand 13'],
        terms: ['Interest Rate Effect'],
      },
      {
        kicker: 'Why it slopes down · reason 3',
        title: 'Net export effect',
        boards: ['Aggregate Demand 14'],
        terms: ['Net Export Effect'],
      },
      {
        kicker: 'Moving vs. shifting',
        title: 'Anything other than the price level shifts the whole curve',
        boards: [],
        terms: ['Shifters of Aggregate Demand'],
        note: 'A change in the price level moves along AD. A change in C, I, G or Xn for any other reason, like a stock market crash or a tax cut, shifts the entire curve.',
      },
    ],
    checkQuestionIds: [3084, 3132, 3080],
  },
  {
    lessonId: '3.2',
    unit: 3,
    slug: 'multipliers',
    brief:
      'When someone receives extra income, they spend part of it and save the rest. The marginal propensity to consume (MPC) is the fraction spent, and the marginal propensity to save (MPS) is the fraction saved. Because every extra dollar is either spent or saved, MPC + MPS = 1.\n\n' +
      'Spending ripples through the economy. If the government spends $20 billion, that money becomes income for someone else, who spends part of it, which becomes income for someone else again. This is the multiplier effect. The spending multiplier is 1 / MPS, and the maximum change in real GDP is the multiplier times the initial change in spending. A higher MPC means more is re-spent each round, so the multiplier is larger.\n\n' +
      'Taxes work through the same ripple, with one difference. A tax cut is income people receive, not spending, so part of it is saved before the first round of spending. That makes the tax multiplier smaller: −MPC / MPS, which is one less than the spending multiplier and negative, because higher taxes lower GDP.',
    coreQuestion:
      'The government increases spending by $100 billion. Explain why real GDP can rise by more than $100 billion, and how a larger MPC changes the size of that increase.',
    rubric: [
      {
        id: 'ripple',
        criterion:
          'Explains that the initial spending becomes income for others, who spend part of it (based on the MPC), creating further rounds of spending, so the total increase in GDP is larger than the initial spending (the multiplier effect).',
      },
      {
        id: 'mpc',
        criterion:
          'States that a larger MPC (smaller MPS) makes the multiplier larger (spending multiplier = 1/MPS), so real GDP increases by more.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The $100 billion becomes income for workers and businesses, who spend a fraction of it equal to the MPC. That spending becomes someone else’s income, and the process repeats, so total GDP rises by a multiple of the initial spending. A larger MPC means more is re-spent in each round and less is saved, so the spending multiplier (1/MPS) is bigger and real GDP rises by more.',
    walkthrough: [
      {
        kicker: 'The building blocks',
        title: 'Extra income is either spent or saved',
        boards: ['Multipliers 14', 'Multipliers 16'],
        terms: ['Marginal Propensity to Consume (MPC)', 'Marginal Propensity to Save (MPS)'],
      },
      {
        kicker: 'The building blocks',
        title: 'MPC + MPS = 1',
        boards: ['Multipliers 17'],
        terms: [],
        note: 'Every extra dollar is either spent or saved, so if the MPC is 0.8, the MPS must be 0.2.',
      },
      {
        kicker: 'The spending multiplier',
        title: 'A dollar of new spending creates more than a dollar of GDP',
        boards: ['Multipliers 19'],
        terms: ['Multiplier Effect', 'Spending Multiplier', 'Calculating Maximum GDP Change'],
      },
      {
        kicker: 'The tax multiplier',
        title: 'Part of a tax change is saved before it is spent',
        boards: ['Multipliers 26', 'Multipliers 27'],
        terms: ['Tax Multiplier'],
      },
      {
        kicker: 'The tax multiplier',
        title: 'One less than the spending multiplier, and negative',
        boards: ['Multipliers 24', 'Multipliers 5'],
        terms: [],
        note: 'With an MPC of 0.8, the spending multiplier is 5 and the tax multiplier is −4. Lower taxes raise GDP; higher taxes lower it.',
      },
    ],
    checkQuestionIds: [324, 3075, 325],
  },
  {
    lessonId: '3.3',
    unit: 3,
    slug: 'short-run-aggregate-supply',
    brief:
      'Short-run aggregate supply (SRAS) shows how much output firms produce at each price level in the short run. It slopes upward: a higher price level leads to more output.\n\n' +
      'The reason is sticky wages. Many wages and other input prices are set by contracts and do not change quickly. If the price level rises while wages stay the same, each unit firms sell is more profitable, so they produce more. If the price level falls, the opposite happens.\n\n' +
      'A change in the price level moves the economy along the SRAS curve. Anything that changes the cost of production across the whole economy shifts it. Higher nationwide wages or resource prices, higher business taxes, and expectations of higher future prices raise costs and shift SRAS to the left. Subsidies, lower input prices and better technology lower costs and shift SRAS to the right.',
    coreQuestion:
      'Explain why the SRAS curve slopes upward, and describe one event that would shift SRAS to the left.',
    rubric: [
      {
        id: 'sticky',
        criterion:
          'Explains the upward slope using sticky wages or input prices: when the price level rises but wages/input costs stay fixed in the short run, production becomes more profitable, so firms increase output.',
      },
      {
        id: 'shifter',
        criterion:
          'Names a valid leftward shifter of SRAS that raises economy-wide production costs (e.g. higher nationwide wages, higher resource or energy prices, higher business taxes, lower productivity, expectations of a higher future price level, a negative supply shock).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'In the short run, wages and other input prices are sticky because they are often fixed by contracts. When the price level rises, firms receive higher prices for their output while their costs stay the same, so producing more becomes profitable and output rises. A sharp increase in energy prices raises production costs across the economy, which shifts SRAS to the left.',
    walkthrough: [
      {
        kicker: 'The shape',
        title: 'A higher price level means more output in the short run',
        boards: ['SRAS 9'],
        terms: ['Short-Run Aggregate Supply (SRAS)'],
      },
      {
        kicker: 'Why it slopes up',
        title: 'Sticky wages',
        boards: ['sticky_wages'],
        terms: ['Sticky Wages'],
        note: 'If the price level rises while wages are locked in, each unit sold is more profitable, so firms produce more.',
      },
      {
        kicker: 'Moving vs. shifting',
        title: 'The price level moves you along SRAS; costs shift it',
        boards: ['mvmt'],
        terms: ['Shifters of SRAS'],
      },
      {
        kicker: 'What shifts SRAS left',
        title: 'Higher resource prices and higher taxes',
        boards: ['SRAS 18', 'SRAS 20'],
        terms: [],
      },
      {
        kicker: 'What shifts SRAS right',
        title: 'Subsidies and better technology',
        boards: ['SRAS 21', 'SRAS 22'],
        terms: [],
      },
      {
        kicker: 'What shifts SRAS left',
        title: 'Expectations of higher prices',
        boards: ['SRAS 24'],
        terms: [],
        note: 'If producers and workers expect prices to rise, they push for higher wages and prices now. Costs rise and SRAS shifts left.',
      },
    ],
    checkQuestionIds: [3138, 3081, 320],
  },
  {
    lessonId: '3.4',
    unit: 3,
    slug: 'long-run-aggregate-supply',
    brief:
      'Long-run aggregate supply (LRAS) shows the economy’s potential output: what it can produce when all resources are used efficiently. That level is called full-employment output (Yf). The LRAS curve is vertical at Yf.\n\n' +
      'It is vertical because, in the long run, wages and other input prices have time to fully adjust to the price level. Once they do, a higher or lower price level does not change how much the economy can produce. Output depends on real resources, not prices. LRAS is the same idea as a point on the production possibilities curve: the economy’s capacity.\n\n' +
      'That capacity comes from the factors of production: land (natural resources), labor, capital and technology. More or better factors shift LRAS to the right, for example a larger capital stock, more human capital through education and training, new natural resources, or better technology. Losing them, through a natural disaster or a shrinking workforce, shifts LRAS to the left.',
    coreQuestion:
      'Why is the LRAS curve vertical at full-employment output, and what would shift it to the right?',
    rubric: [
      {
        id: 'vertical',
        criterion:
          'Explains that in the long run output depends on the economy’s resources and technology, not the price level (input prices fully adjust), so potential output is the same at every price level.',
      },
      {
        id: 'shifter',
        criterion:
          'Names an increase in the quantity or quality of a factor of production (natural resources, labor, capital stock, human capital, or technology) as a cause of a rightward LRAS shift.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'In the long run, wages and input prices fully adjust to the price level, so the amount the economy can produce depends only on its land, labor, capital and technology. A different price level does not change that capacity, so LRAS is vertical at full-employment output. An increase in the capital stock, such as new machinery and infrastructure, would shift LRAS to the right.',
    walkthrough: [
      {
        kicker: 'The shape',
        title: 'Different price level, same output',
        boards: ['LRAS 9', 'LRAS 12'],
        terms: ['Long-Run Aggregate Supply (LRAS)', 'Full-Employment Output (Yf)'],
      },
      {
        kicker: 'The anchor',
        title: 'In the long run, the economy finds its way back to Yf',
        boards: ['LRAS 13'],
        terms: [],
        note: 'Short-run equilibrium can move away from full-employment output, but LRAS is where the economy settles in the long run.',
      },
      {
        kicker: 'What it depends on',
        title: 'Land, labor, capital and technology',
        boards: ['LRAS 2', 'LRAS 3'],
        terms: ['Factors of Production', 'Shifters of LRAS'],
      },
      {
        kicker: 'What shifts LRAS right',
        title: 'More capital and more human capital',
        boards: ['LRAS 17', 'LRAS 18'],
        terms: [],
      },
      {
        kicker: 'What shifts LRAS right',
        title: 'More natural resources',
        boards: ['LRAS 19'],
        terms: [],
      },
      {
        kicker: 'What shifts LRAS left',
        title: 'Losing productive capacity',
        boards: ['LRAS 22'],
        terms: [],
        note: 'Natural disasters, war or a shrinking workforce destroy resources and shift LRAS to the left.',
      },
    ],
    checkQuestionIds: [321, 3085, 160],
  },
  {
    lessonId: '3.5',
    unit: 3,
    slug: 'ad-as-equilibrium',
    brief:
      'The AD-AS model puts aggregate demand, short-run aggregate supply and long-run aggregate supply on one graph, with the price level on the vertical axis and real GDP on the horizontal axis.\n\n' +
      'Short-run equilibrium is where AD crosses SRAS. The economy is always in short-run equilibrium. Long-run equilibrium is the special case where AD, SRAS and LRAS all cross at the same point, so the economy is producing exactly its full-employment output.\n\n' +
      'When short-run equilibrium is not at full-employment output, there is an output gap. If it is to the left of LRAS, output is below potential: a recessionary gap, with unemployment above the natural rate. If it is to the right of LRAS, output is above potential: an inflationary gap, with unemployment below the natural rate. Output and unemployment move in opposite directions.',
    coreQuestion:
      'An economy’s short-run equilibrium is to the left of its LRAS curve. What kind of output gap is this, and what does it mean for unemployment?',
    rubric: [
      {
        id: 'gap',
        criterion:
          'Identifies a recessionary gap, with actual (short-run equilibrium) output below full-employment/potential output.',
      },
      {
        id: 'unemployment',
        criterion:
          'States that unemployment is above the natural rate of unemployment (there is cyclical unemployment).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Short-run equilibrium to the left of LRAS means actual output is below full-employment output, which is a recessionary gap. Because the economy is producing less than it can, unemployment is above the natural rate, so there is cyclical unemployment.',
    walkthrough: [
      {
        kicker: 'The model',
        title: 'Three curves on one graph',
        boards: ['Equilibrium  5'],
        terms: [],
        note: 'AD, SRAS and LRAS share the same axes: price level on the vertical axis and real GDP on the horizontal axis.',
      },
      {
        kicker: 'Short run',
        title: 'Where AD meets SRAS',
        boards: ['Equilibrium  6'],
        terms: ['Short-Run Equilibrium'],
      },
      {
        kicker: 'Long run',
        title: 'All three curves meet at full-employment output',
        boards: ['Equilibrium  7'],
        terms: ['Long-Run Equilibrium'],
      },
      {
        kicker: 'Output gaps',
        title: 'Below or above full-employment output',
        boards: ['Equilibrium  10', 'Equilibrium  12'],
        terms: ['Recessionary Gap', 'Inflationary Gap'],
      },
      {
        kicker: 'Gaps and jobs',
        title: 'More output, less unemployment',
        boards: ['Equilibrium  2'],
        terms: [],
        note: 'In a recessionary gap, unemployment is above the natural rate. In an inflationary gap, it is below the natural rate.',
      },
    ],
    checkQuestionIds: [322, 29, 3086],
  },
  {
    lessonId: '3.6',
    unit: 3,
    slug: 'changes-ad-as-short-run',
    brief:
      'In the short run, a shift in AD or SRAS moves the economy to a new equilibrium, and you can read what happens to the price level, real GDP and unemployment straight off the graph.\n\n' +
      'When AD increases, the price level rises and real GDP rises, so unemployment falls. A rise in the price level caused by higher AD is demand-pull inflation: too much spending chasing too few goods.\n\n' +
      'When SRAS decreases, the price level rises but real GDP falls, so unemployment rises. A rise in the price level caused by higher production costs is cost-push inflation. A sudden event that raises costs across the economy, like the oil price spikes of the 1970s, is a negative supply shock, and it can cause stagflation: higher prices and higher unemployment at the same time.\n\n' +
      'A positive supply shock, like a major technological breakthrough, shifts SRAS to the right: the price level falls while real GDP rises.',
    coreQuestion:
      'Compare demand-pull and cost-push inflation. What causes each, and how do real GDP and unemployment change in each case?',
    rubric: [
      {
        id: 'demand-pull',
        criterion:
          'Demand-pull: caused by an increase (rightward shift) in AD; real GDP increases and unemployment decreases as the price level rises.',
      },
      {
        id: 'cost-push',
        criterion:
          'Cost-push: caused by a decrease (leftward shift) in SRAS, such as higher input costs or a negative supply shock; real GDP decreases and unemployment increases as the price level rises.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Demand-pull inflation happens when AD increases. The price level rises, and real GDP also rises, so unemployment falls. Cost-push inflation happens when SRAS decreases, for example because input costs like oil prices rise. The price level rises, but real GDP falls and unemployment rises, which is stagflation.',
    walkthrough: [
      {
        kicker: 'When AD increases',
        title: 'Demand-pull inflation',
        boards: ['Changes to AD-AS 31'],
        terms: ['Demand-Pull Inflation'],
      },
      {
        kicker: 'When SRAS decreases',
        title: 'Cost-push inflation',
        boards: ['Changes to AD-AS 32'],
        terms: ['Cost-Push Inflation'],
      },
      {
        kicker: 'Negative supply shock',
        title: 'Higher prices and lower output at the same time',
        boards: ['Changes to AD-AS 29'],
        terms: ['Negative Supply Shock', 'Stagflation'],
      },
      {
        kicker: 'Positive supply shock',
        title: 'Lower prices and higher output',
        boards: ['Changes to AD-AS 30'],
        terms: ['Positive Supply Shock'],
      },
    ],
    checkQuestionIds: [3141, 3143, 3137],
  },
  {
    lessonId: '3.7',
    unit: 3,
    slug: 'long-run-self-adjustment',
    videoId: '33',
    brief:
      'Output gaps do not last forever, even if the government does nothing. Long-run self-adjustment is how the economy returns to full-employment output on its own, through changes in wages and other resource prices.\n\n' +
      'In a recessionary gap, unemployment is above the natural rate. With many workers looking for jobs, nominal wages eventually fall. Lower wages cut production costs, so SRAS shifts to the right until the economy is back at full-employment output, at a lower price level.\n\n' +
      'In an inflationary gap, unemployment is below the natural rate. Firms compete for scarce workers, so nominal wages rise. Higher wages raise costs, so SRAS shifts to the left until output falls back to full-employment output, at a higher price level.\n\n' +
      'Either way, the long-run result is the same: output and unemployment return to their full-employment levels, and only the price level is permanently different. Because wages are sticky, this process can take a long time.',
    coreQuestion:
      'An economy is in a recessionary gap and the government takes no action. Explain how the economy returns to long-run equilibrium.',
    rubric: [
      {
        id: 'wages',
        criterion:
          'States that because unemployment is high (above the natural rate), nominal wages or resource prices fall over time.',
      },
      {
        id: 'sras',
        criterion: 'States that lower wages/production costs shift SRAS to the right.',
      },
      {
        id: 'outcome',
        criterion:
          'Concludes that output returns to full-employment output (long-run equilibrium), with a lower price level.',
      },
    ],
    passMark: 3,
    modelAnswer:
      'In a recessionary gap, unemployment is above the natural rate, so over time nominal wages and other resource prices fall. Lower wages reduce production costs, which shifts SRAS to the right. SRAS keeps shifting until the economy returns to full-employment output on the LRAS curve, at a lower price level.',
    walkthrough: [
      {
        kicker: 'The idea',
        title: 'The economy can fix itself, slowly',
        boards: ['Long Run Self Adjustment 19'],
        terms: ['Long-Run Self-Adjustment'],
      },
      {
        kicker: 'From a recessionary gap',
        title: 'Wages fall and SRAS shifts right',
        boards: [],
        terms: ['Self-Adjustment from a Recessionary Gap'],
        note: 'Unemployment is above the natural rate, so wages fall. Lower wages cut costs, SRAS shifts right, and output rises back to full-employment output at a lower price level.',
      },
      {
        kicker: 'From an inflationary gap',
        title: 'Wages rise and SRAS shifts left',
        boards: [],
        terms: ['Self-Adjustment from an Inflationary Gap'],
        note: 'Unemployment is below the natural rate, so wages rise. Higher wages raise costs, SRAS shifts left, and output falls back to full-employment output at a higher price level.',
      },
      {
        kicker: 'The end result',
        title: 'Back to full employment, at a new price level',
        boards: [],
        terms: ['Long-Run Impact of Self-Adjustment'],
        note: 'Self-adjustment always ends at full-employment output. Output and unemployment return to normal; only the price level is permanently different.',
      },
    ],
    checkQuestionIds: [161, 323, 35],
  },
  {
    lessonId: '3.8',
    unit: 3,
    slug: 'fiscal-policy',
    videoId: '35',
    brief:
      'Fiscal policy is the government’s use of spending and taxation to influence the economy. It is carried out by the federal government (not the central bank), and it works by shifting the AD curve.\n\n' +
      'In a recessionary gap, the goal is to increase real GDP and reduce unemployment. Expansionary fiscal policy does this by increasing government spending or decreasing taxes. More government spending adds directly to AD, and lower taxes raise disposable income, so consumption rises. AD shifts right, and real GDP, employment and the price level all rise.\n\n' +
      'In an inflationary gap, the goal is to reduce inflation. Contractionary fiscal policy decreases government spending or increases taxes. AD shifts left, so the price level falls and real GDP moves back toward full-employment output.\n\n' +
      'Because of the multiplier, a change in government spending or taxes shifts AD by more than the initial change.',
    coreQuestion:
      'The economy is in a recessionary gap. Describe a fiscal policy that would close it, and explain how it affects AD, real GDP and the price level.',
    rubric: [
      {
        id: 'policy',
        criterion:
          'Identifies expansionary fiscal policy: increasing government spending and/or decreasing taxes.',
      },
      {
        id: 'effect',
        criterion:
          'Explains that AD shifts to the right (increases), so real GDP increases (unemployment falls) and the price level increases.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The government should use expansionary fiscal policy, such as increasing government spending or cutting taxes. More government spending, or more consumption from higher disposable income, increases AD, shifting it to the right. Real GDP rises toward full-employment output, unemployment falls, and the price level rises.',
    walkthrough: [
      {
        kicker: 'The tools',
        title: 'Government spending and taxes',
        boards: ['Fiscal Policy 8', 'Fiscal Policy 9'],
        terms: ['Fiscal Policy'],
        note: 'Fiscal policy is set by the federal government and works by shifting AD.',
      },
      {
        kicker: 'Closing a recessionary gap',
        title: 'Expansionary fiscal policy',
        boards: ['Fiscal Policy 13'],
        terms: ['Expansionary Fiscal Policy'],
      },
      {
        kicker: 'Closing an inflationary gap',
        title: 'Contractionary fiscal policy',
        boards: ['Fiscal Policy 17'],
        terms: ['Contractionary Fiscal Policy'],
      },
    ],
    checkQuestionIds: [326, 327, 334],
  },
  {
    lessonId: '3.9',
    unit: 3,
    slug: 'automatic-stabilizers',
    brief:
      'Not all fiscal policy needs a vote. Discretionary fiscal policy is when lawmakers deliberately change spending or taxes, which takes time to agree on and put in place. Automatic stabilizers are features already built into the tax and spending system that push against the business cycle with no new action.\n\n' +
      'Two key examples are progressive income taxes and unemployment benefits. In a recession, incomes fall, so people pay less in taxes, and more people qualify for unemployment benefits. Both keep more money in people’s pockets and limit the fall in consumption and AD. In an expansion, the opposite happens: incomes rise, tax revenue rises, and fewer people need benefits, which slows the growth of AD.\n\n' +
      'Automatic stabilizers do not end recessions or booms on their own, but they make the swings of the business cycle smaller.',
    coreQuestion:
      'Explain how unemployment benefits act as an automatic stabilizer during a recession, and how this differs from discretionary fiscal policy.',
    rubric: [
      {
        id: 'stabilizer',
        criterion:
          'Explains that in a recession more people qualify for unemployment benefits, so transfer payments rise automatically, supporting incomes and consumption and limiting the fall in AD.',
      },
      {
        id: 'discretionary',
        criterion:
          'Explains that this happens without any new law or deliberate government action, unlike discretionary fiscal policy, which requires lawmakers to choose to change spending or taxes.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'When a recession hits and people lose their jobs, more of them qualify for unemployment benefits, so government transfer payments rise automatically. That income keeps consumption from falling as much, which limits the drop in AD. Unlike discretionary fiscal policy, no one has to pass a new law; the stabilizer is already built into the system.',
    walkthrough: [
      {
        kicker: 'Two kinds of fiscal policy',
        title: 'Deliberate vs. automatic',
        boards: ['Automatic Stabilizers 10'],
        terms: ['Discretionary Fiscal Policy', 'Automatic Stabilizers'],
      },
      {
        kicker: 'What they do',
        title: 'Smaller booms and smaller busts',
        boards: ['Automatic Stabilizers'],
        terms: [],
        note: 'Progressive income taxes take more in booms and less in busts, and unemployment benefits rise in recessions, so swings in AD are smaller.',
      },
    ],
    checkQuestionIds: [3079, 330, 331],
  },
];
