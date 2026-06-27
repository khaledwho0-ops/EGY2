const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const APP_DIR = path.join(SRC_DIR, 'app');
const LIB_DIR = path.join(SRC_DIR, 'lib');
const CONTENT_DIR = path.join(SRC_DIR, 'content');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

const safeWrite = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`Skipped existing file: ${filePath}`);
  }
};

const getPageSkeleton = (title) => `import React from 'react';

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl w-full space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">${title}</h1>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 animate-pulse"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg w-full animate-pulse mt-8 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
           <span className="text-gray-500 font-mono text-sm">Under Construction / Engine Core Integration Pending</span>
        </div>
      </div>
    </div>
  );
}
`;

const getApiSkeleton = (name) => `import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({ status: 'ok', endpoint: '${name}', message: 'Cognitive Kernel Route Active' });
}

export async function POST(req: Request) {
  return NextResponse.json({ status: 'ok', endpoint: '${name}', message: 'Cognitive Kernel Route Active' });
}
`;

const getLibSkeleton = (name) => `// ${name} Core Module Placeholder
export const init${name.replace(/[^a-zA-Z0-9]/g, '')} = () => {
  console.log('[Cognitive Kernel] ${name} subsystem initialized.');
};
`;

const getMdxSkeleton = (title) => `---
title: "${title}"
description: "Core structural content for ${title}"
status: "draft"
---

# ${title}

This file is part of the Cognitive Kernel content mesh. Verifiable content will be injected here as per the production blueprint.
`;

// Routes to create
const routes = [
  { p: '(marketing)/methodology', t: 'Methodology' },
  { p: '(marketing)/corrections', t: 'Corrections Log' },
  { p: '(marketing)/transparency', t: 'Transparency & Governance' },
  { p: '(engines)/deepreal', t: 'DeepReal Engine (Verification)' },
  { p: '(engines)/mental-health', t: 'Mental Health Engine (Understanding)' },
  { p: '(engines)/religion', t: 'Religion Hub (Meaning)' },
  { p: '(kernel)/audit', t: 'Cognitive Audit' },
  { p: '(kernel)/journal', t: 'Verification Journal' },
  { p: '(kernel)/skills', t: 'Cognitive Skills Dashboard' }
];

routes.forEach(({ p, t }) => {
  const dir = path.join(APP_DIR, p);
  ensureDir(dir);
  safeWrite(path.join(dir, 'page.tsx'), getPageSkeleton(t));
});

// APIs to create
const apis = [
  { p: 'api/ai/chat', n: 'Vercel AI SDK Chat' },
  { p: 'api/ai/debunker', n: 'OSINT Debunker Pipeline' },
  { p: 'api/ai/archive', n: 'Wayback Machine Archive' },
  { p: 'api/ai/embed', n: 'OpenAI Embeddings' },
  { p: 'api/crisis', n: 'Crisis Interrupt' },
  { p: 'api/mist', n: 'MIST Scoring Endpoint' },
  { p: 'api/srs', n: 'Spaced Repetition Scheduler' }
];

apis.forEach(({ p, n }) => {
  const dir = path.join(APP_DIR, p);
  ensureDir(dir);
  safeWrite(path.join(dir, 'route.ts'), getApiSkeleton(n));
});

// Libs to create
const libs = [
  'ai', 'cognition', 'verification', 'safety', 'provenance', 'kv', 'schemas'
];

libs.forEach(l => {
  const dir = path.join(LIB_DIR, l);
  ensureDir(dir);
  safeWrite(path.join(dir, 'index.ts'), getLibSkeleton(l));
});

// Content folders to create
const contentDirs = [
  { d: 'deepreal', n: 'Verification Overview' },
  { d: 'mental-health', n: 'DSM-5-TR Alignment Index' },
  { d: 'religion', n: 'Wasatiyya Foundation' }
];

ensureDir(CONTENT_DIR);
contentDirs.forEach(({ d, n }) => {
  const dir = path.join(CONTENT_DIR, d);
  ensureDir(dir);
  safeWrite(path.join(dir, 'index.mdx'), getMdxSkeleton(n));
});

console.log('\\n--- Scaffold Complete ---');
