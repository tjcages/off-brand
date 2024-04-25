import { useDevice } from "@/utils";
import { Float } from "@react-three/drei";

import Keycap from "./_Keycap";

const _ = () => {
  const { isMobile } = useDevice();
  return (
    <group
      position={[isMobile ? 1 : 2.83, isMobile ? -2.8 : -2.4, isMobile ? 2 : -0.16]}
      rotation={[1.34, 0, -0.08]}
      scale={0.9}
    >
      <Float>
        <Float floatIntensity={0.5}>
          <Keycap text="4" position={[-0.35, 0, 0]} />
        </Float>
        <Float floatIntensity={0.5}>
          <Keycap text="2" position={[0.35, -0.3, 0.25]} />
        </Float>
      </Float>
    </group>
  );
};

export default _;
