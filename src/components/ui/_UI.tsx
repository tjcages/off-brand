"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { cn } from "@/utils";
import { useEffect, useState, useRef } from "react";

import PlusCorners from "./_shared/_PlusCorners";
import Shine from "./_shared/_Shine";
import FeatureTitle from "./_shared/_FeatureTitle";

const _ = () => {
  const { ready, selectedStep, hoveredStep, isIntro } = useSnapshot(state);
  const [showFeatures, setShowFeatures] = useState(false);
  const stripeRef = useRef(null);

  const getTitle = () => {
    switch (hoveredStep) {
      case 0:
        return "Sandboxes";
      case 1:
        return "Workbench";
      case 2:
        return "Event Destinations";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!stripeRef.current) return;
    gsap.to(stripeRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "expo.out",
      onComplete: () => {
        setShowFeatures(true);
        gsap.to(stripeRef.current, {
          opacity: 0,
          scale: 0.75,
          duration: 1,
          delay: 2,
          ease: "expo.out",
          onComplete: () => {
            if (isIntro) {
              gsap.delayedCall(3, () => isIntro && (state.hoveredStep = 0));
              gsap.delayedCall(5, () => isIntro && (state.hoveredStep = 1));
              gsap.delayedCall(7, () => isIntro && (state.hoveredStep = 2));
              gsap.delayedCall(9, () => {
                if (!isIntro) return;
                state.hoveredStep = null;
                state.isIntro = false;
              });
            }
          },
        });
      },
    });
  }, []);

  return (
    <section>
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

      <div className="relative flex items-center justify-center pt-12">
        <Image
          ref={stripeRef}
          className="opacity-0"
          src="/icons/stripe-logo.png"
          alt="stripe"
          width={200}
          height={100}
        />
        {showFeatures !== null && <FeatureTitle title={getTitle()} />}
      </div>

      <div
        ref={(node) => {
          gsap.to(node, {
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          });
        }}
        className="absolute bottom-12 opacity-0 transition-opacity duration-1000 ease-out"
      >
        <div className="relative flex flex-col items-center justify-center gap-8 w-full max-w-lg p-8 text-center perspective-bottom">
          <div
            ref={(node) => {
              gsap.to(node, {
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                delay: 4.5,
                ease: "expo.out",
              });
              gsap.to(node && node.children, {
                opacity: 1,
                duration: 1,
                delay: 4.5,
                stagger: 0.15,
                ease: "expo.out",
              });
            }}
            className="flex flex-col items-center justify-center gap-4 text-center scale-50 blur-md"
          >
            <h1 className="font-bold text-4xl gradient opacity-0">
              Developer experience,
              <br />
              re-imagined
            </h1>
            <p className="fs-5 text-gray-400 text-center opacity-0">
              Introducing Workbench, Sandboxes, & Event Destinations – a
              powerful new set of tools that make integrating & growing with
              Stripe easier than ever.
            </p>
            <div className="relative flex items-center justify-center mt-8 opacity-0">
              <Shine puffyness="2">
                <button
                  className="group w-16 h-16 rounded-full bg-white/10 backdrop-blur-md"
                  onClick={() =>
                    (state.selectedStep = ((selectedStep || 0) + 1) % 5)
                  }
                  disabled={!ready}
                >
                  <Image
                    className="group-hover:invert"
                    src="/icons/arrow-right.png"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </button>
              </Shine>
              <div className="absolute left-24 flex items-center justify-start gap-3">
                <div className="w-3.5 h-3.5 bg-white/20 backdrop-blur-md rounded-full" />
                <div className="w-3 h-3 bg-white/10 backdrop-blur-md rounded-full" />
                <div className="w-2 h-2 bg-white/5 backdrop-blur-md rounded-full" />
              </div>
            </div>
          </div>

          <PlusCorners />
        </div>
      </div>
    </section>
  );
};

export default _;
