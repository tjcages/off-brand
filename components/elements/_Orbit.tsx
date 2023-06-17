import { useEffect, useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, derived } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  const camera = useThree((state) => state.camera);
  const _v = new THREE.Vector3();

  const controlsRef = useRef() as any;

  // ENFORCE PAN LIMITS
  useLayoutEffect(() => {
    const handlePan = () => {
      _v.copy(controlsRef.current.target);
      controlsRef.current.target.clamp(
        derived.panLimits.min,
        derived.panLimits.max
      );
      _v.sub(controlsRef.current.target);
      camera.position.sub(_v);
    };

    controlsRef.current.addEventListener("change", handlePan);
    return () => controlsRef.current.removeEventListener("change", handlePan);
  }, []);

  useEffect(() => {
    _v.copy(controlsRef.current.target);
    controlsRef.current.target.clamp(
      derived.panLimits.min,
      derived.panLimits.max
    );
    _v.sub(controlsRef.current.target);
    camera.position.sub(_v);
  }, [snap.view]);

  return (
    <OrbitControls
      ref={controlsRef}
      panSpeed={2}
      mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
      touches={{ ONE: THREE.TOUCH.PAN }}
      enableRotate={false}
      enableZoom={false}
      screenSpacePanning={snap.view == "grid"}
      minDistance={state.zoom.gridMin}
      maxDistance={state.zoom.grid}
    />
  );
};

export default _;
