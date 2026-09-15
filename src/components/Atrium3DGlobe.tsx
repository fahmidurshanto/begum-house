"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// 3D Holographic Globe & Bar Chart for ROI Pedestal
function HolographicGlobeAndBars() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y = t * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3;
      ring2Ref.current.rotation.y = Math.cos(t * 0.3) * 0.3;
    }
  });

  const bars = [
    { height: 0.5, pos: [-0.45, 0.25, 0.45], color: "#DFBE76" },
    { height: 0.8, pos: [-0.2, 0.4, 0.5], color: "#c5a869" },
    { height: 1.1, pos: [0.1, 0.55, 0.45], color: "#00E5FF" },
    { height: 1.4, pos: [0.35, 0.7, 0.35], color: "#DFBE76" },
  ];

  return (
    <group position={[0, -0.1, 0]}>
      {/* Pedestal Glowing Base Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <ringGeometry args={[1.0, 1.6, 64]} />
        <meshBasicMaterial color="#DFBE76" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#0E243D"
          emissive="#004488"
          emissiveIntensity={0.6}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Rotating Wireframe Globe */}
      <group ref={globeGroupRef} position={[0, 0.4, 0]}>
        <mesh>
          <sphereGeometry args={[0.78, 24, 24]} />
          <meshBasicMaterial
            color="#00E5FF"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Equator Gold Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.83, 48]} />
          <meshBasicMaterial color="#DFBE76" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Outer Orbiting Light Ring 1 */}
      <mesh ref={ringRef} position={[0, 0.4, 0]}>
        <ringGeometry args={[1.0, 1.04, 64]} />
        <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      {/* Outer Orbiting Light Ring 2 */}
      <mesh ref={ring2Ref} position={[0, 0.4, 0]}>
        <ringGeometry args={[1.15, 1.18, 64]} />
        <meshBasicMaterial color="#DFBE76" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>

      {/* Holographic Glowing Bars in front of sphere */}
      {bars.map((bar, idx) => (
        <mesh key={idx} position={bar.pos as [number, number, number]}>
          <boxGeometry args={[0.12, bar.height, 0.12]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Atrium3DGlobe() {
  return (
    <div className="w-full h-full relative">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 3.2]} fov={45} />
        <ambientLight intensity={0.9} />
        <pointLight position={[3, 3, 3]} intensity={2.5} color="#DFBE76" />
        <pointLight position={[-3, -1, -2]} intensity={2} color="#00E5FF" />
        <HolographicGlobeAndBars />
      </Canvas>
    </div>
  );
}

