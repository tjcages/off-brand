import { useRef, useEffect, createRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTexture } from "@react-three/drei";
import gsap from "gsap";
// @ts-ignore
import lerp from "@14islands/lerp";
import { useSnapshot } from "valtio";

import { projects } from "@/data";
import { state } from "@/store";
import { isMobile } from "@/utils";
import { myLensDistortionPass } from "@/components/effects";
import { Plane } from "@/components/elements";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortion: any;
    }
  }
}

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as any;

  const gl = useThree();
  const scroll = useScroll();

  // load textures
  const items = projects.map((item) => {
    return { ...item, x: 0, y: 0, z: -4, ref: createRef() }; // set initial position
  });

  // track speed & distortion
  const lastPos = useRef(new THREE.Vector3(0, 0, 0));
  const distortionStrength = useRef(0);
  const focalStrength = useRef(2);

  // update items
  useEffect(() => {
    state.items = items;
  }, []);

  // track map position, speed, & distortion
  useFrame(({ camera }, delta) => {
    // speed affecting distortion
    state.speed = lerp(state.speed, scroll.delta, 0.2, delta);
    lastPos.current.copy(camera.position);

    // speed affecting distortion
    if (myLensDistortionPass) {
      let distortionValue = 0;
      distortionValue += snap.speed * (isMobile ? 4 : 3);
      distortionStrength.current = lerp(
        distortionStrength.current,
        distortionValue,
        0.2,
        delta
      );
      myLensDistortionPass.distortion.set(
        distortionStrength.current,
        distortionStrength.current
      );
      // focal length affecting distortion
      focalStrength.current = lerp(focalStrength.current, 0, 0.2, delta);
      myLensDistortionPass.focalLength.set(
        1 - focalStrength.current,
        1 - focalStrength.current
      );
    }

    // detect top most image in view on scroll changes
    const split = 1 / (snap.items.length + 1);
    if (scroll.offset <= split) {
      state.selected = null;
      state.currentIndex = -1;
    } else {
      const index = Math.floor(scroll.offset / split) - 1;
      if (index < state.items.length && snap.currentIndex !== index) {
        if (state.hoverProject !== state.items[index].id)
          state.hoverProject = null;
        state.currentIndex = index;
        state.selected = {
          id: state.items[index].id,
          src: state.items[index].preview,
        };
      }
    }
  });

  // add drag listeners to scroll element
  useEffect(() => {
    if (!isMobile) {
      const ele = scroll.el;
      let pos = { top: 0, left: 0, x: 0, y: 0 };

      // mouse start handler
      const mouseDownHandler = function (e: any) {
        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          x: e.clientX,
          y: e.clientY,
        };

        document.body.style.cursor = "grabbing";
        // add mouse events
        ele.addEventListener("mousemove", mouseMoveHandler);
        ele.addEventListener("mouseup", upHandler);
        ele.addEventListener("mouseleave", upHandler);
        // add touch events
        ele.addEventListener("touchmove", touchMoveHandler);
        ele.addEventListener("touchend", upHandler);
      };

      // touch start handler
      const touchDownHandler = function (e: any) {
        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };

        // add touch events
        ele.addEventListener("touchmove", touchMoveHandler);
        ele.addEventListener("touchend", upHandler);
      };

      // mouse move handler
      const mouseMoveHandler = function (e: any) {
        const dy = e.clientY - pos.y;
        ele.scrollTop = pos.top - dy * 2; // * 2 for faster scroll
      };

      // touch move handler
      const touchMoveHandler = function (e: any) {
        console.log(e);
        const dy = e.touches[0].clientY - pos.y;
        ele.scrollTop = pos.top - dy * 2; // * 2 for faster scroll
      };

      // up handler
      const upHandler = function () {
        document.body.style.cursor = "grab";
        // remove mouse events
        ele.removeEventListener("mousemove", mouseMoveHandler);
        ele.removeEventListener("mouseup", upHandler);
        ele.removeEventListener("mouseleave", upHandler);
        // remove touch events
        ele.removeEventListener("touchmove", touchMoveHandler);
        ele.removeEventListener("touchend", upHandler);
        ele.removeEventListener("touchcancel", upHandler);
      };

      if (snap.view == "linear") {
        // add mouse start events
        ele.addEventListener("mousedown", mouseDownHandler);
        // add touch start events
        ele.addEventListener("touchstart", touchDownHandler);
      } else {
        // remove events
        ele.removeEventListener("mousedown", mouseDownHandler);
        ele.removeEventListener("touchstart", mouseDownHandler);
      }
    }

    // calculate the number of pages
    if (items.length > 0)
      state.pages =
        snap.view == "linear"
          ? isMobile
            ? Math.ceil(
                items
                  .map(() => state.size.width + state.gap)
                  .reduce((a: number, b: number) => a + b, 0) /
                  gl.viewport.width
              ) + 0.25 // +0.25 for extra scroll space
            : Math.ceil(
                items
                  .map(() => state.size.height + state.gap)
                  .reduce((a: number, b: number) => a + b, 0) /
                  gl.viewport.height
              )
          : 5; // TO DO: calculate pages for grid view
  }, [scroll.el, snap.view]);

  useEffect(() => {
    switch (snap.view) {
      case "grid":
        // iterate through items, setting position to a grid with n columns
        snap.items
          .map((item) => item.ref)
          .filter((e) => e)
          .forEach((ref, i) => {
            const x =
              (i % state.n) * ((items[i].size?.width ?? 1) + state.gap) +
              gl.viewport.width +
              state.gap;
            const y =
              -Math.floor(i / state.n) * (state.size.height + state.gap) +
              state.margin +
              state.size.height / 2.5 -
              (state.size.width + state.size.width / (4 / 7)) / 2;

            gsap.to(ref.current.position, {
              duration: 1,
              x: x,
              y: y,
              z: 0,
              ease: "expo.out",
            });

            // change geometry to correct aspect ratio
            gsap.to(ref.current.scale, {
              duration: 1,
              x: items[i].size?.width ?? 1,
              y: items[i].size?.height ?? 1,
              ease: "expo.out",
            });
          });
        break;
      case "linear":
        break;
    }
  }, [snap.view]);

  return (
    <group ref={ref} position={[0, -gl.viewport.height / 4, 0]}>
      {items.map((item, index) => (
        <Plane key={index} item={item} index={index} />
      ))}
    </group>
  );
};

// preload all textures
projects.map((d) => d.preview).forEach(useTexture.preload);

export default _;
