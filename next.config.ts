/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["natural", "tesseract.js"],
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
