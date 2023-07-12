import { Vector3 } from "three";
import { Image, useAspect, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { isMobile } from "@/utils";

const _ = () => {
  const gl = useThree();
  const snap = useSnapshot(state);

  const texture = useTexture(snap.selected?.src ?? "/imgs/textures/noise.png");
  const scale = useAspect(
    texture.image.naturalWidth,
    texture.image.naturalHeight,
    4 / 7 // scaling factor
  );

  const size = {
    width: scale[0],
    height: scale[1],
  };
  // set a max width of 55% of the viewport
  if (size.width > gl.viewport.width * 0.55) {
    size.width = gl.viewport.width * 0.55;
    size.height = (size.width * scale[1]) / scale[0];
  }
  // set a max height of 80% of the viewport
  if (size.height > gl.viewport.height * 0.8) {
    size.height = gl.viewport.height * 0.8;
    size.width = (size.height * scale[0]) / scale[1];
  }

  if (snap.selected === null) return null;

  return (
    <Image
      url={snap.selected.src}
      scale={[size.width, size.height]}
      position={
        new Vector3(
          -gl.viewport.width / 2 + size.width / 2 + state.gap,
          isMobile
            ? -gl.viewport.height / 2 +
              size.height / 2 +
              state.margin +
              state.gap * 2
            : -gl.viewport.height / 2 + size.height / 2 + state.gap,
          0
        )
      }
      onPointerMove={(e) => {
        state.position = {
          x: e.x,
          y: e.y,
        };
      }}
      onPointerEnter={() => {
        document.body.style.cursor = "crosshair";
        state.hoverProject = snap.selected?.id ?? null;
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "grab";
        state.hoverProject = null;
      }}
    >
      {/* <meshNormalMaterial attach="material" map={texture} toneMapped={false} /> */}
      <planeGeometry />
    </Image>
  );
};

export default _;
