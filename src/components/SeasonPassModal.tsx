'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { X, CheckCircle2, Check, ShieldCheck, Zap, Star, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';

interface SeasonPassModalProps {
  subject: 'macro' | 'micro';
  onClose: () => void;
}

const FEATURES = [
  { text: 'Full Practice Exams (2026 CED)' },
  { text: 'Endless AP-Style MCQ Bank' },
  { text: 'AI-Graded FRQs with Graphing Help' },
  { text: 'Interactive Graphing Simulators' },
  { text: 'Cheat Sheets + Downloadable PDFs' },
  { text: 'Upload Notes to Create Quizzes' },
];

export function SeasonPassModal({ subject, onClose }: SeasonPassModalProps) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isBundleLoading, setIsBundleLoading] = useState(false);
  const [showBundle, setShowBundle] = useState(false);
  const router = useRouter();

  const isGreen = subject === 'micro';
  const accentColor = isGreen ? '#22C55E' : '#3B82F6';
  const accentLight = isGreen ? '#F0FDF4' : '#EFF6FF';
  const accentDark = isGreen ? '#15803D' : '#1D4ED8';
  const subjectLabel = subject === 'macro' ? 'Macro' : 'Micro';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCheckout = async (type: 'macro' | 'micro' | 'bundle') => {
    const setLoading = type === 'bundle' ? setIsBundleLoading : setIsLoading;
    setLoading(true);
    try {
      const response = await fetch('/api/create-season-pass-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purchaseType: type, userId: user?.uid, cancelUrl: window.location.href }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error('Failed to load Stripe');
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  // Days until exam
  const examDate = subject === 'macro' ? new Date('2026-05-05') : new Date('2026-05-14');
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          overflowY: 'auto',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            background: '#fff',
            borderRadius: '28px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
            width: '100%',
            maxWidth: '440px',
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Colored top band */}
          <div style={{
            height: '8px',
            background: `linear-gradient(90deg, ${accentColor}, ${accentDark})`,
          }} />

          <div style={{ padding: '28px 28px 24px' }}>
            {/* Close button */}
          <button
            onClick={onClose}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: '#F3F4F6', border: 'none',
                borderRadius: '50%', width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#6B7280',
              }}
            >
              <X size={16} />
          </button>

            <AnimatePresence mode="wait">
              {!showBundle ? (
                <motion.div
                  key="single"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Header */}
            <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: accentLight,
                      borderRadius: '100px',
                      padding: '4px 12px',
                      marginBottom: '10px',
                    }}>
                      <Zap size={12} color={accentColor} fill={accentColor} />
                      <span style={{
                        fontSize: '11px', fontWeight: '800',
                        color: accentDark, letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}>
                        AP {subjectLabel} Season Pass
                      </span>
                    </div>

                    <h2 style={{
                      fontSize: '26px', fontWeight: '800',
                      color: '#111', lineHeight: 1.2,
                      marginBottom: '6px', letterSpacing: '-0.5px',
                    }}>
                      Unlock everything.<br />
                      <span style={{ color: accentColor }}>Score a 5.</span>
                    </h2>

                    {/* Price block (moved up above countdown) */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      marginBottom: '4px',
                    }}>
                      <span style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        color: accentColor,
                        letterSpacing: '-1px',
                        lineHeight: 1,
                      }}>$29</span>
                      <span style={{
                        fontSize: '14px',
                        color: '#D1D5DB',
                        textDecoration: 'line-through',
                        fontWeight: '600',
                      }}>$39</span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#fff',
                        background: '#EF4444',
                        borderRadius: '999px',
                        padding: '2px 8px',
                      }}>SAVE 26%</span>
            </div>

                    {/* Countdown pill */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: daysLeft < 30 ? '#FEF2F2' : '#F9FAFB',
                      borderRadius: '8px',
                      padding: '5px 10px',
                      marginTop: '4px',
                    }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: daysLeft < 30 ? '#DC2626' : '#6B7280',
                      }}>
                        {daysLeft < 30 ? '⚠️ ' : '📅 '}
                        AP {subjectLabel} exam in <strong>{daysLeft} days</strong>
                </span>
              </div>
            </div>

                  {/* Social proof */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />
                ))}
              </div>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>
                      1,000+ students helped
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '700',
                      color: accentColor,
                      background: accentLight,
                      borderRadius: '100px',
                      padding: '2px 8px',
                    }}>
                      💬 "I scored a 5"
              </span>
            </div>

                  {/* Features */}
                  <div style={{
                    background: '#FAFAFA',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}>
                    {FEATURES.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '999px',
                            background: accentLight,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <CheckCircle2 size={16} color={accentColor} />
                        </div>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#374151',
                        }}>
                          {feature.text}
                        </span>
                        <Check
                          size={14}
                          color={accentColor}
                          style={{ marginLeft: 'auto', flexShrink: 0 }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div>
                    <p style={{
                      fontSize: '11px',
                      color: '#9CA3AF',
                      marginBottom: '14px',
                      fontWeight: '500',
                    }}>
                      One-time payment · Valid until June 30, 2026 · Less than one tutoring session
                    </p>

                    <motion.button
                      onClick={() => handleCheckout(subject)}
                      disabled={isLoading}
                      whileHover={{ boxShadow: `0 6px 24px ${accentColor}66`, translateY: -1 }}
                      whileTap={{ translateY: 0 }}
                      style={{
                        width: '100%',
                        background: accentColor,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '800',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        boxShadow: `0 4px 20px ${accentColor}55`,
                        marginBottom: '10px',
                        letterSpacing: '0.2px',
                      }}
                    >
                      {isLoading ? 'Processing...' : `🔓 Unlock AP ${subjectLabel} — $29`}
                    </motion.button>

                    {/* Trust row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      marginBottom: '10px',
                    }}>
                      <ShieldCheck size={13} color="#9CA3AF" />
                      <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600' }}>
                        100% Money-Back Guarantee
                      </span>
                    </div>

                    {/* Bundle upsell */}
                    <button
                      onClick={() => setShowBundle(true)}
                      style={{
                        width: '100%',
                        background: '#FFFBEB',
                        border: '1.5px solid #FDE68A',
                        borderRadius: '14px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={15} color="#D97706" />
                        <div style={{ textAlign: 'left' }}>
                          <div style={{
                            fontSize: '12px', fontWeight: '800',
                            color: '#92400E',
                          }}>Taking both exams?</div>
                          <div style={{
                            fontSize: '11px', color: '#B45309', fontWeight: '500'
                          }}>Get Macro + Micro Bundle for $49</div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: '800',
                        color: '#92400E',
                        background: '#FEF3C7',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        whiteSpace: 'nowrap',
                      }}>
                        View →
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="bundle"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Back button */}
                  <button
                    onClick={() => setShowBundle(false)}
                    style={{
                      background: 'none', border: 'none',
                      cursor: 'pointer', fontSize: '13px',
                      fontWeight: '700', color: '#6B7280',
                      display: 'flex', alignItems: 'center',
                      gap: '4px', padding: '0',
                      alignSelf: 'flex-start',
                    }}
                  >
                    ← Back
                  </button>

                  {/* Bundle header */}
                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#FFFBEB',
                      borderRadius: '100px',
                      padding: '4px 12px',
                      marginBottom: '10px',
                    }}>
                      <Sparkles size={12} color="#D97706" />
                      <span style={{
                        fontSize: '11px', fontWeight: '800',
                        color: '#92400E', letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}>
                        Best Value Bundle
                      </span>
                    </div>

                    <h2 style={{
                      fontSize: '26px', fontWeight: '800',
                      color: '#111', lineHeight: 1.2,
                      marginBottom: '6px', letterSpacing: '-0.5px',
                    }}>
                      Macro + Micro.<br />
                      <span style={{ color: '#D97706' }}>Everything included.</span>
                    </h2>
                  </div>

                  {/* Two subject cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                      { label: 'AP Macro', color: '#3B82F6', light: '#EFF6FF' },
                      { label: 'AP Micro', color: '#22C55E', light: '#F0FDF4' },
                    ].map(({ label, color, light }) => (
                      <div key={label} style={{
                        background: light,
                        borderRadius: '14px',
                        padding: '14px',
                        border: `1.5px solid ${color}33`,
                      }}>
                        <div style={{
                          fontSize: '13px', fontWeight: '800',
                          color: color, marginBottom: '8px',
                        }}>{label}</div>
                        {FEATURES.slice(0, 3).map((f, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'center',
                            gap: '5px', marginBottom: '4px',
                          }}>
                            <Check size={11} color={color} />
                            <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: '500' }}>
                              {f.text.split(' ').slice(0, 3).join(' ')}...
                            </span>
                          </div>
                        ))}
                        <div style={{
                          fontSize: '10px', color: color,
                          fontWeight: '700', marginTop: '6px',
                        }}>+ 3 more features</div>
                      </div>
                    ))}
            </div>

                  {/* Bundle price */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      marginBottom: '4px',
                    }}>
                      <span style={{
                        fontSize: '42px', fontWeight: '800',
                        color: '#D97706', letterSpacing: '-2px', lineHeight: 1,
                      }}>$49</span>
                      <span style={{
                        fontSize: '16px', color: '#D1D5DB',
                        textDecoration: 'line-through', fontWeight: '600',
                      }}>$58</span>
                      <span style={{
                        fontSize: '11px', fontWeight: '700',
                        color: '#fff', background: '#EF4444',
                        borderRadius: '100px', padding: '2px 8px',
                      }}>SAVE $9</span>
                    </div>
                    <p style={{
                      fontSize: '11px', color: '#9CA3AF',
                      marginBottom: '14px', fontWeight: '500',
                    }}>
                      Both subjects · One-time payment · Valid until June 30, 2026
                    </p>

                    <motion.button
                      onClick={() => handleCheckout('bundle')}
                      disabled={isBundleLoading}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #3B82F6, #22C55E)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: '800',
                        cursor: isBundleLoading ? 'not-allowed' : 'pointer',
                        opacity: isBundleLoading ? 0.7 : 1,
                        boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
                        marginBottom: '10px',
                      }}
                    >
                      {isBundleLoading ? 'Processing...' : '🔓 Get the Bundle — $49'}
                    </motion.button>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      marginBottom: '14px',
                    }}>
                      <ShieldCheck size={13} color="#9CA3AF" />
                      <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600' }}>
                100% Money-Back Guarantee
                      </span>
                    </div>

                    {/* Back to single */}
                    <button
                      onClick={() => setShowBundle(false)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: '#9CA3AF',
                        fontWeight: '600',
                        padding: '4px',
                      }}
                    >
                      Just need AP {subjectLabel}?{' '}
                      <span style={{ color: accentColor, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                        Get it for $29 →
                      </span>
                    </button>
            </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
