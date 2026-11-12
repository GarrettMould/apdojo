import type { GuidedLessonContent } from './types';

/**
 * AP Macro Unit 6: Open Economy – International Trade and Finance.
 * No Macro whiteboards exist for this unit yet, so every walkthrough step is a concept card with a
 * note. Add board topics to `boards` once `apMacroUnit6Whiteboards` has them.
 */
export const macroUnit6GuidedLessons: GuidedLessonContent[] = [
  {
    lessonId: '6.1',
    unit: 6,
    slug: 'balance-of-payments-accounts',
    brief:
      'The balance of payments (BOP) is a record of every transaction between one country and the rest of the world over a year. Money coming into the country is recorded as a credit (+), and money going out is recorded as a debit (−).\n\n' +
      'The current account records trade in goods and services (the trade balance, or net exports), plus net income from abroad, such as interest and dividends earned on foreign assets, and net unilateral transfers, such as foreign aid and money sent home by workers abroad. Exports are credits and imports are debits. A foreign tourist spending money in the United States counts as a U.S. export of services, so it is a credit.\n\n' +
      'The financial account (sometimes called the capital account) records the buying and selling of assets: stocks, bonds, factories and real estate. When foreigners buy U.S. assets, money flows in, so it is a capital inflow and a credit. When Americans buy foreign assets, it is a capital outflow and a debit.\n\n' +
      'The two accounts balance: the current account plus the financial account equals zero. A country with a current account deficit must have a financial account surplus of the same size. The dollars spent on imports end up with foreigners, who use them to buy U.S. assets.',
    coreQuestion:
      'A country has a current account deficit of $50 billion. Explain what must be true of its financial account, and why.',
    rubric: [
      {
        id: 'surplus',
        criterion:
          'States that the financial account has a surplus, and that it equals $50 billion (the same size as the current account deficit).',
      },
      {
        id: 'why',
        criterion:
          'Explains why: the balance of payments must balance (current account + financial account = 0), because the money spent on imports returns as foreigners buy the country\'s assets (a net capital inflow).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The financial account must have a surplus of $50 billion. The current account and the financial account always sum to zero. A current account deficit means the country is paying out more for imports, income and transfers than it receives, and that money ends up with foreigners. They use it to buy the country\'s assets, such as bonds, stocks and real estate, which is a net capital inflow recorded as a financial account surplus.',
    walkthrough: [
      {
        kicker: 'The big picture',
        title: 'The balance of payments records every transaction with the rest of the world',
        boards: [],
        terms: ['Balance of Payments (BOP) Accounts'],
        note: 'Every time money crosses a border, it is recorded. Money coming into the country is a credit (+), and money going out is a debit (−).',
      },
      {
        kicker: 'The current account',
        title: 'Trade in goods and services goes in the current account',
        boards: [],
        terms: ['Current Account (CA)', 'Trade Balance (Net Exports)'],
        note: 'Exports are credits and imports are debits. A French tourist spending money at a U.S. national park counts as a U.S. export of services.',
      },
      {
        kicker: 'The current account',
        title: 'Income and transfers count too',
        boards: [],
        terms: ['Net Income from Abroad', 'Net Unilateral Transfers'],
        note: 'Interest and dividends earned on foreign assets are credits, and those paid to foreigners are debits. Foreign aid sent abroad is a debit.',
      },
      {
        kicker: 'The financial account',
        title: 'Buying and selling assets goes in the financial account',
        boards: [],
        terms: ['Financial Account (or Capital Account)', 'Capital Inflow / Outflow'],
        note: 'When foreigners buy U.S. bonds, stocks, factories or real estate, money flows in: a capital inflow and a credit. When a U.S. company builds a factory in Ireland, money flows out: a capital outflow and a debit.',
      },
      {
        kicker: 'How they fit together',
        title: 'The two accounts balance',
        boards: [],
        terms: ['Current & Financial Account Relationship'],
        note: 'Current account + financial account = 0. A current account deficit comes with a financial account surplus of the same size, because the dollars spent on imports come back as foreigners buy U.S. assets.',
      },
      {
        kicker: 'Exam tip',
        title: 'Credit or debit? Follow the money',
        boards: [],
        terms: [],
        note: 'First ask which way the payment goes: money in is a credit, money out is a debit. Then ask what was bought: goods, services, income and transfers go in the current account, and assets go in the financial account.',
      },
    ],
    checkQuestionIds: [68, 69, 70],
  },
  {
    lessonId: '6.2',
    unit: 6,
    slug: 'exchange-rates',
    brief:
      'An exchange rate is the price of one currency in terms of another. If $1 = 100 yen, one dollar buys 100 yen, and one yen costs one cent. The same rate can be written either way round.\n\n' +
      'A currency appreciates when it can buy more of another currency. If the rate moves from $1 = 100 yen to $1 = 120 yen, each dollar now buys more yen, so the dollar has appreciated. A currency depreciates when it buys less. The two always go together: if the dollar appreciates against the yen, the yen has depreciated against the dollar.\n\n' +
      'Exchange rates change what foreign goods cost. To convert a price, divide the foreign price by the exchange rate. A 1,200-yen item costs $12 when $1 = 100 yen, but only $10 when $1 = 120 yen. So when the dollar appreciates, foreign goods become cheaper for Americans, and American goods become more expensive for foreigners. When the dollar depreciates, the opposite happens.\n\n' +
      'Be careful reading rates. In €1 = $1.10 changing to €1 = $1.20, the number went up on the dollar side, but it is the euro that now buys more dollars. The euro appreciated and the dollar depreciated. Always ask: what does one unit of this currency buy now?',
    coreQuestion:
      'The exchange rate changes from $1 = 100 yen to $1 = 120 yen. Has the U.S. dollar appreciated or depreciated? Explain, and say what happens to the dollar price of a Japanese good that costs 1,200 yen.',
    rubric: [
      {
        id: 'direction',
        criterion:
          'States that the dollar appreciated (and the yen depreciated) because each dollar now buys more yen.',
      },
      {
        id: 'price',
        criterion:
          'States that the dollar price of the good falls, from $12 to $10 (or explains that it becomes cheaper for Americans).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The dollar appreciated, because one dollar now buys 120 yen instead of 100. That also means the yen depreciated against the dollar. The Japanese good gets cheaper for Americans: it cost 1,200 ÷ 100 = $12 before and costs 1,200 ÷ 120 = $10 now.',
    walkthrough: [
      {
        kicker: 'What it is',
        title: 'An exchange rate is the price of a currency',
        boards: [],
        terms: ['Exchange Rate'],
        note: '$1 = 100 yen means one dollar buys 100 yen, and one yen costs $0.01. The same rate can be written either way round.',
      },
      {
        kicker: 'Appreciation',
        title: 'A currency appreciates when it buys more',
        boards: [],
        terms: ['Currency Appreciation'],
        note: 'From $1 = 100 yen to $1 = 120 yen, each dollar buys more yen, so the dollar has appreciated.',
      },
      {
        kicker: 'Depreciation',
        title: 'The other currency depreciates',
        boards: [],
        terms: ['Currency Depreciation'],
        note: 'If a dollar buys more yen, a yen buys fewer dollars, so the yen has depreciated. One currency\'s appreciation is always the other\'s depreciation.',
      },
      {
        kicker: 'Converting prices',
        title: 'Using the rate to change a price into another currency',
        boards: [],
        terms: [],
        note: 'Divide the foreign price by the exchange rate. A 1,200-yen item costs 1,200 ÷ 100 = $12 at $1 = 100 yen, but 1,200 ÷ 120 = $10 at $1 = 120 yen. A stronger dollar makes foreign goods cheaper for Americans.',
      },
      {
        kicker: 'Exam tip',
        title: 'Ask what one unit of the currency buys',
        boards: [],
        terms: [],
        note: 'In €1 = $1.10 changing to €1 = $1.20, the euro now buys more dollars, so the euro appreciated and the dollar depreciated, even though the dollar figure went up.',
      },
    ],
    checkQuestionIds: [71, 72, 260],
  },
  {
    lessonId: '6.3',
    unit: 6,
    slug: 'foreign-exchange-market',
    brief:
      'The foreign exchange (FOREX) market is where currencies are traded, and supply and demand set the exchange rate. Each graph shows the market for one currency. In the market for euros, the vertical axis is the price of a euro in another currency (dollars per euro), and the horizontal axis is the quantity of euros.\n\n' +
      'Demand for euros comes from people outside Europe who need euros to buy European goods and services, travel to Europe or buy European assets. As the euro gets cheaper, European goods get cheaper for them, so demand slopes down. Supply of euros comes from Europeans swapping euros for other currencies so they can buy foreign goods and assets. Supply slopes up. Where the two meet is the equilibrium exchange rate.\n\n' +
      'Demand and supply shift with tastes for a country\'s goods, relative incomes, relative price levels, relative real interest rates and expectations about a currency\'s future value.\n\n' +
      'The markets for two currencies are linked. To buy pesos, Americans have to sell dollars. So when Americans want more Mexican goods, demand for pesos increases and the peso appreciates, and at the same time the supply of dollars increases and the dollar depreciates. The key question is always: who needs this currency, and why?',
    coreQuestion:
      'Consumers in the United States develop a strong preference for goods made in Mexico. Explain what happens to the demand for Mexican pesos and the value of the peso. Then explain what happens to the supply of U.S. dollars and the value of the dollar.',
    rubric: [
      {
        id: 'peso',
        criterion:
          'States that demand for pesos increases (Americans need pesos to buy Mexican goods), so the peso appreciates.',
      },
      {
        id: 'dollar',
        criterion:
          'States that the supply of U.S. dollars increases (Americans sell dollars to get pesos), so the dollar depreciates.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'To buy more Mexican goods, Americans need more pesos, so demand for pesos increases and the peso appreciates. To get those pesos, Americans sell dollars, so the supply of dollars in the FOREX market increases and the dollar depreciates against the peso.',
    walkthrough: [
      {
        kicker: 'The graph',
        title: 'The FOREX market sets the price of a currency',
        boards: [],
        terms: ['Foreign Exchange Market (FOREX)'],
        note: 'Each graph is the market for one currency. In the market for euros, the vertical axis is dollars per euro and the horizontal axis is the quantity of euros.',
      },
      {
        kicker: 'Demand',
        title: 'Demand comes from foreigners who want to buy',
        boards: [],
        terms: ['Demand for Currency (in FOREX)'],
        note: 'Americans need euros to buy European goods, visit Europe or buy European assets. A cheaper euro makes all of those cheaper, so demand slopes down.',
      },
      {
        kicker: 'Supply',
        title: 'Supply comes from people swapping the currency away',
        boards: [],
        terms: ['Supply of Currency (in FOREX)'],
        note: 'Europeans supply euros when they swap them for dollars to buy American goods or assets. Supply slopes up.',
      },
      {
        kicker: 'Shifters',
        title: 'What shifts demand and supply',
        boards: [],
        terms: ['Shifters of the FOREX Market'],
        note: 'Tastes for a country\'s goods, relative incomes, relative price levels, relative real interest rates, and expectations about the currency\'s future value.',
      },
      {
        kicker: 'Linked markets',
        title: 'Demand for one currency is supply of the other',
        boards: [],
        terms: [],
        note: 'To buy pesos, Americans sell dollars. An increase in demand for pesos is also an increase in the supply of dollars: the peso appreciates and the dollar depreciates.',
      },
      {
        kicker: 'Exam tip',
        title: 'Ask who needs the currency',
        boards: [],
        terms: [],
        note: 'Anyone buying a country\'s goods, services or assets demands its currency. That country\'s own residents supply it when they buy abroad.',
      },
    ],
    checkQuestionIds: [73, 74, 261],
  },
  {
    lessonId: '6.4',
    unit: 6,
    slug: 'changes-policies-forex-market',
    brief:
      'Government policies and economic conditions change exchange rates mainly through real interest rates, but also through prices and incomes.\n\n' +
      'Savers move their money to wherever the real return is highest. When U.S. real interest rates rise relative to other countries, foreigners want U.S. bonds, so they demand more dollars and the dollar appreciates. When U.S. rates fall, financial capital flows out and the dollar depreciates.\n\n' +
      'Monetary policy works through that link. Expansionary monetary policy increases the money supply and lowers real interest rates, so capital flows out and the currency depreciates. Contractionary monetary policy, such as selling bonds, raises real interest rates, attracts capital and appreciates the currency.\n\n' +
      'Fiscal policy works the other way round. Expansionary fiscal policy means deficit spending, and government borrowing increases demand for loanable funds, raising the real interest rate. Capital flows in and the currency appreciates. Contractionary fiscal policy lowers the real interest rate, so the currency depreciates.\n\n' +
      'Other conditions matter too. If U.S. inflation is higher than elsewhere, U.S. goods become relatively expensive, so demand for dollars falls and the dollar depreciates. If U.S. incomes rise, Americans buy more imports, supplying more dollars, so the dollar depreciates.',
    coreQuestion:
      'The Federal Reserve sells government bonds on the open market. Explain how this affects the U.S. real interest rate, and then how it affects the international value of the U.S. dollar.',
    rubric: [
      {
        id: 'rate',
        criterion: 'States that the money supply decreases, so the (real) interest rate in the U.S. increases.',
      },
      {
        id: 'currency',
        criterion:
          'Explains that the higher real interest rate attracts foreign financial capital (capital inflow), increasing demand for dollars, so the dollar appreciates.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'Selling bonds takes money out of the banking system, so the money supply falls and the U.S. real interest rate rises. U.S. assets now pay a better real return than assets abroad, so foreign savers buy them. To do that they need dollars, so demand for dollars increases and the dollar appreciates.',
    walkthrough: [
      {
        kicker: 'The key link',
        title: 'Higher real interest rates pull in financial capital',
        boards: [],
        terms: ['Real Interest Rates and Capital Flows'],
        note: 'When U.S. real interest rates rise relative to other countries, foreigners demand dollars to buy U.S. bonds, so the dollar appreciates.',
      },
      {
        kicker: 'Monetary policy',
        title: 'Expansionary monetary policy depreciates the currency',
        boards: [],
        terms: ['Expansionary Monetary Policy & Exchange Rate'],
        note: 'A bigger money supply lowers real interest rates. Financial capital flows out, demand for dollars falls, and the dollar depreciates.',
      },
      {
        kicker: 'Monetary policy',
        title: 'Contractionary monetary policy appreciates it',
        boards: [],
        terms: ['Contractionary Monetary Policy & Exchange Rate'],
        note: 'Selling bonds shrinks the money supply and raises real interest rates. Capital flows in, demand for dollars rises, and the dollar appreciates.',
      },
      {
        kicker: 'Fiscal policy',
        title: 'Deficit spending appreciates the currency',
        boards: [],
        terms: ['Expansionary Fiscal Policy & Exchange Rate'],
        note: 'Government borrowing increases demand for loanable funds and raises the real interest rate. Foreign capital flows in and the dollar appreciates.',
      },
      {
        kicker: 'Fiscal policy',
        title: 'Contractionary fiscal policy depreciates it',
        boards: [],
        terms: ['Contractionary Fiscal Policy & Exchange Rate'],
        note: 'Less government borrowing lowers the real interest rate. Capital flows out and the currency depreciates.',
      },
      {
        kicker: 'Other conditions',
        title: 'Inflation and income matter too',
        boards: [],
        terms: ['Shifters of the FOREX Market'],
        note: 'Higher U.S. inflation makes U.S. goods relatively expensive, so the dollar depreciates. Rising U.S. incomes mean Americans buy more imports and supply more dollars, so the dollar depreciates.',
      },
    ],
    checkQuestionIds: [76, 77, 78],
  },
  {
    lessonId: '6.5',
    unit: 6,
    slug: 'changes-forex-market-net-exports',
    brief:
      'Exchange rates change net exports, and net exports are part of aggregate demand (AD = C + I + G + Xn).\n\n' +
      'When the dollar appreciates, each U.S. good costs foreigners more of their own currency, so U.S. exports fall. Foreign goods get cheaper for Americans, so imports rise. Exports fall and imports rise, so net exports decrease and AD shifts left, lowering real GDP and the price level in the short run.\n\n' +
      'When the dollar depreciates, the opposite happens. U.S. goods are cheaper for foreigners and imports are more expensive for Americans, so exports rise, imports fall, net exports increase, and AD shifts right.\n\n' +
      'On the exam you will often follow a whole chain from a policy to net exports. Contractionary monetary policy raises the real interest rate, which attracts capital inflows, which appreciates the dollar, which lowers net exports and AD. Here the exchange rate reinforces the policy.\n\n' +
      'With fiscal policy, it works against it. Expansionary fiscal policy raises the real interest rate, which appreciates the currency and lowers net exports, partly offsetting the increase in AD. Write every link in the chain: graders award points for each one.',
    coreQuestion:
      'The U.S. dollar appreciates against the euro. Explain the effect on U.S. net exports and on U.S. aggregate demand.',
    rubric: [
      {
        id: 'netExports',
        criterion:
          'Explains that U.S. exports become more expensive for Europeans and imports become cheaper for Americans, so exports fall and/or imports rise and net exports decrease.',
      },
      {
        id: 'ad',
        criterion: 'States that aggregate demand decreases because net exports are a component of AD.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'A stronger dollar means Europeans need more euros to buy each U.S. good, so U.S. exports fall, while European goods get cheaper for Americans, so U.S. imports rise. Net exports decrease. Since net exports are part of aggregate demand, U.S. AD decreases (shifts left).',
    walkthrough: [
      {
        kicker: 'Appreciation',
        title: 'A stronger currency makes exports more expensive',
        boards: [],
        terms: ['Effect of Currency Appreciation on Net Exports'],
        note: 'When the dollar appreciates, foreigners need more of their currency for each U.S. good, so U.S. exports fall. Foreign goods get cheaper for Americans, so imports rise.',
      },
      {
        kicker: 'Depreciation',
        title: 'A weaker currency makes exports cheaper',
        boards: [],
        terms: ['Effect of Currency Depreciation on Net Exports'],
        note: 'When the dollar depreciates, U.S. goods get cheaper for foreigners and imports get pricier for Americans. Exports rise, imports fall, and net exports increase.',
      },
      {
        kicker: 'Link to AD',
        title: 'Net exports are part of aggregate demand',
        boards: [],
        terms: [],
        note: 'AD = C + I + G + Xn. Appreciation lowers net exports and shifts AD left; depreciation raises net exports and shifts AD right.',
      },
      {
        kicker: 'The full chain',
        title: 'From policy to net exports',
        boards: [],
        terms: [],
        note: 'Contractionary monetary policy: real interest rate rises → capital flows in → dollar appreciates → net exports fall → AD decreases. Write each step, because each link can earn a point.',
      },
      {
        kicker: 'Exam tip',
        title: 'The exchange rate can work against fiscal policy',
        boards: [],
        terms: [],
        note: 'Expansionary fiscal policy raises the real interest rate, which appreciates the currency and lowers net exports, partly offsetting the increase in AD.',
      },
    ],
    checkQuestionIds: [79, 80, 267],
  },
  {
    lessonId: '6.6',
    unit: 6,
    slug: 'real-interest-rates-international-capital-flows',
    brief:
      'Financial capital, the money savers lend or invest, moves across borders in search of the highest real return. That makes relative real interest rates the main driver of international capital flows.\n\n' +
      'If the real interest rate in the United States rises relative to Canada, Canadian savers want U.S. bonds and other assets. Money flows from Canada into the United States: a capital inflow for the U.S. and a capital outflow for Canada. If U.S. rates fall relative to Canada, the flow reverses.\n\n' +
      'Capital flows move exchange rates. To buy U.S. assets, Canadians need dollars, so demand for U.S. dollars increases and the dollar appreciates against the Canadian dollar. A capital outflow does the opposite and depreciates the currency.\n\n' +
      'Capital flows also show up in the loanable funds market. Foreign money flowing into the United States increases the supply of loanable funds there, which pushes the U.S. real interest rate back down. In Canada, the supply of loanable funds falls and the real interest rate rises.\n\n' +
      'Finally, capital flows link back to the balance of payments. A net capital inflow is a financial account surplus, which matches a current account deficit.',
    coreQuestion:
      'The real interest rate in the United States rises relative to the real interest rate in Canada. Explain the effect on financial capital flows between the two countries, and on the value of the U.S. dollar relative to the Canadian dollar.',
    rubric: [
      {
        id: 'flows',
        criterion:
          'States that financial capital flows from Canada into the United States (a capital inflow for the U.S.) because savers seek the higher real return.',
      },
      {
        id: 'currency',
        criterion:
          'Explains that demand for U.S. dollars increases (Canadians need dollars to buy U.S. assets), so the U.S. dollar appreciates relative to the Canadian dollar.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'With a higher real return available in the United States, Canadian savers buy U.S. bonds and other assets, so financial capital flows out of Canada and into the United States. To buy those assets they need U.S. dollars, so demand for dollars increases in the foreign exchange market and the U.S. dollar appreciates against the Canadian dollar.',
    walkthrough: [
      {
        kicker: 'Why money moves',
        title: 'Financial capital chases the highest real return',
        boards: [],
        terms: ['Financial Capital Flows'],
        note: 'Savers and investors put their money wherever the real interest rate is highest, including in other countries.',
      },
      {
        kicker: 'Capital inflows',
        title: 'Higher real interest rates bring capital in',
        boards: [],
        terms: ['Real Interest Rates and Capital Flows', 'Capital Inflow / Outflow'],
        note: 'When U.S. real interest rates rise relative to Canada, Canadians buy U.S. bonds. That is a capital inflow for the U.S. and a capital outflow for Canada.',
      },
      {
        kicker: 'The currency',
        title: 'Inflows raise demand for the currency',
        boards: [],
        terms: ['Shifters of the FOREX Market'],
        note: 'To buy U.S. assets, Canadians need dollars. Demand for dollars increases, and the dollar appreciates against the Canadian dollar.',
      },
      {
        kicker: 'Loanable funds',
        title: 'Inflows add to the supply of loanable funds',
        boards: [],
        terms: [],
        note: 'Foreign capital increases the supply of loanable funds in the U.S., pulling its real interest rate back down. In Canada, the supply of loanable funds falls and the real interest rate rises.',
      },
      {
        kicker: 'Link to the balance of payments',
        title: 'A capital inflow is a financial account surplus',
        boards: [],
        terms: [],
        note: 'Net capital inflows are recorded as a financial account surplus, which matches a current account deficit of the same size.',
      },
    ],
    checkQuestionIds: [81, 82, 266],
  },
];
