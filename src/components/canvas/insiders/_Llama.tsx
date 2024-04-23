import { Float, useGLTF } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";

const _ = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/llama.glb") as any;

  return (
    <e.group theatreKey="insiders-llama" castShadow receiveShadow>
      <Float>
        <mesh geometry={nodes.mesh_0.geometry} scale={[1, 1, 1]} position={[0, 1, 0]}>
          <meshStandardMaterial roughness={0.9} metalness={0.1} color="white" />
        </mesh>
      </Float>
    </e.group>
  );
};

export default _;
