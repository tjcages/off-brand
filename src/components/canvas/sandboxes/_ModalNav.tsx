import { state } from "@/store";
import { useDevice, useKeyPress } from "@/utils";
import { config, useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { Image, useCursor } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

interface Props {
  visible?: boolean;
  modalStep?: number;
  lastStep?: number;
  setModalStep?: (step: number) => void;
}

const _ = ({ visible, modalStep, lastStep = 3, setModalStep }: Props) => {
  const { isMobile } = useDevice();
  const { selectedStep } = useSnapshot(state);
  const [hoveredNext, setHoverNext] = useState(false);
  const [hoveredLast, setHoverLast] = useState(false);
  const [tappedNext, setTapNext] = useState(false);
  const [tappedLast, setTapLast] = useState(false);
  const nextRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  const lastRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  useCursor(hoveredNext || hoveredLast);

  const onClickNext = () => {
    setTapNext(true);
    setTimeout(() => setTapNext(false), 100);
    if (modalStep === undefined) return;
    if (modalStep > lastStep - 1) {
      if (selectedStep === 2) state.selectedStep = 3;
      else if (selectedStep === 3) state.selectedStep = 4;
      else if (selectedStep === 4) state.selectedStep = 5;
    } else setModalStep && setModalStep(modalStep + 1);
  };

  const onClickLast = () => {
    setTapLast(true);
    setTimeout(() => setTapLast(false), 100);
    if (modalStep === undefined) return;
    if (modalStep < 2) {
      if (selectedStep === 2) state.selectedStep = 1;
      else if (selectedStep === 3) state.selectedStep = 2;
      else if (selectedStep === 4) state.selectedStep = 3;
    } else setModalStep && setModalStep(modalStep - 1);
  };

  useKeyPress("ArrowRight", onClickNext);
  useKeyPress("ArrowLeft", onClickLast);

  useEffect(() => {
    if (!nextRef || !lastRef) return;
    if (visible) {
      gsap.to(nextRef.current.material, {
        opacity: 0.3,
        duration: 1,
        delay: 2,
        ease: "expo.in"
      });
      gsap.to(lastRef.current.material, {
        opacity: 0.3,
        duration: 1,
        delay: 2,
        ease: "expo.in"
      });
    } else {
      gsap.to(nextRef.current.material, {
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        overwrite: true
      });
      gsap.to(lastRef.current.material, {
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        overwrite: true
      });
    }
  }, [visible, modalStep]);

  useEffect(() => {
    if (!nextRef) return;
    if (!visible) return;
    if (hoveredNext) {
      gsap.to(nextRef.current.material, {
        opacity: 0.5,
        duration: 0.5,
        ease: "expo.in"
      });
    } else {
      gsap.to(nextRef.current.material, {
        opacity: 0.3,
        duration: 0.5,
        ease: "expo.out"
      });
    }
  }, [hoveredNext, modalStep, visible]);

  useEffect(() => {
    if (!lastRef) return;
    if (!visible) return;
    if (hoveredLast) {
      gsap.to(lastRef.current.material, {
        opacity: 0.5,
        duration: 0.5,
        ease: "expo.in"
      });
    } else {
      gsap.to(lastRef.current.material, {
        opacity: 0.3,
        duration: 0.5,
        ease: "expo.out"
      });
    }
  }, [hoveredLast, modalStep, visible]);

  const [{ wobbleNext, wobbleLast }] = useSpring(
    {
      wobbleNext: tappedNext ? (isMobile ? 0.5 : 0.25) : isMobile ? 2 : 1,
      wobbleLast: tappedLast ? (isMobile ? 0.5 : 0.25) : isMobile ? 2 : 1,
      config: n => (n === "wobble" ? { mass: 2.5, tension: 1000, friction: 25 } : config.molasses)
    },
    [tappedNext, tappedLast, isMobile]
  );

  return (
    <group>
      <a.group
        position={[isMobile ? 1 : 2.25, isMobile ? -1.75 : 0, 0]}
        scale={wobbleNext}
        onPointerDown={onClickNext}
        onPointerEnter={() => setHoverNext(true)}
        onPointerLeave={() => setHoverNext(false)}
      >
        <mesh position={[0.25, 0, -0.5]} visible={false}>
          <planeGeometry args={[0.35, 0.7]} />
        </mesh>
        <Image
          ref={nextRef}
          url="/icons/chevron-right.png"
          // @ts-expect-error –no alt prop
          alt="chevron"
          scale={[0.1, 0.1]}
          transparent
          opacity={0.5}
        />
      </a.group>
      <a.group
        position={[isMobile ? -1 : -2.25, isMobile ? -1.75 : 0, 0]}
        scale={wobbleLast}
        onPointerDown={onClickLast}
        onPointerEnter={() => setHoverLast(true)}
        onPointerLeave={() => setHoverLast(false)}
      >
        <mesh position={[-0.25, 0, -0.5]} visible={false}>
          <planeGeometry args={[0.35, 0.7]} />
        </mesh>
        <Image
          ref={lastRef}
          url="/icons/chevron-right.png"
          // @ts-expect-error –no alt prop
          alt="chevron"
          scale={[0.1, 0.1]}
          rotation={[0, 0, Math.PI]}
          transparent
          opacity={0.5}
        />
      </a.group>
    </group>
  );
};

export default _;
