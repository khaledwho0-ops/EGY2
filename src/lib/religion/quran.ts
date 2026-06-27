export async function loadAyat(surah: string, ayatRange: number[]): Promise<string[]> {
  const verses = await Promise.all(
    ayatRange.map(async (ayah) => {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/en.asad`);
        if (!res.ok) return `Error fetching verse ${ayah}`;
        const data = await res.json();
        return data.data.text;
      } catch (err) {
        return `Failed to load verse ${ayah}`;
      }
    })
  );
  return verses;
}

export function parseRange(rangeStr: string): number[] {
  const parts = rangeStr.split("-");
  if (parts.length === 1) return [parseInt(parts[0], 10)];
  const start = parseInt(parts[0], 10);
  const end = parseInt(parts[1], 10);
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}
