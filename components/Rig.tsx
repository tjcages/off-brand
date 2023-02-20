import * as THREE from "three";
import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useMedia, mobileBreakpoint } from "../modules/useMedia";

function _({ children }: { children: React.ReactNode }) {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;

  const mobile = useMedia(mobileBreakpoint);

  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.lerp(
      vec.set(mobile ? 0 : mouse.x * 1, 0, mobile ? 9 : 6.5),
      0.01
    );
    ref.current.position.lerp(
      vec.set(mobile ? -0.3 : mouse.x * 0.3, mouse.y * 0.1, 0),
      0.1
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (-mouse.x * Math.PI) / 400,
      0.1
    );
  });
  return <group ref={ref}>{children}</group>;
}

export default _;
