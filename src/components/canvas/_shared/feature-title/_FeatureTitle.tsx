import { state } from "@/store";
import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useSnapshot } from "valtio";

import { ScrambleText } from "@/components/ui/_shared";

interface Props {
  text?: string;
  description?: string;
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  visible?: boolean;
}

const _ = ({ text, description, position, scale, visible = true }: Props) => {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { hoveredStep } = useSnapshot(state);

  const getTitle = () => {
    switch (hoveredStep) {
      case 1:
        return "Sandboxes";
      case 2:
        return "Workbench";
      case 3:
        return "Event Destinations";
      default:
        return "";
    }
  };

  // useFrame(({ camera }) => {
  //   if (ref.current) ref.current.lookAt(camera.position);
  // });

  return (
    <group ref={ref} visible={visible} position={position} scale={scale}>
      <Html transform>
        <div className="flex flex-col items-center justify-center text-white">
          <h3>
            <ScrambleText>{visible ? (text !== undefined ? text : getTitle()) : ""}</ScrambleText>
          </h3>
          {description !== undefined && (
            <p
              className={cn(
                "text-[7px] transition-opacity duration-500 ease-in-out",
                visible ? "opacity-70 delay-1000" : "opacity-0 delay-0"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </Html>
    </group>
  );
};

export default _;
