import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const geo = searchParams.get('geo') || 'EG'; // Default to Egypt
    
    // Fetch live Google Trends RSS feed for specified geo
    const res = await fetch(`https://trends.google.com/trending/rss?geo=${geo}`, {
      // Revalidate every 5 minutes
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch trends: ${res.status}`);
    }
    
    const xml = await res.text();
    
    // Parse the XML using simple RegEx to avoid large external dependencies
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      const titleMatch = itemXml.match(/<title>(.*?)<\/title>/);
      const trafficMatch = itemXml.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/);
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      
      if (titleMatch) {
        items.push({
          title: titleMatch[1].replace('<![CDATA[', '').replace(']]>', '').trim(),
          traffic: trafficMatch ? trafficMatch[1].replace('<![CDATA[', '').replace(']]>', '').trim() : 'Unknown',
          pubDate: pubDateMatch ? pubDateMatch[1].trim() : '',
        });
      }
    }
    
    return NextResponse.json({ success: true, data: items });
  } catch (err: any) {
    console.error('Trends API Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
