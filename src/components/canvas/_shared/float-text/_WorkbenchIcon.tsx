import { state } from "@/store";
import { config, useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { Edges, Float, MeshTransmissionMaterial, useCursor, useGLTF } from "@react-three/drei";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { debounce } from "lodash";
import { RGBELoader } from "three-stdlib";
import { useSnapshot } from "valtio";

import Annotation from "@/components/canvas/_shared/annotation/_Annotation";

interface Props {
  step: number;
  id?: string;
  text: string;
  annotation?: string;
  annotationPosition?: [number, number, number];
}

const _ = ({ step, id, text, annotation, annotationPosition }: Props) => {
  const { hoveredStep } = useSnapshot(state);
  const texture = useLoader(RGBELoader, "/textures/texture.hdr");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/objects/icons/workbench.glb") as any;

  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = debounce(hover => (state.hoveredStep = hover), 30);
  const over = (hover: number) => (e: ThreeEvent<PointerEvent>) => (
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

  console.log(nodes);

  return (
    <e.group
      theatreKey={"floats/float-" + id}
      onPointerOver={over(step)}
      onPointerOut={() => debouncedHover(null)}
      onClick={() => (state.selectedStep = step + 1)}
      scale={text === "" ? 0 : 1}
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
              color={hovered ? "black" : "#635bff"}
              emissive={hovered ? "black" : "#635bff"}
              emissiveIntensity={0.5}
              background={texture}
            />
            <Edges visible={hovered} renderOrder={1000}>
              <a.meshBasicMaterial color={"white"} depthTest={false} />
            </Edges>
          </mesh>
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
    </e.group>
  );
};

export default _;
