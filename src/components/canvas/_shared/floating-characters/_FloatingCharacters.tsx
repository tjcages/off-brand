import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Developer from "./_Developer";
import DollarSign from "./_DollarSign";
import Explorer from "./_Explorer";
import FourTwo from "./_FourTwo";
import Llama from "./_Llama";
import Rocket from "./_Rocket";
import Tilda from "./_Tilda";

const _ = () => {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;

  useFrame(({ camera }) => {
    if (ref.current) ref.current.position.z = Math.min(0, camera.position.z - 4.25);
  });

  return (
    <group ref={ref} position={[0, 1.5, 0]}>
      <FourTwo />
      <DollarSign />
      <Llama />
      <Tilda />
      <Developer />
      <Explorer />
      {/* <Terminal /> */}
      <Rocket />
    </group>
  );
};

export default _;
