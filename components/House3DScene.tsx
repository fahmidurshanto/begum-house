"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useHouseStore } from "@/store/useHouseStore";
import { SERVICE_ROOMS, ServiceRoom } from "@/data/houseData";
import { ArrowRight, Calculator, Globe, ArrowUpRight, ChevronRight, Layers, Cpu, Compass, HeartPulse, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

// Icon mapping helper
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

// 1. Sleek Crystal Clear Glass & Gold 3D Door for Each Service Room in Lobby
function LobbyRoom3DDoor({
  room,
  position,
  scale = [1, 1, 1],
  isSelected,
  onSelect,
}: {
  room: ServiceRoom;
  position: [number, number, number];
  scale?: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((_, delta) => {
    const targetRot = isSelected || hovered ? 1.4 : 0;
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
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 1. Thin Polished Gold Outer Frame Trim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.04, 1.04, 0.02]} />
        <meshBasicMaterial color="#c5a869" wireframe />
      </mesh>

      {/* 2. Warm Illuminated Interior Portal Void */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.98, 0.98, 0.02]} />
        <meshBasicMaterial color={hovered || isSelected ? "#fff5e6" : "#071322"} transparent opacity={hovered || isSelected ? 0.7 : 0.25} />
      </mesh>
      <pointLight position={[0, 0, 0.2]} color="#ffeed0" intensity={hovered || isSelected ? 3.5 : 1.2} distance={3.0} />

      {/* 3. Left Crystal Clear Glass Door Panel */}
      <group ref={leftDoorRef} position={[-0.49, 0, 0.01]}>
        {/* Transparent Dark Navy Tinted Glass */}
        <mesh position={[0.245, 0, 0]}>
          <boxGeometry args={[0.49, 0.97, 0.01]} />
          <meshStandardMaterial color="#0b1528" roughness={0.1} metalness={0.9} transparent opacity={0.4} />
        </mesh>
        {/* Subtle Gold Outer Border Line */}
        <mesh position={[0.245, 0, 0.008]}>
          <boxGeometry args={[0.45, 0.93, 0.001]} />
          <meshBasicMaterial color="#c5a869" wireframe />
        </mesh>
        {/* Vertical Brass Pull Handle */}
        <mesh position={[0.45, 0, 0.015]}>
          <cylinderGeometry args={[0.008, 0.008, 0.35, 16]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      </group>

      {/* 4. Right Crystal Clear Glass Door Panel */}
      <group ref={rightDoorRef} position={[0.49, 0, 0.01]}>
        {/* Transparent Dark Navy Tinted Glass */}
        <mesh position={[-0.245, 0, 0]}>
          <boxGeometry args={[0.49, 0.97, 0.01]} />
          <meshStandardMaterial color="#0b1528" roughness={0.1} metalness={0.9} transparent opacity={0.4} />
        </mesh>
        {/* Subtle Gold Outer Border Line */}
        <mesh position={[-0.245, 0, 0.008]}>
          <boxGeometry args={[0.45, 0.93, 0.001]} />
          <meshBasicMaterial color="#c5a869" wireframe />
        </mesh>
        {/* Vertical Brass Pull Handle */}
        <mesh position={[-0.45, 0, 0.015]}>
          <cylinderGeometry args={[0.008, 0.008, 0.35, 16]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      </group>

      {/* 5. Door Header Mounted Sleek Gold Service Plaque (Sticky Glued to Top Arch Frame) */}
      <Html position={[0, 0.53, 0.05]} center distanceFactor={8.5}>
        <button
          onClick={onSelect}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border transition-all duration-300 shadow-2xl cursor-pointer whitespace-nowrap ${
            hovered || isSelected
              ? "bg-[#c5a869] border-white text-[#071322] scale-110 shadow-[#c5a869]/60"
              : "bg-[#071322]/95 border-[#c5a869]/80 text-slate-100"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a869] animate-pulse" />
          <span className="text-[9px] font-extrabold tracking-wider uppercase">{room.title}</span>
          <ChevronRight className="w-2.5 h-2.5 text-[#c5a869] group-hover:text-[#071322]" />
        </button>
      </Html>
    </group>
  );
}

// Exact 8-Bay Perspective Coordinates matching the 8 dark space booth bays in lobby.png
const LOBBY_BOOTH_CONFIGS: { id: string; xPct: number; yPct: number; wPct: number; hPct: number }[] = [
  // Upper Level Balcony Bays (Height reduced by 50%)
  { id: "finance-ops", xPct: -0.29, yPct: 0.15, wPct: 0.08, hPct: 0.075 },
  { id: "architecture-design", xPct: 0.28, yPct: 0.15, wPct: 0.08, hPct: 0.075 },
  { id: "education-training", xPct: 0.34, yPct: 0.26, wPct: 0.08, hPct: 0.075 },

  // Lower Level Ground Suites (Height reduced by 50%)
  { id: "shared-services", xPct: -0.34, yPct: 0.04, wPct: 0.085, hPct: 0.075 },
  { id: "business-advisory", xPct: -0.27, yPct: -0.07, wPct: 0.085, hPct: 0.075 },
  { id: "tech-ai", xPct: 0.35, yPct: -0.07, wPct: 0.085, hPct: 0.075 },
  { id: "mental-health", xPct: 0.34, yPct: 0.01, wPct: 0.085, hPct: 0.075 },
];

// 2. High-Resolution Lobby Artwork Texture Plane (`lobby.png`) with Sticky 3D Doors
function LobbyArtworkPlane({
  selectedRoom,
  setSelectedRoom,
}: {
  selectedRoom: ServiceRoom | null;
  setSelectedRoom: (room: ServiceRoom | null) => void;
}) {
  const texture = useTexture("/sources/lobby.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);

  const imgAspect = 1215 / 1295; // 0.938 aspect ratio
  const vpAspect = viewport.width / viewport.height;

  // Responsive full-screen background cover calculation
  const scaleX = vpAspect > imgAspect ? viewport.width * 1.35 : viewport.height * imgAspect * 1.35;
  const scaleY = vpAspect > imgAspect ? (viewport.width / imgAspect) * 1.35 : viewport.height * 1.35;

  return (
    <group position={[0, 0, -4]}>
      {/* Full-Bleed 100% Screen Background Artwork Mesh */}
      <mesh position={[0, 0, 0]} scale={[scaleX, scaleY, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Render 7 Interactive 3D Doors Sticky Glued Directly to the Image Booths */}
      {SERVICE_ROOMS.map((room) => {
        const config = LOBBY_BOOTH_CONFIGS.find((c) => c.id === room.id);
        if (!config) return null;

        const posX = config.xPct * scaleX;
        const posY = config.yPct * scaleY;
        const doorW = config.wPct * scaleX;
        const doorH = config.hPct * scaleY;

        return (
          <LobbyRoom3DDoor
            key={room.id}
            room={room}
            position={[posX, posY, 0.01]}
            scale={[doorW, doorH, 1]}
            isSelected={selectedRoom?.id === room.id}
            onSelect={() => setSelectedRoom(room)}
          />
        );
      })}
    </group>
  );
}

// 3. Facade Interactive 3D Opening Double Door Component (100% Pixel-Perfect Alignment with Artwork)
function FacadeEntrance3DDoor({
  position,
  scale,
  isOpening,
  onOpen,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  isOpening: boolean;
  onOpen: () => void;
}) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((_, delta) => {
    const targetRot = isOpening || hovered ? 1.45 : 0;
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        -targetRot,
        delta * 4.0
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRot,
        delta * 4.0
      );
    }
  });

  return (
    <group
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 1. Polished Gold Outer Archway Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.02, 1.02, 0.02]} />
        <meshBasicMaterial color="#c5a869" />
      </mesh>

      {/* 2. Illuminated Interior Portal Void */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.96, 0.96, 0.02]} />
        <meshBasicMaterial color={hovered || isOpening ? "#fff3db" : "#07111e"} />
      </mesh>
      <pointLight position={[0, 0, 0.3]} color="#ffeed0" intensity={hovered || isOpening ? 5.0 : 2.0} distance={4.0} />

      {/* 3. Left Door Panel (Hinged at left edge x = -0.48) */}
      <group ref={leftDoorRef} position={[-0.48, 0, 0.01]}>
        {/* Navy Door Slab */}
        <mesh position={[0.24, 0, 0]}>
          <boxGeometry args={[0.48, 0.95, 0.02]} />
          <meshBasicMaterial color="#0c182b" />
        </mesh>
        {/* Gold Inset Border Trim */}
        <mesh position={[0.24, 0, 0.012]}>
          <boxGeometry args={[0.40, 0.87, 0.003]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        {/* Inner Dark Inset */}
        <mesh position={[0.24, 0, 0.014]}>
          <boxGeometry args={[0.36, 0.83, 0.003]} />
          <meshBasicMaterial color="#08101d" />
        </mesh>
        {/* Left Half of Center Gold Lion Medallion / Handle */}
        <mesh position={[0.45, 0.05, 0.022]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 32, 1, false, 0, Math.PI]} />
          <meshBasicMaterial color="#dfb84b" />
        </mesh>
        {/* Left Brass Pull Ring Handle */}
        <mesh position={[0.43, -0.05, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 16]} />
          <meshBasicMaterial color="#f0cc69" />
        </mesh>
      </group>

      {/* 4. Right Door Panel (Hinged at right edge x = 0.48) */}
      <group ref={rightDoorRef} position={[0.48, 0, 0.01]}>
        {/* Navy Door Slab */}
        <mesh position={[-0.24, 0, 0]}>
          <boxGeometry args={[0.48, 0.95, 0.02]} />
          <meshBasicMaterial color="#0c182b" />
        </mesh>
        {/* Gold Inset Border Trim */}
        <mesh position={[-0.24, 0, 0.012]}>
          <boxGeometry args={[0.40, 0.87, 0.003]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        {/* Inner Dark Inset */}
        <mesh position={[-0.24, 0, 0.014]}>
          <boxGeometry args={[0.36, 0.83, 0.003]} />
          <meshBasicMaterial color="#08101d" />
        </mesh>
        {/* Right Half of Center Gold Lion Medallion / Handle */}
        <mesh position={[-0.45, 0.05, 0.022]} rotation={[0, 0, Math.PI]}>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 32, 1, false, 0, Math.PI]} />
          <meshBasicMaterial color="#dfb84b" />
        </mesh>
        {/* Right Brass Pull Ring Handle */}
        <mesh position={[-0.43, -0.05, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 16]} />
          <meshBasicMaterial color="#f0cc69" />
        </mesh>
      </group>

      {/* 5. Door Mounted OPEN THE HOUSE CTA Button */}
      {!isOpening && (
        <Html position={[0, -0.05, 0.15]} center distanceFactor={10}>
          <button
            onClick={onOpen}
            className={`group relative inline-flex items-center gap-2.5 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.2em] rounded-full transition-all duration-300 border-2 cursor-pointer whitespace-nowrap ${
              hovered
                ? "bg-[#c5a869] border-white text-[#071322] scale-110 shadow-[0_0_35px_rgba(197,168,105,0.95)]"
                : "bg-gradient-to-r from-[#c5a869] via-[#f5ede0] to-[#c5a869] border-white text-[#0b1528] shadow-2xl animate-pulse"
            }`}
          >
            <span>OPEN THE HOUSE</span>
            <ArrowRight className="w-4 h-4 text-[#0b1528] group-hover:translate-x-1 transition-transform" />
          </button>
        </Html>
      )}
    </group>
  );
}

// 4. Facade High-Resolution Artwork Texture Plane (`home_page_hero.png`)
function HighResFacadePlane({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  const texture = useTexture("/sources/home_page_hero.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);

  const imgAspect = 1536 / 1024; // 1.5 aspect ratio
  const vpAspect = viewport.width / viewport.height;
  
  // Responsive background cover calculation
  const width = vpAspect > imgAspect ? viewport.width : viewport.height * imgAspect;
  const height = vpAspect > imgAspect ? viewport.width / imgAspect : viewport.height;

  // Shifted further left & recessed further backside into the doorway cavity
  const doorPosX = width * 0.095;
  const doorPosY = height * -0.07;
  const doorWidth = width * 0.165;
  const doorHeight = height * 0.365;

  return (
    <group position={[0, 0, 0]}>
      {/* Background Artwork */}
      <mesh position={[0, 0, 0]} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 3D Double Opening Door Recessed Backside into the Doorway */}
      <FacadeEntrance3DDoor
        position={[doorPosX, doorPosY, 0.001]}
        scale={[doorWidth, doorHeight, 1]}
        isOpening={isOpening}
        onOpen={onOpen}
      />
    </group>
  );
}

// 4. 3D Hologram Kiosk Mesh
function HologramKioskMesh({ isVisible, onSelect }: { isVisible: boolean; onSelect: () => void }) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.8;
  });

  if (!isVisible) return null;

  return (
    <group position={[0, -1.2, -2.8]} onClick={onSelect}>
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

// 5. 3D Globe
function AtriumGlobeMesh({ isVisible, onSelect }: { isVisible: boolean; onSelect: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3;
  });

  if (!isVisible) return null;

  return (
    <group position={[0, 2.5, -6.0]} onClick={onSelect}>
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

// Camera Rig
function SeamlessCameraRig() {
  const { view, scrollProgress } = useHouseStore();

  useFrame((state) => {
    let targetZ = 10;
    let targetY = 0;

    if (view === "ATRIUM") {
      // Smooth 3D corridor scroll zoom-in from 8.5 down to -1.0
      targetZ = THREE.MathUtils.lerp(8.5, -1.0, Math.min(1, scrollProgress * 1.2));
      targetY = THREE.MathUtils.lerp(-0.45, -0.15, scrollProgress);
    }

    const mouseX = state.mouse.x * 0.35;
    const mouseY = state.mouse.y * 0.2;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);

    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const LOBBY_DOOR_POSITIONS: { id: string; pos: [number, number, number]; scale?: [number, number, number] }[] = [
  // LEFT WING BOOTHS
  { id: "shared-services", pos: [-6.4, -0.6, -3.6], scale: [0.65, 0.75, 0.65] },
  { id: "finance-ops", pos: [-4.2, 1.6, -3.8], scale: [0.6, 0.7, 0.6] },
  { id: "business-advisory", pos: [-3.8, -0.6, -3.6], scale: [0.65, 0.75, 0.65] },

  // RIGHT WING BOOTHS
  { id: "tech-ai", pos: [3.8, -0.6, -3.6], scale: [0.65, 0.75, 0.65] },
  { id: "architecture-design", pos: [4.2, 1.6, -3.8], scale: [0.6, 0.7, 0.6] },
  { id: "mental-health", pos: [6.4, -0.6, -3.6], scale: [0.65, 0.75, 0.65] },
  { id: "education-training", pos: [6.8, 1.6, -3.8], scale: [0.6, 0.7, 0.6] },
];

export const House3DScene: React.FC = () => {
  const { view, scrollProgress, openHouse, selectedRoom, setSelectedRoom, setIsRoiModalOpen, setIsGlobalModalOpen } = useHouseStore();
  const isDoorsOpen = view === "ATRIUM" || scrollProgress > 0.1;
  const isInside = view === "ATRIUM" || scrollProgress > 0.2;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#040b14]">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={48} />
        <SeamlessCameraRig />

        <ambientLight intensity={1.0} />
        <Sparkles count={150} scale={20} size={3.5} speed={0.35} color="#c5a869" />

        <Suspense fallback={null}>
          {!isInside ? (
            <HighResFacadePlane isOpening={isDoorsOpen} onOpen={openHouse} />
          ) : (
            <LobbyArtworkPlane selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
          )}
        </Suspense>

        <HologramKioskMesh isVisible={isInside} onSelect={() => setIsRoiModalOpen(true)} />
        <AtriumGlobeMesh isVisible={isInside} onSelect={() => setIsGlobalModalOpen(true)} />
      </Canvas>
    </div>
  );
};
