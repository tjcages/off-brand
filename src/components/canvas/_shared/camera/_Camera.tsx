import { state } from "@/store";
import { useDevice } from "@/utils";
// import { PerspectiveCamera } from "@theatre/r3f";
import { PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

const _ = () => {
  const { isMobile, isTablet } = useDevice();
  const { loaded, selectedStep } = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<THREE.PerspectiveCamera>;

  const startPosition = useMemo(() => new THREE.Vector3(0, 0, 15), []);

  const homePosition = useMemo(() => new THREE.Vector3(0, 0.5, 3.5), []);
  const homeRotation = useMemo(() => new THREE.Euler(0, 0, 0), []);

  const sandboxesPosition = useMemo(() => new THREE.Vector3(0, 2, -2.6), []);
  const sandboxesRotation = useMemo(() => new THREE.Euler(0.07, 0.625, 0.025), []);

  const workbenchPosition = useMemo(() => new THREE.Vector3(0, 2.5, -8), []);
  const workbenchRotation = useMemo(() => new THREE.Euler(0.1, 0, 0), []);

  const eventDestinationsPosition = useMemo(() => new THREE.Vector3(0, 3.25, -14), []);
  const eventDestinationsRotation = useMemo(() => new THREE.Euler(0.07, -0.625, -0.025), []);

  const insidersPosition = useMemo(() => new THREE.Vector3(0, 3, -20), []);
  const insidersRotation = useMemo(() => new THREE.Euler(0.1, 0, 0), []);

  useEffect(() => {
    switch (selectedStep) {
      case 0:
        if (loaded) {
          gsap.to(ref.current.position, {
            x: startPosition.x,
            y: startPosition.y,
            z: startPosition.z,
            duration: 10,
            ease: "expo.out",
            overwrite: true
          });
          gsap.to(ref.current.rotation, {
            x: homeRotation.x,
            y: homeRotation.y,
            z: homeRotation.z,
            duration: 10,
            ease: "expo.out",
            overwrite: true
          });
        }
        break;
      case 1:
        gsap.to(ref.current.position, {
          x: homePosition.x,
          y: homePosition.y,
          z: homePosition.z,
          duration: 10,
          ease: "expo.out",
          overwrite: true
        });
        gsap.to(ref.current.rotation, {
          x: homeRotation.x,
          y: homeRotation.y,
          z: homeRotation.z,
          duration: 10,
          ease: "expo.out",
          overwrite: true
        });
        break;
      case 2:
        gsap.to(ref.current.position, {
          x: sandboxesPosition.x,
          y: sandboxesPosition.y,
          z: sandboxesPosition.z,
          duration: 4,
          ease: "sine.out",
          overwrite: true
        });
        gsap.to(ref.current.rotation, {
          x: sandboxesRotation.x,
          y: sandboxesRotation.y,
          z: sandboxesRotation.z,
          duration: 3,
          delay: 1,
          ease: "sine.inOut",
          overwrite: true
        });
        break;
      case 3:
        gsap.to(ref.current.position, {
          x: workbenchPosition.x,
          y: workbenchPosition.y,
          z: workbenchPosition.z,
          duration: 5,
          ease: "sine.out",
          overwrite: true
        });
        gsap.to(ref.current.rotation, {
          x: workbenchRotation.x,
          y: workbenchRotation.y,
          z: workbenchRotation.z,
          duration: 4,
          ease: "sine.inOut",
          overwrite: true
        });
        break;
      case 4:
        gsap.to(ref.current.position, {
          x: eventDestinationsPosition.x,
          y: eventDestinationsPosition.y,
          z: eventDestinationsPosition.z,
          duration: 5,
          ease: "sine.out",
          overwrite: true
        });
        gsap.to(ref.current.rotation, {
          x: eventDestinationsRotation.x,
          y: eventDestinationsRotation.y,
          z: eventDestinationsRotation.z,
          duration: 3,
          ease: "sine.inOut",
          overwrite: true
        });
        break;
      case 5:
        gsap.to(ref.current.position, {
          x: insidersPosition.x,
          y: insidersPosition.y,
          z: insidersPosition.z,
          duration: 5,
          ease: "sine.out",
          overwrite: true
        });
        gsap.to(ref.current.rotation, {
          x: insidersRotation.x,
          y: insidersRotation.y,
          z: insidersRotation.z,
          duration: 4,
          ease: "sine.inOut",
          overwrite: true
        });
        break;
    }
  }, [
    loaded,
    eventDestinationsPosition,
    eventDestinationsRotation,
    homePosition,
    homeRotation,
    insidersPosition,
    insidersRotation,
    sandboxesPosition,
    sandboxesRotation,
    selectedStep,
    startPosition,
    workbenchPosition,
    workbenchRotation
  ]);

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
