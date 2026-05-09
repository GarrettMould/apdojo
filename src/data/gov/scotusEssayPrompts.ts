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
    id: 'mcculloch-v-maryland',
    topic: 'Federalism & The Supremacy Clause',
    requiredCase: 'McCulloch v. Maryland (1819)',
    nonRequiredCase: 'Arizona v. United States (2012)',
    scenario:
      'Arizona passed S.B. 1070, creating state-level penalties for immigrants who failed to carry registration documents. The federal government sued, arguing immigration is a federal matter. The Court struck down provisions, holding that federal law preempts state law.',
    tasks: [
      'Identify the constitutional clause that is common to both McCulloch v. Maryland and Arizona v. United States.',
      'Explain how the facts in McCulloch and Arizona led to a similar holding regarding the balance of power.',
      'Explain how the holding in Arizona illustrates the principle of federalism.',
    ],
    caseFacts:
      'Maryland tried to tax a branch of the Second Bank of the U.S. to limit federal power; the Court ruled states cannot tax federal instruments.',
    constitutionalClause: 'Supremacy Clause (Article VI)',
    comparisonPoints:
      'Just as in McCulloch, where state law could not interfere with a federal bank, the Arizona law was struck down because state immigration penalties interfered with federal authority.',
    rubricChecklist: [
      'Identified Supremacy Clause',
      'Described McCulloch bank tax facts',
      'Linked federal preemption to state overreach',
      'Connected to the division of power in Federalism',
    ],
  },
  {
    id: 'united-states-v-lopez',
    topic: 'Federalism & The Commerce Clause',
    requiredCase: 'United States v. Lopez (1995)',
    nonRequiredCase: 'United States v. Morrison (2000)',
    scenario:
      'The Violence Against Women Act allowed victims of gender-motivated violence to sue in federal court. The Court struck this down, holding that gender-motivated violent crime is not economic activity.',
    tasks: [
      'Identify the constitutional clause that is common to both United States v. Lopez and United States v. Morrison.',
      'Explain how the facts in Morrison led to a similar holding as in United States v. Lopez.',
      'Explain how the decision in Morrison reflects the democratic ideal of limited government.',
    ],
    caseFacts:
      'A student was charged with carrying a gun to school under a federal law; the Court ruled Congress exceeded its power because carrying a gun is not an economic activity.',
    constitutionalClause: 'Commerce Clause (Article I, Section 8)',
    comparisonPoints:
      'In both cases, the Court limited federal power, ruling that neither carrying a gun (Lopez) nor gender-motivated violence (Morrison) constituted the "interstate commerce" required for federal regulation.',
    rubricChecklist: [
      'Identified Commerce Clause',
      'Described Lopez gun-free zone facts',
      'Linked non-economic activity in both cases',
      'Explained how this limits federal overreach',
    ],
  },
  {
    id: 'engel-v-vitale',
    topic: 'The Establishment Clause (Public Funds)',
    requiredCase: 'Engel v. Vitale (1962)',
    nonRequiredCase: 'Lemon v. Kurtzman (1971)',
    scenario:
      'State laws allowed funding for religious-school teacher salaries for secular subjects. The Court struck them down to prevent excessive entanglement.',
    tasks: [
      'Identify the First Amendment clause that is common to both Engel v. Vitale and Lemon v. Kurtzman.',
      "Explain how the facts in both cases led to the Court's ruling that the government actions were unconstitutional.",
      'Explain how the holding in Lemon impacts the wall of separation between church and state.',
    ],
    caseFacts:
      'New York authorized a short, voluntary, nondenominational prayer to be recited at the start of the school day; the Court ruled this violated the separation of church and state.',
    constitutionalClause: 'First Amendment: Establishment Clause',
    comparisonPoints:
      'Unlike in Engel, which dealt with prayer, Lemon dealt with financial aid. However, both were struck down because they involved the government actively supporting or entangling itself with religious institutions.',
    rubricChecklist: [
      'Identified Establishment Clause',
      'Described Engel school prayer facts',
      'Linked state support/sponsorship in both cases',
      'Explained the "Wall of Separation" principle',
    ],
  },
  {
    id: 'wisconsin-v-yoder',
    topic: 'The Free Exercise Clause',
    requiredCase: 'Wisconsin v. Yoder (1972)',
    nonRequiredCase: 'Church of the Lukumi Babalu Aye v. City of Hialeah (1993)',
    scenario:
      'A city banned ritual animal slaughter after a Santeria church announced plans to open. The Court ruled the law targeted a specific religious practice.',
    tasks: [
      'Identify the First Amendment clause that is common to both Wisconsin v. Yoder and Church of the Lukumi Babalu Aye.',
      "Explain how the facts in both cases resulted in holdings that protected citizens' rights.",
      "Explain how the decision in Lukumi Babalu Aye illustrates the Court's role in protecting minority rights.",
    ],
    caseFacts:
      "Amish parents refused to send children to school after 8th grade, citing religious conflict; the Court ruled their right to practice religion outweighed the state's interest in school attendance.",
    constitutionalClause: 'First Amendment: Free Exercise Clause',
    comparisonPoints:
      'Just as the Court protected the Amish from a general school law in Yoder, it protected the Santeria church in Hialeah from a law that specifically targeted their ritual practices.',
    rubricChecklist: [
      'Identified Free Exercise Clause',
      'Described Yoder Amish education facts',
      'Linked the burden on religious practice in both cases',
      'Explained protection of unpopular minority beliefs',
    ],
  },
  {
    id: 'schenck-v-united-states',
    topic: 'Free Speech (Dangerous Advocacy)',
    requiredCase: 'Schenck v. United States (1919)',
    nonRequiredCase: 'Brandenburg v. Ohio (1969)',
    scenario:
      'A KKK leader was convicted for inflammatory speech. The Court overturned it, ruling speech is protected unless it incites "imminent lawless action."',
    tasks: [
      'Identify the civil liberty that is common to both Schenck v. United States and Brandenburg v. Ohio.',
      'Explain how the facts in Schenck and Brandenburg led to different holdings regarding limits of government power.',
      'Explain how the decision in Brandenburg reflects a shift toward more expansive protection of civil liberties.',
    ],
    caseFacts:
      'Socialists distributed leaflets urging men to resist the WWI draft; the Court upheld their conviction, stating speech creating a "clear and present danger" is not protected.',
    constitutionalClause: 'First Amendment: Freedom of Speech',
    comparisonPoints:
      'While Schenck allowed the government to punish speech that *might* cause danger, Brandenburg established a much stricter standard, protecting inflammatory speech unless it causes *imminent* lawless action.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Schenck draft-resistance facts',
      'Explained the difference in "danger" standards',
      'Connected to the ideal of Limited Government',
    ],
  },
  {
    id: 'tinker-v-des-moines',
    topic: 'Student Speech',
    requiredCase: 'Tinker v. Des Moines (1969)',
    nonRequiredCase: 'Morse v. Frederick (2007)',
    scenario:
      'A student unfurled a "Bong Hits 4 Jesus" banner. The Court held schools may restrict speech reasonably seen as encouraging drug use.',
    tasks: [
      'Identify the civil liberty that is common to both Tinker v. Des Moines and Morse v. Frederick.',
      'Explain how the facts in Morse v. Frederick led to a different holding than in Tinker v. Des Moines.',
      "Explain how the decision in Morse illustrates the Court's need to balance individual rights and social order.",
    ],
    caseFacts:
      'Students were suspended for wearing black armbands to protest the Vietnam War; the Court ruled that students do not "shed their rights at the schoolhouse gate."',
    constitutionalClause: 'First Amendment: Freedom of Speech (Symbolic Speech)',
    comparisonPoints:
      'In Tinker, the speech was protected because it was non-disruptive political protest. In Morse, the speech was restricted because it promoted illegal drug use, which the Court deemed a safety exception.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Tinker armband facts',
      'Contrasted political speech vs. drug promotion',
      'Explained the "Substantial Disruption" test',
    ],
  },
  {
    id: 'new-york-times-v-united-states',
    topic: 'Prior Restraint & The Press',
    requiredCase: 'New York Times Co. v. United States (1971)',
    nonRequiredCase: 'Hazelwood School District v. Kuhlmeier (1988)',
    scenario:
      'A principal removed pages from a school paper about teen pregnancy. The Court held officials may control school-sponsored speech for pedagogical reasons.',
    tasks: [
      'Identify the constitutional liberty common to both New York Times v. United States and Hazelwood v. Kuhlmeier.',
      'Explain how the facts in New York Times v. United States and Hazelwood led to different holdings regarding prior restraint.',
      'Explain how the holding in Hazelwood relates to limited government in a school setting.',
    ],
    caseFacts:
      'The Nixon administration tried to stop the publication of the "Pentagon Papers"; the Court ruled this "prior restraint" was unconstitutional as the government didn\'t prove a threat to national security.',
    constitutionalClause: 'First Amendment: Freedom of the Press',
    comparisonPoints:
      'Unlike the NYT case, which protected the press from national censorship, Hazelwood allowed a principal to censor a school paper because it was a "school-sponsored" forum rather than a public one.',
    rubricChecklist: [
      'Identified Freedom of the Press',
      'Described NYT Pentagon Papers facts',
      'Explained the "Prior Restraint" standard',
      'Connected school authority to pedagogical interests',
    ],
  },
  {
    id: 'brown-v-board-of-education',
    topic: 'Equal Protection (De Facto Segregation)',
    requiredCase: 'Brown v. Board of Education (1954)',
    nonRequiredCase: 'Swann v. Charlotte-Mecklenburg Board of Education (1971)',
    scenario:
      'Schools remained segregated due to housing. A court ordered busing to integrate. The Court upheld broad remedial power to fix constitutional violations.',
    tasks: [
      'Identify the constitutional clause that is the basis for both Brown and Swann.',
      'Explain how the facts in Swann led to a holding that enforced Brown.',
      'Explain how the decision in Swann relates to federalism.',
    ],
    caseFacts:
      'Black students were denied admittance to white public schools under "separate but equal" laws; the Court ruled that racial segregation in public schools is inherently unequal.',
    constitutionalClause: '14th Amendment: Equal Protection Clause',
    comparisonPoints:
      'Brown established that segregation was illegal, and Swann provided the actual tools (like busing) that federal courts could use to force states to comply with that holding.',
    rubricChecklist: [
      'Identified Equal Protection Clause',
      'Described Brown school segregation facts',
      'Linked the "illegal state action" to federal remedy',
      'Connected federal oversight to state compliance',
    ],
  },
  {
    id: 'shaw-v-reno',
    topic: 'Racial Gerrymandering',
    requiredCase: 'Shaw v. Reno (1993)',
    nonRequiredCase: 'Miller v. Johnson (1995)',
    scenario:
      'Georgia created a "max-Black" district connecting distant communities. The Court struck it down because race was the "predominant factor" in districting.',
    tasks: [
      'Identify the constitutional clause common to both Shaw v. Reno and Miller v. Johnson.',
      'Explain how the facts in both cases produced similar holdings.',
      'Explain how the decision in Miller relates to the democratic ideal of republicanism.',
    ],
    caseFacts:
      'North Carolina created a bizarrely shaped majority-minority district to increase Black representation; the Court ruled districts cannot be drawn based *solely* on race.',
    constitutionalClause: '14th Amendment: Equal Protection Clause',
    comparisonPoints:
      'In both cases, the Court applied "strict scrutiny" to redistricting plans, ruling that using race as the primary factor to group voters violates the 14th Amendment, even if the intent is to help minorities.',
    rubricChecklist: [
      'Identified Equal Protection Clause',
      'Described Shaw bizarre shape facts',
      'Explained "race-neutral" districting requirements',
      'Connected to fair representation/republicanism',
    ],
  },
  {
    id: 'gideon-v-wainwright',
    topic: 'Selective Incorporation (6th Amendment)',
    requiredCase: 'Gideon v. Wainwright (1963)',
    nonRequiredCase: 'Betts v. Brady (1942)',
    scenario:
      'In Betts, a defendant was denied counsel. In Gideon, the Court reversed this and required states to provide counsel in felony cases.',
    tasks: [
      'Identify the constitutional clause used to incorporate rights in both Betts v. Brady and Gideon v. Wainwright.',
      'Explain how the facts in Gideon resulted in the Court overturning Betts.',
      'Explain how Gideon illustrates selective incorporation.',
    ],
    caseFacts:
      'Clarence Gideon was charged with a felony but denied a lawyer by Florida because it wasn\'t a capital case; he defended himself and was convicted.',
    constitutionalClause: '6th Amendment (Right to Counsel) and 14th Amendment (Due Process)',
    comparisonPoints:
      'Just as Betts allowed states to ignore the 6th Amendment in 1942, Gideon forced states to follow it in 1963, ruling the right to a lawyer is fundamental to a fair trial.',
    rubricChecklist: [
      'Identified 6th and 14th Amendments',
      'Described Gideon indigency facts',
      'Explained the shift from Betts to Gideon',
      'Defined Selective Incorporation',
    ],
  },
  {
    id: 'mcdonald-v-chicago',
    topic: 'The 2nd Amendment',
    requiredCase: 'McDonald v. Chicago (2010)',
    nonRequiredCase: 'District of Columbia v. Heller (2008)',
    scenario:
      'D.C. banned handguns. The Court held the 2nd Amendment protects an individual right to possess a firearm for self-defense in federal enclaves.',
    tasks: [
      'Identify the constitutional amendment common to both McDonald v. Chicago and District of Columbia v. Heller.',
      'Explain how the holding in Heller provided the legal basis for McDonald.',
      'Explain how McDonald reflects federalism.',
    ],
    caseFacts:
      'Chicago residents challenged a city handgun ban after the Court ruled in Heller that the 2nd Amendment protects an individual right to bear arms.',
    constitutionalClause: '2nd Amendment and 14th Amendment (Due Process)',
    comparisonPoints:
      'Heller established that the 2nd Amendment protects an individual right in federal areas (D.C.). McDonald then used that logic to "incorporate" that right, applying it to all states and cities.',
    rubricChecklist: [
      'Identified 2nd and 14th Amendments',
      'Described McDonald handgun ban facts',
      'Linked the Heller precedent to the McDonald ruling',
      'Explained state vs. federal power limits',
    ],
  },
  {
    id: 'citizens-united-v-fec',
    topic: 'Campaign Finance',
    requiredCase: 'Citizens United v. FEC (2010)',
    nonRequiredCase: 'Buckley v. Valeo (1976)',
    scenario:
      'Congress limited campaign spending. The Court in Buckley struck spending limits on candidates\' own money, treating spending as speech.',
    tasks: [
      'Identify the First Amendment clause common to Citizens United v. FEC and Buckley v. Valeo.',
      "Explain how Buckley's money-is-speech logic led to Citizens United.",
      'Explain how Citizens United illustrates pluralist democracy.',
    ],
    caseFacts:
      'A non-profit produced a movie attacking Hillary Clinton; the Court ruled that corporate funding of independent political broadcasts cannot be limited.',
    constitutionalClause: 'First Amendment: Freedom of Speech',
    comparisonPoints:
      'Just as Buckley established that spending money to communicate a political message is "speech," Citizens United extended that right to corporations and unions, allowing unlimited independent spending.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Citizens United "Hillary" movie facts',
      'Explained the "Money is Speech" logic',
      'Connected to group-based (pluralist) activism',
    ],
  },
  {
    id: 'marbury-v-madison',
    topic: 'Judicial Review & Executive Power',
    requiredCase: 'Marbury v. Madison (1803)',
    nonRequiredCase: 'United States v. Nixon (1974)',
    scenario:
      'Nixon refused to release Watergate tapes, citing executive privilege. The Court held privilege is not absolute and cannot block evidence.',
    tasks: [
      'Identify the constitutional power established in Marbury that the Court exercised in United States v. Nixon.',
      'Explain how Marbury enabled the Court to rule against the president in Nixon.',
      'Explain how Nixon reflects checks and balances.',
    ],
    caseFacts:
      'William Marbury sued for his commission as a judge; the Court ruled it had the power to strike down laws that conflict with the Constitution.',
    constitutionalClause: 'Article III (Judicial Power)',
    comparisonPoints:
      'Marbury established the Court\'s authority to say "what the law is" (Judicial Review). In Nixon, the Court used that power to define the limits of "Executive Privilege," checking the President.',
    rubricChecklist: [
      'Identified Judicial Review',
      'Described Marbury\'s "Midnight Judges" facts',
      'Linked the Court\'s final authority to Nixon\'s tapes',
      'Explained the check on executive power',
    ],
  },
  {
    id: 'baker-v-carr',
    topic: 'One Person, One Vote',
    requiredCase: 'Baker v. Carr (1962)',
    nonRequiredCase: 'Reynolds v. Sims (1964)',
    scenario:
      'Alabama legislative districts had huge disparities. The Court held both chambers of a state legislature must be apportioned by population.',
    tasks: [
      'Identify the constitutional clause common to Baker v. Carr and Reynolds v. Sims.',
      'Explain how Baker opened the door to Reynolds.',
      'Explain how Reynolds relates to popular sovereignty.',
    ],
    caseFacts:
      'Tennessee had not redrawn its legislative districts in decades, allowing rural areas to have more power than urban ones; the Court ruled redistricting is a "justiciable" issue.',
    constitutionalClause: '14th Amendment: Equal Protection Clause',
    comparisonPoints:
      'In Baker, the Court ruled that it *had the right* to hear cases about districting. In Reynolds, the Court used that authority to create the "One Person, One Vote" standard for state legislatures.',
    rubricChecklist: [
      'Identified Equal Protection Clause',
      'Described Baker malapportionment facts',
      'Linked "justiciability" to the actual population standard',
      'Explained the ideal of Popular Sovereignty',
    ],
  },
  {
    id: 'roe-v-wade',
    topic: 'The Right to Privacy',
    requiredCase: 'Roe v. Wade (1973)',
    nonRequiredCase: 'Griswold v. Connecticut (1965)',
    scenario:
      'Connecticut banned contraceptives. In Griswold, the Court struck it down and recognized privacy zones derived from Bill of Rights protections.',
    tasks: [
      'Identify the constitutional amendment or implied right common to Roe v. Wade and Griswold v. Connecticut.',
      'Explain how Griswold established precedent used in Roe.',
      'Explain how Griswold reflects the democratic ideal of natural rights.',
    ],
    caseFacts:
      'A Texas woman challenged a law banning abortion; the Court ruled that the "Right to Privacy" protects a woman\'s right to choose an abortion.',
    constitutionalClause: '14th Amendment (Due Process) and the Right to Privacy',
    comparisonPoints:
      'Griswold was the first case to find a "Right to Privacy" in the Bill of Rights (regarding birth control). Roe then expanded that same "Right to Privacy" to cover a woman\'s decision to have an abortion.',
    rubricChecklist: [
      'Identified Right to Privacy / 14th Amendment',
      'Described Roe abortion facts',
      'Linked the "Penumbras of Privacy" to both cases',
      'Explained protection from state intrusion into personal life',
    ],
  },
];
