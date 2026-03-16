'use client';

import React, { useState } from 'react';
import { Download, CheckCircle, Lock } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { hasValidSeasonPass } from '@/lib/utils';

const macroUnits = [
  { number: 1, title: 'Basic Economic Concepts' },
  { number: 2, title: 'Economic Indicators and the Business Cycle' },
  { number: 3, title: 'National Income and Price Determination' },
  { number: 4, title: 'Financial Sector' },
  { number: 5, title: 'Long-Run Consequences of Stabilization Policies' },
  { number: 6, title: 'Open Economy—International Trade and Finance' },
];

const microUnits = [
  { number: 1, title: 'Basic Economic Concepts' },
  { number: 2, title: 'Supply and Demand' },
  { number: 3, title: 'Production, Cost, and the Perfect Competition Model' },
  { number: 4, title: 'Imperfect Competition' },
  { number: 5, title: 'Factor Markets' },
  { number: 6, title: 'Market Failure and the Role of Government' },
];

interface CheatSheetRowProps {
  unit: { number: number; title: string };
  subject: 'macro' | 'micro';
  isProCustomer: boolean;
  onLockedClick: () => void;
  index: number;
}

function CheatSheetRow({ unit, subject, isProCustomer, onLockedClick, index }: CheatSheetRowProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const pdfUrl =
    subject === 'macro'
      ? `https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/pdfs/AP+Macro+-+Unit+${unit.number}.pdf`
      : null;

  const filename =
    subject === 'macro'
      ? `AP-Dojo-Macro-Unit-${unit.number}-Cheat-Sheet.pdf`
      : `AP-Dojo-Micro-Unit-${unit.number}-Cheat-Sheet.pdf`;

  const handleDownload = async () => {
    if (!isProCustomer) {
      // Logged-out / free users: send directly to Season Pass purchase page
      window.location.href = `/purchase/season-pass?courseType=${subject}`;
      return;
    }
    if (!pdfUrl) return;
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

  const isMacro = subject === 'macro';

  const isEven = index % 2 === 0;

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
      {/* Mini PDF preview */}
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
        {pdfUrl ? (
          <>
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              title={`Unit ${unit.number} cheat sheet preview`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '833px',
                height: '1080px',
                transform: 'scale(0.2)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}
            />
            <button
              onClick={handleDownload}
              disabled={loading}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'transparent',
                cursor: loading ? 'wait' : 'pointer',
              }}
              title={isProCustomer ? 'Download PDF' : 'Unlock with Season Pass'}
            />
          </>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              color: '#6b7280',
              fontSize: '12px',
              textAlign: 'center',
            }}
          >
            Printable cheat sheet coming soon.
          </div>
        )}
      </div>

      {/* Text + button */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isEven ? 'flex-start' : 'flex-end',
          textAlign: isEven ? 'left' : 'right',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '8px',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: '18px',
                color: '#111827',
                marginBottom: '2px',
              }}
            >
              Unit {unit.number}: {unit.title}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#6b7280',
              }}
            >
              One-page printable cheat sheet for this unit.
            </div>
          </div>
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={loading}
          style={{
            marginTop: '8px',
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
            transition: 'transform 0.1s, box-shadow 0.1s',
            opacity: loading ? 0.7 : 1,
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translate(-1px, -1px)';
              e.currentTarget.style.boxShadow = '3px 3px 0 0 #000';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '2px 2px 0 0 #000';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '1px 1px 0 0 #000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translate(-1px, -1px)';
            e.currentTarget.style.boxShadow = '3px 3px 0 0 #000';
          }}
        >
          {downloaded ? (
            <>
              <CheckCircle size={14} color="#16a34a" />
              Done!
            </>
          ) : loading ? (
            <>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  border: '2px solid #000',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
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

export default function CheatSheetsPage() {
  const { user, userData, selectedSubject: contextSubject } = useAuthContext();
  const selectedSubject = 'macro';

  const isProCustomer = React.useMemo(() => {
    if (!user || !userData) return false;
    return hasValidSeasonPass(userData, 'macro');
  }, [user, userData, selectedSubject]);

  const [activeTab] = useState<'macro'>('macro');
  const [showLockedModal, setShowLockedModal] = useState(false);

  const units = macroUnits;

  const handleLockedClick = () => {
    setShowLockedModal(true);
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        ul { list-style: none; padding: 0; margin: 0; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Header */}
          <div
            style={{
              marginBottom: '36px',
              animation: 'fadeIn 0.4s ease both',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(26px, 5vw, 36px)',
                  fontWeight: 900,
                  color: '#111',
                  lineHeight: 1.1,
                }}
              >
                Printable Cheat Sheets
              </h1>
            </div>
            <p
              style={{
                color: '#6b7280',
                fontSize: '16px',
                fontWeight: 500,
                marginLeft: '2px',
              }}
            >
              Everything you need to ace your exam, all on a single page per unit.
            </p>
          </div>

          {/* List of units with alternating mini PDF previews */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {units.map((unit, index) => (
              <CheatSheetRow
                key={`${activeTab}-${unit.number}`}
                unit={unit}
                subject={activeTab}
                isProCustomer={isProCustomer}
                onLockedClick={handleLockedClick}
                index={index}
              />
            ))}
          </ul>

          {/* Locked modal */}
          {showLockedModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                zIndex: 50,
              }}
              onClick={() => setShowLockedModal(false)}
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
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    marginBottom: '8px',
                    color: '#111827',
                  }}
                >
                  Unlock All Printable Cheat Sheets
                </h2>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '16px',
                  }}
                >
                  Get instant access to printable, one-page cheat sheets for every unit with a Season Pass.
                </p>
                <button
                  onClick={() => {
                    window.location.href = `/purchase/season-pass?courseType=${activeTab}`;
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

