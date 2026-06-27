export interface DeepRealCase { // 1
  id: string; // 2
  title: string; // 3
  mediaType: string; // 4
  detectedLayers: string[]; // 5
  description: string; // 6
} // 7

export const chunk2: DeepRealCase = { // 8
  id: 'chunk-2', // 9
  title: 'Forged WHO WhatsApp Alert (Panic Induction)', // 10
  mediaType: 'Video/Audio', // 11
  detectedLayers: ['pixel-noise', 'c2pa-manifest'], // 12
  description: 'DeepReal Case File 2 designed for rigorous six-layer forensic dismantling in Phase 1.' // 1
}; // 2
