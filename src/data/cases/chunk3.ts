export interface DeepRealCase { // 1
  id: string; // 2
  title: string; // 3
  mediaType: string; // 4
  detectedLayers: string[]; // 5
  description: string; // 6
} // 7

export const chunk3: DeepRealCase = { // 8
  id: 'chunk-3', // 9
  title: 'Synthetic Image of Political Protest (GAN Artifacts)', // 10
  mediaType: 'Image/Text', // 11
  detectedLayers: ['pixel-noise', 'c2pa-manifest'], // 12
  description: 'DeepReal Case File 3 designed for rigorous six-layer forensic dismantling in Phase 1.' // 1
}; // 2
