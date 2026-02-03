import { GraphExplanationPost } from '@/types/blogPost';

// Graph Explanation Blog Posts
// These posts use the GraphExplanationPost component with the Neo-Brutalist design
export const graphExplanationPosts: Record<string, GraphExplanationPost> = {
  'consumer-producer-surplus-deadweight-loss': {
    slug: 'consumer-producer-surplus-deadweight-loss',
    headline: 'Consumer Surplus, Producer Surplus, and Deadweight Loss Graph Explained',
    intro: 'Consumer Surplus is the difference between what consumers would have paid for a product and what they actually pay. Producer Surplus is the difference between what producers would have sold for and what they actually receive, and Deadweight Loss represents the lost surplus when market efficiency is disrupted by taxes or other interventions.',
    seoSnippet: 'Consumer surplus is the difference between what consumers are willing to pay and what they actually pay, while producer surplus is the difference between the minimum price sellers would accept and the price they receive. When taxes or other market interventions occur, deadweight loss represents the reduction in total surplus from transactions that no longer happen.',
    content: `
      <div data-audio-player="/images/audio/consumer_surplus.mp3" class="mb-6"></div>
      <p class="mb-6">You walk into a dealership. You are willing to pay <strong>$50,000</strong> for a new car, but you negotiate the dealer down to <strong>$45,000</strong>.</p>
      <p class="mb-6">You get the car <em>and</em> you keep $5,000 in your pocket.</p>
      <p class="mb-6">That $5,000 is your <strong>Consumer Surplus</strong>.</p>
      <p class="mb-6"><strong>Consumer Surplus</strong> = The difference between what you <em>would</em> pay and what you <em>actually</em> pay.</p>
      <p class="mb-6"><em>(On a graph: It's the area below Demand and above Price).</em></p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/CS%2C+PS%2C+DWL/image0.jpg" alt="Consumer Surplus graph" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">Flip the Script (Producer Surplus)</h2>
      <p class="mb-6">The dealer was secretly willing to sell that car for <strong>$40,000</strong>.</p>
      <p class="mb-6">Since they sold it to you for $45,000, they gained an extra $5,000.</p>
      <p class="mb-6">That is <strong>Producer Surplus</strong>.</p>
      <p class="mb-6"><strong>Definition: Producer Surplus</strong> = The difference between the lowest price a seller <em>would</em> accept and the price they <em>actually</em> get.</p>
      <p class="mb-6"><em>(On a graph: It's the area above Supply and below Price).</em></p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/CS%2C+PS%2C+DWL/image1.jpg" alt="Producer Surplus and tax effects graph" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">What Happens When the Government Interferes?</h2>
      <p class="mb-6">Let's add a tax.</p>
      <p class="mb-6">When the government taxes gas cars, the <strong>Supply Curve shifts left</strong>.</p>
      <p class="mb-6">Firms have higher costs, so they produce less and charge more.</p>
      <p class="mb-6">Look at the new graph. Three things happen:</p>
      <ol class="mb-6 list-decimal list-inside space-y-2">
        <li><strong>Consumer Surplus Shrinks:</strong> Buyers pay a higher price.</li>
        <li><strong>Producer Surplus Shrinks:</strong> Sellers keep less revenue.</li>
        <li><strong>Deadweight Loss Appears:</strong> See that little grey triangle?</li>
      </ol>
      <p class="mb-6"><strong>The Deadweight Loss (DWL)</strong> represents the deals that <em>didn't happen</em>.</p>
      <p class="mb-6">These are the cars that <em>would</em> have been sold if there was no tax. Because the tax made them too expensive, those buyers and sellers left the market. Their surplus vanished into thin air.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/CS%2C+PS%2C+DWL/image2.jpg" alt="Consumer Surplus, Producer Surplus, and Deadweight Loss summary" class="w-full h-auto rounded-md shadow-sm" />
      </div>
    `,
    subject: 'micro',
    visual: {
      imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/CS%2C+PS%2C+DWL/image2.jpg',
      title: 'Consumer and Producer Surplus at Market Equilibrium',
      alt: 'Supply and Demand graph showing Consumer Surplus (area above price, below demand) and Producer Surplus (area below price, above supply) at equilibrium'
    },
    keyDeterminants: [
      'Finding Consumer Surplus (CS): Area below the demand curve and above the market price (equilibrium price)',
      'Finding Producer Surplus (PS): Area above the supply curve and below the market price (equilibrium price)',
      'Total Surplus = Consumer Surplus + Producer Surplus (the total benefit to society from market transactions)',
      'How do taxes affect surplus? (Taxes reduce both Consumer and Producer Surplus, creating Deadweight Loss)'
    ],
    graphGymChallenge: {
      scenarioId: 2,
      prompt: 'Draw a standard supply and demand graph showing market equilibrium. Label the areas of consumer surplus and producer surplus.',
      link: '/graph-gym'
    },
    mcqQuestions: [
      {
        id: 1,
        question: 'Sarah is shopping for a new laptop. She is willing to pay up to $1,200 for a specific model, but finds it on sale for $950. What is Sarah\'s consumer surplus?',
        options: [
          '$1,200',
          '$950',
          '$250',
          'There is no consumer surplus because she paid less than her willingness to pay'
        ],
        correctAnswer: 2,
        explanation: 'Correct! Consumer Surplus is the difference between what Sarah was willing to pay ($1,200) and what she actually paid ($950), which equals $250. This represents the benefit she receives from the transaction.'
      },
      {
        id: 2,
        question: 'The government imposes a $2 per unit tax on coffee. Which of the following best describes what happens to total surplus in the coffee market?',
        options: [
          'Total surplus increases because the government collects tax revenue',
          'Total surplus decreases because both consumer and producer surplus are reduced, plus deadweight loss is created',
          'Total surplus stays the same because tax revenue replaces the lost surplus',
          'Total surplus only decreases if the tax is larger than $1 per unit'
        ],
        correctAnswer: 1,
        explanation: 'Correct! A tax creates deadweight loss because it prevents some mutually beneficial trades from occurring. Both consumer and producer surplus decrease, and while the government collects tax revenue, the total surplus (consumer surplus + producer surplus + tax revenue) is still less than before the tax due to the deadweight loss.'
      }
    ],
    relatedTopics: [
      { slug: 'monetary-policy-and-aggregate-demand', title: 'Monetary Policy and Aggregate Demand' }
    ]
  },
  'monetary-policy-and-aggregate-demand': {
    slug: 'monetary-policy-and-aggregate-demand',
    headline: 'Monetary Policy: Connecting the Money Market to AD-AS',
    intro: 'In AP Macroeconomics, drawing individual graphs is easy. The hard part is connecting them. The most common chain reaction you need to master is the Monetary Transmission Mechanism—how a shift in the Money Market influences Aggregate Demand.',
    seoSnippet: 'Monetary policy refers to actions taken by central banks to influence the money supply and interest rates. These policies affect aggregate demand through changes in investment and consumption spending, creating a chain reaction from money market shifts to AD-AS graph movements.',
    content: `
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">1. The Starting Point: The Recessionary Gap</h2>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image0.jpg" alt="Recessionary Gap: Economy operating below full employment" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      <p class="mb-6">Imagine the economy is sluggish. Unemployment is high, and GDP growth is low. We are in a <strong>Recessionary Gap</strong>.</p>
      <p class="mb-6">To fix this, the Central Bank (The Fed) needs to stimulate the economy using <strong>Expansionary Monetary Policy</strong>.</p>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">2. The Money Market Graph</h2>
      <p class="mb-6">The Central Bank takes action (usually buying bonds) to increase the Money Supply.</p>
      <p class="mb-6">Look what happens to the vertical axis when the Money Supply curve ($MS$) shifts to the right:</p>
      <ul class="mb-6">
        <li><strong>Money Supply:</strong> Increases (↑)</li>
        <li><strong>Nominal Interest Rate:</strong> Decreases (↓)</li>
      </ul>
      <p class="mb-6"><strong>Note:</strong> Think of the Nominal Interest Rate as the "price tag" of money. When there is more money in the vault (supply is high), the cost to borrow it goes down.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image1.jpg" alt="Money Market Graph: Money Supply and Nominal Interest Rate relationship" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">3. The Bridge: Interest-Sensitive Spending</h2>
      <p class="mb-6">This is the crucial link that most students forget to write down on FRQs. When interest rates drop, money goes "on sale."</p>
      <ul class="mb-6">
        <li><strong>Businesses</strong> borrow more money to build factories and buy machines (<strong>Investment ↑</strong>).</li>
        <li><strong>Households</strong> borrow more money to buy houses and cars (<strong>Interest-Sensitive Consumption ↑</strong>).</li>
      </ul>
      <p class="mb-6">There is an <strong>inverse relationship</strong> between Nominal Interest Rates and Investment.</p>
      <p class="mb-6">Rates Go Down → Investment Goes Up.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image2.jpg" alt="Interest-Sensitive Spending: Investment and Consumption relationship" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">4. The AD-AS Graph</h2>
      <p class="mb-6">Because Investment ($I$) and Consumption ($C$) are major components of Aggregate Demand ($AD = C + I + G + X_n$), the AD curve reacts immediately.</p>
      <p class="mb-6">When Investment increases, the Aggregate Demand curve shifts to the <strong>Right</strong>.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image4.jpg" alt="AD-AS Graph showing Aggregate Demand shifting Right" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">Conclusion</h2>
      <p class="mb-6">We are back at long-run equilibrium. By manipulating the money supply, the central bank successfully closed the output gap.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image3.jpg" alt="Monetary Policy Chain Reaction: Buy Bonds → MS ↑ → Interest Rate ↓ → Investment ↑ → AD ↑ → GDP ↑" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      <p class="mb-6">The chain reaction: <strong>Buy Bonds → MS ↑ → Interest Rate ↓ → Investment ↑ → AD ↑ → GDP ↑</strong></p>
    `,
    subject: 'macro',
    visual: {
      imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image1.jpg',
      title: 'Recessionary Gap: Economy operating below full employment',
      alt: 'AD-AS graph showing a recessionary gap where actual output is below full employment'
    },
    graphGymChallenge: {
      scenarioId: 14,
      prompt: 'Draw the Money Supply and Money Demand curves. Show the effect of an expansionary monetary policy (Open Market Purchase).',
      link: '/graph-gym'
    },
    mcqQuestions: [
      {
        id: 1,
        question: 'When the central bank buys bonds in open market operations, what happens to the money supply and interest rates?',
        options: [
          'Money supply increases, interest rates increase',
          'Money supply increases, interest rates decrease',
          'Money supply decreases, interest rates increase',
          'Money supply decreases, interest rates decrease'
        ],
        correctAnswer: 1,
        explanation: 'Correct! When the central bank buys bonds, it pays for them by crediting bank reserves. This increases the money supply. With more money available, the price of money (interest rate) decreases.'
      },
      {
        id: 2,
        question: 'Why does an increase in investment lead to a rightward shift in Aggregate Demand?',
        options: [
          'Investment is not a component of Aggregate Demand',
          'Investment (I) is a component of AD (AD = C + I + G + Xn), so when I increases, AD shifts right',
          'Investment only affects Supply, not Demand',
          'Higher investment reduces government spending, which shifts AD left'
        ],
        correctAnswer: 1,
        explanation: 'Correct! Investment is a major component of Aggregate Demand. When investment increases, total spending in the economy increases, causing the AD curve to shift to the right, increasing both Real GDP and Price Level.'
      }
    ],
    relatedTopics: [
      { slug: 'foreign-exchange-cookies', title: 'The Foreign Exchange Market' },
      { slug: 'the-economy-fixes-itself-long-run-self-adjustment', title: 'Long-Run Self-Adjustment' }
    ]
  },
  'foreign-exchange-cookies': {
    slug: 'foreign-exchange-cookies',
    headline: 'The Foreign Exchange Market: Why Money is Just Like Cookies',
    intro: 'What shifts Demand for USD? (US Interest Rates, Demand for US Goods/Assets, Foreign Income). What shifts Supply of USD? (Foreign Interest Rates, Demand for Foreign Goods/Assets, US Income). The Rule of Opposites: If Currency A Appreciates, Currency B must Depreciate. How does interest rate differential affect Forex? (Higher US rates → Increased demand for USD → USD Appreciates).',
    seoSnippet: 'The foreign exchange market is where currencies are bought and sold, functioning like any other commodity market. When demand for one currency increases, it appreciates while the other currency must depreciate, following the rule of opposites.',
    content: `
      <p class="mb-6">If more people want cookies, the price of cookies goes up. If fewer people want them, the price goes down.</p>
      <p class="mb-6">Currency is no different. It is just a commodity that is bought and sold.</p>
      <p class="mb-6">Here is the breakdown of who buys, who sells, and how a shift in one currency forces a shift in another.</p>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">1. The Basics: Why do we buy money?</h2>
      <p class="mb-6">In the Forex market, nobody wants money just for the sake of having "fancy green paper." You can't eat it.</p>
      <p class="mb-6">They don't want the paper itself; they want what the paper buys.</p>
      <p class="mb-6"><strong>The Scenario: The US needs Oil.</strong> Imagine the US wants to import millions of barrels of oil from Kuwait. Kuwaiti oil companies do not want US Dollars. They need Kuwaiti Dinar to pay their workers and taxes.</p>
      <p class="mb-6">So, for the US to get the oil, a transaction must happen in the currency market first.</p>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">2. The Chain Reaction: Two Currencies, One Trade</h2>
      <p class="mb-6">Because currency is an exchange, a change in one market automatically triggers an opposite change in the other.</p>
      <p class="mb-6">Here is exactly what happens when the US buys that oil:</p>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Graph A: The Market for Kuwaiti Dinar</h3>
      <p class="mb-6">The US buyers enter the market. They need Dinars to pay for the oil.</p>
      <ul class="mb-6">
        <li><strong>The Shift:</strong> Demand for Dinar Increases (Shifts Right →).</li>
        <li><strong>The Result:</strong> The "Price" of the Dinar goes UP.</li>
        <li><strong>The Term:</strong> The Dinar Appreciates.</li>
      </ul>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/forex/image1.jpg" alt="Graph B: The Market for US Dollars" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Graph B: The Market for US Dollars</h3>
      <p class="mb-6">Where does the US get the Dinar? They have to "sell" their own Dollars to buy it. They are effectively dumping US Dollars onto the foreign exchange market to pick up Dinar.</p>
      <ul class="mb-6">
        <li><strong>The Shift:</strong> Supply of USD Increases (Shifts Right →).</li>
        <li><strong>The Result:</strong> The "Price" of the Dollar goes DOWN.</li>
        <li><strong>The Term:</strong> The Dollar Depreciates.</li>
      </ul>
      
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/forex/image0.jpg" alt="Scenario 2: The Interest Rate Play" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">3. Scenario 2: The Interest Rate Play (US vs. Europe)</h2>
      <p class="mb-6">Now let's look at the most common FRQ scenario: Financial Capital Flows.</p>
      <p class="mb-6"><strong>The Scenario:</strong> Interest rates in the US increase. European investors see this and drool. They want to buy US Bonds to earn that higher interest rate.</p>
      <p class="mb-6">Here is the step-by-step chain reaction:</p>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Step A: The Market for US Dollars</h3>
      <p class="mb-6">Europeans need dollars to buy those US bonds.</p>
      <ul class="mb-6">
        <li><strong>The Shift:</strong> Demand for USD Increases (Shifts Right →).</li>
        <li><strong>The Result:</strong> The Dollar Appreciates.</li>
      </ul>
     
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Step B: The Market for Euros</h3>
      <p class="mb-6">This is the "Mirror Effect." To get the US Dollars, the Europeans have to give up their Euros. They flood the world market with Euros to make the trade.</p>
      <ul class="mb-6">
        <li><strong>The Shift:</strong> Supply of Euros Increases (Shifts Right →).</li>
        <li><strong>The Result:</strong> The Euro Depreciates.</li>
      </ul>

      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/forex/image2.jpg" alt="Scenario 2: The Interest Rate Play" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">4. Summary: The Rule of Opposites</h2>
      <p class="mb-6">If you can remember the "Cookie" logic, you will ace this section.</p>
      <p class="mb-6">If Currency A Appreciates (gets stronger/more expensive)... Currency B must Depreciate (get weaker/cheaper).</p>
      <p class="mb-6">Math cannot allow both currencies to get stronger at the same time. If the Dollar Cookie is worth 2 Euro Cookies today, and 3 Euro Cookies tomorrow, the Dollar got "sweeter" (Appreciated) and the Euro got "staler" (Depreciated).</p>
    `,
    subject: 'macro',
    visual: {
      imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/forex/image0.jpg',
      title: 'Foreign Exchange Market',
      alt: 'Foreign Exchange Market graph'
    },
    keyDeterminants: [
      'What shifts Demand for USD? (US Interest Rates, Demand for US Goods/Assets, Foreign Income)',
      'What shifts Supply of USD? (Foreign Interest Rates, Demand for Foreign Goods/Assets, US Income)',
      'The Rule of Opposites: If Currency A Appreciates, Currency B must Depreciate',
      'How does interest rate differential affect Forex? (Higher US rates → Increased demand for USD → USD Appreciates)'
    ],
    graphGymChallenge: {
      scenarioId: 38,
      prompt: 'Draw the market for the U.S. Dollar. Show the impact if U.S. interest rates become higher than those in Europe.',
      link: '/graph-gym'
    },
    mcqQuestions: [
      {
        id: 1,
        question: 'In a floating exchange rate system involving only the U.S. dollar and the Euro, if the Euro appreciates in value, what must necessarily happen to the U.S. dollar?',
        options: [
          'The U.S. dollar depreciates.',
          'The U.S. dollar also appreciates.',
          'The value of the U.S. dollar remains unchanged.',
          'The supply of the U.S. dollar shifts to the left.'
        ],
        correctAnswer: 0,
        explanation: 'Correct! Currencies in a floating exchange rate system function like a seesaw. If the value of one currency rises (appreciates) relative to another, the value of the other currency must fall (depreciate). It is impossible for both currencies to appreciate against one another simultaneously.'
      },
      {
        id: 2,
        question: 'Which of the following best summarizes the two primary reasons why a demand for a foreign currency exists?',
        options: [
          'To pay for domestic government spending and to reduce inflation.',
          'To purchase foreign goods/services and to purchase foreign financial assets.',
          'To increase the domestic money supply and to lower interest rates.',
          'To decrease the trade deficit and to increase tariffs.'
        ],
        correctAnswer: 1,
        explanation: 'Correct! The demand for a foreign currency is derived from the desire to buy things denominated in that currency. This primarily includes purchasing foreign products (imports) or purchasing foreign financial assets, such as government bonds or stocks in foreign companies.'
      }
    ],
    relatedTopics: [
      { slug: 'monetary-policy-and-aggregate-demand', title: 'Monetary Policy and Aggregate Demand' },
      { slug: 'the-economy-fixes-itself-long-run-self-adjustment', title: 'Long-Run Self-Adjustment' }
    ]
  },
  'monopoly-marginal-revenue': {
    slug: 'monopoly-marginal-revenue',
    headline: 'Why Marginal Revenue Falls Faster Than Demand',
    intro: 'Monopolies are the only firm in town. They can choose the price they set, but the law of demand still applies. Whatever price they choose will have an impact on the number of people willing to buy their product. This is why Marginal Revenue falls faster than Demand.',
    seoSnippet: 'For a monopolist, marginal revenue falls faster than demand because the firm must lower the price on all previous units sold to sell one additional unit. This price reduction on existing sales reduces the marginal revenue gained from the new sale.',
    content: `
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">The Setup: Different People, Different Values</h2>
      <p class="mb-6">Meet people. Different people have different values and needs, so they are willing to pay different prices for a good. One person is willing to pay <strong>$50</strong> while the other one is only willing to pay <strong>$45</strong>.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="/images/blog/B3IA.jpg" alt="Two consumers with different willingness to pay" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">The Monopoly's Dilemma</h2>
      <p class="mb-6">Monopolies are the only firm in town. They can choose the price they set, but the law of demand still applies. Whatever price they choose will have an impact on the number of people willing to buy their product.</p>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Option 1: Price at $50</h3>
      <p class="mb-6">If they sell at <strong>$50</strong>, they will make more money per product but only sell one. They make <strong>$50 in total revenue</strong>.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="/images/blog/B3IB.jpg" alt="Monopoly pricing at $50, selling one unit" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Option 2: Price at $45</h3>
      <p class="mb-6">But what if they want to sell more? This person is willing to pay $45. If they choose a price of <strong>$45</strong> they can sell to her too. If they drop the price to $45, they sell to both. Two units at $45 each is <strong>$90 in Total Revenue.</strong></p>
      <p class="mb-6"><em>But here is the catch:</em> They don't just charge the <em>new</em> person $45. They have to lower the price for the <em>first</em> person too. They lost $5 on the first guy to gain $45 from the second guy. That is why the Marginal Revenue is only <strong>$40</strong>.</p>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="/images/blog/B3IC.jpg" alt="Monopoly pricing at $45, showing marginal revenue calculation" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">The Rule</h2>
      <div class="my-8 pl-4 border-l-2 border-gray-200">
        <p class="text-lg text-gray-800 leading-relaxed">Marginal Revenue falls faster than Demand because the monopolist has to lower the price on <em>all previous units</em> just to sell one more.</p>
      </div>
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="/images/blog/B3ID.jpg" alt="Monopoly demand and marginal revenue curves" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      <p class="mb-6">This is why the MR curve is steeper than the Demand curve. Every time the monopolist wants to sell one more unit, they must:</p>
      <ul class="mb-6">
        <li>Lower the price for <strong>everyone</strong>, not just the new customer</li>
        <li>Lose revenue on all previous units sold at the higher price</li>
        <li>Only gain revenue from the one new unit at the lower price</li>
      </ul>
    `,
    subject: 'micro',
    visual: {
      imageUrl: '/images/blog/B3ID.jpg',
      title: 'Monopoly Demand and Marginal Revenue Curves',
      alt: 'Monopoly demand and marginal revenue curves showing MR falling faster than demand'
    },
    keyDeterminants: [
      'Why is MR less than Price? (Monopolist must lower price on all units to sell more)',
      'Why does MR fall faster than Demand? (Price reduction affects all previous units, not just the new one)',
      'Profit Maximization: Monopoly produces where MR = MC',
      'Allocative Inefficiency: Monopoly produces less than the socially optimal quantity (where P = MC)'
    ],
    graphGymChallenge: {
      scenarioId: 25,
      prompt: 'Draw a monopoly practicing perfect (first-degree) price discrimination. Label the profit-maximizing quantity and the area of economic profit.',
      link: '/graph-gym'
    },
    mcqQuestions: [
      {
        id: 1,
        question: 'For a monopolist marginal revenue falls faster than price because',
        options: [
          'the cost of producing extra units of output increases as production is increased.',
          'to sell additional units the price must be lowered on all units sold.',
          'marginal revenue is larger than price.',
          'profits are maximized when marginal cost equals marginal revenue.',
          'the firm has no supply curve.'
        ],
        correctAnswer: 1,
        explanation: 'Correct! For a monopolist, marginal revenue falls faster than price because to sell an additional unit, the monopolist must lower the price on all units sold, not just the new unit. This means the revenue gained from the new unit is offset by the revenue lost from lowering the price on all previous units.'
      },
      {
        id: 2,
        question: 'For a single-price monopolist, marginal revenue is less than price (MR < P) because:',
        options: [
          'The firm faces a perfectly elastic demand curve',
          'The firm must lower the price on all units sold to sell an additional unit',
          'The firm\'s marginal cost is increasing',
          'The firm is a price taker',
          'Total revenue increases as price decreases'
        ],
        correctAnswer: 1,
        explanation: 'Correct! A monopolist faces the market demand curve, which is downward sloping. To sell more output, it must lower the price for every unit it sells, not just the last one. This "price effect" on all previous units makes MR less than the price.'
      }
    ],
    relatedTopics: [
      { slug: 'consumer-producer-surplus-deadweight-loss', title: 'Consumer and Producer Surplus' }
    ]
  },
  'nominal-vs-real-gdp-explained': {
    slug: 'nominal-vs-real-gdp-explained',
    headline: 'Nominal vs Real GDP Explained',
    intro: 'Over the last 30 years, the grades of US college students have steadily increased. Does that mean college students in America are getting smarter? Not so fast. This trend, known as grade inflation, or "Gradeflation", raises an interesting economic question: How do we separate real growth from an illusion? The same way we analyze grades, we analyze the economy—by comparing Nominal vs. Real GDP.',
    seoSnippet: 'Nominal GDP measures economic output using current prices, while Real GDP measures output using constant base-year prices to isolate actual production growth from price inflation. Real GDP allows economists to determine whether an economy is truly growing or just experiencing price increases.',
    content: `
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">Part 1: The Gradeflation Trap (Nominal GPA)</h2>
      
      <p class="mb-6">Grades have been going up, but why? Let's explore two potential variables:</p>
      
      <ol class="mb-6">
        <li><strong>Student Performance:</strong> Maybe students are actually smarter, working harder, or using better study tools.</li>
        <li><strong>Grading Standards:</strong> Maybe universities and teachers have "softened" their criteria, making it easier to get an A.</li>
      </ol>
      
      <p class="mb-6">We can combine these into a simple formula. In economics, we call this the <strong>Nominal Formula</strong>.</p>
      
      <div class="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-xl font-mono text-center">$\\text{Nominal GPA} = \\text{Student Performance} \\times \\text{Grading Standard}$</p>
      </div>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">The Illusion of Progress</h3>
      
      <p class="mb-6">Imagine student performance <em>doesn't change at all</em> (gasp!).</p>
      
      <p class="mb-6">If performance is flat, what causes the GPA to rise? It must be the <strong>Grading Standard</strong>. Maybe that grammar mistake that used to cost a full point now only costs half a point. Maybe there is more extra credit.</p>
      
      <p class="mb-6">If the standard gets easier, the Nominal GPA goes up, even if the student didn't get any smarter.</p>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">Part 2: Enter Professor Sternmark (Real GPA)</h2>
      
      <p class="mb-6">Since we know average GPAs have increased, we need a way to strip out the "fluff" (easier grading) to see if students are <em>actually</em> improving.</p>
      
      <p class="mb-6">To do this, we need to hold one variable constant. We need to grade today's students using the <strong>same exact standards</strong> from 30 years ago.</p>
      
      <p class="mb-6"><strong>Let's welcome in Professor Sternmark.</strong></p>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <p class="text-center text-gray-500 italic">[Image of stern professor grading papers]</p>
      </div>
      
      <p class="mb-6">Now, our formula changes. We aren't using <em>today's</em> easy standards. We are using <em>Professor Sternmark's</em> rigid standards from 1990 (the Base Year).</p>
      
      <div class="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-xl font-mono text-center">$\\text{Real GPA} = \\text{Current Student Performance} \\times \\text{FIXED Grading Standard (Base Year)}$</p>
      </div>
      
      <p class="mb-6">Now, the essay you write today is graded against the strict 1990 rubric.</p>
      
      <ul class="mb-6">
        <li>If your GPA is <em>still</em> higher, then you actually got smarter (<strong>Real Growth</strong>).</li>
        <li>If your GPA drops back down to the 1990 average, then the increase was just an illusion caused by easy grading.</li>
      </ul>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">Part 3: Nominal vs. Real GDP</h2>
      
      <p class="mb-6">Okay, cool. But why does this matter for Economics?</p>
      
      <p class="mb-6">Because <strong>GDP (Gross Domestic Product)</strong> works exactly the same way. We use GDP to track the size of an economy, but just like grades, it can be misleading.</p>
      
      <div class="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-xl font-mono text-center">$\\text{Nominal GDP} = \\text{Output (Production)} \\times \\text{Current Prices}$</p>
      </div>
      
      <p class="mb-6">If Nominal GDP goes up, it could be because:</p>
      
      <ol class="mb-6">
        <li><strong>Output Increased:</strong> We actually produced more cars, computers, and coffee (Good!).</li>
        <li><strong>Prices Increased:</strong> We produced the exact same amount, but inflation made everything more expensive (Bad!).</li>
      </ol>
      
      <p class="mb-6">Economists don't care about higher prices; they care about <strong>actual production</strong>. To find that, we use <strong>Real GDP</strong>. Just like Professor Sternmark held the grading standard constant, Real GDP holds the <strong>Price Level</strong> constant.</p>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">The Tale of "Coffee Land" ☕️</h3>
      
      <p class="mb-6">Let's imagine a country called <strong>Coffee Land</strong> that produces nothing but cups of coffee.</p>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <p class="text-center text-gray-500 italic">[Image of coffee cup production line]</p>
      </div>
      
      <h4 class="mt-8 mb-4 text-xl font-bold text-gray-800">Year 1 (2023) - The Base Year</h4>
      
      <ul class="mb-6">
        <li><strong>Production:</strong> 100 cups</li>
        <li><strong>Price:</strong> $1.00 per cup</li>
        <li><strong>Nominal GDP:</strong> $100</li>
      </ul>
      
      <h4 class="mt-8 mb-4 text-xl font-bold text-gray-800">Year 2 (2024) - The Inflation Year</h4>
      
      <p class="mb-6">Now imagine in 2024, production stays the same, but the price doubles.</p>
      
      <ul class="mb-6">
        <li><strong>Production:</strong> 100 cups</li>
        <li><strong>Price:</strong> $2.00 per cup</li>
        <li><strong>Nominal GDP:</strong> $200</li>
      </ul>
      
      <p class="mb-6"><strong>Wow!</strong> Coffee Land's economy doubled from $100 to $200! Incredible growth, right?</p>
      
      <p class="mb-6"><strong>Wrong.</strong></p>
      
      <p class="mb-6">If we calculate <strong>Real GDP</strong> by holding the price constant at the 2023 level ($1.00):</p>
      
      <div class="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-xl font-mono text-center">$\\text{Real GDP} = 100 \\text{ cups} \\times \\$1.00 \\text{ (Base Price)} = \\$100$</p>
      </div>
      
      <p class="mb-6"><strong>The Verdict:</strong> Coffee Land's economy didn't grow at all. Real GDP stayed flat at $100. The "growth" was just an illusion caused by higher prices.</p>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Summary</h3>
      
      <p class="mb-6">We learn the difference between Nominal and Real GDP not to torture students with math, but to ensure we don't mistakenly celebrate an economy that is just getting more expensive, rather than more productive.</p>
    `,
    subject: 'macro',
    visual: {
      imageUrl: '/images/placeholder.png',
      title: 'Nominal vs Real GDP',
      alt: 'Nominal vs Real GDP comparison'
    },
    keyDeterminants: [
      'What is Nominal GDP? (Current Output × Current Prices)',
      'What is Real GDP? (Current Output × Base Year Prices)',
      'Why use Real GDP? (To measure actual production growth, not price inflation)',
      'How to calculate Real GDP? (Hold prices constant at base year levels)'
    ],
    mcqQuestions: [
      {
        id: 1,
        question: 'Which of the following best describes the difference between nominal GDP and real GDP?',
        options: [
          'Nominal GDP is adjusted for inflation, while real GDP is not.',
          'Real GDP is measured using current prices, while nominal GDP is measured using constant prices.',
          'Nominal GDP is measured using current prices, while real GDP is measured using constant prices.',
          'Real GDP will always be less than nominal GDP.'
        ],
        correctAnswer: 2,
        explanation: 'Correct! Nominal GDP uses current prices from the year being measured, while real GDP uses constant prices from a base year. This allows real GDP to isolate changes in production from changes in prices.'
      },
      {
        id: 2,
        question: 'If nominal GDP increases but real GDP remains unchanged, what must have happened?',
        options: [
          'Output increased while prices remained constant.',
          'Both output and prices increased.',
          'Output remained constant while prices increased.',
          'There was deflation in the economy.'
        ],
        correctAnswer: 2,
        explanation: 'Correct! If real GDP (which holds prices constant) remains unchanged, that means output stayed the same. Since nominal GDP (which uses current prices) increased, the increase must be entirely due to higher prices, not higher production.'
      }
    ],
    relatedTopics: [
      { slug: 'monetary-policy-and-aggregate-demand', title: 'Monetary Policy and Aggregate Demand' }
    ]
  },
  'the-economy-fixes-itself-long-run-self-adjustment': {
    slug: 'the-economy-fixes-itself-long-run-self-adjustment',
    headline: 'The Economy Fixes Itself: Long-Run Self-Adjustment',
    intro: 'Does the government always need to intervene when the economy is in trouble? No. If left alone long enough, the economy has a built-in "Auto-Pilot" that steers it back to normal. This process is called Long-Run Self-Adjustment. It might seem confusing on a graph, but it actually follows the exact same 4-step cycle every single time.',
    seoSnippet: 'Long-run self-adjustment is the economy\'s automatic mechanism that returns it to full employment without government intervention. This process occurs through wage adjustments that shift the short-run aggregate supply curve, closing output gaps over time.',
    content: `
      <p class="mb-6">Let's break down the mechanics of how an economy heals itself without the Fed or Congress lifting a finger.</p>
      
      <h2 class="mt-12 mb-4 text-3xl font-bold text-gray-800">The 4-Step Cycle of Adjustment</h2>
      
      <p class="mb-6">Whether we are facing high inflation or a deep recession, the logic is always the same: <strong>Wages react to the Output Gap.</strong></p>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 1: The Output Gap 📉</h3>
      <p class="mb-6">The economy starts in trouble.</p>
      <ul class="mb-6">
        <li><strong>Recessionary Gap:</strong> We are producing <em>less</em> than our potential. Unemployment is high.</li>
        <li><strong>Inflationary Gap:</strong> We are producing <em>more</em> than our potential. The economy is overheating.</li>
      </ul>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image0.jpg" alt="Step 2: Wages Adjust" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 2: Wages Adjust (The Pivot) 💸</h3>
      <p class="mb-6">This is the most critical step.</p>
      <ul class="mb-6">
        <li><strong>In a Recession:</strong> There are lots of unemployed workers desperate for jobs. Because labor is not scarce, <strong>Nominal Wages Fall</strong>. Workers are willing to accept less just to get hired.</li>
        <li><strong>In Inflation:</strong> Workers are scarce and in high demand. Companies have to bid up salaries to steal employees. <strong>Nominal Wages Rise</strong>.</li>
      </ul>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image1.jpg" alt="Step 3: Hiring Changes" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 3: Hiring Changes (The Shift) 🏭</h3>
      <p class="mb-6">Firms react to the price of labor.</p>
      <ul class="mb-6">
        <li><strong>Cheaper Wages (Recession):</strong> "Labor is on sale!" Firms hire more workers because costs are down.</li>
        <li><strong>Expensive Wages (Inflation):</strong> "Labor is too pricey!" Firms cut back on hiring or fire workers to save money.</li>
      </ul>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image2.jpg" alt="Step 4: The Supply Shift" class="w-full h-auto rounded-md shadow-sm" />
      </div>
      
      <h3 class="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 4: The Supply Shift ➡️</h3>
      <p class="mb-6">This change in production costs shifts the <strong>Short-Run Aggregate Supply (SRAS)</strong> curve.</p>
      <ul class="mb-6">
        <li><strong>Recession Fix:</strong> SRAS shifts <strong>RIGHT</strong> (Cost of production ↓). We return to full employment with a lower price level.</li>
        <li><strong>Inflation Fix:</strong> SRAS shifts <strong>LEFT</strong> (Cost of production ↑). We return to full employment with a higher price level.</li>
      </ul>
      
      <div class="my-8 p-4 border rounded-lg bg-gray-50">
        <img src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image3.jpg" alt="Visualizing the Shift" class="w-full h-auto rounded-md shadow-sm" />
      </div>
    `,
    subject: 'macro',
    visual: {
      imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image4.jpg',
      title: 'Long-Run Self-Adjustment',
      alt: 'AD-AS graph showing long-run self-adjustment mechanism'
    },
    keyDeterminants: [
      'What causes self-adjustment? (Wages adjust to output gaps)',
      'In a Recessionary Gap: Nominal wages fall → SRAS shifts right → Economy returns to full employment',
      'In an Inflationary Gap: Nominal wages rise → SRAS shifts left → Economy returns to full employment',
      'Why is it "Long-Run"? (Wage adjustments take time to occur)'
    ],
    graphGymChallenge: {
      scenarioId: 34,
      prompt: 'Draw an economy in an inflationary gap. Show the long-run self-adjustment mechanism without government intervention.',
      link: '/graph-gym'
    },
    mcqQuestions: [
      {
        id: 1,
        question: "The economy's long-run self-adjustment mechanism primarily relies on the flexibility of which of the following?",
        options: [
          'Government spending',
          'Nominal wages and other resource prices',
          'The money supply',
          'Consumer confidence'
        ],
        correctAnswer: 1,
        explanation: 'Correct! Long-run self-adjustment occurs because nominal wages and other input prices eventually adjust to the overall price level, causing the SRAS curve to shift and guide the economy back to its long-run potential.'
      },
      {
        id: 2,
        question: "If an economy is currently in an inflationary gap and the government takes no policy action, what will happen in the long run?",
        options: [
          'The aggregate demand curve will shift left as consumers spend less.',
          'The short-run aggregate supply curve will shift left as nominal wages rise.',
          'The long-run aggregate supply curve will shift right as potential grows.',
          'The short-run aggregate supply curve will shift right as technology improves.'
        ],
        correctAnswer: 1,
        explanation: 'Correct! In an inflationary gap, low unemployment leads to competition for workers, which drives up nominal wages. Higher wages are an increased cost of production, which shifts the SRAS curve to the left, returning the economy to long-run equilibrium at a higher price level.'
      },
      {
        id: 3,
        question: "In the self-adjustment process, how does a decrease in nominal wages affect the short run aggregate supply curve?",
        options: [
          "It causes the curve to shift to the right",
          "It causes the curve to shift to the left",
          "It causes a movement along the curve without shifting it",
          "It causes the curve to become vertical"
        ],
        correctAnswer: 0,
        explanation: 'Correct! When nominal wages fall, the cost of production decreases. This encourages firms to hire more workers, which shifts the short run aggregate supply curve (SRAS) to the right, returning the economy to long-run equilibrium.'
      }
    ],
    relatedTopics: [
      { slug: 'monetary-policy-and-aggregate-demand', title: 'Monetary Policy and Aggregate Demand' },
      { slug: 'foreign-exchange-cookies', title: 'The Foreign Exchange Market' }
    ]
  },
};

