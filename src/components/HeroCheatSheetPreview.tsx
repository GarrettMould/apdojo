'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/** Matches the old PDF iframe layout: 833×1080 viewport, scaled to card width. */
const PREVIEW_WIDTH = 833;
const PREVIEW_HEIGHT = 1080;

type HeroCheatSheetPreviewProps = {
  src: string;
  alt: string;
  /** When true, image loads immediately (homepage hero). */
  priority?: boolean;
  className?: string;
};

export function HeroCheatSheetPreview({
  src,
  alt,
  priority = false,
  className = '',
}: HeroCheatSheetPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.77);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / PREVIEW_WIDTH);
      }
    };
    update();
    const t = window.setTimeout(update, 50);
    window.addEventListener('resize', update);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', update);
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        width={PREVIEW_WIDTH}
        height={PREVIEW_HEIGHT}
        className="absolute top-0 left-0 pointer-events-none select-none max-w-none"
        style={{
          width: `${PREVIEW_WIDTH}px`,
          height: `${PREVIEW_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}
