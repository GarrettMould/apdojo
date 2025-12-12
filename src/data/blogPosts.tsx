import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { BlogComprehensionCheck } from '@/components/BlogComprehensionCheck';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  subject: string;
  unit: number;
  thumbnailUrl: string;
  keyTakeaway?: string;
  content: ReactNode;
  linkedFRQ?: number; // ID of the related FRQ question to link to
  images?: string[]; // Array of image URLs for the blog post
  practiceQuestionId?: number; // ID of a practice question from unitPracticeProblems.ts
};

export const blogPosts: Record<string, BlogPost> = {
  'monetary-policy-and-aggregate-demand': {
    slug: 'monetary-policy-and-aggregate-demand',
    title: 'Monetary Policy: Connecting the Money Market to AD-AS',
    description: 'How Central Banks use interest rates to fix a recession.',
    subject: 'Macro',
    unit: 4,
    thumbnailUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image0.jpg',
    keyTakeaway: 'Buy Bonds → MS ↑ → Interest Rate ↓ → Investment ↑ → AD ↑ → GDP ↑. The chain reaction connects money supply changes to aggregate demand through interest rates.',
    images: [],
    content: (
      <>
        <p className="mb-6">In AP Macroeconomics, drawing the individual graphs is easy. The hard part—and the part that separates a 3 from a 5—is <strong>connecting them</strong>.</p>
        <p className="mb-6">The most common chain reaction you need to master for the Exam is the <strong>Monetary Transmission Mechanism</strong>. This is the fancy term for how a shift in the Money Market influences Aggregate Demand.</p>
        <p className="mb-6">Here is the step-by-step breakdown of how a shift in the money supply changes the entire economy.</p>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">1. The Starting Point: The Recessionary Gap</h2>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image 
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image0.jpg" 
            alt="Recessionary Gap: Economy operating below full employment" 
            width={600} 
            height={400} 
            className="w-full h-auto rounded-md shadow-sm" 
          />
        </div>
        <p className="mb-6">Imagine the economy is sluggish. Unemployment is high, and GDP growth is low. We are in a <strong>Recessionary Gap</strong>.</p>
        <p className="mb-6">To fix this, the Central Bank (The Fed) needs to stimulate the economy using <strong>Expansionary Monetary Policy</strong>.</p>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">2. The Money Market Graph</h2>
        <p className="mb-6">The Central Bank takes action (usually buying bonds) to increase the Money Supply.</p>
        <p className="mb-6">Look what happens to the vertical axis when the Money Supply curve ($MS$) shifts to the right:</p>
        <ul className="mb-6">
          <li><strong>Money Supply:</strong> Increases (↑)</li>
          <li><strong>Nominal Interest Rate:</strong> Decreases (↓)</li>
        </ul>
        <p className="mb-6"><strong>Note:</strong> Think of the Nominal Interest Rate as the "price tag" of money. When there is more money in the vault (supply is high), the cost to borrow it goes down.</p>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image 
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image1.jpg" 
            alt="Money Market Graph: Money Supply and Nominal Interest Rate relationship" 
            width={600} 
            height={400} 
            className="w-full h-auto rounded-md shadow-sm" 
          />
        </div>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">3. The Bridge: Interest-Sensitive Spending</h2>
        <p className="mb-6">This is the crucial link that most students forget to write down on FRQs. When interest rates drop, money goes "on sale."</p>
        <ul className="mb-6">
          <li><strong>Businesses</strong> borrow more money to build factories and buy machines (<strong>Investment ↑</strong>).</li>
          <li><strong>Households</strong> borrow more money to buy houses and cars (<strong>Interest-Sensitive Consumption ↑</strong>).</li>
        </ul>
        <p className="mb-6">There is an <strong>inverse relationship</strong> between Nominal Interest Rates and Investment.</p>
        <p className="mb-6">Rates Go Down → Investment Goes Up.</p>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image 
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image2.jpg" 
            alt="Interest-Sensitive Spending: Investment and Consumption relationship" 
            width={600} 
            height={400} 
            className="w-full h-auto rounded-md shadow-sm" 
          />
        </div>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">4. The AD-AS Graph</h2>
        <p className="mb-6">Because Investment ($I$) and Consumption ($C$) are major components of Aggregate Demand ($AD = C + I + G + X_n$), the AD curve reacts immediately.</p>
        <p className="mb-6">When Investment increases, the Aggregate Demand curve shifts to the <strong>Right</strong>.</p>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image 
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image4.jpg" 
            alt="AD-AS Graph showing Aggregate Demand shifting Right" 
            width={600} 
            height={400} 
            className="w-full h-auto rounded-md shadow-sm" 
          />
        </div>
        <div data-active-prediction="monetary-policy-quiz" />
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Conclusion</h2>
        <p className="mb-6">We are back at long-run equilibrium. By manipulating the money supply, the central bank successfully closed the output gap.</p>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image 
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image3.jpg" 
            alt="Monetary Policy Chain Reaction: Buy Bonds → MS ↑ → Interest Rate ↓ → Investment ↑ → AD ↑ → GDP ↑" 
            width={600} 
            height={400} 
            className="w-full h-auto rounded-md shadow-sm" 
          />
        </div>
        
        <hr className="my-12"/>

        <div className="text-center bg-gray-100 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 Master the Chain Reaction</h3>
          <p className="text-gray-700 mb-6">
            Don't just read about it—draw it. If you can't graph this shift in under 2 minutes, you aren't ready for the FRQ section.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 text-lg rounded-md">
            <Link href="/unitFRQpracticePage">
              Click here to try the Unit 4 FRQ Walkthrough
            </Link>
          </Button>
          <p className="text-xs text-gray-500 mt-4"><em>Our AI-guided practice tool will check your graph instantly to see if you shifted the correct curves.</em></p>
        </div>
      </>
    ),
  },
  'foreign-exchange-cookies': {
    slug: 'foreign-exchange-cookies',
    title: 'The Foreign Exchange Market: Why Money is Just Like Cookies',
    description: 'Mastering the hardest graph in AP Macro by treating currency like a normal good.',
    subject: 'Macro',
    unit: 6,
    thumbnailUrl: '/images/placeholder.png', // Using the local placeholder for this one
    keyTakeaway: 'A change in demand for one currency causes an opposite change in the supply of the other. If one appreciates, the other must depreciate.',
    linkedFRQ: 4, // Links to Unit 6 FRQ - Foreign Exchange Market
    images: [],
    content: (
      <>
        <p className="mb-6">When students see the "Foreign Exchange Market" (Forex) on the AP Exam, they panic. They think currency is magical and follows different rules than the rest of economics.</p>
        <p className="mb-6">It doesn't. In fact, the market for US Dollars works exactly like the market for <strong>Cookies</strong>.</p>
        <p className="mb-6">If more people want cookies, the price of cookies goes up. If fewer people want them, the price goes down. Currency is no different. It is just a commodity that is bought and sold.</p>
        <p className="mb-6">Here is the breakdown of who buys, who sells, and how a shift in one currency forces a shift in another.</p>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">1. The Demand Side: The "Cookie" Buyers</h2>
        <p className="mb-6">In the Forex market, the "Buyers" (Demanders) of US Dollars are usually foreigners.</p>
        <p className="mb-6">But why do they want USD? It's just fancy green paper. You can't eat it.</p>
        <p className="mb-6">The demand for currency is <strong>Derived Demand</strong>. They don't want the paper itself; they want what the paper <em>gets</em> them.</p>
        <ul className="mb-6">
          <li><strong>US Goods:</strong> If a French person wants to buy a Tesla made in Texas, they need USD to pay for it.</li>
          <li><strong>US Assets:</strong> If a Japanese investor wants to buy stock in Apple or a US Treasury Bond, they need USD to complete the transaction.</li>
        </ul>
        <p className="mb-6"><strong>The Cookie Analogy:</strong> Imagine you are the French person. You don't want the "Dollar Cookie" just to look at it. You want it because it is the <em>only</em> token that the vending machine accepts to give you a Tesla.</p>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">2. The Supply Side: The "Cookie" Sellers</h2>
        <p className="mb-6">Where do these foreigners get the US Dollars they need? They get them from the people who already have them: <strong>US Citizens and American Banks.</strong></p>
        <p className="mb-6">This is the <strong>Supply</strong> curve.</p>
        <p className="mb-6">Americans supply (sell) dollars when they want to buy something foreign. If I want to vacation in Paris or buy Japanese anime merchandise, I have to take my USD and "sell" it to the exchange bank to get Euros or Yen.</p>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">3. The Chain Reaction: Two Currencies, One Transaction</h2>
        <p className="mb-6">This is the part that shows up on the FRQ. You can't just shift one graph. Because currency is an <em>exchange</em>, a change in one market automatically triggers a change in the other.</p>
        <p className="mb-6"><strong>The Scenario:</strong> Interest rates in the US increase. European investors now want to buy US Bonds to earn that higher interest rate.</p>
        <p className="mb-6">Here is the step-by-step chain reaction:</p>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step A: The Market for US Dollars</h3>
        <p className="mb-6">Europeans need dollars to buy those bonds.</p>
        <ul className="mb-6">
          <li><strong>Demand for USD:</strong> Increases (Shifts Right →)</li>
          <li><strong>The Result:</strong> The "Price" of the Dollar (Exchange Rate) goes <strong>UP</strong>.</li>
        </ul>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image src="/images/placeholder.png" alt="Graph of Market for USD with Demand Shifting Right" width={600} height={400} className="w-full h-auto rounded-md shadow-sm" />
        </div>
        <p className="mb-6"><strong>The Cookie Analogy:</strong> Suddenly, everyone wants the Dollar Cookie. Since supply stayed the same but the line out the door got longer, the price of the cookie skyrockets. The Dollar <strong>Appreciates</strong>.</p>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step B: The Market for Euros</h3>
        <p className="mb-6">This is the "Mirror Effect." To <em>get</em> the US Dollars, the Europeans have to <em>give up</em> their Euros. They are flooding the world market with Euros to make the trade.</p>
        <ul className="mb-6">
          <li><strong>Supply of Euros:</strong> Increases (Shifts Right →)</li>
          <li><strong>The Result:</strong> The "Price" of the Euro (Exchange Rate) goes <strong>DOWN</strong>.</li>
        </ul>
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image src="/images/placeholder.png" alt="Graph of Market for Euros with Supply Shifting Right" width={600} height={400} className="w-full h-auto rounded-md shadow-sm" />
        </div>
        <p className="mb-6"><strong>The Cookie Analogy:</strong> The Europeans are dumping their "Euro Cookies" into the trash can to get their hands on Dollar Cookies. Because there is a massive pile of Euro Cookies that nobody wants, their value crashes. The Euro <strong>Depreciates</strong>.</p>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">4. Summary: The Rule of Opposites</h2>
        <p className="mb-6">If you can remember the "Cookie" logic, you will ace this section.</p>
        <ul className="mb-6">
          <li>If Currency A <strong>Appreciates</strong> (gets stronger/more expensive)...</li>
          <li>Currency B <em>must</em> <strong>Depreciate</strong> (get weaker/cheaper).</li>
        </ul>
        <p className="mb-6">Math cannot allow both currencies to get stronger at the same time. If the Dollar Cookie is worth 2 Euro Cookies today, and 3 Euro Cookies tomorrow, the Dollar got "sweeter" (Appreciated) and the Euro got "staler" (Depreciated).</p>
        
        <hr className="my-12"/>

        <div className="text-center bg-gray-100 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🍪 Don't Let the Forex Graphs Crumble You</h3>
          <p className="text-gray-700 mb-6">
            The AP Exam loves to ask you to draw <em>both</em> of these graphs side-by-side. Can you show the Demand shift on one and the Supply shift on the other?
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 text-lg rounded-md">
            <Link href="/unitFRQpracticePage?frqId=4">
              Click here to try the Unit 6 FRQ Walkthrough
            </Link>
          </Button>
          <p className="text-xs text-gray-500 mt-4"><em>Our AI-guided practice tool will let you draw the Forex shifts and tell you instantly if you got the right outcome.</em></p>
        </div>
      </>
    ),
  },
  'monopoly-marginal-revenue': {
    slug: 'monopoly-marginal-revenue',
    title: 'Why Marginal Revenue Falls Faster Than Demand',
    description: 'Understanding why monopolists must lower prices on all previous units to sell one more—and why that makes MR fall faster than demand.',
    subject: 'Micro',
    unit: 4,
    thumbnailUrl: '/images/blog/B3ID.jpg',
    keyTakeaway: 'Marginal Revenue falls faster than Demand because the monopolist has to lower the price on all previous units just to sell one more.',
    images: [
      '/images/blog/B3IA.jpg',
      '/images/blog/B3IB.jpg',
      '/images/blog/B3IC.jpg',
      '/images/blog/B3ID.jpg'
    ],
    practiceQuestionId: 150,
    content: (
      <>
        <h2 className="mt-12 mb-4 text-4xl font-bold text-gray-800">The Setup: Different People, Different Values</h2>
        <p className="mb-6 text-lg leading-relaxed">Meet people. Different people have different values and needs, so they are willing to pay different prices for a good. One person is willing to pay <strong>$50</strong> while the other one is only willing to pay <strong>$45</strong>.</p>
        
        <p>[IMAGE:0]</p>
        
        <h2 className="mt-12 mb-4 text-4xl font-bold text-gray-800">The Monopoly's Dilemma</h2>
        <p className="mb-6 text-lg leading-relaxed">Monopolies are the only firm in town. They can choose the price they set, but the law of demand still applies. Whatever price they choose will have an impact on the number of people willing to buy their product.</p>
        
        <h3 className="mt-10 mb-4 text-3xl font-bold text-gray-800">Option 1: Price at $50</h3>
        <p className="mb-6 text-lg leading-relaxed">If they sell at <strong>$50</strong>, they will make more money per product but only sell one. They make <strong>$50 in total revenue</strong>.</p>
        
        <p>[IMAGE:1]</p>
        
        <h3 className="mt-10 mb-4 text-3xl font-bold text-gray-800">Option 2: Price at $45</h3>
        <p className="mb-6 text-lg leading-relaxed">But what if they want to sell more? This person is willing to pay $45. If they choose a price of <strong>$45</strong> they can sell to her too. If they drop the price to $45, they sell to both. Two units at $45 each is <strong>$90 in Total Revenue.</strong></p>
        
        <p className="mb-6 text-lg leading-relaxed"><em>But here is the catch:</em> They don't just charge the <em>new</em> person $45. They have to lower the price for the <em>first</em> person too. They lost $5 on the first guy to gain $45 from the second guy. That is why the Marginal Revenue is only <strong>$40</strong>.</p>
        
        <p>[IMAGE:2]</p>
        
        <h2 className="mt-12 mb-4 text-4xl font-bold text-gray-800">The Rule</h2>
        <div className="my-8 pl-4 border-l-2 border-gray-200">
          <p className="text-lg text-gray-800 leading-relaxed">Marginal Revenue falls faster than Demand because the monopolist has to lower the price on <em>all previous units</em> just to sell one more.</p>
        </div>
        
        <p>[IMAGE:3]</p>
        
        <p className="mb-6 text-lg leading-relaxed">This is why the MR curve is steeper than the Demand curve. Every time the monopolist wants to sell one more unit, they must:</p>
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>Lower the price for <strong>everyone</strong>, not just the new customer</li>
          <li>Lose revenue on all previous units sold at the higher price</li>
          <li>Only gain revenue from the one new unit at the lower price</li>
        </ul>
        
        
        <hr className="my-12"/>

        {(() => {
          const practiceQuestion = allQuestions.find(q => q.id === 150);
          if (!practiceQuestion) return null;
          
          return (
            <BlogComprehensionCheck question={practiceQuestion} />
          );
        })()}
      </>
    ),
  },
};

