import { Bloom, EffectComposer, TiltShift2 } from "@react-three/postprocessing";

const _ = () => {
  return (
    <EffectComposer>
      <Bloom mipmapBlur levels={9} intensity={5.5} luminanceThreshold={1} luminanceSmoothing={1} />
      <TiltShift2 blur={0.05} />
    </EffectComposer>
  );
};

export default _;
