import { getGovFrqWalkthroughVideoUrl } from '@/data/gov/govFrqWalkthroughVideos';

/** Matches `FullExamFRQ` `tableData` (optional `playerNames` for game-style tables). */
export interface GovFrqTableData {
  /** Descriptive caption shown above the table (e.g. quantitative FRQ stimulus). */
  title?: string;
  headers: string[];
  rows: (string | number)[][];
  rowHeaders?: boolean;
}

/** Official-style boilerplate for SCOTUS comparison stimulus (shown bold above the case citation). */
export const GOV_SCOTUS_COMPARISON_INSTRUCTIONS =
  'This question requires you to compare a Supreme Court case you studied in class with one you have not studied in class. A summary of the Supreme Court case you did not study in class is presented below and provides all of the information you need to know about this case to answer the prompts.';

/** Optional keyed sample responses per part (A–D). Shown on pack results when set. */
export interface GovFrqAnswerKey {
  partA?: string[];
  partB?: string[];
  partC?: string[];
  partD?: string[];
}

export interface GovStimulusFrq {
  id: string;
  title: string;
  stimulus?: string;
  /** When set with `stimulus`, SCOTUS comparison is rendered: instructions (bold), citation (italic), then summary. */
  scotusCaseCitation?: string;
  /** When set, rendered as HTML table instead of plain `stimulus` text (e.g. quantitative FRQs). */
  tableData?: GovFrqTableData;
  /** Bar graph or other stimulus image (quantitative FRQs). Omitted in the pack UI until `src` is set. */
  image?: { src: string; alt: string };
  /** Task line after stimulus; may be empty for SCOTUS comparison when only parts carry directions. */
  prompt: string;
  tasks: string[];
  cedLink?: string;
  /** Sample responses per part — optional until keys are authored for each pack. */
  answerKey?: GovFrqAnswerKey;
}

const GOV_FRQ_ANSWER_KEY_PARTS = ['partA', 'partB', 'partC', 'partD'] as const;

function formatGovFrqPartAnswer(samples: string[] | undefined): string | undefined {
  if (!samples?.length) return undefined;
  if (samples.length === 1) return samples[0];
  const body = samples.map((s, i) => `${i + 1}. ${s}`).join('\n\n');
  return `Sample responses that would earn the point:\n\n${body}`;
}

function govFrqPartAnswer(
  answerKey: GovFrqAnswerKey | undefined,
  taskIdx: number
): string | undefined {
  if (!answerKey) return undefined;
  const partKey = GOV_FRQ_ANSWER_KEY_PARTS[taskIdx];
  if (!partKey) return undefined;
  return formatGovFrqPartAnswer(answerKey[partKey]);
}

function govFrqImageForPack(frq: GovStimulusFrq): { src: string; alt: string } | undefined {
  const src = frq.image?.src?.trim();
  if (!src) return undefined;
  return { src, alt: frq.image?.alt?.trim() || 'FRQ stimulus chart' };
}

function mapGovFrqTasksToParts(frq: GovStimulusFrq): Array<{
  label: string;
  text: string;
  answerType: 'text';
  answer?: string;
}> {
  return frq.tasks.map((task, taskIdx) => {
    const answer = govFrqPartAnswer(frq.answerKey, taskIdx);
    return {
      label: String.fromCharCode(65 + taskIdx),
      text: task,
      answerType: 'text' as const,
      ...(answer ? { answer } : {}),
    };
  });
}

/**
 * AP U.S. Government & Politics — Unit 2 stimulus FRQs.
 * Unit 2: Interactions Among Branches of Government (CED 2023–2026).
 */
export const govUnit2StimulusFrqs: GovStimulusFrq[] = [
  {
    id: 'u2-frq-1-concept-app-bureaucracy',
    title: 'FRQ 1: Concept Application',
    stimulus:
      'In 2024, the Federal Trade Commission (FTC), an independent regulatory agency, issued a broad administrative rule banning non-compete clauses in employment contracts nationwide, asserting that such clauses suppress wages and stifle economic innovation. Business coalitions and manufacturing interest groups immediately filed federal lawsuits, claiming that the FTC exceeded the scope of the statutory authority originally delegated to it by Congress. In response, several members of the House Committee on Energy and Commerce launched an investigation and scheduled committee hearings, demanding that the FTC Commissioners testify to defend their regulatory choices.',
    prompt: 'After reading the scenario, please respond to A, B, and C below.',
    tasks: [
      'Describe the bureaucratic power that the Federal Trade Commission used in the scenario to enact the nationwide ban.',
      'In the context of the scenario, explain how the actions taken by the House Committee on Energy and Commerce illustrate a constitutional check on the executive branch.',
      "Explain how Congress could use its oversight authority to limit the FTC's regulatory power going forward.",
    ],
    cedLink:
      'Unit 2, Topic 2.13 (Discretionary and Rulemaking Authority) & Topic 2.14 (Holding the Bureaucracy Accountable)',
  },
  {
    id: 'u2-frq-2-quant-vetoes',
    title: 'FRQ 2: Quantitative Analysis',
    tableData: {
      title: 'Presidential Vetoes and Congressional Overrides by Administration',
      headers: [
        'Presidential Administration',
        'Regular Vetoes Issued',
        'Pocket Vetoes Issued',
        'Veto Overrides by Congress',
      ],
      rows: [
        ['Administration A (Unified Government)', 12, 4, 0],
        ['Administration B (Unified Government)', 15, 2, 1],
        ['Administration C (Divided Government)', 44, 18, 5],
        ['Administration D (Divided Government)', 37, 12, 4],
      ],
    },
    prompt: 'Use the table to answer each part, referencing specific evidence where appropriate.',
    tasks: [
      'Identify the administrative status (Unified or Divided) that consistently correlates with a higher number of regular presidential vetoes issued.',
      'Describe a difference in the legislative outcome between regular vetoes and pocket vetoes as demonstrated by constitutional guidelines.',
      "Draw a conclusion about how structural conditions of a divided government affect a president's legislative strategy and congressional responses based on the data.",
      'Explain how the data in the table illustrates Alexander Hamilton\'s argument in Federalist No. 70 regarding the necessity of an energetic executive branch.',
    ],
    cedLink: 'Unit 2, Topic 2.3 (Congressional Behavior) & Topic 2.4 (Roles and Powers of the President)',
  },
  // Unit 2 pack: Concept + Quant only — SCOTUS comparison lives in Unit 3 pack / SCOTUS Practice hub.
  // {
  //   id: 'u2-frq-3-scotus-comparison-judicial',
  //   title: 'FRQ 3: SCOTUS Comparison',
  //   scotusCaseCitation: 'Ex parte McCardle (1869)',
  //   stimulus:
  //     'In 1867, William McCardle, a newspaper editor in Mississippi, was arrested by military authorities under the Reconstruction Acts for publishing articles highly critical of post-Civil War military rule. McCardle filed a petition for a writ of habeas corpus, claiming his arrest violated the Constitution. Before the Supreme Court could issue its final ruling, Congress—fearing that the Court would strike down the entire Reconstruction framework—passed a statute explicitly revoking the Supreme Court\'s appellate jurisdiction over appeals arising from the 1867 Habeas Corpus Act. The Supreme Court dismissed the case, holding that because Article III grants Congress the power to make "exceptions" to the Court\'s appellate jurisdiction, the judiciary lacked the authority to decide the case.',
  //   prompt:
  //     'Based on the case summary and your knowledge of U.S. Government and Politics, respond to parts A, B, and C.',
  //   tasks: [
  //     'Identify the foundational document or constitutional article that outlines the core jurisdiction of the federal judiciary and serves as the structural baseline common to both Marbury v. Madison (1803) and Ex parte McCardle (1869).',
  //     "Explain how the facts in Marbury v. Madison (1803) and Ex parte McCardle (1869) led to different outcomes regarding the scope of the Supreme Court's authority to rule on legislative acts.",
  //     'Explain how the decision in Ex parte McCardle illustrates Alexander Hamilton\'s characterization of the judiciary in Federalist No. 78 as the "least dangerous branch."',
  //   ],
  //   cedLink: 'Unit 2, Topic 2.8 (The Judicial Branch) & Topic 2.11 (Checks on the Judicial Branch)',
  // },
];

/**
 * AP U.S. Government & Politics — Unit 3 stimulus FRQs.
 * Unit 3: Civil Liberties and Civil Rights (CED 2023–2026).
 */
export const govUnit3StimulusFrqs: GovStimulusFrq[] = [
  {
    id: 'u3-frq-1-concept-app-establishment-clause',
    title: 'FRQ 1: Concept Application',
    stimulus:
      'In 2019, a public high school in a small town in Georgia began broadcasting a Christian prayer over the school intercom each morning before classes. A group of students and parents filed a lawsuit arguing the practice violated their constitutional rights. The school district defended the policy, arguing that the broadcasts were voluntary and that students were free to ignore them. The case attracted national attention and drew organized responses from both religious liberty advocacy groups and civil liberties organizations. Ultimately, a federal court ruled against the school district.',
    prompt: 'After reading the scenario, please respond to A, B, and C below.',
    tasks: [
      'Describe the constitutional clause that the federal court most likely used as the basis for ruling against the school district in the scenario.',
      'Explain how the Supreme Court\'s decision in Engel v. Vitale relates to the court\'s ruling described in part A.',
      'Explain how the actions of the advocacy groups in the scenario illustrate the concept of pluralist democracy.',
    ],
    cedLink:
      'Unit 3, Topic 3.2 (First Amendment: Freedom of Religion) & Topic 3.10 (Social Movements and Equal Protection)',
    answerKey: {
      partA: [
        'The Establishment Clause of the First Amendment prohibits the government from making any law respecting an establishment of religion, which includes public schools sponsoring prayer broadcasts.',
        'The Establishment Clause prevents government institutions, including public schools, from promoting or endorsing religious practice, which the morning prayer broadcast violated.',
        'Because public schools are government institutions, broadcasting a Christian prayer over the intercom constitutes a government endorsement of religion, which is prohibited by the Establishment Clause.',
      ],
      partB: [
        'In Engel v. Vitale, the Supreme Court held that school-sponsored prayer in public schools violates the Establishment Clause, even if participation is voluntary. The federal court in the scenario would likely rely on this precedent to rule against the school district\'s intercom prayer broadcast for the same reason.',
        'Engel v. Vitale established that government-directed prayer in public schools is unconstitutional regardless of whether students are required to participate. Since the school district\'s broadcast was school-sponsored, the ruling in Engel directly supports the federal court\'s decision in the scenario.',
        'The holding in Engel v. Vitale applies here because it ruled that the state cannot compose or sponsor a religious activity in public schools. The school district\'s daily prayer broadcast is functionally equivalent to the state-sponsored prayer struck down in Engel.',
      ],
      partC: [
        'Pluralist democracy holds that competing interest groups participate in the political process to influence policy outcomes. The religious liberty groups and civil liberties organizations in the scenario represent opposing interests both organizing to influence the legal outcome of the case, which is consistent with the pluralist model.',
        'In a pluralist democracy, power is distributed among many groups that compete to shape policy. The scenario illustrates this because multiple organized groups with conflicting viewpoints — religious liberty advocates and civil liberties organizations — mobilized in response to the school district\'s policy, demonstrating how competing interests check one another in the democratic process.',
        'Pluralist democracy is characterized by organized groups advancing their interests through legal and political channels. The advocacy groups in the scenario did exactly this by responding to a government action with organized national attention, consistent with the pluralist model of democracy.',
      ],
    },
  },
  {
    id: 'u3-frq-2-scotus-comparison-fraser',
    title: 'FRQ 2: SCOTUS Comparison',
    scotusCaseCitation: 'Bethel School District v. Fraser (1986)',
    stimulus:
      'In April 1983, Matthew Fraser, a student at Bethel High School in Washington state, delivered a nominating speech for a fellow student before a school assembly of approximately 600 students. Throughout the speech, Fraser used elaborate sexual metaphors to describe the candidate. Several teachers had warned Fraser before the speech that the content was inappropriate and could result in disciplinary action. Following the speech, the school suspended Fraser for three days and removed his name from the list of candidates for graduation speaker, citing a school conduct rule prohibiting obscene or disruptive language.\n\nFraser filed a lawsuit arguing that the suspension violated his First Amendment right to free speech. A federal district court ruled in Fraser\'s favor, finding that the speech was not disruptive and that the school had violated his constitutional rights. The Ninth Circuit Court of Appeals affirmed the decision.\n\nThe Supreme Court reversed the lower courts in a 7–2 decision, ruling in favor of the school district. Chief Justice Warren Burger reasoned that the First Amendment does not prevent school officials from prohibiting vulgar and lewd speech that is inconsistent with the school\'s basic educational mission. The Court held that the constitutional rights of students in public schools are not automatically the same as the rights of adults in other settings and that school officials have the authority to determine what manner of speech is appropriate in the school environment.',
    prompt:
      'Based on the case summary and your knowledge of U.S. Government and Politics, respond to parts A, B, and C.',
    tasks: [
      'Identify the constitutional amendment that is the basis for the free speech claims made by the students in both Tinker v. Des Moines (1969) and Bethel School District v. Fraser (1986).',
      'Explain how the facts in Tinker v. Des Moines and Bethel School District v. Fraser led to different holdings regarding the free speech rights of students.',
      'Explain how the holding in Bethel School District v. Fraser illustrates the tension between individual civil liberties and the government\'s interest in maintaining an appropriate educational environment.',
    ],
    cedLink:
      'Unit 3, Topic 3.3 (First Amendment: Freedom of Speech) & Topic 3.6 (Amendments: Balancing Individual Freedom with Public Order and Safety)',
    answerKey: {
      partA: [
        'The First Amendment is the basis for both cases, as students in each case claimed that school officials violated their constitutional right to free speech by punishing them for their expression.',
        'Both cases center on the First Amendment\'s free speech clause and whether its protections extend to student expression within a public school setting.',
      ],
      partB: [
        'In Tinker, students wore black armbands to silently protest the Vietnam War, and the Court held this was protected symbolic speech because it was passive, political in nature, and caused no substantial disruption to the school environment. In Fraser, the Court ruled against the student because his speech used vulgar and sexually suggestive language before a captive student audience, which the Court found inconsistent with the school\'s educational mission, even though the speech did not cause the kind of disruption at issue in Tinker.',
        'The Court ruled in favor of the students in Tinker because their expression was purely political and nondisruptive, establishing that students retain First Amendment rights at school. However, in Fraser, the Court held that this protection does not extend to lewd or vulgar speech in a school setting, distinguishing the content of Fraser\'s sexual speech from the political expression protected in Tinker.',
        'Both cases involved student speech punished by school officials, but the nature of the speech produced different outcomes. The antiwar armbands in Tinker were political expression that caused no disruption, earning First Amendment protection. Fraser\'s sexually suggestive speech, while not politically motivated, conflicted with the school\'s responsibility to teach appropriate civic conduct, which the Court found sufficient to justify the restriction.',
      ],
      partC: [
        'The holding in Fraser illustrates the tension between civil liberties and institutional authority by establishing that a student\'s free speech rights are not equivalent to those of adults outside of school. The Court prioritized the school\'s interest in maintaining a civil and appropriate educational environment over Fraser\'s claim to unrestricted personal expression, showing that individual liberties can be limited in institutional contexts.',
        'Fraser demonstrates that civil liberties operate on a spectrum and must be weighed against the legitimate authority of government institutions. The Court recognized that public schools, as government entities responsible for the education and civic development of minors, have a compelling interest in regulating speech that undermines that mission, even when the same speech might be protected in a non-school setting.',
        'The decision illustrates that the balance between individual liberty and public order depends on context. While Tinker established broad protections for student political speech, Fraser clarified that schools retain authority to prohibit expression that is vulgar or inconsistent with basic standards of civil discourse, reflecting the broader principle that rights are not absolute and must be balanced against institutional responsibilities.',
      ],
    },
  },
];

/**
 * AP U.S. Government & Politics — Unit 4 stimulus FRQs.
 * Unit 4: American Political Ideologies and Beliefs (CED 2023–2026).
 */
export const govUnit4StimulusFrqs: GovStimulusFrq[] = [
  {
    id: 'u4-frq-1-concept-app-public-opinion',
    title: 'FRQ 1: Concept Application',
    stimulus:
      'In the months leading up to a midterm election, a national polling organization released a survey showing that 61% of likely voters identified the rising cost of groceries and household goods as their top concern. The poll used random digit dialing to reach respondents and reported a margin of error of ±3 percentage points. Several candidates from both major parties adjusted their campaign messaging after the poll was released, emphasizing economic relief proposals in their advertising. A competing polling organization, which conducted its survey using an opt-in online form posted to a political news website, reported different results, finding that only 38% of respondents cited the economy as their primary concern.',
    prompt: 'After reading the scenario, please respond to A, B, and C below.',
    tasks: [
      'Describe one reason why the results of the two polls in the scenario differ.',
      'Explain how the data from the credible poll in the scenario reflects the relationship between public opinion and the ideological positions of political parties.',
      'Explain how a life cycle effect or a generational effect could account for why voters in the scenario identified rising costs as their primary concern.',
    ],
    cedLink:
      'Unit 4, Topic 4.5 (Measuring Public Opinion) & Topic 4.6 (Evaluating Public Opinion Data) & Topic 4.3 (Changes in Ideology)',
    answerKey: {
      partA: [
        'The opt-in online poll suffers from voluntary response bias because only individuals who actively chose to participate responded, which likely overrepresents people with strong or atypical opinions and does not reflect the broader population.',
        'The online poll was posted to a political news website, meaning its sample was drawn from a self-selected group of politically engaged users rather than a random cross-section of likely voters, creating a sampling bias that skews the results.',
        'Unlike the random digit dialing poll, which gave every member of the population an equal chance of being selected, the opt-in online poll relies on self-selection, making it unrepresentative and explaining the divergence in results.',
      ],
      partB: [
        'The credible poll showing 61% of voters prioritizing the cost of living prompted candidates from both parties to adjust their campaign messaging around economic relief. This illustrates how public opinion data directly shapes the policy positions parties emphasize, as parties use polling to align their platforms with voter preferences.',
        'Because the random digit dialing poll reflected broad public concern about rising costs, candidates from both parties shifted their messaging to address economic issues. This demonstrates that parties are responsive to public opinion data and use it to position themselves ideologically in ways they believe will attract voters.',
        'The poll data showing widespread economic anxiety caused both major parties to emphasize economic relief proposals, which reflects the linkage between measured public opinion and the ideological priorities parties choose to highlight during campaigns.',
      ],
      partC: [
        'A life cycle effect could explain this pattern because older voters, who are more likely to be on fixed incomes or managing household budgets without wage growth, may be disproportionately sensitive to rising grocery and household costs, making economic concerns more salient as people age into retirement.',
        'A generational effect could explain this trend if a significant portion of the electorate came of age during a previous period of economic hardship, such as the 2008 recession, making them consistently attuned to economic instability and more likely to prioritize cost-of-living issues across elections.',
        'The life cycle effect suggests that as voters age and accumulate financial responsibilities such as mortgages, dependents, and retirement planning, they become more focused on economic stability. Voters managing these pressures in the scenario would naturally identify rising household costs as their top concern.',
      ],
    },
  },
  {
    id: 'u4-frq-2-quant-ideology',
    title: 'FRQ 2: Quantitative Analysis',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/u4-frq2.svg',
      alt: 'Grouped bar chart showing self-identified political ideology of American adults from 1994 to 2022, comparing consistently or mostly conservative versus consistently or mostly liberal identification at four-year intervals',
    },
    prompt: 'Use the bar graph to answer the following questions.',
    tasks: [
      'Identify the percentage of American adults who self-identified as consistently or mostly liberal in 1994, according to the data in the bar graph.',
      'Describe the trend in the data regarding the gap between conservative and liberal self-identification between 1994 and 2022.',
      'Draw a conclusion about the level of ideological polarization among American adults based on the trends shown in the bar graph.',
      'Explain how the trends shown in the bar graph could influence the ideological positions adopted by the two major political parties.',
    ],
    cedLink: 'Unit 4, Topic 4.3 (Changes in Ideology) & Topic 4.7 (Ideologies of Political Parties)',
    answerKey: {
      partA: [
        '8% of American adults self-identified as consistently or mostly liberal in 1994.',
      ],
      partB: [
        'In 1994, there was a large gap of approximately 15 percentage points between conservative and liberal self-identification, with conservatives substantially outnumbering liberals. By 2022, that gap had closed entirely, with liberal identification rising from 8% to 27% while conservative identification remained relatively stable at around 26%, indicating a dramatic and steady growth in liberal self-identification over the 28-year period.',
        'Conservative identification remained largely flat throughout the entire period, hovering between 22% and 27%, while liberal identification more than tripled from 8% in 1994 to 27% in 2022. The gap between the two closed steadily across each four-year interval, with the most dramatic acceleration occurring between 2006 and 2014.',
      ],
      partC: [
        'The data suggests that ideological polarization among American adults has increased since 1994, as a growing share of the population now identifies at one of the two ideological poles rather than in the middle. The rapid and consistent growth of liberal self-identification, combined with stable conservative identification, indicates that fewer Americans are occupying the ideological center over time.',
        'The convergence of conservative and liberal self-identification by 2022 suggests that the electorate has become more evenly and sharply divided along ideological lines, which is consistent with the broader trend of partisan polarization in which fewer voters identify as moderate or cross-pressured.',
      ],
      partD: [
        'As the share of consistently liberal voters grew significantly across this period, the Democratic Party had electoral incentives to move its platform leftward to reflect and mobilize its base. Similarly, the stability of conservative identification gave the Republican Party reason to maintain or intensify conservative positions. This ideological sorting reinforces party polarization as each party\'s platform increasingly mirrors the distinct preferences of its ideological base.',
        'The trend toward greater ideological self-identification at both poles means that the median voter within each party has moved further from the center. Candidates seeking party nominations must appeal to increasingly ideological primary electorates, which pushes party platforms toward more extreme positions and reduces the space for cross-party compromise.',
      ],
    },
  },
];

/**
 * AP U.S. Government & Politics — Unit 5 stimulus FRQs.
 * Unit 5: Political Participation (CED 2023–2026).
 */
export const govUnit5StimulusFrqs: GovStimulusFrq[] = [
  {
    id: 'u5-frq-1-concept-app-linkage-mobilization',
    title: 'FRQ 1: Concept Application',
    stimulus:
      'In the months before the 2018 midterm elections, a national teachers\' union launched a large-scale voter mobilization effort targeting its members in key congressional districts. The union used membership data to identify registered voters, sent targeted mailers, made phone calls, and organized carpools to polling locations on Election Day. The union also ran independent television advertisements criticizing the voting records of several incumbent representatives on education funding — advertisements that were paid for through the union\'s Super PAC. Voter turnout among union households in the targeted districts was notably higher than the national midterm average.',
    prompt: 'After reading the scenario, please respond to A, B, and C below.',
    tasks: [
      'Describe how the teachers\' union in the scenario acted as a linkage institution.',
      'Explain how the Supreme Court\'s decision in Citizens United v. FEC enabled the union\'s use of the Super PAC described in the scenario.',
      'Explain how the mobilization effort described in the scenario could affect voter turnout among the targeted population.',
    ],
    cedLink:
      'Unit 5, Topic 5.6 (Interest Groups Influencing Policymaking) & Topic 5.11 (Campaign Finance) & Topic 5.2 (Voter Turnout)',
    answerKey: {
      partA: [
        'Linkage institutions connect citizens to the government by organizing and channeling political participation. The teachers\' union acted as a linkage institution by using its membership data to mobilize voters, connecting its members\' policy preferences on education funding to the electoral process.',
        'The teachers\' union served as a linkage institution by organizing carpools, phone banking, and targeted mailers to drive turnout among union households, translating the group\'s collective interest in education policy into direct electoral participation.',
        'As a linkage institution, the teachers\' union bridged the gap between its members\' concerns about education funding and the political process by identifying registered voters, mobilizing them to the polls, and running independent advertisements targeting incumbent representatives.',
      ],
      partB: [
        'In Citizens United v. FEC, the Supreme Court ruled that political spending by corporations and labor unions is a protected form of free speech under the First Amendment, which prohibited the government from limiting independent political expenditures. This ruling enabled the teachers\' union to establish a Super PAC and spend unlimited funds on advertisements targeting incumbent representatives.',
        'Citizens United held that independent political expenditures cannot be capped because doing so would violate First Amendment free speech protections. As a result, the union\'s Super PAC could legally fund television advertisements criticizing incumbents\' voting records without contribution limits, as long as the spending was independent of any candidate\'s official campaign.',
        'Prior to Citizens United, labor unions faced restrictions on using treasury funds for independent political expenditures. The Court\'s ruling removed those restrictions by equating political spending with constitutionally protected speech, which is why the union in the scenario could legally operate a Super PAC to run campaign advertisements.',
      ],
      partC: [
        'The union\'s mobilization effort reduced the practical barriers to voting for its members by providing transportation and targeted reminders, lowering the cost of participation. Research on voter turnout consistently shows that direct contact and logistical assistance increase the likelihood that individuals will cast a ballot.',
        'By using membership data to identify registered voters and contact them directly through mailers and phone calls, the union engaged in the type of personalized outreach that political scientists identify as among the most effective methods for increasing turnout. This explains why union household turnout in targeted districts exceeded the national midterm average.',
        'Voter turnout is influenced by mobilization efforts that increase a citizen\'s sense of political efficacy and reduce the friction of participation. The union\'s coordinated effort — combining direct contact, logistical support, and issue-based advertising — addressed both factors, making it more likely that targeted members would vote.',
      ],
    },
  },
  {
    id: 'u5-frq-2-quant-voter-turnout',
    title: 'FRQ 2: Quantitative Analysis',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/u5-frq2.svg',
      alt: 'Grouped bar chart showing voter turnout in the 2020 presidential election and 2018 midterm election by age group, comparing turnout among voters aged 18–29, 30–44, 45–59, and 60 and older',
    },
    prompt: 'Use the bar graph to answer the following questions.',
    tasks: [
      'Identify the voter turnout percentage among eligible voters aged 18–29 in the 2018 midterm election, according to the data in the bar graph.',
      'Describe the difference in voter turnout between the 2020 presidential election and the 2018 midterm election as shown in the bar graph.',
      'Draw a conclusion about how age affects political participation based on the trends shown in the bar graph.',
      'Explain how the data shown in the bar graph could affect a presidential candidate\'s strategy to mobilize voters.',
    ],
    cedLink: 'Unit 5, Topic 5.2 (Voter Turnout) & Topic 5.10 (Modern Campaigns)',
    answerKey: {
      partA: [
        '28% of eligible voters aged 18–29 turned out in the 2018 midterm election.',
      ],
      partB: [
        'Voter turnout in the 2020 presidential election was substantially higher than in the 2018 midterm election across every age group shown in the bar graph. The gap was largest among the youngest voters, where turnout was 23 percentage points higher in 2020 than in 2018, and smallest among voters aged 60 and older, where the gap was approximately 12 percentage points.',
        'In both elections, turnout increased with age, but presidential election turnout consistently exceeded midterm turnout by a significant margin for all age groups. The 18–29 cohort showed the most dramatic difference between election types, suggesting that younger voters are particularly responsive to the higher-visibility nature of presidential contests.',
      ],
      partC: [
        'The data consistently shows that voter turnout increases with age across both election types, suggesting that older citizens participate at significantly higher rates than younger ones. This pattern is consistent with the life cycle effect, in which individuals become more politically engaged as they age, accumulate greater economic and civic stakes, and develop stronger habitual voting behavior.',
        'Older voters — particularly those aged 60 and above — consistently turn out at rates more than 25 percentage points higher than voters aged 18–29 in both election types. This suggests that age is one of the strongest predictors of voter participation and that structural or motivational barriers to voting disproportionately affect younger eligible voters.',
      ],
      partD: [
        'Because younger voters show the largest gap between presidential and midterm turnout, a presidential candidate could conclude that the 18–29 cohort is a high-potential mobilization target. Investing in outreach strategies such as social media advertising, campus organizing, and vote transportation programs could yield significant gains in turnout among this underrepresented group, potentially shifting electoral outcomes in competitive states.',
        'The data shows that older voters already participate at high rates, meaning that mobilization efforts targeting the 60+ cohort may produce diminishing returns. A candidate focused on maximizing turnout would likely concentrate resources on younger and middle-aged voters, where the gap between potential and actual participation is largest, and tailor policy messaging — such as student debt relief or housing affordability — to address the specific concerns of those age groups.',
      ],
    },
  },
];

/**
 * Stimulus FRQs shown as a compact companion block under Gov unit MCQ tests.
 * Keep this list short and high-signal (teacher beta content).
 */
export const govUnitStimulusFrqByUnit: Record<number, GovStimulusFrq[]> = {
  1: [
    {
      id: 'u1-frq-1-stafford-act',
      title: 'FRQ 1: Concept Application',
      stimulus:
        'In 1988, Congress passed the Stafford Act, which allows the federal government to provide financial assistance to state and local governments during natural disasters. In the wake of a major hurricane, a state governor requests federal aid. The President, acting through FEMA, approves the request but attaches specific conditions to the funding, requiring the state to implement new building codes that exceed current state laws. The state government argues that while they need the money, the federal government is overstepping its authority by dictating local construction standards.',
      prompt: 'After reading the scenario, please respond to A, B, and C below.',
      tasks: [
        'Describe the constitutional principle that defines the relationship between the national and state governments illustrated in the scenario.',
        'In the context of the scenario, explain how the use of categorical grants-in-aid could be used by the federal government to influence state policy.',
        "Explain how the Tenth Amendment could be used by the state to challenge the federal government's requirements in the scenario.",
      ],
      cedLink: 'Unit 1 (Foundations of American Democracy) — Federalism',
    },
    {
      id: 'u1-frq-2-quant-grants',
      title: 'FRQ 2: Quantitative Analysis',
      tableData: {
        title: 'Federal Grant Funding to State and Local Governments, 1960–2020 (Billions of Dollars)',
        headers: [
          'Fiscal Year',
          'Categorical Grants (Billions $)',
          'Block Grants (Billions $)',
        ],
        rows: [
          [1960, '$7.0', '$0.0'],
          [1980, '$82.5', '$9.2'],
          [2000, '$254.7', '$30.1'],
          [2020, '$640.3', '$51.5'],
        ],
      },
      prompt:
        'Use the table to answer each part, referencing specific evidence where appropriate.',
      tasks: [
        'Identify the grant type that has consistently received the most funding between 1960 and 2020.',
        'Describe a trend in the data regarding the relationship between categorical and block grants over time.',
        "Draw a conclusion about how the data reflects the federal government's preferred method of exercising influence over state policy.",
        'Explain how the data in the table relates to the concept of devolution.',
      ],
      cedLink: 'Unit 1 (Foundations of American Democracy) — Fiscal Federalism',
    },
    // Unit 1 pack: Concept + Quant only — SCOTUS comparison lives in Unit 3 pack / SCOTUS Practice hub.
    // {
    //   id: 'u1-frq-3-scotus-comparison',
    //   title: 'FRQ 3: SCOTUS Comparison',
    //   scotusCaseCitation: 'National Federation of Independent Business (NFIB) v. Sebelius (2012)',
    //   stimulus:
    //     'In 2010, Congress passed the Affordable Care Act (ACA). The individual mandate required most Americans to purchase health insurance or pay a penalty. Congress argued it was valid under the Commerce Clause because uninsured decisions affect the national healthcare market. Several states and the NFIB challenged the law, arguing the Commerce Clause regulates existing economic activity, not compelling people into commerce. The Supreme Court held that the mandate was valid under Congress’s Taxing Power, but not under the Commerce Clause.',
    //   prompt: 'Based on the case summary and your knowledge of U.S. Government and Politics, respond to parts A, B, and C.',
    //   tasks: [
    //     'Identify the required Supreme Court case that also involved a challenge to the federal government\'s use of the Commerce Clause to regulate non-economic activity.',
    //     'Explain how the facts in the required case identified in part A and National Federation of Independent Business v. Sebelius (2012) led to different structural interpretations regarding limits on the power of the national government.',
    //     'Explain how the decision in National Federation of Independent Business v. Sebelius (2012) reflects the principle of federalism.',
    //   ],
    //   cedLink: 'Unit 1, Topic 1.8 (Constitutional Interpretations of Federalism)',
    // },
  ],
  2: govUnit2StimulusFrqs,
  3: govUnit3StimulusFrqs,
  4: govUnit4StimulusFrqs,
  5: govUnit5StimulusFrqs,
};

export function getGovUnitStimulusFrqs(unitNumber: number): GovStimulusFrq[] {
  return govUnitStimulusFrqByUnit[unitNumber] ?? [];
}

/** e.g. "Concept Application", "Quantitative Analysis", "SCOTUS Comparison" from `FRQ n: Type (…)` titles. */
export function getGovUnitFrqFormatLabels(unitNumber: number): string[] {
  return getGovUnitStimulusFrqs(unitNumber).map((frq) => {
    const m = frq.title.match(/^FRQ\s*\d+\s*:\s*(.+?)(?:\s*\(|$)/i);
    return m ? m[1].trim() : frq.title;
  });
}

/** Shape expected by `FullExamFRQ` — one combined exam document for the unit pack. */
export function buildGovUnitFrqPackForFullExam(unitNumber: number): {
  examTitle: string;
  questions: Array<{
    questionNumber: number;
    /** FRQ title line (e.g. “FRQ 3: …”). Shown above stimulus when set. */
    questionTitle?: string;
    prompt: string;
    govScotusStimulus?: {
      instructions: string;
      caseCitation: string;
      summary: string;
    };
    tableData?: GovFrqTableData;
    directionsAfterTable?: string;
    image?: { src: string; alt: string };
    walkthroughVideoUrl?: string;
    parts: Array<{ label: string; text: string; answerType: 'text'; answer?: string }>;
  }>;
} | null {
  const pack = getGovUnitStimulusFrqs(unitNumber);
  if (pack.length === 0) return null;
  return {
    examTitle: `AP Gov Unit ${unitNumber} FRQ Pack (${pack.length} Questions)`,
    questions: pack.map((frq, idx) => {
      const questionNumber = idx + 1;
      const walkthroughVideoUrl = getGovFrqWalkthroughVideoUrl(unitNumber, questionNumber);

      if (frq.tableData) {
        return {
          questionNumber,
          questionTitle: frq.title,
          prompt: '',
          tableData: frq.tableData,
          directionsAfterTable: frq.prompt.trim() || undefined,
          walkthroughVideoUrl,
          parts: mapGovFrqTasksToParts(frq),
        };
      }
      if (frq.scotusCaseCitation && frq.stimulus) {
        return {
          questionNumber,
          questionTitle: frq.title,
          prompt: frq.prompt?.trim() ?? '',
          walkthroughVideoUrl,
          govScotusStimulus: {
            instructions: GOV_SCOTUS_COMPARISON_INSTRUCTIONS,
            caseCitation: frq.scotusCaseCitation,
            summary: frq.stimulus,
          },
          parts: mapGovFrqTasksToParts(frq),
        };
      }
      const image = govFrqImageForPack(frq);
      if (frq.image) {
        return {
          questionNumber,
          questionTitle: frq.title,
          prompt: frq.prompt.trim(),
          ...(image ? { image } : {}),
          walkthroughVideoUrl,
          parts: mapGovFrqTasksToParts(frq),
        };
      }
      return {
        questionNumber,
        questionTitle: frq.title,
        prompt: frq.stimulus
          ? `${frq.stimulus.trim()}\n\n${frq.prompt.trim()}`.trim()
          : frq.prompt.trim(),
        walkthroughVideoUrl,
        parts: mapGovFrqTasksToParts(frq),
      };
    }),
  };
}

