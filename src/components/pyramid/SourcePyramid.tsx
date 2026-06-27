"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const TIERS = [
  { tier: "S", height: 5, color: "#0c4a6e", label: "Living Authorities (WHO, Cochrane, Al-Azhar)" },
  { tier: "1", height: 4, color: "#0369a1", label: "Peer-Reviewed Primary (Cochrane SR, NEJM, Lancet)" },
  { tier: "2", height: 3, color: "#0284c7", label: "Credentialed Secondary (CDC, MoH Egypt)" },
  { tier: "3", height: 2, color: "#0ea5e9", label: "Quality Journalism (Reuters, AP)" },
  { tier: "4", height: 1, color: "#7dd3fc", label: "Aggregators — jump-off only" },
  { tier: "5", height: 0.5, color: "#94a3b8", label: "Social media — zero evidence" },
];

function Pyramid({ highlightTier }: { highlightTier?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Memory cleanup pattern: explicit dispose for geometries/materials on unmount
  useEffect(() => {
    const group = groupRef.current;
    return () => {
      group?.traverse((o: any) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m: any) => m.dispose());
          else o.material.dispose();
        }
      });
    };
  }, []);

  return (
    <group ref={groupRef}>
      {TIERS.map((t, index) => {
        const w = (TIERS.length - index) * 1.2;
        const prevHeights = TIERS.slice(0, index).reduce((acc, curr) => acc + curr.height, 0);
        const meshY = prevHeights + t.height / 2; 
        const isHi = highlightTier === t.tier;
        return (
          <mesh key={t.tier} position={[0, meshY, 0]}>
            <boxGeometry args={[w, t.height, w]} />
            <meshStandardMaterial color={t.color} emissive={isHi ? t.color : "#000"} emissiveIntensity={isHi ? 1.5 : 0} />
            <Text position={[w / 2 + 0.5, 0, 0]} fontSize={0.3} color="black">{t.label}</Text>
          </mesh>
        );
      })}
    </group>
  );
}

export function SourcePyramid3D({ highlightTier }: { highlightTier?: string }) {
  return (
    <div className="w-full h-96 bg-slate-50 rounded shadow-inner">
      <Canvas camera={{ position: [10, 8, 10], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Pyramid highlightTier={highlightTier} />
        <OrbitControls enableZoom={true} enablePan={false} />
        {/* Bloom is selective — only emissive (highlighted tier) glows */}
        <EffectComposer><Bloom intensity={0.5} luminanceThreshold={0.9} mipmapBlur /></EffectComposer>
      </Canvas>
    </div>
  );
}
