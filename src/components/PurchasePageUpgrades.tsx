'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

// ============================================================
// 1. EXAM COUNTDOWN TIMER
// ============================================================

interface ExamCountdownProps {
  courseType: 'macro' | 'micro';
  isGreen: boolean;
}

export function ExamCountdown({ courseType, isGreen }: ExamCountdownProps) {
  const examDate = courseType === 'macro'
    ? new Date('2026-05-05T08:00:00')
    : new Date('2026-05-14T08:00:00');

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
      setUrgent(days < 14);
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [examDate]);

  const accentColor = isGreen ? '#16a34a' : '#2563eb';
  const bgColor = urgent ? '#FEF2F2' : '#FAFAF5';
  const borderColor = urgent ? '#EF4444' : '#000000';
  const labelColor = urgent ? '#DC2626' : '#6B7280';

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: bgColor,
        border: `3px solid ${borderColor}`,
        boxShadow: `4px 4px 0px 0px ${borderColor}`,
        padding: '16px 20px',
        marginBottom: '24px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
      }}>
        <Clock size={16} color={urgent ? '#DC2626' : '#6B7280'} />
        <span style={{
          fontSize: '11px',
          fontWeight: '900',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: labelColor,
          fontFamily: 'Georgia, serif',
        }}>
          {urgent ? '⚠️ Exam approaching fast' : `AP ${courseType === 'macro' ? 'Macro' : 'Micro'} Exam Countdown`}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Min' },
          { value: timeLeft.seconds, label: 'Sec' },
        ].map(({ value, label }, i) => (
          <React.Fragment key={label}>
            <div style={{ textAlign: 'center' }}>
              <motion.div
                key={`${label}-${value}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                style={{
                  fontSize: '36px',
                  fontWeight: '900',
                  fontFamily: 'Georgia, serif',
                  color: urgent ? '#DC2626' : accentColor,
                  lineHeight: 1,
                  minWidth: '48px',
                }}
              >
                {String(value).padStart(2, '0')}
              </motion.div>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#9CA3AF',
                marginTop: '4px',
              }}>{label}</div>
            </div>
            {i < 3 && (
              <div style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#D1D5DB',
                marginBottom: '14px',
              }}>:</div>
            )}
          </React.Fragment>
        ))}

        <div style={{
          marginLeft: 'auto',
          textAlign: 'right',
          paddingBottom: '2px',
        }}>
          <div style={{
            fontSize: '11px',
            color: '#9CA3AF',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}>
            Exam date
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: '900',
            color: '#111',
            fontFamily: 'Georgia, serif',
          }}>
            {courseType === 'macro' ? 'May 5, 2026' : 'May 14, 2026'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// 2. OUTCOME-FOCUSED FEATURES LIST
// ============================================================

interface FeatureItem {
  outcome: string;
  detail: string;
  emoji: string;
}

const MACRO_FEATURES: FeatureItem[] = [
  {
    emoji: '📝',
    outcome: 'Walk into exam day knowing every question type',
    detail: 'Full practice exams built on the 2027 AP Macro CED — same format, same difficulty.',
  },
  {
    emoji: '⚡',
    outcome: 'Never run out of MCQ practice',
    detail: 'Endless AP-style question bank across every unit. Drill until it clicks.',
  },
  {
    emoji: '🤖',
    outcome: 'Get your FRQs graded in seconds, not days',
    detail: 'AI scores your free response answers with graphing feedback — just like a real grader.',
  },
  {
    emoji: '📊',
    outcome: 'Master every graph the AP exam will throw at you',
    detail: 'Interactive graphing simulators for AD-AS, Phillips Curve, Loanable Funds, and more.',
  },
  {
    emoji: '📋',
    outcome: 'Revise smarter with everything on one page',
    detail: 'Interactive cheat sheets + downloadable PDFs for every unit.',
  },
  {
    emoji: '🗒️',
    outcome: 'Turn your own notes into a personalized quiz',
    detail: 'Upload your notes and get a custom MCQ quiz generated instantly.',
  },
];

const MICRO_FEATURES: FeatureItem[] = [
  {
    emoji: '📝',
    outcome: 'Walk into exam day knowing every question type',
    detail: 'Full practice exams built on the 2027 AP Micro CED — same format, same difficulty.',
  },
  {
    emoji: '⚡',
    outcome: 'Never run out of MCQ practice',
    detail: 'Endless AP-style question bank across every unit. Drill until it clicks.',
  },
  {
    emoji: '🤖',
    outcome: 'Get your FRQs graded in seconds, not days',
    detail: 'AI scores your free response answers with graphing feedback — just like a real grader.',
  },
  {
    emoji: '📊',
    outcome: 'Master every graph the AP exam will throw at you',
    detail: 'Interactive graphing simulators for Supply & Demand, Cost Curves, Market Structures, and more.',
  },
  {
    emoji: '📋',
    outcome: 'Revise smarter with everything on one page',
    detail: 'Interactive cheat sheets + downloadable PDFs for every unit.',
  },
  {
    emoji: '🗒️',
    outcome: 'Turn your own notes into a personalized quiz',
    detail: 'Upload your notes and get a custom MCQ quiz generated instantly.',
  },
];

interface OutcomeFeaturesListProps {
  courseType: 'macro' | 'micro';
  isGreen: boolean;
}

export function OutcomeFeaturesList({ courseType, isGreen }: OutcomeFeaturesListProps) {
  const features = courseType === 'macro' ? MACRO_FEATURES : MICRO_FEATURES;
  const accentColor = isGreen ? '#16a34a' : '#2563eb';

  return (
    <div>
      <h2 style={{
        fontSize: '22px',
        fontWeight: '900',
        color: '#000',
        marginBottom: '24px',
        fontFamily: 'Georgia, serif',
      }}>
        What you&apos;ll be able to do:
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              flexShrink: 0,
              background: accentColor,
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              marginTop: '2px',
            }}>
              {feature.emoji}
            </div>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: '800',
                color: '#111',
                marginBottom: '3px',
                fontFamily: 'Georgia, serif',
              }}>
                {feature.outcome}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#6B7280',
                fontWeight: '500',
                lineHeight: '1.5',
              }}>
                {feature.detail}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// 3. SOCIAL PROOF SCORE BANNER
// ============================================================

export function ScoreProofBanner({ isGreen }: { isGreen: boolean }) {
  const accentColor = isGreen ? '#16a34a' : '#2563eb';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        background: '#FFFDF0',
        border: '3px solid #000',
        boxShadow: '4px 4px 0px 0px #000',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flex: 1,
        minWidth: '200px',
      }}>
        <div style={{
          background: accentColor,
          color: '#fff',
          fontWeight: '900',
          fontSize: '22px',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #000',
          flexShrink: 0,
          fontFamily: 'Georgia, serif',
        }}>5</div>
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: '800',
            color: '#111',
            fontFamily: 'Georgia, serif',
          }}>
            &ldquo;I scored a 5. AP Dojo was the difference.&rdquo;
          </div>
          <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600', marginTop: '2px' }}>
            — AP Macro Student, 2025
          </div>
        </div>
      </div>
      <div style={{
        borderLeft: '2px solid #E5E7EB',
        paddingLeft: '16px',
        display: 'flex',
        gap: '20px',
      }}>
        {[
          { number: '500+', label: 'Students' },
          { number: '4.9★', label: 'Rating' },
          { number: '$29', label: 'One-time' },
        ].map(({ number, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '900',
              color: accentColor,
              fontFamily: 'Georgia, serif',
            }}>{number}</div>
            <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
