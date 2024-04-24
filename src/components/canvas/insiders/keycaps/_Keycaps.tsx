import { Float } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";

import Keycap from "./_Keycap";

const _ = () => {
  return (
    <e.group theatreKey="insiders-keycaps">
      <Float>
        <Float floatIntensity={0.5}>
          <Keycap text="4" position={[-0.35, 0, 0]} />
        </Float>
        <Float floatIntensity={0.5}>
          <Keycap text="2" position={[0.35, -0.3, 0.25]} />
        </Float>
      </Float>
    </e.group>
  );
};

export default _;
