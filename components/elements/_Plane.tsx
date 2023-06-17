import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
// import { Plane } from "@react-three/drei";
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

function ShaderPlane(props: any) {
  const snap = useSnapshot(state);
  const { width, height, x, y, z } = props.itemData;

  const meshRef = useRef() as any;
  const matRef = useRef() as any;
  // const clickOutPlaneRef = useRef() as any;

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
      {/* <Plane ref={clickOutPlaneRef} position-z={-0.001} args={[1, 1]}>
        <meshNormalMaterial transparent={true} opacity={0} attach="material" />
      </Plane> */}
    </mesh>
  );
}

export default ShaderPlane;
