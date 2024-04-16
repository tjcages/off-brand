import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

const _ = () => {
  const light = useRef() as React.MutableRefObject<THREE.SpotLight>;

  useFrame((state, delta) => {
    easing.damp3(light.current.position, [state.pointer.x * 12, 0, 8 + state.pointer.y * 4], 0.2, delta)
  })

  return (
    <>
      <ambientLight intensity={0.025} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight
        intensity={1}
        distance={7}
        angle={1}
        penumbra={1}
        position={[0, 0, 1]}
      />

      <spotLight
        angle={0.5}
        penumbra={0.5}
        ref={light}
        castShadow
        intensity={10}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 100]}
        />
      </spotLight>
    </>
  );
};

export default _;
