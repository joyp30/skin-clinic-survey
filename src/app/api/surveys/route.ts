import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { SurveyFormData } from '@/types/types';

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

export async function DELETE(request: Request) {
  try {
    const { createdAts } = await request.json();
    
    if (!createdAts || !Array.isArray(createdAts)) {
       return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const surveys: SurveyFormData[] = (await kv.lrange('surveys', 0, -1)) || [];
    const newSurveys = surveys.filter(s => !createdAts.includes(s.createdAt));

    await kv.del('surveys');
    
    if (newSurveys.length > 0) {
      const pipeline = kv.pipeline();
      for (const survey of newSurveys) {
        pipeline.rpush('surveys', survey);
      }
      await pipeline.exec();
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete survey:', error);
    return NextResponse.json({ error: 'Failed to delete survey' }, { status: 500 });
  }
}
