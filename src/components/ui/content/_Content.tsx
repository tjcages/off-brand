"use client";

import { state } from "@/store";
// import { useId } from "@/utils";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

const _ = () => {
  const id = "content";
  const { ready, selectedStep, userHovered } = useSnapshot(state);
  const hasUserHovered = useRef(false);

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
    gsap.delayedCall(2, () => !hasUserHovered.current && (state.hoveredStep = 1));
    gsap.delayedCall(3.5, () => !hasUserHovered.current && (state.hoveredStep = 2));
    gsap.delayedCall(5, () => !hasUserHovered.current && (state.hoveredStep = 3));
    gsap.delayedCall(8, () => !hasUserHovered.current && (state.hoveredStep = null));
  }, [ready, id]);

  useEffect(() => {
    if (selectedStep && selectedStep > 1) {
      gsap.to(`#${id}-intro`, {
        opacity: 0,
        duration: 0.25,
        ease: "expo.out",
        overwrite: true
      });
    } else {
      gsap.to(`#${id}-intro`, {
        opacity: 1,
        duration: 1,
        delay: 0.25,
        ease: "expo.out"
      });
    }
  }, [selectedStep, id]);

  useEffect(() => {
    if (userHovered && !hasUserHovered.current) hasUserHovered.current = true;
  }, [userHovered]);

  return (
    <div
      id={id}
      className="relative flex flex-col items-center justify-center w-full text-center scale-50 blur-md"
    >
      <div
        id={id + "-intro"}
        className="flex flex-col items-center justify-center gap-4 w-full pb-12 text-center -translate-y-4"
      >
        <h1
          id={id + "-intro-title"}
          className="font-bold text-4xl leading-[2.7rem] gradient opacity-0"
        >
          Developer experience, reimagined
        </h1>
        <p id={id + "-intro-description"} className="fs-5 text-gray-400 text-center opacity-0">
          Meet a new set of developer tools to make writing, testing, and pushing Stripe code easier
          than ever.
        </p>
      </div>
    </div>
  );
};

export default _;
