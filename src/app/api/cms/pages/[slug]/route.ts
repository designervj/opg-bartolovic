import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "@/lib/apiProxy";
import pagesData from "@/data/pages.json";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const res = await proxyRequest(req, `api/cms/pages/${slug}`);
    if (res.status === 200) return res;
  } catch {}

  const page = pagesData.find((p) => p.slug === slug);
  return NextResponse.json({ success: true, data: page || null });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return proxyRequest(req, `api/cms/pages/${slug}`);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return proxyRequest(req, `api/cms/pages/${slug}`);
}
