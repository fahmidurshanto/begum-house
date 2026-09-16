"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { useHouseStore } from "@/store/useHouseStore";
import { ArrowRight } from "lucide-react";

// 1. Interactive 3D Opening Double Doors with Door-Mounted CTA
function Mansion3DDoors({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const targetRot = isOpening ? 1.5 : 0;
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        -targetRot,
        delta * 3
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRot,
        delta * 3
      );
    }
  });

  return (
    <group position={[0, -0.6, 2.5]}>
      {/* Outer Door Frame Archway */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[3.2, 3.8, 0.3]} />
        <meshStandardMaterial color="#3a2518" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Inner Entrance Opening Dark Cavity */}
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
        <mesh position={[0.675, -0.7, 0.07]}>
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
        <mesh position={[-0.675, -0.7, 0.07]}>
          <boxGeometry args={[1.0, 1.1, 0.02]} />
          <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Interactive Floating OPEN THE HOUSE CTA Button mounted directly on the 3D Door Center */}
      {!isOpening && (
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
  );
}

// 2. Light Mode Procedural 3D Mansion Facade Architecture
function ProceduralMansionFacade({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  return (
    <group position={[0, -1, 0]}>
      {/* Light Cream Marble Stone Plaza Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 3]}>
        <planeGeometry args={[26, 16]} />
        <meshStandardMaterial color="#e8e1d5" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Light Cream Neoclassical Main Facade Wall */}
      <mesh position={[0, 4, 2]}>
        <boxGeometry args={[22, 9, 0.6]} />
        <meshStandardMaterial color="#f0e9dd" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Triangular Roof Pediment (Gable) */}
      <mesh position={[0, 8.8, 2.3]} rotation-z={Math.PI / 4}>
        <boxGeometry args={[5, 5, 0.4]} />
        <meshStandardMaterial color="#e5ded0" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 8.2, 2.6]}>
        <boxGeometry args={[7.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#c5a869" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 4 Grand Cream Fluted Columns */}
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

      {/* Arched Windows */}
      {[-7.5, -6, 6, 7.5].map((x, i) => (
        <group key={i} position={[x, 3.8, 2.32]}>
          <mesh>
            <planeGeometry args={[1.8, 3.8]} />
            <meshBasicMaterial color="#3a4b5e" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.85, 0.95, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#c5a869" />
          </mesh>
        </group>
      ))}

      {/* Stone Entrance Steps */}
      {[0, 1, 2].map((s) => (
        <mesh key={s} position={[0, -0.4 + s * 0.15, 3.2 - s * 0.3]}>
          <boxGeometry args={[6 + s * 0.4, 0.15, 0.6]} />
          <meshStandardMaterial color="#dfd8cb" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}

      {/* 3D Opening Double Doors with Door-Mounted Button */}
      <Mansion3DDoors isOpening={isOpening} onOpen={onOpen} />

      {/* Daylight London Skyline Backdrop */}
      <group position={[0, 3, -10]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[40, 20]} />
          <meshBasicMaterial color="#dbe5f0" />
        </mesh>
        <mesh position={[-9, 2, 0.1]}>
          <sphereGeometry args={[2.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#b8c6d4" />
        </mesh>
        <mesh position={[10, 3, 0.1]}>
          <coneGeometry args={[1.8, 8, 16]} />
          <meshBasicMaterial color="#b8c6d4" />
        </mesh>
      </group>

      {/* Warm Golden Daylight Spotlights */}
      <directionalLight position={[6, 12, 10]} intensity={2.2} color="#fff8e7" />
      <ambientLight intensity={1.1} />
    </group>
  );
}

// 3. Parallax Camera Rig
function FacadeCameraRig() {
  const { scrollProgress } = useHouseStore();

  useFrame((state) => {
    const targetZ = THREE.MathUtils.lerp(8.5, 3.2, Math.min(1, scrollProgress * 2));
    const targetY = THREE.MathUtils.lerp(1.0, 0.2, scrollProgress);

    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.25;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    state.camera.lookAt(0, 1, 0);
  });
  return null;
}

export const Facade3DCanvas: React.FC = () => {
  const { view, scrollProgress, openHouse } = useHouseStore();
  const isOpening = view === "ATRIUM" || scrollProgress > 0.1;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 1, 8.5]} fov={48} />
        <FacadeCameraRig />

        <Sparkles count={120} scale={18} size={3} speed={0.3} color="#c5a869" />

        {/* Light Mode Procedural 3D Mansion Facade */}
        <ProceduralMansionFacade isOpening={isOpening} onOpen={openHouse} />
      </Canvas>
    </div>
  );
};
