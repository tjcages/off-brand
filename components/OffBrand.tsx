import * as THREE from "three";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useCursor } from "@react-three/drei";
import { easing } from "maath";
import { useFont, FontProps } from "../modules/useFont";

type Props = {
  font?: string;
  color?: string;
  position?: [number, number, number];
};

// Starter positions
const offPosition = { x: -1.6, y: 2, z: 0 };
const dashPosition = { x: -0.45, y: 1.95, z: 0 };
const brandPosition = { x: 1.3, y: 2, z: 0 };
const tmPosition = { x: 2.8, y: 1.69, z: 0 };

// Animation values
const moveFactor = 1.55;
const scaleFactor = 3;
const floatFactor = 0.75;

function Off({
  color,
  position = [offPosition.x, offPosition.y, offPosition.z],
  ...props
}: Props) {
  return (
    <Text
      font={"/fonts/playfair/Playfair-Italic.ttf"}
      fontSize={1}
      letterSpacing={0}
      color={color}
      position={position}
      {...props}
    >
      Off
    </Text>
  );
}

function Dash({
  color,
  position = [dashPosition.x, dashPosition.y, dashPosition.z],
  ...props
}: Props) {
  return (
    <mesh position={position} {...props}>
      <boxGeometry attach="geometry" args={[0.7, 0.05, 0]} />
      <meshBasicMaterial />
    </mesh>
  );
}

function Brand({
  color,
  position = [brandPosition.x, brandPosition.y, brandPosition.z],
  ...props
}: Props) {
  const ref = useRef();

  return (
    <Text
      ref={ref}
      font={props.font}
      fontSize={1}
      letterSpacing={0}
      color={color}
      position={position}
      {...props}
    >
      Brand
    </Text>
  );
}

function TM({
  color,
  position = [tmPosition.x, tmPosition.y, tmPosition.z],
  ...props
}: Props) {
  return (
    <Text
      font="/fonts/playfair/Playfair-Italic.ttf"
      fontSize={0.25}
      letterSpacing={0}
      color={color}
      position={position}
      {...props}
    >
      ™
    </Text>
  );
}

function _({ ...props }) {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  // Access each letter individually
  const [off, dash, brand, tm] = ref.current?.children || [];

  // Random offset for the sine wave
  const [r] = useState(() => Math.random() * 10000);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  // Load font
  const font = useFont({ stop: hovered } as FontProps);

  useCursor(hovered);

  useFrame((_, dt) => {
    if (ref.current && off && dash && brand && tm) {
      // move off left
      easing.damp3(
        off.position,
        [
          offPosition.x * (hovered ? moveFactor : 1),
          offPosition.y,
          offPosition.z,
        ],
        0.1,
        dt
      );
      // move brand right
      easing.damp3(
        brand.position,
        [
          brandPosition.x * (hovered ? moveFactor : 1),
          brandPosition.y,
          brandPosition.z,
        ],
        0.1,
        dt
      );
      // move tm right
      easing.damp3(
        tm.position,
        [
          tmPosition.x * (hovered ? moveFactor * 0.85 : 1),
          tmPosition.y,
          tmPosition.z,
        ],
        0.1,
        dt
      );
      // scale dash
      easing.damp3(
        dash.scale,
        [hovered ? scaleFactor : 1, hovered ? scaleFactor * 5 : 1, 0],
        0.1,
        dt
      );
    }

    if (ref.current)
      ref.current.position.y =
        -floatFactor + Math.sin(_.clock.elapsedTime + r) / 10;
  });

  return (
    <group
      ref={ref}
      {...props}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <Off {...props} />
      <Dash {...props} />
      <Brand {...props} font={font} />
      <TM {...props} />

      <mesh position={[0, 2, 0]}>
        <meshBasicMaterial color={0x000000} transparent opacity={0} />
        <planeGeometry attach="geometry" args={[8, 2]} />
      </mesh>
    </group>
  );
}

export default _;
