import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { Html, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useSnapshot } from "valtio";

import styles from "@/styles/plane.module.scss";
import { DataProps } from "@/data";
import { Distortion } from "@/components/effects";
import { state } from "@/store";

extend({ Distortion });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortion: any;
    }
  }
}

interface Props {
  item: DataProps;
  texture: THREE.Texture;
  index: number;
}

const _ = ({ item, texture, index }: Props) => {
  const snap = useSnapshot(state);
  const { x, y, z } = item;

  let size = { width: 2, height: 2 };
  const ratio = texture.image.naturalWidth / texture.image.naturalHeight;

  if (ratio < 1) {
    size = { width: 2 * ratio, height: 2 };
  } else size = { width: 2, height: 2 / ratio };

  const gl = useThree();
  const scroll = useScroll();

  const ref = useRef() as any;
  const matRef = useRef() as any;

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.time += delta;
    matRef.current.speed = snap.speed * 15;
  });

  useFrame(({ clock, camera }) => {
    if (snap.view == "intro") {
      ref.current.lookAt(camera.position);
      // move in a figure 8 shape around the center axis
      const t = clock.getElapsedTime() + index * 0.5;
      const r = 10.0;
      const x = (r * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
      const y =
        (r * Math.sin(t) * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
      // const z = r * Math.cos(b * t);
      ref.current.position.set(x, y, z);
    }
  });

  useEffect(() => {
    gsap.to(ref.current.material.uniforms.opacity, {
      duration: 1,
      delay: 0.5 + index * 0.1,
      value: 1,
      ease: "expo",
    });
  }, []);

  useEffect(() => {
    if (snap.view == "grid") {
      gsap.to(ref.current.position, {
        duration: 2,
        x: state.items[index].x,
        y: state.items[index].y,
        z: 0,
        ease: "expo",
      });

      gsap.to(ref.current.rotation, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: "expo",
      });
    } else if (snap.view == "linear") {
      gsap.to(ref.current.position, {
        ease: "expo",
        duration: 1.5,
        x: gl.viewport.width * 0.5,
        y: -index * 2,
        z: -state.zoom.linear,
      });
    }

    scroll.el.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [snap.view]);

  const handleClick = () => {
    const split = 1 / snap.items.length;
    const offset = index * split;
    scroll.el.scrollTo({
      top: offset * scroll.el.scrollHeight,
      left: 0,
      behavior: "auto",
    });
  };

  return (
    <mesh
      ref={ref}
      position={[x || 0, y || 0, z || 0]}
      onClick={() => {
        if (snap.view == "linear") handleClick();
      }}
    >
      <planeGeometry args={[size.width, size.height, 32, 32]} />
      <distortion
        frameAspect={size.width / size.height}
        textureAspect={texture.image.naturalWidth / texture.image.naturalHeight}
        ref={matRef}
        tex={texture}
        opacity={0}
      />
      <Html distanceFactor={7.5}>
        <div
          className={`${styles.annotation} ${
            snap.view == "grid" ? styles.visible : ""
          }`}
        >
          ({index.toString().padStart(2, "0")})
        </div>
      </Html>
    </mesh>
  );
};

export default _;
