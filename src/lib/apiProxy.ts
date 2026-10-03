import { NextRequest, NextResponse } from "next/server";
import { getConfiguredDatabaseName } from "@/lib/database-authority";

const FASTAPI_URL = (
  process.env.FASTAPI_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

async function getTenantHeaders(): Promise<Record<string, string>> {
  return { "Content-Type": "application/json" };
}

export async function fetchWithTenant(url: string, options: RequestInit = {}): Promise<unknown> {
  const tenantHeaders = await getTenantHeaders();
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    headers: {
      ...tenantHeaders,
      ...((options.headers as Record<string, string>) || {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function proxyRequest(
  req: NextRequest,
  targetPath: string,
  options: { addApiPrefix?: boolean } = {},
) {
  let databaseName: string;
  try {
    databaseName = getConfiguredDatabaseName();
  } catch {
    databaseName = "opg_bartolovic";
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const baseBackendUrl = options.addApiPrefix
    ? `${FASTAPI_URL}/api`
    : FASTAPI_URL;
  const url = `${baseBackendUrl}/${targetPath}${searchParams ? `?${searchParams}` : ""}`;

  const headers = new Headers();

  const headersToForward = [
    "authorization",
    "cookie",
    "content-type",
    "accept",
    "tenant-slug",
    "tenant_slug",
    "auth-token",
    "idempotency-key",
  ];

  headersToForward.forEach((headerName) => {
    const value = req.headers.get(headerName);
    if (value) {
      headers.set(headerName, value);
    }
  });

  headers.set("x-tenant-db", databaseName);

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: headers,
  };

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    try {
      const contentType = req.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const body = await req.json();
        fetchOptions.body = JSON.stringify(body);
      } else {
        fetchOptions.body = await req.blob();
      }
    } catch {}
  }

  try {
    const response = await fetch(url, fetchOptions);
    let nextResponse: NextResponse;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      nextResponse = NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      nextResponse = new NextResponse(text, {
        status: response.status,
        headers: { "Content-Type": contentType || "text/plain" },
      });
    }

    return nextResponse;
  } catch (error) {
    console.error(`[Proxy Error] ${url}:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}
