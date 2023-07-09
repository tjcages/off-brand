import { useRef, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import styles from "@/styles/float.module.scss";
import { state } from "@/store";

import Partners from "./_Partners";
import Contact from "./_Contact";

const margin = 20;

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!snap.hover) return;
    // track mouse position & move container accordingly
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(ref.current, {
        x:
          mouse.x +
          (snap.hover == "inquire" ? -1 : 0) * ref.current.clientWidth -
          (snap.hover == "inquire" ? 1 : -1) * margin,
        y: mouse.y + margin,
        duration: 1,
        ease: "expo.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [snap.hover]);

  return (
    <div className={clsx(styles.main)}>
      <div ref={ref} className={styles.mover}>
        <Partners />
        <Contact />
      </div>
    </div>
  );
};

export default _;
