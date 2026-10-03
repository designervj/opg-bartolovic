"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getPageData, PageData } from "@/lib/getPageData";
import { saveField } from "@/lib/store/pages/saveField";
import { SectionRenderer } from "@/components/cms/SectionRenderer/SectionRenderer";

interface CmsPageProps {
  slug: string;
  isEditable?: boolean;
  onNavigate?: (page: string) => void;
  onSelectProduct?: (product: any) => void;
}

export default function CmsPage({
  slug,
  isEditable: isEditableProp = false,
  onNavigate = () => {},
  onSelectProduct = () => {},
}: CmsPageProps) {
  const searchParams = useSearchParams();
  const isStudioPreview = searchParams.get("studio_preview") === "true";

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [liveSections, setLiveSections] = useState<any[] | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getPageData(slug).then((data) => {
      if (isMounted && data) {
        setPageData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Prevent link navigation inside studio preview iframe
  useEffect(() => {
    if (!isStudioPreview) return;
    const handleCaptureClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") {
        return;
      }
      const anchor = target?.closest("a");
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", handleCaptureClick, true);
    return () => document.removeEventListener("click", handleCaptureClick, true);
  }, [isStudioPreview]);

  // Two-way postMessage communication with Kalp-Admin Studio editor
  useEffect(() => {
    if (!isStudioPreview) return;

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "STUDIO_SYNC_SECTIONS" && Array.isArray(data.sections)) {
        setLiveSections(data.sections);
      } else if (data.type === "STUDIO_SELECT_SECTION") {
        setSelectedSectionId(data.sectionId || null);
        if (data.sectionId) {
          const el =
            document.getElementById(`section-${data.sectionId}`) ||
            document.querySelector(`[data-section-id="${data.sectionId}"]`);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "STUDIO_PREVIEW_READY", slug }, "*");
    }

    return () => window.removeEventListener("message", handleMessage);
  }, [isStudioPreview, slug]);

  const handleSave = useCallback(
    async (sectionId: string, fieldPath: string, value: string) => {
      if (!pageData) return;
      const updated = await saveField(pageData, sectionId, fieldPath, value);
      setPageData(updated);

      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "STUDIO_PROP_UPDATED",
            sectionId,
            fieldPath,
            value,
          },
          "*"
        );
      }
    },
    [pageData]
  );

  const displaySections = liveSections || pageData?.content || [];

  if (!pageData && !liveSections) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="animate-pulse text-amber-800 font-medium text-sm">
          Loading page data from Kalp-Admin CMS...
        </div>
      </div>
    );
  }

  return (
    <>
      {displaySections.map((section: any, idx: number) => {
        const isSelected = selectedSectionId === section.id;
        return (
          <div
            key={section.id || idx}
            id={`section-${section.id}`}
            data-section-id={section.id}
            onClick={() => {
              if (isStudioPreview && window.parent && window.parent !== window) {
                window.parent.postMessage(
                  { type: "STUDIO_SECTION_CLICKED", sectionId: section.id },
                  "*"
                );
              }
            }}
            className={`relative transition-all duration-200 ${
              isStudioPreview
                ? isSelected
                  ? "outline outline-3 outline-[#e11d48] outline-offset-[-3px] cursor-pointer"
                  : "hover:outline hover:outline-2 hover:outline-[#e11d48]/50 cursor-pointer"
                : ""
            }`}
          >
            {isStudioPreview && isSelected && (
              <div className="absolute top-2 left-2 z-50 bg-[#18181b] text-white px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider shadow-lg pointer-events-none">
                #{section.type} • {section.adminTitle || "Section"}
              </div>
            )}
            <SectionRenderer
              section={section}
              isEditable={isStudioPreview ? true : isEditableProp}
              onSave={handleSave}
              onNavigate={onNavigate}
              onSelectProduct={onSelectProduct}
            />
          </div>
        );
      })}
    </>
  );
}
