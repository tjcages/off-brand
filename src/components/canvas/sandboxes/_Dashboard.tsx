import { state } from "@/store";
import { useDevice } from "@/utils";
import { Image } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import { FeatureTitle } from "@/components/canvas/_shared";

interface Props {
  visible: boolean;
  modalStep?: number;
  onVisible?: (visible: boolean) => void;
}

const _ = ({ visible, modalStep, onVisible }: Props) => {
  const { isMobile } = useDevice();
  const { sbSelectedModal } = useSnapshot(state);
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
        text="Sandboxes"
        description="Test mode, evolved. Work safely in your own Sandbox."
        cta={{
          label: "Request access",
          href: "https://insiders.stripe.dev/t/join-the-sandboxes-beta/32"
        }}
        tag={{
          text: "Beta",
          color: "blue"
        }}
        position={[0, isMobile ? 1.3 : 1.5, isMobile ? 1.3 : 0]}
        scale={0.5}
      />
      {/* <Pagination
        visible={showUI}
        step={modalStep}
        total={3}
        setStep={(step: number) => (state.sbSelectedModal = step)}
      />
      <ModalNav
        visible={showUI}
        modalStep={sbSelectedModal}
        setModalStep={step => (state.sbSelectedModal = step)}
      /> */}

      <Image
        ref={ref}
        url={"/textures/stripe/sandboxes/dashboard.png"}
        // @ts-expect-error –no alt prop
        alt="Sandboxes"
        scale={[4, 2.8]}
        position={[0, 0, isMobile ? 0 : -0.5]}
        rotation={[0, 0, 0]}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        transparent
        opacity={0}
      />
    </>
  );
};

export default _;
