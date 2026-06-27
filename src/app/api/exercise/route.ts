import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Base dirs we allow
const ALLOWED_BASE_DIRS = [
  path.join(process.cwd(), 'src', 'data', 'exercises'),
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  const subdir = searchParams.get('subdir') ?? '';

  if (!file) {
    return NextResponse.json({ error: 'Missing file param' }, { status: 400 });
  }

  // Build candidate path
  const base = ALLOWED_BASE_DIRS[0];
  const candidate = subdir
    ? path.resolve(base, subdir, file)
    : path.resolve(base, file);

  // Security: ensure within allowed base
  if (!candidate.startsWith(base)) {
    return NextResponse.json({ error: 'Forbidden path' }, { status: 403 });
  }

  try {
    const content = await fs.readFile(candidate, 'utf-8');
    const json = JSON.parse(content);
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: `File not found: ${file}` }, { status: 404 });
  }
}
