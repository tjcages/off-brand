import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { useRef } from "react";
import { RGBELoader } from "three-stdlib";

const _ = () => {
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/llama.glb") as any;
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");

  return (
    <e.group theatreKey="insiders-llama" castShadow receiveShadow>
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
    </e.group>
  );
};

export default _;
