/* Ambient type for *.geojson asset imports used by /the-descent.
 * The Egypt governorate asset (src/data/egypt-governorates.geojson) is
 * a plain GeoJSON FeatureCollection. Section builders may load it via
 * dynamic import() or fetch(); this declaration lets the import
 * typecheck. If the asset cannot be loaded at runtime the consuming
 * component FailLouds (see EgyptChoropleth). */
declare module '*.geojson' {
  const value: {
    type: 'FeatureCollection';
    features: Array<{
      type: 'Feature';
      properties: Record<string, unknown> & { name: string; iso: string };
      geometry: {
        type: 'Polygon' | 'MultiPolygon';
        coordinates: number[][][] | number[][][][];
      };
    }>;
  };
  export default value;
}
