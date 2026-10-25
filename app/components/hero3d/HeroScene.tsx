"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { ParadoxAbstract } from "./ParadoxAbstract";
import type { PointerRef, ScrollProgressRef } from "./scrollProgress";

type HeroSceneProps = {
  progressRef: ScrollProgressRef;
  pointerRef: PointerRef;
  simplified?: boolean;
};

export function HeroScene({
  progressRef,
  pointerRef,
  simplified = false,
}: HeroSceneProps) {
  return (
    <>
      <ambientLight intensity={0.28} color="#e8eef5" />
      <directionalLight position={[5, 7, 4]} intensity={1.05} color="#ffffff" />
      <directionalLight position={[-4, 3, -1]} intensity={0.45} color="#8b2fc9" />
      <pointLight position={[2.8, 2.2, 2.4]} intensity={0.7} color="#8b2fc9" />
      <pointLight position={[-1.8, 0.8, 1.6]} intensity={0.32} color="#8b2fc9" />

      <Environment resolution={simplified ? 64 : 256}>
        <Lightformer
          form="rect"
          intensity={2.4}
          position={[0, 5, -3]}
          scale={[10, 2, 1]}
          color="#e8eef5"
        />
        <Lightformer
          form="ring"
          intensity={1.35}
          position={[-5, 1, 2]}
          scale={5}
          color="#8b2fc9"
        />
        <Lightformer
          form="rect"
          intensity={1}
          position={[5, -2, 1]}
          scale={[3, 5, 1]}
          color="#8b2fc9"
        />
        <Lightformer
          form="circle"
          intensity={1.1}
          position={[2, 2, 4]}
          scale={2.4}
          color="#94a3b8"
        />
      </Environment>

      <ParadoxAbstract
        progressRef={progressRef}
        pointerRef={pointerRef}
        simplified={simplified}
      />

      <CameraRig progressRef={progressRef} />
    </>
  );
}
