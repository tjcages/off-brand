import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useSnapshot } from "valtio";
import styles from "@/styles/float.module.scss";
import { state } from "@/store";

import Partners from "./_Partners";
import Contact from "./_Contact";

const _ = () => {
  const snap = useSnapshot(state);
  const [position, set] = useState({ x: 0, y: 0 });

  useEffect(() => {
    set({ x: window.innerWidth, y: 0 });
  }, []);

  useEffect(() => {
    if (!snap.hover) return;
    const onMouseMove = (e: MouseEvent) => {
      set({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [snap.hover]);

  return (
    <div className={clsx(styles.main)}>
      <Partners position={position} />
      <Contact position={position} />
    </div>
  );
};

export default _;
