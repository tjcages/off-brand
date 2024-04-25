import { state } from "@/store";
import { useDevice } from "@/utils";
import { config, useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { Edges, Float, MeshTransmissionMaterial, useCursor, useGLTF } from "@react-three/drei";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { RGBELoader } from "three-stdlib";
import { useSnapshot } from "valtio";

import Annotation from "@/components/canvas/_shared/annotation/_Annotation";

interface Props {
  step: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  annotation?: string;
  annotationPosition?: [number, number, number];
}

const _ = ({
  step,
  position = [0.25, 1.2, 0],
  rotation = [0, 0, 0.25],
  scale = 0.7,
  annotation,
  annotationPosition
}: Props) => {
  const { isMobile } = useDevice();
  const { ready, hoveredStep, userHovered, selectedStep } = useSnapshot(state);
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/icons/workbench.glb") as any;
  const ref = useRef() as React.MutableRefObject<THREE.Group>;

  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = debounce(hover => (state.hoveredStep = hover), 30);
  const over = (hover: number) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    debouncedHover(hover);
    if (!userHovered) state.userHovered = true;
  };

  const hovered = step === hoveredStep;
  useCursor(hovered);

  useEffect(() => {
    if (!ref.current) return;
    if (selectedStep === 0) {
      gsap.set(ref.current.position, { x: 0, y: -2, z: 0 });
      gsap.set(ref.current.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(ref.current.scale, { x: 0, y: 0, z: 0 });
    }
    if (!ready) return;
    if (selectedStep === 1) {
      gsap.to(ref.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 2,
        delay: 0.25,
        ease: "back.out(2)"
      });
      gsap.to(ref.current.rotation, {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: 2,
        delay: 0.25,
        ease: "back.out(2)"
      });
      gsap.to(ref.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 2,
        delay: 0.25,
        ease: "back.out(2)"
      });
    } else {
      gsap.to(ref.current.position, {
        x: position[0] * 3,
        y: position[1] * 3,
        z: 0,
        duration: 1,
        ease: "expo.inOut",
        overwrite: true
      });
    }
  }, [ready, position, rotation, scale, selectedStep]);

  const [{ wobble }] = useSpring(
    {
      wobble: hovered ? 1.05 : 1,
      config: n => (n === "wobble" ? { mass: 5, tension: 500, friction: 20 } : config.molasses)
    },
    [hovered]
  );

  return (
    <group
      ref={ref}
      onPointerOver={over(step)}
      onPointerOut={() => debouncedHover(null)}
      onClick={() => (state.selectedStep = step + 1)}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
      scale={0}
    >
      <Float floatIntensity={2} renderOrder={10}>
        <a.group scale={wobble}>
          <mesh
            geometry={nodes.Merged_Geometry.geometry}
            scale={[0.025, 0.025, 0.025]}
            position={[0, 1, 0]}
          >
            <MeshTransmissionMaterial
              backside
              backsideThickness={2}
              roughness={0.1}
              metalness={1}
              thickness={2}
              clearcoat={1}
              clearcoatRoughness={0.5}
              chromaticAberration={5}
              distortion={0.6}
              distortionScale={1}
              temporalDistortion={0.3}
              envMapIntensity={0.1}
              color={hovered ? "black" : "#002D8F"}
              emissive={hovered ? "black" : "#0048e5"}
              emissiveIntensity={0.5}
              background={texture}
            />
            <Edges visible={hovered} renderOrder={1000}>
              {/* @ts-ignore */}
              <a.meshBasicMaterial color={"white"} depthTest={false} />
            </Edges>
          </mesh>
        </a.group>

        <mesh position={[0, 1, 0.1]} visible={false}>
          <planeGeometry args={[2, 2]} />
        </mesh>

        {!isMobile && annotation !== undefined && selectedStep === 1 && (
          <Annotation visible={hovered} text={annotation} position={annotationPosition} />
        )}
      </Float>
    </group>
  );
};

export default _;
