import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const getTenantCookieNames = () => {
  const dbName = (process.env.TENANT_DB_NAME || process.env.DB_NAME || 'opg_bartolovic').trim();
  return new Set([
    `${dbName}_auth_token`,
    `auth_token_${dbName}`,
  ]);
};

export async function GET(request: NextRequest) {
  const authCookieNames = getTenantCookieNames();
  const cookies = request.cookies.getAll();
  const isAuthenticated = cookies.some((cookie) => {
    if (!cookie.value) return false;
    return authCookieNames.has(cookie.name);
  });

  return NextResponse.json({ isAuthenticated });
}
