export interface DeepRealCase { // 1
  id: string; // 2
  title: string; // 3
  mediaType: string; // 4
  detectedLayers: string[]; // 5
  description: string; // 6
} // 7

export const chunk1: DeepRealCase = { // 8
  id: 'chunk-1', // 9
  title: 'Fabricated Religious Sermon (Deepfake Sheikh)', // 10
  mediaType: 'Image/Text', // 11
  detectedLayers: ['pixel-noise', 'c2pa-manifest'], // 12
  description: 'DeepReal Case File 1 designed for rigorous six-layer forensic dismantling in Phase 1.' // 1
}; // 2
