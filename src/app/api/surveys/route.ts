import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const surveys = await kv.lrange('surveys', 0, -1);
    return NextResponse.json(surveys || []);
  } catch (error) {
    console.error('Failed to fetch surveys from KV:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Add to Redis list (newest will be prepended or appended. lpush prepends)
    await kv.lpush('surveys', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save survey to KV:', error);
    return NextResponse.json({ error: 'Failed to save survey' }, { status: 500 });
  }
}
