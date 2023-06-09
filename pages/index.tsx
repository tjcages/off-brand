import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SEO from "@/seo";
import { Orbit, Images, Map } from "@/components/elements";
import { Overlay } from "@/components/views";

const _ = () => {
  return (
    <>
      <SEO />

      <main>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 1.2], fov: 140, far: 10 }}
        >
          <Suspense>
            <Images />
            <Orbit />
          </Suspense>
        </Canvas>
        <Map />

        <Overlay />
      </main>
    </>
  );
};

export default _;
