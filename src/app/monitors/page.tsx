"use client";

import { BakeShadows, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  SSAO,
  Vignette
} from "@react-three/postprocessing";
import { easing } from "maath";
import Image from "next/image";
import { Suspense, useState } from "react";
import * as THREE from "three";

// import { suspend } from "suspend-react";
import { Computers, Instances } from "@/components/monitors/Computers";

export default function App() {
  const [zoom, setZoom] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-end justify-center">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [-3.5, 1, 8.5], fov: 35, near: 1, far: 20 }}
        style={{
          position: "fixed",
          width: "100%",
          height: "100%"
        }}
      >
        <Suspense>
          {/* Lights */}
          <color attach="background" args={["black"]} />
          <hemisphereLight intensity={0.15} groundColor="black" />
          <spotLight
            position={[10, 20, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          {/* Main scene */}
          <group position={[-0, -1, 0]}>
            {/* Auto-instanced sketchfab model */}
            <Instances>
              <Computers scale={0.5} setZoom={setZoom} />
            </Instances>
            {/* Plane reflections + distance blur */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 30]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={0.75}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#202020"
                metalness={0.8}
                mirror={0.5}
              />
            </mesh>
            <pointLight distance={1.5} intensity={1} position={[-0.15, 0.7, 0]} color="orange" />
          </group>
          {/* Postprocessing */}
          <EffectComposer enableNormalPass>
            <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={3} />
            <DepthOfField
              target={[0, 0, zoom ? 4 : 12]}
              focalLength={0.3}
              bokehScale={15}
              height={700}
            />
            <SSAO
              samples={30}
              radius={20}
              intensity={30}
              luminanceInfluence={0.6}
              worldDistanceThreshold={0}
              worldDistanceFalloff={0}
              worldProximityThreshold={0}
              worldProximityFalloff={0}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
            <Glitch
              active
              delay={new THREE.Vector2(5, 15)}
              duration={new THREE.Vector2(0.3, 0.6)}
              strength={new THREE.Vector2(0.2, 0.2)}
            />
          </EffectComposer>
          {/* Camera movements */}
          <CameraRig zoom={zoom} />
          {/* Small helper that freezes the shadows for better performance */}
          <BakeShadows />
        </Suspense>
      </Canvas>

      <Image
        src="/awge-halftone-logo.png"
        alt="awge"
        width={1000}
        height={500}
        className="relative w-full max-w-3xl h-auto mb-[5vh] mix-blend-overlay"
      />
    </div>
  );
}

function CameraRig({ zoom }: { zoom: boolean }) {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        zoom ? -0.1 : -1 + (state.pointer.x * state.viewport.width) / 3,
        zoom ? 0 : (1 + state.pointer.y) / 2,
        zoom ? 1 : 5
      ],
      0.5,
      delta / 2
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}
