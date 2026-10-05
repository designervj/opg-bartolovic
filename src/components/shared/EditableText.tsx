'use client';

import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

type EditableTag = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'strong';

interface EditableTextProps {
  value: string | Record<string, string> | undefined | null;
  isEditable?: boolean;
  onSave?: (value: string) => void | boolean | Promise<void | boolean>;
  className?: string;
  tag?: EditableTag;
  placeholder?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const getTextValue = (value: EditableTextProps['value'], fallback = '') => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value.en || Object.values(value)[0] || fallback;
  return fallback;
};

export default function EditableText({
  value,
  isEditable = false,
  onSave,
  className = '',
  tag: Tag = 'span',
  placeholder = '',
  style,
  children,
}: EditableTextProps) {
  const incomingValue = getTextValue(value, typeof children === 'string' ? children : placeholder);
  const [editing, setEditing] = useState(false);
  const [displayValue, setDisplayValue] = useState(incomingValue);
  const [editValue, setEditValue] = useState(incomingValue);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLElement>(null);
  const savingRef = useRef(false);

  useEffect(() => {
    if (editing) return;
    setDisplayValue(incomingValue);
    setEditValue(incomingValue);
  }, [editing, incomingValue]);

  useEffect(() => {
    if (!editing) return;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, [editing]);

  const startEditing = (event?: React.MouseEvent<HTMLElement>) => {
    if (!isEditable) return;
    event?.preventDefault();
    event?.stopPropagation();
    setEditing(true);
    setEditValue(displayValue);
  };

  const cancelEditing = () => {
    setEditValue(displayValue);
    setEditing(false);
  };

  const handleSave = async () => {
    if (savingRef.current) return;
    const nextValue = (inputRef.current?.value ?? editValue).trim();
    if (!nextValue || nextValue === displayValue) {
      cancelEditing();
      return;
    }

    const previousValue = displayValue;
    savingRef.current = true;
    setIsSaving(true);
    setDisplayValue(nextValue);

    try {
      const result = await Promise.resolve(onSave?.(nextValue));
      if (result === false) {
        setDisplayValue(previousValue);
        setEditValue(previousValue);
      }
    } catch {
      setDisplayValue(previousValue);
      setEditValue(previousValue);
    } finally {
      savingRef.current = false;
      setIsSaving(false);
      setEditing(false);
    }
  };

  useEffect(() => {
    if (!editing) return;

    const closeFromOutside = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node | null;
      if (target && editorRef.current?.contains(target)) return;
      void handleSave();
    };

    document.addEventListener('pointerdown', closeFromOutside, true);
    document.addEventListener('contextmenu', closeFromOutside, true);
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside, true);
      document.removeEventListener('contextmenu', closeFromOutside, true);
    };
  }, [editing, editValue, displayValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSave();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing();
    }
  };

  const editableClassName = `${className} ${isEditable ? 'editable-text' : ''} ${editing ? 'editable-text-active' : ''}`.trim();

  if (editing) {
    return (
      <Tag ref={editorRef as any} className={editableClassName} style={style}>
        <input
          ref={inputRef}
          value={editValue}
          disabled={isSaving}
          onChange={(event) => setEditValue(event.currentTarget.value)}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={handleKeyDown as any}
          className="editable-inline-input"
          style={{ width: `${Math.max(editValue.length, displayValue.length, placeholder.length, 2) + 1}ch` }}
        />
        <span className="editable-actions" onMouseDown={(event) => event.preventDefault()}>
          <button
            type="button"
            className="editable-save-btn"
            disabled={isSaving}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void handleSave();
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="editable-cancel-btn"
            disabled={isSaving}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              cancelEditing();
            }}
          >
            Cancel
          </button>
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      className={editableClassName}
      role={isEditable ? 'textbox' : undefined}
      tabIndex={isEditable ? 0 : undefined}
      onClick={startEditing}
      onDoubleClick={startEditing}
      onKeyDown={handleKeyDown}
      style={style}
    >
      {displayValue || children || placeholder}
    </Tag>
  );
}
