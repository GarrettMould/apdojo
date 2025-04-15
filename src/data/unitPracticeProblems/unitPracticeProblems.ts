// Import the macroSetTwoQuestions from the macroSetTwo.ts file
import { macroSetTwoQuestions } from '../questionBanks/macro/mcqs/macroSetTwo';

// Create arrays for each unit
const unit1Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 1);
const unit2Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 2);
const unit3Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 3);
const unit4Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 4);
const unit5Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 5);
const unit6Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 6);

// Microeconomics Unit 2 Practice Problems
const microUnit2Questions = [
  {
    id: 1,
    unit: 2,
    lessonIDS: ["2.2"],
    unitName: "Supply and Demand",
    question: "Which of the following would cause an increase in the supply of gasoline?",
    image: null,
    options: [
      "An increase in the price of crude oil",
      "A decrease in the number of sellers of gasoline",
      "An improvement in the technology used to refine gasoline",
      "An expectation by sellers that gasoline prices will be higher in the future",
      "An increase in the tax on gasoline"
    ],
    correctAnswer: "C",
    explanation: "An improvement in technology lowers production costs, making sellers willing to supply more at each price, thus increasing supply (shifting the supply curve right)."
  },
  {
    id: 2,
    unit: 2,
    lessonIDS: ["2.3"],
    unitName: "Supply and Demand",
    question: "If the price of a good decreases and total revenue increases, the demand for the good is:",
    image: null,
    options: [
      "elastic",
      "inelastic",
      "unit elastic",
      "perfectly elastic",
      "perfectly inelastic"
    ],
    correctAnswer: "A",
    explanation: "When demand is elastic (PED > 1), a decrease in price leads to a proportionally larger increase in quantity demanded, causing total revenue (P x Q) to increase."
  },
  {
    id: 3,
    unit: 2,
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "Which of the following is true of a price ceiling that is set below the equilibrium price?",
    image: null,
    options: [
      "It will result in a surplus",
      "It will result in a shortage",
      "It will have no effect on the market",
      "It will increase producer surplus",
      "It will lead to a decrease in quantity demanded"
    ],
    correctAnswer: "B",
    explanation: "A price ceiling set below the equilibrium price is binding. At this lower price, quantity demanded exceeds quantity supplied, resulting in a shortage."
  },
  {
    id: 4,
    unit: 2,
    lessonIDS: ["2.5"],
    unitName: "Supply and Demand",
    question: "The cross-price elasticity of demand between good X and good Y is -2. This indicates that good X and good Y are:",
    image: null,
    options: [
      "substitutes",
      "complements",
      "normal goods",
      "inferior goods",
      "unrelated goods"
    ],
    correctAnswer: "B",
    explanation: "A negative cross-price elasticity of demand means that as the price of one good increases, the quantity demanded of the other good decreases. This relationship defines complementary goods."
  },
  {
    id: 5,
    unit: 2,
    lessonIDS: ["2.6"],
    unitName: "Supply and Demand",
    question: "Consumer surplus is best described as the:",
    image: null,
    options: [
      "difference between the price buyers pay and the price sellers receive",
      "total value of goods purchased by consumers",
      "difference between the maximum price buyers are willing to pay and the actual price",
      "sum of the individual surpluses of all producers in the market",
      "area above the supply curve and below the market price"
    ],
    correctAnswer: "C",
    explanation: "Consumer surplus represents the net benefit to buyers, calculated as the difference between their willingness to pay for a good and the price they actually pay."
  },
  {
    id: 6,
    unit: 2,
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "A tax on the sellers of a good will cause the:",
    image: null,
    options: [
      "demand curve to shift to the left",
      "demand curve to shift to the right",
      "supply curve to shift to the left",
      "supply curve to shift to the right",
      "equilibrium price to decrease"
    ],
    correctAnswer: "C",
    explanation: "A tax imposed on sellers increases their costs of production, leading to a decrease in supply, which is represented by a leftward shift of the supply curve."
  },
  {
    id: 7,
    unit: 2,
    lessonIDS: ["2.1"],
    unitName: "Supply and Demand",
    question: "Which of the following would cause a decrease in the demand for coffee?",
    image: null,
    options: [
      "An increase in the price of tea, a substitute for coffee",
      "A decrease in the price of sugar, a complement to coffee",
      "An increase in consumer income, assuming coffee is a normal good",
      "A decrease in the expected future price of coffee",
      "An increase in the population"
    ],
    correctAnswer: "D",
    explanation: "If consumers expect the price of coffee to fall in the future, they will likely reduce their current demand, waiting to buy at the lower expected price."
  },
  {
    id: 8,
    unit: 2,
    lessonIDS: ["2.4"],
    unitName: "Supply and Demand",
    question: "The price elasticity of supply measures how much:",
    image: null,
    options: [
      "the quantity demanded changes in response to a change in price",
      "the quantity supplied changes in response to a change in price",
      "the price changes in response to a change in demand",
      "the price changes in response to a change in supply",
      "the income of consumers changes in response to a change in price"
    ],
    correctAnswer: "B",
    explanation: "Price elasticity of supply measures the responsiveness of the quantity supplied of a good or service to a change in its price."
  },
  {
    id: 9,
    unit: 2,
    lessonIDS: ["2.6", "2.7"],
    unitName: "Supply and Demand",
    question: "If a market is in equilibrium, which of the following is true?",
    image: null,
    options: [
      "There is no consumer surplus",
      "There is no producer surplus",
      "Quantity demanded equals quantity supplied",
      "Price is above the equilibrium price",
      "Quantity demanded is greater than quantity supplied"
    ],
    correctAnswer: "C",
    explanation: "Market equilibrium occurs at the price where the quantity consumers are willing and able to buy is exactly equal to the quantity producers are willing and able to sell."
  },
  {
    id: 10,
    unit: 2,
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "A binding price floor will lead to:",
    image: null,
    options: [
      "A shortage",
      "A surplus",
      "An increase in demand",
      "A decrease in supply",
      "Market equilibrium"
    ],
    correctAnswer: "B",
    explanation: "A binding price floor is set above the equilibrium price. At this higher price, quantity supplied exceeds quantity demanded, resulting in a surplus."
  }
];

// Microeconomics Unit 3 Practice Problems
const microUnit3Questions = [
  {
    id: 1,
    unit: 3,
    lessonIDS: ["3.1"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The law of diminishing marginal product states that:",
    image: null,
    options: [
      "Total output decreases as more input is added",
      "Average product eventually decreases as more input is added",
      "Marginal product eventually decreases as more variable input is added to a fixed input",
      "Total cost eventually increases as output increases",
      "Marginal cost eventually decreases as output increases"
    ],
    correctAnswer: "C",
    explanation: "Diminishing marginal product occurs in the short run when adding successive units of a variable input (like labor) to a fixed input (like capital) results in smaller and smaller increases in total output. The marginal product of the variable input eventually declines."
  },
  {
    id: 2,
    unit: 3,
    lessonIDS: ["3.2"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Which statement accurately describes the relationship between marginal cost (MC) and average total cost (ATC)?",
    image: null,
    options: [
      "If MC > ATC, then ATC must be falling",
      "If MC < ATC, then ATC must be rising",
      "MC equals ATC when ATC is at its maximum",
      "MC intersects ATC at the minimum point of ATC",
      "ATC is always greater than MC"
    ],
    correctAnswer: "D",
    explanation: "The marginal cost curve intersects the average total cost curve at the lowest point of the ATC curve. When MC is below ATC, it pulls ATC down; when MC is above ATC, it pulls ATC up."
  },
  {
    id: 3,
    unit: 3,
    lessonIDS: ["3.2"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Marginal cost is defined as the change in:",
    image: null,
    options: [
      "Total revenue resulting from selling one more unit",
      "Total cost resulting from producing one more unit",
      "Average total cost resulting from producing one more unit",
      "Average variable cost resulting from producing one more unit",
      "Fixed cost resulting from producing one more unit"
    ],
    correctAnswer: "B",
    explanation: "Marginal cost (MC) is the additional cost incurred from producing one more unit of output. It is calculated as the change in total cost divided by the change in quantity (ΔTC / ΔQ)."
  },
  {
    id: 4,
    unit: 3,
    lessonIDS: ["3.3"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "A firm experiences economies of scale when:",
    image: null,
    options: [
      "Its long-run average total cost decreases as output increases",
      "Its short-run average total cost decreases as output increases",
      "Its marginal cost is increasing",
      "Its total fixed costs are decreasing",
      "It doubles inputs and more than doubles output"
    ],
    correctAnswer: "A",
    explanation: "Economies of scale occur when a firm's long-run average total cost (LRATC) falls as it increases its scale of production. This is represented by the downward-sloping portion of the LRATC curve."
  },
  {
    id: 5,
    unit: 3,
    lessonIDS: ["3.4"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Economic profit differs from accounting profit because economic profit accounts for:",
    image: null,
    options: [
      "Only explicit costs",
      "Only implicit costs",
      "Both explicit and implicit costs",
      "Total revenue minus variable costs",
      "Fixed costs only"
    ],
    correctAnswer: "C",
    explanation: "Accounting profit subtracts only explicit (out-of-pocket) costs from total revenue. Economic profit subtracts both explicit costs and implicit costs (the opportunity costs of resources used) from total revenue."
  },
  {
    id: 6,
    unit: 3,
    lessonIDS: ["3.5"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "A profit-maximizing firm in any market structure will produce the quantity of output where:",
    image: null,
    options: [
      "Marginal revenue equals average total cost",
      "Price equals marginal cost",
      "Marginal revenue equals marginal cost",
      "Total revenue is maximized",
      "Average total cost is minimized"
    ],
    correctAnswer: "C",
    explanation: "The fundamental rule for profit maximization is to produce up to the point where the revenue generated by the last unit sold (marginal revenue, MR) is equal to the cost of producing that last unit (marginal cost, MC)."
  },
  {
    id: 7,
    unit: 3,
    lessonIDS: ["3.6"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "In the short run, a perfectly competitive firm should shut down and produce zero output if:",
    image: null,
    options: [
      "Price is less than average total cost",
      "Price is less than average variable cost",
      "Marginal revenue is less than marginal cost",
      "Economic profit is zero",
      "Accounting profit is negative"
    ],
    correctAnswer: "B",
    explanation: "The short-run shutdown rule states that a firm should cease production if the market price falls below its minimum average variable cost (P < min AVC). At such a price, the firm cannot even cover its variable costs per unit."
  },
  {
    id: 8,
    unit: 3,
    lessonIDS: ["3.7"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Which of the following is NOT a characteristic of a perfectly competitive market?",
    image: null,
    options: [
      "A large number of buyers and sellers",
      "Firms sell differentiated products",
      "Free entry and exit for firms",
      "Firms are price takers",
      "Perfect information for buyers and sellers"
    ],
    correctAnswer: "B",
    explanation: "Perfectly competitive markets are characterized by firms selling identical (homogeneous) products. Product differentiation is a feature of monopolistic competition."
  },
  {
    id: 9,
    unit: 3,
    lessonIDS: ["3.7"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "In long-run equilibrium, a perfectly competitive firm produces at the output level where:",
    image: null,
    options: [
      "Price > Average Total Cost",
      "Price < Average Variable Cost",
      "Marginal Revenue > Marginal Cost",
      "Price = Marginal Cost = Minimum Average Total Cost",
      "Economic Profit > 0"
    ],
    correctAnswer: "D",
    explanation: "In the long run, free entry and exit drive economic profits to zero in perfect competition. This occurs where firms produce at the minimum point of their average total cost curve, and price equals both marginal cost and minimum average total cost (P = MC = min ATC)."
  },
  {
    id: 10,
    unit: 3,
    lessonIDS: ["3.6", "3.7"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "If a perfectly competitive firm is earning positive economic profit in the short run, then:",
    image: null,
    options: [
      "Price must be less than average total cost",
      "Price must be equal to average total cost",
      "Price must be greater than average total cost",
      "The firm should exit the market",
      "New firms will exit the market"
    ],
    correctAnswer: "C",
    explanation: "Positive economic profit means total revenue exceeds total cost (explicit + implicit). For a perfectly competitive firm (where P = MR), this occurs when the market price is greater than the average total cost at the profit-maximizing quantity (where P = MC)."
  }
];

// Microeconomics Unit 4 Practice Problems
const microUnit4Questions = [
  {
    id: 1,
    unit: 4,
    lessonIDS: ["4.1", "4.2"],
    unitName: "Imperfect Competition",
    question: "Unlike a perfectly competitive firm, a single-price monopolist:",
    image: null,
    options: [
      "Can earn positive economic profit in the long run",
      "Faces a perfectly elastic demand curve",
      "Maximizes profit where P = MC",
      "Is productively efficient in the long run",
      "Has no market power"
    ],
    correctAnswer: "A",
    explanation: "Significant barriers to entry in a monopoly prevent new firms from entering the market, allowing the monopolist to potentially earn positive economic profits even in the long run. Perfectly competitive firms earn zero economic profit in the long run due to free entry."
  },
  {
    id: 2,
    unit: 4,
    lessonIDS: ["4.2"],
    unitName: "Imperfect Competition",
    question: "A single-price monopolist determines its profit-maximizing output level by producing where:",
    image: null,
    options: [
      "Price equals marginal cost (P = MC)",
      "Marginal revenue equals marginal cost (MR = MC)",
      "Average total cost is minimized (min ATC)",
      "Price equals average total cost (P = ATC)",
      "Total revenue is maximized (MR = 0)"
    ],
    correctAnswer: "B",
    explanation: "The universal profit-maximization rule for all firms, including monopolies, is to produce the quantity where marginal revenue (MR) equals marginal cost (MC). The price is then determined by the demand curve at that quantity."
  },
  {
    id: 3,
    unit: 4,
    lessonIDS: ["4.2"],
    unitName: "Imperfect Competition",
    question: "For a single-price monopolist, marginal revenue is less than price (MR < P) because:",
    image: null,
    options: [
      "The firm faces a perfectly elastic demand curve",
      "The firm must lower the price on all units sold to sell an additional unit",
      "The firm's marginal cost is increasing",
      "The firm is a price taker",
      "Total revenue increases as price decreases"
    ],
    correctAnswer: "B",
    explanation: "A monopolist faces the market demand curve, which is downward sloping. To sell more output, it must lower the price for every unit it sells, not just the last one. This 'price effect' on all previous units makes MR less than the price."
  },
  {
    id: 4,
    unit: 4,
    lessonIDS: ["4.2"],
    unitName: "Imperfect Competition",
    question: "Compared to a perfectly competitive market outcome, a single-price monopoly produces:",
    image: null,
    options: [
      "More output and charges a lower price",
      "Less output and charges a higher price",
      "The same output but charges a higher price",
      "Less output but charges the same price",
      "An allocatively efficient quantity"
    ],
    correctAnswer: "B",
    explanation: "Monopolies maximize profit by producing less output (where MR=MC, and P > MC) and charging a higher price than would occur in perfect competition (where P=MC). This leads to allocative inefficiency and deadweight loss."
  },
  {
    id: 5,
    unit: 4,
    lessonIDS: ["4.3"],
    unitName: "Imperfect Competition",
    question: "Which of the following is necessary for a firm to practice price discrimination?",
    image: null,
    options: [
      "The firm must be in a perfectly competitive market",
      "The firm must be able to prevent the resale of its product",
      "The firm must face a perfectly elastic demand curve",
      "The firm must produce at minimum average total cost",
      "The firm must have identical demand curves across customer groups"
    ],
    correctAnswer: "B",
    explanation: "Successful price discrimination requires market power, the ability to segment customers based on differing price elasticities of demand, and the ability to prevent arbitrage (low-price buyers reselling to high-price buyers)."
  },
  {
    id: 6,
    unit: 4,
    lessonIDS: ["4.3"],
    unitName: "Imperfect Competition",
    question: "If a monopolist can engage in perfect price discrimination, then:",
    image: null,
    options: [
      "Consumer surplus is maximized",
      "Deadweight loss is maximized",
      "Total output decreases compared to a single-price monopoly",
      "The monopolist captures all consumer surplus as profit",
      "The demand curve becomes the marginal revenue curve"
    ],
    correctAnswer: "D",
    explanation: "Under perfect price discrimination, the firm charges each consumer their maximum willingness to pay. This eliminates consumer surplus entirely and transfers it to the producer as economic profit. Output expands to the allocatively efficient level (where P=MC for the last unit), eliminating deadweight loss."
  },
  {
    id: 7,
    unit: 4,
    lessonIDS: ["4.4"],
    unitName: "Imperfect Competition",
    question: "Which market structure is characterized by many firms selling differentiated products and facing easy entry and exit?",
    image: null,
    options: [
      "Perfect competition",
      "Monopoly",
      "Oligopoly",
      "Monopolistic competition",
      "Monopsony"
    ],
    correctAnswer: "D",
    explanation: "Monopolistic competition features a large number of firms, similar to perfect competition, but with differentiated products (giving firms some market power) and free entry/exit."
  },
  {
    id: 8,
    unit: 4,
    lessonIDS: ["4.4"],
    unitName: "Imperfect Competition",
    question: "In the long run, a monopolistically competitive firm produces where:",
    image: null,
    options: [
      "Price equals marginal cost and average total cost is minimized",
      "Price equals marginal cost and economic profit is positive",
      "Price equals average total cost, but price is greater than marginal cost",
      "Marginal revenue equals average total cost",
      "Price equals minimum average variable cost"
    ],
    correctAnswer: "C",
    explanation: "Free entry ensures monopolistically competitive firms earn zero economic profit in the long run (P = ATC). However, because they face a downward-sloping demand curve due to product differentiation, their profit-maximizing output (where MR=MC) occurs where P > MC, indicating allocative inefficiency. They also typically operate with excess capacity (not at min ATC)."
  },
  {
    id: 9,
    unit: 4,
    lessonIDS: ["4.5"],
    unitName: "Imperfect Competition",
    question: "The defining characteristic of an oligopoly is:",
    image: null,
    options: [
      "A single seller dominates the market",
      "Firms sell identical products",
      "Barriers to entry are non-existent",
      "Firms are interdependent and consider rivals' actions",
      "Firms are price takers"
    ],
    correctAnswer: "D",
    explanation: "Oligopoly is characterized by a few dominant firms where the actions of one firm (regarding price, output, advertising, etc.) significantly impact the others, leading to strategic interdependence."
  },
  {
    id: 10,
    unit: 4,
    lessonIDS: ["4.5"],
    unitName: "Imperfect Competition",
    question: "In game theory, a Nash equilibrium occurs when:",
    image: null,
    options: [
      "Both players choose their dominant strategy, if one exists",
      "Each player chooses the strategy that maximizes their payoff, regardless of the other player's choice",
      "Each player chooses their best strategy, given the strategy chosen by the other player(s)",
      "The sum of the players' payoffs is maximized",
      "One player forces the other into a suboptimal outcome"
    ],
    correctAnswer: "C",
    explanation: "A Nash equilibrium is a set of strategies, one for each player, such that no player has an incentive to unilaterally change their strategy, given the strategies chosen by the other players. It represents a stable outcome in a strategic interaction."
  }
];

// Microeconomics Unit 5 Practice Problems
const microUnit5Questions = [
  {
    id: 1,
    unit: 5,
    lessonIDS: ["5.1"],
    unitName: "Factor Markets",
    question: "The demand for labor is called a derived demand because it depends on:",
    image: null,
    options: [
      "The supply of labor",
      "The wage rate",
      "The demand for the product that labor produces",
      "The marginal product of labor",
      "Government regulations"
    ],
    correctAnswer: "C",
    explanation: "The demand for factors of production, like labor, is derived from the demand for the goods and services they are used to create. If demand for the final product increases, the demand for the labor needed to make it also increases."
  },
  {
    id: 2,
    unit: 5,
    lessonIDS: ["5.1", "5.3"],
    unitName: "Factor Markets",
    question: "Marginal Revenue Product (MRP) of labor is calculated as:",
    image: null,
    options: [
      "Marginal Product of Labor (MPL) divided by the wage rate",
      "Marginal Product of Labor (MPL) times the price of the output",
      "Change in total revenue divided by the change in the wage rate",
      "Total revenue divided by the quantity of labor",
      "Price of the output times the quantity of labor"
    ],
    correctAnswer: "B",
    explanation: "MRP represents the additional revenue a firm earns from hiring one more unit of labor. It is the Marginal Product of Labor (MPL) multiplied by the Marginal Revenue (MR) from selling the additional output. In perfectly competitive output markets, MR equals Price (P), so MRP = MPL x P."
  },
  {
    id: 3,
    unit: 5,
    lessonIDS: ["5.3"],
    unitName: "Factor Markets",
    question: "A firm operating in perfectly competitive product and factor markets will hire labor until the:",
    image: null,
    options: [
      "Marginal product of labor equals the wage rate",
      "Marginal revenue product of labor equals the wage rate",
      "Price of the output equals the wage rate",
      "Average product of labor equals the wage rate",
      "Marginal cost equals the wage rate"
    ],
    correctAnswer: "B",
    explanation: "Firms maximize profit by hiring factors up to the point where the additional revenue from the factor (MRP) equals the additional cost of the factor (Marginal Factor Cost, MFC). In a perfectly competitive labor market, MFC equals the market wage rate (W). Thus, the firm hires until MRP = W."
  },
  {
    id: 4,
    unit: 5,
    lessonIDS: ["5.2"],
    unitName: "Factor Markets",
    question: "Which of the following would cause the demand curve for autoworkers to shift to the right?",
    image: null,
    options: [
      "A decrease in the price of cars",
      "A decrease in the productivity of autoworkers",
      "An increase in the demand for cars",
      "An increase in the wage rate for autoworkers",
      "An increase in the supply of autoworkers"
    ],
    correctAnswer: "C",
    explanation: "Since the demand for labor is derived from the demand for the product, an increase in the demand for cars (the product) will increase the demand for autoworkers (the labor), shifting the labor demand curve to the right."
  },
  {
    id: 5,
    unit: 5,
    lessonIDS: ["5.2"],
    unitName: "Factor Markets",
    question: "An increase in the supply of labor could be caused by:",
    image: null,
    options: [
      "An increase in the demand for the product labor produces",
      "A decrease in the wage rate",
      "An increase in immigration or population growth",
      "A decrease in labor productivity",
      "An increase in the price of capital (a substitute factor)"
    ],
    correctAnswer: "C",
    explanation: "Factors that increase the number of available workers at any given wage rate, such as increased immigration, population growth, or changes in preferences towards work, will shift the labor supply curve to the right (increase supply)."
  },
  {
    id: 6,
    unit: 5,
    lessonIDS: ["5.3"],
    unitName: "Factor Markets",
    question: "To minimize costs for a given level of output, a firm should employ factors of production such that the:",
    image: null,
    options: [
      "Marginal product per dollar spent is equal across all factors",
      "Total product is maximized",
      "Marginal product of each factor is equal",
      "Marginal revenue product of each factor is equal",
      "Price of each factor is equal"
    ],
    correctAnswer: "A",
    explanation: "The least-cost combination rule states that cost is minimized when the last dollar spent on each factor yields the same amount of marginal product. Mathematically, this is MPL / PL = MPK / PK, where L is labor and K is capital."
  },
  {
    id: 7,
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "A market structure in which there is only one buyer of a factor of production is called:",
    image: null,
    options: [
      "Monopoly",
      "Oligopoly",
      "Monopolistic competition",
      "Perfect competition",
      "Monopsony"
    ],
    correctAnswer: "E",
    explanation: "Monopsony is the factor market equivalent of a monopoly (single seller) in the product market. It refers to a market with a single buyer of an input, such as a dominant employer in a small town."
  },
  {
    id: 8,
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "For a monopsonist employer, the marginal factor cost (MFC) of labor is greater than the wage rate because:",
    image: null,
    options: [
      "The firm must pay a higher wage to attract more workers, and this higher wage applies to all workers hired",
      "The firm faces a perfectly elastic supply of labor",
      "The marginal revenue product of labor is decreasing",
      "The firm is a price taker in the labor market",
      "The supply curve of labor is downward sloping"
    ],
    correctAnswer: "A",
    explanation: "A monopsonist faces the entire upward-sloping market labor supply curve. To hire one more worker, it must raise the wage not only for that worker but for all existing workers as well. This makes the marginal factor cost (the cost of hiring one more worker) exceed the wage rate."
  },
  {
    id: 9,
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "A monopsonist maximizes profit by hiring labor up to the point where:",
    image: null,
    options: [
      "Marginal revenue product equals the wage rate (MRP = W)",
      "Marginal revenue product equals marginal factor cost (MRP = MFC)",
      "Marginal factor cost equals the wage rate (MFC = W)",
      "Marginal product equals the wage rate (MP = W)",
      "Marginal product equals marginal factor cost (MP = MFC)"
    ],
    correctAnswer: "B",
    explanation: "The profit-maximizing rule for hiring inputs is always MRP = MFC. For a monopsonist, the MFC is greater than the wage rate (W), so they hire where MRP = MFC, and then determine the wage to pay based on the labor supply curve at that quantity."
  },
  {
    id: 10,
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "Compared to a perfectly competitive labor market outcome, a monopsonist will hire:",
    image: null,
    options: [
      "More workers at a higher wage",
      "More workers at a lower wage",
      "Fewer workers at a higher wage",
      "Fewer workers at a lower wage",
      "The same number of workers at a lower wage"
    ],
    correctAnswer: "D",
    explanation: "Because the monopsonist equates MRP with the higher MFC curve (which lies above the supply curve), it chooses a quantity of labor that is lower than the competitive quantity. The wage paid is determined by the supply curve at this lower quantity, resulting in a lower wage than in a competitive market."
  }
];

// Microeconomics Unit 6 Practice Problems
const microUnit6Questions = [
  {
    id: 1,
    unit: 6,
    lessonIDS: ["6.1"],
    unitName: "Market Failure and the Role of Government",
    question: "Allocative efficiency in a market occurs when:",
    image: null,
    options: [
      "Economic profit is zero",
      "Output is produced at minimum average total cost",
      "The marginal benefit to society equals the marginal cost to society",
      "Firms are price takers",
      "Total revenue is maximized"
    ],
    correctAnswer: "C",
    explanation: "Allocative efficiency means resources are distributed to produce the mix of goods and services most desired by society. This occurs when the marginal social benefit (MSB) of the last unit produced equals its marginal social cost (MSC)."
  },
  {
    id: 2,
    unit: 6,
    lessonIDS: ["6.2"],
    unitName: "Market Failure and the Role of Government",
    question: "The presence of a negative externality in production leads to a market outcome where:",
    image: null,
    options: [
      "The market produces less than the socially optimal quantity",
      "The market price is higher than the socially optimal price",
      "The marginal social cost is less than the marginal private cost",
      "The market produces more than the socially optimal quantity",
      "There is no deadweight loss"
    ],
    correctAnswer: "D",
    explanation: "When a negative externality exists (e.g., pollution), the social cost (MSC) of production exceeds the private cost (MPC). The unregulated market produces where MPB = MPC, resulting in an output level greater than the socially optimal level (where MSB = MSC), leading to overproduction and deadweight loss."
  },
  {
    id: 3,
    unit: 6,
    lessonIDS: ["6.2"],
    unitName: "Market Failure and the Role of Government",
    question: "Which of the following government actions could correct for a positive externality in consumption?",
    image: null,
    options: [
      "Imposing a per-unit tax on consumers",
      "Imposing a price floor above the equilibrium price",
      "Providing a per-unit subsidy to consumers",
      "Granting a monopoly to the producer",
      "Banning the consumption of the good"
    ],
    correctAnswer: "C",
    explanation: "A positive externality in consumption (e.g., vaccinations) means the social benefit (MSB) exceeds the private benefit (MPB). A per-unit subsidy to consumers effectively increases their private benefit, shifting the demand curve rightward towards the socially optimal quantity where MSB = MSC."
  },
  {
    id: 4,
    unit: 6,
    lessonIDS: ["6.1", "6.2"],
    unitName: "Market Failure and the Role of Government",
    question: "The socially optimal quantity of a good is produced where:",
    image: null,
    options: [
      "Marginal private benefit equals marginal private cost",
      "Marginal social benefit equals marginal social cost",
      "Total social benefit is maximized",
      "Average social cost is minimized",
      "Producer surplus equals consumer surplus"
    ],
    correctAnswer: "B",
    explanation: "The socially optimal, or allocatively efficient, quantity occurs where the marginal benefit to society (MSB) from consuming the last unit is exactly equal to the marginal cost to society (MSC) of producing that last unit. This point maximizes total social surplus."
  },
  {
    id: 5,
    unit: 6,
    lessonIDS: ["6.3"],
    unitName: "Market Failure and the Role of Government",
    question: "A public good, such as national defense, is characterized by being:",
    image: null,
    options: [
      "Rivalrous and excludable",
      "Non-rivalrous and excludable",
      "Rivalrous and non-excludable",
      "Non-rivalrous and non-excludable",
      "Produced only by the government"
    ],
    correctAnswer: "D",
    explanation: "Public goods possess two key characteristics: non-rivalry (one person's use does not prevent others from using it) and non-excludability (it is impractical or impossible to prevent non-payers from benefiting)."
  },
  {
    id: 6,
    unit: 6,
    lessonIDS: ["6.3"],
    unitName: "Market Failure and the Role of Government",
    question: "The free-rider problem associated with public goods arises because:",
    image: null,
    options: [
      "The marginal cost of providing the good to an additional user is zero",
      "Individuals can benefit from the good without paying for it",
      "The government produces the good inefficiently",
      "Private firms can earn large profits from public goods",
      "The good is rivalrous in consumption"
    ],
    correctAnswer: "B",
    explanation: "Since people cannot be easily excluded from consuming a public good, they have an incentive to let others pay for it while still enjoying the benefits. This free-riding leads to under-provision by private markets, often necessitating government provision."
  },
  {
    id: 7,
    unit: 6,
    lessonIDS: ["6.4"],
    unitName: "Market Failure and the Role of Government",
    question: "Consider a monopoly. The imposition of a per-unit tax on the monopolist's output will typically lead to:",
    image: null,
    options: [
      "A decrease in price and an increase in output",
      "An increase in price and an increase in output",
      "A decrease in price and a decrease in output",
      "An increase in price and a decrease in output",
      "No change in price or output"
    ],
    correctAnswer: "D",
    explanation: "A per-unit tax acts like an increase in marginal cost (MC) for the monopolist. The MC curve shifts upward/leftward. The monopolist will find the new profit-maximizing quantity where MR intersects the new, higher MC curve. This results in a lower quantity and, moving up the demand curve, a higher price."
  },
  {
    id: 8,
    unit: 6,
    lessonIDS: ["6.4"],
    unitName: "Market Failure and the Role of Government",
    question: "If the government imposes a lump-sum tax (a fixed amount regardless of output) on a profit-maximizing monopolist, how will this affect the monopolist's output and price in the short run?",
    image: null,
    options: [
      "Output increases, price decreases",
      "Output decreases, price increases",
      "Output and price remain unchanged",
      "Output remains unchanged, price increases",
      "Output decreases, price remains unchanged"
    ],
    correctAnswer: "C",
    explanation: "A lump-sum tax affects only fixed costs, not marginal costs (MC) or marginal revenue (MR). Since the profit-maximizing output level is determined where MR = MC, and neither of these curves shifts, the monopolist's output and price will not change in the short run. The tax will, however, reduce the monopolist's total profit."
  },
  {
    id: 9,
    unit: 6,
    lessonIDS: ["6.5"],
    unitName: "Market Failure and the Role of Government",
    question: "The Lorenz curve is used by economists to illustrate:",
    image: null,
    options: [
      "The relationship between tax rates and tax revenue",
      "The distribution of income within a society",
      "The trade-off between inflation and unemployment",
      "The production possibilities of an economy",
      "The deadweight loss from taxation"
    ],
    correctAnswer: "B",
    explanation: "The Lorenz curve plots the cumulative percentage of total income received against the cumulative percentage of households/individuals, starting from the lowest income. The further the curve bows away from the line of perfect equality, the greater the income inequality."
  },
  {
    id: 10,
    unit: 6,
    lessonIDS: ["6.5"],
    unitName: "Market Failure and the Role of Government",
    question: "A Gini coefficient of 0 represents:",
    image: null,
    options: [
      "Perfect income inequality",
      "Perfect income equality",
      "The highest level of economic efficiency",
      "A situation where only one person earns all the income",
      "A negative externality"
    ],
    correctAnswer: "B",
    explanation: "The Gini coefficient is a numerical measure of income inequality derived from the Lorenz curve, ranging from 0 (perfect equality, where everyone has the same income) to 1 (perfect inequality, where one person has all the income)."
  }
];

// Export the arrays
export {
  unit1Questions,
  unit2Questions,
  unit3Questions,
  unit4Questions,
  unit5Questions,
  unit6Questions,
  microUnit2Questions,
  microUnit3Questions,
  microUnit4Questions,
  microUnit5Questions,
  microUnit6Questions
};
