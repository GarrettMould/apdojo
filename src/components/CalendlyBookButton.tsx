'use client';

import { useEffect, useState } from 'react';
import { PopupModal } from 'react-calendly';

interface CalendlyBookButtonProps {
  url: string;
  label?: string;
  className?: string;
}

export default function CalendlyBookButton({
  url,
  label = 'Book a session',
  className,
}: CalendlyBookButtonProps) {
  const [open, setOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {rootElement && (
        <PopupModal
          url={url}
          open={open}
          onModalClose={() => setOpen(false)}
          rootElement={rootElement}
        />
      )}
    </>
  );
}
