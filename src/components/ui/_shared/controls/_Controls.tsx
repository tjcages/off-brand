import { state } from "@/store";
// import { useId } from "@/utils";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import Button from "./_Button";

const _ = () => {
  const id = "controls";
  const { ready, selectedStep } = useSnapshot(state);

  useEffect(() => {
    if (!ready) return;
    gsap.to(`#${id}`, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "expo.inOut"
    });
  }, [ready, id]);

  useEffect(() => {
    gsap.to(`#${id}`, {
      x: -52 * ((selectedStep || 0) - 3) + 16,
      duration: 1,
      ease: "expo.inOut"
    });
    gsap.to(`#${id}`, {
      x: -52 * ((selectedStep || 0) - 3) + 16,
      duration: 1,
      ease: "expo.inOut"
    });
  }, [selectedStep, id]);

  return (
    <div
      id={id}
      className="absolute z-10 bottom-0 flex items-center justify-center gap-8 w-full h-16 opacity-0"
    >
      <Button step={1} next={2} />
      <Button step={2} next={3} />
      <Button step={3} next={4} />
      <Button step={4} next={5} />
      <Button step={5} next={1} />
    </div>
  );
};

export default _;
