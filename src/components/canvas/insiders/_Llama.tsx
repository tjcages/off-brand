import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { RGBELoader } from "three-stdlib";

const _ = () => {
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/llama.glb") as any;
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");

  return (
    <group
      castShadow
      receiveShadow
      position={[-1.28, -1.75, -0.14]}
      rotation={[-1.57, 0.22, 0.97]}
      scale={0.03}
    >
      <Float floatIntensity={0.5}>
        <mesh
          ref={ref}
          geometry={nodes.mesh_0.geometry}
          scale={[1, 1, 1]}
          position={[0, 1, 0]}
          receiveShadow
          castShadow
        >
          <MeshTransmissionMaterial
            metalness={1}
            roughness={0.4}
            color="#002D8F"
            emissive="#0048e5"
            background={texture}
          />
        </mesh>
        <directionalLight position={[10, 10, -10]} intensity={1.5} color="#002D8F" castShadow />
      </Float>
    </group>
  );
};

export default _;
