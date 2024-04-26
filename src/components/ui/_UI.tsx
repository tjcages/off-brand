"use client";

import { state } from "@/store";
import { gsap } from "gsap";
import { Suspense, useEffect } from "react";
import { useSnapshot } from "valtio";

import { Background, Controls, Header, Loader, LoaderIndicators, PlusCorners } from "./_shared";
import Content from "./content";

const _ = () => {
  const id = "ui";
  const { selectedStep } = useSnapshot(state);

  useEffect(() => {
    if (selectedStep && selectedStep > 1) {
      gsap.to(`#${id}`, {
        height: 64,
        duration: 0.75,
        ease: "expo.inOut"
      });
    } else {
      gsap.to(`#${id}`, {
        height: "auto",
        duration: 1,
        ease: "expo.out"
      });
    }
  }, [selectedStep, id]);

  return (
    <section>
      <Background />
      <Suspense>
        <Loader />
      </Suspense>
      <Header />

      <Suspense>
        <div
          ref={node => {
            gsap.to(node, {
              opacity: 1,
              duration: 1,
              ease: "expo.out"
            });
          }}
          className="absolute left-6 md:left-12 right-6 md:right-12 bottom-6 md:bottom-12 flex items-center justify-center opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div
            id={id}
            className="relative flex flex-col items-center justify-center gap-8 max-w-xl p-2 md:p-8 pb-[32px] md:pb-[64px] text-center"
          >
            <Content />
            <PlusCorners />
            <LoaderIndicators />
            <Controls />
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default _;
