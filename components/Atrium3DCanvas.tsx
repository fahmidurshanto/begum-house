"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useHouseStore } from "@/store/useHouseStore";
import { SERVICE_ROOMS } from "@/data/houseData";
import { Calculator, Globe, ArrowUpRight, ChevronRight, Layers, Cpu, Compass, HeartPulse, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

// Helper for hotspot icons
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

// 1. Light Mode Procedural 3D Atrium Architectural Environment
function ProceduralAtrium3D() {
  return (
    <group position={[0, -1, 0]}>
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
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.49, 0]}>
        <ringGeometry args={[5, 5.1, 64]} />
        <meshBasicMaterial color="#c5a869" transparent opacity={0.5} />
      </mesh>

      {/* Cream Structural Pillars */}
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
          <mesh position={[0, -2.8, 0]}>
            <cylinderGeometry args={[0.4, 0.35, 0.3, 16]} />
            <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Mezzanine Balcony & Grand Staircase Structure */}
      <group position={[0, 2, -5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[14, 0.4, 3]} />
          <meshStandardMaterial color="#f0e9dd" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 1.4]}>
          <boxGeometry args={[14, 0.6, 0.08]} />
          <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} transparent opacity={0.9} />
        </mesh>
        
        {/* Staircases */}
        <group position={[-4, -1.2, 1.8]} rotation-y={0.4}>
          {[0, 1, 2, 3, 4].map((step) => (
            <mesh key={step} position={[step * 0.4, -step * 0.3, step * 0.4]}>
              <boxGeometry args={[2.5, 0.25, 0.8]} />
              <meshStandardMaterial color="#dfd8cb" metalness={0.4} roughness={0.3} />
            </mesh>
          ))}
        </group>

        <group position={[4, -1.2, 1.8]} rotation-y={-0.4}>
          {[0, 1, 2, 3, 4].map((step) => (
            <mesh key={step} position={[-step * 0.4, -step * 0.3, step * 0.4]}>
              <boxGeometry args={[2.5, 0.25, 0.8]} />
              <meshStandardMaterial color="#dfd8cb" metalness={0.4} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Back Wall Arch Window Light Skylight */}
      <mesh position={[0, 3, -7]}>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.8} />
      </mesh>
      {[-4, 0, 4].map((x, i) => (
        <group key={i} position={[x, 3.5, -6.9]}>
          <mesh>
            <planeGeometry args={[3, 5]} />
            <meshBasicMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[1.3, 1.4, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#c5a869" />
          </mesh>
        </group>
      ))}

      <directionalLight position={[6, 12, 6]} intensity={2.0} color="#fff8e7" />
      <ambientLight intensity={1.0} />
    </group>
  );
}

// 2. Central 3D ROI Hologram Kiosk Mesh
function HologramKioskMesh({ onSelect }: { onSelect: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
    }
  });

  return (
    <group position={[0, -0.6, 0.5]} onClick={onSelect} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh ref={ringRef} position={[0, -0.15, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.9, 1.1, 32]} />
        <meshBasicMaterial color={hovered ? "#00ffff" : "#00d4ff"} wireframe />
      </mesh>

      <group ref={meshRef} position={[0, 0.3, 0]}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 0.5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const height = 0.6 + (i % 2) * 0.4;
          return (
            <mesh key={i} position={[x, height / 2, z]}>
              <boxGeometry args={[0.15, height, 0.15]} />
              <meshBasicMaterial color="#00d4ff" transparent opacity={0.85} />
            </mesh>
          );
        })}
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

// 3. Interactive Global Opportunities 3D Globe
function AtriumGlobeMesh({ onSelect }: { onSelect: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0, 2.2, -3]} onClick={onSelect} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial color={hovered ? "#8c6d23" : "#c5a869"} wireframe transparent opacity={0.85} />
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

// 4. Camera Rig
function CameraRig() {
  const { scrollProgress } = useHouseStore();

  useFrame((state) => {
    const targetZ = THREE.MathUtils.lerp(10, 2.0, Math.min(1, scrollProgress * 1.2));
    const targetY = THREE.MathUtils.lerp(1.2, 0.2, scrollProgress);

    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.3;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const Atrium3DCanvas: React.FC = () => {
  const { setSelectedRoom, setIsRoiModalOpen, setIsGlobalModalOpen, returnToFacade, scrollProgress } = useHouseStore();

  return (
    <div className="relative w-full h-screen bg-[#faf6f0] overflow-hidden">
      
      {/* Atrium Top Control Bar */}
      <div className="absolute top-24 left-6 z-30 flex items-center gap-4">
        <button
          onClick={returnToFacade}
          className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest rounded bg-[#faf6f0]/90 text-[#1a1a2e] border border-[#c5a869] hover:bg-[#c5a869] hover:text-white transition-all backdrop-blur-md shadow-lg"
        >
          ← Return to Facade
        </button>

        <div className="flex items-center gap-2 bg-[#faf6f0]/90 px-3 py-1.5 rounded border border-[#c5a869]/40 text-xs text-[#2d3748] font-mono">
          <span>Scroll Corridor Depth:</span>
          <div className="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#c5a869] to-[#00d4ff] transition-all duration-150" style={{ width: `${Math.round(scrollProgress * 100)}%` }} />
          </div>
          <span className="text-[#c5a869] font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* 2.5D Room Hotspot Pins */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {SERVICE_ROOMS.map((room) => (
          <div
            key={room.id}
            style={{ left: `${room.xPct}%`, top: `${room.yPct}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="group relative">
              <button
                onClick={() => setSelectedRoom(room)}
                className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#faf6f0]/95 border-2 border-[#c5a869] text-[#1a1a2e] hover:bg-[#c5a869] hover:text-white hover:scale-110 shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer font-bold"
              >
                <span className="p-1 rounded-full bg-[#c5a869]/20 text-[#c5a869] group-hover:text-white">
                  {renderBadgeIcon(room.badgeIcon)}
                </span>
                <span className="text-xs font-bold tracking-wide whitespace-nowrap">
                  {room.title}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a869] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-lg bg-[#faf6f0] border border-[#c5a869] text-[#2d3748] text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-2xl z-50">
                <p className="font-bold text-[#c5a869] mb-1">{room.category}</p>
                <p className="text-[11px] leading-relaxed text-[#4a5568]">{room.shortDesc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pure WebGL 3D Canvas Scene */}
      <Canvas className="w-full h-full z-10">
        <PerspectiveCamera makeDefault position={[0, 1.2, 10]} fov={50} />
        <CameraRig />

        <Sparkles count={150} scale={16} size={3.5} speed={0.4} color="#c5a869" />

        {/* Light Mode 3D Atrium Architecture */}
        <ProceduralAtrium3D />

        {/* 3D Hologram Kiosk & Globe */}
        <HologramKioskMesh onSelect={() => setIsRoiModalOpen(true)} />
        <AtriumGlobeMesh onSelect={() => setIsGlobalModalOpen(true)} />
      </Canvas>

      {/* Bottom Atrium Footer Quick Ribbon */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-6 py-3 rounded-full bg-[#faf6f0]/95 border border-[#c5a869]/50 text-xs text-[#1a1a2e] font-bold backdrop-blur-md shadow-xl">
        <span className="text-[#c5a869]">ATRIUM FEATURES:</span>
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
