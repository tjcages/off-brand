import { useEffect, useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, derived } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  const camera = useThree((state) => state.camera);
  const controlsRef = useRef() as any;
  const _v = new THREE.Vector3();

  // enforce pan limits
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

  // add grab cursor
  useEffect(() => {
    const ele = document.body;

    const mouseDownHandler = function (e: any) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";

      ele.addEventListener("mouseup", mouseUpHandler);
      ele.addEventListener("mouseleave", mouseUpHandler);
    };

    const mouseUpHandler = function () {
      ele.removeEventListener("mouseup", mouseUpHandler);
      ele.removeEventListener("mouseleave", mouseUpHandler);

      ele.style.cursor = "grab";
    };

    ele.addEventListener("mousedown", mouseDownHandler);

    return () => ele.removeEventListener("mousedown", mouseDownHandler);
  }, []);

  // reset camera on view change
  useEffect(() => {
    const controls = controlsRef.current;

    camera.position.set(0, 0, 1.2);
    controls.reset();
  }, [snap.view]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        panSpeed={2}
        mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
        touches={{ ONE: THREE.TOUCH.PAN }}
        enablePan={snap.view == "grid"}
        enableRotate={false}
        enableZoom={snap.view == "grid"}
        screenSpacePanning={true}
        minDistance={state.zoom.gridMin}
        maxDistance={state.zoom.grid}
      />
    </>
  );
};

export default _;
