import { NextRequest, NextResponse } from 'next/server';
import { getConfiguredDatabaseName } from '@/lib/database-authority';

export const dynamic = 'force-dynamic';

const getTenantSlug = () => (process.env.TENANT_SLUG || process.env.NEXT_PUBLIC_TENANT_SLUG || 'opg-bartolovic').trim();

const getApiBase = () => (
  process.env.KALP_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.FASTAPI_URL ||
  'https://bizlive.kalptree.xyz'
).replace(/\/+$/, '');

const getSsoUrls = () => {
  const apiBase = getApiBase();
  return apiBase.endsWith('/api')
    ? [`${apiBase}/auth/sso/create`, `${apiBase.replace(/\/api$/, '')}/auth/sso/create`]
    : [`${apiBase}/api/auth/sso/create`, `${apiBase}/auth/sso/create`];
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return NextResponse.json({ success: false, message: 'Authorization token is required.' }, { status: 401 });
  }

  const dbName = getConfiguredDatabaseName();
  const tenantSlug = getTenantSlug();
  let lastPayload: any = null;
  let lastStatus = 502;

  for (const url of getSsoUrls()) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          authorization,
          'x-tenant-db': dbName,
          'x-tenant-slug': tenantSlug,
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      const payload = await response.json().catch(() => null);
      lastPayload = payload;
      lastStatus = response.status;

      if (response.ok) {
        return NextResponse.json(payload || { success: true });
      }
    } catch (error) {
      lastPayload = { success: false, message: 'Unable to connect to Kalp Admin SSO.' };
      lastStatus = 502;
    }
  }

  return NextResponse.json(
    lastPayload || { success: false, message: 'Failed to establish admin session.' },
    { status: lastStatus },
  );
}
