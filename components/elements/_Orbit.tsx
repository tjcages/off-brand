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
  const pan = new THREE.Vector3();

  // enforce pan limits
  useLayoutEffect(() => {
    const handlePan = () => {
      pan.copy(controlsRef.current.target);
      controlsRef.current.target.clamp(
        derived.panLimits.min,
        derived.panLimits.max
      );
      pan.sub(controlsRef.current.target);
      camera.position.sub(pan);
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
    controls.reset(); // this function killed me ...
  }, [snap.view]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        panSpeed={2}
        touches={{ ONE: THREE.TOUCH.PAN }}
        mouseButtons={{ LEFT: THREE.MOUSE.PAN }}
        enableRotate={false}
        screenSpacePanning={true}
        enablePan={snap.view == "grid"}
        enableZoom={snap.view == "grid"}
        minDistance={state.zoom.gridMin}
        maxDistance={state.zoom.grid}
      />
    </>
  );
};

export default _;
