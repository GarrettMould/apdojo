'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { dojoButtonPrimary } from '../dojoStyles';

/**
 * A small centered dialog in the lesson pages' style, in place of the browser's confirm() and alert().
 * Without `onConfirm` it's a notice with a single button.
 */
export default function ConfirmDialog({
  title,
  children,
  tone = 'danger',
  confirmLabel = 'Remove',
  cancelLabel = 'Cancel',
  busy = false,
  onConfirm,
  onClose,
}: {
  title: string;
  children?: ReactNode;
  tone?: 'danger' | 'notice';
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !busy && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, busy]);

  const Icon = tone === 'danger' ? Trash2 : AlertTriangle;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (!busy && ref.current && !ref.current.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={ref}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-[0_24px_60px_-16px_rgba(15,23,42,0.35)]"
      >
        <span
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ring-8 ${
            tone === 'danger' ? 'bg-red-50 ring-red-50/60' : 'bg-[#f7f2e8] ring-[#f7f2e8]/60'
          }`}
        >
          <Icon className={`h-6 w-6 ${tone === 'danger' ? 'text-red-600' : 'text-amber-600'}`} strokeWidth={2.25} aria-hidden />
        </span>
        <h3 id="confirm-title" className="mt-5 text-xl font-black tracking-tight text-slate-900">
          {title}
        </h3>
        {children ? <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div> : null}
        <div className="mt-6 flex flex-col gap-2">
          {onConfirm ? (
            <>
              <button
                ref={confirmRef}
                type="button"
                onClick={onConfirm}
                disabled={busy}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 disabled:opacity-60 ${
                  tone === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                {confirmLabel}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                {cancelLabel}
              </button>
            </>
          ) : (
            <button ref={confirmRef} type="button" onClick={onClose} className={dojoButtonPrimary}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
