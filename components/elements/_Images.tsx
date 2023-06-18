import { useEffect, useRef, createRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useTexture, useScroll } from "@react-three/drei";
import gsap, { Expo } from "gsap";
// @ts-ignore
import lerp from "@14islands/lerp";
import { useSnapshot } from "valtio";
import { getNewPosition, isColliding, visibleBox } from "@/utils";
import data from "@/data";
import { state, derived } from "@/store";
import Plane from "./_Plane";
import { myLensDistortionPass } from "@/components/effects";

const _ = () => {
  const snap = useSnapshot(state);
  const camera = useThree((state) => state.camera);
  const covers = useTexture(data.map((item: any) => item.cover));
  const gl = useThree();
  const scroll = useScroll();

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
    if (!covers) return;

    let items = [] as any;

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
        ...data[index],
        x: 0,
        y: 0,
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

      let tempPos = { x: 0, y: 0, z: 0 };

      while (!positionIsValid) {
        tempPos = getNewPosition(item, minRadius);
        // add space for the text in height
        positionIsValid = !isColliding(items, {
          ...tempPos,
          width: item.width,
          height: item.height + 0.35,
        });

        numberOfTests++;
        if (numberOfTests > 10) minRadius += 0.1;
      }

      minX = Math.min(minX, tempPos.x - item.width);
      maxX = Math.max(maxX, tempPos.x + item.width);
      minY = Math.min(minY, tempPos.y - item.height);
      maxY = Math.max(maxY, tempPos.y + item.height);

      items.push({ ...item, ...tempPos });
    });

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

    state.items = items;
    state.itemsCopy = items.map((item: any) => ({ ...item }));
  }, [covers]);

  useEffect(() => {
    snap.items.forEach((_, index) => {
      gsap.to(state.items[index], {
        z: 0,
        duration: 2,
        delay: 1,
        ease: "expo",
      });
    });
  }, [state.items]);

  useEffect(() => {
    camera.position.set(0, 0, 1.2);
    snap.items.forEach((_, index: number) => {
      // jank fucking way of getting viewport width (cause useThree resizes)
      var vFOV = THREE.MathUtils.degToRad(140); // convert vertical fov to radians
      var height = 2 * Math.tan(vFOV / 2) * 1.2; // visible height
      var width = height * gl.viewport.aspect; // visible width

      gsap.to(state.items[index], {
        ease: Expo.easeOut,
        duration: snap.view == "grid" ? 2 : 1.5,
        x:
          snap.view == "grid"
            ? state.itemsCopy[index].x
            : camera.position.x + width / 2,
        y: snap.view == "grid" ? state.itemsCopy[index].y : 0 - index * 2,
        z: snap.view == "grid" ? 0 : -state.zoom.linear,
      });
    });

    scroll.el.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [snap.view]);

  // detect top most image in view on scroll changes
  useEffect(() => {
    const split = 1 / snap.items.length;
    const index = Math.floor(scroll.offset / split);

    state.selected =
      index < data.length ? data[index].cover : data[data.length - 1].cover;
  }, [scroll.offset]);

  // scroll to top when view changes
  useEffect(() => {
    // scroll to top
    gsap.to(scroll, {
      current: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    state.pages =
      Math.ceil((derived.scrollHeight * 1.25) / gl.viewport.height) + 1; // extra 1.25 for margin
  }, [snap.view]);

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
  }, [scroll.el, snap.view]);

  return (
    <group>
      {snap.items.length &&
        data.map((project, index) => (
          <Plane
            itemData={snap.items[index]}
            index={index}
            key={project.name + index}
            project={data[index]}
            texture={covers[index]}
          />
        ))}
    </group>
  );
};

data.map((d) => d.cover).forEach(useTexture.preload);

export default _;
