"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Edit3,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";
import { AnnotatorPlugin } from "@/components/annotationPlugin/AnnotatorPlugin";

interface AdminBarProps {
  isEditable?: boolean;
  onToggleEditMode?: (isEditable: boolean) => void;
}

export function AdminBar({
  isEditable = false,
  onToggleEditMode = () => {},
}: AdminBarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCommentModeActive, setIsCommentModeActive] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const adminBg = "var(--app-admin-bg, #C6AF87)";
  const adminAccent = "var(--app-admin-accent, #C6AF87)";

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams(window.location.search);
    const isStudioPreview = params.get('studio_preview') === 'true';

    fetch('/api/admin/session', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!isMounted) return;
        setIsAuthenticated(Boolean(payload?.isAuthenticated || isStudioPreview));
      })
      .catch(() => {
        if (!isMounted) return;
        setIsAuthenticated(isStudioPreview);
      })
      .finally(() => {
        if (isMounted) setIsAuthChecked(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthChecked || isAuthenticated) return;
    setIsCommentModeActive(false);
    if (isEditable) onToggleEditMode(false);
  }, [isAuthChecked, isAuthenticated, isEditable, onToggleEditMode]);

  const handleCommentToggle = () => {
    const nextCommentMode = !isCommentModeActive;
    setIsCommentModeActive(nextCommentMode);
    if (nextCommentMode && isEditable) {
      onToggleEditMode(false);
    }
  };

  const handleEditToggle = () => {
    const nextEditMode = !isEditable;
    onToggleEditMode(nextEditMode);
    if (nextEditMode) {
      setIsCommentModeActive(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => null);
    setIsCommentModeActive(false);
    onToggleEditMode(false);
    setIsAuthenticated(false);
  };

  if (!isAuthChecked || !isAuthenticated) {
    return null;
  }

  if (!isVisible) {
    return (
      <>
        <button
          onClick={() => setIsVisible(true)}
          className="fixed top-3 right-3 z-[10000] bg-primary flex items-center gap-2 px-4 h-8 border border-white/20 text-white/80 rounded-full transition-all duration-200 hover:scale-105 hover:text-white font-semibold text-[11px] shadow-lg shadow-black/40 cursor-pointer"
          title="Show Admin Bar"
        >
          <Eye className="w-3.5 h-3.5" style={{ color: adminAccent }} />
          <span>Show Admin Bar</span>
        </button>
        <AnnotatorPlugin isActive={isCommentModeActive} onCountChange={setCommentCount} />
      </>
    );
  }

  return (
    <div
      data-annotator-ui="true"
      className="w-full text-white text-[12px] sm:text-[13px] bg-foreground font-sans border-b border-white/10 relative z-[9999] select-none"
    >
      <div 
        className="w-full px-2 sm:px-4 h-10 sm:h-11 flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Left — Dashboard link */}
        <div className="flex items-center shrink-0">
          <a
            href="/kalptree"
            className="flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white transition-colors duration-200 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]"
          >
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" style={{ color: adminAccent }} />
            <span className="hidden sm:inline">KALP-ADMIN DASHBOARD</span>
            <span className="sm:hidden">ADMIN</span>
          </a>
        </div>

        {/* Right — Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Comments toggle */}
          <button
            onClick={handleCommentToggle}
            style={
              isCommentModeActive
                ? { borderColor: adminAccent, color: adminAccent, backgroundColor: "color-mix(in srgb, var(--app-admin-accent, #C6AF87) 16%, transparent)" }
                : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", backgroundColor: "rgba(255,255,255,0.05)" }
            }
            className="h-7 px-2 sm:px-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all border text-[10px] sm:text-[11px] font-semibold hover:opacity-90 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{isCommentModeActive ? "Hide Comments" : `Comments (${commentCount})`}</span>
            <span className="sm:hidden">{commentCount}</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={handleEditToggle}
            style={
              isEditable
                ? { backgroundColor: adminAccent, borderColor: adminAccent, color: adminBg, boxShadow: "0 0 12px color-mix(in srgb, var(--app-admin-accent, #C6AF87) 45%, transparent)" }
                : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", backgroundColor: "rgba(255,255,255,0.05)" }
            }
            className="h-7 px-2 sm:px-3 rounded-full flex items-center gap-1.5 transition-all text-[10px] sm:text-[11px] font-semibold border hover:opacity-90 shrink-0 cursor-pointer"
            title={isEditable ? "Disable edit mode" : "Enable edit mode"}
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Edit Mode {isEditable ? "ON" : "OFF"}</span>
            <span className="sm:hidden">{isEditable ? "ON" : "OFF"}</span>
          </button>

          {/* Divider */}
          <span className="hidden sm:inline text-white/20 select-none">|</span>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="h-7 px-2 sm:px-3 rounded-full flex items-center gap-1.5 transition-all border border-white/20 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white text-[10px] sm:text-[11px] font-semibold shrink-0 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Hide button */}
          <button
            onClick={() => setIsVisible(false)}
            className="h-7 w-7 rounded-full flex items-center justify-center bg-transparent text-white/70 hover:bg-white/15 hover:text-white transition-all shrink-0 cursor-pointer"
            title="Hide Admin Bar"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Edit mode banner */}
      {isEditable && (
        <div
          style={{ backgroundColor: adminAccent, color: adminBg }}
          className="w-full text-center px-3 py-1.5 text-[11px] sm:text-[12px] font-semibold border-t border-white/10"
        >
          ✨ Inline editing is active. Hover over text elements and click to update.
        </div>
      )}
      <AnnotatorPlugin isActive={isCommentModeActive} onCountChange={setCommentCount} />
    </div>
  );
}

export default AdminBar;
