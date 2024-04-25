import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface Props {
  index: number;
  z: number;
  speed: number;
  object: string;
}

const _Model = ({ index, z, speed, object }: Props) => {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF(object) as any;
  const width = 6;
  const height = 6;

  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 3),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  });

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1)
      ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z);
    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );
    // If they're too far up, set them back to the bottom
    // if (selectedStep !== null && selectedStep > 1) return;
    if (data.y > height * (index === 0 ? 8 : 1)) data.y = -(height * (index === 0 ? 4 : 1));
  });

  return (
    <group ref={ref}>
      <mesh geometry={nodes.Merged_Geometry.geometry} scale={[0.02, 0.02, 0.04]}>
        <meshStandardMaterial
          attach="material"
          color="#002D8F"
          emissive="#0048e5"
          emissiveIntensity={1}
          roughness={0.5}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};

const count = 7;
const depth = 1;
const speed = 0.4;

const _ = () => {
  const easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2));
  return Array.from({ length: count }, (_, i) => (
    <_Model
      key={i}
      object={"/objects/developer.glb"}
      index={i}
      z={Math.round(easing(i / count) * depth)}
      speed={speed}
    />
  ));
};

export default _;
