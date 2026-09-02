'use client';

import Image from 'next/image';

/** Matches legacy PDF iframe viewport before scale. */
export const CHEAT_SHEET_PDF_PREVIEW_WIDTH = 833;
export const CHEAT_SHEET_PDF_PREVIEW_HEIGHT = 1080;

type CheatSheetPdfPreviewThumbnailProps = {
  src: string;
  alt: string;
  /** Rendered card width in px — image scales from 833px source. */
  containerWidth: number;
  priority?: boolean;
  className?: string;
};

export function CheatSheetPdfPreviewThumbnail({
  src,
  alt,
  containerWidth,
  priority = false,
  className = '',
}: CheatSheetPdfPreviewThumbnailProps) {
  const scale = containerWidth / CHEAT_SHEET_PDF_PREVIEW_WIDTH;
  const containerHeight = Math.round(CHEAT_SHEET_PDF_PREVIEW_HEIGHT * scale);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        width={CHEAT_SHEET_PDF_PREVIEW_WIDTH}
        height={CHEAT_SHEET_PDF_PREVIEW_HEIGHT}
        className="absolute top-0 left-0 pointer-events-none select-none max-w-none"
        style={{
          width: `${CHEAT_SHEET_PDF_PREVIEW_WIDTH}px`,
          height: `${CHEAT_SHEET_PDF_PREVIEW_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        sizes={`${Math.ceil(containerWidth)}px`}
      />
    </div>
  );
}
