"use client";

import { Canvas, UI } from "@/components";
import { flyThroughSheet } from "@/theatre";
import { ScrollControls } from "@react-three/drei";
import { Canvas as _Canvas } from "@react-three/fiber";
import { SheetProvider } from "@theatre/r3f";

const _ = () => {
  return (
    <main className="fixed left-0 right-0 bottom-0 top-0 w-full h-full bg-black overflow-hidden">
      <_Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance"
        }}
        performance={{ min: 1 }}
      >
        <ScrollControls pages={5}>
          <SheetProvider sheet={flyThroughSheet}>
            <Canvas />
          </SheetProvider>
        </ScrollControls>
      </_Canvas>

      <UI />
    </main>
  );
};

export default _;
