"use client";

import { state } from "@/store";
import { useId } from "@/utils";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import { Controls } from "@/components/ui/_shared";

const _ = () => {
  const id = useId();
  const { ready } = useSnapshot(state);

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
      gsap.to(node.children, {
        opacity: 1,
        duration: 1,
        delay: 0.75,
        stagger: 0.15,
        ease: "expo.out"
      });
    }
    gsap.delayedCall(3, () => (state.hoveredStep = 0));
    gsap.delayedCall(5, () => (state.hoveredStep = 1));
    gsap.delayedCall(7, () => (state.hoveredStep = 2));
    gsap.delayedCall(9, () => {
      state.hoveredStep = null;
      state.isIntro = false;
    });
  }, [ready, id]);

  return (
    <div
      id={id}
      className="relative flex flex-col items-center justify-center gap-4 w-full text-center scale-50 blur-md"
    >
      <h1 className="font-bold text-4xl gradient opacity-0">
        Developer experience,
        <br />
        re-imagined
      </h1>
      <p className="fs-5 text-gray-400 text-center opacity-0">
        Introducing Workbench, Sandboxes, & Event Destinations – a powerful new set of tools that
        make integrating & growing with Stripe easier than ever.
      </p>
      <Controls />
    </div>
  );
};

export default _;
