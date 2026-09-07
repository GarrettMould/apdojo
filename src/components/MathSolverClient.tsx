'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { TutorAssistantMarkdown } from '@/components/TutorAssistantMarkdown';
import { MathSolverSolutionView } from '@/components/MathSolverSolutionView';
import { MathSolverPracticeDeck } from '@/components/MathSolverPracticeDeck';
import type { MathSolverResponse } from '@/lib/mathSolver/types';

const ALLOWED_UPLOAD_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

type UserMessage = {
  role: 'user';
  content: string;
  fileUrl?: string;
  fileMimeType?: string;
  fileName?: string;
};

type AssistantMessage = {
  role: 'assistant';
  /** Flat text stored for API history / follow-ups */
  content: string;
  reply: MathSolverResponse;
};

type Message = UserMessage | AssistantMessage;

type Attachment = {
  mimeType: string;
  data: string;
  dataUrl: string;
  fileName: string;
};

function isPdf(mime: string | undefined) {
  return mime === 'application/pdf';
}

function FileChip({
  mimeType,
  fileName,
  fileUrl,
  onRemove,
  dark,
}: {
  mimeType: string;
  fileName: string;
  fileUrl: string;
  onRemove?: () => void;
  dark?: boolean;
}) {
  if (isPdf(mimeType)) {
    return (
      <div
        className={`mb-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
          dark ? 'bg-orange-600/40 text-white' : 'bg-gray-100 text-gray-700'
        }`}
      >
        <span className="text-lg" aria-hidden>
          📄
        </span>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`max-w-[200px] truncate underline underline-offset-2 ${
            dark ? 'text-white' : 'text-gray-800'
          }`}
        >
          {fileName}
        </a>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className={dark ? 'ml-1 text-white/70 hover:text-white' : 'ml-1 text-gray-400 hover:text-gray-600'}
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={fileUrl} alt={fileName} className="max-h-48 max-w-full rounded-lg" />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-1 text-xs text-gray-400 hover:text-gray-600"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export function MathSolverClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  /** Last file sent to the API — used to generate practice from the upload */
  const [practiceSource, setPracticeSource] = useState<Attachment | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('Reading the problem and building steps…');
  const fileRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const mime = file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : '');
    if (!ALLOWED_UPLOAD_MIME.has(mime)) {
      alert('Please upload a JPEG, PNG, WebP, GIF, or PDF file.');
      e.target.value = '';
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert('File must be under 4MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      setAttachment({
        mimeType: mime,
        data: base64,
        dataUrl,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, []);

  const postToSolver = useCallback(
    async ({
      nextMessages,
      file,
      intent,
    }: {
      nextMessages: Message[];
      file?: Attachment | null;
      intent?: 'solve' | 'practice';
    }) => {
      setLoading(true);
      setLoadingLabel(
        intent === 'practice'
          ? 'Building similar practice problems from your upload…'
          : 'Reading the problem and building steps…',
      );

      try {
        const res = await fetch('/api/math-solver', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intent: intent === 'practice' ? 'practice' : undefined,
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
            ...(file
              ? { attachment: { mimeType: file.mimeType, data: file.data } }
              : {}),
          }),
        });

        const data = await res.json();
        if (data.reply) {
          const reply = data.reply as MathSolverResponse;
          const historyText =
            typeof data.historyText === 'string'
              ? data.historyText
              : reply.kind === 'chat'
                ? reply.message
                : reply.kind === 'practice'
                  ? 'Practice problems generated.'
                  : 'Solution provided.';
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: historyText, reply },
          ]);
        } else {
          const errMsg =
            typeof data.message === 'string'
              ? data.message
              : 'Sorry, something went wrong. Please try again.';
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: errMsg,
              reply: { kind: 'chat', message: errMsg },
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Network error — please check your connection and try again.',
            reply: {
              kind: 'chat',
              message: 'Network error — please check your connection and try again.',
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text && !attachment) return;

    const userMessage: UserMessage = {
      role: 'user',
      content:
        text ||
        (isPdf(attachment?.mimeType)
          ? 'Solve the problem(s) in this PDF:'
          : 'Solve this problem:'),
      fileUrl: attachment?.dataUrl,
      fileMimeType: attachment?.mimeType,
      fileName: attachment?.fileName,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    const currentAttachment = attachment;
    setAttachment(null);
    if (currentAttachment) {
      setPracticeSource(currentAttachment);
    }

    await postToSolver({
      nextMessages: newMessages,
      file: currentAttachment,
    });
  }, [input, attachment, messages, postToSolver]);

  const handleGeneratePractice = useCallback(async () => {
    const source = practiceSource ?? attachment;
    if (!source || loading) return;

    // If they attached a new file but haven't sent it yet, lock it in as the practice source
    if (!practiceSource && attachment) {
      setPracticeSource(attachment);
      setAttachment(null);
    }

    const userMessage: UserMessage = {
      role: 'user',
      content: 'Generate similar practice problems based on my upload.',
      fileUrl: source.dataUrl,
      fileMimeType: source.mimeType,
      fileName: source.fileName,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setPracticeSource(source);

    await postToSolver({
      nextMessages: newMessages,
      file: source,
      intent: 'practice',
    });
  }, [practiceSource, attachment, loading, messages, postToSolver]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const canGeneratePractice = Boolean(practiceSource || attachment) && !loading;

  return (
    <div className="mx-auto flex h-[calc(100vh-200px)] min-h-[500px] max-w-2xl flex-col overflow-hidden rounded-2xl border-2 border-gray-300 bg-white shadow-sm">
      <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4 sm:px-4">
        {messages.length === 0 && (
          <div className="space-y-4 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              📐
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Snap a photo, upload a PDF, or type a problem
            </h2>
            <p className="mx-auto max-w-md text-gray-500">
              We&apos;ll break it into parts and walk through one step at a time — so you learn the work, not just the answer.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Solve a derivative', 'Find the p-value', 'Factor this expression', 'Confidence interval'].map(
                (hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => setInput(hint)}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
                  >
                    {hint}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-orange-500 px-4 py-3 text-white">
                  {msg.fileUrl && msg.fileMimeType && msg.fileName && (
                    <FileChip
                      mimeType={msg.fileMimeType}
                      fileName={msg.fileName}
                      fileUrl={msg.fileUrl}
                      dark
                    />
                  )}
                  <p className="whitespace-pre-wrap text-[15px]">{msg.content}</p>
                </div>
              </div>
            );
          }

          if (msg.reply.kind === 'solution') {
            return (
              <div key={i} className="flex justify-start">
                <div className="w-full max-w-xl space-y-3">
                  <MathSolverSolutionView solution={msg.reply} />
                  {canGeneratePractice && i === messages.length - 1 && (
                    <button
                      type="button"
                      onClick={handleGeneratePractice}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
                    >
                      <p className="text-sm font-semibold text-gray-900">Generate practice</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        Get similar problems based on your upload — stacked like a practice deck.
                      </p>
                    </button>
                  )}
                </div>
              </div>
            );
          }

          if (msg.reply.kind === 'practice') {
            return (
              <div key={i} className="flex justify-start">
                <MathSolverPracticeDeck practice={msg.reply} />
              </div>
            );
          }

          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <TutorAssistantMarkdown text={msg.reply.message} />
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3 text-sm text-orange-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '0ms' }} />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '150ms' }} />
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '300ms' }} />
                </div>
                {loadingLabel}
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {attachment && (
        <div className="px-3 pb-2">
          {isPdf(attachment.mimeType) ? (
            <FileChip
              mimeType={attachment.mimeType}
              fileName={attachment.fileName}
              fileUrl={attachment.dataUrl}
              onRemove={() => setAttachment(null)}
            />
          ) : (
            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={attachment.dataUrl} alt="Preview" className="h-10 w-10 rounded object-cover" />
              <span className="max-w-[200px] truncate">{attachment.fileName}</span>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="ml-1 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 bg-gray-50 px-3 py-3">
        {canGeneratePractice && messages.length > 0 && (
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={handleGeneratePractice}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              Generate practice from upload
            </button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,.pdf"
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            title="Upload photo or PDF"
          >
            📎
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              messages.some((m) => m.role === 'assistant' && m.reply.kind === 'solution')
                ? 'Ask a follow-up, or upload another problem…'
                : 'Type a problem, or upload a photo / PDF…'
            }
            rows={1}
            className="max-h-32 flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-[15px] text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
            style={{ minHeight: '42px' }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={loading || (!input.trim() && !attachment)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
