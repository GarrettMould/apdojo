'use client';

import React, { useState } from 'react';
import { Download, CheckCircle, Lock } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';

type CopyMode = 'cheat-sheets' | 'study-guides';

const macroUnits = [
  { number: 1, title: 'Basic Economic Concepts' },
  { number: 2, title: 'Economic Indicators and the Business Cycle' },
  { number: 3, title: 'National Income and Price Determination' },
  { number: 4, title: 'Financial Sector' },
  { number: 5, title: 'Long-Run Consequences of Stabilization Policies' },
  { number: 6, title: 'Open Economy—International Trade and Finance' },
];

function getCopy(copyMode: CopyMode) {
  if (copyMode === 'study-guides') {
    return {
      pageTitle: 'Printable Unit Study Guides',
      pageSubtitle: 'Everything you need to ace your exam, all on a single page per unit.',
      rowSubtitle: 'One-page printable study guide for this unit.',
      previewTitle: 'study guide preview',
      unavailable: 'Printable study guide coming soon.',
      unlockTitle: 'Unlock All Printable Study Guides',
      unlockBody: 'Get instant access to printable, one-page study guides for every unit with a Season Pass.',
      filenameLabel: 'Study-Guide',
    };
  }

  return {
    pageTitle: 'Printable Unit Cheat Sheets',
    pageSubtitle: 'Everything you need to ace your exam, all on a single page per unit.',
    rowSubtitle: 'One-page printable cheat sheet for this unit.',
    previewTitle: 'cheat sheet preview',
    unavailable: 'Printable cheat sheet coming soon.',
    unlockTitle: 'Unlock All Printable Cheat Sheets',
    unlockBody: 'Get instant access to printable, one-page cheat sheets for every unit with a Season Pass.',
    filenameLabel: 'Cheat-Sheet',
  };
}

interface UnitResourceRowProps {
  unit: { number: number; title: string };
  isProCustomer: boolean;
  index: number;
  copyMode: CopyMode;
}

function UnitResourceRow({ unit, isProCustomer, index, copyMode }: UnitResourceRowProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const copy = getCopy(copyMode);

  const pdfUrl = `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+Macro+-+Unit+${unit.number}.pdf`;
  const filename = `AP-Dojo-Macro-Unit-${unit.number}-${copy.filenameLabel}.pdf`;
  const isEven = index % 2 === 0;

  const handleDownload = async () => {
    if (!isProCustomer) {
      window.location.href = '/purchase/season-pass?courseType=macro';
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(pdfUrl);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: '20px',
        padding: '10px 0 18px 0',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: '170px',
          height: '220px',
          border: '2px solid #000',
          borderRadius: '12px',
          background: '#fff',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '3px 3px 0 0 #000',
          filter: 'blur(0.5px)',
        }}
      >
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0`}
          title={`Unit ${unit.number} ${copy.previewTitle}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '833px', height: '1080px', transform: 'scale(0.2)', transformOrigin: 'top left', pointerEvents: 'none' }}
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          style={{ position: 'absolute', inset: 0, background: 'transparent', cursor: loading ? 'wait' : 'pointer' }}
          title={isProCustomer ? 'Download PDF' : 'Unlock with Season Pass'}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: isEven ? 'flex-start' : 'flex-end', textAlign: isEven ? 'left' : 'right' }}>
        <div style={{ fontWeight: 900, fontSize: '18px', color: '#111827', marginBottom: '2px' }}>
          Unit {unit.number}: {unit.title}
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>{copy.rowSubtitle}</div>

        <button
          onClick={handleDownload}
          disabled={loading}
          style={{
            marginTop: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: '#fde047',
            color: '#000',
            fontWeight: 900,
            fontSize: '13px',
            border: '2px solid #000',
            borderRadius: '10px',
            boxShadow: '2px 2px 0 0 #000',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
        >
          {downloaded ? (
            <>
              <CheckCircle size={14} color="#16a34a" />
              Done!
            </>
          ) : loading ? (
            <>
              <span style={{ width: '12px', height: '12px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
              Downloading...
            </>
          ) : isProCustomer ? (
            <>
              <Download size={14} />
              Download PDF
            </>
          ) : (
            <>
              <Lock size={14} />
              Unlock
            </>
          )}
        </button>
      </div>
    </li>
  );
}

export function UnitResourceLibraryPage({ copyMode = 'cheat-sheets' }: { copyMode?: CopyMode }) {
  const { user, userData } = useAuthContext();
  const [showLockedModal, setShowLockedModal] = useState(false);
  /** User closed the promo for this page visit; remounting the page shows it again. */
  const [seasonPassPromoDismissed, setSeasonPassPromoDismissed] = useState(false);
  const copy = getCopy(copyMode);

  const isProCustomer = React.useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, 'macro');
  }, [user, userData]);

  const showSeasonPassPromoModal = copyMode === 'cheat-sheets' && !seasonPassPromoDismissed;

  const dismissSeasonPassPromoModal = () => setSeasonPassPromoDismissed(true);

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        ul { list-style: none; padding: 0; margin: 0; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ marginBottom: '36px', animation: 'fadeIn 0.4s ease both', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(34px, 7vw, 52px)', fontWeight: 900, color: '#111', lineHeight: 1.02, letterSpacing: '-0.02em', textTransform: 'uppercase', textShadow: '2px 2px 0 rgba(59,130,246,0.25)' }}>
              {copy.pageTitle}
            </h1>
            <p style={{ color: '#6b7280', fontSize: '16px', fontWeight: 500, marginTop: '8px' }}>{copy.pageSubtitle}</p>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {macroUnits.map((unit, index) => (
              <UnitResourceRow key={`macro-${unit.number}`} unit={unit} isProCustomer={isProCustomer} index={index} copyMode={copyMode} />
            ))}
          </ul>

          {showLockedModal && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }} onClick={() => setShowLockedModal(false)}>
              <div style={{ maxWidth: '420px', width: '100%', background: '#fff', borderRadius: '16px', border: '3px solid #000', boxShadow: '6px 6px 0 0 #000', padding: '24px 20px' }} onClick={(e) => e.stopPropagation()}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px', color: '#111827' }}>{copy.unlockTitle}</h2>
                <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px' }}>{copy.unlockBody}</p>
                <button
                  onClick={() => {
                    window.location.href = '/purchase/season-pass?courseType=macro';
                  }}
                  style={{ width: '100%', padding: '10px 16px', background: '#22c55e', color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '10px', border: '2px solid #000', boxShadow: '3px 3px 0 0 #000', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.03em' }}
                >
                  View Season Pass Options
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {showSeasonPassPromoModal ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="season-pass-promo-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 10050,
          }}
          onClick={dismissSeasonPassPromoModal}
        >
          <div
            style={{
              maxWidth: '420px',
              width: '100%',
              background: '#fff',
              borderRadius: '16px',
              border: '3px solid #000',
              boxShadow: '6px 6px 0 0 #000',
              padding: '24px 20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="season-pass-promo-title" style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px', color: '#111827' }}>
              Get the Season Pass
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '16px' }}>
              Unlock every printable unit cheat sheet plus the rest of AP Dojo for Macro (and more) with a Season Pass.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/purchase/season-pass?courseType=macro';
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: '#22c55e',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '15px',
                  borderRadius: '10px',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 0 #000',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                View Season Pass Options
              </button>
              <button
                type="button"
                onClick={dismissSeasonPassPromoModal}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  background: '#f3f4f6',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: '10px',
                  border: '2px solid #000',
                  cursor: 'pointer',
                }}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

