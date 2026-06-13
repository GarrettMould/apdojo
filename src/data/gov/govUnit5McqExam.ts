import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 5 **formal unit MCQ test** only
 * (`/unit-mcq-test/5?subject=gov`, pretty URL `/ap-gov-unit-5-mcq-test`).
 * IDs in 65xx range.
 *
 * Aligned with the 2023–2026 AP Gov CED Unit 5: Political Participation.
 */
export const govUnit5McqTestQuestions: Question[] = [
  {
    id: 6501,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-voting-model',
    question:
      'A voter decides to cast their ballot for an incumbent representative specifically because the representative successfully secured federal funding for a new bridge in their district during the previous term. This behavior best exemplifies which model of voting?',
    image: null,
    options: [
      'Prospective voting',
      'Rational choice voting',
      'Retrospective voting',
      'Straight-ticket voting',
    ],
    correctAnswer: 'C',
    explanation:
      'Retrospective voting involves evaluating the candidate’s or party’s past performance ("what have they done for me lately?") to decide whether to keep them in power.',
  },
  {
    id: 6502,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-linkage-institutions',
    question:
      'Which of the following functions of political parties is most directly aimed at bridging the gap between citizen preferences and government policy?',
    image: null,
    options: [
      'The creation of party platforms that aggregate diverse interests into a cohesive policy agenda.',
      'The appointment of non-partisan bureaucratic officials to federal agencies.',
      'The use of judicial review to strike down legislation.',
      'The enforcement of state voter identification laws.',
    ],
    correctAnswer: 'A',
    explanation:
      'Party platforms serve as the primary mechanism for linking public opinion to governance by organizing and articulating the group’s policy goals to voters and candidates.',
  },
  {
    id: 6503,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.6'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-interest-groups',
    question:
      'An interest group representing automobile manufacturers submits an *amicus curiae* brief to the Supreme Court regarding a case on emission standards. What is the group’s likely strategic goal?',
    image: null,
    options: [
      'To directly lobby the president for a executive order.',
      'To provide the Court with additional information or arguments to influence the legal outcome.',
      'To initiate a grassroots protest at the steps of the courthouse.',
      'To contribute directly to the justices’ personal campaign funds.',
    ],
    correctAnswer: 'B',
    explanation:
      'An *amicus curiae* ("friend of the court") brief is a formal way for interest groups to influence judicial policymaking by providing specialized expertise to the Court.',
  },
  {
    id: 6504,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.11'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-citizens-united',
    question:
      'In *Citizens United v. FEC* (2010), the Supreme Court ruled that political spending by corporations and labor unions is a form of protected speech. Which of the following is a direct consequence of this decision?',
    image: null,
    options: [
      'A decrease in the amount of money spent on federal elections.',
      'The creation of Super PACs that can raise and spend unlimited sums of money independently of candidates.',
      'A ban on all corporate contributions to political candidates.',
      'The total elimination of the Bipartisan Campaign Reform Act.',
    ],
    correctAnswer: 'B',
    explanation:
      'By equating political spending with protected speech, the Court allowed for the rise of independent expenditure committees, or Super PACs, which can spend unlimited funds.',
  },
  {
    id: 6505,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-federalist-10',
    question:
      'Questions 5-6 refer to the following excerpt.\n\n"The influence of factious leaders may kindle a flame within their particular States, but will be unable to spread a general conflagration through the other States... A rage for paper money, for an abolition of debts, for an equal division of property, or for any other improper or wicked project, will be less apt to pervade the whole body of the Union than a particular member of it."\n—Publius (Alexander Hamilton), Federalist No. 10, 1787\n\nHow does Madison’s argument in this excerpt address the modern role of interest groups?',
    image: null,
    options: [
      'He argues that interest groups should be banned from political participation.',
      'He suggests that a large republic dilutes the power of harmful "factions" by preventing them from dominating the entire nation.',
      'He advocates for a small, localized democracy to ensure all interests are represented.',
      'He claims that the wealthy are the only group capable of participating in a republic.',
    ],
    correctAnswer: 'B',
    explanation:
      'Madison’s core argument in Federalist No. 10 is that a large republic serves as a check on factions; competing interests in a vast nation make it difficult for any single faction to gain tyrannical control.',
  },
  {
    id: 6506,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-federalist-10',
    question:
      'Which of the following modern political phenomena best aligns with Madison’s concern about the "mischiefs of faction" in Federalist No. 10?',
    image: null,
    options: [
      'The emergence of "Super PACs" that allow interest groups to spend unlimited, undisclosed sums to influence legislative agendas.',
      'The expansion of the federal bureaucracy to handle increasingly technical regulatory issues.',
      'The decline in the number of third-party candidates appearing on general election ballots.',
      'The increase in bipartisan cooperation on foreign policy initiatives in the Senate.',
    ],
    correctAnswer: 'A',
    explanation:
      'Madison feared that well-funded, narrow interests (factions) would gain undue influence over government. Super PACs directly enable specific interests to spend enormous sums, often outweighing broader public interest, which is the definition of "mischiefs of faction."',
  },
  {
    id: 6516,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.5', '5.8'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-third-party-trends',
    question:
      'Based on the bar chart, which of the following best explains why third party presidential candidates who receive significant popular vote shares, such as Ross Perot in 1992, consistently fail to win electoral votes?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_5/third+party+presidential+votes.svg',
      alt: 'Bar chart showing third party presidential candidate vote shares over time',
    },
    options: [
      'The Constitution prohibits third party candidates from receiving electoral votes in presidential elections.',
      'The winner-take-all structure of the Electoral College means that a candidate must win a plurality in a state to receive any of its electoral votes, making it nearly impossible for third party candidates with diffuse national support to translate popular votes into electoral votes.',
      'Third party candidates are prohibited by federal law from appearing on the ballot in more than half of the states.',
      'The Federal Election Commission systematically excludes third party candidates from official vote counts.',
    ],
    correctAnswer: 'B',
    explanation:
      'Because most states award all electoral votes to the winner of the state\'s popular vote, a candidate who earns votes spread thinly across the nation will fail to win a state outright, resulting in zero electoral votes.',
  },
  {
    id: 6517,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-third-party-trends',
    question:
      'Which of the following is the most accurate conclusion regarding the viability of third parties in the United States, based on the electoral trends shown in the bar chart?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_5/third+party+presidential+votes.svg',
      alt: 'Bar chart showing third party presidential candidate vote shares over time',
    },
    options: [
      'Structural barriers, including ballot access laws and winner-take-all rules, make it extremely difficult for third parties to sustain long-term electoral success despite occasional spikes in popularity.',
      'Voter dissatisfaction with the two major parties has steadily decreased since 1992, leading to the decline of third-party efforts.',
      'The Federal Election Commission\'s public financing rules have created a financial advantage that allows third parties to consistently outperform major party candidates.',
      'Third-party candidates have voluntarily stopped running in presidential elections after 1996 to avoid interfering with major party platforms.',
    ],
    correctAnswer: 'A',
    explanation:
      'The U.S. political system contains significant structural hurdles that prevent third parties from achieving the sustained electoral success seen by major parties, even when they experience temporary popularity.',
  },
  {
    id: 6507,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-candidate-centered',
    question: 'How has the rise of "candidate-centered" campaigns affected the traditional role of political parties?',
    image: null,
    options: [
      'It has made the party structure the central focus of all political messaging.',
      'It has shifted power away from party leadership and toward individual candidates and their personal fundraising networks.',
      'It has resulted in stricter party discipline and forced all candidates to adopt identical platforms.',
      'It has effectively eliminated the need for candidates to raise money.',
    ],
    correctAnswer: 'B',
    explanation:
      'Modern campaigns often focus on the candidate’s personal brand, social media presence, and individual donor networks, which weakens the party’s historical control over candidate selection.',
  },
  {
    id: 6509,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-voter-turnout',
    question: 'Which of the following structural factors is most likely to result in lower voter turnout in a state election?',
    image: null,
    options: [
      'Automatic, same-day voter registration laws.',
      'Strict photo identification requirements combined with limited polling station hours.',
      'Universal mail-in balloting for all eligible voters.',
      'Holding elections on weekends.',
    ],
    correctAnswer: 'B',
    explanation:
      'Strict ID laws and limited polling hours are structural barriers that increase the "cost" of voting, often leading to lower turnout among marginalized groups.',
  },
  {
    id: 6518,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-avr-map',
    question:
      'Which of the following best explains why the geographic pattern shown in the map has not been replicated nationwide through federal legislation?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_5/AVR.svg',
      alt: 'Map showing which U.S. states have adopted automatic voter registration',
    },
    options: [
      'The decentralized structure of American federalism allows states to determine their own voter registration procedures, creating variation in structural barriers to participation across the country.',
      'The Constitution prohibits Congress from passing federal voter registration laws because elections are exclusively reserved to the states under the Electoral College system.',
      'States that have not adopted automatic voter registration have done so because their electorates have consistently voted against registration reform in statewide referenda.',
      'Federal campaign finance laws prevent Congress from allocating funds necessary to implement a national automatic voter registration system.',
    ],
    correctAnswer: 'A',
    explanation:
      'Because the Constitution grants states primary authority over the administration of elections, voter registration procedures vary widely across the country, preventing a uniform national system.',
  },
  {
    id: 6519,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-avr-map',
    question:
      'A political scientist studying the map argues that states without automatic voter registration are more likely to have lower voter turnout among eligible citizens. Which of the following, if true, would most directly support this argument?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_5/AVR.svg',
      alt: 'Map showing which U.S. states have adopted automatic voter registration',
    },
    options: [
      'States with automatic voter registration report higher levels of candidate spending per voter than states without it.',
      'Research shows that the primary reason citizens do not vote is dissatisfaction with the available candidates rather than administrative barriers to registration.',
      'States without automatic voter registration consistently hold their elections on weekdays, which reduces turnout independent of registration requirements.',
      'Data shows that a significant percentage of eligible citizens who do not vote cite not being registered as their reason for not participating, and AVR states show measurably higher registration rates among low-income and young voters.',
    ],
    correctAnswer: 'D',
    explanation:
      'This choice directly links the administrative hurdle of registration to non-participation, showing that Automatic Voter Registration (AVR) helps overcome barriers for demographics that often struggle with traditional registration requirements.',
  },
  {
    id: 6510,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.12'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-media-function',
    question:
      'A major news outlet publishes a detailed investigative report on systemic corruption within a federal agency. Following the report, a congressional committee announces it will hold hearings to investigate the agency’s leadership. This scenario best demonstrates which role of the media?',
    image: null,
    options: [
      'The media acting as a "scorekeeper" to focus purely on poll numbers.',
      'The media acting as a "watchdog" to hold government institutions accountable.',
      'The media acting as a "gatekeeper" by deciding which candidates are eligible for the ballot.',
      'The media acting as a "horse-race" analyst to determine electoral trends.',
    ],
    correctAnswer: 'B',
    explanation:
      'The "watchdog" function of the media involves investigative journalism that monitors government actions, uncovers corruption, and compels legislative or executive responses.',
  },
  {
    id: 6511,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.13'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-media-polarization',
    question: 'What is a likely consequence of "ideologically oriented programming" (partisan news sources) for American democracy?',
    image: null,
    options: [
      'An increase in the number of citizens who consume centrist, neutral news.',
      'A decrease in political knowledge among the electorate.',
      'Citizens may become more polarized as they consume content that reinforces their pre-existing beliefs.',
      'Parties will become less relevant to the average voter.',
    ],
    correctAnswer: 'C',
    explanation:
      'The current media landscape allows consumers to seek out news that confirms their existing biases, which reinforces ideological silos and reduces exposure to opposing views.',
  },
  {
    id: 6512,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-baker-carr',
    question:
      'Questions 12-13 refer to the following summary.\n\n*Baker v. Carr* (1961) was a landmark case in which the Supreme Court ruled that federal courts have the authority to intervene in cases of state legislative apportionment. The Court held that redistricting is not merely a "political question" and that malapportioned districts violate the Fourteenth Amendment’s Equal Protection Clause.\n\nThe decision in *Baker v. Carr* directly impacted which of the following political processes?',
    image: null,
    options: [
      'The criteria for federal judicial appointments.',
      'The drawing of congressional and state legislative district boundaries.',
      'The length of time a senator can serve.',
      'The number of members in the House of Representatives.',
    ],
    correctAnswer: 'B',
    explanation:
      'By allowing courts to hear apportionment cases, *Baker v. Carr* forced states to redraw boundaries that had previously been discriminatory or unequal.',
  },
  {
    id: 6513,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-shaw-reno',
    question: 'How does the holding in *Shaw v. Reno* (1993) differ from the decision in *Baker v. Carr* (1961)?',
    image: null,
    options: [
      'It grants state legislatures total freedom to draw districts as they see fit.',
      'It places limitations on the use of race as the predominant factor in drawing district boundaries.',
      'It requires that all districts be perfectly square in shape.',
      'It prohibits the use of population as a factor in redistricting.',
    ],
    correctAnswer: 'B',
    explanation:
      '*Shaw v. Reno* put a check on the redistricting process, holding that while redistricting can take race into account, it cannot be the *predominant* factor in a way that creates bizarre, non-contiguous districts.',
  },
  {
    id: 6514,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-election-type',
    question:
      'Which of the following best explains the trend of significantly higher voter turnout in presidential election years compared to midterm election years?',
    image: null,
    options: [
      'Presidential elections feature higher national media visibility and a wider perception that the presidency has a greater impact on the average citizen\'s life.',
      'Federal law mandates that midterm elections be held in alternate months, creating confusion for the electorate.',
      'States are constitutionally prohibited from opening polling stations for midterm elections.',
      'Voter registration is automatically cancelled by the federal government at the end of a presidential term, requiring all voters to re-register.',
    ],
    correctAnswer: 'A',
    explanation:
      'The "visibility" and the perceived stakes of the presidential office drive higher interest and engagement, whereas midterms often struggle with lower media focus.',
  },
  {
    id: 6515,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Political Participation',
    questionGroup: 'u5-concept-mobilization',
    question: 'Which of the following is an effective, modern technique political parties use to mobilize their base?',
    image: null,
    options: [
      'Formally nominating candidates during private, invitation-only conventions that exclude the general public.',
      'Utilizing sophisticated voter databases to micro-target messages and send personalized digital outreach to low-propensity voters.',
      'Directly appointing legislative committee chairs to bypass the primary election process.',
      'Passing state laws that make it illegal for voters to register for more than one party.',
    ],
    correctAnswer: 'B',
    explanation:
      'Parties use "Big Data" to identify voters who are infrequent participants but lean toward their party, then use targeted digital ads and canvassing to mobilize them.',
  },
];
