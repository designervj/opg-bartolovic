import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const getDatabaseName = () => (process.env.TENANT_DB_NAME || process.env.DB_NAME || 'opg_bartolovic').trim();
const getTenantSlug = () => (process.env.TENANT_SLUG || process.env.NEXT_PUBLIC_TENANT_SLUG || 'opg-bartolovic').trim();

const getAuthUrl = () => {
  const rawApiBase = (
    process.env.KALP_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.FASTAPI_URL ||
    'https://bizlive.kalptree.xyz'
  ).replace(/\/+$/, '');

  return rawApiBase.endsWith('/api') ? `${rawApiBase}/auth/login` : `${rawApiBase}/api/auth/login`;
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 422 });
  }

  const dbName = getDatabaseName();
  const tenantSlug = getTenantSlug();
  let loginData: any;

  try {
    const authResponse = await fetch(getAuthUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'x-tenant-db': dbName,
        'x-tenant-slug': tenantSlug,
      },
      body: JSON.stringify({
        email,
        password,
        tenant_slug: tenantSlug,
        keepSignedIn: false,
        keep_signed_in: false,
      }),
    });

    loginData = await authResponse.json().catch(() => null);

    if (!authResponse.ok || !loginData?.access_token) {
      return NextResponse.json(
        {
          success: false,
          message: loginData?.detail || loginData?.message || 'Invalid Kalp Admin credentials.',
        },
        { status: authResponse.status === 200 ? 401 : authResponse.status },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unable to connect to Kalp Admin authentication.' },
      { status: 502 },
    );
  }

  const response = NextResponse.json({ success: true });
  const maxAge = 60 * 60 * 24 * 7;
  const token = String(loginData.access_token);

  response.cookies.set(`${dbName}_auth_token`, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
  response.cookies.set(`auth_token_${dbName}`, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge,
  });

  return response;
}
