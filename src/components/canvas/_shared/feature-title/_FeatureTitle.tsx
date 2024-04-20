import { state } from "@/store";
import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useSnapshot } from "valtio";

import { ScrambleText } from "@/components/ui/_shared";

import Tag from "./_Tag";

interface Props {
  text?: string;
  description?: string;
  tag?: {
    text: string;
    color: string;
    x?: number;
  };
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  visible?: boolean;
}

const _ = ({ text, description, tag, position, scale, visible = true }: Props) => {
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

  return (
    <group ref={ref} visible={visible} position={position} scale={scale}>
      <Html transform>
        <div className="relative flex flex-col items-center justify-center text-white">
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
          {tag && <Tag tag={tag} visible={visible} />}
        </div>
      </Html>
    </group>
  );
};

export default _;
