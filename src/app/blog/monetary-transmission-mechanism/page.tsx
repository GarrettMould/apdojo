import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="lg:pl-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 lg:pl-8">
          <article className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-xl shadow-md border border-gray-200">
            {/* Header */}
            <header className="mb-8 border-b pb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                The Foreign Exchange Market: Why Money is Just Like Cookies
              </h1>
              <p className="text-lg text-gray-600">
                Mastering the hardest graph in AP Macro by treating currency like a normal good.
              </p>
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none prose-blue">
              <p>When students see the "Foreign Exchange Market" (Forex) on the AP Exam, they panic. They think currency is magical and follows different rules than the rest of economics.</p>
              <p>It doesn’t. In fact, the market for US Dollars works exactly like the market for <strong>Cookies</strong>.</p>
              <p>If more people want cookies, the price of cookies goes up. If fewer people want them, the price goes down. Currency is no different. It is just a commodity that is bought and sold.</p>
              <p>Here is the breakdown of who buys, who sells, and how a shift in one currency forces a shift in another.</p>
              
              <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">1. The Demand Side: The "Cookie" Buyers</h2>
              <p>In the Forex market, the "Buyers" (Demanders) of US Dollars are usually foreigners.</p>
              <p>But why do they want USD? It’s just fancy green paper. You can’t eat it.</p>
              <p>The demand for currency is <strong>Derived Demand</strong>. They don’t want the paper itself; they want what the paper <em>gets</em> them.</p>
              <ul>
                <li><strong>US Goods:</strong> If a French person wants to buy a Tesla made in Texas, they need USD to pay for it.</li>
                <li><strong>US Assets:</strong> If a Japanese investor wants to buy stock in Apple or a US Treasury Bond, they need USD to complete the transaction.</li>
              </ul>
              <p><strong>The Cookie Analogy:</strong> Imagine you are the French person. You don't want the "Dollar Cookie" just to look at it. You want it because it is the <em>only</em> token that the vending machine accepts to give you a Tesla.</p>
              
              <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">2. The Supply Side: The "Cookie" Sellers</h2>
              <p>Where do these foreigners get the US Dollars they need? They get them from the people who already have them: <strong>US Citizens and American Banks.</strong></p>
              <p>This is the <strong>Supply</strong> curve.</p>
              <p>Americans supply (sell) dollars when they want to buy something foreign. If I want to vacation in Paris or buy Japanese anime merchandise, I have to take my USD and "sell" it to the exchange bank to get Euros or Yen.</p>
              
              <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">3. The Chain Reaction: Two Currencies, One Transaction</h2>
              <p>This is the part that shows up on the FRQ. You can’t just shift one graph. Because currency is an <em>exchange</em>, a change in one market automatically triggers a change in the other.</p>
              <p><strong>The Scenario:</strong> Interest rates in the US increase. European investors now want to buy US Bonds to earn that higher interest rate.</p>
              <p>Here is the step-by-step chain reaction:</p>
              
              <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step A: The Market for US Dollars</h3>
              <p>Europeans need dollars to buy those bonds.</p>
              <ul>
                <li><strong>Demand for USD:</strong> Increases (Shifts Right →)</li>
                <li><strong>The Result:</strong> The "Price" of the Dollar (Exchange Rate) goes <strong>UP</strong>.</li>
              </ul>
              <div className="my-8 p-4 border rounded-lg bg-gray-50">
                  <Image src="/images/placeholder.png" alt="Graph of Market for USD with Demand Shifting Right" width={600} height={400} className="w-full h-auto rounded-md shadow-sm" />
              </div>
              <p><strong>The Cookie Analogy:</strong> Suddenly, everyone wants the Dollar Cookie. Since supply stayed the same but the line out the door got longer, the price of the cookie skyrockets. The Dollar <strong>Appreciates</strong>.</p>
              
              <h3 className="mt-10 mb-4 text-2xl font-bold text-gray-800">Step B: The Market for Euros</h3>
              <p>This is the "Mirror Effect." To <em>get</em> the US Dollars, the Europeans have to <em>give up</em> their Euros. They are flooding the world market with Euros to make the trade.</p>
              <ul>
                <li><strong>Supply of Euros:</strong> Increases (Shifts Right →)</li>
                <li><strong>The Result:</strong> The "Price" of the Euro (Exchange Rate) goes <strong>DOWN</strong>.</li>
              </ul>
              <div className="my-8 p-4 border rounded-lg bg-gray-50">
                  <Image src="/images/placeholder.png" alt="Graph of Market for Euros with Supply Shifting Right" width={600} height={400} className="w-full h-auto rounded-md shadow-sm" />
              </div>
              <p><strong>The Cookie Analogy:</strong> The Europeans are dumping their "Euro Cookies" into the trash can to get their hands on Dollar Cookies. Because there is a massive pile of Euro Cookies that nobody wants, their value crashes. The Euro <strong>Depreciates</strong>.</p>
              
              <h2 className="mt-12 mb-4 text-3xl font-bold text-gray-800">4. Summary: The Rule of Opposites</h2>
              <p>If you can remember the "Cookie" logic, you will ace this section.</p>
              <ul>
                <li>If Currency A <strong>Appreciates</strong> (gets stronger/more expensive)...</li>
                <li>Currency B <em>must</em> <strong>Depreciate</strong> (get weaker/cheaper).</li>
              </ul>
              <p>Math cannot allow both currencies to get stronger at the same time. If the Dollar Cookie is worth 2 Euro Cookies today, and 3 Euro Cookies tomorrow, the Dollar got "sweeter" (Appreciated) and the Euro got "staler" (Depreciated).</p>
              
              <hr className="my-12"/>

              <div className="text-center bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🍪 Don't Let the Forex Graphs Crumble You</h3>
                <p className="text-gray-700 mb-6">
                  The AP Exam loves to ask you to draw <em>both</em> of these graphs side-by-side. Can you show the Demand shift on one and the Supply shift on the other?
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 text-lg rounded-md">
                  <Link href="/unitFRQpracticePage">
                    [Click here to try the Unit 6 FRQ Walkthrough]
                  </Link>
                </Button>
                <p className="text-xs text-gray-500 mt-4"><em>Our AI-guided practice tool will let you draw the Forex shifts and tell you instantly if you got the right outcome.</em></p>
              </div>

            </div>
          </article>

          <aside className="hidden lg:block lg:col-span-1 relative">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Key Takeaway</h3>
                <p className="text-sm text-gray-600">
                  A change in demand for one currency causes an opposite change in the supply of the other. If one appreciates, the other must depreciate.
                </p>
              </div>
              <div className="p-6 border border-blue-200 bg-blue-50 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Ready to Practice?</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Test your knowledge on the FRQ Dojo.
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm rounded-md">
                  <Link href="/unitFRQpracticePage">
                    Start Now
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
