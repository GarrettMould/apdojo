import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import DraggableGraph from '@/components/DraggableGraph';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  subject: string;
  unit: number;
  thumbnailUrl: string;
  keyTakeaway?: string;
  seoSnippet?: string; // 2-sentence definition for Google snippets (SEO)
  content: ReactNode;
  linkedFRQ?: number; // ID of the related FRQ question to link to
  images?: string[]; // Array of image URLs for the blog post
  practiceQuestionId?: number; // ID of a practice question from unitPracticeProblems.ts
  practiceQuestionIds?: number[]; // IDs of MCQs for BlogComprehensionCheck (rendered at bottom)
  graphGymScenarioId?: number; // Graph Gym scenario ID to embed on the post page
  graphGymPrompt?: string; // Prompt shown on EmbeddedGraphGym header
  videoUrl?: string | null; // URL to a video file (e.g., from dojoDrills folder)
  audioUrl?: string | null; // URL to an audio file (e.g., from public/images/audio)
};

export const blogPosts: Record<string, BlogPost> = {
  'monetary-policy-and-aggregate-demand': {
    slug: 'monetary-policy-and-aggregate-demand',
    title: 'Monetary Policy: Connecting the Money Market to AD-AS',
    description: 'How Central Banks use interest rates to fix a recession.',
    subject: 'Macro',
    unit: 4,
    thumbnailUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/image0.jpg',
    seoSnippet: 'Monetary policy refers to actions taken by central banks to influence the money supply and interest rates. These policies affect aggregate demand through changes in investment and consumption spending, creating a chain reaction from money market shifts to AD-AS graph movements.',
    keyTakeaway: 'Buy Bonds → MS ↑ → Interest Rate ↓ → Investment ↑ → AD ↑ → GDP ↑. The chain reaction connects money supply changes to aggregate demand through interest rates.',
    images: [],
    videoUrl: null,
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
    seoSnippet: 'The foreign exchange market is where currencies are bought and sold, functioning like any other commodity market. When demand for one currency increases, it appreciates while the other currency must depreciate, following the rule of opposites.',
    keyTakeaway: 'A change in demand for one currency causes an opposite change in the supply of the other. If one appreciates, the other must depreciate.',
    linkedFRQ: 4, // Links to Unit 6 FRQ - Foreign Exchange Market
    images: [],
    videoUrl: null,
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
  'understanding-externalities': {
    slug: 'understanding-externalities',
    title: 'Understanding Externalities',
    description: 'Why markets with external costs or benefits misallocate resources—and how per-unit taxes can fix them.',
    subject: 'Micro',
    unit: 6,
    thumbnailUrl:
      'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/externalities/wb_1.jpg',
    seoSnippet:
      'An externality occurs when a cost or benefit of a transaction spills over onto third parties who were not directly involved. Negative externalities like pollution cause overproduction, but a properly set per-unit tax can align private and social costs and eliminate deadweight loss.',
    graphGymScenarioId: 8,
    graphGymPrompt:
      'Draw a market with a negative production externality (like pollution). Label MPC, MSC, Qm, Qs, and shade the deadweight loss area. Show how a per-unit tax equal to the marginal external cost can restore the social optimum.',
    practiceQuestionIds: [124, 125, 126],
    content: (
      <>
        <p className="mb-6">
          In Unit 2, we learned that when the government intervenes in a perfectly competitive market through taxes or
          price controls, they usually create Deadweight Loss (DWL). They are essentially the villain of market
          efficiency.
        </p>
        <p className="mb-6">
          However, Unit 6 flips the script. Here, the government steps in as the hero to fix markets that have already
          failed on their own. This is the world of <strong>Externalities</strong>.
        </p>

        <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-800">What is an Externality?</h2>
        <p className="mb-6">
          An externality occurs when a cost or benefit impacts a third party who was not involved in the transaction.
        </p>
        <p className="mb-6">
          Imagine a factory producing chemicals. To make those chemicals, the factory pays for electricity, raw
          materials, and labor. These are <strong>Marginal Private Costs (MPC)</strong>. But suppose the factory also
          dumps waste into a nearby stream.
        </p>
        <p className="mb-6">
          <strong>The impact:</strong> Fishermen catch fewer fish, swimmers get sick, and the local ecosystem collapses.
        </p>
        <p className="mb-6">
          <strong>The result:</strong> These people are bearing a cost for a product they didn&apos;t buy or produce.
          This is a <strong>Marginal External Cost (MEC)</strong>.
        </p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/externalities/wb_1.jpg"
            alt="Externality graph showing pollution impact on third parties"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-800">The Math of Market Failure</h2>
        <p className="mb-6">
          When we add the factory&apos;s private costs to the external costs borne by the community, we get the{' '}
          <strong>Marginal Social Cost (MSC)</strong>.
        </p>
        <p className="mb-4 text-center font-mono text-lg">
          MSC = MPC + MEC
        </p>
        <p className="mb-6">
          In a free market, the factory only cares about its own bank account (<span className="font-mono">MPC</span>).
          Because they ignore the <span className="font-mono">MEC</span>, they produce at a quantity where{' '}
          <span className="font-mono">MPC</span> intersects Demand (which represents <span className="font-mono">MSB</span>,
          Marginal Social Benefit). This results in <strong>overproduction</strong>.
        </p>
        <p className="mb-6">
          Society wants <span className="font-mono">Q<sub>s</sub></span> (where{' '}
          <span className="font-mono">MSC = MSB</span>), but the market gives us{' '}
          <span className="font-mono">Q<sub>m</sub></span>.
        </p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/externalities/wb_2.jpg"
            alt="Negative externality graph highlighting deadweight loss"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-800">How to Fix It: The Tax Debate</h2>
        <p className="mb-6">
          To fix this <strong>over-allocation</strong> of resources, the government must discourage production. They
          have two main types of taxes in their toolkit, but only one actually works for this problem.
        </p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/externalities/wb_3.jpg"
            alt="Per-unit corrective tax aligning private and social cost"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>
        <h3 className="mt-8 mb-3 text-2xl font-bold text-gray-800">1. The Per-Unit Tax (The Corrective Tool)</h3>
        <p className="mb-6">
          A <strong>Per-Unit Tax</strong> is a tax charged on every single item produced (for example,{' '}
          <span className="font-mono">$5</span> per gallon of chemical waste).
        </p>
        <p className="mb-6">
          <strong>Why it works:</strong> Because the tax is tied to production levels, it increases the Marginal Cost
          for the firm.
        </p>
        <p className="mb-6">
          <strong>The graph:</strong> This shifts the <span className="font-mono">MPC</span> curve upward. If the tax
          is set exactly equal to the <span className="font-mono">MEC</span>, the new{' '}
          <span className="font-mono">MPC</span> will sit right on top of the <span className="font-mono">MSC</span>{' '}
          curve.
        </p>
        <p className="mb-6">
          <strong>The outcome:</strong> The firm&apos;s profit-maximizing point (
          <span className="font-mono">MR = MC</span>) shifts left. They produce less, the price rises, and the
          Deadweight Loss is eliminated.
        </p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/externalities/wb_4.jpg"
            alt="Lump-sum tax that fails to change output"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h3 className="mt-8 mb-3 text-2xl font-bold text-gray-800">2. The Lump-Sum Tax (The Ineffective Tool)</h3>
        <p className="mb-6">
          A <strong>Lump-Sum Tax</strong> is a one-time, fixed fee (for example, a{' '}
          <span className="font-mono">$10{','}000</span> annual &quot;pollution permit&quot;).
        </p>
        <p className="mb-6">
          <strong>Why it fails:</strong> In microeconomics, we know that Fixed Costs do not affect Marginal Cost (
          <span className="font-mono">MC</span>).
        </p>
        <p className="mb-6">
          <strong>The logic:</strong> Since <span className="font-mono">MC</span> doesn&apos;t change, the firm&apos;s
          decision on how much to produce (<span className="font-mono">MR = MC</span>) doesn&apos;t change either.
        </p>
        <p className="mb-6">
          <strong>The outcome:</strong> The firm writes a check to the government, but they keep dumping the exact same
          amount of chemicals into the stream. The market failure remains.
        </p>

        <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-800">The Dojo Summary</h2>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>Per-Unit Taxes</strong> change Marginal Cost, change Quantity, and fix Externalities.
          </li>
          <li>
            <strong>Lump-Sum Taxes</strong> change Fixed Cost, change Profit, but do{' '}
            <strong>not</strong> change Quantity or fix the market failure.
          </li>
        </ul>
        <p className="mb-6">
          Analogy: A Per-Unit Tax is like a &quot;pay-as-you-pollute&quot; meter—it changes your behavior every minute.
          A Lump-Sum Tax is like a parking ticket you&apos;ve already decided to pay; it&apos;s annoying, but it won&apos;t
          change how you drive today.
        </p>
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
    seoSnippet: 'For a monopolist, marginal revenue falls faster than demand because the firm must lower the price on all previous units sold to sell one additional unit. This price reduction on existing sales reduces the marginal revenue gained from the new sale.',
    keyTakeaway: 'Marginal Revenue falls faster than Demand because the monopolist has to lower the price on all previous units just to sell one more.',
    images: [
      '/images/blog/B3IA.jpg',
      '/images/blog/B3IB.jpg',
      '/images/blog/B3IC.jpg',
      '/images/blog/B3ID.jpg'
    ],
    practiceQuestionId: 1150,
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_4.2.mp4',
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
          const practiceQuestion = allQuestions.find(q => q.id === 1150);
          if (!practiceQuestion) return null;
          
          // BlogComprehensionCheck is a client component and cannot be used in server-side data files
          // This will be rendered client-side in the blog post page
          return (
            <div data-comprehension-check data-question-id={practiceQuestion.id} />
          );
        })()}
      </>
    ),
  },
  'nominal-vs-real-gdp-explained': {
    slug: 'nominal-vs-real-gdp-explained',
    title: 'Nominal vs Real GDP Explained',
    description: 'Understanding the difference between real growth and inflation using the gradeflation analogy.',
    subject: 'Macro',
    unit: 2,
    thumbnailUrl: '/images/placeholder.png',
    seoSnippet: 'Nominal GDP measures economic output using current prices, while Real GDP measures output using constant base-year prices to isolate actual production growth from price inflation. Real GDP allows economists to determine whether an economy is truly growing or just experiencing price increases.',
    keyTakeaway: 'Nominal GDP includes price changes, while Real GDP holds prices constant to measure actual production growth. Just like GPA can rise from easier grading (nominal) vs. actual improvement (real).',
    images: [],
    practiceQuestionId: 17,
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_2.6.mp4',
    content: (
      <>
        <h1 className="mt-12 mb-6 text-4xl font-bold text-gray-900">Gradeflation & GDP: Why Your "A" Might Be Worth Less Than You Think</h1>
        
        <p className="mb-6 text-lg leading-relaxed">Over the last 30 years, the grades of US college students have steadily increased. Does that mean college students in America are getting smarter?</p>
        
        <p className="mb-6 text-lg leading-relaxed"><strong>Not so fast.</strong></p>
        
        <p className="mb-6 text-lg leading-relaxed">This trend, known as grade inflation, or "Gradeflation", raises an interesting economic question: <strong>How do we separate real growth from an illusion?</strong> The same way we analyze grades, we analyze the economy—by comparing <strong>Nominal vs. Real GDP</strong>. Let's break it down.</p>
        
        <hr className="my-12"/>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Part 1: The Gradeflation Trap (Nominal GPA)</h2>
        
        <p className="mb-6 text-lg leading-relaxed">Grades have been going up, but why? Let's explore two potential variables:</p>
        
        <ol className="mb-6 list-decimal list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Student Performance:</strong> Maybe students are actually smarter, working harder, or using better study tools.</li>
          <li><strong>Grading Standards:</strong> Maybe universities and teachers have "softened" their criteria, making it easier to get an A.</li>
        </ol>
        
        <p className="mb-6 text-lg leading-relaxed">We can combine these into a simple formula. In economics, we call this the <strong>Nominal Formula</strong>.</p>
        
        <div className="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-xl font-mono text-center">{`$$\\text{Nominal GPA} = \\text{Student Performance} \\times \\text{Grading Standard}$$`}</p>
        </div>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">The Illusion of Progress</h3>
        
        <p className="mb-6 text-lg leading-relaxed">Imagine student performance <em>doesn't change at all</em> (gasp!).</p>
        
        <p className="mb-6 text-lg leading-relaxed">If performance is flat, what causes the GPA to rise? It must be the <strong>Grading Standard</strong>. Maybe that grammar mistake that used to cost a full point now only costs half a point. Maybe there is more extra credit.</p>
        
        <p className="mb-6 text-lg leading-relaxed">If the standard gets easier, the Nominal GPA goes up, even if the student didn't get any smarter.</p>
        
        <hr className="my-12"/>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Part 2: Enter Professor Sternmark (Real GPA)</h2>
        
        <p className="mb-6 text-lg leading-relaxed">Since we know average GPAs have increased, we need a way to strip out the "fluff" (easier grading) to see if students are <em>actually</em> improving.</p>
        
        <p className="mb-6 text-lg leading-relaxed">To do this, we need to hold one variable constant. We need to grade today's students using the <strong>same exact standards</strong> from 30 years ago.</p>
        
        <p className="mb-6 text-lg leading-relaxed"><strong>Let's welcome in Professor Sternmark.</strong></p>
        
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <p className="text-center text-gray-500 italic">[Image of stern professor grading papers]</p>
        </div>
        
        <p className="mb-6 text-lg leading-relaxed">Now, our formula changes. We aren't using <em>today's</em> easy standards. We are using <em>Professor Sternmark's</em> rigid standards from 1990 (the Base Year).</p>
        
        <div className="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-xl font-mono text-center">{`$$\\text{Real GPA} = \\text{Current Student Performance} \\times \\text{FIXED Grading Standard (Base Year)}$$`}</p>
        </div>
        
        <p className="mb-6 text-lg leading-relaxed">Now, the essay you write today is graded against the strict 1990 rubric.</p>
        
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li>If your GPA is <em>still</em> higher, then you actually got smarter (<strong>Real Growth</strong>).</li>
          <li>If your GPA drops back down to the 1990 average, then the increase was just an illusion caused by easy grading.</li>
        </ul>
        
        <hr className="my-12"/>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Part 3: Nominal vs. Real GDP</h2>
        
        <p className="mb-6 text-lg leading-relaxed">Okay, cool. But why does this matter for Economics?</p>
        
        <p className="mb-6 text-lg leading-relaxed">Because <strong>GDP (Gross Domestic Product)</strong> works exactly the same way. We use GDP to track the size of an economy, but just like grades, it can be misleading.</p>
        
        <div className="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-xl font-mono text-center">{`$$\\text{Nominal GDP} = \\text{Output (Production)} \\times \\text{Current Prices}$$`}</p>
        </div>
        
        <p className="mb-6 text-lg leading-relaxed">If Nominal GDP goes up, it could be because:</p>
        
        <ol className="mb-6 list-decimal list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Output Increased:</strong> We actually produced more cars, computers, and coffee (Good!).</li>
          <li><strong>Prices Increased:</strong> We produced the exact same amount, but inflation made everything more expensive (Bad!).</li>
        </ol>
        
        <p className="mb-6 text-lg leading-relaxed">Economists don't care about higher prices; they care about <strong>actual production</strong>. To find that, we use <strong>Real GDP</strong>. Just like Professor Sternmark held the grading standard constant, Real GDP holds the <strong>Price Level</strong> constant.</p>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">The Tale of "Coffee Land" ☕️</h3>
        
        <p className="mb-6 text-lg leading-relaxed">Let's imagine a country called <strong>Coffee Land</strong> that produces nothing but cups of coffee.</p>
        
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <p className="text-center text-gray-500 italic">[Image of coffee cup production line]</p>
        </div>
        
        <h4 className="mt-8 mb-4 text-xl font-bold text-gray-800">Year 1 (2023) - The Base Year</h4>
        
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Production:</strong> 100 cups</li>
          <li><strong>Price:</strong> $1.00 per cup</li>
          <li><strong>Nominal GDP:</strong> $100</li>
        </ul>
        
        <h4 className="mt-8 mb-4 text-xl font-bold text-gray-800">Year 2 (2024) - The Inflation Year</h4>
        
        <p className="mb-6 text-lg leading-relaxed">Now imagine in 2024, production stays the same, but the price doubles.</p>
        
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Production:</strong> 100 cups</li>
          <li><strong>Price:</strong> $2.00 per cup</li>
          <li><strong>Nominal GDP:</strong> $200</li>
        </ul>
        
        <p className="mb-6 text-lg leading-relaxed"><strong>Wow!</strong> Coffee Land's economy doubled from $100 to $200! incredible growth, right?</p>
        
        <p className="mb-6 text-lg leading-relaxed"><strong>Wrong.</strong></p>
        
        <p className="mb-6 text-lg leading-relaxed">If we calculate <strong>Real GDP</strong> by holding the price constant at the 2023 level ($1.00):</p>
        
        <div className="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-xl font-mono text-center">{`$$\\text{Real GDP} = 100 \\text{ cups} \\times \\$1.00 \\text{ (Base Price)} = \\$100$$`}</p>
        </div>
        
        <p className="mb-6 text-lg leading-relaxed"><strong>The Verdict:</strong> Coffee Land's economy didn't grow at all. Real GDP stayed flat at $100. The "growth" was just an illusion caused by higher prices.</p>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Summary</h3>
        
        <p className="mb-6 text-lg leading-relaxed">We learn the difference between Nominal and Real GDP not to torture students with math, but to ensure we don't mistakenly celebrate an economy that is just getting more expensive, rather than more productive.</p>
        
        <hr className="my-12"/>

        {(() => {
          const practiceQuestion = allQuestions.find(q => q.id === 17);
          if (!practiceQuestion) return null;
          
          // BlogComprehensionCheck is a client component and cannot be used in server-side data files
          // This will be rendered client-side in the blog post page
          return (
            <div data-comprehension-check data-question-id={practiceQuestion.id} />
          );
        })()}
      </>
    ),
  },
  'the-economy-fixes-itself-long-run-self-adjustment': {
    slug: 'the-economy-fixes-itself-long-run-self-adjustment',
    title: 'The Economy Fixes Itself: Long-Run Self-Adjustment',
    description: 'Understanding how the economy automatically returns to full employment through wage adjustments—without government intervention.',
    subject: 'Macro',
    unit: 3,
    thumbnailUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image4.jpg',
    seoSnippet: 'Long-run self-adjustment is the economy\'s automatic mechanism that returns it to full employment without government intervention. This process occurs through wage adjustments that shift the short-run aggregate supply curve, closing output gaps over time.',
    keyTakeaway: 'The economy self-adjusts through a 4-step cycle: Output Gap → Wages Adjust → Hiring Changes → Supply Shift. Wages react to the output gap, causing SRAS to shift back to full employment.',
    images: [],
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_3.7.mp4',
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed">Does the government <em>always</em> need to intervene when the economy is in trouble?</p>
        
        <p className="mb-6 text-lg leading-relaxed"><strong>No.</strong></p>
        
        <p className="mb-6 text-lg leading-relaxed">If left alone long enough, the economy has a built-in "Auto-Pilot" that steers it back to normal. This process is called <strong>Long-Run Self-Adjustment</strong>. It might seem confusing on a graph, but it actually follows the exact same 4-step cycle every single time.</p>
        
        <p className="mb-6 text-lg leading-relaxed">Let's break down the mechanics of how an economy heals itself without the Fed or Congress lifting a finger.</p>
        
        <hr className="my-12"/>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The 4-Step Cycle of Adjustment</h2>
        
        <p className="mb-6 text-lg leading-relaxed">Whether we are facing high inflation or a deep recession, the logic is always the same: <strong>Wages react to the Output Gap.</strong></p>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 1: The Output Gap 📉</h3>
        <p className="mb-6 text-lg leading-relaxed">The economy starts in trouble.</p>
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Recessionary Gap:</strong> We are producing <em>less</em> than our potential. Unemployment is high.</li>
          <li><strong>Inflationary Gap:</strong> We are producing <em>more</em> than our potential. The economy is overheating.</li>
        </ul>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 2: Wages Adjust (The Pivot) 💸</h3>
        <p className="mb-6 text-lg leading-relaxed">This is the most critical step.</p>
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>In a Recession:</strong> There are lots of unemployed workers desperate for jobs. Because labor is not scarce, <strong>Nominal Wages Fall</strong>. Workers are willing to accept less just to get hired.</li>
          <li><strong>In Inflation:</strong> Workers are scarce and in high demand. Companies have to bid up salaries to steal employees. <strong>Nominal Wages Rise</strong>.</li>
        </ul>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 3: Hiring Changes (The Shift) 🏭</h3>
        <p className="mb-6 text-lg leading-relaxed">Firms react to the price of labor.</p>
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Cheaper Wages (Recession):</strong> "Labor is on sale!" Firms hire more workers because costs are down.</li>
          <li><strong>Expensive Wages (Inflation):</strong> "Labor is too pricey!" Firms cut back on hiring or fire workers to save money.</li>
        </ul>
        
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step 4: The Supply Shift ➡️</h3>
        <p className="mb-6 text-lg leading-relaxed">This change in production costs shifts the <strong>Short-Run Aggregate Supply (SRAS)</strong> curve.</p>
        <ul className="mb-6 list-disc list-inside space-y-2 text-lg leading-relaxed">
          <li><strong>Recession Fix:</strong> SRAS shifts <strong>RIGHT</strong> (Cost of production ↓). We return to full employment with a lower price level.</li>
          <li><strong>Inflation Fix:</strong> SRAS shifts <strong>LEFT</strong> (Cost of production ↑). We return to full employment with a higher price level.</li>
        </ul>
        
        <hr className="my-12"/>
        
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Visualizing the Shift</h2>
        
        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <p className="text-center text-gray-500 italic">[ Embed Video: Long Run Adjustment Explainer ]</p>
          <p className="text-center text-sm text-gray-400 mt-2">(Your 60-second screen recording goes here)</p>
        </div>
        
        <hr className="my-12"/>
        
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-blue-100 text-center my-8">
          <DraggableGraph />
        </div>
      </>
    ),
  },
  'ppc-and-opportunity-cost': {
    slug: 'ppc-and-opportunity-cost',
    title: 'The Production Possibilities Curve (PPC)',
    description: 'The Production Possibilities Curve (PPC) shows the maximum combinations of two goods an economy can produce and illustrates scarcity, trade-offs, and opportunity cost.',
    subject: 'Macro',
    unit: 1,
    thumbnailUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/PPC/image0.jpg',
    seoSnippet:
      'The Production Possibilities Curve (PPC) is a graphical model that shows the maximum combinations of two goods an economy can produce when all resources are fully employed. It illustrates the core economic concepts of scarcity, trade-offs, and opportunity cost.',
    keyTakeaway:
      'On the curve = productive efficiency; inside = underutilization; outside = unattainable. A bowed-out PPC reflects increasing opportunity cost as resources become less adaptable.',
    graphGymScenarioId: 19,
    graphGymPrompt: 'Draw a PPC for two goods. Show how an increase in the quality of resources shifts the curve outward to represent economic growth.',
    practiceQuestionIds: [3, 4],
    images: [],
    videoUrl: null,
    audioUrl: '/images/audio/PPC.mp3',
    content: (
      <>
        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The “Model of Choice”</h2>
        <p className="mb-6">
          Imagine you are the ruler of a small country. You have a fixed number of workers, factories, and land. You
          can’t snap your fingers and have infinite skyscrapers <em>and</em> infinite pizza—you have to choose.
        </p>
        <p className="mb-6">
          That’s what the <strong>Production Possibilities Curve</strong> (also called the frontier) illustrates: the
          maximum possible output of two goods an economy can achieve when resources are fully employed.
        </p>
        <p className="mb-6">
          In this example, our economy produces just two things: <strong>Robots</strong> and <strong>Corn</strong>.
        </p>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>Point A:</strong> We go all-in on technology. 10 Robots, 0 Corn.
          </li>
          <li>
            <strong>Point E:</strong> We go all-in on agriculture. 12 units of Corn, 0 Robots.
          </li>
          <li>
            <strong>The Curve:</strong> The line connecting them represents every possible combination in between.
          </li>
        </ul>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/PPC/image0.jpg"
            alt="Production Possibilities Curve example (Robots vs Corn)"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <hr className="my-12" />

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The 3 Zones of the PPC</h2>
        <p className="mb-6">
          Where your country sits on (or off) this graph tells you everything about the health of your economy.
        </p>


        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">1. On the Curve: Productive Efficiency</h3>
        <p className="mb-6">
          Any point that sits directly <strong>on the solid line</strong> represents <strong>Productive Efficiency</strong>.
        </p>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>What it means:</strong> You are squeezing every ounce of productivity out of your resources. There is no waste.
          </li>
          <li>
            <strong>The Catch:</strong> To get more of one thing, you <em>must</em> give up something else. You can't get more corn without giving up some robots.
          </li>
        </ul>

        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">2. Inside the Curve: Inefficiency (Recession)</h3>
        <p className="mb-6">
          Any point <strong>inside the shaded area</strong> represents <strong>Underutilization</strong>.
        </p>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>What it means:</strong> You have idle factories. You have workers sitting at home.
          </li>
          <li>
            <strong>The Reality:</strong> In Macroeconomics, this gap between where you <em>are</em> and the curve is often a recession. You <em>could</em> produce more if more people were working, but instead there is unemployment and a gap between what you <em>could</em> produce and what your actual output.
          </li>
        </ul>

        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">3. Outside the Curve: Unattainable</h3>
        <p className="mb-6">
          Any point <strong>beyond the line</strong> is currently i<strong>mpossible</strong>.
        </p>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>What it means:</strong> You simply don't have the technology or resources to reach this level of production yet.
          </li>
          <li>
            <strong>The Goal:</strong> The only way to get here is through economic growth, shifting the entire curve outward. (More on this below!)
          </li>
        </ul>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/PPC/image4.jpg"
            alt="PPC zones: on the curve, inside the curve, and outside the curve"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <hr className="my-12" />

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Why is the Line Curved? Opportunity Cost.</h2>
        <p className="mb-6">
          You will notice the graph isn't usually a straight line—it's <strong>bowed out</strong> (concave). This shape tells a story about your workers.
        </p>
        <p className="mb-6">
          <strong>The Law of Increasing Opportunity Cost</strong> states that as you produce more of one good, the
          opportunity cost (what you give up) gets higher and higher.
        </p>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>Phase 1:</strong> To grow the first few tons of corn, you move farmers who were bad at building robots anyway. You don't lose many robots.
          </li>
          <li>
            <strong>Phase 2:</strong> To grow <em>even more</em> corn, you have to start forcing your best robot engineers to drive tractors. They are bad at farming, and you lose a <em>lot</em> of robot production.
          </li>
        </ul>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/PPC/image2.jpg"
            alt="PPC: increasing opportunity cost as you move along the curve"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>
        <p className="mb-6">
          <strong>What if the line IS straight?</strong>
          <br />
          If the PPC is a straight line, it means resources are <strong>perfectly adaptable</strong>. This is like choosing between <strong>red cars vs. blue cars</strong>. The resources you need to make one car are nearly identical to the resources needed to make the other. Your red car experts are also blue car experts. You can switch back and force without a loss of efficiency, so opportunity costs remain constant.
        </p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/PPC/image3.jpg"
            alt="PPC: straight-line curve showing constant opportunity cost"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>


        <hr className="my-12" />

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Shifting the Curve</h2>
        <p className="mb-6">
          The curve is a prison, but you can break out of it. The PPC can shift Outward (Growth) or Inward (Shrinkage), but only if the <strong>capacity</strong> of the economy changes.
        </p>
        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">The 3 Main Shifters:</h3>
        <ol className="mb-6 list-decimal list-inside space-y-2">
          <li>
            <strong>Change in Resource Quantity:</strong> A wave of immigration increases the labor force, or new oil reserves are found. (Shift Right).
          </li>
          <li>
            <strong>Change in Technology:</strong> The internet is invented, making everyone faster. (Shift Right).
          </li>
          <li>
            <strong>Change in Trade:</strong> Trade allows you to <em>consume</em> at a point outside your curve, even if you can't <em>produce</em> there.
          </li>
        </ol>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/PPC/image5.jpg"
            alt="PPC shifters: changes in resources, technology, and trade"
            width={900}
            height={540}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>
      </>
    ),
  },
  'ample-reserves-market': {
    slug: 'ample-reserves-market',
    title: 'Master the Ample Reserves System: How the Fed Steers a Modern Economy',
    description: 'Understanding why traditional monetary policy tools fail when banks hold excess reserves—and how the Fed uses the discount rate and interest on reserves instead.',
    subject: 'Macro',
    unit: 4,
    thumbnailUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_4/ample2.jpg',
    seoSnippet: 'An ample reserves market exists when banks hold excess reserves far above what they are legally required to hold. In this system, the Fed relies on administered rates—the discount rate (ceiling) and interest on reserve balances (floor)—to control lending and the money supply.',
    keyTakeaway: 'In an ample reserves system, the discount rate sets the ceiling on the Federal Funds Rate, while interest on reserve balances sets the floor. Lowering both rates encourages banks to lend more to the public instead of parking money at the Fed.',
    graphGymScenarioId: 51,
    graphGymPrompt: 'Draw the Market for Reserves in an ample regime. Show the equilibrium Federal Funds Rate (FFR). Suppose the actual output in the economy is greater than the natural rate of output. Identify the monetary policy tool the central bank uses to close the output gap and show its impact on the policy rate.',
    practiceQuestionIds: [46, 47, 3107],
    images: [],
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ample+_reserves.mp4',
    content: (
      <>
        <p className="mb-6">An ample reserves market fundamentally changes how we understand monetary policy. In this system, the banking sector is flooded with excess reserves. Banks are simply not lending out all the money they legally could be lending. Because of this massive cushion of cash, the traditional tools of the central bank no longer work the way they used to.</p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_4/ample2.jpg"
            alt="Ample reserves market overview"
            width={600}
            height={400}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The Curfew Analogy: Why the Reserve Requirement Fails</h2>
        <p className="mb-6">To understand why the old tools fail, imagine your parents set a curfew for you at 11:00 p.m., but you already go to bed every night at 10:00 p.m. That new rule will have absolutely no effect on your sleeping habits.</p>
        <p className="mb-6">The exact same logic applies to the required reserve ratio in an ample reserves system. The Federal Reserve might announce that banks can lend out 95% of their deposits. However, if banks are already voluntarily lending out far less than that amount, changing the required reserve ratio will not have the intended impact on the money supply. The central bank needs a completely different set of tools to modify bank lending behavior.</p>
        <p className="mb-6">In an ample reserves system, the Fed relies on two primary administered rates to control the money supply: the discount rate and the interest on reserve balances.</p>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The Ceiling: The Discount Rate</h2>
        <p className="mb-6">The discount rate tells commercial banks exactly what they must pay if they borrow money directly from the central bank.</p>
        <p className="mb-6">Imagine you are a commercial bank that needs to borrow money to meet obligations. You have two options: borrow from the central bank or borrow from another commercial bank. If the central bank is willing to lend you money at a 6% interest rate, you would never choose to borrow from another commercial bank charging 7%. Why pay more when you can get the funds easily from the Fed for less?</p>
        <p className="mb-6">Because of this, the discount rate acts as an upper limit on the interest rates banks charge each other. If Bank A needs cash, Bank B cannot charge them a 7% interest rate if the Discount Rate is 6%. Bank A will simply bypass Bank B and borrow directly from the Fed instead. Therefore, the Discount Rate places a ceiling on the Federal Funds Rate.</p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_4/ample3.jpg"
            alt="Interest on reserve balances"
            width={600}
            height={400}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The Floor: Interest on Reserve Balances</h2>
        <p className="mb-6">On the opposite end of the graph, we have the interest on reserve balances. This is the interest rate the central bank pays commercial banks for keeping their excess reserves parked at the Fed. Just like everyday people can put money in a savings account to earn yield, commercial banks can save their money at the central bank and get paid for it.</p>
        <p className="mb-6">Imagine a new scenario where you are a commercial bank deciding what to do with your excess cash. You can save your money at the Fed and earn a guaranteed 3% interest. Alternatively, a customer walks in wanting to borrow that money at a 2% interest rate. What makes the most sense?</p>
        <p className="mb-6">Saving money at the Fed is virtually risk-free compared to lending it to a consumer, and in this scenario, it pays a higher return. You will obviously choose to save the money and earn the 3%. This dynamic means the interest on reserves sets the lower limit for borrowing and lending. No bank will ever lend money to the public for less than what they could make completely risk-free by leaving it at the Fed.</p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_4/ample4.jpg"
            alt="Putting the tools to work"
            width={600}
            height={400}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">Putting the Tools to Work: Fighting a Recession</h2>
        <p className="mb-6">We can put these pieces together to see how the central bank manipulates these rates to change lending behavior in the real world.</p>
        <p className="mb-6">Let us assume the economy is falling into a recession. The central bank needs to encourage more lending so the money supply increases and the economy gets stimulated. To achieve this, the Fed will lower both the discount rate and the interest on reserves rate.</p>
        <p className="mb-6">Before the change, banks were perfectly happy saving their money at the Fed to collect 3%. Now, the Fed drops that rate to 1%. If a bank wants to save money at the central bank, they are only going to earn a meager 1% return. Suddenly, that customer asking for a 2% loan looks like a much better deal. Banks will respond to this policy change by saving less at the Fed and lending more to the public.</p>
        <p className="mb-6">That newly incentivized lending ripples through the economy, expanding the money supply and providing the exact stimulus needed to fight the recession.</p>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/AP_Macro_Unit_4/ample5.jpg"
            alt="Ample reserves graph gym"
            width={600}
            height={400}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>
      </>
    ),
  },
  'short-run-and-long-run-equilibrium': {
    slug: 'short-run-and-long-run-equilibrium',
    title: 'Short Run and Long Run Equilibrium',
    description: 'Understanding short-run vs. long-run equilibrium in macroeconomics through the lens of a marathon runner\'s training cycle—SRAS, AD, LRAS, and economic growth.',
    subject: 'Macro',
    unit: 3,
    thumbnailUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/blogimages/lrsa/image4.jpg',
    seoSnippet: 'Short-run equilibrium describes where the economy performs today relative to its potential (SRAS and AD). Long-run equilibrium is your sustainable capacity (LRAS). Economic growth shifts LRAS right; fluctuations are short-run performance relative to that capacity.',
    keyTakeaway: 'Short Run = performance (good day or bad day). Long Run = capacity. Economic growth shifts LRAS; fluctuations are movements around your current fitness level.',
    practiceQuestionIds: [30, 32, 3070, 3071],
    images: [],
    videoUrl: null,
    content: (
      <>
        <p className="mb-6">
          In Unit 3 of AP Macroeconomics, you’re often asked questions about the short-run effect of this or that policy action,
          or what will happen to something like price level in the long-run. But what is the difference between the short-run and
          long-run in macroeconomics anyways? To explain, let’s imagine you are training for a marathon.
        </p>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">1. The Daily Run: Short-Run Equilibrium (SRAS &amp; AD)</h2>
        <p className="mb-6">
          Every day you lace up, you have a specific performance. This is the Short-Run. Your short-run equilibrium is just whatever
          distance you run on that given day. It could be a short run when you’re tired, or a long run when you’re feeling energized.
        </p>

        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">The &quot;Pumped&quot; Run (Inflationary Gap)</h3>
        <p className="mb-6">
          One day you feel incredible. You have a tailwind, a perfect playlist, and you've had plenty of sleep. You run way faster
          than your average pace. You are &quot;over-performing.&quot;
        </p>
        <p className="mb-6">
          <strong>Macro Link:</strong> This is <strong>Aggregate Demand (AD)</strong> shifting right. You've pushed output (RGDP)
          beyond your sustainable capacity (<em>Yf</em>).
        </p>

        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">The &quot;Sick&quot; Run (Recessionary Gap)</h3>
        <p className="mb-6">
          Another day, you're exhausted or getting over a cold. You're sluggish, and your pace is terrible. You're normally able to
          run much further, but today you’re just <em>not all there</em>.
        </p>
        <p className="mb-6">
          <strong>Macro Link:</strong> This is a decrease in AD or a <strong>supply</strong> shock. You are under-performing your potential.
        </p>

        <p className="mb-6">
          Keep in mind that both the inflationary gap and the recessionary gap are examples of short-run equilibrium. Since
          short-run equilibrium just represents where the economy is producing <em>at the moment</em>, an economy is always in
          short-run equilibrium.
        </p>

        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <Image
              src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/ad_as_recessionary_label.jpg?w=1200"
              alt="AD-AS recessionary gap"
              width={600}
              height={400}
              className="w-full h-auto rounded-md shadow-sm"
            />
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <Image
              src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/ad_as_inflationary_label.jpg?w=1200"
              alt="AD-AS inflationary gap"
              width={600}
              height={400}
              className="w-full h-auto rounded-md shadow-sm"
            />
          </div>
        </div>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">2. The &quot;Mean&quot;: Your Current Fitness (LRAS)</h2>
        <p className="mb-6">
          Your current fitness level is the baseline. It’s the distance you expect to run when things are going smoothly.
          In the AD-AS model, this is the <strong>Long-Run Aggregate Supply (LRAS)</strong>: the level of real output the
          economy can produce at full employment.
        </p>
        <p className="mb-6">
          In the short run, you can have a great day or a bad day relative to that baseline. But eventually, you’re going to
          come back to your baseline. The same is true for the economy. While we might find ourselves in a recessionary gap,
          or dealing with a bout of inflation, the economy will wind up back at its natural rate of output eventually.
        </p>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">3. The Training Program: Long-Run Growth</h2>
        <p className="mb-6">
          If you’re consistent in your training, and you take care of your body, you’ll notice that you can run longer distances.
          You aren't just having &quot;good days&quot;, you’re changing your baseline.
        </p>
        <p className="mb-6">
          On the AD-AS model, this is <strong>Economic Growth</strong>. You aren't just shifting the AD curve or SRAS; you are
          shifting the LRAS curve to the right.
        </p>

        <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">The Shifters</h3>
        <p className="mb-6">
          Over your training period, there are a number of things that could improve your capacity to run long distances. Maybe
          you buy a better pair of shoes, or learn a new technique for pacing yourself. Of course, as you get into the habit of
          running, your endurance improves considerably. An economy might grow for the following reasons:
        </p>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>More resources, like land, labor, or capital</li>
          <li>Improved quality of resources, like better human capital</li>
          <li>Technology</li>
        </ul>

        <div className="my-8 p-4 border rounded-lg bg-gray-50">
          <Image
            src="https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/lras-increase.jpg?w=1200"
            alt="LRAS shifting right: long-run growth"
            width={600}
            height={400}
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">The Dojo Distinction</h2>
        <ul className="mb-6 list-disc list-inside space-y-2">
          <li>
            <strong>Short Run:</strong> Is about performance. Are you having a good day or a bad day relative to your current fitness?
          </li>
          <li>
            <strong>Long Run:</strong> Is about capacity. How has your training shifted the entire &quot;mean&quot; of what you are capable of doing?
          </li>
        </ul>
      </>
    ),
  },
};

