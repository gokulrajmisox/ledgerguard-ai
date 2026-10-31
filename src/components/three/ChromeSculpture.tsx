"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function SculpturalChromeCore({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const satellite1Ref = useRef<THREE.Mesh>(null);
  const satellite2Ref = useRef<THREE.Mesh>(null);

  // Chrome Material properties matching Tesseract Luxury palette
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E5E4E2"), // Platinum Silver
        metalness: 0.92,
        roughness: 0.12,
        envMapIntensity: 1.8,
      }),
    []
  );

  const mochaAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6F4E37"), // Mocha Brown
        metalness: 0.7,
        roughness: 0.25,
      }),
    []
  );

  const lavenderGlowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E6E0F0"), // Pale Lavender
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color("#E6E0F0"),
        emissiveIntensity: 0.15,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth mouse-responsive tilt
      const targetRotX = mouse.current[1] * 0.35 + Math.sin(t * 0.4) * 0.08;
      const targetRotY = mouse.current[0] * 0.45 + t * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.4;
      coreRef.current.rotation.z += delta * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = t * 0.5;
      innerRingRef.current.rotation.y = t * 0.3;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = -t * 0.4;
      outerRingRef.current.rotation.z = t * 0.25;
    }

    if (satellite1Ref.current) {
      satellite1Ref.current.position.x = Math.cos(t * 0.8) * 2.2;
      satellite1Ref.current.position.y = Math.sin(t * 0.8) * 1.4;
      satellite1Ref.current.position.z = Math.sin(t * 0.8) * 1.2;
    }

    if (satellite2Ref.current) {
      satellite2Ref.current.position.x = Math.cos(-t * 0.7 + Math.PI) * 2.0;
      satellite2Ref.current.position.y = Math.sin(-t * 0.7 + Math.PI) * 1.2;
      satellite2Ref.current.position.z = Math.cos(-t * 0.7 + Math.PI) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Chrome Octahedron / Tesseract Core */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={coreRef} material={chromeMaterial} castShadow>
          <octahedronGeometry args={[1.2, 0]} />
        </mesh>
      </Float>

      {/* Inner Lavender Gyroscope Ring */}
      <mesh ref={innerRingRef} material={lavenderGlowMaterial}>
        <torusGeometry args={[1.7, 0.035, 24, 64]} />
      </mesh>

      {/* Outer Platinum Gyroscope Ring */}
      <mesh ref={outerRingRef} material={chromeMaterial}>
        <torusGeometry args={[2.2, 0.045, 24, 64]} />
      </mesh>

      {/* Floating Mocha Satellite Node 1 (Invoice Specimen) */}
      <mesh ref={satellite1Ref} material={mochaAccentMaterial}>
        <boxGeometry args={[0.3, 0.42, 0.04]} />
      </mesh>

      {/* Floating Platinum Satellite Node 2 (Verified PO) */}
      <mesh ref={satellite2Ref} material={chromeMaterial}>
        <boxGeometry args={[0.35, 0.45, 0.04]} />
      </mesh>
    </group>
  );
}

export function ChromeSculpture() {
  const mouse = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = [x, y];
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full h-full min-h-[460px] relative pointer-events-auto select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Warm Ivory and Pale Lavender Ambient Lighting */}
        <ambientLight intensity={1.1} color="#F7F5F1" />

        {/* Subtle Lavender Key Light */}
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.2}
          color="#E6E0F0"
          castShadow
        />

        {/* Mocha Rim Light */}
        <directionalLight
          position={[-5, -3, -3]}
          intensity={1.4}
          color="#6F4E37"
        />

        {/* Soft Front Fill Light */}
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#FFFFFF" />

        <SculpturalChromeCore mouse={mouse} />
      </Canvas>
    </div>
  );
}
