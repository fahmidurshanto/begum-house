"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Sparkles, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useHouseStore } from "@/store/useHouseStore";
import { ArrowRight } from "lucide-react";

// 1. Interactive 3D Opening Double Doors (100% Pixel-Perfect Alignment with Artwork)
function Mansion3DDoors({
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
        <mesh position={[0.24, 0, 0]}>
          <boxGeometry args={[0.48, 0.95, 0.02]} />
          <meshBasicMaterial color="#0c182b" />
        </mesh>
        <mesh position={[0.24, 0, 0.012]}>
          <boxGeometry args={[0.40, 0.87, 0.003]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        <mesh position={[0.24, 0, 0.014]}>
          <boxGeometry args={[0.36, 0.83, 0.003]} />
          <meshBasicMaterial color="#08101d" />
        </mesh>
        <mesh position={[0.45, 0.05, 0.022]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 32, 1, false, 0, Math.PI]} />
          <meshBasicMaterial color="#dfb84b" />
        </mesh>
        <mesh position={[0.43, -0.05, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 16]} />
          <meshBasicMaterial color="#f0cc69" />
        </mesh>
      </group>

      {/* 4. Right Door Panel (Hinged at right edge x = 0.48) */}
      <group ref={rightDoorRef} position={[0.48, 0, 0.01]}>
        <mesh position={[-0.24, 0, 0]}>
          <boxGeometry args={[0.48, 0.95, 0.02]} />
          <meshBasicMaterial color="#0c182b" />
        </mesh>
        <mesh position={[-0.24, 0, 0.012]}>
          <boxGeometry args={[0.40, 0.87, 0.003]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        <mesh position={[-0.24, 0, 0.014]}>
          <boxGeometry args={[0.36, 0.83, 0.003]} />
          <meshBasicMaterial color="#08101d" />
        </mesh>
        <mesh position={[-0.45, 0.05, 0.022]} rotation={[0, 0, Math.PI]}>
          <cylinderGeometry args={[0.07, 0.07, 0.01, 32, 1, false, 0, Math.PI]} />
          <meshBasicMaterial color="#dfb84b" />
        </mesh>
        <mesh position={[-0.43, -0.05, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.22, 16]} />
          <meshBasicMaterial color="#f0cc69" />
        </mesh>
      </group>

      {/* 5. Door Mounted CTA Button */}
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

// 2. High-Resolution Design Artwork Texture Plane (100% Full-Bleed Match to home_page_hero.png)
function HighResFacadePlane({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  const texture = useTexture("/sources/home_page_hero.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const viewport = useThree((state) => state.viewport);

  // 100% Full screen fill (no black bars, no cropping, fills screen edge-to-edge)
  const width = viewport.width;
  const height = viewport.height;

  // Shifted further left & recessed further backside into the doorway cavity
  const doorPosX = width * 0.095;
  const doorPosY = height * -0.07;
  const doorWidth = width * 0.165;
  const doorHeight = height * 0.365;

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Full-Bleed Artwork Mesh */}
      <mesh position={[0, 0, 0]} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 3D Double Opening Doors Recessed Backside into the Doorway */}
      <Mansion3DDoors
        position={[doorPosX, doorPosY, 0.001]}
        scale={[doorWidth, doorHeight, 1]}
        isOpening={isOpening}
        onOpen={onOpen}
      />
    </group>
  );
}

// 3. Fixed Camera Rig (No Mouse Movement)
function FacadeCameraRig() {
  const { scrollProgress } = useHouseStore();

  useFrame((state) => {
    const targetZ = THREE.MathUtils.lerp(10, 4.0, Math.min(1, scrollProgress * 2));
    const targetY = THREE.MathUtils.lerp(0, -0.2, scrollProgress);

    state.camera.position.x = 0;
    state.camera.position.y = targetY;
    state.camera.position.z = targetZ;

    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const Facade3DCanvas: React.FC = () => {
  const { view, scrollProgress, openHouse } = useHouseStore();
  const isOpening = view === "ATRIUM" || scrollProgress > 0.1;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#040b14]">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <FacadeCameraRig />

        <ambientLight intensity={1.0} />
        <Sparkles count={150} scale={18} size={3.5} speed={0.3} color="#c5a869" />

        <Suspense fallback={null}>
          <HighResFacadePlane isOpening={isOpening} onOpen={openHouse} />
        </Suspense>
      </Canvas>
    </div>
  );
};
