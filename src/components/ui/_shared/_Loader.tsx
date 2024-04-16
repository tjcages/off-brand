"use client";

import { state } from "@/store";
import { useId } from "@/utils";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

const minTime = 2;

const _ = () => {
  const id = useId();
  const { progress } = useProgress();
  const [passedMinTime, setPassedMinTime] = useState(false);

  // Handle loading states
  useEffect(() => {
    if (progress === 100) {
      state.loaded = true;
      if (passedMinTime) {
        state.selectedStep = 1;
        gsap.to(`#${id}`, {
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.5,
          delay: 1.5,
          ease: "expo.in",
          overwrite: true,
          onComplete: () => {
            state.ready = true;
          }
        });
      }
    } else state.loaded = false;
  }, [progress, passedMinTime, id]);

  // Initial animation in
  useEffect(() => {
    gsap.to(`#${id}`, {
      opacity: 1,
      duration: 0.25,
      ease: "expo.in"
    });

    setPassedMinTime(false);
    // Set a timeout to ensure the loader is visible for at least `minTime` seconds
    const timeout = setTimeout(() => setPassedMinTime(true), minTime * 1000);
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <section className="pointer-events-none">
      <Image
        id={id}
        className="opacity-0"
        src="/icons/stripe-logo.png"
        alt="stripe"
        width={150}
        height={100}
      />
    </section>
  );
};

export default _;
