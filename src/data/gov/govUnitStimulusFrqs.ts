export interface GovStimulusFrq {
  id: string;
  title: string;
  stimulus?: string;
  prompt: string;
  tasks: string[];
  cedLink?: string;
}

/**
 * Stimulus FRQs shown as a compact companion block under Gov unit MCQ tests.
 * Keep this list short and high-signal (teacher beta content).
 */
export const govUnitStimulusFrqByUnit: Record<number, GovStimulusFrq[]> = {
  1: [
    {
      id: 'u1-frq-1-stafford-act',
      title: 'FRQ 1: Concept Application (Federal Response to Natural Disasters)',
      stimulus:
        'In 1988, Congress passed the Stafford Act, which allows the federal government to provide financial assistance to state and local governments during natural disasters. In the wake of a major hurricane, a state governor requests federal aid. The President, acting through FEMA, approves the request but attaches specific conditions to the funding, requiring the state to implement new building codes that exceed current state laws. The state government argues that while they need the money, the federal government is overstepping its authority by dictating local construction standards.',
      prompt:
        'Respond to the following prompts using constitutional reasoning and federalism concepts.',
      tasks: [
        'Describe the constitutional principle that defines the relationship between the national and state governments illustrated in the scenario.',
        'In the context of the scenario, explain how the use of categorical grants-in-aid could be used by the federal government to influence state policy.',
        "Explain how the Tenth Amendment could be used by the state to challenge the federal government's requirements in the scenario.",
      ],
      cedLink: 'Unit 1 (Foundations of American Democracy) — Federalism',
    },
    {
      id: 'u1-frq-2-quant-grants',
      title: 'FRQ 2: Quantitative Analysis (Unit 1: Foundations of Democracy)',
      stimulus:
        'Fiscal Year | Categorical Grants (Billions $) | Block Grants (Billions $)\n1960 | $7.0 | $0.0\n1980 | $82.5 | $9.2\n2000 | $254.7 | $30.1\n2020 | $640.3 | $51.5',
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
    {
      id: 'u1-frq-3-scotus-comparison',
      title: 'FRQ 3: SCOTUS Comparison (Federalism and the Commerce Clause)',
      stimulus:
        'Non-Required Case Summary: National Federation of Independent Business (NFIB) v. Sebelius (2012). In 2010, Congress passed the Affordable Care Act (ACA). The individual mandate required most Americans to purchase health insurance or pay a penalty. Congress argued it was valid under the Commerce Clause because uninsured decisions affect the national healthcare market. Several states and the NFIB challenged the law, arguing the Commerce Clause regulates existing economic activity, not compelling people into commerce. The Supreme Court held that the mandate was valid under Congress’s Taxing Power, but not under the Commerce Clause.',
      prompt:
        'Compare a required Supreme Court case from the course with the non-required case above.',
      tasks: [
        "Identify the required Supreme Court case that also involved a challenge to the federal government's use of the Commerce Clause to regulate non-economic activity.",
        'Explain how the facts in United States v. Lopez (1995) and NFIB v. Sebelius (2012) led to similar limits on the power of the national government.',
        'Explain how the decision in NFIB v. Sebelius reflects the principle of federalism.',
      ],
      cedLink: 'Unit 1, Topic 1.8 (Constitutional Interpretations of Federalism)',
    },
  ],
};

export function getGovUnitStimulusFrqs(unitNumber: number): GovStimulusFrq[] {
  return govUnitStimulusFrqByUnit[unitNumber] ?? [];
}

