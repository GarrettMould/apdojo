import { QuestionBank } from './types';





// Fisher-Yates shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const macroSetThreeQuestions: QuestionBank = {
  name: "AP Macroeconomics",
  questions: shuffleArray([
    {
      "id": 1,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "Which of the following best describes the opportunity cost of a student choosing to attend college full-time?",
      "image": null,
      "options": [
        "The cost of tuition and books",
        "The income the student could have earned by working instead",
        "The value of the student's time spent studying",
        "The total of tuition, books, and foregone income",
        "The difference between the student's future income with and without a college degree"
      ],
      "correctAnswer": "D",
      "explanation": "Opportunity cost includes both explicit costs (tuition, books) and implicit costs (foregone income from not working). The total opportunity cost of attending college full-time is the sum of these costs."
    },
    {
      "id": 2,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "Country X can produce 100 units of food or 50 units of clothing with its resources, while Country Y can produce 60 units of food or 60 units of clothing. Based on this information, which country has the comparative advantage in producing clothing?",
      "image": null,
      "options": [
        "Country X because it has a lower opportunity cost of producing clothing",
        "Country Y because it has a lower opportunity cost of producing clothing",
        "Country X because it has an absolute advantage in food production",
        "Country Y because it can produce more clothing than Country X",
        "Neither country has a comparative advantage in clothing"
      ],
      "correctAnswer": "B",
      "explanation": "Country X's opportunity cost of producing 1 unit of clothing is 2 units of food (100/50), while Country Y's opportunity cost is 1 unit of food (60/60). Since Country Y has a lower opportunity cost, it has the comparative advantage in clothing production."
    },
    {
      "id": 3,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "A bowed out production possibilities frontier (PPF) curve indicates that:",
      "image": null,
      "options": [
        "The economy is operating efficiently",
        "The economy is producing an inefficient combination of goods",
        "As production of a good increases, the opportunity cost of producing that good increases",
        "As the production of one good increases, the opportunity cost of producing that good decreases",
        "As the production of one good increases, the opportunity cost of producing that good reamins constant"
      ],
      "correctAnswer": "C",
      "explanation": "A bowed out PPF curve indicates increasing opportunity cost. As more of a certain good is produced, it requires giving up increasing amounts of the other good. This often happens when the two goods being produced do not use similar resources."
    },
    {
      "id": 4,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "In a competitive market, if the price of a good is above the equilibrium price, which of the following will occur?",
      "image": null,
      "options": [
        "A shortage will develop",
        "A surplus will develop",
        "The quantity demanded will increase",
        "The quantity supplied will decrease",
        "The market will remain in equilibrium"
      ],
      "correctAnswer": "B",
      "explanation": "When price is above equilibrium, the quantity supplied exceeds the quantity demanded, creating a surplus. This surplus puts downward pressure on the price, moving it toward equilibrium."
    },
    {
      "id": 5,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "If two countries engage in trade based on comparative advantage, which of the following must be true?",
      "image": null,
      "options": [
        "Both countries must have absolute advantages in different goods",
        "One country must have an absolute advantage in both goods",
        "Both countries will be able to consume beyond their production possibilities frontiers",
        "One country will benefit more than the other from trade",
        "Both countries must have similar production capabilities"
      ],
      "correctAnswer": "C",
      "explanation": "Trade based on comparative advantage allows both countries to specialize and consume beyond their individual production possibilities frontiers, resulting in mutual gains from trade regardless of absolute advantages."
    },
    {
      "id": 6,
      "unit": 2,
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "If nominal GDP is $20 trillion and real GDP is $18 trillion in a given year, what is the GDP deflator for that year?",
      "image": null,
      "options": [
        "90",
        "111.1",
        "120",
        "180",
        "200"
      ],
      "correctAnswer": "B",
      "explanation": "The GDP deflator is calculated as (Nominal GDP/Real GDP) × 100. In this case, ($20 trillion/$18 trillion) × 100 = 111.1."
    },
    {
      "id": 7,
      "unit": 2,
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "Which of the following transactions would NOT be included in the calculation of GDP?",
      "image": null,
      "options": [
        "A restaurant purchases locally grown vegetables for its menu",
        "A construction company builds a new office building",
        "A teacher receives a paycheck for their work at a public school",
        "A student sells their used textbook to another student",
        "An auto manufacturer produces and sells new cars"
      ],
      "correctAnswer": "D",
      "explanation": "The sale of a used textbook between students is a transfer of an existing good, not the production of a new good or service, so it is not counted in GDP. Only final goods and services produced within the current time period are included in GDP."
    },
    {
      "id": 8,
      "unit": 2,
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "If the CPI was 240 last year and is 252 this year, what is the inflation rate?",
      "image": null,
      "options": [
        "5%",
        "4.8%",
        "5.2%",
        "5%",
        "12%"
      ],
      "correctAnswer": "A",
      "explanation": "The inflation rate is calculated as ((New CPI - Old CPI)/Old CPI) × 100. In this case, ((252 - 240)/240) × 100 = (12/240) × 100 = 5%."
    },
    {
      "id": 9,
      "unit": 2,
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "If a country is currently operating at its potential GDP, which of the following is true?",
      "image": null,
      "options": [
        "The actual inflation rate is higher than the expected inflation rate",
        "There is no cyclical unemployment",
        "The economy is experiencing a positive output gap",
        "The actual unemployment rate is equal to the natural rate of unemployment",
        "A worker who lacks the skills required for available jobs"
      ],
      "correctAnswer": "D",
      "explanation": "There is an inverse relationship between unemployment and output. If output is low, unemployment tends to be high. If output is high, unemployment tends to be low. If output is equal to potential output, unemployment will be equal to the natural rate of unemployment."
    },
    {
      "id": 10,
      "unit": 2,
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "One flaw of GDP as a measure of a nation's economic performance is that it:",
      "image": null,
      "options": [
        "Trough",
        "Contraction",
        "Expansion",
        "Peak",
        "Depression"
      ],
      "correctAnswer": "C",
      "explanation": "During the expansion phase of the business cycle, the economy experiences rising employment, increasing output, and often accelerating inflation. Interest rates typically rise as the central bank attempts to prevent the economy from overheating."
    },
    {
      "id": 11,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the marginal propensity to consume (MPC) is 0.75, what is the spending multiplier?",
      "image": null,
      "options": [
        "0.75",
        "1.33",
        "3",
        "4",
        "7.5"
      ],
      "correctAnswer": "D",
      "explanation": "The spending multiplier is calculated as 1/(1-MPC). With an MPC of 0.75, the multiplier is 1/(1-0.75) = 1/0.25 = 4. This means that each dollar of new spending generates $4 of total income in the economy."
    },
    {
      "id": 12,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "Which of the following would cause the aggregate demand curve to shift to the right?",
      "image": null,
      "options": [
        "An increase in business taxes",
        "A decrease in government spending",
        "An increase in consumer wealth",
        "A decrease in the money supply",
        "An increase in interest rates"
      ],
      "correctAnswer": "C",
      "explanation": "An increase in consumer wealth leads to higher consumer spending, which is a component of aggregate demand. This shifts the aggregate demand curve to the right, indicating an increase in total spending at each price level."
    },
    {
      "id": 13,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the economy is experiencing a recessionary gap, which of the following fiscal policies would be most appropriate?",
      "image": null,
      "options": [
        "Increasing government spending",
        "Increasing taxes",
        "Decreasing government spending",
        "Decreasing the money supply",
        "Increasing interest rates"
      ],
      "correctAnswer": "A",
      "explanation": "A recessionary gap occurs when actual GDP is below potential GDP. Increasing government spending is an expansionary fiscal policy that can help close this gap by stimulating aggregate demand and moving the economy toward potential output."
    },
    {
      "id": 14,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "Which of the following would cause the short-run aggregate supply curve to shift to the left?",
      "image": null,
      "options": [
        "A decrease in the price of imported oil",
        "An increase in worker productivity",
        "A decrease in wages",
        "An increase in business taxes",
        "Technological improvements"
      ],
      "correctAnswer": "D",
      "explanation": "An increase in business taxes raises production costs for firms, causing the short-run aggregate supply curve to shift to the left. This represents a decrease in the quantity supplied at each price level due to higher costs of production."
    },
    {
      "id": 15,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the economy is at full employment and the government implements an expansionary fiscal policy, which of the following is most likely to occur in the short run?",
      "image": null,
      "options": [
        "A decrease in the price level",
        "An increase in unemployment",
        "An increase in real GDP and the price level",
        "A decrease in real GDP and the price level",
        "No change in real GDP or the price level"
      ],
      "correctAnswer": "C",
      "explanation": "When the economy is already at full employment, expansionary fiscal policy will increase aggregate demand, leading to higher prices (inflation) rather than significantly increasing real output in the short run. This results in higher nominal GDP but limited real GDP growth."
    },
    {
      "id": 16,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the marginal propensity to save (MPS) is 0.3, what is the tax multiplier?",
      "image": null,
      "options": [
        "-0.7",
        "-2.33",
        "-3.33",
        "-7",
        "-10"
      ],
      "correctAnswer": "B",
      "explanation": "The tax multiplier is calculated as -MPC/(1-MPC). Since MPS + MPC = 1, if MPS = 0.3, then MPC = 0.7. The tax multiplier is -0.7/(1-0.7) = -0.7/0.3 = -2.33. This means that each dollar of tax increase reduces total income by $2.33."
    },
    {
      "id": 17,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the economy is experiencing an inflationary gap, what will happen to wages and the short-run aggregate supply curve in the long run without government intervention?",
      "image": null,
      "options": [
        "Wages will rise and SRAS will shift right",
        "Wages will rise and SRAS will shift left",
        "Wages will fall and SRAS will shift right",
        "Wages will fall and SRAS will shift left",
        "Wages and SRAS will remain unchanged"
      ],
      "correctAnswer": "B",
      "explanation": "In an inflationary gap, the high demand for labor will put upward pressure on wages. As wages rise, production costs increase, causing the short-run aggregate supply curve to shift left. This process continues until the economy returns to its long-run equilibrium at potential GDP."
    },
    {
      "id": 18,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the government increases spending by $50 billion and simultaneously increases taxes by $50 billion, what will be the approximate effect on equilibrium GDP if the MPC is 0.8?",
      "image": null,
      "options": [
        "An increase of $10 billion",
        "An increase of $50 billion",
        "A decrease of $10 billion",
        "A decrease of $50 billion",
        "No change in equilibrium GDP"
      ],
      "correctAnswer": "A",
      "explanation": "This is an example of a balanced budget multiplier. The net effect equals the spending multiplier times the spending change, plus the tax multiplier times the tax change. With MPC = 0.8, the spending multiplier is 5 and the tax multiplier is -4. So, $50 billion × 5 + $50 billion × (-4) = $250 billion - $200 billion = $50 billion. Alternatively, the balanced budget multiplier equals 1, so $50 billion × 1 = $50 billion."
    },
    {
      "id": 19,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "If the required reserve ratio is 10% and a bank receives a new deposit of $1,000, how much can this bank lend out based on this new deposit?",
      "image": null,
      "options": [
        "$100",
        "$900",
        "$1,000",
        "$9,000",
        "$10,000"
      ],
      "correctAnswer": "B",
      "explanation": "With a required reserve ratio of 10%, the bank must keep 10% of the deposit ($100) as required reserves and can lend out the remaining 90% ($900)."
    },
    {
      "id": 20,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "What is the maximum amount that the banking system as a whole can create in new deposits from an initial deposit of $1,000 if the required reserve ratio is 10%?",
      "image": null,
      "options": [
        "$1,000",
        "$9,000",
        "$10,000",
        "$11,000",
        "$100,000"
      ],
      "correctAnswer": "C",
      "explanation": "The maximum amount of money the banking system can create is calculated using the money multiplier formula: 1/required reserve ratio. With a 10% required reserve ratio, the money multiplier is 1/0.1 = 10. So, an initial deposit of $1,000 can lead to a maximum of $1,000 × 10 = $10,000 in new deposits throughout the banking system."
    },
    {
      "id": 21,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Which of the following is NOT a tool of monetary policy used by the Federal Reserve?",
      "image": null,
      "options": [
        "Open market operations",
        "Changing the discount rate",
        "Adjusting reserve requirements",
        "Setting fiscal policy",
        "Interest on reserves"
      ],
      "correctAnswer": "D",
      "explanation": "Setting fiscal policy (government spending and taxation) is a function of Congress and the President, not the Federal Reserve. The Federal Reserve is responsible for monetary policy through tools such as open market operations, the discount rate, reserve requirements, and interest on reserves."
    },
    {
      "id": 22,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "If the Federal Reserve wants to combat high inflation, which of the following actions would it most likely take?",
      "image": null,
      "options": [
        "Lower the federal funds rate",
        "Purchase government securities in the open market",
        "Decrease reserve requirements",
        "Sell government securities in the open market",
        "Increase government spending"
      ],
      "correctAnswer": "D",
      "explanation": "To combat high inflation, the Federal Reserve would implement contractionary monetary policy. Selling government securities in the open market reduces bank reserves, decreases the money supply, and raises interest rates, which helps reduce inflationary pressures."
    },
    {
      "id": 23,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "According to the quantity theory of money, if the velocity of money and real GDP remain constant, what happens when the money supply increases by 8%?",
      "image": null,
      "options": [
        "The price level decreases by 8%",
        "The price level increases by 8%",
        "Real GDP increases by 8%",
        "The velocity of money increases by 8%",
        "The money supply and price level remain unchanged"
      ],
      "correctAnswer": "B",
      "explanation": "According to the quantity theory of money (MV = PY), if velocity (V) and real GDP (Y) remain constant, then there is a proportional relationship between the money supply (M) and the price level (P). If the money supply increases by 8%, the price level will also increase by 8%."
    },
    {
      "id": 24,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Which of the following best describes the relationship between interest rates and bond prices?",
      "image": null,
      "options": [
        "When interest rates rise, bond prices rise",
        "When interest rates rise, bond prices fall",
        "When interest rates rise, bond prices remain unchanged",
        "There is no relationship between interest rates and bond prices",
        "The relationship depends on the type of bond"
      ],
      "correctAnswer": "B",
      "explanation": "There is an inverse relationship between interest rates and bond prices. When interest rates rise, bond prices fall, and when interest rates fall, bond prices rise. This occurs because existing bonds with lower interest rates become less attractive compared to new bonds issued at higher rates."
    },
    {
      "id": 25,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Which of the following would cause the money demand curve to shift to the right?",
      "image": null,
      "options": [
        "A decrease in real GDP",
        "An increase in interest rates",
        "A decrease in the price level",
        "An increase in real GDP",
        "A decrease in the number of transactions in the economy"
      ],
      "correctAnswer": "D",
      "explanation": "An increase in real GDP means higher income and more economic activity, which increases the demand for money for transactions purposes. This shifts the money demand curve to the right, indicating a greater quantity of money demanded at each interest rate."
    },
    {
      "id": 26,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Which of the following is NOT included in the M1 money supply?",
      "image": null,
      "options": [
        "Currency in circulation",
        "Traveler's checks",
        "Checking account balances",
        "Savings account balances",
        "Debit card transactions"
      ],
      "correctAnswer": "D",
      "explanation": "M1 includes the most liquid forms of money: currency in circulation, traveler's checks, and checking account balances (demand deposits). Savings account balances are part of M2, not M1, because they are slightly less liquid than checking accounts."
    },
    {
      "id": 27,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following is most likely to increase a nation's long-run economic growth rate?",
      "image": null,
      "options": [
        "Expansionary monetary policy",
        "Expansionary fiscal policy",
        "Increased investment in human capital",
        "Price controls to reduce inflation",
        "Increased unemployment benefits"
      ],
      "correctAnswer": "C",
      "explanation": "Increased investment in human capital (education, training, skills development) enhances labor productivity and technological innovation, which are key drivers of long-run economic growth. Unlike short-term stabilization policies, investments in human capital expand the economy's productive capacity."
    },
    {
      "id": 28,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "According to the long-run Phillips curve, what happens to the unemployment rate when inflation expectations fully adjust to actual inflation?",
      "image": null,
      "options": [
        "The unemployment rate falls below the natural rate",
        "The unemployment rate rises above the natural rate",
        "The unemployment rate returns to the natural rate",
        "The unemployment rate becomes zero",
        "The unemployment rate becomes negatively correlated with inflation"
      ],
      "correctAnswer": "C",
      "explanation": "According to the long-run Phillips curve theory, when inflation expectations fully adjust to actual inflation, the unemployment rate returns to its natural rate regardless of the inflation rate. This is represented by a vertical long-run Phillips curve at the natural rate of unemployment."
    },
    {
      "id": 29,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following best describes the crowding-out effect?",
      "image": null,
      "options": [
        "Government spending reduces unemployment",
        "Budget deficits raise interest rates and reduce private investment",
        "Monetary expansion leads to inflation",
        "Tax increases reduce consumer spending",
        "Foreign investment displaces domestic investment"
      ],
      "correctAnswer": "B",
      "explanation": "The crowding-out effect occurs when government borrowing to finance budget deficits increases the demand for loanable funds, raising interest rates. Higher interest rates reduce private investment spending, partially offsetting the stimulative effect of government spending."
    },
    {
      "id": 30,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following is a supply-side policy that can increase long-run aggregate supply?",
      "image": null,
      "options": [
        "Increasing government spending on infrastructure",
        "Reducing income tax rates to increase work incentives",
        "Increasing the money supply",
        "Implementing price controls",
        "Increasing unemployment benefits"
      ],
      "correctAnswer": "B",
      "explanation": "Reducing income tax rates can increase work incentives, labor force participation, and productivity, which are supply-side factors that can shift the long-run aggregate supply curve to the right. This policy aims to expand the economy's productive capacity rather than stimulate demand."
    },
    {
      "id": 31,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which statement about the effect of budget deficits on the economy is most accurate in the long run?",
      "image": null,
      "options": [
        "Budget deficits always lead to higher inflation",
        "Budget deficits have no effect on interest rates",
        "Budget deficits can crowd out private investment and reduce long-term economic growth",
        "Budget deficits always stimulate economic growth",
        "Budget deficits have no effect on national saving"
      ],
      "correctAnswer": "C",
      "explanation": "In the long run, persistent budget deficits can crowd out private investment by increasing the demand for loanable funds and raising interest rates. With less private investment, capital formation slows, reducing the economy's productive capacity and potential for long-term economic growth."
    },
    {
      "id": 32,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following is a limitation of monetary policy in stimulating economic growth during a severe recession?",
      "image": null,
      "options": [
        "Monetary policy cannot affect interest rates",
        "The liquidity trap, where further increases in the money supply have little effect on interest rates",
        "Monetary policy can only be contractionary, not expansionary",
        "Monetary policy works too quickly to be effective",
        "Central banks cannot implement monetary policy without government approval"
      ],
      "correctAnswer": "B",
      "explanation": "During a severe recession, the economy may enter a liquidity trap, where interest rates are already very low and further increases in the money supply have little effect on interest rates or spending. In this situation, monetary policy becomes less effective at stimulating economic growth."
    },
    {
      "id": 33,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following would most likely result from a sustained period of government budget surpluses?",
      "image": null,
      "options": [
        "Higher interest rates",
        "Reduced private investment",
        "Increased national debt",
        "Lower taxes in the future",
        "Decreased international trade"
      ],
      "correctAnswer": "D",
      "explanation": "A sustained period of government budget surpluses reduces the national debt, which can allow for lower taxes in the future. With less government borrowing, there is also less pressure on interest rates, potentially increasing private investment."
    },
    {
      "id": 34,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "If a country's exports exceed its imports, it is experiencing a:",
      "image": null,
      "options": [
        "Trade deficit",
        "Trade surplus",
        "Budget deficit",
        "Budget surplus",
        "Balanced trade"
      ],
      "correctAnswer": "B",
      "explanation": "A trade surplus occurs when the value of a country's exports exceeds the value of its imports during a specific period. This represents a positive balance of trade."
    },
    {
      "id": 35,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "Which of the following would most likely cause a country's currency to appreciate in a floating exchange rate system?",
      "image": null,
      "options": [
        "An increase in the country's inflation rate relative to other countries",
        "A decrease in the country's interest rates relative to other countries",
        "An increase in demand for the country's exports",
        "An increase in imports with no change in exports",
        "A decrease in foreign investment in the country"
      ],
      "correctAnswer": "C",
      "explanation": "An increase in demand for a country's exports increases the demand for its currency, as foreign buyers need the domestic currency to purchase these exports. This increased demand for the currency causes it to appreciate in a floating exchange rate system."
    },
    {
      "id": 36,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "If the exchange rate changes from 100 yen per dollar to 120 yen per dollar, what has occurred?",
      "image": null,
      "options": [
        "The dollar has appreciated and the yen has depreciated",
        "The dollar has depreciated and the yen has appreciated",
        "Both currencies have appreciated",
        "Both currencies have depreciated",
        "The exchange rate has remained constant in real terms"
      ],
      "correctAnswer": "A",
      "explanation": "When the exchange rate changes from 100 yen per dollar to 120 yen per dollar, it means that one dollar now buys more yen than before (120 instead of 100). Therefore, the dollar has appreciated (become stronger) and the yen has depreciated (become weaker)."
    },
    {
      "id": 37,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "Which of the following would lead to an increase in the demand for Mexican pesos in the foreign exchange market?",
      "image": null,
      "options": [
        "Mexican consumers buying more American goods",
        "American investors selling Mexican government bonds",
        "American tourists vacationing in Mexico",
        "The Mexican central bank selling pesos and buying dollars",
        "Mexican companies investing in American businesses"
      ],
      "correctAnswer": "C",
      "explanation": "American tourists vacationing in Mexico need to convert their dollars to pesos to pay for goods and services in Mexico. This increases the demand for pesos in the foreign exchange market, potentially causing the peso to appreciate relative to the dollar."
    },
    {
      "id": 38,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "If a country is running a current account deficit, which of the following must be true?",
      "image": null,
      "options": [
        "The country must also be running a budget deficit",
        "The country's currency must be depreciating",
        "The country must be experiencing a capital account surplus",
        "The country must have high interest rates",
        "The country must have a fixed exchange rate"
      ],
      "correctAnswer": "C",
      "explanation": "Based on the balance of payments accounting identity, if a country is running a current account deficit, it must be experiencing a capital account surplus (also called a financial account surplus). This means the country is receiving net capital inflows from abroad to finance its current account deficit."
    },
    {
      "id": 39,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "Which of the following is a potential benefit of currency depreciation for a country?",
      "image": null,
      "options": [
        "Cheaper imports for domestic consumers",
        "Increased purchasing power for citizens traveling abroad",
        "Increased competitiveness of exports in foreign markets",
        "Lower inflation rates",
        "Reduced cost of servicing foreign debt"
      ],
      "correctAnswer": "C",
      "explanation": "Currency depreciation makes a country's exports cheaper for foreign buyers, increasing the competitiveness of these exports in international markets. This can boost export volumes, domestic production, and employment in export industries."
    },
    {
      "id": 40,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "In a fixed exchange rate system, if market forces are putting upward pressure on a country's currency, what must the central bank do to maintain the fixed rate?",
      "image": null,
      "options": [
        "Sell domestic currency and buy foreign currency",
        "Buy domestic currency and sell foreign currency",
        "Raise domestic interest rates",
        "Lower domestic interest rates",
        "Implement capital controls"
      ],
      "correctAnswer": "A",
      "explanation": "If market forces are putting upward pressure on a country's currency in a fixed exchange rate system, the central bank must sell domestic currency and buy foreign currency to increase the supply of domestic currency and prevent it from appreciating beyond the fixed rate."
    },
  ])
};