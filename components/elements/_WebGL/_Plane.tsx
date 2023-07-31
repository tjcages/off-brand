import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, extend, ThreeEvent } from "@react-three/fiber";
import { useScroll, useTexture, useAspect } from "@react-three/drei";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { isMobile } from "@/utils";

import { ProjectProps } from "@/data";
import { state } from "@/store";
import { Distortion } from "@/components/effects";

extend({ Distortion });

interface Props {
  item: ProjectProps;
  index: number;
}

const _ = ({ item, index }: Props) => {
  const snap = useSnapshot(state);
  const { x, y, z } = item;

  const gl = useThree();
  const scroll = useScroll();

  const ref = useRef() as any;
  const matRef = useRef() as any;
  const localView = useRef(state.view) as any;

  const texture = useTexture(item.preview);
  const scale = useAspect(
    texture.image.naturalWidth,
    texture.image.naturalHeight,
    1 / 7 // scaling factor
  );

  // set max width & height
  const totalWidth = gl.viewport.width * 0.7;
  const itemWidth = totalWidth / state.n - state.gap;
  const size = {
    width: itemWidth,
    height: (itemWidth * scale[1]) / scale[0],
  };
  item.size = size;

  // intro opacity animation
  useEffect(() => {
    if (!snap.loaded) return;

    gsap.to(ref.current.material.uniforms.opacity, {
      duration: 1,
      delay: 0.5 + index * 0.1,
      value: 1,
      ease: "expo.out",
    });
  }, [snap.loaded]);

  // views animation
  useEffect(() => {
    if (snap.view == "grid") {
      // // change geometry to correct aspect ratio
      // gsap.to(ref.current.scale, {
      //   duration: 1,
      //   x: size.width,
      //   y: size.height,
      //   ease: "expo.out",
      // });
      // // determine row & column
      // const row = Math.floor(index / state.n);
      // const col = index % state.n;
      // // get max height from previous rows
      // let maxHeight = 0;
      // for (let i = 0; i < row; i++) {
      //   maxHeight += state.items[i * state.n].height;
      // }
      // // get y position
      // const y =
      //   -maxHeight -
      //   row * (size.height + state.gap) +
      //   state.margin +
      //   size.height / 2.5 -
      //   (itemWidth + itemWidth / (size.width / size.height)) / 2;
      // // get x position
      // const x =
      //   col * (itemWidth + state.gap) +
      //   itemWidth / 2 -
      //   gl.viewport.width / 2 +
      //   state.gap;
      // const x =
      //   (index % state.n) * (itemWidth + state.gap) +
      //   itemWidth / 2 -
      //   gl.viewport.width / 2 +
      //   state.gap;
      // const y =
      //   -Math.floor(index / state.n) * (size.height + state.gap) +
      //   state.margin +
      //   size.height / 2.5 -
      //   (itemWidth + itemWidth / (size.width / size.height)) / 2;
    } else if (snap.view == "linear") {
      const x = (gl.viewport.width * 6) / 7 - state.size.width - state.gap;
      const y = -index * (state.size.height + state.gap);

      const xMobile = index * (state.size.width + state.gap);
      const yMobile =
        -gl.viewport.height / 2 - state.size.height / 2 + state.margin * 7;

      // linear view animation
      gsap.to(ref.current.position, {
        duration: 1,
        x: isMobile ? xMobile : x,
        y: isMobile ? yMobile : y,
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
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const offset = (index + 1) / (state.items.length + 4); // idk why 4
    scroll.el.scrollTo({
      top: isMobile ? 0 : offset * scroll.el.scrollHeight,
      left: isMobile ? offset * scroll.el.scrollWidth : 0,
      behavior: "auto",
    });
  };

  return (
    <group ref={item.ref}>
      <mesh
        ref={ref}
        position={[x || 0, y || 0, z || 0]}
        onClick={(e) => snap.view == "linear" && handleClick(e)}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "grab")}
      >
        <planeGeometry />
        <distortion
          frameAspect={snap.view == "linear" ? 1 : size.width / size.height}
          textureAspect={size.width / size.height}
          ref={matRef}
          tex={texture}
          opacity={0}
        />
      </mesh>
    </group>
  );
};

export default _;
