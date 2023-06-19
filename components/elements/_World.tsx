import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useTexture, useScroll } from "@react-three/drei";
// @ts-ignore
import lerp from "@14islands/lerp";
import { useSnapshot } from "valtio";
import data from "@/data";
import { state, derived } from "@/store";
import { getNewPosition, isColliding, visibleBox } from "@/utils";

import { Distortion, myLensDistortionPass } from "@/components/effects";
import { Plane } from "@/components/elements";

extend({ Distortion });

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
  const camera = useThree((state) => state.camera);

  const gl = useThree();
  const scroll = useScroll();

  const covers = useTexture(data.map((item: any) => item.cover));
  const items = data.map((item) => {
    return { ...item, x: 0, y: 0, z: -4 };
  });

  const lastPos = useRef(new THREE.Vector3(0, 0, 0));
  const distortionStrength = useRef(0);
  const focalStrength = useRef(2);

  useFrame(({ camera }, delta) => {
    let hasChanged = lastPos.current.distanceTo(camera.position) > 0.005;
    state.speed = lerp(
      snap.speed,
      camera.position.distanceTo(lastPos.current),
      0.2,
      delta
    );
    lastPos.current.copy(camera.position);

    const focalValue = 0;
    focalStrength.current = lerp(focalStrength.current, focalValue, 0.2, delta);

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
    myLensDistortionPass.focalLength.set(
      1 - focalStrength.current,
      1 - focalStrength.current
    );

    let top = 1 - (camera.position.y / state.map.height + 0.5);
    let left = camera.position.x / state.map.width + 0.5;

    state.mapPos.top = top;
    state.mapPos.left = left;

    if (hasChanged) {
      const camBox = visibleBox(camera, 0);

      state.mapPos.width = camBox.width;
      state.mapPos.height = camBox.height;
    }
  });

  useEffect(() => {
    const tempItems = [] as any; // blank array to hold new positions

    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;

    covers.forEach((cover, index) => {
      let size;
      const ratio = cover.image.naturalWidth / cover.image.naturalHeight;

      if (ratio < 1) {
        size = { width: 2 * ratio, height: 2 };
      } else size = { width: 2, height: 2 / ratio };

      let item = {
        ...items[index],
        width: size.width,
        height: size.height,
      };

      // make first item the center
      // if (index === 0) {
      //   items.push(item);
      //   return;
      // }

      let positionIsValid = false;
      let numberOfTests = 0;
      let minRadius = 2;
      let tempPos = { x: 0, y: 0, z: 10 };

      while (!positionIsValid) {
        tempPos = getNewPosition(item, minRadius);
        positionIsValid = !isColliding(tempItems, {
          ...tempPos,
          width: item.width,
          height: item.height + 0.35, // margin
        });

        numberOfTests++;
        if (numberOfTests > 10) minRadius += 0.1;
      }

      minX = Math.min(minX, tempPos.x - item.width);
      maxX = Math.max(maxX, tempPos.x + item.width);
      minY = Math.min(minY, tempPos.y - item.height);
      maxY = Math.max(maxY, tempPos.y + item.height);

      item.x = tempPos.x;
      item.y = tempPos.y;
      item.z = tempPos.z;

      tempItems.push(item);
    });

    // set the bounds of the map
    state.panLimitsGrid.min.set(
      minX - state.panMargin,
      minY - state.panMargin,
      -10
    );
    state.panLimitsGrid.max.set(
      maxX + state.panMargin,
      maxY + state.panMargin,
      10
    );

    const camBox = visibleBox(camera, 0);
    const canvasBox = {
      width: maxX - minX,
      height: maxY - minY,
    };

    state.mapPos.width = camBox.width;
    state.mapPos.height = camBox.height;
    state.map.width = canvasBox.width;
    state.map.height = canvasBox.height;

    // store the items
    state.items = tempItems;
  }, [covers]);

  // add drag listeners to scroll element
  useEffect(() => {
    const ele = scroll.el;
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e: any) {
      ele.style.cursor = "grabbing";
      ele.style.userSelect = "none";

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      ele.addEventListener("mousemove", mouseMoveHandler);
      ele.addEventListener("mouseup", mouseUpHandler);
      ele.addEventListener("mouseleave", mouseUpHandler);
    };

    const mouseMoveHandler = function (e: any) {
      const dy = e.clientY - pos.y;
      ele.scrollTop = pos.top - dy * 2; // * 2 for faster scroll
    };

    const mouseUpHandler = function () {
      ele.removeEventListener("mousemove", mouseMoveHandler);
      ele.removeEventListener("mouseup", mouseUpHandler);
      ele.removeEventListener("mouseleave", mouseUpHandler);

      ele.style.cursor = "grab";
      ele.style.removeProperty("user-select");
    };

    if (snap.view == "linear")
      ele.addEventListener("mousedown", mouseDownHandler);
    else {
      ele.removeEventListener("mousedown", mouseDownHandler);
    }

    // calculate the number of pages
    state.pages = Math.ceil(derived.scrollHeight / gl.viewport.height) + 1;
  }, [scroll.el, snap.view]);

  // detect top most image in view on scroll changes
  useEffect(() => {
    const split = 1 / snap.items.length;
    const index = Math.floor(scroll.offset / split);
    if (index < state.items.length) state.selected = state.items[index].cover;
  }, [scroll.offset]);

  return (
    <group ref={ref} position={[0, 2, 0]}>
      {items
        .slice(0, snap.view == "intro" ? 20 : items.length)
        .map((item, index) => (
          <Plane
            key={index}
            item={item}
            texture={covers[index]}
            index={index}
          />
        ))}
    </group>
  );
};

data.map((d) => d.cover).forEach(useTexture.preload);

export default _;
