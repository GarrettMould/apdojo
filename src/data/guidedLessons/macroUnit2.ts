import type { GuidedLessonContent } from './types';

/** AP Macro Unit 2: Economic Indicators and the Business Cycle. */
export const macroUnit2GuidedLessons: GuidedLessonContent[] = [
  {
    lessonId: '2.1',
    unit: 2,
    slug: 'circular-flow-gdp',
    videoId: '16',
    brief:
      'The circular flow model shows how money and resources move through the economy. Households own the factors of production and sell them to firms in the factor market, earning wages, rent, interest and profit. Households then spend that income buying goods and services from firms in the product market. Saving, taxes and imports are leakages that take money out of the flow; investment, government spending and exports are injections that put it back.\n\n' +
      'Gross domestic product (GDP) is the total market value of all final goods and services produced within a country\'s borders in a year. Using the expenditure approach, GDP = C + I + G + (X − M): consumption, investment, government spending and net exports. Investment means business spending on new capital, new homes and inventories, not buying stocks.\n\n' +
      'Some things are left out of GDP: intermediate goods (to avoid counting them twice), used goods (counted the year they were made), financial transactions like stocks and bonds, and transfer payments like Social Security (nothing is produced). Imports are subtracted because they were produced in another country. Because every dollar spent is income for someone, the income approach (adding up wages, rent, interest and profit) gives the same total.',
    coreQuestion:
      'A family in the United States buys a new car that was made in Japan. Explain how this affects consumption, net exports and U.S. GDP. Then give one example of a purchase that is NOT counted in GDP and explain why.',
    rubric: [
      {
        id: 'import',
        criterion:
          'States that consumption increases but imports increase by the same amount, so net exports fall and U.S. GDP does not change, because the car was not produced in the U.S.',
      },
      {
        id: 'excluded',
        criterion:
          'Gives a correct example of something excluded from GDP (such as a used good, a stock or bond, a transfer payment or an intermediate good) and the correct reason it is excluded.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Buying the car is consumption spending, so C increases. But the car was produced in Japan, so U.S. imports also increase by the same amount and net exports fall. The two changes cancel out, so U.S. GDP does not change. Something not counted in GDP is buying a used car, because it was already counted in GDP in the year it was made, and counting it again would double count it.',
    walkthrough: [
      {
        kicker: 'The circular flow',
        title: 'Households and firms',
        boards: ['Circular Flow Model 1'],
        terms: ['Circular Flow Model', 'Households', 'Firms', 'Product Market', 'Factor Market'],
      },
      {
        kicker: 'The circular flow',
        title: 'Adding government, banks and the rest of the world',
        boards: ['Circular Flow Model 2'],
        terms: ['Injections', 'Leakages'],
        note: 'Saving, taxes and imports leak money out of the flow. Investment, government spending and exports inject it back in.',
      },
      {
        kicker: 'Measuring output',
        title: 'What GDP counts',
        boards: [],
        terms: ['Gross Domestic Product (GDP)', 'Intermediate Good'],
        note: 'Only final goods and services, only made inside the country, and only made this year. A tire sold to a car maker is intermediate; it is already counted in the price of the car.',
      },
      {
        kicker: 'Measuring output',
        title: 'The expenditure approach: C + I + G + (X − M)',
        boards: [],
        terms: ['Expenditure Approach', 'Consumption (C)', 'Investment (I)', 'Government Spending (G)', 'Net Exports (NX)'],
        note: 'Investment means new factories, machines, homes and inventories. Buying a stock is not investment in GDP; it just changes who owns something.',
      },
      {
        kicker: 'Measuring output',
        title: 'What GDP leaves out',
        boards: [],
        terms: ['Government Transfer Payments'],
        note: 'Used goods, stocks and bonds, transfer payments and intermediate goods are all left out. Imports are subtracted because another country produced them.',
      },
      {
        kicker: 'Measuring output',
        title: 'Spending equals income',
        boards: [],
        terms: ['Income Approach', 'Equivalence of Approaches'],
        note: 'Every dollar spent on output becomes someone\'s wages, rent, interest or profit, so adding up incomes gives the same GDP.',
      },
    ],
    checkQuestionIds: [3015, 3023, 26218],
  },
  {
    lessonId: '2.2',
    unit: 2,
    slug: 'limitations-gdp',
    brief:
      'GDP measures how much an economy produces, but it is not a perfect measure of how well people are living. To compare countries or years, economists usually use real GDP per capita: GDP divided by population. If population grows faster than real GDP, real GDP per capita falls, even though total output went up.\n\n' +
      'GDP leaves out a lot. It ignores non-market activity, such as cooking at home or volunteering, and the underground economy. It does not subtract the harm from pollution or other negative externalities. It says nothing about how income is distributed, so a country with high GDP can still have a lot of poverty. It does not measure leisure, health or happiness.\n\n' +
      'GDP can also count bad events as gains. Rebuilding after a hurricane adds to GDP, even though people are not better off than before the storm. And GDP does not fully capture improvements in quality, like a phone that does far more for the same price.',
    coreQuestion:
      'Country A has a higher GDP than Country B. Explain why that does not necessarily mean people in Country A have a higher standard of living. Give two specific limitations of GDP in your answer.',
    rubric: [
      {
        id: 'population',
        criterion:
          'Explains that total GDP must be divided by population (GDP per capita) to compare living standards, or otherwise shows that a larger total does not mean more per person.',
      },
      {
        id: 'limitations',
        criterion:
          'Correctly explains two specific limitations of GDP as a measure of well-being, such as ignoring non-market activity, income distribution, pollution or other externalities, leisure, or quality of life.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Country A might have a much bigger population, so its GDP per person could be lower than Country B\'s. To compare living standards, you need GDP per capita. Even then, GDP has limits. It does not show how income is distributed, so most of Country A\'s output could go to a small group while many people are poor. It also ignores pollution, so Country A could be producing a lot while damaging people\'s health and environment.',
    walkthrough: [
      {
        kicker: 'A fairer comparison',
        title: 'GDP per capita',
        boards: ['GDP_Per_Capita'],
        terms: ['GDP per capita'],
        note: 'China\'s total GDP is far larger than Switzerland\'s, but output per person is much higher in Switzerland.',
      },
      {
        kicker: 'What GDP misses',
        title: 'Unpaid and hidden work',
        boards: [],
        terms: ['Limitations of GDP', 'GDP Excludes Non-Market and Underground Activities'],
        note: 'A parent cooking dinner at home adds nothing to GDP. The same meal bought at a restaurant does.',
      },
      {
        kicker: 'What GDP misses',
        title: 'Pollution and inequality',
        boards: [],
        terms: ['GDP Ignores Negative Externalities', 'GDP Fails to Account for Income Inequality'],
        note: 'A factory that pollutes a river adds its output to GDP, and nothing is subtracted for the damage. GDP also says nothing about who gets the income.',
      },
      {
        kicker: 'What GDP misses',
        title: 'Well-being, bad events and quality',
        boards: [],
        terms: [
          'GDP Doesn\'t Measure Quality of Life or Well-Being',
          'GDP Includes Unproductive Expenditures',
          'GDP Misrepresents Progress Due to Technology and Depreciation',
        ],
        note: 'Rebuilding after a hurricane raises GDP, but people are not better off than before the storm.',
      },
    ],
    checkQuestionIds: [16, 19, 3029],
  },
  {
    lessonId: '2.3',
    unit: 2,
    slug: 'unemployment',
    videoId: '18',
    brief:
      'To be unemployed, a person must be in the labor force: willing and able to work, and actively looking for a job. The labor force is everyone employed plus everyone unemployed. People who are not looking, like full-time students, retirees and discouraged workers, are not in the labor force.\n\n' +
      'Unemployment rate = unemployed ÷ labor force × 100. Labor force participation rate = labor force ÷ working-age population × 100. Discouraged workers have given up looking, so they are not counted as unemployed. If more people become discouraged, the unemployment rate falls even though nobody found a job, and the participation rate falls too.\n\n' +
      'There are three types of unemployment. Frictional unemployment is people between jobs or entering the workforce. Structural unemployment is a mismatch between workers\' skills and the jobs available, often caused by new technology. Cyclical unemployment is caused by a recession. The natural rate of unemployment is frictional plus structural. When cyclical unemployment is zero, the economy is at full employment.',
    coreQuestion:
      'Explain the three types of unemployment and which ones make up the natural rate. Then explain what happens to the unemployment rate when unemployed people become discouraged and stop looking for work.',
    rubric: [
      {
        id: 'types',
        criterion:
          'Correctly describes frictional (between jobs), structural (skills mismatch) and cyclical (caused by a recession) unemployment, and states that the natural rate is frictional plus structural.',
      },
      {
        id: 'discouraged',
        criterion:
          'States that the unemployment rate decreases, because discouraged workers leave the labor force and are no longer counted as unemployed.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Frictional unemployment is people who are between jobs or just starting to look, like a new graduate. Structural unemployment happens when workers\' skills no longer match the jobs available, for example when technology replaces a job. Cyclical unemployment is caused by a recession, when firms cut workers because spending falls. The natural rate of unemployment is frictional plus structural. When unemployed people become discouraged and stop looking, they leave the labor force and are no longer counted as unemployed, so the unemployment rate falls even though no one found a job.',
    walkthrough: [
      {
        kicker: 'Who counts',
        title: 'Unemployed means looking for work',
        boards: [],
        terms: ['Unemployed', 'Labor Force'],
        note: 'A full-time student or a retiree who is not looking for work is not unemployed. They are outside the labor force.',
      },
      {
        kicker: 'The calculations',
        title: 'Unemployment rate and participation rate',
        boards: ['Unemployment2'],
        terms: ['Unemployment Rate', 'Labor Force Participation Rate', 'Discouraged Workers'],
        note: 'From the table: the labor force is 160 + 3 + 4 + 3 = 170 million. Unemployment rate = 10 ÷ 170 ≈ 5.9%. Participation rate = 170 ÷ 250 = 68%.',
      },
      {
        kicker: 'Three types',
        title: 'Frictional, structural, cyclical',
        boards: ['Unemployment1'],
        terms: ['Frictional Unemployment', 'Structural Unemployment', 'Cyclical Unemployment'],
        note: 'A new graduate job hunting is frictional. A taxi driver replaced by self-driving cars is structural. A worker laid off in a recession is cyclical.',
      },
      {
        kicker: 'Full employment',
        title: 'The natural rate of unemployment',
        boards: [],
        terms: ['Natural Rate of Unemployment'],
        note: 'Natural rate = frictional + structural. Full employment does not mean zero unemployment; it means zero cyclical unemployment.',
      },
    ],
    checkQuestionIds: [3051, 26204, 153],
  },
  {
    lessonId: '2.4',
    unit: 2,
    slug: 'price-indices-inflation',
    videoId: '22',
    brief:
      'Inflation is a sustained increase in the general price level. Deflation is a sustained decrease. Disinflation is when inflation slows down: prices are still rising, just more slowly than before.\n\n' +
      'The consumer price index (CPI) measures the price level using a market basket: a fixed set of goods and services a typical urban household buys. CPI = cost of the basket in the current year ÷ cost in the base year × 100. The CPI is always 100 in the base year. The inflation rate is the percentage change in the CPI: (new CPI − old CPI) ÷ old CPI × 100.\n\n' +
      'The CPI tends to overstate the true rise in the cost of living. Because the basket is fixed, it misses that people switch to cheaper substitutes when a price rises (substitution bias). It also counts some price increases that really reflect better quality (quality bias), and it is slow to add new products.',
    coreQuestion:
      'The CPI rises from 120 in Year 1 to 150 in Year 2. Calculate the inflation rate and show your work. Then explain one reason the CPI might overstate the true increase in the cost of living.',
    rubric: [
      {
        id: 'calculation',
        criterion: 'Calculates the inflation rate as (150 − 120) ÷ 120 × 100 = 25%, showing the formula or the steps.',
      },
      {
        id: 'bias',
        criterion:
          'Correctly explains one source of CPI bias: substitution bias (the fixed basket ignores consumers switching to cheaper goods), quality bias, or new products.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Inflation rate = (150 − 120) ÷ 120 × 100 = 30 ÷ 120 × 100 = 25%. The CPI might overstate the rise in the cost of living because of substitution bias. The CPI uses a fixed basket, so if beef gets much more expensive, it assumes people keep buying the same amount of beef. In reality people switch to cheaper chicken, so their cost of living rises less than the CPI shows.',
    walkthrough: [
      {
        kicker: 'Price level changes',
        title: 'Inflation and deflation',
        boards: ['Inflation', 'Deflation'],
        terms: ['Inflation', 'Deflation'],
      },
      {
        kicker: 'Price level changes',
        title: 'Disinflation: still rising, just slower',
        boards: ['Disinflation'],
        terms: ['Disinflation'],
        note: 'Inflation going from 5% to 2% is disinflation. Prices are still going up.',
      },
      {
        kicker: 'Measuring prices',
        title: 'The CPI and the market basket',
        boards: ['CPI', 'Price Indices and Inflation  11'],
        terms: ['Price Index', 'Consumer Price Index (CPI)', 'Market Basket'],
      },
      {
        kicker: 'Measuring prices',
        title: 'Calculating the CPI',
        boards: ['CPI_Formula'],
        terms: ['Calculating CPI'],
        note: 'If the basket cost $200 in the base year and $250 now, CPI = 250 ÷ 200 × 100 = 125.',
      },
      {
        kicker: 'Measuring inflation',
        title: 'Calculating the inflation rate',
        boards: ['Inflation_Rate_Formula'],
        terms: ['Calculating Inflation Rate'],
        note: 'CPI from 150 to 165: (165 − 150) ÷ 150 × 100 = 10%.',
      },
      {
        kicker: 'Limits of the CPI',
        title: 'Why the CPI overstates inflation',
        boards: [],
        terms: ['Substitution Bias', 'Quality Bias'],
        note: 'When beef gets expensive, people buy more chicken. The fixed basket keeps counting beef, so the CPI rises more than people\'s real cost of living.',
      },
    ],
    checkQuestionIds: [26207, 3049, 3035],
  },
  {
    lessonId: '2.5',
    unit: 2,
    slug: 'costs-inflation',
    brief:
      'A nominal value is measured in current dollars. A real value is adjusted for inflation, so it shows purchasing power: what the money can actually buy. If your paycheck rises 3% but prices rise 5%, your nominal wage went up but your real wage went down.\n\n' +
      'Interest is the price paid for using someone else\'s money. Real interest rate = nominal interest rate − inflation rate. Lenders set the nominal rate based on the inflation they expect. If actual inflation turns out higher than expected, borrowers win: they repay with dollars that buy less, and lenders lose. If inflation turns out lower than expected, lenders win and borrowers lose.\n\n' +
      'Unexpected inflation also hurts anyone on a fixed nominal income, like a retiree with a fixed pension, and savers whose interest rate is below inflation. Inflation creates other costs too: menu costs for firms that have to keep changing prices, and shoe-leather costs from the time and effort people spend avoiding holding cash.',
    coreQuestion:
      'A bank lends money at a fixed 7% nominal interest rate, expecting inflation to be 3%. Inflation turns out to be 5%. Calculate the real interest rate and explain who gains and who loses from the unexpected inflation.',
    rubric: [
      {
        id: 'real-rate',
        criterion: 'Calculates the real interest rate as 7% − 5% = 2% (compared with the expected 4%).',
      },
      {
        id: 'winners',
        criterion:
          'States that the borrower gains and the bank (lender) loses, because the loan is repaid with dollars that have less purchasing power than expected.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The real interest rate is 7% − 5% = 2%. The bank expected a real return of 7% − 3% = 4%. Because inflation was higher than expected, the borrower gains: they repay the loan with dollars that buy less than expected. The bank loses, because the money it gets back has less purchasing power than it planned for.',
    walkthrough: [
      {
        kicker: 'Nominal vs. real',
        title: 'What you get paid vs. what it buys',
        boards: ['Nominal_Variable', 'Real_Variable'],
        terms: ['Nominal Variable', 'Real Variable', 'Purchasing Power'],
      },
      {
        kicker: 'Nominal vs. real',
        title: 'Inflation shrinks real income',
        boards: ['Costs_of_Inflation'],
        terms: [],
        note: 'If your nominal income stays the same while prices rise, your real income falls.',
      },
      {
        kicker: 'Interest rates',
        title: 'Interest and the real interest rate',
        boards: ['Interest', 'Fischer_Effect'],
        terms: ['Nominal Interest Rate', 'Real Interest Rate'],
        note: 'Real interest rate = nominal interest rate − inflation rate. A 7% loan with 5% inflation has a 2% real rate.',
      },
      {
        kicker: 'Winners and losers',
        title: 'Inflation lower than expected',
        boards: ['Inflation_Winners_Losers1'],
        terms: [],
        note: 'The dollars repaid are worth more than expected, so the lender wins and the borrower loses.',
      },
      {
        kicker: 'Winners and losers',
        title: 'Inflation higher than expected',
        boards: ['Inflation_Winners_Losers2'],
        terms: [],
        note: 'The dollars repaid are worth less than expected, so the borrower wins and the lender loses. People on fixed incomes lose too.',
      },
      {
        kicker: 'Other costs',
        title: 'Menu costs and shoe-leather costs',
        boards: [],
        terms: ['Menu Costs'],
        note: 'Restaurants reprinting menus and stores relabeling prices are menu costs. Extra trips to the bank to avoid holding cash are shoe-leather costs.',
      },
    ],
    checkQuestionIds: [3032, 3033, 154],
  },
  {
    lessonId: '2.6',
    unit: 2,
    slug: 'real-nominal-gdp',
    videoId: '24',
    brief:
      'Nominal GDP values this year\'s output at this year\'s prices. Real GDP values this year\'s output at base-year prices, so it is adjusted for inflation. Nominal GDP can rise because prices rose or because output rose. Real GDP can only rise if output rises, which is why economists use real GDP to measure growth.\n\n' +
      'The GDP deflator is a price index for everything produced in the economy, not just the consumer basket the CPI tracks. GDP deflator = nominal GDP ÷ real GDP × 100. Rearranged, real GDP = nominal GDP ÷ deflator × 100. In the base year, nominal and real GDP are equal and the deflator is 100.\n\n' +
      'Watch for a classic trap: nominal GDP can rise while real GDP falls, if prices rise faster than output falls. Always convert to real GDP before deciding whether the economy grew.',
    coreQuestion:
      'Nominal GDP is $600 billion and the GDP deflator is 120. Calculate real GDP and show your work. Then explain why economists use real GDP rather than nominal GDP to measure economic growth.',
    rubric: [
      {
        id: 'calculation',
        criterion: 'Calculates real GDP as 600 ÷ 120 × 100 = $500 billion, showing the formula or steps.',
      },
      {
        id: 'why-real',
        criterion:
          'Explains that nominal GDP can rise just because prices rise, while real GDP holds prices constant, so it rises only when actual output increases.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Real GDP = nominal GDP ÷ deflator × 100 = 600 ÷ 120 × 100 = $500 billion. Economists use real GDP because nominal GDP can go up just because prices went up, even if the economy did not produce any more. Real GDP values output at base-year prices, so it only increases when the economy actually produces more goods and services.',
    walkthrough: [
      {
        kicker: 'Nominal GDP',
        title: 'Output at current prices',
        boards: ['NGDP', 'NGDP_2'],
        terms: ['Nominal GDP'],
      },
      {
        kicker: 'Real GDP',
        title: 'Output at base-year prices',
        boards: ['RGDP', 'RGDP2'],
        terms: ['Real GDP'],
        note: 'If computers cost $100 in the base year and $110 now, real GDP still values every computer at $100. Only a change in how many are made can change real GDP.',
      },
      {
        kicker: 'The GDP deflator',
        title: 'A price index for the whole economy',
        boards: ['Deflator'],
        terms: ['GDP Deflator'],
        note: 'The CPI tracks what consumers buy. The deflator covers everything produced, including capital goods and government purchases.',
      },
      {
        kicker: 'The GDP deflator',
        title: 'The formula, both ways',
        boards: ['Deflator_Formula'],
        terms: [],
        note: 'Deflator = nominal ÷ real × 100. Rearranged: real GDP = nominal GDP ÷ deflator × 100. Nominal $15 trillion and real $12 trillion gives a deflator of 125.',
      },
      {
        kicker: 'The classic trap',
        title: 'Nominal up, real down',
        boards: [],
        terms: [],
        note: 'Nominal GDP rises from $2,310 to $2,520 billion while the deflator rises from 105 to 120. Real GDP falls from $2,200 to $2,100 billion. Prices rose faster than output fell.',
      },
    ],
    checkQuestionIds: [3046, 26213, 26217],
  },
  {
    lessonId: '2.7',
    unit: 2,
    slug: 'business-cycles',
    videoId: '23',
    brief:
      'The business cycle is the short-run rise and fall of real GDP around its long-run trend. The trend line is potential output: what the economy produces at full employment, when unemployment equals the natural rate. The wavy line is actual output.\n\n' +
      'The cycle has four phases. In an expansion, real GDP rises and unemployment falls. The peak is the top of the expansion. In a recession (contraction), real GDP falls and unemployment rises. The trough is the bottom, just before the next expansion.\n\n' +
      'The distance between actual and potential output is the output gap. When actual output is below potential, there is a recessionary gap: unemployment is above the natural rate and there is cyclical unemployment. When actual output is above potential, there is an inflationary gap: unemployment is below the natural rate and the economy is overheating. Where actual output equals potential, the economy is in long-run equilibrium at full employment.',
    coreQuestion:
      'An economy\'s actual real GDP is $500 billion and its potential real GDP is $550 billion. Explain what kind of output gap this is and how the actual unemployment rate compares with the natural rate. Then describe what happens to real GDP and unemployment during a recession.',
    rubric: [
      {
        id: 'gap',
        criterion:
          'Identifies a recessionary gap (actual output below potential) and states that the unemployment rate is above the natural rate (cyclical unemployment is positive).',
      },
      {
        id: 'recession',
        criterion: 'States that during a recession real GDP falls and unemployment rises.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Actual output ($500 billion) is below potential output ($550 billion), so the economy has a recessionary gap. That means there is cyclical unemployment, so the actual unemployment rate is above the natural rate of unemployment. During a recession, real GDP falls and the unemployment rate rises as firms produce less and lay off workers.',
    walkthrough: [
      {
        kicker: 'Reading the graph',
        title: 'Potential output',
        boards: ['Business Cycles 1'],
        terms: ['Business Cycle', 'Potential Output'],
      },
      {
        kicker: 'Reading the graph',
        title: 'Actual output',
        boards: ['Business Cycles 2'],
        terms: ['Actual Output'],
      },
      {
        kicker: 'The four phases',
        title: 'Expansion and peak',
        boards: ['Business Cycles 9', 'Business Cycles 7'],
        terms: ['Expansion', 'Peak'],
      },
      {
        kicker: 'The four phases',
        title: 'Recession and trough',
        boards: ['Business Cycles 6', 'Business Cycles 8'],
        terms: ['Recession (Contraction)', 'Trough', 'Business Inventories'],
        note: 'Unsold inventories piling up is an early sign of a recession: firms are producing more than they can sell.',
      },
      {
        kicker: 'Output gaps',
        title: 'Recessionary gap',
        boards: ['Business Cycles 4'],
        terms: ['Output Gap', 'Recessionary Gap'],
      },
      {
        kicker: 'Output gaps',
        title: 'Inflationary gap',
        boards: ['Business Cycles 3'],
        terms: ['Inflationary Gap'],
      },
      {
        kicker: 'Output gaps',
        title: 'Long-run equilibrium',
        boards: ['Business Cycles 5'],
        terms: [],
        note: 'Where actual output crosses potential output, unemployment equals the natural rate and there is no output gap.',
      },
    ],
    checkQuestionIds: [156, 29, 26206],
  },
];
