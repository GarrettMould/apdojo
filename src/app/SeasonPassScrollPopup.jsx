'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheatSheetPreview } from "@/components/CheatSheetPreview";
import { MCQPracticePreview } from "@/components/MCQPracticePreview";
import { FRQFeedbackDemo } from "@/components/FRQFeedbackDemo";

// --- Icons (inline to avoid import issues) ---
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// --- Main Modal ---
export default function SeasonPassScrollPopup({ onClose, onPurchase, selectedSubject = "macro" }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose?.(), 400);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 pointer-events-auto"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full pointer-events-auto"
            style={{ maxWidth: "100vw" }}
          >
            <div
              className="relative w-full bg-white border-t-4 border-x-4 border-black rounded-t-3xl overflow-hidden flex flex-col"
              style={{
                boxShadow: "0 -6px 0 0 #000",
                minHeight: 320,
                maxHeight: "92dvh",
              }}
            >
              {/* Top yellow accent bar */}
              <div className="w-full h-1.5 bg-yellow-300" />

              {/* Drag handle */}
              <div className="flex justify-center pt-2 pb-0">
                <div className="w-10 h-1 rounded-full bg-black/20" />
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center text-black hover:bg-slate-100 active:scale-95 transition z-10"
                style={{ boxShadow: "2px 2px 0 0 #000" }}
              >
                <XIcon />
              </button>

              {/* Content */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 flex-1 min-h-0 overflow-hidden">

                {/* LEFT: CTA copy */}
                <div className="flex flex-col justify-between sm:w-[42%] flex-shrink-0">
                  <div>
                    {/* Badge */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 260 }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-300 border-2 border-black mb-3"
                      style={{ boxShadow: "2px 2px 0 0 #000" }}
                    >
                      <StarIcon />
                      <span className="text-[11px] font-black uppercase tracking-wide">2026 AP Exam Prep</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl sm:text-3xl font-black text-black leading-[1.1] tracking-tight mb-3"
                    >
                      Everything you need.<br />
                      <span className="relative inline-block">
                        <span className="relative z-10">One flat price.</span>
                        <span
                          className="absolute bottom-0 left-0 w-full h-3 -z-0 bg-yellow-300"
                          style={{ bottom: "2px" }}
                        />
                      </span>
                    </motion.h2>

                    {/* Features list */}
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-1.5 mb-4"
                    >
                      {[
                        "Unit Cheat Sheets (every unit)",
                        "Full-length Practice Tests",
                        "FRQ Practice + Model Answers",
                        "Video Explanations",
                        "Unlimited Shuffle Mode",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                            <CheckIcon />
                          </div>
                          <span className="text-[13px] font-semibold text-slate-700">{item}</span>
                        </li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Price + CTA */}
                  <div>
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="flex items-baseline gap-2 mb-3"
                    >
                      <span className="text-4xl font-black text-black">$29</span>
                      <span className="text-sm font-bold text-slate-400 line-through">$79</span>
                      <span className="text-xs font-black text-green-600 bg-green-100 border border-green-400 px-1.5 py-0.5 rounded-full">63% OFF</span>
                    </motion.div>

                    <motion.button
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      type="button"
                      onClick={() => onPurchase?.(`/purchase/season-pass?courseType=${selectedSubject}`)}
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 1, boxShadow: "2px 2px 0 0 #000" }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-yellow-300 text-black font-black text-base rounded-xl border-2 border-black transition-all"
                      style={{ boxShadow: "4px 4px 0 0 #000" }}
                    >
                      <DownloadIcon />
                      Get the Season Pass →
                    </motion.button>

                    <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                      Join 1,000+ students prepping for the 2026 AP Exam
                    </p>
                  </div>
                </div>

                {/* RIGHT: Equal-sized hero-style previews (same style as logged-out hero section) */}
                <div className="flex-1 grid grid-cols-3 grid-rows-1 gap-3 min-h-0 min-w-0">
                  {[
                    { label: "Unit Cheat Sheets", Component: CheatSheetPreview, delay: 0.3 },
                    { label: "MCQ Practice", Component: MCQPracticePreview, delay: 0.38 },
                    { label: "FRQ Practice", Component: FRQFeedbackDemo, delay: 0.46 },
                  ].map(({ label, Component, delay }) => (
                    <motion.div
                      key={label}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay, type: "spring", stiffness: 180 }}
                      className="flex flex-col min-w-0 h-full"
                    >
                      {/* Equal-sized hero card — hero components provide the style */}
                      <div className="flex-1 min-h-[140px] sm:min-h-[180px] overflow-hidden rounded-2xl pointer-events-none">
                        <div
                          className="w-full h-full overflow-hidden flex items-start justify-center"
                          style={{ transform: "scale(0.3)", transformOrigin: "top center" }}
                        >
                          <div className="w-[333%] min-h-[333%] flex-shrink-0">
                            <Component />
                          </div>
                        </div>
                      </div>
                      <h4 className="text-[10px] sm:text-[11px] font-black text-slate-600 uppercase tracking-tight mt-1.5 text-center truncate flex-shrink-0">
                        {label}
                      </h4>
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
