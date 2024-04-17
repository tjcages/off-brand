"use client";

import { state } from "@/store";
import { useId } from "@/utils";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import { Controls } from "@/components/ui/_shared";

const _ = () => {
  const id = useId();
  const { ready, selectedStep } = useSnapshot(state);

  useEffect(() => {
    if (!ready) return;
    const node = document.getElementById(id);
    if (node) {
      gsap.to(node, {
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        delay: 0.75,
        ease: "expo.out"
      });
      gsap.to(
        [`#${id}-intro-title`, `#${id}-intro-description`, `#${id}-controls`, node.children],
        {
          opacity: 1,
          duration: 1,
          delay: 0.75,
          stagger: 0.15,
          ease: "expo.out"
        }
      );
    }
    gsap.delayedCall(3, () => (state.hoveredStep = 1));
    gsap.delayedCall(5, () => (state.hoveredStep = 2));
    gsap.delayedCall(7, () => (state.hoveredStep = 3));
    gsap.delayedCall(9, () => {
      state.hoveredStep = null;
      state.isIntro = false;
    });
  }, [ready, id]);

  useEffect(() => {
    if (selectedStep && selectedStep > 1 && selectedStep !== 5) {
      gsap.to(`#${id}-intro`, {
        opacity: 0,
        duration: 0.5,
        ease: "expo.in"
      });
      gsap.to(`#${id}-intro`, {
        height: 0,
        duration: 1,
        ease: "expo.inOut"
      });
    } else {
      gsap.to(`#${id}-intro`, {
        opacity: 1,
        height: "auto",
        duration: 1,
        ease: "expo.in"
      });
    }
  }, [selectedStep, id]);

  return (
    <div
      id={id}
      className="relative flex flex-col items-center justify-center w-full text-center scale-50 blur-md"
    >
      <div
        id={id + "-intro"}
        className="flex flex-col items-center justify-center gap-4 w-full pb-12 text-center"
      >
        <h1 id={id + "-intro-title"} className="font-bold text-4xl gradient opacity-0">
          Developer experience,
          <br />
          re-imagined
        </h1>
        <p id={id + "-intro-description"} className="fs-5 text-gray-400 text-center opacity-0">
          Introducing Workbench, Sandboxes, & Event Destinations – a powerful new set of tools that
          make integrating & growing with Stripe easier than ever.
        </p>
      </div>
      <Controls />
    </div>
  );
};

export default _;
