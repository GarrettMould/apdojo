'use client';

import { forwardRef } from 'react';
import { Swords } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  count: number;
  pulseKey: number;
  active?: boolean;
  onClick: () => void;
};

export const ReviewFolderButton = forwardRef<HTMLButtonElement, Props>(
  function ReviewFolderButton({ count, pulseKey, active = false, onClick }, ref) {
    const lit = active || count > 0;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`inline-flex flex-shrink-0 items-center gap-2 rounded-md border-2 px-2.5 py-1.5 text-sm font-semibold tracking-tight transition-colors ${
          lit
            ? 'border-black bg-black text-white'
            : 'border-stone-300 bg-white text-stone-700 hover:border-black hover:text-black'
        }`}
        aria-pressed={active}
        aria-label={
          count > 0
            ? `Open Rematch, ${count} saved`
            : 'Open Rematch'
        }
        title="Rematch — turn misses into a practice packet"
      >
        <motion.span
          key={pulseKey}
          className="inline-flex"
          initial={
            pulseKey > 0
              ? { scale: 0.85, y: 2, opacity: 0.7 }
              : false
          }
          animate={
            pulseKey > 0
              ? { scale: [0.85, 1.2, 1], y: [2, -3, 0], opacity: 1 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            scale: { times: [0, 0.45, 1], duration: 0.45 },
            y: { times: [0, 0.45, 1], duration: 0.45 },
          }}
        >
          <Swords className="h-3.5 w-3.5" strokeWidth={2.5} />
        </motion.span>
        <motion.span
          key={`label-${pulseKey}`}
          initial={pulseKey > 0 ? { opacity: 0.5 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Rematch
        </motion.span>
        {count > 0 ? (
          <motion.span
            key={`count-${pulseKey}-${count}`}
            className={`tabular-nums ${lit ? 'text-white/70' : 'text-stone-500'} font-medium`}
            initial={pulseKey > 0 ? { scale: 0.9, opacity: 0.5 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {count}
          </motion.span>
        ) : null}
      </button>
    );
  }
);
