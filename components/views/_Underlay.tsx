import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSnapshot } from "valtio";
import styles from "@/styles/underlay.module.scss";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  const [count, set] = useState(100);
  const [ready, setReady] = useState(false);

  const ref = useRef() as React.MutableRefObject<HTMLHeadingElement>;

  useEffect(() => {
    var count = 100;
    var speed = 1000;

    function timer() {
      count--;

      set(count);

      if (count <= 1) {
        state.loaded = true;

        setTimeout(() => {
          setReady(true);
        }, 490);
        return;
      }

      speed = (speed / 6) * 3;
      setTimeout(timer, speed);
    }

    setTimeout(() => {
      timer();
    }, 300);
  }, []);

  return (
    <section className={clsx(styles.main, snap.loaded && styles.visible)}>
      <h4
        style={{
          visibility:
            snap.view == "linear" && snap.selected ? "hidden" : "visible",
        }}
      >
        Off_Brand
      </h4>
      <div className={styles.animation}>
        <h4 ref={ref} className={styles.one}>
          [{count.toString().padStart(3, "0")}]
        </h4>
        {ready && (
          <Image
            className={styles.arrow}
            src="/imgs/icons/arrow.png"
            alt="arrow"
            width={32}
            height={32}
          />
        )}
      </div>
      {/* <div ref={ref} /> */}
      <h4 className={styles.about}>
      Creative Studio, New York City
      </h4>
    </section>
  );
};

export default _;
