'use client';

import { useState } from 'react';
import { X, ArrowRight, Lock, Loader2 } from 'lucide-react';

export type ParentPayProduct = 'macro' | 'micro' | 'bundle';

interface ParentPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  studentId: string;
  /** When provided, email/link use this product (e.g. bundle = $49, parent-pay?product=bundle) */
  product?: ParentPayProduct;
}

export function ParentPaymentModal({
  open,
  onOpenChange,
  studentName,
  studentId,
  product,
}: ParentPaymentModalProps) {
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClose = () => {
    onOpenChange(false);
    setSent(false);
    setError(null);
  };

  const handleSend = async () => {
    const name = parentName.trim();
    const email = parentEmail.trim();
    if (!name || !email) {
      setError('Please enter parent name and email.');
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      const res = await fetch('/api/send-parent-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentId,
          parentName: name,
          parentEmail: email,
          product: product ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send link');
      }
      setSent(true);
      setParentName('');
      setParentEmail('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send link. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {sent ? (
          <>
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Link sent!</h2>
                <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
                  <X size={24} className="text-gray-900" />
                </button>
              </div>
              <p className="text-gray-500 font-medium">Check that your parent received the email.</p>
            </div>
            <div className="px-8 pb-8">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-bold text-lg transition-all active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 1. BOLD HEADER (High Contrast) */}
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  Email Payment Link
                </h2>
                <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
                  <X size={24} className="text-gray-900" />
                </button>
              </div>
              <p className="text-gray-500 font-medium">
                Send a secure checkout link directly to your parent.
              </p>
            </div>

            {/* 2. BODY (Simple Inputs) */}
            <div className="px-8 pb-8 space-y-6">
              {/* The Value Prop - Clean Box */}
              <div className="bg-gray-50 p-4 border-l-4 border-blue-600 rounded-r-md">
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-bold text-blue-700">The Email:</span> We explain that passing AP exams can save <span className="underline decoration-blue-300 decoration-2">thousands in tuition</span>.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Parent Name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Mom"
                    disabled={isSending}
                    className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 font-semibold focus:border-black focus:ring-0 outline-none transition-all placeholder:font-normal placeholder:text-gray-400 disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Parent Email</label>
                  <input
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={isSending}
                    className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 font-semibold focus:border-black focus:ring-0 outline-none transition-all placeholder:font-normal placeholder:text-gray-400 disabled:opacity-60"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              {/* 3. BIG BLACK BUTTON */}
              <button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Link <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* 4. Minimal Footer */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400">
                <Lock size={12} />
                <span>Secure via Stripe</span>
                <span>•</span>
                <span>No Spam</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
