"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { useHouseStore } from "@/store/useHouseStore";
import { SERVICE_ROOMS } from "@/data/houseData";
import { ArrowRight, Calculator, Globe, ArrowUpRight, ChevronRight, Layers, Cpu, Compass, HeartPulse, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

// Hotspot icon helper
const renderBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case "Layers": return <Layers className="w-4 h-4" />;
    case "TrendingUp": return <TrendingUp className="w-4 h-4" />;
    case "Cpu": return <Cpu className="w-4 h-4" />;
    case "Compass": return <Compass className="w-4 h-4" />;
    case "HeartPulse": return <HeartPulse className="w-4 h-4" />;
    case "Briefcase": return <Briefcase className="w-4 h-4" />;
    case "GraduationCap": return <GraduationCap className="w-4 h-4" />;
    default: return <ChevronRight className="w-4 h-4" />;
  }
};

// 1. Procedural 3D Mansion Exterior Facade & Opening Doors
function ExteriorFacade3D({ isDoorsOpen, onOpen }: { isDoorsOpen: boolean; onOpen: () => void }) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const targetRot = isDoorsOpen ? 1.55 : 0;
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        -targetRot,
        delta * 3.5
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRot,
        delta * 3.5
      );
    }
  });

  return (
    <group position={[0, -1, 3]}>
      {/* Stone Plaza Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 3]}>
        <planeGeometry args={[26, 16]} />
        <meshStandardMaterial color="#e8e1d5" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Main Facade Wall */}
      <mesh position={[0, 4, 2]}>
        <boxGeometry args={[22, 9, 0.6]} />
        <meshStandardMaterial color="#f0e9dd" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Roof Pediment Gable */}
      <mesh position={[0, 8.8, 2.3]} rotation-z={Math.PI / 4}>
        <boxGeometry args={[5, 5, 0.4]} />
        <meshStandardMaterial color="#e5ded0" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 8.2, 2.6]}>
        <boxGeometry args={[7.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 4 Grand Columns */}
      {[-4.5, -2.2, 2.2, 4.5].map((x, i) => (
        <group key={i} position={[x, 3.2, 2.6]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.4, 7.5, 20]} />
            <meshStandardMaterial color="#faf6f0" roughness={0.2} metalness={0.3} />
          </mesh>
          <mesh position={[0, 3.75, 0]}>
            <cylinderGeometry args={[0.5, 0.4, 0.35, 20]} />
            <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -3.75, 0]}>
            <cylinderGeometry args={[0.5, 0.4, 0.35, 20]} />
            <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 3D Double Opening Doors */}
      <group position={[0, -0.6, 2.5]}>
        {/* Frame */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[3.2, 3.8, 0.3]} />
          <meshStandardMaterial color="#3a2518" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Entrance Cavity */}
        <mesh position={[0, 1.6, -0.1]}>
          <boxGeometry args={[2.7, 3.4, 0.1]} />
          <meshBasicMaterial color="#1a1a2e" />
        </mesh>

        {/* Left Door Panel */}
        <group ref={leftDoorRef} position={[-1.35, 1.6, 0.15]}>
          <mesh position={[0.675, 0, 0]}>
            <boxGeometry args={[1.35, 3.4, 0.12]} />
            <meshStandardMaterial color="#4a2e1b" roughness={0.25} metalness={0.7} />
          </mesh>
          <mesh position={[0.675, 0.5, 0.07]}>
            <boxGeometry args={[1.0, 1.1, 0.02]} />
            <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Right Door Panel */}
        <group ref={rightDoorRef} position={[1.35, 1.6, 0.15]}>
          <mesh position={[-0.675, 0, 0]}>
            <boxGeometry args={[1.35, 3.4, 0.12]} />
            <meshStandardMaterial color="#4a2e1b" roughness={0.25} metalness={0.7} />
          </mesh>
          <mesh position={[-0.675, 0.5, 0.07]}>
            <boxGeometry args={[1.0, 1.1, 0.02]} />
            <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Floating 3D Door-Mounted CTA */}
        {!isDoorsOpen && (
          <Html position={[0, 1.6, 0.35]} center distanceFactor={10}>
            <button
              onClick={onOpen}
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.25em] text-[#1a1a2e] bg-gradient-to-r from-[#c5a869] via-[#e8d5a7] to-[#c5a869] rounded-full shadow-[0_0_30px_rgba(197,168,105,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/60 cursor-pointer animate-pulse whitespace-nowrap"
            >
              <span>OPEN THE HOUSE</span>
              <ArrowRight className="w-4 h-4 text-[#1a1a2e] group-hover:translate-x-1 transition-transform" />
            </button>
          </Html>
        )}
      </group>
    </group>
  );
}

// 2. Procedural 3D Atrium Interior Environment
function InteriorAtrium3D({ isInside }: { isInside: boolean }) {
  if (!isInside) return null;

  return (
    <group position={[0, -1, -3]}>
      {/* Light Cream Marble Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#e8dfd1" roughness={0.15} metalness={0.4} />
      </mesh>
      
      {/* Floor Gold Ring Grid */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.49, 0]}>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshBasicMaterial color="#c5a869" />
      </mesh>

      {/* Pillars */}
      {[-6, -3, 3, 6].map((x, i) => (
        <group key={i} position={[x, 2, -2]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.35, 6, 16]} />
            <meshStandardMaterial color="#faf6f0" roughness={0.25} metalness={0.3} />
          </mesh>
          <mesh position={[0, 2.8, 0]}>
            <cylinderGeometry args={[0.4, 0.35, 0.3, 16]} />
            <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Mezzanine Balcony */}
      <group position={[0, 2, -5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[14, 0.4, 3]} />
          <meshStandardMaterial color="#f0e9dd" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 1.4]}>
          <boxGeometry args={[14, 0.6, 0.08]} />
          <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// 3. Central 3D ROI Hologram Kiosk Mesh
function HologramKioskMesh({ isVisible, onSelect }: { isVisible: boolean; onSelect: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.8;
  });

  if (!isVisible) return null;

  return (
    <group position={[0, -0.6, -2]} onClick={onSelect}>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh ref={ringRef} position={[0, -0.15, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.9, 1.1, 32]} />
        <meshBasicMaterial color="#00d4ff" wireframe />
      </mesh>

      <group ref={meshRef} position={[0, 0.3, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[(i - 1.5) * 0.3, 0.4, 0]}>
            <boxGeometry args={[0.15, 0.8, 0.15]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      <pointLight color="#00d4ff" intensity={4} distance={6} />

      <Html position={[0, 1.4, 0]} center distanceFactor={12}>
        <button
          onClick={onSelect}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1a1a2e] border border-[#00d4ff] text-[#00d4ff] text-xs font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
        >
          <Calculator className="w-4 h-4 animate-bounce text-[#00d4ff]" />
          <span>ROI Hologram Kiosk</span>
        </button>
      </Html>
    </group>
  );
}

// 4. Interactive 3D Globe
function AtriumGlobeMesh({ isVisible, onSelect }: { isVisible: boolean; onSelect: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3;
  });

  if (!isVisible) return null;

  return (
    <group position={[0, 2.2, -5.5]} onClick={onSelect}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial color="#c5a869" wireframe transparent opacity={0.85} />
      </mesh>
      <pointLight color="#c5a869" intensity={3.5} distance={6} />

      <Html position={[0, 1.5, 0]} center distanceFactor={12}>
        <button
          onClick={onSelect}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#faf6f0] border border-[#c5a869] text-[#1a1a2e] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform backdrop-blur-md shadow-xl"
        >
          <Globe className="w-4 h-4 text-[#c5a869] animate-spin-slow" />
          <span>Global Opportunities</span>
        </button>
      </Html>
    </group>
  );
}

// 5. Continuous Seamless 3D Camera Fly-Through Rig
function SeamlessCameraRig() {
  const { view, scrollProgress } = useHouseStore();

  useFrame((state) => {
    // Calculate 3D camera Z target:
    // If FACADE: Z=11.5 (Exterior)
    // If ATRIUM or OPEN: Z=3.5 (Inside Atrium) -> Z=-1.0 (Deep Kiosk Closeup)
    let targetZ = 11.5;
    let targetY = 1.0;

    if (view === "ATRIUM") {
      targetZ = THREE.MathUtils.lerp(11.5, -1.0, Math.min(1, scrollProgress * 1.3));
      targetY = THREE.MathUtils.lerp(1.0, 0.1, scrollProgress);
    }

    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.25;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);

    state.camera.lookAt(0, 0.5, -3);
  });
  return null;
}

export const House3DScene: React.FC = () => {
  const { view, scrollProgress, openHouse, setIsRoiModalOpen, setIsGlobalModalOpen } = useHouseStore();
  const isDoorsOpen = view === "ATRIUM" || scrollProgress > 0.1;
  const isInside = view === "ATRIUM" || scrollProgress > 0.2;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 1, 11.5]} fov={48} />
        <SeamlessCameraRig />

        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 12, 10]} intensity={2.2} color="#fff8e7" />

        <Sparkles count={150} scale={18} size={3.5} speed={0.35} color="#c5a869" />

        {/* 1. Exterior Facade & 3D Opening Doors */}
        <ExteriorFacade3D isDoorsOpen={isDoorsOpen} onOpen={openHouse} />

        {/* 2. Interior Procedural Atrium */}
        <InteriorAtrium3D isInside={isInside} />

        {/* 3. 3D WebGL Hologram Kiosk & Globe */}
        <HologramKioskMesh isVisible={isInside} onSelect={() => setIsRoiModalOpen(true)} />
        <AtriumGlobeMesh isVisible={isInside} onSelect={() => setIsGlobalModalOpen(true)} />
      </Canvas>
    </div>
  );
};
