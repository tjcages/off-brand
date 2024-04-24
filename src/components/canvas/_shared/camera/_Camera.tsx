import { PerspectiveCamera } from "@theatre/r3f";
import { useRef } from "react";
import * as THREE from "three";

const _ = () => {
  const ref = useRef() as React.MutableRefObject<THREE.PerspectiveCamera>;
  // const { camera } = useThree();
  // const [{ pointerX, pointerY }, set] = useState({ pointerX: 0, pointerY: 0 });
  // const targetVec = useMemo(
  //   () =>
  //     new THREE.Euler(
  //       camera.rotation.x + pointerY / 12,
  //       camera.rotation.y - pointerX / 8 + pointerX / 16,
  //       0
  //     ),
  //   [camera.rotation.x, camera.rotation.y, pointerX, pointerY]
  // );

  // useFrame(({ camera, pointer }) => {
  //   // ease the camera rotation
  //   easing.dampE(camera.rotation, targetVec, 0.1, 0.01);

  //   set({ pointerX: pointer.x, pointerY: pointer.y });
  // });

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      theatreKey="Camera"
      position={[0, 0, 25]}
      fov={50}
      near={0.1}
      far={70}
    />
  );
};

export default _;
