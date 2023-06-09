import { useEffect, useRef, createRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
// @ts-ignore
import lerp from "@14islands/lerp";
import { useSnapshot } from "valtio";
import { getNewPosition, isColliding, visibleBox } from "@/utils";
import data from "@/data";
import { state } from "@/store";
import Plane from "./_Plane";

const _ = () => {
  const snap = useSnapshot(state);
  const camera = useThree((state) => state.camera);
  const covers = useTexture(data.map((item: any) => item.coverImg));

  let projectIsOpened = createRef() as any;

  const lastPos = useRef(new THREE.Vector3(0, 0, 0));
  const isHolding = useRef(false);
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

    const focalValue =
      isHolding.current && !projectIsOpened.current.isOpened ? 0.3 : 0;
    focalStrength.current = lerp(focalStrength.current, focalValue, 0.2, delta);

    let distortionValue =
      isHolding.current && !projectIsOpened.current.isOpened ? 0.2 : 0;
    distortionValue += snap.speed * 3;
    distortionStrength.current = lerp(
      distortionStrength.current,
      distortionValue,
      0.2,
      delta
    );
    // myLensDistortionPass.distortion.set(
    //   distortionStrength.current,
    //   distortionStrength.current
    // );
    // myLensDistortionPass.focalLength.set(
    //   1 - focalStrength.current,
    //   1 - focalStrength.current
    // );

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

      let item = { x: 0, y: 0, width: size.width, height: size.height };

      if (index === 0) {
        items.push(item);
        return;
      }

      let positionIsValid = false;

      let numberOfTests = 0;
      let minRadius = 2;

      let tempPos = { x: 0, y: 0 };

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

    state.panLimits.min.set(
      minX - state.panMargin,
      minY - state.panMargin,
      -10
    );
    state.panLimits.max.set(maxX + state.panMargin, maxY + state.panMargin, 10);

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
    snap.items.forEach((_, index: number) => {
      gsap.to(state.items[index], {
        x: snap.view == "grid" ? state.itemsCopy[index].x : 0,
        y:
          snap.view == "grid"
            ? state.itemsCopy[index].y
            : state.itemsCopy[index].height * 10,
      });
    });
  }, [snap.view]);

  return (
    <>
      {snap.items.length &&
        data.map((project, index) => (
          <Plane
            itemData={snap.items[index]}
            index={index}
            key={project.name + index}
            texture={covers[index]}
            project={data[index]}
          />
        ))}
    </>
  );
};

export default _;
