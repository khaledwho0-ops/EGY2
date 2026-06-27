import { NextResponse } from 'next/server';
import { ERR } from '@/lib/api/api-error';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return ERR.missingQuery();

    // The user's specific methodology: inject '%' to find any doctor regardless of full ID card name
    const searchName = name.trim().split(' ').filter(Boolean).join('%') + '%';

    let html = '';
    try {
      const res = await fetch(`https://ems.org.eg/ar/inquiries/doctor-specialist?name=${encodeURIComponent(searchName)}`, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(8000)
      });
      if (res.ok) {
        html = await res.text();
      }
    } catch (fetchErr) {
      console.warn('EMS Fetch Error (SSL/Maintenance):', fetchErr);
    }

    // If no HTML was returned, we cannot produce real results — fail loud instead of fabricating.
    if (!html) {
      return NextResponse.json(
        {
          ok: false,
          results: [],
          degraded: true,
          source: null,
          error: 'Egyptian Medical Syndicate (ems.org.eg) unavailable — غير متاح حالياً',
          errorAr: 'موقع نقابة الأطباء غير متاح حالياً. لا يمكن التحقق من التسجيل.',
          errorEn: 'Egyptian Medical Syndicate website is currently unavailable. Registration cannot be verified.',
        },
        { status: 503 }
      );
    }

    // Real HTML was fetched — a proper parser (e.g. Cheerio) would extract <td> rows here.
    // Until that parser is implemented, return an explicit unverified state rather than fabricating.
    return NextResponse.json(
      {
        ok: false,
        results: [],
        degraded: true,
        source: null,
        error: 'HTML parsing not yet implemented — لم يتم تطبيق تحليل HTML بعد',
        errorAr: 'جُلبت بيانات النقابة لكن لم يتم تحليلها بعد. لا يمكن إعطاء نتيجة موثوقة.',
        errorEn: 'Syndicate HTML was fetched but parsing is not yet implemented. No reliable result can be returned.',
      },
      { status: 503 }
    );
  } catch (err: any) {
    console.error('Medical Syndicate API Error:', err);
    return ERR.fetchFailed('Egyptian Medical Syndicate');
  }
}
