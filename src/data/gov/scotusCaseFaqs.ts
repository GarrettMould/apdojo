export type ScotusCaseFaq = {
  question: string;
  answer: string;
};

/** Original study questions for each required case page. */
export const SCOTUS_CASE_FAQS: Record<string, ScotusCaseFaq[]> = {
  'marbury-v-madison': [
    {
      question: 'Did Marbury get the commission the Court said he was owed?',
      answer:
        'No. The Court agreed that withholding the signed commission was illegal, then refused to order Madison to hand it over. The statute Marbury used to bring the case in the Supreme Court expanded the Court’s original jurisdiction past Article III, so that part of the Judiciary Act of 1789 could not be enforced.',
    },
    {
      question: 'What power does this case create for the exam?',
      answer:
        'Judicial review of a federal law. Marshall treated it as the Court’s job to set aside a statute when it conflicts with the Constitution. Later comparison prompts about a court checking another branch usually start here.',
    },
    {
      question: 'Which part of the Constitution is the conflict about?',
      answer:
        'Article III’s list of original-jurisdiction cases. Congress can shape the Court’s appellate docket. It cannot add brand-new original-jurisdiction cases by statute.',
    },
    {
      question: 'How is Marbury different from a case that only applies an older ruling?',
      answer:
        'Marbury is the source of the power, not a later use of it. When a prompt asks why a state has to follow a Supreme Court reading of the Constitution, the authority being applied traces back to this holding.',
    },
  ],
  'mcculloch-v-maryland': [
    {
      question: 'What two holdings do I need from McCulloch?',
      answer:
        'Congress could charter a national bank, and Maryland could not tax it. The bank is an implied power. The tax fails because a state cannot undermine a valid federal institution.',
    },
    {
      question: 'Does “necessary” in the Necessary and Proper Clause mean indispensable?',
      answer:
        'No. That was Maryland’s argument, and the Court rejected it. A law is “necessary” here when it is an appropriate way to carry out an enumerated power such as borrowing or taxing, even if the Constitution never says “bank.”',
    },
    {
      question: 'Which clause blocks the state tax?',
      answer:
        'The Supremacy Clause. Once the bank is a legitimate federal operation, a state tax that could destroy it loses. Students who only mention implied powers miss half of the case.',
    },
    {
      question: 'How should I contrast McCulloch with United States v. Lopez?',
      answer:
        'McCulloch is the expansion case: implied powers plus supremacy. Lopez is the limit case: the Commerce Clause does not cover a gun brought to a local school. Use McCulloch when the new scenario is a federal means tied to an enumerated power. Use Lopez when the federal law has no real commercial connection.',
    },
  ],
  'schenck-v-united-states': [
    {
      question: 'What speech did the Court allow the government to punish?',
      answer:
        'Leaflets urging men to resist the World War I draft. Schenck was convicted under the Espionage Act, and the Court upheld the conviction. Political criticism is not automatically protected when the government can show a serious, immediate danger.',
    },
    {
      question: 'What standard comes from the opinion?',
      answer:
        'Clear and present danger. The crowded-theater line is only an illustration of that idea. The test itself is whether the speech creates a real danger the government may prevent, which the Court found in wartime draft resistance.',
    },
    {
      question: 'Does Schenck ban antiwar protest in general?',
      answer:
        'No. The holding is tied to the draft and to wartime. A later required case, Tinker, protects student antiwar armbands unless the school can show a substantial disruption. Same amendment, much narrower permission to punish.',
    },
    {
      question: 'What do I write on a comparison FRQ?',
      answer:
        'Schenck is required. Give the leaflet facts, the First Amendment, and the holding that speech creating a clear and present danger may be punished. It is the required case that limits speech, so it fits a new scenario about dangerous advocacy more than one about a school protest.',
    },
  ],
  'brown-v-board-of-education': [
    {
      question: 'What rule did Brown reject for public schools?',
      answer:
        'State-required racial segregation. The Court held that separate public schools violate the Equal Protection Clause even when the buildings and supplies look similar. The harm is the separation itself.',
    },
    {
      question: 'How does Brown relate to “separate but equal”?',
      answer:
        'Plessy v. Ferguson had allowed separate facilities. Brown said that idea fails in public education because forced separation marks children as inferior. Brown is the required case. Plessy is the older doctrine it discarded for schools.',
    },
    {
      question: 'Was the Court divided?',
      answer:
        'No. The decision was unanimous. On a multiple-choice stem, a unanimous ruling against segregated schools is Brown, not a later split decision about districts or admissions.',
    },
    {
      question: 'Is Brown the case for every equal-protection fact pattern?',
      answer:
        'It is the case for government separating students by race in public schools. Shaw v. Reno is the required equal-protection case about drawing district lines by race. Match the setting before you pick the case.',
    },
  ],
  'baker-v-carr': [
    {
      question: 'What did Baker let federal courts decide?',
      answer:
        'Claims that state legislative districts had become badly unequal. Tennessee had left its map in place for decades while population shifted. The Court said those equal-protection claims are justiciable, not political questions courts must refuse.',
    },
    {
      question: 'Is Baker the same thing as “one person, one vote”?',
      answer:
        'Baker opens that line of cases. It holds that courts may hear the malapportionment claim. The later rule that districts must have roughly equal populations is built on Baker. If the stem is about whether a court can hear the case, choose Baker.',
    },
    {
      question: 'How is Baker different from Shaw v. Reno?',
      answer:
        'Baker is about unequal population and court access. Shaw is about a map drawn mainly to sort voters by race. Both are redistricting cases under equal protection. They answer different questions.',
    },
    {
      question: 'What belongs in a comparison paragraph?',
      answer:
        'Baker is required. State the stale Tennessee districts, the Fourteenth Amendment, and the holding that malapportionment is a question courts can decide.',
    },
  ],
  'engel-v-vitale': [
    {
      question: 'What did New York require, and why did that fail?',
      answer:
        'Public schools opened the day with a short prayer written by state officials. Students could remain silent. The Court still struck the practice down because the state was composing and promoting a religious exercise.',
    },
    {
      question: 'Is this a Free Exercise case?',
      answer:
        'No. Engel is the Establishment Clause. The injury is government sponsorship of religion, not a law that stops someone from practicing their own faith. Mixing Engel up with Wisconsin v. Yoder is a common exam error.',
    },
    {
      question: 'Does making the prayer optional fix it?',
      answer:
        'Not on these facts. Voluntary silence did not erase the official prayer. The constitutional problem was the state’s role in writing and backing it.',
    },
    {
      question: 'How do Engel and Yoder divide the religion clauses?',
      answer:
        'Engel stops the government from leading prayer in a public school. Yoder stops the government from forcing Amish students into high school when that burdened their religious practice. One case limits government religious speech. The other protects a religious community from a mandate.',
    },
  ],
  'gideon-v-wainwright': [
    {
      question: 'What had Florida refused to give Gideon?',
      answer:
        'A lawyer. He was tried for a felony, breaking into a pool hall, and the state would appoint counsel only in capital cases. The Court ordered a new trial with appointed counsel.',
    },
    {
      question: 'Which amendment reaches the states here?',
      answer:
        'The Sixth Amendment right to counsel, applied to the states through the Fourteenth Amendment. Gideon is both a fair-trial case and an incorporation case.',
    },
    {
      question: 'Does every defendant in every kind of case get a free lawyer?',
      answer:
        'The holding students need is narrower: a person who cannot afford a lawyer must receive one in a serious criminal prosecution. It is not a rule about civil suits.',
    },
    {
      question: 'How is Gideon different from McDonald v. Chicago?',
      answer:
        'Both incorporate a Bill of Rights protection against states and cities. Gideon incorporates the right to counsel. McDonald incorporates the right to keep a handgun for self-defense at home. Pick the case that matches the right in the new scenario.',
    },
  ],
  'tinker-v-des-moines': [
    {
      question: 'Why were the armbands treated as speech?',
      answer:
        'The students wore them to protest the Vietnam War, and the school suspended them under a rule aimed at that protest. The Court analyzed the armbands as expression, because the point of wearing them was the message, not the clothing.',
    },
    {
      question: 'When is a school still allowed to stop the expression?',
      answer:
        'When it can show a material and substantial disruption of class or school order. Discomfort, disagreement, or a general fear of controversy does not meet that bar. The Des Moines schools had not shown the armbands would interfere with the school day.',
    },
    {
      question: 'Where does Tinker sit next to Schenck?',
      answer:
        'Schenck let the government punish anti-draft leaflets under a clear-and-present-danger standard. Tinker stopped a school from punishing an antiwar protest without evidence of real disruption. If the new case restricts speech, Schenck is the closer required case. If it protects student expression, Tinker is.',
    },
    {
      question: 'What three pieces does a comparison FRQ expect?',
      answer:
        'Tinker is required. Be able to give the armband protest, the First Amendment free-speech protection, and the holding that student expression stays protected unless it substantially disrupts school.',
    },
  ],
  'new-york-times-v-united-states': [
    {
      question: 'What was the government asking the Court to do?',
      answer:
        'Stop newspapers from publishing the Pentagon Papers before the stories ran. The Nixon administration said the classified Vietnam history would harm national security. The Court refused to block publication.',
    },
    {
      question: 'What is prior restraint in this case?',
      answer:
        'A court order that censors speech in advance, instead of punishing it after it is published. The Court treated that kind of order as presumptively unconstitutional. The government did not prove that immediate, irreparable harm justified stopping the presses.',
    },
    {
      question: 'Does the holding say classified material can always be printed?',
      answer:
        'No. It says the showing in this case was not enough. National security can still matter. The government has a heavy burden when it wants a gag before publication, and it did not carry that burden here.',
    },
    {
      question: 'How is this different from Schenck?',
      answer:
        'Schenck allowed punishment of speech that had already gone out. New York Times refused a request to block speech that had not yet been published. Both involve war and national security. One is about punishment after the fact. The other is about censorship beforehand.',
    },
  ],
  'wisconsin-v-yoder': [
    {
      question: 'What school rule did the Amish families challenge?',
      answer:
        'Wisconsin’s compulsory-attendance law past eighth grade. The parents sent their children through eighth grade and refused high school, arguing that further schooling would undermine their religious community.',
    },
    {
      question: 'Which clause did they win on?',
      answer:
        'The Free Exercise Clause. The Court found a sincere religious burden and held that the state’s interest in two more years of school did not outweigh it.',
    },
    {
      question: 'Can any student cite Yoder to skip a school requirement?',
      answer:
        'No. The holding is about compulsory high school for this religious community, where the Court saw a serious threat to a longstanding way of life. It is not a general exemption from school rules.',
    },
    {
      question: 'Why do students mix Yoder up with Engel?',
      answer:
        'Both involve school and religion, but the clauses run in opposite directions. Engel stops the state from sponsoring prayer. Yoder stops the state from forcing a religious practice to give way to an attendance law. Name the clause before you name the case.',
    },
  ],
  'shaw-v-reno': [
    {
      question: 'What was wrong with the North Carolina district?',
      answer:
        'Its shape was so irregular that race was the obvious reason for the lines. The state had drawn it to concentrate African American voters. The Court said a map explained primarily by race has to face strict scrutiny under the Equal Protection Clause.',
    },
    {
      question: 'Did the Court ban majority-minority districts?',
      answer:
        'No. It remanded the case. A district drawn with race in mind is not automatically void, but the state must justify using race as the predominant factor. Shaw is a scrutiny case, not a flat ban.',
    },
    {
      question: 'How is Shaw different from Baker v. Carr?',
      answer:
        'Baker asks whether courts may hear a claim that districts have unequal populations. Shaw asks whether sorting voters by race violates equal protection. Unequal headcounts and racial line-drawing are different defects.',
    },
    {
      question: 'What should a comparison answer include?',
      answer:
        'Shaw is required. Use the bizarre district, the Equal Protection Clause, and the holding that race-predominant districting gets strict scrutiny.',
    },
  ],
  'united-states-v-lopez': [
    {
      question: 'Which federal law failed in Lopez?',
      answer:
        'The Gun-Free School Zones Act, as applied to a student who brought a gun to school. Congress had relied on the Commerce Clause. The Court said this possession was non-economic local conduct with no sufficient tie to interstate commerce.',
    },
    {
      question: 'Does Lopez stop states from banning guns at school?',
      answer:
        'No. It limits Congress. A state can still regulate guns in schools under its own authority. The problem was a federal criminal statute that reached activity outside interstate commerce.',
    },
    {
      question: 'Why do teachers pair Lopez with McCulloch?',
      answer:
        'They are the two required federalism cases that point different ways. McCulloch upholds implied federal power and blocks a state from taxing the bank. Lopez strikes a federal law for exceeding the Commerce Clause. Expansion versus a limit.',
    },
    {
      question: 'What belongs in the FRQ sentences?',
      answer:
        'Lopez is required. State the school-zone gun charge, the Commerce Clause, and the holding that Congress lacked power because the activity was not economic and was not tied to interstate commerce.',
    },
  ],
  'mcdonald-v-chicago': [
    {
      question: 'What did Chicago ban, and why could residents challenge it?',
      answer:
        'Handgun possession, including in the home. After the Court recognized an individual right against the federal government, Chicago residents argued that a city could not impose a flat ban either.',
    },
    {
      question: 'How does a federal right bind a city?',
      answer:
        'Selective incorporation. The Court held that keeping a handgun for self-defense is fundamental, so the Fourteenth Amendment’s Due Process Clause carries the Second Amendment to states and cities.',
    },
    {
      question: 'Does McDonald erase gun regulations?',
      answer:
        'No. The holding rejects a total ban on handguns kept at home for self-defense by law-abiding people. It does not decide every licensing rule or every limit outside the home.',
    },
    {
      question: 'Which other required case is also an incorporation case?',
      answer:
        'Gideon v. Wainwright, for the right to a lawyer in a serious criminal case. McDonald is the incorporation case for the Second Amendment. Match the right in the stimulus before you choose between them.',
    },
  ],
  'citizens-united-v-fec': [
    {
      question: 'What kind of spending did the Court protect?',
      answer:
        'Independent spending on political speech. Citizens United wanted to distribute a film critical of Hillary Clinton close to an election, and federal law restricted that. The Court held that corporations and unions may spend their own money on election speech when they are not coordinating with a candidate.',
    },
    {
      question: 'Does this case wipe out limits on checks written to a campaign?',
      answer:
        'No. Independent expenditures and direct contributions are different. The holding is about speech the speaker funds on its own. Limits on giving money straight to a candidate are a separate question.',
    },
    {
      question: 'Why did the corporate identity of the speaker matter?',
      answer:
        'The government had restricted the spending because the speaker was a corporation. The Court said political speech stays protected under the First Amendment even when the speaker is a corporation or a union.',
    },
    {
      question: 'How is this unlike the other required speech cases?',
      answer:
        'Schenck and Tinker ask whether a particular message can be punished. Citizens United asks who may pay for election speech. Use it when the new scenario is about independent political spending, not about a school protest or a wartime leaflet.',
    },
  ],
};

export function getScotusCaseFaqs(caseId: string): ScotusCaseFaq[] {
  return SCOTUS_CASE_FAQS[caseId] ?? [];
}
