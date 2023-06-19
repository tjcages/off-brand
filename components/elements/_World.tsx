import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import data from "@/data";
import { Distortion } from "@/components/effects";

extend({ Distortion });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortion: any;
    }
  }
}

interface Props {
  item: any;
  index: number;
}

function Word({ item, index }: Props) {
  const ref = useRef() as any;
  const texture = useTexture(item.cover) as THREE.Texture;
  const { width, height } = texture.image;

  useFrame(({ clock, camera }) => {
    ref.current.lookAt(camera.position);

    // move in a figure 8 shape around the center axis
    const t = clock.getElapsedTime() + index * 0.5;
    const r = 12.0;
    const a = 1.0;
    const b = 0.25;
    const x = (r * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
    const y = (r * Math.sin(t) * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
    // const z = r * Math.cos(b * t);
    ref.current.position.set(x, y, 0);
  });

  useEffect(() => {
    gsap.to(ref.current.material.uniforms.opacity, {
      duration: 1,
      delay: 0.5 + index * 0.1,
      value: 1,
      ease: "expo",
    });
  });

  return (
    <mesh ref={ref} position={[0, 0, 10]}>
      <planeGeometry args={[3, 3]} />
      <distortion
        frameAspect={width / height}
        textureAspect={texture.image.naturalWidth / texture.image.naturalHeight}
        tex={texture}
        opacity={0}
      />
    </mesh>
  );
}

const _ = () => {
  const ref = useRef() as any;

  useEffect(() => {
    setTimeout(() => {
      gsap.to(ref.current.scale, {
        duration: 3,
        x: 1,
        y: 1,
        z: 1,
        ease: "expo",
      });
    }, 1000);
  });

  return (
    <group ref={ref} position={[0, 3, -3]} scale={0}>
      {data.slice(0, 20).map((item, index) => (
        <Word key={index} item={item} index={index} />
      ))}
    </group>
  );
};

data.map((d) => d.cover).forEach(useTexture.preload);

export default _;
