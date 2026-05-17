"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

function PrayerPhone({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const group = useRef<Group>(null);
  const beadOne = useRef<Mesh>(null);
  const beadTwo = useRef<Mesh>(null);
  const beadThree = useRef<Mesh>(null);
  const rotation = useSpring(useTransform(scrollYProgress, [0, 1], [0, 0.55]), {
    stiffness: 70,
    damping: 18
  });

  const beadPositions = useMemo(
    () => [
      [-1.65, -0.82, 0.08],
      [-1.28, -1.05, 0.1],
      [-0.88, -1.15, 0.12]
    ],
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = -0.38 + rotation.get();
      group.current.rotation.x = Math.sin(time * 0.35) * 0.025;
      group.current.position.y = Math.sin(time * 0.5) * 0.04;
    }

    [beadOne, beadTwo, beadThree].forEach((bead, index) => {
      if (bead.current) {
        bead.current.position.y =
          beadPositions[index][1] + Math.sin(time * 1.4 + index) * 0.035;
      }
    });
  });

  return (
    <group ref={group} position={[1.75, -0.08, 0]} rotation={[0, -0.38, 0]} scale={0.9}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.65, 3.12, 0.16]} />
        <meshStandardMaterial color="#0D4B35" roughness={0.36} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.095]}>
        <boxGeometry args={[1.44, 2.72, 0.025]} />
        <meshStandardMaterial color="#F8F7F4" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.34, 0.12]}>
        <ringGeometry args={[0.42, 0.49, 64]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.28} metalness={0.34} />
      </mesh>
      <mesh position={[0, 0.34, 0.13]}>
        <circleGeometry args={[0.34, 64]} />
        <meshStandardMaterial color="#0D4B35" roughness={0.54} />
      </mesh>
      <mesh position={[0, -0.52, 0.13]}>
        <boxGeometry args={[0.72, 0.12, 0.03]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.78, 0.13]}>
        <boxGeometry args={[0.46, 0.08, 0.03]} />
        <meshStandardMaterial color="#0D4B35" roughness={0.5} />
      </mesh>
      {beadPositions.map((position, index) => (
        <mesh
          key={position.join("-")}
          ref={index === 0 ? beadOne : index === 1 ? beadTwo : beadThree}
          position={position as [number, number, number]}
          castShadow
        >
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial color={index === 1 ? "#C9A84C" : "#0D4B35"} />
        </mesh>
      ))}
      <mesh position={[-0.48, -1.2, 0.09]} rotation={[0, 0, -0.52]}>
        <torusGeometry args={[0.86, 0.014, 12, 72, 2.2]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function HeroScene({
  scrollYProgress
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.15, 5.2], fov: 38 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[2.8, 4.2, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 1.5, 2]} intensity={1.1} color="#C9A84C" />
        <PrayerPhone scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
