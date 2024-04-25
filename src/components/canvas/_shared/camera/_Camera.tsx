import { state } from "@/store";
import { useDevice } from "@/utils";
// import { PerspectiveCamera } from "@theatre/r3f";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

const _ = () => {
  const { isMobile, isTablet } = useDevice();
  const { selectedStep } = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<THREE.PerspectiveCamera>;
  const [{ pointerX }, set] = useState({ pointerX: 0, pointerY: 0 });

  const startPosition = useMemo(() => new THREE.Vector3(0, 0, 15), []);

  const homePosition = useMemo(() => new THREE.Vector3(0, 0.5, 3.5), []);
  const homeRotation = useMemo(() => new THREE.Euler(0, 0 + pointerX / 30, 0), [pointerX]);

  const sandboxesPosition = useMemo(() => new THREE.Vector3(0, 2, -2.6), []);
  const sandboxesRotation = useMemo(
    () => new THREE.Euler(0.07, 0.625 + pointerX / 30, 0.025),
    [pointerX]
  );

  const workbenchPosition = useMemo(() => new THREE.Vector3(0, 2.5, -8), []);
  const workbenchRotation = useMemo(() => new THREE.Euler(0.1, 0 + pointerX / 30, 0), [pointerX]);

  const eventDestinationsPosition = useMemo(() => new THREE.Vector3(0, 3.25, -14), []);
  const eventDestinationsRotation = useMemo(
    () => new THREE.Euler(0.07, -0.625 + pointerX / 30, -0.025),
    [pointerX]
  );

  const insidersPosition = useMemo(() => new THREE.Vector3(0, 3, -20), []);
  const insidersRotation = useMemo(() => new THREE.Euler(0.1, 0, 0), []);

  useFrame(({ camera, pointer }, delta) => {
    switch (selectedStep) {
      case 0:
        easing.damp3(camera.position, startPosition, 1, delta);
        easing.dampE(camera.rotation, homeRotation, 1, delta);
        break;
      case 1:
        easing.damp3(camera.position, homePosition, 1, delta);
        easing.dampE(camera.rotation, homeRotation, 1, delta);
        break;
      case 2:
        easing.damp3(camera.position, sandboxesPosition, 1, delta);
        easing.dampE(camera.rotation, sandboxesRotation, 1, delta);
        break;
      case 3:
        easing.damp3(camera.position, workbenchPosition, 1, delta);
        easing.dampE(camera.rotation, workbenchRotation, 1, delta);
        break;
      case 4:
        easing.damp3(camera.position, eventDestinationsPosition, 1, delta);
        easing.dampE(camera.rotation, eventDestinationsRotation, 1, delta);
        break;
      case 5:
        easing.damp3(camera.position, insidersPosition, 1, delta);
        easing.dampE(camera.rotation, insidersRotation, 1, delta);
        break;
    }

    if (isMobile) set({ pointerX: 0, pointerY: 0 });
    else set({ pointerX: pointer.x, pointerY: pointer.y });
  });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      // theatreKey="Camera"
      position={[0, 0, 25]}
      fov={isMobile ? 75 : isTablet ? 65 : 50}
      near={0.1}
      far={70}
      rotation={[0, 0, 0]}
    />
  );
};

export default _;
