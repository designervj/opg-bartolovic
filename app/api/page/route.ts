import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || 'home';
    
    const client = await clientPromise;
    const db = client.db(process.env.NEXT_PUBLIC_TENANT_DB);
    const pagesCollection = db.collection('site_pages');
    
    const pageData = await pagesCollection.findOne({ 
      tenant_id: process.env.NEXT_PUBLIC_TENANT_DB,
      name: slug 
    });
    
    if (pageData && pageData.content) {
      return NextResponse.json(pageData.content);
    } else {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
