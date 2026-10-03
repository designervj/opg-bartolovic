import { cache } from "react";
import pagesData from "@/data/pages.json";

export interface PageSection {
  id: string;
  type: string;
  adminTitle?: string;
  props?: Record<string, any>;
  content?: any[];
}

export interface PageData {
  slug: string;
  title: Record<string, string> | string;
  metaTitle?: Record<string, string> | string;
  metaDescription?: Record<string, string> | string;
  isPublished?: boolean;
  isHomepage?: boolean;
  content: PageSection[];
}

const FASTAPI_URL = (process.env.FASTAPI_URL || "http://127.0.0.1:8000").replace(
  /\/$/,
  "",
);

function apiHeaders(): HeadersInit {
  const databaseName = process.env.TENANT_DB_NAME || process.env.DB_NAME || "opg_bartolovic";

  return {
    "Content-Type": "application/json",
    "x-tenant-db": databaseName,
  };
}

async function fetchApi<T>(path: string, revalidate = 0): Promise<T | null> {
  try {
    const response = await fetch(`${FASTAPI_URL}/${path}`, {
      headers: apiHeaders(),
      next: { revalidate },
    });

    if (!response.ok) return null;

    const body = (await response.json()) as Record<string, unknown>;
    return (body.data !== undefined ? body.data : body) as T;
  } catch {
    return null;
  }
}

export const getPageData = cache(async (slug: string): Promise<PageData | null> => {
  // First try fetching from kalp-admin API backend
  const apiPage = await fetchApi<PageData | PageData[]>(
    `api/cms/pages?slug=${encodeURIComponent(slug)}`,
  );
  if (apiPage) {
    const found = Array.isArray(apiPage)
      ? apiPage.find((p) => p.slug === slug) ?? null
      : apiPage;
    if (found) return found;
  }

  // Fallback to local pages.json dataset
  const localPages = pagesData as PageData[];
  return localPages.find((page) => page.slug === slug) || null;
});

export const getBusinessBlueprint = cache(async () => {
  const blueprint = await fetchApi<Record<string, any>>("platform/business-blueprint", 60);
  return blueprint || null;
});
