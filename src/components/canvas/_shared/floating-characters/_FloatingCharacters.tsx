import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import DollarSign from "./_DollarSign";
import FourTwo from "./_FourTwo";
import Llama from "./_Llama";

const _ = () => {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;

  useFrame(({ camera }) => {
    if (ref.current) ref.current.position.z = Math.min(0, camera.position.z - 4);
  });

  return (
    <group ref={ref} position={[0, 1.5, 0]}>
      <FourTwo />
      <DollarSign />
      <Llama />
    </group>
  );
};

export default _;
