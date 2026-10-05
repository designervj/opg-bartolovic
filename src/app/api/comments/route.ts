import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

import clientPromise from '@/lib/db';
import { getConfiguredDatabaseName } from '@/lib/database-authority';

export const dynamic = 'force-dynamic';

const COLLECTION = 'page_review_comments';

type CommentDocument = {
  _id?: ObjectId | string;
  pageSlug: string;
  slug: string;
  pageId?: string | null;
  selector: string;
  offsetX: number;
  offsetY: number;
  x?: number;
  y?: number;
  content: string;
  status: 'open' | 'pending' | 'done';
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'all';
  createdAt?: Date;
  updatedAt?: Date;
};

const serializeComment = (comment: CommentDocument) => ({
  ...comment,
  _id: String(comment._id),
  id: String(comment._id),
  createdAt: comment.createdAt?.toISOString?.() ?? comment.createdAt,
  updatedAt: comment.updatedAt?.toISOString?.() ?? comment.updatedAt,
});

const idFilter = (id: string) => (ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id });

async function getCollection() {
  const client = await clientPromise;
  return client.db(getConfiguredDatabaseName()).collection<CommentDocument>(COLLECTION);
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') || undefined;
  const collection = await getCollection();
  const comments = await collection
    .find(slug ? { pageSlug: slug } : {})
    .sort({ createdAt: 1 })
    .toArray();

  return NextResponse.json({ success: true, comments: comments.map(serializeComment) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const pageSlug = body.pageSlug || body.slug;

  if (!pageSlug || !body.content) {
    return NextResponse.json({ success: false, detail: 'Missing required comment fields.' }, { status: 422 });
  }

  const now = new Date();
  const comment: CommentDocument = {
    pageSlug,
    slug: pageSlug,
    pageId: body.pageId || null,
    selector: body.selector || 'body',
    offsetX: Number(body.offsetX ?? 0),
    offsetY: Number(body.offsetY ?? 0),
    x: Number(body.x ?? 0),
    y: Number(body.y ?? 0),
    content: String(body.content).trim(),
    status: body.status || 'open',
    screenSize: body.screenSize || 'all',
    createdAt: now,
    updatedAt: now,
  };

  const collection = await getCollection();
  const result = await collection.insertOne(comment);

  return NextResponse.json(
    { success: true, comment: serializeComment({ ...comment, _id: result.insertedId }) },
    { status: 201 },
  );
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, detail: 'Comment id is required.' }, { status: 422 });
  }

  const collection = await getCollection();
  await collection.deleteOne(idFilter(id));

  return NextResponse.json({ success: true, id });
}
