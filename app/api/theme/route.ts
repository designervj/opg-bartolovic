import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

function extractLogoUrl(blueprint: Record<string, any>): string {
  return (
    blueprint?.business?.brand?.logoUrl ||
    blueprint?.business?.brand?.logoRef ||
    blueprint?.brandKit?.logo?.primary ||
    blueprint?.brandKit?.logo?.icon ||
    blueprint?.brandAssets?.logoUrl ||
    blueprint?.brandAssets?.logo ||
    blueprint?.publicProfile?.logoUrl ||
    blueprint?.publicProfile?.logo ||
    blueprint?.logoUrl ||
    blueprint?.logo_url ||
    ''
  );
}

export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.NEXT_PUBLIC_TENANT_DB || process.env.TENANT_DB_NAME || 'kp_opg_bartolovic';
    const db = client.db(dbName);
    
    // 1. Try business_blueprints (source of truth)
    const blueprint = await db.collection('business_blueprints').findOne({ document_key: 'blueprint' }) || await db.collection('business_blueprints').findOne({});
    if (blueprint) {
      const public_theme = blueprint.public_theme || blueprint.experience?.public?.theme || (blueprint.business?.brand?.colors ? { colors: blueprint.business.brand.colors } : null);
      const logoUrl = extractLogoUrl(blueprint);
      if (public_theme) {
        return NextResponse.json({ public_theme, logoUrl }, { headers: { 'cache-control': 'no-store' } });
      }
    }

    // 2. Try site_themes
    const theme = await db.collection('site_themes').findOne({});
    if (theme && (theme.data || theme.public_theme)) {
      const public_theme = theme.data?.public_theme || theme.public_theme || theme.data;
      const logoUrl = theme.logoUrl || theme.logo_url || '';
      return NextResponse.json({ public_theme, logoUrl }, { headers: { 'cache-control': 'no-store' } });
    }

    // 3. Try tenant_registry
    const registry = await db.collection('tenant_registry').findOne({ type: 'branding' });
    if (registry) {
      return NextResponse.json({ public_theme: { colors: registry }, logoUrl: '' }, { headers: { 'cache-control': 'no-store' } });
    }

    return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
