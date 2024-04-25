import { Sandbox, Terminal, Webhooks } from "@/assets/icons";
import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import Image from "next/image";
import Link from "next/link";

import "@/utils/_bentPlaneGeometry";

import { ScrambleText } from "@/components/ui/_shared";

interface Props {
  visible: boolean;
  title?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  socials?: {
    href: string;
    icon: string;
  }[];
  position?: [number, number, number];
}

const _ = ({ visible, title, description, cta, socials, position }: Props) => {
  return (
    <group position={position} renderOrder={10}>
      <Html transform scale={0.175} pointerEvents="none">
        <div
          className={cn(
            "relative flex flex-col items-start justify-start gap-2 w-full max-w-md p-4 text-white pointer-events-none transition-all duration-300 ease-out",
            visible
              ? "opacity-100 scale-100 outline-offset-2 outline-blue"
              : "opacity-0 scale-90 outline-offset-0 outline-blue/0 pointer-events-none delay-0"
          )}
        >
          <div className="flex items-center justify-start gap-4">
            <Sandbox width={24} height={24} className="text-white" />
            <Terminal width={24} height={24} className="text-white" />
            <Webhooks width={24} height={24} className="text-white" />
          </div>
          {title !== undefined && (
            <h1 className="text-[24px]">
              <ScrambleText>{visible ? title : " "}</ScrambleText>
            </h1>
          )}
          {description !== undefined && <p className="opacity-70">{description}</p>}
          {cta && (
            <Link
              href={cta.href}
              target="_blank"
              className="flex items-center justify-center gap-2 mt-2 text-[#2B9DF6] cursor-pointer pointer-events-auto hover:gap-3 transition-all duration-300 ease-in-out"
            >
              <p>{cta.label}</p>
              <Image
                className="w-3 h-auto mt-0.5"
                src="/icons/arrow-blue.png"
                alt="arrow"
                width={24}
                height={24}
              />
            </Link>
          )}
          {socials && (
            <div className="flex items-center justify-start gap-2 mt-8 px-3 py-2 border border-white/10 backdrop-blur-md bg-white/5 rounded-md">
              <p className="text-sm opacity-50">Follow along on</p>
              {socials.map(({ href, icon }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  className="cursor-pointer pointer-events-auto opacity-50 hover:opacity-100 transition-opacity duration-300 ease-out"
                >
                  <Image
                    className="w-auto min-w-3 max-w-4 h-auto min-h-3 max-h-4"
                    src={icon}
                    alt="social icon"
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default _;
