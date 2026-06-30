import * as cheerio from "cheerio";

export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

/**
 * SerpAPI (Google) search — reliable from Vercel serverless IPs, unlike scraping
 * DuckDuckGo HTML which is routinely rate-limited (429/202) from datacenter ranges,
 * leaving the OSINT graph with ZERO sources. Used as PRIMARY when the key exists.
 */
async function searchViaSerpApi(query: string): Promise<SearchResult[]> {
  const key = process.env.SERPAPI_API_KEY;
  if (!key) return [];
  try {
    const url = new URL("https://serpapi.com/search");
    url.searchParams.set("engine", "google");
    url.searchParams.set("q", query);
    url.searchParams.set("num", "10");
    url.searchParams.set("api_key", key);
    const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      console.warn(`SerpAPI returned ${res.status} for "${query}".`);
      return [];
    }
    const json = await res.json();
    const organic = Array.isArray(json?.organic_results) ? json.organic_results : [];
    return organic
      .filter((r: { link?: string; title?: string }) => r?.link && r?.title)
      .map((r: { title: string; snippet?: string; link: string }) => ({
        title: r.title,
        snippet: r.snippet || "",
        url: r.link,
      }));
  } catch (e) {
    console.error(`SerpAPI exception for "${query}":`, e);
    return [];
  }
}

/**
 * Meta-Search tool. PRIMARY: SerpAPI (Google) when SERPAPI_API_KEY is set —
 * works reliably from serverless. FALLBACK: DuckDuckGo HTML Lite.
 * Built to bypass strict rate limits gracefully and return clean search results.
 */
export async function executeMetaSearch(query: string): Promise<SearchResult[]> {
  // PRIMARY: SerpAPI (real Google results, serverless-friendly)
  const serp = await searchViaSerpApi(query);
  if (serp.length > 0) return serp;

  // FALLBACK: DuckDuckGo HTML scrape
  try {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`https://html.duckduckgo.com/html/?${params.toString()}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status >= 500) {
        console.warn(`Search Tool Warning: DuckDuckGo returned ${response.status} for query "${query}". Degrading gracefully.`);
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: SearchResult[] = [];

    $('.result').each((_, el) => {
      const node = $(el);
      
      const title = node.find('.result__title a').text().trim();
      const snippet = node.find('.result__snippet').text().trim();
      const rawUrl = node.find('.result__url').attr('href') || node.find('.result__title a').attr('href');

      if (title && snippet && rawUrl) {
        let cleanUrl = rawUrl;
        
        // Extract the actual URL from DuckDuckGo's redirect wrapper (e.g. /l/?uddg=https%3A%2F%2F...)
        if (cleanUrl.includes('uddg=')) {
          try {
            const urlObj = new URL(`https:${cleanUrl.startsWith('//') ? cleanUrl : `//duckduckgo.com${cleanUrl}`}`);
            const uddg = urlObj.searchParams.get('uddg');
            if (uddg) {
              cleanUrl = decodeURIComponent(uddg);
            }
          } catch (e) {
            // Fallback if URL parsing fails
          }
        } else if (!cleanUrl.startsWith('http')) {
          cleanUrl = `https://${cleanUrl}`;
        }

        results.push({
          title,
          snippet,
          url: cleanUrl
        });
      }
    });

    return results;
  } catch (error) {
    console.error(`Search Tool Exception for query "${query}":`, error);
    // Silent fail to allow the LangGraph orchestration to continue unharmed
    return [];
  }
}
