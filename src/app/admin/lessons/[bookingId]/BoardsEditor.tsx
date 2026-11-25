'use client';

/* eslint-disable @next/next/no-img-element -- board images come from short-lived signed links, not next/image */
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, ImagePlus, Loader2, X } from 'lucide-react';
import {
  LESSON_BOARD_TYPES,
  MAX_BOARD_BYTES,
  MAX_BOARD_CAPTION_CHARS,
  MAX_LESSON_BOARDS,
  type LessonBoardView,
} from '@/lib/tutoringLessons';
import { dojoButtonSecondary } from '../dojoStyles';
import ConfirmDialog from './ConfirmDialog';

/** Images bigger than this (either side) are scaled down before upload; plenty for a whiteboard. */
const MAX_IMAGE_SIDE = 2800;

/** Shrinks an image that's too large to upload; small ones go up untouched. */
async function prepareImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= MAX_BOARD_BYTES * 0.9) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not process the image');
  // Whiteboard exports are often transparent; give them a white background.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  for (const quality of [0.9, 0.75, 0.6]) {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
    if (blob && blob.size <= MAX_BOARD_BYTES) {
      const type = blob.type || 'image/webp';
      return new File([blob], file.name.replace(/\.[^.]+$/, '') + (type === 'image/png' ? '.png' : '.webp'), { type });
    }
  }
  throw new Error('That image is too large, even shrunk');
}

interface Uploading {
  key: string;
  name: string;
  error: string;
}

/**
 * The lesson's whiteboard snapshots: paste (⌘V), drop or choose Miro/Excalidraw exports. Each upload is saved
 * straight away; captions and order are saved with the rest of the notes.
 */
export default function BoardsEditor({
  bookingId,
  boards,
  getToken,
  onAdded,
  onRemoved,
  onChange,
}: {
  bookingId: string;
  boards: LessonBoardView[];
  getToken: () => Promise<string>;
  onAdded: (board: LessonBoardView) => void;
  onRemoved: (id: string) => void;
  /** Captions or order changed (unsaved). */
  onChange: (boards: LessonBoardView[]) => void;
}) {
  const [uploading, setUploading] = useState<Uploading[]>([]);
  const [dragging, setDragging] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  /** The board waiting for the remove confirmation. */
  const [confirmRemove, setConfirmRemove] = useState<LessonBoardView | null>(null);
  const [removeError, setRemoveError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(boards.length);
  countRef.current = boards.length + uploading.filter((u) => !u.error).length;

  const upload = async (files: File[]) => {
    const accepted = files.filter((f) => LESSON_BOARD_TYPES[f.type]);
    const rejected = files.length - accepted.length;
    const room = Math.max(0, MAX_LESSON_BOARDS - countRef.current);
    const batch = accepted.slice(0, room);
    const notes: Uploading[] = [];
    if (rejected) notes.push({ key: `rej-${Date.now()}`, name: `${rejected} file(s)`, error: 'Only PNG, JPG, WebP or PDF' });
    if (accepted.length > room) {
      notes.push({ key: `max-${Date.now()}`, name: 'Some files', error: `Up to ${MAX_LESSON_BOARDS} whiteboards per lesson` });
    }
    if (notes.length) setUploading((prev) => [...prev, ...notes]);

    await Promise.all(
      batch.map(async (file, i) => {
        const key = `${Date.now()}-${i}-${file.name}`;
        setUploading((prev) => [...prev, { key, name: file.name || 'Pasted image', error: '' }]);
        try {
          const ready = file.type === 'application/pdf' ? file : await prepareImage(file);
          if (ready.size > MAX_BOARD_BYTES) throw new Error('Over 4 MB. Export a smaller PDF.');
          const form = new FormData();
          form.append('bookingId', bookingId);
          form.append('file', ready, ready.name || 'whiteboard.png');
          const res = await fetch('/api/admin/lessons/boards', {
            method: 'POST',
            headers: { Authorization: `Bearer ${await getToken()}` },
            body: form,
          });
          const data = (await res.json().catch(() => ({}))) as { board?: LessonBoardView; error?: string };
          if (!res.ok || !data.board) throw new Error(data.error ?? 'Upload failed');
          onAdded(data.board);
          setUploading((prev) => prev.filter((u) => u.key !== key));
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Upload failed';
          setUploading((prev) => prev.map((u) => (u.key === key ? { ...u, error: message } : u)));
        }
      }),
    );
  };

  // Paste anywhere on the page. Text pastes into a field are left alone.
  const uploadRef = useRef(upload);
  uploadRef.current = upload;
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []).filter((f) => f.type.startsWith('image/') || f.type === 'application/pdf');
      if (files.length === 0) return;
      const target = e.target as HTMLElement | null;
      const inField = !!target?.closest('textarea, input, [contenteditable="true"]');
      if (inField && e.clipboardData?.types.includes('text/plain')) return;
      e.preventDefault();
      void uploadRef.current(files);
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, []);

  const remove = async (id: string) => {
    setRemoving(id);
    try {
      const res = await fetch(
        `/api/admin/lessons/boards?bookingId=${encodeURIComponent(bookingId)}&boardId=${encodeURIComponent(id)}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${await getToken()}` } },
      );
      if (!res.ok && res.status !== 404) throw new Error('Remove failed');
      onRemoved(id);
      setConfirmRemove(null);
    } catch (err) {
      console.error('Failed to remove board:', err);
      setConfirmRemove(null);
      setRemoveError(true);
    } finally {
      setRemoving(null);
    }
  };

  const move = (index: number, by: -1 | 1) => {
    const next = [...boards];
    const [item] = next.splice(index, 1);
    next.splice(index + by, 0, item);
    onChange(next);
  };

  const full = boards.length >= MAX_LESSON_BOARDS;

  return (
    <div className="flex flex-col gap-3">
      {boards.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {boards.map((b, i) => (
            <li key={b.id} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative">
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="block bg-slate-50" title="Open full size">
                  {b.contentType === 'application/pdf' ? (
                    <span className="flex aspect-[16/10] flex-col items-center justify-center gap-2 text-slate-500">
                      <FileText className="h-8 w-8" aria-hidden />
                      <span className="max-w-[80%] truncate text-xs font-semibold">{b.name}</span>
                    </span>
                  ) : (
                    <img src={b.url} alt={b.caption || b.name} className="aspect-[16/10] w-full object-contain" loading="lazy" />
                  )}
                </a>
                <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                  {i > 0 ? (
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      className="rounded-lg bg-white/95 p-1.5 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-slate-900"
                      aria-label="Move earlier"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  ) : null}
                  {i < boards.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      className="rounded-lg bg-white/95 p-1.5 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-slate-900"
                      aria-label="Move later"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setConfirmRemove(b)}
                    disabled={removing === b.id}
                    className="rounded-lg bg-white/95 p-1.5 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-red-600"
                    aria-label="Remove whiteboard"
                  >
                    {removing === b.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <X className="h-3.5 w-3.5" aria-hidden />}
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={b.caption}
                maxLength={MAX_BOARD_CAPTION_CHARS}
                onChange={(e) => onChange(boards.map((x) => (x.id === b.id ? { ...x, caption: e.target.value } : x)))}
                placeholder="Add a caption (optional)"
                className="border-t border-slate-100 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-blue-50/40 focus:outline-none"
              />
            </li>
          ))}
        </ul>
      ) : null}

      {uploading.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {uploading.map((u) => (
            <li
              key={u.key}
              className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2 text-sm ${
                u.error ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'
              }`}
            >
              <span className="flex min-w-0 items-center gap-2">
                {u.error ? null : <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />}
                <span className="truncate font-medium">{u.name}</span>
                {u.error ? <span className="shrink-0">· {u.error}</span> : <span className="shrink-0">· uploading…</span>}
              </span>
              {u.error ? (
                <button
                  type="button"
                  onClick={() => setUploading((prev) => prev.filter((x) => x.key !== u.key))}
                  className="shrink-0 rounded p-0.5 hover:bg-red-100"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {!full ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void upload(Array.from(e.dataTransfer.files));
          }}
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${
            dragging ? 'border-blue-400 bg-blue-50' : 'border-[#e3d6bd] bg-[#faf7f0]'
          }`}
        >
          <ImagePlus className={`h-6 w-6 ${dragging ? 'text-blue-500' : 'text-stone-400'}`} aria-hidden />
          <p className="text-sm text-stone-600">
            <span className="font-bold text-stone-800">Paste</span> a board (⌘V), <span className="font-bold text-stone-800">drop</span>{' '}
            exports here, or
          </p>
          <button type="button" onClick={() => inputRef.current?.click()} className={`${dojoButtonSecondary} px-3.5 py-2`}>
            Choose files
          </button>
          <p className="text-xs text-stone-500">
            Excalidraw: select all, then Copy to clipboard as PNG. Miro: Export board as image or PDF.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={Object.keys(LESSON_BOARD_TYPES).join(',')}
            multiple
            hidden
            onChange={(e) => {
              void upload(Array.from(e.target.files ?? []));
              e.target.value = '';
            }}
          />
        </div>
      ) : (
        <p className="text-xs font-medium text-slate-500">That&apos;s the maximum of {MAX_LESSON_BOARDS} whiteboards for one lesson.</p>
      )}

      {confirmRemove ? (
        <ConfirmDialog
          title="Remove this whiteboard?"
          confirmLabel="Remove whiteboard"
          busy={removing === confirmRemove.id}
          onConfirm={() => void remove(confirmRemove.id)}
          onClose={() => setConfirmRemove(null)}
        >
          {confirmRemove.caption ? (
            <>
              <span className="font-semibold text-slate-900">{confirmRemove.caption}</span> will be deleted from this lesson.
            </>
          ) : (
            'It will be deleted from this lesson.'
          )}{' '}
          If the family already has these notes, they keep seeing it until you send an update.
        </ConfirmDialog>
      ) : null}
      {removeError ? (
        <ConfirmDialog title="Couldn’t remove the whiteboard" tone="notice" onClose={() => setRemoveError(false)}>
          Something went wrong. Check your connection and try again.
        </ConfirmDialog>
      ) : null}
    </div>
  );
}
