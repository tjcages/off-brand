import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Detailed, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Banana({ index, z, speed }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  const { nodes, materials } = useGLTF("/buttons/banana-transformed.glb");
  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state, dt) => {
    if (!ref.current) return;
    if (dt < 0.1)
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z
      );
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );
    if (data.y > height * (index === 0 ? 4 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
  });

  return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <mesh
        geometry={nodes.banana_high.geometry}
        material={materials.skin}
        material-emissive="#ff9f00"
      />
      <mesh
        geometry={nodes.banana_mid.geometry}
        material={materials.skin}
        material-emissive="#ff9f00"
      />
      <mesh
        geometry={nodes.banana_low.geometry}
        material={materials.skin}
        material-emissive="#ff9f00"
      />
    </Detailed>
  );
}

export default function Bananas({
  speed = 1,
  count = 80,
  depth = 80,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    <Canvas
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}
    >
      <color attach="background" args={["#ffbf40"]} />
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        intensity={3}
        color="orange"
      />
      {Array.from({ length: count }, (_, i) => (
        <Banana
          key={i}
          index={i}
          z={Math.round(easing(i / count) * depth)}
          speed={speed}
        />
      ))}
      <Environment preset="sunset" />
      <EffectComposer multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={0.4}
          bokehScale={14}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  );
}
