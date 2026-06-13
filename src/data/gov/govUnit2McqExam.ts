import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 2 **formal unit MCQ test** only
 * (`/unit-mcq-test/2?subject=gov`, pretty URL `/ap-gov-unit-2-mcq-test`).
 * IDs in 62xx range; practice pool uses 60xx in `govUnit2McqPractice.ts`.
 *
 * Aligned with the 2023–2026 AP Gov CED Unit 2: Interactions Among Branches of Government.
 */
export const govUnit2McqTestQuestions: Question[] = [
  {
    id: 6201,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'The Senate is designed to represent states equally, while the House is designed to represent the people... All House members are elected every two years, whereas one-third of the Senate is elected every two years.\n\nWhich of the following constitutional design choices best explains this structural difference between the chambers?',
    image: null,
    options: [
      'The framers intended the House to be insulated from rapid shifts in public opinion, while the Senate acts as a direct mirror of democracy.',
      'The House was intended to be more responsive to the immediate passions of the electorate, while the Senate serves as a more deliberate and continuous body.',
      'The structure reflects a compromise where the executive branch can easily control the House but cannot influence the Senate.',
      'The Senate was created with short terms to encourage frequent rotation in office, preventing elite control.',
    ],
    correctAnswer: 'B',
    explanation:
      'The smaller size and two-year terms make the House more accountable to the people, whereas the six-year staggered terms insulate the Senate, making it a more stable, continuous legislative body.',
  },
  {
    id: 6202,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'A representative in the House of Representatives is struggling to bring an immigration reform bill out of a hostile committee onto the floor for full chamber debate. Which of the following chamber-specific rules or procedures can this individual utilize to bypass the committee leadership?',
    image: null,
    options: [
      'A motion for cloture',
      'A unanimous consent agreement',
      'A discharge petition',
      'A hold',
    ],
    correctAnswer: 'C',
    explanation:
      'Under House rules, an individual representative can file a discharge petition to force a bill out of committee to the floor for debate if signed by a majority of members. Cloture, unanimous consent, and holds are unique Senate procedures.',
  },
  {
    id: 6203,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'The federal budget consists of both mandatory and discretionary spending. As spending on entitlement programs like Social Security and Medicare automatically grows due to demographic changes, which of the following is a long-term economic consequence for federal budgeting?',
    image: null,
    options: [
      'Discretionary spending opportunities will decrease unless tax revenues increase or the budget deficit increases.',
      'Congress must pass a completely new authorization act annually to keep mandatory spending active.',
      'The federal government will automatically eliminate its budget deficit by balancing national priorities.',
      'Interest groups will reduce lobbying efforts on discretionary spending due to constitutional constraints.',
    ],
    correctAnswer: 'A',
    explanation:
      'Because mandatory spending is required by law for entitlement programs, its growth shifts fiscal pressure, meaning discretionary funding opportunities shrink unless funding is recovered through higher taxes or borrowing.',
  },
  {
    id: 6204,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'A member of Congress votes to support a highly controversial environmental regulation after receiving thousands of letters from constituents demanding its passage, even though the member personally believes the bill will harm local industrial businesses. This member is acting under which model of representation?',
    image: null,
    options: ['Trustee model', 'Delegate model', 'Politico model', 'Partisan model'],
    correctAnswer: 'B',
    explanation:
      'A representative acting as a delegate suppresses their personal judgment and votes based on the clear instructions or perceived interests of their constituents.',
  },
  {
    id: 6205,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'Which of the following scenarios describes the structural condition of a "divided government"?',
    image: null,
    options: [
      'The Democratic party holds a unified majority in both the House of Representatives and the Senate while working under a Democratic president.',
      'The President is a Democrat, while the Republican party controls at least one chamber of Congress.',
      'A legislative gridlock occurs because the Supreme Court strikes down executive orders from a lame-duck president.',
      'Members of a single political party split their votes along regional, ideological lines during a budget confirmation.'
    ],
    correctAnswer: 'B',
    explanation:
      'Divided government is formally defined as when one political party controls the presidency and the opposing party controls at least one of the chambers of Congress. This condition frequently intensifies partisan polarization, complicates the confirmation process, and leads to legislative gridlock.',
  },
  {
    id: 6218,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.1', '2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-district-map',
    question:
      'The map showing that most congressional districts are uncompetitive best supports which of the following conclusions about congressional elections?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_2/congressional+district+competitiveness.svg',
      alt: 'Map showing congressional district competitiveness across the United States',
    },
    options: [
      'Voter turnout is equally distributed across all states regardless of district competitiveness.',
      'The winner-take-all system combined with partisan gerrymandering produces safe districts that reduce electoral accountability for most incumbents.',
      'The Constitution requires that congressional districts be drawn to maximize competition between the two major parties.',
      'Uncompetitive districts are primarily the result of low voter registration rates in rural areas.',
    ],
    correctAnswer: 'B',
    explanation:
      'Safe districts, often the result of gerrymandering, ensure the incumbent party retains control, which diminishes the incentive for representatives to appeal to voters outside their partisan base.',
  },
  {
    id: 6219,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-district-map',
    question:
      'If a state\'s congressional map is challenged on the grounds that it was drawn primarily to favor one party, which of the following Supreme Court cases would be most relevant to the judicial review process?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_2/congressional+district+competitiveness.svg',
      alt: 'Map showing congressional district competitiveness across the United States',
    },
    options: [
      'Marbury v. Madison (1803), because it established the Court\'s power to hear election disputes.',
      'Baker v. Carr (1961), because it established the "one person, one vote" principle and allowed federal courts to intervene in redistricting.',
      'McCulloch v. Maryland (1819), because it dealt with the implied powers of the federal government over states.',
      'United States v. Lopez (1995), because it limited Congress\'s authority to regulate local activities.',
    ],
    correctAnswer: 'B',
    explanation:
      'Baker v. Carr is the foundational case regarding redistricting; it determined that redistricting issues present justiciable questions, enabling federal courts to intervene in cases of unequal district representation.',
  },
  {
    id: 6206,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'Energy in the Executive is a leading character in the definition of good government. It is essential to the protection of the community against foreign attacks... to the steady administration of the laws...\n—Federalist No. 70\n\nWhich of the following presidential actions is an example of an informal power justified by the argument above?',
    image: null,
    options: [
      'Vetoing a major defense appropriations bill passed by Congress.',
      'Negotiating a formal treaty with a foreign nation requiring a two-thirds Senate vote.',
      'Issuing an executive agreement with a foreign ally to secure immediate military cooperation.',
      'Nominating an ambassador to serve as the chief diplomatic envoy to the United Nations.',
    ],
    correctAnswer: 'C',
    explanation:
      'Executive agreements are informal tools that allow the executive to manage foreign policy quickly and single-handedly without legislative delays, fulfilling Hamilton\'s vision of an "energetic" executive.',
  },
  {
    id: 6207,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.5'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'The President has issued a controversial executive order to divert pre-allocated infrastructure funds toward building national border defense barriers. Congress strongly opposes this initiative. Which of the following constitutional actions can Congress take to check this expansion of executive power?',
    image: null,
    options: [
      'The Senate can vote by simple majority to instantly declare the executive order null and void.',
      'Congress can use its power of the purse to pass legislation explicitly withholding or blocking appropriations for the defense barriers.',
      'The House of Representatives can force the President to submit the order for legislative veto evaluation.',
      'Congress can appeal to the Electoral College to adjust the administration\'s policy jurisdiction.',
    ],
    correctAnswer: 'B',
    explanation:
      'Congress can use its "power of the purse" to control or cut off money to check presidential policy initiatives or administrative overreach.',
  },
  {
    id: 6208,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.6'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'Which of the following constitutional amendments was passed as a direct legislative structural limit to curb the potential expansion of presidential power over time?',
    image: null,
    options: [
      'Sixteenth Amendment',
      'Seventeenth Amendment',
      'Twenty-Second Amendment',
      'Twenty-Fifth Amendment',
    ],
    correctAnswer: 'C',
    explanation:
      'The Twenty-Second Amendment established formal presidential term limits, showing institutional concern about the long-term expansion of executive power.',
  },
  {
    id: 6209,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.7'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'A modern president utilizes an unannounced, nationwide live-streamed video address on social media platforms to urge citizens to call their senators and demand a vote on a stalled healthcare bill. This communication strategy leverages which of the following political concepts?',
    image: null,
    options: [
      'The exercise of formal judicial review authority',
      'The use of the presidential bully pulpit to set the political agenda',
      'An invocation of the advice and consent clause',
      'The application of retrospective constituent delegation',
    ],
    correctAnswer: 'B',
    explanation:
      'The "bully pulpit" describes a president\'s use of the office\'s prestige and media visibility to influence public opinion and pressure other government actors to support their agenda.',
  },
  {
    id: 6210,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'The complete independence of the courts of justice is peculiarly essential in a limited Constitution... the courts were designed to be an intermediate body between the people and the legislature...\n—Federalist No. 78\n\nAccording to Alexander Hamilton in the excerpt above, the judiciary secures its independence primarily through which of the following constitutional structures?',
    image: null,
    options: [
      'The power to determine the federal spending budget directly',
      'Life tenure for federal judges during good behavior',
      'Direct popular elections to secure democratic legitimacy',
      'The ability to introduce legislation directly to the House floor',
    ],
    correctAnswer: 'B',
    explanation:
      'Federalist No. 78 and Article III establish that life tenure insulates federal judges from political winds and popular or legislative pressures, ensuring judicial independence.',
  },
  {
    id: 6212,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'A conservative Supreme Court majority issues a ruling that strikes down a long-standing federal campaign finance law passed by Congress. In response, a coalition of liberal senators begins drafting legislation to alter the appellate jurisdiction of the Court to prevent them from reviewing similar cases. This scenario illustrates which of the following constitutional dynamics?',
    image: null,
    options: [
      'An application of executive supremacy over judicial interpretation',
      'The use of statutory exemptions to remove life tenure from federal justices',
      'How Congress can attempt to place structural checks or jurisdictional limits on the judicial branch',
      'The mandatory function of compliance monitoring under iron triangle systems',
    ],
    correctAnswer: 'C',
    explanation:
      'Under Article III, Congress possesses the explicit power to limit or adjust the Supreme Court\'s appellate jurisdiction as a check on judicial power.',
  },
  {
    id: 6213,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'Which of the following scenarios best demonstrates the concept of an "iron triangle" in the federal policymaking process?',
    image: null,
    options: [
      'The President, the Prime Minister of a foreign nation, and the Secretary of State draft an alliance.',
      'A bureaucratic agency, a congressional committee, and an interest group collaborate over time to create and protect industry-specific policy regulations.',
      'The Supreme Court, the House of Representatives, and state governors negotiate a constitutional amendment.',
      'A temporary alliance of multi-industry journalists and academic scientists forms to raise awareness about public health issues.',
    ],
    correctAnswer: 'B',
    explanation:
      'Iron triangles are long-lasting, reciprocal alliances of congressional committees, bureaucratic agencies, and interest groups working within specific policy areas.',
  },
  {
    id: 6214,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.13'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'Congress passes a broad law called the Clean Air Act, instructing the Environmental Protection Agency (EPA) to ensure national air pollution is kept to safe levels. The EPA then writes and enforces technical regulations regarding how many toxic emissions automobiles can produce. The EPA\'s power to write these specific regulations is an example of:',
    image: null,
    options: [
      'Constitutional concurrent original jurisdiction',
      'Delegated discretionary and rulemaking authority',
      'Executive treaty implementation procedures',
      'Congressional override of bureaucratic civil service specialization',
    ],
    correctAnswer: 'B',
    explanation:
      'The federal bureaucracy utilizes delegated discretionary authority from Congress to implement and interpret legislation through its rulemaking powers.',
  },
  {
    id: 6215,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.15'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'The complex architecture of the federal government—characterized by a separation of powers and checks and balances among three branches—impacts policymaking by creating which of the following systemic results?',
    image: null,
    options: [
      'It centralizes all public access points into the office of the executive branch.',
      'It creates multiple access points for stakeholders to influence public policy, while introducing constraints on national policymaking.',
      'It guarantees that the political party controlling the presidency can bypass legislative oversight completely.',
      'It forces the federal bureaucracy to bypass judicial review by operating entirely through patronage systems.',
    ],
    correctAnswer: 'B',
    explanation:
      'The distribution of power among branches creates multiple access points for stakeholders to influence public policy, but it also creates structural checks that slow down and constrain national policymaking.',
  },
  {
    id: 6216,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4', '2.5'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-veto-data',
    question:
      'Which of the following best explains the trend illustrated in the data regarding the interaction between the executive and legislative branches?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_2/presidential_vetoes.svg',
      alt: 'Chart showing the number of presidential vetoes by decade from the 1980s through the 2020s',
    },
    options: [
      'The decline in vetoes from the 1980s to the 2020s indicates that Presidents have increasingly lost the constitutional authority to check the legislative branch.',
      'A low number of vetoes suggests a high degree of legislative-executive cooperation, meaning the President and Congress have always shared the same policy priorities.',
      'Presidents may rely on the "veto threat" as a tool of informal power to influence the legislative process before a bill even reaches their desk, potentially reducing the need for formal vetoes.',
      'The data demonstrates that the use of the veto is a primary power used to bypass the Supreme Court\'s exercise of judicial review.',
    ],
    correctAnswer: 'C',
    explanation:
      'The formal veto is a last resort. Presidents often use the threat of a veto to force Congress to modify legislation during the drafting phase, achieving policy goals without needing to formally exercise the veto.',
  },
  {
    id: 6217,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.5', '2.6'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-veto-data',
    question:
      'Based on the data provided, which of the following is the most likely reason for the observed trend in the number of vetoes issued by Presidents since the 1980s?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_2/presidential_vetoes.svg',
      alt: 'Chart showing the number of presidential vetoes by decade from the 1980s through the 2020s',
    },
    options: [
      'Modern Presidents have been granted significantly more formal authority by Congress to rewrite laws, reducing the need for formal vetoes.',
      'Recent Presidents are less likely to face opposition from Congress due to a decrease in party polarization.',
      'Presidents in the modern era are more likely to utilize executive orders and other unilateral actions to shape policy, rather than relying on the legislative process where vetoes occur.',
      'The Constitution has been amended to restrict the President\'s ability to issue regular vetoes, resulting in the drastic decline seen in the 21st century.',
    ],
    correctAnswer: 'C',
    explanation:
      'A major trend in modern American government is the "unilateral presidency." As legislative gridlock has increased, modern Presidents have increasingly relied on executive orders, memoranda, and administrative rulemaking to bypass Congress, resulting in fewer bills on their desk to veto.',
  },
];
