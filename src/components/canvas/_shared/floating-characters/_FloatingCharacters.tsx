import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";

import { useSnapshot } from "valtio";
import { state } from "@/store";

interface Props {
  index: number;
  z: number;
  speed: number;
  object: string;
}

const IndividualText = ({ index, z, speed, object }: Props) => {
  const { selectedStep } = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { viewport, camera } = useThree();
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
    rZ: Math.random() * Math.PI,
  });

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1)
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z
      );
    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );
    // If they're too far up, set them back to the bottom
    if (selectedStep !== null && selectedStep > 0) return;
    if (data.y > height * (index === 0 ? 8 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
  });

  return (
    <group ref={ref}>
      <mesh geometry={nodes.Text_4.geometry} scale={[0.02, 0.02, 0.01]}>
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

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const count = 10;
  const depth = 1;
  const speed = 1;
  const easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2));

  useEffect(() => {
    if (ref.current)
      gsap.to(ref.current.position, {
        z: selectedStep === 1 ? -5 : 0,
        duration: 5,
        ease: "expo.out",
      });
  }, [selectedStep]);

  return (
    <group ref={ref} position={[0, 1.5, 0]}>
      {Array.from(
        { length: count },
        (_, i) => <IndividualText key={i} object={"/objects/4242.glb"} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */
      )}
      {Array.from(
        { length: count },
        (_, i) => <IndividualText key={i} object={"/objects/*.glb"} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */
      )}
      {Array.from(
        { length: count },
        (_, i) => <IndividualText key={i} object={"/objects/$.glb"} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */
      )}
    </group>
  );
};

export default _;
