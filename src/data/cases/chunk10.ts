export interface DeepRealCase { // 1
  id: string; // 2
  title: string; // 3
  mediaType: string; // 4
  detectedLayers: string[]; // 5
  description: string; // 6
} // 7

export const chunk10: DeepRealCase = { // 8
  id: 'chunk-10', // 9
  title: 'Voice-Cloned Phishing Call (Emotional Urgency)', // 10
  mediaType: 'Video/Audio', // 11
  detectedLayers: ['pixel-noise', 'c2pa-manifest'], // 12
  description: 'DeepReal Case File 10 designed for rigorous six-layer forensic dismantling in Phase 4.' // 1
}; // 2
