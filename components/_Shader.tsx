import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import styles from "../styles/shader.module.scss";

import Rig from "./Rig";
import OffBrand from "./OffBrand";
import Ground from "./Ground";
import Environment from "./Environment";
import Cursor from "./Cursor";

export default function _() {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 18] }}>
      <color attach="background" args={[styles.color000]} />
      <ambientLight intensity={1.2} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <Suspense fallback={null}>
        <Rig>
          <OffBrand color={styles.color800} />
          <Ground args={[32, 16]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </Rig>
      </Suspense>
      <Environment />
      <BakeShadows />

      <Cursor />
    </Canvas>
  );
}
