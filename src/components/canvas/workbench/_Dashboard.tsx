import { state } from "@/store";
import { useDevice } from "@/utils";
import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
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
  const { wbSelectedModal } = useSnapshot(state);
  const ref1 = useRef() as React.MutableRefObject<THREE.Mesh>;
  const ref2 = useRef() as React.MutableRefObject<THREE.Mesh>;
  const [showUI, setShowUI] = useState(false);

  useFrame((_, delta) => {
    easing.damp(ref1.current.material, "radius", 0.025, 0.2, delta);
    easing.damp(ref2.current.material, "radius", 0.025, 0.2, delta);
  });

  // Background animation
  useEffect(() => {
    if (!ref1 || !ref2) return;
    if (visible) {
      gsap.to([ref1.current.material, ref2.current.material], {
        opacity: 0.5,
        duration: 0.5,
        delay: 1.5,
        ease: "expo.out",
        onComplete: () => {
          setShowUI(true);
          onVisible && onVisible(true);
        }
      });
    } else {
      setShowUI(false);
      onVisible && onVisible(false);
      gsap.to([ref1.current.material, ref2.current.material], {
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
        position={[0, isMobile ? 1 : 1.5, isMobile ? 1.5 : 0]}
        scale={0.5}
      />
      {/* <Pagination
        visible={showUI}
        step={modalStep}
        total={4}
        setStep={(step: number) => (state.wbSelectedModal = step)}
        position={isMobile ? [0, -0.7, -1.5] : undefined}
      />
      <ModalNav
        visible={showUI}
        modalStep={wbSelectedModal}
        lastStep={4}
        setModalStep={step => (state.wbSelectedModal = step)}
      /> */}

      <group>
        <Image
          ref={ref1}
          visible={wbSelectedModal === 3 || wbSelectedModal === 4}
          url="/textures/stripe/workbench/dashboard2.png"
          // @ts-expect-error –no alt prop
          alt="Workbench"
          scale={[4, 2.59]}
          position={[0, -0.2, -0.5]}
          transparent
          opacity={0}
        />
        <Image
          ref={ref2}
          visible={wbSelectedModal !== 3 && wbSelectedModal !== 4}
          url="/textures/stripe/workbench/dashboard1.png"
          // @ts-expect-error –no alt prop
          alt="Workbench"
          scale={[4, 2.59]}
          position={[0, -0.2, -0.5]}
          transparent
          opacity={0}
        />
      </group>
    </>
  );
};

export default _;
