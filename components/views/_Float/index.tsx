import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useSnapshot } from "valtio";
import styles from "@/styles/float.module.scss";
import { state } from "@/store";

import Partners from "./_Partners";
import Contact from "./_Contact";
import Project from "./_Project";

const _ = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (!snap.hover) return;
    const onMouseMove = (e: MouseEvent) => {
      state.position = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [snap.hover]);

  return (
    <div className={clsx(styles.main)}>
      <Partners />
      <Contact />
      <Project />
    </div>
  );
};

export default _;
