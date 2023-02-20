import { Reflector, useTexture } from "@react-three/drei";

function _(props: any) {
  const [floor, normal] = useTexture([
    "/textures/SurfaceImperfections003_1K_var1.jpg",
    "/textures/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    <Reflector
      resolution={480}
      mirror={10}
      blur={[400, 100]}
      mixBlur={24}
      mixStrength={1.5}
      position-y={-0.8}
      // renderOrder={-1}
      distortion={0.6}
      distortionMap={normal}
      {...props}
    >
      {(Material, props: any) => (
        <Material
          {...props}
          color={"red"}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[0.75, 1]}
        />
      )}
    </Reflector>
  );
}

export default _;
