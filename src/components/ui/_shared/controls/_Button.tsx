import { state } from "@/store";
import { cn, useId } from "@/utils";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import { Shine } from "@/components/ui/_shared";

interface Props {
  step: number;
  next: number;
}

const _ = ({ step, next }: Props) => {
  const id = useId();
  const { ready, selectedStep } = useSnapshot(state);

  useEffect(() => {
    if (selectedStep === step) {
      gsap.to(`#${id}`, {
        width: 64,
        height: 64,
        duration: 1,
        ease: "expo.inOut"
      });
      gsap.to(`#${id}-arrow`, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        ease: "expo.out"
      });
    } else {
      gsap.to(`#${id}`, {
        width: 24,
        height: 24,
        duration: 0.5,
        ease: "expo.out"
      });
      gsap.to(`#${id}-arrow`, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "expo.out"
      });
    }
  });

  return (
    <div>
      <Shine puffyness="2">
        <button
          id={id}
          className={cn(
            "group w-16 h-16 p-0 rounded-full bg-white/10 backdrop-blur-md",
            selectedStep && selectedStep > step && "bg-white/50"
          )}
          onClick={() => {
            if (step === selectedStep) state.selectedStep = next;
            else state.selectedStep = step;
          }}
          disabled={!ready}
        >
          <Image
            id={id + "-arrow"}
            className="group-hover:invert"
            src="/icons/arrow-right.png"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>
      </Shine>
    </div>
  );
};

export default _;
