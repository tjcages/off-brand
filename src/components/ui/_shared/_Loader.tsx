"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useId } from "@/utils";
import { useEffect } from "react";

const _ = () => {
  const id = useId();

  useEffect(() => {
    gsap.to(`${id}`, {
      opacity: 1,
      duration: 0.5,
      ease: "expo.out",
      onComplete: () => {
        gsap.to(`${id}`, {
          opacity: 0,
          scale: 0.75,
          duration: 1,
          delay: 2,
          ease: "expo.out",
        });
      },
    });

    return () => {
      gsap.to(`${id}`, {
        opacity: 0,
        duration: 0.25,
        ease: "expo.out",
        overwrite: true,
        onComplete: () => gsap.killTweensOf(`${id}`),
      });
    };
  }, []);

  return (
    <section>
      <div className="relative flex items-center justify-center pt-12">
        <Image
          id={id}
          className="opacity-0"
          src="/icons/stripe-logo.png"
          alt="stripe"
          width={200}
          height={100}
        />
      </div>
    </section>
  );
};

export default _;
