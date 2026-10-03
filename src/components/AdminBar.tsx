"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Edit3,
  Eye,
  EyeOff,
} from "lucide-react";

interface AdminBarProps {
  isEditable?: boolean;
  onToggleEditMode?: (isEditable: boolean) => void;
}

export function AdminBar({
  isEditable = false,
  onToggleEditMode = () => {},
}: AdminBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCommentModeActive, setIsCommentModeActive] = useState(false);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{ backgroundColor: "#063A1D" }}
        className="fixed top-3 right-3 z-[10000] flex items-center gap-2 px-4 h-8 border border-white/20 text-white/80 rounded-full transition-all duration-200 hover:scale-105 hover:text-white font-semibold text-[11px] shadow-lg shadow-black/40 cursor-pointer"
        title="Show Admin Bar"
      >
        <Eye className="w-3.5 h-3.5 text-[#98c45f]" />
        <span>Show Admin Bar</span>
      </button>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#063A1D" }}
      className="w-full text-white text-[13px] font-sans border-b border-white/10 relative z-[9999] select-none"
    >
      <div 
        className="w-full px-2 sm:px-4 h-11 flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap"
      >
        {/* Left — Dashboard link */}
        <div className="flex items-center shrink-0">
          <a
            href="https://zero.kalptree.xyz/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 font-bold uppercase tracking-wider text-[11px]"
          >
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0 text-[#98c45f]" />
            <span className="hidden sm:inline">KALP-ADMIN DASHBOARD</span>
            <span className="sm:hidden">ADMIN</span>
          </a>
        </div>

        {/* Right — Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Comments toggle */}
          <button
            onClick={() => setIsCommentModeActive(!isCommentModeActive)}
            style={
              isCommentModeActive
                ? { borderColor: "#98c45f", color: "#98c45f", backgroundColor: "rgba(152,196,95,0.1)" }
                : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", backgroundColor: "rgba(255,255,255,0.05)" }
            }
            className="h-7 px-2 sm:px-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all border text-[11px] font-semibold hover:opacity-90 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span>Comments</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => onToggleEditMode(!isEditable)}
            style={
              isEditable
                ? { backgroundColor: "#98c45f", borderColor: "#98c45f", color: "#063A1D", boxShadow: "0 0 12px rgba(152,196,95,0.45)" }
                : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", backgroundColor: "rgba(255,255,255,0.05)" }
            }
            className="h-7 px-2 sm:px-3 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-semibold border hover:opacity-90 shrink-0 cursor-pointer"
            title={isEditable ? "Disable edit mode" : "Enable edit mode"}
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
            <span>Edit Mode {isEditable ? "ON" : "OFF"}</span>
          </button>

          {/* Divider */}
          <span className="text-white/20 select-none">|</span>

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
          style={{ backgroundColor: "#98c45f", color: "#063A1D" }}
          className="w-full text-center py-1.5 text-[12px] font-semibold border-t border-white/10"
        >
          ✨ Inline editing is active. Hover over text elements and click to update.
        </div>
      )}
    </div>
  );
}

export default AdminBar;
