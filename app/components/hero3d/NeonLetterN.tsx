"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  Color,
  MathUtils,
  type Group,
  type Mesh,
  type MeshPhysicalMaterial,
  type PointLight,
} from "three";
import type { PointerRef, ScrollProgressRef } from "./scrollProgress";

type NeonLetterNProps = {
  progressRef: ScrollProgressRef;
  pointerRef: PointerRef;
  simplified?: boolean;
};

function NeonShellMaterial({
  color,
  emissive,
  intensity,
}: {
  color: string;
  emissive: string;
  intensity: number;
}) {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={new Color(emissive)}
      emissiveIntensity={intensity}
      metalness={0.15}
      roughness={0.22}
      transparent
      opacity={0.55}
      toneMapped={false}
    />
  );
}

function ChromeCoreMaterial() {
  return (
    <meshPhysicalMaterial
      color="#531b76"
      metalness={0.92}
      roughness={0.18}
      clearcoat={0.85}
      clearcoatRoughness={0.12}
      envMapIntensity={1.6}
      emissive={new Color("#8c1eff")}
      emissiveIntensity={0.35}
    />
  );
}

function NBar({
  position,
  rotation,
  args,
  simplified,
  glow = true,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  args: [number, number, number];
  simplified: boolean;
  glow?: boolean;
}) {
  const [w, h, d] = args;
  const shellScale = 1.08;

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow={!simplified} receiveShadow={!simplified}>
        <boxGeometry args={args} />
        <ChromeCoreMaterial />
      </mesh>
      {glow && !simplified && (
        <>
          <mesh scale={[shellScale, shellScale, shellScale]}>
            <boxGeometry args={args} />
            <NeonShellMaterial
              color="#b92bff"
              emissive="#8c1eff"
              intensity={1.8}
            />
          </mesh>
          <mesh scale={[1.18, 1.02, 1.18]}>
            <boxGeometry args={[w * 0.55, h, d * 0.55]} />
            <NeonShellMaterial
              color="#8c1eff"
              emissive="#b92bff"
              intensity={1.2}
            />
          </mesh>
        </>
      )}
      {glow && simplified && (
        <mesh scale={[1.1, 1.1, 1.1]}>
          <boxGeometry args={args} />
          <NeonShellMaterial
            color="#b92bff"
            emissive="#8c1eff"
            intensity={1.4}
          />
        </mesh>
      )}
    </group>
  );
}

export function NeonLetterN({
  progressRef,
  pointerRef,
  simplified = false,
}: NeonLetterNProps) {
  const rootRef = useRef<Group>(null);
  const lookRef = useRef<Group>(null);
  const pulseMatRef = useRef<MeshPhysicalMaterial>(null);
  const glowMeshRef = useRef<Mesh>(null);
  const lightVioletRef = useRef<PointLight>(null);
  const lightMagentaRef = useRef<PointLight>(null);
  const lightWhiteRef = useRef<PointLight>(null);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const look = lookRef.current;
    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    const progress = MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    const turn = MathUtils.smoothstep(progress, 0.08, 0.68);
    const hide = MathUtils.smoothstep(progress, 0.52, 0.86);
    const time = state.clock.elapsedTime;
    const lookAmount = 1 - turn;
    const pulse = 1 + Math.sin(time * 2.1) * (simplified ? 0.04 : 0.08);

    if (root) {
      root.rotation.y = MathUtils.damp(
        root.rotation.y,
        turn * Math.PI * 1.08,
        3.2,
        delta,
      );
      root.rotation.z = MathUtils.damp(root.rotation.z, turn * -0.05, 3, delta);
      root.position.y = MathUtils.damp(
        root.position.y,
        0.15 - hide * 3.6,
        3,
        delta,
      );
      root.position.z = MathUtils.damp(root.position.z, -hide * 4.6, 3, delta);
      const targetScale = (simplified ? 1.05 : 1.18) * (1 - hide * 0.48);
      const scale = MathUtils.damp(root.scale.x, targetScale, 3, delta);
      root.scale.setScalar(scale);
    }

    if (look) {
      look.rotation.x = MathUtils.damp(
        look.rotation.x,
        pointer.y * -0.2 * lookAmount + Math.sin(time * 0.75) * 0.02,
        4.5,
        delta,
      );
      look.rotation.y = MathUtils.damp(
        look.rotation.y,
        pointer.x * 0.35 * lookAmount,
        4.5,
        delta,
      );
      look.rotation.z = MathUtils.damp(
        look.rotation.z,
        pointer.x * -0.05 * lookAmount,
        4,
        delta,
      );
    }

    if (pulseMatRef.current) {
      pulseMatRef.current.emissiveIntensity = 2.4 * pulse;
    }
    if (glowMeshRef.current) {
      glowMeshRef.current.scale.setScalar(1 + (pulse - 1) * 0.35);
    }

    const lightFade = 1 - hide * 0.85;
    if (lightVioletRef.current) {
      lightVioletRef.current.intensity = (simplified ? 4.5 : 7.5) * pulse * lightFade;
    }
    if (lightMagentaRef.current) {
      lightMagentaRef.current.intensity =
        (simplified ? 3.2 : 5.5) * pulse * lightFade;
    }
    if (lightWhiteRef.current) {
      lightWhiteRef.current.intensity =
        (simplified ? 2.2 : 3.8) * pulse * lightFade;
    }
  });

  return (
    <group ref={rootRef} position={[2.4, 0.15, 0]} scale={simplified ? 1.05 : 1.18}>
      <group ref={lookRef}>
        <group position={[0, 0.05, 0]}>
          <NBar
            position={[-0.95, 0, 0]}
            args={[0.48, 2.7, 0.48]}
            simplified={simplified}
          />
          <NBar
            position={[0.95, 0, 0]}
            args={[0.48, 2.7, 0.48]}
            simplified={simplified}
          />
          <NBar
            position={[0, 0, 0]}
            rotation={[0, 0, -0.58]}
            args={[0.44, 3.05, 0.44]}
            simplified={simplified}
          />

          <mesh ref={glowMeshRef} position={[0, 0, 0.55]}>
            <sphereGeometry args={[0.28, simplified ? 12 : 24, simplified ? 12 : 24]} />
            <meshPhysicalMaterial
              ref={pulseMatRef}
              color="#f2e6ff"
              emissive={new Color("#b92bff")}
              emissiveIntensity={2.4}
              metalness={0.1}
              roughness={0.15}
              transparent
              opacity={0.85}
              toneMapped={false}
            />
          </mesh>
        </group>

        <pointLight
          ref={lightVioletRef}
          position={[0.2, 0.6, 1.4]}
          color="#b92bff"
          intensity={7.5}
          distance={14}
          decay={2}
        />
        <pointLight
          ref={lightMagentaRef}
          position={[-0.8, -0.4, 1.1]}
          color="#8c1eff"
          intensity={5.5}
          distance={12}
          decay={2}
        />
        <pointLight
          ref={lightWhiteRef}
          position={[0.6, 1.2, 0.8]}
          color="#f2e6ff"
          intensity={3.8}
          distance={10}
          decay={2}
        />
      </group>
    </group>
  );
}
