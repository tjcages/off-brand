import { useRef, useEffect, useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const margin = 20;

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const project = useMemo(() => {
    return snap.items[snap.currentIndex];
  }, [snap.currentIndex]);

  useEffect(() => {
    setTimeout(() => {
      if (snap.hoverProject && snap.currentIndex !== -1) {
        gsap.to(`#cover-project`, {
          width: "auto",
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        });
      } else {
        gsap.to(`#cover-project`, {
          width: "0%",
          duration: 0.5,
          stagger: 0.05,
          ease: "expo.inOut",
          overwrite: true,
        });
      }
    }, 10);
  }, [snap.hoverProject, snap.currentIndex]);

  useEffect(() => {
    gsap.to(ref.current, {
      x: snap.position.x + margin,
      y: snap.position.y + margin,
      duration: 1,
      ease: "expo.out",
    });
  }, [snap.position.x, snap.position.y]);

  return (
    <div
      ref={ref}
      id={`stack-project`}
      className={clsx(
        styles.stack,
        snap.hoverProject !== null && styles.active
      )}
    >
      {project && project.name && (
        <div
          id={`cover-project`}
          className={styles.container}
          style={{ marginBottom: 10 }}
        >
          <h5>({(snap.currentIndex + 1).toString().padStart(3, "0")})</h5>
        </div>
      )}
      {project && project.name && (
        <div id={`cover-project`} className={styles.container}>
          <h5>{project.name}</h5>
        </div>
      )}
      {project && project.description && (
        <div id={`cover-project`} className={styles.container}>
          <h5>{project.description}</h5>
        </div>
      )}
      {project && project.href && (
        <div
          id={`cover-project`}
          className={styles.container}
          style={{ marginTop: 10 }}
        >
          <Image
            className={styles.arrow}
            src="/imgs/icons/arrow-light.png"
            alt="arrow"
            width={32}
            height={32}
          />
          <h5 style={{ textTransform: "lowercase" }}>
            {new URL(project.href).hostname}
          </h5>
        </div>
      )}
    </div>
  );
};

export default _;
