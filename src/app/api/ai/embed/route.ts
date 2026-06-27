import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({ status: 'ok', endpoint: 'OpenAI Embeddings', message: 'Cognitive Kernel Route Active' });
}

export async function POST(req: Request) {
  return NextResponse.json({ status: 'ok', endpoint: 'OpenAI Embeddings', message: 'Cognitive Kernel Route Active' });
}
