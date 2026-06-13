export type ScotusEssayPrompt = {
  id: string;
  topic: string;
  requiredCase: string;
  nonRequiredCase: string;
  scenario: string;
  tasks: [string, string, string];
  /** The "Story" for Point B */
  caseFacts: string;
  /** The "Anchor" for Point A */
  constitutionalClause: string;
  /** The "Bridge" for Point C */
  comparisonPoints: string;
  /** Self-assessment for Point D */
  rubricChecklist: string[];
};

export const scotusEssayPrompts: ScotusEssayPrompt[] = [
  {
    id: 'marbury-v-madison',
    topic: 'Judicial Review',
    requiredCase: 'Marbury v. Madison (1803)',
    nonRequiredCase: 'Cooper v. Aaron (1958)',
    scenario:
      'Following the Brown v. Board of Education decision, the state of Arkansas resisted desegregation, arguing that it was not bound by Supreme Court interpretations of the Constitution. The Governor and legislature claimed they could "interpose" state authority against federal judicial decrees. In Cooper v. Aaron, the Supreme Court ruled unanimously against Arkansas, affirming that the federal judiciary’s interpretation of the Constitution is the supreme law of the land and that all state officials are bound by their oaths to support it.',
    tasks: [
      'Identify the power of the Supreme Court common to both Marbury v. Madison and Cooper v. Aaron.',
      'Describe the holding in Marbury v. Madison and Explain how it established the authority cited in Cooper v. Aaron.',
      'Explain how the decision in Cooper v. Aaron illustrates the principle of judicial supremacy.',
    ],
    caseFacts:
      'Marbury sued for his commission; the Court ruled the Judiciary Act of 1789 unconstitutional, establishing the power of judicial review.',
    constitutionalClause: 'Article III (Judicial Power)',
    comparisonPoints:
      'Marbury established the power to interpret the Constitution; Cooper applied that power to force state compliance with federal court orders.',
    rubricChecklist: [
      'Identified Judicial Review',
      'Described Marbury holding',
      'Linked Marbury precedent to Cooper application',
      'Explained judicial supremacy over state officials',
    ],
  },
  {
    id: 'mcculloch-v-maryland',
    topic: 'Federalism & The Supremacy Clause',
    requiredCase: 'McCulloch v. Maryland (1819)',
    nonRequiredCase: 'Arizona v. United States (2012)',
    scenario:
      'In 2010, Arizona enacted S.B. 1070, a state law intended to discourage illegal immigration. One provision made it a state crime for an immigrant to be in the state without carrying registration documents. The federal government sued, arguing that immigration is an exclusive national power. Arizona argued that the state had a "reserved power" to protect its citizens when federal enforcement was lacking. In its decision, the Supreme Court struck down the state-level penalties, holding that the federal government possesses "broad, undoubted power over the subject of immigration" and that federal law preempts state law in this field.',
    tasks: [
      'Identify the constitutional clause that is common to both McCulloch v. Maryland and Arizona v. United States.',
      'Describe the facts of the required case, McCulloch v. Maryland, and Explain how those facts led to a similar holding in Arizona v. United States regarding the balance of power.',
      'Explain how the holding in Arizona v. United States illustrates the principle of federalism.',
    ],
    caseFacts:
      'Maryland attempted to tax a branch of the Second Bank of the U.S. to curb federal power; the Court ruled that states cannot tax federal instruments as federal law is supreme.',
    constitutionalClause: 'Supremacy Clause (Article VI)',
    comparisonPoints:
      'In McCulloch, the Court prevented a state from interfering with a federal bank; similarly, in Arizona, the Court prevented a state from interfering with federal immigration authority.',
    rubricChecklist: [
      'Identified Supremacy Clause',
      'Described McCulloch facts (Bank tax)',
      'Linked federal preemption to both cases',
      'Connected to the division of power in Federalism',
    ],
  },
  {
    id: 'schenck-v-united-states',
    topic: 'Free Speech & Social Order',
    requiredCase: 'Schenck v. United States (1919)',
    nonRequiredCase: 'Brandenburg v. Ohio (1969)',
    scenario:
      'Clarence Brandenburg, a leader of the Ku Klux Klan, gave a televised speech advocating for "revenge" against the government and was convicted under an Ohio criminal syndicalism law. The law prohibited advocating the duty, necessity, or propriety of crime, sabotage, or violence. The Supreme Court overturned the conviction, holding that the government cannot punish inflammatory speech unless that speech is "directed to inciting or producing imminent lawless action and is likely to incite or produce such action."',
    tasks: [
      'Identify the civil liberty that is common to both Schenck v. United States and Brandenburg v. Ohio.',
      'Describe the facts in the required case, Schenck v. United States, and Explain how the standard set in Brandenburg v. Ohio refined the "clear and present danger" test.',
      'Explain how the decision in Brandenburg v. Ohio illustrates the Court’s evolving standard for restricting political speech.',
    ],
    caseFacts:
      'Schenck distributed anti-draft leaflets; the Court ruled speech can be limited if it poses a "clear and present danger" to the nation.',
    constitutionalClause: 'First Amendment: Freedom of Speech',
    comparisonPoints:
      'Schenck allowed restrictions based on general "danger"; Brandenburg narrowed this by requiring "imminence" and a high likelihood of illegal action.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Schenck facts (leaflets)',
      'Contrasted "clear and present danger" with "imminent lawless action"',
      'Explained protection of inflammatory political speech',
    ],
  },
  {
    id: 'brown-v-board-of-education',
    topic: 'Equal Protection & Desegregation',
    requiredCase: 'Brown v. Board of Education (1954)',
    nonRequiredCase: 'Sweatt v. Painter (1950)',
    scenario:
      'Heman Sweatt, an African American man, was refused admission to the University of Texas Law School on the basis of his race. The state created a separate, inferior law school for Black students. Sweatt sued, arguing that the separate facility did not provide equal educational opportunities. The Supreme Court ruled in favor of Sweatt, holding that the intangible factors—such as the prestige of the faculty, influence of the alumni, and standing in the community—made the separate school inherently unequal, violating the Equal Protection Clause.',
    tasks: [
      'Identify the constitutional clause that is common to both Brown v. Board of Education and Sweatt v. Painter.',
      'Describe the holding in the required case, Brown v. Board of Education, and Explain how the reasoning in Sweatt v. Painter foreshadowed the Court’s decision to end segregation in public schools.',
      'Explain how the decision in Brown v. Board of Education illustrates the Court’s role in promoting civil rights.',
    ],
    caseFacts:
      'States established separate public schools for Black and White students; the Court ruled that "separate but equal" is inherently unequal and violates the Equal Protection Clause.',
    constitutionalClause: 'Fourteenth Amendment: Equal Protection Clause',
    comparisonPoints:
      'Both cases attacked the "separate but equal" doctrine by focusing on the inequality of facilities and opportunities; Sweatt focused on higher education, while Brown extended the logic to K-12 public schools.',
    rubricChecklist: [
      'Identified Equal Protection Clause',
      'Described Brown holding (separate is unequal)',
      'Linked Sweatt precedent to the invalidation of segregation',
      'Explained the expansion of civil rights via judicial decree',
    ],
  },
  {
    id: 'baker-v-carr',
    topic: 'Redistricting & Malapportionment',
    requiredCase: 'Baker v. Carr (1961)',
    nonRequiredCase: 'Reynolds v. Sims (1964)',
    scenario:
      'In Alabama, legislative districts had not been updated for over 60 years, despite massive population shifts from rural to urban areas. This resulted in rural districts with a small number of voters having the same representation as urban districts with vastly more people. Residents sued, arguing this violated the Equal Protection Clause. The Supreme Court ruled that districts must be apportioned on a population basis, establishing the "one person, one vote" standard for state legislative districts.',
    tasks: [
      'Identify the constitutional clause that is common to both Baker v. Carr and Reynolds v. Sims.',
      'Describe the holding in the required case, Baker v. Carr, and Explain how the facts in Reynolds v. Sims applied that holding to state legislative apportionment.',
      'Explain how the decision in Baker v. Carr illustrates the concept of justiciability in redistricting cases.',
    ],
    caseFacts:
      'Tennessee citizens challenged unequal district sizes; the Court ruled that redistricting issues are justiciable, allowing federal courts to intervene to ensure equal representation.',
    constitutionalClause: 'Fourteenth Amendment: Equal Protection Clause',
    comparisonPoints:
      'Baker established that courts can intervene in redistricting; Reynolds used that authority to mandate that state legislative districts must be roughly equal in population.',
    rubricChecklist: [
      'Identified Equal Protection Clause',
      'Described Baker holding (justiciability)',
      'Linked the "one person, one vote" principle to both',
      'Explained the role of courts in maintaining fair representation',
    ],
  },
  {
    id: 'engel-v-vitale',
    topic: 'Establishment Clause',
    requiredCase: 'Engel v. Vitale (1962)',
    nonRequiredCase: 'Lee v. Weisman (1992)',
    scenario:
      'At a middle school graduation in Providence, Rhode Island, the school principal invited a rabbi to deliver nonsectarian prayers. Deborah Weisman sued, arguing that the inclusion of clergy-led prayer at a public school graduation ceremony violated the Establishment Clause of the First Amendment. The Supreme Court ruled 5-4 that including prayer at graduation ceremonies created "coercive" pressure on students to participate in religious observance, thereby violating the constitutional prohibition against government-sponsored religion.',
    tasks: [
      'Identify the First Amendment clause that is common to both Engel v. Vitale and Lee v. Weisman.',
      'Describe the holding in the required case, Engel v. Vitale, and Explain how the facts in Lee v. Weisman led to a similar holding.',
      'Explain how the decision in Lee v. Weisman illustrates the Court’s commitment to the separation of church and state in public education.',
    ],
    caseFacts:
      'NY state authorized a short, voluntary, non-denominational prayer; the Court ruled it unconstitutional because the government may not endorse religious activity.',
    constitutionalClause: 'First Amendment: Establishment Clause',
    comparisonPoints:
      'Both cases involved the government sponsoring religious activity in a school setting; the Court ruled both unconstitutional as government endorsement of religion.',
    rubricChecklist: [
      'Identified Establishment Clause',
      'Described Engel holding (no official prayer)',
      'Linked "coercion" in school settings to both cases',
      'Explained wall of separation doctrine',
    ],
  },
  {
    id: 'gideon-v-wainwright',
    topic: 'Rights of the Accused',
    requiredCase: 'Gideon v. Wainwright (1963)',
    nonRequiredCase: 'Betts v. Brady (1942)',
    scenario:
      'In Betts v. Brady, Willie Betts was indicted for robbery in Maryland. He was unable to afford counsel and requested that the court appoint one for him. The trial judge denied the request, and Betts represented himself. The Supreme Court at the time held that the Fourteenth Amendment did not force states to provide counsel to indigent defendants in non-capital cases, arguing that the refusal of counsel did not necessarily violate the "fundamental fairness" required by the Due Process Clause.',
    tasks: [
      'Identify the Sixth Amendment guarantee that is common to both Gideon v. Wainwright and Betts v. Brady.',
      'Describe the holding in the required case, Gideon v. Wainwright, and Explain how the Court’s reasoning in Gideon rejected the logic used in Betts v. Brady.',
      'Explain how the decision in Gideon v. Wainwright illustrates the principle of selective incorporation.',
    ],
    caseFacts:
      'Gideon was charged with a felony but denied an attorney; the Court ruled that the Sixth Amendment right to counsel applies to states via the Fourteenth Amendment.',
    constitutionalClause: 'Sixth Amendment: Right to Counsel',
    comparisonPoints:
      'Betts established a limited right to counsel; Gideon overturned this precedent, establishing that counsel is a fundamental right for all felony defendants regardless of state resources.',
    rubricChecklist: [
      'Identified Right to Counsel',
      'Described Gideon holding (attorney required)',
      'Linked Gideon reasoning to the overturning of Betts',
      'Explained incorporation of the Sixth Amendment',
    ],
  },
  {
    id: 'tinker-v-des-moines',
    topic: 'Student Speech',
    requiredCase: 'Tinker v. Des Moines (1969)',
    nonRequiredCase: 'Morse v. Frederick (2007)',
    scenario:
      'During an Olympic Torch Relay event in Juneau, Alaska, student Joseph Frederick unfurled a banner that read "BONG HiTS 4 JESUS" as the cameras passed. Principal Deborah Morse confiscated the banner and suspended Frederick for ten days, claiming the banner promoted illegal drug use, which violated school policy. Frederick sued, arguing that his message was protected symbolic speech. The Supreme Court ruled 5-4 in favor of the school, holding that schools may take steps to safeguard those in their care from speech that can reasonably be regarded as encouraging illegal drug use, which undermines the school’s educational mission.',
    tasks: [
      'Identify the civil liberty that is common to both Tinker v. Des Moines and Morse v. Frederick.',
      'Describe the facts in the required case, Tinker v. Des Moines, and Explain how the facts in Morse v. Frederick led to a different holding.',
      'Explain how the decision in Morse v. Frederick illustrates the Court’s need to balance individual rights and social order.',
    ],
    caseFacts:
      'Students were suspended for wearing black armbands to protest the Vietnam War; the Court ruled that students have free speech rights unless it causes a substantial disruption.',
    constitutionalClause: 'First Amendment: Freedom of Speech',
    comparisonPoints:
      'In Tinker, the speech was protected political protest that did not cause disruption. In Morse, the speech was restricted because the Court found a "compelling interest" in preventing drug promotion at school.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Tinker armband facts',
      'Contrasted political speech vs. drug safety exception',
      'Explained the "Substantial Disruption" vs "Educational Mission"',
    ],
  },
  {
    id: 'new-york-times-v-united-states',
    topic: 'Freedom of the Press',
    requiredCase: 'New York Times Co. v. United States (1971)',
    nonRequiredCase: 'Near v. Minnesota (1931)',
    scenario:
      'Jay Near published a scandal sheet in Minneapolis attacking local officials. A state law allowed the government to enjoin (stop) "malicious, scandalous, and defamatory" publications. Near was served with a permanent injunction. The Supreme Court ruled in favor of Near, holding that the government cannot engage in "prior restraint"—preventing material from being published—except in the most extreme circumstances, such as immediate threats to national security.',
    tasks: [
      'Identify the First Amendment freedom that is common to both New York Times Co. v. United States and Near v. Minnesota.',
      'Describe the holding in the required case, New York Times Co. v. United States, and Explain how the facts in Near v. Minnesota illustrate a similar limit on government power.',
      'Explain how these decisions reflect the role of the press as a "watchdog" in a democracy.',
    ],
    caseFacts:
      'The government attempted to block the publication of the Pentagon Papers; the Court ruled that the First Amendment prohibits prior restraint despite claims of national security.',
    constitutionalClause: 'First Amendment: Freedom of the Press',
    comparisonPoints:
      'Both cases rejected prior restraint. Near established that the press is protected from state censorship; NYT applied this principle to federal attempts to block national security documents.',
    rubricChecklist: [
      'Identified Freedom of the Press',
      'Described NYT holding (prior restraint)',
      'Linked "heavy presumption against constitutionality" in both',
      'Explained press as a democratic watchdog',
    ],
  },
  {
    id: 'wisconsin-v-yoder',
    topic: 'The Free Exercise Clause',
    requiredCase: 'Wisconsin v. Yoder (1972)',
    nonRequiredCase: 'Church of the Lukumi Babalu Aye v. City of Hialeah (1993)',
    scenario:
      'The Church of the Lukumi Babalu Aye practiced the Santeria religion, which involves ritual animal sacrifice. When the church announced plans to open a worship center in Hialeah, Florida, the city council passed several ordinances banning the "unnecessary" killing of animals for ritual purposes. The ordinances allowed for exceptions such as kosher slaughter and hunting. The Church sued, claiming the laws targeted their religious practice. The Supreme Court ruled unanimously in favor of the Church, holding that because the laws specifically targeted religious activity while allowing secular killing, they were not "neutral" and violated the First Amendment.',
    tasks: [
      'Identify the First Amendment clause that is common to both Wisconsin v. Yoder and Church of the Lukumi Babalu Aye v. City of Hialeah.',
      'Describe the holding in the required case, Wisconsin v. Yoder, and Explain how the facts in Church of the Lukumi Babalu Aye resulted in a similar holding.',
      'Explain how the decision in Church of the Lukumi Babalu Aye illustrates the Court’s role in protecting minority rights.',
    ],
    caseFacts:
      'Amish parents refused to send children to high school; the Court ruled the Free Exercise Clause protected their right to religious practice over the state’s education interest.',
    constitutionalClause: 'First Amendment: Free Exercise Clause',
    comparisonPoints:
      'In both cases, the Court protected religious practitioners from laws that significantly burdened their faith. In Lukumi, the Court specifically checked a government attempt to target a "non-traditional" minority religion.',
    rubricChecklist: [
      'Identified Free Exercise Clause',
      'Described Yoder holding (Amish exemption)',
      'Linked government burden on religious practice',
      'Explained protection of unpopular minority beliefs',
    ],
  },
  {
    id: 'shaw-v-reno',
    topic: 'Voting Rights & Equal Protection',
    requiredCase: 'Shaw v. Reno (1993)',
    nonRequiredCase: 'Miller v. Johnson (1995)',
    scenario:
      'Georgia redrew its congressional districts to increase minority representation. The Department of Justice rejected the plan, leading Georgia to create a district that was significantly majority-Black. Residents challenged the district as a racial gerrymander under the Equal Protection Clause. The Supreme Court ruled that districts drawn primarily based on race, rather than traditional redistricting criteria, are subject to "strict scrutiny" and must be narrowly tailored to achieve a compelling government interest.',
    tasks: [
      'Identify the constitutional clause that is common to both Shaw v. Reno and Miller v. Johnson.',
      'Describe the holding in the required case, Shaw v. Reno, and Explain how the facts in Miller v. Johnson led to a similar holding.',
      'Explain how the decision in Shaw v. Reno balances the goals of the Voting Rights Act and the requirements of the Equal Protection Clause.',
    ],
    caseFacts:
      'North Carolina created an oddly shaped district to ensure minority representation; the Court ruled that racial gerrymandering is subject to strict scrutiny.',
    constitutionalClause: 'Fourteenth Amendment: Equal Protection Clause',
    comparisonPoints:
      'Both cases established that race cannot be the "predominant factor" in drawing district lines, even when the intention is to increase minority representation.',
    rubricChecklist: [
      'Identified Equal Protection Clause',
      'Described Shaw holding (race cannot be predominant factor)',
      'Linked "strict scrutiny" to both cases',
      'Explained the tension between representation and equality',
    ],
  },
  {
    id: 'united-states-v-lopez',
    topic: 'Federalism & The Commerce Clause',
    requiredCase: 'United States v. Lopez (1995)',
    nonRequiredCase: 'United States v. Morrison (2000)',
    scenario:
      'In 1994, Congress passed the Violence Against Women Act (VAWA). One provision of the act allowed victims of gender-motivated violence to sue their attackers for damages in federal court. Christy Brzonkala, a student at Virginia Tech, sued her alleged attackers under this act. The defendants argued that Congress did not have the authority to pass the law because it dealt with crime and safety—areas traditionally left to the states. The federal government argued that violence against women significantly affected the national economy. The Supreme Court struck down the provision, holding that gender-motivated crimes of violence are not, in any sense, economic activity and thus do not fall under federal authority.',
    tasks: [
      'Identify the constitutional clause that is common to both United States v. Lopez and United States v. Morrison.',
      'Describe the holding in the required case, United States v. Lopez, and Explain how the facts in United States v. Morrison led to a similar holding.',
      'Explain how the decision in United States v. Morrison reflects the democratic ideal of limited government.',
    ],
    caseFacts:
      'A student was charged under the Gun-Free School Zones Act; the Court ruled Congress exceeded its power because carrying a gun in school is not an economic activity.',
    constitutionalClause: 'Commerce Clause (Article I, Section 8)',
    comparisonPoints:
      'In both cases, the Court created a limit on federal power, ruling that "non-economic" local activities (guns in schools and gender-motivated violence) cannot be regulated via the Commerce Clause.',
    rubricChecklist: [
      'Identified Commerce Clause',
      'Described Lopez holding (not economic activity)',
      'Linked "non-economic" crimes to federal overreach',
      'Explained how this limits the scope of federal power',
    ],
  },
  {
    id: 'mcdonald-v-chicago',
    topic: 'Second Amendment & Incorporation',
    requiredCase: 'McDonald v. Chicago (2010)',
    nonRequiredCase: 'District of Columbia v. Heller (2008)',
    scenario:
      'Washington, D.C. enacted a strict ban on handgun possession, requiring all firearms in the home to be kept unloaded and disassembled. Dick Heller, a D.C. special police officer, applied to register a handgun but was denied. The Supreme Court ruled that the Second Amendment protects an individual’s right to keep and bear arms for self-defense, regardless of service in a militia, and that this right applies to federal enclaves.',
    tasks: [
      'Identify the constitutional amendment that is common to both McDonald v. Chicago and District of Columbia v. Heller.',
      'Describe the holding in the required case, McDonald v. Chicago, and Explain how the Court’s decision in Heller provided the necessary precedent for the holding in McDonald.',
      'Explain how the decision in McDonald v. Chicago illustrates the process of selective incorporation.',
    ],
    caseFacts:
      'Chicago banned handguns; the Court ruled that the Second Amendment right to keep and bear arms is incorporated against the states via the Fourteenth Amendment.',
    constitutionalClause: 'Second Amendment',
    comparisonPoints:
      'Heller established the individual right to bear arms at the federal level; McDonald subsequently incorporated this right, applying it to state and local governments.',
    rubricChecklist: [
      'Identified Second Amendment',
      'Described McDonald holding (incorporation)',
      'Linked Heller individual right precedent to McDonald',
      'Explained selective incorporation of rights',
    ],
  },
  {
    id: 'citizens-united-v-fec',
    topic: 'Campaign Finance',
    requiredCase: 'Citizens United v. FEC (2010)',
    nonRequiredCase: 'Buckley v. Valeo (1976)',
    scenario:
      'Following the Federal Election Campaign Act, the Court in Buckley v. Valeo reviewed limits on political spending. The Court held that while the government can limit contributions to candidates to prevent corruption, it cannot limit independent expenditures by individuals or groups, nor can it limit the amount a candidate spends from their own personal funds, as this constitutes political speech.',
    tasks: [
      'Identify the First Amendment freedom that is common to both Citizens United v. FEC and Buckley v. Valeo.',
      'Describe the holding in the required case, Citizens United v. FEC, and Explain how the reasoning in Buckley v. Valeo laid the foundation for that decision.',
      'Explain how the decision in Citizens United v. FEC illustrates the Court’s stance on corporate political speech.',
    ],
    caseFacts:
      'The government banned corporate-funded political broadcasts; the Court ruled that corporate spending is protected political speech under the First Amendment.',
    constitutionalClause: 'First Amendment: Freedom of Speech',
    comparisonPoints:
      'Both cases expanded the concept of money as speech. Buckley protected individual/candidate spending; Citizens United extended these protections to corporate and union political expenditures.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Citizens United holding (corporate speech)',
      'Linked "money as speech" principle to Buckley',
      'Explained the rejection of spending limits',
    ],
  },
];
