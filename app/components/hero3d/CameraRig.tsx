"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, Vector3 } from "three";
import {
  cameraTargetsFromProgress,
  type ScrollProgressRef,
} from "./scrollProgress";

type CameraRigProps = {
  progressRef: ScrollProgressRef;
};

export function CameraRig({ progressRef }: CameraRigProps) {
  const { camera } = useThree();
  const lookAtCurrent = useRef(new Vector3(0, 0.1, 0));
  const lookAtTarget = useRef(new Vector3(0, 0.1, 0));

  useFrame((_, delta) => {
    const progress = progressRef.current ?? 0;
    const { position, lookAt } = cameraTargetsFromProgress(progress);
    const smooth = 2.1;
    const damp = 1 - Math.exp(-smooth * delta);

    camera.position.x = MathUtils.damp(camera.position.x, position[0], smooth, delta);
    camera.position.y = MathUtils.damp(camera.position.y, position[1], smooth, delta);
    camera.position.z = MathUtils.damp(camera.position.z, position[2], smooth, delta);

    lookAtTarget.current.set(lookAt[0], lookAt[1], lookAt[2]);
    lookAtCurrent.current.lerp(lookAtTarget.current, damp);
    camera.lookAt(lookAtCurrent.current);
  });

  return null;
}
