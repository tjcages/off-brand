import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, extend } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useSnapshot } from "valtio";

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

  const gl = useThree();
  const scroll = useScroll();

  const ref = useRef() as any;
  const matRef = useRef() as any;
  const localView = useRef(state.view) as any;

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
      // create a nxy grid & include width & height
      const totalWidth = gl.viewport.width * 0.7;
      const itemWidth = totalWidth / state.n - state.gap;
      const itemHeight = itemWidth * 1.8;

      // change geometry to correct aspect ratio
      const ratio = texture.image.naturalWidth / texture.image.naturalHeight;
      ref.current.geometry = new THREE.PlaneGeometry(
        itemWidth,
        itemWidth / ratio,
        1,
        1
      );

      const x =
        (index % state.n) * (itemWidth + state.gap) +
        itemWidth / 2 -
        gl.viewport.width / 2 +
        state.gap;
      const y =
        -Math.floor(index / state.n) * (itemHeight + state.gap) +
        state.margin +
        itemHeight / 2.5 -
        (itemWidth + itemWidth / ratio) / 2;

      // set grid position
      gsap.to(ref.current.position, {
        duration: 1,
        x: x,
        y: y,
        z: 0,
        ease: "expo.out",
      });
    } else if (snap.view == "linear") {
      const x = (gl.viewport.width * 6) / 7 - state.size.width - state.gap;
      const y = -index * (state.size.height + state.gap);
      // linear view animation
      gsap.to(ref.current.position, {
        duration: 1,
        x: x,
        y: y,
        z: -1,
        ease: "expo.out",
      });

      ref.current.geometry = new THREE.PlaneGeometry(
        state.size.width,
        state.size.height,
        1,
        1
      );
    }
    // set local view (manage view change history)
    localView.current = snap.view;
  }, [snap.view]);

  // scroll to item
  const handleClick = () => {
    const split = 1 / (snap.items.length + 1);
    const offset = (index + 1) * split;
    scroll.el.scrollTo({
      top: offset * scroll.el.scrollHeight,
      left: 0,
      behavior: "auto",
    });
  };

  return (
    <group>
      <mesh
        ref={ref}
        position={[x || 0, y || 0, z || 0]}
        onClick={() => {
          if (snap.view == "linear") handleClick();
        }}
      >
        <planeGeometry args={[state.size.width, state.size.height, 32, 32]} />
        <distortion
          frameAspect={1}
          textureAspect={
            texture.image.naturalWidth / texture.image.naturalHeight
          }
          ref={matRef}
          tex={texture}
          opacity={0}
        />
      </mesh>
    </group>
  );
};

export default _;
