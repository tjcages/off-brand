import { state } from "@/store";
// import { useId } from "@/utils";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import { useCallback, useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const _ = () => {
  const id = "plus-corners";
  const { progress } = useProgress();
  const { loaded, selectedStep } = useSnapshot(state);
  const [intro, setIntro] = useState(true);

  // Loading animation
  const loadingAnimation = useCallback(
    (nodes: string[]) => {
      gsap.to(nodes, {
        rotate: (180 * progress) / 100,
        duration: 1,
        ease: "expo.out",
        overwrite: true
      });
    },
    [progress]
  );

  // Show content animation
  const animateFinal = (node: string, position: "tl" | "tr" | "bl" | "br") => {
    gsap.to(node, {
      x: position === "tr" ? 10 : position === "br" ? -10 : 0,
      y: position === "tl" ? -10 : position === "bl" ? 10 : 0,
      duration: 0.5,
      delay: 1.5,
      ease: "expo.out",
      onComplete: () => {
        gsap.to(node, {
          y: position === "tl" ? -20 : position === "bl" ? 20 : 0,
          duration: 1,
          delay: 1.5,
          ease: "expo.in",
          onComplete: () => {
            state.ready = true;
            setIntro(false);
          }
        });
        gsap.to(node, {
          x: 0,
          y: 0,
          top: position === "tl" ? -4 : position === "tr" ? -4 : undefined,
          left: position === "tl" ? -12 : position === "bl" ? -12 : undefined,
          bottom: position === "bl" ? -20 : position === "br" ? -20 : undefined,
          right: position === "tr" ? -12 : position === "br" ? -12 : undefined,
          duration: 1,
          delay: 2.5,
          ease: "expo.out"
        });
      }
    });
  };

  const animateClose = (node: string, position: "tl" | "tr" | "bl" | "br") => {
    gsap.to(node, {
      x: 0,
      y: "-100%",
      top: "75%",
      left: position === "tl" ? -12 : position === "bl" ? -12 : undefined,
      bottom: undefined,
      right: position === "tr" ? -12 : position === "br" ? -12 : undefined,
      duration: 1,
      ease: "expo.inOut",
      overwrite: true
    });
  };

  const animateOpen = (node: string, position: "tl" | "tr" | "bl" | "br") => {
    gsap.to(node, {
      x: 0,
      y: 0,
      top: position === "tl" ? -4 : position === "tr" ? -4 : undefined,
      left: position === "tl" ? -12 : position === "bl" ? -12 : undefined,
      bottom: position === "bl" ? -20 : position === "br" ? -20 : undefined,
      right: position === "tr" ? -12 : position === "br" ? -12 : undefined,
      duration: 1,
      ease: "expo.out"
    });
  };

  useEffect(() => {
    if (!loaded || intro) return;
    const nodes = [`#${id}-tl`, `#${id}-tr`, `#${id}-bl`, `#${id}-br`];
    if (selectedStep && selectedStep > 1 && selectedStep < 5) {
      nodes.forEach((node, index) => {
        animateClose(node, ["tl", "tr", "bl", "br"][index] as "tl" | "tr" | "bl" | "br");
      });
    } else
      nodes.forEach((node, index) => {
        animateOpen(node, ["tl", "tr", "bl", "br"][index] as "tl" | "tr" | "bl" | "br");
      });
  }, [id, loaded, selectedStep, loadingAnimation, intro]);

  useEffect(() => {
    const nodes = [`#${id}-tl`, `#${id}-tr`, `#${id}-bl`, `#${id}-br`];
    if (!loaded) loadingAnimation(nodes);
    else
      nodes.forEach((node, index) => {
        animateFinal(node, ["tl", "tr", "bl", "br"][index] as "tl" | "tr" | "bl" | "br");
      });
  }, [id, loaded, loadingAnimation]);

  return (
    <>
      <div id={id + "-tl"} className="absolute fs-5 leading-none">
        +
      </div>
      <div id={id + "-tr"} className="absolute fs-5 leading-none">
        +
      </div>
      <div id={id + "-bl"} className="absolute fs-5 leading-none">
        +
      </div>
      <div id={id + "-br"} className="absolute fs-5 leading-none">
        +
      </div>
    </>
  );
};

export default _;
