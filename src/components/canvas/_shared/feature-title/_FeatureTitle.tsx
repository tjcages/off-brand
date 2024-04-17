import { state } from "@/store";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useSnapshot } from "valtio";

import { ScrambleText } from "@/components/ui/_shared";

interface Props {
  text?: string;
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  visible?: boolean;
}

const _ = ({ text, position, scale, visible = true }: Props) => {
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
        <h3 className="text-white">
          <ScrambleText>{visible ? (text !== undefined ? text : getTitle()) : ""}</ScrambleText>
        </h3>
      </Html>
    </group>
  );
};

export default _;
