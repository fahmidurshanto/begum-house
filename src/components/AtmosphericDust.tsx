"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// A component that rotates the group slowly to give a drifting feel
function DustGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, subtle rotation to make the dust feel like it's drifting
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Front layer: Larger, faster, sparser */}
      <Sparkles
        count={60}
        scale={12}
        size={4}
        speed={0.2}
        opacity={0.4}
        color="#F5E4BE"
        noise={0.1}
      />
      {/* Mid layer: Dense, small, slow */}
      <Sparkles
        count={150}
        scale={15}
        size={1.5}
        speed={0.1}
        opacity={0.3}
        color="#DFBE76"
        noise={0.2}
      />
      {/* Deep layer: Background ambiance */}
      <Sparkles
        count={80}
        scale={20}
        size={6}
        speed={0.05}
        opacity={0.15}
        color="#c5a869"
        noise={0.05}
      />
    </group>
  );
}

export default function AtmosphericDust() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* We use a subtle radial gradient mask so the particles fade out near the edges of the container */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)"
        }}
      >
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <DustGroup />
        </Canvas>
      </div>
    </div>
  );
}
