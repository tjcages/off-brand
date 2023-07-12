import { useRef, useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const margin = 20;

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [name, set] = useState("");
  const project = useMemo(() => {
    const proj = snap.items.find((item) => item.id == snap.hoverProject);
    if (proj) {
      set(proj.name);
    }
    return proj;
  }, [snap.hoverProject]);

  useEffect(() => {
    if (snap.hoverProject) {
      gsap.to(`#cover-project`, {
        scaleX: "100%",
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      });
    } else {
      gsap.to(`#cover-project`, {
        scaleX: "0%",
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.inOut",
        overwrite: true,
      });
    }
  }, [snap.hoverProject]);

  useEffect(() => {
    gsap.to(ref.current, {
      x: snap.position.x + margin,
      y: snap.position.y + margin,
      duration: 1,
      ease: "expo.out",
    });
  }, [snap.position.x, snap.position.y, snap.hoverProject]);

  return (
    <div
      ref={ref}
      id={`stack-project`}
      className={clsx(
        styles.stack,
        snap.hoverProject !== null && styles.active
      )}
    >
      <div className={styles.container}>
        <div id={`cover-project`} className={styles.cover} />
        {name && <h5>{name}</h5>}
      </div>
      <div className={styles.container}>
        <div id={`cover-project`} className={styles.cover} />
        <h5>Click to open</h5>
      </div>
    </div>
  );
};

export default _;
