import { KeyTerm } from './allContent';

export const keyTerms: KeyTerm[] = [
    {
        id: 'resources',
        term: 'Resources',
        definition: 'Inputs used to create goods and services',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Also known as the factors of production',
        ]
      },
       {
         id: 'scarcity',
         term: 'Scarcity',
         definition: 'The fundamental problem of economics where there are not enough resources to fulfill all wants and needs.',
         subject: 'ap_macroeconomics',
         unit: 1,
         lessonIDs: ['1.1'],
         subNotes: [
           'Example (Individuals): A student has limited time and must choose between studying for an exam or going to a party.',
           'Example (Businesses): A company has a limited budget and must choose between hiring more employees or investing in new equipment.',
           'Example (Countries): A nation has limited oil reserves and must decide how to allocate them between domestic use and exports.'
         ]
       },
      {
        id: 'ap_macroeconomics',
        term: 'Macroeconomics',
        definition: 'The study of how entire countries face the issue of scarcity.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Example: Might study how an increase in taxes impacts consumer spending.'
        ]
      },
      {
        id: 'ap_microeconomics',
        term: 'Microeconomics',
        definition: 'The study of how individuals and companies face the issue of scarcity.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Example: Might study how a company decides how many workers to hire, or how much to produce.'
        ]
      },
  
      {
        id: 'factors_of_production',
        term: 'Factors of Production',
        definition: 'The resources used to produce all goods and services.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: ['Land', 'Labor', 'Capital', 'Entrepreneurship']
      },
      {
        id: 'land',
        term: 'Land',
        definition: 'All natural resources used in production.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: ['Example: Farmland used to grow crops, or minerals used to build electronics.']
      },
      {
        id: 'labor',
        term: 'Labor',
        definition: 'The human effort and skills used in production.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: ['Example: The work done by a chef in a restaurant or an engineer at a tech company.']
      },
      {
        id: 'capital',
        term: 'Capital',
        definition: 'Human-made resources used to create other goods and services.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Example: A factory building used to manufacture cars, or a computer used to design software.'
        ]
      },
      {
        id: 'physical_capital',
        term: 'Physical Capital',
        definition: 'The tools, machinery, and buildings used in production.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Example: A tractor used on a farm, a delivery truck for a shipping company, or a factory building.'
        ]
      },
      {
        id: 'human_capital',
        term: 'Human Capital',
        definition: 'The knowledge and skills a worker gains through education and experience.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Example: A doctor\'s medical training, a programmer\'s coding skills, or a chef\'s culinary expertise.'
        ]
      },
      {
        id: 'entrepreneurship',
        term: 'Entrepreneurship',
        definition: 'The ability to combine the other factors of production to create goods and services, often involving risk-taking.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.1'],
        subNotes: [
          'Example: A business owner who starts a new restaurant, combining land (location), labor (chefs and servers), and capital (kitchen equipment) to create a dining experience.'
        ]
      },
      {
        id: 'trade_off',
        term: 'Trade-off',
        definition: 'Giving up one thing to get another due to scarcity.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: []
      },
      {
        id: 'opportunity_cost',
        term: 'Opportunity Cost',
        definition: 'The value of the next best alternative given up when making a choice.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: [
          'Example: If a country can produce 10 units of Good A or 5 units of Good B with the same resources, the opportunity cost of producing 1 unit of Good A is 0.5 units of Good B (5 ÷ 10 = 0.5).',
          'Example: If I can finish two math assignments in an hour and one English assignment in an hour, then my opportunity cost of doing the English assignment is 2 math assignments.'
        ]
      },
      {
        id: 'ppc',
        term: 'Production Possibilities Curve (PPC)',
        definition: 'A graph showing different combinations of two goods that can be produced using all resources efficiently.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: ['Points on the curve = efficient use of resources', 'Points inside = inefficient use', 'Points beyond = unattainable']
      },
      {
        id: 'constant_opportunity_cost',
        term: 'Constant Opportunity Cost',
        definition: 'When the opportunity cost of producing a good remains the same, shown by a straight-line PPC.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: []
      },
      {
        id: 'increasing_opportunity_cost',
        term: 'Increasing Opportunity Cost',
        definition: 'When the opportunity cost of making a good increases the more of it you produce, shown by a bowed-out PPC.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: []
      },
      {
        id: 'underutilization',
        term: 'Underutilization',
        definition: 'A situation where an economy is not using all of its resources efficiently, producing less than its maximum potential output.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: [
          'Where to find on a graph: Points located inside the PPC curve represent underutilization.',
          'Example: If a country has high unemployment, it is operating at a point inside its PPC, not using all available labor resources.'
        ]
      },
      {
        id: 'allocative-efficiency',
        term: 'Allocative Efficiency',
        definition: 'A situation where resources are allocated to produce the combination of goods and services that society most values.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: [
          'Where to find on a graph: The specific point on the PPC curve that represents the optimal combination of goods based on society\'s preferences.',
          'Note: While all points on the PPC are productively efficient, only one point represents allocative efficiency (the point that matches what society wants most).'
        ]
      },
      {
        id: 'unattainable-point',
        term: 'Unattainable Point',
        definition: 'A combination of goods that cannot be produced with the current resources and technology available to an economy.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: [
          'Where to find on a graph: Points located outside (to the right of) the PPC curve represent unattainable combinations.',
          'Example: If a country wants to produce more of both goods than its PPC allows, that combination is unattainable with current resources.'
        ]
      },
      {
        id: 'ppc_shift_out',
        term: 'Outward Shift (PPC)',
        definition: 'Represents economic growth caused by an increase in quantity/quality of resources or improved technology.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: []
      },
      {
        id: 'ppc_shift_in',
        term: 'Inward Shift (PPC)',
        definition: 'Represents loss of productive capacity due to events like disasters or war.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.2'],
        subNotes: []
      },
      {
        id: 'absolute_advantage',
        term: 'Absolute Advantage',
        definition: 'The ability to produce more of a good than another producer, given the same resources.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.3'],
        subNotes: []
      },
      {
        id: 'comparative_advantage',
        term: 'Comparative Advantage',
        definition: 'The ability to produce a good at a lower opportunity cost than another producer.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.3'],
        subNotes: []
      },
      
      {
        id: 'input-problem',
        term: 'Input Problem',
        definition: 'A type of opportunity cost problem where you are given the amount of resources (inputs) needed to produce each good.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.3'],
        subNotes: [
          'How to find opportunity cost: Itself / Other',
          'Example: If it takes 2 hours to produce Good A and 4 hours to produce Good B, the opportunity cost of 1 Good A is 2/4 = 0.5 Good B. The opportunity cost of 1 Good B is 4/2 = 2 Good A.'
        ]
      },
      {
        id: 'output-problem',
        term: 'Output Problem',
        definition: 'A type of opportunity cost problem where you are given the amount of output that can be produced with the same resources.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.3'],
        subNotes: [
          'How to find opportunity cost: Other / Itself',
          'Example: If a country can produce 10 units of Good A or 5 units of Good B with the same resources, the opportunity cost of 1 Good A is 5/10 = 0.5 Good B. The opportunity cost of 1 Good B is 10/5 = 2 Good A.'
        ]
      },
      {
        id: 'terms_of_trade',
        term: 'Terms of Trade',
        definition: 'The rate at which one good can be exchanged for another in trade; must lie between both parties\' opportunity costs to be mutually beneficial.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.3'],
        subNotes: []
      },
      {
        id: 'demand',
        term: 'Demand',
        definition: 'The relationship between the price of a good or service and the quantity consumers are willing and able to purchase at various prices during a specific time period.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Demand represents willingness AND ability to pay',
          'Demand is always downward sloping (Law of Demand)',
          'Demand can shift due to non-price factors'
        ]
      },
      {
        id: 'law_of_demand',
        term: 'Law of Demand',
        definition: 'The principle that, as the price of a good or service increases, the quantity demanded will decrease, and vice versa.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Price and quantity demanded have an inverse relationship',
          'The demand curve always slopes downward from left to right',
          'Two main reasons for the law of demand: substitution effect and income effect',
        ]
      },
      {
        id: 'determinants-of-demand',
        term: 'Determinants of Demand',
        definition: 'Factors other than price that shift the demand curve.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Tastes and Preferences: Fidget spinners are no longer cool, so demand for them decreases.',
          'Income: As a country becomes more wealthy, demand for luxury goods increases.',
          'Prices of Related Goods: If Apple Music increases their price, demand for Spotify increases.',
          'Number of Buyers: If more people move to Miami, demand for apartments in Miami increases.',
          'Expectations: If people expect the price of gasoline to increase next week, they will buy more gasoline this week.'
        ]
      },
      {
        id: 'normal-good',
        term: 'Normal Good',
        definition: 'A good for which demand increases as consumer income rises, and demand decreases as consumer income falls (positive income elasticity).',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Examples include most goods: cars, electronics, clothing',
          'Has positive income elasticity of demand',
          'Demand curve shifts right when income increases',
          'Demand curve shifts left when income decreases'
        ]
      },
      {
        id: 'inferior-good',
        term: 'Inferior Good',
        definition: 'A good for which demand decreases as consumer income rises, and demand increases as consumer income falls (negative income elasticity).',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Examples include ramen noodles, used cars, public transportation',
          'Has negative income elasticity of demand',
          'Demand curve shifts left when income increases',
          'Demand curve shifts right when income decreases'
        ]
      },
      {
        id: 'substitutes',
        term: 'Substitutes',
        definition: 'Two goods for which an increase in the price of one leads to an increase in the demand for the other (positive cross-price elasticity).',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Examples: Coke and Pepsi, butter and margarine',
          'Have positive cross-price elasticity of demand',
          'Price increase of one shifts demand for the other right',
          'Consumers can easily switch between them'
        ]
      },
      {
        id: 'complements',
        term: 'Complements',
        definition: 'Two goods for which an increase in the price of one leads to a decrease in the demand for the other (negative cross-price elasticity). Goods often consumed together.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: [
          'Examples: peanut butter and jelly, cars and gasoline',
          'Have negative cross-price elasticity of demand',
          'Price increase of one shifts demand for the other left',
          'Goods are consumed together as a bundle'
        ]
      },
      {
        id: 'demand_curve',
        term: 'Demand Curve',
        definition: 'A downward-sloping graph showing the relationship between price and quantity demanded.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: []
      },
      {
        id: 'demand_schedule',
        term: 'Demand Schedule',
        definition: 'A table showing the inverse relationship between the price of a good and quantity demanded.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.4'],
        subNotes: []
      },
      {
        id: 'supply',
        term: 'Supply',
        definition: 'The relationship between the price of a good or service and the quantity producers are willing and able to sell at various prices during a specific time period, ceteris paribus.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: []
      },
      {
        id: 'law_of_supply',
        term: 'Law of Supply',
        definition: 'The principle that, as the price of a good or service increases, the quantity supplied will increase, and vice versa.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Price and quantity supplied have a direct relationship',
          'The supply curve always slopes upward',
          'Two main reasons for the law of supply: profit motive and opportunity cost',
        ]
      },
      {
        id: 'determinants-of-supply',
        term: 'Determinants of Supply',
        definition: 'Factors other than price that shift the supply curve.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Resource Prices: Higher input costs shift supply left',
          'Technology: Better technology shifts supply right',
          'Number of Sellers: More sellers shifts supply right',
          'Government Actions: Taxes shift supply left, subsidies shift right'
        ]
      },
      {
        id: 'resource-input-prices',
        term: 'Resource/Input Prices',
        definition: 'The cost of factors of production (land, labor, capital, entrepreneurship) used to produce goods and services. Changes in these costs shift the supply curve.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Higher input costs shift supply curve left (decrease supply)',
          'Lower input costs shift supply curve right (increase supply)',
          'Examples: If I produce wooden tables, and the price of wood increases, I can produce fewer tables with the same amount of money.',
        ]
      },
      {
        id: 'technology',
        term: 'Technology',
        definition: 'The methods, processes, and techniques used to produce goods and services. Improvements in technology can increase productivity and shift the supply curve.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Better technology shifts supply curve right (increase supply)',
          'Increases productivity and reduces production costs',
          'Examples: New improved fertilizer allows farmers to produce more crops with the same amount of land and labor.',
        ]
      },
      {
        id: 'prices-of-other-goods',
        term: 'Prices of Other Goods',
        definition: 'The prices of alternative goods that producers could produce instead. Changes in these prices can affect the supply of the current good.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Higher prices of alternatives shift supply left (decrease supply)',
          'Lower prices of alternatives shift supply right (increase supply)',
          'Producers switch to more profitable alternatives',
          'Examples: If the price of durian increase, farmers will produce more durian and less other fruits.'
        ]
      },
      {
        id: 'number-of-sellers',
        term: 'Number of Sellers',
        definition: 'The quantity of firms or producers in a market. Changes in the number of sellers directly affect the total supply in the market.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'More sellers shift supply curve right (increase supply)',
          'Fewer sellers shift supply curve left (decrease supply)',
          'Each seller contributes to total market supply',
          'Examples: new firms entering, existing firms exiting'
        ]
      },
      {
        id: 'expectations',
        term: 'Expectations',
        definition: 'Producers\' beliefs about future market conditions, including prices, costs, and demand. These expectations can influence current supply decisions.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Expected higher future prices shift supply left (decrease current supply)',
          'Expected lower future prices shift supply right (increase current supply)',
          'Producers may hold inventory or rush to sell',
          'Examples: If sellers of gold expect the price of gold to increase, they will sell less today and wait to sell more at the higher future price.'
        ]
      },
      {
        id: 'government-actions',
        term: 'Government Actions',
        definition: 'Policies and regulations implemented by government that affect production costs or incentives, including taxes, subsidies, regulations, and trade policies.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Taxes shift supply curve left (decrease supply)',
          'Subsidies shift supply curve right (increase supply)',
          'Regulations can increase costs and decrease supply',
          'Examples: excise taxes, production subsidies, environmental regulations'
        ]
      },
      {
        id: 'subsidy',
        term: 'Subsidy',
        definition: 'A government payment to producers (or consumers) that reduces production costs, encouraging increased supply.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: [
          'Shifts the supply curve to the right (increases supply)',
          'Lowers production costs for firms',
          'Example: Government gives subsidy to electric car company, allowing them to produce more electric cars at each price level'
        ]
      },
      {
        id: 'supply_curve',
        term: 'Supply Curve',
        definition: 'An upward-sloping graph showing the relationship between price and quantity supplied.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: []
      },
      {
        id: 'supply_schedule',
        term: 'Supply Schedule',
        definition: 'A table showing the direct relationship between the price of a good and quantity supplied.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.5'],
        subNotes: []
      },
      {
        id: 'market-equilibrium',
        term: 'Market Equilibrium',
        definition: 'The state where the quantity demanded equals the quantity supplied at a specific price.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: [
          'Occurs where demand and supply curves intersect',
          'No shortage or surplus at equilibrium',
          'Market automatically moves toward equilibrium'
        ]
      },
      {
        id: 'equilibrium-price',
        term: 'Equilibrium Price',
        definition: 'The price at which quantity demanded equals quantity supplied in a market. Also known as the market-clearing price (P* or Pe).',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: [
          'Occurs where demand and supply curves intersect'
        ]
      },
      {
        id: 'equilibrium-quantity',
        term: 'Equilibrium Quantity',
        definition: 'The quantity of a good or service bought and sold at the equilibrium price (Q* or Qe).',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: [
          'Occurs where demand and supply curves intersect'
        ]
      },
      {
        id: 'disequilibrium',
        term: 'Disequilibrium',
        definition: 'Any time the market price is not at equilibrium, causing a surplus or shortage.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: []
      },
      {
        id: 'surplus',
        term: 'Surplus',
        definition: 'A situation where the quantity supplied (Qs) exceeds the quantity demanded (Qd) at the current price (Qs > Qd). Occurs when the price is above equilibrium.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: [
          'Also called excess supply',
          'Creates downward pressure on price',
          'Some producers cannot sell their goods',
          'Market will adjust toward equilibrium'
        ]
      },
      {
        id: 'shortage',
        term: 'Shortage',
        definition: 'A situation where the quantity demanded (Qd) exceeds the quantity supplied (Qs) at the current price (Qd > Qs). Occurs when the price is below equilibrium.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: [
          'Also called excess demand',
          'Creates upward pressure on price',
          'Some consumers cannot buy the good',
          'Market will adjust toward equilibrium'
        ]
      },
      {
        id: 'indeterminate_change',
        term: 'Indeterminate Change',
        definition: 'Result of a double shift where the change in equilibrium price or quantity cannot be determined without knowing relative shift sizes.',
        subject: 'ap_macroeconomics',
        unit: 1,
        lessonIDs: ['1.6'],
        subNotes: []
      },
   
    // Lesson 2.1: The Circular Flow and GDP
  {
    id: 'economic-indicators',
    term: 'Economic Indicators',
    definition: 'Different measures that economists use to determine the overall size and health of an economy, similar to how a doctor uses health indicators to assess a patient.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'GDP',
      'GDP per capita',
      'Unemployment',
      'Inflation'
    ]
  },
  {
    id: 'circular-flow-model',
    term: 'Circular Flow Model',
    definition: 'A model showing the important interactions between different groups in an economy.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Depicts money and goods and services moving between households, firms, government, external sector, and financial sector.'
    ]
  },
  {
    id: 'households',
    term: 'Households',
    definition: 'Individuals or groups who own the factors of production.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: []
  },
  {
    id: 'firms',
    term: 'Firms',
    definition: 'Businesses or producers.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: []
  },
  {
    id: 'product-market',
    term: 'Product Market',
    definition: 'Anywhere households and firms interact, where households give money in exchange for goods and services.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Example: Going to a grocery store to buy food or a restaurant to buy a meal.'
    ]
  },
  {
    id: 'factor-market',
    term: 'Factor Market',
    definition: 'Anywhere that firms acquire resources, such as labor, from households.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Example: A worker getting hired as a chef at a restaurant.'
    ]
  },
  {
    id: 'injections',
    term: 'Injections',
    definition: 'Money that was not previously flowing through the economy being added into the circular flow.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Examples: Government spending, investment, exports'
    ]
  },
  {
    id: 'leakages',
    term: 'Leakages',
    definition: 'Money leaving the circular flow of the economy.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Examples: Taxes, savings, imports'
    ]
  },
  {
    id: 'gdp',
    term: 'Gross Domestic Product (GDP)',
    definition: 'The total monetary value of all final goods and services produced within a country’s borders in a given year.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Definition should be memorized because every word matters'
    ]
  },
  {
    id: 'intermediate-good',
    term: 'Intermediate Good',
    definition: 'A good used to help produce something else and not counted toward GDP to avoid double-counting.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Example: Flour used to bake a cake'
    ]
  },
  {
    id: 'expenditure-approach',
    term: 'Expenditure Approach',
    definition: 'Calculating GDP by adding up all spending by households, businesses, government, and the external sector.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Formula: GDP = C + I + G + NX'
    ]
  },
  {
    id: 'consumption-c',
    term: 'Consumption (C)',
    definition: 'All household spending in an economy.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Includes durable goods (cars, appliances), non-durable goods (food, clothing), and services (healthcare, education)', 
      'Some large consumer purchases (cars, houses) are interest-senssitive, meaning when interest rates decrease, consumption increases'
    ]
  },
  {
    id: 'investment-i',
    term: 'Investment (I)',
    definition: 'Business spending on capital goods like machines',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: ['Investment is interest-sensitive, meaning when interest rates decrease, investment increases', 'Careful: Investment is NOT stock purchases']
  },
  {
    id: 'government-spending-g',
    term: 'Government Spending (G)',
    definition: 'Government spending on goods and services, excluding transfer payments.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Examples: Military, new roads'
    ]
  },
  {
    id: 'gov-transfer-payments',
    term: 'Government Transfer Payments',
    definition: 'Money the government gives without receiving a good or service in return, not counted in GDP.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Example: Unemployment benefits'
    ]
  },
  {
    id: 'net-exports-nx',
    term: 'Net Exports (NX)',
    definition: 'Exports minus imports.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Imports are subtracted to avoid counting foreign production in GDP.'
    ]
  },
  
  {
    id: 'income-approach',
    term: 'Income Approach',
    definition: 'Calculating GDP by adding up all income earned in production.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Formula: GDP = W + I + R + P (Wages + Interest + Rent + Profit)'
    ]
  },
  {
    id: 'equivalence-of-approaches',
    term: 'Equivalence of Approaches',
    definition: 'Expenditure and income approaches should give the same GDP because every dollar spent becomes income for someone else.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    subNotes: [
      'Example: When you buy a $10 pizza (expenditure approach: C = $10), that $10 becomes income for the pizza shop owner (income approach: wages, rent, profit = $10). Both approaches count the same $10 transaction.'
    ]
  },

  // Lesson 2.2: Limitations of GDP
  {
    id: 'gdp-per-capita',
    term: 'GDP per capita',
    definition: 'GDP divided by population, giving a better measure of individual economic well-being than total GDP.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'Formula: GDP per capita = GDP / Population'
    ]
  },
  {
    id: 'limitations-of-gdp',
    term: 'Limitations of GDP',
    definition: 'Shortcomings of GDP as a measure of economic well-being and quality of life.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'Population: GDP doesn\'t account for population size (Luxembourg has a much smaller GDP than India due to its size, but a much higher standard of living)',
      'Inequality: GDP doesn\'t show how income and wealth are distributed among the population',
      'Environment: GDP doesn\'t account for environmental degradation or depletion of natural resources',
      'Shadow Economy: GDP doesn\'t include illegal activities and unreported income from the underground economy'
    ]
  },
  {
    id: 'gdp-excludes-non-market-underground',
    term: 'GDP Excludes Non-Market and Underground Activities',
    definition: 'GDP only counts goods and services that are bought and sold in official markets, overlooking unpaid work and illegal transactions.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'GDP overlooks unpaid work like household chores, caregiving, and volunteerism',
      'GDP does not include "off-the-books" or illegal transactions that occur in the underground economy',
      'Example: A parent caring for their child at home is not counted in GDP, but hiring a nanny would be counted'
    ]
  },
  {
    id: 'gdp-ignores-negative-externalities',
    term: 'GDP Ignores Negative Externalities',
    definition: 'GDP does not subtract the costs of negative consequences like pollution or environmental degradation from its calculation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'Economic growth measured by GDP can include costs that harm society and the environment',
      'Examples: Pollution from factories, depletion of natural resources, environmental damage from production'
    ]
  },
  {
    id: 'gdp-fails-to-account-for-inequality',
    term: 'GDP Fails to Account for Income Inequality',
    definition: 'GDP doesn\'t show how wealth is distributed within a country, potentially masking significant income inequality.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'A high GDP can mask significant income inequality, where a small portion of the population holds most of the wealth',
      'Example: A country with high GDP but where most people live in poverty still appears economically successful'
    ]
  },
  {
    id: 'gdp-doesnt-measure-quality-of-life',
    term: 'GDP Doesn\'t Measure Quality of Life or Well-Being',
    definition: 'GDP is a poor indicator of a nation\'s overall well-being because it doesn\'t measure important non-economic factors.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'GDP doesn\'t measure factors like health, education, life expectancy, leisure time, or social and political freedom',
      'Example: A country with high GDP but poor healthcare and education systems may have lower overall well-being'
    ]
  },
  {
    id: 'gdp-includes-unproductive-expenditures',
    term: 'GDP Includes Unproductive Expenditures',
    definition: 'GDP counts spending on negative events as a positive economic gain, treating them as if they are wealth-creating activities.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'Spending on disaster recovery, crime prevention, or even the costs of war are included in GDP',
      'Example: Rebuilding after a hurricane increases GDP, even though the destruction itself was harmful to society'
    ]
  },
  {
    id: 'gdp-misrepresents-technology-depreciation',
    term: 'GDP Misrepresents Progress Due to Technology and Depreciation',
    definition: 'GDP doesn\'t always accurately account for improvements in product quality or efficiency, and treats replacement of depreciated capital the same as new capital creation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.2'],
    subNotes: [
      'GDP doesn\'t account for improvements in product quality or efficiency driven by technology',
      'GDP counts the replacement of depreciated capital (e.g., a worn-out machine) the same as the creation of new capital, failing to reflect net investment',
      'Example: Replacing a broken computer with an identical model counts the same as upgrading to a much better computer'
    ]
  },

  // Lesson 2.3: Unemployment
  {
    id: 'unemployed',
    term: 'Unemployed',
    definition: 'A person actively looking for a job but unable to find one.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Careful: Just because you don\'t have a job doesn\'t mean you are unemployed (discouraged workers, retired people, children).'
    ]
  },
  {
    id: 'frictional-unemployment',
    term: 'Frictional Unemployment',
    definition: 'Temporary unemployment between jobs.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Examples: A recent college graduate searching for their first job, a worker who quit their job to find a better one, someone moving to a new city and looking for work'
    ]
  },
  {
    id: 'structural-unemployment',
    term: 'Structural Unemployment',
    definition: 'Unemployment caused by changes in the economy that make some skills obsolete.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Examples: A coal miner whose job was eliminated due to the shift to renewable energy, a factory worker whose job was replaced by automation, a typewriter repair person after computers became widespread'
    ]
  },
  {
    id: 'cyclical-unemployment',
    term: 'Cyclical Unemployment',
    definition: 'Unemployment caused by a recession.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Examples: A construction worker laid off during an economic downturn, a retail employee whose store closed due to reduced consumer spending, a factory worker who lost their job when the company reduced production during a recession'
    ]
  },
  {
    id: 'natural-rate-unemployment',
    term: 'Natural Rate of Unemployment',
    definition: 'The unemployment rate when the economy is healthy; includes frictional and structural unemployment.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: []
  },
  {
    id: 'labor-force',
    term: 'Labor Force',
    definition: 'All employed and unemployed people available to work.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Formula: Labor Force = Employed + Unemployed'
    ]
  },
  {
    id: 'unemployment-rate',
    term: 'Unemployment Rate',
    definition: 'Percentage of the labor force that is unemployed.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Formula: (Number of Unemployed / Labor Force) × 100',
      'Shortcoming: An increase in discouraged workers causes a decrease in the unemployment rate, which is a shortcoming of the unemployment rate as an economic indicator.'
    ]
  },
  {
    id: 'labor-force-participation',
    term: 'Labor Force Participation Rate',
    definition: 'Percentage of the working-age population that is part of the labor force.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'Formula: (Labor Force / Working-Age Population) × 100'
    ]
  },
  {
    id: 'discouraged-workers',
    term: 'Discouraged Workers',
    definition: 'People who have stopped looking for work after being unemployed for a long time; not counted in the unemployment rate.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    subNotes: [
      'An increase in discouraged workers causes a decrease in the unemployment rate (because they are no longer counted as unemployed or in the labor force).'
    ]
  },

  // Lesson 2.4: Price Indices and Inflation
  {
    id: 'inflation',
    term: 'Inflation',
    definition: 'A sustained increase in the general price level, reducing purchasing power.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'deflation',
    term: 'Deflation',
    definition: 'A sustained decrease in the general price level; can signal a weak economy.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'disinflation',
    term: 'Disinflation',
    definition: 'A decrease in the rate of inflation; prices still rise but more slowly.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'price-index',
    term: 'Price Index',
    definition: 'A measure tracking average price changes for a set of goods.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'cpi',
    term: 'Consumer Price Index (CPI)',
    definition: 'The most widely used price index, based on the cost of a fixed market basket of goods.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'market-basket',
    term: 'Market Basket',
    definition: 'A hypothetical collection of goods and services used to track price changes for CPI.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'cpi-calculation',
    term: 'Calculating CPI',
    definition: 'Formula for determining the Consumer Price Index.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: [
      'Formula: (Cost of Market Basket in Current Year / Cost in Base Year) × 100'
    ]
  },
  {
    id: 'inflation-rate-calculation',
    term: 'Calculating Inflation Rate',
    definition: 'Formula for determining the percentage change in CPI.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: [
      'Formula: ((New CPI – Old CPI) / Old CPI) × 100'
    ]
  },
  {
    id: 'substitution-bias',
    term: 'Substitution Bias',
    definition: 'Limitation of CPI where fixed basket ignores consumer substitution, overstating cost of living increases.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },
  {
    id: 'quality-bias',
    term: 'Quality Bias',
    definition: 'Limitation of CPI where price changes from quality improvements are counted as inflation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.4'],
    subNotes: []
  },

  // Lesson 2.5: Costs of Inflation
  {
    id: 'nominal-variable',
    term: 'Nominal Variable',
    definition: 'A value measured in current dollars, not adjusted for inflation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: [
      'Example: Nominal wage, nominal GDP, nominal interest rate'
    ]
  },
  {
    id: 'real-variable',
    term: 'Real Variable',
    definition: 'A value adjusted for inflation, reflecting actual purchasing power.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: [
      'Example: Real wage, real GDP, real interest rate'
    ]
  },
  {
    id: 'nominal-interest-rate',
    term: 'Nominal Interest Rate',
    definition: 'The stated interest rate on a loan, not adjusted for inflation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: []
  },
  {
    id: 'real-interest-rate',
    term: 'Real Interest Rate',
    definition: 'The nominal interest rate minus the inflation rate, showing the true change in purchasing power.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: [
      'Formula: Real Interest Rate = Nominal Interest Rate – Inflation Rate'
    ]
  },
  {
    id: 'purchasing-power',
    term: 'Purchasing Power',
    definition: 'The quantity of goods and services money can buy; reduced by unexpected inflation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: []
  },
  
  {
    id: 'menu-costs',
    term: 'Menu Costs',
    definition: 'Costs to businesses from changing prices during inflation.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: [
      'Example: Printing new menus'
    ]
  },
  {
    id: 'substitution-bias',
    term: 'Substitution Bias',
    definition: 'A limitation of the Consumer Price Index (CPI) that occurs because consumers substitute away from goods that become relatively more expensive.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    subNotes: [
      'CPI uses a fixed basket of goods, but consumers actually change their spending patterns when prices change',
      'Example: If the price of beef increases, consumers may buy more chicken instead, but CPI still weights beef the same as before'
    ]
  },

  // Lesson 2.6: Real vs. Nominal GDP
  {
    id: 'nominal-gdp',
    term: 'Nominal GDP',
    definition: 'The value of output measured in current prices.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.6'],
    subNotes: [
      'Formula: Nominal GDP = Real GDP × (GDP Deflator / 100)'
    ]
  },
  {
    id: 'real-gdp',
    term: 'Real GDP',
    definition: 'The value of output measured in constant prices from a base year.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.6'],
    subNotes: [
      'Formula: Real GDP = (Nominal GDP / GDP Deflator) × 100', 
      'When calculating real GDP using a table of goods and services, you can multiply the quantity of each good by the price of the good in the base year to get the real GDP.'
    ]
  },
  {
    id: 'gdp-deflator',
    term: 'GDP Deflator',
    definition: 'A price index measuring price changes for all goods and services in the economy.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.6'],
    subNotes: [
      'Formula: GDP Deflator = (Nominal GDP / Real GDP) × 100',
      'A broader measure than CPI because it includes all goods and services in the economy, not just a fixed basket of consumer goods.'
    ]
  },

  // Lesson 2.7: Business Cycles
  {
    id: 'business-cycle',
    term: 'Business Cycle',
    definition: 'Short-run fluctuations in economic activity, alternating between growth and decline.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'potential-output',
    term: 'Potential Output',
    definition: 'GDP level when the economy is at full employment; long-run growth trend.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'actual-output',
    term: 'Actual Output',
    definition: 'The GDP actually produced at a given time.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'expansion',
    term: 'Expansion',
    definition: 'Period of rising output, falling unemployment, and economic growth.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'peak',
    term: 'Peak',
    definition: 'The highest point of an expansion, right before the economy begins to turn down.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'recession_contraction',
    term: 'Recession (Contraction)',
    definition: 'A period when actual output is falling, the economy is shrinking, and unemployment is going up.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'trough',
    term: 'Trough',
    definition: 'The lowest point of a recession, right before things start to get better and a new expansion begins.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'output_gap',
    term: 'Output Gap',
    definition: 'The space between the potential output line and the actual output line, which tells us a lot about the health of the economy.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: []
  },
  {
    id: 'recessionary_gap',
    term: 'Recessionary Gap',
    definition: 'When actual output is below potential output and the unemployment rate is higher than the natural rate.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: [
      'Actual output is below potential output',
      'Actual unemployment rate is higher than the natural rate.'
    ]
  },
  {
    id: 'inflationary_gap',
    term: 'Inflationary Gap',
    definition: 'When actual output is above potential output, causing the economy to "overheat," and the unemployment rate is lower than the natural rate.',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    subNotes: [
      'Actual output is above potential output',
      'Actual unemployment rate is lower than the natural rate.'
    ]
  },
    // Lesson 3.1: Aggregate Demand
    {
      id: 'aggregate',
      term: 'Aggregate',
      definition: 'A word that simply means "total" or "combined." In this unit, it means we are looking at the demand for all goods and services in an entire economy, not just one product.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: []
    },
    {
      id: 'price-level',
      term: 'Price Level',
      definition: 'The overall or average level of prices in an economy. It is represented on the vertical axis of the AD-AS graph.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: []
    },
    {
      id: 'aggregate-demand',
      term: 'Aggregate Demand (AD)',
      definition: 'The total demand for all goods and services in an economy. The AD curve shows the amount of goods and services that households, businesses, the government, and foreign customers are willing to buy at different price levels.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: []
    },
    {
      id: 'inverse-relationship-price-ad',
      term: 'Inverse Relationship between Price Level and AD',
      definition: 'The AD curve is downward sloping because as the price level goes down, the quantity of real GDP demanded goes up, and vice versa.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'This inverse relationship is explained by three effects: the Real Wealth Effect, the Interest Rate Effect, and the Net Export Effect'
      ]
    },
    {
      id: 'real-wealth-effect',
      term: 'Real Wealth Effect',
      definition: 'When the price level falls, the money you have is more valuable, making you feel wealthier and causing you to spend more.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'Example: If you have $1000 in savings and the price level falls by 10%, your $1000 can now buy more goods and services, making you feel wealthier. This increased purchasing power encourages you to spend more, increasing aggregate demand.'
      ]
    },
    {
      id: 'interest-rate-effect',
      term: 'Interest Rate Effect',
      definition: 'When the price level falls, people save more, which drives down interest rates and makes it cheaper for businesses to borrow and invest.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'Example: When prices fall, people need less money for transactions, so they save more. This increased supply of loanable funds lowers interest rates. Lower interest rates make it cheaper for businesses to borrow money for investment projects, increasing aggregate demand.'
      ]
    },
    {
      id: 'net-export-effect',
      term: 'Net Export Effect',
      definition: 'When a country\'s price level falls, its goods become cheaper compared to foreign goods, which causes its net exports to go up.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'Example: If the U.S. price level falls while prices in other countries stay the same, American goods become relatively cheaper. Foreign consumers will buy more American products, and American consumers will buy fewer foreign products, increasing U.S. net exports and aggregate demand.'
      ]
    },
    {
      id: 'shifters-of-ad',
      term: 'Shifters of Aggregate Demand',
      definition: 'The entire AD curve will shift when there is a change in one of the components of GDP that is not caused by a change in the price level.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'Changes in Consumption (C): Caused by factors like consumer confidence. If fears of a recession cause consumers to lose confidence, they spend less, shifting AD to the left.',
        'Changes in Investment (I): Caused by factors like business confidence. If businesses lose confidence, they invest less, shifting AD to the left.',
        'Changes in Government Spending (G): Caused by direct government action. If the government passes a new spending bill, G increases, shifting AD to the right.',
        'Changes in Net Exports (NX): Caused by factors like the economic health of trading partners. If a key trading partner falls into a recession, they will buy fewer of our goods, causing our net exports to fall and shifting AD to the left.'
      ]
    },
  
    // Lesson 3.2: Multipliers
    {
      id: 'multiplier-effect',
      term: 'Multiplier Effect',
      definition: 'The ripple effect in which an initial change in spending leads to a larger total change in GDP.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: ['The size of the multiplier is determined by the marginal propensity to consume (MPC) and the marginal propensity to save (MPS)']
    },
    {
      id: 'mpc',
      term: 'Marginal Propensity to Consume (MPC)',
      definition: 'The fraction of any extra income that a household spends.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Example: If you get a $100 bonus and spend $80, your MPC is 0.8.'
      ]
    },
    {
      id: 'mps',
      term: 'Marginal Propensity to Save (MPS)',
      definition: 'The fraction of any extra income that a household saves.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Example: If you spend $80 of a $100 bonus, you save $20, so your MPS is 0.2.'
      ]
    },
    {
      id: 'spending-multiplier',
      term: 'Spending Multiplier',
      definition: 'A value that tells us the total change in GDP that will result from an initial change in spending.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Formula: 1 / MPS'
      ]
    },
    {
      id: 'tax-multiplier',
      term: 'Tax Multiplier',
      definition: 'The multiplier that applies to a change in taxes.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Formula: -MPC / MPS', 
        'Note: The negative sign indicates that a decrease in taxes will increase GDP, and an increase in taxes will decrease GDP.',
        'Easy trick: tax multiplier is always one less than the spending multiplier'
      ]
    },
    {
      id: 'calculating-max-gdp-change',
      term: 'Calculating Maximum GDP Change',
      definition: 'Using a multiplier to find the total potential change in GDP.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'For spending: Initial Change in Spending × Spending Multiplier',
        'For taxes: Initial Change in Taxes × Tax Multiplier'
      ]
    },
  
    // Lesson 3.3: Short-Run Aggregate Supply
    {
      id: 'sras',
      term: 'Short-Run Aggregate Supply (SRAS)',
      definition: 'Shows the direct relationship between the overall price level and the quantity of output that firms produce in the short run.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.3'],
      subNotes: ['It is upward-sloping due to sticky wages']
    },
    {
      id: 'sticky-wages',
      term: 'Sticky Wages',
      definition: 'The main reason the SRAS curve slopes upward. In the short run, wages don’t change quickly, often due to contracts.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.3'],
      subNotes: [
        'If I produce and sell wooden tables and the price of my tables rises while my workers wages remain "stuck," my profits go up, creating an incentive to produce more.'
      ]
    },
    {
      id: 'shifters-of-sras',
      term: 'Shifters of SRAS',
      definition: 'Non-price factors that cause the entire SRAS curve to shift, typically related to widespread changes in the costs of production.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.3'],
      subNotes: [
        'Changes in resource prices (e.g., a nationwide increase in wages or oil prices)',
        'Changes in government policy (e.g., business taxes or subsidies)',
        'Widespread changes in technology and productivity',
        'Changes in producers’ expectations about future prices'
      ]
    },
  
    // Lesson 3.4: Long-Run Aggregate Supply
    {
      id: 'lras',
      term: 'Long-Run Aggregate Supply (LRAS)',
      definition: 'Shows the total amount of production possible for an economy when it’s using all of its resources efficiently.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.4'],
      subNotes: [
        'It is a vertical line at the economy’s full-employment output level (Yf).',
        'This means there is no relationship between the price level and the quantity of output that firms produce in the long run.'
      ]
    },
    {
      id: 'full-employment-output',
      term: 'Full-Employment Output (Yf)',
      definition: 'The level of output an economy can produce when it is using all of its resources efficiently; also known as potential output.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.4'],
      subNotes: []
    },
    {
      id: 'factors-of-production-macro',
      term: 'Factors of Production',
      definition: 'The resources that determine a country’s potential output and the position of the LRAS curve.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.4'],
      subNotes: [
        'Includes resources like land, labor, and capital, as well as the level of technology.'
      ]
    },
    {
      id: 'shifters-of-lras',
      term: 'Shifters of LRAS',
      definition: 'Factors that change a country’s productive capacity, which shifts the entire LRAS curve.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.4'],
      subNotes: [
        'An increase in the capital stock or human capital causes a rightward shift',
        'Discovery of new natural resources causes a rightward shift',
        'A decrease in the workforce or destruction of infrastructure causes a leftward shift'
      ]
    },
  
    // Lesson 3.5: Equilibrium in the AD-AS Model
    {
      id: 'short-run-equilibrium',
      term: 'Short-Run Equilibrium',
      definition: 'Occurs where the AD curve and the SRAS curve intersect. An economy will always be in a state of short-run equilibrium.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.5'],
      subNotes: []
    },
    {
      id: 'long-run-equilibrium',
      term: 'Long-Run Equilibrium',
      definition: 'A special case where the AD, SRAS, and LRAS curves all intersect at the same point, meaning current output is equal to the country’s potential output.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.5'],
      subNotes: []
    },
    {
      id: 'recessionary-gap',
      term: 'Recessionary Gap',
      definition: 'Occurs when the short-run equilibrium is to the left of the LRAS curve.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.5'],
      subNotes: [
        'Actual output is less than potential output',
        'Unemployment rate is greater than the natural rate'
      ]
    },
    {
      id: 'inflationary-gap',
      term: 'Inflationary Gap',
      definition: 'Occurs when the short-run equilibrium is to the right of the LRAS curve.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.5'],
      subNotes: [
        'Actual output is greater than potential output',
        'Unemployment rate is less than the natural rate'
      ]
    },
  
    // Lesson 3.6: Changes in the AD-AS Model
    {
      id: 'negative-supply-shock',
      term: 'Negative Supply Shock',
      definition: 'A sudden event that makes production more difficult or expensive across the economy, such as a sharp rise in the price of oil. It shifts the SRAS curve to the left.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: [
        'Results in a decrease in output, an increase in the price level, and an increase in unemployment'
      ]
    },
    {
      id: 'positive-supply-shock',
      term: 'Positive Supply Shock',
      definition: 'A sudden event that makes production easier or cheaper, such as a major technological breakthrough. It shifts the SRAS curve to the right.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: ['Results in an increase in output, a decrease in the price level, and a decrease in unemployment' ]
    },
    {
      id: 'stagflation',
      term: 'Stagflation',
      definition: 'A situation, often caused by a negative supply shock, where the economy experiences both higher unemployment and a higher price level.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: []
    },
    {
      id: 'demand-pull-inflation',
      term: 'Demand-Pull Inflation',
      definition: 'A rise in the price level caused by an increase in aggregate demand.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: [
        'Can be thought of as "too much money chasing too few goods."'
      ]
    },
    {
      id: 'cost-push-inflation',
      term: 'Cost-Push Inflation',
      definition: 'A rise in the price level caused by a decrease in short-run aggregate supply, often due to higher input costs.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: []
    },
  
    // Lesson 3.7: Long-Run Self-Adjustment
    {
      id: 'long-run-self-adjustment',
      term: 'Long-Run Self-Adjustment',
      definition: 'The process through which an economy gets out of an output gap and back to long-run equilibrium on its own, without government action.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Driven by changes in resource prices, like wages, which shift the SRAS curve.'
      ]
    },
    {
      id: 'self-adjustment-recessionary',
      term: 'Self-Adjustment from a Recessionary Gap',
      definition: 'The process by which an economy naturally returns to long-run equilibrium from a recessionary gap.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'High unemployment causes nominal wages to fall',
        'Lower wages shift the SRAS curve to the right',
        'Economy returns to full-employment output at a lower price level'
      ]
    },
    {
      id: 'self-adjustment-inflationary',
      term: 'Self-Adjustment from an Inflationary Gap',
      definition: 'The process by which an economy naturally returns to long-run equilibrium from an inflationary gap.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Low unemployment causes wages to rise',
        'Higher wages shift the SRAS curve to the left',
        'Economy returns to full-employment output at a higher price level'
      ]
    },
    {
      id: 'long-run-impact-self-adjustment',
      term: 'Long-Run Impact of Self-Adjustment',
      definition: 'The final outcome for an economy after it moves into an output gap and then self-adjusts.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'In the long run, output returns to full-employment level',
        'Price level changes to bring the economy back to equilibrium'
      ]
    },
  
    // Lesson 3.8: Fiscal Policy
    {
      id: 'fiscal-policy',
      term: 'Fiscal Policy',
      definition: 'The government’s use of spending and taxation to influence the economy.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.8'],
      subNotes: [
        'Action taken by the federal government',
        'Directly affects aggregate demand'
      ]
    },
    {
      id: 'expansionary-fiscal-policy',
      term: 'Expansionary Fiscal Policy',
      definition: 'Policy used to stimulate the economy during a recessionary gap by increasing spending or decreasing taxes.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.8'],
      subNotes: [
        'Shifts aggregate demand to the right',
        'Increases the price level',
        'Increases real GDP',
        'Decreases unemployment'
      ]
    },
    {
      id: 'contractionary-fiscal-policy',
      term: 'Contractionary Fiscal Policy',
      definition: 'Policy used to slow the economy during an inflationary gap by decreasing spending or increasing taxes.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.8'],
      subNotes: [
        'Shifts aggregate demand to the left',
        'Decreases the price level',
        'Decreases real GDP',
        'Increases unemployment'
      ]
    },
  
    // Lesson 3.9: Automatic Stabilizers
    {
      id: 'discretionary-fiscal-policy',
      term: 'Discretionary Fiscal Policy',
      definition: 'When lawmakers make explicit, deliberate changes to spending and taxes.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.9'],
      subNotes: []
    },
    {
      id: 'automatic-stabilizers',
      term: 'Automatic Stabilizers',
      definition: 'Features of the tax and spending system that work to stabilize the economy automatically, without any new action from lawmakers.',
      subject: 'ap_macroeconomics',
      unit: 3,
      lessonIDs: ['3.9'],
      subNotes: [
        'Common examples include unemployment benefits and the income tax system'
      ]
    }, 

    {
        id: 'financial_asset',
        term: 'Financial Asset',
        definition: 'Something that holds financial value, such as stocks, bonds, gold, or real estate.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.1'],
        subNotes: []
      },
      {
        id: 'bond',
        term: 'Bond',
        definition: 'An investment that pays interest over time. Buying a government or corporate bond is essentially lending money to that entity.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.1'],
        subNotes: []
      },
      {
        id: 'stock',
        term: 'Stock',
        definition: 'A financial asset that represents a share of ownership in a company.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.1'],
        subNotes: []
      },
      {
        id: 'certificate_of_deposit',
        term: 'Certificate of Deposit (CD)',
        definition: 'An interest-bearing savings account that holds a fixed amount of money for a fixed period, such as six months or a year. Part of the M2 money supply.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.1'],
        subNotes: []
      },
      {
        id: 'liquidity',
        term: 'Liquidity',
        definition: 'How easily an asset can be converted into cash without much loss of value.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.1'],
        subNotes: [
          'Cash is the most liquid asset; a house is the least liquid.'
        ]
      },
      {
        id: 'interest_rate_bond_price_relationship',
        term: 'Inverse Relationship between Interest Rates and Bond Prices',
        definition: 'When current interest rates go up, the price of previously issued bonds with lower interest rates goes down.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.1'],
        subNotes: [
          'Example: If new $100 bonds pay 5% interest, an old $100 bond paying 3% must be sold for less than $100 to compete.'
        ]
      },
      {
        id: 'interest',
        term: 'Interest',
        definition: 'The cost of borrowing money.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.2'],
        subNotes: []
      },
      {
        id: 'nominal_interest_rate',
        term: 'Nominal Interest Rate',
        definition: 'The interest rate stated on a loan, as a percentage of the amount borrowed.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.2'],
        subNotes: []
      },
      {
        id: 'real_interest_rate',
        term: 'Real Interest Rate',
        definition: 'The nominal interest rate adjusted for inflation, showing the true gain in purchasing power for a lender.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.2'],
        subNotes: [
          'Formula: Real Interest Rate = Nominal Interest Rate - Inflation Rate'
        ]
      },
      {
        id: 'expected_vs_actual_inflation',
        term: 'Expected vs. Actual Inflation',
        definition: 'Differences between expected and actual inflation create winners and losers.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.2'],
        subNotes: [
          'If actual inflation is lower than expected, lenders win and borrowers lose.',
          'If actual inflation is higher than expected, borrowers win and lenders lose.'
        ]
      },
      {
        id: 'functions_of_money',
        term: 'The Three Functions of Money',
        definition: 'To be considered money, something must serve as a medium of exchange, store of value, and unit of account.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.3'],
        subNotes: [
          'Money must fulfill all three functions: Medium of Exchange, Store of Value, and Unit of Account'
        ]
      },
      {
        id: 'medium-of-exchange',
        term: 'Medium of Exchange',
        definition: 'A function of money where it is used to buy goods and services, avoiding the need for barter.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.3'],
        subNotes: [
          'Example: Instead of trading 5 chickens for a pair of shoes (barter), you can use money (dollars) to buy the shoes directly. This makes transactions much easier and more efficient.'
        ]
      },
      {
        id: 'store-of-value',
        term: 'Store of Value',
        definition: 'A function of money where it holds wealth over time without expiring or losing its value.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.3'],
        subNotes: [
          'Example: You can save $100 today and use it to buy goods and services in the future. Unlike perishable goods like food, money doesn\'t spoil or expire, allowing you to preserve your purchasing power over time.'
        ]
      },
      {
        id: 'unit-of-account',
        term: 'Unit of Account',
        definition: 'A function of money where it serves as a standard measure for pricing goods and services.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.3'],
        subNotes: [
          'Example: Prices are expressed in dollars (e.g., a pizza costs $12, a movie ticket costs $15). This allows easy comparison of values - you can quickly see that the movie ticket is more expensive than the pizza, without needing to know how many pizzas equal one movie ticket.'
        ]
      },
      {
        id: 'money_supply',
        term: 'Money Supply',
        definition: 'The total amount of money circulating in an economy, measured in categories based on liquidity.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.3'],
        subNotes: [
          'M1: Most liquid assets (cash and checking deposits).',
          'M2: M1 plus savings accounts, money market accounts, and CDs.',
          'Bonds are not part of the money supply.'
        ]
      },
      {
        id: 'monetary_base',
        term: 'Monetary Base',
        definition: 'All physical currency in circulation plus the reserves banks hold.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.3'],
        subNotes: []
      },
      {
        id: 'demand_deposit',
        term: 'Demand Deposit',
        definition: 'Money deposited in a bank account that can be withdrawn on demand.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: []
      },
      {
        id: 'asset-banking',
        term: 'Asset (Banking)',
        definition: 'Something a bank is owed or owns; money that will come to the bank.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: [
          'Examples: Loans made to customers (the bank is owed repayment), reserves held at the bank, securities owned by the bank'
        ]
      },
      {
        id: 'liability-banking',
        term: 'Liability (Banking)',
        definition: 'Something a bank owes to others; money the bank must pay out.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: [
          'Examples: Customer deposits (the bank owes customers their money back when they withdraw), money the bank has borrowed'
        ]
      },
      {
        id: 'required_reserve_ratio',
        term: 'Required Reserve Ratio (RRR)',
        definition: 'The fraction of deposits banks are required to keep in reserve.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: []
      },
      {
        id: 'required_reserves',
        term: 'Required Reserves',
        definition: 'The dollar amount of deposits a bank must hold and cannot lend out.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: []
      },
      {
        id: 'excess_reserves',
        term: 'Excess Reserves',
        definition: 'Reserves held by a bank beyond the required amount; can be lent out.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: []
      },
      {
        id: 'fractional_reserve_banking',
        term: 'Fractional Reserve Banking System',
        definition: 'A banking system where banks keep only a fraction of deposits in reserve and lend out the rest.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: []
      },
      {
        id: 'money_multiplier',
        term: 'Money Multiplier',
        definition: 'Shows the maximum potential expansion of the money supply from an initial deposit.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: [
          'Formula: Money Multiplier = 1 / Required Reserve Ratio'
        ]
      },
      {
        id: 'max_money_expansion',
        term: 'Maximum Potential Expansion of the Money Supply',
        definition: 'The total possible increase in the money supply from an initial deposit.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.4'],
        subNotes: [
          'Formula: Maximum Expansion = Initial Excess Reserves x Money Multiplier'
        ]
      },
      {
        id: 'money_market',
        term: 'Money Market',
        definition: 'Graph showing the relationship between the supply of money and the demand for money, determining the equilibrium nominal interest rate.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.5'],
        subNotes: []
      },
      {
        id: 'money_demand',
        term: 'Money Demand',
        definition: 'Shows the inverse relationship between the nominal interest rate and the quantity of money people want to hold in M1 forms.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.5'],
        subNotes: [
          'Shifters: Changes in price level and changes in real GDP/income.'
        ]
      },
      {
        id: 'money_supply_mm',
        term: 'Money Supply (in the Money Market)',
        definition: 'A fixed quantity of money at a given time; shown as a vertical line in the money market.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.5'],
        subNotes: []
      },
      {
        id: 'equilibrium_nominal_interest_rate',
        term: 'Equilibrium Nominal Interest Rate',
        definition: 'The nominal interest rate where money supply and money demand intersect.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.5'],
        subNotes: []
      },
      {
        id: 'central_bank',
        term: 'Central Bank',
        definition: 'A country’s “bank for banks.” In the U.S., this is the Federal Reserve, which conducts monetary policy.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: []
      },
      {
        id: 'commercial_bank',
        term: 'Commercial Bank',
        definition: 'A bank where individuals and businesses can deposit money, such as Citibank. Can borrow from the central bank.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: []
      },
      {
        id: 'monetary_policy',
        term: 'Monetary Policy',
        definition: 'Actions taken by the central bank to manage the money supply and influence economic outcomes.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: []
      },
      {
        id: 'expansionary_monetary_policy',
        term: 'Expansionary Monetary Policy',
        definition: 'Increases the money supply to lower interest rates, encouraging consumption and investment during a recessionary gap.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: []
      },
      {
        id: 'contractionary_monetary_policy',
        term: 'Contractionary Monetary Policy',
        definition: 'Decreases the money supply to raise interest rates, reducing consumption and investment during an inflationary gap.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: []
      },
      {
        id: 'tools_of_monetary_policy',
        term: 'Tools of Monetary Policy',
        definition: 'The main ways a central bank changes the money supply: Required Reserve Ratio, Discount Rate, and Open Market Operations.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: [
          'Lower RRR → expands money supply; raise RRR → contracts it.',
          'Lower discount rate → expands; raise discount rate → contracts.',
          'OMO: Buy bonds → expands; Sell bonds → contracts.'
        ]
      },
      {
        id: 'monetary_policy_adas',
        term: 'Monetary Policy and the AD-AS Model',
        definition: 'Monetary policy affects AD through changes in the money supply, interest rates, and investment/consumption.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.6'],
        subNotes: [
          'Change in money supply → change in nominal interest rate → change in investment & consumption → shift in AD curve → change in Real GDP and Price Level.'
        ]
      },
      {
        id: 'loanable_funds_market',
        term: 'Loanable Funds Market',
        definition: 'Market showing the interaction of borrowers (demand) and savers (supply), determining the equilibrium real interest rate.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.7'],
        subNotes: []
      },
      {
        id: 'demand_for_loanable_funds',
        term: 'Demand for Loanable Funds',
        definition: 'Comes from borrowers; downward-sloping because lower real interest rates make borrowing cheaper.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.7'],
        subNotes: [
          'Shifters: Government deficit spending, borrower expectations.'
        ]
      },
      {
        id: 'supply_of_loanable_funds',
        term: 'Supply of Loanable Funds',
        definition: 'Comes from savers; upward-sloping because higher real interest rates make saving more rewarding.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.7'],
        subNotes: [
          'Shifters: Savings rate, capital inflow.'
        ]
      },
      {
        id: 'equilibrium_real_interest_rate',
        term: 'Equilibrium Real Interest Rate',
        definition: 'The real interest rate where the supply and demand for loanable funds are equal.',
        subject: 'ap_macroeconomics',
        unit: 4,
        lessonIDs: ['4.7'],
        subNotes: []
      },
        {
          id: 'fiscal-policy-review',
          term: 'Fiscal Policy',
          definition: 'The government’s use of spending and taxation to influence aggregate demand.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.1'],
          subNotes: [
            'Expansionary Policy (for recession): Increase Gov. Spending (G) or Decrease Taxes (T).',
            'Contractionary Policy (for inflation): Decrease Gov. Spending (G) or Increase Taxes (T).'
          ]
        },
        {
          id: 'monetary-policy-review',
          term: 'Monetary Policy',
          definition: 'Actions taken by the central bank to manage the money supply and influence aggregate demand.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.1'],
          subNotes: [
            'Expansionary Policy (for recession): Buy bonds, decrease discount rate, or decrease required reserve ratio.',
            'Contractionary Policy (for inflation): Sell bonds, increase discount rate, or increase required reserve ratio.'
          ]
        },
        {
          id: 'policy-mix-effects',
          term: 'Policy Mix Effects',
          definition: 'The combined impact on the economy when the government and central bank use fiscal and monetary policies simultaneously.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.1'],
          subNotes: [
            'The impact on the real interest rate (RIR) depends on the mix of policies.',
            'Expansionary Fiscal (G↑) + Contractionary Monetary (MS↓) → RIR ↑ significantly.',
            'Expansionary Fiscal (G↑) + Expansionary Monetary (MS↑) → RIR effect is indeterminate (policies work in opposite directions on interest rates).'
          ]
        },
    
        // Lesson 5.2: The Phillips Curve
        {
          id: 'phillips-curve',
          term: 'Phillips Curve',
          definition: 'A model that illustrates the relationship between inflation and unemployment.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.2'],
          subNotes: [
            'Includes both the Short-Run Phillips Curve (SRPC) and the Long-Run Phillips Curve (LRPC).',
            'The Phillips Curve model and the AD/AS model are mirror images; both show the same changes to the economy.'
          ]
        },
        {
          id: 'short-run-phillips-curve',
          term: 'Short-Run Phillips Curve (SRPC)',
          definition: 'A curve showing the short-run inverse relationship between the inflation rate and the unemployment rate.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.2'],
          subNotes: [
            'Downward sloping, showing a trade-off between inflation and unemployment.'
          ]
        },
        {
          id: 'long-run-phillips-curve',
          term: 'Long-Run Phillips Curve (LRPC)',
          definition: 'A vertical line at the natural rate of unemployment (NAIRU).',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.2'],
          subNotes: [
            'Shows there is no long-run trade-off between inflation and unemployment.',
            'This means expansionary policies only lead to inflation in the long run, without a lasting decrease in unemployment.'
          ]
        },
        {
          id: 'nru',
          term: 'NRU (Natural Rate of Unemployment)',
          definition: 'The unemployment rate consistent with full employment; the rate at which the LRPC is vertical.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.2'],
          subNotes: [
            'Also known as the full-employment rate of unemployment.'
          ]
        },
        {
          id: 'movements-along-srpc',
          term: 'Movements Along the SRPC',
          definition: 'A change in the combination of inflation and unemployment along a stable Short-Run Phillips Curve, caused by shifts in Aggregate Demand.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.2'],
          subNotes: [
            'AD Right → Move up/left along SRPC (lower unemployment, higher inflation).',
            'AD Left → Move down/right along SRPC (higher unemployment, lower inflation).'
          ]
        },
        {
          id: 'shifts-of-srpc',
          term: 'Shifts of the SRPC',
          definition: 'A change in the short-run trade-off between inflation and unemployment, moving the entire Short-Run Phillips Curve.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.2'],
          subNotes: [
            'Caused by changes in inflationary expectations or supply shocks (SRAS shifts).',
            'Negative supply shock (Stagflation) → SRPC shifts right (worse inflation and unemployment at any point).',
            'Positive supply shock → SRPC shifts left (improved trade-off).',
            'Increase in inflationary expectations → SRPC shifts right.'
          ]
        },
    
        // Lesson 5.3: Money Growth and Inflation
        {
          id: 'quantity-theory-of-money',
          term: 'Quantity Theory of Money',
          definition: 'The theory that, in the long run, the quantity of money determines the price level and inflation rate.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.3'],
          subNotes: [
            'Based on the Equation of Exchange: M x V = P x Y',
            'M = Money Supply, V = Velocity of Money',
            'P = Price Level, Y = Real GDP',
            'P x Y = Nominal GDP; M x V also equals Nominal GDP',
            'If V and Y are constant, a % change in M leads to an equal % change in P (inflation).'
          ]
        },
        {
          id: 'equation-of-exchange',
          term: 'Equation of Exchange',
          definition: 'The formula M x V = P x Y, which links the money supply, velocity, price level, and real output.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.3'],
          subNotes: []
        },
        {
          id: 'velocity-of-money',
          term: 'Velocity of Money (V)',
          definition: 'The average number of times a unit of money (e.g., a dollar) is spent on final goods and services in a year.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.3'],
          subNotes: [
            'Often assumed to be relatively stable.'
          ]
        },
        {
          id: 'hyperinflation',
          term: 'Hyperinflation',
          definition: 'A very rapid, excessive, and out-of-control increase in the price level, often caused by a massive increase in the money supply.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.3'],
          subNotes: []
        },
    
        // Lesson 5.4: Government Deficits and the National Debt
        {
          id: 'federal-budget',
          term: 'Federal Budget',
          definition: 'An annual plan outlining the government\'s expected revenues (taxes) and expenditures (outlays).',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: [
            'Can exist in one of three states: deficit, surplus, or balanced.'
          ]
        },
        {
          id: 'government-outlays',
          term: 'Government Outlays',
          definition: 'The total spending by the government, including transfer payments and government purchases (G).',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: []
        },
        {
          id: 'budget-deficit',
          term: 'Budget Deficit',
          definition: 'When government outlays (spending) exceed tax revenue in a given year. (Outlays > Revenue)',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: [
            'Increases the national debt.'
          ]
        },
        {
          id: 'budget-surplus',
          term: 'Budget Surplus',
          definition: 'When tax revenue exceeds government outlays (spending) in a given year. (Revenue > Outlays)',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: [
            'Can be used to pay down the national debt.'
          ]
        },
        {
          id: 'balanced-budget',
          term: 'Balanced Budget',
          definition: 'When government outlays (spending) are equal to tax revenue in a given year. (Outlays = Revenue)',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: []
        },
        {
          id: 'financing-a-deficit',
          term: 'Financing a Budget Deficit',
          definition: 'The method the government uses to pay for its deficit, primarily through borrowing money by selling government bonds (securities) to investors.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: [
            'Government sells bonds to both domestic and foreign investors.',
            'The government borrows from bondholders, promising to pay them back with interest in the future.'
          ]
        },
        {
          id: 'national-debt',
          term: 'National Debt',
          definition: 'The total accumulation of all past budget deficits, minus any surpluses.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: [
            'The total amount of money the government owes to its bondholders.', 
            'Deficits add to the national debt, surpluses reduce it.'
          ]
        },
        {
          id: 'interest-payments-debt',
          term: 'Interest Payments (on Debt)',
          definition: 'The money the government must pay to its bondholders for the interest accrued on the national debt.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4'],
          subNotes: []
        },
        {
          id: 'crowding-out',
          term: 'Crowding Out',
          definition: 'An economic effect where government deficit spending increases real interest rates, causing a decrease in private investment.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.4', '5.5'],
          subNotes: [
            'Government deficit → Demand for loanable funds ↑ → Real Interest Rate ↑ → Private Investment (I) ↓',
            'This dampens the full effect of expansionary fiscal policy, as the increase in government spending is partially offset by the decrease in private investment.'
          ]
        }, 
        {
          id: 'capital-stock',
          term: 'Capital Stock',
          definition: 'The total accumulation of physical capital—tools, machinery, equipment, and structures—used to produce goods and services.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.5', '5.6'],
          subNotes: [
            'Impact of Crowding Out: Government borrowing increases real interest rates, which decreases private investment, leading to a smaller future capital stock.'
          ]
        },
        {
          id: 'crowding-out-long-run-growth',
          term: 'Crowding Out and Long-Run Economic Growth',
          definition: 'The long-run negative effect of persistent government deficits, where higher real interest rates reduce private investment and capital accumulation, slowing economic growth.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.5', '5.6'],
          subNotes: [
            'Government borrowing increases real interest rates, reducing private investment and capital formation.',
            'Less investment in physical capital (machinery, factories, infrastructure) results in slower economic growth.',
            'Reflected in smaller rightward shifts of the LRAS curve and PPC, meaning potential output grows more slowly than it otherwise would.'
          ]
        },
    
        // Lesson 5.6: Economic Growth
        {
          id: 'economic-growth',
          term: 'Economic Growth',
          definition: 'A sustained increase in an economy’s potential output (real GDP) or real GDP per capita over time.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.6'],
          subNotes: []
        },
        {
          id: 'real-gdp-per-capita',
          term: 'Real GDP per Capita',
          definition: 'The total real output (Real GDP) of a country divided by its total population; a measure of the average standard of living.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.6'],
          subNotes: [
            'Formula: Real GDP / Population'
          ]
        },
        {
          id: 'economic-growth-ppc',
          term: 'Economic Growth (on the PPC)',
          definition: 'How economic growth is illustrated on the Production Possibilities Curve model as an outward shift of the entire curve.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.6'],
          subNotes: [
            'Represents an increase in the economy\'s productive capacity, meaning it can now produce more of both goods than before.',
            'Occurs when there is an increase in resources, improvements in technology, or growth in the factors of production.'
          ]
        },
        {
          id: 'economic-growth-adas',
          term: 'Economic Growth (on the AD-AS Model)',
          definition: 'How economic growth is illustrated on the Aggregate Demand-Aggregate Supply model as a rightward shift of the Long-Run Aggregate Supply (LRAS) curve.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.6'],
          subNotes: [
            'Represents an increase in the economy\'s potential output, or full-employment output (Yf).',
            'Indicates the economy can now produce more goods and services at full employment, reflecting an increase in productive capacity due to growth in resources, technology, or factors of production.'
          ]
        },
        {
          id: 'sources-of-economic-growth',
          term: 'Sources of Economic Growth',
          definition: 'The key factors that shift the LRAS and PPC outward, increasing potential output.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.6', '5.7'],
          subNotes: [
            'Increase in Physical Capital (K): more machines, factories',
            'Increase in Human Capital (H): better education, skills',
            'Advancements in Technology (A)',
            'Increase in quantity/quality of Natural Resources or Labor (L)',
            'These factors work together to expand an economy\'s productive capacity over time.'
          ]
        },
        {
          id: 'productivity',
          term: 'Productivity',
          definition: 'Output per worker; a key driver of long-run economic growth and real wages.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.6'],
          subNotes: [
            'Driven by increases in technology, physical capital, and human capital.'
          ]
        },
    
        // Lesson 5.7: Public Policy and Economic Growth
        {
          id: 'supply-side-economics',
          term: 'Supply-Side Economics',
          definition: 'A school of thought that advocates for government policies focused on increasing aggregate supply (LRAS) to achieve long-run growth, rather than focusing primarily on aggregate demand.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.7'],
          subNotes: [
            'Also known as "trickle-down" economics.',
            'Emphasizes policies that increase incentives to work, save, and invest.',
            'Examples: Tax cuts for businesses, deregulation, and other policies designed to encourage production and investment.',
            'Based on the belief that benefits will eventually "trickle down" to all members of society.'
          ]
        },
        {
          id: 'promoting-physical-capital',
          term: 'Promoting Physical Capital Development',
          definition: 'Government policies aimed at increasing the amount of tools, machinery, and infrastructure (capital formation) to promote long-run economic growth.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.7'],
          subNotes: [
            'These policies encourage both private and public investment in physical capital.',
            'Examples: Investment tax credits (reduce cost of business investment), lower corporate income taxes (leave more money for capital spending), direct government spending on public infrastructure (roads, bridges, internet networks).',
            'By increasing physical capital, these policies shift the LRAS curve to the right and expand the economy\'s productive capacity.'
          ]
        },
        {
          id: 'promoting-human-capital',
          term: 'Promoting Human Capital Development',
          definition: 'Government policies aimed at increasing the knowledge, skills, and health of the workforce to promote long-run economic growth.',
          subject: 'ap_macroeconomics',
          unit: 5,
          lessonIDs: ['5.7'],
          subNotes: [
            'Examples: Government spending on public education, job training programs, subsidies for healthcare, student loans or grants.',
            'By improving human capital, workers become more productive, which increases potential output and shifts the LRAS curve to the right.'
          ]
        }, 
        {
          id: 'balance-of-payments',
          term: 'Balance of Payments (BOP) Accounts',
          definition: 'A summary of all international transactions (trade in goods/services and flow of assets) for a country in a given year.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: [
            'Consists of two main accounts: the Current Account and the Financial Account.'
          ]
        },
        {
          id: 'current-account',
          term: 'Current Account (CA)',
          definition: 'The account that measures the international trade in goods and services, net income from abroad, and net unilateral transfers.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: [
            'CA = Net Exports + Net Income + Net Transfers'
          ]
        },
        {
          id: 'net-income-from-abroad',
          term: 'Net Income from Abroad',
          definition: 'The difference between the income earned by a country\'s citizens in foreign countries and the income earned by foreigners in that country.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: []
        },
        {
          id: 'net-unilateral-transfers',
          term: 'Net Unilateral Transfers',
          definition: 'Payments from one country to another that do not correspond to the purchase of any good, service, or asset (e.g., foreign aid).',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: [
            'Money given to another country with nothing expected in return.'
          ]
        },
        {
          id: 'trade-balance',
          term: 'Trade Balance (Net Exports)',
          definition: 'The difference between a country\'s total exports and total imports of goods and services.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: [
            'Trade Surplus: Exports > Imports',
            'Trade Deficit: Exports < Imports'
          ]
        },
        {
          id: 'financial-account',
          term: 'Financial Account (or Capital Account)',
          definition: 'Measures the purchase and sale of financial assets, such as stocks, bonds, and real estate, between a country and the rest of the world.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: []
        },
        {
          id: 'capital-inflow-outflow',
          term: 'Capital Inflow / Outflow',
          definition: 'The movement of financial assets (money) into or out of a country.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1', '6.6'],
          subNotes: [
            'Inflow: Foreigners buy domestic assets (e.g., Chinese investor buys US stocks).',
            'Outflow: Domestic citizens buy foreign assets (e.g., US bank buys Chinese bonds).'
          ]
        },
        {
          id: 'bop-relationship',
          term: 'Current & Financial Account Relationship',
          definition: 'The Current Account and the Financial Account must sum to zero (or balance), meaning a deficit in one account must be offset by a surplus in the other.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.1'],
          subNotes: [
            'Example: If the US has a current account deficit with China (imports more than exports), it must have a corresponding financial account surplus (capital inflow) from China, as Chinese investors purchase US assets to balance the accounts.',
            'This relationship reflects the fact that every dollar that flows out of one account must flow into the other.'
          ]
        },
    
        // Lesson 6.2: Exchange Rates
        {
          id: 'exchange-rate',
          term: 'Exchange Rate',
          definition: 'The price of one country\'s currency in terms of another country\'s currency.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.2'],
          subNotes: []
        },
        {
          id: 'currency-appreciation',
          term: 'Currency Appreciation',
          definition: 'An increase in the value of one currency relative to another currency.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.2'],
          subNotes: [
            'Example: If $1 USD buys 100 Yen, and it changes to $1 USD buying 150 Yen, the USD has appreciated.'
          ]
        },
        {
          id: 'currency-depreciation',
          term: 'Currency Depreciation',
          definition: 'A decrease in the value of one currency relative to another currency.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.2'],
          subNotes: [
            'Example: If $1 USD buys 100 Yen, and it changes to $1 USD buying 150 Yen, the Yen has depreciated.',
            'If one currency appreciates, the other must depreciate.'
          ]
        },
    
        // Lesson 6.3: The Foreign Exchange Market
        {
          id: 'forex-market',
          term: 'Foreign Exchange Market (FOREX)',
          definition: 'The global marketplace where currencies are traded and exchange rates are determined by the interaction of supply and demand.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.3'],
          subNotes: [
            'Influences the flow of goods, services, and financial capital.'
          ]
        },
        {
          id: 'demand-for-currency',
          term: 'Demand for Currency (in FOREX)',
          definition: 'A downward-sloping curve showing the quantity of a currency demanded at various exchange rates.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.3'],
          subNotes: [
            'Demand comes from foreigners who want to buy domestic goods, services, or financial assets.'
          ]
        },
        {
          id: 'supply-of-currency',
          term: 'Supply of Currency (in FOREX)',
          definition: 'An upward-sloping curve showing the quantity of a currency supplied at various exchange rates.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.3'],
          subNotes: [
            'Supply comes from domestic citizens who want to buy foreign goods, services, or financial assets.'
          ]
        },
        {
          id: 'forex-shifters',
          term: 'Shifters of the FOREX Market',
          definition: 'Factors that cause the demand for or supply of a currency to shift.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.3', '6.4', '6.6'],
          subNotes: [
            'Changes in Tastes/Preferences (for goods)',
            'Changes in relative Income',
            'Changes in relative Price Level (Inflation)',
            'Changes in relative Real Interest Rates'
          ]
        },
    
        // Lesson 6.4: Effect of Policies on Exchange Rates
        {
          id: 'exp-fiscal-exchange-rate',
          term: 'Expansionary Fiscal Policy & Exchange Rate',
          definition: 'How expansionary fiscal policy (deficit spending) affects the exchange rate through changes in real interest rates and capital flows.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.4'],
          subNotes: [
            'G↑ or T↓ → Deficit → Borrowing↑ → Demand for Loanable Funds↑ → Real Interest Rate↑',
            'Higher RIR → Capital Inflow↑ → Demand for Currency↑ → Currency Appreciates.'
          ]
        },
        {
          id: 'con-fiscal-exchange-rate',
          term: 'Contractionary Fiscal Policy & Exchange Rate',
          definition: 'How contractionary fiscal policy (surplus) affects the exchange rate through changes in real interest rates and capital flows.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.4'],
          subNotes: [
            'G↓ or T↑ → Surplus → Borrowing↓ → Demand for Loanable Funds↓ → Real Interest Rate↓',
            'Lower RIR → Capital Outflow↑ → Supply of Currency↑ → Currency Depreciates.'
          ]
        },
        {
          id: 'exp-monetary-exchange-rate',
          term: 'Expansionary Monetary Policy & Exchange Rate',
          definition: 'How expansionary monetary policy affects the exchange rate through changes in interest rates and capital flows.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.4'],
          subNotes: [
            'MS↑ → Nominal Interest Rate↓ → Real Interest Rate↓',
            'Lower RIR → Capital Outflow↑ → Supply of Currency↑ → Currency Depreciates.'
          ]
        },
        {
          id: 'con-monetary-exchange-rate',
          term: 'Contractionary Monetary Policy & Exchange Rate',
          definition: 'How contractionary monetary policy affects the exchange rate through changes in interest rates and capital flows.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.4'],
          subNotes: [
            'MS↓ → Nominal Interest Rate↑ → Real Interest Rate↑',
            'Higher RIR → Capital Inflow↑ → Demand for Currency↑ → Currency Appreciates.'
          ]
        },
    
        // Lesson 6.5: Exchange Rates and Net Exports
        {
          id: 'appreciation-net-exports',
          term: 'Effect of Currency Appreciation on Net Exports',
          definition: 'When a country\'s currency appreciates (gets stronger), its exports become more expensive for foreigners and imports become cheaper for its citizens.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.5'],
          subNotes: [
            'Exports decrease (↓) because they\'re more expensive for foreigners.',
            'Imports increase (↑) because they\'re cheaper for domestic citizens.',
            'Net Exports (Xn) decrease, shifting AD to the left.'
          ]
        },
        {
          id: 'depreciation-net-exports',
          term: 'Effect of Currency Depreciation on Net Exports',
          definition: 'When a country\'s currency depreciates (gets weaker), its exports become cheaper for foreigners and imports become more expensive for its citizens.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.5'],
          subNotes: [
            'Exports increase (↑) because they\'re cheaper for foreigners.',
            'Imports decrease (↓) because they\'re more expensive for domestic citizens.',
            'Net Exports (Xn) increase, shifting AD to the right.'
          ]
        },
    
        // Lesson 6.6: Real Interest Rates and Capital Flows
        {
          id: 'financial-capital-flows',
          term: 'Financial Capital Flows',
          definition: 'The movement of money (financial capital) across borders as savers seek the highest possible real interest rate on their investments.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.6', '6.4'],
          subNotes: [
            'Money flows *towards* the country with the higher real interest rate.'
          ]
        },
        {
          id: 'rir-capital-flow-exchange-rate',
          term: 'Real Interest Rates and Capital Flows',
          definition: 'The mechanism linking relative real interest rates to capital flows and the exchange rate.',
          subject: 'ap_macroeconomics',
          unit: 6,
          lessonIDs: ['6.6', '6.4'],
          subNotes: [
            'If RIR in Country A > RIR in Country B → Capital flows to Country A (investors seek best returns).',
            'To invest, foreigners must buy Country A\'s currency.',
            'Demand for Country A\'s currency increases → Country A\'s currency appreciates.'
          ]
        }
  ];