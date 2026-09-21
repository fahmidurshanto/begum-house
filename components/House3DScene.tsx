"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

// 2b. High-Res Crisp 3D Wall Crest Mesh matching exact original PNG colors and proportions
function WallCrest3DMesh({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) {
  const logoTexture = useTexture("/sources/Logo - Edited.png");
  logoTexture.colorSpace = THREE.SRGBColorSpace;

  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  return (
    <group
      ref={meshRef}
      position={position}
      scale={scale}
    >
      {/* Crisp PNG Logo Texture Mesh with 100% accurate original colors */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent={true}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Golden Ambient Point Light Glow on Hover */}
      {hovered && (
        <pointLight position={[0, 0, 0.3]} color="#c5a869" intensity={4.0} distance={3.0} />
      )}
    </group>
  );
}

// 2. High-Resolution Lobby Artwork Texture Plane (`lobby.png`) with Sticky 3D Doors
function LobbyArtworkPlane({
  selectedRoom,
  setSelectedRoom,
  onFlashUpdate,
}: {
  selectedRoom: ServiceRoom | null;
  setSelectedRoom: (room: ServiceRoom | null) => void;
  onFlashUpdate: (opacity: number) => void;
}) {
  const texture = useTexture("/sources/lobby.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);
  const { scrollProgress } = useHouseStore();

  const groupRef = useRef<THREE.Group>(null);
  const darkOverlayMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Lobby entry illumination: starts 1.0 (pitch black) and damps to 0.0
  const illuminationProgressRef = useRef(1.0);

  // Room entry zoom state
  const isEnteringRoomRef = useRef(false);
  const enterZoomRef = useRef(0);
  const enterTargetXPctRef = useRef(0);
  const enterTargetYPctRef = useRef(0);

  // Deep zoom scaling from 1.0x up to 1.85x
  const zoomFactor = 1.0 + Math.min(1, scrollProgress * 0.85);
  const scaleX = viewport.width * zoomFactor;
  const scaleY = viewport.height * zoomFactor;

  // Maximum pan offsets allowed without exposing screen edges
  const maxPanX = (scaleX - viewport.width) / 2;
  const maxPanY = (scaleY - viewport.height) / 2;

  // Maximum zoom for the room entry rush
  const MAX_ENTRY_SCALE = 5.5;

  // Handle door click — starts cinematic zoom, delays setSelectedRoom to peak flash
  const handleDoorSelect = React.useCallback(
    (room: ServiceRoom) => {
      if (isEnteringRoomRef.current) return;
      const config = LOBBY_BOOTH_CONFIGS.find((c) => c.id === room.id);
      if (!config) {
        setSelectedRoom(room); // fallback: no position config, switch immediately
        return;
      }
      isEnteringRoomRef.current = true;
      enterTargetXPctRef.current = config.xPct;
      enterTargetYPctRef.current = config.yPct;

      // Switch view at peak flash bloom — transition hidden behind the gold flash
      setTimeout(() => {
        setSelectedRoom(room);
      }, 1600);
    },
    [setSelectedRoom]
  );

  useFrame((state, delta) => {
    // ── Room entry cinematic zoom (overrides scroll/mouse pan) ──
    if (isEnteringRoomRef.current) {
      enterZoomRef.current = THREE.MathUtils.damp(enterZoomRef.current, 1.0, 1.8, delta);
      const zProg = enterZoomRef.current;

      // Two-phase easing: slow drift while doors open → explosive cubic rush into portal
      let easedZ: number;
      if (zProg < 0.35) {
        easedZ = (zProg / 0.35) * 0.07; // gentle approach
      } else {
        const t = (zProg - 0.35) / 0.65;
        easedZ = 0.07 + Math.pow(t, 2.4) * 0.93; // aggressive cubic acceleration
      }

      // Door world position (local coords of the clicked door in the group)
      const doorWorldX = enterTargetXPctRef.current * scaleX;
      const doorWorldY = enterTargetYPctRef.current * scaleY;
      const currentScale = 1.0 + easedZ * (MAX_ENTRY_SCALE - 1.0);

      if (groupRef.current) {
        groupRef.current.scale.set(currentScale, currentScale, 1);
        // Pan so the clicked door rushes from its position toward screen center
        groupRef.current.position.x = -easedZ * MAX_ENTRY_SCALE * doorWorldX;
        groupRef.current.position.y = -easedZ * MAX_ENTRY_SCALE * doorWorldY;
      }

      // Warm gold flash bloom: starts at 55% zoom, peaks at 100%
      let flashOpacity = 0;
      if (zProg > 0.55) {
        flashOpacity = Math.min(1, Math.pow((zProg - 0.55) / 0.32, 1.4));
      }
      onFlashUpdate(flashOpacity);

      // Keep clearing lobby illumination underneath the flash
      illuminationProgressRef.current = THREE.MathUtils.damp(
        illuminationProgressRef.current,
        0.0,
        3.5,
        delta
      );
      if (darkOverlayMaterialRef.current) {
        darkOverlayMaterialRef.current.opacity = illuminationProgressRef.current;
      }
      return; // Skip normal pan during room entry
    }

    // ── Normal lobby scroll + mouse pan ──
    const scrollYOffset = (scrollProgress - 0.5) * maxPanY * 1.5;
    const cursorYOffset = -state.mouse.y * maxPanY * 0.8;
    const targetY = THREE.MathUtils.clamp(scrollYOffset + cursorYOffset, -maxPanY, maxPanY);
    const targetX = THREE.MathUtils.clamp(-state.mouse.x * maxPanX * 0.8, -maxPanX, maxPanX);

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 5.0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 5.0);
    }

    // Fast lobby reveal — entry flash overlay covers the first ~900ms, so we clear fast underneath it
    illuminationProgressRef.current = THREE.MathUtils.damp(
      illuminationProgressRef.current,
      0.0,
      3.5, // Fast reveal: nearly transparent by the time the flash clears
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

      {/* 3D Crisp Wall Logo Crest Mesh glued directly over the lobby wall artwork emblem */}
      <WallCrest3DMesh
        position={[0, 0.24 * scaleY, 0.015]}
        scale={[0.10 * scaleX, 0.10 * scaleX, 1]}
      />

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
            onSelect={() => handleDoorSelect(room)}
          />
        );
      })}

      {/* Sticky Glued Central Global Opportunities Globe & Hotspot */}
      <CentralGlobalOpportunitiesMesh
        position={[0, -0.16 * scaleY, 0.02]}
        scale={[0.15 * scaleX, 0.15 * scaleX, 1]}
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

// 3. Central Luminous 3D Holographic Globe Kiosk Component (100% Exact PNG Color & Layout Match Glued to Lobby Floor)

function CentralGlobalOpportunitiesMesh({
  position,
  scale,
  onSelect,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  onSelect: () => void;
}) {
  const globeTexture = useTexture("/sources/ChatGPT Image Sep 22, 2026, 01_16_09 AM.png");
  globeTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={position} scale={scale}>
      {/* Exact High-Resolution Reference PNG Texture Mesh glued to ground */}
      <mesh position={[0, 0.45, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={globeTexture}
          transparent={true}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Holographic Cyan & Gold Ambient Point Light Glow */}
      <pointLight position={[0, 0.5, 0.4]} color="#00d4ff" intensity={4.5} distance={7.0} />
      <pointLight position={[0, 0.0, 0.4]} color="#ffc83b" intensity={3.0} distance={5.5} />

      {/* Floating Interactive CTA Pill Below Globe Pedestal */}
      <Html position={[0, -0.15, 0]} center distanceFactor={8.0}>
        <button
          onClick={onSelect}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#c5a869] bg-[#071322]/95 text-[#c5a869] shadow-[0_0_20px_rgba(197,168,105,0.5)] hover:bg-[#00d4ff] hover:border-white hover:text-[#071322] hover:scale-110 transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          <Globe className="w-4 h-4 text-[#00d4ff] animate-spin-slow" />
          <span className="text-xs font-extrabold uppercase tracking-widest">Global Opportunities</span>
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
  const glowColor = useRef(new THREE.Color("#f0e4c8")); // Warm amber interior light glow

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

// 5. Facade High-Resolution Artwork Texture Plane (`home_page_hero.png`)
function HighResFacadePlane({
  isOpening,
  onOpen,
  onFlashUpdate,
}: {
  isOpening?: boolean;
  onOpen: () => void;
  onFlashUpdate: (opacity: number) => void;
}) {
  const texture = useTexture("/sources/home_page_hero.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);
  const [isOpeningDoor, setIsOpeningDoor] = React.useState(false);

  const groupRef = useRef<THREE.Group>(null);
  const zoomProgressRef = useRef(0);

  const handleOpenClick = () => {
    if (isOpeningDoor) return;
    setIsOpeningDoor(true);
    // Switch scene at peak of flash bloom (1600ms) — hidden behind white flash
    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  // 100% Full screen fill (no black bars, no cropping, fills screen edge-to-edge)
  const width = viewport.width;
  const height = viewport.height;

  // Door position — slightly right of center, slightly below center
  const doorPosX = width * 0.095;
  const doorPosY = height * -0.07;
  const doorWidth = width * 0.165;
  const doorHeight = height * 0.365;

  // Maximum zoom — facade rushes from 1x up to this as user crosses the threshold
  const MAX_SCALE = 5.5;

  useFrame((_, delta) => {
    if (!isOpeningDoor) return;

    zoomProgressRef.current = THREE.MathUtils.damp(
      zoomProgressRef.current,
      1.0,
      1.8, // Moderate damp — builds anticipation then explodes
      delta
    );

    const zProg = zoomProgressRef.current;

    // Two-phase easing:
    // Phase 1 (0.0 → 0.35): Gentle drift — doors are still swinging open
    // Phase 2 (0.35 → 1.0): Explosive cubic rush into the open portal
    let easedZ: number;
    if (zProg < 0.35) {
      easedZ = (zProg / 0.35) * 0.07; // slow creep forward
    } else {
      const t = (zProg - 0.35) / 0.65;
      easedZ = 0.07 + Math.pow(t, 2.4) * 0.93; // aggressive cubic acceleration
    }

    if (groupRef.current) {
      const currentScale = 1.0 + easedZ * (MAX_SCALE - 1.0);
      groupRef.current.scale.set(currentScale, currentScale, 1);
      // Re-centre on the door portal as scale grows
      groupRef.current.position.x = -easedZ * doorPosX * (MAX_SCALE - 1.0);
      groupRef.current.position.y = -easedZ * doorPosY * (MAX_SCALE - 1.0);
    }

    // Warm gold flash bloom: begins when zoom crosses 0.55, peaks at 1.0
    let flashOpacity = 0;
    if (zProg > 0.55) {
      flashOpacity = Math.min(1, Math.pow((zProg - 0.55) / 0.32, 1.4));
    }
    onFlashUpdate(flashOpacity);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Background Artwork (z = 0) */}
      <mesh position={[0, 0, 0]} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 3D Double Opening Door (Positioned at z = 0.02) */}
      <FacadeEntrance3DDoor
        position={[doorPosX, doorPosY, 0.02]}
        scale={[doorWidth, doorHeight, 1]}
        isOpening={isOpeningDoor}
        onOpen={handleOpenClick}
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
  const layerRef = useRef<THREE.Mesh>(null);
  const glassMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const borderMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  useGSAP(() => {
    // Smoothly fade in both the glass layer and its gold border
    if (glassMaterialRef.current) {
      gsap.fromTo(
        glassMaterialRef.current,
        { opacity: 0 },
        { opacity: 0.65, duration: 1.5, ease: "power2.out" }
      );
    }
    if (borderMaterialRef.current) {
      gsap.fromTo(
        borderMaterialRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  // Deep zoom scaling from 1.0x up to 1.75x
  const zoomFactor = 1.0 + Math.min(1, scrollProgress * 0.75);
  
  // Base dimensions of the screen
  const baseW = viewport.width;
  const baseH = viewport.height;

  // The scaled dimensions based on zoom
  const scaleX = baseW * zoomFactor;
  const scaleY = baseH * zoomFactor;

  const maxPanX = (scaleX - baseW) / 2;
  const maxPanY = (scaleY - baseH) / 2;

  useFrame((state, delta) => {
    const scrollYOffset = (scrollProgress - 0.4) * maxPanY * 1.0;
    const cursorYOffset = -state.mouse.y * maxPanY * 0.8;
    const targetY = THREE.MathUtils.clamp(scrollYOffset + cursorYOffset, -maxPanY, maxPanY);
    const targetX = THREE.MathUtils.clamp(-state.mouse.x * maxPanX * 0.8, -maxPanX, maxPanX);

    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 5.0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 5.0);
      // Uniformly scale the entire group so both background and HTML text stay perfectly synchronized
      groupRef.current.scale.set(zoomFactor, zoomFactor, 1);
    }
  });

  // EXACT BLACKBOARD BOUNDING BOX CALCULATIONS (based on room.png visual analysis)
  // The blackboard is perfectly centered horizontally (X = 0)
  // Reduced further to ensure the border doesn't crowd the edges of the dark blue area
  const board3DWidth = baseW * 0.40; 
  const board3DHeight = baseH * 0.38; 
  const boardX = 0;
  const boardY = baseH * 0.06; // Shifted slightly upwards as requested

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Background Room Artwork Plane (Scales to base viewport size) */}
      <mesh position={[0, 0, 0]} scale={[baseW, baseH, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* GSAP Animated 3D Glass Layer & Border */}
      <group position={[boardX, boardY, 0.001]}>
        {/* Bold Gold Border (Slightly larger plane placed right behind) */}
        <mesh position={[0, 0, -0.0001]}>
          <planeGeometry args={[board3DWidth * 1.015, board3DHeight * 1.02]} />
          <meshBasicMaterial 
            ref={borderMaterialRef}
            color="#c5a869" 
            transparent={true} 
          />
        </mesh>

        {/* Inner Glass Layer */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[board3DWidth, board3DHeight]} />
          <meshBasicMaterial 
            ref={glassMaterialRef}
            color="#001830" 
            transparent={true} 
          />
        </mesh>
      </group>

      {/* 
        Data panel — sits directly on top of the 3D glass layer (z=0.05, same XY as boardX/boardY).
        distanceFactor is tuned so the pixel container maps 1:1 to board3DWidth × board3DHeight.
      */}
      <Html
        position={[boardX, boardY, 0.05]}
        center
        transform
        distanceFactor={3.4} 
      >
        {/* 
          Container is 680×520px. At distanceFactor=3.4 this maps to the 
          same physical footprint as board3DWidth × board3DHeight in 3D space. 
          overflow-hidden guarantees nothing ever bleeds outside the gold border.
        */}
        <div
          style={{ width: "760px", height: "490px", fontFamily: "sans-serif" }}
          className="flex flex-col overflow-hidden select-none pointer-events-auto px-8 py-5 gap-3"
        >
          {/* ── TOP ROW: Category badge + LIVE pill ── */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[#c5a869] rounded-full" />
              <span className="text-sm font-mono tracking-[0.2em] uppercase text-[#c5a869] font-bold">
                {room.category}
              </span>
            </div>
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/50 bg-[#00d4ff]/10 text-[#00d4ff] text-[11px] font-mono font-bold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse inline-block" />
              LIVE SESSION
            </span>
          </div>

          {/* ── DIVIDER ── */}
          <div className="w-full h-px bg-gradient-to-r from-[#c5a869] via-[#c5a869]/50 to-transparent shrink-0" />

          {/* ── TITLE + SHORT DESC ── */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <h2 className="text-3xl font-serif font-bold text-[#f4ecd8] leading-tight tracking-wide">
              {room.title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {room.fullDesc}
            </p>
          </div>

          {/* ── MAIN BODY: Services (2-col) + Metrics side-by-side ── */}
          <div className="grid grid-cols-2 gap-6 flex-1 overflow-hidden">

            {/* LEFT: Services list */}
            <div className="flex flex-col gap-2 overflow-hidden">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a869] font-bold shrink-0">
                Core Capabilities
              </span>
              <div className="flex flex-col gap-1.5 overflow-hidden">
                {room.services.slice(0, 4).map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#ffffff07] border border-[#c5a869]/25 rounded-lg px-4 py-2"
                  >
                    <span className="text-[#c5a869] text-xs shrink-0">◆</span>
                    <span className="text-xs font-semibold text-slate-200 truncate">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Key Metrics stacked */}
            <div className="flex flex-col gap-2 overflow-hidden">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a869] font-bold shrink-0">
                Key Metrics
              </span>
              <div className="flex flex-col gap-2 flex-1 justify-around">
                {room.keyMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-0.5 bg-[#ffffff07] border border-[#00d4ff]/20 rounded-xl px-5 py-2.5"
                  >
                    <span className="text-2xl font-mono font-extrabold text-[#00d4ff] leading-none">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM: Divider + CTA ── */}
          <div className="flex items-center justify-between shrink-0 pt-1 border-t border-[#c5a869]/20">
            <p className="text-[10px] text-slate-500 font-mono tracking-wide line-clamp-1">
              {room.shortDesc}
            </p>
            <button
              onClick={() => useHouseStore.getState().setIsRoiModalOpen(true)}
              className="px-6 py-2 rounded-full bg-[#c5a869] text-[#071322] text-xs font-black tracking-widest uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(197,168,105,0.5)] cursor-pointer shrink-0 ml-4"
            >
              CONSULT ADVISORY
            </button>
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

  // Ref to the full-screen flash overlay DOM element
  const flashDivRef = useRef<HTMLDivElement>(null);

  // Fade out the flash overlay — reusable rAF helper
  const fadeOutFlash = React.useCallback((duration = 900) => {
    const flashDiv = flashDivRef.current;
    if (!flashDiv) return;
    const startOpacity = parseFloat(flashDiv.style.opacity || "1");
    if (startOpacity < 0.01) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 2); // ease-out quad
      if (flashDiv) flashDiv.style.opacity = String(startOpacity * (1 - eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Fade out when entering the lobby from the facade (FACADE → ATRIUM)
  // and when entering a full-room view (ATRIUM → ROOM for business-advisory)
  React.useEffect(() => {
    if (view === "ATRIUM" || view === "ROOM") {
      fadeOutFlash(900);
    }
  }, [view, fadeOutFlash]);

  // Fade out when a modal-based service room is selected (view stays ATRIUM)
  React.useEffect(() => {
    if (selectedRoom !== null) {
      fadeOutFlash(900);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  // Direct DOM update from useFrame — avoids per-frame React re-renders
  const updateFlash = React.useCallback((opacity: number) => {
    if (flashDivRef.current) {
      flashDivRef.current.style.opacity = String(opacity);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#040b14]">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={48} />
        <SeamlessCameraRig />

        <ambientLight intensity={1.0} />
        <Sparkles count={150} scale={20} size={3.5} speed={0.35} color="#c5a869" />

        <Suspense fallback={null}>
          {view === "FACADE" && (
            <HighResFacadePlane
              isOpening={isDoorsOpen}
              onOpen={openHouse}
              onFlashUpdate={updateFlash}
            />
          )}
          {view === "ATRIUM" && (
          <LobbyArtworkPlane
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              onFlashUpdate={updateFlash}
            />
          )}
          {view === "ROOM" && selectedRoom && (
            <IndividualRoomPlane room={selectedRoom} />
          )}
        </Suspense>
      </Canvas>

      {/*
        Entry flash overlay — warm gold bloom that bridges the facade → lobby transition.
        Opacity is driven frame-by-frame via direct DOM ref from HighResFacadePlane's useFrame,
        then faded out via requestAnimationFrame once the lobby mounts.
        z-index 20 ensures it sits above the WebGL canvas.
      */}
      <div
        ref={flashDivRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 57% 52%, #ffffff 0%, #f5ede0 25%, #c5a869 62%, #8b6914 100%)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 20,
        }}
      />
    </div>
  );
};
