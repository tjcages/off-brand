import { Suspense } from "react";
import { useSnapshot } from "valtio";

import SEO from "@/seo";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Orbit, Images, Map } from "@/components/elements";
import { Overlay } from "@/components/views";
import { Effects } from "@/components/effects";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <>
      <SEO />

      <main>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 1.2], fov: 140, far: 20 }}
        >
          <Suspense>
            <ScrollControls pages={snap.pages}>
              <Scroll>
                <Images />
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
