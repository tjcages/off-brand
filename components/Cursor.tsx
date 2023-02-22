import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useMedia, mobileBreakpoint } from "../modules/useMedia";

function _() {
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  const [click, setClick] = useState(false);

  const mobile = useMedia(mobileBreakpoint);

  const vec = new THREE.Vector3();
  const { pointer, viewport } = useThree();

  useEffect(() => {
    document.addEventListener("mousedown", () => setClick(true));
    document.addEventListener("mouseup", () => setClick(false));

    return () => {
      document.removeEventListener("mousedown", () => setClick(true));
      document.removeEventListener("mouseup", () => setClick(false));
    };
  }, []);

  useFrame(() => {
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;

    // hide if cursor hasn't moved
    if (x === 0 && y === 0) {
      ref.current.visible = false;
    } else {
      ref.current.visible = true;
    }

    if (ref.current) {
      ref.current.position.lerp(vec.set(x, y, 0), 0.2);

      if (click) {
        ref.current.scale.lerp(vec.set(0.2, 0.2, 0.2), 0.2);
      } else {
        ref.current.scale.lerp(vec.set(1, 1, 1), 0.2);
      }
    }
  });

  return mobile ? null : (
    <mesh ref={ref} position={[0, -100, 0]}>
      <circleGeometry attach="geometry" args={[0.05, 12]} />
      <meshBasicMaterial />
    </mesh>
  );
}

export default _;
