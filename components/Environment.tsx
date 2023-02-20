import { KernelSize } from "postprocessing";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  Grid,
} from "@react-three/postprocessing";
import { useMedia, mobileBreakpoint } from "../modules/useMedia";

function _() {
  const mobile = useMedia(mobileBreakpoint);

  return (
    <EffectComposer disableNormalPass>
      <Bloom
        kernelSize={3}
        luminanceThreshold={0}
        luminanceSmoothing={0.4}
        intensity={0.2}
      />
      <Bloom
        kernelSize={KernelSize.HUGE}
        luminanceThreshold={0}
        luminanceSmoothing={0}
        intensity={0.06}
      />
      <Noise opacity={0.03} />
      <Vignette eskil={false} offset={0.3} darkness={1.5} />
      {/* <Scanline density={1} opacity={0.2} /> */}
      <Grid scale={2} lineWidth={0.1} />
    </EffectComposer>
  );
}

export default _;
