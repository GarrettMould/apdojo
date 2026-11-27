import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, ChevronRight, Lightbulb } from 'lucide-react';
import { GUIDE_COURSE_LABELS, TEACHING_GUIDES, findGuide, guideHref, type GuideBlock } from '@/data/teachingGuides';
import { GuideText } from '@/components/guides/GuideText';
import { GuideDiagram } from '@/components/guides/GuideDiagram';
import { GuideQuiz } from '@/components/guides/GuideQuiz';
import { PayoffMatrix } from '@/components/guides/PayoffMatrix';
import { getSubjectSlug, getUnitSlug, type PracticeMcqSubject } from '@/lib/practiceSlugs';
import { FEATURES } from '@/lib/featureFlags';
import headshot from '../../../../../public/images/Headshot.jpg';

type Params = { course: string; slug: string };

const PRACTICE_SUBJECT: Record<string, PracticeMcqSubject> = { 'ap-microeconomics': 'micro', 'ap-macroeconomics': 'macro' };

export function generateStaticParams(): Params[] {
  return TEACHING_GUIDES.map((g) => ({ course: g.course, slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { course, slug } = await params;
  const guide = findGuide(course, slug);
  if (!guide) return {};
  const title = `${guide.lessonName} Explained (AP ${guide.course === 'ap-microeconomics' ? 'Micro' : 'Macro'} ${guide.lesson})`;
  const url = `https://apdojo.com${guideHref(guide)}`;
  return {
    title,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: { title, description: guide.metaDescription, url, type: 'article' },
  };
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-[16.5px] leading-[1.75] text-slate-700">
          <GuideText text={block.text} />
        </p>
      );
    case 'quote':
      return (
        <figure className="flex gap-3.5 rounded-2xl bg-blue-50/60 p-4 sm:p-5">
          <Image src={headshot} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-full object-cover object-[50%_0%]" />
          <div className="flex min-w-0 flex-col gap-1.5">
            <blockquote className="text-[16.5px] leading-[1.7] text-slate-800">“{block.text}”</blockquote>
            <figcaption className="text-xs font-semibold text-blue-700">How Garrett explains it</figcaption>
          </div>
        </figure>
      );
    case 'table':
      return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="border-b border-slate-200 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-slate-100 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 align-top text-slate-700">
                      <GuideText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'figures':
      return (
        <div className="flex flex-col gap-2">
          {block.label ? <p className="text-sm font-semibold text-slate-600">{block.label}</p> : null}
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
            {block.items.map((item) => (
              <li key={item.value + item.label} className="flex flex-col gap-0.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3">
                <span
                  className={`text-2xl font-black tabular-nums tracking-tight ${
                    item.tone === 'down' ? 'text-red-600' : item.tone === 'up' ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {item.value}
                </span>
                <span className="text-[13px] leading-snug text-slate-500">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'callout':
      return (
        <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-slate-900">{block.title}</p>
            <p className="text-[15.5px] leading-relaxed text-slate-700">
              <GuideText text={block.text} />
            </p>
          </div>
        </div>
      );
    case 'diagram':
      return <GuideDiagram id={block.id} />;
    case 'matrix':
      return <PayoffMatrix block={block} />;
  }
}

/** An "Explained by Garrett" lesson guide: one lesson, taught the way it's taught in real sessions. */
export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { course, slug } = await params;
  const guide = findGuide(course, slug);
  if (!guide) notFound();

  const courseLabel = GUIDE_COURSE_LABELS[guide.course];
  const subject = PRACTICE_SUBJECT[guide.course];
  const practiceHref = subject ? `/mcq-practice/${getSubjectSlug(subject)}/${getUnitSlug(guide.unit, subject)}` : null;
  const updated = new Date(guide.updated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-24 pt-8 text-slate-900 sm:pt-12">
      <article className="mx-auto flex max-w-[720px] flex-col gap-10">
        <header className="flex flex-col gap-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
            <Link href="/guides" className="hover:text-slate-900">Guides</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span>{courseLabel}</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span>Unit {guide.unit}</span>
          </nav>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
              {courseLabel} · Lesson {guide.lesson} · {guide.lessonName}
            </p>
            <h1 className="text-[34px] font-black leading-[1.12] tracking-tight sm:text-[44px]">{guide.title}</h1>
            <p className="text-lg leading-relaxed text-slate-600">{guide.intro}</p>
          </div>
          <div className="flex items-center gap-3 border-y border-slate-200 py-3.5">
            <Image src={headshot} alt="Garrett M." width={44} height={44} className="h-11 w-11 rounded-full object-cover object-[50%_0%]" />
            <div className="min-w-0 text-sm leading-snug">
              <p className="font-bold text-slate-900">Explained by Garrett M.</p>
              <p className="text-slate-500">AP Economics teacher · updated {updated}</p>
            </div>
          </div>
        </header>

        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="flex scroll-mt-24 flex-col gap-4">
            <h2 id={`${section.id}-h`} className="text-2xl font-bold tracking-tight">{section.title}</h2>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}

        <section aria-labelledby="mistakes-h" className="flex flex-col gap-4">
          <div>
            <h2 id="mistakes-h" className="text-2xl font-bold tracking-tight">Common mistakes</h2>
            <p className="mt-1 text-slate-500">Students trip on these all the time. If you’ve thought any of them, you’re in good company.</p>
          </div>
          <ul className="flex flex-col gap-3">
            {guide.mistakes.map((m) => (
              <li key={m.said} className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <p className="font-semibold text-red-700">
                  <GuideText text={m.said} />
                </p>
                <p className="text-[15.5px] leading-relaxed text-slate-700">
                  <GuideText text={m.fix} />
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="quiz-h" className="flex flex-col gap-4">
          <div>
            <h2 id="quiz-h" className="text-2xl font-bold tracking-tight">Check yourself</h2>
            <p className="mt-1 text-slate-500">{guide.questions.length} questions in the style of the AP exam. Pick an answer to see why.</p>
          </div>
          <GuideQuiz questions={guide.questions} />
        </section>

        <section className="flex flex-col gap-3">
          {practiceHref ? (
            <Link
              href={practiceHref}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-blue-600 p-5 text-white transition hover:bg-blue-700"
            >
              <span>
                <span className="block text-lg font-bold">Keep practicing Unit {guide.unit}</span>
                <span className="block text-sm text-blue-100">More AP-style questions on this unit, with explanations.</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ) : null}
          {FEATURES.tutoring ? (
            <Link
              href="/tutoring#book"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200"
            >
              <CalendarDays className="h-6 w-6 shrink-0 text-blue-600" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-slate-900">Want it explained like this, 1-on-1?</span>
                <span className="block text-sm text-slate-500">Book a session with Garrett over Google Meet.</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ) : null}
        </section>
      </article>
    </div>
  );
}
