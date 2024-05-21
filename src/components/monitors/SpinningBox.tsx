import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

interface Props {
  scale: number;
  position?: [number, number, number];
  setZoom?: (zoom: boolean) => void;
}

export function SpinningBox({ scale, position, setZoom }: Props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useCursor(hovered);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta));
  useEffect(() => {
    if (!setZoom) return;
    if (clicked) setZoom(true);
    else setZoom(false);
  }, [clicked, setZoom]);
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      scale={clicked ? scale * 1.4 : scale * 1.2}
      position={position}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "hotpink" : "indianred"} />
    </mesh>
  );
}
