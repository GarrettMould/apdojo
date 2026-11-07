import type { GuidedLessonContent } from './types';

/** AP Macro Unit 4: Financial Sector. */
export const macroUnit4GuidedLessons: GuidedLessonContent[] = [
  {
    lessonId: '4.1',
    unit: 4,
    slug: 'financial-assets',
    brief:
      'A financial asset is anything that holds financial value: cash, stocks, bonds, gold or real estate. A stock is a share of ownership in a company. A bond is a loan: when you buy a bond, you are lending money to a government or company, and they pay you interest.\n\n' +
      'Assets differ in liquidity, which is how easily they can be turned into cash without losing value. Cash is perfectly liquid and is the best medium of exchange, but it earns no interest. Bonds pay interest, but you cannot spend them directly. So holding money always means giving up the interest you could have earned.\n\n' +
      'Bond prices and interest rates move in opposite directions. Suppose you own a bond paying 4%, and new bonds start paying 5%. No one will pay full price for your 4% bond when they can buy a 5% bond instead, so the price of previously issued bonds falls. When interest rates fall, existing bonds become more valuable and their prices rise.',
    coreQuestion:
      'Market interest rates rise from 4% to 5%. Explain what happens to the price of a bond you already own that pays 4%, and why.',
    rubric: [
      {
        id: 'price',
        criterion: 'States that the price (market value) of the previously issued 4% bond falls.',
      },
      {
        id: 'why',
        criterion:
          'Explains why: new bonds now pay a higher interest rate, so the older bond paying less is less attractive and buyers will only buy it at a lower price.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The price of my 4% bond falls. New bonds now pay 5%, so buyers would rather buy a new bond than mine, which pays less interest. The only way to sell my bond is at a lower price, so interest rates and the prices of existing bonds move in opposite directions.',
    walkthrough: [
      {
        kicker: 'What counts',
        title: 'Anything that holds financial value',
        boards: ['Financial Assets 9'],
        terms: ['Financial Asset', 'Stock', 'Bond'],
      },
      {
        kicker: 'Liquidity',
        title: 'How easily an asset turns into cash',
        boards: ['Financial Assets 11'],
        terms: ['Liquidity', 'Certificate of Deposit (CD)'],
      },
      {
        kicker: 'The trade-off',
        title: 'Cash is easy to spend; bonds pay interest',
        boards: ['Financial Assets 24'],
        terms: [],
        note: 'Cash is the best medium of exchange but earns nothing. Bonds earn interest but you cannot spend them directly. Holding money means giving up interest.',
      },
      {
        kicker: 'Bonds and interest rates',
        title: 'When interest rates rise, old bond prices fall',
        boards: ['Financial Assets 27'],
        terms: ['Inverse Relationship between Interest Rates and Bond Prices'],
        note: 'If new bonds pay 5%, no one pays full price for an old bond paying 4%, so its price falls.',
      },
    ],
    checkQuestionIds: [297, 298, 3097],
  },
  {
    lessonId: '4.2',
    unit: 4,
    slug: 'nominal-real-interest-rates',
    brief:
      'Interest is the cost of borrowing money. The nominal interest rate is the rate written on the loan. The real interest rate adjusts for inflation and shows what the lender actually gains in purchasing power:\n\n' +
      'Real interest rate = nominal interest rate − inflation rate\n\n' +
      'When a loan is made, lenders set the nominal rate based on the inflation they expect. If they want a 3% real return and expect 2% inflation, they charge 5%. If they expect more inflation, they charge a higher nominal rate.\n\n' +
      'Problems arise when actual inflation differs from what was expected. If inflation turns out higher than expected, the borrower repays with dollars that buy less, so the real interest rate is lower than planned: borrowers win and lenders lose. If inflation turns out lower than expected, the real interest rate is higher than planned: lenders win and borrowers lose.',
    coreQuestion:
      'You lend a friend money at a fixed 6% nominal interest rate, expecting 2% inflation. Inflation turns out to be 5%. Are you, the lender, better or worse off than you expected? Explain using the real interest rate.',
    rubric: [
      {
        id: 'real-rate',
        criterion:
          'Uses real interest rate = nominal − inflation to show the real return is lower than expected (about 1% instead of the expected 4%), or clearly explains that higher inflation lowered the real interest rate.',
      },
      {
        id: 'lender',
        criterion:
          'Concludes the lender is worse off (and the borrower better off) because the loan is repaid with dollars that have less purchasing power than expected.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'I expected a real interest rate of 6% − 2% = 4%, but with 5% inflation my real return is only 6% − 5% = 1%. I am worse off than I expected, because my friend repays me with dollars that buy less than I planned. Unexpectedly high inflation helps borrowers and hurts lenders.',
    walkthrough: [
      {
        kicker: 'The cost of borrowing',
        title: 'Real interest rate = nominal rate − inflation',
        boards: ['Real vs Nominal Interest Rates 15'],
        terms: ['Interest', 'Nominal Interest Rate', 'Real Interest Rate'],
      },
      {
        kicker: 'Surprise inflation',
        title: 'Inflation higher than expected: borrowers win',
        boards: ['Real vs Nominal Interest Rates 24'],
        terms: ['Expected vs. Actual Inflation'],
        note: 'The borrower repays with dollars that buy less than the lender planned, so the real interest rate ends up lower than expected.',
      },
      {
        kicker: 'Surprise disinflation',
        title: 'Inflation lower than expected: lenders win',
        boards: ['Real vs Nominal Interest Rates 26'],
        terms: [],
        note: 'The borrower repays with dollars worth more than expected, so the real interest rate ends up higher than expected.',
      },
    ],
    checkQuestionIds: [299, 300, 38],
  },
  {
    lessonId: '4.3',
    unit: 4,
    slug: 'definition-measurement-functions-money',
    brief:
      'To count as money, something must do three jobs. It is a medium of exchange: people accept it in trade, so we do not have to barter. It is a store of value: it holds its value over time, so you can save it and spend it later, unlike milk or flowers. And it is a unit of account: a common measure for pricing and comparing goods, so we can say a coffee costs $5 instead of three eggs.\n\n' +
      'The money supply is the amount of money circulating in the economy, measured by liquidity. M1 is the most liquid money: currency and checking (demand) deposits, used mainly as a medium of exchange. M2 includes everything in M1 plus less liquid near-monies like savings accounts and small certificates of deposit, used more as a store of value. Stocks and bonds are financial assets, but they are not part of the money supply.\n\n' +
      'The monetary base is the physical currency in circulation plus the reserves banks hold.',
    coreQuestion: 'Describe the three functions of money, with an example of each.',
    rubric: [
      {
        id: 'medium',
        criterion:
          'Correctly describes money as a medium of exchange: accepted in trade for goods and services (an example such as paying for groceries helps but is not required).',
      },
      {
        id: 'store',
        criterion:
          'Correctly describes money as a store of value: it holds value over time so it can be saved and spent later.',
      },
      {
        id: 'unit',
        criterion:
          'Correctly describes money as a unit of account: a common measure for pricing and comparing the value of goods and services.',
      },
    ],
    passMark: 3,
    modelAnswer:
      'Money is a medium of exchange because it is accepted in trade, like paying $5 for lunch instead of bartering. It is a store of value because it keeps its value over time, so I can save $50 this month and spend it next month. It is a unit of account because it gives us a common measure of value, so I can compare a $3 coffee with a $15 movie ticket.',
    walkthrough: [
      {
        kicker: 'Function 1',
        title: 'Medium of exchange',
        boards: ['Definition, Measurement, and Functions of Money 13'],
        terms: ['The Three Functions of Money', 'Medium of Exchange'],
      },
      {
        kicker: 'Function 2',
        title: 'Store of value',
        boards: ['Definition, Measurement, and Functions of Money 18'],
        terms: ['Store of Value'],
      },
      {
        kicker: 'Function 3',
        title: 'Unit of account',
        boards: ['Definition, Measurement, and Functions of Money 22'],
        terms: ['Unit of Account'],
      },
      {
        kicker: 'Measuring money',
        title: 'M1 and M2',
        boards: ['Definition, Measurement, and Functions of Money 26', 'Definition, Measurement, and Functions of Money 27'],
        terms: ['Money Supply'],
        note: 'M1 is currency and checking deposits. M2 adds savings accounts and small CDs. Stocks and bonds are not money.',
      },
      {
        kicker: 'Measuring money',
        title: 'The monetary base',
        boards: ['Definition, Measurement, and Functions of Money 28'],
        terms: ['Monetary Base'],
      },
    ],
    checkQuestionIds: [39, 301, 3101],
  },
  {
    lessonId: '4.4',
    unit: 4,
    slug: 'banking-expansion-money-supply',
    brief:
      'When you deposit money into a checking account, it becomes a demand deposit: you can withdraw it at any time. For the bank, your deposit is a liability (it owes you that money), and the cash it receives becomes an asset held as reserves.\n\n' +
      'In a fractional reserve banking system, banks keep only part of each deposit. The required reserve ratio (RRR) sets the fraction they must hold as required reserves. Anything above that is excess reserves, which banks can lend out.\n\n' +
      'Lending creates money. If the RRR is 10% and you deposit $100, the bank keeps $10 and lends $90. That $90 is spent and deposited in another bank, which keeps $9 and lends $81, and so on. The money multiplier tells us the maximum this process can expand the money supply:\n\n' +
      'Money multiplier = 1 / RRR\n' +
      'Maximum change in the money supply = initial excess reserves × money multiplier\n\n' +
      'Careful with cash deposits: if someone deposits $1,000 of cash they already held, that $1,000 was already money. Only the $900 of new excess reserves creates new money, so with a 10% RRR the maximum increase is $900 × 10 = $9,000.',
    coreQuestion:
      'The required reserve ratio is 10%. Someone deposits $1,000 of cash into a checking account. Explain how the banking system can increase the money supply, and find the maximum possible increase.',
    rubric: [
      {
        id: 'process',
        criterion:
          'Explains that the bank keeps required reserves ($100) and lends out excess reserves ($900), which are spent and redeposited in other banks that lend again, creating new money.',
      },
      {
        id: 'amount',
        criterion:
          'Uses the money multiplier (1 / 0.10 = 10) on the excess reserves to get a maximum increase of $9,000.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The bank must keep 10% of the deposit, $100, as required reserves and can lend out the other $900. That loan is spent and deposited in another bank, which keeps 10% and lends the rest, and the process repeats, creating new money each time. The money multiplier is 1 / 0.10 = 10, so the maximum increase in the money supply is $900 × 10 = $9,000.',
    walkthrough: [
      {
        kicker: 'The deposit',
        title: 'Money you can withdraw any time',
        boards: ['banking in the expansion of the money supply 1'],
        terms: ['Demand Deposit', 'Asset (Banking)', 'Liability (Banking)'],
      },
      {
        kicker: 'The rule',
        title: 'Banks must keep a fraction in reserve',
        boards: ['banking in the expansion of the money supply 5'],
        terms: ['Required Reserve Ratio (RRR)', 'Required Reserves'],
      },
      {
        kicker: 'The rest',
        title: 'Excess reserves can be lent out',
        boards: ['banking in the expansion of the money supply 25'],
        terms: ['Fractional Reserve Banking System', 'Excess Reserves'],
      },
      {
        kicker: 'Lend, deposit, lend',
        title: 'Lending expands the money supply',
        boards: ['banking in the expansion of the money supply 35'],
        terms: [],
        note: 'Each loan is spent and deposited in another bank, which keeps its required share and lends the rest: $100, then $90, then $81, and so on.',
      },
      {
        kicker: 'The money multiplier',
        title: 'Money multiplier = 1 / RRR',
        boards: ['banking in the expansion of the money supply 37'],
        terms: ['Money Multiplier'],
      },
      {
        kicker: 'Putting it together',
        title: 'Maximum change = excess reserves × multiplier',
        boards: ['banking in the expansion of the money supply 38'],
        terms: ['Maximum Potential Expansion of the Money Supply'],
        note: 'For a new cash deposit, only the excess reserves create new money: with a 10% RRR, a $1,000 cash deposit can add at most $900 × 10 = $9,000.',
      },
    ],
    checkQuestionIds: [41, 304, 315],
  },
  {
    lessonId: '4.5',
    unit: 4,
    slug: 'money-market',
    brief:
      'The money market shows the supply of money and the demand for money, with the nominal interest rate on the vertical axis. Where they meet is the equilibrium nominal interest rate.\n\n' +
      'The money supply (MS) is set by the central bank, so it is a vertical line: the amount of money does not change with the interest rate.\n\n' +
      'Money demand (MD) is how much people want to hold as money (M1, like cash and checking deposits) instead of interest-earning assets like bonds. It slopes downward because the nominal interest rate is the opportunity cost of holding money. When interest rates are high, holding cash means giving up a lot of interest, so people hold less. When rates are low, holding cash costs little.\n\n' +
      'Two things shift money demand. A higher price level means people need more money to buy the same things. Higher real GDP (national income) means more transactions. Either one shifts MD to the right. With the same fixed money supply, more demand for money pushes the nominal interest rate up.',
    coreQuestion:
      'The price level rises. Using the money market, explain what happens to money demand and the nominal interest rate.',
    rubric: [
      {
        id: 'demand',
        criterion:
          'Explains that a higher price level means people need more money for transactions, so money demand increases (shifts right).',
      },
      {
        id: 'rate',
        criterion:
          'States that with the money supply unchanged (vertical), the equilibrium nominal interest rate increases.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'When the price level rises, people need more money to buy the same goods and services, so the demand for money increases and the MD curve shifts right. The money supply is fixed by the central bank, so with more demand for the same amount of money, the equilibrium nominal interest rate rises.',
    walkthrough: [
      {
        kicker: 'The graph',
        title: 'Money supply meets money demand',
        boards: ['Money Market Graph 9', 'Money Market Graph 2'],
        terms: ['Money Market', 'Equilibrium Nominal Interest Rate'],
      },
      {
        kicker: 'Money supply',
        title: 'A vertical line',
        boards: ['Money Market Graph 34'],
        terms: ['Money Supply (in the Money Market)'],
        note: 'The central bank sets the quantity of money, so the money supply does not depend on the interest rate.',
      },
      {
        kicker: 'Money demand',
        title: 'How much money people want to hold',
        boards: ['Money Market Graph 12', 'Money Market Graph 14'],
        terms: ['Money Demand'],
      },
      {
        kicker: 'Why it slopes down',
        title: 'Interest is the opportunity cost of holding money',
        boards: ['Money Market Graph 16', 'Money Market Graph 18'],
        terms: [],
        note: 'High interest rates make holding cash costly, so people hold less. Low rates make it cheap, so they hold more.',
      },
      {
        kicker: 'What shifts money demand',
        title: 'Shifter 1: the price level',
        boards: ['Money Market Graph 24', 'Money Market Graph 27'],
        terms: [],
      },
      {
        kicker: 'What shifts money demand',
        title: 'Shifter 2: real GDP, and what happens to the interest rate',
        boards: ['Money Market Graph 31', 'Money Market Graph 39'],
        terms: [],
        note: 'More demand for the same fixed amount of money raises the nominal interest rate.',
      },
    ],
    checkQuestionIds: [3100, 307, 306],
  },
  {
    lessonId: '4.6',
    unit: 4,
    slug: 'monetary-policy',
    brief:
      'Monetary policy is how a central bank manages the money supply to influence the economy. In the U.S., the central bank is the Federal Reserve, a “bank for banks”: commercial banks hold reserves there and can borrow from it.\n\n' +
      'Monetary policy works through interest rates. Changing the money supply changes the nominal interest rate, and interest rates affect spending: higher rates make borrowing more expensive, so investment and interest-sensitive consumption fall, and AD decreases. Lower rates do the opposite.\n\n' +
      'In a recessionary gap, expansionary monetary policy increases the money supply, which lowers interest rates and increases AD. In an inflationary gap, contractionary monetary policy decreases the money supply, which raises interest rates and decreases AD.\n\n' +
      'There are three tools. Lowering the required reserve ratio lets banks lend more, increasing the money supply. Lowering the discount rate (the rate banks pay to borrow from the central bank) also encourages lending. Buying government bonds in open market operations adds reserves to banks, increasing the money supply. Doing the opposite with each tool decreases the money supply.',
    coreQuestion:
      'The economy is in an inflationary gap. Describe one monetary policy action the central bank could take, and explain how it affects the money supply, interest rates and AD.',
    rubric: [
      {
        id: 'action',
        criterion:
          'Names a valid contractionary action: selling government bonds, raising the discount rate, or raising the required reserve ratio.',
      },
      {
        id: 'chain',
        criterion:
          'Explains the chain: the money supply decreases, nominal interest rates rise, investment and/or consumption fall, and AD decreases (shifts left).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'The central bank could sell government bonds on the open market. This takes reserves out of banks, so they lend less and the money supply decreases. With less money, the nominal interest rate rises, which makes borrowing more expensive, so investment and consumption fall and AD shifts left, reducing inflation.',
    walkthrough: [
      {
        kicker: 'The central bank',
        title: 'A bank for banks',
        boards: ['Monetary Policy 8'],
        terms: ['Central Bank', 'Commercial Bank'],
      },
      {
        kicker: 'The goal',
        title: 'Manage the money supply to influence the economy',
        boards: ['Monetary Policy 12'],
        terms: ['Monetary Policy'],
      },
      {
        kicker: 'How it works',
        title: 'Interest rates drive spending',
        boards: ['Monetary Policy 37'],
        terms: ['Monetary Policy and the AD-AS Model'],
        note: 'Higher interest rates make borrowing more expensive, so investment and consumption fall. Lower rates do the opposite.',
      },
      {
        kicker: 'Two directions',
        title: 'Expansionary vs. contractionary',
        boards: ['Monetary Policy 13', 'Monetary Policy 14'],
        terms: ['Expansionary Monetary Policy', 'Contractionary Monetary Policy'],
      },
      {
        kicker: 'Tool 1',
        title: 'The required reserve ratio',
        boards: ['Monetary Policy 20', 'Monetary Policy 23'],
        terms: ['Tools of Monetary Policy'],
      },
      {
        kicker: 'Tool 2',
        title: 'The discount rate',
        boards: ['Monetary Policy 26', 'Monetary Policy 29'],
        terms: [],
        note: 'The discount rate is what banks pay to borrow from the central bank. Lowering it encourages lending; raising it discourages lending.',
      },
      {
        kicker: 'Tool 3',
        title: 'Open market operations: buying and selling bonds',
        boards: ['Monetary Policy 32', 'Monetary Policy 35'],
        terms: [],
        note: 'Buying bonds adds reserves and increases the money supply. Selling bonds removes reserves and decreases it.',
      },
    ],
    checkQuestionIds: [310, 308, 3103],
  },
  {
    lessonId: '4.7',
    unit: 4,
    slug: 'loanable-funds-market',
    brief:
      'The loanable funds market brings together savers, who supply funds, and borrowers, who demand them. The price is the real interest rate, and the equilibrium real interest rate is where supply and demand meet.\n\n' +
      'Demand comes from borrowers such as businesses that want to invest. It slopes downward: at a lower real interest rate, borrowing is cheaper and more investment projects are worth doing. Supply comes from savers. It slopes upward: a higher real interest rate rewards saving, so people lend more.\n\n' +
      'Demand shifts when borrower behavior changes. When the government runs a budget deficit, it borrows to cover the gap, which increases demand for loanable funds and raises the real interest rate. That higher rate can crowd out private investment. Business optimism about the future also increases demand.\n\n' +
      'Supply shifts when saver behavior changes. A higher savings rate increases supply and lowers the real interest rate. Foreign capital flowing into the country also increases supply and lowers the real interest rate; capital flowing out does the opposite.',
    coreQuestion:
      'The government increases its borrowing to fund a budget deficit. Using the loanable funds market, explain what happens to the real interest rate and to private investment.',
    rubric: [
      {
        id: 'shift',
        criterion:
          'States that government borrowing increases the demand for loanable funds (or, alternatively, decreases the supply of loanable funds by reducing public saving).',
      },
      {
        id: 'result',
        criterion:
          'States that the real interest rate rises, so private investment falls (crowding out).',
      },
    ],
    passMark: 2,
    modelAnswer:
      'When the government borrows to cover its deficit, it adds to the demand for loanable funds, shifting demand to the right. With the same supply of savings, the equilibrium real interest rate rises. Borrowing becomes more expensive for businesses, so private investment falls. This is called crowding out.',
    walkthrough: [
      {
        kicker: 'The market',
        title: 'Savers supply, borrowers demand',
        boards: ['loanable_funds 16'],
        terms: ['Loanable Funds Market', 'Equilibrium Real Interest Rate'],
      },
      {
        kicker: 'Demand',
        title: 'Borrowers want less at higher real interest rates',
        boards: ['loanable_funds 20'],
        terms: ['Demand for Loanable Funds'],
      },
      {
        kicker: 'Supply',
        title: 'Savers lend more at higher real interest rates',
        boards: ['loanable_funds 24'],
        terms: ['Supply of Loanable Funds'],
      },
      {
        kicker: 'Demand shifters',
        title: 'Government deficit spending',
        boards: ['loanable_funds 27', 'loanable_funds 31'],
        terms: [],
        note: 'Government borrowing increases demand for loanable funds, which raises the real interest rate and can crowd out private investment.',
      },
      {
        kicker: 'Demand shifters',
        title: 'Business expectations',
        boards: ['loanable_funds 35'],
        terms: [],
        note: 'When businesses are optimistic about the future, they want to invest more, so demand for loanable funds increases.',
      },
      {
        kicker: 'Supply shifters',
        title: 'Saving and foreign capital',
        boards: ['loanable_funds 37', 'loanable_funds 41'],
        terms: [],
        note: 'More saving increases supply and lowers the real interest rate. Foreign capital flowing in also increases supply and lowers the real interest rate; capital flowing out does the opposite.',
      },
    ],
    checkQuestionIds: [312, 49, 311],
  },
];
