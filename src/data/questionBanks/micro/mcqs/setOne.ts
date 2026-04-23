import { QuestionBank, Question } from '../../types';
import q14 from '../../../../../public/images/fullExamImages/microMCQSetOne/q14.svg';
import q15 from '../../../../../public/images/fullExamImages/microMCQSetOne/q15.svg';
import q16 from '../../../../../public/images/fullExamImages/microMCQSetOne/q16.svg';
import q23 from '../../../../../public/images/fullExamImages/microMCQSetOne/q23.svg';
import q24 from '../../../../../public/images/fullExamImages/microMCQSetOne/q24.svg';
import q25 from '../../../../../public/images/fullExamImages/microMCQSetOne/q25.svg';
import q31 from '../../../../../public/images/fullExamImages/microMCQSetOne/q31.svg';
import q33 from '../../../../../public/images/fullExamImages/microMCQSetOne/q33.svg';
import q41 from '../../../../../public/images/fullExamImages/microMCQSetOne/q41.svg';
import q43 from '../../../../../public/images/fullExamImages/microMCQSetOne/q43.svg';
import q55 from '../../../../../public/images/fullExamImages/microMCQSetOne/q55.svg';
import q59 from '../../../../../public/images/fullExamImages/microMCQSetOne/q59.svg';

// Fisher-Yates shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle function that preserves question groups
// Questions with the same questionGroup will appear consecutively
// Questions within a group maintain their original order as they appear in the code
function shuffleWithGroups<T extends { questionGroup?: string | number }>(array: T[]): T[] {
  // Create array with original indices to preserve order within groups
  const itemsWithIndex = array.map((item, index) => ({ item, originalIndex: index }));
  
  // Separate questions into groups, preserving original order
  const groups = new Map<string | number, Array<{ item: T; originalIndex: number }>>();
  const ungrouped: Array<{ item: T; originalIndex: number }> = [];
  
  itemsWithIndex.forEach(({ item, originalIndex }) => {
    if (item.questionGroup !== undefined) {
      const groupKey = item.questionGroup;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push({ item, originalIndex });
    } else {
      ungrouped.push({ item, originalIndex });
    }
  });
  
  // Sort each group by original index to maintain order within group
  const sortedGroups: T[][] = [];
  groups.forEach(group => {
    // Sort by original index to preserve order within group
    const sorted = group.sort((a, b) => a.originalIndex - b.originalIndex);
    sortedGroups.push(sorted.map(g => g.item));
  });
  
  // Create chunks: each group is a chunk, each ungrouped question is its own chunk
  const chunks: T[][] = [];
  
  // Add sorted groups as chunks (maintaining order within group)
  sortedGroups.forEach(group => {
    chunks.push(group);
  });
  
  // Add ungrouped questions as individual chunks (maintain their order too)
  ungrouped.sort((a, b) => a.originalIndex - b.originalIndex);
  ungrouped.forEach(({ item }) => {
    chunks.push([item]);
  });
  
  // Shuffle the order of chunks (groups stay together as single chunks)
  const shuffledChunks = shuffleArray(chunks);
  
  // Flatten to get final array
  return shuffledChunks.flat();
}

export const microSetOneQuestions: QuestionBank = {
  name: "AP Microeconomics",
  questions: (() => {
    const allQuestions: Question[] = [
    {
      "id": 1,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.4"],
      "unitName": "Basic Economic Concepts",
      "question": "A professional athlete can mow her lawn in 1 hour. She could also spend that hour filming a commercial for which she would be paid $10,000. Her neighbor, a high school student, can mow the same lawn in 2 hours and values his time at $15 per hour. Which of the following best explains why the athlete should hire the neighbor to mow the lawn?",
      "image": null,
      "options": [
        "The athlete has an absolute advantage in mowing the lawn, so she should do it herself.",
        "The neighbor has an absolute advantage in mowing the lawn.",
        "The athlete's opportunity cost of mowing the lawn is significantly higher than the neighbor's price.",
        "The neighbor has a comparative advantage in filming commercials.",
        "The athlete is experiencing diminishing marginal utility from mowing lawns."
      ],
      "correctAnswer": "C",
      "explanation": "Even though the athlete is faster (absolute advantage in mowing), her opportunity cost is $10,000. The neighbor's opportunity cost is much lower ($30 for 2 hours). It is economically efficient for the athlete to pay the neighbor, as she gains $9,970 in net value by working instead."
    },
    {
      "id": 2,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.4"],
      "unitName": "Basic Economic Concepts",
      "question": "The table below shows the number of acres of land required to produce one ton of Rice or one ton of Corn in two different regions.\n\nBased on the principle of comparative advantage, which pattern of specialization should occur?",
      "image": null,
      "tableData": {
        "headers": ["Region", "Acres for 1 Ton of Rice", "Acres for 1 Ton of Corn"],
        "rows": [
          ["Region A", "2 acres", "4 acres"],
          ["Region B", "5 acres", "5 acres"]
        ]
      },
      "options": [
        "Region A should produce both goods.",
        "Region B should produce both goods.",
        "Region A should specialize in Corn, and Region B should specialize in Rice.",
        "Region A should specialize in Rice, and Region B should specialize in Corn.",
        "Neither region should specialize because trade is not beneficial."
      ],
      "correctAnswer": "D",
      "explanation": "This is an **Input** problem (Acres). Use 'Other Goes Under'. \n- Region A Opp Cost for Rice: $2/4 = 0.5$ Corn.\n- Region B Opp Cost for Rice: $5/5 = 1$ Corn.\nRegion A has the lower opportunity cost for Rice ($0.5 < 1$) and should specialize in Rice. By default, Region B specializes in Corn."
    },
    {
      "id": 3,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.4"],
      "unitName": "Basic Economic Concepts",
      "question": "Two nations, Country J and Country K, produce Robots and Bicycles. The table below shows the maximum output per year for each country.\n\nIf they decide to trade, which terms of trade for 1 Robot would be mutually beneficial?",
      "image": null,
      "tableData": {
        "headers": ["Country", "Robots", "Bicycles"],
        "rows": [
          ["Country J", "20", "100"],
          ["Country K", "10", "80"]
        ]
      },
      "options": [
        "1 Robot for 2 Bicycles",
        "1 Robot for 4 Bicycles",
        "1 Robot for 6 Bicycles",
        "1 Robot for 9 Bicycles",
        "1 Robot for 10 Bicycles"
      ],
      "correctAnswer": "C",
      "explanation": "Calculate the Opportunity Cost of 1 Robot:\n- Country J: Gives up 5 Bicycles ($100/20$).\n- Country K: Gives up 8 Bicycles ($80/10$).\nCountry J exports Robots because it has the lower cost. It wants more than 5 Bicycles. Country K buys Robots and wants to pay less than 8 Bicycles. The price must fall between 5 and 8. The only option is 6 Bicycles."
    },
    {
      "id": 4,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.1"],
      "unitName": "Basic Economic Concepts",
      "question": "Which of the following statements best highlights a fundamental difference between a pure command economy and a pure market economy?",
      "image": null,
      "options": [
        "Command economies rely on the 'invisible hand' to guide production, while market economies rely on government quotas.",
        "Market economies protect private property rights and use price signals to allocate resources, while command economies use central planning.",
        "Scarcity exists only in market economies, whereas command economies have eliminated scarcity through efficient planning.",
        "Command economies focus on efficiency and profit maximization, while market economies prioritize equity and social welfare.",
        "In a market economy, resources are owned collectively by the public, whereas in a command economy, resources are owned by private individuals."
      ],
      "correctAnswer": "B",
      "explanation": "The defining characteristic of a market economy is the private ownership of resources and the use of the price mechanism (supply and demand) to allocate those resources. In contrast, a command economy relies on a central authority (government) to own resources and make decisions regarding production and distribution."
    },
    {
      "id": 5,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.6"],
      "unitName": "Basic Economic Concepts",
      "question": "A student has a budget of $30 to spend at a carnival. Ride tickets cost $5 each, and game tokens cost $2 each. At her optimal bundle of consumption, the marginal utility of the last ride was 50 utils. What must be the marginal utility of the last game token she purchased?",
      "image": null,
      "options": [
        "10 utils",
        "20 utils",
        "25 utils",
        "50 utils",
        "100 utils"
      ],
      "correctAnswer": "B",
      "explanation": "Use the Utility Maximization Rule: $\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y}$. \n- Rides: $\\frac{50 \\text{ utils}}{\\$5} = 10 \\text{ utils per dollar}$. \n- Game Tokens must also yield 10 utils per dollar: $\\frac{MU_{\\text{game}}}{\\$2} = 10$. \n- Solving for $MU_{\\text{game}}$: $10 \\times 2 = 20 \\text{ utils}$."
    },
    {
      "id": 6,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.1"],
      "unitName": "Basic Economic Concepts",
      "question": "Which of the following scenarios best illustrates the economic concept of opportunity cost?",
      "image": null,
      "options": [
        "A firm increases its prices to maximize total revenue.",
        "A consumer decides to buy a new car because it is on sale.",
        "A city government chooses to build a new park, which means it cannot use that land to build a community center.",
        "A factory increases production by hiring more workers.",
        "A country specializes in the production of goods for which it has an absolute advantage."
      ],
      "correctAnswer": "C",
      "explanation": "Opportunity cost is defined as the value of the next best alternative given up when a choice is made. By choosing to use the land for a park, the city sacrifices the benefit of the community center, which represents the opportunity cost of the decision."
    },
    {
      "id": 7,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.5"],
      "unitName": "Supply and Demand",
      "question": "A 20 percent increase in consumer income leads to a 5 percent decrease in the quantity of canned soup demanded. Based on this information, which of the following best classifies canned soup?",
      "image": null,
      "options": [
        "A normal good",
        "An inferior good",
        "A luxury good",
        "A complementary good"
      ],
      "correctAnswer": "B",
      "explanation": "Income elasticity is calculated as % Change in Quantity / % Change in Income (-5% / 20% = -0.25). A negative income elasticity coefficient indicates that the good is an inferior good, meaning demand falls as income rises."
    },
    {
      "id": 8,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.5"],
      "unitName": "Supply and Demand",
      "question": "If a 10 percent increase in the price of Good X the quantity demanded of Good Y by 15 percent, what is the cross-price elasticity of demand and relationship between these goods?",
      "image": null,
      "optionTableHeaders": ["Elasticity", "Type of Goods"],
      "options": [
        "1.5 | Substitutes",
        "-1.5 | Complements",
        "1.5 | Complements",
        "0.67 | Substitutes"
      ],
      "correctAnswer": "A",
      "explanation": "Cross-Price Elasticity = % Change Qty X / % Change Price Y (+15% / +10% = +1.5). A positive cross-price elasticity indicates that an increase in the price of one good leads to an increase in consumption of the other, defining them as substitutes."
    },
    {
      "id": 9,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.3"],
      "unitName": "Supply and Demand",
      "question": "A local transit authority raises the price of bus tickets from 2 dollars to 3 dollars. Following this price hike, the total revenue collected from ticket sales increases. What does this suggest about the price elasticity of demand for bus tickets?",
      "image": null,
      "options": [
        "Demand is relatively inelastic",
        "Demand is relatively elastic",
        "Demand is unit elastic",
        "Demand is perfectly elastic"
      ],
      "correctAnswer": "A",
      "explanation": "According to the total revenue test, if price and total revenue move in the *same* direction (price up, revenue op), demand is Inelastic. The percentage drop in ridership was smaller than the percentage increase in price."
    },
    {
      "id": 10,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.6"],
      "unitName": "Supply and Demand",
      "question": "Which of the following combinations of shifts in supply and demand will definitely result in a decrease in the market equilibrium price?",
      "image": null,
      "options": [
        "Supply increases and demand increases",
        "Supply decreases and demand decreases",
        "Supply increases and demand decreases",
        "Supply decreases and demand increases"
      ],
      "correctAnswer": "C",
      "explanation": "An increase in supply pushes price down (abundance). A decrease in demand pulls price down (lack of interest). When both occur simultaneously, the downward pressure on price is certain, although the effect on quantity is indeterminate."
    },
    {
      "id": 11,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.8"],
      "unitName": "Supply and Demand",
      "question": "Economists estimate that the demand for residential electricity is highly price inelastic, while the supply of electricity is relatively elastic. If the government imposes a new per-unit tax on electricity producers, which of the following describes the distribution of the tax burden?",
      "image": null,
      "options": [
        "Producers will pay the vast majority of the tax.",
        "Consumers will pay the vast majority of the tax.",
        "The tax burden will be shared exactly equally.",
        "The government will ultimately pay the tax through subsidies."
      ],
      "correctAnswer": "B",
      "explanation": "Tax incidence depends on relative elasticity. Because electricity consumers have few substitutes and regard it as a necessity (inelastic demand), they cannot easily reduce consumption when prices rise. Producers, being more elastic, can pass the majority of the tax cost onto consumers in the form of higher prices."
    },
    {
      "id": 12,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.8"],
      "unitName": "Supply and Demand",
      "question": "The government implements a binding price floor in the market for corn to support farmers. Compared to the free market equilibrium, which of the following combinations of effects will occur?",
      "image": null,
      "options": [
        "A market shortage and a decrease in consumer surplus",
        "A market shortage and an increase in consumer surplus",
        "A market surplus and a decrease in consumer surplus",
        "A market surplus and an increase in consumer surplus"
      ],
      "correctAnswer": "C",
      "explanation": "A binding price floor is set *above* equilibrium, causing quantity supplied to exceed quantity demanded (a Surplus). Because consumers must now pay a higher price and purchase a smaller quantity than at equilibrium, consumer surplus definitely decreases."
    },
    {
      "id": 13,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.2"],
      "unitName": "Supply and Demand",
      "question": "Which of the following events would cause the supply curve for new homes to shift to the left?",
      "image": null,
      "options": [
        "A decrease in the price of lumber and steel",
        "An increase in the wages of construction workers",
        "A technological improvement in construction equipment",
        "An increase in the market price of new homes"
      ],
      "correctAnswer": "B",
      "explanation": "A leftward shift in supply represents a decrease in supply. This is caused by an increase in input costs. Higher wages for construction workers increase the cost of production, causing builders to supply fewer homes at every price."
    },
    {
      "id": 14,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.6"],
      "unitName": "Supply and Demand",
      "question": "Assume the market shown in the diagram is operating in equilibrium. Which of the following correctly identifies the area representing the total economic surplus?",
      "image": q14,
      "options": [
        "Area R + S + V",
        "Area T + U + W",
        "Area R + S + T + U",
        "Area R + S + T + U + V + W"
      ],
      "correctAnswer": "D",
      "explanation": "Total economic surplus is the sum of consumer surplus (the area below demand and above the equilibrium price, R+S+V) and producer surplus (the area above supply and below the equilibrium price, T+U+W). Therefore, the total surplus is the combined area R+S+T+U+V+W.",
      "questionGroup": "supply-demand-graph-q14"
    },
    {
      "id": 15,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.8"],
      "unitName": "Supply and Demand",
      "question": "If the government implements a price floor at P2, which of the following correctly identifies the new consumer surplus (CS), producer surplus (PS), and deadweight loss (DWL)?",
      "image": q14,
      "optionTableHeaders": ["Consumer Surplus", "Producer Surplus", "Deadweight Loss"],
      "options": [
        "R | T + U | S + V + W",
        "R + S | T + U + W | V",
        "R | S + T + U | V + W",
        "R + S + V | T + U + W | 0"
      ],
      "correctAnswer": "C",
      "explanation": "At price P2 (a binding floor), the quantity traded is determined by the demand curve. Consumer surplus shrinks to Area R (below demand, above P2). Producer surplus becomes the trapezoid Area S + T + U (above supply, below P2, up to the quantity traded). Area S is transferred from consumers to producers. The reduction in quantity traded creates a deadweight loss represented by the triangle V + W.",
      "questionGroup": "supply-demand-graph-q14"
    },
    {
      "id": 16,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.5"],
      "unitName": "Supply and Demand",
      "question": "The graph below shows the supply and demand for coffee beans. Suppose that a severe drought destroys a significant portion of the crop in major coffee-producing regions. What impact will this have on the equilibrium price and quantity exchanged?",
      "image": q16,
      "options": [
        "Price will increase, and quantity will increase.",
        "Price will increase, and quantity will decrease.",
        "Price will decrease, and quantity will increase.",
        "Price will decrease, and quantity will decrease."
      ],
      "correctAnswer": "B",
      "explanation": "A drought is a negative supply shock. This causes the supply curve to shift to the left. When supply decreases and demand remains unchanged, the shortage at the original price drives the price up. The market settles at a new equilibrium with a higher price and a lower quantity."
    },
    {
      "id": 17,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.1"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "The table below shows the relationship between the number of workers and output. Which of the following statements correctly describes the relationship between marginal product and total product when the firm hires the 6th worker?",
      "image": null,
      "tableData": {
        "headers": ["Quantity of Workers", "Total Product"],
        "rows": [
          ["4", "140"],
          ["5", "150"],
          ["6", "145"]
        ]
      },
      "options": [
        "Marginal product is negative, so total product is increasing at a decreasing rate.",
        "Marginal product is negative, so total product is decreasing.",
        "Marginal product is zero, so total product is maximized.",
        "Marginal product is decreasing but positive, so total product is increasing."
      ],
      "correctAnswer": "B",
      "explanation": "To calculate the marginal product (MP) of the 6th worker, we look at the change in total product (TP) from the 5th to the 6th worker: $145 - 150 = -5$. Since the marginal product is negative, the total product is decreasing (falling from 150 to 145)."
    },
    {
      "id": 18,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.2"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "The table below lists a firm's total cost at different levels of output. Based on this data, what is the average variable cost (AVC) of producing 6 units?",
      "image": null,
      "tableData": {
        "headers": ["Output", "Total Cost"],
        "rows": [
          ["0", "$100"],
          ["1", "$110"],
          ["2", "$118"],
          ["3", "$128"],
          ["4", "$140"],
          ["5", "$160"],
          ["6", "$220"]
        ]
      },
      "options": [
        "$20",
        "$36.67",
        "$22",
        "$120"
      ],
      "correctAnswer": "A",
      "explanation": "At 0 output, total cost is $100, which represents the fixed cost. At 6 units, total cost is $220. The total variable cost (TVC) is total cost minus fixed cost ($220 - $100 = $120). The average variable cost is TVC divided by quantity ($120 / 6 = $20).",
      "sliderExplainer": "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/examVideoSliders/q18.mp4"
    },
    {
      "id": 19,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.2"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "A firm is currently producing at Q1, where marginal cost is $45 and average total cost is $48. If the firm produced fewer units than Q1, which of the following would be true?",
      "image": null,
      "options": [
        "The average total cost would be higher.",
        "The average total cost would be lower.",
        "The total cost would be higher.",
        "The marginal cost would be greater than average total cost."
      ],
      "correctAnswer": "A",
      "explanation": "Since the marginal cost ($45) is less than the average total cost ($48), the firm is currently on the downward-sloping portion of the ATC curve (MC is 'pulling' the average down). If the firm reduces output (moves to the left on the graph), it moves back up the curve to a point where the average total cost is higher."
    },
    {
      "id": 20,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.4"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "Jamie quits a job earning $60,000 a year to open a consulting firm. In the first year, the firm earns $100,000 in revenue. Jamie pays $10,000 in rent and $5,000 in supplies. Additionally, Jamie withdrew $20,000 from a savings account that was earning 5% interest to start the business. What is Jamie's economic profit?",
      "image": null,
      "options": [
        "$25,000",
        "$24,000",
        "$85,000",
        "$20,000"
      ],
      "correctAnswer": "B",
      "explanation": "Explicit costs = Rent ($10,000) + Supplies ($5,000) = $15,000. Implicit costs = Foregone Salary ($60,000) + Foregone Interest ($20,000 * 0.05 = $1,000) = $61,000. Total costs = $76,000. Economic profit = Revenue ($100,000) - Total costs ($76,000) = $24,000."
    },
    {
      "id": 21,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.6"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "A perfectly competitive firm is currently producing where marginal revenue equals marginal cost. However, the current market price is lower than the firm's average variable cost (AVC). What is the profit-maximizing decision in the short run?",
      "image": null,
      "options": [
        "Decrease output but keep producing to cover fixed costs.",
        "Increase output to lower average costs.",
        "Shut down immediately to minimize losses.",
        "Raise the price to cover the costs."
      ],
      "correctAnswer": "C",
      "explanation": "This is the 'Shut Down Rule.' If the price (P) is less than the minimum average variable cost (AVC), the firm cannot even cover its variable expenses (like wages and materials) for each unit sold. Operating would lead to a loss greater than just the fixed costs. Therefore, the firm should shut down."
    },
    {
      "id": 22,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.7"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "Which of the following is a defining characteristic of a perfectly competitive market?",
      "image": null,
      "options": [
        "Firms sell homogeneous products.",
        "There are high barriers to entry.",
        "Firms have significant control over the market price.",
        "Consumers have imperfect information about prices."
      ],
      "correctAnswer": "A",
      "explanation": "In perfect competition, products are considered perfect substitutes. This, combined with many buyers and sellers, means no single firm can influence the price; they are all price takers."
    },
    {
      "id": 23,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.7"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "The graph above shows a perfectly competitive firm in long-run equilibrium. Suppose the firm adopts a new technology that decreases its marginal cost of production. If the market price remains constant, how will the firm's profit-maximizing quantity and economic profit change in the short run?",
      "image": q23,
      "options": [
        "Quantity will increase; Economic Profit will increase.",
        "Quantity will decrease; Economic Profit will increase.",
        "Quantity will increase; Economic Profit will decrease.",
        "Quantity will decrease; Economic Profit will decrease."
      ],
      "correctAnswer": "A",
      "explanation": "The firm maximizes profit where marginal revenue equals marginal cost ($MR = MC$). If the marginal cost curve shifts downward (decreases), it will intersect the fixed marginal revenue curve (Price) at a higher quantity, causing the firm to increase output. Since the firm's costs have decreased while the market price has remained the same, the firm will move from earning zero economic profit to earning positive economic profit in the short run."
    },
    {
      "id": 24,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.7"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "The graph below shows the short-run cost and revenue curves for a perfectly competitive firm. Based on the graph, which of the following statements is true about the firm's current equilibrium?",
      "image": q24,
      "options": [
        "The firm is allocatively efficient and earning economic profits.",
        "The firm is productively efficient and earning economic profits.",
        "The firm is allocatively efficient and earning normal profit.",
        "The firm is productively efficient and earning economic losses."
      ],
      "correctAnswer": "A",
      "explanation": "Perfectly competitive firms maximize profit where marginal revenue equals marginal cost ($MR = MC$). Since Price equals marginal revenue ($P = MR$) in this market structure, the firm is producing where $P = MC$, which is the condition for **Allocative Efficiency**. The graph shows that at this quantity, the Price is higher than the average total cost ($P > ATC$), meaning the firm is earning positive **Economic Profits**. (Note: The firm is not productively efficient because it is not producing at the lowest point of the ATC curve)."
    },
    {
      "id": 25,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.3"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "The graph below shows the long-run average total cost curve for a firm. Suppose the firm is currently producing at output level Q2. If the firm continues to expand production beyond Q2, which of the following will be true?",
      "image": q25,
      "options": [
        "A doubling of inputs will result in less than a doubling of output.",
        "A doubling of inputs will result in more than a doubling of output.",
        "The firm's long-run average total cost will decrease.",
        "The firm will experience increasing returns to scale."
      ],
      "correctAnswer": "A",
      "explanation": "Beyond Q2, the firm enters the region of **Diseconomies of Scale**. In this region, the long-run average total cost (LRATC) curve slopes upward because the firm becomes too large to manage efficiently (often due to communication issues or bureaucracy). This inefficiency means that if the firm increases all inputs by a certain percentage (e.g., doubles them), the resulting output increases by a smaller percentage (less than double)."
    },
    {
      "id": 26,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.2"],
      "unitName": "Imperfect Competition",
      "question": "The table below shows the total revenue and marginal cost for a monopolist. At what quantity should the firm produce to maximize profit?",
      "image": null,
      "tableData": {
        "headers": ["Quantity", "Total Revenue", "Marginal Cost"],
        "rows": [
          ["1", "$25", "$10"],
          ["2", "$48", "$14"],
          ["3", "$69", "$21"],
          ["4", "$88", "$23"]
        ]
      },
      "options": [
        "1 unit",
        "2 units",
        "3 units",
        "4 units"
      ],
      "correctAnswer": "C",
      "explanation": "To maximize profit, the firm should produce where marginal revenue (MR) equals marginal cost (MC), or the last unit where $MR \\ge MC$. \n* Moving from Q=1 to Q=2: $TR$ rises from $25 to $48, so $MR = $23$. Since $23 > $14 (MC), produce it.\n* Moving from Q=2 to Q=3: $TR$ rises from $48 to $69, so $MR = $21$. Since $21 = $21 (MC), produce it.\n* Moving from Q=3 to Q=4: $TR$ rises from $69 to $88, so $MR = $19$. Since $19 < $23 (MC), do not produce it.\nThus, the optimal quantity is 3."
    },
    {
      "id": 27,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.5"],
      "unitName": "Imperfect Competition",
      "question": "The payoff matrix below shows the potential weekly profits for two rival airlines, AirBlue and SkyRed, depending on whether they set High or Low ticket prices.\n\nIf AirBlue chooses to set a High Price, what is SkyRed's best strategy?",
      "image": null,
      "tableData": {
        "headers": ["", "High Price", "Low Price"],
        "rows": [
          ["High Price", "($100, $100)", "($30, $150)"],
          ["Low Price", "($150, $30)", "($60, $60)"]
        ],
        "rowHeaders": true,
        "playerNames": {
          "row": "AirBlue",
          "column": "SkyRed"
        }
      },
      "options": [
        "Choose High Price, because $100 > $30.",
        "Choose High Price, because $100 > $60.",
        "Choose Low Price, because $150 > $100.",
        "Choose Low Price, because $60 > $30."
      ],
      "correctAnswer": "C",
      "explanation": "We strictly look at the row where AirBlue chooses 'High Price' (the top row). SkyRed compares its payoffs in that row: $100 (if they choose High) vs $150 (if they choose Low). Since $150 > $100, SkyRed's best response is to choose Low Price.",
      "questionGroup": "payoff-matrix-airblue-skyred"
    },
    {
      "id": 28,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.5"],
      "unitName": "Imperfect Competition",
      "question": "Refer to the same payoff matrix for AirBlue and SkyRed. Which of the following is true regarding AirBlue's dominant strategy?",
      "image": null,
      "tableData": {
        "headers": ["", "High Price", "Low Price"],
        "rows": [
          ["High Price", "($100, $100)", "($30, $150)"],
          ["Low Price", "($150, $30)", "($60, $60)"]
        ],
        "rowHeaders": true,
        "playerNames": {
          "row": "AirBlue",
          "column": "SkyRed"
        }
      },
      "options": [
        "AirBlue has a dominant strategy to set a High Price.",
        "AirBlue has a dominant strategy to set a Low Price.",
        "AirBlue's dominant strategy depends on SkyRed's choice.",
        "AirBlue does not have a dominant strategy."
      ],
      "correctAnswer": "B",
      "explanation": "To check for a dominant strategy for AirBlue, compare their payoffs regardless of what SkyRed does.\n* If SkyRed chooses High: AirBlue compares $100 (High) vs $150 (Low). Low is better.\n* If SkyRed chooses Low: AirBlue compares $30 (High) vs $60 (Low). Low is better.\nSince 'Low Price' always yields a higher payoff for AirBlue regardless of SkyRed's decision, it is their dominant strategy.",
      "questionGroup": "payoff-matrix-airblue-skyred"
    },
    {
      "id": 29,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.4"],
      "unitName": "Imperfect Competition",
      "question": "A monopolistically competitive firm is currently earning positive economic profits in the short run. What will happen to this firm in the long run?",
      "image": null,
      "options": [
        "New firms will enter the market, shifting this firm's demand curve to the left.",
        "New firms will enter the market, shifting this firm's demand curve to the right.",
        "Existing firms will exit the market, shifting this firm's demand curve to the right.",
        "The firm will increase its price to sustain the economic profits."
      ],
      "correctAnswer": "A",
      "explanation": "In monopolistic competition, barriers to entry are low. Positive economic profits attract new firms to the market. As new firms enter with similar products, the existing firm loses some market share. This causes the individual firm's demand curve to shift to the left (decrease) and become more elastic, continuing until price equals average total cost (zero economic profit)."
    },
    {
      "id": 30,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.1"],
      "unitName": "Imperfect Competition",
      "question": "Which of the following is NOT a source of market power that could lead to a monopoly?",
      "image": null,
      "options": [
        "Ownership or control of a key resource.",
        "Government-issued patents or copyrights.",
        "The existence of many close substitutes.",
        "Significant economies of scale over a large range of output."
      ],
      "correctAnswer": "C",
      "explanation": "Monopolies arise from barriers to entry. Ownership of key resources, legal protections (patents), and economies of scale (natural monopoly) are all barriers that prevent competition. However, the 'existence of many close substitutes' is a characteristic of competitive markets and reduces market power rather than creating it."
    },
    {
      "id": 31,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.2"],
      "unitName": "Imperfect Competition",
      "question": "The graph below shows the cost and revenue curves for a profit-maximizing monopolist. Which of the following correctly identifies the profit-maximizing quantity, price, and area of economic profit?",
      "image": q31,
      "optionTableHeaders": ["Quantity", "Price", "Economic Profit"],
      "options": [
        "Q1 | P4 | P4-P1-S-V",
        "Q1 | P4 | P4-P2-T-V",
        "Q2 | P3 | P3-P2-T-W",
        "Q3 | P1 | Zero Economic Profit"
      ],
      "correctAnswer": "B",
      "explanation": "1. **Find Quantity:** The profit-maximizing quantity is where marginal revenue equals marginal cost ($MR=MC$). On the graph, these curves intersect at point S, which corresponds to quantity **Q1**.\n2. **Find Price:** To find the price consumers are willing to pay for Q1, go up from Q1 to the **Demand curve** (point V). This corresponds to price **P4**.\n3. **Find Profit:** Economic profit is the difference between Price and average total cost (ATC) multiplied by the quantity. At Q1, the price is P4 (point V) and the ATC is P2 (point T). The area of profit is the rectangle defined by these points: **P4-P2-T-V**."
    },
    {
      "id": 32,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.2"],
      "unitName": "Imperfect Competition",
      "question": "Which of the following is true when a profit-maximizing monopolist produces in the elastic portion of its demand curve?",
      "image": null,
      "options": [
        "It can increase total revenue by raising price.",
        "It can decrease average total cost by reducing output.",
        "Price is equal to marginal revenue.",
        "Marginal revenue is less than marginal cost.",
        "Marginal revenue is positive."
      ],
      "correctAnswer": "E",
      "explanation": "The relationship between demand elasticity and marginal revenue (MR) is key. When demand is elastic, lowering the price leads to a proportionately larger increase in quantity sold, causing total revenue to rise; this implies that marginal revenue is positive. A profit-maximizing monopolist always produces in the elastic range because it maximizes profit where $MR = MC$. Since marginal cost ($MC$) is always positive, $MR$ must also be positive, which only occurs in the elastic portion of the demand curve."
    },
    {
      "id": 33,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.6"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "The graph below shows the short-run cost curves for a perfectly competitive firm. Which of the labeled points are part of the firm's short-run supply curve?",
      "image": q33,
      "options": [
        "Points H, I, J, and K",
        "Points I, J, and K",
        "Points J and K only",
        "Points J, K, and L"
      ],
      "correctAnswer": "B",
      "explanation": "A perfectly competitive firm's short-run supply curve is its marginal cost (MC) curve at all points above the minimum average variable cost (AVC). Point I represents the minimum AVC (the shutdown point). Below this price, the firm would produce zero output. Therefore, the supply curve consists of the MC curve starting from point I and continuing upwards through J and K."
    },
    {
      "id": 34,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.1"],
      "unitName": "Factor Markets",
      "question": "Which of the following events would cause the demand curve for pastry chefs to shift to the right?",
      "image": null,
      "options": [
        "A decrease in the market wage rate for pastry chefs.",
        "An increase in the market price of pastries.",
        "An increase in the supply of pastry chefs.",
        "A decrease in the marginal physical product of pastry chefs."
      ],
      "correctAnswer": "B",
      "explanation": "The demand for labor is determined by the marginal revenue product ($MRP$), which is calculated as marginal product ($MP$) multiplied by the product price ($P$). If the price of the product (pastries) increases, the $MRP$ of every chef rises, causing the entire labor demand curve to shift to the right. (Note: A change in the wage rate causes a movement *along* the curve, not a shift)."
    },
    {
      "id": 35,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.3"],
      "unitName": "Factor Markets",
      "question": "A firm sells its product in a perfectly competitive market for $5 per unit. The table below shows the total product for different numbers of workers. What is the marginal revenue product (MRP) of the 3rd worker?",
      "image": null,
      "tableData": {
        "headers": ["Workers", "Total Product"],
        "rows": [
          ["0", "0"],
          ["1", "10"],
          ["2", "18"],
          ["3", "24"],
          ["4", "28"]
        ]
      },
      "options": [
        "$6",
        "$24",
        "$30",
        "$120"
      ],
      "correctAnswer": "C",
      "explanation": "First, find the marginal product (MP) of the 3rd worker: total product increases from 18 to 24, so $MP = 6$. Second, calculate marginal revenue product (MRP) by multiplying MP by the product price: $MRP = MP \\times Price$. Thus, $6 \\times $5 = $30$.",
      "questionGroup": "mrp-table-workers"
    },
    {
      "id": 36,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.3"],
      "unitName": "Factor Markets",
      "question": "Using the same table as the previous question, if the market wage for workers is $35, how many workers should the firm hire to maximize profit?",
      "image": null,
      "tableData": {
        "headers": ["Workers", "Total Product"],
        "rows": [
          ["0", "0"],
          ["1", "10"],
          ["2", "18"],
          ["3", "24"],
          ["4", "28"]
        ]
      },
      "options": [
        "1 worker",
        "2 workers",
        "3 workers",
        "4 workers"
      ],
      "correctAnswer": "B",
      "explanation": "The firm should hire workers as long as the marginal revenue product (MRP) is greater than or equal to the wage ($MRP \\ge Wage$).\n* 1st Worker: $MP=10$, $MRP=$50$. ($50 > $35$) -> Hire.\n* 2nd Worker: $MP=8$, $MRP=$40$. ($40 > $35$) -> Hire.\n* 3rd Worker: $MP=6$, $MRP=$30$. ($30 < $35$) -> Do not hire.\nThe firm stops at 2 workers.",
      "questionGroup": "mrp-table-workers"
    },
    {
      "id": 37,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.3"],
      "unitName": "Factor Markets",
      "question": "A firm uses capital and labor to produce widgets. The marginal product of the last unit of labor is 50 widgets, and the price of labor is $10. The marginal product of the last unit of capital is 100 widgets, and the price of capital is $50. To minimize costs while maintaining current output, what should the firm do?",
      "image": null,
      "options": [
        "Hire more labor and less capital.",
        "Hire more capital and less labor.",
        "Hire more of both labor and capital.",
        "Maintain the current combination of labor and capital."
      ],
      "correctAnswer": "A",
      "explanation": "The firm should verify if the Least-Cost Rule holds: $MP_L / P_L = MP_K / P_K$.\n* Labor: $50 / $10 = 5$ widgets per dollar.\n* Capital: $100 / $50 = 2$ widgets per dollar.\nSince labor provides more 'bang for the buck' (5 > 2), the firm should shift spending away from capital and towards labor."
    },
    {
      "id": 38,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.2"],
      "unitName": "Factor Markets",
      "question": "Assume that the market for corn is perfectly competitive. If the price of corn increases due to high global demand, which of the following will occur in the market for farm workers?",
      "image": null,
      "options": [
        "The supply of farm workers will increase, decreasing the wage.",
        "The demand for farm workers will increase, increasing the wage.",
        "The demand for farm workers will decrease, decreasing the wage.",
        "The supply of farm workers will decrease, increasing the wage."
      ],
      "correctAnswer": "B",
      "explanation": "An increase in the price of the product (corn) increases the marginal revenue product (MRP) of the labor that produces it ($MRP = MP \\times P$). Since the demand for labor is equal to the MRP curve, the demand for farm workers shifts to the right, driving up both the equilibrium wage and the quantity of workers hired."
    },
    {
      "id": 39,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.2"],
      "unitName": "Factor Markets",
      "question": "A firm hires workers in a perfectly competitive labor market. Initially, the marginal revenue product (MRP) of the last worker hired is $40. New government restrictions cause a decrease in the market supply of workers for this industry. If the firm adjusts its hiring to maximize profit at the new market wage, how will the MRP of the last worker hired compare to the initial $40?",
      "image": null,
      "options": [
        "It will be higher than $40, because the firm will hire fewer workers and the marginal product of labor will rise.",
        "It will be lower than $40, because the firm will hire fewer workers and the marginal product of labor will fall.",
        "It will remain equal to $40, because the firm is a wage taker.",
        "It will be lower than $40, because the price of the product the firm sells will decrease."
      ],
      "correctAnswer": "A",
      "explanation": "A decrease in labor supply shifts the market supply curve to the left, raising the equilibrium wage. To maximize profit, the firm hires labor until $MRP$ equals the new, higher wage (Wage > $40). Consequently, the firm hires fewer workers. According to the Law of Diminishing Marginal Returns, employing fewer workers results in a higher marginal product (MP) for the last unit of labor. Since $MRP = MP \\times P$, a higher MP leads to a higher MRP."
    },
    {
      "id": 40,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.4"],
      "unitName": "Factor Markets",
      "question": "The government imposes a binding minimum wage in a monopsonistic labor market. Which of the following describes the impact on the quantity of labor hired and the wage rate compared to the monopsony outcome?",
      "image": null,
      "options": [
        "Quantity hired increases, and the wage rate increases.",
        "Quantity hired decreases, and the wage rate increases.",
        "Quantity hired remains the same, but the wage rate increases.",
        "Both quantity hired and the wage rate decrease."
      ],
      "correctAnswer": "A",
      "explanation": "In a monopsony, the single employer restricts employment to keep wages low. A binding minimum wage can actually increase both employment and wages. When a minimum wage is set above the monopsony wage but below the competitive wage, the monopsonist's marginal resource cost (MRC) becomes constant at the minimum wage level. This allows the firm to hire more workers (up to where MRP equals the minimum wage) while paying the higher minimum wage. Unlike in perfect competition, a minimum wage in a monopsony can increase employment because it eliminates the monopsonist's ability to restrict hiring to suppress wages."
    },
    {
      "id": 41,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.4"],
      "unitName": "Factor Markets",
      "question": "The graph below shows the labor market conditions for a monopsonist. Which of the following combinations correctly identifies the profit-maximizing quantity of labor and the wage rate this firm will pay?",
      "image": q41,
      "optionTableHeaders": ["Quantity", "Wage"],
      "options": [
        "Q2 | P5",
        "Q3 | P3",
        "Q1 | P1",
        "Q4 | P4",
        "Q1 | P2"
      ],
      "correctAnswer": "C",
      "explanation": "A profit-maximizing monopsonist hires labor up to the point where the marginal resource cost (MRC) equals the marginal revenue product (MRP). In the graph, the MRC and Demand (MRP) curves intersect at quantity Q1. However, the firm does not pay the wage at that intersection (P5). Instead, it pays the lowest wage necessary to attract Q1 workers, which is found on the supply curve directly below the intersection. At Q1, the supply curve indicates a wage rate of P1.",
      "questionGroup": "monopsony-labor-market-graph"
    },
    {
      "id": 42,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.4"],
      "unitName": "Factor Markets",
      "question": "If this labor market were perfectly competitive rather than a monopsony, what would be the profit-maximizing quantity of labor and the equilibrium wage rate?",
      "image": q41,
      "optionTableHeaders": ["Quantity", "Wage"],
      "options": [
        "Q2 | P5",
        "Q4 | P2",
        "Q3 | P4",
        "Q3 | P3",
        "Q2 | P1"
      ],
      "correctAnswer": "D",
      "explanation": "In a perfectly competitive labor market, neither the firm nor the workers have market power. The equilibrium is determined simply by the intersection of the market supply of labor and the market demand for labor (MRP). Looking at the graph, the Supply and Demand curves intersect at quantity Q3 and wage rate P3. (Note that the competitive outcome results in higher employment and higher wages than the monopsony outcome).",
      "questionGroup": "monopsony-labor-market-graph"
    },
    {
      "id": 43,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.1"],
      "unitName": "Factor Markets",
      "question": "A profit-maximizing firm increases its employment from quantity Q1 to Q2. Which of the following best explains why the marginal revenue product (MRP) associated with Q2 is lower than the MRP associated with Q1?",
      "image": q43,
      "options": [
        "The marginal product of labor decreased due to the law of diminishing marginal returns.",
        "The price of the final product decreased due to a decrease in market demand.",
        "The market wage rate increased, causing the firm to move up the labor demand curve.",
        "The firm began hiring workers in a monopsonistic labor market.",
        "The total product decreased as more workers were hired."
      ],
      "correctAnswer": "A",
      "explanation": "Marginal revenue product (MRP) is calculated as marginal product ($MP$) multiplied by the product price ($P$). As a firm hires more workers (moving from Q1 to Q2), the law of diminishing marginal returns sets in, causing the marginal product of each additional worker to fall. Since $MP$ decreases while $P$ remains constant (in a competitive product market), the resulting $MRP$ decreases."
    },
    {
      "id": 44,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.5"],
      "unitName": "Market Failure and the Role of Government",
      "question": "The government implements a new progressive income tax system to fund public services. Which of the following correctly describes the impact of this policy on the country's income inequality and Gini coefficient?",
      "image": null,
      "optionTableHeaders": ["Income Inequality", "Gini Coefficient"],
      "options": [
        "Decreases | Decreases",
        "Increases | Decreases",
        "Decreases | Increases",
        "Increases | Increases",
        "Remains the same | Increases"
      ],
      "correctAnswer": "A",
      "explanation": "Progressive taxes take a larger percentage of income from high-income earners and often redistribute it. This narrows the income gap, reducing inequality. Since the Gini coefficient ranges from 0 (perfect equality) to 1 (perfect inequality), a reduction in inequality results in a lower Gini coefficient."
    },
    {
      "id": 45,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.2"],
      "unitName": "Market Failure and the Role of Government",
      "question": "Assume the market for flu vaccines is competitive and that the marginal social benefit of flu vaccines is greater than the marginal private benefit. If the government imposes a binding price ceiling on flu vaccines, how will the quantity exchanged and the deadweight loss change relative to the unregulated market equilibrium?",
      "image": null,
      "optionTableHeaders": ["Quantity Exchanged", "Deadweight Loss"],
      "options": [
        "Increase | Decrease",
        "Increase | Increase",
        "Decrease | Decrease",
        "No change | Increase",
        "Decrease | Increase"
      ],
      "correctAnswer": "E",
      "explanation": "The market is already underproducing (a positive externality implies the market quantity is less than the socially optimal quantity). A binding price ceiling lowers the price, causing producers to supply even less (law of supply). This moves the quantity exchanged further away from the socially optimal level, thereby increasing the deadweight loss."
    },
    {
      "id": 46,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.3"],
      "unitName": "Market Failure and the Role of Government",
      "question": "Which of the following scenarios best illustrates the free-rider problem?",
      "image": null,
      "options": [
        "A manufacturing plant discharges waste into a river, harming downstream fishermen.",
        "A monopolist restricts output to keep prices high.",
        "Residents in a neighborhood enjoy the benefits of a new streetlamp whether or not they contributed to the fund to pay for it.",
        "Consumers rush to buy a limited number of concert tickets, resulting in a shortage.",
        "A student copies answers from a classmate during an exam."
      ],
      "correctAnswer": "C",
      "explanation": "The free-rider problem occurs with public goods, which are non-excludable and non-rival. Since the streetlamp provides light to everyone regardless of whether they paid, individuals have an incentive to let others pay while they benefit for free."
    },
    {
      "id": 47,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.2", "6.4"],
      "unitName": "Market Failure and the Role of Government",
      "question": "The production of Good X creates a negative externality. If the government imposes a per-unit tax on the producers of Good X equal to the marginal external cost, how will the equilibrium price, equilibrium quantity, and deadweight loss change?",
      "image": null,
      "optionTableHeaders": ["Price", "Quantity", "Deadweight Loss"],
      "options": [
        "Increase | Increase | Increase",
        "Decrease | Increase | Decrease",
        "Decrease | Decrease | Increase",
        "Increase | Decrease | Decrease",
        "Decrease | Decrease | Decrease"
      ],
      "correctAnswer": "D",
      "explanation": "The tax increases the marginal cost for producers, shifting the supply curve to the left (upward) to align with the marginal social cost. This decreases the supply, driving the market price up and the quantity down towards the socially optimal level. Since the market outcome now aligns with allocative efficiency, the deadweight loss is eliminated or reduced."
    },
    {
      "id": 48,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.1"],
      "unitName": "Market Failure and the Role of Government",
      "question": "The table below shows the total social benefit and total social cost for a community park at different hours of operation per day. What is the socially optimal number of hours for the park to be open?",
      "image": null,
      "tableData": {
        "headers": ["Hours", "Total Social Benefit ($)", "Total Social Cost ($)"],
        "rows": [
          ["1", "200", "80"],
          ["2", "350", "170"],
          ["3", "450", "270"],
          ["4", "500", "380"],
          ["5", "520", "500"]
        ]
      },
      "options": [
        "1 Hour",
        "2 Hours",
        "3 Hours",
        "4 Hours",
        "5 Hours"
      ],
      "correctAnswer": "C",
      "explanation": "The socially optimal quantity maximizes net social benefit (total social benefit minus total social cost). At 3 hours, the benefit is 450 and the cost is 270, giving a net benefit of $180. Alternatively, you can look for where marginal social benefit approximately equals marginal social cost. For the 3rd hour, the marginal benefit is $100 ($450-350) and the marginal cost is $100 ($270-170)."
    },
    {
      "id": 49,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.1", "4.2"],
      "unitName": "Market Failure and the Role of Government",
      "question": "Which of the following is true if the government regulates a natural monopoly by requiring it to charge a \"fair return price\"?",
      "image": null,
      "options": [
        "The firm will produce the allocatively efficient quantity.",
        "The firm will incur an economic loss and require a subsidy.",
        "The firm will maximize profits where marginal revenue equals marginal cost.",
        "The firm will exit the market immediately due to losses.",
        "The firm will earn zero economic profit."
      ],
      "correctAnswer": "E",
      "explanation": "The fair return price is set where price equals average total cost ($P = ATC$). At this price, the firm covers all its explicit and implicit costs, resulting in zero economic profit (normal profit). This prevents the firm from needing a subsidy to stay in business, unlike the socially optimal price ($P = MC$) which often causes losses for natural monopolies."
    },
    {
      "id": 50,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.5"],
      "unitName": "Basic Economic Concepts",
      "question": "A small manufacturing firm has only 4 hours of machine time available today to produce two types of parts: Gears and Levers. The table below shows the marginal benefit (profit) expected from each hour spent producing each part. To maximize total profit, how should the firm allocate its 4 hours?",
      "image": null,
      "tableData": {
        "headers": ["Hour", "MB of Gears ($)", "MB of Levers ($)"],
        "rows": [
          ["1st Hour", "200", "110"],
          ["2nd Hour", "150", "80"],
          ["3rd Hour", "120", "60"],
          ["4th Hour", "50", "40"]
        ]
      },
      "options": [
        "2 hours Gears, 2 hours Levers",
        "3 hours Gears, 1 hour Levers",
        "1 hour Gears, 3 hours Levers",
        "4 hours Gears, 0 hours Levers",
        "0 hours Gears, 4 hours Levers"
      ],
      "correctAnswer": "B",
      "explanation": "To maximize profit, the firm should rank all available options and choose the top 4 hours with the highest Marginal Benefit (MB). \n1. Gears Hour 1 ($200) - Select.\n2. Gears Hour 2 ($150) - Select.\n3. Gears Hour 3 ($120) - Select.\n4. Now compare the next best options: Gears Hour 4 ($50) vs. Levers Hour 1 ($110). Levers Hour 1 yields higher profit ($110 > $50), so select Levers.\nResult: 3 hours for Gears and 1 hour for Levers."
    },
    {
      "id": 51,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.4"],
      "unitName": "Supply and Demand",
      "question": "Economists have determined that the price elasticity of supply for standard plastic smartphone cases is 2.0. If the market price increases from $10 to $12, how will the quantity supplied change?",
      "image": null,
      "options": [
        "Increase by 40%",
        "Decrease by 40%",
        "Increase by 20%",
        "Decrease by 20%",
        "Increase by 10%"
      ],
      "correctAnswer": "A",
      "explanation": "First, calculate the percentage change in price: $(12 - 10) / 10 = 0.20$ (or 20%). Next, use the elasticity formula: $E_s = \\%\\Delta Q / \\%\\Delta P$. Substitute the known values: $2.0 = \\%\\Delta Q / 20\\%$. Solving for the change in quantity: $\\%\\Delta Q = 2.0 \\times 20\\% = 40\\%$. Since the price increased and the supply curve is upward-sloping, the quantity supplied must **increase**."
    },
    {
      "id": 52,
      "unit": 3,
      "subject": "ap_microeconomics",
      "lessonIDS": ["3.1"],
      "unitName": "Production, Cost, and the Perfect Competition Model",
      "question": "Which of the following correctly describes the relationship between a firm's marginal product (MP) and average product (AP)?",
      "image": null,
      "options": [
        "When MP is greater than AP, AP must be rising.",
        "When MP is greater than AP, AP must be falling.",
        "When MP is falling, AP must also be falling.",
        "When MP is zero, AP is maximized.",
        "When MP is rising, AP must be falling."
      ],
      "correctAnswer": "A",
      "explanation": "This is a standard mathematical rule: 'Marginal pulls the Average.' If the additional worker (Marginal) contributes more than the current average, the new average goes up. If the additional worker contributes less, the average goes down. Therefore, when $MP > AP$, $AP$ is rising."
    },
    {
      "id": 53,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.5"],
      "unitName": "Imperfect Competition",
      "question": "Cartels are often unstable and difficult to maintain in the long run. Which of the following best explains why?",
      "image": null,
      "options": [
        "Individual firms have an incentive to cheat by lowering prices or increasing output to capture more market share.",
        "Government regulations automatically dissolve cartels after one year.",
        "Consumers will eventually boycott cartel products.",
        "The dominant strategy for all firms in a cartel is always to raise prices indefinitely.",
        "Economies of scale eventually force cartel members to merge into a single monopoly."
      ],
      "correctAnswer": "A",
      "explanation": "While firms benefit collectively from high prices, each individual firm faces a 'Prisoner's Dilemma.' They can earn even higher individual profit if they secretly undercut the cartel price or produce more than their quota, assuming other members stick to the agreement. Since every member faces this incentive, the cartel collapses."
    },
    {
      "id": 54,
      "unit": 5,
      "subject": "ap_microeconomics",
      "lessonIDS": ["5.3"],
      "unitName": "Factor Markets",
      "question": "A bakery hires labor and capital to produce bread. Currently, the marginal product of labor is 40 loaves, and the wage rate is $10. The marginal product of capital is 100 loaves, and the rental rate of capital is $20. To minimize costs while maintaining current output, the firm should:",
      "image": null,
      "options": [
        "Hire more Capital and less Labor.",
        "Hire more Labor and less Capital.",
        "Maintain the current combination of Labor and Capital.",
        "Hire more of both inputs.",
        "Fire both labor and capital."
      ],
      "correctAnswer": "A",
      "explanation": "Compare the 'marginal product per dollar' for each input.\n* Labor: $40 / $10 = 4$ loaves per dollar.\n* Capital: $100 / $20 = 5$ loaves per dollar.\nSince Capital provides a higher return per dollar spent ($5 > 4$), the firm should shift resources toward Capital and away from Labor."
    },
    {
      "id": 55,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.8"],
      "unitName": "Supply and Demand",
      "question": "The graph below shows a market where the government has imposed a per-unit excise tax on producers. Based on the graph, what is the amount of the per-unit tax and the total tax revenue collected by the government?",
      "image": q55,
      "optionTableHeaders": ["Per-Unit Tax", "Total Tax Revenue"],
      "options": [
        "P4 - P2 | (P4 - P2) * Q1",
        "P4 - P3 | (P4 - P3) * Q1",
        "P4 - P1 | (P4 - P1) * Q1",
        "P3 - P1 | (P3 - P1) * Q2",
        "P5 - P1 | (P5 - P1) * Q1"
      ],
      "correctAnswer": "A",
      "explanation": "The per-unit tax is the vertical distance between the original supply curve (S) and the new supply curve (S + tax). On the graph, this distance is represented by the difference between P4 and P2 at the quantity traded (Q1). Total Tax Revenue is calculated as (Per-Unit Tax) × (Quantity Sold). Therefore, the revenue corresponds to the area of the rectangle with height (P4 - P2) and width Q1.",
      "questionGroup": "excise-tax-graph-q60"
    },
    {
      "id": 56,
      "unit": 2,
      "subject": "ap_microeconomics",
      "lessonIDS": ["2.8"],
      "unitName": "Supply and Demand",
      "question": "After the tax is imposed, which of the following correctly identifies the price paid by consumers, the price received by producers, and the area representing deadweight loss?",
      "image": q55,
      "optionTableHeaders": ["Consumer Price", "Producer Price", "Deadweight Loss"],
      "options": [
        "P4 | P2 | Area C-D-E",
        "P4 | P3 | Area E-D-C",
        "P3 | P1 | Area P2-P1-C",
        "P4 | P2 | Area P4-P2-C-E",
        "P3 | P2 | Area C-D-E"
      ],
      "correctAnswer": "A",
      "explanation": "The tax shifts the supply curve left, moving the equilibrium from point D to point E. Consumers pay the new higher equilibrium price, **P4**. Producers receive this price minus the tax amount, leaving them with **P2** (the point on the original supply curve directly below the new equilibrium). The deadweight loss is the triangle **C-D-E**, representing the lost economic surplus because the quantity traded fell from Q2 to Q1.",
      "questionGroup": "excise-tax-graph-q60"
    },
    {
      "id": 57,
      "unit": 4,
      "subject": "ap_microeconomics",
      "lessonIDS": ["4.3", "3.7"],
      "unitName": "Imperfect Competition",
      "question": "Which of the following characteristics is shared by a perfectly competitive industry and a monopolist practicing perfect (first-degree) price discrimination?",
      "image": null,
      "options": [
        "Both produce the allocatively efficient quantity.",
        "Both earn zero economic profit in the long run.",
        "Both generate a significant amount of consumer surplus.",
        "Both face a perfectly elastic demand curve.",
        "Both charge a single market-clearing price."
      ],
      "correctAnswer": "A",
      "explanation": "Allocative efficiency occurs where price equals marginal cost ($P = MC$), or where total welfare is maximized (no deadweight loss). In perfect competition, the market equilibrium naturally settles here. A perfectly price-discriminating monopolist also produces this quantity because they can sell every unit for the consumer's maximum willingness to pay, down to the point where price equals marginal cost. Consequently, both market structures eliminate deadweight loss, although the distribution of surplus is entirely different (the monopolist takes it all)."
    },
    {
      "id": 58,
      "unit": 1,
      "subject": "ap_microeconomics",
      "lessonIDS": ["1.2"],
      "unitName": "Basic Economic Concepts",
      "question": "Which of the following best explains why a nation's Production Possibilities Curve (PPC) is typically bowed out rather than a straight line?",
      "image": null,
      "options": [
        "Resources are perfectly adaptable between the production of the two goods.",
        "Resources are not equally suitable for producing both goods.",
        "The opportunity cost of production is constant.",
        "The nation is experiencing constant returns to scale.",
        "Technology is improving at a constant rate."
      ],
      "correctAnswer": "B",
      "explanation": "A concave (bowed out) PPC indicates **increasing opportunity costs**. This happens because resources are not perfectly adaptable (e.g., a tractor is great for farming but terrible for making microchips). As you shift more resources from one good to the other, you are forced to use less and less suitable resources, causing the opportunity cost to rise."
    },
    {
      "id": 59,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.2"],
      "unitName": "Market Failure and the Role of Government",
      "question": "The graph below shows the marginal private benefit (MPB), marginal social benefit (MSB), and marginal social cost (MSC) for a good. Based on the graph, which type of market failure is present and what is the dollar value of the marginal external benefit?",
      "image": q59,
      "optionTableHeaders": ["Market Failure", "External Benefit"],
      "options": [
        "Negative production externality | $4",
        "Positive consumption externality | $6",
        "Positive production externality | $6",
        "Negative consumption externality | $2",
        "Positive consumption externality | $4"
      ],
      "correctAnswer": "B",
      "explanation": "The graph shows that the marginal social benefit (MSB) curve is higher than the marginal private benefit (MPB) curve, indicating a positive consumption externality. The value of the external benefit is the vertical distance between the two curves. At quantity Q1, the MSB is $26 and the MPB is $20, so the external benefit is $26 - $20 = $6. (You can also confirm this at Q2: $24 - $18 = $6).",
      "questionGroup": "positive-externality-graph-q63"
    },
    {
      "id": 60,
      "unit": 6,
      "subject": "ap_microeconomics",
      "lessonIDS": ["6.4"],
      "unitName": "Market Failure and the Role of Government",
      "question": "Which of the following government actions would best correct this market failure and achieve the socially optimal quantity?",
      "image": q59,
      "options": [
        "Impose a per-unit tax equal to the marginal external benefit.",
        "Impose a per-unit tax equal to the marginal private cost.",
        "Provide a per-unit subsidy equal to the marginal social cost.",
        "Provide a per-unit subsidy equal to the marginal external benefit.",
        "Provide a lump-sum subsidy to producers."
      ],
      "correctAnswer": "D",
      "explanation": "To correct a positive externality (underproduction), the government should encourage more consumption/production. The most efficient tool is a **per-unit subsidy** equal to the vertical distance between the marginal social benefit (MSB) and marginal private benefit (MPB) curves. This distance represents the **marginal external benefit** ($6). This subsidy effectively internalizes the external benefit, aligning the private market outcome with the social optimum.",
      "questionGroup": "positive-externality-graph-q63"
    }
    ];
    
    // Sort by ID to ensure consistent order (no shuffling)
    // This ensures that when users return to the exam, questions are in the same order
    return allQuestions.sort((a, b) => a.id - b.id);
  })()
};

