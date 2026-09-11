'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import type { CourseSubject } from '@/lib/courseSubject';
import { defaultCheatSheetUrl } from '@/lib/courseSubject';
import { LOGGED_OUT_COURSE_OFFERINGS } from '@/data/loggedOutHeroConfig';

export function HeroSection() {
  const { setSelectedSubject, setShowSignupModal } = useAuthContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const handleCourseClick = (subject: CourseSubject) => {
    setSelectedSubject(subject);
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%),radial-gradient(ellipse_at_80%_20%,_rgba(249,115,22,0.1),_transparent_45%),radial-gradient(ellipse_at_20%_80%,_rgba(139,92,246,0.08),_transparent_50%),linear-gradient(to_bottom,#f8fafc,#ffffff)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-black uppercase tracking-[0.28em] text-slate-900 sm:text-base"
          >
            AP Dojo
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-5 inline-flex items-center rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-slate-800 shadow-[3px_3px_0_0_rgba(0,0,0,1)] sm:text-sm"
          >
            Brand new <span className="mx-1.5 text-blue-600">2027</span> courses available
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl lg:leading-[1.05]"
          >
            Four AP courses.
            <br />
            One place to score a 5.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-xl"
          >
            Macro, Micro, Gov, and Stats, rebuilt for the 2027 exams with practice, cheat sheets, and
            season-pass tools.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="inline-flex items-center justify-center rounded-2xl border-2 border-black bg-slate-900 px-8 py-4 text-base font-black text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            >
              Start free
            </button>
            <a
              href="/purchase/season-pass"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-black bg-white px-8 py-4 text-base font-black text-slate-900 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            >
              Season Pass
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-600"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>1,000+ students helped</span>
          </motion.div>
        </motion.div>

        <motion.div
          id="courses"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:gap-5"
        >
          {LOGGED_OUT_COURSE_OFFERINGS.map((course) => (
            <motion.article
              key={course.id}
              variants={itemVariants}
              className={`flex h-full flex-col rounded-3xl border-4 border-black bg-white p-6 text-left shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_0_rgba(0,0,0,1)] sm:p-7 ${course.tileHover}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex rounded-lg border-2 border-black px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white ${course.badgeClass}`}
                >
                  {course.shortLabel}
                </span>
                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">
                  2027 ready
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {course.title}
              </h2>
              <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                {course.blurb}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={defaultCheatSheetUrl(course.id)}
                  onClick={() => handleCourseClick(course.id)}
                  className={`inline-flex items-center gap-1.5 text-sm font-black ${course.accentText}`}
                >
                  Explore free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={course.purchaseHref}
                  onClick={() => handleCourseClick(course.id)}
                  className="text-sm font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-800"
                >
                  Season Pass $29
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
