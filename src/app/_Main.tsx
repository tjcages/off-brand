"use client";

import { Canvas, UI } from "@/components";
import { state } from "@/store";
import { ScrollControls } from "@react-three/drei";
import { Canvas as _Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

const steps = [null, null, "sandboxes", "workbench", "event-destinations", "insiders"] as const;

const _ = () => {
  const { selectedStep } = useSnapshot(state);

  useEffect(() => {
    // depending on the selected step, set the step=step in the url
    if (selectedStep && selectedStep > 1) {
      const url = new URL(location.href);
      url.searchParams.set("step", steps?.[selectedStep] as string);
      history.replaceState(null, "", url.toString());
    } else {
      history.replaceState(null, "", location.href.split("?")[0]);
    }
  }, [selectedStep]);

  return (
    <main className="fixed left-0 right-0 bottom-0 top-0 w-full h-full bg-black overflow-hidden">
      <_Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance"
        }}
        performance={{ min: 1 }}
      >
        <ScrollControls pages={0}>
          <Canvas />
        </ScrollControls>
      </_Canvas>

      <UI />
    </main>
  );
};

export default _;
