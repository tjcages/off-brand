import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { Html, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useSnapshot } from "valtio";

import styles from "@/styles/plane.module.scss";
import { DataProps } from "@/data";
import { state } from "@/store";
import { Distortion } from "@/components/effects";

extend({ Distortion });

interface Props {
  item: DataProps;
  texture: THREE.Texture;
  index: number;
}

const _ = ({ item, texture, index }: Props) => {
  const snap = useSnapshot(state);
  const { x, y, z } = item;

  // determine sizing based on texture aspect ratio
  let size = { width: 2, height: 2 };
  const ratio = texture.image.naturalWidth / texture.image.naturalHeight;
  if (ratio < 1) {
    size = { width: 2 * ratio, height: 2 };
  } else size = { width: 2, height: 2 / ratio };

  const gl = useThree();
  const scroll = useScroll();

  const [hover, set] = useState(false);
  const ref = useRef() as any;
  const matRef = useRef() as any;
  const localView = useRef(state.view) as any;

  // distortion animation
  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.time += delta;
    matRef.current.speed = snap.speed * 15;
  });

  // intro animation
  useFrame(({ clock, camera }) => {
    if (snap.view == "intro") {
      ref.current.lookAt(camera.position);
      // move in a figure 8 shape around the center axis
      const t = clock.getElapsedTime() * 0.85 + index * 0.3;
      const r = 10.0;
      const x = (r * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
      const y =
        (r * Math.sin(t) * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
      ref.current.position.set(x, y, z);
    }
  });

  // intro opacity animation
  useEffect(() => {
    gsap.to(ref.current.material.uniforms.opacity, {
      duration: 1,
      delay: 0.5 + index * 0.1,
      value: 1,
      ease: "expo.out",
    });
  }, []);

  // views animation
  useEffect(() => {
    if (snap.view == "grid") {
      // grid view animation
      const gridAnim = () => {
        gsap.to(ref.current.position, {
          duration: 2,
          delay: 0.1 + index * 0.01,
          x: state.items[index].x,
          y: state.items[index].y,
          z: 0,
          ease: "expo.out",
        });
      };

      if (localView.current == "intro") {
        // infinity to grid animation
        gsap
          .to(ref.current.position, {
            duration: 0.5,
            x: 0,
            y: -1.5,
            z: 0,
            ease: "expo.out",
          })
          .then(() => {
            gridAnim();
          });

        // flat rotation
        gsap.to(ref.current.rotation, {
          duration: 0.5,
          x: 0,
          y: 0,
          z: 0,
          ease: "expo.out",
        });
      } else gridAnim();
    } else if (snap.view == "linear") {
      // linear view animation
      gsap.to(ref.current.position, {
        duration: 1.5,
        x: gl.viewport.width * 0.5,
        y: -index * 2,
        z: -state.zoom.linear,
        ease: "expo.out",
      });
    }
    // set local view (manage view change history)
    localView.current = snap.view;

    // reset scroll to top
    scroll.el.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [snap.view]);

  // EXPERIMENTAL: hover animation (just for fun)
  useEffect(() => {
    let amount = 0;
    if (hover) amount = 1;
    else amount = 0;

    gsap.to(ref.current.material.uniforms.hoverValue, {
      duration: 0.5,
      value: amount,
      ease: "expo.out",
    });
  }, [hover]);

  // scroll to item
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
      onPointerEnter={() => set(true)}
      onPointerLeave={() => set(false)}
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
