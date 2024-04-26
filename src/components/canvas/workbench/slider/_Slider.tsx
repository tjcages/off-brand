import { useDevice } from "@/utils";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import { Glow } from "@/components/canvas/_shared";

import DesktopSlider from "./_DesktopSlider";
import MobileSlider from "./_MobileSlider";

interface Props {
  show?: boolean;
  visible?: number;
  ui: string[];
  heights: number[];
}

const _ = ({ show, visible, ui, heights }: Props) => {
  const { isMobile, isSafari } = useDevice();
  const glowRef = useRef() as React.MutableRefObject<THREE.Mesh>;

  useEffect(() => {
    if (show) {
      gsap.to(glowRef.current.scale, {
        x: 6,
        y: 3,
        z: 1,
        duration: 3,
        delay: 1,
        ease: "expo.inOut"
      });
    } else {
      gsap.to(glowRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.2,
        ease: "expo.out",
        overwrite: true
      });
    }
  }, [show]);

  return (
    <>
      {isMobile || isSafari ? (
        <MobileSlider show={show} visible={visible} ui={ui} heights={heights} />
      ) : (
        <DesktopSlider visible={visible} ui={ui} heights={heights} />
      )}
      <mesh ref={glowRef} position={[0, 0, -0.2]} scale={0}>
        <sphereGeometry args={[2, 18, 18]} />
        <Glow glowColor="#635bff" falloff={1} />
      </mesh>
    </>
  );
};

export default _;
