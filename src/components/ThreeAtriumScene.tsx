"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Division } from "@/data/divisions";

interface ThreeAtriumSceneProps {
  divisions: Division[];
  onSelectDivision: (division: Division) => void;
  onOpenConsultation: (topic: string) => void;
  onOpenRoiModal: () => void;
}

// 3D Glass Pod Component
function GlassPod3D({
  position,
  division,
  podNumber,
  onSelect,
}: {
  position: [number, number, number];
  division: Division;
  podNumber: string;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* 3D Glass Structure */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onSelect}
      >
        <boxGeometry args={[2.4, 1.8, 1.8]} />
        <meshPhysicalMaterial
          color={hovered ? "#DFBE76" : "#0E243D"}
          transmission={0.6}
          opacity={0.85}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Gold Outline Frame */}
      <mesh>
        <boxGeometry args={[2.45, 1.85, 1.85]} />
        <meshBasicMaterial
          color={hovered ? "#DFBE76" : "#c5a869"}
          wireframe
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* 3D Floating HTML Label inside the 3D pod */}
      <Html position={[0, 0, 0.95]} center transform distanceFactor={6}>
        <div
          onClick={onSelect}
          className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-300 backdrop-blur-md text-center w-56 ${
            hovered
              ? "bg-[#DFBE76] text-[#071526] border-[#DFBE76] shadow-[0_0_25px_rgba(223,190,118,0.8)] scale-105"
              : "bg-[#071526]/90 text-white border-[#c5a869]/50 hover:border-[#DFBE76]"
          }`}
        >
          <div className="text-[9px] font-mono font-bold tracking-widest text-[#DFBE76] uppercase mb-1">
            {podNumber}
          </div>
          <div className="text-xs font-serif font-bold line-clamp-2 uppercase">
            {division.title}
          </div>
          <div className="text-[9px] text-slate-300 italic mt-1 line-clamp-1">
            {division.tagline}
          </div>
        </div>
      </Html>
    </group>
  );
}

// 3D Central Staircase & Pillar Structure
function CentralStaircase3D() {
  return (
    <group position={[0, 0.5, -2]}>
      {/* Central Pillar Wall */}
      <mesh position={[0, 1.5, -0.5]}>
        <boxGeometry args={[3, 3, 0.4]} />
        <meshStandardMaterial color="#0B1C31" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Gold Wall Crest Emblem */}
      <mesh position={[0, 2.2, -0.2]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#DFBE76" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Curved Staircase Steps */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`l-${i}`} position={[-1.8 - i * 0.2, i * 0.2, i * 0.1]}>
          <boxGeometry args={[0.8, 0.15, 0.6]} />
          <meshStandardMaterial color="#DFBE76" roughness={0.4} />
        </mesh>
      ))}

      {/* Right Curved Staircase Steps */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`r-${i}`} position={[1.8 + i * 0.2, i * 0.2, i * 0.1]}>
          <boxGeometry args={[0.8, 0.15, 0.6]} />
          <meshStandardMaterial color="#DFBE76" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// 3D Center Pedestal & ROI Hologram
function HolographicPedestal3D({ onOpenRoiModal }: { onOpenRoiModal: () => void }) {
  const pedestalRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pedestalRef.current) {
      pedestalRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group position={[0, -0.5, 0]} onClick={onOpenRoiModal} className="cursor-pointer">
      {/* Base Circular Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.3, 32]} />
        <meshStandardMaterial color="#0E243D" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Glowing Gold Orbiting Rings */}
      <group ref={pedestalRef} position={[0, 0.5, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.2, 1.25, 64]} />
          <meshBasicMaterial color="#DFBE76" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>

        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <ringGeometry args={[1.5, 1.54, 64]} />
          <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* 3D Label */}
      <Html position={[0, 0.8, 0]} center transform distanceFactor={5}>
        <div
          onClick={onOpenRoiModal}
          className="cursor-pointer bg-[#071526]/95 border-2 border-[#DFBE76] px-5 py-2.5 rounded-full text-center shadow-[0_0_30px_rgba(223,190,118,0.7)] hover:scale-110 transition-transform"
        >
          <div className="text-[10px] font-serif font-bold text-[#DFBE76] tracking-widest uppercase">
            INSIGHTS ATRIUM
          </div>
          <div className="text-xs font-bold text-white uppercase">
            3D ROI CALCULATOR
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function ThreeAtriumScene({
  divisions,
  onSelectDivision,
  onOpenConsultation,
  onOpenRoiModal,
}: ThreeAtriumSceneProps) {
  return (
    <div className="w-full h-[650px] md:h-[750px] lg:h-[850px] relative rounded-3xl overflow-hidden border-2 border-[#c5a869]/30 shadow-2xl bg-[#030A14]">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 8]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#DFBE76" />
        <pointLight position={[-5, 3, -2]} intensity={1} color="#00E5FF" />
        <pointLight position={[5, -2, 2]} intensity={1} color="#DFBE76" />

        {/* 3D Floor Grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[25, 25]} />
          <meshStandardMaterial color="#050E1A" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* 3D Central Staircase Architecture */}
        <CentralStaircase3D />

        {/* 3D Center Pedestal */}
        <HolographicPedestal3D onOpenRoiModal={onOpenRoiModal} />

        {/* Left Wing 3D Pods */}
        {divisions[0] && (
          <GlassPod3D
            position={[-4, 1.5, 0]}
            division={divisions[0]}
            podNumber="POD 01"
            onSelect={() => onSelectDivision(divisions[0])}
          />
        )}
        {divisions[1] && (
          <GlassPod3D
            position={[-3.6, -0.2, 1.5]}
            division={divisions[1]}
            podNumber="POD 02"
            onSelect={() => onSelectDivision(divisions[1])}
          />
        )}
        {divisions[2] && (
          <GlassPod3D
            position={[-4.5, -0.2, -1.5]}
            division={divisions[2]}
            podNumber="POD 03"
            onSelect={() => onSelectDivision(divisions[2])}
          />
        )}

        {/* Right Wing 3D Pods */}
        {divisions[3] && (
          <GlassPod3D
            position={[4, 1.5, 0]}
            division={divisions[3]}
            podNumber="POD 04"
            onSelect={() => onSelectDivision(divisions[3])}
          />
        )}
        {divisions[4] && (
          <GlassPod3D
            position={[3.6, -0.2, 1.5]}
            division={divisions[4]}
            podNumber="POD 05"
            onSelect={() => onSelectDivision(divisions[4])}
          />
        )}
        {divisions[5] && (
          <GlassPod3D
            position={[4.5, -0.2, -1.5]}
            division={divisions[5]}
            podNumber="POD 06"
            onSelect={() => onSelectDivision(divisions[5])}
          />
        )}

        {/* Interactive 3D Camera Controls */}
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 6}
          maxDistance={12}
          minDistance={4}
        />
      </Canvas>
    </div>
  );
}
