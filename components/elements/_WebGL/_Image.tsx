import { forwardRef } from "react";
import { Vector3 } from "three";
import { Image as R3FImage, useAspect, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { state } from "@/store";
import { isMobile } from "@/utils";

interface Props {
  src: string;
}

const _ = forwardRef(({ src, ...props }: Props, forwardRef: any) => {
  const gl = useThree();

  const texture = useTexture(src ?? "/imgs/textures/noise.png");
  const scale = useAspect(
    texture.image.naturalWidth,
    texture.image.naturalHeight,
    4 / 7 // scaling factor
  );

  const size = {
    width: scale[0],
    height: scale[1],
  };

  // set max width & height
  const maxWidth = isMobile
    ? gl.viewport.width - state.gap * 2
    : gl.viewport.width * 0.55;
  const maxHeight = gl.viewport.height * 0.8;

  if (size.width > maxWidth) {
    size.width = maxWidth;
    size.height = (size.width * scale[1]) / scale[0];
  }
  if (size.height > maxHeight) {
    size.height = maxHeight;
    size.width = (size.height * scale[0]) / scale[1];
  }

  return (
    <R3FImage
      ref={forwardRef}
      url={src}
      scale={[size.width, size.height]}
      position={
        new Vector3(
          -gl.viewport.width / 2 + size.width / 2 + state.gap,
          isMobile
            ? -gl.viewport.height / 2 +
              size.height / 2 +
              (state.size.height * 3) / 4 +
              state.gap * 3
            : -gl.viewport.height / 2 + size.height / 2 + state.gap,
          0
        )
      }
      {...props}
    >
      <planeGeometry />
    </R3FImage>
  );
});

export default _;
