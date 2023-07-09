import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "@/store";

import SEO from "@/seo";
import { Selected, World } from "@/components/elements";
import { Header, Underlay, Overlay } from "@/components/views";
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
          gl={{ antialias: false }}
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

        <Header />
        <Overlay />
      </main>
    </>
  );
};

export default _;
