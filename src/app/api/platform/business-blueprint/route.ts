import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "@/lib/apiProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const res = await proxyRequest(req, "platform/business-blueprint");
    if (res.status === 200) return res;
  } catch {}

  return NextResponse.json({
    success: true,
    data: {
      tenant_slug: "opg-bartolovic",
      document_key: "blueprint-v2",
      brandAssets: {
        siteName: "OPG Bartolović",
        tagline: "Prirodni Pčelinji Proizvodi"
      }
    }
  });
}
