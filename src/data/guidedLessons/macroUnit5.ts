import type { GuidedLessonContent } from './types';

/** AP Macro Unit 5: Long-Run Consequences of Stabilization Policies. */
export const macroUnit5GuidedLessons: GuidedLessonContent[] = [
  {
    lessonId: '5.1',
    unit: 5,
    slug: 'fiscal-monetary-policy-short-run',
    brief:
      'Fiscal policy (government spending and taxes) and monetary policy (the central bank and the money supply) both shift aggregate demand. They also both affect the real interest rate, but in different ways.\n\n' +
      'Expansionary fiscal policy usually means a budget deficit. To spend more than it collects in taxes, the government borrows in the loanable funds market, which increases demand for loanable funds and raises the real interest rate. Contractionary fiscal policy, such as running a surplus, means less borrowing, so the real interest rate falls.\n\n' +
      'Expansionary monetary policy increases the money supply, which lowers the nominal interest rate. The price level rises a little, but since real interest rate = nominal rate − inflation, the real interest rate falls. Contractionary monetary policy does the opposite and raises the real interest rate.\n\n' +
      'When the two are used together, look at each effect separately. If both are expansionary, AD and real GDP clearly rise, but fiscal policy pushes the real interest rate up while monetary policy pushes it down, so the effect on the interest rate is uncertain. If they push AD in opposite directions, the effect on real GDP is uncertain instead.',
    coreQuestion:
      'The economy is in a recession. The government increases spending at the same time as the central bank buys government bonds. Explain the effect on real GDP and on the real interest rate.',
    rubric: [
      {
        id: 'output',
        criterion: 'States that both policies increase AD, so real GDP increases.',
      },
      {
        id: 'interest',
        criterion:
          'Explains that the effect on the real interest rate is uncertain (indeterminate) because the fiscal policy raises it (government borrowing increases demand for loanable funds) while the monetary policy lowers it (larger money supply).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Both are expansionary, so AD shifts right and real GDP increases. The effect on the real interest rate is uncertain: the extra government spending is financed by borrowing, which increases demand for loanable funds and raises the real interest rate, but buying bonds increases the money supply and lowers interest rates. Which effect is bigger decides the final interest rate.',
    walkthrough: [
      {
        kicker: 'Fiscal policy and interest rates',
        title: 'Deficit spending is paid for by borrowing',
        boards: ['combinations 22', 'combinations 24'],
        terms: ['Fiscal Policy'],
        note: 'To spend more than it collects in taxes, the government borrows in the loanable funds market.',
      },
      {
        kicker: 'Fiscal policy and interest rates',
        title: 'Expansionary fiscal policy raises the real interest rate',
        boards: ['combinations 27', 'combinations 28'],
        terms: [],
        note: 'Government borrowing increases demand for loanable funds, so the real interest rate rises.',
      },
      {
        kicker: 'Fiscal policy and interest rates',
        title: 'Contractionary fiscal policy lowers the real interest rate',
        boards: ['combinations 30', 'combinations 31'],
        terms: [],
        note: 'A budget surplus means less government borrowing, so demand for loanable funds falls and so does the real interest rate.',
      },
      {
        kicker: 'Monetary policy and interest rates',
        title: 'Expansionary monetary policy lowers the real interest rate',
        boards: ['combinations 43', 'combinations 44'],
        terms: ['Monetary Policy'],
        note: 'More money lowers the nominal interest rate. Inflation rises a little, so real interest rate = nominal rate − inflation falls.',
      },
      {
        kicker: 'Monetary policy and interest rates',
        title: 'Contractionary monetary policy raises the real interest rate',
        boards: ['combinations 52', 'combinations 53'],
        terms: [],
      },
      {
        kicker: 'Putting them together',
        title: 'Look at each effect, then combine',
        boards: [],
        terms: ['Policy Mix Effects'],
        note: 'When both policies push AD the same way, the effect on real GDP is clear. When they push the real interest rate in opposite directions, the combined effect on the interest rate is uncertain, and the same goes for real GDP when they push AD in opposite directions.',
      },
    ],
    checkQuestionIds: [54, 277, 278],
  },
  {
    lessonId: '5.2',
    unit: 5,
    slug: 'phillips-curve',
    videoId: '6',
    brief:
      'The Phillips curve shows the relationship between inflation and unemployment. In the short run there is a trade-off: the short-run Phillips curve (SRPC) slopes downward, so lower unemployment comes with higher inflation, and vice versa.\n\n' +
      'The Phillips curve should always match the AD-AS model. When AD increases, the price level rises and output rises, so unemployment falls: the economy moves up and to the left along the SRPC. When AD decreases, it moves down and to the right. Shifts in AD cause movements along the SRPC.\n\n' +
      'Shifts in SRAS shift the SRPC, in the opposite direction. A decrease in SRAS (like an oil price shock) raises inflation and unemployment at the same time, so the SRPC shifts right. An increase in SRAS shifts the SRPC left.\n\n' +
      'In the long run there is no trade-off. The long-run Phillips curve (LRPC) is vertical at the natural rate of unemployment: whatever the inflation rate, the economy returns to full employment.',
    coreQuestion:
      'Aggregate demand increases. Explain what happens to inflation and unemployment, and whether this is a movement along the short-run Phillips curve or a shift of it.',
    rubric: [
      {
        id: 'direction',
        criterion:
          'States that inflation increases and unemployment decreases (because higher AD raises the price level and output).',
      },
      {
        id: 'movement',
        criterion:
          'Identifies this as a movement along the SRPC (up and to the left), not a shift of the curve.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'When AD increases, the price level rises and real output rises, so firms hire more workers. Inflation goes up and unemployment goes down. On the Phillips curve, that is a movement up and to the left along the short-run Phillips curve, not a shift, because only shifts in SRAS shift the SRPC.',
    walkthrough: [
      {
        kicker: 'The trade-off',
        title: 'Inflation and unemployment move in opposite directions',
        boards: ['phillips_curve 12', 'phillips_curve 11'],
        terms: ['Phillips Curve', 'Short-Run Phillips Curve (SRPC)'],
      },
      {
        kicker: 'When AD shifts',
        title: 'A movement along the SRPC',
        boards: ['phillips_curve 13', 'phillips_curve 17'],
        terms: ['Movements Along the SRPC'],
      },
      {
        kicker: 'Both graphs together',
        title: 'AD increases: up and to the left along the SRPC',
        boards: ['phillips_curve 20'],
        terms: [],
        note: 'Higher AD raises the price level and lowers unemployment, moving the economy from point A to point B.',
      },
      {
        kicker: 'When SRAS shifts',
        title: 'The SRPC shifts the opposite way',
        boards: ['phillips_curve 16', 'phillips_curve 18'],
        terms: ['Shifts of the SRPC'],
      },
      {
        kicker: 'Both graphs together',
        title: 'SRAS decreases: the SRPC shifts right',
        boards: ['phillips_curve 22', 'phillips_curve 23'],
        terms: [],
        note: 'Lower SRAS raises both inflation and unemployment, so the whole SRPC shifts right.',
      },
      {
        kicker: 'The long run',
        title: 'The LRPC is vertical at the natural rate',
        boards: [],
        terms: ['Long-Run Phillips Curve (LRPC)', 'NRU (Natural Rate of Unemployment)'],
        note: 'In the long run there is no trade-off: the economy returns to the natural rate of unemployment whatever the inflation rate.',
      },
    ],
    checkQuestionIds: [55, 57, 280],
  },
  {
    lessonId: '5.3',
    unit: 5,
    slug: 'money-growth-inflation',
    brief:
      'The equation of exchange links money to prices and output:\n\n' +
      'M × V = P × Y\n\n' +
      'M is the money supply, V is the velocity of money (how many times each dollar is spent on final goods and services in a year), P is the price level and Y is real output. P × Y is nominal GDP.\n\n' +
      'The quantity theory of money says that in the long run, velocity and real output are not affected by the money supply. So if the money supply grows faster than real output, the extra money shows up as higher prices. With V and Y constant, a 10% increase in M causes a 10% increase in P. With growth rates, inflation is roughly money supply growth minus real GDP growth: if money grows 6% and real GDP grows 2%, inflation is about 4%.\n\n' +
      'When a government prints money far faster than output grows, the result can be hyperinflation, an extremely rapid and out-of-control rise in prices.',
    coreQuestion:
      'Velocity is constant and real GDP grows 2% a year. The central bank increases the money supply by 7% a year. Using the quantity theory of money, what happens to inflation, and why?',
    rubric: [
      {
        id: 'theory',
        criterion:
          'Explains using MV = PY (the quantity theory of money) that with velocity constant, money supply growth beyond real GDP growth shows up as a rising price level.',
      },
      {
        id: 'amount',
        criterion: 'Concludes inflation is about 5% (7% money growth minus 2% real GDP growth).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'By the equation of exchange, M × V = P × Y. With velocity constant, the money supply growing 7% means nominal GDP (P × Y) grows 7%. Real output only grows 2%, so the rest shows up as higher prices: inflation is about 7% − 2% = 5%.',
    walkthrough: [
      {
        kicker: 'The equation of exchange',
        title: 'M × V = P × Y',
        boards: [],
        terms: ['Equation of Exchange', 'Velocity of Money (V)'],
        note: 'M is the money supply, V is velocity, P is the price level and Y is real output. P × Y is nominal GDP.',
      },
      {
        kicker: 'The quantity theory of money',
        title: 'More money, higher prices',
        boards: [],
        terms: ['Quantity Theory of Money'],
        note: 'If V and Y stay the same, a 10% increase in M means a 10% increase in P. In growth rates, inflation ≈ money growth − real GDP growth.',
      },
      {
        kicker: 'Too much money',
        title: 'Hyperinflation',
        boards: [],
        terms: ['Hyperinflation'],
        note: 'When the money supply grows far faster than output, prices rise out of control.',
      },
    ],
    checkQuestionIds: [61, 60, 166],
  },
  {
    lessonId: '5.4',
    unit: 5,
    slug: 'government-deficits-national-debt',
    brief:
      'The federal budget compares what the government collects in taxes (revenue) with what it spends (outlays), including both government purchases and transfer payments. Each year has one of three outcomes. If outlays are greater than revenue, there is a budget deficit. If revenue is greater than outlays, there is a budget surplus. If they are equal, the budget is balanced.\n\n' +
      'To pay for a deficit, the government borrows by selling bonds to investors. Over time, those borrowings add up. The national debt is the total of all past deficits minus any surpluses. A deficit is a single year’s shortfall; the debt is the running total.\n\n' +
      'Debt has costs. The government must pay interest to its bondholders, and those interest payments grow as the debt grows. Heavy government borrowing can also push up real interest rates and crowd out private investment, which the next lesson covers.',
    coreQuestion:
      'Explain the difference between a budget deficit and the national debt, and how running deficits year after year affects the national debt.',
    rubric: [
      {
        id: 'deficit',
        criterion:
          'Defines a budget deficit as government spending (outlays) exceeding tax revenue in a single year.',
      },
      {
        id: 'debt',
        criterion:
          'Defines the national debt as the accumulated total of past deficits (minus surpluses), so each year’s deficit adds to it and repeated deficits make the debt grow.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'A budget deficit happens when the government spends more than it collects in taxes in one year. The national debt is the total amount the government owes, built up from all past deficits minus surpluses. Each deficit is financed by borrowing, so running deficits year after year keeps adding to the national debt, along with the interest owed on it.',
    walkthrough: [
      {
        kicker: 'The budget',
        title: 'Revenue vs. outlays',
        boards: [],
        terms: ['Federal Budget', 'Government Outlays'],
        note: 'Outlays include government purchases and transfer payments.',
      },
      {
        kicker: 'Three outcomes',
        title: 'Deficit, surplus or balanced',
        boards: [],
        terms: ['Budget Deficit', 'Budget Surplus', 'Balanced Budget'],
        note: 'Outlays greater than revenue is a deficit, revenue greater than outlays is a surplus, and equal is balanced.',
      },
      {
        kicker: 'Paying for a deficit',
        title: 'The government borrows by selling bonds',
        boards: [],
        terms: ['Financing a Budget Deficit', 'Interest Payments (on Debt)'],
        note: 'A deficit is covered by selling government bonds, and the government owes interest to everyone holding them.',
      },
      {
        kicker: 'Deficits add up',
        title: 'The national debt',
        boards: [],
        terms: ['National Debt'],
        note: 'Each deficit adds to the debt; each surplus reduces it. A $100 billion deficit followed by a $50 billion surplus leaves $50 billion of debt.',
      },
    ],
    checkQuestionIds: [62, 286, 285],
  },
  {
    lessonId: '5.5',
    unit: 5,
    slug: 'crowding-out',
    brief:
      'When the government runs a deficit, it borrows in the loanable funds market. That extra borrowing increases the demand for loanable funds, which raises the real interest rate.\n\n' +
      'Higher real interest rates make borrowing more expensive for everyone else. Businesses that were planning to borrow for new factories, equipment or technology now find some of those projects are no longer worth it, so private investment falls. The government’s borrowing has crowded out private borrowing.\n\n' +
      'Crowding out matters most in the long run. Investment is how an economy builds its capital stock: the machines, tools and buildings that make workers productive. If deficits keep crowding out private investment, the capital stock grows more slowly, and so does the economy’s potential output. Persistent deficits can slow long-run economic growth.',
    coreQuestion:
      'The government runs a large budget deficit financed by borrowing. Explain how this can crowd out private investment, and why that matters for long-run economic growth.',
    rubric: [
      {
        id: 'mechanism',
        criterion:
          'Explains that government borrowing increases demand for loanable funds, which raises the real interest rate, so private investment decreases.',
      },
      {
        id: 'growth',
        criterion:
          'Explains that less private investment means less capital accumulation (a smaller capital stock), which slows long-run economic growth (LRAS grows less).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'To finance the deficit, the government borrows in the loanable funds market, increasing demand for loanable funds and raising the real interest rate. With borrowing more expensive, businesses cut back on investment, so private investment is crowded out. Less investment means the capital stock grows more slowly, so the economy’s productive capacity and long-run growth are lower.',
    walkthrough: [
      {
        kicker: 'The idea',
        title: 'Government borrowing raises the real interest rate',
        boards: ['loanable_funds 31'],
        terms: ['Crowding Out'],
        note: 'A deficit is financed by borrowing, which increases demand for loanable funds and raises the real interest rate.',
      },
      {
        kicker: 'Who gets crowded out',
        title: 'Private investment falls',
        boards: [],
        terms: [],
        note: 'Higher real interest rates make it more expensive for businesses to borrow for new equipment and buildings, so private investment falls.',
      },
      {
        kicker: 'The long run',
        title: 'Less capital, slower growth',
        boards: [],
        terms: ['Capital Stock', 'Crowding Out and Long-Run Economic Growth'],
        note: 'Less investment today means a smaller capital stock tomorrow, so potential output grows more slowly.',
      },
    ],
    checkQuestionIds: [3117, 288, 65],
  },
  {
    lessonId: '5.6',
    unit: 5,
    slug: 'economic-growth',
    brief:
      'Economic growth is a sustained increase in an economy’s potential output over time. The usual measure of living standards is real GDP per capita: real GDP divided by population. If output grows faster than the population, the average person is better off.\n\n' +
      'Growth shows up on two familiar graphs. On the production possibilities curve, the whole curve shifts outward. On the AD-AS model, the long-run aggregate supply curve shifts to the right.\n\n' +
      'Growth comes from more and better resources: more physical capital (machines, tools, infrastructure), more human capital (education, training and skills), more natural resources, and better technology. The key driver is productivity, which is output per worker. Workers become more productive when they have more capital to work with, better skills and better technology, and higher productivity is what raises living standards over the long run.',
    coreQuestion:
      'What is long-run economic growth, how is it shown on the AD-AS model, and what is one source of it?',
    rubric: [
      {
        id: 'definition',
        criterion:
          'Defines long-run economic growth as an increase in potential output (real GDP or real GDP per capita) over time.',
      },
      {
        id: 'graph',
        criterion:
          'States that it is shown by a rightward shift of the LRAS curve (an outward PPC shift is also acceptable alongside it).',
      },
      {
        id: 'source',
        criterion:
          'Names a valid source: more or better physical capital, human capital, technology/productivity, natural resources or labor.',
      },
    ],
    passMark: 3,
    modelAnswer:
      'Long-run economic growth is an increase in the economy’s potential output, or real GDP per person, over time. On the AD-AS model it is shown as the LRAS curve shifting to the right. One source is more human capital: when workers are better educated and trained, each worker can produce more.',
    walkthrough: [
      {
        kicker: 'What growth means',
        title: 'More potential output over time',
        boards: [],
        terms: ['Economic Growth', 'Real GDP per Capita'],
        note: 'Real GDP per capita = real GDP ÷ population, a measure of the average standard of living.',
      },
      {
        kicker: 'Showing growth',
        title: 'LRAS shifts right and the PPC shifts out',
        boards: ['LRAS 2'],
        terms: ['Economic Growth (on the AD-AS Model)', 'Economic Growth (on the PPC)'],
      },
      {
        kicker: 'Where growth comes from',
        title: 'More and better resources',
        boards: ['LRAS 3'],
        terms: ['Sources of Economic Growth', 'Capital Stock'],
      },
      {
        kicker: 'The key driver',
        title: 'Productivity',
        boards: [],
        terms: ['Productivity'],
        note: 'Output per worker rises with more physical capital per worker, more human capital and better technology.',
      },
    ],
    checkQuestionIds: [3122, 290, 289],
  },
  {
    lessonId: '5.7',
    unit: 5,
    slug: 'public-policy-economic-growth',
    brief:
      'Most of the policies in this course shift aggregate demand to fight recessions and inflation. Supply-side economics focuses instead on growing the economy’s capacity, shifting long-run aggregate supply to the right.\n\n' +
      'Governments can promote growth in a few main ways. To build physical capital, they can offer investment tax credits, lower taxes on business investment, or spend on public infrastructure like roads and broadband. To build human capital, they can fund education, job training and public health, so workers have more knowledge and skills. To speed up technology, they can subsidize or give tax credits for research and development.\n\n' +
      'Each of these increases the quantity or quality of the factors of production, which raises productivity and potential output. On the AD-AS model, that shows up as LRAS shifting right.',
    coreQuestion:
      'Describe one government policy that could promote long-run economic growth, and explain how it affects long-run aggregate supply.',
    rubric: [
      {
        id: 'policy',
        criterion:
          'Names a valid growth policy, such as investment tax credits, lower business or corporate taxes, infrastructure spending, funding for education or job training, or R&D subsidies.',
      },
      {
        id: 'lras',
        criterion:
          'Explains that the policy increases physical capital, human capital or technology/productivity, so LRAS shifts right (potential output increases).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The government could offer investment tax credits that lower the cost of buying new equipment. Firms would invest more, increasing the economy’s stock of physical capital. With more capital per worker, productivity rises, so potential output increases and the LRAS curve shifts to the right.',
    walkthrough: [
      {
        kicker: 'Supply-side thinking',
        title: 'Grow the economy’s capacity',
        boards: [],
        terms: ['Supply-Side Economics', 'Sources of Economic Growth'],
        note: 'Instead of shifting AD, supply-side policies aim to shift LRAS right by adding to the factors of production.',
      },
      {
        kicker: 'Physical capital',
        title: 'Policies that boost investment',
        boards: ['LRAS 17'],
        terms: ['Promoting Physical Capital Development'],
        note: 'Investment tax credits, lower taxes on business investment and public infrastructure spending.',
      },
      {
        kicker: 'Human capital',
        title: 'Policies that build skills',
        boards: ['LRAS 18'],
        terms: ['Promoting Human Capital Development'],
        note: 'Funding education, job training and public health.',
      },
      {
        kicker: 'Technology',
        title: 'Policies that encourage research',
        boards: [],
        terms: [],
        note: 'Subsidies and tax credits for research and development encourage new technology, which raises productivity and shifts LRAS right.',
      },
    ],
    checkQuestionIds: [67, 3120, 291],
  },
];
