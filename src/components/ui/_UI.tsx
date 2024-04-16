"use client";

import { state } from "@/store";
import { cn } from "@/utils";
import { gsap } from "gsap";
import Image from "next/image";
import { Suspense } from "react";
import { useSnapshot } from "valtio";

import { Background, Loader, LoaderIndicators, PlusCorners } from "./_shared";
import Content from "./content";

const _ = () => {
  const { ready } = useSnapshot(state);

  return (
    <section>
      <Background />
      <Loader />
      <Image
        className={cn(
          "absolute left-8 top-8 w-auto h-6 opacity-0 transition-opacity duration-1000 ease-out",
          ready && "opacity-30"
        )}
        src="/icons/stripe-logo.png"
        alt="stripe"
        width={100}
        height={50}
      />

      <Suspense>
        <div
          ref={node => {
            gsap.to(node, {
              opacity: 1,
              duration: 1,
              ease: "expo.out"
            });
          }}
          className="absolute left-12 right-12 bottom-12 flex items-center justify-center opacity-0 transition-opacity duration-1000 ease-out"
        >
          <div className="relative flex flex-col items-center justify-center gap-8 max-w-lg p-8 text-center">
            <Content />
            <PlusCorners />
            <LoaderIndicators />
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default _;
