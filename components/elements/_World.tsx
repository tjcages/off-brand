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
  position: THREE.Vector3 | undefined;
  texture: THREE.Texture;
  index: number;
}

function Word({ position, texture, index }: Props) {
  const ref = useRef() as any;
  const { width, height } = texture.image;

  useFrame(({ camera }) => {
    ref.current.lookAt(camera.position);
  });

  useEffect(() => {
    gsap.to(ref.current.position, {
      duration: 2,
      delay: index * 0.1,
      x: position?.x,
      y: position?.y,
      z: position?.z,
      ease: "expo",
    });

    gsap.to(ref.current.material.uniforms.opacity, {
      duration: 2,
      delay: index * 0.1,
      value: 1,
      ease: "expo",
    });
  }, [position]);

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

  const count = useMemo(() => Math.ceil(Math.sqrt(data.length)), []);
  const radius = 20;

  const items = useMemo(() => {
    const temp = [];
    const covers = useTexture(data.map((item: any) => item.cover));
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / (count + 1);
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          covers[i + j],
        ]);
    return temp;
  }, [count, radius]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // slowly reduce speed of rotation
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      ref.current.rotation.y + Math.sin(1 / time),
      0.1
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      ref.current.rotation.x + 1 / time,
      0.1
    );
  });

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
    <group ref={ref} position={[0, 1, -20]} scale={0}>
      {items.map(([pos, texture], index) => (
        <Word
          key={index}
          position={(pos as THREE.Vector3) || undefined}
          texture={texture as THREE.Texture}
          index={index}
        />
      ))}
    </group>
  );
};

data.map((d) => d.cover).forEach(useTexture.preload);

export default _;
