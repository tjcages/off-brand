import { useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const float = "inquire";
const margin = 20;

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const input = useRef() as React.MutableRefObject<HTMLInputElement>;
  const lastPosition = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    if (snap.hover == float) {
      gsap.to(`#cover-${float}`, {
        width: "auto",
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      });

      input.current.focus();
    } else {
      gsap.to(`#cover-${float}`, {
        width: "0%",
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.inOut",
        overwrite: true,
      });

      input.current.blur();
    }
  }, [snap.hover]);

  useEffect(() => {
    let x = snap.position.x;
    let y = snap.position.y;

    if (snap.mobile && !lastPosition.current.x && !lastPosition.current.y) {
      lastPosition.current = { x, y };
    }

    // enable hover over float
    if (lastPosition.current.x && lastPosition.current.y) {
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;

      // decrease movement if moving down & left
      if (dx < 0 && dy > 0) {
        const rect = ref.current.getBoundingClientRect();
        if (Math.abs(dx) > rect.width || Math.abs(dy) > rect.height) return;

        gsap.to(ref.current, {
          x: x - dx / 1.2 - window.innerWidth - margin,
          y: y - dy / 1.2 + margin,
          duration: 2,
          ease: "expo.out",
        });
        return;
      } else {
        gsap.to(ref.current, {
          x: x - window.innerWidth - margin,
          y: y + margin,
          duration: 1,
          ease: "expo.out",
        });
      }
    }
    lastPosition.current = snap.position;
  }, [snap.position.x, snap.position.y, snap.hover]);

  return (
    <div
      ref={ref}
      id={`stack-${float}`}
      className={clsx(
        styles.stack,
        styles.right,
        snap.hover == float && styles.active
      )}
      onMouseEnter={() => {
        document.body.style.cursor = "crosshair";
        state.hover = float;
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "grab";
        state.hover = null;
      }}
    >
      <div id={`cover-${float}`} className={styles.container}>
        <h5>Stay in touch</h5>
      </div>
      <div id={`cover-${float}`} className={styles.container}>
        <input
          ref={input}
          value={snap.email}
          onChange={(e) =>
            snap.hover == float && (state.email = e.target.value)
          }
          autoFocus
        />
      </div>
      {snap.email !== "" && (
        <div
          id={`cover-${float}`}
          className={styles.container}
          style={{ cursor: "pointer" }}
        >
          <h5>Submit</h5>
        </div>
      )}
    </div>
  );
};

export default _;
