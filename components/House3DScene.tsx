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

// 1. Sleek Crystal Clear Glass & Monochrome 3D Door for Each Service Room in Lobby
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
  const pointLightRef = useRef<THREE.PointLight>(null);
  const bgMeshRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = React.useState(false);

  // Smooth animation progress from 0 (closed) to 1 (fully open)
  const openProgressRef = useRef(0);

  // Colors for black-to-gray portal transition (pure monochrome gradient)
  const pitchBlackColor = useRef(new THREE.Color("#000000"));
  const glowGrayColor = useRef(new THREE.Color("#9ca3af")); // Sleek architectural gray

  useFrame((_, delta) => {
    const active = isSelected || hovered;
    const targetProgress = active ? 1.0 : 0.0;

    openProgressRef.current = THREE.MathUtils.damp(
      openProgressRef.current,
      targetProgress,
      2.8,
      delta
    );

    const progress = openProgressRef.current;
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const maxRot = 1.4;

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = -easedProgress * maxRot;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = easedProgress * maxRot;
    }

    // Delayed gradual lighting curve:
    // 100% pitch black (#000000) at first (0% - 35%), then slowly illuminates from black to sleek gray (35% - 100%)
    let lightProgress = 0;
    if (progress > 0.35) {
      const norm = Math.max(0, Math.min(1, (progress - 0.35) / 0.65));
      lightProgress = Math.pow(norm, 2.2);
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = THREE.MathUtils.lerp(0.0, 8.0, lightProgress);
      pointLightRef.current.distance = THREE.MathUtils.lerp(2.0, 4.5, lightProgress);
    }

    if (bgMeshRef.current) {
      bgMeshRef.current.color.lerpColors(pitchBlackColor.current, glowGrayColor.current, lightProgress);
      bgMeshRef.current.opacity = THREE.MathUtils.lerp(0.0, 0.95, lightProgress);
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
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* 1. Thin Outer Frame Trim */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.04, 1.04, 0.02]} />
        <meshBasicMaterial color="#c5a869" wireframe />
      </mesh>

      {/* 2. Black to Gray Interior Portal Void (Starts pitch black) */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[0.98, 0.98, 0.02]} />
        <meshBasicMaterial ref={bgMeshRef} color="#000000" transparent opacity={0.0} />
      </mesh>
      <pointLight ref={pointLightRef} position={[0, 0, 0.2]} color="#f3f4f6" intensity={0.0} distance={3.5} />

      {/* 3. Left Crystal Clear Glass Door Panel */}
      <group ref={leftDoorRef} position={[-0.49, 0, 0.01]}>
        {/* Transparent Dark Tinted Glass */}
        <mesh position={[0.245, 0, 0]}>
          <boxGeometry args={[0.49, 0.97, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} transparent opacity={0.85} />
        </mesh>
        {/* Subtle Outer Border Line */}
        <mesh position={[0.245, 0, 0.008]}>
          <boxGeometry args={[0.45, 0.93, 0.001]} />
          <meshBasicMaterial color="#c5a869" wireframe />
        </mesh>
        {/* Vertical Pull Handle */}
        <mesh position={[0.45, 0, 0.015]}>
          <cylinderGeometry args={[0.008, 0.008, 0.35, 16]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      </group>

      {/* 4. Right Crystal Clear Glass Door Panel */}
      <group ref={rightDoorRef} position={[0.49, 0, 0.01]}>
        {/* Transparent Dark Tinted Glass */}
        <mesh position={[-0.245, 0, 0]}>
          <boxGeometry args={[0.49, 0.97, 0.01]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} transparent opacity={0.85} />
        </mesh>
        {/* Subtle Outer Border Line */}
        <mesh position={[-0.245, 0, 0.008]}>
          <boxGeometry args={[0.45, 0.93, 0.001]} />
          <meshBasicMaterial color="#c5a869" wireframe />
        </mesh>
        {/* Vertical Pull Handle */}
        <mesh position={[-0.45, 0, 0.015]}>
          <cylinderGeometry args={[0.008, 0.008, 0.35, 16]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      </group>

      {/* 5. Door Header Mounted Sleek Service Plaque */}
      <Html position={[0, 0.53, 0.05]} center distanceFactor={6.2}>
        <button
          onClick={onSelect}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 transition-all duration-300 shadow-2xl cursor-pointer whitespace-nowrap ${
            hovered || isSelected
              ? "bg-[#c5a869] border-white text-[#071322] scale-110 shadow-[#c5a869]/60"
              : "bg-[#071322]/95 border-[#c5a869] text-slate-100"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#c5a869] animate-pulse" />
          <span className="text-[13px] font-black tracking-widest uppercase text-white drop-shadow-md">{room.title}</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#c5a869] group-hover:text-[#071322]" />
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
  const { scrollProgress } = useHouseStore();

  const groupRef = useRef<THREE.Group>(null);
  const darkOverlayMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Smooth progress for inside environment illumination: starts 1.0 (100% pitch black) on entry
  const illuminationProgressRef = useRef(1.0);

  // Deep zoom scaling from 1.0x up to 1.85x
  const zoomFactor = 1.0 + Math.min(1, scrollProgress * 0.85);
  const scaleX = viewport.width * zoomFactor;
  const scaleY = viewport.height * zoomFactor;

  // Maximum pan offsets allowed without exposing screen edges
  const maxPanX = (scaleX - viewport.width) / 2;
  const maxPanY = (scaleY - viewport.height) / 2;

  useFrame((state, delta) => {
    // 2-Axis Cursor Navigation: combines vertical scroll progress with mouse cursor Y position
    const scrollYOffset = (scrollProgress - 0.5) * maxPanY * 1.5;
    const cursorYOffset = -state.mouse.y * maxPanY * 0.8;
    const targetY = THREE.MathUtils.clamp(scrollYOffset + cursorYOffset, -maxPanY, maxPanY);

    // Horizontal mouse cursor pan across the lobby artwork (X-axis)
    const targetX = THREE.MathUtils.clamp(-state.mouse.x * maxPanX * 0.8, -maxPanX, maxPanX);

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 5.0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 5.0);
    }

    // Inside environment slow illumination sequence: starts 100% pitch black and slowly damps down to 0.0 (full light)
    illuminationProgressRef.current = THREE.MathUtils.damp(
      illuminationProgressRef.current,
      0.0,
      1.6, // Slow, elegant illumination damp speed
      delta
    );

    if (darkOverlayMaterialRef.current) {
      darkOverlayMaterialRef.current.opacity = illuminationProgressRef.current;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
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

      {/* Sticky Glued Central Global Opportunities Globe & Hotspot */}
      <CentralGlobalOpportunitiesMesh
        position={[0, -0.15 * scaleY, 0.02]}
        onSelect={() => useHouseStore.getState().setIsGlobalModalOpen(true)}
      />

      {/* Inside Environment Pitch-Black Dark Veil Overlay - Starts 100% black and slowly damps down to 0.0 opacity */}
      <mesh position={[0, 0, 0.1]} scale={[scaleX * 1.5, scaleY * 1.5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={darkOverlayMaterialRef}
          color="#000000"
          transparent
          opacity={1.0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// 3. Central Sticky Global Opportunities Hotspot Mesh Component
function CentralGlobalOpportunitiesMesh({
  position,
  onSelect,
}: {
  position: [number, number, number];
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.8;
  });

  return (
    <group position={position} onClick={onSelect}>
      {/* Base Ring */}
      <mesh ref={ringRef} position={[0, -0.1, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[0.3, 0.45, 32]} />
        <meshBasicMaterial color="#c5a869" wireframe />
      </mesh>

      {/* Rotating Gold Wireframe Globe */}
      <group ref={meshRef} position={[0, 0.25, 0]}>
        <mesh>
          <sphereGeometry args={[0.35, 20, 20]} />
          <meshBasicMaterial color="#c5a869" wireframe transparent opacity={0.85} />
        </mesh>
      </group>

      <pointLight color="#c5a869" intensity={3.5} distance={4} />

      <Html position={[0, 0.65, 0]} center distanceFactor={8.5}>
        <button
          onClick={onSelect}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#071322]/95 border-2 border-[#c5a869] text-[#c5a869] text-xs font-extrabold uppercase tracking-widest shadow-[0_0_25px_rgba(197,168,105,0.6)] hover:scale-110 transition-transform cursor-pointer whitespace-nowrap"
        >
          <Globe className="w-4 h-4 text-[#c5a869] animate-spin-slow" />
          <span>Global Opportunities</span>
        </button>
      </Html>
    </group>
  );
}

// 4. Facade Interactive 3D Opening Double Door Component (100% Pixel-Perfect Alignment with Artwork)
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
  const pointLightRef = useRef<THREE.PointLight>(null);
  const bgMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = React.useState(false);

  // Smooth animation progress from 0 (closed) to 1 (fully open)
  const openProgressRef = useRef(0);

  // Colors for black-to-gray portal transition (pure monochrome gradient)
  const pitchBlackColor = useRef(new THREE.Color("#000000"));
  const glowColor = useRef(new THREE.Color("#9ca3af")); // Sleek architectural cool gray

  useFrame((_, delta) => {
    // Smoothly damp progress for ultra-fluid door movement
    const targetProgress = isOpening ? 1.0 : 0.0;
    openProgressRef.current = THREE.MathUtils.damp(
      openProgressRef.current,
      targetProgress,
      2.2, // Smooth damp speed
      delta
    );

    const progress = openProgressRef.current;
    // Cubic ease-out curve for natural physical door swing momentum
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const maxRot = Math.PI / 1.75; // ~102 degrees wide opening

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = -easedProgress * maxRot;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = easedProgress * maxRot;
    }

    // Delayed gradual illumination curve:
    // Starts 100% pitch dark black (#000000) for first 25% of door swing, then slowly illuminates from black to sleek light
    let lightProgress = 0;
    if (progress > 0.25) {
      const norm = Math.max(0, Math.min(1, (progress - 0.25) / 0.75));
      lightProgress = Math.pow(norm, 2.0);
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = THREE.MathUtils.lerp(0.0, 16.0, lightProgress);
      pointLightRef.current.distance = THREE.MathUtils.lerp(2.0, 9.0, lightProgress);
    }

    // Portal background void stays 100% pitch black at first, then slowly brightens from black to sleek light
    if (bgMaterialRef.current) {
      bgMaterialRef.current.color.lerpColors(pitchBlackColor.current, glowColor.current, lightProgress);
    }
  });

  return (
    <group
      position={position}
      scale={scale}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* 1. Thin Polished Gold Outer Archway Frame Trim (Hollow Perimeter Trim, no solid center fill) */}
      <group position={[0, 0, 0.005]}>
        <mesh position={[0, 0.49, 0]}>
          <boxGeometry args={[1.02, 0.04, 0.02]} />
          <meshBasicMaterial color="#c5a869" />
        </mesh>
        <mesh position={[0, -0.49, 0]}>
          <boxGeometry args={[1.02, 0.04, 0.02]} />
          <meshBasicMaterial color="#c5a869" />
        </mesh>
        <mesh position={[-0.49, 0, 0]}>
          <boxGeometry args={[0.04, 1.02, 0.02]} />
          <meshBasicMaterial color="#c5a869" />
        </mesh>
        <mesh position={[0.49, 0, 0]}>
          <boxGeometry args={[0.04, 1.02, 0.02]} />
          <meshBasicMaterial color="#c5a869" />
        </mesh>
      </group>

      {/* 2. Illuminated Interior Portal Void (Positioned inside frame, starts 100% pitch black #000000 and animates to light) */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[0.96, 0.96]} />
        <meshBasicMaterial ref={bgMaterialRef} color="#000000" />
      </mesh>
      <pointLight ref={pointLightRef} position={[0, 0, 0.05]} color="#f3f4f6" intensity={0.0} distance={2.0} />

      {/* 3. Left Door Panel (z = 0.015, in front of void mesh at z = 0.002) */}
      <group ref={leftDoorRef} position={[-0.48, 0, 0.015]}>
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

      {/* 4. Right Door Panel (z = 0.015, in front of void mesh at z = 0.002) */}
      <group ref={rightDoorRef} position={[0.48, 0, 0.015]}>
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

// 4b. 3D Animated Waving UK Union Jack Flag Component (Mounted on Left Wall of Entrance Door)
function createUKFlagTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const w = canvas.width;
    const h = canvas.height;

    // 1. Deep Navy Background Field
    ctx.fillStyle = "#012169";
    ctx.fillRect(0, 0, w, h);

    // 2. St Andrew's White Saltire (Diagonal lines)
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 100;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(w, h);
    ctx.moveTo(w, 0); ctx.lineTo(0, h);
    ctx.stroke();

    // 3. St Patrick's Red Saltire (Diagonal lines)
    ctx.strokeStyle = "#C8102E";
    ctx.lineWidth = 34;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(w, h);
    ctx.moveTo(w, 0); ctx.lineTo(0, h);
    ctx.stroke();

    // 4. White Central St George's Cross
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(w / 2 - 90, 0, 180, h);
    ctx.fillRect(0, h / 2 - 90, w, 180);

    // 5. Red Central St George's Cross
    ctx.fillStyle = "#C8102E";
    ctx.fillRect(w / 2 - 54, 0, 108, h);
    ctx.fillRect(0, h / 2 - 54, w, 108);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function UKFlag3D({
  position,
  scale,
  poleBottomOffset = 0.45,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  poleBottomOffset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const tex = createUKFlagTexture();
      if (matRef.current) {
        matRef.current.map = tex;
        matRef.current.needsUpdate = true;
      }
    }
  }, []);

  useFrame((state) => {
    if (!geomRef.current || !scale[0]) return;
    const time = state.clock.getElapsedTime();
    const pos = geomRef.current.attributes.position;
    const count = pos.count;
    const flagW = scale[0];
    const flagH = scale[1] || 1;

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // u goes from 0 (fixed at pole) to 1 (flying free edge)
      const u = Math.max(0, Math.min(1, (x + flagW / 2) / (flagW || 1)));
      // v goes from 0 (bottom edge) to 1 (top edge)
      const v = Math.max(0, Math.min(1, (y + flagH / 2) / flagH));

      // Natural aerodynamic wind wave propagation + corner flutter turbulence
      const mainWave = Math.sin(u * 7.5 - time * 4.5);
      const rippleWave = Math.cos(u * 15.0 - time * 8.0) * 0.35;
      const flutter = Math.sin(v * 6.0 + time * 3.5) * 0.25;

      const z = (mainWave + rippleWave + flutter) * 0.038 * Math.pow(u, 1.2);

      pos.setZ(i, isNaN(z) ? 0 : z);
    }
    pos.needsUpdate = true;
    geomRef.current.computeVertexNormals();
  });

  const poleX = -scale[0] / 2 - 0.008;
  const topY = scale[1] * 1.1;
  const bottomY = -poleBottomOffset;
  const poleHeight = topY - bottomY;
  const poleCenterY = (topY + bottomY) / 2;

  return (
    <group position={position}>
      {/* 1. Full-Length Ground-Standing Metallic Gold Flagpole */}
      <mesh position={[poleX, poleCenterY, 0]}>
        <cylinderGeometry args={[0.006, 0.007, poleHeight, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Top Brass Spherical Finial Ornament */}
      <mesh position={[poleX, topY + 0.015, 0]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color="#f0cc69" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* 3. Weighted Brass Ground Base Stand (Standing on Courtyard Floor) */}
      <group position={[poleX, bottomY + 0.005, 0]}>
        {/* Wide Outer Base Disc */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.042, 0.012, 32]} />
          <meshStandardMaterial color="#c5a869" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Inner Tapered Neck */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.018, 0.028, 0.01, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 4. Wall Anchoring Brackets along the Pole */}
      <mesh position={[poleX, poleCenterY * 0.4, -0.01]}>
        <boxGeometry args={[0.02, 0.02, 0.025]} />
        <meshStandardMaterial color="#c5a869" metalness={0.8} />
      </mesh>
      <mesh position={[poleX, poleCenterY * 1.3, -0.01]}>
        <boxGeometry args={[0.02, 0.02, 0.025]} />
        <meshStandardMaterial color="#c5a869" metalness={0.8} />
      </mesh>

      {/* 5. Dynamic 3D Waving UK Flag Cloth Mesh (Vibrant Navy & Red Colors) */}
      <mesh ref={meshRef} position={[0, scale[1] * 0.25, 0]}>
        <planeGeometry ref={geomRef} args={[scale[0], scale[1], 32, 32]} />
        <meshBasicMaterial ref={matRef} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 5. Facade High-Resolution Artwork Texture Plane (`home_page_hero.png`)
function HighResFacadePlane({ isOpening, onOpen }: { isOpening?: boolean; onOpen: () => void }) {
  const texture = useTexture("/sources/home_page_hero.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);
  const [isOpeningDoor, setIsOpeningDoor] = React.useState(false);

  const groupRef = useRef<THREE.Group>(null);
  const zoomProgressRef = useRef(0);

  const handleOpenClick = () => {
    if (isOpeningDoor) return;
    setIsOpeningDoor(true);
    // Smooth door opening & portal illumination sequence for 2000ms before switching view into Atrium
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  // 100% Full screen fill (no black bars, no cropping, fills screen edge-to-edge)
  const width = viewport.width;
  const height = viewport.height;

  // Shifted further left & recessed further backside into the doorway cavity
  const doorPosX = width * 0.095;
  const doorPosY = height * -0.07;
  const doorWidth = width * 0.165;
  const doorHeight = height * 0.365;

  useFrame((_, delta) => {
    const targetZoom = isOpeningDoor ? 1.0 : 0.0;
    zoomProgressRef.current = THREE.MathUtils.damp(
      zoomProgressRef.current,
      targetZoom,
      2.8, // Fluid camera zoom speed
      delta
    );

    const zProg = zoomProgressRef.current;
    const easedZ = 1 - Math.pow(1 - zProg, 2); // Smooth quadratic ease out

    if (groupRef.current) {
      // Scale facade smoothly up towards 1.35x and shift position towards doorway center
      const currentScale = 1.0 + easedZ * 0.35;
      groupRef.current.scale.set(currentScale, currentScale, 1);
      groupRef.current.position.x = -easedZ * doorPosX * 0.35;
      groupRef.current.position.y = -easedZ * doorPosY * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Background Artwork (z = 0) */}
      <mesh position={[0, 0, 0]} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 3D Double Opening Door (Positioned at z = 0.02 so void mesh at z = 0.022 is IN FRONT of background z = 0) */}
      <FacadeEntrance3DDoor
        position={[doorPosX, doorPosY, 0.02]}
        scale={[doorWidth, doorHeight, 1]}
        isOpening={isOpeningDoor}
        onOpen={handleOpenClick}
      />

      {/* 3D Flying UK Flag mounted on Left Side of Entrance Door with Ground Base Stand */}
      <UKFlag3D
        position={[doorPosX - doorWidth * 0.58, doorPosY + doorHeight * 0.68, 0.03]}
        scale={[doorWidth * 0.42, doorHeight * 0.25, 1]}
        poleBottomOffset={doorHeight * 1.18}
      />
    </group>
  );
}

// 6. Individual Service Room 3D Scene Plane (`room.png`)
function IndividualRoomPlane({ room }: { room: ServiceRoom }) {
  const texture = useTexture("/sources/room.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);
  const { scrollProgress } = useHouseStore();

  const groupRef = useRef<THREE.Group>(null);

  // Deep zoom scaling from 1.0x up to 1.75x
  const zoomFactor = 1.0 + Math.min(1, scrollProgress * 0.75);
  const scaleX = viewport.width * zoomFactor;
  const scaleY = viewport.height * zoomFactor;

  // Maximum pan offsets allowed without exposing screen edges
  const maxPanX = (scaleX - viewport.width) / 2;
  const maxPanY = (scaleY - viewport.height) / 2;

  useFrame((state, delta) => {
    // 2-Axis Cursor Navigation: combines vertical scroll progress with mouse cursor Y position
    const scrollYOffset = (scrollProgress - 0.4) * maxPanY * 1.0;
    const cursorYOffset = -state.mouse.y * maxPanY * 0.8;
    const targetY = THREE.MathUtils.clamp(scrollYOffset + cursorYOffset, -maxPanY, maxPanY);

    // Horizontal mouse cursor pan across the room (X-axis)
    const targetX = THREE.MathUtils.clamp(-state.mouse.x * maxPanX * 0.8, -maxPanX, maxPanX);

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 5.0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 5.0);
    }
  });

  // Center of the large gold-framed dark wall display in room.png (below OUR SERVICE header)
  const boardX = 0;
  const boardY = -0.05;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Background Room Artwork Plane */}
      <mesh position={[0, 0, 0]} scale={[scaleX, scaleY, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Crisp 100% Pixel-Perfect Data Content Pinned Directly onto the Central Blackboard Surface */}
      <Html
        position={[boardX, boardY, 0.02]}
        center
        distanceFactor={7.5}
      >
        <div className="w-[720px] sm:w-[840px] text-slate-100 space-y-3 font-sans pointer-events-auto bg-transparent border-0 shadow-none px-4 select-none">
          {/* Top Sub-Header Bar (Below 'OUR SERVICE') */}
          <div className="flex items-center justify-between pb-2 border-b border-[#c5a869]/30">
            <span className="text-xs font-mono tracking-widest text-[#c5a869] uppercase font-bold">
              {room.category || "STRATEGY"}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff] text-[10px] font-mono font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
              LIVE DATA
            </span>
          </div>

          {/* Main 2-Column Content Grid */}
          <div className="grid grid-cols-12 gap-8 items-start pt-1">
            {/* Left Column (5/12) */}
            <div className="col-span-5 space-y-3 pr-2">
              <h2 className="text-3xl font-serif font-bold text-[#f4ecd8] leading-tight tracking-wide drop-shadow">
                {room.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {room.fullDesc || room.shortDesc}
              </p>

              {/* Gold Line with Glowing Circular Node */}
              <div className="relative py-2 flex items-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-[#c5a869]/60 via-[#c5a869] to-transparent" />
                <div className="absolute right-4 w-5 h-5 rounded-full border border-[#c5a869] bg-[#071322] flex items-center justify-center shadow-[0_0_10px_#c5a869]">
                  <div className="w-2 h-2 rounded-full bg-[#c5a869]" />
                </div>
              </div>

              {/* Key Performance Metric */}
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a869] block font-bold">
                  KEY PERFORMANCE METRIC
                </span>
                <span className="text-sm font-mono text-[#00d4ff] font-extrabold block">
                  {room.keyMetrics && room.keyMetrics.length > 0
                    ? `${room.keyMetrics[0].label}: ${room.keyMetrics[0].value}`
                    : "M&A Volume: £450M+"}
                </span>
              </div>
            </div>

            {/* Right Column (7/12) */}
            <div className="col-span-7 space-y-4 pl-4 border-l border-[#c5a869]/30 min-h-[220px] flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a869] block font-bold">
                  CORE STRATEGIC CAPABILITIES:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(room.services || []).slice(0, 4).map((service: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[#05101e]/80 px-3 py-2.5 rounded-lg border border-[#c5a869]/40 backdrop-blur-sm"
                    >
                      <span className="text-[#c5a869] text-xs">◆</span>
                      <span className="text-xs font-semibold text-slate-100 truncate">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consult Advisory Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => useHouseStore.getState().setIsRoiModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#c5a869] text-[#071322] text-xs font-black tracking-widest uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(197,168,105,0.4)] cursor-pointer"
                >
                  CONSULT ADVISORY
                </button>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Fixed Camera Rig (Camera stays locked at [0, 0, 10] - zero 3D camera translation)
function SeamlessCameraRig() {
  useFrame((state) => {
    state.camera.position.set(0, 0, 10);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const House3DScene: React.FC = () => {
  const { view, openHouse, selectedRoom, setSelectedRoom } = useHouseStore();
  const isDoorsOpen = view === "ATRIUM";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#040b14]">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={48} />
        <SeamlessCameraRig />

        <ambientLight intensity={1.0} />
        <Sparkles count={150} scale={20} size={3.5} speed={0.35} color="#c5a869" />

        <Suspense fallback={null}>
          {view === "FACADE" && (
            <HighResFacadePlane isOpening={isDoorsOpen} onOpen={openHouse} />
          )}
          {view === "ATRIUM" && (
            <LobbyArtworkPlane selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
          )}
          {view === "ROOM" && selectedRoom && (
            <IndividualRoomPlane room={selectedRoom} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
