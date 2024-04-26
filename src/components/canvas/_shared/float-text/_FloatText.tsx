import { state } from "@/store";
import { config, useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { Edges, Float, Text3D, useCursor } from "@react-three/drei";
import { ThreeEvent, useLoader } from "@react-three/fiber";
// import { editable as e } from "@theatre/r3f";
import { debounce } from "lodash";
import { RGBELoader } from "three-stdlib";
import { useSnapshot } from "valtio";

import Annotation from "@/components/canvas/_shared/annotation/_Annotation";

interface Props {
  step?: number;
  text: string;
  scale?: number;
  annotation?: string;
  annotationPosition?: [number, number, number];
}

const _ = ({ step, text, scale = 1, annotation, annotationPosition }: Props) => {
  const { hoveredStep } = useSnapshot(state);
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");

  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = debounce(hover => (state.hoveredStep = hover), 30);
  const over = (hover?: number) => (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), debouncedHover(hover)
  );

  const hovered = step === hoveredStep;
  useCursor(hovered);

  const [{ wobble }] = useSpring(
    {
      wobble: hovered ? 1.05 : 1,
      config: n => (n === "wobble" ? { mass: 5, tension: 500, friction: 20 } : config.molasses)
    },
    [hovered]
  );

  return (
    <group
      onPointerOver={over(step)}
      onPointerOut={() => debouncedHover(null)}
      onClick={() => (state.selectedStep = (step || 0) + 1)}
      scale={scale}
    >
      <Float floatIntensity={2} renderOrder={10}>
        <a.group scale={wobble}>
          <Text3D font="/fonts/Inter-Light-Regular.json" height={0.4}>
            {text}
            <meshStandardMaterial map={texture} />
            <Edges visible={hovered} renderOrder={1000}>
              {/* @ts-ignore */}
              <a.meshBasicMaterial color={"white"} depthTest={false} />
            </Edges>
          </Text3D>
        </a.group>

        {text !== "" && (
          <mesh position={[1, 0.25, 1]}>
            <planeGeometry args={[2, 1.5]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )}

        {annotation !== undefined && (
          <Annotation visible={hovered} text={annotation} position={annotationPosition} />
        )}
      </Float>
    </group>
  );
};

export default _;
