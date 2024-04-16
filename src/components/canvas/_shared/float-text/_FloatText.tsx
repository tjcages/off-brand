import {
  Edges,
  Float,
  MeshTransmissionMaterial,
  Text3D,
  useCursor,
} from "@react-three/drei";
import { debounce } from "lodash";
import { config, useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { RGBELoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import { editable as e } from "@theatre/r3f";
import { state } from "@/store";
import Annotation from "../annotation/_Annotation";
import { useSnapshot } from "valtio";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface Props {
  step: number;
  text: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  annotation?: string;
  annotationPosition?: [number, number, number];
  selectedPosition?: [number, number, number];
  unSelectedPosition?: [number, number, number];
}

const _ = ({
  step,
  text,
  position,
  rotation,
  scale,
  annotation,
  annotationPosition,
}: Props) => {
  const ref = useRef<THREE.Group | null>(null);
  const { hoveredStep, selectedStep } = useSnapshot(state);
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );

  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = useCallback(
    debounce((hover) => (state.hoveredStep = hover), 30),
    []
  );
  const over = (hover: number) => (e: any) => (
    e.stopPropagation(), debouncedHover(hover)
  );

  const hovered = step === hoveredStep;
  useCursor(hovered);

  const [{ wobble, color }] = useSpring(
    {
      wobble: hovered ? 1.05 : 1,
      color: hovered ? "white" : "transparent",
      config: (n) =>
        n === "wobble"
          ? { mass: 5, tension: 500, friction: 20 }
          : config.molasses,
    },
    [hovered]
  );

  return (
    <e.group
      position={[0, -2, 0]}
      scale={0}
    >
      <Float floatIntensity={2} renderOrder={10}>
        <a.group scale={wobble}>
          <Text3D font="/fonts/Inter-Light-Regular.json" height={0.4}>
            {text}
            <MeshTransmissionMaterial
              backside
              backsideThickness={2}
              roughness={0.2}
              metalness={2}
              thickness={2}
              clearcoat={1}
              clearcoatRoughness={0.5}
              chromaticAberration={5}
              distortion={0.6}
              distortionScale={1}
              temporalDistortion={0.3}
              envMapIntensity={0.1}
              color={hovered ? "black" : "#635bff"}
              emissive={hovered ? "black" : "#635bff"}
              emissiveIntensity={0.5}
              background={texture}
            />
            <Edges visible={hovered} renderOrder={1000}>
              <a.meshBasicMaterial
                transparent
                color={color}
                depthTest={false}
              />
            </Edges>
          </Text3D>
        </a.group>

        <mesh
          position={[1, 0.25, 1]}
          onPointerOver={over(step)}
          onPointerOut={() => debouncedHover(null)}
        >
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial color="transparent" transparent opacity={0} />
        </mesh>

        {annotation !== undefined && (
          <Annotation
            visible={hovered}
            // text={annotation}
            text="Explore"
            position={annotationPosition}
          />
        )}
      </Float>
    </e.group>
  );
};

export default _;
