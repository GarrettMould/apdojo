import { QuestionBank } from './types';
import macroSetTwoQ17 from '../../../public/images/macroSetTwoQ17.png';
import macroSetTwoQ20 from '../../../public/images/macroSetTwoQ20.png';
import macroSetTwoQ21 from '../../../public/images/macroSetTwoQ21.png';
import macroSetTwoQ24 from '../../../public/images/macroSetTwoQ24.png';
import macroSetTwoQ28 from '../../../public/images/macroSetTwoQ28.png';
import macroSetTwoQ30 from '../../../public/images/macroSetTwoQ30.png';
import macroSetTwoQ31 from '../../../public/images/macroSetTwoQ31.png';
import macroSetTwoQ39 from '../../../public/images/macroSetTwoQ39.png';
import macroSetTwoQ42 from '../../../public/images/macroSetTwoQ42.png';
import macroSetTwoQ46 from '../../../public/images/macroSetTwoQ46.png';




// Fisher-Yates shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const macroSetTwoQuestions: QuestionBank = {
  name: "AP Macroeconomics",
  questions: shuffleArray([
    {
        "id": 1,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "If two countries specialize in the production of goods in which they have a comparative advantage and trade with each other, which of the following will occur?",
        "image": null,  "options": [
          "Both countries will have higher opportunity costs",
          "Both countries will be able to consume outside their production possibilities frontier",
          "Only the country with the absolute advantage in both goods will benefit",
          "Neither country will be better off",
          "Both countries will experience a leftward shift in their production possibilities frontier"
        ],
        "correctAnswer": "B",
        "explanation": "Specialization and trade based on comparative advantage allows both countries to consume outside their production possibilities frontier, leading to gains from trade."
      },
      {
        "id": 2,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "Country A can produce 10 computers or 20 tons of wheat per worker, while Country B can produce 5 computers or 15 tons of wheat per worker. Based on this information:",
        "image": null,  "options": [
          "Country A has an absolute advantage in both goods",
          "Country B has a comparative advantage in wheat production",
          "Country A has a comparative advantage in both goods",
          "Both countries would benefit from specializing in computer production",
          "No trade would benefit either country"
        ],
        "correctAnswer": "A",
        "explanation": "Country A can produce more of both goods per worker than Country B (10 computers > 5 computers and 20 tons of wheat > 15 tons of wheat), which means Country A has an absolute advantage in both goods. However, comparative advantage is based on opportunity costs, not absolute production capabilities."
      },
      {
        "id": 3,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "Which of the following would most likely cause a nation's production possibilities frontier to shift inward?",
        "image": null,  "options": [
          "A severe recession that increases unemployment",
          "Implementation of a more efficient tax system",
          "A major natural disaster destroying productive capacity",
          "An increase in the labor force participation rate",
          "Improved educational outcomes"
        ],
        "correctAnswer": "C",
        "explanation": "A major natural disaster that destroys productive capacity reduces the maximum potential output of an economy, causing the production possibilities frontier to shift inward. This represents a decrease in the economy's productive capacity due to the destruction of physical capital and infrastructure. Option A would not shift the production possibilities frontier inward, but the country would temporarily be producing within their production possibilities frontier."
      },
      {
        "id": 4,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "A negative supply shock will most likely cause an increase in which of the following?",
        "image": null,  "options": [
          "Only the price level",
          "Both the price level and the unemployment rate",
          "Only the unemployment rate",
          "Both the price level and real GDP",
          "Only real GDP"
        ],
        "correctAnswer": "B",
        "explanation": "A negative supply shock will cause the short-run aggregate supply curve to shift leftward, which will cause an increase in the price level and the unemployment rate. This is also known as 'stagflation'."
      },
      {
        "id": 5,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "In a country, nominal GDP increased by 8% while the GDP deflator increased by 5%. What was the approximate growth rate of real GDP?",
        "image": null,  "options": [
          "3%",
          "5%",
          "8%",
          "13%",
          "40%"
        ],
        "correctAnswer": "A",
        "explanation": "The approximate growth rate of real GDP can be calculated as: (% change in nominal GDP) - (% change in GDP deflator) = 8% - 5% = 3%. This calculation adjusts for inflation to determine the actual change in output volume."
      },
      {
        "id": 6,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "Which phase of the business cycle is characterized by declining real GDP, rising unemployment, and decreasing business investment?",
        "image": null,  "options": [
          "Peak",
          "Expansion",
          "Recovery",
          "Contraction",
          "Trough"
        ],
        "correctAnswer": "D",
        "explanation": "The contraction phase of the business cycle is characterized by declining real GDP, rising unemployment rates, and decreasing business investment. This phase occurs after the peak of the cycle and continues until the economy reaches a trough."
      },
      {
        "id": 7,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "Which of the following transactions would be counted in the calculation of GDP?",
        "image": null,  "options": [
          "A retiree receives Social Security benefits",
          "A company pays dividends to its shareholders",
          "A family purchases a newly constructed home",
          "A student receives a government scholarship",
          "An investor purchases existing shares of stock"
        ],
        "correctAnswer": "C",
        "explanation": "The purchase of a newly constructed home represents investment in new physical capital and is included in GDP. GDP counts only final goods and services produced within a country during a specific time period, and new homes are considered final goods in GDP accounting."
      },
      {
        "id": 8,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "If the price of a market basket increases from $220 to $242 in one year, what is the inflation rate for that year?",
        "image": null,  "options": [
          "1.1%",
          "10%",
          "11%",
          "22%",
          "10.9%"
        ],
        "correctAnswer": "C",
        "explanation": "Inflation rate = ((New price - Old price) ÷ Old price) × 100 = (($242 - $220) ÷ $220) × 100 = (22 ÷ 220) × 100 = 0.11 × 100 = 11%"
      },
      {
        "id": 9,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "If the marginal propensity to consume in an economy is 0.6, then a $5 billion increase in taxes will reduce equilibrium GDP by:",
        "image": null,  "options": [
          "$12.5 billion",
          "$15 billion",
          "$7.5 billion",
          "$1.5 billion",
          "$2.5 billion"
        ],
        "correctAnswer": "C",
        "explanation": "The tax multiplier equals -MPC/(1-MPC). (Easy trick: tax multiplier is always one less than the spending multiplier) With MPC = 0.6, the tax multiplier is -0.6/(1-0.6) = -0.6/0.4 = -1.5. Therefore, a $5 billion increase in taxes will reduce equilibrium GDP by $7.5 billion."
      },
      {
        "id": 10,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "If the government increase spending by $100 billion while at the same time increasing taxes by the same amount, what will be the short-run impact to the aggregate demand and short-run aggregate supply curves?",
        "image": null,  "options": [
          "AD shifts right, SRAS shifts right",
          "AD shifts right, SRAS remains unchanged",
          "AD remains unchanged, SRAS shifts right",
          "AD shifts left, SRAS remains unchanged",
          "AD and SRAS both shift right"
        ],
        "correctAnswer": "B",
        "explanation": "Balanced budget multiplier = Spending multiplier + Tax multiplier. (Easy trick: balanced budget multiplier is always 1. This is because the spending multipler is always one more than the tax multiplier, and the tax multiplier is negative. Example -->  spending multiplier: 3, tax multiplier: -2. Balanced budget multiplier = 3 + (-2) = 1.) Since the government increases spending by $100 billion and increases taxes by $100 billion, the total impact on GDP will be $100 billion x 1 = $100 billion."
        },
      {
        "id": 11,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "Which of the following describes the process by which the economy depicted will return to long-run equilibrium in the absence of any fiscal or monetary policy intervention?",
        "image": null,  "options": [
          "An increase in the price level will cause the aggregate demand curve to shift leftward",
          "Without policy intervention, the economy will remain in short-run equilibrium",
          "As unemployment increases, nominal wages will fall, causing the short-run aggregate supply curve to shift rightward",
          "An decrease in government transfer payments will shift the short-run aggregate supply curve leftward",
          "As unemployment increases, nominal wages will rise, causing aggregate demand to increase"
        ],
        "correctAnswer": "C",
        "explanation": "An increase in foreign income would increase foreign demand for domestic exports, shifting the aggregate demand curve rightward. Higher export demand contributes to aggregate demand through the net exports component."
      },
      {
        "id": 12,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "When the economy is experiencing an inflationary gap, which fiscal policy approach would be most appropriate?",
        "image": null,  "options": [
          "Increasing government spending",
          "Decreasing tax rates",
          "Implementing an expansionary fiscal policy",
          "Implementing a contractionary fiscal policy",
          "Raising the discount rate"
        ],
        "correctAnswer": "D",
        "explanation": "An inflationary gap occurs when actual GDP exceeds potential GDP. Implementing contractionary fiscal policy (reducing government spending or increasing taxes) would help reduce aggregate demand and bring the economy back toward its potential output level, reducing inflationary pressures."
      },
      {
        "id": 13,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "A decrease in inventories is a leading indicator of a recession, as it represents a decrease in which of the following components of GDP?",
        "image": null,  "options": [
          "Wages",
          "Government spending",
          "Investment",
          "Net exports",
          "Consumption"
        ],
        "correctAnswer": "E",
        "explanation": "Inventories refers to the stock of unsold goods held by a business. Business typically determine how much to produce by estimating consumer demand. If inventories are rising, that means consumer demand is lower than expected, which could be a sign of an impending recession."
      },
      {
        "id": 14,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "If a nation adopts commits to welcoming skilled immigrants from countries around the world, what impact will this likely have on the nation's long-run aggregate supply curve and production possibilities frontier?",
        "image": null,  "options": [
          "LRAS would shift right, but the PPF would remain unchanged",
          "LRAS would remain unchanged, but the PPF would shift right",
          "Both the LRAS and PPF would shift right",
          "LRAS would shift left, but the PPF would remain unchanged",
          "Both the LRAS and PPF would remain unchanged"
        ],
        "correctAnswer": "C",
        "explanation": "This policy would lead to higher levels of human capital and a larger labor force. Any increase in a country's factors of production - including labor and capital - can lead to an increase in production possibilities. Both the LRAS and PPF represent the maximum output that can be produced given the available resources."
      },
      {
        "id": 15,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "Lindsay finds a $100 bill on the ground. She decides to deposit it in her checking account. What is the immediate impact on the money supply?",
        "image": null,  "options": [
          "The money supply increases by $100",
          "The money supply decreases by $100",
          "The money supply increases by $90",
          "The money supply decreases by $90",
          "The money supply remains unchanged"
        ],
        "correctAnswer": "E",
        "explanation": "When Lindsay deposits the $100, the money moves from physical currency (cash in circulation) to a demand deposit (a checking account balance), both of which are part of M1. Since both physical currency and demand deposits are part of M1, the total money supply remains unchanged."
      },
      {
        "id": 16,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "To reduce high inflation, which combination of monetary policy tools would a central bank most likely use?",
        "image": null,  "options": [
          "Decrease the discount rate and buy government securities",
          "Decrease the discount rate and sell government securities",
          "Increase the discount rate and buy government securities",
          "Increase the discount rate and sell government securities",
          "Keep the discount rate unchanged and increase reserve requirements"
        ],
        "correctAnswer": "D",
        "explanation": "To reduce high inflation, a central bank would implement contractionary monetary policy by increasing the discount rate (making borrowing more expensive) and selling government securities (reducing bank reserves and the money supply). These actions restrict credit and reduce aggregate demand, helping to lower inflation."
      },
      {
        "id": 17,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "Which of the following ample reserves monetary policy tools is shown in the diagram?",
        "image": macroSetTwoQ17,  "options": [
          "A decrease in the policy rate, which will increase the money supply",
          "An increase in the policy rate, which will decrease the money supply",
          "An increase in the required reserve ratio, which will decrease the money supply",
          "A decrease in government bond purchases, which will decrease the money supply",
          "A decrease in personal income taxes, which will increase the money supply"
        ],
        "correctAnswer": "A",
        "explanation": "This graph of the ample reserve market shows a decrease in the policy rate. A decrease in the policy rate will encourage banks to lend more of their excess reserves, which will have the short-run impact of increasing RGDP, increasing the price level, and decreasing unemployment."
      },
      {
        "id": 18,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "When the Federal Reserve conducts an open market purchase, it:",
        "image": null,  "options": [
          "Sells government securities to decrease bank reserves",
          "Buys government securities to increase bank reserves",
          "Raises the discount rate to increase borrowing costs",
          "Lowers reserve requirements to expand lending capacity",
          "Provides direct loans to commercial banks"
        ],
        "correctAnswer": "B",
        "explanation": "When the Federal Reserve conducts an open market purchase, it buys government securities from banks or the public, crediting bank reserves in payment. This increases bank reserves, allowing banks to make more loans and expanding the money supply."
      },
      {
        "id": 19,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "According to the quantity theory of money, if the velocity of money remains constant and the money supply increase by 5%, what will happen to the price level?",
        "image": null,  "options": [
          "The price level will remain constant",
          "The price level will increase by 5%",
          "The price level will decrease by 5%",
          "The price level will increase by more than 5%",
          "The price level will decrease by more than 5%"
        ],
        "correctAnswer": "B",
        "explanation": "According to the quantity theory of money, a change to one side of the equation will be offset by a change to the other side of the equation. If the velocity of money remains constant and the money supply increase by 5%, the price level will increase by 5%. The quantity theory of money helps us understand the impact that an expansion of the money supply might have on inflation in an economy"
      },
      {
        "id": 20,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "The change in money demand shown on the following diagram could be due to which of the following?",
        "image": macroSetTwoQ20,  "options": [
          "A decrease in private investment",
          "A decrease in the price level",
          "Selling government securities",
          "An increase in interest rates",
          "An increase in real income"
        ],
        "correctAnswer": "E",
        "explanation": "An increase in real income would lead to an increase in money demand. This is because as people's income increases, they will want to hold more money for transactions. Think about it this way - if you get a promotion, you'll likely start buying nicer things, right? Well you need to hold more M1 money to buy those things. The same is true when a country's real income increases."
      },
      {
        "id": 21,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "At which of the following points would the government be most likely to increase expenditures and decrease taxes?",
        "image": macroSetTwoQ21,  "options": [
          "Point R",
          "Point S",
          "Point T",
          "Point U",
          "Point V"
        ],
        "correctAnswer": "A",
        "explanation": "Point R shows an economy is a recessionary gap. To close this gap, the government would likely implement expansionary fiscal policy measures, which includes increasing expenditures and decreasing taxes."
      },
      {
        "id": 22,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "A government budget deficit can best be described as:",
        "image": null,  "options": [
          "Private spending that exceeds private savings",
          "Government spending that exceeds government revenue",
          "Tax revenues that exceed transfer payments",
          "Public savings that exceed private savings",
          "Private debt accumulated by households"
        ],
        "correctAnswer": "B",
        "explanation": "A government budget deficit occurs when government spending exceeds tax revenues. This means the government is borrowing money to finance its spending, which can lead to higher interest rates and reduced private investment."
      },
      {
        "id": 23,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "Which economic policy would most directly contribute to an increase in an economy's long-run aggregate supply?",
        "image": null,  "options": [
          "Implementing an expansionary fiscal policy",
          "Decreasing the interest rate",
          "Deregulating industries to increase competition",
          "Imposing price controls to reduce inflation",
          "Increasing unemployment benefits"
        ],
        "correctAnswer": "C",
        "explanation": "Deregulating industries to increase competition would most directly contribute to an increase in long-run aggregate supply. Reducing regulatory barriers can improve efficiency, increase productivity, and expand the economy's production capacity, shifting the long-run aggregate supply curve rightward."
      },
      {
        "id": 24,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "If a nation is currently operating at Point X on the following diagram, an increase in short-run aggregate supply would lead to which corresponding change on the Phillips Curve?",
        "image": macroSetTwoQ24,  "options": [
          "A rightward shift of the short-run Phillips Curve",
          "An upwaward movement along the short-run Phillips Curve",
          "A rightward shift of the long-run Phillips Curve",
          "A downward movement along the short-run Phillips Curve",
          "A leftward shift of the long-run Phillips Curve"
        ],
        "correctAnswer": "E",
        "explanation": "An increase in short-run aggregate supply will decrease the price level and decrease unemployment. These changes can be shown by a leftward shift of short-run Phillips Curve."
      },
      {
        "id": 25,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "Which statement accurately describes the economic concept of policy lags?",
        "image": null,  "options": [
          "The delay between a policy change and its effects on the economy",
          "The tendency of governments to implement the same policies repeatedly",
          "The reduced effectiveness of a policy over time as people adapt to it",
          "The legal restrictions on how quickly policy changes can be implemented",
          "The delay in publishing economic data used for policymaking"
        ],
        "correctAnswer": "A",
        "explanation": "Policy lags refer to the delays between a policy change and its effects on the economy. These include recognition lags (time to identify problems), decision lags (time to decide on action), implementation lags (time to put policies in place), and impact lags (time for policies to affect the economy)."
      },
      {
        "id": 26,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "If a country's interest rates fall relative to those in other countries, what would likely happen to its currency value, assuming free capital mobility?",
        "image": null,  "options": [
          "Its currency would appreciate",
          "Its currency would depreciate",
          "Its currency value would remain unchanged",
          "Its currency would initially depreciate then appreciate",
          "The effect cannot be determined without additional information"
        ],
        "correctAnswer": "B",
        "explanation": "If a country's interest rates fall relative to those in other countries, and there are no restrictions of where investors can move their funds, investors would move funds to countries offering higher returns. This capital outflow would decrease demand for the domestic currency, causing it to depreciate against other currencies."
      },
      {
        "id": 27,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "If a country is running a large trade deficit, which of the following must be true?",
        "image": null,  "options": [
          "The country must have a floating exchange rate",
          "The country must have a fixed exchange rate",
          "The country must be experiencing a budget deficit",
          "The country must have a financial account surplus",
          "The country must have high interest rates"
        ],
        "correctAnswer": "D",
        "explanation": "If a country is running a large trade deficit (part of the current account), it must have a financial account surplus to balance its international payments. This means foreign capital inflows must offset the trade deficit, reflecting the accounting identity that the sum of all balance of payments accounts equals zero."
      },
      {
        "id": 28,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "Which change could explain the change in the foreign exchange market for the Malaysian Ringgits and Indian Rupees?",
        "image": macroSetTwoQ28,  "options": [
          "A decrease in real interest rates in Malaysia relative to India",
          "An increase in demand for Malaysian goods in India",
          "An increase in the price level in Malaysia",
          "A decrease in government budget deficits in Malaysia",
          "A lower average real income in India"
        ],
        "correctAnswer": "B",
        "explanation": "If Indian consumers demand more Malaysian goods, they will need to exchange more Indian Rupees for Malaysian Ringgits, increasing the demand for Ringgits and causing it to appreciate against the Rupee."
      },
      {
        "id": 29,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "The exchange rate for one Canadian Dollar was 0.65 Euros in 2021 and it increased to 0.75 Euros in 2022. Which of the following is true for the Euro in 2022?",
        "image": null,  "options": [
          "One Euro is worth approximately 1.33 Canadian dollars, and the Euro appreciated",
          "One Euro is worth approximately 0.75 Canadian dollars, and the Euro depreciated",
          "The value of the Euro has remained the same",
          "One Euro is worth approximately 1.33 Canadian dollars, and the Euro depreciated",
          "There is a shortage of Euros in the foreign exchange market"
        ],
        "correctAnswer": "C",
        "explanation": "The exchange rate for one Canadian Dollar was 0.65 Euros in 2021 and it increased to 0.75 Euros in 2022. To find the value of 1 Euro, you can take the reciprocal of the exchange rate. In 2021, 1 Euro was worth 1/0.65 = 1.53 Canadian dollars. In 2022, 1 Euro is worth 1/0.75 = 1.33 Canadian dollars. This means the Euro has depreciated against the Canadian Dollar."
      },
      {
        "id": 30,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "The diagram shows the number of cell phones and computers produced per hour by two countries, Delta and Omega, using the same resources. Which of the following can be accurately concluded from the data?",
        "image": macroSetTwoQ30,  "options": [
          "Omega has the absolute advantage in the production of both goods",
          "Delta has the comparative advantage in the production of cell phones",
          "Omega's opportunity cost of producing 1 cell phone is 4 computers",
          "Delta's opportunity cost of producing 1 cell phone is 0.5 computers",
          "Omega has the comparative advantage in the production of both goods"
        ],
        "correctAnswer": "D",
        "explanation": "With the given resources, Delta can produce 60 cell phones or 30 computers. This means that for every 1 cell phone Delta produces, it gives up the opportunity to produce 0.5 cell phones. This is an output question, and you can calculate opportunity cost by taking the 'other' figure and dividing it by 'itself'. For Delta's opportunity cost of producing cell phones, the 'other' figure is 30 (computers) and 'itself' is 60 (cell phones). Therefore, Delta's opportunity cost of producing cell phones is 30/60 = 0.5 computers."
      },
      {
        "id": 31,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "The graph below shows the production possibilities frontier for two countries, Macroland and Microland, who produce two goods using equal resources. Which of the following statements is true based on the data provided?",
        "image": macroSetTwoQ31,  "options": [
          "Marcoland has an absolute advantage in producing Widgets and a comparative advantage in producing Trinkets",
          "Macroland has an absolute advantage in producing both goods",
          "Microland has an absolute advantage in producing both goods",
          "Microland has both an absolute and comparative advantage in producing Trinkets",
          "Microland has does not have a comparative advantage in producing either good"
        ],
        "correctAnswer": "D",
        "explanation": "Macroland has an absolute advantage in widgets since it can produce more (60 vs. 40), while Microland has an absolute advantage in trinkets (50 vs. 30). To determine comparative advantage, we compare opportunity costs: Macroland gives up only 0.5 trinkets per widget, while Microland gives up 1.25, meaning Macroland has the comparative advantage in widgets. Similarly, Microland gives up only 0.8 widgets per trinket, while Macroland gives up 2, so Microland has the comparative advantage in trinkets."
      },
      {
        "id": 32,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "Determine which combination of demand and supply curves shifts is most likely to result in an indeterminate change to the price of a good:",
        "image": null,  "options": [
          "Demand increases and supply decreases",
          "Demand decreases and supply increases",
          "Demand increases and supply remains the same",
          "Demand remains the same and supply decreases",
          "Demand and supply both increase"
        ],
        "correctAnswer": "E",
        "explanation": "An increase in demand will put upward pressure on the price of the good, while an increase in supply will put downward pressure on the price of the good. When these changes happen simultaneously, the result will be an intedeterminate change in price."
      },
      {
        "id": 33,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "The value-added by a single firm when calculating GDP is: calculated by:",
        "image": null,  "options": [
          "Summing the market value of all final goods and services produced by the firm",
          "Summing the value of all intermediate goods and services purchased by the firm",
          "Subtracting the cost of inputs from the revenue earned by the firm",
          "Subtracting the money spent by households from the revenue earned the firm",
          "Subtracting the value of imports done by the firm from the value of exports done by the firm"
        ],
        "correctAnswer": "C",
        "explanation": "The value-added approach to calculating GDP adds up the value added at each stage of production to avoid double-counting. Value added is the difference between the value of goods produced and the cost of intermediate goods used in their production. Simple example: If a bakery buys flour and sugar to make bread, the value added by the bakery is the value of the bread minus the cost of the flour and sugar."
      },
      {
        "id": 34,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "A worker who lost her job due to changes in technology making her skills obsolete would be classified as experiencing:",
        "image": null,  "options": [
          "Frictional unemployment",
          "Structural unemployment",
          "Cyclical unemployment",
          "Seasonal unemployment",
          "Natural unemployment"
        ],
        "correctAnswer": "B",
        "explanation": "A worker who lost her job due to changes in technology making her skills obsolete would be classified as experiencing structural unemployment. This type of unemployment results from a mismatch between workers' skills and the skills required by available jobs, often due to technological change or industry shifts."
      },
      {
        "id": 35,
        "unit": 2,
        "unitName": "Economic Indicators and the Business Cycle",
        "question": "If nominal GDP is $18 trillion and real GDP is $15 trillion, what is the GDP deflator?",
        "image": null,  "options": [
          "83.3",
          "120",
          "150",
          "180",
          "1.2"
        ],
        "correctAnswer": "B",
        "explanation": "The GDP deflator is calculated as (Nominal GDP ÷ Real GDP) × 100 = ($18 trillion ÷ $15 trillion) × 100 = 1.2 × 100 = 120. This indicates that the overall price level has increased by 20% relative to the base year."
      },
      {
        "id": 36,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "If government spending increases by $30 billion with no change in taxes, what is the maximum potential change in aggregate demand if the marginal propensity to consume is 0.75?",
        "image": null,  "options": [
          "$22.5 billion increase",
          "$30 billion increase",
          "$40 billion increase",
          "$120 billion increase",
          "$22.5 billion decrease"
        ],
        "correctAnswer": "D",
        "explanation": "The multiplier is 1/(1-MPC) = 1/(1-0.75) = 4. To find the maximum potential change in aggregate demand, we multiply the change in government spending by the multiplier. Therefore, the maximum potential change in aggregate demand is $30 billion × 4 = $120 billion."
      },
      {
        "id": 37,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "If an economy at full employment experiences a negative supply shock, in the short run this would most likely result in:",
        "image": null,  "options": [
          "Higher output and lower prices",
          "Lower output and higher prices",
          "Higher output and higher prices",
          "Lower output and lower prices",
          "No change in output or prices"
        ],
        "correctAnswer": "B",
        "explanation": "A negative supply shock at full employment would shift the short-run aggregate supply curve leftward, resulting in lower output and higher prices (stagflation). Examples of negative supply shocks include natural disasters, sharp increases in resource prices, or supply chain disruptions."
      },
      {
        "id": 38,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "Which of the following is an example of a discretionary fiscal policy?",
        "image": null,  "options": [
          "Unemployment benefits increasing during a recession",
          "Tax revenues falling during an economic downturn",
          "A legislative increase in infrastructure spending",
          "Higher tax collections during an economic expansion",
          "Welfare payments rising as unemployment increases"
        ],
        "correctAnswer": "C",
        "explanation": "A legislative increase in infrastructure spending is an example of discretionary fiscal policy, which involves deliberate government actions requiring new legislation to change spending or taxation. This contrasts with automatic stabilizers, which respond to economic conditions without new legislation."
      },
      {
        "id": 39,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "The graph below shows the market for loanable funds in Macroland. If the current real interest rate is 3%, which of the following is true?",
        "image": macroSetTwoQ39, "options": [
          "There is a shortage of loanable funds and real interest rates will rise",
          "There is a surplus of loanable funds and real interest rates will fall",
          "There is a shortage of loanable funds and real interest rates will fall",
          "There is a surplus of loanable funds and real interest rates will rise",
          "There will be no change in the real interest rate"
        ],
        "correctAnswer": "A",
        "explanation": "At a real interest rate of 3%, the quantity of loanable funds demanded is greater than the quantity of loanable funds supplied. This creates a shortage of loanable funds, which will put upward pressure on the real interest rate."
      },
      {
        "id": 40,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "If a new demand deposit leads to money supply expansion that is less than the value predicted by the money multiplier, this might be due to:",
        "image": null,  "options": [
          "Banks lending out more than their excess reserves",
          "Banks holding excess reserves",
          "Households increasing their demand for money",
          "An increase in the marginal propensity to consume",
          "A simultaneous increase in the tax multiplier"
        ],
        "correctAnswer": "B",
        "explanation": "Money supply expansion occurs when banks lend out their excess reserves. The money multipliers tells us the maximum potential expansion of the money supply, which only occurs if banks lend out all of their excess reserves. If a bank holds onto some of its excess reserves, the actual expansion of the money supply will be less than the maximum potential expansion."
      },
      {
        "id": 41,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "If the central bank decreases the money supply while the demand for money remains constant, what happens to the equilibrium interest rate?",
        "image": null,  "options": [
          "It decreases",
          "It increases",
          "It remains unchanged",
          "It first decreases then increases",
          "It first increases then decreases"
        ],
        "correctAnswer": "B",
        "explanation": "If the central bank decreases the money supply while money demand remains constant, the interest rate will increase. A decrease in money supply creates excess demand for money at the initial interest rate, pushing the interest rate up until the quantity of money demanded equals the reduced supply."
      },
      {
    "id": 42,
    "unit": 3,
    "unitName": "National Income and Price Determination",
    "question": "The diagram below shows changes in Peter's disposable income and his consumption. Use this data to calculate Peter's marginal propensity to consume (MPC) and marginal propensity to save (MPS).",
    "image": macroSetTwoQ42,  "options": [
      "MPC = 0.67, MPS = 0.33",
      "MPC = 0.8, MPS = 0.2",
      "MPC = 0.33, MPS = 0.67",
      "MPC = 0.83, MPS = 0.17",
      "MPC = 0.75, MPS = 0.25"
    ],
      "correctAnswer": "A",
      "explanation": "MPC is the change in consumption divided by the change in disposable income. From the table, we can see that Peter's disposable income changes by $15,000 and his consumption changes by $10,000. Therefore, MPC = $10,000/$15,000 = 0.67. MPC + MPS = 1, so MPS = 1 - MPC = 1 - 0.67 = 0.33."
  },
  {
    "id": 43,
    "unit": 6,
    "unitName": "Open Economy-International Trade and Finance",
    "question": "A country's currency appreciates. What is the most likely effect on its economy in the short run?",
    "image": null,  "options": [
      "Increased exports and decreased imports",
      "Decreased exports and increased imports",
      "Increased exports and increased imports",
      "Decreased exports and decreased imports",
      "No effect on trade balance"
    ],
    "correctAnswer": "B",
    "explanation": "When a country's currency appreciates, its goods become more expensive for foreigners while foreign goods become cheaper for domestic consumers. This typically leads to decreased exports (as foreign demand falls) and increased imports (as domestic consumers buy more foreign goods), resulting in a deteriorating trade balance in the short run."
  },
  {
    "id": 44,
    "unit": 4,
    "unitName": "Financial Sector",
    "question": "A central bank is using monetary policy to reduce unemployment that is above the natural rate. Which of the following describes the likely effect of this policy on nominal interest rates, price level, and unemployment?",
    "image": null,  "options": [
      "Nominal interest rates decrease, price level increases, and unemployment decreases",
      "Nominal interest rates decrease, price level decreases, and unemployment decreases",
      "Nominal interest rates remain unchanged, price level increases, and unemployment decreases",
      "Nominal interest rates increase, price level decreases, and unemployment decreases",
      "Nominal interest rates decrease, price level increases, and unemployment increases"
    ],
    "correctAnswer": "A",
    "explanation": "To reduce unemployment, the central bank will use expansionary monetary policy to increase the money supply. This will lead to lower nominal interest rates, which will encourage more interest-sensitive spending, shifting the aggregate demand curve rightward. This will lead to a higher price level and lower unemployment."
  },
  {
    "id": 45,
    "unit": 5,
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Out of the following government actions, which one will NOT lead to an increase in the country's level of national debt?",
    "image": null,  "options": [
      "Decreasing income tax rates",
      "Increasing the supply of government bonds",
      "Reducing government transfer payments",
      "Increasing defense spending funded by borrowing",
      "Increasing borrowing of private loanable funds"
    ],
    "correctAnswer": "C",
    "explanation": "Reducing government transfer payments will decrease the amount of money the government needs to spend, which will reduce the amount of money it needs to borrow. This will lead to a decrease in the country's level of national debt."
  },
  {
    "id": 46,
    "unit": 2,
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Use the data in the table below to calculate Starland's 2014 GDP using the expenditure approach.",
    "image": macroSetTwoQ46,  "options": [
      "810 billion dollars",
      "650 billion dollars",
      "900 billion dollars",
      "960 billion dollars",
      "1000 billion dollars"
    ],
    "correctAnswer": "A",
    "explanation": "The expenditure approach involves adding up all different types of spending within an economy. The expenditure approach equation is (GDP = Consumption + Investment + Government Spending + Net Exports). Let's plug the data into this equation: (GDP = 600 + 120 + 100 + -10 = 810) Note that taxes are not a part of the expenditure approach to GDP."
  },
  {
    "id": 47,
    "unit": 3,
    "unitName": "National Income and Price Determination",
    "question": "One reason that the aggregate demand curve is downward sloping is because as the price level increases:",
    "image": null,  "options": [
      "Banks hold less money in reserves, leading to a lower money supply",
      "The government borrows more money, leading to reductions in aggregate demand",
      "Households purchasing power decreases, leading to lower consumption",
      "Interest rates decrease, leading to lower investment",
      "Exports become more expensive to foreign buyers, leading to higher net exports"
    ],
    "correctAnswer": "C",
    "explanation": "As the price level increases, households' purchasing power decreases, leading to lower consumption. This is known as the real wealth effect. Simple example: If you set aside $100 a month to buy candy, and your favorite pack of candy costs $1, you can buy 100 packs per month. If the price doubles to $2, now you can only buy 50 packs per month."
  },
  {
    "id": 48,
    "unit": 5,
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Which of the following policies would most likely increase a country's long-run productivity growth?",
    "image": null,  "options": [
      "Raising tariffs to protect domestic industries",
      "Increasing income tax rates to fund transfer payments",
      "Expanding unemployment benefits to support displaced workers",
      "Investing in education and job training programs",
      "Implementing price ceilings on essential goods"
    ],
    "correctAnswer": "D",
    "explanation": "Investing in education and job training programs would most likely increase long-run productivity growth by enhancing human capital. Better-educated and skilled workers can produce more output per hour worked, develop and implement new technologies, and adapt to changing economic conditions, all of which contribute to sustained productivity growth."
  },
  {
    "id": 49,
    "unit": 6,
    "unitName": "Open Economy-International Trade and Finance",
    "question": "Under a system of floating exchange rates, a country experiencing significant inflation relative to its trading partners would most likely see its currency:",
    "image": null,  "options": [
      "Appreciate as domestic buyers demand more foreign goods",
      "Depreciate as domestic goods become more expensive to foreign buyers",
      "Inflation does not affect exchange rates",
      "Depreciate as foreign demand for the domestic currency increases",
      "Appreciate as the supply of the domestic currency increases"
    ],
    "correctAnswer": "B",
    "explanation": "When a country experiences significant inflation relative to its trading partners, it's trading partners will demand less of the more expensive goods, meaning there is less demand for the country's currency. This decrase in demand for the currency will cause a depreciation of the currency."
  },
  {
    "id": 50,
    "unit": 4,
    "unitName": "Financial Sector",
    "question": "If a central bank is concerned about potential financial instability due to excessive leverage in the banking system, which policy tool would be most appropriate to address this concern?",
    "image": null,  "options": [
      "Reducing the discount rate to encourage borrowing",
      "Purchasing government securities through open market operations",
      "Targeting a higher inflation rate through forward guidance",
      "Increasing capital requirements for financial institutions",
      "Reducing reserve requirements to increase lending capacity"
    ],
    "correctAnswer": "D",
    "explanation": "If a central bank is concerned about financial instability due to excessive leverage, increasing capital requirements for financial institutions would be most appropriate. Higher capital requirements force banks to fund more of their assets with equity rather than debt, reducing leverage ratios and creating larger buffers against losses, thereby enhancing the stability of the financial system."
  },
  {
    "id": 51,
    "unit": 1,
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following best describes the difference between a movement along a demand curve and a shift of the demand curve?",
    "image": null,  "options": [
      "A movement along the demand curve is caused by a change in a non-price factor, while a shift of the demand curve is caused by a change in price",
      "A movement along the demand curve is caused by a change in monetary policy, while a shift of the demand curve is caused by a change in fiscal policy",
      "A movement along the demand curve is caused by a change in price, while a shift of the demand curve is caused by a change in a non-price factor",
      "A movement along the demand curve is caused by a change in producer behavior, while a shift of the demand curve is caused by a change in consumer behavior",
      "A movement along the demand curve is caused by a change in consumer preferences, while a shift of the demand curve is caused by a change in producer technology"
    ],
    "correctAnswer": "C",
    "explanation": "When the price of a good changes, this affects the quantity demanded, causing a movement along the demand curve (different price, different quantity demanded). When a non-price factor changes, this affects the demand curve itself, causing a shift of the demand curve (same price, different quantity demanded)."
  },
  {
    "id": 52,
    "unit": 2,
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which of the following would NOT be counted in this year's GDP figures?",
    "image": null,  "options": [
      "A restaurant meal prepared and consumed today",
      "A new factory built by a manufacturing company",
      "The sale of a 10-year-old house to a new owner",
      "The production of a new car that remains in the dealer's inventory",
      "Services provided by a government employee"
    ],
    "correctAnswer": "C",
    "explanation": "The sale of a 10-year-old house to a new owner would NOT be counted in this year's GDP figures. GDP measures the value of newly produced goods and services within a specific time period. The 10-year-old house was counted in GDP when it was originally built, and its resale represents a transfer of an existing asset rather than new production."
  },
  {
    "id": 53,
    "unit": 3,
    "unitName": "National Income and Price Determination",
    "question": "How will automatic stabilizers affect the economy during an inflationary gap?",
    "image": null,  "options": [
      "They will shift long-run aggregate supply rightward",
      "They will shift aggregate demand rightward, as government expenditure increases and tax revenues decrease",
      "They will shift short-run aggregate supply leftward as taxes increase",
      "They will shift aggregate demand leftward, as government expenditure decreases and tax revenues increase",
      "Automatic stabilizers only have an affect during a recessionary gap"
    ],
    "correctAnswer": "D",
    "explanation": "In an inflationary gap, government spending on programs such as unemployment will automatically decrease, since output is high and unemployment is low. Tax revenues will automatically increase, as more people are employed and nominal wages increase. This will shift aggregate demand leftward."
  },
  {
    "id": 54,
    "unit": 5,
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "A decrease in government spending will most likely lead to which change on the Phillips curve graph?",
    "image": null,  "options": [
      "A rightward shift of the short-run Phillips curve",
      "A downward movement along the short-run Phillips curve",
      "A leftward shift of the short-run Phillips curve",
      "An upward movement along the short-run Phillips curve",
      "A leftward shift of the long-run Phillips curve"
    ],
    "correctAnswer": "B",
    "explanation": "A decrease in government spending will lead to a decrease in aggregate demand, which will lead to a lower price level and higher unemployment. This change in price level and unemployment can be shown by a downward movement along the short-run Phillips curve."
  },
  {
    "id": 55,
    "unit": 6,
    "unitName": "Open Economy-International Trade and Finance",
    "question": "Country A and Country B both produce computers and clothing. Country A can produce 8 computers or 24 units of clothing per hour. Country B can produce 6 computers or 12 units of clothing per hour. Based on this information:",
    "image": null,  "options": [
      "Country A has a comparative advantage in both goods",
      "Country B has a comparative advantage in both goods",
      "Country A has a comparative advantage in computers",
      "Country B has a comparative advantage in computers",
      "Country A has a comparative advantage in clothing"
    ],
    "correctAnswer": "D",
    "explanation": "To determine comparative advantage, we calculate opportunity costs. For Country A, one computer costs 3 units of clothing (24/8), and for Country B, one computer costs 2 units of clothing (12/6). Since Country B gives up less clothing to produce one computer, it has the comparative advantage in computers. Country A has the comparative advantage in clothing because it gives up 1/3 computer per unit of clothing versus Country B's 1/2 computer."
  },
  {
    "id": 56,
    "unit": 4,
    "unitName": "Financial Sector",
    "question": "For a country with an ample reserves banking system, which monetary policy action would be most effective in reducing unemployment?",
    "image": null,  "options": [
      "Raising the discount rate",
      "Selling government securities",
      "Increasing government spending",
      "Lowering the required reserve ratio",
      "Lowering the interest on reserves rate"
    ],
    "correctAnswer": "E",
    "explanation": "Lowering the interest on reserves rate will make it less profitable for commerical banks to hold excess reserves. This will encourage them to lend out more money, which will increase the money supply and have an expansionary impact on the economy. While reducing the required reserve ratio is an expnasionary monetary policy action, it is not an action used in an ample reserves banking system."
  },
  {
    "id": 57,
    "unit": 6,
    "unitName": "Basic Economic Concepts",
    "question": "In a foreign exchange market with a free floating exchange rate, the market exchange rate is determined by:",
    "image": null,  "options": [
      "Bilateral agreements between countries",
      "Regulations set by the central bank",
      "Government policy",
      "The amount of gold a country has in reserves",
      "The supply and demand for currency"
    ],
    "correctAnswer": "E",
    "explanation": "In a free floating exchange rate system, the market exchange rate is determined by the supply and demand for currency. This differs from a fixed exchange rate system, where a central bank  or government determines the rate."
  },
  {
    "id": 58,
    "unit": 2,
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If the CPI was 210 last year and is 218.4 this year, what is the inflation rate?",
    "image": null,  "options": [
      "4%",
      "8.4%",
      "10%",
      "21.84%",
      "4.2%"
    ],
    "correctAnswer": "A",
    "explanation": "The inflation rate is calculated as the percentage change in the CPI: ((New CPI - Old CPI) ÷ Old CPI) × 100 = ((218.4 - 210) ÷ 210) × 100 = (8.4 ÷ 210) × 100 = 0.04 × 100 = 4%. This represents the percentage increase in the average price level of consumer goods and services over the year."
  },
  {
    "id": 59,
    "unit": 3,
    "unitName": "National Income and Price Determination",
    "question": "If the economy is operating at potential GDP, what else can be said about the economy?",
    "image": null,  "options": [
      "The economy is at full employment",
      "The actual inflation rate exceeds the expected inflation rate",
      "Nominal GDP is lower than real GDP",
      "The unemployment rate is 0%",
      "The economy is experiencing inflationary pressure"
    ],
    "correctAnswer": "A",
    "explanation": "An economy's potential GDP is the output that a country can produce when all resources are fully employed. Labor is one of the resources that can be used to produce goods and services. If the country is producing at its potential output, that means there is no cyclical unemployment and the economy is at full employment. Reminder: Full employment does not mean 0% unemployment. It simply means that there is no cyclical unemployment."
  },
  {
    "id": 60,
    "unit": 5,
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "If an economy has flexible wages and prices, and the central bank implements expansionary monetary policy, which of the following describes the long-run effect on output and unemployment in the country?",
    "image": null,  "options": [
      "Output will increase and unemployment will decrease",
      "Output will remain unchanged and unemployment will decrease",
      "Both output and unemployment will remain unchanged",
      "Output will decrease and unemployment will increase",
      "Output will increase and unemployment will increase"
    ],
    "correctAnswer": "C",
    "explanation": "Expansionary monetary policy increase output and decrease unemployment in the short-run. However, in the long-run, the economy will return to the natural rate of unemployment and output will remain unchanged."
  }
  ])
};