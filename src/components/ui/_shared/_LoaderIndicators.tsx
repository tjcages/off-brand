import { state } from "@/store";
// import { useId } from "@/utils";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

const _ = () => {
  const id = "loader-indicators";
  const { progress } = useProgress();
  const { loaded } = useSnapshot(state);

  useEffect(() => {
    if (loaded)
      gsap.to(`#${id}-indicator`, {
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.5,
        delay: 0.5,
        ease: "expo.in",
        overwrite: true
      });
  }, [loaded, id]);

  useEffect(() => {
    gsap.to(`#${id}-0`, {
      opacity: progress === 0 ? 1 : 0,
      duration: progress === 0 ? 1 : 0.25,
      ease: "expo.out",
      overwrite: true
    });
    gsap.to(`#${id}-50`, {
      opacity: progress >= 50 && progress < 100 ? 1 : 0,
      duration: progress >= 50 && progress < 100 ? 1 : 0.25,
      ease: "expo.out",
      overwrite: true
    });
    gsap.to(`#${id}-100`, {
      opacity: progress >= 100 ? 1 : 0,
      duration: progress >= 100 ? 1 : 0.25,
      ease: "expo.out",
      overwrite: true
    });
  }, [id, progress]);

  return (
    <div id={id + "-indicator"} className="absolute flex items-center justify-center">
      <p id={id + "-0"} className="absolute text-right -translate-x-8">
        0
      </p>
      <p id={id + "-50"} className="absolute text-center -translate-y-8">
        50
      </p>
      <p id={id + "-100"} className="absolute text-left translate-x-8">
        100
      </p>
    </div>
  );
};

export default _;
