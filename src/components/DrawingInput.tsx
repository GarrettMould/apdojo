'use client';

/* eslint-disable @next/next/no-img-element -- previews are data URLs */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';
import { Image as ImageIcon, Loader2, Pencil, Upload, X } from 'lucide-react';

// Browser only: Excalidraw needs the DOM.
const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center gap-2 text-sm font-medium text-slate-500">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading whiteboard…
    </div>
  ),
});

interface DrawingInputProps {
  drawingKey: string;
  drawingData: string | undefined;
  onSave: (key: string, data: string) => void;
  isGraded: boolean;
  /** An image to draw on, e.g. blank axes. Placed as a locked background. */
  templateImageUrl?: string;
  // Kept for compatibility with the old drawing pad; Excalidraw has its own text and shape tools.
  enableStickers?: boolean;
  stickerLabels?: string[];
  hideDoneButton?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any -- Excalidraw's element and file types are internal */
type Scene = { elements: readonly any[]; files: Record<string, any> };

/** Boards survive the component remounting (switching parts, re-renders) for the rest of the visit. */
const sceneCache = new Map<string, Scene>();

const TEMPLATE_ID = 'frq-template';
const TEMPLATE_WIDTH = 760;
/** Saves after the student pauses, not on every stroke point. */
const SAVE_DELAY_MS = 500;

function readAsDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function imageSize(dataURL: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
    img.onerror = () => resolve({ width: 800, height: 600 });
    img.src = dataURL;
  });
}

/** Elements the student drew (not deleted, and not the locked template). */
function drawnElements(elements: readonly any[]) {
  return elements.filter((e) => !e.isDeleted && e.customData?.role !== 'template');
}

/** Sum of element versions: changes whenever anything is drawn, moved or deleted. */
function sceneVersion(elements: readonly any[]) {
  return elements.reduce((sum, e) => sum + (e.version ?? 0), 0);
}

/** The starting scene for a board: cached from earlier in the visit, or built from the template. */
async function buildInitialData(drawingKey: string, templateImageUrl: string | undefined, drawingData: string | undefined) {
  const appState = { viewBackgroundColor: '#ffffff', currentItemStrokeColor: '#1e1e1e', currentItemRoughness: 0 };
  const cached = sceneCache.get(drawingKey);
  if (cached) return { elements: cached.elements, files: cached.files, appState, scrollToContent: true };

  const { convertToExcalidrawElements } = await import('@excalidraw/excalidraw');
  const skeletons: any[] = [];
  const files: Record<string, any> = {};
  const addImage = async (dataURL: string, id: string, role: 'template' | 'previous') => {
    const { width, height } = await imageSize(dataURL);
    files[id] = { id, dataURL, mimeType: dataURL.slice(5, dataURL.indexOf(';')) || 'image/png', created: Date.now() };
    skeletons.push({
      type: 'image',
      fileId: id,
      x: 0,
      y: 0,
      width: TEMPLATE_WIDTH,
      height: height * (TEMPLATE_WIDTH / width),
      locked: role === 'template',
      customData: { role },
    });
  };
  if (templateImageUrl) {
    try {
      const res = await fetch(templateImageUrl);
      const blob = await res.blob();
      // A missing file comes back as an HTML page; skip it rather than show a broken image.
      if (!res.ok || !blob.type.startsWith('image/')) throw new Error(`${templateImageUrl} is not an image (${res.status})`);
      await addImage(await readAsDataURL(blob), `${TEMPLATE_ID}-${drawingKey}`, 'template');
    } catch (err) {
      console.error('[DrawingInput] Could not load the template image:', err);
    }
  } else if (drawingData?.startsWith('data:image')) {
    // An earlier answer saved only as an image: bring it in to keep working on.
    await addImage(drawingData, `previous-${drawingKey}`, 'previous');
  }
  return { elements: convertToExcalidrawElements(skeletons), files, appState, scrollToContent: true };
}

/**
 * An FRQ drawing answer: an Excalidraw whiteboard (or an uploaded photo of a paper drawing). The board is
 * saved as a PNG data URL through `onSave`, the same format the old drawing pad produced.
 */
export const DrawingInput: React.FC<DrawingInputProps> = ({ drawingKey, drawingData, onSave, isGraded, templateImageUrl }) => {
  const [inputMethod, setInputMethod] = useState<'draw' | 'upload'>('draw');
  const apiRef = useRef<any>(null);
  const lastVersion = useRef<number>(-1);
  const saveTimer = useRef<number | null>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;
  const [ready, setReady] = useState(false);

  /**
   * The board's starting content, handed to Excalidraw as its initial data (it loads it once mounted): the
   * board from earlier in this visit, or the template and any earlier answer saved as an image.
   */
  const [initialData] = useState(() => buildInitialData(drawingKey, templateImageUrl, drawingData));
  /** The version of the starting content, so loading it isn't mistaken for drawing. */
  const baseline = useRef<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    void initialData.then((data) => {
      if (cancelled) return;
      const version = sceneVersion(data.elements);
      baseline.current = version;
      lastVersion.current = version;
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [initialData]);

  // Once the starting content is in, zoom so a template fits the board with a little margin.
  useEffect(() => {
    if (!ready || inputMethod !== 'draw') return;
    const timer = window.setTimeout(() => {
      const api = apiRef.current;
      if (api && api.getSceneElements().some((e: any) => !e.isDeleted)) {
        api.scrollToContent(undefined, { fitToViewport: true, viewportZoomFactor: 0.9 });
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [ready, inputMethod]);

  /**
   * The board as last seen while mounted. Saving reads this, not the live board, because the live board is
   * already torn down (and reports empty) by the time an unmount save runs.
   */
  const latestScene = useRef<Scene | null>(null);

  /** Saves the board as a PNG. `leaving`: the component is unmounting, so never clear the answer. */
  const exportBoard = useCallback(
    async (leaving = false) => {
      const scene = latestScene.current;
      if (!scene) return;
      const elements = scene.elements.filter((e: any) => !e.isDeleted);
      sceneCache.set(drawingKey, scene);
      const hasWork = drawnElements(elements).length > 0 || elements.some((e: any) => e.customData?.role === 'previous');
      if (!hasWork) {
        if (!leaving) onSaveRef.current(drawingKey, '');
        return;
      }
      const { exportToBlob } = await import('@excalidraw/excalidraw');
      const blob = await exportToBlob({
        elements,
        files: scene.files,
        mimeType: 'image/png',
        exportPadding: 16,
        appState: { exportBackground: true, viewBackgroundColor: '#ffffff', exportWithDarkMode: false },
      });
      onSaveRef.current(drawingKey, await readAsDataURL(blob));
    },
    [drawingKey],
  );

  const handleChange = useCallback(
    (elements: readonly any[], _appState: unknown, files: Record<string, any>) => {
      if (!ready || isGraded) return;
      const version = sceneVersion(elements);
      if (version === lastVersion.current) return; // cursor moves, selection, zoom: nothing to save
      lastVersion.current = version;
      latestScene.current = { elements, files };
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        saveTimer.current = null;
        void exportBoard();
      }, SAVE_DELAY_MS);
    },
    [ready, isGraded, exportBoard],
  );

  // A save still waiting when the student leaves (submitting, switching parts) runs straight away.
  useEffect(
    () => () => {
      if (saveTimer.current) {
        window.clearTimeout(saveTimer.current);
        saveTimer.current = null;
        void exportBoard(true);
      }
    },
    [exportBoard],
  );

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    onSave(drawingKey, await readAsDataURL(file));
  };

  const switchInputMethod = (method: 'draw' | 'upload') => {
    if (inputMethod === method || isGraded) return;
    if (method === 'upload') onSave(drawingKey, '');
    else void exportBoard();
    setInputMethod(method);
  };

  const uploadedPreview = inputMethod === 'upload' && drawingData?.startsWith('data:image') ? drawingData : null;

  return (
    <div className="space-y-3">
      {!isGraded && (
        <div className="flex gap-1 border-b border-slate-200">
          {(
            [
              ['draw', 'Draw', Pencil],
              ['upload', 'Upload a photo', ImageIcon],
            ] as const
          ).map(([method, label, Icon]) => (
            <button
              key={method}
              type="button"
              onClick={() => switchInputMethod(method)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
                inputMethod === method ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden /> {label}
            </button>
          ))}
        </div>
      )}

      {inputMethod === 'draw' ? (
        <div className="frq-whiteboard relative h-[440px] overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-[520px]">
          <Excalidraw
            excalidrawAPI={(api: any) => {
              apiRef.current = api;
            }}
            viewModeEnabled={isGraded}
            gridModeEnabled={false}
            UIOptions={{
              canvasActions: {
                toggleTheme: false,
                changeViewBackgroundColor: false,
                loadScene: false,
                saveToActiveFile: false,
                saveAsImage: false,
                export: false,
                clearCanvas: true,
              },
              tools: { image: false },
            }}
            initialData={initialData}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white">
          {uploadedPreview ? (
            <div className="relative p-4">
              <img src={uploadedPreview} alt="Your uploaded drawing" className="mx-auto h-auto w-full max-w-md rounded-lg border border-slate-200" />
              {!isGraded && (
                <button
                  type="button"
                  onClick={() => onSave(drawingKey, '')}
                  className="absolute right-3 top-3 rounded-lg bg-white/95 p-1.5 text-slate-500 shadow-sm ring-1 ring-slate-200 hover:text-red-600"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
          ) : (
            <label htmlFor={`file-input-${drawingKey}`} className="flex cursor-pointer flex-col items-center gap-2 px-6 py-10 text-center">
              <input
                type="file"
                id={`file-input-${drawingKey}`}
                onChange={(e) => void handleImageUpload(e.target.files ? e.target.files[0] : null)}
                className="hidden"
                accept="image/*"
              />
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                <Upload className="h-4 w-4" aria-hidden /> Choose a photo
              </span>
              <span className="text-xs text-slate-500">Drew it on paper? Upload a clear photo (PNG or JPG).</span>
            </label>
          )}
        </div>
      )}
    </div>
  );
};
