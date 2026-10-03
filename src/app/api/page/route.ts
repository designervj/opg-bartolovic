import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || searchParams.get('name') || 'home';
    
    const client = await clientPromise;
    const dbName = process.env.NEXT_PUBLIC_TENANT_DB || process.env.TENANT_DB_NAME || 'kp_opg_bartolovic';
    const db = client.db(dbName);
    
    const pageData = await db.collection('site_pages').findOne({ 
      $or: [
        { name: slug },
        { slug: slug },
        { page_slug: slug },
        { document_key: slug }
      ]
    }) || await db.collection('pages').findOne({
      $or: [
        { name: slug },
        { slug: slug },
        { page_slug: slug },
        { document_key: slug }
      ]
    });
    
    if (pageData) {
      const responseData = pageData.content || pageData.payload || pageData;
      return NextResponse.json(responseData, { headers: { 'cache-control': 'no-store' } });
    } else {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
