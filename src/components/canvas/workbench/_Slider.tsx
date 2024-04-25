import { cn, useDevice } from "@/utils";
import { Html } from "@react-three/drei";
import Image from "next/image";

interface Props {
  visible?: number;
  ui: string[];
  heights: number[];
}

const _ = ({ visible, ui, heights }: Props) => {
  const { isMobile, isSafari } = useDevice();
  return (
    <Html
      transform={!isMobile && !isSafari}
      scale={0.024}
      position={[0, -0.25, 1]}
      pointerEvents="none"
      center
    >
      <div
        className="relative flex items-end justify-center w-[2560px] h-[1538px] origin-center"
        style={{
          transform: isMobile ? "scale(0.155)" : isSafari ? "scale(0.32)" : "scale(2)"
        }}
      >
        <div
          className={cn(
            "absolute left-0 right-0 bottom-0 h-0 bg-[#14181d] rounded-lg transition-all",
            visible !== undefined
              ? "opacity-100 duration-300 ease-out"
              : "opacity-0 duration-300 md:duration-600 ease-in-out"
          )}
          style={{
            height: `${visible !== undefined ? heights[visible - 1] : 0}px`
          }}
        >
          <Image
            className={cn(
              "absolute left-0 right-0 top-0 h-full transition-opacity duration-300 ease-out",
              visible === 1 ? "opacity-100" : "opacity-0"
            )}
            src={ui[0]}
            alt="UI"
            width={2560}
            height={1538}
          />
          <Image
            className={cn(
              "absolute left-0 right-0 top-0 h-full transition-opacity duration-300 ease-out",
              visible === 2 ? "opacity-100" : "opacity-0"
            )}
            src={ui[1]}
            alt="UI"
            width={2560}
            height={1538}
          />
          <Image
            className={cn(
              "absolute left-0 right-0 top-0 h-full transition-opacity duration-300 ease-out",
              visible === 3 ? "opacity-100" : "opacity-0"
            )}
            src={ui[2]}
            alt="UI"
            width={2560}
            height={1538}
          />
          <Image
            className={cn(
              "absolute left-0 right-0 top-0 h-full transition-opacity duration-300 ease-out",
              visible === 4 ? "opacity-100" : "opacity-0"
            )}
            src={ui[3]}
            alt="UI"
            width={2560}
            height={1538}
          />
        </div>
      </div>
    </Html>
  );
};

export default _;
