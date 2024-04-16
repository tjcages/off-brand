import { Text as _Text } from "@react-three/drei";
import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const [views, set] = useState<string[]>([]);

  useEffect(() => {
    if (selectedStep === 3) {
      gsap.delayedCall(1, () => set([]));
    } else {
      gsap.delayedCall(2, () => set(["background"]));
      gsap.delayedCall(2.5, () => set(["background", "foreground"]));
      gsap.delayedCall(3, () => set(["background", "foreground", "title"]));
    }
  }, [selectedStep]);

  // const sheet = useCurrentSheet();
  // const objectOpacity = sheet.object("workbench-opacity", {
  //   opacity: 0,
  // });

  return (
    <e.group theatreKey="workbench-content" position={[0, 2, -10.5]}>
      <_Text
        visible={views.includes("title")}
        position={[0, 1.2, 0]}
        fontSize={0.2}
      >
        Workbench
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
