import { useKeyPress } from "@/utils";
import { config, useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { MeshTransmissionMaterial, Text, useCursor, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

interface Props {
  text: string;
  position?: [number, number, number];
}

const _ = ({ text, position }: Props) => {
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/keycap-4.glb") as any;
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");
  const [down, setDown] = useState(false);
  const [hovered, setHover] = useState(false);

  useCursor(hovered);

  useKeyPress(text, () => {
    setDown(true);
    setTimeout(() => setDown(false), 100);
  });

  const [{ wobble, push }] = useSpring(
    {
      wobble: down ? 0.95 : 1,
      push: down ? -0.05 : 0,
      config: n => (n === "wobble" ? { mass: 2.5, tension: 1000, friction: 25 } : config.molasses)
    },
    [down]
  );

  return (
    <group position={position}>
      <a.group
        scale={wobble}
        position={push}
        onPointerDown={e => {
          e.stopPropagation();
          setDown(true);
        }}
        onPointerOver={e => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={() => setHover(false)}
        onPointerUp={() => setDown(false)}
      >
        <mesh
          ref={ref}
          scale={0.003}
          geometry={nodes.Key_enter.children[1].geometry}
          receiveShadow
          castShadow
        >
          <MeshTransmissionMaterial
            backside
            backsideThickness={2}
            roughness={0.1}
            metalness={1}
            thickness={2}
            clearcoat={1}
            clearcoatRoughness={0.5}
            chromaticAberration={5}
            distortion={0.6}
            distortionScale={1}
            temporalDistortion={0.3}
            envMapIntensity={0.1}
            color="#002D8F"
            emissive="#0048e5"
            emissiveIntensity={0.5}
            background={texture}
          />
        </mesh>
        <Text fontSize={0.3} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {text}
          <meshStandardMaterial attach="material" color="white" metalness={0.25} />
        </Text>
      </a.group>
    </group>
  );
};

export default _;
