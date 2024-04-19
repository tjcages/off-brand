import { state } from "@/store";
import { Image, useCursor } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

interface Props {
  visible?: boolean;
  position?: [number, number, number];
}

const _ = ({ visible, position }: Props) => {
  const { selectedStep, sbSelectedModal, wbSelectedModal, edSelectedModal } = useSnapshot(state);
  const [hoveredNext, setHoverNext] = useState(false);
  const [hoveredLast, setHoverLast] = useState(false);
  const nextRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  const lastRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  useCursor(hoveredNext || hoveredLast);

  const onClickNext = () => {
    switch (selectedStep) {
      case 2:
        if (sbSelectedModal === undefined) return;
        if (sbSelectedModal > 2) return;
        else state.sbSelectedModal = sbSelectedModal + 1;
        break;
      case 3:
        if (wbSelectedModal === undefined) return;
        if (wbSelectedModal > 2) return;
        else state.wbSelectedModal = wbSelectedModal + 1;
        break;
      case 4:
        if (edSelectedModal === undefined) return;
        if (edSelectedModal > 2) return;
        else state.edSelectedModal = edSelectedModal + 1;
        break;
    }
  };

  const onClickLast = () => {
    switch (selectedStep) {
      case 2:
        if (sbSelectedModal === undefined) return;
        if (sbSelectedModal < 2) return;
        else state.sbSelectedModal = sbSelectedModal - 1;
        break;
      case 3:
        if (wbSelectedModal === undefined) return;
        if (wbSelectedModal < 2) return;
        else state.wbSelectedModal = wbSelectedModal - 1;
        break;
      case 4:
        if (edSelectedModal === undefined) return;
        if (edSelectedModal < 2) return;
        else state.edSelectedModal = edSelectedModal - 1;
        break;
    }
  };

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
  });

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
  }, [hoveredNext, visible]);

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
  }, [hoveredLast, visible]);

  return (
    <group position={position}>
      <group position={[2.75, 0, 0]}>
        <mesh
          onPointerDown={onClickNext}
          onPointerEnter={() => setHoverNext(true)}
          onPointerLeave={() => setHoverNext(false)}
          position={[0, 0, -0.1]}
        >
          <planeGeometry args={[0.7, 0.7]} />
          <meshBasicMaterial transparent opacity={0} />
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
      </group>
      <group position={[-2.75, 0, 0]}>
        <mesh
          onPointerDown={onClickLast}
          onPointerEnter={() => setHoverLast(true)}
          onPointerLeave={() => setHoverLast(false)}
          position={[0, 0, -0.1]}
        >
          <planeGeometry args={[0.7, 0.7]} />
          <meshBasicMaterial transparent opacity={0} />
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
      </group>
    </group>
  );
};

export default _;
