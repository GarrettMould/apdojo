'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

export type DesmosCalculatorHandle = {
  clear: () => void;
};

type Props = {
  className?: string;
  /** Pixel height of the calculator pane. */
  height?: number;
};

declare global {
  interface Window {
    Desmos?: {
      GraphingCalculator: (
        element: HTMLElement,
        options?: Record<string, unknown>,
      ) => {
        destroy: () => void;
        setBlank: () => void;
      };
    };
  }
}

let desmosScriptPromise: Promise<void> | null = null;

function loadDesmosScript(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
  if (window.Desmos) return Promise.resolve();
  if (desmosScriptPromise) return desmosScriptPromise;

  desmosScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-desmos-api]');
    if (existing) {
      if (window.Desmos) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Desmos script failed')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.dataset.desmosApi = 'true';
    script.onload = () => resolve();
    script.onerror = () => {
      desmosScriptPromise = null;
      reject(new Error('Failed to load Desmos API script'));
    };
    document.head.appendChild(script);
  });

  return desmosScriptPromise;
}

/**
 * Official Desmos Graphing Calculator embed (Bluebook-style tool for AP Stats practice).
 */
export const DesmosCalculator = forwardRef<DesmosCalculatorHandle, Props>(
  function DesmosCalculator({ className = '', height = 520 }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const calcRef = useRef<ReturnType<NonNullable<Window['Desmos']>['GraphingCalculator']> | null>(
      null,
    );
    const [error, setError] = useState<string | null>(null);
    const [ready, setReady] = useState(false);

    useImperativeHandle(ref, () => ({
      clear: () => {
        calcRef.current?.setBlank();
      },
    }));

    useEffect(() => {
      const apiKey = process.env.NEXT_PUBLIC_DESMOS_API_KEY;
      if (!apiKey) {
        setError('Missing NEXT_PUBLIC_DESMOS_API_KEY in .env.local');
        return;
      }

      let cancelled = false;

      (async () => {
        try {
          await loadDesmosScript(apiKey);
          if (cancelled || !containerRef.current || !window.Desmos) return;

          calcRef.current?.destroy();
          calcRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
            expressions: true,
            settingsMenu: true,
            zoomButtons: true,
            expressionsTopbar: true,
            border: false,
          });
          setReady(true);
          setError(null);
        } catch (err) {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : 'Could not load Desmos');
          }
        }
      })();

      return () => {
        cancelled = true;
        calcRef.current?.destroy();
        calcRef.current = null;
      };
    }, []);

    return (
      <div className={`w-full max-w-[560px] ${className}`}>
        <div
          className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          style={{ height }}
        >
          {!ready && !error && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white text-sm font-medium text-gray-500">
              Loading Desmos…
            </div>
          )}
          {error && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white px-6 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}
          <div ref={containerRef} className="h-full w-full" />
        </div>
        <p className="mt-2 text-center text-[11px] font-medium text-gray-400">
          Desmos graphing calculator · closest match to Bluebook on exam day
        </p>
      </div>
    );
  },
);
