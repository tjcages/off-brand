import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "@/store";

import SEO from "@/seo";
import { Selected, World } from "@/components/elements";
import { Header, Underlay, Overlay, Float } from "@/components/views";
import { Effects } from "@/components/effects";
import { isMobile } from "@/utils";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <>
      <SEO />

      <main>
        <Underlay />

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
            <ScrollControls pages={snap.pages} horizontal={isMobile}>
              <Scroll>
                <World />
              </Scroll>
            </ScrollControls>
            {snap.view == "linear" && <Selected />}
            <Effects />
          </Suspense>
        </Canvas>

        <Header />
        <Float />
        <Overlay />
      </main>
    </>
  );
};

export default _;
