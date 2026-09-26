import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.NEXT_PUBLIC_TENANT_DB);
    const themeCollection = db.collection('site_themes');
    
    const theme = await themeCollection.findOne({ tenant_id: process.env.NEXT_PUBLIC_TENANT_DB });
    
    if (theme && theme.data) {
      return NextResponse.json(theme.data);
    } else {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
