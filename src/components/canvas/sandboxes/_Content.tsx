import { Image } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Glow } from "@/components/canvas/_shared";

interface Props {
  visible: boolean;
  url: string;
  position?: [number, number, number];
  size?: {
    width: number;
    height: number;
  };
  scaleGlow?: number;
}

const _ = ({
  visible,
  url,
  position,
  size = {
    width: 2,
    height: 1.5
  },
  scaleGlow = 1
}: Props) => {
  const containerRef = useRef() as React.MutableRefObject<THREE.Group>;
  const imageRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  const glowRef = useRef() as React.MutableRefObject<THREE.Mesh>;
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    if (!imageRef || !containerRef) return;
    if (visible) {
      gsap.to(imageRef.current.material, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        ease: "expo.in"
      });
      gsap.to(containerRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        delay: 0.5,
        ease: "expo.inOut"
      });
      gsap.to(glowRef.current.scale, {
        x: size.width * 3 * scaleGlow,
        y: size.height * scaleGlow,
        z: 1 * scaleGlow,
        duration: 3,
        delay: 0.25,
        ease: "expo.inOut"
      });
    } else {
      gsap.to(imageRef.current.material, {
        opacity: 0,
        duration: 0.25,
        ease: "expo.in"
      });
      gsap.to(containerRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 0.5,
        ease: "expo.out"
      });
      gsap.to(glowRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.5,
        ease: "expo.out",
        overwrite: true
      });
    }
  }, [scaleGlow, size.height, size.width, visible]);

  useEffect(() => {
    if (hovered) {
      gsap.to(imageRef.current.scale, {
        x: size.width * 1.1,
        y: size.height * 1.1,
        duration: 0.5,
        ease: "expo.inOut"
      });
    } else {
      gsap.to(imageRef.current.scale, {
        x: size.width * 1.1,
        y: size.height * 1.1,
        duration: 0.5,
        ease: "expo.out"
      });
    }
  }, [hovered, size.height, size.width]);

  return (
    <group ref={containerRef} position={position} scale={0} renderOrder={1}>
      <Image
        ref={imageRef}
        url={url}
        // @ts-expect-error –no alt prop
        alt="Sandboxes"
        scale={[size.width, size.height]}
        transparent
        opacity={0}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      />
      {/* <bentPlaneGeometry args={[0.1, size.width, size.height, 18, 18]} /> */}
      <mesh ref={glowRef} position={[0, 0, -0.1]} scale={0}>
        <sphereGeometry args={[2, 18, 18]} />
        <Glow glowColor="#635bff" falloff={1} />
      </mesh>
    </group>
  );
};

export default _;
