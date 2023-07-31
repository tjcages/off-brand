import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "@/store";

import World from "./_World";
import Selected from "./_Selected";

import { Effects } from "@/components/effects";

const _ = () => {
  const snap = useSnapshot(state);
  return (
    <Canvas
      flat={true}
      linear={true}
      dpr={[1, 3]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 1.2], fov: 140, far: 50 }}
    >
      <Suspense>
        <ScrollControls pages={snap.pages}>
          <Scroll>
            <World />
          </Scroll>
        </ScrollControls>
        {snap.view == "linear" && <Selected />}
        <Effects />
      </Suspense>
    </Canvas>
  );
};

export default _;
