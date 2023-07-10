import { useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";

interface Props {
  position: { x: number; y: number };
}

const float = "inquire";
const margin = 20;

const _ = ({ position }: Props) => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (snap.hover == float) {
      gsap.to(`#cover-${float}`, {
        scaleX: "100%",
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      });
    } else {
      gsap.to(`#cover-${float}`, {
        scaleX: "0%",
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.inOut",
        overwrite: true,
      });
    }
  }, [snap.hover]);

  useEffect(() => {
    gsap.to(ref.current, {
      x: position.x - ref.current.clientWidth - margin,
      y: position.y + margin,
      duration: 1,
      ease: "expo.out",
    });
  }, [position.x, position.y, snap.hover]);

  return (
    <div
      ref={ref}
      id={`stack-${float}`}
      className={clsx(
        styles.stack,
        styles.right,
        snap.hover == float && styles.active
      )}
    >
      <div className={styles.container}>
        <div id={`cover-${float}`} className={styles.cover} />
        <h5>Stay in touch</h5>
      </div>
      <div className={styles.container}>
        <div id={`cover-${float}`} className={styles.cover} />
        <h5>Add your email</h5>
      </div>
    </div>
  );
};

export default _;
