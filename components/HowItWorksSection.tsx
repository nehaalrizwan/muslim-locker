"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface StepData {
  title: string;
  copy: string;
  label: string;
  color: string;
  accent: string;
  icon: "calendar" | "lock" | "check";
  position: [number, number, number];
}

const stepData: StepData[] = [
  {
    title: "Set Your Prayer Times",
    copy: "Choose your Salah windows and let the app follow your schedule with quiet certainty.",
    label: "01",
    color: "#FFFFFF",
    accent: "#0D4B35",
    icon: "calendar",
    position: [-3.1, 0, 0]
  },
  {
    title: "App Locks at Prayer Time",
    copy: "When the window opens, the lock layer engages and holds your attention until you confirm.",
    label: "02",
    color: "#FEF8E6",
    accent: "#C9A84C",
    icon: "lock",
    position: [0, 0, 0]
  },
  {
    title: "Unlock After Confirmation",
    copy: "Finish Salah, tap to confirm, and your device unlocks only after the prayer is intentionally complete.",
    label: "03",
    color: "#FFFFFF",
    accent: "#0D4B35",
    icon: "check",
    position: [3.2, 0, -0.5]
  }
];

function createNumberTexture(label: string) {
  const canvas = document.createElement("canvas");
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  context.clearRect(0, 0, size, size);
  context.fillStyle = "rgba(255,255,255,0)";
  context.fillRect(0, 0, size, size);
  context.fillStyle = "#0D4B35";
  context.font = "700 120px Inter";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function CameraRig() {
  const { camera } = useThree();
  const clock = useRef(new THREE.Clock());

  useFrame(() => {
    const elapsed = clock.current.getElapsedTime();
    camera.position.x = Math.sin(elapsed * 0.16) * 5.2;
    camera.position.y = 2.8 + Math.sin(elapsed * 0.18) * 0.24;
    camera.position.z = 8.3 + Math.cos(elapsed * 0.16) * 0.9;
    camera.lookAt(0, 0.4, 0);
  });

  return null;
}

function OrbitControlsWrapper() {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    let controls: any;
    let canceled = false;

    async function init() {
      // @ts-ignore missing type declarations for the three examples import
      const module = await import("three/examples/jsm/controls/OrbitControls");
      if (canceled) return;
      controls = new module.OrbitControls(camera, gl.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.12;
      controls.minDistance = 6.5;
      controls.maxDistance = 10;
      controls.minPolarAngle = Math.PI / 3.2;
      controls.maxPolarAngle = Math.PI / 2.1;
      controls.minAzimuthAngle = -Math.PI / 5;
      controls.maxAzimuthAngle = Math.PI / 5;
      controls.enablePan = false;
      controls.rotateSpeed = 0.45;
    }

    init();

    return () => {
      canceled = true;
      controls?.dispose();
    };
  }, [camera, gl]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

function PlatformIcon({ type }: { type: string }) {
  const shackleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (type === "lock" && shackleRef.current) {
      shackleRef.current.position.y = 0.94 + Math.sin(clock.getElapsedTime() * 1.7) * 0.04;
      shackleRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2) * 0.08;
    }
  });

  if (type === "calendar") {
    return (
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.3, 0.32, 1.1]} />
          <meshStandardMaterial color="#F8F7F4" metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[-0.38, 0.12, 0.5]}>
          <boxGeometry args={[0.16, 0.42, 0.02]} />
          <meshStandardMaterial color="#0D4B35" />
        </mesh>
        <mesh position={[0.38, 0.12, 0.5]}>
          <boxGeometry args={[0.16, 0.42, 0.02]} />
          <meshStandardMaterial color="#0D4B35" />
        </mesh>
        <mesh position={[0, 0, 0.55]}>
          <boxGeometry args={[1.1, 0.18, 0.06]} />
          <meshStandardMaterial color="#0D4B35" />
        </mesh>
        <mesh position={[0, -0.08, 0.52]}>
          <boxGeometry args={[0.9, 0.28, 0.08]} />
          <meshStandardMaterial color="#E8F5E9" />
        </mesh>
      </group>
    );
  }

  if (type === "lock") {
    return (
      <group position={[0, 0.55, 0]}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.1, 0.82, 0.72]} />
          <meshStandardMaterial color="#EFE6D4" metalness={0.2} roughness={0.45} />
        </mesh>
        <mesh ref={shackleRef} position={[0, 0.94, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.38, 0.1, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#B68926" metalness={0.6} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.06, 0.1]}>
          <boxGeometry args={[0.7, 0.12, 0.1]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[0, 0.6, 0]} rotation={[-0.04, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.72, 0.12, 0.72]} />
        <meshStandardMaterial color="#F8F7F4" metalness={0.25} roughness={0.5} />
      </mesh>
      <mesh position={[-0.16, 0.18, 0]} rotation={[0, 0, -0.55]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#0D4B35" />
      </mesh>
      <mesh position={[0.1, 0.02, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#0D4B35" />
      </mesh>
    </group>
  );
}

function CheckIcon() {
  const checkLine = useMemo(() => {
    const points = [
      new THREE.Vector3(-0.32, 0.18, 0),
      new THREE.Vector3(-0.06, -0.08, 0),
      new THREE.Vector3(0.36, 0.24, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "#0D4B35", linewidth: 4 });
    return new THREE.Line(geometry, material);
  }, []);

  return (
    <group position={[0, 0.6, 0]}>
      <mesh>
        <boxGeometry args={[0.9, 0.18, 0.9]} />
        <meshStandardMaterial color="#F8F7F4" metalness={0.2} roughness={0.5} />
      </mesh>
      <primitive object={checkLine} />
    </group>
  );
}

function Platform({
  index,
  config,
  active,
  onPointerOver,
  onPointerOut
}: {
  index: number;
  config: StepData;
  active: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const texture = useMemo(() => createNumberTexture(config.label), [config.label]);

  return (
    <group position={config.position}>
      <mesh
        position={[0, 0.08, 0]}
        scale={active ? 1.06 : 1}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <boxGeometry args={[3.4, 0.16, 2.2]} />
        <meshStandardMaterial color={config.color} roughness={0.42} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.2, 0]}> 
        <planeGeometry args={[1.2, 0.44]} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
      <mesh position={[0, 0.18, 1.08]}> 
        <boxGeometry args={[1.7, 0.05, 0.16]} />
        <meshStandardMaterial color={config.accent} />
      </mesh>
      {config.icon === "calendar" && <PlatformIcon type="calendar" />}
      {config.icon === "lock" && <PlatformIcon type="lock" />}
      {config.icon === "check" && <CheckIcon />}
    </group>
  );
}

function ConnectionLines() {
  const points = useMemo(
    () => [
      new THREE.Vector3(-3.1, 0.1, 0),
      new THREE.Vector3(-0.2, 0.1, 0),
      new THREE.Vector3(3.2, 0.1, -0.5)
    ],
    []
  );
  const line = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    geo.computeBoundingSphere();
    const material = new THREE.LineDashedMaterial({ color: "#C9A84C", dashSize: 0.18, gapSize: 0.12, linewidth: 1 });
    const lineObj = new THREE.Line(geo, material);
    lineObj.computeLineDistances();
    return lineObj;
  }, [points]);

  return <primitive object={line} />;
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how" className="bg-[#FBFBF8] py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-emerald sm:text-6xl">Three steps to never miss a prayer</h2>
          <p className="mt-5 text-base leading-8 text-ink/[0.68] sm:text-lg">
            A visual flow that keeps prayer timing clear, the lock layer honest, and the unlock path simple.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-14 overflow-hidden rounded-[34px] border border-emerald/10 bg-white shadow-soft">
          <div className="h-[500px] w-full">
            <Canvas camera={{ position: [0, 2.8, 8.3], fov: 35 }}>
              <ambientLight intensity={0.8} />
              <directionalLight color="#fff8e3" intensity={1.1} position={[4, 6, 2]} />
              <pointLight color="#F5DA7E" intensity={1.2} distance={8} position={[-3.1, 1.5, 0]} />
              <pointLight color="#F5DA7E" intensity={1.2} distance={8} position={[0, 1.6, 0]} />
              <pointLight color="#F5DA7E" intensity={1.2} distance={8} position={[3.2, 1.4, -0.5]} />
              <OrbitControlsWrapper />
              <CameraRig />
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}> 
                <planeGeometry args={[25, 14]} />
                <meshStandardMaterial color="#F7F8F6" roughness={1} />
              </mesh>
              <ConnectionLines />
              {stepData.map((item, index) => (
                <Platform
                  key={item.label}
                  index={index}
                  config={item}
                  active={activeStep === index}
                  onPointerOver={() => setActiveStep(index)}
                  onPointerOut={() => setActiveStep(null)}
                />
              ))}
            </Canvas>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }} className="mt-12 grid gap-8 lg:grid-cols-3">
          {stepData.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div key={step.label} className={`relative overflow-hidden rounded-3xl border ${isActive ? "border-gold bg-white" : "border-emerald/10 bg-[#F8F7F3]"} p-8 transition-all duration-300`}>
                        <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F6EF] text-lg font-semibold text-emerald shadow-soft">
                  {step.label}
                </div>
                <h3 className="text-2xl font-semibold text-emerald">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/[0.72]">{step.copy}</p>
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            );
          })}
        </motion.div>

        <div className="relative mt-10 hidden lg:block">
          <div className="absolute left-12 right-12 top-1/2 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-70" />
          {stepData.map((_, index) => {
            const position = `${16 + index * 34}%`;
            const isActive = activeStep === index;
            return (
              <div
                key={index}
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white bg-gold shadow-[0_0_0_6px_rgba(201,168,76,0.12)] transition-all duration-300 ${isActive ? "scale-125 bg-[#C9A84C]" : "bg-[#F7F1D4]"}`}
                style={{ left: position }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
