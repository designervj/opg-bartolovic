import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const getDatabaseName = () => (process.env.TENANT_DB_NAME || process.env.DB_NAME || 'opg_bartolovic').trim();

export async function POST() {
  const dbName = getDatabaseName();
  const response = NextResponse.json({ success: true });

  response.cookies.set(`${dbName}_auth_token`, '', { path: '/', maxAge: 0 });
  response.cookies.set(`auth_token_${dbName}`, '', { path: '/', maxAge: 0 });

  return response;
}
