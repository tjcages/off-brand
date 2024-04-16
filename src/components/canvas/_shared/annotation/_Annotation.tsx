import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  visible?: boolean;
  text?: string;
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
            "relative p-4 text-white bg-black/80 backdrop-blur-md whitespace-nowrap overflow-hidden pointer-events-none opacity-0 blur-sm max-w-0 max-h-0 transition-all duration-300 ease-out",
            visible && "opacity-100 blur-none max-w-full max-h-full"
          )}
        >
          <div className="absolute left-0 top-0 right-0 bottom-0 bg-white/10 diagonal" />
          <p>{text}</p>

          <div className="absolute left-0 top-0 w-1 h-1 bg-white" />
          <div className="absolute right-0 top-0 w-1 h-1 bg-white" />
          <div className="absolute left-0 bottom-0 w-1 h-1 bg-white" />
          <div className="absolute right-0 bottom-0 w-1 h-1 bg-white" />
        </div>
      </Html>
    </group>
  );
};

export default _;
