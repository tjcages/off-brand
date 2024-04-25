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
import ModalNav from "@/components/canvas/sandboxes/_ModalNav";
import Pagination from "@/components/canvas/sandboxes/pagination";

interface Props {
  visible: boolean;
  modalStep?: number;
  onVisible?: (visible: boolean) => void;
}

const _ = ({ visible, modalStep, onVisible }: Props) => {
  const { isMobile, isSafari } = useDevice();
  const { edSelectedModal } = useSnapshot(state);
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
        text="Event Destinations"
        description="Stripe events, delivered to cloud destinations."
        cta={{
          label: "Request access",
          href: "https://insiders.stripe.dev/t/join-the-event-destinations-beta/54"
        }}
        tag={{
          text: "Beta",
          color: "blue"
        }}
        position={[isMobile ? 0.025 : 0, isMobile ? 1.7 : 1.7, isMobile ? 1.5 : 0]}
        scale={0.5}
      />
      <Pagination
        visible={showUI}
        step={modalStep}
        total={3}
        setStep={(step: number) => (state.edSelectedModal = step)}
        position={[
          isMobile ? 0 : isSafari ? 3 : 3.33,
          isMobile ? -0.5 : 0,
          isMobile ? -1.5 : -2.12
        ]}
      />
      <ModalNav
        visible={showUI}
        position={[0, 0, isMobile ? 0 : -0.3]}
        modalStep={edSelectedModal}
        setModalStep={step => (state.edSelectedModal = step)}
      />

      <Image
        ref={ref}
        url={"/textures/stripe/dashboard.png"}
        // @ts-expect-error –no alt prop
        alt="Event Destinations"
        scale={[4, 2.59]}
        position={[0, 0.1, -0.5]}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        transparent
        opacity={0}
      />
    </>
  );
};

export default _;
