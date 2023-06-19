import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useSnapshot } from "valtio";

import SEO from "@/seo";
import { state } from "@/store";
import { Orbit, Map, World } from "@/components/elements";
import { Underlay, Overlay } from "@/components/views";
import { Effects } from "@/components/effects";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <>
      <SEO />

      <main>
        <Underlay />

        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3], fov: 140, far: 50 }}
        >
          <Suspense>
            <ScrollControls pages={snap.pages}>
              <Scroll>
                <World />
              </Scroll>
            </ScrollControls>
            <Orbit />
            <Effects />
          </Suspense>
        </Canvas>

        <Map />
        <Overlay />
      </main>
    </>
  );
};

export default _;
