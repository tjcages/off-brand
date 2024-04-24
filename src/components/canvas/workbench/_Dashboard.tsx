import { state } from "@/store";
import { useDevice } from "@/utils";
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
import ModalNav from "@/components/canvas/sandboxes/_ModalNav";
import Pagination from "@/components/canvas/sandboxes/pagination";

interface Props {
  visible: boolean;
  modalStep?: number;
  onVisible?: (visible: boolean) => void;
}

const _ = ({ visible, modalStep, onVisible }: Props) => {
  const { isMobile, isTablet } = useDevice();
  const { wbSelectedModal } = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  const [showUI, setShowUI] = useState(false);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((_, delta) => {
    easing.damp(ref.current.material, "radius", hovered ? 0.03 : 0.025, 0.2, delta);
  });

  // Background animation
  useEffect(() => {
    if (!ref) return;
    if (visible) {
      gsap.to(ref.current.material, {
        opacity: 0.5,
        duration: 0.5,
        delay: 1.5,
        ease: "expo.in",
        onComplete: () => {
          setShowUI(true);
          onVisible && onVisible(true);
        }
      });
    } else {
      setShowUI(false);
      onVisible && onVisible(false);
      gsap.to(ref.current.material, {
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "expo.in",
        overwrite: true
      });
    }
  }, [visible, onVisible]);

  return (
    <>
      <FeatureTitle
        visible={showUI}
        icon
        text="Workbench"
        description="Developer tools, redesigned for where you work."
        cta={{
          label: "Join the beta",
          href: "https://insiders.stripe.dev/t/join-the-workbench-beta/30"
        }}
        tag={{
          text: "Beta",
          color: "blue"
        }}
        position={[isMobile ? 0.2 : 0, isMobile ? 1.35 : 1.7, isMobile ? 1.5 : 0]}
        scale={0.5}
      />
      <Pagination
        theatreKey="wb-page"
        visible={showUI}
        step={modalStep}
        total={4}
        setStep={(step: number) => (state.wbSelectedModal = step)}
        position={[0, isMobile ? -0.1 : 0, isMobile ? 0.3 : 0]}
      />
      <ModalNav
        visible={showUI}
        position={[0, 0, isMobile ? 0 : -0.4]}
        modalStep={wbSelectedModal}
        lastStep={4}
        setModalStep={step => (state.wbSelectedModal = step)}
      />

      <e.group theatreKey="workbench-content/view">
        <Image
          ref={ref}
          url={"/textures/stripe/dashboard.png"}
          // @ts-expect-error –no alt prop
          alt="Workbench"
          onPointerOver={pointerOver}
          onPointerOut={pointerOut}
          transparent
          opacity={0}
        >
          {/* @ts-expect-error –yes it does exist... */}
          <bentPlaneGeometry args={[0.025, 4, 2.59, 19, 19]} />
        </Image>
      </e.group>
    </>
  );
};

export default _;
