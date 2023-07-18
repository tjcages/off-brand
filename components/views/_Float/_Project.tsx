import { useRef, useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { ProjectProps } from "@/data";

const margin = 20;

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [project, set] = useState<ProjectProps | null>(null);

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
  }, [snap.position.x, snap.position.y]);

  useEffect(() => {
    const proj = snap.items.find((item) => item.id == snap.hoverProject);
    if (proj) {
      set(proj);
    }
  }, [snap.hoverProject]);

  return (
    <div
      ref={ref}
      id={`stack-project`}
      className={clsx(
        styles.stack,
        snap.hoverProject !== null && styles.active
      )}
    >
      <div className={styles.container} style={{ marginBottom: 10 }}>
        <div id={`cover-project`} className={styles.cover} />
        {project && project.name && (
          <h5>{(snap.selectedIndex + 1).toString().padStart(3, "0")}</h5>
        )}
      </div>
      {project && project.name && (
        <div className={styles.container}>
          <div id={`cover-project`} className={styles.cover} />
          <h5>{project.name}</h5>
        </div>
      )}
      {project && project.description && (
        <div className={styles.container}>
          <div id={`cover-project`} className={styles.cover} />
          <h5>{project.description}</h5>
        </div>
      )}
      {project && project.href && (
        <div className={styles.container} style={{ marginTop: 10 }}>
          <div id={`cover-project`} className={styles.cover} />
          <Image
            className={styles.arrow}
            src="/imgs/icons/arrow-light.png"
            alt="arrow"
            width={32}
            height={32}
          />
          <h5>{new URL(project.href).hostname}</h5>
        </div>
      )}
    </div>
  );
};

export default _;
