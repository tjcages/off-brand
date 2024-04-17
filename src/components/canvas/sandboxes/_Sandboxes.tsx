import { state } from "@/store";
import { Image } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import { FeatureTitle } from "@/components/canvas/_shared";

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const [views, set] = useState<string[]>([]);

  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  const uiRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((_, delta) => {
    easing.damp3(uiRef.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(ref.current.material, "radius", hovered ? 0.1 : 0.025, 0.2, delta);
    easing.damp(ref.current.material, "zoom", hovered ? 1.25 : 1, 0.2, delta);
  });

  useEffect(() => {
    if (selectedStep === 2) {
      gsap.delayedCall(1, () => set(["background"]));
      gsap.delayedCall(1.5, () => set(["background", "foreground"]));
      gsap.delayedCall(3, () => set(["background", "foreground", "title"]));
    } else set([]);
  }, [selectedStep]);

  return (
    <e.group theatreKey="sandboxes-content" position={[0, 2, -8]}>
      <FeatureTitle
        visible={views.includes("title")}
        text="Sandboxes"
        position={[0, 1.6, 0]}
        scale={0.5}
      />

      <e.group theatreKey="sandboxes-content/view" visible={views.includes("background")}>
        <Image
          ref={ref}
          url={"/textures/stripe/dashboard.png"}
          // @ts-expect-error –no alt prop
          alt="Sandboxes"
          side={THREE.DoubleSide}
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
          transparent
          opacity={0.5}
        >
          {/* @ts-expect-error –yes it does exist... */}
          <bentPlaneGeometry args={[0.025, 4, 2.8, 20, 20]} />
        </Image>
      </e.group>

      <e.group
        theatreKey="sandboxes-content/ui"
        visible={views.includes("foreground")}
        position={[0, -0.25, 1]}
      >
        <Image
          ref={uiRef}
          url={"/textures/stripe/sandboxes/ui.png"}
          // @ts-expect-error –no alt prop
          alt="Sandboxes"
          transparent
          side={THREE.DoubleSide}
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
        >
          {/* @ts-expect-error –yes it does exist... */}
          <bentPlaneGeometry args={[0.1, 2, 1.5, 15, 15]} />
        </Image>
      </e.group>

      {/* <mesh
        position={[0, -0.25, 1]}
        rotation={[0, Math.PI, 0]}
        visible={views.includes("foreground")}
      >
        <boxGeometry args={[2, 1, 0.1]} />
        <meshBasicMaterial color="white" />
      </mesh> */}
    </e.group>
  );
};

export default _;
