import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const CheatSheetPreview = () => (
  <div className="w-full h-full flex flex-col gap-2 p-3">
    {[
      { label: "Supply & Demand", color: "#fde68a", w: "85%" },
      { label: "GDP Formula", color: "#bbf7d0", w: "70%" },
      { label: "Monetary Policy", color: "#bfdbfe", w: "90%" },
      { label: "Fiscal Tools", color: "#fecaca", w: "75%" },
    ].map((row, i) => (
      <motion.div key={i} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.08 }} className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-sm border border-black flex-shrink-0" style={{ background: row.color }} />
        <div className="h-3 rounded-sm border border-black/20 text-[8px] font-bold flex items-center px-1.5 text-slate-600 overflow-hidden" style={{ width: row.w, background: row.color + "99" }}>{row.label}</div>
      </motion.div>
    ))}
    <div className="mt-auto pt-2 border-t-2 border-dashed border-black/20">
      <div className="h-2.5 w-full rounded-sm bg-yellow-200 border border-black/20" />
    </div>
  </div>
);

const PracticeTestPreview = () => (
  <div className="w-full h-full flex flex-col gap-2 p-3">
    {[
      { q: "Q1", correct: true },
      { q: "Q2", correct: true },
      { q: "Q3", correct: false },
      { q: "Q4", correct: true },
    ].map((item, i) => (
      <motion.div key={i} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 200 }} className="flex items-center gap-2">
        <span className="text-[10px] font-black text-slate-400 w-5">{item.q}</span>
        <div className="flex-1 h-2.5 rounded-sm border border-black/20 bg-slate-100" />
        <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0" style={{ background: item.correct ? "#4ade80" : "#f87171" }}>
          <span className="text-[8px] font-black text-white leading-none">{item.correct ? "✓" : "✗"}</span>
        </div>
      </motion.div>
    ))}
    <div className="mt-auto">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-black text-slate-500">Score</span>
        <span className="text-[10px] font-black text-green-600">75%</span>
      </div>
      <div className="h-2 w-full rounded-full border-2 border-black bg-slate-100 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 0.9, duration: 0.5 }} className="h-full bg-green-400" />
      </div>
    </div>
  </div>
);

const FRQPreview = () => (
  <div className="w-full h-full flex flex-col gap-2 p-3">
    <div className="text-[9px] font-black text-slate-500 uppercase tracking-wider">FRQ Response</div>
    {[100, 85, 70, 90, 60].map((w, i) => (
      <motion.div key={i} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 0.5 + i * 0.07 }} style={{ transformOrigin: "left" }}>
        <div className="h-2 rounded-sm bg-slate-100 border border-black/15 overflow-hidden">
          <div className="h-full rounded-sm bg-blue-300" style={{ width: `${w}%` }} />
        </div>
      </motion.div>
    ))}
    <div className="mt-auto flex items-center gap-1.5">
      <div className="w-6 h-6 rounded-full bg-yellow-300 border-2 border-black flex items-center justify-center flex-shrink-0" style={{ boxShadow: "1px 1px 0 0 #000" }}>
        <span className="text-[10px] font-black">5</span>
      </div>
      <span className="text-[9px] font-bold text-slate-500">Model answer included</span>
    </div>
  </div>
);

const FeatureCard = ({ title, emoji, accent, children, delay }) => (
  <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay, type: "spring", stiffness: 180 }} className="relative flex flex-col rounded-2xl border-2 border-black overflow-hidden" style={{ boxShadow: "3px 3px 0 0 #000" }}>
    <div className="flex items-center gap-1.5 px-2.5 py-2 border-b-2 border-black" style={{ background: accent }}>
      <span className="text-sm">{emoji}</span>
      <span className="text-[11px] font-black tracking-tight text-black uppercase">{title}</span>
    </div>
    <div className="flex-1 bg-white">{children}</div>
  </motion.div>
);

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center font-sans">
      <p className="text-slate-500 text-sm mb-4 font-medium">Simulated page background</p>
      {!open && (
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-yellow-300 border-2 border-black rounded-xl font-black text-sm" style={{ boxShadow: "3px 3px 0 0 #000" }}>
          Show Modal Again
        </button>
      )}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/30 pointer-events-auto" onClick={() => setOpen(false)} />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full pointer-events-auto"
            >
              <div className="relative w-full bg-white border-t-4 border-x-4 border-black rounded-t-3xl overflow-hidden flex flex-col" style={{ boxShadow: "0 -6px 0 0 #000" }}>
                {/* Top yellow accent bar */}
                <div className="w-full h-1.5 bg-yellow-300" />
                {/* Drag handle */}
                <div className="flex justify-center pt-2">
                  <div className="w-10 h-1 rounded-full bg-black/20" />
                </div>

                {/* Close btn */}
                <button type="button" onClick={() => setOpen(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-slate-100 active:scale-95 transition z-10" style={{ boxShadow: "2px 2px 0 0 #000" }}>
                  <XIcon />
                </button>

                {/* Inner layout */}
                <div className="flex flex-col sm:flex-row gap-4 px-4 pt-3 pb-5 sm:p-6">

                  {/* LEFT: copy + CTA */}
                  <div className="flex flex-col sm:w-[40%] flex-shrink-0">
                    {/* Badge */}
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 260 }} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-300 border-2 border-black mb-2 self-start" style={{ boxShadow: "2px 2px 0 0 #000" }}>
                      <StarIcon /><span className="text-[11px] font-black uppercase tracking-wide">2026 AP Exam Prep</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2 initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.22 }} className="text-2xl sm:text-[26px] font-black text-black leading-[1.1] tracking-tight mb-3">
                      Everything you need.{" "}
                      <span className="relative inline-block">
                        <span className="relative z-10">One flat price.</span>
                        <span className="absolute left-0 right-0 h-3 bg-yellow-300 -z-0" style={{ bottom: "1px" }} />
                      </span>
                    </motion.h2>

                    {/* Checklist */}
                    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-1.5 mb-4">
                      {["Unit Cheat Sheets (every unit)", "Full-length Practice Tests", "FRQ Practice + Model Answers", "Video Explanations", "Unlimited Shuffle Mode"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-[18px] h-[18px] rounded-full bg-green-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                            <CheckIcon />
                          </div>
                          <span className="text-[13px] font-semibold text-slate-700">{item}</span>
                        </li>
                      ))}
                    </motion.ul>

                    {/* Price row */}
                    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.36 }} className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl font-black text-black">$29</span>
                      <span className="text-sm font-bold text-slate-400 line-through">$79</span>
                      <span className="text-[11px] font-black text-green-700 bg-green-100 border border-green-400 px-2 py-0.5 rounded-full">63% OFF</span>
                    </motion.div>

                    {/* CTA button */}
                    <motion.button
                      initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.42 }}
                      whileHover={{ y: -2, boxShadow: "6px 6px 0 0 #000" }}
                      whileTap={{ y: 1, boxShadow: "2px 2px 0 0 #000" }}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-yellow-300 text-black font-black text-[15px] rounded-xl border-2 border-black transition-all"
                      style={{ boxShadow: "4px 4px 0 0 #000" }}
                    >
                      <DownloadIcon />
                      Get the Season Pass →
                    </motion.button>

                    <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                      Join 1,000+ students prepping for 2026
                    </p>
                  </div>

                  {/* RIGHT: 3 feature cards */}
                  <div className="flex-1 grid grid-cols-3 gap-2.5" style={{ minHeight: 160 }}>
                    <FeatureCard title="Cheat Sheets" emoji="📄" accent="#fde68a" delay={0.3}>
                      <CheatSheetPreview />
                    </FeatureCard>
                    <FeatureCard title="Unit Tests" emoji="✅" accent="#bbf7d0" delay={0.38}>
                      <PracticeTestPreview />
                    </FeatureCard>
                    <FeatureCard title="FRQ Practice" emoji="✏️" accent="#bfdbfe" delay={0.46}>
                      <FRQPreview />
                    </FeatureCard>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
