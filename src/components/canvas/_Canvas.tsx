"use client";

import { state } from "@/store";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { val } from "@theatre/core";
import { PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import {
  Characters,
  Environment,
  FeatureTitle,
  FloatText,
  Grid,
  Lighting,
  Postprocessing
} from "./_shared";
import EventDestinations from "./event-destinations";
import Sandboxes from "./sandboxes";
import Workbench from "./workbench";

studio.initialize();
studio.extend(extension);

const snapPoints = [0, 0.15, 0.35, 0.55, 0.75, 1];

const _ = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const { selectedStep } = useSnapshot(state);

  const currentSnapPoint = snapPoints[selectedStep ?? 0];
  const currentSequencePosition = useRef(0);

  // Update playhead position on each frame depending on the selected step
  useFrame(() => {
    if (!sheet) return;

    // Snap to scroll points
    if (
      currentSequencePosition.current <= currentSnapPoint - 0.000001 ||
      currentSequencePosition.current >= currentSnapPoint + 0.000001
    )
      currentSequencePosition.current = gsap.utils.interpolate(
        currentSequencePosition.current,
        currentSnapPoint,
        0.0125
      );

    if (selectedStep === 4 && currentSequencePosition.current >= 0.9999)
      currentSequencePosition.current = 0;

    // Update the "position" of the playhead in the sequence, as a fraction of its whole length
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = currentSequencePosition.current * sequenceLength;
  });

  // useFrame(() => {
  //   if (!sheet) return;
  //   // Update the "position" of the playhead in the sequence, as a fraction of its whole length
  //   const sequenceLength = val(sheet.sequence.pointer.length);
  //   sheet.sequence.position = scroll.offset * sequenceLength;
  // });

  useEffect(() => {
    if (!sheet) return;
    sheet.project.ready.then(() =>
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 9] })
    );
  }, [sheet]);

  return (
    <Suspense>
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#000", 5, 7.5]} />
      <ambientLight intensity={1} />
      <Lighting />

      {/* Placeholder for Effect glitch */}
      <FloatText text="" step={-1} />
      <group scale={0.6} position={[0, 0.25, -0.5]}>
        <FloatText
          step={1}
          id="sandboxes"
          text="</>"
          annotation="Sandboxes"
          annotationPosition={[0.25, 0, 1]}
        />
        <FloatText
          step={2}
          id="workbench"
          text="[...]"
          annotation="Workbench"
          annotationPosition={[0, 0, 2]}
        />
        <FloatText
          step={3}
          id="events"
          text="{ }"
          annotation="Event Destinations"
          annotationPosition={[1.25, -0.25, 0]}
        />
        <FeatureTitle position={[0, 3.1, -1]} />
      </group>

      <Sandboxes />
      <Workbench />
      <EventDestinations />

      <Grid color="#222222" />

      <group position={[0, 1, -2]} visible={selectedStep === null || selectedStep < 2}>
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
    </Suspense>
  );
};

export default _;
