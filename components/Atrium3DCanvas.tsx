"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useHouseStore } from "@/store/useHouseStore";
import { SERVICE_ROOMS, ServiceRoom } from "@/data/houseData";
import { Calculator, Globe, ChevronRight, Layers, Cpu, Compass, HeartPulse, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

// 1. Refined Lobby Glazed Brass/Glass Opening Door matching Lobby Architecture
function LobbyRoom3DDoor({
  room,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  isSelected,
  onSelect,
}: {
  room: ServiceRoom;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const targetRot = isSelected || hovered ? 1.45 : 0;
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
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 1. Polished Metallic Gold Outer Arch Frame (Shorter Height) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.65, 0.05]} />
        <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.15} />
      </mesh>
      
      {/* 2. Warm Cream/Golden Interior Illuminated Void */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.38, 1.55, 0.04]} />
        <meshBasicMaterial color={hovered ? "#fff5e6" : "#f5ebd6"} />
      </mesh>
      <pointLight position={[0, 0, 0.2]} color="#ffeed0" intensity={hovered || isSelected ? 3.5 : 2.0} distance={3.5} />

      {/* 3. Left Crystal Clear Gold Glazed Glass Door Panel */}
      <group ref={leftDoorRef} position={[-0.69, 0, 0.03]}>
        {/* Crystal Clear Glass Sheet */}
        <mesh position={[0.345, 0, 0]}>
          <boxGeometry args={[0.69, 1.53, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.9} transparent opacity={0.35} />
        </mesh>
        {/* Polished Gold Inset Border Trim */}
        <mesh position={[0.345, 0, 0.02]}>
          <boxGeometry args={[0.65, 1.49, 0.005]} />
          <meshStandardMaterial color="#c5a869" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Vertical Brass Pull Handle */}
        <mesh position={[0.60, 0, 0.04]}>
          <cylinderGeometry args={[0.012, 0.012, 0.55, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>

      {/* 4. Right Crystal Clear Gold Glazed Glass Door Panel */}
      <group ref={rightDoorRef} position={[0.69, 0, 0.03]}>
        {/* Crystal Clear Glass Sheet */}
        <mesh position={[-0.345, 0, 0]}>
          <boxGeometry args={[0.69, 1.53, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.9} transparent opacity={0.35} />
        </mesh>
        {/* Polished Gold Inset Border Trim */}
        <mesh position={[-0.345, 0, 0.02]}>
          <boxGeometry args={[0.65, 1.49, 0.005]} />
          <meshStandardMaterial color="#c5a869" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Vertical Brass Pull Handle */}
        <mesh position={[-0.60, 0, 0.04]}>
          <cylinderGeometry args={[0.012, 0.012, 0.55, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>

      {/* 5. Door Header Mounted Sleek Gold Service Plaque */}
      <Html position={[0, 1.0, 0.1]} center distanceFactor={10}>
        <button
          onClick={onSelect}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-300 shadow-2xl cursor-pointer whitespace-nowrap ${
            hovered || isSelected
              ? "bg-[#c5a869] border-white text-[#071322] scale-110 shadow-[#c5a869]/60"
              : "bg-[#071322]/95 border-[#c5a869]/80 text-slate-100"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a869] animate-pulse" />
          <span className="text-[10px] font-extrabold tracking-wider uppercase">{room.title}</span>
          <ChevronRight className="w-3 h-3 text-[#c5a869] group-hover:text-[#071322]" />
        </button>
      </Html>
    </group>
  );
}

// 2. High-Resolution Lobby Artwork Texture Plane (`lobby.png`)
function LobbyArtworkPlane() {
  const texture = useTexture("/sources/lobby.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[20, 11.25]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

// 3. Central 3D ROI Hologram Kiosk Mesh
function HologramKioskMesh({ onSelect }: { onSelect: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.8;
  });

  return (
    <group position={[0, -1.2, 1.2]} onClick={onSelect} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh ref={ringRef} position={[0, -0.15, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.9, 1.1, 32]} />
        <meshBasicMaterial color={hovered ? "#00ffff" : "#00d4ff"} wireframe />
      </mesh>

      <group ref={meshRef} position={[0, 0.3, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[(i - 1.5) * 0.3, 0.4, 0]}>
            <boxGeometry args={[0.15, 0.8, 0.15]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      <pointLight color="#00d4ff" intensity={hovered ? 6 : 4} distance={6} />

      <Html position={[0, 1.4, 0]} center distanceFactor={12}>
        <button
          onClick={onSelect}
          className={`group flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-2xl ${
            hovered
              ? "bg-[#00d4ff]/30 border-[#00d4ff] text-[#00ffff] scale-110 shadow-[#00d4ff]/50"
              : "bg-[#1a1a2e] border-[#00d4ff]/60 text-[#00d4ff]"
          }`}
        >
          <Calculator className="w-4 h-4 animate-bounce text-[#00d4ff]" />
          <span className="text-[11px] font-bold tracking-widest uppercase">
            ROI Hologram Kiosk
          </span>
        </button>
      </Html>
    </group>
  );
}

// 4. Interactive 3D Global Opportunities Globe
function AtriumGlobeMesh({ onSelect }: { onSelect: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={[0, 2.5, -2]} onClick={onSelect} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color={hovered ? "#e5cf96" : "#c5a869"} wireframe transparent opacity={0.85} />
      </mesh>
      <pointLight color="#c5a869" intensity={3.5} distance={6} />

      <Html position={[0, 1.5, 0]} center distanceFactor={12}>
        <button
          onClick={onSelect}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#071322]/90 border border-[#c5a869] text-[#c5a869] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform backdrop-blur-md shadow-xl"
        >
          <Globe className="w-4 h-4 text-[#c5a869] animate-spin-slow" />
          <span>Global Opportunities</span>
        </button>
      </Html>
    </group>
  );
}

// 5. Camera Rig
function CameraRig() {
  const { scrollProgress } = useHouseStore();

  useFrame((state) => {
    const targetZ = THREE.MathUtils.lerp(9.5, 3.5, Math.min(1, scrollProgress * 1.5));
    const targetY = THREE.MathUtils.lerp(0, -0.2, scrollProgress);

    const mouseX = state.mouse.x * 0.35;
    const mouseY = state.mouse.y * 0.2;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const LOBBY_DOOR_CONFIGS: { id: string; pos: [number, number, number]; rot?: [number, number, number]; scale?: [number, number, number] }[] = [
  // LEFT SIDE (3 Doors)
  { id: "shared-services", pos: [-6.8, -1.2, 0.3], rot: [0, 0.35, 0], scale: [0.95, 1.15, 1.0] },
  { id: "finance-ops", pos: [-4.6, 0.7, -0.1], rot: [0, 0.25, 0], scale: [0.85, 1.0, 0.9] },
  { id: "business-advisory", pos: [-2.6, -1.9, 0.5], rot: [0, 0.12, 0], scale: [0.8, 0.95, 0.85] },

  // RIGHT SIDE (4 Doors)
  { id: "tech-ai", pos: [2.6, -1.9, 0.5], rot: [0, -0.12, 0], scale: [0.8, 0.95, 0.85] },
  { id: "architecture-design", pos: [4.6, 0.7, -0.1], rot: [0, -0.25, 0], scale: [0.85, 1.0, 0.9] },
  { id: "mental-health", pos: [6.8, -1.2, 0.3], rot: [0, -0.35, 0], scale: [0.95, 1.15, 1.0] },
  { id: "education-training", pos: [8.2, 0.8, 0.1], rot: [0, -0.4, 0], scale: [0.8, 0.95, 0.85] },
];

export const Atrium3DCanvas: React.FC = () => {
  const { selectedRoom, setSelectedRoom, setIsRoiModalOpen, setIsGlobalModalOpen, returnToFacade, scrollProgress } = useHouseStore();

  return (
    <div className="relative w-full h-screen bg-[#040b14] overflow-hidden">
      
      {/* Top Control Bar */}
      <div className="absolute top-24 left-6 z-30 flex items-center gap-4">
        <button
          onClick={returnToFacade}
          className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest rounded bg-[#071322]/90 text-[#c5a869] border border-[#c5a869] hover:bg-[#c5a869] hover:text-[#071322] transition-all backdrop-blur-md shadow-lg cursor-pointer"
        >
          ← Return to Facade
        </button>

        <div className="flex items-center gap-2 bg-[#071322]/90 px-3 py-1.5 rounded border border-[#c5a869]/40 text-xs text-slate-300 font-mono">
          <span>Corridor Depth:</span>
          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#c5a869] to-[#00d4ff] transition-all duration-150" style={{ width: `${Math.round(scrollProgress * 100)}%` }} />
          </div>
          <span className="text-[#c5a869] font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* Pure WebGL 3D Canvas Scene */}
      <Canvas className="w-full h-full z-10">
        <PerspectiveCamera makeDefault position={[0, 0, 9.5]} fov={48} />
        <CameraRig />

        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 8, 6]} intensity={1.5} color="#f4ecd8" />

        <Sparkles count={150} scale={16} size={3.5} speed={0.4} color="#c5a869" />

        <Suspense fallback={null}>
          <LobbyArtworkPlane />
        </Suspense>

        {/* 7 Calibrated Glazed Brass/Glass WebGL 3D Opening Doors */}
        {SERVICE_ROOMS.map((room) => {
          const doorConfig = LOBBY_DOOR_CONFIGS.find((d) => d.id === room.id);
          if (!doorConfig) return null;
          return (
            <LobbyRoom3DDoor
              key={room.id}
              room={room}
              position={doorConfig.pos}
              rotation={doorConfig.rot}
              scale={doorConfig.scale}
              isSelected={selectedRoom?.id === room.id}
              onSelect={() => setSelectedRoom(room)}
            />
          );
        })}

        <HologramKioskMesh onSelect={() => setIsRoiModalOpen(true)} />
        <AtriumGlobeMesh onSelect={() => setIsGlobalModalOpen(true)} />
      </Canvas>

      {/* Bottom Atrium Footer Ribbon */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-6 py-3 rounded-full bg-[#071322]/95 border border-[#c5a869]/50 text-xs text-slate-100 font-bold backdrop-blur-md shadow-xl">
        <span className="text-[#c5a869]">LOBBY FEATURES:</span>
        <button onClick={() => setIsRoiModalOpen(true)} className="hover:text-[#c5a869] flex items-center gap-1.5 transition-colors font-medium">
          <Calculator className="w-3.5 h-3.5 text-[#00d4ff]" /> ROI Calculator
        </button>
        <span className="text-[#c5a869]">|</span>
        <button onClick={() => setIsGlobalModalOpen(true)} className="hover:text-[#c5a869] flex items-center gap-1.5 transition-colors font-medium">
          <Globe className="w-3.5 h-3.5 text-[#c5a869]" /> Global Opportunities
        </button>
      </div>

    </div>
  );
};
