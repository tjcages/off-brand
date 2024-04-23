import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { ScrambleText } from "@/components/ui/_shared";

interface Props {
  visible?: boolean;
  text: string;
  position?: [number, number, number];
}

const _ = ({ visible = false, text, position }: Props) => {
  const ref = useRef<THREE.Group | null>(null);

  useFrame(({ camera }) => {
    if (ref.current) ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref} renderOrder={10}>
      <Html transform position={position} scale={0.25} pointerEvents="none">
        <div
          className={cn(
            "relative flex flex-col items-start justify-start gap-2 w-full max-w-sm px-4 py-2.5 text-[20px] text-white bg-black/80 border border-white/10 outline outline-2 rounded-lg backdrop-blur-md overflow-hidden pointer-events-none transition-all duration-300 ease-out",
            visible
              ? "opacity-100 scale-100 outline-offset-2 outline-blue"
              : "opacity-0 scale-75 outline-offset-0 outline-blue/0 pointer-events-none"
          )}
        >
          <ScrambleText>{visible ? text : ""}</ScrambleText>
        </div>
      </Html>
    </group>
  );
};

export default _;
