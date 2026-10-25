"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Box3,
  Color,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  Vector3,
  type Group,
  type MeshStandardMaterial,
  type Object3D,
} from "three";
import type { PointerRef, ScrollProgressRef } from "./scrollProgress";

const MODEL_PATH = "/portfolio/models/paradox-abstract.glb";
const SCREEN_WIDTH_FACTOR = 1.1;
// Dense wireframe core is much smaller than the full AABB extremes.
const VISUAL_CORE_RATIO = 0.22;
const SIZE_MULTIPLIER = 0.49;

type ParadoxAbstractProps = {
  progressRef: ScrollProgressRef;
  pointerRef: PointerRef;
  simplified?: boolean;
};

function tintMaterials(root: Object3D, simplified: boolean) {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    child.castShadow = false;
    child.receiveShadow = false;

    const source = Array.isArray(child.material)
      ? child.material
      : [child.material];
    const cloned = source.map((material) => material.clone());
    child.material = Array.isArray(child.material) ? cloned : cloned[0];

    for (const material of cloned) {
      const standard = material as MeshStandardMaterial;
      if (!("metalness" in standard)) continue;

      standard.color = new Color("#b3adc2");
      standard.metalness = 0.45;
      standard.roughness = 0.32;
      standard.envMapIntensity = 1.1;
      standard.emissive = new Color("#8b2fc9");
      standard.emissiveIntensity = simplified ? 0.18 : 0.32;
      standard.transparent = true;
      standard.opacity = simplified ? 0.7 : 0.8;
      standard.depthWrite = false;
      standard.needsUpdate = true;
    }
  });
}

function visibleWidthAtDistance(
  camera: PerspectiveCamera,
  distance: number,
  aspect: number,
) {
  const vFov = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * Math.max(distance, 0.1);
  return visibleHeight * aspect;
}

export function ParadoxAbstract({
  progressRef,
  pointerRef,
  simplified = false,
}: ParadoxAbstractProps) {
  const rootRef = useRef<Group>(null);
  const lookRef = useRef<Group>(null);
  const fitScaleRef = useRef<number | null>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const { camera, size } = useThree();

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    const bounds = box.getSize(new Vector3());
    clone.position.sub(center);
    tintMaterials(clone, simplified);

    const nativeWidth = Math.max(bounds.x, bounds.y, 0.001);
    return { clone, nativeWidth };
  }, [scene, simplified]);

  useEffect(() => {
    return () => {
      model.clone.traverse((child) => {
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
    // progress 0..1 covers Home + AI; keep the object visible through the AI section.
    const turn = MathUtils.smoothstep(progress, 0.05, 0.45);
    const hide = MathUtils.smoothstep(progress, 0.88, 1);
    const time = state.clock.elapsedTime;
    // Fade mouse parallax as it turns; fully off while hiding out of the AI section.
    const lookAmount = (1 - turn * 0.85) * (1 - hide);

    const perspective = camera as PerspectiveCamera;
    const restZ = -0.2;
    const modelZ = restZ - hide * 3.2;
    // Fit/X from rest depth so receding during hide does not yank the object sideways.
    const restDistance = Math.abs(camera.position.z - restZ);
    const aspect = size.width / Math.max(size.height, 1);
    const screenWidth = visibleWidthAtDistance(perspective, restDistance, aspect);
    const visualWidth = model.nativeWidth * VISUAL_CORE_RATIO;
    const targetFit =
      ((screenWidth * SCREEN_WIDTH_FACTOR) / visualWidth) * SIZE_MULTIPLIER;

    fitScaleRef.current = targetFit;

    if (root) {
      root.rotation.y = MathUtils.damp(
        root.rotation.y,
        turn * Math.PI * 0.55 + time * 0.05,
        2.4,
        delta,
      );
      root.position.x = MathUtils.damp(root.position.x, screenWidth * 0.25, 3.2, delta);
      root.position.y = MathUtils.damp(root.position.y, 0 - hide * 2.2, 3.2, delta);
      root.position.z = MathUtils.damp(root.position.z, modelZ, 3.2, delta);
      root.scale.setScalar(
        MathUtils.damp(root.scale.x, targetFit * (1 - hide * 0.35), 3.2, delta),
      );
    }

    if (look) {
      const targetRotX = pointer.y * -0.25 * lookAmount;
      const targetRotY = pointer.x * 0.34 * lookAmount;
      const targetRotZ = pointer.x * -0.07 * lookAmount;
      const targetPosX = pointer.x * 0.05 * lookAmount;
      const targetPosY = pointer.y * 0.04 * lookAmount;
      look.rotation.x = MathUtils.damp(look.rotation.x, targetRotX, 3.6, delta);
      look.rotation.y = MathUtils.damp(look.rotation.y, targetRotY, 3.6, delta);
      look.rotation.z = MathUtils.damp(look.rotation.z, targetRotZ, 3.2, delta);
      look.position.x = MathUtils.damp(look.position.x, targetPosX, 3.2, delta);
      look.position.y = MathUtils.damp(look.position.y, targetPosY, 3.2, delta);
    }
  });

  const perspective = camera as PerspectiveCamera;
  const bootstrapDistance = Math.abs(perspective.position.z + 0.2);
  const bootstrapAspect = size.width / Math.max(size.height, 1);
  const bootstrapWidth = visibleWidthAtDistance(
    perspective,
    bootstrapDistance,
    bootstrapAspect,
  );
  const initialScale =
    ((bootstrapWidth * SCREEN_WIDTH_FACTOR) /
      (model.nativeWidth * VISUAL_CORE_RATIO)) *
    SIZE_MULTIPLIER;

  return (
    <group
      ref={rootRef}
      position={[bootstrapWidth * 0.25, 0, -0.2]}
      scale={initialScale}
    >
      <group ref={lookRef}>
        <primitive object={model.clone} rotation={[0.04, -0.1, 0.02]} />
        {!simplified && (
          <>
            <pointLight
              position={[1.4, 1.2, 2.4]}
              color="#8b2fc9"
              intensity={3.8}
              distance={18}
              decay={2}
            />
            <pointLight
              position={[-1.6, -0.4, 1.8]}
              color="#8b2fc9"
              intensity={2.8}
              distance={16}
              decay={2}
            />
            <pointLight
              position={[0.2, 0.6, 3]}
              color="#ebe8f0"
              intensity={2.2}
              distance={14}
              decay={2}
            />
          </>
        )}
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
