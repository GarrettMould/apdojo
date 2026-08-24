import { KeyTerm } from './allContent';
import { apGovUnit2KeyTerms } from './gov/apGovUnit2KeyTerms';
import { apGovUnit3CompleteMasterTerms } from './gov/apGovUnit3KeyTerms';
import { apGovUnit4KeyTerms } from './gov/apGovUnit4KeyTerms';
import { apGovUnit5KeyTerms } from './gov/apGovUnit5KeyTerms';

const apGovUnit1KeyTerms: KeyTerm[] = [
  {
    id: 'natural-rights',
    term: 'Natural Rights',
    definition:
      'Fundamental rights such as life, liberty, and property that all people possess.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: [
      'Application: These are “negative” rights because they restrict others or the government from interfering with you.',
    ],
  },
  {
    id: 'popular-sovereignty',
    term: 'Popular Sovereignty',
    definition: "The principle that the government's power comes from the consent of its people.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: ['Application: This is often expressed through free and fair elections.'],
  },
  {
    id: 'social-contract',
    term: 'Social Contract',
    definition:
      'An agreement where people give up some freedoms to maintain social order.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: [
      'Application: In the U.S., the Constitution serves as the formal social contract between the citizens and the state.',
    ],
  },
  {
    id: 'republicanism',
    term: 'Republicanism',
    definition:
      'A system where the people elect representatives to govern and make laws.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: This is the basis of representative democracy as opposed to direct democracy.',
    ],
  },
  {
    id: 'limited-government',
    term: 'Limited Government',
    definition:
      "A political system where the government's power is restricted by a constitution.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: [
      'Application: The Bill of Rights is a primary example of a tool used to limit government reach.',
    ],
  },
  {
    id: 'participatory-democracy',
    term: 'Participatory Democracy',
    definition: 'A model emphasizing broad participation in politics and civil society.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: Initiatives and referendums at the state level are modern examples.',
    ],
  },
  {
    id: 'pluralist-democracy',
    term: 'Pluralist Democracy',
    definition:
      'A model where group-based activism by nongovernmental interests strives for impact on decision making.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: Interest groups like the Sierra Club or the NRA competing for influence in Washington.',
    ],
  },
  {
    id: 'elite-democracy',
    term: 'Elite Democracy',
    definition:
      'A model where a small group of informed and well-placed individuals influence the government.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: The Electoral College is often cited as an elite-model buffer between the people and the presidency.',
    ],
  },
  {
    id: 'factions',
    term: 'Factions',
    definition:
      'Groups motivated by a common interest or passion that may be adverse to the rights of others.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.5'],
    subNotes: [
      'Application: James Madison argued in Federalist No. 10 that these are inevitable but can be managed by a large republic.',
    ],
  },
  {
    id: 'federalism',
    term: 'Federalism',
    definition:
      'The division of power between the national government and state governments.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7', '1.8'],
    subNotes: [
      'Application: This creates multiple “access points” for citizens to influence policy at different levels.',
    ],
  },
  {
    id: 'exclusive-powers',
    term: 'Exclusive Powers',
    definition: 'Powers held only by one level of government.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: [
      'Application: The federal power to declare war or the state power to issue marriage licenses.',
    ],
  },
  {
    id: 'reserved-powers',
    term: 'Reserved Powers',
    definition:
      'Powers not delegated to the national government that are kept by the states.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: [
      'Application: Under the 10th Amendment, this includes things like public education and police powers.',
    ],
  },
  {
    id: 'concurrent-powers',
    term: 'Concurrent Powers',
    definition: 'Powers shared by both the federal and state governments.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: ['Application: The power to tax and the power to build roads.'],
  },
  {
    id: 'categorical-grants',
    term: 'Categorical Grants',
    definition:
      'Federal funding restricted to specific categories of expenditures.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: [
      'Application: Federal money given specifically for a Head Start program or a specific highway project.',
    ],
  },
  {
    id: 'block-grants',
    term: 'Block Grants',
    definition:
      'Federal funding with minimal restrictions provided to states for broad policy areas.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: [
      'Application: Money given for community development where the state decides which local projects to fund.',
    ],
  },
  {
    id: 'participatory-democracy-ideals',
    term: 'Participatory Democracy',
    definition:
      'A system of government where rank-and-file citizens rule themselves rather than electing representatives to govern on their behalf.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: ['Rooted in the ideal of direct individual involvement in the social contract.'],
  },
  {
    id: 'grand-committee',
    term: 'Grand Committee',
    definition:
      'A group of delegates at the Constitutional Convention representing each of the states, responsible for forging the Great Compromise.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: ['Crucial for understanding the negotiation/compromise aspect of EK 1.1.A.3.'],
  },
  {
    id: 'declaration-of-independence-logic',
    term: 'Right of Revolution',
    definition:
      'The principle that when a government acts against the interests of the people, the people have the right to change or abolish it.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: ['This is the ultimate expression of popular sovereignty in the Declaration.'],
  },
  {
    id: 'civil-society',
    term: 'Civil Society',
    definition: 'Groups outside of the government that help people define and advance their own interests.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: ['Pluralist democracy relies on a robust civil society of interest groups.'],
  },
  {
    id: 'initiative-and-referendum',
    term: 'Initiative and Referendum',
    definition:
      'Processes that allow citizens to place proposed laws on the ballot or vote on laws passed by the legislature.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: ['Classic examples of participatory democracy used at the state level today.'],
  },
  {
    id: 'hyperpluralism',
    term: 'Hyperpluralism',
    definition:
      'A theory that groups are so strong that government is weakened or unable to function (gridlock).',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: ['Often used as a "distractor" or counter-argument to pluralist theory.'],
  },
  {
    id: 'tyranny-of-the-majority',
    term: 'Tyranny of the Majority',
    definition:
      'A situation in which a government or other authority democratically supported by a majority makes policies that benefit that majority at the expense of a minority.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: ["Madison's primary fear in Federalist No. 10."],
  },
  {
    id: 'refining-the-public-views',
    term: 'Refinement of Public Views',
    definition:
      "Madison's idea that elected representatives serve as a filter, resulting in more moderate and wise policies than direct democracy.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: ['Key distinction between the Republican model and the Participatory model.'],
  },
  {
    id: 'uncontrollable-power',
    term: 'Uncontrollable Power',
    definition:
      'Brutus’s claim that the power to tax and the "Necessary and Proper" clause would eventually destroy state governments.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: ['Specific textual evidence for Brutus 1 arguments.'],
  },
  {
    id: 'unanimous-consent',
    term: 'Unanimous Consent',
    definition:
      'The requirement that all 13 states agree to any amendment of the Articles of Confederation.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.4'],
    subNotes: [
      'This made the Articles virtually impossible to fix, leading to the "illegal" meeting in Philadelphia.',
    ],
  },
  {
    id: 'import-duties',
    term: 'Import Duties',
    definition: 'Taxes on goods coming into a country, which the Confederation Congress lacked the power to collect.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.4'],
    subNotes: ['Relates to the "lack of power to tax" and the resulting national debt crisis.'],
  },
  {
    id: 'sovereignty-states',
    term: 'State Sovereignty',
    definition: 'The concept that states hold the ultimate power and the national government is subordinate.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.4'],
    subNotes: ['Explicitly stated in Article II of the Articles of Confederation.'],
  },
  {
    id: 'article-v',
    term: 'Article V',
    definition: 'The section of the Constitution that outlines the formal amendment process.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.5'],
    subNotes: [
      'Illustrates the principle of federalism: Proposal is national, Ratification is state-level.',
    ],
  },
  {
    id: 'electoral-college-compromise',
    term: 'Electoral College Compromise',
    definition:
      'The decision to have the president elected by electors rather than by Congress or direct popular vote.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.5'],
    subNotes: ['A compromise between elite democracy and popular sovereignty.'],
  },
  {
    id: 'importation-clause',
    term: 'Slave Trade Clause',
    definition:
      'An agreement that the migration or importation of persons (slaves) could not be prohibited by Congress until 1808.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.5'],
    subNotes: ['A key compromise required to secure the support of the Deep South.'],
  },
  {
    id: 'federalist-no-51-quote',
    term: 'Ambition Must Counteract Ambition',
    definition:
      "Madison's argument that the personal interests of officeholders in each branch will naturally lead them to resist encroachments from other branches.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.6'],
    subNotes: ['The psychological engine behind checks and balances.'],
  },
  {
    id: 'veto-override',
    term: 'Veto Override',
    definition:
      'The power of Congress to pass a law over a presidential veto with a two-thirds majority in both chambers.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.6'],
    subNotes: ['A primary example of a check by the Legislative branch on the Executive.'],
  },
  {
    id: 'advice-and-consent',
    term: 'Advice and Consent',
    definition: 'The power of the Senate to consult on and approve treaties and presidential appointments.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.6'],
    subNotes: ['Check on executive power specifically related to the "exclusive" Senate powers.'],
  },
  {
    id: 'devolution',
    term: 'Devolution',
    definition: 'The transfer of powers and responsibilities from the federal government back to the states.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: [
      'Often associated with "New Federalism" and the Republican "Contract with America" in the 1990s.',
    ],
  },
  {
    id: 'unfunded-mandate',
    term: 'Unfunded Mandate',
    definition:
      'A regulation that requires a state or local government to perform certain actions, but provides no money for fulfilling the requirements.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: ['Example: The Clean Air Act or the Americans with Disabilities Act.'],
  },
  {
    id: 'fiscal-federalism',
    term: 'Fiscal Federalism',
    definition: 'The pattern of spending, taxing, and providing grants in the federal system.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: ['This is the "carrot and stick" approach to influencing state policy.'],
  },
  {
    id: 'necessary-and-proper-clause',
    term: 'Elastic Clause',
    definition:
      'A statement in the Constitution granting Congress the power to pass all laws "necessary and proper" for carrying out the enumerated list of powers.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.8'],
    subNotes: ['The primary source of implied powers.'],
  },
  {
    id: 'selective-incorporation',
    term: 'Selective Incorporation',
    definition:
      "The process by which the Supreme Court has applied most of the Bill of Rights to the states using the 14th Amendment's Due Process Clause.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.8'],
    subNotes: ['A major shift in the balance of power toward the federal government.'],
  },
  {
    id: 'united-states-v-lopez-impact',
    term: 'Commerce Clause Limitation',
    definition:
      'The legal principle that federal power under the Commerce Clause does not extend to non-economic activities.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.8'],
    subNotes: [
      'Established in U.S. v. Lopez (1995); the first time the Court limited the Commerce Clause in 60 years.',
    ],
  },
  {
    id: 'access-points-lobbying',
    term: 'Multiple Access Points',
    definition:
      'The numerous levels and branches of government where citizens and interest groups can influence policy.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: [
      'If a group fails at the federal level, they can try the state level (e.g., marijuana legalization).',
    ],
  },
  {
    id: 'policy-innovation',
    term: 'Laboratories of Democracy',
    definition:
      'The idea that states can experiment with new policies, and if they work, they can be adopted by other states or the federal government.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: [
      "Example: Massachusetts's healthcare reform served as a model for the Affordable Care Act.",
    ],
  },
  {
    id: 'preemption',
    term: 'Preemption',
    definition:
      'The right of a federal law or a regulation to preclude enforcement of a state or local law or regulation.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: ['Based on the Supremacy Clause.'],
  },
];

export const keyTerms: KeyTerm[] = [
  ...apGovUnit1KeyTerms,
  ...apGovUnit2KeyTerms,
  ...apGovUnit3CompleteMasterTerms,
  ...apGovUnit4KeyTerms,
  ...apGovUnit5KeyTerms,
];

export interface GovSupremeCourtCase {
  id: string;
  caseName: string;
  year: number;
  unit: number;
  lessonIDs: string[];
  videoUrl?: string;
  /** Seconds into the video to show as the preview frame before play (avoids a black/blank 0:00 poster). */
  videoPosterTimeSeconds?: number;
  summary: string;
  facts: string;
  constitutionalQuestion: string;
  holding: string;
  reasoning: string[];
}

export const govUnitSupremeCourtCases: Record<number, GovSupremeCourtCase[]> = {
  1: [
    {
      id: 'marbury-v-madison-1803',
      caseName: 'Marbury v. Madison',
      year: 1803,
      unit: 1,
      lessonIDs: ['1.6'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/marbury+mads+final.mp4',
      summary:
        'Established judicial review by holding that the Supreme Court may declare acts of Congress unconstitutional.',
      facts:
        'William Marbury sued Secretary of State James Madison to deliver his judicial commission after a last-minute appointment by outgoing President John Adams.',
      constitutionalQuestion:
        'Did the Supreme Court have the authority to order Madison to deliver the commission, and could the Court strike down a federal law that conflicted with the Constitution?',
      holding:
        'The Court ruled that Marbury was entitled to his commission but could not receive it through the Court because the provision of the Judiciary Act of 1789 expanding original jurisdiction was unconstitutional.',
      reasoning: [
        'Article III defines the Court’s original jurisdiction; Congress cannot expand it by statute.',
        'When a law conflicts with the Constitution, the Constitution must prevail.',
        'The judiciary has the duty to say what the law is — the foundation of judicial review.',
      ],
    },
    {
      id: 'mcculloch-v-maryland-1819',
      caseName: 'McCulloch v. Maryland',
      year: 1819,
      unit: 1,
      lessonIDs: ['1.8'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/mcculloch+v+maryland+final.mp4',
      summary:
        'Congress has implied powers under the Necessary and Proper Clause, and states cannot tax valid federal institutions.',
      facts: 'Congress created a national bank, and Maryland attempted to tax that bank.',
      constitutionalQuestion:
        "Can Congress create a bank even though it is not explicitly listed in Article I, and can a state tax a federal institution?",
      holding: 'The Court ruled in favor of the federal government.',
      reasoning: [
        'Necessary and Proper Clause supports implied federal powers when tied to enumerated powers.',
        'Supremacy Clause prevents states from undermining legitimate federal action.',
      ],
    },
    {
      id: 'united-states-v-lopez-1995',
      caseName: 'United States v. Lopez',
      year: 1995,
      unit: 1,
      lessonIDs: ['1.9'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/US+v+Lopez.mp4',
      videoPosterTimeSeconds: 4,
      summary:
        'Congress exceeded its Commerce Clause authority by criminalizing gun possession in school zones.',
      facts:
        'A student brought a gun to school and was charged under the federal Gun-Free School Zones Act.',
      constitutionalQuestion:
        'Does the Commerce Clause allow Congress to regulate gun possession in local school zones?',
      holding: 'The Court ruled in favor of Lopez and struck down the federal law.',
      reasoning: [
        'Carrying a gun in a school zone is non-economic activity.',
        'The statute lacked a sufficient connection to interstate commerce.',
        'The decision reaffirmed limits on federal power and preserved state sovereignty.',
      ],
    },
  ],
  2: [
    {
      id: 'baker-v-carr-1962',
      caseName: 'Baker v. Carr',
      year: 1962,
      unit: 2,
      lessonIDs: ['2.10'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/baker+vcarr.mp4',
      summary:
        'Legislative malapportionment claims are justiciable, opening the door to the “one person, one vote” principle.',
      facts:
        'Tennessee voters challenged grossly unequal state legislative districts that had not been redrawn in decades despite major population shifts.',
      constitutionalQuestion:
        'Can federal courts hear challenges to state legislative districting under the Equal Protection Clause, or is redistricting a nonjusticiable political question?',
      holding:
        'The Court held that malapportionment claims are justiciable and may be reviewed by federal courts.',
      reasoning: [
        'Unequal representation raises constitutional questions under the Fourteenth Amendment.',
        'The case rejected the idea that all redistricting disputes are beyond judicial review.',
        'It paved the way for later rulings requiring substantially equal population in legislative districts.',
      ],
    },
    {
      id: 'shaw-v-reno-1993',
      caseName: 'Shaw v. Reno',
      year: 1993,
      unit: 2,
      lessonIDs: ['2.3'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/shaw+v+reno.mp4',
      summary:
        'Racial gerrymandering that sorts voters by race may violate the Equal Protection Clause even when intended to help minority representation.',
      facts:
        'North Carolina created a highly irregular congressional district drawn primarily to concentrate African American voters.',
      constitutionalQuestion:
        'Does a bizarrely shaped majority-minority district drawn predominantly on the basis of race violate the Equal Protection Clause?',
      holding:
        'The Court ruled that such districts are subject to strict scrutiny and remanded the case for further review.',
      reasoning: [
        'Redistricting driven primarily by race triggers Equal Protection analysis.',
        'Irregular districts drawn to separate voters by race cannot escape constitutional scrutiny.',
        'The decision limited race-conscious districting while leaving room for Voting Rights Act compliance.',
      ],
    },
  ],
  3: [
    {
      id: 'schenck-v-united-states-1919',
      caseName: 'Schenck v. United States',
      year: 1919,
      unit: 3,
      lessonIDs: ['3.3'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/schenck+vs+usa.mp4',
      summary:
        'Speech may be restricted when it creates a clear and present danger, especially during wartime.',
      facts:
        'Charles Schenck distributed anti-draft leaflets urging resistance to World War I conscription and was convicted under the Espionage Act.',
      constitutionalQuestion:
        'Does the First Amendment protect speech that encourages draft resistance during wartime?',
      holding: 'The Court upheld Schenck’s conviction.',
      reasoning: [
        'The First Amendment is not absolute in every circumstance.',
        'Speech that creates a clear and present danger to the nation may be punished.',
        'The famous analogy: the most stringent protection of free speech would not protect falsely shouting fire in a crowded theater.',
      ],
    },
    {
      id: 'engel-v-vitale-1962',
      caseName: 'Engel v. Vitale',
      year: 1962,
      unit: 3,
      lessonIDs: ['3.2'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/engel+v+vitale.mp4',
      summary:
        'State-sponsored prayer in public schools violates the Establishment Clause even when participation is voluntary.',
      facts:
        'New York required public schools to begin each day with a brief, state-composed prayer.',
      constitutionalQuestion:
        'Does a state-directed prayer in public schools violate the Establishment Clause of the First Amendment?',
      holding: 'The Court struck down the state prayer requirement.',
      reasoning: [
        'Government may not compose or promote an official prayer for public schools.',
        'The practice advanced religion even though students could remain silent.',
        'The Establishment Clause forbids government endorsement of religion in public education.',
      ],
    },
    {
      id: 'wisconsin-v-yoder-1972',
      caseName: 'Wisconsin v. Yoder',
      year: 1972,
      unit: 3,
      lessonIDs: ['3.2'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/wisc+v+yoder.mp4',
      summary:
        'Amish families may be exempt from compulsory high school attendance when it burdens sincere religious practice.',
      facts:
        'Amish parents refused to send their children to high school after eighth grade, citing religious convictions.',
      constitutionalQuestion:
        'Does compulsory school attendance beyond eighth grade violate the Free Exercise Clause for the Amish?',
      holding: 'The Court ruled for the Amish parents.',
      reasoning: [
        'Sincere religious belief outweighed the state’s general interest in compulsory education past eighth grade.',
        'Forcing Amish students into high school would seriously threaten their way of life.',
        'The Free Exercise Clause protects minority religious communities from substantial burdens.',
      ],
    },
    {
      id: 'mcdonald-v-chicago-2010',
      caseName: 'McDonald v. Chicago',
      year: 2010,
      unit: 3,
      lessonIDs: ['3.7'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/mdonald+v+chicago.mp4',
      summary:
        'The Second Amendment right to bear arms for self-defense is incorporated against state and local governments.',
      facts:
        'Chicago residents challenged a city handgun ban after the Court recognized an individual Second Amendment right in Heller.',
      constitutionalQuestion:
        'Does the Second Amendment apply to state and local gun regulations through the Fourteenth Amendment?',
      holding: 'The Court struck down the handgun ban as applied to the states.',
      reasoning: [
        'The right to keep and bear arms for self-defense is fundamental.',
        'Selective incorporation extended the Second Amendment to the states via the Due Process Clause.',
        'States and cities may not impose total handgun bans on law-abiding citizens for home self-defense.',
      ],
    },
  ],
  4: [
    {
      id: 'gideon-v-wainwright-1963',
      caseName: 'Gideon v. Wainwright',
      year: 1963,
      unit: 4,
      lessonIDs: ['4.10'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/gideon+v+wainwight.mp4',
      summary:
        'States must provide attorneys to indigent defendants charged with serious crimes in felony cases.',
      facts:
        'Clarence Earl Gideon was denied a court-appointed lawyer in a Florida felony trial and was convicted of breaking into a pool hall.',
      constitutionalQuestion:
        'Does the Sixth Amendment right to counsel require states to provide lawyers for defendants who cannot afford one?',
      holding: 'The Court ruled for Gideon and ordered a new trial with appointed counsel.',
      reasoning: [
        'A fair trial requires effective assistance of counsel in serious criminal cases.',
        'The Sixth Amendment right to counsel was incorporated to the states.',
        'Justice cannot depend on whether a defendant can pay for a lawyer.',
      ],
    },
    {
      id: 'tinker-v-des-moines-1969',
      caseName: 'Tinker v. Des Moines',
      year: 1969,
      unit: 4,
      lessonIDs: ['4.4'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/tinker+v+des+moines.mp4',
      summary:
        'Students may engage in symbolic speech at school unless it causes a substantial disruption.',
      facts:
        'Students wore black armbands to protest the Vietnam War and were suspended after school officials banned the protest.',
      constitutionalQuestion:
        'Does the First Amendment protect symbolic student speech in public schools?',
      holding: 'The Court ruled for the students and protected the armband protest.',
      reasoning: [
        'Students do not shed constitutional speech rights at the schoolhouse gate.',
        'Schools may restrict speech only when it materially and substantially disrupts school operations.',
        'Mere fear of disturbance is not enough to justify censorship of political expression.',
      ],
    },
    {
      id: 'new-york-times-v-united-states-1971',
      caseName: 'New York Times Co. v. United States',
      year: 1971,
      unit: 4,
      lessonIDs: ['4.4'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/NYT+VS+USA.mp4',
      summary:
        'The government may not impose prior restraint on the press without meeting an extremely heavy burden.',
      facts:
        'The Nixon administration sought to block newspapers from publishing the classified Pentagon Papers about the Vietnam War.',
      constitutionalQuestion:
        'Can the executive branch stop publication of classified material through prior restraint?',
      holding: 'The Court refused to allow the government to block publication.',
      reasoning: [
        'Prior restraint on the press bears a heavy presumption against its constitutionality.',
        'The government did not show that immediate, irreparable harm to national security justified censorship.',
        'The case strengthened press freedom against executive secrecy claims.',
      ],
    },
  ],
  5: [
    {
      id: 'brown-v-board-of-education-1954',
      caseName: 'Brown v. Board of Education',
      year: 1954,
      unit: 5,
      lessonIDs: ['5.1'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/brown+v+board.mp4',
      summary:
        'Racially segregated public schools violate the Equal Protection Clause because separate facilities are inherently unequal.',
      facts:
        'Multiple lawsuits challenged state laws requiring racially segregated public schools, consolidated before the Supreme Court.',
      constitutionalQuestion:
        'Does racial segregation in public education violate the Fourteenth Amendment’s Equal Protection Clause?',
      holding: 'The Court unanimously declared school segregation unconstitutional.',
      reasoning: [
        'Separate educational facilities stamp African American children with a badge of inferiority.',
        'Segregation in public schools denies equal protection even when physical facilities are similar.',
        'The decision overturned the “separate but equal” doctrine from Plessy v. Ferguson in public education.',
      ],
    },
    {
      id: 'citizens-united-v-fec-2010',
      caseName: 'Citizens United v. FEC',
      year: 2010,
      unit: 5,
      lessonIDs: ['5.11'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/citizens+united+vs+fec.mp4',
      summary:
        'Independent political spending by corporations and unions is protected speech and cannot be limited by the government.',
      facts:
        'Citizens United produced a film critical of Hillary Clinton and sought to distribute it close to an election in ways restricted by federal campaign finance law.',
      constitutionalQuestion:
        'May the government ban independent political expenditures by corporations and unions under the First Amendment?',
      holding: 'The Court struck down restrictions on independent corporate political spending.',
      reasoning: [
        'Political speech lies at the core of First Amendment protection.',
        'Independent expenditures are not the same as direct contributions to candidates.',
        'The government may not suppress speech based on the speaker’s corporate identity.',
      ],
    },
    {
      id: 'roe-v-wade-1973',
      caseName: 'Roe v. Wade',
      year: 1973,
      unit: 5,
      lessonIDs: ['5.7'],
      videoUrl:
        'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_gov/supreme_court_cases/roe+v+wade.mp4',
      summary:
        'The Constitution protects a woman’s right to choose an abortion, balanced against the state’s interest in regulating the procedure.',
      facts:
        'A Texas woman challenged a state law criminalizing nearly all abortions except those necessary to save the mother’s life.',
      constitutionalQuestion:
        'Does the Constitution recognize a right to privacy that limits state abortion restrictions?',
      holding: 'The Court struck down Texas’s broad abortion ban.',
      reasoning: [
        'A zone of personal privacy includes decisions about marriage, family, and reproduction.',
        'States may regulate abortion more heavily as pregnancy advances and fetal viability nears.',
        'The decision framed abortion as a balance between individual liberty and legitimate state interests.',
      ],
    },
  ],
};

