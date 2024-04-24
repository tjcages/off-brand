import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";
import Image from "next/image";
import Link from "next/link";

import "@/utils/_bentPlaneGeometry";

import { ScrambleText } from "@/components/ui/_shared";

interface Props {
  theatreKey: string;
  visible: boolean;
  title?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  position?: [number, number, number];
}

const _ = ({ theatreKey, visible, title, description, cta, position }: Props) => {
  return (
    <e.group theatreKey={theatreKey} position={position} renderOrder={10}>
      <Html transform scale={0.0875} pointerEvents="none">
        <div
          className={cn(
            "relative flex flex-col items-start justify-start gap-2 w-full max-w-sm p-4 text-white bg-black/80 border border-white/10 outline outline-2 rounded-lg backdrop-blur-md overflow-hidden pointer-events-none transition-all duration-300 ease-out",
            visible
              ? "opacity-100 scale-100 outline-offset-2 outline-blue delay-500"
              : "opacity-0 scale-75 outline-offset-0 outline-blue/0 pointer-events-none delay-0"
          )}
          style={{ transform: "scale(2)" }}
        >
          {title !== undefined && (
            <h1>
              <ScrambleText>{visible ? title : " "}</ScrambleText>
            </h1>
          )}
          {description !== undefined && <p className="opacity-70">{description}</p>}
          {cta && (
            <Link
              href={cta.href}
              target="_blank"
              className="flex items-center justify-center gap-2 mt-2 cursor-pointer pointer-events-auto hover:gap-3 transition-all duration-300 ease-in-out"
            >
              <p>{cta.label}</p>
              <Image
                className="w-3 h-auto mt-0.5"
                src="/icons/arrow-right.png"
                alt="arrow"
                width={24}
                height={24}
              />
            </Link>
          )}
        </div>
      </Html>
    </e.group>
  );
};

export default _;
