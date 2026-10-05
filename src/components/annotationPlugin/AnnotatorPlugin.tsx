'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';

type Annotation = {
  id: string;
  _id?: string;
  x: number;
  y: number;
  content: string;
  path: string;
  slug?: string;
};

interface AnnotatorPluginProps {
  isActive: boolean;
  onCountChange?: (count: number) => void;
}

export const AnnotatorPlugin: React.FC<AnnotatorPluginProps> = ({ isActive, onCountChange = () => {} }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [draftContent, setDraftContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

  const storageKey = useMemo(() => {
    if (typeof window === 'undefined') return 'opg-comments:/';
    return `opg-comments:${window.location.pathname || '/'}`;
  }, []);

  const slug = useMemo(() => {
    if (typeof window === 'undefined') return 'home';
    return window.location.pathname.split('/').filter(Boolean).pop() || 'home';
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setAnnotations(JSON.parse(stored));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        const comments = payload?.comments || payload?.pages || payload?.data?.comments || [];
        if (!isMounted || !Array.isArray(comments)) return;
        setAnnotations(comments.map((comment: any) => ({
          id: String(comment.id || comment._id),
          _id: String(comment._id || comment.id),
          x: Number(comment.x || comment.offsetX || 0),
          y: Number(comment.y || comment.offsetY || 0),
          content: String(comment.content || ''),
          path: comment.path || `/${slug === 'home' ? '' : slug}`,
          slug: comment.slug || comment.pageSlug || slug,
        })));
      })
      .catch(() => setError('Could not load comments from database.'));

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    onCountChange(annotations.length);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(annotations));
    } catch {}
  }, [annotations, onCountChange, storageKey]);

  useEffect(() => {
    document.body.classList.toggle('annotator-active', isActive);
    return () => document.body.classList.remove('annotator-active');
  }, [isActive]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const target = event.target as Element | null;
    const annotatorUi = target?.closest('[data-annotator-ui="true"]');
    if (annotatorUi && annotatorUi !== event.currentTarget) return;
    event.preventDefault();
    event.stopPropagation();
    setDraft({ x: event.clientX, y: event.clientY });
  };

  const saveDraft = async () => {
    const content = draftContent.trim();
    if (!draft || !content || isSaving) return;

    setIsSaving(true);
    setError(null);
    setStatusMessage(null);

    const localComment: Annotation = {
      id: `${Date.now()}`,
      x: draft.x,
      y: draft.y,
      content,
      path: window.location.pathname || '/',
      slug,
    };

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: slug,
          slug,
          selector: 'body',
          offsetX: draft.x,
          offsetY: draft.y,
          x: draft.x,
          y: draft.y,
          content,
          status: 'open',
          screenSize: 'all',
        }),
      });

      if (!response.ok) {
        const message = await response.text().catch(() => 'Comment save failed');
        throw new Error(message || 'Comment save failed');
      }
      const payload = await response.json();
      const saved = payload?.comment || payload?.data?.comment || payload?.data || localComment;
      setAnnotations((current) => [
        ...current,
        {
          ...localComment,
          id: String(saved.id || saved._id || localComment.id),
          _id: saved._id ? String(saved._id) : undefined,
        },
      ]);
      setDraft(null);
      setDraftContent('');
      setStatusMessage('Comment saved to database.');
      window.setTimeout(() => setStatusMessage(null), 2500);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Comment was not saved to database.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAnnotation = async (annotation: Annotation) => {
    setAnnotations((current) => current.filter((item) => item.id !== annotation.id));
    const id = annotation._id || annotation.id;
    try {
      const response = await fetch(`/api/comments?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
    } catch {
      setAnnotations((current) => [...current, annotation]);
      setError('Could not delete comment from database.');
    }
  };

  if (!isActive) return null;

  return (
    <>
      <div
        data-annotator-ui="true"
        className="fixed inset-x-0 bottom-0 top-[44px] z-[9998] cursor-crosshair bg-[#C6AF87]/[0.04]"
        onClickCapture={handleCanvasClick}
      >
        {!draft && (
          <div className="pointer-events-none fixed left-1/2 top-20 -translate-x-1/2 rounded-full bg-[#232323] px-4 py-2 text-xs font-semibold text-white shadow-lg ring-1 ring-[#C6AF87]/60">
            Click anywhere on the page to add a comment
          </div>
        )}
        {error && (
          <div className="pointer-events-none fixed left-1/2 top-32 max-w-[90vw] -translate-x-1/2 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg">
            {error}
          </div>
        )}
        {statusMessage && (
          <div className="pointer-events-none fixed left-1/2 top-32 -translate-x-1/2 rounded-full bg-[#C6AF87] px-4 py-2 text-xs font-semibold text-[#232323] shadow-lg">
            {statusMessage}
          </div>
        )}
      </div>

      {annotations.map((annotation) => (
        <div key={annotation.id} data-annotator-ui="true">
          <button
            className="fixed z-[9999] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#232323] text-[#C6AF87] shadow-lg ring-4 ring-[#C6AF87]/35 transition-transform hover:scale-110"
            style={{ left: annotation.x, top: annotation.y }}
            title="Open comment"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActiveAnnotationId((current) => (current === annotation.id ? null : annotation.id));
            }}
          >
            <MessageSquarePlus className="mx-auto h-4 w-4" />
          </button>

          {activeAnnotationId === annotation.id && (
            <div
              className="fixed z-[10000] w-72 rounded-xl border border-[#C6AF87]/40 bg-white text-[#232323] shadow-2xl"
              style={{
                left: Math.min(annotation.x + 16, window.innerWidth - 304),
                top: Math.min(annotation.y + 16, window.innerHeight - 180),
              }}
            >
              <div className="flex items-center justify-between border-b border-[#C6AF87]/25 bg-[#F7F3F0] px-4 py-2 text-sm font-semibold">
                Comment
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveAnnotationId(null);
                  }}
                  className="rounded p-1 hover:bg-[#C6AF87]/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4 text-sm leading-6 text-[#232323]">
                {annotation.content}
              </div>
              <div className="flex justify-end border-t border-[#C6AF87]/25 bg-[#F7F3F0] px-3 py-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveAnnotationId(null);
                    void deleteAnnotation(annotation);
                  }}
                  className="rounded-md bg-[#232323] px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {draft && (
        <div
          data-annotator-ui="true"
          className="fixed z-[10000] w-72 rounded-xl border border-[#C6AF87]/40 bg-white shadow-2xl"
          style={{ left: Math.min(draft.x, window.innerWidth - 304), top: Math.min(draft.y, window.innerHeight - 190) }}
        >
          <div className="flex items-center justify-between border-b border-[#C6AF87]/25 bg-[#F7F3F0] px-4 py-2 text-sm font-semibold text-[#232323]">
            Add comment
            <button onClick={() => setDraft(null)} className="rounded p-1 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-3">
            <textarea
              autoFocus
              value={draftContent}
              onChange={(event) => setDraftContent(event.currentTarget.value)}
              placeholder="Type your comment here..."
              className="h-24 w-full resize-none rounded-md border border-[#C6AF87]/45 p-2 text-sm text-[#232323] outline-none focus:border-[#C6AF87]"
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-[#C6AF87]/25 bg-[#F7F3F0] px-3 py-2">
            <button onClick={() => setDraft(null)} className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200">
              Cancel
            </button>
            <button disabled={isSaving || !draftContent.trim()} onClick={() => void saveDraft()} className="rounded-md bg-[#232323] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#C6AF87] hover:text-[#232323] disabled:cursor-not-allowed disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnotatorPlugin;
