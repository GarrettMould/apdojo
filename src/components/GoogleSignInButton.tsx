'use client';

import { cn } from '@/lib/utils';

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={cn('h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

type GoogleSignInButtonProps = {
  onClick: () => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  /** Visual style preset */
  variant?: 'dojo' | 'modal';
  className?: string;
};

export function GoogleSignInButton({
  onClick,
  loading,
  disabled,
  children,
  variant = 'dojo',
  className,
}: GoogleSignInButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => void onClick()}
      className={cn(
        'inline-flex w-full items-center justify-center gap-3 py-3 px-4 text-base font-bold transition-all disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'dojo' &&
          'rounded-xl border-2 border-black bg-white text-gray-900 shadow-[0_3px_0_0_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(0,0,0,1)]',
        variant === 'modal' &&
          'rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50',
        className,
      )}
    >
      {loading ? (
        <span className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300 border-t-gray-800 animate-spin" />
      ) : (
        <GoogleMark />
      )}
      {children}
    </button>
  );
}

export function AuthDividerOr({
  className,
  centerBgClassName = 'bg-white',
}: {
  className?: string;
  /** Match parent card background (e.g. bg-gray-50 on signup modal) */
  centerBgClassName?: string;
}) {
  return (
    <div className={cn('relative my-6', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-gray-500">
        <span className={cn('px-3', centerBgClassName)}>or</span>
      </div>
    </div>
  );
}
