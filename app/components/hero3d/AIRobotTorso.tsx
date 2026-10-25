"use client";

/**
 * Asset attribution (CC BY 4.0 — not shown in the UI):
 * "Futuristic Armored Robot – 3D Character Model" (https://skfb.ly/pAtyZ)
 * by Asset Hub, licensed under Creative Commons Attribution 4.0
 * http://creativecommons.org/licenses/by/4.0/
 */

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Color,
  MathUtils,
  Mesh,
  type Group,
  type MeshStandardMaterial,
  type Object3D,
} from "three";
import type { PointerRef, ScrollProgressRef } from "./scrollProgress";

const MODEL_PATH = "/portfolio/models/armored-robot.glb";

type AIRobotTorsoProps = {
  progressRef: ScrollProgressRef;
  pointerRef: PointerRef;
  simplified?: boolean;
};

function tintRobotMaterials(root: Object3D, simplified: boolean) {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.castShadow = !simplified;
    child.receiveShadow = !simplified;

    const source = Array.isArray(child.material)
      ? child.material
      : [child.material];
    const cloned = source.map((material) => material.clone());
    child.material = Array.isArray(child.material) ? cloned : cloned[0];

    for (const material of cloned) {
      const standard = material as MeshStandardMaterial;
      if (!("metalness" in standard)) continue;

      standard.color = new Color("#b3adc2");
      standard.metalness = Math.max(standard.metalness ?? 0.4, 0.72);
      standard.roughness = Math.min(standard.roughness ?? 0.45, 0.38);
      standard.envMapIntensity = 1.35;
      standard.emissive = new Color("#531b76");
      standard.emissiveIntensity = simplified ? 0.18 : 0.32;
      standard.needsUpdate = true;
    }
  });
}

export function AIRobotTorso({
  progressRef,
  pointerRef,
  simplified = false,
}: AIRobotTorsoProps) {
  const rootRef = useRef<Group>(null);
  const lookRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    tintRobotMaterials(clone, simplified);
    return clone;
  }, [scene, simplified]);

  useEffect(() => {
    return () => {
      model.traverse((child) => {
        if (!(child instanceof Mesh)) return;
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        for (const material of materials) {
          material?.dispose?.();
        }
      });
    };
  }, [model]);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const look = lookRef.current;
    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    const progress = MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    const turn = MathUtils.smoothstep(progress, 0.08, 0.68);
    const hide = MathUtils.smoothstep(progress, 0.52, 0.86);
    const time = state.clock.elapsedTime;
    const lookAmount = 1 - turn;

    if (root) {
      root.rotation.y = MathUtils.damp(
        root.rotation.y,
        turn * Math.PI * 1.08,
        3.2,
        delta,
      );
      root.rotation.z = MathUtils.damp(root.rotation.z, turn * -0.06, 3, delta);
      root.position.y = MathUtils.damp(
        root.position.y,
        -0.55 - hide * 3.8,
        3,
        delta,
      );
      root.position.z = MathUtils.damp(root.position.z, -hide * 4.8, 3, delta);
      const targetScale = (simplified ? 1.28 : 1.42) * (1 - hide * 0.5);
      const scale = MathUtils.damp(root.scale.x, targetScale, 3, delta);
      root.scale.setScalar(scale);
    }

    if (look) {
      look.rotation.x = MathUtils.damp(
        look.rotation.x,
        pointer.y * -0.18 * lookAmount + Math.sin(time * 0.8) * 0.012,
        4.5,
        delta,
      );
      look.rotation.y = MathUtils.damp(
        look.rotation.y,
        pointer.x * 0.32 * lookAmount,
        4.5,
        delta,
      );
      look.rotation.z = MathUtils.damp(
        look.rotation.z,
        pointer.x * -0.04 * lookAmount,
        4,
        delta,
      );
    }
  });

  return (
    <group ref={rootRef} position={[2.55, -0.55, 0]} scale={1.42}>
      <group ref={lookRef}>
        <primitive object={model} rotation={[0, -0.1, 0]} />
      </group>
    </group>
  );
}

/* Not preloaded — hero currently uses NeonLetterN. Keep for future remount. */
