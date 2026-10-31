import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { ScotusCaseMcqCheck } from '@/components/ScotusCaseMcqCheck';
import { ScotusCaseVideo } from '@/components/ScotusCaseVideo';
import { govCurriculumOutline } from '@/data/courseCurriculumOutline';
import { getScotusCaseFaqs } from '@/data/gov/scotusCaseFaqs';
import { getScotusCaseMcqs } from '@/data/gov/scotusCaseMcqs';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import {
  AP_GOV_REQUIRED_SCOTUS_CASES,
  formatScotusCaseTitle,
  getScotusCaseRecord,
  getScotusRequiredCase,
  isScotusPracticeLive,
  scotusCaseLandingPath,
  scotusPracticeCasePath,
  SCOTUS_CASE_LANDING_HUB,
} from '@/data/gov/scotusRequiredCases';

type PageProps = {
  params: Promise<{ case: string }>;
};

export function generateStaticParams() {
  return AP_GOV_REQUIRED_SCOTUS_CASES.map((requiredCase) => ({ case: requiredCase.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { case: caseId } = await params;
  const requiredCase = getScotusRequiredCase(caseId);
  const record = requiredCase ? getScotusCaseRecord(requiredCase) : undefined;
  if (!requiredCase || !record) {
    return { title: 'Supreme Court Case | AP Gov' };
  }
  const title = `${record.caseName} (${requiredCase.year})`;
  const url = `https://apdojo.com${scotusCaseLandingPath(requiredCase.id)}`;
  return {
    title: `${title} | AP Gov Required Case`,
    description: record.summary,
    openGraph: { title, description: record.summary, url },
    twitter: { card: 'summary_large_image', title, description: record.summary },
    alternates: { canonical: url },
  };
}

function unitTitle(unit: number): string {
  return govCurriculumOutline.units.find((item) => item.unitNumber === unit)?.unitName ?? `Unit ${unit}`;
}

const BRIEF_STEPS = [
  { key: 'facts', label: 'The facts' },
  { key: 'question', label: 'The constitutional question' },
  { key: 'holding', label: 'The holding' },
] as const;

const BAND_INNER = 'mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16';

export default async function SupremeCourtCasePage({ params }: PageProps) {
  const { case: caseId } = await params;
  const requiredCase = getScotusRequiredCase(caseId);
  const record = requiredCase ? getScotusCaseRecord(requiredCase) : undefined;
  if (!requiredCase || !record) notFound();

  const officialTitle = formatScotusCaseTitle(requiredCase);
  const showOfficialTitle = officialTitle.replace(/\s*\(\d{4}\)$/, '') !== record.caseName;
  const faqs = getScotusCaseFaqs(requiredCase.id);
  const checkQuestions = getScotusCaseMcqs(requiredCase.id);
  const comparisonPrompt = scotusEssayPrompts.find((item) => item.id === requiredCase.id);
  const index = AP_GOV_REQUIRED_SCOTUS_CASES.findIndex((item) => item.id === requiredCase.id);
  const previous = index > 0 ? AP_GOV_REQUIRED_SCOTUS_CASES[index - 1] : undefined;
  const next = index < AP_GOV_REQUIRED_SCOTUS_CASES.length - 1 ? AP_GOV_REQUIRED_SCOTUS_CASES[index + 1] : undefined;
  const others = AP_GOV_REQUIRED_SCOTUS_CASES.filter((item) => item.id !== requiredCase.id);

  const briefText: Record<(typeof BRIEF_STEPS)[number]['key'], string> = {
    facts: record.facts,
    question: record.constitutionalQuestion,
    holding: record.holding,
  };

  const glance = [
    { label: 'Decided', value: String(requiredCase.year) },
    { label: 'Clause at issue', value: comparisonPrompt?.constitutionalClause ?? '—' },
    { label: 'Course unit', value: `Unit ${requiredCase.unit}` },
    { label: 'Case number', value: `${index + 1} of ${AP_GOV_REQUIRED_SCOTUS_CASES.length}` },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const videoSrc = record.videoUrl
    ? `${record.videoUrl}#t=${record.videoPosterTimeSeconds ?? 1}`
    : undefined;

  let bandIndex = 0;
  const nextBandClass = () => (bandIndex++ % 2 === 0 ? 'bg-white' : 'bg-slate-50');

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-gray-500">
            <Link href={SCOTUS_CASE_LANDING_HUB} className="inline-flex items-center gap-1.5 text-violet-700 hover:text-violet-900">
              <ArrowLeft className="h-4 w-4" />
              All required cases
            </Link>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-violet-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Required case
                </span>
                {comparisonPrompt ? (
                  <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-800">
                    {comparisonPrompt.topic}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                {record.caseName}
              </h1>
              <p className="mt-3 text-lg font-semibold text-violet-700">
                {requiredCase.year}
                <span className="mx-2 text-violet-300">·</span>
                Unit {requiredCase.unit}: {unitTitle(requiredCase.unit)}
              </p>
              {showOfficialTitle ? (
                <p className="mt-1 text-sm text-gray-500">Full name: {officialTitle}</p>
              ) : null}
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-gray-700">{record.summary}</p>
              {isScotusPracticeLive(requiredCase.id) ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={scotusPracticeCasePath(requiredCase.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-violet-800"
                  >
                    Practice the comparison FRQ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#case-brief"
                    className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-base font-bold text-gray-800 hover:border-gray-400"
                  >
                    Read the brief
                  </a>
                </div>
              ) : null}
            </div>

            {videoSrc ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl shadow-violet-900/10">
                <ScotusCaseVideo
                  caseRecordId={record.id}
                  caseName={record.caseName}
                  videoUrl={videoSrc}
                  posterTimeSeconds={record.videoPosterTimeSeconds}
                />
              </div>
            ) : null}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 lg:grid-cols-4">
            {glance.map((item) => (
              <div key={item.label} className="bg-white px-5 py-4">
                <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">{item.label}</dt>
                <dd className="mt-1 text-base font-bold text-gray-950">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section id="case-brief" className={`scroll-mt-28 ${nextBandClass()}`}>
        <div className={BAND_INNER}>
          <h2 className="text-3xl font-black tracking-tight text-gray-950">Case brief</h2>
          <p className="mt-2 text-base text-gray-600">The three pieces every AP answer about this case should get right.</p>
          <ol className="mt-8 grid gap-5 lg:grid-cols-3">
            {BRIEF_STEPS.map((step, stepIndex) => {
              const isHolding = step.key === 'holding';
              return (
                <li
                  key={step.key}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    isHolding ? 'border-violet-300 bg-violet-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                      isHolding ? 'bg-violet-700 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {stepIndex + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gray-950">{step.label}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">{briefText[step.key]}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={nextBandClass()}>
        <div className={`${BAND_INNER} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]`}>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-950">Why it matters</h2>
            <ul className="mt-6 space-y-4">
              {record.reasoning.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-lg leading-relaxed text-gray-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {comparisonPrompt ? (
            <aside className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Comparison anchor</p>
              <p className="mt-3 text-base leading-relaxed text-gray-800">{comparisonPrompt.comparisonPoints}</p>
            </aside>
          ) : null}
        </div>
      </section>

      {checkQuestions.length > 0 ? (
        <div className={nextBandClass()}>
          <div className={BAND_INNER}>
            <ScotusCaseMcqCheck key={requiredCase.id} caseName={record.caseName} questions={checkQuestions} />
          </div>
        </div>
      ) : null}

      {isScotusPracticeLive(requiredCase.id) ? (
        <section className={nextBandClass()}>
          <div className={`${BAND_INNER} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center`}>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-700">SCOTUS comparison FRQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Can you connect {record.caseName} to a case you’ve never seen?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-700">
                The exam hands you an unfamiliar case and asks how it relates to a required one. Practice that here: name
                the shared principle, state the holding, and explain the connection.
              </p>
              <Link
                href={scotusPracticeCasePath(requiredCase.id)}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-6 py-3.5 text-base font-bold text-white hover:bg-violet-800"
              >
                Start the comparison
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {comparisonPrompt ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">You’ll compare it with</p>
                <p className="mt-2 text-2xl font-black text-gray-950">{comparisonPrompt.nonRequiredCase}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">Three parts</p>
                <ol className="mt-2 space-y-1.5 text-sm text-gray-700">
                  <li>A. Identify the shared principle</li>
                  <li>B. Describe the required case</li>
                  <li>C. Explain the connection</li>
                </ol>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {faqs.length > 0 ? (
        <section className={nextBandClass()}>
          <div className={BAND_INNER}>
            <h2 className="text-3xl font-black tracking-tight text-gray-950">Frequently asked questions</h2>
            <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              {faqs.map((faq, faqIndex) => (
                <details key={faq.question} className="group" open={faqIndex === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold text-gray-950 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-6 pb-6 text-base leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          </div>
        </section>
      ) : null}

      <section className={nextBandClass()}>
        <div className={BAND_INNER}>
          <nav aria-label="Previous and next case" className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={scotusCaseLandingPath(previous.id)}
                className="group rounded-2xl border border-gray-200 bg-white p-5 hover:border-violet-300 hover:bg-violet-50"
              >
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <ArrowLeft className="h-4 w-4" />
                  Earlier case
                </span>
                <span className="mt-1 block text-lg font-bold text-gray-950 group-hover:text-violet-800">
                  {getScotusCaseRecord(previous)?.caseName ?? previous.caseName}
                </span>
                <span className="text-sm text-gray-500">{previous.year}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={scotusCaseLandingPath(next.id)}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-right hover:border-violet-300 hover:bg-violet-50"
              >
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  Later case
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="mt-1 block text-lg font-bold text-gray-950 group-hover:text-violet-800">
                  {getScotusCaseRecord(next)?.caseName ?? next.caseName}
                </span>
                <span className="text-sm text-gray-500">{next.year}</span>
              </Link>
            ) : null}
          </nav>

          <div className="mt-12">
            <h2 className="text-xl font-black tracking-tight text-gray-950">The other required cases</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={scotusCaseLandingPath(item.id)}
                    className="inline-flex items-baseline gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                  >
                    {getScotusCaseRecord(item)?.caseName ?? item.caseName}
                    <span className="tabular-nums text-xs text-gray-400">{item.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
