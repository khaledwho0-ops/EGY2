/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ESM-only packages must not be bundled by webpack — they error with
  // "require() of ES Module" on Next 15.5+ serverless. Add any package the
  // build complains about here.
  serverExternalPackages: ["natural", "tesseract.js", "duck-duck-scrape", "cheerio", "exifr", "isomorphic-dompurify"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Parse *.geojson assets (e.g. src/data/egypt-governorates.geojson used by
  // /the-descent) as JSON modules. Without this, `import('*.geojson')` fails
  // with "Module parse failed" because webpack has no loader for the ext.
  webpack: (config: { module: { rules: unknown[] } }) => {
    config.module.rules.push({ test: /\.geojson$/, type: "json" });
    return config;
  },
  // Mirror the same for Turbopack (next dev --turbo / Next 15 default).
  turbopack: {
    rules: {
      "*.geojson": { loaders: ["json-loader"], as: "*.json" },
    },
  },
};
export default nextConfig;
