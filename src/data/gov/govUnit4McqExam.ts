import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 4 **formal unit MCQ test** only
 * (`/unit-mcq-test/4?subject=gov`, pretty URL `/ap-gov-unit-4-mcq-test`).
 * IDs in 64xx range.
 *
 * Aligned with the 2023–2026 AP Gov CED Unit 4: American Political Ideologies and Beliefs.
 */
export const govUnit4McqTestQuestions: Question[] = [
  {
    id: 6401,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-core-values',
    question:
      'A citizen believes that while the government should ensure a basic safety net, the primary responsibility for economic success lies with the individual’s own ambition and effort. This citizen’s belief system most closely aligns with:',
    image: null,
    options: [
      'The principle of equality of result over individual effort.',
      'A preference for a command economy over private enterprise.',
      'The tension between individualism and the role of the state.',
      'The principle of rule of law over property rights.',
    ],
    correctAnswer: 'C',
    explanation:
      'The balance between individualism—the belief that one shapes their own destiny—and government assistance is a central tension in American political culture.',
  },
  {
    id: 6402,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-bias',
    question:
      'A news organization conducts a poll by calling landline telephones during business hours to ask about support for a new tax policy. Which of the following best explains a potential limitation of this data?',
    image: null,
    options: [
      'Benchmark polls tend to be more accurate than tracking polls conducted during a campaign.',
      'The poll likely lacks a margin of error because it was conducted by telephone.',
      'The results are likely to be highly credible because telephone polls reach a neutral sample.',
      'The sample is likely to suffer from non-response bias and underrepresent younger voters.',
    ],
    correctAnswer: 'D',
    explanation:
      'Relying on landlines during work hours creates a sampling bias that systematically excludes working-age individuals and younger demographics, undermining the poll’s representative nature.',
  },
  {
    id: 6403,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-socialization',
    question:
      'Which of the following scenarios best illustrates the "generational effect" on political socialization?',
    image: null,
    options: [
      'A person’s political views shift to the right after entering retirement, as concerns about taxes and fixed incomes become more important with age.',
      'A voter changes position on several issues after a scandal involving a single candidate dominates the news during one election cycle.',
      'A student changes party identification after taking a college course that challenges the political views learned at home.',
      'A group of voters who came of age during the Great Depression consistently favoring a larger federal role in the economy throughout their lives.',
    ],
    correctAnswer: 'D',
    explanation:
      'Generational effects involve shared experiences of a specific cohort (like the Depression or the Cold War) that shape their political attitudes for their entire lives.',
  },
  {
    id: 6404,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.10'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-ideology-social',
    question: 'Which of the following policy positions would a modern American libertarian most likely support?',
    image: null,
    options: [
      'Stricter government regulation of how private owners may buy, sell, and develop their property.',
      'The legalization of most personal behaviors provided they do not infringe on the rights of others.',
      'A nationalized healthcare system administered and financed by the federal government.',
      'Increased federal spending on public education, with new national standards for states to follow.',
    ],
    correctAnswer: 'B',
    explanation:
      'Libertarian ideology emphasizes individual liberty and minimal government intervention in both the marketplace and personal social choices.',
  },
  {
    id: 6405,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-life-cycle',
    question:
      'A young person who prioritizes environmental protection and social equality begins to focus more on property taxes and retirement security as they enter their fifties. This is an example of:',
    image: null,
    options: ['A life cycle effect.', 'A generational effect.', 'Political realignment.', 'Globalization.'],
    correctAnswer: 'A',
    explanation:
      'Life cycle effects refer to changes in political attitudes as individuals move through different stages of life, such as aging and changing financial responsibilities.',
  },
  {
    id: 6406,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.7'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-text-party-ideology',
    question:
      'Questions 6-7 refer to the following summary.\n\nThe Democratic Party platform traditionally emphasizes a "social safety net," advocating for government-funded programs to support the vulnerable. In contrast, the Republican Party platform typically prioritizes "free enterprise," arguing that lower taxes and deregulation drive economic growth more effectively than government spending.\n\nWhich of the following political ideologies is best represented by the Republican Party’s position in this excerpt?',
    image: null,
    options: ['Liberalism', 'Conservatism', 'Democratic socialism', 'Populism'],
    correctAnswer: 'B',
    explanation:
      'Modern American conservatism typically champions lower taxes, deregulation, and a reduced government role in the marketplace to foster private sector growth.',
  },
  {
    id: 6407,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.9'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-text-party-ideology',
    question:
      'Which of the following economic approaches would a supporter of the Democratic Party’s position described in the excerpt most likely favor?',
    image: null,
    options: [
      'Laissez-faire economic theory.',
      'Supply-side economic theory.',
      'Keynesian economic theory.',
      'Monetarist economic theory.',
    ],
    correctAnswer: 'C',
    explanation:
      'Keynesianism—which advocates for increased government spending to stimulate demand—aligns with the liberal ideological preference for government involvement in the economy.',
  },
  {
    id: 6408,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-poll-method',
    question:
      'A campaign manager wants to ensure that a poll’s results are credible and minimize the margin of error. Which of the following is most essential?',
    image: null,
    options: [
      'Ensuring that the poll reaches at least half of all adults living in the area being surveyed.',
      'Using carefully worded leading questions to reveal how respondents truly feel about each candidate.',
      'Conducting the poll primarily through social media platforms so that it captures younger and more politically engaged voters.',
      'Using random sampling methods to ensure every member of the population has an equal chance of being selected.',
    ],
    correctAnswer: 'D',
    explanation:
      'Random sampling is the bedrock of scientific polling. Without it, the results are unlikely to accurately reflect the broader population.',
  },
  {
    id: 6409,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-political-events',
    question:
      'How do major political events, such as the 9/11 attacks or the Great Recession, influence the political socialization of a population?',
    image: null,
    options: [
      'They act as external shocks that can shift the ideological focus of a generation or change the public’s view of government’s proper role.',
      'They tend to freeze each generation’s ideology in place, because views formed in childhood leave citizens largely unaffected by later national crises.',
      'They tend to produce a lasting consensus in which citizens of every age and party adopt the same ideology and the same policy preferences.',
      'They have little effect on political ideology, since political socialization is largely complete by the time most citizens reach voting age.',
    ],
    correctAnswer: 'A',
    explanation:
      'Political events are a form of socialization that can fundamentally alter how an entire generation views government authority, security, or economic policy.',
  },
  {
    id: 6410,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-veracity',
    question:
      'When evaluating the veracity of public opinion data reported during a presidential campaign, what should a political scientist prioritize?',
    image: null,
    options: [
      'The methodology, including sampling technique and the framing of the questions.',
      'The degree to which results match the candidates’ internal polls.',
      'The popularity and reputation of the news network reporting the data.',
      'Whether the data matches the views of voters in the scientist’s own neighborhood.',
    ],
    correctAnswer: 'A',
    explanation:
      'The credibility of any poll is determined by its methodology (sampling, margin of error, and wording) rather than the source or popularity.',
  },
  {
    id: 6411,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-tracking-polls',
    question: 'Why would a campaign rely on tracking polls throughout an election season?',
    image: null,
    options: [
      'To project the final election results for the public before polling places have closed on Election Day.',
      'To gauge voter opinion quickly without having to rely on expensive scientific sampling methods.',
      'To identify the political views of voters in one state at a single moment before the primary season.',
      'To monitor how public opinion on a candidate changes over time in response to campaign events.',
    ],
    correctAnswer: 'D',
    explanation:
      'Tracking polls are repeated over time to show shifts in public perception during a campaign, allowing managers to adjust their strategies.',
  },
  {
    id: 6421,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-trust-in-gov',
    question:
      'A researcher uses the line graph to argue that the quality of public opinion polls measuring trust in government has declined since the 1960s because respondents today are less willing to answer honestly. Which of the following best evaluates this claim?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_4/trust+in+federal+gov.svg',
      alt: 'Line graph showing public trust in the federal government over time since the 1960s',
    },
    options: [
      'The claim is valid because declining response rates in modern polling make survey data collected after 1980 statistically unreliable, even when several independent organizations report the same long-term decline in public trust over many decades.',
      'The claim is valid because social desirability bias leads respondents to overreport their trust in government, which suggests that actual trust has fallen even further than the polling organizations in the graph have shown.',
      'The claim is not well supported because the consistent downward trend across multiple independent polling organizations over decades suggests the data reflects a genuine shift in public attitudes rather than a methodological problem.',
      'The claim cannot be evaluated because public trust is a qualitative concept, and survey questions asked across several decades are unable to capture how citizens actually feel about their government.',
    ],
    correctAnswer: 'C',
    explanation:
      'Consistent longitudinal data from multiple independent sources indicates a real decline in public confidence, rather than just a flaw in the polling methodology.',
  },
  {
    id: 6422,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1', '4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-trust-in-gov',
    question:
      'Which of the following conclusions is best supported by the overall downward trend in public trust shown in the line graph?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_4/trust+in+federal+gov.svg',
      alt: 'Line graph showing public trust in the federal government over time since the 1960s',
    },
    options: [
      "The long-term erosion of public confidence in federal institutions is likely to reduce citizens' sense that their political participation can produce meaningful change.",
      'Declining trust in the federal government is likely to reflect growing public support for libertarian ideology and for sharply reduced government intervention in the economy.',
      'Political socialization through family and schools has become more effective at transmitting pro-government values to younger generations of American citizens since the 1960s.',
      'The trend is best explained as a methodological artifact, since changes in survey methods over time tend to make long-term polling comparisons across decades unreliable.',
    ],
    correctAnswer: 'A',
    explanation:
      'Decreased institutional trust is strongly linked to lower levels of political efficacy, as citizens who doubt the government\'s integrity are less likely to believe their involvement can influence policy.',
  },
  {
    id: 6412,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-socialization-family',
    question:
      'Which agent of political socialization is generally considered the most influential in the early development of a child’s political values?',
    image: null,
    options: ['The workplace.', 'Interest groups.', 'The family.', 'Political ads.'],
    correctAnswer: 'C',
    explanation:
      'The family is historically the first and most powerful influence on a person’s developing political values, providing a primary foundation for later views.',
  },
  {
    id: 6413,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-policy-stability',
    question:
      'Public policies in the United States often reflect a balance between individual liberty and public order. An example of this balance is:',
    image: null,
    options: [
      'Allowing citizens to own weapons while also passing laws that restrict types of weapons in certain areas.',
      'Reducing police forces substantially so that citizens can exercise greater personal freedom in public spaces.',
      'Requiring public schools to teach a single official political ideology in order to promote national unity.',
      'Prohibiting speech that is critical of the ruling party in order to preserve stability during elections.',
    ],
    correctAnswer: 'A',
    explanation:
      'This illustrates the inherent tension in American policy: protecting the 2nd Amendment (individual liberty) while simultaneously implementing measures to maintain public order (safety).',
  },
  {
    id: 6414,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-core-values',
    question:
      'A state legislature passes a law requiring all citizens to obtain a permit before holding a public demonstration. A civil liberties group challenges the law, arguing it violates a foundational American value. Which core American value is most directly at stake?',
    image: null,
    options: [
      'Equality of result, because the permit requirement treats all citizens the same.',
      'Popular sovereignty, because elected officials should decide who is allowed to demonstrate.',
      'Laissez-faire capitalism, because demonstrations are a form of economic activity.',
      'Limited government, because the law expands state power over individual expression.',
    ],
    correctAnswer: 'D',
    explanation:
      'Limited government is the principle that state power should be constrained and not infringe on individual liberties. Requiring a permit to demonstrate is a direct expansion of government control over personal expression.',
  },
  {
    id: 6415,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-socialization-media',
    question:
      'A teenager who primarily consumes political content through social media algorithms begins to hold increasingly extreme views compared to their parents. Which of the following best explains this divergence through the lens of political socialization?',
    image: null,
    options: [
      'The life cycle effect, because teenagers tend to adopt more extreme political views as they move through adolescence and begin to separate from their parents.',
      'The influence of a new socialization agent — social media — exposing the teenager to a narrower, more polarized information environment than traditional media.',
      "A generational effect, because shared historical events during this era have pushed most members of the teenager's age group toward the same extreme views.",
      'Peer pressure from classmates, because school friendships tend to replace the family as the primary agent of political socialization during the teenage years.',
    ],
    correctAnswer: 'B',
    explanation:
      'Political socialization occurs through multiple agents. Social media algorithms can act as a powerful socialization force by creating information "bubbles" that reinforce extreme views, diverging from the family\'s influence.',
  },
  {
    id: 6416,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-bias',
    question:
      'A poll reports that 72% of Americans support stricter environmental regulations, with a margin of error of ±3%. A senator dismisses the poll, arguing it oversampled urban residents. Which of the following best evaluates the senator\'s critique?',
    image: null,
    options: [
      'The senator raises a valid methodological concern, because sampling bias toward urban residents could systematically overstate support for environmental regulation.',
      "The senator's critique is misplaced because a margin of error of ±3% shows that the sample is representative even if urban residents were oversampled.",
      "The senator's critique is invalid because a poll with a sufficiently large sample tends to cancel out any imbalance in where its respondents happen to live.",
      'The senator is correct because polls on environmental regulation tend to overstate support through social desirability bias, regardless of who is sampled.',
    ],
    correctAnswer: 'A',
    explanation:
      'A margin of error addresses random sampling variation but does not correct for systematic sampling bias. If urban residents are overrepresented and hold distinct views on environmental policy, the poll\'s results may not reflect national opinion accurately.',
  },
  {
    id: 6417,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-types',
    question:
      'A campaign releases an internal poll two weeks before an election showing their candidate leading by 12 points. A week later, a neutral university releases a poll showing the same candidate leading by only 3 points. Which of the following best explains how a political scientist should interpret these results?',
    image: null,
    options: [
      "The campaign's internal poll should be weighted more heavily because campaigns have access to more detailed voter data and tend to invest heavily in reaching likely supporters.",
      'Both polls should be treated as equally valid because they measured the same race during the same election cycle, so the best estimate is simply their average.',
      'The university poll should be weighted more heavily because it comes from an independent source with transparent methodology, while internal campaign polls may reflect motivated reasoning.',
      'Neither poll should be given much weight because opinion can shift before Election Day, and only the final vote count can show which candidate truly leads.',
    ],
    correctAnswer: 'C',
    explanation:
      'Independent polls with transparent methodology are generally more credible than internal campaign polls, which may be subject to motivated reasoning, selective sampling, or strategic release.',
  },
  {
    id: 6418,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.7'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-ideology-parties',
    question:
      'Over the past several decades, the ideological composition of both major political parties has become more homogeneous. Which of the following is the most likely consequence of this trend?',
    image: null,
    options: [
      'A decrease in partisan gridlock, because unified parties are more efficient at passing legislation.',
      'An increase in partisan polarization, making cross-party legislative compromise more difficult.',
      'An increase in bipartisan compromise, because homogeneous parties share more policy goals.',
      'A reduction in voter turnout, because homogeneous parties offer voters fewer meaningful choices.',
    ],
    correctAnswer: 'B',
    explanation:
      'As parties have become more ideologically sorted — with conservatives concentrated in the Republican Party and liberals in the Democratic Party — the ideological distance between them has grown, making compromise harder and gridlock more common.',
  },
  {
    id: 6419,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-policymaking-ideology',
    question:
      'Question 19 refers to the following table.\n\nWhich of the following conclusions is best supported by this data?',
    image: null,
    tableData: {
      headers: ['Ideological identification', 'Policy position', 'Support'],
      rows: [
        ['Self-identified conservatives', 'Increasing defense spending', '68%'],
        ['Self-identified liberals', 'Expanding Medicaid eligibility', '71%'],
      ],
    },
    options: [
      'Self-identified ideology appears to have little measurable effect on the policy preferences of the Americans surveyed.',
      'Self-identified ideological groups show distinct and predictable policy preferences consistent with their broader ideological frameworks.',
      'A majority of Americans across ideological groups support increased defense spending and Medicaid expansion at the same time.',
      'Conservatives and liberals tend to agree on most major policy issues, despite the differences in how they describe their ideologies.',
    ],
    correctAnswer: 'B',
    explanation:
      'The data shows that conservatives and liberals hold predictable, distinct policy preferences — defense spending aligns with conservative priorities (national security, strong military), while Medicaid expansion aligns with liberal priorities (government role in healthcare access).',
  },
  {
    id: 6420,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-demographic-opinion',
    question:
      'Research consistently shows that younger voters are more likely to support expansive government social programs than older voters. Which of the following best explains this pattern using concepts from political socialization?',
    image: null,
    options: [
      'Older voters tend to have lower levels of formal education and are therefore less informed about social programs, which is the main reason younger voters are more likely to favor a larger government role in the economy.',
      'A combination of life cycle effects — where younger people have less accumulated wealth and property to protect — and generational effects from coming of age in a period of rising economic inequality.',
      'Younger voters are more heavily influenced by peer groups, which tend to favor liberal policies and outweigh the values that families and schools pass on during childhood.',
      'Older voters tend to turn out at lower rates than younger voters, which reduces the influence of their preferences and leaves social programs with broader electoral support.',
    ],
    correctAnswer: 'B',
    explanation:
      'Both life cycle effects (younger people have different economic stakes) and generational effects (cohorts shaped by specific economic conditions) help explain age-based differences in policy preferences — a more nuanced explanation than simple partisanship.',
  },
];
