import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// @ts-expect-error TS2307: Cannot find module (does exist)
import environmentFrag from "./shaders/_environment.frag.glsl";
// @ts-expect-error TS2307: Cannot find module (does exist)
import environmentVert from "./shaders/_environment.vert.glsl";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("black"),
    uColorMiddle: new THREE.Color("black"),
    uColorEnd: new THREE.Color("black"),
  },
  environmentVert,
  environmentFrag
);

extend({ PortalMaterial });

const _ = () => {
  const ref = useRef() as any;
  const [colorStart, setColorStart] = useState(new THREE.Color("black"));
  const [colorMiddle, setColorMiddle] = useState(new THREE.Color("black"));
  const [colorEnd, setColorEnd] = useState(new THREE.Color("black"));

  useEffect(() => {
    setColorStart(new THREE.Color("#11EFE3"));
    setColorMiddle(new THREE.Color("#0048e5"));
    setColorEnd(new THREE.Color("#9966FF"));
  }, []);

  useFrame((_, delta) => {
    ref.current.uTime += delta * 4;

    // lerp from current color to new color
    ref.current.uColorStart.lerp(colorStart, 0.1);
    ref.current.uColorMiddle.lerp(colorMiddle, 0.1);
    ref.current.uColorEnd.lerp(colorEnd, 0.1);
  });

  return (
    <mesh scale={1000}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* @ts-expect-error jsx export does not exist */}
      <portalMaterial
        ref={ref}
        key={PortalMaterial.key}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default _;
