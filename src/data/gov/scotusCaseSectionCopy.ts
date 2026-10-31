export type ScotusCaseSectionCopy = {
  briefAfter: string;
  whyIntro: string;
  whyAfter: string;
  comparisonAfter: string;
};

export const SCOTUS_CASE_SECTION_COPY: Record<string, ScotusCaseSectionCopy> = {
  'marbury-v-madison': {
    briefAfter:
      'On a comparison FRQ, this is the whole required-case answer: Marbury wanted his commission, Article III did not let Congress add original jurisdiction, and the Court used that conflict to create judicial review. He never got the job from the Court. Do not write only “judicial review” and stop.',
    whyIntro:
      'Marbury is the case that gives the Court its main check on Congress and the president. Later required cases use this power; they do not invent it again.',
    whyAfter:
      'If a prompt asks why a later Court can strike a statute, start here. Marbury is the source of the power. Lopez, Shaw, and Brown are later uses of it.',
    comparisonAfter:
      'Cooper v. Aaron is the practice pair: states claimed they did not have to follow Brown. Use Marbury for the power to interpret the Constitution, then explain that Cooper made states follow that reading.',
  },
  'mcculloch-v-maryland': {
    briefAfter:
      'Write both holdings. Congress may charter a bank as an implied power, and Maryland may not tax it. Students who mention only the bank, or only the tax, leave half the case on the table.',
    whyIntro:
      'McCulloch is the expansion case in the federalism pair. Necessary and Proper plus supremacy is how national power grows beyond the words in Article I.',
    whyAfter:
      '“Necessary” here means appropriate, not indispensable. Pair this with Lopez when a prompt asks whether federal power got bigger or hit a wall.',
    comparisonAfter:
      'Arizona v. United States is the practice pair. McCulloch blocked a state from taxing a federal bank. Arizona blocked a state from writing its own immigration penalties. The shared idea is supremacy: a valid national policy wins.',
  },
  'schenck-v-united-states': {
    briefAfter:
      'Name the leaflets, the wartime draft, and clear and present danger. The crowded-theater line is only an illustration. The holding is that this speech could be punished, not that all antiwar protest is banned.',
    whyIntro:
      'Schenck is the required case that limits speech. Use it when the new scenario is dangerous advocacy, not a school protest or a newspaper story.',
    whyAfter:
      'Tinker protects student antiwar armbands unless they disrupt class. Same amendment, opposite permission to punish. If the stem is a school, do not reach for Schenck first.',
    comparisonAfter:
      'Brandenburg v. Ohio is the practice pair. Schenck allowed punishment for a general wartime danger. Brandenburg later required imminent lawless action. Show how the speech test got narrower, not how both cases “limit speech.”',
  },
  'brown-v-board-of-education': {
    briefAfter:
      'The harm is the separation itself, even if the buildings look similar. Brown is unanimous, it is about public schools, and it rejects Plessy’s “separate but equal” for education.',
    whyIntro:
      'Brown is the required equal-protection case for government sorting students by race in public schools. It is not the case for every race fact pattern on the exam.',
    whyAfter:
      'Shaw is the other required equal-protection race case, and it is about drawing district lines. Match the setting: classroom versus map.',
    comparisonAfter:
      'Sweatt v. Painter is the practice pair. Sweatt said a separate law school was unequal because of prestige and opportunity. Brown takes that logic into K–12 and says separate public schools are inherently unequal.',
  },
  'baker-v-carr': {
    briefAfter:
      'Baker answers whether a court may hear the case, not the final population formula. Tennessee’s map was stale and unequal. The Court said that is justiciable under equal protection.',
    whyIntro:
      'Before Baker, malapportionment was often dismissed as a political question. This case opens the courthouse door. “One person, one vote” comes in later cases that build on it.',
    whyAfter:
      'Shaw is also redistricting, but it is about race as the main reason for the lines, not unequal headcounts. If the stem is “can a judge even hear this,” pick Baker.',
    comparisonAfter:
      'Reynolds v. Sims is the practice pair. Baker lets courts hear the claim. Reynolds uses that opening to require roughly equal district populations. Write Baker as access, Reynolds as the later rule.',
  },
  'engel-v-vitale': {
    briefAfter:
      'The prayer was short, nondenominational, and optional. It still failed. Engel is Establishment Clause: the state wrote and promoted a religious exercise in a public school.',
    whyIntro:
      'Engel stops the government from leading religion in school. It is not a Free Exercise case, and remaining silent does not save the policy.',
    whyAfter:
      'Yoder is the other school-and-religion required case, and it runs the other way: the state may not force Amish families to drop a sincere practice. Name the clause before you name the case.',
    comparisonAfter:
      'Lee v. Weisman is the practice pair. Engel struck a daily classroom prayer. Lee struck clergy-led prayer at a public graduation because students still felt pressure to take part. Both are government-sponsored religion in school.',
  },
  'gideon-v-wainwright': {
    briefAfter:
      'Florida would appoint a lawyer only in capital cases. Gideon was a felony defendant who could not pay. The Court incorporated the Sixth Amendment right to counsel and ordered a new trial with an attorney.',
    whyIntro:
      'Gideon is both a fair-trial case and an incorporation case. The right now binds the states, not just federal courts, in serious criminal prosecutions.',
    whyAfter:
      'It is not Miranda, and it is not a free lawyer for civil suits. McDonald is the other required incorporation case; pick Gideon when the missing right is counsel.',
    comparisonAfter:
      'Betts v. Brady is the practice pair, and it is the older rule Gideon discarded. Betts said states did not always have to appoint counsel. Gideon says a poor felony defendant must get a lawyer.',
  },
  'tinker-v-des-moines': {
    briefAfter:
      'The armbands were a Vietnam protest, they were silent, and the school had no evidence of real disruption. That is why they were protected symbolic speech. Fear of controversy is not enough.',
    whyIntro:
      'Tinker is the student-speech case. Schools may still stop expression that materially and substantially disrupts class, but they have to show that disruption, not just dislike the message.',
    whyAfter:
      'Schenck is the other required antiwar-speech case, and it goes the other way: wartime leaflets could be punished as a clear and present danger. If the facts are a school, start with Tinker.',
    comparisonAfter:
      'Morse v. Frederick is the practice pair. Tinker protects a political protest that did not disrupt school. Morse lets a school restrict a banner that promoted illegal drug use. Same amendment; different school interest.',
  },
  'new-york-times-v-united-states': {
    briefAfter:
      'The government wanted the presses stopped before the Pentagon Papers ran. That is prior restraint. The Court said the showing of harm was not enough. It did not say classified material may always be printed.',
    whyIntro:
      'This is the required press case. The rule is a heavy presumption against censorship in advance, even when the executive cites national security.',
    whyAfter:
      'Schenck punished speech after it went out. New York Times refused a request to block speech that had not yet been published. War and secrecy show up in both; the timing of the restriction is the difference.',
    comparisonAfter:
      'Near v. Minnesota is the practice pair. Near blocked a state from gagging a newspaper. New York Times applied the same prior-restraint rule to a federal attempt to hide Vietnam documents. Name the press clause, then the heavy burden.',
  },
  'wisconsin-v-yoder': {
    briefAfter:
      'The families sent children through eighth grade and refused high school. The Court found a sincere Free Exercise burden and held that two more years of compulsory school did not outweigh it.',
    whyIntro:
      'Yoder is not a general hall pass to skip school rules. It is a Free Exercise holding about this religious community’s way of life.',
    whyAfter:
      'Engel is the mix-up. Engel stops the state from sponsoring prayer. Yoder stops the state from forcing a religious practice to give way. School plus religion is not enough to pick the case; the clause is.',
    comparisonAfter:
      'Church of the Lukumi Babalu Aye is the practice pair. Both protect a minority faith from a law that heavily burdened religious practice. Lukumi adds a targeting problem: the city banned ritual sacrifice while allowing other killing.',
  },
  'shaw-v-reno': {
    briefAfter:
      'On the exam, these three cards are the required-case paragraph: bizarre North Carolina lines drawn mainly to group voters by race, Equal Protection, and strict scrutiny. Shaw did not ban majority-minority districts. It said race as the predominant factor has to be justified.',
    whyIntro:
      'Shaw is how the Court treats a map that sorts people by race. The shape was so irregular that race was the obvious explanation, even if the state said it was trying to help minority representation.',
    whyAfter:
      'Do not confuse this with Baker. Baker is unequal population and whether courts may hear the case. Shaw assumes the courts can hear it and asks whether race drove the lines. Unequal headcounts and racial gerrymandering are different defects.',
    comparisonAfter:
      'Miller v. Johnson is the practice pair. It applies the same predominant-factor rule to another oddly drawn district. Name Equal Protection, state Shaw’s holding, then explain that both cases put race-based line-drawing under strict scrutiny.',
  },
  'united-states-v-lopez': {
    briefAfter:
      'A student brought a gun to school, Congress used the Commerce Clause, and the Court said that was not economic activity with a real tie to interstate commerce. States can still ban guns at school. This limits Congress.',
    whyIntro:
      'Lopez is the required limit on national power. After decades of broad commerce rulings, the Court said some local, noneconomic conduct stays with the states.',
    whyAfter:
      'McCulloch is the other federalism required case, and it points the other way: implied powers plus supremacy. Use McCulloch when the federal means is tied to an enumerated power. Use Lopez when the federal law has no commercial connection.',
    comparisonAfter:
      'United States v. Morrison is the practice pair. Lopez struck a federal school-zone gun law. Morrison struck a federal civil remedy for gender-motivated violence. Both say noneconomic local conduct is not interstate commerce.',
  },
  'mcdonald-v-chicago': {
    briefAfter:
      'Chicago banned handguns, including in the home. The Court had already recognized an individual Second Amendment right against the federal government. McDonald carries that right to states and cities through Fourteenth Amendment due process.',
    whyIntro:
      'McDonald is the incorporation case for the right to keep a handgun at home for self-defense. It does not wipe out every gun regulation.',
    whyAfter:
      'Gideon is the other required incorporation case. Both use the Fourteenth Amendment to apply a Bill of Rights protection to the states. Pick McDonald when the right is arms, Gideon when it is counsel.',
    comparisonAfter:
      'District of Columbia v. Heller is the practice pair. Heller established the individual right at the federal level. McDonald is the follow-on that binds Chicago and other local governments. Write incorporation, not “the Court invented gun rights in 2010.”',
  },
  'citizens-united-v-fec': {
    briefAfter:
      'The film was independent spending close to an election, not a check written to a campaign. The Court held that corporations and unions may spend their own money on election speech when they are not coordinating with a candidate.',
    whyIntro:
      'Citizens United is about who may pay for political speech. Direct contribution limits are a different question and were not erased here.',
    whyAfter:
      'Schenck and Tinker ask whether a particular message can be punished. This case asks whether the speaker’s corporate identity lets the government ban independent expenditures. Use it when the stem is campaign ads and Super PAC-style spending.',
    comparisonAfter:
      'Buckley v. Valeo is the practice pair. Buckley treated spending as speech and protected independent expenditures by individuals. Citizens United extends that idea to corporations and unions. Keep independent spending separate from donations to candidates.',
  },
};

export function getScotusCaseSectionCopy(caseId: string): ScotusCaseSectionCopy | undefined {
  return SCOTUS_CASE_SECTION_COPY[caseId];
}
