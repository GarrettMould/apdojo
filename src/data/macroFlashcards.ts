type Flashcard = {
  term: string;
  definition: string;
}

type MacroFlashcards = {
  [key: string]: Flashcard[];
}

export const macroFlashcards: MacroFlashcards = {
"Unit 1: Basic Economic Concepts": [
    {
      "term": "Scarcity",
      "definition": "The fundamental economic problem that exists because there are limited resources and unlimited wants."
    },
    {
      "term": "Opportunity Cost",
      "definition": "The next best alternative that must be given up when making a choice."
    },
    {
      "term": "Factors of Production",
      "definition": "The resources used to produce goods and services: land, labor, capital, and entrepreneurship."
    },
    {
      "term": "Land",
      "definition": "All natural resources used to produce goods and services (e.g., water, sun, plants, animals)."
    },
    {
      "term": "Labor",
      "definition": "The effort a person devotes to a task for which they are paid (e.g., manual laborers, doctors, teachers)."
    },
    {
      "term": "Physical Capital",
      "definition": "Any human-made resource used to create goods and services (e.g., tools, machinery, buildings)."
    },
    {
      "term": "Human Capital",
      "definition": "Skills and knowledge gained by a worker through education and experience."
    },
    {
      "term": "Entrepreneurship",
      "definition": "Ambitious leaders who combine factors of production to create goods and services."
    },
    {
      "term": "Economic Systems",
      "definition": "The method used by a society to produce and distribute goods and services."
    },
    {
      "term": "Centrally Planned Economy",
      "definition": "An economic system in which the government owns resources and makes all economic decisions (e.g., North Korea, Cuba)."
    },
    {
      "term": "Free Market Economy",
      "definition": "An economic system where individuals own resources and make economic decisions with minimal government involvement."
    },
    {
      "term": "Invisible Hand",
      "definition": "The concept that self-interest and competition guide free markets to efficiently allocate resources (coined by Adam Smith)."
    },
    {
      "term": "Mixed Economy",
      "definition": "An economy with both free market and government intervention (e.g., the United States)."
    },
    {
      "term": "Production Possibilities Curve (PPC)",
      "definition": "A model that shows alternative ways an economy can use its scarce resources."
    },
    {
      "term": "Law of Increasing Opportunity Costs",
      "definition": "As production shifts from one product to another, increasingly more resources are needed, raising opportunity costs."
    },
    {
      "term": "Absolute Advantage",
      "definition": "When a country can produce more of a good with the same resources as another country."
    },
    {
      "term": "Comparative Advantage",
      "definition": "When a country can produce a good at a lower opportunity cost than another country."
    },
    {
      "term": "Specialization",
      "definition": "When individuals, businesses, or nations focus on producing a narrow range of products to maximize efficiency."
    },
    {
      "term": "Economic Interdependence",
      "definition": "A situation where producers in one nation depend on others for goods and services they do not produce."
    },
    {
      "term": "Terms of Trade",
      "definition": "The rate at which one good can be exchanged for another between countries."
    },
    {
      "term": "Demand",
      "definition": "The different quantities of goods and services consumers are willing and able to purchase at various price levels."
    },
    {
      "term": "Quantity Demanded",
      "definition": "The number of people willing and able to buy a good or service at a certain price."
    },
    {
      "term": "Law of Demand",
      "definition": "As price increases, quantity demanded decreases; as price decreases, quantity demanded increases."
    },
    {
      "term": "Supply",
      "definition": "The different quantities of goods and services that producers are willing and able to sell at various price levels."
    },
    {
      "term": "Quantity Supplied",
      "definition": "The number of producers willing and able to sell a good or service at a certain price."
    },
    {
      "term": "Law of Supply",
      "definition": "As price increases, quantity supplied increases; as price decreases, quantity supplied decreases."
    },
    {
      "term": "Equilibrium",
      "definition": "The point where supply and demand intersect, determining the market price and quantity."
    },
    {
      "term": "Non-Price Determinants of Demand",
      "definition": "Factors other than price that affect demand: Income, Number of Buyers, Substitutes, Expectations, Complements, Tastes (INSPECT)."
    },
    {
      "term": "Non-Price Determinants of Supply",
      "definition": "Factors other than price that affect supply: Resources, Other Goods’ Prices, Taxes, Technology, Expectations, Number of Competitors (ROTTEN)."
    }
  ],
  'Unit 2: Economic Indicators and the Business Cycle': [
    {
      "term": "Circular Flow Model",
      "definition": "A model that explains the flow of goods, services, and money in an economy."
    },
    {
      "term": "Households",
      "definition": "Individuals or families who provide factors of production and consume goods and services."
    },
    {
      "term": "Firms",
      "definition": "Businesses that produce goods and services and pay for factors of production."
    },
    {
      "term": "Government",
      "definition": "The sector that collects taxes and spends on public goods and services."
    },
    {
      "term": "Financial Sector",
      "definition": "Banks and other intermediaries that facilitate savings and investments."
    },
    {
      "term": "External Sector",
      "definition": "Trade with other countries, including exports and imports."
    },
    {
      "term": "Injections",
      "definition": "Money entering the economy, such as investments, government spending, and exports."
    },
    {
      "term": "Leakages",
      "definition": "Money exiting the economy, such as savings, taxes, and imports."
    },
    {
      "term": "Factor Market",
      "definition": "A market where households provide land, labor, and capital to firms in exchange for income."
    },
    {
      "term": "Product Market",
      "definition": "A market where households buy finished goods and services from firms."
    },
    {
      "term": "Gross Domestic Product (GDP)",
      "definition": "The total dollar value of all goods and services produced within a country's borders in a given year."
    },
    {
      "term": "Expenditure Approach to GDP",
      "definition": "A method of calculating GDP by summing spending on consumption, investment, government purchases, and net exports (GDP = C + I + G + NX)."
    },
    {
      "term": "Income Approach to GDP",
      "definition": "A method of calculating GDP by summing wages, interest, rent, and profits (GDP = W + I + R + P)."
    },
    {
      "term": "Consumption (C)",
      "definition": "Household spending on new goods and services."
    },
    {
      "term": "Investment (I)",
      "definition": "Business spending on capital goods, such as machinery and buildings."
    },
    {
      "term": "Government Spending (G)",
      "definition": "Expenditures by the government on goods and services, excluding transfer payments."
    },
    {
      "term": "Net Exports (NX)",
      "definition": "The value of exports minus imports (X - M)."
    },
    {
      "term": "Limitations of GDP (P.I.E.S)",
      "definition": "GDP does not account for Population differences, Income inequality, Environmental impact, or Shadow economy activities."
    },
    {
      "term": "Unemployment Rate",
      "definition": "The percentage of the labor force that is unemployed and actively looking for work."
    },
    {
      "term": "Labor Force Participation Rate",
      "definition": "The percentage of the working-age population that is either employed or actively looking for work."
    },
    {
      "term": "Cyclical Unemployment",
      "definition": "Unemployment caused by fluctuations in the business cycle (recessions and expansions)."
    },
    {
      "term": "Structural Unemployment",
      "definition": "Unemployment caused by changes in the economy that make some jobs obsolete."
    },
    {
      "term": "Frictional Unemployment",
      "definition": "Temporary unemployment as workers transition between jobs or enter the labor force."
    },
    {
      "term": "Seasonal Unemployment",
      "definition": "Unemployment caused by seasonal changes in labor demand."
    },
    {
      "term": "Full Employment",
      "definition": "A state in which there is no cyclical unemployment."
    },
    {
      "term": "Natural Rate of Unemployment",
      "definition": "The unemployment rate when the economy is at full employment, consisting of only structural and frictional unemployment."
    },
    {
      "term": "Discouraged Workers",
      "definition": "Individuals who have stopped looking for work due to repeated job search failures; not included in the labor force."
    },
    {
      "term": "Inflation",
      "definition": "The general increase in prices over time."
    },
    {
      "term": "Deflation",
      "definition": "The general decrease in prices over time."
    },
    {
      "term": "Disinflation",
      "definition": "A decrease in the rate of inflation."
    },
    {
      "term": "Consumer Price Index (CPI)",
      "definition": "A measure of the average change in prices of goods and services purchased by households."
    },
    {
      "term": "Nominal GDP",
      "definition": "The total value of goods and services produced using current prices."
    },
    {
      "term": "Real GDP",
      "definition": "The total value of goods and services produced, adjusted for inflation."
    },
    {
      "term": "GDP Deflator",
      "definition": "A measure that converts nominal GDP into real GDP by accounting for price level changes (GDP Deflator = (Nominal GDP / Real GDP) × 100)."
    }
  ], 
  'Unit 3: National Income and Price Determination': [
    {
      "term": "Aggregate Demand (AD)",
      "definition": "The total demand for all goods and services in an economy at various price levels."
    },
    {
      "term": "Aggregate Supply (AS)",
      "definition": "The total supply of goods and services produced within an economy at various price levels."
    },
    {
      "term": "Short-Run Aggregate Supply (SRAS)",
      "definition": "The total quantity of goods and services firms are willing to produce in the short run, which is upward sloping."
    },
    {
      "term": "Long-Run Aggregate Supply (LRAS)",
      "definition": "The total amount of production possible in an economy given the efficient use of resources, which is a vertical line."
    },
    {
      "term": "Real Wealth Effect",
      "definition": "When price levels fall, the purchasing power of money increases, leading to higher consumer spending and greater aggregate demand."
    },
    {
      "term": "Interest Rate Effect",
      "definition": "When price levels fall, interest rates decrease, leading to increased investment spending and higher aggregate demand."
    },
    {
      "term": "Exchange Rate Effect",
      "definition": "When domestic price levels fall, the currency depreciates, making exports cheaper and increasing net exports, thus boosting aggregate demand."
    },
    {
      "term": "Causes of Shifts in Aggregate Demand",
      "definition": "Changes in consumption (C), investment (I), government spending (G), and net exports (NX) can shift AD."
    },
    {
      "term": "Causes of Shifts in Short-Run Aggregate Supply",
      "definition": "Changes in resource prices, government policies, technology, and producer expectations can shift SRAS."
    },
    {
      "term": "Causes of Shifts in Long-Run Aggregate Supply",
      "definition": "Changes in the quantity or quality of resources (land, labor, capital, entrepreneurship) can shift LRAS."
    },
    {
      "term": "Recessionary Gap",
      "definition": "Occurs when aggregate demand and short-run aggregate supply intersect to the left of LRAS, indicating underproduction and high unemployment."
    },
    {
      "term": "Inflationary Gap",
      "definition": "Occurs when aggregate demand and short-run aggregate supply intersect to the right of LRAS, indicating overproduction and inflation."
    },
    {
      "term": "Stagflation",
      "definition": "A situation where inflation and unemployment are both high due to a leftward shift in SRAS."
    },
    {
      "term": "Fiscal Policy",
      "definition": "Government policies involving taxation and spending to influence aggregate demand."
    },
    {
      "term": "Expansionary Fiscal Policy",
      "definition": "Government increases spending or decreases taxes to boost aggregate demand and reduce unemployment."
    },
    {
      "term": "Contractionary Fiscal Policy",
      "definition": "Government decreases spending or increases taxes to reduce aggregate demand and control inflation."
    },
    {
      "term": "Automatic Stabilizers",
      "definition": "Government programs like unemployment benefits and progressive taxes that help stabilize the economy without additional intervention."
    }
  ],
  'Unit 4: Financial Sector': [
    {
      "term": "Liquidity",
      "definition": "The ease with which a financial asset can be accessed and converted into cash."
    },
    {
      "term": "Federal Funds Rate",
      "definition": "The interest rate at which banks lend to one another."
    },
    {
      "term": "Discount Rate",
      "definition": "The interest rate at which the central bank lends to banks as a lender of last resort."
    },
    {
      "term": "Nominal Interest Rate",
      "definition": "The interest rate before adjusting for inflation."
    },
    {
      "term": "Real Interest Rate",
      "definition": "The interest rate adjusted for inflation (Real Interest Rate = Nominal Interest Rate - Inflation Rate)."
    },
    {
      "term": "Money Supply",
      "definition": "The total amount of money available in the economy at a given time."
    },
    {
      "term": "M1 Money Supply",
      "definition": "The most liquid forms of money, including cash, checkable deposits, and travelers' checks."
    },
    {
      "term": "M2 Money Supply",
      "definition": "Includes M1 plus savings accounts, time deposits, and other near-money assets."
    },
    {
      "term": "Monetary Base",
      "definition": "The total of a country's currency in circulation and reserves held by banks at the central bank."
    },
    {
      "term": "Fractional Reserve Banking",
      "definition": "A banking system in which banks hold only a fraction of deposits as reserves and lend out the rest."
    },
    {
      "term": "Reserve Ratio",
      "definition": "The fraction of total deposits that banks are required to hold in reserve."
    },
    {
      "term": "Money Multiplier",
      "definition": "The amount of money that banks generate with each dollar of excess reserves (1 / Reserve Ratio)."
    },
    {
      "term": "Money Market Graph",
      "definition": "A graph showing the supply and demand for money, with interest rate as the price of money."
    },
    {
      "term": "Transaction Demand for Money",
      "definition": "The demand for money to make everyday purchases."
    },
    {
      "term": "Asset Demand for Money",
      "definition": "The demand for money as a store of value rather than investing in interest-bearing assets."
    },
    {
      "term": "Shifters of Money Demand",
      "definition": "Changes in price level, real GDP (income), and technology can shift the money demand curve."
    },
    {
      "term": "Monetary Policy",
      "definition": "Actions taken by the central bank to manage the money supply and guide the economy."
    },
    {
      "term": "Expansionary Monetary Policy",
      "definition": "Monetary policy that increases the money supply to boost economic growth and reduce unemployment."
    },
    {
      "term": "Contractionary Monetary Policy",
      "definition": "Monetary policy that decreases the money supply to control inflation."
    },
    {
      "term": "Open Market Operations (OMO)",
      "definition": "The buying and selling of government bonds by the central bank to influence the money supply."
    },
    {
      "term": "Loanable Funds Market",
      "definition": "A market that illustrates the interaction between borrowers and savers, determining real interest rates."
    },
    {
      "term": "Shifters of Loanable Funds Demand",
      "definition": "Changes in government borrowing, business investment, and foreign demand for currency."
    },
    {
      "term": "Shifters of Loanable Funds Supply",
      "definition": "Changes in savings behavior, expectations for the future, and foreign purchases of domestic assets."
    }
  ],
  'Unit 5: Long-Run Consequences of Stabilization Policies': [
    {
      "term": "Phillips Curve",
      "definition": "A graphical model showing the inverse relationship between inflation and unemployment in the short run."
    },
    {
      "term": "Short-Run Phillips Curve (SRPC)",
      "definition": "A downward-sloping curve showing the tradeoff between inflation and unemployment in the short run."
    },
    {
      "term": "Long-Run Phillips Curve (LRPC)",
      "definition": "A vertical curve showing that in the long run, there is no tradeoff between inflation and unemployment."
    },
    {
      "term": "Positive Output Gap",
      "definition": "An inflationary gap where production is high, unemployment is low, and prices rise."
    },
    {
      "term": "Negative Output Gap",
      "definition": "A recessionary gap where production is low, unemployment is high, and inflation is low."
    },
    {
      "term": "Full Employment",
      "definition": "A state where the economy is using its labor resources efficiently, producing at its potential output."
    },
    {
      "term": "Movement Along the Phillips Curve",
      "definition": "A change in inflation and unemployment caused by shifts in aggregate demand."
    },
    {
      "term": "Shift of the Phillips Curve",
      "definition": "A change in inflation and unemployment caused by shifts in aggregate supply."
    },
    {
      "term": "Expansionary Policy and the Phillips Curve",
      "definition": "Expansionary fiscal or monetary policy shifts AD right, moving up along the SRPC, leading to higher inflation and lower unemployment."
    },
    {
      "term": "Contractionary Policy and the Phillips Curve",
      "definition": "Contractionary fiscal or monetary policy shifts AD left, moving down along the SRPC, leading to lower inflation and higher unemployment."
    },
    {
      "term": "Long-Run Adjustment on the Phillips Curve",
      "definition": "In the long run, aggregate supply adjusts, shifting the SRPC rightward after expansionary policy or leftward after contractionary policy, returning unemployment to its natural rate."
    }
  ], 
  'Unit 6: Open Economy—International Trade and Finance': [
    {
      "term": "Balance of Payments Accounts",
      "definition": "A record of all international transactions within a year, consisting of the current account and the financial account."
    },
    {
      "term": "Current Account",
      "definition": "Measures net exports, net income from abroad, and net unilateral transfers."
    },
    {
      "term": "Net Exports",
      "definition": "The value of exports minus the value of imports (X - M)."
    },
    {
      "term": "Net Income from Abroad",
      "definition": "The difference between income earned by domestic citizens abroad and income earned by foreigners domestically."
    },
    {
      "term": "Net Unilateral Transfers",
      "definition": "Payments from one country to another that do not correspond to the purchase of any good, service, or asset."
    },
    {
      "term": "Trade Surplus",
      "definition": "Occurs when exports exceed imports (X > M)."
    },
    {
      "term": "Trade Deficit",
      "definition": "Occurs when imports exceed exports (X < M)."
    },
    {
      "term": "Financial (Capital) Account",
      "definition": "Measures the ownership of assets held by foreigners and the ownership of foreign assets."
    },
    {
      "term": "Exchange Rate",
      "definition": "The price at which one currency can be exchanged for another."
    },
    {
      "term": "Currency Appreciation",
      "definition": "An increase in the value of a currency relative to another currency."
    },
    {
      "term": "Currency Depreciation",
      "definition": "A decrease in the value of a currency relative to another currency."
    },
    {
      "term": "Foreign Exchange Market",
      "definition": "The market where buyers and sellers exchange currencies of different countries."
    },
    {
      "term": "Foreign Exchange Demand",
      "definition": "The quantity of a currency that domestic and foreign buyers are willing to purchase at different exchange rates."
    },
    {
      "term": "Foreign Exchange Supply",
      "definition": "The quantity of a currency that domestic and foreign sellers are willing to sell at different exchange rates."
    },
    {
      "term": "Shifters of Currency Demand and Supply",
      "definition": "Factors that influence exchange rates: Tastes and Preferences, Income, Price Levels, and Interest Rates."
    }
  ]
}; 