import { Instances, MeshReflectorMaterial } from "@react-three/drei";

interface Props {
  lineWidth?: number;
  height?: number;
  color?: string;
}

const _ = ({ lineWidth = 0.026, height = 0.5, color = "#bbb" }: Props) => (
  <group position={[0, -0.25, 0]} rotation={[0.1, 0, 0]}>
    <Instances>
      <planeGeometry args={[lineWidth, height]} />
      <meshBasicMaterial color={color} />
      <gridHelper args={[100, 100, color, color]} position={[0, -0.01, 0]} />
    </Instances>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -10]}>
      <planeGeometry args={[20, 60]} />
      <MeshReflectorMaterial
        blur={[300, 30]}
        resolution={2048}
        mixBlur={1}
        mixStrength={180}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#202020"
        metalness={0.8}
        mirror={0}
      />
    </mesh>
  </group>
);

export default _;
