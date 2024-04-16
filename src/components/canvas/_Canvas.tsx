"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import {
  editable as e,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { val } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { state } from "@/store";
import { useEffect, useRef } from "react";

import {
  Postprocessing,
  Environment,
  FloatText,
  Lighting,
  Characters,
  Grid,
} from "./_shared"
import Sandboxes from "./sandboxes";
import Workbench from "./workbench";
import EventDestinations from "./event-destinations";

import { useSnapshot } from "valtio";

studio.initialize();
studio.extend(extension);

const snapPoints = [0, 0.2, 0.4, 0.675, 1];

const _ = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const { ready, selectedStep } = useSnapshot(state);

  const currentSnapPoint = snapPoints[selectedStep ?? 0];
  const currentSequencePosition = useRef(0);

  // Update playhead position on each frame depending on the selected step
  // useFrame(() => {
  //   if (!sheet) return;

  //   // Snap to scroll points
  //   if (
  //     currentSequencePosition.current <= currentSnapPoint - 0.0001 ||
  //     currentSequencePosition.current >= currentSnapPoint + 0.0001
  //   )
  //     currentSequencePosition.current = gsap.utils.interpolate(
  //       currentSequencePosition.current,
  //       currentSnapPoint,
  //       0.0125
  //     );

  //   if (selectedStep === 4 && currentSequencePosition.current >= 0.9999)
  //     currentSequencePosition.current = 0;

  //   // Update the "position" of the playhead in the sequence, as a fraction of its whole length
  //   const sequenceLength = val(sheet.sequence.pointer.length);
  //   sheet.sequence.position = currentSequencePosition.current * sequenceLength;
  // });

  useFrame(() => {
    if (!sheet) return;
    // Update the "position" of the playhead in the sequence, as a fraction of its whole length
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  useEffect(() => {
    if (!sheet) return;
    sheet.project.ready.then(() =>
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 9] })
    );
  }, [sheet]);

  return (
    <>
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#000", 5, 7.5]} />
      <ambientLight intensity={1} />
      <Lighting />

      {/* Placeholder for Effect glitch */}
      <FloatText text="" step={-1} />
      <group scale={0.6} position={[0, 0.25, -0.5]}>
        <e.group theatreKey="float-sandboxes">
          <FloatText
            step={0}
            text="</>"
            annotation="Sandboxes"
            position={[-2.75, 0.75, 0]}
            annotationPosition={[0.25, 0, 2]}
            rotation={[0, 0, 0.25]}
            scale={0.8}
          />
        </e.group>
        <e.group theatreKey="float-workbench">
          <FloatText
            step={1}
            text="[...]"
            annotation="Workbench"
            position={[-0.5, 1.2, 0]}
            annotationPosition={[0, 0, 3]}
            rotation={[0, 0, 0.25]}
            scale={0.7}
          />
        </e.group>
        <e.group theatreKey="float-events">
          <FloatText
            step={2}
            text="{ }"
            annotation="Event Destinations"
            annotationPosition={[1.25, -0.25, 0]}
            position={[1.25, 1, 0]}
            rotation={[0, -0.25, -0.25]}
            scale={0.9}
          />
        </e.group>
      </group>

      {/* {selectedStep === 0 && <Sandboxes />} */}
      <Sandboxes />
      <Workbench />
      <EventDestinations />

      <Grid color="#222222" />

      <group
        position={[0, 1, -2]}
        visible={selectedStep === null || selectedStep < 1}
      >
        <Characters />
      </group>

      <Postprocessing />
      <Environment background={false} />

      <PerspectiveCamera
        makeDefault
        theatreKey="Camera"
        position={[0, 0, 25]}
        fov={50}
        near={0.1}
        far={70}
      />
    </>
  );
};

export default _;
