import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 2 MCQ **practice** pool.
 * Merged into `allQuestions` via `govMcqPractice.ts`.
 *
 * Passages / excerpts: preamble (optional), excerpt, then `\n\n`, then the stem (`ApGovQuestionText`).
 */
export const govUnit2McqPracticeQuestions: Question[] = [
  {
    id: 6037,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.6'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-70',
    question:
      'Questions 1-2 refer to the following excerpt.\n\n"Energy in the Executive is a leading character in the definition of good government. It is essential to the protection of the community against foreign attacks; it is essential to the steady administration of the laws; to the protection of property against those irregular and high-handed combinations which sometimes interrupt the ordinary course of justice; to the security of liberty against the enterprises and assaults of ambition, of faction, and of anarchy."\n—Publius (Alexander Hamilton), Federalist No. 70, 1788\n\nWhich of the following institutional features is the author defending in the passage above?',
    image: null,
    options: [
      'A single president who can act with decisiveness and dispatch.',
      'A system of checks and balances to prevent executive overreach.',
      'The expansion of implied presidential war-making powers.',
      'The establishment of lifelong terms for executive officials.',
    ],
    correctAnswer: 'A',
    explanation:
      'Hamilton explicitly argues in Federalist No. 70 that "Energy in the Executive is a leading character in the definition of good government" and that a single executive ("unity") ensures this energy, decision, and dispatch.',
  },
  {
    id: 6038,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.6'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-70',
    question:
      'Based on the text of Federalist No. 70, which of the following modern actions by a president would the author most strongly support?',
    image: null,
    options: [
      'Agreeing to a bipartisan compromise bill that delays national implementation of energy policy.',
      'Issuing a rapid executive order directing federal agencies to secure critical supply chains during an international crisis.',
      'Consulting with a massive cabinet of twenty advisors before ordering a strategic drone strike.',
      'Refusing to veto legislation that has clear, overwhelming popular support among citizens.',
    ],
    correctAnswer: 'B',
    explanation:
      "Hamilton's argument for an energetic single executive emphasizes speed and decisiveness in execution, especially during crises. Issuing a rapid executive order to secure critical supply chains directly reflects this execution style.",
  },
  {
    id: 6039,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-51-compound',
    question:
      'Questions 3-4 refer to the following excerpt.\n\n"In a single republic, all the power surrendered by the people is submitted to the administration of a single government; and the usurpations are guarded against by a division of the government into distinct and separate departments. In the compound republic of America, the power surrendered by the people is first divided between two distinct governments, and then the portion allotted to each subdivided among distinct and separate departments. Hence a double security arises to the rights of the people. The different governments will control each other, at the same time that each will be controlled by itself."\n—Publius (James Madison), Federalist No. 51, 1788\n\nWhich of the following principles of American government is best illustrated by the concept of a "compound republic" described in the excerpt?',
    image: null,
    options: ['Elite democracy', 'Judicial review', 'Federalism', 'Bicameralism'],
    correctAnswer: 'C',
    explanation:
      'Madison describes a "compound republic" where power is divided between "two distinct governments" (national and state) and then subdivided into departments (branches). This division between two levels of government explicitly defines federalism.',
  },
  {
    id: 6040,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2', '2.5'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-51-compound',
    question:
      'According to Federalist No. 51, the "double security" guarding the rights of the people relies primarily on the interaction between which two concepts?',
    image: null,
    options: [
      'Enumerated powers and the Bill of Rights',
      'Separation of powers and federalism',
      'Popular sovereignty and direct democracy',
      'Judicial review and executive agreements',
    ],
    correctAnswer: 'B',
    explanation:
      'The text explicitly notes a double security: first, division between two distinct governments (federalism), and second, subdivision among separate departments (separation of powers).',
  },
  {
    id: 6041,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-78-judiciary',
    question:
      'Questions 5-6 refer to the following excerpt.\n\n"The judiciary, on the contrary, has no influence over either the sword or the purse; no direction either of the strength or of the wealth of the society; and can take no active resolution whatever. It may truly be said to have neither FORCE nor WILL, but merely judgment; and must ultimately depend upon the aid of the executive arm even for the efficacy of its judgments."\n—Publius (Alexander Hamilton), Federalist No. 78, 1788\n\nWhich of the following statements best describes Hamilton\'s argument regarding the power of the judiciary in the passage above?',
    image: null,
    options: [
      'The Supreme Court requires the power of the purse to effectively challenge Congress.',
      'The judiciary is structurally the weakest branch because it lacks an independent enforcement mechanism.',
      'Legal precedents are legally binding only if explicitly approved by the president.',
      'Life tenure makes federal judges too disconnected from the will of the democratic electorate.',
    ],
    correctAnswer: 'B',
    explanation:
      'Hamilton famously states the judiciary has no control over the "sword" (executive enforcement) or the "purse" (legislative funding) and has "neither FORCE nor WILL, but merely judgment," rendering it structurally the weakest branch.',
  },
  {
    id: 6042,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-78-judiciary',
    question:
      'Which of the following actions by another branch of government serves as a direct example of the dynamic Hamilton warns about when he notes the Court must "depend upon the aid of the executive arm"?',
    image: null,
    options: [
      'Congress passing legislation to adjust the appellate jurisdiction of federal district courts.',
      'The Senate failing to confirm a controversial judicial nominee selected by the president.',
      'A state government or president slowing down or refusing to implement a desegregation ruling.',
      'The House of Representatives initiating impeachment proceedings against a federal judge.',
    ],
    correctAnswer: 'C',
    explanation:
      'Because the courts lack independent enforcement power ("the sword"), they rely on the executive. When executives or states refuse to enforce or delay rulings (such as resisting Brown v. Board), it directly illustrates this structural vulnerability.',
  },
  {
    id: 6043,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.5'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-fed-51-ambition',
    question:
      'Questions 7 refer to the following excerpt.\n\n"The result of these observations is, that the several departments ought to be so far connected and blended as to give to each a constitutional control over the others... The great security against a gradual concentration of the several powers in the same department, consists in giving to those who administer each department the necessary constitutional means and personal motives to resist encroachments of the others."\n—Publius (James Madison), Federalist No. 51, 1788\n\nWhich of the following institutional procedures best embodies Madison\'s call for branches to have the "constitutional means... to resist encroachments"?',
    image: null,
    options: [
      'The House of Representatives choosing its own Speaker.',
      'The Senate conducting a confirmation hearing for a Supreme Court nominee.',
      'A federal agency using its rulemaking authority to implement a vague statute.',
      'A member of Congress acting under the trustee model of representation.',
    ],
    correctAnswer: 'B',
    explanation:
      "Senate confirmation hearings are an operational check that gives the legislative branch the constitutional means to resist executive dominance over the judicial branch, directly matching Madison's definition of checks and balances.",
  },
  {
    id: 6044,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-judge-immigration',
    question:
      'A federal judge rules that an executive order regarding immigration violates federal statutory law. In response, the president publicly criticizes the judge but orders federal agents to comply with the ruling. This scenario demonstrates the interaction of which political concepts?',
    image: null,
    options: [
      'Executive supremacy and federalism',
      'Judicial review and institutional checks and balances',
      'Judicial restraint and direct participatory democracy',
      'Delegated discretionary authority and gridlock',
    ],
    correctAnswer: 'B',
    explanation:
      "The judge's action is an exercise of judicial review, and the president's ultimate compliance, despite disagreement, shows the functioning of systemic institutional checks and balances.",
  },
  {
    id: 6045,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-trade-vote',
    question:
      'A member of the House of Representatives learns that 75% of her constituents oppose a new trade agreement. However, she believes the agreement will revitalize manufacturing in her district over the next decade. She casts her vote in favor of the trade agreement. Which model of representation is this lawmaker demonstrating?',
    image: null,
    options: ['Delegate', 'Politico', 'Trustee', 'Virtual'],
    correctAnswer: 'C',
    explanation:
      'Under the trustee model, a representative votes based on their own knowledge, conscience, and judgment of long-term interests, even if it conflicts with immediate constituent preferences.',
  },
  {
    id: 6046,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-politico-scenario',
    question:
      'Which of the following scenarios best depicts a member of Congress acting according to the politico model of representation?',
    image: null,
    options: [
      'A senator strictly follows her own conscience on highly technical environmental bills but votes exactly as her party leadership demands on high-profile social issues.',
      'A representative sends a mass poll to his district and pledges to vote exactly in accordance with the majority response on an upcoming tax bill.',
      'A senator votes to confirm a judicial nominee she personally dislikes because her state\'s voters overwhelmingly favor the candidate, while using her own judgment on low-profile infrastructure spending bills.',
      'A representative uniformly votes against every piece of defense spending because he campaigned as a non-interventionist candidate.',
    ],
    correctAnswer: 'C',
    explanation:
      'A politico balances different representation models depending on the issue—acting as a delegate on high-salience issues that constituents care deeply about and a trustee on low-salience issues.',
  },
  {
    id: 6047,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-comparison-chamber-structure',
    question:
      'Which of the following is an accurate comparison of the structural features of the House of Representatives and the Senate?',
    image: null,
    optionTableHeaders: ['House', 'Senate'],
    options: [
      'Debates are highly formal and tightly limited by rules | Debates are less formal and allow for mechanisms like the filibuster',
      'Serves as a continuous body with staggered elections | All members face re-election simultaneously every two years',
      'Members represent states equally regardless of size | Members represent districts apportioned by population',
      'Retains the sole constitutional power to ratify foreign treaties | Retains the sole constitutional power to originate all revenue bills',
    ],
    correctAnswer: 'A',
    explanation:
      'The House has 435 members and requires highly formal, rigid rules to manage debate. The Senate has 100 members, allows for more informal proceedings, and permits unlimited debate tactics like the filibuster.',
  },
  {
    id: 6048,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-comparison-chamber-procedure',
    question:
      'Which of the following is an accurate comparison of the legislative powers and procedures unique to each chamber of Congress?',
    image: null,
    optionTableHeaders: ['House', 'Senate'],
    options: [
      'Can introduce bills related to domestic policy only | Can introduce bills related to foreign policy only',
      'Utilizes discharge petitions to bring bills to the floor | Utilizes unanimous consent agreements to manage debate',
      'Holds the sole power to try all institutional impeachments | Holds the sole power to initiate the impeachment process',
      'Regulated entirely by a non-partisan Rules Committee | Regulated entirely by a rotating committee of senior state governors',
    ],
    correctAnswer: 'B',
    explanation:
      'The House utilizes discharge petitions to bypass committee chairs and bring bills to the floor; the Senate relies heavily on unanimous consent agreements to manage its calendar.',
  },
  {
    id: 6049,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-structural-effects',
    question:
      'Which of the following statements best describes how the structural differences between the House of Representatives and the Senate affect the policymaking process?',
    image: null,
    options: [
      'The smaller size of the House allows individual representatives to delay national security legislation indefinitely.',
      'The six-year term of senators isolates them more from short-term public passions than representatives serving two-year terms.',
      'The Senate\'s formal rules committee strictly regulates the length of debate on every single spending bill.',
      'The requirement that all federal bills originate in the Senate makes it more powerful than the House in fiscal matters.',
    ],
    correctAnswer: 'B',
    explanation:
      'The longer six-year term of senators was explicitly designed to insulate them from rapid shifts in popular public mood, whereas the two-year House terms keep representatives tightly tied to immediate popular passions.',
  },
  {
    id: 6050,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-divided-gov-midterm',
    question:
      'During a mid-term election, the opposition party wins a majority of seats in both the House of Representatives and the Senate, while the sitting president\'s term has two years remaining. Which of the following is a likely political outcome of this scenario?',
    image: null,
    options: [
      'An immediate reduction in the size of the federal bureaucratic apparatus.',
      'Increased legislative gridlock and intensified scrutiny during confirmation hearings.',
      'A decrease in the president\'s use of informal powers like executive orders.',
      'The automatic expiration of all prior primary and secondary legal precedents.',
    ],
    correctAnswer: 'B',
    explanation:
      "Divided government (where the president's party does not control Congress) typically creates structural institutional friction, causing increased legislative gridlock and combative confirmation battles.",
  },
  {
    id: 6051,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-cloture-senate',
    question:
      'A senator wishes to delay a vote on a sweeping corporate deregulation bill. She takes the floor and speaks continuously for several hours without sitting down or yielding. Which of the following mechanisms can the Senate use to legally terminate this action?',
    image: null,
    options: [
      'A discharge petition signed by a simple majority of members.',
      'A dynamic ruling of unconstitutionality by the Speaker of the House.',
      'A motion for cloture approved by a three-fifths supermajority vote.',
      'A formal directive issued under the president\'s signing statements.',
    ],
    correctAnswer: 'C',
    explanation:
      'A filibuster can only be ended formally in the Senate by a motion for cloture, which requires a three-fifths supermajority vote (currently 60 senators).',
  },
  {
    id: 6052,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-brown-compliance',
    question:
      'Questions 16 refer to the following summary.\n\n"In 1954, five separate cases challenging segregation in public schools were consolidated under Brown v. Board of Education. The Supreme Court issued a unanimous ruling declaring that state laws establishing separate public schools for black and white students were inherently unequal and violated the Fourteenth Amendment. Despite the clear ruling, implementation across southern states was met with massive resistance, prompting the Court to issue a second ruling in 1955 ordering desegregation to proceed \'with all deliberate speed.\'"\n\nThe historical scenario described above illustrates which of the following core characteristics of the American judicial system?',
    image: null,
    options: [
      'The Supreme Court relies entirely on the legislative branch to draft constitutional amendments when states resist rulings.',
      'Executive and state non-compliance can significantly limit the immediate impact of judicial holdings.',
      'Stare decisis prevents the Court from modifying or enforcing its own prior constitutional interpretations.',
      'Federal courts are structurally barred from ruling on matters involving public school infrastructure or local funding.',
    ],
    correctAnswer: 'B',
    explanation:
      'The widespread resistance to Brown and the subsequent need for Brown II demonstrates that federal court decisions can be checked or limited in real-world environments by executive or state reluctance to enforce them.',
  },
  {
    id: 6053,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-limit-scotus',
    question:
      'Which of the following pathways represents a constitutionally permissible method for Congress to limit the long-term impact of a Supreme Court decision that invalidates a federal statute?',
    image: null,
    options: [
      'Passing a resolution to strip the justices of their life tenure and force early retirement.',
      'Introducing and passing a constitutional amendment alongside the states to alter the constitutional framework under review.',
      'Mandating that the executive branch instantly defund the salaries of the dissenting justices.',
      'Issuing a dynamic executive order instructing federal courts to reverse their holding.',
    ],
    correctAnswer: 'B',
    explanation:
      'If the Court rules a law unconstitutional, Congress cannot overturn the ruling by standard statute or executive order. It must work to alter the underlying text via a constitutional amendment under Article V.',
  },
  {
    id: 6054,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.14'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-epa-replacement',
    question:
      'A president is dissatisfied with the regulatory enforcement strategy of the independent Environmental Protection Agency (EPA). Which of the following actions can the president take to alter the policy direction of the agency?',
    image: null,
    options: [
      "Replacing the current head of the EPA with an individual aligned with the administration's policy goals, subject to Senate confirmation.",
      'Issuing an executive order to instantly abolish the agency without congressional consent.',
      'Amending current federal laws to reduce the agency\'s statutory authority over carbon emissions.',
      'Filing a formal discharge petition to force the agency to alter its published administrative rules.',
    ],
    correctAnswer: 'A',
    explanation:
      'While the EPA is an independent agency, the president retains the power to appoint its leadership to shift internal policy directions, subject to Senate confirmation. The president cannot unilaterally abolish an agency created by statute.',
  },
  {
    id: 6055,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.13'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-rulemaking-sec',
    question:
      'Which of the following scenarios best demonstrates a bureaucratic agency exercising its delegated discretionary and rulemaking authority?',
    image: null,
    options: [
      'The Department of Defense requests an increase in defense spending during a congressional hearing.',
      'The Securities and Exchange Commission (SEC) drafts and enforces specific technical regulations to define and punish insider trading under federal securities law.',
      'The Supreme Court grants a writ of certiorari to hear a case involving an administrative fine.',
      'The Senate Foreign Relations Committee votes to approve a newly negotiated bilateral treaty.',
    ],
    correctAnswer: 'B',
    explanation:
      'Rulemaking authority allows administrative agencies to write specific, legally binding regulations that fill in the gaps of broad statutory mandates passed by Congress. The SEC creating specific rules for insider trading is a classic example.',
  },
  {
    id: 6056,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-comparison-presidential-power',
    question:
      'Which of the following is an accurate comparison of a formal power and an informal power of the President of the United States?',
    image: null,
    optionTableHeaders: ['Formal', 'Informal'],
    options: [
      'Vetoing an act of Congress | Issuing an executive order to manage federal operations',
      'Negotiating an executive agreement | Signing a formal treaty with a foreign nation',
      'Deploying federal troops as Commander-in-Chief | Appointing federal district court judges',
      'Giving the State of the Union address | Overriding a congressional vote with a signing statement',
    ],
    correctAnswer: 'A',
    explanation:
      'The veto power is explicitly enumerated in Article I of the Constitution (formal power), while the use of executive orders to direct internal bureaucratic operations is an informal power developed through practice.',
  },
  {
    id: 6057,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-signing-statement',
    question:
      'A president signs a sweeping infrastructure bill passed by Congress but attaches a document stating that the executive branch will interpret a specific provision regarding environmental metrics in a narrow way that minimizes impacts on businesses. This document is an example of a(n):',
    image: null,
    options: ['Executive agreement', 'Pocket veto', 'Signing statement', 'Executive order'],
    correctAnswer: 'C',
    explanation:
      "A signing statement is an informal executive commentary attached to a bill at signing that outlines the president's interpretation of how the law should be enforced or interpreted by the bureaucracy.",
  },
  {
    id: 6058,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-iron-triangle',
    question:
      'An ongoing alliance forms between a corporate agricultural interest group, the House Committee on Agriculture, and specialized analysts within the Department of Agriculture to maintain domestic farming subsidies. This stable, long-term relationship is best described as an example of:',
    image: null,
    options: ['An iron triangle', 'An issue network', 'Elite polarization', 'Concurrent federalism'],
    correctAnswer: 'A',
    explanation:
      'An iron triangle is defined as a stable, long-term relationship between a congressional committee, a bureaucratic agency, and an interest group working within a specific policy space.',
  },
  {
    id: 6059,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-issue-network-diff',
    question:
      'How do temporary issue networks differ from traditional iron triangles in the federal policymaking process?',
    image: null,
    options: [
      'Issue networks focus exclusively on foreign policy, whereas iron triangles operate within domestic spending.',
      'Issue networks are less formal, contain a broader range of conflicting stakeholders, and disband once a specific policy issue is addressed.',
      'Issue networks are explicitly protected under Article III, whereas iron triangles are governed by executive orders.',
      'Issue networks completely exclude interest groups and media figures from participating in debate.',
    ],
    correctAnswer: 'B',
    explanation:
      'Issue networks are fluid, loose, and dynamic webs of activists, academics, media figures, and interest groups that form around a specific problem and disband when it changes, contrasting with the rigid, permanent tripartite structure of iron triangles.',
  },
  {
    id: 6060,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.14'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-purse-mismanagement',
    question:
      'Which of the following institutional powers allows Congress to hold a bureaucratic agency accountable if it discovers that the agency is mismanaging public funds?',
    image: null,
    options: [
      'The power to issue a writ of mandamus to agency directors.',
      'The power of the purse to reduce or withhold the agency\'s budget appropriations.',
      'The power to alter the original appellate jurisdiction of the agency\'s internal hearings.',
      'The power to unilaterally appoint a new cabinet secretary without a vote.',
    ],
    correctAnswer: 'B',
    explanation:
      'The "power of the purse" is Congress\'s most powerful tool for bureaucratic accountability. If an agency misbehaves or mismanages funds, Congress can slash or condition its operational budget in the next appropriation cycle.',
  },
  {
    id: 6061,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-art1-sec9',
    question:
      'Questions 25 refer to the following excerpt.\n\n"The migration or importation of such persons as any of the states now existing shall think proper to admit, shall not be prohibited by the Congress prior to the year one thousand eight hundred and eight, but a tax or duty may be imposed on such importation, not exceeding ten dollars for each person."\n—United States Constitution, Article I, Section 9 (1787)\n\nThe constitutional text above is a direct product of which of the following compromises made during the Constitutional Convention?',
    image: null,
    options: [
      'The Great (Connecticut) Compromise',
      'The Three-Fifths Compromise',
      'The Electoral College Compromise',
      'The Commerce and Slave Trade Compromise',
    ],
    correctAnswer: 'D',
    explanation:
      'The explicit postponement of the slave trade ban until 1808 was a central feature of the Commerce and Slave Trade Compromise hashed out at the Constitutional Convention.',
  },
  {
    id: 6062,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-bicameral-constraint',
    question:
      'Which of the following describes a structural constraint established by the text of the Constitution that limits Congress\'s ability to pass domestic legislation quickly?',
    image: null,
    options: [
      'The requirement that all executive orders be approved by a majority of both houses.',
      'The bicameral structure requiring identical versions of a bill to pass both chambers.',
      'The power of the Supreme Court to issue advisory opinions before a bill is formally voted upon.',
      'The allocation of three mandatory seats per state within the House of Representatives.',
    ],
    correctAnswer: 'B',
    explanation:
      'The structural requirement of bicameralism ensures that both the House and the Senate must pass an identical version of a text before it can head to the president, acting as an intentional dynamic check against hasty lawmaking.',
  },
  {
    id: 6063,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-exec-agreement',
    question:
      'A president enters into an arrangement with the Prime Minister of Great Britain to share intelligence data without submitting the arrangement to the Senate for a two-thirds ratification vote. This action is constitutionally permissible as a use of:',
    image: null,
    options: [
      'A formal treaty',
      'An executive agreement',
      'An executive directive under the 22nd Amendment',
      'The legislative veto',
    ],
    correctAnswer: 'B',
    explanation:
      'Executive agreements are informal international agreements made by the president with foreign heads of state that carry the force of law but do not require Senate ratification.',
  },
  {
    id: 6064,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-case-summary-lopez',
    question:
      'Questions 28-29 refer to the following summary.\n\nAn Ohio resident challenged a federal statute that criminalized the possession of firearms near public schools, arguing that Congress lacked the constitutional authority to regulate local gun possession. The federal government countered that gun violence in schools negatively impacts the national economy and travel, thus falling under federal authority. The Supreme Court ruled 5-4 that the statute was unconstitutional, noting that the possession of a gun in a local school zone is not an economic activity that substantially affects interstate commerce.\n\nWhich of the following required Supreme Court cases is summarized in the passage above?',
    image: null,
    options: [
      'McCulloch v. Maryland (1819)',
      'United States v. Lopez (1995)',
      'Schenck v. United States (1919)',
      'Marbury v. Madison (1803)',
    ],
    correctAnswer: 'B',
    explanation:
      'United States v. Lopez (1995) struck down the federal Gun-Free School Zones Act, holding that possession of a firearm in a local school zone does not substantially affect interstate commerce.',
  },
  {
    id: 6065,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-case-summary-lopez',
    question:
      'Based on the holding in United States v. Lopez (1995), which of the following areas of public policy remains primarily within the reserved powers of state governments rather than the implied powers of the federal government?',
    image: null,
    options: [
      'The regulation of television and internet broadcasts across state boundaries.',
      'The coining and printing of currency after an economic crisis.',
      'The management of local public school safety zones and general policing.',
      'The establishment of uniform naturalization standards for immigrants.',
    ],
    correctAnswer: 'C',
    explanation:
      "The ruling in Lopez re-established boundaries on the federal government's use of the Commerce Clause, preserving traditional state police powers over local school areas and general public safety.",
  },
  {
    id: 6066,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-merit-system',
    question:
      'Which of the following features of the federal bureaucracy ensures that lower-level agency officials are hired based on professional qualifications and specialization rather than political connections?',
    image: null,
    options: [
      'The political patronage system',
      'The civil service merit system',
      'Executive compliance monitoring',
      'Congressional committee assignments',
    ],
    correctAnswer: 'B',
    explanation:
      'The modern civil service merit system relies on competitive testing and objective qualifications to ensure bureaucratic neutrality and competence, directly counteracting the historical spoils/patronage system.',
  },
  {
    id: 6067,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-art1-sec8-clause18',
    question:
      'Questions 31 refer to the following text.\n\n"The Congress shall have Power... To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers, and all other Powers vested by this Constitution in the Government of the United States, or in any Department or Officer thereof."\n—United States Constitution, Article I, Section 8, Clause 18\n\nIn which of the following required Supreme Court cases did the Court rely on the clause above to uphold the constitutionality of a national bank?',
    image: null,
    options: [
      'Marbury v. Madison (1803)',
      'McCulloch v. Maryland (1819)',
      'Baker v. Carr (1961)',
      'Shaw v. Reno (1993)',
    ],
    correctAnswer: 'B',
    explanation:
      'In McCulloch v. Maryland, the Court ruled that creating a national bank was a constitutionally valid exercise of implied powers under the Necessary and Proper Clause.',
  },
  {
    id: 6068,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-operationalize-review',
    question:
      'The constitutional principle of judicial review, which allows the Supreme Court to invalidate acts of Congress that conflict with the Constitution, was first explicitly operationalized in which case?',
    image: null,
    options: [
      'McCulloch v. Maryland (1819)',
      'Marbury v. Madison (1803)',
      'United States v. Lopez (1995)',
      'Zelman v. Simmons-Harris (2002)',
    ],
    correctAnswer: 'B',
    explanation:
      'Chief Justice John Marshall used Marbury v. Madison to formally establish the operational power of judicial review by declaring a section of the Judiciary Act of 1789 unconstitutional.',
  },
  {
    id: 6069,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-shaw-reno-scen',
    question:
      'A state legislature draws its congressional district boundaries in a highly irregular, jagged manner to ensure that a racial minority population is concentrated into a single district, guaranteeing their candidate wins that seat. Which required Supreme Court case established that such racial gerrymandering is subject to strict legal scrutiny under the Equal Protection Clause?',
    image: null,
    options: [
      'Baker v. Carr (1961)',
      'Shaw v. Reno (1993)',
      'Brown v. Board of Education (1954)',
      'Citizens United v. FEC (2010)',
    ],
    correctAnswer: 'B',
    explanation:
      'Shaw v. Reno held that districts drawn with highly irregular or bizarre shapes designed solely to separate voters into racial blocks violate the Equal Protection Clause and must face strict judicial scrutiny.',
  },
  {
    id: 6070,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-baker-carr-holding',
    question:
      'Which of the following best summarizes the core legal holding of Baker v. Carr (1961)?',
    image: null,
    options: [
      'Districts drawn with bizarre shapes solely to separate voters based on race violate the Fifteenth Amendment.',
      'Claims challenging legislative malapportionment under the Fourteenth Amendment are justiciable in federal courts, leading to the "one person, one vote" principle.',
      'The federal government has no authority to review state legislative maps because redistricting is a purely political question.',
      'Political action committees can make unlimited independent expenditures during state legislative elections.',
    ],
    correctAnswer: 'B',
    explanation:
      "Baker v. Carr established that legislative apportionment claims are justiciable in federal courts, opening the door for voters to challenge malapportionment under the Fourteenth Amendment's Equal Protection Clause.",
  },
  {
    id: 6071,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.7'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-bully-pulpit-tax',
    question:
      'A newly elected president uses his public visibility to deliver a series of prime-time televised addresses urging citizens to call their senators and demand the passage of a comprehensive middle-class tax cut. This strategy is an example of the president utilizing:',
    image: null,
    options: [
      'The formal power of the line-item veto',
      'The informal power of the bully pulpit',
      'Delegated discretionary authority',
      'Institutional executive privilege',
    ],
    correctAnswer: 'B',
    explanation:
      'The "bully pulpit" is an informal presidential power that leverages the visibility and prestige of the office to manage public opinion and pressure other institutional actors to support an agenda.',
  },
  {
    id: 6072,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-spending-demographics',
    question:
      'Congress passes an annual federal budget that includes $800 billion in mandatory spending for entitlement programs and $500 billion in discretionary spending for defense and infrastructure. Over time, as the cost of entitlement programs increases due to demographic shifts, which of the following long-term budgetary outcomes is most likely?',
    image: null,
    options: [
      'The constitutional requirement to balance the budget automatically triggers a reduction in tax rates.',
      'Discretionary spending opportunities will decrease unless federal revenues are increased or the deficit expands.',
      'Mandatory spending will automatically convert into pork-barrel legislation at the end of each fiscal cycle.',
      'The president will gain the constitutional authority to unilaterally adjust entitlement eligibility rules.',
    ],
    correctAnswer: 'B',
    explanation:
      'Mandatory spending is structurally legally required for entitlement programs. As these costs grow, they absorb a larger percentage of the overall budget, squeezing out discretionary spending unless revenues rise or the federal deficit expands.',
  },
  {
    id: 6073,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-stare-decisis',
    question:
      'Which of the following legal principles dictates that federal courts should generally adhere to established legal precedents when deciding new cases with substantially similar facts?',
    image: null,
    options: ['Stare decisis', 'Judicial activism', 'Writ of certiorari', 'Selective incorporation'],
    correctAnswer: 'A',
    explanation:
      'Stare decisis ("to stand by things decided") is the governing legal doctrine that obligates courts to follow historical legal precedent when managing current legal disputes with similar operational facts.',
  },
  {
    id: 6074,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-activism-philosophy',
    question:
      'A Supreme Court justice believes that the Court should actively interpret the Constitution to correct systemic injustices and protect marginalized groups, even if it means overturning long-standing legal precedents or invalidating actions taken by elected legislatures. This justice\'s philosophy is best described as:',
    image: null,
    options: ['Judicial restraint', 'Textualism', 'Judicial activism', 'Originalism'],
    correctAnswer: 'C',
    explanation:
      'Judicial activism is the philosophy that judges should look beyond strict historical precedent or legislative deference to interpret constitutional provisions progressively to resolve contemporary sociopolitical issues.',
  },
  {
    id: 6075,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.5', '2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-checks-judiciary',
    question:
      'Which of the following scenarios demonstrates the constitutional concept of checks and balances limiting the power of the federal judiciary?',
    image: null,
    options: [
      'A state governor issues an executive order expanding the size of the state\'s appellate court system.',
      'The Senate votes to reject a highly controversial judicial nominee chosen by the president to fill a Supreme Court vacancy.',
      'A federal district judge rules that an administrative regulation written by the EPA is unconstitutional.',
      'The House of Representatives files a discharge petition to bring a bill directly to the floor for a full vote.',
    ],
    correctAnswer: 'B',
    explanation:
      'Senate confirmation votes act as an explicit, core structural check by the legislative branch over the judicial branch, directly regulating who gets to hold a life-tenured seat.',
  },
  {
    id: 6076,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4', '2.5'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-concept-faithful-execution',
    question:
      'A president is frustrated that a federal statute prevents him from executing a key campaign promise. He orders the Department of Justice to simply stop prosecuting individuals who violate that specific statute. This scenario reflects an ongoing structural debate regarding:',
    image: null,
    options: [
      'The boundaries of presidential executive authority versus Congress\'s power to pass laws.',
      'The distinction between concurrent powers and exclusive state powers.',
      'The expansion of the Supreme Court\'s original jurisdiction over criminal matters.',
      'The transitioning of a representative republic into a direct participatory democracy.',
    ],
    correctAnswer: 'A',
    explanation:
      'Under Article II, the president must ensure that laws are "faithfully executed." A sweeping executive choice to completely stop prosecuting an entire category of federal statutory law creates a profound structural confrontation with Congress\'s core power to make law.',
  },
  {
    id: 6079,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.9'],
    unitName: 'Interactions Among Branches of Government',
    question:
      'Which of the following legal principles describes the doctrine under which federal courts rely on previous judicial decisions and established legal precedents to resolve contemporary cases with similar facts?',
    image: null,
    options: ['Judicial Activism', 'Stare decisis', 'Writ of Certiorari', 'Amicus Curiae'],
    correctAnswer: 'B',
    explanation:
      'Stare decisis is the foundational legal doctrine under which courts follow legal precedents when deciding cases with similar facts, providing consistency to constitutional law.',
  },
];
