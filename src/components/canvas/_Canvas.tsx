"use client";

import { state } from "@/store";
import { useDevice } from "@/utils";
import { PerformanceMonitor } from "@react-three/drei";
import round from "lodash/round";
import { Suspense, useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import EventsIcon from "@/components/canvas/_shared/float-text/_EventsIcon";
import SandboxIcon from "@/components/canvas/_shared/float-text/_SandboxIcon";
import WorkbenchIcon from "@/components/canvas/_shared/float-text/_WorkbenchIcon";

import {
  Camera,
  Characters,
  Environment,
  FloatText,
  Grid,
  Lighting,
  Postprocessing
} from "./_shared";
import EventDestinations from "./event-destinations";
import Insiders from "./insiders";
import Sandboxes from "./sandboxes";
import Workbench from "./workbench";

const _ = () => {
  const { isMobile } = useDevice();
  const { selectedStep, graphics } = useSnapshot(state);
  const [dpr, setDpr] = useState(1.5);

  // Graphics quality
  useEffect(() => {
    if (dpr > 1.25) state.graphics = "high";
    else if (dpr > 0.75) state.graphics = "medium";
    else state.graphics = "low";
  }, [dpr]);

  useEffect(() => {
    if ((selectedStep || 0) > 1) state.hoveredStep = null;
  }, [selectedStep]);

  return (
    <>
      <PerformanceMonitor
        onChange={({ factor, fps }) => {
          let newDPR = round(0.5 + 1.5 * factor, 1);
          newDPR = Math.max(1, newDPR);
          if (fps < 30) setDpr(Math.min(1, newDPR));
          else setDpr(newDPR);
        }}
      />
      <Suspense>
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 5, 7.5]} />
        <ambientLight intensity={1} />
        <Lighting />

        {/* Placeholder for Effect glitch */}
        <FloatText scale={0} text="" />
        <group scale={0.6} position={[0, 0.25, -0.5]}>
          <SandboxIcon
            step={1}
            position={[isMobile ? -2.65 : -2.75, 0.75, 0]}
            annotation="Sandboxes"
            annotationPosition={[0.25, 0, 1]}
          />
          <WorkbenchIcon step={2} annotation="Workbench" annotationPosition={[0, 0, 2]} />
          <EventsIcon
            step={3}
            position={[isMobile ? 1.5 : 1.65, 0.8, 0]}
            annotation="Event Destinations"
            annotationPosition={[1.25, -0.25, 0]}
          />
        </group>

        <Sandboxes />
        <Workbench />
        <EventDestinations />
        <Insiders />

        <Grid color="#222222" isMobile={isMobile} />

        {!isMobile && (
          <group position={[0, 1, -2]}>
            <Characters />
          </group>
        )}

        {!isMobile && ["high", "medium"].includes(graphics) && <Postprocessing />}
        <Environment background={false} />

        <Camera />
      </Suspense>
    </>
  );
};

export default _;
