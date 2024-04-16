import { state } from "@/store";
import { Text as _Text } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const [views, set] = useState<string[]>([]);

  useEffect(() => {
    // if (selectedStep === 3) {
    gsap.delayedCall(2, () => set(["background"]));
    gsap.delayedCall(2.5, () => set(["background", "foreground"]));
    gsap.delayedCall(3, () => set(["background", "foreground", "title"]));
    // } else set([]);
  }, [selectedStep]);

  // const sheet = useCurrentSheet();
  // const objectOpacity = sheet.object("event-destinations-opacity", {
  //   opacity: 0,
  // });

  return (
    <e.group theatreKey="event-destinations-content" position={[0, 2.5, -13]}>
      <_Text visible={views.includes("title")} position={[0, 1.2, 0]} fontSize={0.2}>
        Event Destinations
      </_Text>

      <mesh rotation={[0, Math.PI, 0]} visible={views.includes("background")}>
        <boxGeometry args={[4, 2, 0.1]} />
        <meshBasicMaterial color="lightgrey" />
      </mesh>

      <mesh
        position={[0, -0.25, 1]}
        rotation={[0, Math.PI, 0]}
        visible={views.includes("foreground")}
      >
        <boxGeometry args={[2, 1, 0.1]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </e.group>
  );
};

export default _;
