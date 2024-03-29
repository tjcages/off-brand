import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useSnapshot } from "valtio";
import SplitType from "split-type";
import gsap from "gsap";

import styles from "@/styles/underlay.module.scss";
import { state } from "@/store";
import Arrow from "@/public/imgs/icons/arrow.svg";
import { isMobile } from "@/utils";

const _ = () => {
  const snap = useSnapshot(state);
  const mobile = snap.mobile;
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

        setTimeout(
          () => {
            setReady(true);
          },
          isMobile ? 400 : 490
        );
        return;
      }

      speed = (speed / 6) * 3;
      setTimeout(timer, speed);
    }

    setTimeout(() => {
      timer();
    }, 300);

    // animate word
    const text = new SplitType("#header", { types: "chars" });
    gsap.set(text.chars, { y: "110%", filter: "blur(5px)" });

    gsap.to(text.chars, {
      y: "0%",
      filter: "blur(0px)",
      duration: 2,
      stagger: 0.04,
      delay: 2,
      ease: "expo.out",
    });

    const about = new SplitType("#about", { types: "words" });
    gsap.set(about.words, { y: "110%", filter: "blur(5px)" });

    gsap.to(about.words, {
      y: "0%",
      filter: "blur(0px)",
      duration: 2,
      stagger: 0.1,
      delay: 2,
      ease: "expo.out",
    });
  }, []);

  return (
    <section
      className={clsx(
        styles.main,
        snap.loaded && styles.visible,
        snap.view == "linear" && snap.selected && styles.background
      )}
    >
      <h1
        id="header"
        style={{
          visibility: snap.loaded ? "visible" : "hidden",
        }}
      >
        <span style={{ overflow: mobile ? "hidden" : "visible" }}>Off–</span>
        <span style={{ overflow: mobile ? "hidden" : "visible" }}>Brand</span>
      </h1>
      {!mobile && <div />}
      <div
        className={clsx(
          styles.animation,
          ready && styles.orange,
          state.loaded && !ready && styles.cyan // only do this since overlay is inverted
        )}
      >
        {ready ? (
          <>
            <h4 ref={ref} className={styles.one}>
              [0
            </h4>
            <Arrow
              className={styles.arrow}
              style={{ visibility: ready ? "visible" : "hidden" }}
            />
            <h4 ref={ref} className={styles.one}>
              1]
            </h4>
          </>
        ) : (
          <h4 ref={ref} className={styles.one}>
            [{count.toString().padStart(3, "0")}]
          </h4>
        )}
      </div>
      <h4 id="about" className={styles.about}>
        Creative Studio,
        <br />
        New York City
      </h4>
    </section>
  );
};

export default _;
