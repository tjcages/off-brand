import { Image } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  visible: boolean;
  url: string;
  position?: [number, number, number];
}

const _ = ({ visible, url, position }: Props) => {
  const containerRef = useRef() as React.MutableRefObject<THREE.Group>;
  const imageRef = useRef() as React.MutableRefObject<THREE.Mesh>;

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
    }
  }, [visible]);

  return (
    <group ref={containerRef} position={position} scale={0}>
      <Image
        ref={imageRef}
        url={url}
        // @ts-expect-error –no alt prop
        alt="Sandboxes"
        transparent
        opacity={0}
      >
        {/* @ts-expect-error –yes it does exist... */}
        <bentPlaneGeometry args={[0.1, 2, 1.5, 18, 18]} />
      </Image>
    </group>
  );
};

export default _;
