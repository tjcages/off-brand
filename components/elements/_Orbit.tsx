import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { state } from "@/store";

const _ = () => {
  const camera = useThree((state) => state.camera);
  const _v = new THREE.Vector3();

  const controlsRef = useRef() as any;

  // ENFORCE PAN LIMITS
  useLayoutEffect(() => {
    const handlePan = () => {
      _v.copy(controlsRef.current.target);
      controlsRef.current.target.clamp(
        state.panLimits.min,
        state.panLimits.max
      );
      _v.sub(controlsRef.current.target);
      camera.position.sub(_v);
    };

    controlsRef.current.addEventListener("change", handlePan);
    return () => controlsRef.current.removeEventListener("change", handlePan);
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      panSpeed={2}
      mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
      touches={{ ONE: THREE.TOUCH.PAN }}
      enableRotate={false}
      enableZoom={true}
      screenSpacePanning={true}
      minDistance={1}
      maxDistance={1.6}
    />
  );
};

export default _;
