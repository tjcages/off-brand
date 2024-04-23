"use client";

import { state } from "@/store";
import { cn } from "@/utils";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { ScrambleText, Shine } from "@/components/ui/_shared";

interface Props {
  step: number;
  next: number;
}

const steps = ["Sandboxes", "Workbench", "Event Destinations", "Insiders"];

const _ = ({ step, next }: Props) => {
  const id = "button-" + step;
  const { ready, selectedStep } = useSnapshot(state);
  const [hovered, setHover] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

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
        delay: 0.75,
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

  useEffect(() => {
    // detect if hovered has been true for more than 1 second, if so, show tooltip else hide
    const interval = setInterval(() => {
      if (hovered) setTooltipVisible(true);
      else {
        gsap.delayedCall(0.3, () => setTooltipVisible(false));
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <div
      className="relative flex items-center justify-center"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Shine puffyness="2">
        <button
          id={id}
          className={cn(
            "group w-16 h-16 p-0 rounded-full bg-white/10 backdrop-blur-lg",
            selectedStep && selectedStep > step && "bg-white/50"
          )}
          onClick={() => {
            state.hoveredStep = null;
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

      {hovered && (
        <div className="absolute -top-12">
          <p
            className={cn(
              "px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/20 rounded-md text-sm text-white/50 whitespace-nowrap opacity-0 transition-opacity duration-200 ease-out",
              tooltipVisible && "opacity-100"
            )}
          >
            <ScrambleText>{tooltipVisible ? steps[step - 1] : ""}</ScrambleText>
          </p>
        </div>
      )}
    </div>
  );
};

export default _;
