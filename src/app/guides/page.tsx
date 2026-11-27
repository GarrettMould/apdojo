import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GUIDE_COURSE_LABELS, TEACHING_GUIDES, guideHref } from '@/data/teachingGuides';
import headshot from '../../../public/images/Headshot.jpg';

export const metadata: Metadata = {
  title: 'AP Economics Lesson Guides',
  description: 'The hardest AP Economics lessons explained by an AP teacher, with common mistakes and practice questions.',
  alternates: { canonical: 'https://apdojo.com/guides' },
};

/** Index of "Explained by Garrett" lesson guides, grouped by course. */
export default function GuidesIndexPage() {
  const courses = Object.entries(GUIDE_COURSE_LABELS)
    .map(([course, label]) => ({
      label,
      guides: TEACHING_GUIDES.filter((g) => g.course === course).sort((a, b) => a.lesson.localeCompare(b.lesson, undefined, { numeric: true })),
    }))
    .filter((c) => c.guides.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-24 pt-10 text-slate-900 sm:pt-14">
      <div className="mx-auto flex max-w-[720px] flex-col gap-10">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Lesson guides</p>
          <h1 className="text-[34px] font-black leading-[1.12] tracking-tight sm:text-[44px]">Explained by Garrett</h1>
          <p className="text-lg leading-relaxed text-slate-600">
            The hardest AP Economics lessons, explained by an AP teacher: the examples that click, the mistakes students
            actually make, and questions to check yourself.
          </p>
          <div className="flex items-center gap-3">
            <Image src={headshot} alt="Garrett M." width={40} height={40} className="h-10 w-10 rounded-full object-cover object-[50%_0%]" />
            <p className="text-sm text-slate-500">
              <span className="font-bold text-slate-900">Garrett M.</span> · AP Economics teacher for 8+ years
            </p>
          </div>
        </header>
        {courses.map((c) => (
          <section key={c.label} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight">{c.label}</h2>
            <ul className="flex flex-col gap-3">
              {c.guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={guideHref(g)}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-px hover:border-blue-200"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-base font-black tabular-nums text-blue-700">
                      {g.lesson}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-slate-900">{g.lessonName}</span>
                      <span className="line-clamp-2 block text-sm text-slate-500">{g.title}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
