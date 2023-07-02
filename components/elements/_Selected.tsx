import { Image, useTexture } from "@react-three/drei";
import { Vector3 } from "three";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { useThree } from "@react-three/fiber";

const _ = () => {
  const gl = useThree();
  const snap = useSnapshot(state);

  if (snap.selected === null) return null;

  // determine sizing based on texture aspect ratio
  let size = {
    width: (gl.viewport.width / 7 - state.gap) * 3,
    height: (gl.viewport.width / 7 - state.gap) * 3,
  };
  const ratio = snap.selected.size.width / snap.selected.size.height;
  size.height = size.width / ratio;

  return (
    <Image
      url={snap.selected.src}
      position={
        new Vector3(
          -gl.viewport.width / 2 + size.width / 2 + state.gap,
          -gl.viewport.height / 2 + size.height / 2 + state.gap,
          0
        )
      }
    >
      <planeGeometry args={[size.width, size.height]} />
    </Image>
  );
};

export default _;
