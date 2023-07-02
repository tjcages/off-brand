import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, useScroll } from "@react-three/drei";
// @ts-ignore
import lerp from "@14islands/lerp";
import { useSnapshot } from "valtio";

import data from "@/data";
import { state, derived } from "@/store";
import { getNewPosition, isColliding, visibleBox } from "@/utils";
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
  const covers = useTexture(data.map((item: any) => item.cover));
  const items = data.map((item) => {
    return { ...item, x: 0, y: 0, z: -4 }; // set initial position
  });

  // track speed & distortion
  const lastPos = useRef(new THREE.Vector3(0, 0, 0));
  const distortionStrength = useRef(0);
  const focalStrength = useRef(2);

  // track map position, speed, & distortion
  useFrame(({ camera }, delta) => {
    // speed affecting distortion
    state.speed = lerp(state.speed, scroll.delta, 0.2, delta);
    lastPos.current.copy(camera.position);

    // speed affecting distortion
    if (myLensDistortionPass) {
      let distortionValue = 0;
      distortionValue += snap.speed * 2;
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
    if (scroll.offset <= split) state.selected = null;
    else {
      const index = Math.floor(scroll.offset / split) - 1;
      if (index < state.items.length)
        state.selected = {
          src: state.items[index].cover,
          size: {
            width: covers[index].image.naturalWidth,
            height: covers[index].image.naturalHeight,
          },
        };
    }
  });

  // update items positions
  useEffect(() => {
    const tempItems = [] as any;
    covers.forEach((cover, index) => {
      // get size of item based on image ratio
      let size;
      const ratio = cover.image.naturalWidth / cover.image.naturalHeight;
      if (ratio < 1) {
        size = { width: state.size.width * ratio, height: state.size.height };
      } else
        size = { width: state.size.width, height: state.size.height / ratio };

      // create item
      let item = {
        ...items[index],
        width: size.width,
        height: size.height,
      };
      tempItems.push(item);
    });

    // save the items
    state.items = tempItems;

    // calculate the number of pages
    const pages =
      Math.ceil(
        tempItems
          .map(() => state.size.height + state.gap)
          .reduce((a: number, b: number) => a + b, 0) / gl.viewport.height
      ) + 1; // +1 for extra scroll space
    state.pages = pages;
  }, [covers]);

  // add drag listeners to scroll element
  useEffect(() => {
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

    // calculate the number of pages
    if (snap.items.length > 0)
      state.pages =
        snap.view == "linear"
          ? snap.items
              .map(() => state.size.height + state.gap)
              .reduce((a: number, b: number) => a + b, 0) /
              gl.viewport.height +
            1 // +1 for extra scroll space;
          : snap.items
              .map((i) => i.height + state.gap)
              .reduce((a: number, b: number) => a + b, state.size.height) /
            gl.viewport.height;
  }, [scroll.el, snap.view]);

  return (
    <group ref={ref} position={[0, -gl.viewport.height / 4, 0]}>
      {items.map((item, index) => (
        <Plane key={index} item={item} texture={covers[index]} index={index} />
      ))}
    </group>
  );
};

// preload all textures
data.map((d) => d.cover).forEach(useTexture.preload);

export default _;
