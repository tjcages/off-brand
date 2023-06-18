import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Distortion } from "@/components/effects";
import { useSnapshot } from "valtio";
import { state } from "@/store";

extend({ Distortion });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortion: any;
    }
  }
}

const _ = (props: any) => {
  const snap = useSnapshot(state);
  const { width, height, x, y, z } = props.itemData;

  const meshRef = useRef() as any;
  const matRef = useRef() as any;

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.time += delta;
    matRef.current.speed = snap.speed * 15;
  });

  return (
    <mesh {...props} ref={meshRef} position={[x, y, z]}>
      <planeGeometry args={[width, height, 32, 32]} />
      <distortion
        frameAspect={width / height}
        textureAspect={
          props.texture.image.naturalWidth / props.texture.image.naturalHeight
        }
        ref={matRef}
        tex={props.texture}
      />
    </mesh>
  );
};

export default _;
