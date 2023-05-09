import { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Environment,
  RenderTexture,
  Text,
  PerspectiveCamera,
} from "@react-three/drei";

import { LayerMaterial, Displace } from "lamina";

const LINE_1 = "Starter Kit";
const LINE_2 = "Hello World";
const LINE_3 = "React & NextJS";
const LINE_4 = "Three Fiber & Lamina";
const SIZE = 12;

export default function _() {
  return (
    <Canvas>
      <PerspectiveCamera position={[0, 0, 50]} makeDefault />
      <Suspense>
        <Bubble />
        <Typography />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}

const Bubble = () => {
  const ref = useRef(null);
  const displaceRef = useRef(null) as any;

  const { width } = useThree((state) => state.viewport);

  useFrame(({}, dt) => {
    if (displaceRef.current) displaceRef.current.offset.x += 4 * dt;
  });

  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[width / 6.5, 128, 128]} />
      <LayerMaterial
        color={"white"}
        lighting={"physical"}
        transmission={1.6}
        roughness={0}
        thickness={2.5}
        toneMapped={false}
      >
        <Displace ref={displaceRef} strength={2} scale={0.2} type="simplex" />
      </LayerMaterial>
    </mesh>
  );
};

const Typography = () => {
  const { width, height } = useThree((state) => state.viewport);
  const vw = (size: any) => (width * size) / 100;
  const vh = (size: any) => (height * size) / 100;

  return (
    <mesh>
      <planeBufferGeometry args={[width, height, 1]} />
      <meshBasicMaterial toneMapped={false}>
        <RenderTexture attach="map" sourceFile={undefined}>
          <color attach="background" args={["hsl(0,0%,0%)"]} />
          <Text
            font="/fonts/Sohne/Sohne-Buch.otf"
            fontSize={vw(SIZE / 6)}
            position={[0, vh(12), 0]}
          >
            {LINE_1}
          </Text>
          <Text
            font="/fonts/Basement/BasementGrotesque.otf"
            fontSize={vw(SIZE)}
            position={[0, 0, 0]}
          >
            {LINE_2}
          </Text>
          <Text
            font="/fonts/Sohne/Sohne-Buch.otf"
            fontSize={vw(SIZE / 6)}
            position={[-vw(SIZE * 2.7), -vh(7), 0]}
            textAlign="left"
          >
            {LINE_3}
          </Text>
          <Text
            font="/fonts/Sohne/Sohne-Buch.otf"
            fontSize={vw(SIZE / 6)}
            position={[vw(SIZE * 2.475), -vh(7), 0]}
            textAlign="right"
          >
            {LINE_4}
          </Text>
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
};
