import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "@/lib/apiProxy";
import pagesData from "@/data/pages.json";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");

  try {
    const res = await proxyRequest(req, "api/cms/pages");
    if (res.status === 200) return res;
  } catch {}

  // Fallback to local JSON format
  if (slug) {
    const page = pagesData.find((p) => p.slug === slug);
    return NextResponse.json({ success: true, data: page || null });
  }

  return NextResponse.json({ success: true, data: pagesData });
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "api/cms/pages");
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req, "api/cms/pages");
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req, "api/cms/pages");
}
