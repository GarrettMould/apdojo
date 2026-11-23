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
      'The House was designed to be insulated from rapid shifts in public opinion, while the Senate was intended to act as a direct and immediate mirror of the electorate.',
      'The difference reflects a compromise in which the executive branch may exert more influence over the House than it can over the smaller and more independent Senate.',
      'The House was intended to be more responsive to the immediate passions of the electorate, while the Senate serves as a more deliberate and continuous body.',
      'The Senate was given shorter effective terms through staggered elections to encourage frequent rotation in office and prevent elite control of the chamber over time.',
    ],
    correctAnswer: 'C',
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
      'A discharge petition',
      'A unanimous consent agreement',
      'A hold',
    ],
    correctAnswer: 'B',
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
      'Interest groups will likely reduce their lobbying on discretionary spending because of new constitutional constraints.',
      'Congress will need to pass a new authorization act each year to keep mandatory spending programs in effect for the next fiscal year.',
      'The federal budget deficit will tend to shrink automatically as spending shifts toward long-term national priorities.',
      'Discretionary spending opportunities will decrease unless tax revenues increase or the budget deficit increases.',
    ],
    correctAnswer: 'D',
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
    options: ['Trustee model', 'Politico model', 'Delegate model', 'Partisan model'],
    correctAnswer: 'C',
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
      'The President is a Democrat, while the Republican party controls at least one chamber of Congress.',
      'The Democratic party controls both the House and the Senate while a Democratic president is in office.',
      'Legislation stalls because the Supreme Court strikes down executive orders from a lame-duck president.',
      'Members of one party split their votes along regional lines during a budget debate.',
    ],
    correctAnswer: 'A',
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
      'Voter turnout tends to be distributed evenly across states regardless of how competitive their congressional districts are.',
      'The winner-take-all system combined with partisan gerrymandering produces safe districts that reduce electoral accountability for most incumbents.',
      'The Constitution requires states to draw congressional districts that maximize competition between the two major parties in each election.',
      'Uncompetitive districts result primarily from low voter registration rates in rural areas, which leave incumbents with little organized opposition in most elections.',
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
      'If a state\'s congressional map is challenged on the grounds that its districts have significantly unequal populations, which of the following Supreme Court cases would be most relevant to whether federal courts can hear the challenge?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_2/congressional+district+competitiveness.svg',
      alt: 'Map showing congressional district competitiveness across the United States',
    },
    options: [
      'Baker v. Carr (1962), because it held that challenges to legislative apportionment are justiciable, allowing federal courts to hear such cases.',
      "Marbury v. Madison (1803), because it established the Court's authority to review election disputes arising under state redistricting law.",
      'McCulloch v. Maryland (1819), because it addressed the implied powers of the federal government over how states exercise their authority.',
      "United States v. Lopez (1995), because it limited Congress's authority to regulate activities that states traditionally control.",
    ],
    correctAnswer: 'A',
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
      'Issuing an executive agreement with a foreign ally to secure immediate military cooperation.',
      'Negotiating a formal treaty with a foreign nation, which requires a two-thirds vote of the Senate.',
      'Vetoing a major defense appropriations bill that Congress has sent to the President for signature.',
      "Nominating an ambassador to serve as the nation's chief diplomatic envoy to the United Nations.",
    ],
    correctAnswer: 'A',
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
      'The Senate can vote by simple majority to declare the executive order null and void, which ends the program without further action.',
      "Congress can petition the Electoral College to review the order and adjust the limits of the administration's policy jurisdiction.",
      'The House of Representatives can require the President to submit the order for a legislative veto before any funds can be spent.',
      'Congress can use its power of the purse to pass legislation explicitly withholding or blocking appropriations for the defense barriers.',
    ],
    correctAnswer: 'D',
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
      'Twenty-Second Amendment',
      'Seventeenth Amendment',
      'Twenty-Fifth Amendment',
    ],
    correctAnswer: 'B',
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
      'The exercise of formal judicial review authority over pending legislation',
      "An invocation of the Senate's advice and consent clause to force a vote",
      'The use of the presidential bully pulpit to set the political agenda',
      'The application of the delegate model of representation to the electorate',
    ],
    correctAnswer: 'C',
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
      'How Congress can attempt to place structural checks or jurisdictional limits on the judicial branch',
      'The use of statutory exemptions to strip life tenure from sitting federal justices on the Court',
      "An application of executive supremacy over the Court's interpretation of federal statutes",
      'The required compliance monitoring that committees perform under iron triangle relationships',
    ],
    correctAnswer: 'A',
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
      'A bureaucratic agency, a congressional committee, and an interest group collaborate over time to create and protect industry-specific policy regulations.',
      'The President, the Prime Minister of a foreign nation, and the Secretary of State work together over time to draft and maintain a long-term security alliance.',
      'The Supreme Court, the House of Representatives, and state governors negotiate over time to draft and ratify a constitutional amendment on industry regulation.',
      'A temporary coalition of journalists and academic scientists from several industries forms to raise public awareness about emerging health issues.',
    ],
    correctAnswer: 'A',
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
      'Congressional override of bureaucratic civil service specialization',
      'Executive treaty implementation procedures',
      'Delegated discretionary and rulemaking authority',
    ],
    correctAnswer: 'D',
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
      'It tends to centralize public access points in the executive branch, which limits the influence of other stakeholders on policy.',
      'It creates multiple access points for stakeholders to influence public policy, while introducing constraints on national policymaking.',
      'It allows the party controlling the presidency to bypass legislative oversight, which speeds passage of national policy priorities.',
      'It encourages the federal bureaucracy to avoid judicial review by operating mainly through patronage rather than merit hiring.',
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
      'The decline in vetoes from the 1980s to the 2020s indicates that Presidents have gradually lost the constitutional authority to check the legislative branch through the formal veto process.',
      'A low number of vetoes suggests a high degree of legislative-executive cooperation, meaning that Presidents and Congress have usually held the same policy priorities since the 1980s, regardless of party.',
      'Presidents may rely on the "veto threat" as a tool of informal power to influence the legislative process before a bill even reaches their desk, potentially reducing the need for formal vetoes.',
      "The data demonstrates that the veto may serve as a primary tool for Presidents seeking to bypass the Supreme Court's exercise of judicial review over acts of Congress.",
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
      'Modern Presidents have been granted significantly more formal authority by Congress to rewrite enacted laws on their own, which has reduced their need to rely on the formal veto power during negotiations.',
      'Recent Presidents are less likely to face opposition from Congress because party polarization has declined, allowing more bills to reach them in a form they are willing to sign.',
      "The Constitution has been amended to restrict the President's ability to issue regular vetoes, which accounts for the sharp decline in their use during the twenty-first century.",
      'Presidents in the modern era are more likely to utilize executive orders and other unilateral actions to shape policy, rather than relying on the legislative process where vetoes occur.',
    ],
    correctAnswer: 'D',
    explanation:
      'A major trend in modern American government is the "unilateral presidency." As legislative gridlock has increased, modern Presidents have increasingly relied on executive orders, memoranda, and administrative rulemaking to bypass Congress, resulting in fewer bills on their desk to veto.',
  },
];
