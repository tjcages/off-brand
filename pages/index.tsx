import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import SEO from "@/seo";
import { Orbit, Images, Map } from "@/components/elements";
import { Overlay } from "@/components/views";
import { useSnapshot } from "valtio";
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
            <ScrollControls
              damping={0.1}
              pages={5}
              enabled={snap.view == "linear"}
            >
              <Scroll>
                <Images />
              </Scroll>
            </ScrollControls>
            <Orbit />
          </Suspense>
        </Canvas>
        {/* <Map /> */}

        <Overlay />
      </main>
    </>
  );
};

export default _;
