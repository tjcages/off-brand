import { state } from "@/store";
import { useId } from "@/utils";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import Button from "./_Button";

const _ = () => {
  const id = useId();
  const { selectedStep } = useSnapshot(state);

  useEffect(() => {
    gsap.to(`#${id}-controls`, {
      x: -48 * ((selectedStep || 0) - 2),
      duration: 1,
      ease: "expo.inOut"
    });
  }, [selectedStep, id]);

  return (
    <div
      id={id + "-controls"}
      className="relative flex items-center justify-center gap-8 w-full h-16 mt-8 opacity-0"
    >
      <Button step={1} next={2} />
      <Button step={2} next={3} />
      <Button step={3} next={4} />
      <Button step={4} next={5} />
    </div>
  );
};

export default _;
