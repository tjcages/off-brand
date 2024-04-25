import { useDevice } from "@/utils";
import { Float, MeshTransmissionMaterial, useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { RGBELoader } from "three-stdlib";

const _ = () => {
  const { isMobile } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/llama.glb") as any;
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");
  const map = useTexture("/textures/llama/aoMap.png");

  return (
    <group
      castShadow
      receiveShadow
      position={[isMobile ? 2 : -1.28, isMobile ? 0.25 : -1.75, isMobile ? 0.8 : -0.14]}
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
            aoMap={map}
          />
        </mesh>
        <directionalLight position={[10, 10, -10]} intensity={1.5} color="#002D8F" castShadow />
      </Float>
    </group>
  );
};

export default _;
