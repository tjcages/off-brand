import { useDevice } from "@/utils";
import { PerspectiveCamera } from "@theatre/r3f";
import { useRef } from "react";
import * as THREE from "three";

const _ = () => {
  const { isMobile, isTablet } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.PerspectiveCamera>;

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      theatreKey="Camera"
      position={[0, 0, 25]}
      fov={isMobile ? 75 : isTablet ? 65 : 50}
      near={0.1}
      far={70}
    />
  );
};

export default _;
