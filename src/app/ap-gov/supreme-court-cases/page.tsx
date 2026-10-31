import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScotusHubHeroAside } from '@/components/ScotusHubHeroAside';
import { govCurriculumOutline } from '@/data/courseCurriculumOutline';
import { getScotusCaseMcqs } from '@/data/gov/scotusCaseMcqs';
import { scotusEssayPrompts } from '@/data/gov/scotusEssayPrompts';
import {
  AP_GOV_REQUIRED_SCOTUS_CASES,
  getScotusCaseRecord,
  getScotusRequiredCase,
  scotusCaseLandingPath,
  SCOTUS_CASE_LANDING_HUB,
} from '@/data/gov/scotusRequiredCases';

const HERO_CASE_ID = 'tinker-v-des-moines';
const HERO_BACK_CASE_ID = 'brown-v-board-of-education';

const title = 'The 14 Required Supreme Court Cases for AP Gov';
const description =
  'Every required AP U.S. Government Supreme Court case, with the facts, constitutional question, holding, video walkthrough, and comparison FRQ practice.';
const url = `https://apdojo.com${SCOTUS_CASE_LANDING_HUB}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: url },
};

function unitTitle(unit: number): string {
  return govCurriculumOutline.units.find((item) => item.unitNumber === unit)?.unitName ?? `Unit ${unit}`;
}

const UNITS = [1, 2, 3, 4, 5];

export default function SupremeCourtCasesPage() {
  const heroCase = getScotusRequiredCase(HERO_CASE_ID);
  const heroRecord = heroCase ? getScotusCaseRecord(heroCase) : undefined;
  const heroBackCase = getScotusRequiredCase(HERO_BACK_CASE_ID);
  const heroBackRecord = heroBackCase ? getScotusCaseRecord(heroBackCase) : undefined;
  const heroQuestion = getScotusCaseMcqs(HERO_CASE_ID)[1] ?? getScotusCaseMcqs(HERO_CASE_ID)[0];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-violet-100 bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-start">
            <div>
              <span className="rounded-full bg-violet-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                AP U.S. Government
              </span>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                The 14 required Supreme Court cases
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-relaxed text-gray-700">
                Every case the exam expects you to know cold. Each page gives you the facts, the constitutional question,
                the holding, a video walkthrough, and a comparison FRQ to practice with.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#unit-1"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-violet-800"
                >
                  Browse the cases
                </a>
                <Link
                  href="/scotus-essay-practice"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-base font-bold text-gray-800 hover:border-gray-400"
                >
                  Try a random comparison FRQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {heroRecord?.videoUrl && heroQuestion ? (
              <ScotusHubHeroAside
                caseName={heroRecord.caseName}
                videoUrl={heroRecord.videoUrl}
                posterTimeSeconds={heroRecord.videoPosterTimeSeconds}
                backVideo={
                  heroBackRecord?.videoUrl
                    ? {
                        url: heroBackRecord.videoUrl,
                        posterTimeSeconds: heroBackRecord.videoPosterTimeSeconds,
                      }
                    : undefined
                }
                question={heroQuestion}
              />
            ) : null}
          </div>
          <nav aria-label="Jump to unit" className="mt-10 flex flex-wrap gap-2">
            {UNITS.map((unit) => {
              const count = AP_GOV_REQUIRED_SCOTUS_CASES.filter((item) => item.unit === unit).length;
              return (
                <a
                  key={unit}
                  href={`#unit-${unit}`}
                  className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50"
                >
                  Unit {unit} · {count} {count === 1 ? 'case' : 'cases'}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {UNITS.map((unit, unitIndex) => {
        const cases = AP_GOV_REQUIRED_SCOTUS_CASES.filter((item) => item.unit === unit);
        if (cases.length === 0) return null;
        return (
          <section
            key={unit}
            id={`unit-${unit}`}
            className={`scroll-mt-28 ${unitIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${
              unitIndex > 0 ? 'border-t border-slate-200' : ''
            }`}
          >
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-700">Unit {unit}</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">{unitTitle(unit)}</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cases.map((requiredCase) => {
                  const record = getScotusCaseRecord(requiredCase);
                  const prompt = scotusEssayPrompts.find((item) => item.id === requiredCase.id);
                  return (
                    <li key={requiredCase.id}>
                      <Link
                        href={scotusCaseLandingPath(requiredCase.id)}
                        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-900/5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-black tabular-nums text-violet-700">{requiredCase.year}</span>
                          {prompt ? (
                            <span className="truncate rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                              {prompt.topic}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-950 group-hover:text-violet-800">
                          {record?.caseName ?? requiredCase.caseName}
                        </h3>
                        {record ? (
                          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-gray-600">{record.summary}</p>
                        ) : (
                          <span className="flex-1" />
                        )}
                        {prompt ? (
                          <p className="mt-4 text-xs font-semibold text-gray-500">{prompt.constitutionalClause}</p>
                        ) : null}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-violet-700">
                          Read the case
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
