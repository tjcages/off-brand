import { Sandbox, Terminal, Webhooks } from "@/assets/icons";
import { state } from "@/store";
import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useSnapshot } from "valtio";

import { ScrambleText } from "@/components/ui/_shared";

import Tag from "./_Tag";

interface Props {
  text?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  tag?: {
    text: string;
    color: string;
    x?: number;
  };
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  visible?: boolean;
  icon?: boolean;
}

const _ = ({
  text,
  description,
  cta,
  tag,
  position,
  scale,
  visible = true,
  icon = false
}: Props) => {
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { hoveredStep } = useSnapshot(state);

  const getTitle = () => {
    switch (hoveredStep) {
      case 1:
        return "Sandboxes";
      case 2:
        return "Workbench";
      case 3:
        return "Event Destinations";
      default:
        return "";
    }
  };

  const getIcon = () => {
    if (!icon) return;
    if (text === "Sandboxes") {
      return (
        <Sandbox
          width={16}
          height={16}
          className={cn(
            "text-white transition-opacity duration-500 ease-in-out",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
      );
    } else if (text === "Workbench") {
      return (
        <Terminal
          width={16}
          height={16}
          className={cn(
            "text-white transition-opacity duration-500 ease-in-out",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
      );
    } else if (text === "Event Destinations") {
      return (
        <Webhooks
          width={16}
          height={16}
          className={cn(
            "text-white transition-opacity duration-500 ease-in-out",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
      );
    }
  };

  return (
    <group ref={ref} visible={visible} position={position} scale={scale}>
      <Html transform scale={0.5} center>
        <div
          className="flex flex-col items-center justify-center gap-1 md:gap-0 text-white"
          style={{ transform: "scale(2)" }}
        >
          <div className="relative flex items-center justify-center gap-1">
            {getIcon()}
            <h3>
              <ScrambleText>{visible ? (text !== undefined ? text : getTitle()) : ""}</ScrambleText>
            </h3>
            {tag && <Tag tag={tag} visible={visible} />}
          </div>
          <div
            className={cn(
              "flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0.5 text-[9px] md:text-[7px] transition-opacity duration-500 ease-in-out",
              visible ? "opacity-100 delay-1000" : "opacity-0 delay-0"
            )}
          >
            {description !== undefined && <p className="opacity-70">{description}</p>}
            {cta && (
              <Link
                href={cta.href}
                target="_blank"
                className="flex items-center justify-center gap-0.5 text-[#2B9DF6] cursor-pointer pointer-events-auto opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <p>{cta.label}</p>
                <Image
                  className="w-1.5 h-auto mt-[1px]"
                  src="/icons/arrow-blue.png"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </Link>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default _;
