import { state } from "@/store";
import { cn } from "@/utils";
import { Html, Image } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import { FeatureTitle } from "@/components/canvas/_shared";
import { ScrambleText } from "@/components/ui/_shared";

import Content from "./_Content";

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const [views, set] = useState<string[]>([]);
  const [modalStep, setModalStep] = useState(0);

  const imageRef = useRef() as React.MutableRefObject<THREE.Mesh>;

  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((_, delta) => {
    easing.damp(imageRef.current.material, "radius", hovered ? 0.03 : 0.025, 0.2, delta);
  });

  useEffect(() => {
    set(["background"]);
  }, [selectedStep]);

  // Background animation
  useEffect(() => {
    if (!imageRef) return;
    if (selectedStep === 2) {
      gsap.to(imageRef.current.material, {
        opacity: 0.5,
        duration: 0.5,
        delay: 1.5,
        ease: "expo.in",
        onComplete: () => {
          set(["background", "foreground", "title"]);
          setModalStep(1);
        }
      });
    } else {
      set(["background"]);
      setModalStep(0);
      gsap.to(imageRef.current.material, {
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "expo.in",
        overwrite: true
      });
    }
  }, [selectedStep]);

  return (
    <e.group theatreKey="sandboxes-content" position={[0, 2, -8]}>
      <FeatureTitle
        visible={views.includes("title")}
        text="Sandboxes"
        position={[0, 1.6, 0]}
        scale={0.5}
      />
      <e.group theatreKey="sb-page">
        <Html transform scale={0.175} pointerEvents="none">
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-4 p-4 bg-white/20 backdrop-blur-md rounded-full transition-opacity duration-300 delay-1000 ease-in-out",
              views.includes("foreground") ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 bg-white rounded-full cursor-pointer pointer-events-auto",
                modalStep > 0 ? "opacity-100" : "opacity-20"
              )}
              onClick={() => setModalStep(1)}
            />
            <div
              className={cn(
                "w-4 h-4 bg-white rounded-full cursor-pointer pointer-events-auto",
                modalStep > 1 ? "opacity-100" : "opacity-20"
              )}
              onClick={() => setModalStep(2)}
            />
            <div
              className={cn(
                "w-4 h-4 bg-white rounded-full cursor-pointer pointer-events-auto",
                modalStep > 2 ? "opacity-100" : "opacity-20"
              )}
              onClick={() => setModalStep(3)}
            />
          </div>
        </Html>
      </e.group>

      <e.group theatreKey="sandboxes-content/view">
        <Image
          ref={imageRef}
          url={"/textures/stripe/dashboard.png"}
          // @ts-expect-error –no alt prop
          alt="Sandboxes"
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
          transparent
          opacity={0}
        >
          {/* @ts-expect-error –yes it does exist... */}
          <bentPlaneGeometry args={[0.025, 4, 2.8, 19, 19]} />
        </Image>
      </e.group>

      <Content
        visible={views.includes("foreground") && modalStep === 1}
        url={"/textures/stripe/sandboxes/ui1.png"}
        position={[0, -0.25, 1]}
      />

      <Content
        visible={views.includes("foreground") && modalStep === 2}
        url={"/textures/stripe/sandboxes/ui2.png"}
        position={[0, -0.25, 1]}
      />

      <e.group theatreKey="sb-modal-1" position={[-1.5, 0.5, 1]} renderOrder={10}>
        <Html transform scale={0.175} pointerEvents="none">
          <div
            className={cn(
              "relative flex flex-col items-start justify-start gap-2 w-full max-w-sm p-4 text-white bg-black/80 border border-white/10 rounded-lg backdrop-blur-md overflow-hidden pointer-events-none transition-all duration-300 delay-500 ease-out",
              modalStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            )}
          >
            <h1>
              <ScrambleText>
                {modalStep === 1 ? "Unlimited Isolated Environments" : ""}
              </ScrambleText>
            </h1>
            <p className="opacity-70">
              Work on feature branches in parallel or have a dedicated and isolated environment for
              staging and development.
            </p>
          </div>
        </Html>
      </e.group>

      <e.group theatreKey="sb-modal-2" position={[1.5, 0.5, 1]} renderOrder={10}>
        <Html transform scale={0.175} pointerEvents="none">
          <div
            className={cn(
              "relative flex flex-col items-start justify-start gap-2 w-full max-w-sm p-4 text-white bg-black/80 border border-white/10 rounded-lg backdrop-blur-md overflow-hidden pointer-events-none transition-all duration-300 delay-500 ease-out",
              modalStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            )}
          >
            <h1>
              <ScrambleText>{modalStep === 2 ? "Templates" : ""}</ScrambleText>
            </h1>
            <p className="opacity-70">
              Populate sandboxes with realistic test data templates available for SaaS or retail to
              start testing quickly.
            </p>
          </div>
        </Html>
      </e.group>
    </e.group>
  );
};

export default _;
