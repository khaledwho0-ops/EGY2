export interface DeepRealCase { // 1
  id: string; // 2
  title: string; // 3
  mediaType: string; // 4
  detectedLayers: string[]; // 5
  description: string; // 6
} // 7

export const chunk4: DeepRealCase = { // 8
  id: 'chunk-4', // 9
  title: 'Voice-Cloned Medical Advice (Spectrogram Match)', // 10
  mediaType: 'Video/Audio', // 11
  detectedLayers: ['pixel-noise', 'c2pa-manifest'], // 12
  description: 'DeepReal Case File 4 designed for rigorous six-layer forensic dismantling in Phase 2.' // 1
}; // 2
