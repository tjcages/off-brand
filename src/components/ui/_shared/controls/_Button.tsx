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

const steps = ["", "Sandboxes", "Workbench", "Event Destinations", "Insiders"];

const featureSteps = {
  2: ["Sandbox 1", "Sandbox 2", "Sandbox 3"],
  3: ["Workbench 1", "Workbench 2", "Workbench 3", "Workbench 4"],
  4: ["Event Destination 1", "Event Destination 2", "Event Destination 3"]
} as Record<number, string[]>;

const _ = ({ step, next }: Props) => {
  const id = "button-" + step;
  const { ready, selectedStep, sbSelectedModal, wbSelectedModal, edSelectedModal } =
    useSnapshot(state);
  const [hovered, setHover] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const onClickNext = () => {
    if (selectedStep === 2) {
      if (sbSelectedModal === 3) state.selectedStep = next;
      else state.sbSelectedModal = (sbSelectedModal || 0) + 1;
    } else if (selectedStep === 3) {
      if (wbSelectedModal === 4) state.selectedStep = next;
      else state.wbSelectedModal = (wbSelectedModal || 0) + 1;
    } else if (selectedStep === 4) {
      if (edSelectedModal === 3) state.selectedStep = next;
      else state.edSelectedModal = (edSelectedModal || 0) + 1;
    }
  };

  const onClickLast = () => {
    if (selectedStep === 2) {
      if (sbSelectedModal === 1) state.selectedStep = 1;
      else state.sbSelectedModal = (sbSelectedModal || 0) - 1;
    } else if (selectedStep === 3) {
      if (wbSelectedModal === 1) state.selectedStep = 2;
      else state.wbSelectedModal = (wbSelectedModal || 0) - 1;
    } else if (selectedStep === 4) {
      if (edSelectedModal === 1) state.selectedStep = 3;
      else state.edSelectedModal = (edSelectedModal || 0) - 1;
    }
  };

  useEffect(() => {
    if (selectedStep === step) {
      gsap.to(`#${id}`, {
        width: [2, 4].includes(step) ? 148 : step === 3 ? 168 : 64,
        height: 64,
        duration: 1,
        ease: "expo.out"
      });
      gsap.to([`#${id}-arrow`, `#${id}-dots`], {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 1,
        ease: "expo.out"
      });
    } else {
      gsap.to(`#${id}`, {
        width: 24,
        height: 24,
        duration: 0.5,
        ease: "expo.out",
        overwrite: true
      });
      gsap.to([`#${id}-arrow`, `#${id}-dots`], {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "expo.out",
        overwrite: true
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
    }, 250);

    return () => clearInterval(interval);
  }, [hovered]);

  const tooltip = steps[step - 1] || "";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center transition-all duration-1000 ease-in-out",
        step === selectedStep && "mx-4"
      )}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Shine puffyness="1">
        <button
          id={id}
          className={cn(
            "group w-12 md:w-16 h-12 md:h-16 p-0 rounded-full bg-white/10 backdrop-blur-md",
            Math.abs((selectedStep || 0) - step) > 1 && "opacity-70",
            Math.abs((selectedStep || 0) - step) > 2 && "opacity-50",
            Math.abs((selectedStep || 0) - step) > 3 && "opacity-25",
            selectedStep && selectedStep > step && "bg-white/50",
            selectedStep === step && "outline-white"
          )}
          disabled={!ready}
          onClick={() => {
            if (step === selectedStep && [2, 3, 4].includes(step)) return;
            state.hoveredStep = null;
            if (step === selectedStep && next !== undefined) state.selectedStep = next;
            else state.selectedStep = step;
          }}
        >
          {step === 1 && (
            <div
              id={id + "-arrow"}
              className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
            >
              <Image
                className={cn("group-hover:invert", next && next < step && "-scale-x-100")}
                src="/icons/arrow-right.png"
                alt="arrow"
                width={24}
                height={24}
              />
            </div>
          )}
          {[2, 3, 4].includes(step) && (
            <div id={id + "-dots"} className="absolute inset-0 flex items-center justify-between">
              <div
                className="flex items-center justify-center w-full h-full opacity-50 transition-all duration-300 ease-in-out hover:scale-125 hover:opacity-100"
                onClick={onClickLast}
              >
                <Image
                  className="group-hover:invert -scale-x-100"
                  src="/icons/chevron-right.png"
                  alt="chevron"
                  width={16}
                  height={16}
                />
              </div>
              <div className="flex items-center justify-center">
                {featureSteps[step].map(s => (
                  <div
                    key={s}
                    className={cn(
                      "flex items-center justify-center p-1 rounded-full border-2 border-black/0 opacity-50 transition-all duration-300 ease-in-out hover:border-black/70 hover:opacity-70",
                      selectedStep === step &&
                        ((selectedStep === 2 &&
                          sbSelectedModal === featureSteps[step].indexOf(s) + 1) ||
                          (selectedStep === 3 &&
                            wbSelectedModal === featureSteps[step].indexOf(s) + 1) ||
                          (selectedStep === 4 &&
                            edSelectedModal === featureSteps[step].indexOf(s) + 1)) &&
                        "border-white group-hover:border-black hover:border-black"
                    )}
                    onClick={() => {
                      if (selectedStep === step) {
                        if (step === 2) state.sbSelectedModal = featureSteps[step].indexOf(s) + 1;
                        else if (step === 3)
                          state.wbSelectedModal = featureSteps[step].indexOf(s) + 1;
                        else if (step === 4)
                          state.edSelectedModal = featureSteps[step].indexOf(s) + 1;
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "w-3 h-3 bg-white/20 backdrop-blur-md rounded-full group-hover:bg-black/70",
                        selectedStep === step &&
                          ((selectedStep === 2 &&
                            sbSelectedModal === featureSteps[step].indexOf(s) + 1) ||
                            (selectedStep === 3 &&
                              wbSelectedModal === featureSteps[step].indexOf(s) + 1) ||
                            (selectedStep === 4 &&
                              edSelectedModal === featureSteps[step].indexOf(s) + 1)) &&
                          "bg-white group-hover:bg-black"
                      )}
                    />
                  </div>
                ))}
              </div>
              <div
                className="flex items-center justify-center w-full h-full opacity-50 transition-all duration-300 ease-in-out hover:scale-125 hover:opacity-100"
                onClick={onClickNext}
              >
                <Image
                  className="group-hover:invert"
                  src="/icons/chevron-right.png"
                  alt="chevron"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          )}
        </button>
      </Shine>

      {hovered && tooltip !== "" && (
        <div className="absolute -top-12">
          <div
            className={cn(
              "px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/20 rounded-md text-sm text-white/50 whitespace-nowrap opacity-0 transition-opacity duration-200 ease-out",
              tooltipVisible && "opacity-100"
            )}
          >
            <ScrambleText>{tooltipVisible ? steps[step - 1] : ""}</ScrambleText>
          </div>
        </div>
      )}
    </div>
  );
};

export default _;
